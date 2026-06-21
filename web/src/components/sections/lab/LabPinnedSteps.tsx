import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { LabEyebrow, MediaPlaceholder } from "./_kit";

/**
 * Section type 03 — Pinned multi-screen.
 *
 * A tall section with a sticky stage; as the page scrolls the stage stays
 * pinned and the numbered steps light up in sequence. Carries the SAME content
 * in three saved design versions (switch in the LabMarkers inspector), each
 * surface-adaptive (`.band.soft` / `.band.ink`) — light/dark is a pure
 * recolour, the geometry is identical:
 *   • **v1 — Tidy:** copy + numbered steps on the left, a media slot on the
 *     right; a calm hairline-grid backdrop. Minimal structure, clean tokens.
 *   • **v2 — Guideline window:** the pipeline shown inside a product window
 *     (window chrome + per-step status chips), with the numbered track beside.
 *   • **v3 — Cinematic:** a full-bleed scroll-scrubbed video backdrop with the
 *     copy + steps over a scrim, gliding with the pin (parallax).
 *
 * Motion: the section is `data-pin` (ScrollFX writes `--pin` 0→1). Step
 * activation is driven from `--pin` in CSS (per-step `--i` vs `--steps`), so the
 * three versions coexist without fighting over ScrollFX's index model;
 * reduced-motion pins `--pin` to 1 (everything shown). The v3 video is seeked by
 * the same pin progress (`data-scrub-video`).
 *
 * See [section-types#3-pinned-multi-screen](../../../../../wiki/architecture/section-types.md).
 */
export type LabPinnedStep = {
  /** Big mono ordinal, e.g. `01`. */
  num: string;
  /** Short uppercase label. */
  label: string;
  /** Description shown under the label. */
  desc: string;
};

