import type { BackgroundPreset } from "./types";

/**
 * E. Pattern + gradient combinations (performance: low/medium).
 *
 * The gradient is primary (on `::before`, scaled by `--gl-intensity`); the
 * pattern is strictly secondary (on `::after`, 2–12% opacity, controlled by
 * `--gl-density` / `--gl-scale`). Patterns are masked and kept above ~10px
 * spacing to avoid moiré, and never darken legibility.
 */
export const combinedPresets: BackgroundPreset[] = [
  {
    id: "atmospheric-fine-grid",
    name: "Light Atmospheric + Fine Grid",
    slug: "atmospheric-fine-grid",
    category: "combined",
    tags: ["combined", "grid", "light"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "The airy light sky with a barely-there grid for quiet structure behind content.",
    browser: "All browsers.",
    recommendedFor: ["Report", "Bento"],
    controls: ["intensity", "scale", "density", "opacity", "noise"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${s} { background: #f7f7fb; }
${s}[data-theme="dark"] { background: #08080c; }
${s}::before {
  content: ""; position: absolute; inset: 0; opacity: var(--gl-intensity, 1);
  background: radial-gradient(120% 90% at 50% -10%, #ffffff 0%, rgba(169,155,255,0.18) 42%, rgba(46,197,232,0.10) 70%, rgba(247,247,251,0) 100%);
}
${s}[data-theme="dark"]::before { background: radial-gradient(120% 90% at 50% -10%, rgba(123,92,246,0.45) 0%, rgba(46,197,232,0.14) 48%, rgba(8,8,12,0) 78%); }
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.5;
  --sp: calc(34px * var(--gl-scale,1) / var(--gl-density,1));
  background:
    repeating-linear-gradient(90deg, rgba(29,29,31,0.06) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(29,29,31,0.06) 0 1px, transparent 1px var(--sp));
  -webkit-mask: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
  mask: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
}
${s}[data-theme="dark"]::after { background: repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px var(--sp)), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px var(--sp)); }`,
  },
  {
    id: "cinematic-vertical-lines",
    name: "Dark Cinematic + Vertical Lines",
    slug: "cinematic-vertical-lines",
    category: "combined",
    tags: ["combined", "lines", "dark"],
    theme: "dark",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "The violet key-light stage threaded with faint vertical rules for a filmic frame.",
    browser: "All browsers.",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "scale", "density", "opacity", "noise"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${s} { background: #07070b; }
${s}[data-theme="light"] { background: #0f0f15; }
${s}::before {
  content: ""; position: absolute; inset: 0; opacity: var(--gl-intensity, 1);
  background:
    radial-gradient(90% 70% at 50% 118%, rgba(108,76,241,0.55) 0%, rgba(46,197,232,0.12) 45%, rgba(7,7,11,0) 72%),
    radial-gradient(140% 120% at 50% 50%, rgba(7,7,11,0) 55%, rgba(0,0,0,0.6) 100%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.6;
  --sp: calc(30px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px var(--sp));
  -webkit-mask: linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent);
  mask: linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent);
}`,
  },
  {
    id: "aurora-micro-dots",
    name: "Aurora + Micro Dots",
    slug: "aurora-micro-dots",
    category: "combined",
    tags: ["combined", "dots", "aurora", "dark"],
    theme: "dark",
    technique: "css",
    performance: "medium",
    animation: "drift",
    reducedMotion: "simplified",
    description: "Drifting aurora veiled by a micro-dot grain. Movement plus tactile texture, still calm.",
    browser: "All browsers. transform-only drift.",
    recommendedFor: ["Hero", "Gallery"],
    controls: ["intensity", "speed", "scale", "density", "opacity", "noise"],
    defaults: { intensity: 1, speed: 28, scale: 1, density: 1 },
    css: (s) => `${s} { background: #06060b; overflow: hidden; }
${s}[data-theme="light"] { background: #eef0f6; }
${s}::before {
  content: ""; position: absolute; inset: -30%; opacity: var(--gl-intensity, 1); will-change: transform;
  background:
    radial-gradient(46% 40% at 32% 36%, rgba(108,76,241,0.5) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(48% 42% at 70% 60%, rgba(54,224,194,0.4) 0%, rgba(54,224,194,0) 60%);
  animation: gl-aurora-dots-drift calc(var(--gl-speed, 28) * 1s) ease-in-out infinite alternate;
  animation-play-state: var(--gl-play, running);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.5;
  --sp: calc(9px * var(--gl-scale,1) / var(--gl-density,1));
  background: radial-gradient(rgba(255,255,255,0.10) 0.6px, transparent 0.9px);
  background-size: var(--sp) var(--sp);
}
@keyframes gl-aurora-dots-drift { from { transform: translate3d(-6%,-3%,0) scale(1.05); } to { transform: translate3d(7%,4%,0) scale(1.12); } }
@media (prefers-reduced-motion: reduce) { ${s}::before { animation: none; } }`,
  },
  {
    id: "edge-glow-perspective-grid",
    name: "Edge Glow + Perspective Grid",
    slug: "edge-glow-perspective-grid",
    category: "combined",
    tags: ["combined", "grid", "experimental", "dark"],
    theme: "dark",
    technique: "css",
    performance: "medium",
    animation: "none",
    reducedMotion: "static",
    description: "A receding grid floor under corner glows. Stage-and-horizon depth for a hero.",
    browser: "All modern browsers (CSS 3D transform).",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "scale", "density", "opacity", "noise"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${s} { background: #06060c; overflow: hidden; perspective: 340px; }
${s}[data-theme="light"] { background: #eceef5; }
${s}::before {
  content: ""; position: absolute; inset: 0; opacity: var(--gl-intensity, 1);
  background:
    radial-gradient(55% 55% at 0% 0%, rgba(108,76,241,0.4) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(55% 55% at 100% 0%, rgba(46,197,232,0.34) 0%, rgba(46,197,232,0) 60%);
}
${s}::after {
  content: ""; position: absolute; left: -50%; right: -50%; top: 42%; bottom: -40%; opacity: 0.7;
  --sp: calc(42px * var(--gl-scale,1) / var(--gl-density,1));
  background:
    repeating-linear-gradient(90deg, rgba(46,197,232,0.22) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(108,76,241,0.22) 0 1px, transparent 1px var(--sp));
  transform: rotateX(74deg); transform-origin: top center;
  -webkit-mask: linear-gradient(to bottom, transparent, #000 40%);
  mask: linear-gradient(to bottom, transparent, #000 40%);
}`,
  },
  {
    id: "radial-focus-concentric-rings",
    name: "Radial Focus + Concentric Rings",
    slug: "radial-focus-concentric-rings",
    category: "combined",
    tags: ["combined", "radial", "rings", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "A centred light pool ringed by faint concentric circles. Focus with a subtle target.",
    browser: "All browsers.",
    recommendedFor: ["CTA", "Report"],
    controls: ["intensity", "scale", "density", "opacity", "noise"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${s} { background: #eceef4; }
${s}[data-theme="dark"] { background: #060609; }
${s}::before {
  content: ""; position: absolute; inset: 0; opacity: var(--gl-intensity, 1);
  background: radial-gradient(60% 55% at 50% 45%, #ffffff 0%, rgba(255,255,255,0.7) 38%, rgba(236,238,244,0) 78%);
}
${s}[data-theme="dark"]::before { background: radial-gradient(60% 55% at 50% 45%, rgba(123,92,246,0.34) 0%, rgba(108,76,241,0.12) 40%, rgba(6,6,9,0) 78%); }
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.45;
  --sp: calc(30px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-radial-gradient(circle at 50% 45%, rgba(29,29,31,0.08) 0 1px, transparent 1px var(--sp));
  -webkit-mask: radial-gradient(circle at 50% 45%, #000 20%, transparent 75%);
  mask: radial-gradient(circle at 50% 45%, #000 20%, transparent 75%);
}
${s}[data-theme="dark"]::after { background: repeating-radial-gradient(circle at 50% 45%, rgba(255,255,255,0.08) 0 1px, transparent 1px var(--sp)); }`,
  },
  {
    id: "white-wash-diagonal-hairlines",
    name: "White Wash + Diagonal Hairlines",
    slug: "white-wash-diagonal-hairlines",
    category: "combined",
    tags: ["combined", "lines", "light"],
    theme: "light",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Editorial white paper with 45° hairlines. Clean, premium, text-first.",
    browser: "All browsers.",
    recommendedFor: ["Report", "Bento"],
    controls: ["intensity", "scale", "density", "opacity", "noise"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${s} { background: #ffffff; }
${s}[data-theme="dark"] { background: #101016; }
${s}::before {
  content: ""; position: absolute; inset: 0; opacity: var(--gl-intensity, 1);
  background: linear-gradient(180deg, #ffffff 0%, #f5f6f9 60%, #eef0f5 100%);
}
${s}[data-theme="dark"]::before { background: linear-gradient(180deg, #15151d 0%, #0d0d13 100%); }
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.6;
  --sp: calc(22px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-linear-gradient(45deg, rgba(29,29,31,0.05) 0 1px, transparent 1px var(--sp));
  -webkit-mask: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
  mask: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
}
${s}[data-theme="dark"]::after { background: repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 1px, transparent 1px var(--sp)); }`,
  },
];
