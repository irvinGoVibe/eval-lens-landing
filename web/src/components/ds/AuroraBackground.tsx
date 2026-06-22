import type { CSSProperties } from "react";

export type AuroraVariant =
  | "dark-violet" // violet + lavender — the reference look
  | "dark-violet-deep" // same story, darker base, deeper into black
  | "dark-cyan" // violet with a cool cyan glow
  | "dark-blue" // royal-blue dominant, violet anchor
  | "dark-indigo" // deep indigo, very dark
  | "dark-pink" // violet + rose/pink
  | "dark-magenta" // violet → orchid → pink
  | "dark-mixed" // violet, lavender, cyan + a touch of aqua
  | "dark-nebula" // rich violet + blue + pink edge
  | "dark-midnight" // darkest — mostly black, one restrained pool
  | "dark-rose" // rose/pink rising into a rose-black base
  | "dark-fuchsia" // bold fuchsia + violet
  | "dark-void" // near-pure black, one intense violet point
  | "dark-plum" // deep plum into black
  | "dark-twilight" // blue → violet → pink band
  | "dark-ember-rose"; // strong pink corner glow into deep black
export type AuroraIntensity = "subtle" | "default" | "vivid";

export type AuroraBackgroundProps = {
  /** Colour story. violet/lavender dominate; cyan/aqua are used sparingly. */
  variant?: AuroraVariant;
  /** Glow strength. */
  intensity?: AuroraIntensity;
  /** Slow 18–30s drift of the light pools. Auto-disabled under reduced-motion. */
  animated?: boolean;
  /** Extra classes (e.g. Tailwind `rounded-3xl` to clip to a card). */
  className?: string;
  style?: CSSProperties;
};

/**
 * AuroraBackground — premium dark gradient backdrop for EvalLense surfaces.
 *
 * A drop-in, decorative layer (`aria-hidden`, `pointer-events-none`) that fills
 * its positioned parent — it does NOT change a section's structure. Usage:
 *
 *     <section className="relative isolate">
 *       <AuroraBackground variant="dark-violet" intensity="default" />
 *       <div className="relative">…white text…</div>
 *     </section>
 *
 * Architecture (all pure CSS, no raster, no inline gradients):
 *   - the root paints the deep vertical base (#171A32 → #080A14) and owns the
 *     palette/intensity tokens (set via `data-variant` / `data-intensity`);
 *   - four large `filter: blur()` light pools (`__bloom`) read as defocused
 *     light through frosted glass — lavender + violet dominate the top third,
 *     a cool blue/cyan pool sits mid-left, a deep-violet pool sits mid-right;
 *   - `__floor` keeps the bottom ~38% near-black so white text stays legible;
 *   - `__noise` is a ≤2% SVG-turbulence grain (data-URI, no external file) that
 *     dithers away any banding.
 * The blooms drift on `transform` only (18–30s, ≤4%, seamless ping-pong); the
 * blur itself is never animated. Everything stops at `prefers-reduced-motion`.
 */
export function AuroraBackground({
  variant = "dark-violet",
  intensity = "default",
  animated = true,
  className,
  style,
}: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      data-variant={variant}
      data-intensity={intensity}
      data-animated={animated ? "on" : "off"}
      style={style}
      className={`ds-aurora pointer-events-none absolute inset-0 overflow-hidden${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="ds-aurora__bloom ds-aurora__bloom--lavender" />
      <div className="ds-aurora__bloom ds-aurora__bloom--violet" />
      <div className="ds-aurora__bloom ds-aurora__bloom--cool" />
      <div className="ds-aurora__bloom ds-aurora__bloom--accent" />
      <div className="ds-aurora__floor" />
      <div className="ds-aurora__noise" />
    </div>
  );
}
