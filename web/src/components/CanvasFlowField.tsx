"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Rich "flow mode" for the dark canvas background.
 *
 * Instead of one blob sweeping diagonally with scroll, a FIELD of 5 blurred
 * colour masses lives inside the shared `.ds-canvas__bg--lobes-dark` layer. Each
 * mass has its own slow autonomous breathing (CSS keyframes on the inner span),
 * and ONE GSAP master timeline — driven by a single scrubbed ScrollTrigger over
 * the whole dark block — re-composes the whole field into a per-section target
 * state as that section approaches, then flows on to the next.
 *
 * Declarative: every dark section is classified (by its root class) into a SCENE
 * preset; the timeline just interpolates transform + opacity of each blob
 * between consecutive scenes. Magnetic anchoring is an EASE, not a snap: each
 * segment uses `power2.inOut`, so the field eases in and LINGERS near a section's
 * centre (where the keyframe sits) and moves fastest between sections. Because
 * keyframes are pinned to each section's centre scroll fraction, the composition
 * is exactly on-target when the section is centred. Reverse scroll plays back.
 *
 * Blobs animate transform + opacity only; blur is constant (CSS). Everything is
 * pointer-events:none and clipped by the host's overflow, so no h-scroll. The
 * field is injected into the dark layer so it inherits that layer's opacity
 * (0 over light zones, 1 in the dark zone) and sits UNDER the `::after` vignette
 * that clamps the edges to black.
 *
 * `blue` adds a per-instance `.ds-flow--blue` modifier on the injected field so a
 * single page can shift the palette into the brand blue/cyan range WITHOUT
 * recolouring the shared blob classes used by other pages.
 */

/** One blob's target transform in a scene. x/y are GSAP xPercent/yPercent
 *  (percent of the blob's own size); scaleX/scaleY/rotation/opacity as named. */
export type Blob = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
};
export type Scene = {
  /** rough share of the section the field covers — drives quick tuning + docs. */
  coverage: "high" | "medium" | "low";
  /** overall colour strength multiplier (kept in the blob opacities here). */
  intensity: number;
  /** blobs are [A base · B directional · C cyan light · D lavender light · E aqua accent]. */
  blobs: [Blob, Blob, Blob, Blob, Blob];
};

/* ── DECLARATIVE SCENE PRESETS — tweak these to retune the whole field without
   touching the timeline. Keyed by section "kind" (see classify() below). ── */
