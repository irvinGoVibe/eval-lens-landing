import type { BackgroundPreset } from "./types";

/**
 * B. Dynamic gradients (performance: medium).
 *
 * Rules followed: animate only `transform` / `opacity` (never per-frame
 * `filter: blur()`); large fields, not tiny blobs; slow motion; honours
 * `prefers-reduced-motion`. Duration reads `--gl-speed` (unitless → ×1s),
 * play-state reads `--gl-play` (the library pauses via that var on the
 * reduced-motion / pause toggles).
 */
export const animatedPresets: BackgroundPreset[] = [
  {
    id: "slow-aurora-drift",
    name: "Slow Aurora Drift",
    slug: "slow-aurora-drift",
    category: "aurora",
    tags: ["aurora", "animated", "drift", "both"],
    theme: "both",
    technique: "css",
    performance: "medium",
    animation: "drift",
    reducedMotion: "static",
    description:
      "Two wide aurora ribbons sliding past each other at glacial speed. The signature ambient field.",
    browser: "All browsers. transform-only animation.",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "speed", "opacity", "blur", "noise"],
    defaults: { intensity: 1, speed: 26 },
    css: (s) => `${s} { background: #07070c; overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute; inset: -30%;
  opacity: var(--gl-intensity, 1);
  will-change: transform;
  animation: gl-aurora-drift calc(var(--gl-speed, 26) * 1s) ease-in-out infinite alternate;
  animation-play-state: var(--gl-play, running);
}
${s}::before {
  background: radial-gradient(50% 40% at 30% 35%, rgba(108,76,241,0.5) 0%, rgba(108,76,241,0) 60%);
}
${s}::after {
  background: radial-gradient(52% 42% at 70% 60%, rgba(54,224,194,0.42) 0%, rgba(54,224,194,0) 60%);
  animation-direction: alternate-reverse;
}
${s}[data-theme="light"] { background: #eef0f6; }
${s}[data-theme="light"]::before { background: radial-gradient(50% 40% at 30% 35%, rgba(108,76,241,0.26) 0%, rgba(108,76,241,0) 62%); }
${s}[data-theme="light"]::after { background: radial-gradient(52% 42% at 70% 60%, rgba(46,197,232,0.24) 0%, rgba(46,197,232,0) 62%); }
@keyframes gl-aurora-drift {
  from { transform: translate3d(-6%, -3%, 0) scale(1.05); }
  to   { transform: translate3d(7%, 4%, 0) scale(1.12); }
}
@media (prefers-reduced-motion: reduce) {
  ${s}::before, ${s}::after { animation: none; }
}`,
  },
  {
    id: "breathing-mesh",
    name: "Breathing Mesh",
    slug: "breathing-mesh",
    category: "mesh",
    tags: ["mesh", "animated", "breathe", "both"],
    theme: "both",
    technique: "css",
    performance: "medium",
    animation: "breathe",
    reducedMotion: "simplified",
    description:
      "A four-point colour mesh that expands and contracts like a slow breath. Warm, organic, calm.",
    browser: "All browsers. opacity + scale only.",
    recommendedFor: ["Hero", "Bento"],
    controls: ["intensity", "speed", "opacity", "blur", "noise"],
    defaults: { intensity: 1, speed: 14 },
    css: (s) => `${s} { background: #0a0a10; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -20%;
  opacity: var(--gl-intensity, 1);
  will-change: transform, opacity;
  background:
    radial-gradient(40% 40% at 20% 20%, rgba(123,92,246,0.55) 0%, rgba(123,92,246,0) 60%),
    radial-gradient(40% 40% at 80% 25%, rgba(46,197,232,0.45) 0%, rgba(46,197,232,0) 60%),
    radial-gradient(45% 45% at 25% 80%, rgba(54,224,194,0.4) 0%, rgba(54,224,194,0) 60%),
    radial-gradient(40% 40% at 80% 80%, rgba(169,155,255,0.45) 0%, rgba(169,155,255,0) 60%);
  animation: gl-mesh-breathe calc(var(--gl-speed, 14) * 1s) ease-in-out infinite;
  animation-play-state: var(--gl-play, running);
}
${s}[data-theme="light"] { background: #f3f4fa; }
${s}[data-theme="light"]::before { mix-blend-mode: multiply; opacity: calc(var(--gl-intensity,1) * 0.65); }
@keyframes gl-mesh-breathe {
  0%, 100% { transform: scale(1); opacity: var(--gl-intensity, 1); }
  50% { transform: scale(1.14); opacity: calc(var(--gl-intensity, 1) * 0.8); }
}
@media (prefers-reduced-motion: reduce) {
  ${s}::before { animation-duration: calc(var(--gl-speed, 14) * 3s); }
}`,
  },
  {
    id: "floating-radial-fields",
    name: "Floating Radial Fields",
    slug: "floating-radial-fields",
    category: "animated",
    tags: ["radial", "animated", "drift", "dark"],
    theme: "dark",
    technique: "css",
    performance: "medium",
    animation: "drift",
    reducedMotion: "static",
    description:
      "Three large soft fields drifting on independent paths. Depth without parallax cost.",
    browser: "All browsers.",
    recommendedFor: ["Hero", "Gallery"],
    controls: ["intensity", "speed", "opacity", "blur", "noise"],
    defaults: { intensity: 1, speed: 32 },
    css: (s) => `${s} { background: #06060a; overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute; inset: -25%;
  opacity: var(--gl-intensity, 1); will-change: transform;
  animation-play-state: var(--gl-play, running);
}
${s}::before {
  background:
    radial-gradient(38% 38% at 25% 30%, rgba(108,76,241,0.5) 0%, rgba(108,76,241,0) 62%),
    radial-gradient(34% 34% at 75% 65%, rgba(54,224,194,0.36) 0%, rgba(54,224,194,0) 62%);
  animation: gl-fields-a calc(var(--gl-speed, 32) * 1s) ease-in-out infinite alternate;
}
${s}::after {
  background: radial-gradient(40% 40% at 60% 25%, rgba(46,197,232,0.3) 0%, rgba(46,197,232,0) 62%);
  animation: gl-fields-b calc(var(--gl-speed, 32) * 1.4s) ease-in-out infinite alternate;
}
@keyframes gl-fields-a { from { transform: translate3d(-5%, 4%, 0); } to { transform: translate3d(6%, -5%, 0); } }
@keyframes gl-fields-b { from { transform: translate3d(4%, -3%, 0); } to { transform: translate3d(-6%, 5%, 0); } }
@media (prefers-reduced-motion: reduce) { ${s}::before, ${s}::after { animation: none; } }`,
  },
  {
    id: "rotating-conic-reflection",
    name: "Rotating Conic Reflection",
    slug: "rotating-conic-reflection",
    category: "experimental",
    tags: ["conic", "animated", "rotate", "dark"],
    theme: "dark",
    technique: "css",
    performance: "medium",
    animation: "rotate",
    reducedMotion: "disabled",
    description:
      "A slow conic sweep of the full lens palette, like light turning across brushed metal.",
    browser: "Conic gradient: all modern browsers. Rotation via transform.",
    recommendedFor: ["CTA", "Hero"],
    controls: ["intensity", "speed", "scale", "opacity", "blur", "noise"],
    defaults: { intensity: 0.9, speed: 40, scale: 1 },
    css: (s) => `${s} { background: #06060a; overflow: hidden; }
${s}::before {
  content: ""; position: absolute; inset: -60%;
  opacity: var(--gl-intensity, 0.9); will-change: transform;
  transform: scale(var(--gl-scale, 1));
  background: conic-gradient(from 0deg at 50% 50%,
    rgba(108,76,241,0.5), rgba(46,197,232,0.4), rgba(54,224,194,0.45),
    rgba(169,155,255,0.4), rgba(108,76,241,0.5));
  -webkit-mask: radial-gradient(closest-side, #000 55%, transparent 100%);
  mask: radial-gradient(closest-side, #000 55%, transparent 100%);
  animation: gl-conic-spin calc(var(--gl-speed, 40) * 1s) linear infinite;
  animation-play-state: var(--gl-play, running);
}
@keyframes gl-conic-spin { to { transform: scale(var(--gl-scale, 1)) rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { ${s}::before { animation: none; } }`,
  },
  {
    id: "pointer-reactive-glow",
    name: "Pointer Reactive Glow",
    slug: "pointer-reactive-glow",
    category: "animated",
    tags: ["pointer", "interactive", "glow", "both"],
    theme: "both",
    technique: "css",
    performance: "medium",
    animation: "pointer",
    reducedMotion: "static",
    description:
      "A violet light pool that follows the cursor. Subtle, smoothed, never frantic.",
    browser: "All browsers. Pointer position via CSS custom properties.",
    recommendedFor: ["Bento", "CTA"],
    controls: ["intensity", "scale", "pointer", "opacity", "noise"],
    defaults: { intensity: 1, scale: 1, pointer: 1 },
    css: (s) => `${s} { background: #08080d; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  opacity: var(--gl-intensity, 1);
  background: radial-gradient(
    calc(34% * var(--gl-scale,1) * var(--gl-pointer,1)) calc(34% * var(--gl-scale,1) * var(--gl-pointer,1))
    at calc(var(--gl-px, 0.5) * 100%) calc(var(--gl-py, 0.5) * 100%),
    rgba(123,92,246,0.55) 0%, rgba(46,197,232,0.18) 45%, rgba(8,8,13,0) 72%);
  transition: background 0.18s ease-out;
}
${s}[data-theme="light"] { background: #eef0f6; }
${s}[data-theme="light"]::before {
  background: radial-gradient(
    calc(34% * var(--gl-scale,1) * var(--gl-pointer,1)) calc(34% * var(--gl-scale,1) * var(--gl-pointer,1))
    at calc(var(--gl-px, 0.5) * 100%) calc(var(--gl-py, 0.5) * 100%),
    rgba(108,76,241,0.26) 0%, rgba(46,197,232,0.12) 45%, rgba(238,240,246,0) 72%);
}`,
  },
  {
    id: "liquid-color-field",
    name: "Liquid Color Field",
    slug: "liquid-color-field",
    category: "mesh",
    tags: ["mesh", "animated", "liquid", "dark"],
    theme: "dark",
    technique: "css",
    performance: "medium",
    animation: "drift",
    reducedMotion: "simplified",
    description:
      "Overlapping colour masses that slowly knead through each other. Reads as molten, not busy.",
    browser: "All browsers. Two counter-rotating transformed layers.",
    recommendedFor: ["Hero", "Gallery"],
    controls: ["intensity", "speed", "opacity", "blur", "noise"],
    defaults: { intensity: 1, speed: 30 },
    css: (s) => `${s} { background: #070710; overflow: hidden; }
${s}::before, ${s}::after {
  content: ""; position: absolute; inset: -40%;
  opacity: var(--gl-intensity, 1); will-change: transform;
  animation-play-state: var(--gl-play, running);
}
${s}::before {
  background:
    radial-gradient(45% 45% at 35% 40%, rgba(108,76,241,0.6) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(40% 40% at 70% 55%, rgba(46,197,232,0.4) 0%, rgba(46,197,232,0) 60%);
  animation: gl-liquid-a calc(var(--gl-speed, 30) * 1s) ease-in-out infinite alternate;
}
${s}::after {
  background:
    radial-gradient(48% 48% at 60% 35%, rgba(54,224,194,0.42) 0%, rgba(54,224,194,0) 60%),
    radial-gradient(40% 40% at 30% 70%, rgba(169,155,255,0.4) 0%, rgba(169,155,255,0) 60%);
  mix-blend-mode: screen;
  animation: gl-liquid-b calc(var(--gl-speed, 30) * 1.3s) ease-in-out infinite alternate;
}
@keyframes gl-liquid-a { from { transform: translate3d(-6%,-4%,0) rotate(-4deg); } to { transform: translate3d(5%,6%,0) rotate(5deg); } }
@keyframes gl-liquid-b { from { transform: translate3d(5%,4%,0) rotate(4deg); } to { transform: translate3d(-5%,-5%,0) rotate(-5deg); } }
@media (prefers-reduced-motion: reduce) { ${s}::before, ${s}::after { animation-duration: calc(var(--gl-speed,30) * 3s); } }`,
  },
];
