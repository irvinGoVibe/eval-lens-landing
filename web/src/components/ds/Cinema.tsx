import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/LazyVideo";

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
 * The cinematic intentionally keeps the same scroll-driven composition across
 * motion preferences so physical Safari matches the responsive web version.
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
  /** `lens-end` — scrim fades out at the end so the section resolves to the
   *  full lens gradient instead of white/black. Requires `surface="light"`. */
  variant?: "lens-end";
};

/* ── Mobile knockout auto-fit ─────────────────────────────────────────────
 * The mobile knockout draws the headline as fixed-size SVG <text> inside a
 * 440-unit-wide portrait viewBox with `preserveAspectRatio="…slice"`, so any
 * line wider than the viewBox is CROPPED at the screen edges. `mobileLines`
 * only helps if the author guesses good breaks — a long line still overflows.
 *
 * Safety net: estimate each mobile line's rendered width (a weighted glyph
 * model — spaces narrow, caps / W / M wide, i·l·t narrow — that slightly
 * OVER-estimates, i.e. errs toward catching overflow). If the WIDEST line would
 * exceed the safe width, scale the WHOLE headline down by one uniform ratio so
 * every line keeps identical glyph proportions (no per-line condensing, which
 * reads as one line stretched next to another). Short headlines stay at full
 * size. Needs no client JS — it stays a pure Server Component. */
const MOBILE_FS = 66; // base .ds-cinema__masktext--m font-size in ds.css
const MOBILE_DY = 84; // base line advance (tspan dy) in ds.css / Cinema markup
const MOBILE_SAFE = 400; // widest line fits this (of the 440 viewBox → ~20u margin/side)

function estLineWidth(line: string, fs: number): number {
  let em = 0;
  for (const ch of line) {
    if (ch === " ") em += 0.28;
    else if (ch === "W" || ch === "M" || ch === "m" || ch === "w") em += 0.85;
    else if ("iIljtf.,'!:;|".includes(ch)) em += 0.3;
    else if (ch >= "A" && ch <= "Z") em += 0.72;
    else em += 0.52;
  }
  return em * fs;
}

/** Uniform shrink ratio so the widest mobile line fits MOBILE_SAFE (≤1). */
function mobileFitRatio(lines: string[]): number {
  const widest = Math.max(...lines.map((l) => estLineWidth(l, MOBILE_FS)));
  return widest > MOBILE_SAFE ? MOBILE_SAFE / widest : 1;
}

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
  variant,
}: CinemaProps) {
  const useVideo = Boolean(media.videoSrc);
  const slug = maskId ?? slugify(headline);
  const maskD = `ds-cinema-mask-${slug}-d`;
  const maskM = `ds-cinema-mask-${slug}-m`;
  const desktopLines = lines && lines.length ? lines : [headline];
  const mobileWrapped =
    mobileLines && mobileLines.length ? mobileLines : [headline];
  const mobileRatio = mobileFitRatio(mobileWrapped);
  const mobileFontSize = MOBILE_FS * mobileRatio;
  const mobileDy = Math.round(MOBILE_DY * mobileRatio);
  const isMultiline = desktopLines.length > 1;
  const className = [
    "band",
    surface === "ink" ? "ink" : "",
    "ds-cinema",
    isMultiline ? "ds-cinema--multiline" : "",
    variant === "lens-end" ? "ds-cinema--lens-end" : "",
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
          /* Cinema is always below the fold — viewport-gate the video bytes
             (SSR markup stays a plain <video> with the poster). */
          <LazyVideo
            className="ds-cinema__vid"
            src={media.videoSrc!}
            poster={media.poster}
            ariaHidden
          />
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

        {/* lens-end variant: animated lobes bg fades in as video fades out.
            Uses ds-canvas__bg--lobes for the gradient + blob animations;
            ds-cinema__zone-bg overrides position:fixed → absolute. */}
        {variant === "lens-end" && (
          <div
            className="ds-cinema__zone-bg ds-canvas__bg--lobes"
            aria-hidden
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
                style={
                  mobileRatio < 1
                    ? { fontSize: `${mobileFontSize.toFixed(1)}px` }
                    : undefined
                }
              >
                {mobileWrapped.map((line, i) => (
                  <tspan key={i} x="220" dy={i === 0 ? 0 : mobileDy}>
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
