/**
 * /dev/design-system — token catalog.
 *
 * Plain data extracted verbatim from `globals.css` `:root` (lines ~32–130).
 * This file is the single source for the showcase; it does NOT redefine any
 * token — every entry mirrors an existing CSS custom property so the showcase
 * stays a faithful mirror, not a second design system.
 */

export type Swatch = {
  /** Human label. */
  name: string;
  /** CSS custom property, e.g. `--violet`. */
  varName: string;
  /** Literal value as written in globals.css. */
  value: string;
  /** Optional one-line note on the token's job. */
  note?: string;
};

export type SwatchGroup = {
  id: string;
  title: string;
  blurb: string;
  /** When true the swatches read better on a dark backing. */
  dark?: boolean;
  swatches: Swatch[];
};

export const COLOR_GROUPS: SwatchGroup[] = [
  {
    id: "brand",
    title: "Brand · lens accents",
    blurb:
      "The EvalLense lens palette. Violet → lavender → cyan → aqua is the master brand gradient; used only as a controlled accent, never as a flat fill behind text.",
    swatches: [
      { name: "Violet", varName: "--violet", value: "#6c4cf1", note: "Primary brand accent" },
      { name: "Violet 2", varName: "--violet-2", value: "#7b5cf6", note: "Lighter violet step" },
      { name: "Lavender", varName: "--lavender", value: "#a99bff", note: "Lens mid · accent on dark" },
      { name: "Cyan", varName: "--cyan", value: "#2ec5e8" },
      { name: "Aqua", varName: "--aqua", value: "#36e0c2", note: "Lens terminal stop" },
      { name: "Tag tint", varName: "--tag-tint", value: "#cdbfff", note: "Soft chip/tag tint" },
    ],
  },
  {
    id: "neutral-light",
    title: "Neutral foundation · light",
    blurb: "Apple-style neutral base for light sections — backgrounds, ink text, hairline borders.",
    swatches: [
      { name: "Background", varName: "--bg", value: "#ffffff", note: "Pure white surface" },
      { name: "Background soft", varName: "--bg-soft", value: "#f5f5f7", note: "Soft section surface" },
      { name: "Foreground", varName: "--fg", value: "#1d1d1f", note: "Primary text on light" },
      { name: "Muted", varName: "--muted", value: "#6e6e73", note: "Secondary text on light" },
      { name: "Border", varName: "--border", value: "#d2d2d7" },
      { name: "Border 2", varName: "--border-2", value: "#e6e6ea", note: "Lighter divider" },
      { name: "Hairline", varName: "--hairline", value: "rgba(20,18,40,.07)", note: "Canonical hairline" },
    ],
  },
  {
    id: "dark-surface",
    title: "Dark surfaces & text",
    blurb: "Ink panels and the text tuned to sit on them. Borders are translucent white, never grey.",
    dark: true,
    swatches: [
      { name: "Ink / bg-ink", varName: "--ink", value: "#000000", note: "Black ink surface" },
      { name: "Panel", varName: "--panel", value: "#0a0a0d" },
      { name: "Panel 2", varName: "--panel-2", value: "#121218", note: "Raised dark panel" },
      { name: "FG on dark", varName: "--fg-on-dark", value: "#f5f5f7", note: "Primary text on ink" },
      { name: "Body on dark", varName: "--body-on-dark", value: "#d8d8de" },
      { name: "Muted on dark", varName: "--muted-on-dark", value: "#a9a9b2" },
      { name: "FG secondary dark", varName: "--fg-secondary-dark", value: "#d0ccf4", note: "Violet-tinted body (Ink Refined)" },
      { name: "Border on dark", varName: "--border-on-dark", value: "rgba(255,255,255,.12)" },
      { name: "Border on dark 2", varName: "--border-on-dark-2", value: "rgba(255,255,255,.07)" },
    ],
  },
  {
    id: "nebula",
    title: "Nebula Deep · dark theme",
    blurb: "Registered dark theme (Nebula Deep) — a tonal violet base, never a flat near-black.",
    dark: true,
    swatches: [
      { name: "Nebula base", varName: "--nebula-base", value: "#0a0509" },
      { name: "Nebula layer 1", varName: "--nebula-layer1", value: "#0f0b1c" },
      { name: "Nebula layer 2", varName: "--nebula-layer2", value: "#1a1530" },
      { name: "Nebula FG", varName: "--nebula-fg", value: "#f0eeff" },
      { name: "Nebula FG 2", varName: "--nebula-fg-2", value: "#c8c4f0" },
      { name: "Nebula FG muted", varName: "--nebula-fg-muted", value: "#9896b8" },
    ],
  },
  {
    id: "semantic",
    title: "Semantic colors",
    blurb: "One job each, never decorative. Green = ready/approved, amber = attention/incomplete.",
    swatches: [
      { name: "Green", varName: "--green", value: "#1aa37a", note: "Ready / approved" },
      { name: "Amber", varName: "--amber", value: "#e8943a", note: "Attention / incomplete" },
      { name: "Amber ink", varName: "--amber-ink", value: "#8a5414", note: "Readable text pair for amber" },
      { name: "Green on dark", varName: "--green-on-dark", value: "#5fe0bf" },
      { name: "Amber on dark", varName: "--amber-on-dark", value: "#f0a95a" },
    ],
  },
  {
    id: "orange",
    title: "Warm orange glow",
    blurb: "Claude-style warm bridge used after section 2 / on tone-flip moments.",
    swatches: [
      { name: "Orange hot", varName: "--orange-hot", value: "#ff6a2e" },
      { name: "Orange core", varName: "--orange-core", value: "#ff8f4f" },
      { name: "Orange soft", varName: "--orange-soft", value: "#ffb27a" },
      { name: "Orange deep", varName: "--orange-deep", value: "#1a0c06", note: "Dark warm backing" },
      { name: "Orange warm", varName: "--orange-warm", value: "#fff6f0", note: "Warm off-white" },
    ],
  },
];

