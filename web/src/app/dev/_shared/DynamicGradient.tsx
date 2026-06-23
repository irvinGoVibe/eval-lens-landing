"use client";

/**
 * DynamicGradient — WebGL "liquid surface" gradient via OGL.
 *
 * One full-screen triangle running a flowing-noise fragment shader. The whole
 * image reads as a SINGLE liquid surface: large soft colour clouds (domain-
 * warped fbm, NOT round blobs) that drift, condense into more saturated
 * pockets, then dissolve back into the base. Ambient motion runs off `uTime`
 * (full visual turnover ~20-35s, small amplitude, no obvious loop, no camera
 * move); scroll nudges the colour masses a bounded amount via `uScroll`;
 * the pointer adds a very weak global drift via `uPointer` (no spotlight).
 *
 * variant="light" → mostly near-white (~80% base), clean violet→lavender→
 * cyan→aqua ramp (adjacent hues only, so no rainbow / no grey mud).
 * variant="dark"  → mostly dark base, the same palette a touch more saturated.
 *
 * Client-only (OGL needs a real GL context). If WebGL is unavailable the
 * component renders a static CSS-gradient fallback instead.
 *
 * Throwaway dev component — lives under /dev/_shared, do NOT ship to prod.
 */

import { useEffect, useRef, useState } from "react";
import { Renderer, Triangle, Program, Mesh } from "ogl";

export type GradientVariant = "light" | "dark";

export interface DynamicGradientProps {
  variant?: GradientVariant;
  /** ambient flow speed multiplier (1 = baseline) */
  speed?: number;
  /** colour coverage / saturation multiplier (1 = baseline) */
  intensity?: number;
  /** shape deformation amount (1 = baseline) */
  distortion?: number;
  /** how strongly scroll shifts the colour masses (1 = baseline, 0 = off) */
  scrollInfluence?: number;
  /** freeze ambient animation (scroll/pointer still update) */
  paused?: boolean;
  className?: string;
}

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform float uScroll;          // window.scrollY in px
  uniform vec2  uPointer;         // -1..1
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uDistortion;
  uniform float uScrollInfluence;
  uniform float uDark;            // 0 light, 1 dark

  // ---- palette (shared across variants) ----
  const vec3 VIOLET   = vec3(0.424, 0.298, 0.945); // #6c4cf1
  const vec3 LAVENDER = vec3(0.663, 0.608, 1.000); // #a99bff
  const vec3 CYAN     = vec3(0.180, 0.773, 0.910); // #2ec5e8
  const vec3 AQUA     = vec3(0.212, 0.878, 0.761); // #36e0c2

  // ---- value noise + fbm ----
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * vnoise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);

    // slow, incommensurate time drift -> no obvious repeating cycle
    float t = uTime * 0.05 * uSpeed;

    // bounded scroll shift: ~140px vertical / 60px horizontal at influence=1,
    // softsign-saturating (tanh is absent in GLSL ES 1.00) so the masses
    // never run off-screen on long pages.
    float sx = uScroll / 700.0;
    float s = sx / (1.0 + abs(sx));
    vec2 shiftPx = vec2(60.0, 140.0) * uScrollInfluence * s;
    vec2 shift = shiftPx / max(uResolution.xy, vec2(1.0));

    // very weak global pointer drift (NOT a spotlight)
    p += uPointer * 0.02;

    // ---- domain warp: turns blobs into soft, organic cloud fronts ----
    vec2 drift = vec2(t * 0.6, t * 0.45);
    vec2 warp = vec2(
      fbm(p * 1.1 + drift),
      fbm(p * 1.1 + drift + vec2(5.2, 1.3))
    ) - 0.5;
    vec2 pw = p + warp * (0.75 * uDistortion) + shift;

    // ---- hue field: pick a region colour along an ADJACENT-hue ramp ----
    float hueN = fbm(pw * 0.5 + vec2(t * 0.2, -t * 0.16) + 3.0);
    vec3 col = VIOLET;
    col = mix(col, LAVENDER, smoothstep(0.00, 0.40, hueN));
    col = mix(col, CYAN,     smoothstep(0.38, 0.72, hueN));
    col = mix(col, AQUA,     smoothstep(0.66, 1.00, hueN));

    // ---- density field: how much colour shows vs base (keeps base dominant) ----
    float dens = fbm(pw * 0.85 + vec2(-t * 0.25, t * 0.22) + 19.0);
    // higher floor -> more base stays clean (~80% base)
    dens = smoothstep(0.46, 0.96, dens);

    // a few more saturated pockets
    float hot = smoothstep(0.70, 0.97, fbm(pw * 1.25 + vec2(t * 0.3, -t * 0.27) + 41.0));
    dens = clamp(dens + hot * 0.35, 0.0, 1.0);

    dens *= uIntensity;

    // ---- base surface (subtly non-flat) ----
    float baseN = fbm(p * 0.6 + vec2(t * 0.1, -t * 0.08) + 71.0);
    vec3 lightBase = mix(vec3(1.000, 1.000, 1.000), vec3(0.969, 0.969, 0.980), baseN);
    vec3 darkBase  = mix(vec3(0.039, 0.039, 0.051), vec3(0.106, 0.106, 0.149), baseN);
    vec3 base = mix(lightBase, darkBase, uDark);

    // dark variant carries a touch more colour, never crypto-bright
    float amount = dens * mix(0.55, 0.72, uDark);

    vec3 outc = mix(base, col, amount);

    // ordered-ish dither to kill banding on soft ramps
    float d = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
    outc += d;

    gl_FragColor = vec4(outc, 1.0);
  }
