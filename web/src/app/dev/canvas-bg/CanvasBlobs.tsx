"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Floating background blobs for the canvas demo — big organic PNG orbs.
 *
 * Layout: absolutely positioned DOWN the page. The first screen (hero) carries a
 * CLUSTER of several; every screen after it gets ONE blob peeking in from a side
 * (alternating). Motion is TWO layers that compose:
 *   • idle drift — a gentle autonomous loop (x/y/rotation), runs forever even
 *     with no scroll.
 *   • scroll parallax — `yPercent` scrubbed to page scroll, so they also drift
 *     as you scroll (different per blob → depth).
 * GSAP sums `y` (idle) + `yPercent` (parallax) so both run on one element.
 * Decorative (aria-hidden), behind content, above the gradient. useGSAP cleans up.
 */
const BLOBS = [
  // ── hero cluster (first screen) ── d: idle drift · px/py: scroll-parallax travel (% of own size)
  { src: "/assets/backgrounds/blobs/blob_four_lobes.png", cls: "ds-blob ds-blob--a", d: { x: 28, y: 24, r: 7, dur: 11 }, px: 30, py: 120 },
  { src: "/assets/backgrounds/blobs/sphere_large.png", cls: "ds-blob ds-blob--b", d: { x: -32, y: 26, r: -6, dur: 13 }, px: -40, py: 150 },
  { src: "/assets/backgrounds/blobs/blob_irregular.png", cls: "ds-blob ds-blob--c", d: { x: 24, y: 30, r: 9, dur: 9 }, px: 55, py: -90 },
  { src: "/assets/backgrounds/blobs/sphere_small.png", cls: "ds-blob ds-blob--d", d: { x: -22, y: 28, r: 12, dur: 8 }, px: -70, py: 180 },
  // ── one peeking blob per following screen (alternating sides) ──
  { src: "/assets/backgrounds/blobs/sphere_large.png", cls: "ds-blob ds-blob--e", d: { x: -26, y: 22, r: 5, dur: 12 }, px: 80, py: 170 },
  { src: "/assets/backgrounds/blobs/blob_four_lobes.png", cls: "ds-blob ds-blob--f", d: { x: 30, y: 26, r: -8, dur: 14 }, px: -90, py: -110 },
  { src: "/assets/backgrounds/blobs/blob_irregular.png", cls: "ds-blob ds-blob--g", d: { x: -28, y: 24, r: 7, dur: 10 }, px: 75, py: 165 },
  { src: "/assets/backgrounds/blobs/sphere_large.png", cls: "ds-blob ds-blob--h", d: { x: 26, y: 28, r: -6, dur: 13 }, px: -80, py: 175 },
  // ── behind the Horizontal Gallery card lane (refract through the glass cards) ──
  { src: "/assets/backgrounds/blobs/sphere_large.png", cls: "ds-blob ds-blob--i", d: { x: 22, y: 24, r: 5, dur: 12 }, px: 30, py: 60 },
  { src: "/assets/backgrounds/blobs/blob_irregular.png", cls: "ds-blob ds-blob--j", d: { x: -24, y: 22, r: -7, dur: 11 }, px: -34, py: 70 },
];

export function CanvasBlobs() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".ds-blob");
      els.forEach((el, i) => {
        const cfg = BLOBS[i];
        if (!cfg) return;
        // 1) autonomous idle drift — forever, no scroll needed
        gsap.to(el, {
          x: cfg.d.x,
          y: cfg.d.y,
          rotation: cfg.d.r,
          duration: cfg.d.dur,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: -i * 1.3,
        });
        // 2) scroll travel — from the BASE position (so at scroll 0 each blob sits
        //    exactly where the CSS puts it = the reference layout) drifting to
        //    (px,py) across the page scroll. Separate props (xPercent/yPercent)
        //    from the idle x/y, so GSAP sums them. Most py are positive → down.
        gsap.fromTo(
          el,
          { xPercent: 0, yPercent: 0 },
          {
            xPercent: cfg.px,
            yPercent: cfg.py,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div className="ds-canvas__blobs" ref={root} aria-hidden="true">
      {BLOBS.map((b, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={b.src} alt="" className={b.cls} />
      ))}
    </div>
  );
}
