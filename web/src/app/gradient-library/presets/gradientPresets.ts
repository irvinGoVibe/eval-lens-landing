import type { BackgroundPreset } from "./types";

/**
 * A. Static gradients (CSS-only, no animation, performance: low).
 *
 * Each preset paints a flat base on the surface and the actual gradient on a
 * `::before` layer whose `opacity` is driven by `--gl-intensity`, so the
 * intensity slider cleanly scales the whole field. Light and dark variants
 * share the selector via `[data-theme="dark"]`.
 */
export const staticPresets: BackgroundPreset[] = [
  {
    id: "light-atmospheric",
    name: "Light Atmospheric",
    slug: "light-atmospheric",
    category: "static",
    tags: ["radial", "light", "soft"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description:
      "Soft cool-white sky with a lavender horizon. Calm, airy, never competes with text.",
    browser: "All browsers. Uses radial-gradient + color-mix (graceful).",
    recommendedFor: ["Hero", "Report"],
    controls: ["intensity", "opacity", "blur", "noise"],
    defaults: { intensity: 1 },
    css: (s) => `${s} { background: #f7f7fb; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(120% 90% at 50% -10%, #ffffff 0%, rgba(169,155,255,0.18) 42%, rgba(46,197,232,0.10) 70%, rgba(247,247,251,0) 100%),
    linear-gradient(180deg, #ffffff 0%, #eef0f7 100%);
  opacity: var(--gl-intensity, 1);
}
${s}[data-theme="dark"] { background: #08080c; }
${s}[data-theme="dark"]::before {
  background:
    radial-gradient(120% 90% at 50% -10%, rgba(123,92,246,0.45) 0%, rgba(46,197,232,0.14) 48%, rgba(8,8,12,0) 78%),
    linear-gradient(180deg, #111118 0%, #08080c 100%);
}`,
  },
  {
    id: "dark-cinematic",
    name: "Dark Cinematic",
    slug: "dark-cinematic",
    category: "static",
    tags: ["radial", "dark", "vignette"],
    theme: "dark",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description:
      "Deep black stage with a single violet key-light rising from below and a soft vignette.",
    browser: "All browsers.",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "opacity", "blur", "noise"],
    defaults: { intensity: 1 },
    css: (s) => `${s} { background: #07070b; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(90% 70% at 50% 118%, rgba(108,76,241,0.55) 0%, rgba(46,197,232,0.12) 45%, rgba(7,7,11,0) 72%),
    radial-gradient(140% 120% at 50% 50%, rgba(7,7,11,0) 55%, rgba(0,0,0,0.65) 100%);
  opacity: var(--gl-intensity, 1);
}
${s}[data-theme="light"] { background: #0f0f15; }`,
  },
  {
    id: "violet-cyan-edge-glow",
    name: "Violet Cyan Edge Glow",
    slug: "violet-cyan-edge-glow",
    category: "static",
    tags: ["edge", "glow", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description:
      "Neutral center framed by a violet glow top-left and a cyan glow bottom-right. Reads like a lit panel.",
    browser: "All browsers.",
    recommendedFor: ["Bento", "CTA"],
    controls: ["intensity", "opacity", "blur", "noise"],
    defaults: { intensity: 1 },
    css: (s) => `${s} { background: #f4f5f9; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(60% 60% at 0% 0%, rgba(108,76,241,0.28) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(60% 60% at 100% 100%, rgba(46,197,232,0.26) 0%, rgba(46,197,232,0) 60%);
  opacity: var(--gl-intensity, 1);
}
${s}[data-theme="dark"] { background: #0b0b11; }
${s}[data-theme="dark"]::before {
  background:
    radial-gradient(60% 60% at 0% 0%, rgba(123,92,246,0.5) 0%, rgba(123,92,246,0) 60%),
    radial-gradient(60% 60% at 100% 100%, rgba(54,224,194,0.4) 0%, rgba(54,224,194,0) 60%);
}`,
  },
  {
    id: "soft-radial-focus",
    name: "Soft Radial Focus",
    slug: "soft-radial-focus",
    category: "radial",
    tags: ["radial", "focus", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description:
      "A single centered light pool that draws the eye to the middle. Ideal behind a headline.",
    browser: "All browsers.",
    recommendedFor: ["Hero", "Report"],
    controls: ["intensity", "scale", "opacity", "blur", "noise"],
    defaults: { intensity: 1, scale: 1 },
    css: (s) => `${s} { background: #eceef4; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(calc(60% * var(--gl-scale,1)) calc(55% * var(--gl-scale,1)) at 50% 42%, #ffffff 0%, rgba(255,255,255,0.7) 38%, rgba(236,238,244,0) 78%);
  opacity: var(--gl-intensity, 1);
}
${s}[data-theme="dark"] { background: #060609; }
${s}[data-theme="dark"]::before {
  background: radial-gradient(calc(60% * var(--gl-scale,1)) calc(55% * var(--gl-scale,1)) at 50% 42%, rgba(123,92,246,0.34) 0%, rgba(108,76,241,0.12) 40%, rgba(6,6,9,0) 78%);
}`,
  },
  {
    id: "editorial-white-wash",
    name: "Editorial White Wash",
    slug: "editorial-white-wash",
    category: "static",
    tags: ["light", "neutral", "editorial"],
    theme: "light",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description:
      "Almost-white paper with the faintest cool tint top-to-bottom. Maximum legibility for long copy.",
    browser: "All browsers.",
    recommendedFor: ["Report", "Bento"],
    controls: ["intensity", "opacity", "noise"],
    defaults: { intensity: 1 },
    css: (s) => `${s} { background: #ffffff; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, #ffffff 0%, #f5f6f9 60%, #eef0f5 100%);
  opacity: var(--gl-intensity, 1);
}
${s}[data-theme="dark"] { background: #101016; }
${s}[data-theme="dark"]::before {
  background: linear-gradient(180deg, #15151d 0%, #0d0d13 100%);
}`,
  },
  {
    id: "deep-black-aurora",
    name: "Deep Black Aurora",
    slug: "deep-black-aurora",
    category: "static",
    tags: ["dark", "aurora", "band"],
    theme: "dark",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description:
      "Pure black with a frozen aurora ribbon of aqua and violet across the upper third.",
    browser: "All browsers. Conic-free, all radial.",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "scale", "opacity", "blur", "noise"],
    defaults: { intensity: 1, scale: 1 },
    css: (s) => `${s} { background: #050507; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(calc(80% * var(--gl-scale,1)) 40% at 30% 24%, rgba(54,224,194,0.34) 0%, rgba(54,224,194,0) 60%),
    radial-gradient(calc(70% * var(--gl-scale,1)) 38% at 70% 20%, rgba(108,76,241,0.42) 0%, rgba(108,76,241,0) 62%),
    radial-gradient(120% 80% at 50% 120%, rgba(46,197,232,0.10) 0%, rgba(5,5,7,0) 60%);
  opacity: var(--gl-intensity, 1);
}
${s}[data-theme="light"] { background: #0a0a10; }`,
  },
];
