"use client";

import type { CSSProperties, ReactNode } from "react";
import { presetsById } from "../presets";
import { controlVars, type ControlValues } from "./GradientBackground";

/**
 * Standalone pattern layer — drop a registered pattern preset over arbitrary
 * content (the gradient stays whatever you put behind it). Useful for mixing a
 * pattern onto a surface that isn't one of the combined presets.
 */
export function PatternOverlay({
  preset,
  theme = "light",
  controls,
  style,
  children,
}: {
  preset: string;
  theme?: "light" | "dark";
  controls?: ControlValues;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  if (!presetsById[preset]) return <>{children}</>;
  return (
    <div className="gl-bg" style={style}>
      <div
        className="gl-surface"
        data-preset={preset}
        data-theme={theme}
        style={controlVars(controls ?? {})}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
