"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type BlobCfg, BLOB_DIR, LETTERS, initBlobLayer, nextZoneId } from "@/components/ds/blobKit";

/**
 * Floating background blobs for the canvas demo — big organic PNG orbs.
 *
 * Layout: absolutely positioned DOWN the page. The first screen (hero) carries a
 * CLUSTER of several; every screen after it gets ONE blob peeking in from a side
 * (alternating). Two motion layers compose (idle drift + scroll parallax) — see
 * `blobKit`. Geometry lives in the JS config below (applied inline); the
 * `.ds-blob--*` CSS classes are only the no-flash first-paint default.
 * Decorative (aria-hidden), behind content, above the gradient.
 *
 * Registers with the blobKit registry so the shared `BlobInspector` can tune it.
 * Parallax is `page`-mode here (whole-document scroll) — the dev bench is one
 * long page; prod ZoneBlobs uses `zone`-mode instead.
 */
const BLOBS: BlobCfg[] = [
  // ── hero cluster (first screen) ──
  { src: BLOB_DIR + "blob_four_lobes.png", anchor: "left", ax: -38, top: 42, w: 114, cap: 1560, op: 0.72, d: { x: 28, y: 24, r: 7, dur: 11 }, px: 30, py: 120 },
  { src: BLOB_DIR + "sphere_large.png", anchor: "right", ax: -22, top: 16, w: 99, cap: 1350, op: 0.72, d: { x: -32, y: 26, r: -6, dur: 13 }, px: -40, py: 150 },
  { src: BLOB_DIR + "blob_irregular.png", anchor: "left", ax: 44, top: 64, w: 63, cap: 870, op: 0.72, d: { x: 24, y: 30, r: 9, dur: 9 }, px: 55, py: -90 },
  { src: BLOB_DIR + "sphere_small.png", anchor: "left", ax: 38, top: -2, w: 36, cap: 495, op: 0.72, d: { x: -22, y: 28, r: 12, dur: 8 }, px: -70, py: 180 },
  // ── one peeking blob per following screen (alternating sides) ──
  { src: BLOB_DIR + "sphere_large.png", anchor: "right", ax: -28, top: 128, w: 72, cap: 990, op: 0.72, d: { x: -26, y: 22, r: 5, dur: 12 }, px: 80, py: 170 },
  { src: BLOB_DIR + "blob_four_lobes.png", anchor: "left", ax: -32, top: 246, w: 78, cap: 1080, op: 0.72, d: { x: 30, y: 26, r: -8, dur: 14 }, px: -90, py: -110 },
  { src: BLOB_DIR + "blob_irregular.png", anchor: "right", ax: -26, top: 364, w: 66, cap: 900, op: 0.72, d: { x: -28, y: 24, r: 7, dur: 10 }, px: 75, py: 165 },
  { src: BLOB_DIR + "sphere_large.png", anchor: "left", ax: -28, top: 482, w: 72, cap: 990, op: 0.72, d: { x: 26, y: 28, r: -6, dur: 13 }, px: -80, py: 175 },
  // ── behind the Horizontal Gallery card lane (~465vh) so they refract through the cards ──
  { src: BLOB_DIR + "sphere_large.png", anchor: "left", ax: 4, top: 462, w: 56, cap: 760, op: 0.72, d: { x: 22, y: 24, r: 5, dur: 12 }, px: 30, py: 60 },
  { src: BLOB_DIR + "blob_irregular.png", anchor: "right", ax: 2, top: 470, w: 46, cap: 640, op: 0.72, d: { x: -24, y: 22, r: -7, dur: 11 }, px: -34, py: 70 },
];

export function CanvasBlobs() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".ds-blob", root.current);
      const unregister = initBlobLayer({
        id: nextZoneId("canvas-bg"),
        label: "canvas-bg (page)",
        els,
        blobs: BLOBS,
        trigger: document.body,
        mode: "page",
      });
      return unregister;
    },
    { scope: root },
  );

  return (
    <div className="ds-canvas__blobs" ref={root} aria-hidden="true">
      {BLOBS.map((b, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={b.src} alt="" className={`ds-blob ds-blob--${LETTERS[i]}`} />
      ))}
    </div>
  );
}
