"use client";

import type { CSSProperties, ReactNode } from "react";
import { presetsById, type ControlKey } from "../presets";

/**
 * Reusable background surface — the component the catalog's "Usage" snippet
 * refers to. Renders the preset's layer behind `children`. Control overrides
 * are passed as CSS custom properties so nothing re-mounts when they change.
 *
 * NOTE: relies on <GradientStyles/> being mounted once on the page (or the
 * preset CSS being present in your app) to supply the actual background rules.
 */
export type ControlValues = Partial<Record<ControlKey, number>>;

const VAR_NAME: Record<ControlKey, string> = {
  intensity: "--gl-intensity",
  speed: "--gl-speed",
  scale: "--gl-scale",
  opacity: "--gl-opacity",
  blur: "--gl-blur",
  noise: "--gl-noise",
  density: "--gl-density",
  pointer: "--gl-pointer",
  scroll: "--gl-scroll",
};

/** Map control values to the CSS custom properties the preset reads. */
export function controlVars(values: ControlValues): CSSProperties {
  const out: Record<string, string> = {};
  (Object.keys(values) as ControlKey[]).forEach((k) => {
    const v = values[k];
    if (v != null) out[VAR_NAME[k]] = String(v);
  });
  return out as unknown as CSSProperties;
}

export function GradientBackground({
  preset,
  theme,
  paused = false,
  controls,
  className = "",
  surfaceStyle,
  children,
}: {
  preset: string;
  theme?: "light" | "dark";
  paused?: boolean;
  controls?: ControlValues;
  className?: string;
  surfaceStyle?: CSSProperties;
  children?: ReactNode;
}) {
  const def = presetsById[preset];
  const resolvedTheme =
    theme ?? (def?.theme === "dark" ? "dark" : def?.theme === "light" ? "light" : "light");

  const style: CSSProperties = {
    ...controlVars(controls ?? {}),
    ...(paused ? ({ ["--gl-play"]: "paused" } as CSSProperties) : null),
    ...surfaceStyle,
  };

  return (
    <div className={`gl-bg ${className}`}>
      <div
        className="gl-surface"
        data-preset={preset}
        data-theme={resolvedTheme}
        style={style}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
