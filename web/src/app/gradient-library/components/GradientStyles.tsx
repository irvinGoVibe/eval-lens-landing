"use client";

import { useMemo } from "react";
import { allPresets } from "../presets";

/**
 * Single source of truth for the rendered backgrounds: builds one stylesheet
 * from every preset's `css()` builder, scoped under `.gradient-library-page`
 * and targeting `.gl-surface[data-preset="<id>"]`. Because the same builder
 * produces the copyable snippet, what you see === what you copy.
 *
 * Injected at runtime (not via globals.css) so it stays isolated to this page
 * and is never touched by the build-time CSS pipeline — runtime CSS can freely
 * use color-mix / conic / mask without the Lightning-CSS caveats.
 */
export function GradientStyles() {
  const css = useMemo(
    () =>
      allPresets
        .map((p) =>
          p.css(`.gradient-library-page .gl-surface[data-preset="${p.id}"]`),
        )
        .join("\n"),
    [],
  );
  return <style data-gradient-library="presets">{css}</style>;
}
