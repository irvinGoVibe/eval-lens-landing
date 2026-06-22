"use client";

import { useEffect, useState } from "react";
import { presetsById } from "../presets";
import { GradientPreview } from "./GradientPreview";

/**
 * A tall, sticky demo strip proving scroll-driven presets track real page
 * scroll (and reverse on the way back up). The inner preview reads live
 * progress; the readout mirrors the same `--gl-scroll` value the CSS uses.
 */
export function ScrollGradientDemo({
  presetId = "aurora-field-drift-on-scroll",
  theme,
  reducedMotion,
}: {
  presetId?: string;
  theme: "light" | "dark";
  reducedMotion: boolean;
}) {
  const preset = presetsById[presetId];
  const [pct, setPct] = useState(0);

  // Mirror the surface var for the numeric readout (cheap, rAF-throttled).
  useEffect(() => {
    let raf = 0;
    const el = () =>
      document.querySelector<HTMLElement>(
        ".gl-scrolldemo .gl-surface",
      );
    const tick = () => {
      raf = 0;
      const node = el();
      if (node) {
        const v = parseFloat(
          getComputedStyle(node).getPropertyValue("--gl-scroll") || "0",
        );
        setPct(Math.round((isNaN(v) ? 0 : v) * 100));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!preset) return null;
  const resolved = preset.theme === "both" ? theme : (preset.theme as "light" | "dark");

  return (
    <section className="gl-scrolldemo" aria-label="Scroll-driven demo">
      <div className="gl-scrolldemo__sticky">
        <GradientPreview
          preset={preset}
          theme={resolved}
          controls={{ intensity: 1 }}
          reducedMotion={reducedMotion}
          scrollMode="live"
          showGlass
        />
        <div className="gl-scrolldemo__readout" aria-live="off">
          <span>Scroll progress</span>
          <strong>{pct}%</strong>
        </div>
      </div>
    </section>
  );
}
