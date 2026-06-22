import type { CSSProperties } from "react";
import { Eyebrow, Title, Button } from "@/components/ds";

/**
 * QuietCta — clean DS extraction of archetype 12 (quiet CTA band).
 *
 * A faithful 1:1 token port of the deprecated `LabQuietCta`: same markup
 * semantics, same three saved versions, on the clean `.ds-*` namespace (no
 * `.lab-*`, no `.section-lab` dependency). Styles live in `ds.css`.
 *
 * The calm final call that closes every page: centered eyebrow → title → sub →
 * one pill button, each staggering in. No extra cards. All three versions are
 * surface-adaptive (`ink` is this archetype's default). Within a version light
 * and ink share identical geometry — only colour tokens flip; the title size is
 * pinned per version so flipping surface never resizes it.
 *   • v1 Polish — the original composition: centered, staggered, plain title.
 *   • v2 Modern Recomposition — a tighter, slightly larger lockup with a lens
 *     accent on "calm".
 *   • v3 Expanded Expressive — a large display title (lens accent on "next")
 *     with generous air above the action.
 *
 * Content is the invariant — same eyebrow/title/sub/CTA in every version. The
 * button is the shared `Button` (default variant). Motion is wired purely
 * through `data-reveal`, consumed by the page's single `<ScrollFX/>`.
 */
export type QuietCtaProps = {
  id?: string;
  /** `.band` surface — `ink` (dark) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: { label: string; href: string };
  marker?: string;
  /** Extra classes applied to the outer `section.band` (e.g. atmosphere layers). */
  className?: string;
};

function Inner({
  eyebrow,
  title,
  sub,
  cta,
  accent,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  cta: { label: string; href: string };
  accent?: string;
}) {
  return (
    <div className="wrap head">
      <Eyebrow reveal="up">{eyebrow}</Eyebrow>
      <Title title={title} accent={accent} reveal="up" delay={90} />
      <p className="sub" data-reveal="up" style={{ "--reveal-delay": "180ms" } as CSSProperties}>
        {sub}
      </p>
      <div
        className="sect-cta"
        data-reveal="up"
        style={{ "--reveal-delay": "270ms" } as CSSProperties}
      >
        <Button href={cta.href}>{cta.label}</Button>
      </div>
    </div>
  );
}

export function QuietCta({
  id,
  surface = "ink",
  ariaLabel,
  eyebrow,
  title,
  sub,
  cta,
  marker,
  className,
}: QuietCtaProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} ds-quiet-cta${className ? ` ${className}` : ""}`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: centered, staggered, plain title ── */}
      <div className="ds-quiet-cta__v ds-quiet-cta__v--polish" data-version="1">
        <Inner eyebrow={eyebrow} title={title} sub={sub} cta={cta} />
      </div>

      {/* ── v2 — Modern Recomposition: tighter lockup, lens accent "calm" ── */}
      <div className="ds-quiet-cta__v ds-quiet-cta__v--recomp" data-version="2" hidden>
        <Inner eyebrow={eyebrow} title={title} sub={sub} cta={cta} accent="calm" />
      </div>

      {/* ── v3 — Expanded Expressive: large display title, lens accent "next" ── */}
      <div className="ds-quiet-cta__v ds-quiet-cta__v--expanded" data-version="3" hidden>
        <Inner eyebrow={eyebrow} title={title} sub={sub} cta={cta} accent="next" />
      </div>
    </section>
  );
}
