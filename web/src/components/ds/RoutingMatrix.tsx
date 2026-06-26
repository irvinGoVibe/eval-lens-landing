"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ds";

/**
 * RoutingMatrix — interactive "who scores what, and with what weight" grid.
 *
 * Replaces the flat stat band: instead of six identical "reads" counters, it
 * shows the real Judge Routing Matrix — each judge (row) against each scoring
 * dimension (column), with the cell marking that judge's participation level:
 *   • primary   — owns the dimension, carries the strongest weight (1.00)
 *   • secondary — a meaningful supporting view (0.50)
 *   • advisory  — context without driving the score (0.25)
 *   • none      — the judge does not score this dimension
 *
 * Hovering / focusing a judge lights their row, fades the rest, and surfaces a
 * plain-language breakdown in the side panel (primary lens + supporting lenses).
 * Colours are the shared lens palette; light is the default surface. Content is
 * the invariant — the matrix data is passed in.
 */
export type RoutingWeight = "primary" | "secondary" | "advisory" | "none";

export type RoutingJudge = {
  /** Short panel code, e.g. `J-P1`. */
  code: string;
  /** Judge name / lens, e.g. `Problem`. */
  name: string;
  /** One weight per dimension, in the same order as `dimensions`. */
  cells: RoutingWeight[];
};

export type RoutingMatrixProps = {
  id?: string;
  /** `.band` surface — `light` (`.soft`) is the default for this archetype. */
  surface?: "light" | "ink";
  eyebrow: string;
  /** Section heading. `titleAccent` is appended in the lens gradient. */
  title: string;
  titleAccent?: string;
  /** Words inside `title` to render in the lens gradient (consecutive ones merge into one run). */
  accentWords?: string[];
  sub: string;
  /** Short column labels (one per dimension). */
  dimensions: string[];
  /** Full dimension names for the side panel + screen readers. Defaults to `dimensions`. */
  dimensionsFull?: string[];
  /** Judge rows. Each `cells` array must match `dimensions` in length. */
  judges: RoutingJudge[];
  marker?: string;
};

const WEIGHT_LABEL: Record<RoutingWeight, string> = {
  primary: "Primary",
  secondary: "Secondary",
  advisory: "Advisory",
  none: "Not scored",
};

const LEGEND: { weight: RoutingWeight; label: string; value: string }[] = [
  { weight: "primary", label: "Primary", value: "1.00" },
  { weight: "secondary", label: "Secondary", value: "0.50" },
  { weight: "advisory", label: "Advisory", value: "0.25" },
];

/** Priority order for the side-panel breakdown: primary → secondary → advisory. */
const WEIGHT_RANK: Record<RoutingWeight, number> = {
  primary: 0,
  secondary: 1,
  advisory: 2,
  none: 3,
};

function Marker({ weight }: { weight: RoutingWeight }) {
  return <span className={`ds-routing__mark ds-routing__mark--${weight}`} aria-hidden="true" />;
}

/** Render a title, wrapping the given words in the lens gradient. Consecutive
 *  accented words merge into a single `.grad-word` run so the gradient flows. */
function TitleText({ title, accentWords }: { title: string; accentWords?: string[] }) {
  if (!accentWords?.length) return <>{title}</>;
  const set = new Set(accentWords.map((w) => w.toLowerCase()));
  const segments: { accent: boolean; words: string[] }[] = [];
  title.split(" ").forEach((word) => {
    const accent = set.has(word.replace(/[^a-zA-Z]/g, "").toLowerCase());
    const last = segments[segments.length - 1];
    if (last && last.accent === accent) last.words.push(word);
    else segments.push({ accent, words: [word] });
  });
  return (
    <>
      {segments.map((seg, i) => {
        const text = (i > 0 ? " " : "") + seg.words.join(" ");
        return seg.accent ? (
          <span key={i} className="grad-word">{text}</span>
        ) : (
          <span key={i}>{text}</span>
        );
      })}
    </>
  );
}

