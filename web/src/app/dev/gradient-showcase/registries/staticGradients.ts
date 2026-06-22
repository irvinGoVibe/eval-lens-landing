import type { ShowcasePreset } from "./types";

/**
 * 01 + 02 — Static gradients (CSS-only, no animation, performance: low).
 *
 * Each preset paints a flat base on the surface and the gradient field on a
 * `::before` layer. Light presets keep the centre clean and readable; dark
 * presets keep large fields of true black with restrained, local glow. Only
 * the EvalLense palette + approved cool neutrals (cool-white #f7f8fb, smoke
 * #eceef3, silver #d8dbe4, graphite #14151b, deep navy-black #07080f) are used.
 */

export const lightGradients: ShowcasePreset[] = [
  {
    id: "light-atmospheric",
    name: "Light Atmospheric",
    label: "radial fields · CSS-only · low",
    category: "light",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Calm, airy, never competes with text",
    body: "Clean white base with a violet field in one corner and a cyan field opposite. The centre stays open white space so headlines and body copy read at full contrast.",
    css: (s) => `${s} { background: #ffffff; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(58% 58% at 10% 6%, rgba(108,76,241,0.20) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(54% 54% at 92% 92%, rgba(46,197,232,0.18) 0%, rgba(46,197,232,0) 60%),
    radial-gradient(48% 48% at 90% 8%, rgba(255,95,162,0.06) 0%, rgba(255,95,162,0) 55%);
}`,
  },
  {
    id: "white-aurora",
    name: "White Aurora",
    label: "soft aurora fields · CSS-only · low",
    category: "light",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Almost-white, the faintest aurora",
    body: "A near-white sky with soft, low-saturation aurora fields of lavender and pink. No muddy grey transitions — every blend resolves back into clean paper.",
    css: (s) => `${s} { background: #f7f8fb; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(70% 50% at 28% 18%, rgba(169,155,255,0.22) 0%, rgba(169,155,255,0) 60%),
    radial-gradient(60% 50% at 78% 28%, rgba(46,197,232,0.13) 0%, rgba(46,197,232,0) 60%),
    radial-gradient(85% 60% at 50% 104%, rgba(255,95,162,0.05) 0%, rgba(247,248,251,0) 64%);
}`,
  },
  {
    id: "silver-violet-wash",
    name: "Silver Violet Wash",
    label: "linear base + radial wash · CSS-only · low",
    category: "light",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Premium editorial, cool silver base",
    body: "A cool silver gradient base lifted by lavender and violet reflections. Reads as brushed metal under soft light — well suited to product and pricing sections.",
    css: (s) => `${s} { background: linear-gradient(180deg, #eceef3 0%, #d8dbe4 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(72% 80% at 18% 0%, rgba(169,155,255,0.30) 0%, rgba(169,155,255,0) 56%),
    radial-gradient(60% 70% at 100% 100%, rgba(108,76,241,0.16) 0%, rgba(108,76,241,0) 60%);
}`,
  },
  {
    id: "cyan-edge-light",
    name: "Cyan Edge Light",
    label: "edge radial glow · CSS-only · low",
    category: "light",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Lit from the edges, white at heart",
    body: "Cyan and pink glow in from the left and right edges only; the centre stays bright white. A soft optical halo that frames content without crowding it.",
    css: (s) => `${s} { background: #ffffff; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(40% 80% at 0% 50%, rgba(46,197,232,0.22) 0%, rgba(46,197,232,0) 55%),
    radial-gradient(40% 80% at 100% 50%, rgba(255,95,162,0.10) 0%, rgba(255,95,162,0) 55%),
    radial-gradient(60% 46% at 50% 0%, rgba(108,76,241,0.06) 0%, rgba(255,255,255,0) 60%);
}`,
  },
  {
    id: "radial-focus-light",
    name: "Radial Focus Light",
    label: "single radial pool · CSS-only · low",
    category: "light",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Soft focus on the centre",
    body: "A single light pool behind the focal area, edges falling away to almost white. Ideal for drawing the eye to a headline or a centred object.",
    css: (s) => `${s} { background: #eef0f5; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(56% 56% at 50% 42%, #ffffff 0%, rgba(255,255,255,0.85) 30%, rgba(238,240,245,0) 72%);
}`,
  },
  {
    id: "light-mesh",
    name: "Light Mesh",
    label: "4-point mesh · CSS-only · low",
    category: "light",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Asymmetric four-colour mesh",
    body: "Four very large, low-saturation colour fields placed asymmetrically — violet, cyan, pink, lavender. No tiny blobs; the composition stays soft and open.",
    css: (s) => `${s} { background: #f5f6fa; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(62% 62% at 16% 22%, rgba(108,76,241,0.16) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(66% 66% at 86% 16%, rgba(46,197,232,0.14) 0%, rgba(46,197,232,0) 60%),
    radial-gradient(70% 70% at 76% 88%, rgba(255,95,162,0.07) 0%, rgba(255,95,162,0) 60%),
    radial-gradient(60% 60% at 10% 90%, rgba(169,155,255,0.16) 0%, rgba(169,155,255,0) 60%);
}`,
  },
];

