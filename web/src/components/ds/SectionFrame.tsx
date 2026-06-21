"use client";

import { useState, type ReactNode } from "react";

type Surface = "soft" | "ink";
export type FrameState = { surface: Surface; version: 1 | 2 | 3 };

/**
 * SectionFrame — DS Sections inspector. Wraps one section and shows a floating
 * panel (like /dev/gallery & section-lab's LabMarkers) that switches the
 * surface (Light/Dark) and the layout version (v1/v2/v3). State drives the
 * wrapped section via a render-prop: children({ surface, version }).
 *
 * Geometry is surface-invariant within a version (light ≡ ink, only colour
 * flips), so the section just receives surface + version and styles itself.
 */
export function SectionFrame({
  label,
  versions = 3,
  defaultSurface = "soft",
  children,
}: {
  label: string;
  versions?: 1 | 2 | 3;
  defaultSurface?: Surface;
  children: (state: FrameState) => ReactNode;
}) {
  const [surface, setSurface] = useState<Surface>(defaultSurface);
  const [version, setVersion] = useState<1 | 2 | 3>(1);
  const vList = Array.from({ length: versions }, (_, i) => (i + 1) as 1 | 2 | 3);

  return (
    <div className="dssx-frame">
      {children({ surface, version })}

      <aside className="dssx-panel" aria-label={`${label} controls`}>
        <span className="dssx-panel__name">{label}</span>
        <div className="dssx-seg" role="group" aria-label="Surface">
          <button
            type="button"
            className={`dssx-seg__btn${surface === "soft" ? " is-active" : ""}`}
            aria-pressed={surface === "soft"}
            onClick={() => setSurface("soft")}
          >
            Light
          </button>
          <button
            type="button"
            className={`dssx-seg__btn${surface === "ink" ? " is-active" : ""}`}
            aria-pressed={surface === "ink"}
            onClick={() => setSurface("ink")}
          >
            Dark
          </button>
        </div>
        <div className="dssx-seg" role="group" aria-label="Version">
          {vList.map((v) => (
            <button
              key={v}
              type="button"
              className={`dssx-seg__btn${version === v ? " is-active" : ""}`}
              aria-pressed={version === v}
              onClick={() => setVersion(v)}
            >
              v{v}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