export type GradientToken = {
  name: string;
  varName: string;
  /** The literal `linear-gradient(...)` written in globals.css. */
  css: string;
  angle: string;
  stops: string[];
  usage: string;
  /** Where the gradient reads well. */
  compat: "light" | "dark" | "both";
};

export const GRADIENTS: GradientToken[] = [
  {
    name: "Lens (master)",
    varName: "--lens",
    css: "linear-gradient(118deg, #6c4cf1 0%, #a99bff 32%, #2ec5e8 68%, #36e0c2 100%)",
    angle: "118°",
    stops: ["#6c4cf1", "#a99bff", "#2ec5e8", "#36e0c2"],
    usage: "Accent words, eyebrow dot, thin rules, focus highlights",
    compat: "both",
  },
  {
    name: "Lens soft",
    varName: "--lens-soft",
    css: "linear-gradient(118deg, color-mix(in oklab, #6c4cf1 22%, transparent), color-mix(in oklab, #2ec5e8 18%, transparent) 60%, color-mix(in oklab, #36e0c2 20%, transparent))",
    angle: "118°",
    stops: ["#6c4cf1 22%", "#2ec5e8 18%", "#36e0c2 20%"],
    usage: "Low-glare tints behind light cards (lens-soft surfaces)",
    compat: "light",
  },
  {
    name: "Lens deep",
    varName: "--lens-deep",
    css: "linear-gradient(135deg, #3a1d8f 0%, #1d8f7e 100%)",
    angle: "135°",
    stops: ["#3a1d8f", "#1d8f7e"],
    usage: "Low-glare fills on dark surfaces",
    compat: "dark",
  },
  {
    name: "Ink gradient",
    varName: "--ink-grad",
    css: "linear-gradient(160deg, #0a0a0d 0%, #1b1b26 100%)",
    angle: "160°",
    stops: ["#0a0a0d", "#1b1b26"],
    usage: "Dark panels & statement surfaces (tonal, not flat black)",
    compat: "dark",
  },
  {
    name: "CTA fill",
    varName: "--grad-cta",
    css: "linear-gradient(90deg, #9333ea 0%, #3b82f6 100%)",
    angle: "90°",
    stops: ["#9333ea", "#3b82f6"],
    usage: 'Filled "Publish now" CTA (reused from the ai-jury app)',
    compat: "both",
  },
  {
    name: "Fire",
    varName: "--fire",
    css: "linear-gradient(118deg, #ffe066 0%, #ffb27a 32%, #ff6a2e 68%, #ff3314 100%)",
    angle: "118°",
    stops: ["#ffe066", "#ffb27a", "#ff6a2e", "#ff3314"],
    usage: "Warm orange-glow bridge moments",
    compat: "both",
  },
];

export type ScaleToken = { name: string; varName: string; value: string; note: string };

export const RADII: ScaleToken[] = [
  { name: "xs", varName: "--r-xs", value: "8px", note: "Inputs, chips" },
  { name: "sm", varName: "--r-sm", value: "12px", note: "Buttons, controls" },
  { name: "md", varName: "--r-md", value: "18px", note: "Cards" },
  { name: "lg", varName: "--r-lg", value: "24px", note: "Windows, modals" },
  { name: "card", varName: "--radius-card", value: "22px", note: "Bento / feature tiles" },
  { name: "stage", varName: "--radius-stage", value: "28px", note: "Hero media stages" },
  { name: "pill", varName: "--r-pill", value: "980px", note: "Pills & chips" },
];

