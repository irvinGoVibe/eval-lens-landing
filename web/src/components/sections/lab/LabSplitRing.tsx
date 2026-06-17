import type { CSSProperties } from "react";
import { LabEyebrow } from "./_kit";

/**
 * Section type 05 — Editorial split + scrub-ring.
 *
 * The confidence ring is *scroll-driven*: its arc AND numeric readout fill
 * toward `ring.value` as the block crosses the viewport (`data-scrub` →
 * `--scrub`, ScrollFX). Use it where the page should *show* a calculation
 * (score / confidence / completeness) rather than describe it.
 *
 * Three saved versions (switch in the LabMarkers inspector), all
 * surface-adaptive (`.band.soft` / `.band.ink`) and carrying the SAME content:
 *   • **v1 — cinematic full-bleed** (Polish): a real evidence scene fills the
 *     band; copy + a glass confidence chip sit over it. Works ink and light.
 *   • **v2 — gauge + weighted inputs** (Modern Recomposition): full-width header
 *     over a card panel — ring on the left, weighted-input bars on the right,
 *     a media strip below. The calculation made visible.
 *   • **v3 — expanded expressive** (pinned): a tall track pins the stage; the
 *     bars surface one by one and the ring closes last as the payoff, over an
 *     ambient evidence backdrop. Degrades to a static layout on small screens.
 *
 * Content/slots are the invariant; only layout differs. The `breakdown` inputs
 * are illustrative (clearly captioned as a demo), not product figures.
 *
 * Real demo media is the paired light/ink `scoring-matrix` asset, set as a CSS
 * `background-image` so the surface toggle swaps it by recolour (light webp on
 * `.soft`, dark png on `.ink`) without touching geometry. The scrim under copy
 * is surface-adaptive too (light wash on `.soft`, black on `.ink`).
 *
 * See [section-types#5-editorial-split--scrub-ring](../../../../../wiki/architecture/section-types.md).
 */
export type LabSplitRingInput = { label: string; value: number };

