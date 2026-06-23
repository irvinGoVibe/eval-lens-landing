"use client";

/**
 * GradientPlayground — dev harness around <DynamicGradient/>.
 *
 * Fixed full-viewport gradient + scrollable content of semi-transparent glass
 * cards (to eyeball readability / blur / contrast / gradient quality under
 * glass) + a small floating control panel (speed · intensity · distortion ·
 * scroll influence · pause/resume). Used by both /dev/gradient-light and
 * /dev/gradient-dark with a single `variant` prop.
 *
 * The glass cards in the grid are clickable PRESETS: each applies a named
 * configuration to the control panel, so they double as readability surfaces
 * and as quick ways to jump between looks.
 */

import { useState } from "react";
import { DynamicGradient, type GradientVariant } from "./DynamicGradient";

interface Config {
  speed: number;
  intensity: number;
  distortion: number;
  scrollInfluence: number;
  paused: boolean;
}

const DEFAULT_CONFIG: Config = {
  speed: 1,
  intensity: 1,
  distortion: 1,
  scrollInfluence: 1,
  paused: false,
};

interface Preset {
  name: string;
  body: string;
  config: Config;
}

const PRESETS: Preset[] = [
  {
    name: "Default",
    body: "Balanced baseline — moderate flow, ~80% base, gentle colour pockets. Good for judging plain text readability.",
    config: { speed: 1, intensity: 1, distortion: 1, scrollInfluence: 1, paused: false },
  },
  {
    name: "Calm",
    body: "Slow and quiet — low speed, reduced colour and distortion. The most restful background for dense copy.",
    config: { speed: 0.45, intensity: 0.7, distortion: 0.55, scrollInfluence: 0.7, paused: false },
  },
  {
    name: "Vivid",
    body: "More colour coverage and saturation pushed up. Stress-tests blur quality and contrast under glass.",
    config: { speed: 1, intensity: 1.6, distortion: 1, scrollInfluence: 1, paused: false },
  },
  {
    name: "Liquid",
    body: "Max shape deformation — strong domain warp so the surface reads as flowing fronts, not soft fields.",
    config: { speed: 1.2, intensity: 1.15, distortion: 2.3, scrollInfluence: 1, paused: false },
  },
  {
    name: "Scroll-reactive",
    body: "Scroll influence cranked up. Scroll the page and watch the colour masses shift their bounded amount.",
    config: { speed: 0.8, intensity: 1.1, distortion: 1, scrollInfluence: 2, paused: false },
  },
  {
    name: "Frozen",
    body: "Ambient motion paused (uTime held). A still frame to inspect a single composition — scroll still nudges it.",
    config: { speed: 1, intensity: 1, distortion: 1, scrollInfluence: 1, paused: true },
  },
];

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  return (
    <label className="grad-ctrl">
      <span className="grad-ctrl__row">
        <span>{label}</span>
        <span className="grad-ctrl__val">{value.toFixed(2)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  );
}

export function GradientPlayground({ variant }: { variant: GradientVariant }) {
  const [cfg, setCfg] = useState<Config>(DEFAULT_CONFIG);
  const [active, setActive] = useState<string>("Default");

  const set = <K extends keyof Config>(key: K, value: Config[K]) => {
    setCfg((c) => ({ ...c, [key]: value }));
    setActive("Custom");
  };

  const applyPreset = (p: Preset) => {
    setCfg(p.config);
    setActive(p.name);
  };

  return (
    <div className={`grad-stage grad-stage--${variant}`}>
      <DynamicGradient
        className="grad-bg"
        variant={variant}
        speed={cfg.speed}
        intensity={cfg.intensity}
        distortion={cfg.distortion}
        scrollInfluence={cfg.scrollInfluence}
        paused={cfg.paused}
      />

      {/* control panel */}
      <aside className="grad-panel grad-glass">
        <div className="grad-panel__title">
          DynamicGradient · {variant}
          <span className="grad-panel__active">{active}</span>
        </div>
        <Slider label="Speed" value={cfg.speed} min={0} max={3} step={0.05} onChange={(v) => set("speed", v)} />
        <Slider label="Intensity" value={cfg.intensity} min={0} max={2} step={0.05} onChange={(v) => set("intensity", v)} />
        <Slider label="Distortion" value={cfg.distortion} min={0} max={2.5} step={0.05} onChange={(v) => set("distortion", v)} />
        <Slider label="Scroll influence" value={cfg.scrollInfluence} min={0} max={2} step={0.05} onChange={(v) => set("scrollInfluence", v)} />
        <button
          type="button"
          className="grad-panel__btn"
          onClick={() => set("paused", !cfg.paused)}
        >
          {cfg.paused ? "▶ Resume" : "❚❚ Pause"}
        </button>
      </aside>

      {/* scrollable glass content for readability / blur / contrast checks */}
      <div className="grad-content">
        <section className="grad-hero">
          <p className="grad-eyebrow">dev · webgl gradient</p>
          <h1 className="grad-title">A single liquid surface</h1>
          <p className="grad-lede">
            Scroll to nudge the colour masses. The cards below are{" "}
            <strong>clickable presets</strong> — each applies a named config to
            the control panel — and they double as glass surfaces for testing
            text readability and blur over the moving gradient.
          </p>
        </section>

        <div className="grad-grid">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className={`grad-card grad-glass${active === p.name ? " is-active" : ""}`}
            >
              <span className="grad-card__head">
                <h2>{p.name}</h2>
                {active === p.name && <span className="grad-card__dot" aria-hidden />}
              </span>
              <p>{p.body}</p>
              <span className="grad-card__hint">click to apply preset →</span>
            </button>
          ))}
        </div>

        <section className="grad-readblock grad-glass">
          <h2>Body copy legibility</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            vehicula, nisl nec ultricies, velit arcu fermentum massa, vitae
            tincidunt arcu nisl nec nisl. The colour should read as large soft
            clouds — never round blobs, never a rainbow, never grey mud — that
            condense into more saturated pockets and dissolve back into the base.
          </p>
          <p>
            Most of the surface stays in the base tone; colour appears only where
            the noise field rises above its floor. This block is intentionally
            wide and dense so small-text contrast under glass is easy to judge.
          </p>
        </section>

        <section className="grad-readblock grad-glass">
          <h2>Scroll the whole way down</h2>
          <p>
            Keep scrolling — the page is intentionally tall so you can watch the
            colour masses drift their bounded amount (≤~140px vertical / ~60px
            horizontal) while the ambient flow keeps running independently. Try
            the <strong>Scroll-reactive</strong> preset, then scroll, to make the
            shift obvious.
          </p>
        </section>

        <div className="grad-spacer" />

        <section className="grad-readblock grad-glass">
          <h2>Midway checkpoint</h2>
          <p>
            Halfway down. The gradient is fixed to the viewport, so this card
            slides over a continuously changing surface — a good spot to judge
            whether the glass keeps text readable as the colour underneath moves.
          </p>
        </section>

        <div className="grad-spacer" />

        <section className="grad-readblock grad-glass">
          <h2>Bottom of the page</h2>
          <p>
            You&apos;ve reached the end. Scroll back up to compare the colour
            position at the top vs. here — the difference you see is the bounded
            <code> uScroll</code> shift, not the ambient motion.
          </p>
        </section>

        <div className="grad-tail" />
      </div>
    </div>
  );
}

export default GradientPlayground;
