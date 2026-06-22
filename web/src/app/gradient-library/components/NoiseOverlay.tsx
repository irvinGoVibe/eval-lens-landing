"use client";

/**
 * Static SVG-turbulence grain, layered above a background. The SVG is a single
 * data-URI (no per-frame work), so it stays performance: low even though the
 * technique is `svg`. Driven by the `noise` control (0 = hidden).
 */
const NOISE_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

export function NoiseOverlay({ opacity }: { opacity: number }) {
  if (!opacity) return null;
  return (
    <div
      className="gl-noise"
      aria-hidden="true"
      style={{
        backgroundImage: `url("${NOISE_URI}")`,
        opacity,
      }}
    />
  );
}