export function RoutingMatrix({
  id,
  surface = "light",
  eyebrow,
  title,
  titleAccent,
  accentWords,
  sub,
  dimensions,
  dimensionsFull,
  judges,
  marker,
}: RoutingMatrixProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const [active, setActive] = useState<number | null>(null);
  const fullNames = dimensionsFull ?? dimensions;

  const activeJudge = active != null ? judges[active] : null;
  const primaryLenses =
    activeJudge?.cells
      .map((w, i) => ({ w, name: fullNames[i] }))
      .filter((c) => c.w === "primary") ?? [];
  // Supporting = secondary + advisory, sorted by priority (secondary first).
  const supportingLenses =
    activeJudge?.cells
      .map((w, i) => ({ w, name: fullNames[i] }))
      .filter((c) => c.w === "secondary" || c.w === "advisory")
      .sort((a, b) => WEIGHT_RANK[a.w] - WEIGHT_RANK[b.w]) ?? [];

  return (
    <section
      id={id}
      className={`band ${surf} ds-routing`}
      data-marker={marker}
      data-active={active != null ? "" : undefined}
    >
      <div className="wrap">
        <div className="head" data-reveal="up">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="title">
            <TitleText title={title} accentWords={accentWords} />
            {titleAccent ? (
              <>
                {" "}
                <span className="grad-word">{titleAccent}</span>
              </>
            ) : null}
          </h2>
          <p className="sub">{sub}</p>
        </div>

        {/* compact one-line legend with the routing weights */}
        <div className="ds-routing__legend" data-reveal="up">
          {LEGEND.map((l) => (
            <span key={l.weight} className="ds-routing__legend-item">
              <Marker weight={l.weight} />
              <span className="ds-routing__legend-label">{l.label}</span>
              <span className="ds-routing__legend-value">{l.value}</span>
            </span>
          ))}
        </div>

        <div className="ds-routing__layout" data-reveal="up">
          {/* ── matrix ── */}
          <div
            className="ds-routing__grid"
            onMouseLeave={() => setActive(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive(null);
            }}
          >
            <table className="ds-routing__table">
              <caption className="ds-routing__sr">
                Judge routing matrix: each judge scored against each dimension, marked
                primary, secondary, advisory, or not scored.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="ds-routing__corner">
                    <span className="ds-routing__sr">Judge</span>
                  </th>
                  {dimensions.map((d, i) => (
                    <th key={d} scope="col" className="ds-routing__colhead">
                      <span title={fullNames[i]}>{d}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {judges.map((judge, r) => (
                  <tr
                    key={judge.code}
                    className={`ds-routing__row${active === r ? " is-active" : ""}`}
                    onMouseEnter={() => setActive(r)}
                  >
                    <th scope="row" className="ds-routing__rowhead">
                      <button
                        type="button"
                        className="ds-routing__judge"
                        onFocus={() => setActive(r)}
                      >
                        <span className="ds-routing__judge-code">{judge.code}</span>
                        <span className="ds-routing__judge-name">{judge.name}</span>
                      </button>
                    </th>
                    {judge.cells.map((w, c) => (
                      <td
                        key={c}
                        className={`ds-routing__cell ds-routing__cell--${w}`}
                        data-current={active === r && w !== "none" ? "" : undefined}
                      >
                        <Marker weight={w} />
                        <span className="ds-routing__sr">
                          {fullNames[c]}: {WEIGHT_LABEL[w]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── side panel: active-judge breakdown ── */}
          <aside className="ds-routing__aside">
            <div className="ds-routing__detail" aria-live="polite">
              {activeJudge ? (
                <>
                  <p className="ds-routing__detail-judge">
                    <span className="ds-routing__detail-code">{activeJudge.code}</span>
                    {activeJudge.name}
                  </p>
                  {primaryLenses.length ? (
                    <div className="ds-routing__detail-group">
                      <p className="ds-routing__detail-kicker">Primary lens</p>
                      {primaryLenses.map((c) => (
                        <p key={c.name} className="ds-routing__detail-item">
                          <Marker weight="primary" />
                          {c.name}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="ds-routing__detail-group">
                      <p className="ds-routing__detail-kicker">Primary lens</p>
                      <p className="ds-routing__detail-item ds-routing__detail-item--muted">
                        None — supporting views only.
                      </p>
                    </div>
                  )}
                  {supportingLenses.length ? (
                    <div className="ds-routing__detail-group">
                      <p className="ds-routing__detail-kicker">Supporting lenses</p>
                      {supportingLenses.map((c) => (
                        <p key={c.name} className="ds-routing__detail-item">
                          <Marker weight={c.w} />
                          {c.name}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <p className="ds-routing__detail-hint">
                  Hover a judge to see the dimensions they score — and how much weight
                  each read carries.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
