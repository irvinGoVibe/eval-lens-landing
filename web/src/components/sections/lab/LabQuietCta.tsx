import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { LabEyebrow, LabTitle } from "./_kit";

/**
 * Section type 12 — Quiet CTA band.
 *
 * The calm final call that closes every page: centered eyebrow → title → sub →
 * one pill button, each staggering in. No extra cards.
 *
 * Three saved versions (switch in the LabMarkers inspector), all surface-adaptive
 * (`ink` is this archetype's default). Within a version light and ink share
 * identical geometry — only colour tokens flip (surface-invariant); the title
 * size is pinned per version so flipping surface never resizes it.
 *   • **v1 — Polish**: the original composition — centered, staggered, plain
 *     title. No grad-word.
 *   • **v2 — Modern Recomposition**: a tighter, slightly larger lockup with a
 *     lens accent on "calm".
 *   • **v3 — Expanded Expressive**: a large display title (lens accent on "next")
 *     with generous air above the action.
 *
 * Content is the invariant — same eyebrow/title/sub/CTA in every version. The
 * button is the shared `Button` (default variant), the same one used on dark CTA
 * bands across the site. Motion is wired purely through `data-reveal` consumed by
 * the page's single `<ScrollFX/>`.
 *
 * See [section-types#12-quiet-cta-band](../../../../../wiki/architecture/section-types.md).
 */
export type LabQuietCtaProps = {
  id?: string;
  /** `.band` surface — `ink` (dark) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: { label: string; href: string };
  marker?: string;
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
      <LabEyebrow reveal="up">{eyebrow}</LabEyebrow>
      <LabTitle title={title} accent={accent} reveal="up" delay={90} />
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

export function LabQuietCta({
  id,
  surface = "ink",
  ariaLabel,
  eyebrow,
  title,
  sub,
  cta,
  marker,
}: LabQuietCtaProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} lab-quiet-cta`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: centered, staggered, plain title ── */}
      <div className="lab-quiet-cta__v lab-quiet-cta__v--polish" data-version="1">
        <Inner eyebrow={eyebrow} title={title} sub={sub} cta={cta} />
      </div>

      {/* ── v2 — Modern Recomposition: tighter lockup, lens accent "calm" ── */}
      <div className="lab-quiet-cta__v lab-quiet-cta__v--recomp" data-version="2" hidden>
        <Inner eyebrow={eyebrow} title={title} sub={sub} cta={cta} accent="calm" />
      </div>

      {/* ── v3 — Expanded Expressive: large display title, lens accent "next" ── */}
      <div className="lab-quiet-cta__v lab-quiet-cta__v--expanded" data-version="3" hidden>
        <Inner eyebrow={eyebrow} title={title} sub={sub} cta={cta} accent="next" />
      </div>
    </section>
  );
}
