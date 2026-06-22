"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { ShowcasePreset } from "../registries";
import { runtimeClass } from "../registries";
import { useIsTouch, useReducedMotion } from "../hooks";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Time-based dynamic background. Sets `--gsc-play` for the Pause control /
 * reduced-motion freeze, and — for the one pointer-reactive preset — drives
 * `--gsc-px/--gsc-py` from the cursor (disabled on touch and under reduced
 * motion, max displacement bounded by the preset's gradient sizing).
 */
export function DynamicGradient({
  preset,
  paused,
}: {
  preset: ShowcasePreset;
  paused: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const pointerOn = !!preset.pointer && !touch && !reduced;

  useEffect(() => {
    if (!pointerOn) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        el.style.setProperty("--gsc-px", String(px));
        el.style.setProperty("--gsc-py", String(py));
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pointerOn]);

  const style: Vars = { "--gsc-play": paused || reduced ? "paused" : "running" };

  return (
    <div
      ref={ref}
      aria-hidden
      className={`gsc-bg ${runtimeClass(preset)}`}
      style={style}
    />
  );
}
