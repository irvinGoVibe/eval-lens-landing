import type { BackgroundPreset } from "./types";

/**
 * D. Background patterns (CSS-only, performance: low).
 *
 * Pure `repeating-*-gradient` / `radial` / `conic` techniques. Every pattern
 * carries a light + dark variant, an edge fade `mask-image`, and reacts to:
 *   --gl-scale     line/cell base size multiplier
 *   --gl-density   tighter (↑) / looser (↓) spacing
 *   --gl-intensity opacity of the pattern layer
 * Spacing = base × scale ÷ density, so lines stay crisp on Retina and below.
 */

const FADE =
  "linear-gradient(to bottom, transparent 0%, #000 15%, #000 85%, transparent 100%)";

/** Shared boilerplate for a pattern that lives on a ::before layer. */
function patternBase(s: string): string {
  return `${s} { background: #f5f6fa; }
${s}[data-theme="dark"] { background: #0a0a10; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  opacity: var(--gl-intensity, 1);
  -webkit-mask: ${FADE}; mask: ${FADE};
}`;
}

export const patternPresets: BackgroundPreset[] = [
  {
    id: "fine-vertical-lines",
    name: "Fine Vertical Lines",
    slug: "fine-vertical-lines",
    category: "pattern",
    tags: ["pattern", "lines", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Hairline vertical rules. Quiet structure for editorial columns.",
    browser: "All browsers.",
    recommendedFor: ["Report", "Bento"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(28px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-linear-gradient(90deg, rgba(29,29,31,0.10) 0 1px, transparent 1px var(--sp));
}
${s}[data-theme="dark"]::before { background: repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0 1px, transparent 1px var(--sp)); }`,
  },
  {
    id: "fine-horizontal-lines",
    name: "Fine Horizontal Lines",
    slug: "fine-horizontal-lines",
    category: "pattern",
    tags: ["pattern", "lines", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Horizontal rule rhythm — like ruled paper, dialled almost to invisible.",
    browser: "All browsers.",
    recommendedFor: ["Report"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(28px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-linear-gradient(0deg, rgba(29,29,31,0.10) 0 1px, transparent 1px var(--sp));
}
${s}[data-theme="dark"]::before { background: repeating-linear-gradient(0deg, rgba(255,255,255,0.10) 0 1px, transparent 1px var(--sp)); }`,
  },
  {
    id: "diagonal-hairlines",
    name: "Diagonal Hairlines",
    slug: "diagonal-hairlines",
    category: "pattern",
    tags: ["pattern", "lines", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "45° hairlines. Adds motion-feel to a static panel without any animation.",
    browser: "All browsers.",
    recommendedFor: ["Bento", "CTA"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(22px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-linear-gradient(45deg, rgba(29,29,31,0.09) 0 1px, transparent 1px var(--sp));
}
${s}[data-theme="dark"]::before { background: repeating-linear-gradient(45deg, rgba(255,255,255,0.09) 0 1px, transparent 1px var(--sp)); }`,
  },
  {
    id: "technical-grid",
    name: "Technical Grid",
    slug: "technical-grid",
    category: "pattern",
    tags: ["pattern", "grid", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Even square grid. The neutral backbone for dashboards and bento layouts.",
    browser: "All browsers.",
    recommendedFor: ["Bento", "Report"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(36px * var(--gl-scale,1) / var(--gl-density,1));
  background:
    repeating-linear-gradient(90deg, rgba(29,29,31,0.08) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(29,29,31,0.08) 0 1px, transparent 1px var(--sp));
}
${s}[data-theme="dark"]::before {
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 1px, transparent 1px var(--sp));
}`,
  },
  {
    id: "perspective-grid",
    name: "Perspective Grid",
    slug: "perspective-grid",
    category: "pattern",
    tags: ["pattern", "grid", "experimental", "dark"],
    theme: "dark",
    technique: "css",
    performance: "medium",
    animation: "none",
    reducedMotion: "static",
    description: "A grid floor receding to a horizon. Synth-stage depth, all CSS, no 3D engine.",
    browser: "All modern browsers (CSS 3D transform).",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${s} { background: #06060c; overflow: hidden; perspective: 320px; }
${s}[data-theme="light"] { background: #eceef5; }
${s}::before {
  content: ""; position: absolute; left: -50%; right: -50%; top: 38%; bottom: -40%;
  opacity: var(--gl-intensity, 1);
  --sp: calc(40px * var(--gl-scale,1) / var(--gl-density,1));
  background:
    repeating-linear-gradient(90deg, rgba(46,197,232,0.28) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(108,76,241,0.28) 0 1px, transparent 1px var(--sp));
  transform: rotateX(72deg);
  transform-origin: top center;
  -webkit-mask: linear-gradient(to bottom, transparent, #000 40%);
  mask: linear-gradient(to bottom, transparent, #000 40%);
}
${s}[data-theme="light"]::before {
  background:
    repeating-linear-gradient(90deg, rgba(108,76,241,0.22) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(108,76,241,0.22) 0 1px, transparent 1px var(--sp));
}`,
  },
  {
    id: "dot-matrix",
    name: "Dot Matrix",
    slug: "dot-matrix",
    category: "pattern",
    tags: ["pattern", "dots", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Regular dot grid. The friendliest structure — softer than lines.",
    browser: "All browsers.",
    recommendedFor: ["Bento", "Gallery"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(26px * var(--gl-scale,1) / var(--gl-density,1));
  background: radial-gradient(rgba(29,29,31,0.16) 1.2px, transparent 1.4px);
  background-size: var(--sp) var(--sp);
}
${s}[data-theme="dark"]::before { background: radial-gradient(rgba(255,255,255,0.16) 1.2px, transparent 1.4px); background-size: var(--sp) var(--sp); }`,
  },
  {
    id: "micro-dots",
    name: "Micro Dots",
    slug: "micro-dots",
    category: "pattern",
    tags: ["pattern", "dots", "both", "noise"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Ultra-fine dot field reading almost as texture. A whisper of grain without an image.",
    browser: "All browsers.",
    recommendedFor: ["Report", "Hero"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(10px * var(--gl-scale,1) / var(--gl-density,1));
  background: radial-gradient(rgba(29,29,31,0.12) 0.6px, transparent 0.9px);
  background-size: var(--sp) var(--sp);
}
${s}[data-theme="dark"]::before { background: radial-gradient(rgba(255,255,255,0.10) 0.6px, transparent 0.9px); background-size: var(--sp) var(--sp); }`,
  },
  {
    id: "concentric-rings",
    name: "Concentric Rings",
    slug: "concentric-rings",
    category: "radial",
    tags: ["pattern", "radial", "rings", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Ripple of evenly spaced rings from a single point. A target without the bullseye.",
    browser: "All browsers.",
    recommendedFor: ["CTA", "Gallery"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(26px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-radial-gradient(circle at 50% 50%, rgba(29,29,31,0.10) 0 1px, transparent 1px var(--sp));
  -webkit-mask: radial-gradient(circle at 50% 50%, #000 30%, transparent 80%);
  mask: radial-gradient(circle at 50% 50%, #000 30%, transparent 80%);
}
${s}[data-theme="dark"]::before { background: repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0 1px, transparent 1px var(--sp)); }`,
  },
  {
    id: "radial-rays",
    name: "Radial Rays",
    slug: "radial-rays",
    category: "radial",
    tags: ["pattern", "rays", "conic", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Spokes of light fanning from the centre. Energetic, but masked to stay subtle.",
    browser: "Conic gradient — all modern browsers.",
    recommendedFor: ["Hero", "CTA"],
    controls: ["intensity", "density", "opacity"],
    defaults: { intensity: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --n: calc(48 * var(--gl-density, 1));
  background: repeating-conic-gradient(from 0deg at 50% 50%, rgba(29,29,31,0.10) 0deg calc(360deg / var(--n) / 2), transparent calc(360deg / var(--n) / 2) calc(360deg / var(--n)));
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent 8%, #000 30%, transparent 82%);
  mask: radial-gradient(circle at 50% 50%, transparent 8%, #000 30%, transparent 82%);
}
${s}[data-theme="dark"]::before { background: repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.12) 0deg calc(360deg / var(--n) / 2), transparent calc(360deg / var(--n) / 2) calc(360deg / var(--n))); }`,
  },
  {
    id: "topographic-lines",
    name: "Topographic Lines",
    slug: "topographic-lines",
    category: "pattern",
    tags: ["pattern", "lines", "contour", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Stacked contour-style curves suggesting a map. Two offset radial fields read as elevation.",
    browser: "All browsers.",
    recommendedFor: ["Gallery", "Report"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(30px * var(--gl-scale,1) / var(--gl-density,1));
  background:
    repeating-radial-gradient(circle at 18% 28%, rgba(29,29,31,0.09) 0 1px, transparent 1px var(--sp)),
    repeating-radial-gradient(circle at 82% 76%, rgba(29,29,31,0.07) 0 1px, transparent 1px calc(var(--sp) * 1.3));
}
${s}[data-theme="dark"]::before {
  background:
    repeating-radial-gradient(circle at 18% 28%, rgba(54,224,194,0.12) 0 1px, transparent 1px var(--sp)),
    repeating-radial-gradient(circle at 82% 76%, rgba(108,76,241,0.12) 0 1px, transparent 1px calc(var(--sp) * 1.3));
}`,
  },
  {
    id: "cross-grid",
    name: "Cross Grid",
    slug: "cross-grid",
    category: "pattern",
    tags: ["pattern", "grid", "both"],
    theme: "both",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Tiny plus-marks at each intersection instead of full lines. Engineering-drawing feel.",
    browser: "All browsers.",
    recommendedFor: ["Bento", "Report"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${patternBase(s)}
${s}::before {
  --sp: calc(40px * var(--gl-scale,1) / var(--gl-density,1));
  background:
    linear-gradient(0deg, transparent calc(50% - 4px), rgba(29,29,31,0.18) calc(50% - 4px) calc(50% + 4px), transparent calc(50% + 4px)),
    linear-gradient(90deg, transparent calc(50% - 4px), rgba(29,29,31,0.18) calc(50% - 4px) calc(50% + 4px), transparent calc(50% + 4px));
  background-size: var(--sp) var(--sp);
}
${s}[data-theme="dark"]::before {
  background:
    linear-gradient(0deg, transparent calc(50% - 4px), rgba(255,255,255,0.18) calc(50% - 4px) calc(50% + 4px), transparent calc(50% + 4px)),
    linear-gradient(90deg, transparent calc(50% - 4px), rgba(255,255,255,0.18) calc(50% - 4px) calc(50% + 4px), transparent calc(50% + 4px));
  background-size: var(--sp) var(--sp);
}`,
  },
  {
    id: "blueprint-grid",
    name: "Blueprint Grid",
    slug: "blueprint-grid",
    category: "pattern",
    tags: ["pattern", "grid", "combined", "dark"],
    theme: "dark",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Minor + major grid over a deep blue field. Drafting-table authority.",
    browser: "All browsers.",
    recommendedFor: ["Report", "Bento"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 1, scale: 1, density: 1 },
    css: (s) => `${s} { background: radial-gradient(120% 100% at 50% 0%, #102036 0%, #0a1422 100%); }
${s}[data-theme="light"] { background: radial-gradient(120% 100% at 50% 0%, #e7eefc 0%, #d9e3f7 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0; opacity: var(--gl-intensity, 1);
  --sp: calc(26px * var(--gl-scale,1) / var(--gl-density,1));
  background:
    repeating-linear-gradient(90deg, rgba(120,180,255,0.14) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(120,180,255,0.14) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(90deg, rgba(120,180,255,0.28) 0 1.4px, transparent 1.4px calc(var(--sp) * 5)),
    repeating-linear-gradient(0deg, rgba(120,180,255,0.28) 0 1.4px, transparent 1.4px calc(var(--sp) * 5));
}
${s}[data-theme="light"]::before {
  background:
    repeating-linear-gradient(90deg, rgba(40,80,160,0.12) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(0deg, rgba(40,80,160,0.12) 0 1px, transparent 1px var(--sp)),
    repeating-linear-gradient(90deg, rgba(40,80,160,0.24) 0 1.4px, transparent 1.4px calc(var(--sp) * 5)),
    repeating-linear-gradient(0deg, rgba(40,80,160,0.24) 0 1.4px, transparent 1.4px calc(var(--sp) * 5));
}`,
  },
  {
    id: "scan-lines",
    name: "Scan Lines",
    slug: "scan-lines",
    category: "pattern",
    tags: ["pattern", "lines", "experimental", "dark"],
    theme: "dark",
    technique: "css",
    performance: "low",
    animation: "none",
    reducedMotion: "static",
    description: "Dense horizontal scan bands. CRT texture, kept faint enough to stay legible.",
    browser: "All browsers.",
    recommendedFor: ["Hero", "Gallery"],
    controls: ["intensity", "scale", "density", "opacity"],
    defaults: { intensity: 0.8, scale: 1, density: 1 },
    css: (s) => `${s} { background: #070710; }
${s}[data-theme="light"] { background: #eceef5; }
${s}::before {
  content: ""; position: absolute; inset: 0; opacity: var(--gl-intensity, 0.8);
  --sp: calc(4px * var(--gl-scale,1) / var(--gl-density,1));
  background: repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px var(--sp));
}
${s}[data-theme="light"]::before { background: repeating-linear-gradient(0deg, rgba(29,29,31,0.06) 0 1px, transparent 1px var(--sp)); }`,
  },
];
