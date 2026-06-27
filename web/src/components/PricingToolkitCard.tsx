"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * PricingToolkitCard — the pricing §5 feature-tile visual.
 *
 * Base layer: the static glass evaluation-toolkit table (PNG, light NOT baked
 * in). Overlay: four brand-colour radial spotlights that drift slowly over the
 * glass via a single `requestAnimationFrame` loop, plus one slow CSS light
 * sweep. The goal is premium optical reflections sliding across the slab — not
 * neon / laser / disco.
 *
 * Performance: positions are written straight to each span's CSS variables via
 * refs inside the rAF loop — NO per-frame React state, so the loop never
 * re-renders the tree. Honors `prefers-reduced-motion` (static glows, no sweep).
 * All visuals are contained and masked to the slab; styles live in globals.css
 * under `.pricing-toolkit-card*`.
 */

type Spot = {
  color: string;
  size: number;
  opacity: number;
  blur: number;
  /** initial position, % of the card */
  x: number;
  y: number;
};

/* Deterministic initial config (no Math.random at render → no SSR/CSR mismatch).
   Colours: violet (brand) · cyan (tech) · aqua (signal) · soft pink (rare accent,
   dimmer). The pink stays weakest so it reads as an accent, not a fourth light. */
const SPOTS: Spot[] = [
  { color: "#6C4CF1", size: 360, opacity: 0.3, blur: 70, x: 34, y: 28 },
  { color: "#2EC5E8", size: 420, opacity: 0.26, blur: 82, x: 66, y: 46 },
  { color: "#36E0C2", size: 320, opacity: 0.24, blur: 60, x: 40, y: 72 },
  { color: "#FF5FD7", size: 300, opacity: 0.14, blur: 92, x: 62, y: 78 },
];

const BOUND_MIN = 16;
const BOUND_MAX = 84;
/** ms between picking a new random target per light */
const RETARGET_MS = 3500;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function PricingToolkitCard() {
  const spotEls = useRef<(HTMLSpanElement | null)[]>([]);
  // Live animation state — mutated outside React's render cycle.
  // Per-light lerp speeds vary slightly (0.0045–0.007) so the lights drift out
  // of sync and the motion never reads as one rigid group.
  const motion = useRef(
    [0.006, 0.0048, 0.007, 0.0052].map((speed, i) => ({
      x: SPOTS[i].x,
      y: SPOTS[i].y,
      tx: SPOTS[i].x,
      ty: SPOTS[i].y,
      speed,
    })),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastRetarget = performance.now();

    const loop = (now: number) => {
      const retarget = now - lastRetarget > RETARGET_MS;
      if (retarget) lastRetarget = now;

      const lights = motion.current;
      for (let i = 0; i < lights.length; i++) {
        const l = lights[i];
        if (retarget) {
          l.tx = rand(BOUND_MIN, BOUND_MAX);
          l.ty = rand(BOUND_MIN, BOUND_MAX);
        }
        l.x += (l.tx - l.x) * l.speed; // lerp toward target — slow, never jumps
        l.y += (l.ty - l.y) * l.speed;
        const el = spotEls.current[i];
        if (el) {
          el.style.setProperty("--x", `${l.x}%`);
          el.style.setProperty("--y", `${l.y}%`);
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pricing-toolkit-card">
      <Image
        className="pricing-toolkit-card__image"
        src="/assets/pricing/glass-evaluation-toolkit-flatlay-portrait-01.png"
        alt="Glass table laid out with startup-evaluation tools: pitch-deck cards, six judge lenses (P1–P6), the EvalLense scoring lens, score and confidence dials, a criteria ruler, a compare caliper, evidence pins, a red-flag marker, a final-decision stamp, and a pay-per-event token"
        fill
        sizes="(max-width:880px) 80vw, 360px"
      />
      <div className="pricing-toolkit-card__spotlights" aria-hidden="true">
        {SPOTS.map((s, i) => (
          <span
            key={i}
            ref={(el) => {
              spotEls.current[i] = el;
            }}
            className="pricing-toolkit-card__spotlight"
            style={
              {
                "--x": `${s.x}%`,
                "--y": `${s.y}%`,
                "--size": `${s.size}px`,
                "--color": s.color,
                "--opacity": s.opacity,
                "--blur": `${s.blur}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="pricing-toolkit-card__sweep" aria-hidden="true" />
    </div>
  );
}
