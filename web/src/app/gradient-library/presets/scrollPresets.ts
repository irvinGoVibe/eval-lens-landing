import type { BackgroundPreset } from "./types";

/**
 * C. Scroll-driven gradients (performance: medium).
 *
 * Render path: the library drives `--gl-scroll` (0 → 1) from an
 * IntersectionObserver + scroll listener (see `useScrollProgress`), so the
 * effect tracks progress, reverses on up-scroll, never blocks scrolling, and
 * works everywhere. Each preset also ships an `@supports (animation-timeline:
 * view())` enhancement gated on `[data-native-scroll]` — opt in for a
 * zero-JS, CSS-native scroll timeline where supported.
 */
export const scrollPresets: BackgroundPreset[] = [
  {
    id: "scroll-color-shift",
    name: "Scroll Color Shift",
    slug: "scroll-color-shift",
    category: "scroll",
    tags: ["scroll", "color", "both"],
    theme: "both",
    technique: "css",
    performance: "medium",
    animation: "scroll",
    reducedMotion: "static",
    description:
      "The field travels violet → cyan → aqua as the section scrolls through view, and back on reverse.",
    browser: "All browsers via JS progress; native scroll timeline where supported.",
    recommendedFor: ["Hero", "Gallery"],
    controls: ["intensity", "scroll", "opacity", "noise"],
    defaults: { intensity: 1, scroll: 0 },
    css: (s) => `${s} { background: #07070c; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -10%;
  opacity: var(--gl-intensity, 1);
  background: linear-gradient(120deg, #6c4cf1 0%, #2ec5e8 50%, #36e0c2 100%);
  background-size: 300% 100%;
  background-position: calc(var(--gl-scroll, 0) * 100%) 50%;
}
${s}::after {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(120% 120% at 50% 50%, rgba(7,7,12,0) 40%, rgba(7,7,12,0.7) 100%);
}
${s}[data-theme="light"] { background: #eef0f6; }
${s}[data-theme="light"]::before { opacity: calc(var(--gl-intensity,1) * 0.45); }
${s}[data-theme="light"]::after { background: radial-gradient(120% 120% at 50% 50%, rgba(238,240,246,0) 35%, rgba(238,240,246,0.85) 100%); }
@supports (animation-timeline: view()) {
  ${s}[data-native-scroll]::before {
    animation: gl-scroll-shift linear both; animation-timeline: view(); animation-range: entry 0% exit 100%;
  }
  @keyframes gl-scroll-shift { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
}`,
  },
  {
    id: "white-to-deep-neutral",
    name: "White to Deep Neutral",
    slug: "white-to-deep-neutral",
    category: "scroll",
    tags: ["scroll", "neutral", "masks", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "scroll",
    reducedMotion: "static",
    description:
      "A clean white surface that sinks to deep graphite as you scroll. The classic light→dark hand-off.",
    browser: "All browsers. color-mix interpolation.",
    recommendedFor: ["Hero", "Report"],
    controls: ["scroll", "opacity", "noise"],
    defaults: { scroll: 0 },
    css: (s) => `${s} {
  background: color-mix(in oklab, #ffffff, #0c0c12 calc(var(--gl-scroll, 0) * 100%));
}
${s}::before {
  content: ""; position: absolute; inset: 0;
  opacity: var(--gl-scroll, 0);
  background: radial-gradient(90% 70% at 50% 110%, rgba(108,76,241,0.4) 0%, rgba(108,76,241,0) 60%);
}
${s}[data-theme="dark"] { background: color-mix(in oklab, #15151d, #050507 calc(var(--gl-scroll, 0) * 100%)); }`,
  },
  {
    id: "aurora-field-drift-on-scroll",
    name: "Aurora Field Drift on Scroll",
    slug: "aurora-field-drift-on-scroll",
    category: "scroll",
    tags: ["scroll", "aurora", "drift", "dark"],
    theme: "dark",
    technique: "css",
    performance: "medium",
    animation: "scroll",
    reducedMotion: "static",
    description:
      "Aurora ribbons glide sideways and brighten as the section advances. Driven, not looping.",
    browser: "All browsers via JS; native timeline where supported.",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "scroll", "opacity", "blur", "noise"],
    defaults: { intensity: 1, scroll: 0 },
    css: (s) => `${s} { background: #06060b; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -30%;
  opacity: calc(var(--gl-intensity, 1) * (0.45 + var(--gl-scroll, 0) * 0.55));
  transform: translate3d(calc(var(--gl-scroll, 0) * 18% - 9%), 0, 0);
  background:
    radial-gradient(46% 40% at 30% 35%, rgba(108,76,241,0.5) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(48% 42% at 72% 58%, rgba(54,224,194,0.42) 0%, rgba(54,224,194,0) 60%);
}
${s}[data-theme="light"] { background: #eceef5; }
${s}[data-theme="light"]::before { mix-blend-mode: multiply; }`,
  },
  {
    id: "radial-focus-section-progress",
    name: "Radial Focus Following Section Progress",
    slug: "radial-focus-section-progress",
    category: "scroll",
    tags: ["scroll", "radial", "focus", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "scroll",
    reducedMotion: "static",
    description:
      "The light pool rises from the bottom to the top of the frame as the section scrolls through.",
    browser: "All browsers.",
    recommendedFor: ["Report", "Gallery"],
    controls: ["intensity", "scroll", "opacity", "noise"],
    defaults: { intensity: 1, scroll: 0 },
    css: (s) => `${s} { background: #0a0a10; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  opacity: var(--gl-intensity, 1);
  background: radial-gradient(55% 50% at 50% calc(100% - var(--gl-scroll, 0) * 80%),
    rgba(123,92,246,0.42) 0%, rgba(46,197,232,0.14) 42%, rgba(10,10,16,0) 74%);
}
${s}[data-theme="light"] { background: #eef0f6; }
${s}[data-theme="light"]::before {
  background: radial-gradient(55% 50% at 50% calc(100% - var(--gl-scroll, 0) * 80%),
    #ffffff 0%, rgba(169,155,255,0.18) 42%, rgba(238,240,246,0) 74%);
}`,
  },
  {
    id: "gradient-compression-expansion",
    name: "Gradient Compression and Expansion",
    slug: "gradient-compression-expansion",
    category: "scroll",
    tags: ["scroll", "radial", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "scroll",
    reducedMotion: "static",
    description:
      "Colour bands compress into a tight core mid-scroll, then expand again. A breathing driven by progress.",
    browser: "All browsers.",
    recommendedFor: ["Gallery", "Bento"],
    controls: ["intensity", "scroll", "opacity", "noise"],
    defaults: { intensity: 1, scroll: 0 },
    css: (s) => `${s} { background: #07070c; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  opacity: var(--gl-intensity, 1);
  --gl-sq: calc((var(--gl-scroll, 0) - 0.5) * (var(--gl-scroll, 0) - 0.5) * 4);
  background: radial-gradient(calc(20% + var(--gl-sq) * 60%) calc(20% + var(--gl-sq) * 60%) at 50% 50%,
    rgba(108,76,241,0.5) 0%, rgba(46,197,232,0.28) 45%, rgba(54,224,194,0.12) 70%, rgba(7,7,12,0) 90%);
}
${s}[data-theme="light"] { background: #eef0f6; }
${s}[data-theme="light"]::before { opacity: calc(var(--gl-intensity,1) * 0.6); }`,
  },
];
