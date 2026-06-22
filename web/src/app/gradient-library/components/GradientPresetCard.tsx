"use client";

import { useMemo, useRef, useState } from "react";
import {
  CONTROL_DEFAULTS,
  type BackgroundPreset,
  type ControlKey,
} from "../presets";
import { GradientPreview } from "./GradientPreview";
import { GradientControls } from "./GradientControls";
import { CodePanel } from "./CodePanel";
import type { ControlValues } from "./GradientBackground";
import { useClipboard } from "../hooks/useClipboard";

/** Initial control values = global defaults overridden by the preset's own. */
function initialValues(preset: BackgroundPreset): ControlValues {
  const out: ControlValues = {};
  ([...preset.controls, "opacity", "blur", "noise"] as ControlKey[]).forEach(
    (k) => {
      out[k] = preset.defaults[k] ?? CONTROL_DEFAULTS[k];
    },
  );
  return out;
}

const PERF_LABEL: Record<string, string> = {
  low: "Low cost",
  medium: "Medium cost",
  high: "High cost",
};

export function GradientPresetCard({
  preset,
  theme,
  paused,
  reducedMotion,
  onFullscreen,
}: {
  preset: BackgroundPreset;
  theme: "light" | "dark";
  paused: boolean;
  reducedMotion: boolean;
  onFullscreen: (preset: BackgroundPreset, trigger: HTMLElement | null) => void;
}) {
  const [values, setValues] = useState<ControlValues>(() =>
    initialValues(preset),
  );
  const [expanded, setExpanded] = useState(false);
  const { copied, copy } = useClipboard();
  const fsBtn = useRef<HTMLButtonElement | null>(null);

  const resolvedTheme: "light" | "dark" = useMemo(
    () => (preset.theme === "both" ? theme : (preset.theme as "light" | "dark")),
    [preset.theme, theme],
  );

  const setControl = (key: ControlKey, value: number) =>
    setValues((v) => ({ ...v, [key]: value }));

  return (
    <article className="gl-card-preset" aria-labelledby={`${preset.id}-name`}>
      <div className="gl-card-preset__preview">
        <GradientPreview
          preset={preset}
          theme={resolvedTheme}
          controls={values}
          paused={paused}
          reducedMotion={reducedMotion}
          compact
        />
        <button
          ref={fsBtn}
          type="button"
          className="gl-card-preset__fs"
          aria-label={`Open ${preset.name} fullscreen`}
          onClick={() => onFullscreen(preset, fsBtn.current)}
        >
          ⤢ Fullscreen
        </button>
      </div>

      <div className="gl-card-preset__body">
        <header className="gl-card-preset__head">
          <div>
            <h2 id={`${preset.id}-name`} className="gl-card-preset__name">
              {preset.name}
            </h2>
            <code className="gl-card-preset__slug">{preset.slug}</code>
          </div>
          <span className={`gl-perf gl-perf--${preset.performance}`}>
            {PERF_LABEL[preset.performance]}
          </span>
        </header>

        <p className="gl-card-preset__desc">{preset.description}</p>

        <ul className="gl-meta">
          <li className="gl-meta__item">{labelFor(preset.category)}</li>
          <li className="gl-meta__item">
            {preset.theme === "both"
              ? "Light + Dark"
              : preset.theme === "dark"
                ? "Dark only"
                : "Light only"}
          </li>
          <li className="gl-meta__item">
            {preset.animation === "none" ? "Static" : `Anim · ${preset.animation}`}
          </li>
          <li className="gl-meta__item">{preset.technique.toUpperCase()}</li>
          <li className="gl-meta__item">RM · {preset.reducedMotion}</li>
        </ul>

        <ul className="gl-tags" aria-label="Recommended for">
          {preset.recommendedFor.map((r) => (
            <li key={r} className="gl-tag">
              {r}
            </li>
          ))}
        </ul>

        <p className="gl-card-preset__note">{preset.browser}</p>

        <div className="gl-card-preset__actions">
          <button
            type="button"
            className="gl-btn gl-btn--sm"
            onClick={() => copy(preset.css(`.${preset.slug}`), "css")}
          >
            {copied === "css" ? "Copied CSS" : "Copy CSS"}
          </button>
          <button
            type="button"
            className="gl-btn gl-btn--sm gl-btn--ghost"
            onClick={() =>
              copy(
                `import { GradientBackground } from "@/app/gradient-library/components/GradientBackground";\n\n` +
                  `<GradientBackground preset="${preset.id}">…</GradientBackground>`,
                "config",
              )
            }
          >
            {copied === "config" ? "Copied" : "Copy config"}
          </button>
          <button
            type="button"
            className="gl-btn gl-btn--sm gl-btn--ghost"
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Hide details" : "Tune & code"}
          </button>
        </div>

        {expanded && (
          <div className="gl-card-preset__details">
            <GradientControls
              preset={preset}
              values={values}
              onChange={setControl}
              onReset={() => setValues(initialValues(preset))}
            />
            <CodePanel preset={preset} />
          </div>
        )}
      </div>
    </article>
  );
}

function labelFor(category: string): string {
  const map: Record<string, string> = {
    static: "Static",
    animated: "Animated",
    scroll: "Scroll-driven",
    mesh: "Mesh",
    aurora: "Aurora",
    radial: "Radial",
    pattern: "Pattern",
    noise: "Noise",
    combined: "Combined",
    experimental: "Experimental",
  };
  return map[category] ?? category;
}
