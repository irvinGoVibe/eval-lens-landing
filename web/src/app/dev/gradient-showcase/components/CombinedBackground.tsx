import type { ShowcasePreset } from "../registries";
import { runtimeClass } from "../registries";

/**
 * Combined gradient + pattern background. The composition is entirely static
 * CSS (gradient on `::before`, masked pattern on `::after`), so no runtime
 * wiring is needed — just the scoped class.
 */
export function CombinedBackground({ preset }: { preset: ShowcasePreset }) {
  return <div aria-hidden className={`gsc-bg ${runtimeClass(preset)}`} />;
}
