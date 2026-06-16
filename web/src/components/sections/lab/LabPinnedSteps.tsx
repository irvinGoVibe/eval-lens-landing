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
  media: { ratio: string; label: string; hint: string; ariaLabel: string };
  /** Scroll-scrubbed video backdrop (v3). Seeked by the section's pin progress. */
  videoScrub?: {
    src: string;
    frames: number;
    poster?: string;
    ariaLabel: string;
  };
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

/** Numbered track — each step lights from `--pin` via its `--i` index. */
function Steps({ steps, variant }: { steps: LabPinnedStep[]; variant: string }) {
  return (
    <ol className={`lab-process__steps lab-process__steps--${variant}`}>
      {steps.map((step, i) => (
        <li key={step.label} className="lab-step" style={{ "--i": i } as CSSProperties}>
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
        {/* ── v1 — Tidy: copy + steps left, media right ── */}
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
            />
          </div>
        </div>

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

        {/* ── v3 — Cinematic: full-bleed scrubbed video + overlay ── */}
        <div className="lab-pv lab-pv--cine" data-version="3" hidden>
          {videoScrub ? (
            <div className="lab-cine__bg" aria-hidden="true">
              {/* No autoPlay: ScrollFX seeks currentTime from the pin position. */}
              <video
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
            </div>
          ) : (
            <div className="lab-cine__bg lab-cine__bg--ph" aria-hidden="true">
              <span className="lab-cine__phlabel">{media.label}</span>
            </div>
          )}
          <div className="lab-cine__scrim" aria-hidden="true" />
          <div className="wrap lab-cine__inner">
            <div className="lab-process__copy">
              <LabEyebrow>{eyebrow}</LabEyebrow>
              <Title title={title} />
              <p className="sub">{sub}</p>
            </div>
            <Steps steps={steps} variant="cine" />
            {ctaRow}
          </div>
        </div>
      </div>
    </section>
  );
}
