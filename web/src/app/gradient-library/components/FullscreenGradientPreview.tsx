"use client";

import { useEffect, useRef, useState } from "react";
import {
  CONTROL_DEFAULTS,
  type BackgroundPreset,
  type ControlKey,
} from "../presets";
import { GradientPreview } from "./GradientPreview";
import { GradientControls } from "./GradientControls";
import { CodePanel } from "./CodePanel";
import type { ControlValues } from "./GradientBackground";

function initialValues(preset: BackgroundPreset): ControlValues {
  const out: ControlValues = {};
  ([...preset.controls, "opacity", "blur", "noise"] as ControlKey[]).forEach(
    (k) => {
      out[k] = preset.defaults[k] ?? CONTROL_DEFAULTS[k];
    },
  );
  return out;
}

/**
 * Fullscreen dialog: clean background filling the viewport with demo content
 * on top, plus per-preview toggles. Escape closes; focus moves to the dialog
 * on open and returns to the triggering card button on close.
 */
export function FullscreenGradientPreview({
  preset,
  initialTheme,
  reducedMotionDefault,
  trigger,
  onClose,
}: {
  preset: BackgroundPreset;
  initialTheme: "light" | "dark";
  reducedMotionDefault: boolean;
  trigger: HTMLElement | null;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState<"light" | "dark">(
    preset.theme === "both"
      ? initialTheme
      : (preset.theme as "light" | "dark"),
  );
  const [glass, setGlass] = useState(true);
  const [pattern, setPattern] = useState(true);
  const [paused, setPaused] = useState(false);
  const [rm, setRm] = useState(reducedMotionDefault);
  const [values, setValues] = useState<ControlValues>(() =>
    initialValues(preset),
  );
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [onClose, trigger]);

  const isScroll = preset.animation === "scroll";
  const themeLocked = preset.theme !== "both";

  return (
    <div
      className="gl-fs"
      role="dialog"
      aria-modal="true"
      aria-label={`${preset.name} fullscreen preview`}
      ref={dialogRef}
    >
      <GradientPreview
        preset={preset}
        theme={theme}
        controls={values}
        paused={paused}
        reducedMotion={rm}
        showGlass={glass}
        showPattern={pattern}
        scrollMode="manual"
        className="gl-preview--fs"
      />

      <div className="gl-fs__bar">
        <div className="gl-fs__title">
          <strong>{preset.name}</strong>
          <code>{preset.slug}</code>
        </div>
        <div className="gl-fs__toggles">
          <Toggle
            label="Dark"
            checked={theme === "dark"}
            disabled={themeLocked}
            onChange={(v) => setTheme(v ? "dark" : "light")}
          />
          <Toggle label="Glass card" checked={glass} onChange={setGlass} />
          <Toggle
            label="Pattern"
            checked={pattern}
            onChange={setPattern}
            disabled={preset.category !== "combined"}
          />
          <Toggle
            label="Pause"
            checked={paused}
            onChange={setPaused}
            disabled={preset.animation === "none" || isScroll}
          />
          <Toggle label="Reduced motion" checked={rm} onChange={setRm} />
        </div>
        <button
          ref={closeRef}
          type="button"
          className="gl-fs__close"
          onClick={onClose}
        >
          Close ✕
        </button>
      </div>

      <div className="gl-fs__panel">
        <GradientControls
          preset={preset}
          values={values}
          onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))}
          onReset={() => setValues(initialValues(preset))}
        />
        <CodePanel preset={preset} />
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className={`gl-toggle${disabled ? " is-disabled" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
