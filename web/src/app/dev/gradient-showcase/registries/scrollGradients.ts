import type { ShowcasePreset } from "./types";

/**
 * 04 — Scroll-driven gradients (performance: medium).
 *
 * Animation tracks scroll *position*, not time. Two cooperating paths:
 *
 *  1. Baseline (works everywhere): the page drives `--gsc-scroll` (0 → 1) from
 *     an IntersectionObserver + passive scroll listener (see useScrollProgress).
 *     It reverses naturally on up-scroll and never blocks scrolling.
 *  2. Progressive enhancement: each preset ships an
 *     `@supports (animation-timeline: view())` block, gated on the
 *     `[data-native-scroll]` attribute, that binds the same motion to a native
 *     CSS scroll timeline — zero JS where the browser supports it.
 *
 * Under `prefers-reduced-motion` the page leaves `--gsc-scroll` at a pleasing
 * fixed frame (0.5) and attaches no listeners, so the final composition is kept.
 */

export const scrollGradients: ShowcasePreset[] = [
  {
    id: "scroll-field-shift",
    name: "Scroll Field Shift",
    label: "scroll() position · CSS + JS fallback · medium",
    category: "scroll",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: false,
    motion: "scroll",
    reducedMotion: "static",
    heading: "Fields cross as you scroll",
    body: "The violet field travels top-to-bottom while the cyan field moves the opposite way, so the centre of the composition shifts through the scroll. Scroll back and it fully returns.",
    css: (s) => `${s} { background: #0a0a0d; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -20%;
  transform: translateY(calc(var(--gsc-scroll, 0) * 28% - 14%));
  background: radial-gradient(40% 40% at 30% 40%, rgba(108,76,241,0.42) 0%, rgba(108,76,241,0) 60%);
}
${s}::after {
  content: ""; position: absolute; inset: -20%;
  transform: translateY(calc(var(--gsc-scroll, 0) * -28% + 14%));
  background: radial-gradient(40% 40% at 72% 60%, rgba(46,197,232,0.34) 0%, rgba(46,197,232,0) 60%);
}
@supports (animation-timeline: view()) {
  ${s}[data-native-scroll]::before { animation: gsc-scroll-field-shift-a linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
  ${s}[data-native-scroll]::after  { animation: gsc-scroll-field-shift-b linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
  @keyframes gsc-scroll-field-shift-a { from { transform: translateY(-14%); } to { transform: translateY(14%); } }
  @keyframes gsc-scroll-field-shift-b { from { transform: translateY(14%); } to { transform: translateY(-14%); } }
}`,
  },
  {
    id: "light-gradient-compression",
    name: "Light Gradient Compression",
    label: "scroll() squeeze curve · CSS + JS fallback · low",
    category: "scroll",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: false,
    motion: "scroll",
    reducedMotion: "static",
    heading: "Spread, converge, spread again",
    body: "On entry the colour fields are widely distributed; mid-scroll they compress toward a single focal point; then they expand again on exit. A breathing driven by progress, not a timer.",
    css: (s) => `${s} { background: #eef0f5; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  --gsc-sq: calc((var(--gsc-scroll, 0) - 0.5) * (var(--gsc-scroll, 0) - 0.5) * 4);
  background: radial-gradient(calc(18% + var(--gsc-sq) * 52%) calc(18% + var(--gsc-sq) * 52%) at 50% 48%,
    rgba(108,76,241,0.30) 0%, rgba(46,197,232,0.18) 45%, rgba(255,95,162,0.05) 70%, rgba(238,240,245,0) 90%);
}`,
  },
  {
    id: "dark-gradient-expansion",
    name: "Dark Gradient Expansion",
    label: "scroll() scale · CSS + JS fallback · low",
    category: "scroll",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: false,
    motion: "scroll",
    reducedMotion: "static",
    heading: "A glow that grows with progress",
    body: "A local glow starts small and expands as scroll progress increases — but it never fills the whole frame, so large areas of black are preserved throughout.",
    css: (s) => `${s} { background: #07070c; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(calc(14% + var(--gsc-scroll, 0) * 42%) calc(14% + var(--gsc-scroll, 0) * 42%) at 50% 54%,
    rgba(123,92,246,0.45) 0%, rgba(46,197,232,0.16) 48%, rgba(7,7,12,0) 78%);
}`,
  },
  {
    id: "aurora-scroll-drift",
    name: "Aurora Scroll Drift",
    label: "scroll() diagonal · CSS + JS fallback · medium",
    category: "scroll",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: false,
    motion: "scroll",
    reducedMotion: "static",
    heading: "Aurora slides on the diagonal",
    body: "The aurora drifts diagonally and brightens as the section advances. Driven by scroll, not looping — scrolling back up returns it exactly to the starting state.",
    css: (s) => `${s} { background: #06060b; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -30%;
  opacity: calc(0.45 + var(--gsc-scroll, 0) * 0.55);
  transform: translate3d(calc(var(--gsc-scroll, 0) * 20% - 10%), calc(var(--gsc-scroll, 0) * 14% - 7%), 0);
  background:
    radial-gradient(46% 40% at 30% 35%, rgba(108,76,241,0.50) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(48% 42% at 72% 58%, rgba(255,95,162,0.42) 0%, rgba(255,95,162,0) 60%);
}
@supports (animation-timeline: view()) {
  ${s}[data-native-scroll]::before { animation: gsc-aurora-scroll-drift linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
  @keyframes gsc-aurora-scroll-drift {
    from { transform: translate3d(-10%,-7%,0); opacity: 0.45; }
    to   { transform: translate3d(10%,7%,0);  opacity: 1; }
  }
}`,
  },
  {
    id: "color-balance-shift",
    name: "Color Balance Shift",
    label: "scroll() opacity balance · CSS + JS fallback · low",
    category: "scroll",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: false,
    motion: "scroll",
    reducedMotion: "static",
    heading: "Violet gives way to cyan",
    body: "The section gradually rebalances from violet-dominant to cyan-dominant as it scrolls — within the brand palette only. No full palette swap, and no white-to-black transition.",
    css: (s) => `${s} { background: #09090f; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  opacity: calc(1 - var(--gsc-scroll, 0));
  background: radial-gradient(60% 60% at 32% 40%, rgba(108,76,241,0.42) 0%, rgba(108,76,241,0) 62%);
}
${s}::after {
  content: ""; position: absolute; inset: 0;
  opacity: var(--gsc-scroll, 0);
  background: radial-gradient(60% 60% at 70% 60%, rgba(46,197,232,0.40) 0%, rgba(46,197,232,0) 62%);
}`,
  },
  {
    id: "radial-focus-follow",
    name: "Radial Focus Follow",
    label: "scroll() focal travel · CSS + JS fallback · low",
    category: "scroll",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: false,
    motion: "scroll",
    reducedMotion: "static",
    heading: "The light pool rises with you",
    body: "The focal glow travels from the bottom of the frame to the top as the section scrolls through view — useful for keeping a highlight on content as it moves.",
    css: (s) => `${s} { background: #0a0a10; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(52% 48% at 50% calc(100% - var(--gsc-scroll, 0) * 80%),
    rgba(123,92,246,0.42) 0%, rgba(46,197,232,0.14) 42%, rgba(10,10,16,0) 74%);
}`,
  },
];
