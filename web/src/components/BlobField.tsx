/**
 * BlobField — reusable ambient glass-blob inject.
 *
 * Drop INSIDE a section that carries the `blob-host` class. The orbs sit at
 * `z-index:-1` (above the section fill, behind content), so they never fight a
 * sticky/pin scroll inside the host — unlike a `.ds-zone` wrap, which clips
 * (`overflow:clip`) and breaks sticky. Drift is CSS-only (see `.blob-field` in
 * globals.css); `prefers-reduced-motion` disables it. Decorative + aria-hidden.
 *
 * Pass `variant="b"` on alternating sections for a mirrored cluster so adjacent
 * blocks don't read identically.
 */
export function BlobField({ variant = "a" }: { variant?: "a" | "b" }) {
  return (
    <div
      className={`blob-field${variant === "b" ? " blob-field--b" : ""}`}
      aria-hidden="true"
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img className="bo-a" alt="" src="/assets/backgrounds/blobs/sphere_large.png" />
      <img className="bo-b" alt="" src="/assets/backgrounds/blobs/blob_four_lobes.png" />
      <img className="bo-c" alt="" src="/assets/backgrounds/blobs/sphere_small.png" />
      <img className="bo-d" alt="" src="/assets/backgrounds/blobs/blob_irregular.png" />
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}
