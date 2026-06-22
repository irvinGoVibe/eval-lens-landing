/**
 * /gradient-library — preset registry types.
 *
 * Every background preset describes itself fully (metadata for the card) and
 * carries a `css(selector)` builder so the *rendered* layer and the *copied*
 * snippet come from one source of truth (requirement: copied code === preview).
 *
 * The builder receives the selector it should target (e.g. `.dark-cinematic`
 * for copy, or the scoped runtime selector for injection) and returns a full
 * CSS string — including any `::before` / `::after` layers and `@keyframes`
 * (keyframe names are namespaced per-preset so injecting them all is safe).
 */

export type Category =
  | "static"
  | "animated"
  | "scroll"
  | "mesh"
  | "aurora"
  | "radial"
  | "pattern"
  | "noise"
  | "combined"
  | "experimental";

export type Theme = "light" | "dark" | "both";
export type Technique = "css" | "svg" | "canvas" | "webgl";
export type Performance = "low" | "medium" | "high";
export type ReducedMotion = "static" | "simplified" | "disabled";
export type AnimationType =
  | "none"
  | "drift"
  | "breathe"
  | "rotate"
  | "pointer"
  | "scroll";

/** Which interactive controls a preset actually responds to. */
export type ControlKey =
  | "intensity"
  | "speed"
  | "scale"
  | "opacity"
  | "blur"
  | "noise"
  | "density"
  | "pointer"
  | "scroll";

export type BackgroundPreset = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  /** Extra filter chips this preset answers to (Lines, Grid, Dots, Masks…). */
  tags: string[];
  theme: Theme;
  technique: Technique;
  performance: Performance;
  animation: AnimationType;
  reducedMotion: ReducedMotion;
  /** One-line description shown on the card. No lorem. */
  description: string;
  /** Short note on browser support / caveats. */
  browser: string;
  /** Recommended section homes (Hero, Bento, Gallery, Report, CTA). */
  recommendedFor: string[];
  /** Controls this preset reacts to — drives the slider panel. */
  controls: ControlKey[];
  /** Default control values (CSS custom-property space). */
  defaults: Partial<Record<ControlKey, number>> & { speed?: number };
  /** Builds the full CSS for `selector`. Single source for render + copy. */
  css: (selector: string) => string;
};

/** Stable CSS-var defaults shared by all presets. */
export const CONTROL_DEFAULTS: Record<ControlKey, number> & { speed: number } = {
  intensity: 1,
  speed: 18,
  scale: 1,
  opacity: 1,
  blur: 0,
  noise: 0,
  density: 1,
  pointer: 1,
  scroll: 0,
};

/** Human label + range metadata for the controls UI. */
export const CONTROL_META: Record<
  ControlKey,
  { label: string; min: number; max: number; step: number; unit?: string }
> = {
  intensity: { label: "Intensity", min: 0, max: 1.4, step: 0.02 },
  speed: { label: "Speed", min: 4, max: 60, step: 1, unit: "s" },
  scale: { label: "Scale", min: 0.4, max: 3, step: 0.05, unit: "×" },
  opacity: { label: "Opacity", min: 0, max: 1, step: 0.01 },
  blur: { label: "Blur", min: 0, max: 24, step: 1, unit: "px" },
  noise: { label: "Noise", min: 0, max: 0.5, step: 0.01 },
  density: { label: "Pattern density", min: 0.3, max: 3, step: 0.05, unit: "×" },
  pointer: { label: "Pointer response", min: 0, max: 1.6, step: 0.05 },
  scroll: { label: "Scroll response", min: 0, max: 1, step: 0.01 },
};

/** Generate the copyable React config string for a preset. */
export function presetConfig(p: BackgroundPreset): string {
  return `const backgroundPreset = {
  name: ${JSON.stringify(p.name)},
  preset: ${JSON.stringify(p.id)},
  className: ${JSON.stringify(p.slug)},
  category: ${JSON.stringify(p.category)},
  theme: ${JSON.stringify(p.theme)},
  technique: ${JSON.stringify(p.technique)},
  performance: ${JSON.stringify(p.performance)},
  motion: ${JSON.stringify(p.animation)},
  reducedMotion: ${JSON.stringify(p.reducedMotion)},
};`;
}

/** Generate the copyable JSX usage string for a preset. */
export function presetUsage(p: BackgroundPreset): string {
  return `<GradientBackground preset="${p.id}"${
    p.theme !== "both" ? ` theme="${p.theme}"` : ""
  }>
  {children}
</GradientBackground>`;
}
