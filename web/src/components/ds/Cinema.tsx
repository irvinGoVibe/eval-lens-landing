import { Button } from "@/components/ui/Button";

/**
 * Cinema — the cinematic close / transition section (clean DS).
 *
 * Extracted 1:1 from the proven `.ds-cinema` block on `/dev/ds-sections`
 * (also used inline on `/product/evidence-based-reports`). The `.ds-cinema*`
 * styles already live in `ds.css` — this is the prop-driven component over them,
 * nothing redesigned.
 *
 * Layer stack (bottom → top): full-bleed media (video preferred, still-image
 * fallback) → lens fill (resolves the letters to a solid brand gradient at the
 * end) → FIXED full-bleed knockout scrim, where ONLY the headline letters scale
 * so the media shows through the letters and the scrim always covers the
 * viewport → supporting copy (eyebrow? + sub + CTA) below the letters.
 *
 * Two knockouts, toggled by CSS `@media` in ds.css: `--d` (desktop, landscape
 * viewBox, single line) and `--m` (mobile, portrait viewBox, headline wrapped to
 * `mobileLines`). Motion is 100% `--pin`-driven by the page's single `<ScrollFX/>`
 * (`data-pin` / `data-pin-stage`) — no per-section runtime, no `useEffect`.
 * reduced-motion / mobile degrade to a static statement.
 *
 * Surface: `.ds-cinema` defaults to a LIGHT (white) scrim; `surface="ink"`
 * (default) adds `.ink` for the black scrim. Both supported — surface only flips
 * colour, geometry is identical.
 */
export type CinemaMedia = {
  /** Preferred — full-bleed background video (autoplay/muted/loop). */
  videoSrc?: string;
  /** Optional poster for the video. */
  poster?: string;
  /** Still-image fallback used when no `videoSrc` is given. */
  imageSrc?: string;
};

export type CinemaProps = {
  /** `.band` surface — `ink` (black scrim, default) or `light` (white scrim). */
  surface?: "light" | "ink";
  /** Optional small label above the supporting copy. */
  eyebrow?: string;
  /** The headline knocked out of the scrim — media shows through the letters. */
  headline: string;
  /**
   * Desktop (landscape) knockout lines: wrap the headline across multiple lines.
   * Defaults to `[headline]` (single line). With >1 line the copy drops lower so
   * it clears the taller knockout.
   */
  lines?: string[];
  /**
   * Mobile (portrait) knockout lines: the headline wrapped to ≤N lines so the
   * portrait slice doesn't crop it. Defaults to `[headline]` (single line).
   */
  mobileLines?: string[];
  /** Supporting sentence, revealed after the headline resolves. */
  sub?: string;
  /** Optional CTA — rendered with the shared gradient `<Button>`. */
  cta?: { label: string; href: string };
  /** Media shown through the letters — video (preferred) or still image. */
  media: CinemaMedia;
  /** Number of pin steps (track length). Mirrors the source's `1`. */
  pinSteps?: number;
  /** Stable id used to scope the SVG masks so multiple instances don't collide. */
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
      .slice(0, 48) || "cinema"
  );
}

export function Cinema({
  surface = "ink",
  eyebrow,
  headline,
  lines,
  mobileLines,
  sub,
  cta,
  media,
  pinSteps = 1,
  maskId,
  id,
}: CinemaProps) {
  const useVideo = Boolean(media.videoSrc);
  const slug = maskId ?? slugify(headline);
  const maskD = `ds-cinema-mask-${slug}-d`;
  const maskM = `ds-cinema-mask-${slug}-m`;
  const desktopLines = lines && lines.length ? lines : [headline];
  const mobileWrapped =
    mobileLines && mobileLines.length ? mobileLines : [headline];
  const isMultiline = desktopLines.length > 1;
  const className = [
    "band",
    surface === "ink" ? "ink" : "",
    "ds-cinema",
    isMultiline ? "ds-cinema--multiline" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={className}
      data-pin
      data-pin-steps={pinSteps}
      aria-label={headline}
    >
      <div className="ds-cinema__stage" data-pin-stage>
        {useVideo ? (
          <video
            className="ds-cinema__vid"
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
            className="ds-cinema__vid ds-cinema__vid--img"
            style={
              media.imageSrc
                ? { backgroundImage: `url(${media.imageSrc})` }
                : undefined
            }
            aria-hidden="true"
          />
        )}

        {/* lens fill — fades in at the end, fully covering the media so the
            letters resolve to a solid brand gradient (media gone, only letters). */}
        <div className="ds-cinema__fill" aria-hidden="true" />

        {/* desktop knockout — landscape viewBox, single line */}
        <svg
          className="ds-cinema__knockout ds-cinema__knockout--d"
          viewBox="0 0 1280 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id={maskD}>
              <rect width="1280" height="900" fill="#fff" />
              <text
                x="640"
                y={isMultiline ? 420 - (desktopLines.length - 1) * 39 : 420}
                textAnchor="middle"
                className="ds-cinema__masktext"
              >
                {desktopLines.map((line, i) => (
                  <tspan key={i} x="640" dy={i === 0 ? 0 : 78}>
                    {line}
                  </tspan>
                ))}
              </text>
            </mask>
          </defs>
          <rect
            className="ds-cinema__scrimrect"
            width="1280"
            height="900"
            mask={`url(#${maskD})`}
          />
        </svg>

        {/* mobile knockout — portrait viewBox, headline wrapped so the slice
            doesn't crop it; same --pin animation, portrait origin */}
        <svg
          className="ds-cinema__knockout ds-cinema__knockout--m"
          viewBox="0 0 440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id={maskM}>
              <rect width="440" height="900" fill="#fff" />
              <text
                x="220"
                y="404"
                textAnchor="middle"
                className="ds-cinema__masktext ds-cinema__masktext--m"
              >
                {mobileWrapped.map((line, i) => (
                  <tspan key={i} x="220" dy={i === 0 ? 0 : 84}>
                    {line}
                  </tspan>
                ))}
              </text>
            </mask>
          </defs>
          <rect
            className="ds-cinema__scrimrect"
            width="440"
            height="900"
            mask={`url(#${maskM})`}
          />
        </svg>

        {/* supporting copy — appears AFTER the heading, below it; no second
            heading element overlaps the masked letters */}
        <div className="ds-cinema__copy">
          {eyebrow ? (
            <span className="eyebrow ds-cinema__eyebrow">
              <span className="dot" aria-hidden="true" />
              {eyebrow}
            </span>
          ) : null}
          <h2 className="ds-cinema__headline">{headline}</h2>
          {sub ? <p className="sub ds-cinema__sub">{sub}</p> : null}
          {cta ? (
            <div className="sect-cta ds-cinema__cta">
              <Button href={cta.href} variant="gradient">
                {cta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
