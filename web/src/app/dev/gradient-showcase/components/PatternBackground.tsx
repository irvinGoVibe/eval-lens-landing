"use client";

import type { CSSProperties } from "react";
import type { ShowcasePreset } from "../registries";
import { runtimeClass } from "../registries";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Repeating-gradient pattern background. The fade is read from `--gsc-mask`; we
 * only set it when the user picks a non-default variant, so the default fade
 * (baked into the preset CSS, matching the copied snippet) stays in effect
 * otherwise.
 */
export function PatternBackground({
  preset,
  maskValue,
}: {
  preset: ShowcasePreset;
  maskValue?: string;
}) {
  const style: Vars | undefined = maskValue
    ? { "--gsc-mask": maskValue }
    : undefined;

  return (
    <div
      aria-hidden
      className={`gsc-bg ${runtimeClass(preset)}`}
      style={style}
    />
  );
}
