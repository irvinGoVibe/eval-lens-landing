"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/scroll-bus";

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
 * Client-side, scoped, auto-cleaned, prefers-reduced-motion aware. gsap is
 * dynamic-imported inside the effect (kept out of the initial JS chunk);
 * everything created runs inside a gsap.context reverted on unmount.
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

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    let innerCleanup: (() => void) | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      ctx = gsap.context(() => {
        const seam = ref.current;
        const zone = seam?.closest<HTMLElement>(".ds-zone");
        const darkBg = zone?.querySelector<HTMLElement>(targetSelector);
        if (!seam || !darkBg) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          // Reduced motion removes the crossfade, not the tonal boundary. Keep
          // the layer derived from the seam position so pages with multiple
          // flips do not settle every stacked background into its final state.
          const sync = () => {
            const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
            gsap.set(darkBg, {
              opacity: seam.getBoundingClientRect().top <= viewportHeight / 2 ? 1 : 0,
            });
          };
          sync();
          const unsubscribeScroll = onScrollFrame(sync);
          innerCleanup = () => {
            unsubscribeScroll();
            gsap.set(darkBg, { clearProps: "opacity" });
          };
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

        innerCleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(darkBg, { clearProps: "opacity" });
        };
      }, ref);
    })();

    return () => {
      cancelled = true;
      innerCleanup?.();
      ctx?.revert();
    };
  }, [targetSelector]);

  return <div ref={ref} className="ds-zone__flip-seam" aria-hidden="true" />;
}
