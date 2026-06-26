import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Media } from "@/components/ds";

/**
 * StatementHero — clean DS extraction of archetype 01 (statement hero).
 *
 * Clean `.ds-hero*` namespace (no `.lab-*`, no `.section-lab` dependency);
 * styles live in `ds.css`. Carries the same content in three saved design
 * versions (switch in the LabMarkers inspector), surface-adaptive (light/ink):
 *   • v1 — quiet centered statement, with a SWITCHABLE background:
 *       `background="gradient"` (default, lens-grid pattern) · `"image"`
 *       (full-bleed photo) · `"video"` (full-bleed muted loop). Image/video drop
 *       a bottom-up scrim and switch the CTAs to liquid glass.
 *   • v2 — near-full-bleed cinematic gradient stage, content over it.
 *   • v3 — editorial: text left + a lens orb on the right.
 *
 * (The former v4 photo/video hero is gone — its capability now lives in v1's
 * `background` prop.) Buttons follow the rail: filled gradient on light,
 * shared liquid-glass on dark/over-media. Content is the invariant.
 */
export type StatementHeroCta = {
  label: string;
  href: string;
  /** Accepted for back-compat with the old Lab API; the rail picks the variant. */
  variant?: "primary" | "ghost" | "glass" | "gradient" | "dark";
};
export type StatementHeroProps = {
  id?: string;
  /** `.band` surface — `light` or `ink`. Default light. */
  surface?: "light" | "ink";
  eyebrow: string;
  titleLead?: string;
  titleAccent?: string;
  titleTrail?: string;
  sub?: string;
  ctas?: StatementHeroCta[];
  /** v1 background mode. Default `gradient`. */
  background?: "gradient" | "image" | "video";
  /** Image or video URL for v1 `image`/`video` backgrounds. Omit for a CSS-scene slot. */
  backgroundSrc?: string;
  /** Poster image for the v1 `video` background. */
  backgroundPoster?: string;
  /**
   * Back-compat with the old Lab hero (which carried a media slot for its v4
   * photo/video version). v4 is gone — `media` is accepted but unused; new code
   * should use `background`/`backgroundSrc` instead.
   */
  media?: { ratio: string; label: string; hint: string; ariaLabel: string };
  /** Lens-grid pattern behind the v1 gradient background. */
  pattern?: boolean;
  /** Which design version to display (1–3). Defaults to 1. */
  version?: 1 | 2 | 3;
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
  /** Extra classes on the outer `section.band` (atmosphere layers). */
  className?: string;
};

