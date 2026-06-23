import type { ReactNode } from "react";

/**
 * External wrapper around a DS-section. Adds an atmospheric gradient layer
 * behind the section and a scoped class hook — WITHOUT touching the section's
 * DOM, layout, order, spacing or text. All visual overrides live in
 * liquid-glass.css under `.liquid-glass-page` and target only colour/effects.
 *
 * The DS section is passed as `children` and rendered verbatim.
 */

export type GradientPreset =
  | "hero-dynamic"
  | "light-atmospheric"
  | "light-mesh"
  | "dark-cinematic"
  | "dark-cyan"
  | "dark-ink"
  | "dark-edge-glow"
  | "dark-test-grid"
  | "cta-focus";

export function LiquidSectionWrapper({
  gradient,
  theme,
  id,
  className,
  children,
}: {
  gradient: GradientPreset;
  /** matches the wrapped section's surface, for scoped text/border contrast */
  theme: "light" | "dark";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className={`lgx-wrap lgx-wrap--${theme}${className ? ` ${className}` : ""}`}
      data-gradient={gradient}
    >
      <div className={`lgx-bg lgx-bg--${gradient}`} aria-hidden />
      {children}
    </div>
  );
}
