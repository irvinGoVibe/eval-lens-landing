"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type BlobCfg, BLOB_DIR, LETTERS, initBlobLayer, nextZoneId } from "@/components/ds/blobKit";
import { BlobInspector } from "@/components/ds/BlobInspector";

/**
 * Floating background blobs for a `.ds-zone` — the production-grade driver for the
 * big organic PNG orbs. Render it INSIDE a zone, right after the `.ds-zone__bg`
 * slot; the orbs drift behind the (transparent) zone sections and refract through
 * their glass.
 *
 * Geometry lives in the JS config below (applied inline via blobKit); the
 * `.ds-blob--*` rules in `ds.css` are only the no-flash first-paint default.
 * Two motion layers compose: idle drift (autonomous) + scroll parallax scoped to
 * **this zone** (parallax `mode: "zone"` → trigger = the nearest `.ds-zone`), so
 * a mid-page zone parallaxes as it passes through the viewport. Decorative
 * (aria-hidden), behind content, above the gradient. useGSAP cleans up.
 *
 * A trimmed 6-orb set (hero cluster + two side peekers) — sized for a few-section
 * zone; the full 10-orb page layout would scatter orbs far below a short zone.
 *
 * Registers with the blobKit registry, so adding `?blobs` to any page URL surfaces
 * the shared `BlobInspector` (mounted here, self-gated) to tune these orbs live.
 */
const BLOBS: BlobCfg[] = [
  { src: BLOB_DIR + "blob_four_lobes.png", anchor: "left", ax: -38, top: 42, w: 114, cap: 1560, op: 0.72, d: { x: 28, y: 24, r: 7, dur: 11 }, px: 30, py: 120 },
  { src: BLOB_DIR + "sphere_large.png", anchor: "right", ax: -22, top: 16, w: 99, cap: 1350, op: 0.72, d: { x: -32, y: 26, r: -6, dur: 13 }, px: -40, py: 150 },
  { src: BLOB_DIR + "blob_irregular.png", anchor: "left", ax: 44, top: 64, w: 63, cap: 870, op: 0.72, d: { x: 24, y: 30, r: 9, dur: 9 }, px: 55, py: -90 },
  { src: BLOB_DIR + "sphere_small.png", anchor: "left", ax: 38, top: -2, w: 36, cap: 495, op: 0.72, d: { x: -22, y: 28, r: 12, dur: 8 }, px: -70, py: 180 },
  { src: BLOB_DIR + "sphere_large.png", anchor: "right", ax: -28, top: 128, w: 72, cap: 990, op: 0.72, d: { x: -26, y: 22, r: 5, dur: 12 }, px: 80, py: 170 },
  { src: BLOB_DIR + "blob_four_lobes.png", anchor: "left", ax: -32, top: 246, w: 78, cap: 1080, op: 0.72, d: { x: 30, y: 26, r: -8, dur: 14 }, px: -90, py: -110 },
];

/**
 * @param top    Optional CSS `top` for the blobs layer (overrides the default
 *   `inset:0`). Use it to place a SECOND cluster lower down a tall zone (e.g.
 *   `top="57%"`) so the lower sections get orbs too — one layer's orbs only span
 *   ~the first 2.5 viewports from its own top.
 * @param bottom Optional CSS `bottom`. Together with `top` it CLIPS the layer to a
 *   band (the wrap is `overflow:hidden`), so orbs — and their scroll drift — stay
 *   off neighbouring sections (e.g. a dark block the orbs must not cover).
 * @param label  Optional human label for the inspector's zone picker.
 */
export function ZoneBlobs({ top, bottom, label }: { top?: string; bottom?: string; label?: string } = {}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const zone = root.current?.closest<HTMLElement>(".ds-zone") ?? root.current;
      const els = gsap.utils.toArray<HTMLElement>(".ds-blob", root.current);
      const unregister = initBlobLayer({
        id: nextZoneId("zone"),
        label: label ?? "zone",
        els,
        blobs: BLOBS,
        trigger: zone ?? document.body,
        mode: "zone",
      });
      return unregister;
    },
    { scope: root },
  );

  return (
    <>
      <div
        className="ds-canvas__blobs"
        ref={root}
        aria-hidden="true"
        style={top || bottom ? { top, bottom } : undefined}
      >
        {BLOBS.map((b, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={b.src} alt="" className={`ds-blob ds-blob--${LETTERS[i]}`} />
        ))}
      </div>
      {/* self-gated: invisible unless the URL carries ?blobs */}
      <BlobInspector />
    </>
  );
}