export type LabPinnedStepsProps = {
  id?: string;
  /** `.band` surface — dark (`ink`) is the default for this archetype. */
  surface?: "ink" | "soft";
  /** Accessible name for the whole section. */
  ariaLabel: string;
  eyebrow: string;
  /** Two-line title; `line2Accent` gets the lens gradient appended to line 2. */
  title: { line1: string; line2: string; line2Accent?: string };
  sub: string;
  steps: LabPinnedStep[];
  /** Static placeholder slot (v1). */
  media: {
    ratio: string;
    label: string;
    hint: string;
    ariaLabel: string;
    /** Opt-in subtle vertical scroll parallax for the placeholder, in px. */
    parallaxY?: number;
  };
  /** Scroll-scrubbed video backdrop (v3). Seeked by the section's pin progress. */
  videoScrub?: {
    src: string;
    frames: number;
    poster?: string;
    ariaLabel: string;
  };
  /** v1 photo mode: one image per step. When set, v1 switches from the static
   * "tidy" layout to the SAME reveal animation as v3 (head fly-up + steps), but
   * the media is a cross-fading photo stack (active photo follows `--pin-step`)
   * instead of a scrubbed video. Production (no `photos`) keeps the tidy v1. */
  photos?: string[];
  /** Optional CTA under the steps. */
  cta?: { label: string; href: string; variant?: "primary" | "ghost" | "glass" };
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

function Title({ title }: { title: LabPinnedStepsProps["title"] }) {
  return (
    <h2 className="title lab-process__title" data-reveal="fade">
      <span className="lab-process__line">
        <span>{title.line1}</span>
      </span>
      <span className="lab-process__line">
        <span>
          {title.line2}
          {title.line2Accent ? (
            <>
              {" "}
              <span className="grad-word">{title.line2Accent}</span>
            </>
          ) : null}
        </span>
      </span>
    </h2>
  );
}

/**
 * Numbered track — each step lights from `--pin` via its `--i` index (v1/tidy:
 * continuous). The `reveal` variant (v3) instead carries `data-pin-step` so
 * ScrollFX toggles `.is-active` / `.is-current` at each 1/steps threshold —
 * crisp, discrete switching between items (CSS transitions the change).
 */
function Steps({
  steps,
  variant,
  pinSteps,
}: {
  steps: LabPinnedStep[];
  variant: string;
  pinSteps?: boolean;
}) {
  const pinned = pinSteps ?? variant === "reveal";
  return (
    <ol className={`lab-process__steps lab-process__steps--${variant}`}>
      {steps.map((step, i) => (
        <li
          key={step.label}
          className="lab-step"
          style={{ "--i": i } as CSSProperties}
          {...(pinned ? { "data-pin-step": "" } : {})}
        >
          <span className="lab-step__num">{step.num}</span>
          <span className="lab-step__label">{step.label}</span>
          <span className="lab-step__desc">{step.desc}</span>
        </li>
      ))}
    </ol>
  );
}

export function LabPinnedSteps({
  id = "process",
  surface = "ink",
  ariaLabel,
  eyebrow,
  title,
  sub,
  steps,
  media,
  videoScrub,
  photos,
  cta,
  marker,
}: LabPinnedStepsProps) {
  const ctaRow = cta ? (
    <div className="cta-row lab-process__cta">
      <Button href={cta.href} variant={cta.variant}>
        {cta.label}
      </Button>
    </div>
  ) : null;

  return (
    <section
      id={id}
      className={`band ${surface} lab-process`}
      data-marker={marker}
      data-pin
      data-pin-steps={steps.length}
      aria-label={ariaLabel}
      style={{ "--steps": steps.length } as CSSProperties}
    >
      <div className="lab-process__stage" data-pin-stage>
        {/* ── v1 — with `photos`: the ORIGINAL tidy layout (static heading +
            hairline-grid texture, copy left / media right), but the media slot is
            a cross-fading PHOTO stack (active photo follows --pin-step) and the
            steps carry data-pin-step so scrolling drives the photo switch.
            Without `photos`: the plain static "tidy" layout. ── */}
        {photos && photos.length ? (
          <div className="lab-pv lab-pv--tidy lab-pv--photos" data-version="1">
            <div className="lab-pattern" aria-hidden="true" />
            <div className="wrap lab-pv__grid">
              <div className="lab-process__copy">
                {/* head wrapper is display:contents on desktop (tidy layout
                    unchanged); on mobile it becomes the flying-up heading. */}
                <div className="lab-pt__head">
                  <LabEyebrow>{eyebrow}</LabEyebrow>
                  <Title title={title} />
                  <p className="sub">{sub}</p>
                </div>
                <Steps steps={steps} variant="tidy" pinSteps />
                {ctaRow}
              </div>
              <div
                className="lab-process__media lab-process__media--photos"
                role="img"
                aria-label={media.ariaLabel}
              >
                {photos.map((src, i) => (
                  <img
                    key={src}
                    className="lab-rv__photo"
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ "--i": i } as CSSProperties}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="lab-pv lab-pv--tidy" data-version="1">
            <div className="lab-pattern" aria-hidden="true" />
            <div className="wrap lab-pv__grid">
              <div className="lab-process__copy">
                <LabEyebrow>{eyebrow}</LabEyebrow>
                <Title title={title} />
                <p className="sub">{sub}</p>
                <Steps steps={steps} variant="tidy" />
                {ctaRow}
              </div>
              <MediaPlaceholder
                className="lab-process__media"
                ratio={media.ratio}
                label={media.label}
                hint={media.hint}
                ariaLabel={media.ariaLabel}
                parallaxY={media.parallaxY}
              />
            </div>
          </div>
        )}

        {/* ── v2 — Guideline window: pipeline in a product window ── */}
        <div className="lab-pv lab-pv--window" data-version="2" hidden>
          <div className="wrap lab-pv__grid">
            <div className="lab-process__copy">
              <LabEyebrow>{eyebrow}</LabEyebrow>
              <Title title={title} />
              <p className="sub">{sub}</p>
              {ctaRow}
            </div>
            <div className="lab-window" role="img" aria-label={media.ariaLabel}>
              <div className="lab-window__bar" aria-hidden="true">
                <span className="lab-window__dot" />
                <span className="lab-window__dot" />
                <span className="lab-window__dot" />
                <span className="lab-window__title">EvalLense · pipeline</span>
              </div>
              <ol className="lab-window__rows">
                {steps.map((step, i) => (
                  <li
                    key={step.label}
                    className="lab-window__row"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <span className="lab-window__rnum">{step.num}</span>
                    <span className="lab-window__rlabel">{step.label}</span>
                    <span className="lab-window__status">
                      <span className="lab-window__sd" aria-hidden="true" />
                      <span className="lab-window__stext" />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* ── v3 — Reveal: a centered square media stays pinned in the viewport
            while the numbered steps reveal one-by-one on scroll. Base layout =
            v1 (copy + steps), driven by --pin. The square holds the scroll-
            scrubbed video when `videoScrub` is set; placeholder otherwise. ── */}
        <div className="lab-pv lab-pv--reveal" data-version="3" hidden>
          <div className="wrap lab-rv__grid">
            <div className="lab-process__copy lab-rv__copy">
              {/* head flies UP and fades as --pin advances (exit-upward = "back") */}
              <div className="lab-rv__head">
                <LabEyebrow>{eyebrow}</LabEyebrow>
                <Title title={title} />
                <p className="sub">{sub}</p>
              </div>
              <Steps steps={steps} variant="reveal" />
              {ctaRow}
            </div>
            <div className="lab-rv__media">
              {/* square stays pinned & centered; its content (.lab-rv__slide)
                  slides vertically under the frame (subtle parallax) */}
              <div
                className="lab-rv__square"
                role="img"
                aria-label={videoScrub ? videoScrub.ariaLabel : media.ariaLabel}
              >
                {videoScrub ? (
                  /* No autoPlay: ScrollFX seeks currentTime from the pin. */
                  <video
                    className="lab-rv__slide"
                    data-scrub-video
                    data-frames={videoScrub.frames}
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    poster={videoScrub.poster}
                    aria-label={videoScrub.ariaLabel}
                  >
                    <source src={videoScrub.src} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    <div className="lab-rv__slide lab-rv__slide--ph" aria-hidden="true" />
                    <span className="lab-rv__phlabel">{media.label}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
