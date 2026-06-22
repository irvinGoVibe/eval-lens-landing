"use client";

import {
  CONTROL_META,
  type BackgroundPreset,
  type ControlKey,
} from "../presets";
import type { ControlValues } from "./GradientBackground";

/**
 * Accessible slider panel. Only renders the controls a preset actually reacts
 * to, plus the universal opacity/blur/noise surface controls. Each slider is a
 * native range input (keyboard-accessible) with an aria-label and live value.
 */
const UNIVERSAL: ControlKey[] = ["opacity", "blur", "noise"];

export function GradientControls({
  preset,
  values,
  onChange,
  onReset,
}: {
  preset: BackgroundPreset;
  values: ControlValues;
  onChange: (key: ControlKey, value: number) => void;
  onReset: () => void;
}) {
  const keys = Array.from(
    new Set<ControlKey>([...preset.controls, ...UNIVERSAL]),
  );

  return (
    <div className="gl-controls">
      <div className="gl-controls__head">
        <span className="gl-controls__title">Parameters</span>
        <button type="button" className="gl-controls__reset" onClick={onReset}>
          Reset
        </button>
      </div>
      <div className="gl-controls__grid">
        {keys.map((key) => {
          const meta = CONTROL_META[key];
          const value = values[key] ?? meta.min;
          const id = `${preset.id}-${key}`;
          return (
            <label key={key} className="gl-control" htmlFor={id}>
              <span className="gl-control__row">
                <span className="gl-control__label">{meta.label}</span>
                <span className="gl-control__value">
                  {value.toFixed(meta.step < 1 ? 2 : 0)}
                  {meta.unit ?? ""}
                </span>
              </span>
              <input
                id={id}
                type="range"
                className="gl-control__range"
                min={meta.min}
                max={meta.max}
                step={meta.step}
                value={value}
                aria-label={`${meta.label} for ${preset.name}`}
                onChange={(e) => onChange(key, Number(e.target.value))}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
