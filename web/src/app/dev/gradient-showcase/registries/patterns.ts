import type { ShowcasePreset } from "./types";

/**
 * 05 + 06 — Background patterns (CSS-only, performance: low).
 *
 * Pure `repeating-linear-gradient` / `repeating-radial-gradient` /
 * `repeating-conic-gradient` techniques — no images. Every pattern:
 *   - keeps spacing ≥ ~10px (via `--gsc-sp`) to avoid moiré on non-Retina,
 *   - is masked through `--gsc-mask` (default fade-edges; see masks.ts), so the
 *     pattern fades rather than covering the section at uniform intensity,
 *   - runs at 4–12% line/dot opacity so it stays strictly secondary to content.
 *
 * The set deliberately mixes light and dark surfaces so both modes are covered.
 */

/** Default fade so the copied CSS is paste-able even without the runtime var. */
const FADE =
  "linear-gradient(to bottom, transparent 0%, #000 15%, #000 85%, transparent 100%)";

/** Shared mask + base for a pattern living on a ::before layer. */
function maskedBase(s: string, surface: string): string {
  return `${s} { background: ${surface}; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  -webkit-mask: var(--gsc-mask, ${FADE});
  mask: var(--gsc-mask, ${FADE});
}`;
}

export const patterns: ShowcasePreset[] = [
  {
    id: "fine-grid",
    name: "Fine Grid",
    label: "repeating-linear ×2 · CSS-only · low",
    category: "pattern",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Quiet structure underfoot",
    body: "A thin grid at a 40px cell, hairlines at ~6% opacity. The neutral backbone for editorial and dashboard layouts — present but never loud.",
    css: (s) => `${maskedBase(s, "#f7f8fb")}
${s}::before {
  --gsc-sp: 40px;
  background:
    repeating-linear-gradient(90deg, rgba(29,29,31,0.06) 0 1px, transparent 1px var(--gsc-sp)),
    repeating-linear-gradient(0deg, rgba(29,29,31,0.06) 0 1px, transparent 1px var(--gsc-sp));
}`,
  },
  {
    id: "square-grid",
    name: "Square Grid",
    label: "repeating-linear ×2 · CSS-only · low",
    category: "pattern",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Larger squares, lit joints",
    body: "A coarser 64px grid where intersections carry a faint extra glow. No checkerboard fill — just the lines and their crossings.",
    css: (s) => `${maskedBase(s, "#f5f6fa")}
${s}::before {
  --gsc-sp: 64px;
  background:
    repeating-linear-gradient(90deg, rgba(29,29,31,0.08) 0 1px, transparent 1px var(--gsc-sp)),
    repeating-linear-gradient(0deg, rgba(29,29,31,0.08) 0 1px, transparent 1px var(--gsc-sp)),
    radial-gradient(rgba(108,76,241,0.10) 1.5px, transparent 2px);
  background-size: var(--gsc-sp) var(--gsc-sp), var(--gsc-sp) var(--gsc-sp), var(--gsc-sp) var(--gsc-sp);
}`,
  },
  {
    id: "micro-grid",
    name: "Micro Grid",
    label: "repeating-linear ×2 · CSS-only · low",
    category: "pattern",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "A fine technical mesh",
    body: "A very fine 16px grid on a dark surface — kept above the moiré threshold and masked to the centre. Verify on mobile / non-Retina before shipping at this density.",
    css: (s) => `${maskedBase(s, "#0a0a10")}
${s}::before {
  --gsc-sp: 16px;
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px var(--gsc-sp)),
    repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px var(--gsc-sp));
}`,
  },
  {
    id: "vertical-lines",
    name: "Vertical Lines",
    label: "repeating-linear · CSS-only · low",
    category: "pattern",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Hairline columns",
    body: "Thin vertical rules at an even 28px step, faded at top and bottom. Quiet structure for editorial columns and pricing tables.",
    css: (s) => `${maskedBase(s, "#f7f8fb")}
${s}::before {
  --gsc-sp: 28px;
  background: repeating-linear-gradient(90deg, rgba(29,29,31,0.09) 0 1px, transparent 1px var(--gsc-sp));
}`,
  },
  {
    id: "horizontal-lines",
    name: "Horizontal Lines",
    label: "repeating-linear · CSS-only · low",
    category: "pattern",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Ruled-paper rhythm",
    body: "Low-contrast horizontal hairlines at a 28px rhythm — like ruled paper dialled almost to invisible. A calm bed for long-form editorial sections.",
    css: (s) => `${maskedBase(s, "#f7f8fb")}
${s}::before {
  --gsc-sp: 28px;
  background: repeating-linear-gradient(0deg, rgba(29,29,31,0.08) 0 1px, transparent 1px var(--gsc-sp));
}`,
  },
  {
    id: "diagonal-lines",
    name: "Diagonal Lines",
    label: "repeating-linear 38° · CSS-only · low",
    category: "pattern",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Motion-feel without motion",
    body: "Diagonal hairlines at 38° and a 22px step. Adds energy to a static panel — kept faint so it never turns aggressive or hatched.",
    css: (s) => `${maskedBase(s, "#0a0a10")}
${s}::before {
  --gsc-sp: 22px;
  background: repeating-linear-gradient(38deg, rgba(255,255,255,0.07) 0 1px, transparent 1px var(--gsc-sp));
}`,
  },
  {
    id: "dot-matrix",
    name: "Dot Matrix",
    label: "radial-gradient tile · CSS-only · low",
    category: "pattern",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "The friendliest structure",
    body: "A regular dot grid at a 26px step — softer than lines, still tidy. Reads as a tactile surface behind cards and galleries.",
    css: (s) => `${maskedBase(s, "#f7f8fb")}
${s}::before {
  --gsc-sp: 26px;
  background: radial-gradient(rgba(29,29,31,0.16) 1.2px, transparent 1.4px);
  background-size: var(--gsc-sp) var(--gsc-sp);
}`,
  },
  {
    id: "perspective-grid",
    name: "Perspective Grid",
    label: "3D-transformed grid · CSS-only · medium",
    category: "pattern",
    theme: "dark",
    technique: "css",
    performance: "medium",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "A floor receding to a horizon",
    body: "A grid tilted on the X axis so it recedes into depth — stage-and-horizon perspective, all CSS, no 3D engine. Masked at the horizon so it dissolves cleanly.",
    css: (s) => `${s} { background: #06060c; overflow: hidden; perspective: 320px; }
${s}::before {
  content: ""; position: absolute; left: -50%; right: -50%; top: 38%; bottom: -40%;
  --gsc-sp: 40px;
  background:
    repeating-linear-gradient(90deg, rgba(46,197,232,0.26) 0 1px, transparent 1px var(--gsc-sp)),
    repeating-linear-gradient(0deg, rgba(108,76,241,0.26) 0 1px, transparent 1px var(--gsc-sp));
  transform: rotateX(72deg);
  transform-origin: top center;
  -webkit-mask: linear-gradient(to bottom, transparent, #000 40%);
  mask: linear-gradient(to bottom, transparent, #000 40%);
}`,
  },
  {
    id: "radial-rays",
    name: "Radial Rays",
    label: "repeating-conic · CSS-only · low",
    category: "pattern",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Spokes of light from a point",
    body: "Thin rays fanning from a single focal point at very low opacity, masked to a ring so the centre and rim stay clean. Energetic but disciplined.",
    css: (s) => `${s} { background: #07070c; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  --gsc-n: 48;
  background: repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.10) 0deg calc(360deg / var(--gsc-n) / 2), transparent calc(360deg / var(--gsc-n) / 2) calc(360deg / var(--gsc-n)));
  -webkit-mask: radial-gradient(circle at 50% 50%, transparent 8%, #000 30%, transparent 82%);
  mask: radial-gradient(circle at 50% 50%, transparent 8%, #000 30%, transparent 82%);
}`,
  },
  {
    id: "concentric-rings",
    name: "Concentric Rings",
    label: "repeating-radial · CSS-only · low",
    category: "pattern",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Ripple from a single point",
    body: "Evenly spaced rings radiating from the centre at a 26px step — a soft target without a bullseye. Good around a lens or focal object.",
    css: (s) => `${s} { background: #f5f6fa; }
${s}::before {
  content: ""; position: absolute; inset: 0;
  --gsc-sp: 26px;
  background: repeating-radial-gradient(circle at 50% 50%, rgba(29,29,31,0.10) 0 1px, transparent 1px var(--gsc-sp));
  -webkit-mask: radial-gradient(circle at 50% 50%, #000 30%, transparent 80%);
  mask: radial-gradient(circle at 50% 50%, #000 30%, transparent 80%);
}`,
  },
  {
    id: "technical-cross-grid",
    name: "Technical Cross Grid",
    label: "linear tiles · CSS-only · low",
    category: "pattern",
    theme: "light",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Plus-marks at every node",
    body: "Tiny plus marks at each intersection instead of full lines — an engineering-drawing feel that stays premium. Combines short crosses on a clean surface.",
    css: (s) => `${maskedBase(s, "#f7f8fb")}
${s}::before {
  --gsc-sp: 40px;
  background:
    linear-gradient(0deg, transparent calc(50% - 4px), rgba(29,29,31,0.16) calc(50% - 4px) calc(50% + 4px), transparent calc(50% + 4px)),
    linear-gradient(90deg, transparent calc(50% - 4px), rgba(29,29,31,0.16) calc(50% - 4px) calc(50% + 4px), transparent calc(50% + 4px));
  background-size: var(--gsc-sp) var(--gsc-sp);
}`,
  },
  {
    id: "topographic-lines",
    name: "Topographic Lines",
    label: "repeating-radial ×2 · CSS-only · low",
    category: "pattern",
    theme: "dark",
    technique: "css",
    performance: "low",
    cssOnly: true,
    motion: "none",
    reducedMotion: "static",
    heading: "Abstract contour map",
    body: "Two offset repeating-radial fields read as elevation contours — thin, secondary lines suggesting a topographic map without any SVG.",
    css: (s) => `${maskedBase(s, "#0a0a10")}
${s}::before {
  --gsc-sp: 30px;
  background:
    repeating-radial-gradient(circle at 18% 28%, rgba(255,95,162,0.12) 0 1px, transparent 1px var(--gsc-sp)),
    repeating-radial-gradient(circle at 82% 76%, rgba(108,76,241,0.12) 0 1px, transparent 1px calc(var(--gsc-sp) * 1.3));
}`,
  },
];
