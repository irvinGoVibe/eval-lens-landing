import { allPresets, runtimeClass } from "./index";

/**
 * Concatenate every preset's CSS, each scoped to its runtime class, into a
 * single stylesheet string. Injected once (server-rendered) so there's no FOUC
 * and no per-section <style> churn. Keyframe names are namespaced per preset, so
 * concatenation is collision-free.
 *
 * The rendered selector (`.gsc-<id>`) and the copy selector
 * (`.gradient-showcase`) are produced by the SAME `css()` builder, guaranteeing
 * the copied snippet matches what's on screen (only the selector differs).
 */
export function buildShowcaseStylesheet(): string {
  return allPresets
    .map((p) => p.css(`.gradient-showcase-page .${runtimeClass(p)}`))
    .join("\n\n");
}
