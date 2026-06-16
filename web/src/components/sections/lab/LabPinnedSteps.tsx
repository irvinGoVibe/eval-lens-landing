import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { LabEyebrow, MediaPlaceholder } from "./_kit";

/**
 * Section type 03 — Pinned multi-screen.
 *
 * - **Video variant** (`videoScrub` given): a tall section (~2 screens, height
 *   scales with `steps.length`) that scrolls normally. The video is a ¾-width
 *   sticky backdrop on the right — right edge never cropped, left hidden under a
 *   black left→right veil — and scrubs as the page scrolls past. The steps sit
 *   on the left, dim by default and brightening (lens number) as each scrolls
 *   into view (`data-reveal` → `.is-in`).
 * - **Placeholder variant** (no `videoScrub`): a sticky pin where the steps
 *   light up in place (`data-pin-stage` / `data-pin-step`, `.is-active`
 *   cumulative) next to a static media slot.
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
  /** Static placeholder slot — used unless `videoScrub` is provided. */
  media?: { ratio: string; label: string; hint: string; ariaLabel: string };
  /**
   * Scroll-scrubbed video backdrop. Its `currentTime` is driven by the
   * section's pin progress via ScrollFX (`data-scrub-video`); `frames`
   * quantizes the scrub into N discrete steps across the clip.
   */
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
    <div className="cta-row" style={{ marginTop: "clamp(28px,4vw,40px)" }}>
      <Button href={cta.href} variant={cta.variant}>
        {cta.label}
      </Button>
    </div>
  ) : null;

  return (
    <section
      id={id}
      className={`band ${surface} lab-process${videoScrub ? " lab-process--video" : ""}`}
      data-marker={marker}
      data-pin
      data-pin-steps={steps.length}
      aria-label={ariaLabel}
      style={{ "--steps": steps.length } as CSSProperties}
    >
      <div className="lab-process__stage" data-pin-stage>
        {videoScrub ? (
          <div className="lab-process__bg" aria-hidden="true">
            {/* No autoPlay: ScrollFX seeks currentTime from the scroll position.
                Autoplay would fight the scrub on the way back up. */}
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
            <span className="lab-process__veil" />
          </div>
        ) : null}

        <div
          className={
            videoScrub
              ? "wrap lab-process__grid lab-process__grid--video"
              : "wrap lab-process__grid"
          }
        >
          <div className="lab-process__copy">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title title={title} />
            <p className="sub">{sub}</p>
            <ol className="lab-process__steps">
              {steps.map((step) => (
                <li key={step.label} className="lab-step" data-pin-step>
                  <span className="lab-step__num">{step.num}</span>
                  <span className="lab-step__label">{step.label}</span>
                  <span className="lab-step__desc">{step.desc}</span>
                </li>
              ))}
            </ol>
            {ctaRow}
          </div>
          {!videoScrub && media ? (
            <MediaPlaceholder
              className="lab-process__media"
              ratio={media.ratio}
              label={media.label}
              hint={media.hint}
              ariaLabel={media.ariaLabel}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
