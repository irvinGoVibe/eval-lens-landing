import { Button } from "@/components/ui/Button";
import { LabEyebrow, LabTitle } from "./_kit";

/**
 * Section type 13 — Pricing tiers.
 *
 * A row of plan cards; one is `recommended` and carries the lens surface, the
 * rest stay quiet and comparable. Each card: optional chip, name, price (mono),
 * blurb, feature bullets, select button. A footnote sits below.
 *
 * Three saved versions (switch in the LabMarkers inspector), all surface-adaptive
 * (`soft` is this archetype's default). Within a version light and ink share
 * identical geometry — only colour tokens flip (surface-invariant); the title
 * size is pinned per version so flipping surface never resizes it.
 *   • **v1 — Polish**: the original 4-up grid. No grad-word.
 *   • **v2 — Modern Recomposition**: the recommended card lifts (scale + ring) to
 *     sharpen hierarchy. Lens accent on "hierarchy".
 *   • **v3 — Expanded Expressive**: a large display head (lens accent on
 *     "Pricing") over a more generous grid.
 *
 * Content is the invariant — the same tiers, prices and bullets in every version.
 * The select button is the shared `Button` (primary for the recommended tier,
 * ghost otherwise). Motion is wired purely through `data-reveal` consumed by the
 * page's single `<ScrollFX/>`.
 *
 * See [section-types#13-pricing-tiers](../../../../../wiki/architecture/section-types.md).
 */
export type LabPricingTier = {
  name: string;
  price: string;
  body: string;
  bullets: string[];
  recommended?: boolean;
};
export type LabPricingProps = {
  id?: string;
  /** `.band` surface — `soft` (light) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  tiers: LabPricingTier[];
  note?: string;
  /** Select-button label/href (shared across tiers). */
  ctaLabel?: string;
  ctaHref?: string;
  marker?: string;
};

function Cards({
  tiers,
  ctaLabel,
  ctaHref,
}: {
  tiers: LabPricingTier[];
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <ul className="lab-pricing__grid" data-reveal="up">
      {tiers.map((tier) => (
        <li
          key={tier.name}
          className={
            tier.recommended
              ? "lab-pricing__card lab-pricing__card--recommended"
              : "lab-pricing__card"
          }
        >
          {tier.recommended ? <span className="chip">Recommended</span> : null}
          <h3>{tier.name}</h3>
          <strong>{tier.price}</strong>
          <p>{tier.body}</p>
          <ul className="lab-pricing__bullets">
            {tier.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <Button href={ctaHref} variant={tier.recommended ? "primary" : "ghost"}>
            {ctaLabel}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export function LabPricing({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  sub,
  tiers,
  note,
  ctaLabel = "Select",
  ctaHref = "#pricing",
  marker,
}: LabPricingProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} lab-pricing`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: original 4-up grid ── */}
      <div className="lab-pricing__v lab-pricing__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} />
            <p className="sub">{sub}</p>
          </div>
          <Cards tiers={tiers} ctaLabel={ctaLabel} ctaHref={ctaHref} />
          {note ? (
            <p className="lab-pricing__note" data-reveal="up">
              {note}
            </p>
          ) : null}
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: recommended card lifts ── */}
      <div className="lab-pricing__v lab-pricing__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="hierarchy" />
            <p className="sub">{sub}</p>
          </div>
          <Cards tiers={tiers} ctaLabel={ctaLabel} ctaHref={ctaHref} />
          {note ? (
            <p className="lab-pricing__note" data-reveal="up">
              {note}
            </p>
          ) : null}
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, generous grid ── */}
      <div className="lab-pricing__v lab-pricing__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="Pricing" />
            <p className="sub">{sub}</p>
          </div>
          <Cards tiers={tiers} ctaLabel={ctaLabel} ctaHref={ctaHref} />
          {note ? (
            <p className="lab-pricing__note" data-reveal="up">
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
