"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { DynamicGradient } from "../_shared/DynamicGradient";
import {
  AuroraBackground,
  Bento,
  Button,
  ChipGrid,
  EditorialSplit,
  Numbered,
  QuietCta,
  StatBand,
  StatementHero,
} from "@/components/ds";
import { Footer } from "@/components/Footer";

import {
  COLOR_GROUPS,
  GRADIENTS,
  MOTION_SPECS,
  RADII,
  SHADOWS,
  SPACING,
  TYPE_SPECS,
} from "./tokens";
import type { ScaleToken, Swatch, SwatchGroup, TypeSpec } from "./tokens";

/* ── Config ──────────────────────────────────────────────── */

const VERSION = "v1.0";
const UPDATED = "2026-06-24";

type Mode = "light" | "dark";
type Vp = "full" | "1280" | "768" | "390";

const SECTIONS: { id: string; label: string }[] = [
  { id: "palette", label: "01 · Palette" },
  { id: "gradients", label: "02 · Gradients" },
  { id: "backgrounds", label: "03 · Backgrounds" },
  { id: "glass", label: "04 · Glass" },
  { id: "type", label: "05 · Typography" },
  { id: "buttons", label: "06 · Buttons" },
  { id: "cards", label: "07 · Cards" },
  { id: "bento", label: "08 · Bento" },
  { id: "decorative", label: "09 · Decorative" },
  { id: "transitions", label: "10 · Transitions" },
  { id: "motion", label: "11 · Motion" },
  { id: "layout", label: "12 · Layout" },
  { id: "forms", label: "13 · Forms" },
  { id: "examples", label: "14 · Sections" },
];

/* ── Color math (typed, no any) ──────────────────────────── */

function parseHex(value: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{6})$/i.exec(value.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbString(value: string): string {
  const rgb = parseHex(value);
  return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : value;
}

function relLuminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number): number => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(value: string, against: [number, number, number]): string | null {
  const rgb = parseHex(value);
  if (!rgb) return null;
  const l1 = relLuminance(rgb);
  const l2 = relLuminance(against);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return `${ratio.toFixed(1)}`;
}

const WHITE: [number, number, number] = [255, 255, 255];
const BLACK: [number, number, number] = [0, 0, 0];

/* ── Showcase ────────────────────────────────────────────── */

