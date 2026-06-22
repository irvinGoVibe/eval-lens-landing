"use client";

import type { CSSProperties } from "react";
import type { ShowcasePreset } from "../registries";
import { runtimeClass } from "../registries";
import { useReducedMotion, useScrollProgress } from "../hooks";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Scroll-position-driven background. Drives `--gsc-scroll` (0 → 1) from the
 * element's travel through the viewport — the universal fallback that also
 * mirrors the native `@supports (animation-timeline: view())` enhancement
 * baked into each preset's CSS. Under reduced motion no listeners attach and
 * the field is parked at a pleasing fixed frame (0.5).
 */
export function ScrollGradient({ preset }: { preset: ShowcasePreset }) {
  const reduced = useReducedMotion();
  const { ref, progress } = useScrollProgress(!reduced);
  const value = reduced ? 0.5 : progress;
  const style: Vars = { "--gsc-scroll": value };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      aria-hidden
      className={`gsc-bg ${runtimeClass(preset)}`}
      style={style}
    />
  );
}
