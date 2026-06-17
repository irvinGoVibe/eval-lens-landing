import { LabEyebrow, LabTitle } from "./_kit";

/**
 * Section type 11 — Risk → control grid.
 *
 * Paired rows "risk ↔ control": the left names a failure mode, the right names
 * the specific system control that keeps it bounded. A "problem → how it's
 * closed" format used on trust pages.
 *
 * Three saved versions (switch in the LabMarkers inspector), all surface-adaptive
 * (`soft` is this archetype's default). Within a version light and ink share
 * identical geometry — only colour tokens flip (surface-invariant); the title
 * size is pinned per version so flipping surface never resizes it.
 *   • **v1 — Polish**: the original composition — hairline-ruled rows, a `.85fr /
 *     1.15fr` split, mono Risk/Control tags. No grad-word.
 *   • **v2 — Modern Recomposition**: each pair becomes a bordered card with a
 *     "risk → control" connector, laid out two pairs per row. Lens accent on
 *     "guardrail".
 *   • **v3 — Expanded Expressive**: a large display head (lens accent on
 *     "failure") over oversized risk titles and generous row spacing.
 *
 * Content is the invariant — the same risk/control pairs in every version. Motion
 * is wired purely through `data-reveal` consumed by the page's single
 * `<ScrollFX/>`.
 *
 * See [section-types#11-risk--control-grid](../../../../../wiki/architecture/section-types.md).
 */
export type LabRiskPair = { risk: string; control: string };
export type LabRiskControlProps = {
  id?: string;
  /** `.band` surface — `soft` (light) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  pairs: LabRiskPair[];
  marker?: string;
};

function Grid({ pairs }: { pairs: LabRiskPair[] }) {
  return (
    <div className="lab-risk__grid" data-reveal="up">
      {pairs.map((pair) => (
        <div key={pair.risk} className="lab-risk__row">
          <div>
            <span className="mini-tag">Risk</span>
            <strong>{pair.risk}</strong>
          </div>
          <div>
            <span className="mini-tag">Control</span>
            <p>{pair.control}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LabRiskControl({
  id = "risk-control",
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  sub,
  pairs,
  marker,
}: LabRiskControlProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} lab-risk`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: hairline-ruled .85/1.15 rows ── */}
      <div className="lab-risk__v lab-risk__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} />
            <p className="sub">{sub}</p>
          </div>
          <Grid pairs={pairs} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: bordered pair-cards, two per row ── */}
      <div className="lab-risk__v lab-risk__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="guardrail" />
            <p className="sub">{sub}</p>
          </div>
          <Grid pairs={pairs} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, oversized risk titles ── */}
      <div className="lab-risk__v lab-risk__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="failure" />
            <p className="sub">{sub}</p>
          </div>
          <Grid pairs={pairs} />
        </div>
      </div>
    </section>
  );
}
