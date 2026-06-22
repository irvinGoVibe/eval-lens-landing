import type { ShowcasePreset } from "./types";

/**
 * 07 — Combined gradient + pattern backgrounds (performance: low/medium).
 *
 * Composition rules, enforced per preset:
 *   - the gradient is primary (on `::before`),
 *   - the pattern is strictly secondary (on `::after`, 2–10% line/dot opacity),
 *   - the pattern is masked so it fades rather than covering uniformly,
 *   - the central text zone stays clean.
 */

export const combinedBackgrounds: ShowcasePreset[] = [
  {
    id: "atmospheric-fine-grid",
    name: "Light Atmospheric + Fine Grid",
    label: "radial fields + grid · CSS-only · low",
    category: "combined",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Airy sky, quiet structure",
    body: "The light atmospheric field with a barely-there grid layered beneath. The grid gives the eye something to rest on without ever pulling focus from content.",
    css: (s) => `${s} { background: #ffffff; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(58% 58% at 10% 6%, rgba(108,76,241,0.18) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(54% 54% at 92% 92%, rgba(46,197,232,0.16) 0%, rgba(46,197,232,0) 60%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.5;
  background:
    repeating-linear-gradient(90deg, rgba(29,29,31,0.05) 0 1px, transparent 1px 34px),
    repeating-linear-gradient(0deg, rgba(29,29,31,0.05) 0 1px, transparent 1px 34px);
  -webkit-mask: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
  mask: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
}`,
  },
  {
    id: "white-aurora-square-grid",
    name: "White Aurora + Square Grid",
    label: "soft aurora + grid · CSS-only · low",
    category: "combined",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Soft aurora over coarse squares",
    body: "Near-white aurora fields above a 56px square grid. The coarser cell keeps the structure architectural rather than technical.",
    css: (s) => `${s} { background: #f7f8fb; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(70% 50% at 28% 18%, rgba(169,155,255,0.20) 0%, rgba(169,155,255,0) 60%),
    radial-gradient(60% 50% at 78% 28%, rgba(46,197,232,0.12) 0%, rgba(46,197,232,0) 60%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.45;
  background:
    repeating-linear-gradient(90deg, rgba(29,29,31,0.05) 0 1px, transparent 1px 56px),
    repeating-linear-gradient(0deg, rgba(29,29,31,0.05) 0 1px, transparent 1px 56px);
  -webkit-mask: radial-gradient(circle at 50% 40%, #000 25%, transparent 80%);
  mask: radial-gradient(circle at 50% 40%, #000 25%, transparent 80%);
}`,
  },
  {
    id: "silver-violet-vertical-lines",
    name: "Silver Violet Wash + Vertical Lines",
    label: "silver wash + lines · CSS-only · low",
    category: "combined",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Editorial silver, ruled columns",
    body: "The premium silver-violet wash threaded with faint vertical rules. Clean, text-first, well suited to product and pricing layouts.",
    css: (s) => `${s} { background: linear-gradient(180deg, #eceef3 0%, #d8dbe4 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(72% 80% at 18% 0%, rgba(169,155,255,0.26) 0%, rgba(169,155,255,0) 56%),
    radial-gradient(60% 70% at 100% 100%, rgba(108,76,241,0.14) 0%, rgba(108,76,241,0) 60%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.55;
  background: repeating-linear-gradient(90deg, rgba(29,29,31,0.06) 0 1px, transparent 1px 30px);
  -webkit-mask: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
  mask: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
}`,
  },
  {
    id: "cinematic-technical-grid",
    name: "Dark Cinematic + Technical Grid",
    label: "key-light + grid · CSS-only · low",
    category: "combined",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "A filmic stage on a grid",
    body: "The violet key-light stage over a faint technical grid, masked to the centre. The grid implies a control surface beneath the cinematic glow.",
    css: (s) => `${s} { background: #0a0a0d; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(60% 55% at 22% 30%, rgba(108,76,241,0.30) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(140% 120% at 50% 50%, rgba(10,10,13,0) 55%, rgba(0,0,0,0.6) 100%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.5;
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 36px),
    repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 36px);
  -webkit-mask: radial-gradient(circle at 50% 45%, #000 20%, transparent 75%);
  mask: radial-gradient(circle at 50% 45%, #000 20%, transparent 75%);
}`,
  },
  {
    id: "deep-aurora-micro-dots",
    name: "Deep Aurora + Micro Dots",
    label: "aurora + dot grain · CSS-only · low",
    category: "combined",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Aurora veiled in fine grain",
    body: "A deep aurora overlaid with an ultra-fine dot grain that reads almost as texture. Movement-feel plus a tactile surface, still calm.",
    css: (s) => `${s} { background: #07080f; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(80% 45% at 35% 22%, rgba(108,76,241,0.38) 0%, rgba(108,76,241,0) 62%),
    radial-gradient(70% 42% at 68% 26%, rgba(255,95,162,0.28) 0%, rgba(255,95,162,0) 62%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.5;
  background: radial-gradient(rgba(255,255,255,0.10) 0.6px, transparent 0.9px);
  background-size: 9px 9px;
  -webkit-mask: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
  mask: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
}`,
  },
  {
    id: "azure-edge-perspective-grid",
    name: "Azure Edge Glow + Perspective Grid",
    label: "edge glow + 3D grid · CSS-only · medium",
    category: "combined",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Lit edges over a horizon",
    body: "Blue and cyan edge lighting above a receding perspective grid. Stage-and-horizon depth for a hero, with corner glows that frame the floor.",
    css: (s) => `${s} { background: #06060c; overflow: hidden; perspective: 340px; }
${s}::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background:
    radial-gradient(45% 70% at 0% 45%, rgba(59,108,246,0.30) 0%, rgba(59,108,246,0) 55%),
    radial-gradient(45% 70% at 100% 45%, rgba(46,197,232,0.28) 0%, rgba(46,197,232,0) 55%);
}
${s}::after {
  content: ""; position: absolute; left: -50%; right: -50%; top: 42%; bottom: -40%; opacity: 0.7;
  background:
    repeating-linear-gradient(90deg, rgba(46,197,232,0.20) 0 1px, transparent 1px 42px),
    repeating-linear-gradient(0deg, rgba(108,76,241,0.20) 0 1px, transparent 1px 42px);
  transform: rotateX(74deg); transform-origin: top center;
  -webkit-mask: linear-gradient(to bottom, transparent, #000 40%);
  mask: linear-gradient(to bottom, transparent, #000 40%);
}`,
  },
  {
    id: "violet-spotlight-concentric-rings",
    name: "Violet Spotlight + Concentric Rings",
    label: "spotlight + rings · CSS-only · low",
    category: "combined",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Focus, with a faint target",
    body: "A single violet spotlight ringed by concentric circles centred on the same point. Focus plus a subtle target, on an almost entirely black field.",
    css: (s) => `${s} { background: #08080c; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(45% 45% at 50% 42%, rgba(123,92,246,0.42) 0%, rgba(108,76,241,0.12) 38%, rgba(8,8,12,0) 70%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.45;
  background: repeating-radial-gradient(circle at 50% 42%, rgba(255,255,255,0.07) 0 1px, transparent 1px 28px);
  -webkit-mask: radial-gradient(circle at 50% 42%, #000 18%, transparent 72%);
  mask: radial-gradient(circle at 50% 42%, #000 18%, transparent 72%);
}`,
  },
  {
    id: "lens-reflection-radial-rays",
    name: "Black Lens Reflection + Radial Rays",
    label: "reflections + rays · CSS-only · low",
    category: "combined",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Light caught on coated glass",
    body: "Thin lens reflections with faint rays fanning from the centre, masked to a ring. The two together read as light catching an optical coating.",
    css: (s) => `${s} { background: #06070c; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(120% 70% at 50% -10%, rgba(169,155,255,0.16) 0%, rgba(169,155,255,0) 55%),
    radial-gradient(40% 60% at 8% 100%, rgba(46,197,232,0.14) 0%, rgba(46,197,232,0) 55%),
    radial-gradient(40% 60% at 92% 100%, rgba(255,95,162,0.14) 0%, rgba(255,95,162,0) 55%);
}
${s}::after {
  content: ""; position: absolute; inset: 0; opacity: 0.4;
  --gsc-n: 56;
  background: repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.08) 0deg calc(360deg / var(--gsc-n) / 2), transparent calc(360deg / var(--gsc-n) / 2) calc(360deg / var(--gsc-n)));
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent 8%, #000 32%, transparent 80%);
  mask: radial-gradient(circle at 50% 50%, transparent 8%, #000 32%, transparent 80%);
}`,
  },
];