export function StatementHero({
  id = "hero",
  surface = "light",
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  ctas = [],
  background = "gradient",
  backgroundSrc,
  backgroundPoster,
  media,
  pattern = true,
  version = 1,
  marker,
  className,
}: StatementHeroProps) {
  const overMedia = background === "image" || background === "video";
  // A media-backed hero reads as a dark surface (scrim + light text + glass CTAs).
  const surf = surface === "ink" || overMedia ? "ink" : "soft";

  // v3 editorial uses the shared ratio-locked image placeholder; reuse the
  // back-compat `media` descriptor when given, else a sensible default.
  const edMedia = media ?? {
    ratio: "16/9",
    label: "Image · hero · 16:9",
    hint: "Editorial hero visual — generated brand image in the lens palette",
    ariaLabel: "Hero editorial image",
  };

  const hasHeading = Boolean(titleLead || titleAccent || titleTrail);
  const Heading = hasHeading ? (
    <>
      {titleLead ? `${titleLead} ` : null}
      {titleAccent ? <span className="grad-word">{titleAccent}</span> : null}
      {titleTrail ? ` ${titleTrail}` : null}
    </>
  ) : null;

  // Buttons follow the surface rail: filled gradient on light, glass on dark/media.
  const glass = surf === "ink";
  const ctaSet = () =>
    ctas.map((c, i) => (
      <Button
        key={i}
        href={c.href}
        variant={glass ? "glass" : i === 0 ? "gradient" : "ghost"}
      >
        {c.label}
      </Button>
    ));

  return (
    <section
      id={id}
      className={`band ${surf} ds-hero${className ? ` ${className}` : ""}`}
      data-marker={marker}
    >
      {/* ── v1 — quiet centered statement; switchable background ── */}
      <div
        className={`ds-hero__v${overMedia ? " ds-hero__v--media" : ""}`}
        data-version="1"
        hidden={version !== 1}
      >
        {overMedia ? (
          <>
            {background === "video" ? (
              <video
                className="ds-hero__media-vid"
                autoPlay
                muted
                loop
                playsInline
                poster={backgroundPoster}
                aria-hidden="true"
              >
                {backgroundSrc ? <source src={backgroundSrc} /> : null}
              </video>
            ) : (
              <div
                className="ds-hero__media-bg"
                style={backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined}
                aria-hidden="true"
              />
            )}
            {!backgroundSrc ? (
              <span className="ds-hero__bg-tag">Background · {background} slot</span>
            ) : null}
            <div className="ds-hero__media-scrim" aria-hidden="true" />
          </>
        ) : pattern ? (
          <div className="ds-pattern" aria-hidden="true" />
        ) : null}

        <div className="wrap ds-hero__inner">
          <Eyebrow reveal="up" delay={0}>
            {eyebrow}
          </Eyebrow>
          {Heading ? (
            <h1
              className="ds-hero__title"
              data-reveal="up"
              style={{ "--reveal-delay": "90ms" } as CSSProperties}
            >
              {Heading}
            </h1>
          ) : null}
          {sub ? (
            <p
              className="sub ds-hero__sub"
              data-reveal="up"
              style={{ "--reveal-delay": "180ms" } as CSSProperties}
            >
              {sub}
            </p>
          ) : null}
          {ctas.length ? (
            <div
              className="cta-row"
              data-reveal="up"
              style={{ "--reveal-delay": "270ms" } as CSSProperties}
            >
              {ctaSet()}
            </div>
          ) : null}
        </div>
      </div>

      {/* ── v2 — near-full-bleed cinematic gradient stage; content over it ── */}
      <div className="ds-hero__v ds-hero__v2" data-version="2" hidden={version !== 2}>
        {/* colourful backdrop BEHIND the glass stage — the frosted stage refracts it */}
        <div className="ds-hero__bg" aria-hidden="true" />
        <div className="ds-hero__stage ds-hero__stage--wide">
          <div className="ds-hero__overlay">
            <Eyebrow>{eyebrow}</Eyebrow>
            {Heading ? (
              <h1 className="ds-hero__title ds-hero__title--over">{Heading}</h1>
            ) : null}
            {sub ? <p className="sub ds-hero__sub ds-hero__sub--over">{sub}</p> : null}
            {ctas.length ? <div className="cta-row">{ctaSet()}</div> : null}
          </div>
        </div>
      </div>

      {/* ── v3 — editorial: text left, lens orb right ── */}
      <div className="ds-hero__v ds-hero__v3" data-version="3" hidden={version !== 3}>
        <div className="wrap ds-hero__editorial">
          <div className="ds-hero__ed-copy">
            <Eyebrow>{eyebrow}</Eyebrow>
            {Heading ? (
              <h1 className="ds-hero__title ds-hero__title--left">{Heading}</h1>
            ) : null}
            {sub ? <p className="sub ds-hero__sub ds-hero__sub--left">{sub}</p> : null}
            {ctas.length ? <div className="cta-row cta-row--left">{ctaSet()}</div> : null}
          </div>
          <Media
            className="ds-hero__ed-media"
            ratio={edMedia.ratio}
            label={edMedia.label}
            hint={edMedia.hint}
            ariaLabel={edMedia.ariaLabel}
            reveal="right"
          />
        </div>
      </div>
    </section>
  );
}