export function DesignSystemShowcase() {
  const [mode, setMode] = useState<Mode>("light");
  const [motion, setMotion] = useState<boolean>(true);
  const [grid, setGrid] = useState<boolean>(false);
  const [vp, setVp] = useState<Vp>("full");
  const [toast, setToast] = useState<string>("");

  const copy = useCallback((text: string, label: string) => {
    void navigator.clipboard?.writeText(text).then(
      () => {
        setToast(`Copied ${label}`);
        window.setTimeout(() => setToast(""), 1400);
      },
      () => setToast("Copy failed"),
    );
  }, []);

  return (
    <div
      className="dss"
      data-mode={mode}
      data-motion={motion ? "on" : "off"}
      data-grid={grid ? "on" : "off"}
    >
      <header className="dss-top">
        <div className="dss-brand">
          <span className="dss-brand__name">
            EvalLense <b>Design System</b>
          </span>
          <span className="dss-brand__meta">
            {VERSION} · updated {UPDATED} · /dev/design-system
          </span>
        </div>

        <div className="dss-ctl">
          <span className="dss-ctl__lbl">Theme</span>
          <div className="dss-seg" role="group" aria-label="Theme">
            <button type="button" aria-pressed={mode === "light"} onClick={() => setMode("light")}>
              Light
            </button>
            <button type="button" aria-pressed={mode === "dark"} onClick={() => setMode("dark")}>
              Dark
            </button>
          </div>
        </div>

        <div className="dss-ctl">
          <span className="dss-ctl__lbl">Motion</span>
          <div className="dss-seg" role="group" aria-label="Motion">
            <button type="button" aria-pressed={motion} onClick={() => setMotion(true)}>
              Animated
            </button>
            <button type="button" aria-pressed={!motion} onClick={() => setMotion(false)}>
              Static
            </button>
          </div>
        </div>

        <div className="dss-ctl">
          <span className="dss-ctl__lbl">Grid</span>
          <button
            type="button"
            className="dss-switch"
            aria-pressed={grid}
            aria-label="Toggle 12-column grid overlay"
            onClick={() => setGrid((g) => !g)}
          />
        </div>

        <div className="dss-ctl">
          <span className="dss-ctl__lbl">Viewport</span>
          <div className="dss-seg" role="group" aria-label="Preview viewport">
            {(["full", "1280", "768", "390"] as Vp[]).map((w) => (
              <button key={w} type="button" aria-pressed={vp === w} onClick={() => setVp(w)}>
                {w === "full" ? "Full" : w}
              </button>
            ))}
          </div>
        </div>
      </header>

      <nav className="dss-nav" aria-label="Showcase sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.label}
          </a>
        ))}
      </nav>

      <main className="dss-main">
        <PaletteSection copy={copy} />
        <GradientSection copy={copy} motion={motion} mode={mode} />
        <BackgroundSection motion={motion} />
        <GlassSection />
        <TypeSection />
        <ButtonSection />
        <CardSection />
        <BentoSection vp={vp} />
        <DecorativeSection />
        <TransitionSection />
        <MotionSection />
        <LayoutSection copy={copy} />
        <FormSection />
        <ExampleSection vp={vp} />
      </main>

      <div className="dss-grid-overlay" aria-hidden="true">
        <div className="dss-grid-overlay__inner">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      <div className={`dss-toast${toast ? " is-on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

/* ── Shared bits ─────────────────────────────────────────── */

type CopyFn = (text: string, label: string) => void;

function SectionHead({ eyebrow, title, blurb }: { eyebrow: string; title: string; blurb: string }) {
  return (
    <div className="dss-section__head">
      <span className="dss-eyebrow">
        <span className="dot" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      <p className="dss-section__blurb">{blurb}</p>
    </div>
  );
}

function CopyBtn({ text, label, onCopy, children }: { text: string; label: string; onCopy: CopyFn; children?: ReactNode }) {
  const [hit, setHit] = useState(false);
  return (
    <button
      type="button"
      className={`dss-copy${hit ? " is-copied" : ""}`}
      onClick={() => {
        onCopy(text, label);
        setHit(true);
        window.setTimeout(() => setHit(false), 1100);
      }}
    >
      {children ?? "Copy"}
    </button>
  );
}

/* ── 01 · Palette ────────────────────────────────────────── */

function SwatchCard({ sw, copy }: { sw: Swatch; copy: CopyFn }) {
  const cW = contrast(sw.value, WHITE);
  const cB = contrast(sw.value, BLACK);
  return (
    <div className="dss-sw">
      <div className="dss-sw__chip" style={{ background: sw.value }}>
        {cW && cB && (
          <span className="dss-sw__contrast">
            <span className="dss-sw__c dss-sw__c--w" style={{ color: sw.value }}>
              {cW}
            </span>
            <span className="dss-sw__c dss-sw__c--b" style={{ color: sw.value }}>
              {cB}
            </span>
          </span>
        )}
      </div>
      <div className="dss-sw__body">
        <div className="dss-sw__name">
          {sw.name}
          <CopyBtn text={sw.value} label={sw.value} onCopy={copy} />
        </div>
        <div className="dss-sw__note">{sw.note ?? ""}</div>
        <div className="dss-sw__rows">
          <div className="dss-sw__row">
            <code>{sw.varName}</code>
            <CopyBtn text={`var(${sw.varName})`} label={sw.varName} onCopy={copy}>
              token
            </CopyBtn>
          </div>
          <div className="dss-sw__row">
            <code>{sw.value}</code>
          </div>
          <div className="dss-sw__row">
            <code>{rgbString(sw.value)}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaletteSection({ copy }: { copy: CopyFn }) {
  return (
    <section className="dss-section" id="palette">
      <SectionHead
        eyebrow="01 · Brand palette"
        title="Color"
        blurb="Every color is a live :root token from globals.css. Contrast chips show the WCAG ratio against white (left) and black (right) — anything ≥ 4.5 carries body text."
      />
      {COLOR_GROUPS.map((g: SwatchGroup) => (
        <div key={g.id}>
          <h3 className="dss-sub">{g.title}</h3>
          <p className="dss-section__blurb" style={{ marginBottom: 14 }}>
            {g.blurb}
          </p>
          <div className="dss-swatches">
            {g.swatches.map((sw) => (
              <SwatchCard key={sw.varName} sw={sw} copy={copy} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 02 · Gradients ──────────────────────────────────────── */

function GradientSection({ copy, motion, mode }: { copy: CopyFn; motion: boolean; mode: Mode }) {
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [distortion, setDistortion] = useState(1);
  const [scrollInfluence, setScrollInfluence] = useState(1);
  const [paused, setPaused] = useState(false);

  return (
    <section className="dss-section" id="gradients">
      <SectionHead
        eyebrow="02 · Gradient library"
        title="Gradients"
        blurb="The full set of gradient tokens, plus the real WebGL DynamicGradient (the same shader the gradient labs use) wired to live controls."
      />
      <div className="dss-grads">
        {GRADIENTS.map((g) => (
          <div className="dss-grad" key={g.varName}>
            <div className="dss-grad__prev" style={{ background: g.css }} />
            <div className="dss-grad__body">
              <div className="dss-grad__top">
                <span className="dss-grad__name">{g.name}</span>
                <span className="dss-grad__angle">{g.angle}</span>
              </div>
              <p className="dss-grad__usage">{g.usage}</p>
              <code className="dss-code">
                {g.varName}: {g.css};
              </code>
              <div className="dss-grad__foot">
                <span className="dss-tag">{g.compat}</span>
                <CopyBtn text={`${g.varName}: ${g.css};`} label={g.name} onCopy={copy}>
                  Copy CSS
                </CopyBtn>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="dss-sub">WebGL DynamicGradient — live</h3>
      <div className="dss-shader">
        <div className="dss-shader__stage">
          <DynamicGradient
            variant={mode === "dark" ? "dark" : "light"}
            speed={speed}
            intensity={intensity}
            distortion={distortion}
            scrollInfluence={scrollInfluence}
            paused={paused || !motion}
          />
        </div>
        <div className="dss-shader__controls">
          <Slider label="Speed" value={speed} min={0} max={3} onChange={setSpeed} />
          <Slider label="Intensity" value={intensity} min={0} max={2} onChange={setIntensity} />
          <Slider label="Distortion" value={distortion} min={0} max={2.5} onChange={setDistortion} />
          <Slider label="Scroll influence" value={scrollInfluence} min={0} max={2} onChange={setScrollInfluence} />
          <div className="dss-slider">
            <label htmlFor="dss-pause">Paused</label>
            <button
              id="dss-pause"
              type="button"
              className="dss-switch"
              aria-pressed={paused}
              aria-label="Freeze gradient"
              onClick={() => setPaused((p) => !p)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="dss-slider">
      <label htmlFor={`s-${label}`}>
        <span>{label}</span>
        <span>{value.toFixed(2)}</span>
      </label>
      <input
        id={`s-${label}`}
        type="range"
        min={min}
        max={max}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

/* ── 03 · Backgrounds ────────────────────────────────────── */

function BackgroundSection({ motion }: { motion: boolean }) {
  const blocks: { cls: string; label: string }[] = [
    { cls: "dss-bg--white", label: "Pure white · --bg" },
    { cls: "dss-bg--soft", label: "Soft white · --bg-soft" },
    { cls: "dss-bg--neutral", label: "Neutral light gradient" },
    { cls: "dss-bg--ink", label: "Deep black · --ink" },
    { cls: "dss-bg--inkgrad", label: "Ink gradient · --ink-grad" },
    { cls: "dss-bg--nebula", label: "Nebula layers" },
    { cls: "dss-bg--blob", label: "Glass blob field" },
    { cls: "dss-bg--grid", label: "Grid background" },
    { cls: "dss-bg--noise", label: "Diagonal grain" },
  ];
  return (
    <section className="dss-section" id="backgrounds">
      <SectionHead
        eyebrow="03 · Backgrounds"
        title="Background systems"
        blurb="The real surface systems behind sections — flat fills, tonal dark gradients, the drifting glass blob field, grid and grain."
      />
      <div className="dss-bgs">
        {blocks.map((b) => (
          <div className={`dss-bg ${b.cls}`} key={b.cls}>
            <span className="dss-bg__label">{b.label}</span>
          </div>
        ))}
      </div>

      <h3 className="dss-sub">AuroraBackground — component, two variants</h3>
      <div className="dss-bgs">
        {(["dark-violet", "dark-cyan"] as const).map((v) => (
          <div className="dss-bg" key={v} style={{ height: 240 }}>
            <AuroraBackground variant={v} intensity="default" animated={motion} />
            <span className="dss-bg__label">{`<AuroraBackground variant="${v}" />`}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 04 · Glass ──────────────────────────────────────────── */

function GlassSection() {
  const cells: { cls: string; tag: string }[] = [
    { cls: "dss-glass-cell--white", tag: "on white" },
    { cls: "dss-glass-cell--grad", tag: "on lens gradient" },
    { cls: "dss-glass-cell--ink", tag: "on ink" },
  ];
  return (
    <section className="dss-section" id="glass">
      <SectionHead
        eyebrow="04 · Glass system"
        title="Glassmorphism"
        blurb="The same frosted card placed over white, gradient and ink so you can see where the material reads and where it loses contrast. The liquid-glass Button sits beneath it."
      />
      <div className="dss-glass-row">
        {cells.map((c) => (
          <div className={`dss-glass-cell ${c.cls}`} key={c.cls}>
            <span className="dss-glass-cell__tag">{c.tag}</span>
            <div className="dss-glasscard">
              <h4>Frosted glass</h4>
              <p>blur(20px) · saturate(1.6) · inner highlight · translucent border</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="dss-sub">Liquid-glass Button (shared material)</h3>
      <div className="dss-glass-row">
        <div className="dss-glass-cell dss-glass-cell--grad">
          <Button variant="glass" arrow>
            Get started
          </Button>
        </div>
        <div className="dss-glass-cell dss-glass-cell--ink">
          <Button variant="glass">View report</Button>
        </div>
      </div>
    </section>
  );
}

/* ── 05 · Typography ─────────────────────────────────────── */

function TypeSection() {
  return (
    <section className="dss-section" id="type">
      <SectionHead
        eyebrow="05 · Typography"
        title="Type system"
        blurb="SF-stack display, UI text and monospace. Specimens use real EvalLense copy. Sizes are the fluid clamps used across sections."
      />
      <div className="dss-type">
        {TYPE_SPECS.map((t: TypeSpec) => (
          <div className="dss-type__row" key={t.name}>
            <div className="dss-type__meta">
              <b>{t.name}</b>
              {t.family} · {t.weight}
              <br />
              {t.size}
              <br />
              lh {t.leading} · ls {t.tracking}
            </div>
            <div
              className={`dss-type__sample dss-type__sample--${t.family}`}
              style={
                {
                  fontSize: t.size,
                  fontWeight: t.weight,
                  lineHeight: t.leading,
                  letterSpacing: t.tracking,
                } as CSSProperties
              }
            >
              {t.sample}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 06 · Buttons ────────────────────────────────────────── */

type Variant = "primary" | "ghost" | "glass" | "dark" | "gradient";

function ButtonStates({ variant }: { variant: Variant }) {
  return (
    <div className="dss-btn-states">
      <div className="dss-btn-state">
        <Button variant={variant} arrow>
          Default
        </Button>
        <span className="dss-btn-state__lbl">default</span>
      </div>
      <div className="dss-btn-state dss-force-hover">
        <Button variant={variant} arrow>
          Hover
        </Button>
        <span className="dss-btn-state__lbl">hover</span>
      </div>
      <div className="dss-btn-state dss-force-focus">
        <Button variant={variant}>Focus</Button>
        <span className="dss-btn-state__lbl">focus</span>
      </div>
      <div className="dss-btn-state">
        <Button variant={variant} disabled>
          Disabled
        </Button>
        <span className="dss-btn-state__lbl">disabled</span>
      </div>
    </div>
  );
}

function ButtonSection() {
  const [tab, setTab] = useState(0);
  const [on, setOn] = useState(true);
  const lightVariants: Variant[] = ["primary", "ghost", "gradient"];
  const darkVariants: Variant[] = ["glass", "dark"];
  return (
    <section className="dss-section" id="buttons">
      <SectionHead
        eyebrow="06 · Buttons & controls"
        title="Buttons"
        blurb="The single Button component, every variant × every state shown at once. Glass and dark variants are placed on ink where they belong."
      />
      <div className="dss-btn-matrix">
        {lightVariants.map((v) => (
          <div className="dss-btn-row" key={v}>
            <span className="dss-btn-row__name">btn-{v}</span>
            <ButtonStates variant={v} />
          </div>
        ))}
      </div>

      <h3 className="dss-sub">On ink — glass &amp; dark variants</h3>
      <div className="dss-onink">
        <div className="dss-btn-matrix">
          {darkVariants.map((v) => (
            <div className="dss-btn-row" key={v} style={{ borderColor: "rgba(255,255,255,.1)" }}>
              <span className="dss-btn-row__name" style={{ color: "#a9a9b2" }}>
                btn-{v}
              </span>
              <ButtonStates variant={v} />
            </div>
          ))}
        </div>
      </div>

      <h3 className="dss-sub">Tabs · toggle · text link</h3>
      <div className="dss-mini">
        <div className="dss-tabs" role="tablist" aria-label="Demo tabs">
          {["Score", "Breakdown", "Evidence"].map((t, i) => (
            <button key={t} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}>
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="dss-switch"
          aria-pressed={on}
          aria-label="Demo toggle"
          onClick={() => setOn((s) => !s)}
        />
        <a href="#buttons" style={{ color: "var(--violet)", fontSize: 14, fontWeight: 500 }}>
          Text link →
        </a>
      </div>
    </section>
  );
}

/* ── 07 · Cards ──────────────────────────────────────────── */

function CardSection() {
  return (
    <section className="dss-section" id="cards">
      <SectionHead
        eyebrow="07 · Cards"
        title="Cards"
        blurb="Surface recipes from the --dsc-* light-card system, plus product specimens — score, judge verdict and report cards."
      />
      <div className="dss-cards">
        <div className="dss-card">
          <span className="dss-card__tag">Feature</span>
          <h4>Multi-perspective review</h4>
          <p>Every pitch is read by a panel of independent judges before a decision is made.</p>
        </div>
        <div className="dss-card dss-card--feature">
          <span className="dss-card__tag">Lens</span>
          <h4>Consensus &amp; conflict</h4>
          <p>See where the judges agree and where they split — at a glance.</p>
        </div>
        <div className="dss-card">
          <div className="dss-score">
            <span className="dss-score__num">8.4</span>
            <span className="dss-score__lbl">Overall score</span>
          </div>
        </div>
        <div className="dss-card">
          <span className="dss-card__tag">Verdict</span>
          <h4 style={{ marginBottom: 12 }}>Panel signal</h4>
          <div style={{ display: "grid", gap: 8 }}>
            <span className="dss-verdict">
              <span className="dot" style={{ background: "var(--green)" }} /> Judges agree
            </span>
            <span className="dss-verdict">
              <span className="dot" style={{ background: "var(--amber)" }} /> Judges split
            </span>
          </div>
        </div>
        <div className="dss-card dss-card--ink">
          <span className="dss-card__tag">Report</span>
          <h4>Evidence-based report</h4>
          <p>Dark report surface for the inked sections of the analysis flow.</p>
        </div>
      </div>
    </section>
  );
}

/* ── 08 · Bento ──────────────────────────────────────────── */

const BENTO_ITEMS = [
  {
    tag: "Foundation",
    title: "Input layer",
    body: "Feed any pitch or model response into the panel.",
    feature: true,
    media: { label: "Input", hint: "pipeline diagram", ariaLabel: "input layer" },
  },
  { tag: "Processing", title: "Judging", body: "Independent judges score in parallel." },
  { tag: "Output", title: "Reports", body: "Explainable, traceable results." },
  { tag: "Decision", title: "Human call", body: "A person makes the final decision." },
];

function BentoSection({ vp }: { vp: Vp }) {
  return (
    <section className="dss-section" id="bento">
      <SectionHead
        eyebrow="08 · Bento system"
        title="Bento"
        blurb="The real LabBento component on both surfaces. Ink carries the frosted glass tiles; light carries the frosted panes over the drifting blob field."
      />
      <div className="dss-vp-host">
        <div className="dss-vp" data-w={vp}>
          <div className="dss-live section-lab ds">
            <Bento
              surface="ink"
              eyebrow="Pipeline"
              title="Map the analysis pipeline"
              sub="How EvalLense holds an evaluation together."
              items={BENTO_ITEMS}
            />
          </div>
          <div className="dss-live section-lab ds" style={{ marginTop: 18 }}>
            <Bento
              surface="light"
              eyebrow="Pipeline"
              title="Map the analysis pipeline"
              sub="How EvalLense holds an evaluation together."
              items={BENTO_ITEMS}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 09 · Decorative ─────────────────────────────────────── */

function DecorativeSection() {
  const sizes = [16, 24, 32, 48, 64];
  const rows: { cls: string; label: string }[] = [
    { cls: "", label: "On white" },
    { cls: "dss-icon-row--ink", label: "On ink" },
    { cls: "dss-icon-row--grad", label: "On gradient" },
  ];
  return (
    <section className="dss-section" id="decorative">
      <SectionHead
        eyebrow="09 · Icons & decoration"
        title="Marks & decoration"
        blurb="The unicorn mark at the icon scale, plus the hairlines, dots, lens accents and arrows used as connective tissue."
      />
      <div className="dss-icon-rows">
        {rows.map((r) => (
          <div className={`dss-icon-row ${r.cls}`} key={r.label}>
            <span className="dss-icon-row__lbl">{r.label}</span>
            {sizes.map((s) => (
              <Image key={s} src="/assets/icons/unicorn.webp" alt="EvalLense unicorn mark" width={s} height={s} />
            ))}
            <span className="dss-hairline" />
            <span className="dss-dot" />
            <span className="dss-dots">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} />
              ))}
            </span>
            <span style={{ fontSize: 22 }}>→</span>
            <span style={{ fontSize: 22 }}>↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 10 · Transitions ────────────────────────────────────── */

function TransitionSection() {
  return (
    <section className="dss-section" id="transitions">
      <SectionHead
        eyebrow="10 · Section transitions"
        title="Transitions"
        blurb="Surface-to-surface joins shown in tall scrollable frames. Scroll-pinned cinema / tone-flip joins are page-scroll driven — see /dev/scroll-transitions and /dev/parallax-spike for those."
      />
      <div className="dss-tr-grid">
        <TransitionFrame name="White → ink (gradient bridge)" hint="tr-gradient-bridge data-from/data-to" from="light" to="ink" bridge="linear-gradient(180deg, #fff 0%, #000 100%)" />
        <TransitionFrame name="Soft → ink (pattern dissolve)" hint="tr-pattern-dissolve" from="soft" to="ink" bridge="linear-gradient(180deg, #f5f5f7 0%, #000 100%)" pattern />
        <TransitionFrame name="Ink → white (masked divider)" hint="tr-masked-divider --diagonal" from="ink" to="light" bridge="linear-gradient(to bottom right, #000 42%, #fff 58%)" />
      </div>
    </section>
  );
}

function TransitionFrame({ name, hint, from, to, bridge, pattern }: { name: string; hint: string; from: "light" | "soft" | "ink"; to: "light" | "soft" | "ink"; bridge: string; pattern?: boolean }) {
  return (
    <div className="dss-tr">
      <div className="dss-tr__head">
        <span className="dss-tr__name">{name}</span>
        <span className="dss-tr__hint">{hint}</span>
      </div>
      <div className="dss-tr__frame">
        <div className={`dss-tr__seg dss-tr__seg--${from}`}>
          <h4>Section A · {from}</h4>
        </div>
        <div style={{ height: 120, background: bridge, position: "relative" }}>
          {pattern && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                backgroundSize: "12px 12px",
                color: "rgba(120,120,140,.4)",
                opacity: 0.6,
              }}
            />
          )}
        </div>
        <div className={`dss-tr__seg dss-tr__seg--${to}`}>
          <h4>Section B · {to}</h4>
        </div>
      </div>
    </div>
  );
}

/* ── 11 · Motion ─────────────────────────────────────────── */

function MotionSection() {
  return (
    <section className="dss-section" id="motion">
      <SectionHead
        eyebrow="11 · Motion"
        title="Motion"
        blurb="The motion vocabulary with timing and triggers. All of it respects prefers-reduced-motion and the Static toggle in the top bar."
      />
      <div className="dss-type">
        {MOTION_SPECS.map((m) => (
          <div className="dss-type__row" key={m.name} style={{ gridTemplateColumns: "160px 1fr" }}>
            <div className="dss-type__meta">
              <b>{m.name}</b>
              {m.duration}
            </div>
            <div className="dss-type__meta" style={{ color: "var(--dss-sub)" }}>
              easing {m.easing}
              <br />
              trigger · {m.trigger}
              <br />
              reduced · {m.reduced}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 12 · Layout ─────────────────────────────────────────── */

function LayoutSection({ copy }: { copy: CopyFn }) {
  const maxStep = Math.max(...SPACING);
  return (
    <section className="dss-section" id="layout">
      <SectionHead
        eyebrow="12 · Layout & scale"
        title="Layout, radius, elevation"
        blurb="Container max-width 1180px · fluid gutter clamp(20px, 5vw, 72px). Spacing, radii and the violet-tinted elevation scale."
      />

      <h3 className="dss-sub">Spacing scale (px)</h3>
      <div className="dss-ruler">
        {SPACING.map((s) => (
          <div className="dss-ruler__row" key={s}>
            <span className="dss-ruler__lbl">{s}</span>
            <span className="dss-ruler__bar" style={{ width: `${(s / maxStep) * 100}%` }} />
          </div>
        ))}
      </div>

      <h3 className="dss-sub">Radius</h3>
      <div className="dss-chips">
        {RADII.map((r: ScaleToken) => (
          <div className="dss-radius-chip" key={r.varName}>
            <div
              className="dss-radius-chip__box"
              style={{ borderRadius: r.value === "980px" ? "40px 40px 0 0" : r.value }}
            />
            <div className="dss-radius-chip__meta">
              <b>
                {r.name} · {r.value}
              </b>
              <br />
              {r.varName} — {r.note}
            </div>
          </div>
        ))}
      </div>

      <h3 className="dss-sub">Elevation</h3>
      <div className="dss-chips">
        {SHADOWS.map((s: ScaleToken) => (
          <div key={s.varName}>
            <div className="dss-shadow-chip" style={{ boxShadow: s.value }} />
            <div className="dss-radius-chip__meta" style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <b>{s.name}</b> — {s.note}
              </span>
              <CopyBtn text={`${s.varName}: ${s.value};`} label={s.name} onCopy={copy} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 13 · Forms ──────────────────────────────────────────── */

function FormSection() {
  return (
    <section className="dss-section" id="forms">
      <SectionHead
        eyebrow="13 · Form elements"
        title="Forms"
        blurb="The site is static today, so form controls are not yet a systematized layer — these are token-built specimens (focus / error / success / disabled) for when capture is added."
      />
      <div className="dss-form">
        <label className="dss-field">
          <span>Email · default</span>
          <input className="dss-input" type="email" placeholder="you@company.com" />
        </label>
        <label className="dss-field">
          <span>Email · error</span>
          <input className="dss-input" type="email" defaultValue="not-an-email" data-state="error" />
        </label>
        <label className="dss-field">
          <span>Email · success</span>
          <input className="dss-input" type="email" defaultValue="you@company.com" data-state="success" />
        </label>
        <label className="dss-field">
          <span>Disabled</span>
          <input className="dss-input" type="text" placeholder="Unavailable" disabled />
        </label>
        <label className="dss-field">
          <span>Select</span>
          <select className="dss-select" defaultValue="agree">
            <option value="agree">Judges agree</option>
            <option value="split">Judges split</option>
          </select>
        </label>
        <label className="dss-field">
          <span>Textarea</span>
          <textarea className="dss-textarea" rows={3} placeholder="Notes for the final decision…" />
        </label>
        <div className="dss-field">
          <span>Choice</span>
          <label className="dss-check">
            <input type="checkbox" defaultChecked /> Send me the report
          </label>
          <label className="dss-check">
            <input type="radio" name="r" defaultChecked /> Weekly digest
          </label>
        </div>
        <label className="dss-field">
          <span>Upload</span>
          <span className="dss-upload">Drop a pitch PDF, or click to browse</span>
        </label>
      </div>
    </section>
  );
}

/* ── 14 · Complete sections ──────────────────────────────── */

function ExampleSection({ vp }: { vp: Vp }) {
  return (
    <section className="dss-section" id="examples">
      <SectionHead
        eyebrow="14 · Complete sections"
        title="Sections in context"
        blurb="Full sections assembled only from real design-system components — light hero, dark hero, report band, CTA and the shared footer."
      />
      <div className="dss-vp-host">
        <div className="dss-vp" data-w={vp}>
          <div className="dss-live section-lab ds">
            <div className="dss-live__cap">
              <span>StatementHero · surface=&quot;soft&quot;</span>
            </div>
            <StatementHero
              id="dss-hero-soft"
              eyebrow="EvalLense"
              titleLead="Evaluate every pitch through"
              titleAccent="multiple"
              titleTrail="perspectives."
              sub="See consensus. Understand conflict. Make better calls."
              ctas={[
                { label: "Start free", href: "#examples", variant: "primary" },
                { label: "See a report", href: "#examples", variant: "ghost" },
              ]}
              media={{ ratio: "16/9", label: "Hero", hint: "panel verdict scene", ariaLabel: "hero scene" }}
              surface="light"
            />
          </div>

          <div className="dss-live section-lab ds" style={{ marginTop: 18 }}>
            <div className="dss-live__cap">
              <span>StatementHero · surface=&quot;ink&quot;</span>
            </div>
            <StatementHero
              id="dss-hero-ink"
              eyebrow="EvalLense"
              titleLead="AI evaluation."
              titleAccent="Human"
              titleTrail="final decision."
              sub="The panel prepares the analysis. A person makes the call."
              ctas={[{ label: "Get started", href: "#examples", variant: "glass" }]}
              media={{ ratio: "16/9", label: "Hero", hint: "dark verdict scene", ariaLabel: "dark hero" }}
              surface="ink"
            />
          </div>

          <div className="dss-live section-lab ds" style={{ marginTop: 18 }}>
            <div className="dss-live__cap">
              <span>StatBand + ChipGrid · report band</span>
            </div>
            <StatBand
              eyebrow="Track record"
              title="Every evaluation, accounted for"
              stats={[
                { value: "6", label: "Independent judges", src: "Panel design" },
                { value: "100%", label: "Traceable verdicts", src: "Evidence log" },
                { value: "<1m", label: "To first signal", src: "Internal runs" },
              ]}
              surface="ink"
            />
            <ChipGrid
              ariaLabel="Report completeness"
              surface="light"
              items={[
                { name: "Summary", sev: "info" },
                { name: "Market", sev: "info" },
                { name: "Team", sev: "warning" },
                { name: "Financials", sev: "critical" },
                { name: "Traction", sev: "info" },
              ]}
              legend={[
                { sev: "info", label: "Complete" },
                { sev: "warning", label: "Partial" },
                { sev: "critical", label: "Missing" },
              ]}
            />
          </div>

          <div className="dss-live section-lab ds" style={{ marginTop: 18 }}>
            <div className="dss-live__cap">
              <span>Numbered · EditorialSplit · QuietCta</span>
            </div>
            <Numbered
              eyebrow="Principles"
              title="How the panel decides"
              sub="Three ideas the whole product is built on."
              surface="light"
              items={[
                { num: "01", title: "Independence", body: "Judges score without seeing each other." },
                { num: "02", title: "Traceability", body: "Every verdict points back to evidence." },
                { num: "03", title: "Human final call", body: "AI prepares — a person decides." },
              ]}
            />
            <EditorialSplit
              eyebrow="How it works"
              titleLead="Built on"
              titleAccent="evidence"
              titleTrail="not vibes."
              sub="Grounded scoring with explanations you can audit."
              media={{ ratio: "16/9", label: "Diagram", hint: "evidence flow", ariaLabel: "evidence flow" }}
              points={[
                { title: "Explainable", body: "You see why each score was given." },
                { title: "Reconciled", body: "Conflicting judges resolve into one decision." },
              ]}
              surface="light"
            />
            <QuietCta
              eyebrow="Ready?"
              title="Run your first evaluation"
              sub="No credit card required."
              cta={{ label: "Get started", href: "#examples" }}
              surface="ink"
            />
          </div>

          <div className="dss-live" style={{ marginTop: 18 }}>
            <div className="dss-live__cap">
              <span>Footer · variant=&quot;dark&quot;</span>
            </div>
            <Footer variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
