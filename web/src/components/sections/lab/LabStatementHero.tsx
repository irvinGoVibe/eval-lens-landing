import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { LabEyebrow } from "./_kit";

/**
 * Section type 01 — Statement hero.
 *
 * Carries the SAME content in four saved design versions (switch in the
 * LabMarkers inspector), all surface-adaptive (`.band.soft` / `.band.ink`):
 *   • **v1** — quiet centered statement (no media slot), gradient + ghost CTAs.
 *   • **v2** — near-full-bleed cinematic gradient stage, content over it, glass CTAs.
 *   • **v3** — editorial: text left-aligned + a lens graphic on the right.
 *   • **v4** — full-bleed photo/video background, bottom→up scrim, glass CTAs.
 *
 * Buttons follow the rail: filled gradient on light, liquid-glass on the dark
 * cinematic versions. Content/slots are the invariant; only layout differs.
 * See [section-types#1-statement-hero](../../../../../wiki/architecture/section-types.md).
 */
export type LabStatementHeroProps = {
  id?: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  titleTrail?: string;
  sub: string;
  ctas: { label: string; href: string; variant?: "primary" | "ghost" | "glass" }[];
  media: { ratio: string; label: string; hint: string; ariaLabel: string };
  /** Show the ambient lens-grid pattern behind v1. */
  pattern?: boolean;
  /** Which design version to display (1–4). Defaults to 1. */
  version?: 1 | 2 | 3 | 4;
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
  /** `.band` surface — `soft` (light) is the default. */
  surface?: "soft" | "ink";
};

export function LabStatementHero({
  id = "hero",
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  ctas,
  media,
  pattern = true,
  version = 1,
  marker,
  surface = "soft",
}: LabStatementHeroProps) {
  const Heading = (
    <>
      {titleLead} <span className="grad-word">{titleAccent}</span>
      {titleTrail ? ` ${titleTrail}` : null}
    </>
  );

  // Buttons follow the surface rail: filled gradient on light, glass on dark.
  const scheme = surface === "ink" ? "glass" : "filled";
  const ctaSet = (s: "filled" | "glass" = scheme) =>
    ctas.map((c, i) => (
      <Button
        key={c.label}
        href={c.href}
        variant={s === "glass" ? "glass" : i === 0 ? "gradient" : "ghost"}
      >
        {c.label}
      </Button>
    ));

  return (
    <section id={id} className={`band ${surface} lab-hero`} data-marker={marker}>
      {/* ---- v1 — quiet centered statement (no media) ---- */}
      <div className="lab-hero__v" data-version="1" hidden={version !== 1}>
        {pattern ? <div className="lab-pattern" aria-hidden="true" /> : null}
        <div className="wrap lab-hero__inner">
          <LabEyebrow reveal="up" delay={0}>
            {eyebrow}
          </LabEyebrow>
          <h1
            className="lab-hero__title"
            data-reveal="up"
            style={{ "--reveal-delay": "90ms" } as CSSProperties}
          >
            {Heading}
          </h1>
          <p
            className="sub lab-hero__sub"
            data-reveal="up"
            style={{ "--reveal-delay": "180ms" } as CSSProperties}
          >
            {sub}
          </p>
          <div
            className="cta-row"
            data-reveal="up"
            style={{ "--reveal-delay": "270ms" } as CSSProperties}
          >
            {ctaSet()}
          </div>
        </div>
      </div>

      {/* ---- v2 — near-full-bleed cinematic gradient stage; content over it ---- */}
      <div className="lab-hero__v lab-hero__v2" data-version="2" hidden={version !== 2}>
        <div className="lab-hero__stage lab-hero__stage--wide">
          <div className="lab-hero__bg" aria-hidden="true" />
          <div className="lab-hero__overlay">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <h1 className="lab-hero__title lab-hero__title--over">{Heading}</h1>
            <p className="sub lab-hero__sub lab-hero__sub--over">{sub}</p>
            <div className="cta-row">{ctaSet()}</div>
          </div>
        </div>
      </div>

      {/* ---- v3 — editorial: text left, lens graphic right ---- */}
      <div className="lab-hero__v lab-hero__v3" data-version="3" hidden={version !== 3}>
        <div className="wrap lab-hero__editorial">
          <div className="lab-hero__ed-copy">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <h1 className="lab-hero__title lab-hero__title--left">{Heading}</h1>
            <p className="sub lab-hero__sub lab-hero__sub--left">{sub}</p>
            <div className="cta-row cta-row--left">{ctaSet()}</div>
          </div>
          <div className="lab-hero__ed-graphic" aria-hidden="true">
            <div className="lab-hero__orb" />
          </div>
        </div>
      </div>

      {/* ---- v4 — full-bleed photo/video background; bottom→up scrim ---- */}
      <div className="lab-hero__v lab-hero__v4" data-version="4" hidden={version !== 4}>
        <div className="lab-hero__cinema" role="img" aria-label={media.ariaLabel}>
          <div className="lab-hero__cinema-bg" aria-hidden="true" />
          <span className="lab-hero__bg-tag">{media.label} · video / photo</span>
          <div className="lab-hero__cinema-scrim" aria-hidden="true" />
          <div className="wrap lab-hero__overlay lab-hero__overlay--cinema">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <h1 className="lab-hero__title lab-hero__title--over">{Heading}</h1>
            <p className="sub lab-hero__sub lab-hero__sub--over">{sub}</p>
            <div className="cta-row">{ctaSet()}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
