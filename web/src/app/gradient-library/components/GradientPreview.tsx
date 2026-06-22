"use client";

import { type CSSProperties, useCallback, useState } from "react";
import type { BackgroundPreset } from "../presets";
import { controlVars, type ControlValues } from "./GradientBackground";
import { NoiseOverlay } from "./NoiseOverlay";
import { PreviewContent } from "./PreviewContent";
import { useScrollProgress } from "../hooks/useScrollProgress";

/**
 * The live preview surface used by cards and fullscreen. Owns:
 *  - pointer tracking (only for pointer-reactive presets, off under reduced motion)
 *  - scroll progress → `--gl-scroll` (live in cards, manual in fullscreen / RM)
 *  - opacity / blur on the surface, grain via NoiseOverlay
 *  - pause / reduced-motion freezing via `--gl-play`
 */
export function GradientPreview({
  preset,
  theme,
  controls,
  paused = false,
  reducedMotion = false,
  showContent = true,
  showGlass = true,
  showPattern = true,
  scrollMode = "live",
  compact = false,
  className = "",
}: {
  preset: BackgroundPreset;
  theme: "light" | "dark";
  controls: ControlValues;
  paused?: boolean;
  reducedMotion?: boolean;
  showContent?: boolean;
  showGlass?: boolean;
  showPattern?: boolean;
  scrollMode?: "live" | "manual";
  compact?: boolean;
  className?: string;
}) {
  const isScroll = preset.animation === "scroll";
  const useLive = isScroll && scrollMode === "live" && !reducedMotion;
  const { ref: scrollRef, progress } = useScrollProgress(useLive);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  // Callback ref: assigns the host to the scroll-progress hook during commit,
  // before any effect runs, so the observer attaches to a real element.
  const setHost = useCallback(
    (node: HTMLDivElement | null) => {
      scrollRef.current = node;
    },
    [scrollRef],
  );

  const wantsPointer = preset.controls.includes("pointer") && !reducedMotion;
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!wantsPointer) return;
      const r = e.currentTarget.getBoundingClientRect();
      setPointer({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    },
    [wantsPointer],
  );

  const frozen = paused || reducedMotion;
  const scrollValue = useLive ? progress : controls.scroll ?? 0;
  const opacity = controls.opacity ?? 1;
  const blur = controls.blur ?? 0;
  const noise = controls.noise ?? 0;

  // CSS vars the preset reads (everything except opacity/blur/noise, which
  // are applied structurally on the surface element below).
  const presetVars = controlVars({
    intensity: controls.intensity,
    speed: controls.speed,
    scale: controls.scale,
    density: controls.density,
    pointer: controls.pointer,
  });

  const surfaceStyle = {
    ...(presetVars as Record<string, string | number>),
    "--gl-px": pointer.x,
    "--gl-py": pointer.y,
    "--gl-scroll": scrollValue,
    "--gl-play": frozen ? "paused" : "running",
    opacity,
    filter: blur ? `blur(${blur}px)` : undefined,
  } as CSSProperties;

  return (
    <div
      ref={setHost}
      className={`gl-preview ${className}`}
      data-rm={reducedMotion ? "true" : undefined}
      onPointerMove={wantsPointer ? onPointerMove : undefined}
    >
      <div
        className="gl-surface"
        data-preset={preset.id}
        data-theme={theme}
        data-pattern={showPattern ? undefined : "off"}
        style={surfaceStyle}
        aria-hidden="true"
      />
      <NoiseOverlay opacity={noise} />
      {showContent && (
        <div className="gl-preview__content">
          <PreviewContent glass={showGlass} compact={compact} />
        </div>
      )}
    </div>
  );
}
