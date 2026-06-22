import type { BackgroundPreset } from "./types";
import { staticPresets } from "./gradientPresets";
import { animatedPresets } from "./animatedPresets";
import { scrollPresets } from "./scrollPresets";
import { patternPresets } from "./patternPresets";
import { combinedPresets } from "./combinedPresets";

/** The full catalog, in display order. */
export const allPresets: BackgroundPreset[] = [
  ...staticPresets,
  ...animatedPresets,
  ...scrollPresets,
  ...patternPresets,
  ...combinedPresets,
];

export const presetsById: Record<string, BackgroundPreset> = Object.fromEntries(
  allPresets.map((p) => [p.id, p]),
);

/**
 * Filter chips. Each maps to a predicate over a preset. `All` matches
 * everything; the rest match by `category` or by membership in `tags`, so a
 * single preset surfaces under several chips (e.g. a combined aurora shows
 * under Animated + Aurora + Dots + Combined).
 */
export const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "static", label: "Static" },
  { key: "animated", label: "Animated" },
  { key: "scroll", label: "Scroll-driven" },
  { key: "mesh", label: "Mesh" },
  { key: "aurora", label: "Aurora" },
  { key: "radial", label: "Radial" },
  { key: "pattern", label: "Patterns" },
  { key: "lines", label: "Lines" },
  { key: "grid", label: "Grid" },
  { key: "dots", label: "Dots" },
  { key: "noise", label: "Noise" },
  { key: "combined", label: "Combined" },
  { key: "masks", label: "Masks" },
  { key: "experimental", label: "Experimental" },
];

/** True if the preset answers to the given filter key. */
export function matchesFilter(p: BackgroundPreset, key: string): boolean {
  if (key === "all") return true;
  if (key === "animated")
    return p.category === "animated" || p.animation !== "none";
  if (key === "static")
    return p.category === "static" && p.animation === "none";
  return p.category === key || p.tags.includes(key);
}

/** Free-text search over name, description, category and tags. */
export function matchesSearch(p: BackgroundPreset, q: string): boolean {
  if (!q.trim()) return true;
  const hay = `${p.name} ${p.slug} ${p.category} ${p.description} ${p.tags.join(
    " ",
  )}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((t) => hay.includes(t));
}

export * from "./types";
