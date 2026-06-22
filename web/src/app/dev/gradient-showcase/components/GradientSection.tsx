"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { ShowcasePreset } from "../registries";
import {
  COPY_SELECTOR,
  MASK_VARIANTS,
  hasTimedMotion,
  runtimeClass,
} from "../registries";
import { DynamicGradient } from "./DynamicGradient";
import { ScrollGradient } from "./ScrollGradient";
import { PatternBackground } from "./PatternBackground";
import { CombinedBackground } from "./CombinedBackground";
import { PreviewContent } from "./PreviewContent";
import { CopyCodeButton } from "./CopyCodeButton";

/** One full-height preview: background + label rail + test content + controls. */
export function GradientSection({
  preset,
  index,
}: {
  preset: ShowcasePreset;
  index: string;
}) {
  const [paused, setPaused] = useState(false);
  const [maskIdx, setMaskIdx] = useState(0);

  const timed = hasTimedMotion(preset);
  const isPattern = preset.category === "pattern";
  const mask = MASK_VARIANTS[maskIdx];

  let background: ReactNode;
  switch (preset.category) {
    case "dynamic":
      background = <DynamicGradient preset={preset} paused={paused} />;
      break;
    case "scroll":
      background = <ScrollGradient preset={preset} />;
      break;
    case "pattern":
      background = (
        <PatternBackground
          preset={preset}
          maskValue={maskIdx === 0 ? undefined : mask.value}
        />
      );
      break;
    case "combined":
      background = <CombinedBackground preset={preset} />;
      break;
    case "vivid":
      background = hasTimedMotion(preset) ? (
        <DynamicGradient preset={preset} paused={paused} />
      ) : (
        <div aria-hidden className={`gsc-bg ${runtimeClass(preset)}`} />
      );
      break;
    default:
      // static light / dark — no runtime wiring needed
      background = (
        <div aria-hidden className={`gsc-bg ${runtimeClass(preset)}`} />
      );
  }

  const motionStatus =
    preset.motion === "pointer"
      ? "Pointer-reactive"
      : preset.motion === "scroll"
        ? "Scroll-driven"
        : "Static — no motion";

  return (
    <section className={`gsc-section gsc-theme-${preset.theme}`}>
      <div className="gsc-bg-wrap">{background}</div>

      <div className="gsc-inner">
        <header className="gsc-meta">
          <span className="gsc-index">{index}</span>
          <div className="gsc-meta-main">
            <h2 className="gsc-name">{preset.name}</h2>
            <p className="gsc-label">{preset.label}</p>
          </div>
          <div className="gsc-chips">
            <span className={`gsc-chip gsc-chip-${preset.theme}`}>
              {preset.theme}
            </span>
            <span className="gsc-chip">{preset.performance} cost</span>
            <span className="gsc-chip">
              {preset.cssOnly ? "CSS-only" : "CSS + JS"}
            </span>
            {preset.motion !== "none" && (
              <span className="gsc-chip">{preset.motion}</span>
            )}
          </div>
        </header>

        <PreviewContent
          heading={preset.heading}
          body={preset.body}
          theme={preset.theme}
        />

        <div className="gsc-controls">
          <CopyCodeButton code={preset.css(COPY_SELECTOR)} />

          {timed ? (
            <button
              type="button"
              className="gsc-btn"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              {paused ? "Play animation" : "Pause animation"}
            </button>
          ) : (
            <button type="button" className="gsc-btn" disabled>
              {motionStatus}
            </button>
          )}

          {isPattern && (
            <button
              type="button"
              className="gsc-btn"
              onClick={() => setMaskIdx((i) => (i + 1) % MASK_VARIANTS.length)}
            >
              {mask.label}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
