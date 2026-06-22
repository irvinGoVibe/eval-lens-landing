import type { ShowcaseCategory, ShowcasePreset } from "./types";
import { lightGradients, darkGradients } from "./staticGradients";
import { dynamicGradients } from "./dynamicGradients";
import { scrollGradients } from "./scrollGradients";
import { patterns } from "./patterns";
import { combinedBackgrounds } from "./combinedBackgrounds";
import { vividGradients } from "./vividGradients";

export * from "./types";
export * from "./masks";
export {
  lightGradients,
  darkGradients,
  dynamicGradients,
  scrollGradients,
  patterns,
  combinedBackgrounds,
  vividGradients,
};

/** The runtime class that the injected stylesheet targets for a preset. */
export function runtimeClass(p: ShowcasePreset): string {
  return `gsc-${p.id}`;
}

/** The clean selector used for the copy-to-clipboard snippet. */
export const COPY_SELECTOR = ".gradient-showcase";

/**
 * The chapters of the page, in display order. Each maps a numbered title to its
 * preset list. Section labels mirror the brief's example outline.
 */
export type ShowcaseChapter = {
  num: string;
  title: string;
  blurb: string;
  category: ShowcaseCategory | "static-light" | "static-dark";
  presets: ShowcasePreset[];
};

export const CHAPTERS: ShowcaseChapter[] = [
  {
    num: "01",
    title: "Light gradients",
    blurb:
      "Clean, high-key fields on white and cool-neutral bases. The centre always stays legible.",
    category: "static-light",
    presets: lightGradients,
  },
  {
    num: "02",
    title: "Dark gradients",
    blurb:
      "Deep black stages with restrained, local glow — large fields of true black are preserved.",
    category: "static-dark",
    presets: darkGradients,
  },
  {
    num: "03",
    title: "Dynamic gradients",
    blurb:
      "Time-based motion, transform/opacity only, slow cycles. Pause any of them with the control.",
    category: "dynamic",
    presets: dynamicGradients,
  },
  {
    num: "04",
    title: "Scroll-driven gradients",
    blurb:
      "Driven by scroll position, not time. CSS scroll timelines where supported, JS fallback otherwise.",
    category: "scroll",
    presets: scrollGradients,
  },
  {
    num: "05",
    title: "Background patterns",
    blurb:
      "Pure repeating-gradient grids, lines, dots and rays — masked, secondary, never moiré.",
    category: "pattern",
    presets: patterns,
  },
  {
    num: "06",
    title: "Combined gradient + pattern",
    blurb:
      "Gradient primary, pattern secondary at 2–10% and masked. The text zone stays clean.",
    category: "combined",
    presets: combinedBackgrounds,
  },
  {
    num: "07",
    title: "Vivid / warm gradients",
    blurb:
      "The off-brand chapter: saturated amber–orange–rose fields, often bridged back into brand violet. No green.",
    category: "vivid",
    presets: vividGradients,
  },
];

/** The complete catalog in display order (used for stylesheet generation). */
export const allPresets: ShowcasePreset[] = CHAPTERS.flatMap((c) => c.presets);

export const counts = {
  light: lightGradients.length,
  dark: darkGradients.length,
  dynamic: dynamicGradients.length,
  scroll: scrollGradients.length,
  patterns: patterns.length,
  combined: combinedBackgrounds.length,
  vivid: vividGradients.length,
  total: allPresets.length,
};
