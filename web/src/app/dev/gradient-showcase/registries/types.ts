/**
 * /gradient-showcase — preset registry types.
 *
 * Every preset describes itself (metadata for the preview header) and carries a
 * `css(selector)` builder, so the *rendered* background layer and the *copied*
 * CSS snippet come from one single source of truth (requirement: copied CSS ===
 * the preset you see).
 *
 * The builder receives the selector it should target (the runtime scoped class
 * for injection, or a clean `.gradient-showcase` for the copy button) and
 * returns a full CSS string — including `::before` / `::after` layers and any
 * `@keyframes`. Keyframe names are namespaced per-preset (`gsc-<id>-*`) so the
 * whole catalog can be concatenated into one stylesheet without collisions.
 *
 * Runtime custom properties the components may set on the background element:
 *   --gsc-play    running | paused   (pause/play toggle, reduced-motion)
 *   --gsc-scroll  0 → 1              (scroll-driven progress)
 *   --gsc-px      0 → 1              (pointer X, pointer-reactive presets)
 *   --gsc-py      0 → 1              (pointer Y)
 *   --gsc-mask    <mask-image>       (pattern fade variant)
 */

export type ShowcaseCategory =
  | "light"
  | "dark"
  | "dynamic"
  | "scroll"
  | "pattern"
  | "combined"
  | "vivid";

export type Theme = "light" | "dark";
export type Technique = "css" | "svg";
export type Performance = "low" | "medium" | "high";
export type ReducedMotion = "static" | "simplified";

/** What kind of runtime wiring the background element needs. */
export type Motion = "none" | "drift" | "breathe" | "rotate" | "pointer" | "scroll";

export type ShowcasePreset = {
  id: string;
  /** Display name shown in the preview header. */
  name: string;
  /** Short technical label, e.g. "radial-gradient · CSS-only". */
  label: string;
  category: ShowcaseCategory;
  theme: Theme;
  technique: Technique;
  performance: Performance;
  /** True when the preset is pure CSS (no SVG / JS paint). */
  cssOnly: boolean;
  motion: Motion;
  /** True for the one pointer-reactive preset. */
  pointer?: boolean;
  reducedMotion: ReducedMotion;
  /** Test heading rendered over the background. */
  heading: string;
  /** Short test paragraph rendered over the background. */
  body: string;
  /** Builds the full CSS for `selector`. Single source for render + copy. */
  css: (selector: string) => string;
};

/** True if a preset animates on a timer (so a Pause/Play control is meaningful). */
export function hasTimedMotion(p: ShowcasePreset): boolean {
  return p.motion === "drift" || p.motion === "breathe" || p.motion === "rotate";
}
