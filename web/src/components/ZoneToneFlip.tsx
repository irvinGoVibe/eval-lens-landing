"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Through-background tone-flip seam for a `.ds-zone`. Drop it at the boundary
 * between the LIGHT sections and the INK sections inside ONE zone that stacks
 * two backgrounds:
 *   <div class="ds-zone__bg … ds-canvas__bg--lobes" />        ← light base
 *   <div class="ds-zone__bg … ds-canvas__bg--lobes-dark"> …sparks… </div>  ← opacity:0
 *   …light sections…  <ZoneToneFlip/>  …ink sections…
 *
 * As this seam crosses the viewport it crossfades the dark layer's opacity 0→1,
 * so the single shared background flips light→dark transparently across the seam
 * (the sections themselves stay transparent and only carry tone via `surface`).
 * Same crossfade mechanism as the canvas-bg tone-flip, minus the bespoke flying
 * heading — no new gradient CSS, just animates the existing `--lobes-dark` layer.
 * Client-side, scoped, auto-cleaned, prefers-reduced-motion aware.
 */
export function ZoneToneFlip() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const seam = ref.current;
      const zone = seam?.closest<HTMLElement>(".ds-zone");
      const darkBg = zone?.querySelector<HTMLElement>(".ds-canvas__bg--lobes-dark");
      if (!seam || !darkBg) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(darkBg, { opacity: 1 });
        return;
      }

      const tween = gsap.fromTo(
        darkBg,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: seam,
            start: "top 72%",
            end: "top 28%",
            scrub: true,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(darkBg, { clearProps: "opacity" });
      };
    },
    { scope: ref },
  );

  return <div ref={ref} className="ds-zone__flip-seam" aria-hidden="true" />;
}
