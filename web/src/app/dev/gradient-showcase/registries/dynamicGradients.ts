import type { ShowcasePreset } from "./types";

/**
 * 03 — Dynamic gradients (performance: medium).
 *
 * Rules followed strictly:
 *  - animate only `transform` / `opacity` (never per-frame `filter: blur()`),
 *  - large fields, not dozens of tiny DOM blobs (max 2 pseudo-layers),
 *  - slow cycles (18–30s), motion almost imperceptible,
 *  - `animation-play-state: var(--gsc-play, running)` so the Pause control and
 *    reduced-motion path can freeze them,
 *  - every preset ships a `prefers-reduced-motion: reduce` fallback.
 */

export const dynamicGradients: ShowcasePreset[] = [
  {
    id: "slow-aurora-drift",
    name: "Slow Aurora Drift",
    label: "transform drift · 26s · CSS-only · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "drift",
    reducedMotion: "static",
    heading: "Two ribbons, glacial drift",
    body: "Two wide aurora fields slide past each other on a 26-second cycle. The movement is almost subliminal — the signature ambient field. Transform-only, GPU-friendly.",
    css: (s) => `${s} { background: linear-gradient(165deg, #100f1a 0%, #0a0a0e 58%, #070709 100%); overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute; inset: -30%;
  will-change: transform;
  animation-play-state: var(--gsc-play, running);
}
${s}::before {
  background: radial-gradient(50% 40% at 30% 35%, rgba(108,76,241,0.50) 0%, rgba(108,76,241,0) 60%);
  animation: gsc-slow-aurora-drift-a 26s ease-in-out infinite alternate;
}
${s}::after {
  background: radial-gradient(52% 42% at 70% 60%, rgba(255,95,162,0.42) 0%, rgba(255,95,162,0) 60%);
  animation: gsc-slow-aurora-drift-b 26s ease-in-out infinite alternate;
}
@keyframes gsc-slow-aurora-drift-a { from { transform: translate3d(-6%,-3%,0) scale(1.05); } to { transform: translate3d(7%,4%,0) scale(1.12); } }
@keyframes gsc-slow-aurora-drift-b { from { transform: translate3d(7%,4%,0) scale(1.12); } to { transform: translate3d(-6%,-3%,0) scale(1.05); } }
@media (prefers-reduced-motion: reduce) { ${s}::before, ${s}::after { animation: none; } }`,
  },
  {
    id: "breathing-mesh",
    name: "Breathing Mesh",
    label: "scale + opacity breathe · 16s · CSS-only · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "breathe",
    reducedMotion: "simplified",
    heading: "A mesh that breathes",
    body: "A four-point colour mesh that gently expands and contracts like a slow breath — scale and opacity only, never animating blur frame by frame.",
    css: (s) => `${s} { background: linear-gradient(165deg, #100f1a 0%, #0a0a0e 58%, #070709 100%); overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -20%;
  will-change: transform, opacity;
  background:
    radial-gradient(40% 40% at 20% 20%, rgba(123,92,246,0.55) 0%, rgba(123,92,246,0) 60%),
    radial-gradient(40% 40% at 80% 25%, rgba(46,197,232,0.45) 0%, rgba(46,197,232,0) 60%),
    radial-gradient(45% 45% at 25% 80%, rgba(255,95,162,0.40) 0%, rgba(255,95,162,0) 60%),
    radial-gradient(40% 40% at 80% 80%, rgba(169,155,255,0.45) 0%, rgba(169,155,255,0) 60%);
  animation: gsc-breathing-mesh 16s ease-in-out infinite;
  animation-play-state: var(--gsc-play, running);
}
@keyframes gsc-breathing-mesh {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.14); opacity: 0.8; }
}
@media (prefers-reduced-motion: reduce) { ${s}::before { animation-duration: 48s; } }`,
  },
  {
    id: "floating-radial-fields",
    name: "Floating Radial Fields",
    label: "transform drift · 32s · CSS-only · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "drift",
    reducedMotion: "static",
    heading: "Depth without parallax cost",
    body: "Three large soft fields drift on independent paths and timings, so the composition never repeats predictably. Reads as depth, costs only two transforms.",
    css: (s) => `${s} { background: linear-gradient(165deg, #100f1a 0%, #0a0a0e 58%, #070709 100%); overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute; inset: -25%;
  will-change: transform; animation-play-state: var(--gsc-play, running);
}
${s}::before {
  background:
    radial-gradient(38% 38% at 25% 30%, rgba(108,76,241,0.50) 0%, rgba(108,76,241,0) 62%),
    radial-gradient(34% 34% at 75% 65%, rgba(255,95,162,0.36) 0%, rgba(255,95,162,0) 62%);
  animation: gsc-floating-radial-fields-a 32s ease-in-out infinite alternate;
}
${s}::after {
  background: radial-gradient(40% 40% at 60% 25%, rgba(46,197,232,0.30) 0%, rgba(46,197,232,0) 62%);
  animation: gsc-floating-radial-fields-b 45s ease-in-out infinite alternate;
}
@keyframes gsc-floating-radial-fields-a { from { transform: translate3d(-5%,4%,0); } to { transform: translate3d(6%,-5%,0); } }
@keyframes gsc-floating-radial-fields-b { from { transform: translate3d(4%,-3%,0); } to { transform: translate3d(-6%,5%,0); } }
@media (prefers-reduced-motion: reduce) { ${s}::before, ${s}::after { animation: none; } }`,
  },
  {
    id: "rotating-reflection",
    name: "Rotating Reflection",
    label: "conic-gradient rotate · 48s · CSS-only · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "rotate",
    reducedMotion: "static",
    heading: "Light turning across glass",
    body: "A very slow conic sweep of the lens palette at low opacity — used as a reflection, not a colour wheel. Masked to a soft disc so the edges never harden.",
    css: (s) => `${s} { background: linear-gradient(165deg, #100f1a 0%, #0a0a0e 58%, #070709 100%); overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -60%;
  opacity: 0.55; will-change: transform;
  background: conic-gradient(from 0deg at 50% 50%,
    rgba(108,76,241,0.5), rgba(46,197,232,0.4), rgba(255,95,162,0.45),
    rgba(169,155,255,0.4), rgba(108,76,241,0.5));
  mask: radial-gradient(closest-side, #000 55%, transparent 100%);
  animation: gsc-rotating-reflection 48s linear infinite;
  animation-play-state: var(--gsc-play, running);
}
@keyframes gsc-rotating-reflection { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { ${s}::before { animation: none; } }`,
  },
  {
    id: "pointer-reactive-glow",
    name: "Pointer Reactive Glow",
    label: "pointer-driven radial · CSS + JS · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: false,
    motion: "pointer",
    pointer: true,
    reducedMotion: "static",
    heading: "A glow that follows the cursor",
    body: "One violet light pool tracks the pointer, smoothed and bounded so it never darts. Disabled on touch devices and under reduced-motion — the glow simply rests at centre.",
    css: (s) => `${s} { background: radial-gradient(120% 110% at 50% 0%, #14131e 0%, #0a0a0d 60%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(
    32% 32% at calc(var(--gsc-px, 0.5) * 100%) calc(var(--gsc-py, 0.5) * 100%),
    rgba(123,92,246,0.55) 0%, rgba(46,197,232,0.18) 45%, rgba(8,8,13,0) 72%);
  transition: background 0.18s ease-out;
}`,
  },
  {
    id: "liquid-color-field",
    name: "Liquid Color Field",
    label: "two counter-rotating layers · 30s · CSS-only · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "drift",
    reducedMotion: "simplified",
    heading: "Molten, not busy",
    body: "Two colour masses knead through each other on counter-rotating paths. The screen blend keeps overlaps luminous so it reads as liquid colour rather than mud.",
    css: (s) => `${s} { background: linear-gradient(165deg, #100f1a 0%, #0a0a0e 58%, #070709 100%); overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute; inset: -40%;
  will-change: transform; animation-play-state: var(--gsc-play, running);
}
${s}::before {
  background:
    radial-gradient(45% 45% at 35% 40%, rgba(108,76,241,0.60) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(40% 40% at 70% 55%, rgba(46,197,232,0.40) 0%, rgba(46,197,232,0) 60%);
  animation: gsc-liquid-color-field-a 30s ease-in-out infinite alternate;
}
${s}::after {
  background:
    radial-gradient(48% 48% at 60% 35%, rgba(255,95,162,0.42) 0%, rgba(255,95,162,0) 60%),
    radial-gradient(40% 40% at 30% 70%, rgba(169,155,255,0.40) 0%, rgba(169,155,255,0) 60%);
  mix-blend-mode: screen;
  animation: gsc-liquid-color-field-b 39s ease-in-out infinite alternate;
}
@keyframes gsc-liquid-color-field-a { from { transform: translate3d(-6%,-4%,0) rotate(-4deg); } to { transform: translate3d(5%,6%,0) rotate(5deg); } }
@keyframes gsc-liquid-color-field-b { from { transform: translate3d(5%,4%,0) rotate(4deg); } to { transform: translate3d(-5%,-5%,0) rotate(-5deg); } }
@media (prefers-reduced-motion: reduce) { ${s}::before, ${s}::after { animation-duration: 90s; } }`,
  },
  {
    id: "edge-light-drift",
    name: "Edge Light Drift",
    label: "edge-bound transform · 22s · CSS-only · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "drift",
    reducedMotion: "static",
    heading: "Movement only at the edges",
    body: "Colour drifts along the section edges while the centre stays stable and readable. Two transform-only layers — one travels vertically at the sides, one horizontally top and bottom.",
    css: (s) => `${s} { background: linear-gradient(165deg, #100f1a 0%, #0a0a0e 58%, #070709 100%); overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute;
  will-change: transform; animation-play-state: var(--gsc-play, running);
}
${s}::before {
  inset: -10% -30%;
  background:
    radial-gradient(30% 60% at 0% 50%, rgba(108,76,241,0.40) 0%, rgba(108,76,241,0) 55%),
    radial-gradient(30% 60% at 100% 50%, rgba(255,95,162,0.34) 0%, rgba(255,95,162,0) 55%);
  animation: gsc-edge-light-drift-x 22s ease-in-out infinite alternate;
}
${s}::after {
  inset: -30% -10%;
  background:
    radial-gradient(60% 30% at 50% 0%, rgba(46,197,232,0.28) 0%, rgba(46,197,232,0) 55%),
    radial-gradient(60% 30% at 50% 100%, rgba(169,155,255,0.24) 0%, rgba(169,155,255,0) 55%);
  animation: gsc-edge-light-drift-y 28s ease-in-out infinite alternate;
}
@keyframes gsc-edge-light-drift-x { from { transform: translateY(-6%); } to { transform: translateY(6%); } }
@keyframes gsc-edge-light-drift-y { from { transform: translateX(-5%); } to { transform: translateX(5%); } }
@media (prefers-reduced-motion: reduce) { ${s}::before, ${s}::after { animation: none; } }`,
  },
  {
    id: "ambient-light-shift",
    name: "Ambient Light Shift",
    label: "single field path · 30s · CSS-only · medium",
    category: "dynamic",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "drift",
    reducedMotion: "static",
    heading: "The light source slowly wanders",
    body: "A single light source migrates around the frame on a long looped path. The brand hue is preserved throughout — no flashing, no abrupt hue change.",
    css: (s) => `${s} { background: linear-gradient(165deg, #100f1a 0%, #0a0a0e 58%, #070709 100%); overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -20%;
  will-change: transform;
  background: radial-gradient(45% 45% at 50% 50%, rgba(108,76,241,0.42) 0%, rgba(46,197,232,0.14) 45%, rgba(9,10,18,0) 72%);
  animation: gsc-ambient-light-shift 30s ease-in-out infinite;
  animation-play-state: var(--gsc-play, running);
}
@keyframes gsc-ambient-light-shift {
  0% { transform: translate3d(-14%,-10%,0); }
  33% { transform: translate3d(12%,-6%,0); }
  66% { transform: translate3d(8%,12%,0); }
  100% { transform: translate3d(-14%,-10%,0); }
}
@media (prefers-reduced-motion: reduce) { ${s}::before { animation: none; } }`,
  },
];
