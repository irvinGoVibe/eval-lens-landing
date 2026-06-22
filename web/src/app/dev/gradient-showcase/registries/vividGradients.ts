import type { ShowcasePreset } from "./types";

/**
 * 07 — Vivid / warm gradients.
 *
 * The one deliberately off-brand chapter: saturated, expressive fields built on
 * a warm spectrum — amber #ffb020, orange #ff7a1a, coral #ff5f6d, pink/rose
 * #ff5fa2 — often bridged into the brand violet #6c4cf1 so they still belong to
 * EvalLense. No green. Same performance discipline as the rest: transform /
 * opacity only, ≤ 5 large layers, reduced-motion fallbacks on the animated ones.
 */

export const vividGradients: ShowcasePreset[] = [
  {
    id: "sunset-drift",
    name: "Sunset Drift",
    label: "warm aurora drift · 26s · CSS-only · medium",
    category: "vivid",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "drift",
    reducedMotion: "static",
    heading: "Amber to rose, slowly drifting",
    body: "Warm fields of amber, orange and rose slide past each other on a deep warm-black base. The signature vivid ambient field — saturated, but never garish.",
    css: (s) => `${s} { background: #100a12; overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute; inset: -30%;
  will-change: transform; animation-play-state: var(--gsc-play, running);
}
${s}::before {
  background:
    radial-gradient(52% 42% at 28% 32%, rgba(255,122,26,0.45) 0%, rgba(255,122,26,0) 60%),
    radial-gradient(48% 40% at 72% 64%, rgba(255,95,162,0.40) 0%, rgba(255,95,162,0) 60%);
  animation: gsc-sunset-drift-a 26s ease-in-out infinite alternate;
}
${s}::after {
  background: radial-gradient(60% 44% at 50% 102%, rgba(255,176,32,0.30) 0%, rgba(255,176,32,0) 62%);
  animation: gsc-sunset-drift-b 33s ease-in-out infinite alternate;
}
@keyframes gsc-sunset-drift-a { from { transform: translate3d(-6%,-3%,0) scale(1.05); } to { transform: translate3d(7%,4%,0) scale(1.12); } }
@keyframes gsc-sunset-drift-b { from { transform: translate3d(4%,3%,0); } to { transform: translate3d(-5%,-4%,0); } }
@media (prefers-reduced-motion: reduce) { ${s}::before, ${s}::after { animation: none; } }`,
  },
  {
    id: "amber-spotlight",
    name: "Amber Spotlight",
    label: "radial key-light · CSS-only · low",
    category: "vivid",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "One warm key light",
    body: "A single amber-to-orange spotlight on a near-black warm field, with a soft vignette. Restrained glow, lots of dark space — the warm twin of Violet Spotlight.",
    css: (s) => `${s} { background: #0d0a0b; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(48% 46% at 50% 40%, rgba(255,176,32,0.45) 0%, rgba(255,122,26,0.16) 40%, rgba(13,10,11,0) 72%),
    radial-gradient(140% 120% at 50% 50%, rgba(13,10,11,0) 55%, rgba(0,0,0,0.6) 100%);
}`,
  },
  {
    id: "coral-aurora",
    name: "Coral Aurora",
    label: "warm ribbons · 24s · CSS-only · medium",
    category: "vivid",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "drift",
    reducedMotion: "static",
    heading: "Coral and orange ribbons",
    body: "Two wide coral and orange ribbons breathing across the upper field, with a faint rose wash below. Warm, cinematic, and slow.",
    css: (s) => `${s} { background: #0f0a0e; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -25%;
  will-change: transform; animation-play-state: var(--gsc-play, running);
  background:
    radial-gradient(54% 40% at 32% 28%, rgba(255,95,109,0.42) 0%, rgba(255,95,109,0) 60%),
    radial-gradient(50% 38% at 70% 34%, rgba(255,122,26,0.36) 0%, rgba(255,122,26,0) 60%),
    radial-gradient(80% 50% at 50% 108%, rgba(255,95,162,0.22) 0%, rgba(15,10,14,0) 62%);
  animation: gsc-coral-aurora 24s ease-in-out infinite alternate;
}
@keyframes gsc-coral-aurora { from { transform: translate3d(-5%,-2%,0) scale(1.04); } to { transform: translate3d(6%,3%,0) scale(1.1); } }
@media (prefers-reduced-motion: reduce) { ${s}::before { animation: none; } }`,
  },
  {
    id: "peach-mesh",
    name: "Peach Mesh",
    label: "soft warm mesh · CSS-only · low",
    category: "vivid",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "A softer, sunlit mesh",
    body: "A light peach base with low-saturation amber, coral, rose and lavender fields. The gentle, premium take on warm — pastel, not neon.",
    css: (s) => `${s} { background: #fff7f1; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(60% 60% at 16% 22%, rgba(255,176,32,0.20) 0%, rgba(255,176,32,0) 60%),
    radial-gradient(64% 64% at 86% 18%, rgba(255,95,109,0.16) 0%, rgba(255,95,109,0) 60%),
    radial-gradient(68% 68% at 78% 86%, rgba(255,95,162,0.16) 0%, rgba(255,95,162,0) 60%),
    radial-gradient(58% 58% at 12% 88%, rgba(169,155,255,0.16) 0%, rgba(169,155,255,0) 60%);
}`,
  },
  {
    id: "magenta-sunrise",
    name: "Magenta Sunrise",
    label: "rising radial · CSS-only · low",
    category: "vivid",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Pink rising into orange",
    body: "A rose-pink glow rising from the bottom into a warm orange horizon, on a deep warm-black field. A sunrise read, kept clean above the focal line.",
    css: (s) => `${s} { background: #0e090e; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(90% 60% at 50% 116%, rgba(255,95,162,0.46) 0%, rgba(255,122,26,0.18) 44%, rgba(14,9,14,0) 74%),
    radial-gradient(70% 40% at 50% 96%, rgba(255,176,32,0.24) 0%, rgba(14,9,14,0) 60%);
}`,
  },
  {
    id: "golden-hour-sweep",
    name: "Golden Hour Sweep",
    label: "conic reflection rotate · 50s · CSS-only · medium",
    category: "vivid",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "rotate",
    reducedMotion: "static",
    heading: "Warm light turning slowly",
    body: "A very slow conic sweep through amber, orange, rose and back, masked to a soft disc. Used as a warm reflection, not a colour wheel — low opacity.",
    css: (s) => `${s} { background: #0c0a0c; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -60%;
  opacity: 0.5; will-change: transform;
  background: conic-gradient(from 0deg at 50% 50%,
    rgba(255,176,32,0.5), rgba(255,122,26,0.45), rgba(255,95,109,0.45),
    rgba(255,95,162,0.45), rgba(255,176,32,0.5));
  mask: radial-gradient(closest-side, #000 55%, transparent 100%);
  animation: gsc-golden-hour-sweep 50s linear infinite;
  animation-play-state: var(--gsc-play, running);
}
@keyframes gsc-golden-hour-sweep { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { ${s}::before { animation: none; } }`,
  },
  {
    id: "spectrum-bridge",
    name: "Spectrum Bridge",
    label: "linear violet→warm · CSS-only · low",
    category: "vivid",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Brand violet into warm spectrum",
    body: "A bold diagonal sweep that bridges the brand violet through rose and orange to amber — the one preset that ties the warm chapter back to EvalLense.",
    css: (s) => `${s} { background: #0c0911; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -10%;
  background: linear-gradient(120deg,
    rgba(108,76,241,0.55) 0%, rgba(255,95,162,0.45) 38%,
    rgba(255,122,26,0.42) 70%, rgba(255,176,32,0.40) 100%);
}
${s}::after {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(120% 120% at 50% 50%, rgba(12,9,17,0) 42%, rgba(12,9,17,0.72) 100%);
}`,
  },
];
