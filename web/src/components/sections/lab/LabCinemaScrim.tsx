import { Button } from "@/components/ui/Button";

/**
 * Lab Cinematic Scrim — a reusable, prop-driven generalization of the
 * `/trust/methodology` §9 `.m-cinema` pre-footer cinematic CTA.
 *
 * Layer stack (bottom → top), identical mechanics to the production scene:
 *   media (video OR still image) → lens fill (fades in at the end) →
 *   FIXED full-bleed black knockout (only the LETTERS scale, so black always
 *   covers the whole viewport — no media leaking at the edges) → copy.
 * The headline is the ONE heading: it is knocked out of the black scrim via an
 * SVG `<text>` mask, so the media shows ONLY through the letters. Supporting
 * copy (eyebrow + sub + CTA) sits BELOW the letters — no second heading element,
 * so nothing ever overlaps the masked text.
 *
 * Motion is 100% driven by `--pin` in CSS, written by the page's single
 * `<ScrollFX/>` via `data-pin` / `data-pin-stage` (no per-section runtime, no
 * useEffect). reduced-motion / mobile fall back to a static black statement.
 *
 * This is the `.methodology .m-cinema*` treatment lifted to an un-scoped
 * `.lab-cinema*` class group in globals.css — the production page is untouched.
 *
 * Ink-only by nature (black scrim). violet/blue/cyan + `--lens` palette only.
 */
export type LabCinemaScrimMedia = {
  /** Preferred — full-bleed background video (autoplay/muted/loop). */
  videoSrc?: string;
  /** Optional poster for the video. */
  poster?: string;
  /** Still-image fallback used when no `videoSrc` is given. */
  imageSrc?: string;
};

export type LabCinemaScrimProps = {
  /** `.band` surface — ink-only for this archetype. */
  surface?: "ink";
  /** Small label above the (later-revealed) supporting copy. */
  eyebrow: string;
  /** The headline knocked out of the black scrim — media shows through it. */
  headline: string;
  /** Supporting sentence, revealed after the headline resolves. */
  sub?: string;
  /** Optional CTA — rendered with the shared `<Button>`. */
  cta?: { label: string; href: string };
  /** Media shown through the letters — video (preferred) or still image. */
  media: LabCinemaScrimMedia;
  /** Number of pin steps (track length). Mirrors methodology's `1`. */
  pinSteps?: number;
  /** Stable id used to scope the SVG mask so multiple instances don't collide. */
  maskId?: string;
  id?: string;
};

/** Deterministic slug → unique-enough mask id when none is supplied. */
function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "scrim"
  );
}

export function LabCinemaScrim({
  surface = "ink",
  eyebrow,
  headline,
  sub,
  cta,
  media,
  pinSteps = 1,
  maskId,
  id,
}: LabCinemaScrimProps) {
  const surf = surface === "ink" ? "ink" : "ink";
  const useVideo = Boolean(media.videoSrc);
  const resolvedMaskId = `lab-cinema-mask-${maskId ?? slugify(headline)}`;

  return (
    <section
      id={id}
      className={`band ${surf} lab-cinema`}
      data-pin
      data-pin-steps={pinSteps}
      aria-label={headline}
    >
      <div className="lab-cinema__stage" data-pin-stage>
        {useVideo ? (
          <video
            className="lab-cinema__vid"
            autoPlay
            muted
            loop
            playsInline
            poster={media.poster}
            aria-hidden="true"
          >
            <source src={media.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            className="lab-cinema__vid lab-cinema__vid--img"
            style={
              media.imageSrc
                ? { backgroundImage: `url(${media.imageSrc})` }
                : undefined
            }
            aria-hidden="true"
          />
        )}

        {/* lens fill — fades in at the end, fully covering the media so the
         * letters resolve to a solid brand gradient (media gone, only letters) */}
        <div className="lab-cinema__fill" aria-hidden="true"></div>

        {/* static/mobile fallback ONLY — a plain lens-gradient heading that is
         * fully readable with no horizontal crop. The SVG knockout below is the
         * pinned-desktop treatment; CSS (the `@media` block) shows exactly one
         * of these two at a time. Text is identical to `headline`. */}
        <h2 className="lab-cinema__headline">{headline}</h2>

        {/* full-bleed black knockout; ONLY the masked letters scale (CSS), so
         * the black always covers the whole viewport — no media at the edges */}
        <svg
          className="lab-cinema__knockout"
          viewBox="0 0 1280 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id={resolvedMaskId}>
              <rect width="1280" height="900" fill="#fff" />
              <text
                x="640"
                y="490"
                textAnchor="middle"
                className="lab-cinema__masktext"
              >
                {headline}
              </text>
            </mask>
          </defs>
          <rect
            width="1280"
            height="900"
            fill="var(--bg-ink, #0a0a0d)"
            mask={`url(#${resolvedMaskId})`}
          />
        </svg>

        {/* supporting copy — appears AFTER the heading, below it; no second
         * heading element, so nothing overlaps the masked letters */}
        <div className="lab-cinema__copy">
          <span className="eyebrow lab-cinema__eyebrow">
            <span className="dot" aria-hidden="true"></span>
            {eyebrow}
          </span>
          {sub ? <p className="sub lab-cinema__sub">{sub}</p> : null}
          {cta ? (
            <div className="sect-cta lab-cinema__cta">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