export const SCENES: Record<string, Scene> = {
  // 1 · large central object — field spreads wide behind the object, broad soft
  // volume, cyan + violet переливы at the edges.
  hero: {
    coverage: "high",
    intensity: 0.9,
    blobs: [
      { x: 0, y: 0, scaleX: 1.5, scaleY: 1.4, rotation: 0, opacity: 0.9 }, // base, behind object
      { x: -22, y: 12, scaleX: 1.35, scaleY: 0.8, rotation: -18, opacity: 0.5 }, // directional
      { x: 36, y: -26, scaleX: 0.8, scaleY: 0.8, rotation: 0, opacity: 0.5 }, // cyan edge
      { x: -40, y: 28, scaleX: 0.72, scaleY: 0.72, rotation: 0, opacity: 0.45 }, // lavender edge
      { x: 0, y: 0, scaleX: 0.6, scaleY: 0.6, rotation: 0, opacity: 0 }, // aqua off
    ],
  },
  // 3 · cards / several objects — field splits into a few streams; one behind the
  // main card (left), a faint one opposite (right); dark gaps kept between.
  cards: {
    coverage: "medium",
    intensity: 0.55,
    blobs: [
      { x: -32, y: -12, scaleX: 1.0, scaleY: 0.9, rotation: 12, opacity: 0.55 }, // behind main card
      { x: 42, y: 26, scaleX: 0.9, scaleY: 0.7, rotation: 26, opacity: 0.4 }, // faint opposite
      { x: -8, y: 22, scaleX: 0.5, scaleY: 0.5, rotation: 0, opacity: 0.26 }, // small cyan
      { x: 18, y: -22, scaleX: 0.42, scaleY: 0.42, rotation: 0, opacity: 0.16 }, // tiny lavender
      { x: 0, y: 0, scaleX: 0.5, scaleY: 0.5, rotation: 0, opacity: 0 },
    ],
  },
  // 2 · calm text — minimal field, sides/bottom stay near-black for max text
  // contrast, BUT a deliberate brand ACCENT highlight (cyan + lavender) spawns
  // tight behind the heading as the section centres. Base mass stays shoved to a
  // corner so the centre doesn't wash out.
  text: {
    coverage: "low",
    intensity: 0.45,
    blobs: [
      { x: -60, y: -50, scaleX: 0.8, scaleY: 0.8, rotation: 0, opacity: 0.22 }, // base, far corner, faint
      { x: 66, y: 60, scaleX: 0.55, scaleY: 0.55, rotation: 0, opacity: 0.1 }, // almost offscreen
      { x: 0, y: -14, scaleX: 0.95, scaleY: 0.62, rotation: 0, opacity: 0.72 }, // CYAN accent — wider + brighter, up by heading
      { x: -8, y: -18, scaleX: 0.68, scaleY: 0.52, rotation: 0, opacity: 0.48 }, // lavender broadens the accent
      { x: 0, y: 0, scaleX: 0.4, scaleY: 0.4, rotation: 0, opacity: 0 }, // aqua off
    ],
  },
  // 1/5 · object NOT lit — the field just slips past on the SIDES and drifts off
  // to the left; the centre (the object/steps) stays dark. No mass sits behind
  // the object. A faint right-edge touch keeps it from going fully black.
  object: {
    coverage: "low",
    intensity: 0.3,
    blobs: [
      { x: -88, y: 6, scaleX: 0.68, scaleY: 1.05, rotation: -10, opacity: 0.3 }, // base hugging / slipping off the left edge
      { x: -68, y: 44, scaleX: 0.5, scaleY: 0.85, rotation: 16, opacity: 0.15 }, // faint lower-left, leading away
      { x: 78, y: -30, scaleX: 0.36, scaleY: 0.36, rotation: 0, opacity: 0.1 }, // tiny faint right edge
      { x: 0, y: 0, scaleX: 0.4, scaleY: 0.4, rotation: 0, opacity: 0 }, // off (centre stays dark)
      { x: 0, y: 0, scaleX: 0.4, scaleY: 0.4, rotation: 0, opacity: 0 }, // off
    ],
  },
  // 4 · accent — denser, masses overlap into a complex violet/lavender/cyan/aqua
  // mix; asymmetric, elongated, organic. No flat rainbow, no dirty grey.
  accent: {
    coverage: "high",
    intensity: 1,
    blobs: [
      { x: -16, y: 0, scaleX: 1.3, scaleY: 1.2, rotation: -15, opacity: 0.8 }, // violet base
      { x: 20, y: -10, scaleX: 1.2, scaleY: 0.9, rotation: 26, opacity: 0.7 }, // blue, overlapping
      { x: 10, y: 20, scaleX: 1.0, scaleY: 0.9, rotation: 0, opacity: 0.6 }, // cyan
      { x: -26, y: -20, scaleX: 0.9, scaleY: 0.9, rotation: 0, opacity: 0.55 }, // lavender
      { x: 30, y: 16, scaleX: 0.8, scaleY: 0.8, rotation: 0, opacity: 0.45 }, // aqua accent ON
    ],
  },
};

/** Map a dark section to a scene kind from its root class. Declarative + adapts
 *  to any dark page (canvas-bg, dark-anim, …) without per-page wiring. */
export function classify(el: Element): keyof typeof SCENES {
  const c = el.className || "";
  if (/cta-band/.test(c)) return "accent";
  if (/lab-process/.test(c)) return "cards";
  if (/lab-bento|ds-risk|lab-gallery/.test(c)) return "cards";
  if (/lab-fullstmt/.test(c)) return "text";
  if (/ds-hero/.test(c)) return "hero";
  return "text";
}

/* ── tunables ── */
const SCRUB = 0.8; // ScrollTrigger smoothing (inertia) — higher = laggier/softer
const EASE = "power2.inOut"; // per-segment ease → linger at centres, fast between
const BLOB_COUNT = 5;