export const darkGradients: ShowcasePreset[] = [
  {
    id: "dark-cinematic",
    name: "Dark Cinematic",
    label: "radial key-light + vignette · CSS-only · low",
    category: "dark",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "A deep black stage, one key light",
    body: "A stage that lifts to cool violet near the top and falls to true black, with one violet key-light from below and a cool blue fill. The tonal base keeps it filmic, not flat.",
    css: (s) => `${s} { background: radial-gradient(135% 115% at 50% -8%, #17171f 0%, #0c0c10 52%, #070709 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(66% 60% at 26% 80%, rgba(108,76,241,0.42) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(58% 52% at 82% 16%, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 60%),
    radial-gradient(150% 135% at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.72) 100%);
}
${s}::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(169,155,255,0.06) 0%, rgba(169,155,255,0) 24%);
}`,
  },
  {
    id: "deep-aurora",
    name: "Deep Aurora",
    label: "aurora ribbon · CSS-only · low",
    category: "dark",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "A frozen aurora over deep black",
    body: "A wide aurora of violet, blue and lavender across the upper third, fading into a deep navy-violet base that sinks to black below.",
    css: (s) => `${s} { background: linear-gradient(168deg, #121120 0%, #0b0b11 56%, #060608 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(78% 44% at 30% 18%, rgba(123,92,246,0.44) 0%, rgba(123,92,246,0) 62%),
    radial-gradient(72% 40% at 62% 24%, rgba(59,130,246,0.30) 0%, rgba(59,130,246,0) 62%),
    radial-gradient(54% 32% at 85% 14%, rgba(169,155,255,0.26) 0%, rgba(169,155,255,0) 60%);
}
${s}::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(6,6,8,0) 42%, rgba(6,6,8,0.85) 100%);
}`,
  },
  {
    id: "azure-edge-glow",
    name: "Azure Edge Glow",
    label: "edge lighting · CSS-only · low",
    category: "dark",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Near-black centre, lit edges",
    body: "Blue and cyan rake in from the edges while the centre stays near-black; a violet pool rises from below. Calibrated to sit behind glass cards without washing them out.",
    css: (s) => `${s} { background: radial-gradient(120% 100% at 50% 122%, #131322 0%, #0a0a0e 58%, #070709 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(40% 82% at 0% 50%, rgba(59,130,246,0.36) 0%, rgba(59,130,246,0) 56%),
    radial-gradient(40% 82% at 100% 50%, rgba(46,197,232,0.30) 0%, rgba(46,197,232,0) 56%),
    radial-gradient(82% 58% at 50% 124%, rgba(108,76,241,0.26) 0%, rgba(8,8,15,0) 60%);
}`,
  },
  {
    id: "violet-spotlight",
    name: "Violet Spotlight",
    label: "single radial spotlight · CSS-only · low",
    category: "dark",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "One local violet spotlight",
    body: "A single tight violet spotlight on a base that barely lifts beneath it, then drops to black — no even glow across the section. Maximum drama on the focal area.",
    css: (s) => `${s} { background: radial-gradient(130% 120% at 50% 34%, #16151f 0%, #0a0a0d 50%, #060608 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(40% 40% at 50% 40%, rgba(123,92,246,0.52) 0%, rgba(108,76,241,0.16) 34%, rgba(8,8,12,0) 66%),
    radial-gradient(150% 135% at 50% 48%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.7) 100%);
}`,
  },
  {
    id: "dark-mesh",
    name: "Dark Mesh",
    label: "4-point mesh · CSS-only · low",
    category: "dark",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Four restrained colour fields",
    body: "Four large fields — violet, blue, cyan, lavender — on a deep violet-black base. Moody, balanced depth with no neon and no green.",
    css: (s) => `${s} { background: linear-gradient(160deg, #121121 0%, #0b0b11 58%, #070709 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(52% 52% at 18% 22%, rgba(108,76,241,0.38) 0%, rgba(108,76,241,0) 60%),
    radial-gradient(50% 50% at 84% 20%, rgba(59,130,246,0.26) 0%, rgba(59,130,246,0) 60%),
    radial-gradient(54% 54% at 80% 84%, rgba(46,197,232,0.20) 0%, rgba(46,197,232,0) 60%),
    radial-gradient(50% 50% at 14% 86%, rgba(169,155,255,0.26) 0%, rgba(169,155,255,0) 60%);
}`,
  },
  {
    id: "black-lens-reflection",
    name: "Black Lens Reflection",
    label: "reflections + sheen · CSS-only · low",
    category: "dark",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Light on optical glass",
    body: "A near-black glass with soft lavender, blue and violet reflections and a single diagonal sheen drawn in the brand lens hues — light catching a coated optical lens.",
    css: (s) => `${s} { background: radial-gradient(120% 90% at 50% -10%, #131220 0%, #08080c 60%, #060608 100%); }
${s}::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(120% 64% at 50% -12%, rgba(169,155,255,0.18) 0%, rgba(169,155,255,0) 55%),
    radial-gradient(42% 60% at 8% 104%, rgba(59,130,246,0.16) 0%, rgba(59,130,246,0) 55%),
    radial-gradient(42% 60% at 92% 104%, rgba(123,92,246,0.18) 0%, rgba(123,92,246,0) 55%);
}
${s}::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(118deg, rgba(108,76,241,0) 40%, rgba(169,155,255,0.12) 49%, rgba(46,197,232,0.07) 55%, rgba(108,76,241,0) 66%);
}`,
  },
];
