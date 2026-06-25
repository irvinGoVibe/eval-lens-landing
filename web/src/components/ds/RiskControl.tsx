import { Eyebrow, Title } from "@/components/ds";

/**
 * RiskControl — clean DS extraction of archetype 11 (risk → control grid).
 *
 * A faithful token port of the deprecated `LabRiskControl`, on the clean
 * `.ds-*` namespace (no `.lab-*`, no `.section-lab` dependency). Styles live in
 * `ds.css`. Paired rows "risk ↔ control": the left names a failure mode, the
 * right names the specific system control that keeps it bounded — a "problem →
 * how it's closed" format used on trust pages.
 *
 * Content (eyebrow, title, sub, risk/control pairs) is the invariant — only
 * layout differs across the three saved versions, each surface-adaptive (`soft`
 * light is the default; `ink` flips colour only, geometry stays put):
 *   • v1 — Polish: the original composition — hairline-ruled rows, a `.85fr /
 *     1.15fr` split, mono Risk/Control tags.
 *   • v2 — Modern Recomposition: each pair becomes a bordered card with a dashed
 *     "risk → control" connector, laid out two pairs per row.
 *   • v3 — Expanded Expressive: a large display head over oversized risk titles
 *     and generous row spacing.
 *
 * Motion is `data-reveal` only, consumed by the page's single `<ScrollFX/>`.
 */
export type RiskPair = { risk: string; control: string };
export type RiskControlProps = {
  id?: string;
  /** `.band` surface — `light` (default → `soft`) or `ink`. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  /** Optional lens-accented word inside the title (first case-insensitive match). */
  titleAccent?: string;
  sub: string;
  pairs: RiskPair[];
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

function Grid({ pairs }: { pairs: RiskPair[] }) {
  return (
    <div className="ds-risk__grid" data-reveal="up">
      {pairs.map((pair, i) => (
        <div key={i} className="ds-risk__row">
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

export function RiskControl({
  id = "risk-control",
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  titleAccent,
  sub,
  pairs,
  marker,
}: RiskControlProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} ds-risk`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: hairline-ruled .85/1.15 rows ── */}
      <div className="ds-risk__v ds-risk__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent={titleAccent} />
            <p className="sub">{sub}</p>
          </div>
          <Grid pairs={pairs} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: bordered pair-cards, two per row ── */}
      <div className="ds-risk__v ds-risk__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent={titleAccent} />
            <p className="sub">{sub}</p>
          </div>
          <Grid pairs={pairs} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, oversized risk titles ── */}
      <div className="ds-risk__v ds-risk__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent={titleAccent} />
            <p className="sub">{sub}</p>
          </div>
          <Grid pairs={pairs} />
        </div>
      </div>
    </section>
  );
}