function toVars(b: Blob) {
  return {
    xPercent: b.x,
    yPercent: b.y,
    scaleX: b.scaleX,
    scaleY: b.scaleY,
    rotation: b.rotation,
    opacity: b.opacity,
  };
}

/** `blue` → adds the `.ds-flow--blue` palette modifier to this instance only. */
export function CanvasFlowField({ blue = false }: { blue?: boolean } = {}) {
  useEffect(() => {
    const host = document.querySelector<HTMLElement>(".ds-canvas__bg--lobes-dark");
    if (!host) return;
    const main = host.closest("main");
    if (!main) return;

    // build the blob DOM inside the dark layer (inherits its opacity + vignette)
    const field = document.createElement("div");
    field.className = blue ? "ds-flow ds-flow--blue" : "ds-flow";
    field.setAttribute("aria-hidden", "true");
    const blobs: HTMLElement[] = [];
    const keys = ["a", "b", "c", "d", "e"];
    for (let i = 0; i < BLOB_COUNT; i++) {
      const blob = document.createElement("div");
      blob.className = `ds-flow__blob ds-flow__blob--${keys[i]}`;
      const inner = document.createElement("div");
      inner.className = "ds-flow__blob-inner";
      blob.appendChild(inner);
      field.appendChild(blob);
      blobs.push(blob);
    }
    host.appendChild(field);
    host.classList.add("has-flow-field"); // hides the orbit ::before via CSS

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let st: ScrollTrigger | null = null;
    let tl: gsap.core.Timeline | null = null;

    const build = () => {
      const sections = Array.from(
        main.querySelectorAll<HTMLElement>(".band.ink, .cta-band"),
      );
      if (!sections.length) return;
      const scenes = sections.map((el) => SCENES[classify(el)]);

      // section-centre positions as scroll fractions [0..1] → keyframe times
      const total = document.documentElement.scrollHeight - window.innerHeight || 1;
      const centers = sections.map((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + window.scrollY + r.height / 2 - window.innerHeight / 2;
        return Math.min(1, Math.max(0, center / total));
      });

      // initial composition = first scene
      blobs.forEach((b, i) => gsap.set(b, toVars(scenes[0].blobs[i])));

      tl = gsap.timeline();
      // pad the timeline to a normalised duration of 1 so scrub maps scroll
      // progress 1:1 to keyframe fractions (keyframes land on section centres).
      tl.to({ _: 0 }, { _: 1, duration: 1 }, 0);

      for (let s = 1; s < scenes.length; s++) {
        const dur = Math.max(centers[s] - centers[s - 1], 0.0001);
        blobs.forEach((b, i) => {
          tl!.to(b, { ...toVars(scenes[s].blobs[i]), duration: dur, ease: EASE }, centers[s - 1]);
        });
      }

      st = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: reduce ? true : SCRUB,
        animation: tl,
      });
    };

    build();

    // rebuild on resize (section centres + doc height change)
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        st?.kill();
        tl?.kill();
        build();
      });
    };
    window.addEventListener("resize", onResize);

    // dev controller — lets CanvasFlowEditor pause the timeline and live-apply
    // slider values to the blobs while tuning a scene. (dev-only window handle)
    const controller = {
      blobs,
      pause() {
        st?.disable(false); // stop scroll-writing, keep current frame
      },
      resume() {
        st?.enable();
      },
      apply(arr: Blob[]) {
        arr.forEach((b, i) => {
          if (blobs[i]) gsap.set(blobs[i], toVars(b));
        });
      },
      sections() {
        return Array.from(
          main.querySelectorAll<HTMLElement>(".band.ink, .cta-band"),
        );
      },
      classify,
      scenes: SCENES,
    };
    (window as unknown as { __canvasFlow?: typeof controller }).__canvasFlow = controller;

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      st?.kill();
      tl?.kill();
      host.classList.remove("has-flow-field");
      field.remove();
      delete (window as unknown as { __canvasFlow?: typeof controller }).__canvasFlow;
    };
  }, [blue]);

  return null;
}