export type LabSplitRingProps = {
  id?: string;
  /** `.band` surface — `ink` is the cinematic default for this archetype. */
  surface?: "light" | "ink";
  /** Optional accessible name for the section. */
  ariaLabel?: string;
  eyebrow: string;
  /** Plain text before the lens-accented phrase. */
  titleLead: string;
  /** The lens-gradient (`.grad-word`) phrase inside the title. */
  titleAccent?: string;
  /** Optional plain text after the accent. */
  titleTrail?: string;
  sub: string;
  ring: {
    /** Uppercase mono label under the readout, e.g. `Confidence`. */
    label: string;
    /** Target the ring fills toward as you scroll, 0–100. */
    value: number;
    /** Mono caption — keeps the number sourced, never a bare decorative stat. */
    caption: string;
  };
  /** Weighted inputs that roll up to the ring (v2/v3). Illustrative, demo-labelled. */
  breakdown: LabSplitRingInput[];
  /** Mono caption under the v2 gauge / v3 bars, naming the inputs as a demo. */
  breakdownCaption: string;
  media: { ratio: string; label: string; hint: string; ariaLabel: string };
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

function Title({
  titleLead,
  titleAccent,
  titleTrail,
}: Pick<LabSplitRingProps, "titleLead" | "titleAccent" | "titleTrail">) {
  return (
    <h2 className="title lab-splitring__title">
      {titleLead}
      {titleAccent ? (
        <>
          {" "}
          <span className="grad-word">{titleAccent}</span>
        </>
      ) : null}
      {titleTrail ? titleTrail : null}
    </h2>
  );
}

/** Scroll-filled confidence ring (masked conic donut + integer readout). */
function Ring({ ring, ariaLabel }: { ring: LabSplitRingProps["ring"]; ariaLabel: string }) {
  return (
    <div
      className="lab-ring"
      style={{ "--ring-target": String(ring.value) } as CSSProperties}
      role="img"
      aria-label={ariaLabel}
    >
      <span className="lab-ring__pct" aria-hidden="true" />
      <span className="lab-ring__label">{ring.label}</span>
    </div>
  );
}

/** Weighted-input bars — fill widths track `--scrub` so they roll up together. */
function Bars({
  breakdown,
  className,
}: {
  breakdown: LabSplitRingInput[];
  className: string;
}) {
  return (
    <ol className={className}>
      {breakdown.map((input, i) => (
        <li
          className="splitring-bar"
          key={input.label}
          style={{ "--i": String(i) } as CSSProperties}
        >
          <span className="splitring-bar__label">{input.label}</span>
          <span className="splitring-bar__track">
            <span
              className="splitring-bar__fill"
              style={{ "--w": String(input.value) } as CSSProperties}
            />
          </span>
          <span className="splitring-bar__val">{input.value}</span>
        </li>
      ))}
    </ol>
  );
}

export function LabSplitRing({
  id = "split-ring",
  surface = "ink",
  ariaLabel,
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  ring,
  breakdown,
  breakdownCaption,
  media,
  marker,
}: LabSplitRingProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const titleParts = { titleLead, titleAccent, titleTrail };
  const ringAria = `${ring.label}: fills to ${ring.value}% as the section scrolls into view`;
  /** v3 track height grows with the number of weighted inputs (one stage each). */
  const v3Stages = breakdown.length;

  return (
    <section
      id={id}
      className={`band ${surf} lab-splitring`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — cinematic full-bleed moment (Polish) ── */}
      <div className="splitring-cine" data-version="1">
        <div
          className="splitring-cine__scene"
          role="img"
          aria-label={media.ariaLabel}
        />
        <span className="splitring-cine__tag">{media.label}</span>
        <div className="splitring-cine__scrim" aria-hidden="true" />
        <div className="splitring-cine__inner">
          <div className="splitring-cine__copy" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title {...titleParts} />
            <p className="sub">{sub}</p>
          </div>
          {/* data-scrub on the chip → --scrub cascades to the ring inside. */}
          <div
            className="splitring-cine__chip"
            data-scrub
            data-reveal="up"
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            <Ring ring={ring} ariaLabel={ringAria} />
            <p className="lab-ring__cap">{ring.caption}</p>
          </div>
        </div>
      </div>

      {/* ── v2 — gauge + weighted inputs, recomposed (Modern Recomposition) ── */}
      <div className="splitring-gauge" data-version="2" hidden>
        <div className="wrap">
          <div className="splitring-gauge__head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title {...titleParts} />
            <p className="sub">{sub}</p>
          </div>
          {/* data-scrub on the panel → --scrub cascades to BOTH the ring and
              the weighted-input bars, so all of them fill together. */}
          <div className="splitring-gauge__panel" data-scrub data-reveal="up">
            <div className="splitring-gauge__readout">
              <Ring ring={ring} ariaLabel={ringAria} />
              <p className="lab-ring__cap">{ring.caption}</p>
            </div>
            <div className="splitring-gauge__inputs">
              <span className="splitring-gauge__inputs-head">Weighted inputs (demo)</span>
              <Bars breakdown={breakdown} className="splitring-gauge__bars" />
              <p className="lab-ring__cap splitring-gauge__inputs-cap">
                {breakdownCaption}
              </p>
            </div>
          </div>
          {/* Real demo media strip — paired light/ink asset (CSS background). */}
          <div className="splitring-gauge__strip" data-reveal="up">
            <div
              className="splitring-gauge__strip-img"
              role="img"
              aria-label={media.ariaLabel}
            />
            <span className="splitring-gauge__strip-tag">{media.label}</span>
          </div>
        </div>
      </div>

      {/* ── v3 — expanded expressive, pinned-to-screen (Expressive) ── */}
      <div
        className="splitring-expr"
        data-version="3"
        data-scrub
        style={{ "--v3-stages": String(v3Stages) } as CSSProperties}
        hidden
      >
        <div className="splitring-expr__stage">
          {/* ambient evidence backdrop behind the right column */}
          <div className="splitring-expr__ambient" aria-hidden="true" />
          <div className="wrap splitring-expr__inner">
            <div className="splitring-expr__copy">
              <LabEyebrow>{eyebrow}</LabEyebrow>
              <Title {...titleParts} />
              <p className="sub">{sub}</p>
            </div>
            <div className="splitring-expr__panel">
              <div className="splitring-expr__inputs">
                <span className="splitring-expr__inputs-head">
                  Weighted inputs (demo)
                </span>
                <Bars breakdown={breakdown} className="splitring-expr__bars" />
                <p className="lab-ring__cap splitring-expr__inputs-cap">
                  {breakdownCaption}
                </p>
              </div>
              <div className="splitring-expr__payoff">
                <Ring ring={ring} ariaLabel={ringAria} />
                <p className="lab-ring__cap">{ring.caption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
