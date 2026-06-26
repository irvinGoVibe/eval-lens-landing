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
export function ZoneToneFlip({
  targetSelector = ".ds-canvas__bg--lobes-dark",
}: {
  /** Which dark layer to fade in. Defaults to the zone's `--lobes-dark` base.
   *  Pass a more specific selector when a zone stacks MORE than one dark layer
   *  (e.g. a dark→light→dark arc whose second dark layer is marked `.ds-redark`),
   *  so this seam drives that layer instead of the first `--lobes-dark` match. */
  targetSelector?: string;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const seam = ref.current;
      const zone = seam?.closest<HTMLElement>(".ds-zone");
      const darkBg = zone?.querySelector<HTMLElement>(targetSelector);
      if (!seam || !darkBg) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(darkBg, { opacity: 1 });
        return;
      }

      // Switch the light IN PLACE — not tied to scroll position, no auto-scroll.
      // The crossfade is a timed tween that plays when the seam crosses the
      // viewport line: cross down → flip to dark over ~0.8s while the page barely
      // moves; cross back up → reverse. No scrub, so no extra travel is needed to
      // "finish" the flip — the light just switches to the next tone.
      const tween = gsap.fromTo(
        darkBg,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: seam,
            start: "top 50%", // single line at the viewport centre
            toggleActions: "play none none reverse",
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(darkBg, { clearProps: "opacity" });
      };
    },
    { scope: ref, dependencies: [targetSelector] },
  );

  return <div ref={ref} className="ds-zone__flip-seam" aria-hidden="true" />;
}
