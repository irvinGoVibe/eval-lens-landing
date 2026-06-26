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

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: seam,
          start: "top 78%", // seam enters from low in the viewport
          end: "top 32%", // …flip is done before the first light section centres
          scrub: true,
        },
      });

      // dark → light: the re-light layer rises across the whole window
      tl.fromTo(relight, { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
      // brand BRIDGE blooms up then recedes around the midpoint → colour, no grey
      if (bridge) {
        tl.fromTo(bridge, { opacity: 0 }, { opacity: 1, duration: 0.42 }, 0.12)
          .to(bridge, { opacity: 0, duration: 0.42 }, 0.56);
      }
      if (glow) {
        tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.38 }, 0.16)
          .to(glow, { opacity: 0, duration: 0.42 }, 0.56);
      }

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