`;

function fallbackBackground(variant: GradientVariant): string {
  if (variant === "dark") {
    return [
      "radial-gradient(60% 50% at 25% 30%, rgba(108,76,241,0.40), transparent 70%)",
      "radial-gradient(55% 45% at 80% 25%, rgba(46,197,232,0.28), transparent 70%)",
      "radial-gradient(60% 55% at 65% 80%, rgba(54,224,194,0.24), transparent 70%)",
      "linear-gradient(160deg, #0a0a0d, #1b1b26)",
    ].join(", ");
  }
  return [
    "radial-gradient(55% 45% at 22% 28%, rgba(108,76,241,0.20), transparent 70%)",
    "radial-gradient(50% 42% at 82% 24%, rgba(46,197,232,0.16), transparent 70%)",
    "radial-gradient(58% 52% at 68% 82%, rgba(54,224,194,0.14), transparent 70%)",
    "linear-gradient(160deg, #ffffff, #f7f7fa)",
  ].join(", ");
}

export function DynamicGradient({
  variant = "light",
  speed = 1,
  intensity = 1,
  distortion = 1,
  scrollInfluence = 1,
  paused = false,
  className,
}: DynamicGradientProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  // live prop mirror so the rAF loop reads fresh values without re-init
  const propsRef = useRef({ speed, intensity, distortion, scrollInfluence, paused });
  propsRef.current = { speed, intensity, distortion, scrollInfluence, paused };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        dpr: Math.min(2, window.devicePixelRatio || 1),
        alpha: false,
        antialias: false,
      });
    } catch {
      setFailed(true);
      return;
    }

    const gl = renderer.gl;
    if (!gl) {
      setFailed(true);
      return;
    }

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    host.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uScroll: { value: 0 },
        uPointer: { value: [0, 0] },
        uSpeed: { value: speed },
        uIntensity: { value: intensity },
        uDistortion: { value: distortion },
        uScrollInfluence: { value: scrollInfluence },
        uDark: { value: variant === "dark" ? 1 : 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ];
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      program.uniforms.uScroll.value = window.scrollY || 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // smoothed pointer -> very weak influence
    let pTargetX = 0;
    let pTargetY = 0;
    const onPointer = (e: PointerEvent) => {
      pTargetX = (e.clientX / window.innerWidth) * 2 - 1;
      pTargetY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let last = performance.now();
    let clock = 0; // ambient time, only advances while not paused

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(now - last, 64) / 1000;
      last = now;

      const cur = propsRef.current;
      if (!cur.paused) clock += dt;

      const u = program.uniforms;
      u.uTime.value = clock;
      u.uSpeed.value = cur.speed;
      u.uIntensity.value = cur.intensity;
      u.uDistortion.value = cur.distortion;
      u.uScrollInfluence.value = cur.scrollInfluence;

      const pv = u.uPointer.value as number[];
      pv[0] += (pTargetX - pv[0]) * 0.04;
      pv[1] += (pTargetY - pv[1]) * 0.04;

      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
    // re-init only if the variant changes (different uDark baseline)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  if (failed) {
    return (
      <div
        className={className}
        aria-hidden
        style={{ background: fallbackBackground(variant) }}
      />
    );
  }

  return <div ref={hostRef} className={className} aria-hidden />;
}

export default DynamicGradient;
