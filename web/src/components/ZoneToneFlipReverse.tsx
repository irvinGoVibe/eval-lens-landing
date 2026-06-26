"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reverse through-background tone-flip seam — flips a `.ds-zone` from DARK back to
 * LIGHT, passing THROUGH the brand bridge ("third colour", no dirty grey). Drop it
 * at the dark→light boundary of a zone whose layer stack is:
 *   <div class="ds-zone__bg … ds-canvas__bg--lobes" />            ← light base
 *   <div class="ds-zone__bg … ds-canvas__bg--lobes-dark"> …sparks… </div>  ← dark (driven elsewhere)
 *   <div class="ds-zone__bg … ds-canvas__bg--lobes ds-relight" />          ← RE-LIGHT, opacity:0
 *   <div class="ds-flip-bridge" /> <div class="ds-flip-bridge__glow" />     ← brand bloom, opacity:0
 *
 * It does NOT touch the dark layer (that one is faded IN by the forward flip and
 * stays put). Instead it fades the RE-LIGHT layer 0→1 — covering the dark again so
 * the zone ends light — while the bridge + glow BLOOM up and recede at the midpoint
 * (dark → brand colour → light, no grey). Because the two flips drive DIFFERENT
 * layers, they never fight over one opacity, and one continuous zone means no gap
 * or leftover strip between them. Client-side, scoped, cleaned, reduced-motion aware.
 */
export function ZoneToneFlipReverse() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const seam = ref.current;
      const zone = seam?.closest<HTMLElement>(".ds-zone");
      if (!seam || !zone) return;
      const relight = zone.querySelector<HTMLElement>(".ds-relight");
      const bridge = zone.querySelector<HTMLElement>(".ds-flip-bridge");
      const glow = zone.querySelector<HTMLElement>(".ds-flip-bridge__glow");
      if (!relight) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // settle straight into the LIGHT end state — light sections stay legible
        gsap.set(relight, { opacity: 1 });
        if (bridge) gsap.set(bridge, { opacity: 0 });
        if (glow) gsap.set(glow, { opacity: 0 });
        return;
      }

      // Switch the light IN PLACE — not tied to scroll position, no auto-scroll.
      // The dark→light crossfade (with the brand bloom) is a timed timeline that
      // plays when the seam crosses the viewport line: cross down → re-light over
      // ~1s while the page barely moves; cross back up → reverse. No scrub, so no
      // extra travel is needed to "finish" the flip.
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: seam,
          start: "top 50%", // single line at the viewport centre
          toggleActions: "play none none reverse",
        },
      });

      // dark → light: the re-light layer rises across the whole window
      tl.fromTo(relight, { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
      // brand BRIDGE blooms up then recedes → colour, no grey. Quick in, quick
      // out, but HOLD the violet peak through the centre (in ends ~0.36, out
      // starts ~0.64 → ~0.28 of full-colour dwell).
      if (bridge) {
        tl.fromTo(bridge, { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.18)
          .to(bridge, { opacity: 0, duration: 0.18 }, 0.64);
      }
      if (glow) {
        tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.18)
          .to(glow, { opacity: 0, duration: 0.18 }, 0.64);
      }

      // Whole re-light + bloom plays in ~0.3s (timeline totals ~1s → ×3.3).
      tl.timeScale(3.3);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([relight, bridge, glow].filter(Boolean) as HTMLElement[], {
          clearProps: "opacity",
        });
      };
    },
    { scope: ref },
  );

  return <div ref={ref} className="ds-zone__flip-seam" aria-hidden="true" />;
}
