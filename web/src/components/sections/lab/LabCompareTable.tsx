import { LabEyebrow, LabTitle } from "./_kit";

/**
 * Section type 14 — Comparison table.
 *
 * A dense feature matrix: a corner label + plan columns across the top, feature
 * rows down the side. One column is highlighted (`recommendedIndex`). On narrow
 * screens the table scrolls inside its own focusable container (`min-width`
 * locked) rather than breaking the page — the overflow-safe mechanic is kept in
 * every version.
 *
 * Three saved versions (switch in the LabMarkers inspector), all surface-adaptive
 * (`soft` is this archetype's default). Within a version light and ink share
 * identical geometry — only colour tokens flip (surface-invariant); the title
 * size is pinned per version so flipping surface never resizes it.
 *   • **v1 — Polish**: the original table. No grad-word.
 *   • **v2 — Modern Recomposition**: a sharper header band and a stronger
 *     highlighted column. Lens accent on "tabular".
 *   • **v3 — Expanded Expressive**: a large display head (lens accent on "Dense")
 *     over roomier cells.
 *
 * Content is the invariant — the same columns, rows and highlighted plan in every
 * version. Motion is wired purely through `data-reveal` consumed by the page's
 * single `<ScrollFX/>`.
 *
 * See [section-types#14-comparison-table](../../../../../wiki/architecture/section-types.md).
 */
export type LabCompareTableProps = {
  id?: string;
  /** `.band` surface — `soft` (light) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  /** Header cells; `columns[0]` is the corner label. */
  columns: string[];
  /** Body rows; `row[0]` is the row header. */
  rows: string[][];
  /** Column index to highlight (e.g. the recommended plan). */
  recommendedIndex?: number;
  /** Small note under the highlighted header (e.g. "recommended"). */
  recommendedNote?: string;
  marker?: string;
};

function Table({
  columns,
  rows,
  recommendedIndex,
  recommendedNote,
}: {
  columns: string[];
  rows: string[][];
  recommendedIndex?: number;
  recommendedNote?: string;
}) {
  return (
    <div className="lab-table__scroll" data-reveal="up" tabIndex={0}>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col}
                className={index === recommendedIndex ? "lab-table__reco" : undefined}
              >
                {col}
                {index === recommendedIndex && recommendedNote ? (
                  <span className="lab-table__note">{recommendedNote}</span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={`${row[0]}-${index}`}>{cell}</th>
                ) : (
                  <td
                    key={`${row[0]}-${index}`}
                    className={index === recommendedIndex ? "lab-table__reco" : undefined}
                  >
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LabCompareTable({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  sub,
  columns,
  rows,
  recommendedIndex,
  recommendedNote,
  marker,
}: LabCompareTableProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const versions: Array<{ key: string; accent?: string }> = [
    { key: "polish" },
    { key: "recomp", accent: "tabular" },
    { key: "expanded", accent: "Dense" },
  ];
  return (
    <section
      id={id}
      className={`band ${surf} lab-table`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {versions.map((v, index) => (
        <div
          key={v.key}
          className={`lab-table__v lab-table__v--${v.key}`}
          data-version={index + 1}
          hidden={index > 0}
        >
          <div className="wrap">
            <div className="head" data-reveal="up">
              <LabEyebrow>{eyebrow}</LabEyebrow>
              <LabTitle title={title} accent={v.accent} />
              <p className="sub">{sub}</p>
            </div>
            <Table
              columns={columns}
              rows={rows}
              recommendedIndex={recommendedIndex}
              recommendedNote={recommendedNote}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
