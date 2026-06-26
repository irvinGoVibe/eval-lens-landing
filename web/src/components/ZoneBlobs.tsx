"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Floating background blobs for a `.ds-zone` — the production-grade driver for the
 * big organic PNG orbs (CSS lives in `components/ds/ds.css`: `.ds-canvas__blobs`
 * + `.ds-blob--*`). Render it INSIDE a zone, right after the `.ds-zone__bg` slot;
 * the orbs drift behind the (transparent) zone sections and refract through their
 * glass.
 *
 * Adapted from `app/dev/canvas-bg/CanvasBlobs.tsx`, with one key difference: the
 * scroll parallax is scoped to **this zone** (trigger = the nearest `.ds-zone`),
 * not `document.body` — so a mid-page zone parallaxes as it passes through the
 * viewport instead of off the whole-page scroll. Two motion layers compose:
 *   • idle drift  — gentle autonomous loop (runs forever, no scroll needed),
 *   • scroll parallax — `yPercent` scrubbed to the zone's pass through viewport.
 * Decorative (aria-hidden), behind content, above the gradient. useGSAP cleans up.
 *
 * A trimmed 6-orb set (hero cluster + two side peekers) — sized for a few-section
 * zone; the full 10-orb page layout would scatter orbs far below a short zone.
 */
const BLOBS = [
  { src: "/assets/backgrounds/blobs/blob_four_lobes.png", cls: "ds-blob ds-blob--a", d: { x: 28, y: 24, r: 7, dur: 11 }, px: 30, py: 120 },
  { src: "/assets/backgrounds/blobs/sphere_large.png", cls: "ds-blob ds-blob--b", d: { x: -32, y: 26, r: -6, dur: 13 }, px: -40, py: 150 },
  { src: "/assets/backgrounds/blobs/blob_irregular.png", cls: "ds-blob ds-blob--c", d: { x: 24, y: 30, r: 9, dur: 9 }, px: 55, py: -90 },
  { src: "/assets/backgrounds/blobs/sphere_small.png", cls: "ds-blob ds-blob--d", d: { x: -22, y: 28, r: 12, dur: 8 }, px: -70, py: 180 },
  { src: "/assets/backgrounds/blobs/sphere_large.png", cls: "ds-blob ds-blob--e", d: { x: -26, y: 22, r: 5, dur: 12 }, px: 80, py: 170 },
  { src: "/assets/backgrounds/blobs/blob_four_lobes.png", cls: "ds-blob ds-blob--f", d: { x: 30, y: 26, r: -8, dur: 14 }, px: -90, py: -110 },
];

export function ZoneBlobs() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const zone = root.current?.closest<HTMLElement>(".ds-zone") ?? root.current;
      const els = gsap.utils.toArray<HTMLElement>(".ds-blob", root.current);
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
        // 2) scroll travel — scoped to this zone's pass through the viewport, so a
        //    mid-page zone parallaxes locally (not off whole-page scroll).
        gsap.fromTo(
          el,
          { xPercent: 0, yPercent: 0 },
          {
            xPercent: cfg.px,
            yPercent: cfg.py,
            ease: "none",
            scrollTrigger: {
              trigger: zone,
              start: "top bottom",
              end: "bottom top",
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