export const SHADOWS: ScaleToken[] = [
  { name: "sh-1", varName: "--sh-1", value: "0 1px 2px rgba(20,18,40,.04), 0 8px 24px -16px rgba(60,40,160,.20)", note: "Resting elevation" },
  { name: "sh-2", varName: "--sh-2", value: "0 2px 8px rgba(20,18,40,.05), 0 18px 40px -22px rgba(60,40,160,.26)", note: "Raised card" },
  { name: "sh-3", varName: "--sh-3", value: "0 4px 14px rgba(20,18,40,.06), 0 30px 70px -30px rgba(60,40,160,.32)", note: "Floating / hover" },
  { name: "shadow-soft", varName: "--shadow-soft", value: "0 2px 8px rgba(20,18,40,.05), 0 24px 60px -28px rgba(60,40,160,.22)", note: "Generic soft" },
];

/** Spacing scale — the recurring px values across sections. */
export const SPACING: number[] = [4, 8, 12, 16, 20, 24, 32, 48, 64, 84, 150];

export type TypeSpec = {
  name: string;
  sample: string;
  family: "display" | "ui" | "mono";
  /** CSS size as rendered in the specimen. */
  size: string;
  weight: number;
  leading: string;
  tracking: string;
};

export const TYPE_SPECS: TypeSpec[] = [
  { name: "Display", sample: "Evaluate every pitch through multiple perspectives.", family: "display", size: "clamp(40px, 6vw, 72px)", weight: 600, leading: "1.04", tracking: "-0.03em" },
  { name: "H1", sample: "See consensus. Understand conflict.", family: "display", size: "clamp(34px, 5vw, 56px)", weight: 600, leading: "1.06", tracking: "-0.025em" },
  { name: "H2", sample: "AI evaluation. Human final decision.", family: "display", size: "clamp(28px, 3.6vw, 40px)", weight: 600, leading: "1.1", tracking: "-0.02em" },
  { name: "H3", sample: "Make better calls, faster.", family: "display", size: "26px", weight: 600, leading: "1.16", tracking: "-0.01em" },
  { name: "H4", sample: "Judges agree on the strong signals.", family: "ui", size: "20px", weight: 600, leading: "1.25", tracking: "0" },
  { name: "Body large", sample: "Every pitch is read by a panel of independent judges, then reconciled into one decision.", family: "ui", size: "19px", weight: 400, leading: "1.5", tracking: "0" },
  { name: "Body", sample: "See consensus where the judges agree and conflict where they split — then you make the final call.", family: "ui", size: "17px", weight: 400, leading: "1.47", tracking: "0" },
  { name: "Small", sample: "AI prepares the analysis — a human decides.", family: "ui", size: "15px", weight: 400, leading: "1.45", tracking: "0" },
  { name: "Caption", sample: "Source · internal benchmark", family: "ui", size: "13px", weight: 400, leading: "1.4", tracking: "0" },
  { name: "Eyebrow", sample: "01 · Brand palette", family: "mono", size: "12px", weight: 500, leading: "1.2", tracking: "0.16em" },
  { name: "Mono", sample: "--lens: linear-gradient(118deg, …)", family: "mono", size: "13px", weight: 400, leading: "1.5", tracking: "0" },
];

export type MotionSpec = {
  name: string;
  duration: string;
  easing: string;
  trigger: string;
  reduced: string;
};

export const MOTION_SPECS: MotionSpec[] = [
  { name: "Reveal (up)", duration: "640ms", easing: "cubic-bezier(.22,.61,.36,1)", trigger: "data-reveal · in view (ScrollFX)", reduced: "Appears instantly, no transform" },
  { name: "Fade", duration: "480ms", easing: "ease", trigger: "data-reveal", reduced: "Opacity snaps to 1" },
  { name: "Stagger", duration: "640ms + 60ms/step", easing: "cubic-bezier(.22,.61,.36,1)", trigger: "data-reveal children", reduced: "All children visible at once" },
  { name: "Parallax", duration: "scroll-linked", easing: "linear", trigger: "data-scrub / parallaxY", reduced: "Frozen at neutral offset" },
  { name: "Gradient drift", duration: "18–30s loop", easing: "ease-in-out", trigger: "ambient (AuroraBackground)", reduced: "Drift paused" },
  { name: "Bento spot", duration: "WAAPI 2.8s pulse · 9s sway", easing: "ease-in-out", trigger: "ambient (BentoGlassSpot)", reduced: "Spot held still" },
  { name: "Tone flip", duration: "scroll-linked (--pin)", easing: "linear", trigger: "data-pin sticky stage", reduced: "Collapses to static bridge" },
];
