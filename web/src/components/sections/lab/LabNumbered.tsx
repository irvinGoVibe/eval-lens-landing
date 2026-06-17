import type { CSSProperties } from "react";
import { LabEyebrow, LabTitle } from "./_kit";

/**
 * Section type 10 — Editorial numbered list.
 *
 * A numbered manifesto / set of principles: large `01 / 02 / 03` beside a heading
 * and paragraph. Not a card grid — a vertical editorial list that staggers in.
 *
 * Three saved versions (switch in the LabMarkers inspector), all surface-adaptive
 * (`soft` is this archetype's default). Within a version light and ink share
 * identical geometry — only colour tokens flip (surface-invariant); title and
 * numeral sizes are pinned per version so flipping surface never resizes them.
 *   • **v1 — Polish**: the original composition — hairline-ruled rows, the numeral
 *     in a narrow left column, staggered reveal. No grad-word.
 *   • **v2 — Modern Recomposition**: a narrower numeral column and tighter row
 *     padding give a denser editorial rhythm. Lens accent on "editorial".
 *   • **v3 — Expanded Expressive**: a large display head (lens accent on
 *     "Principles") over oversized numerals and generous spacing.
 *
 * Content is the invariant — the same numerals, titles and bodies in every
 * version. Motion is wired purely through `data-reveal` consumed by the page's
 * single `<ScrollFX/>`.
 *
 * See [section-types#10-editorial-numbered-list](../../../../../wiki/architecture/section-types.md).
 */
export type LabNumberedItem = { num: string; title: string; body: string };
export type LabNumberedProps = {
  id?: string;
  /** `.band` surface — `soft` (light) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  items: LabNumberedItem[];
  marker?: string;
};

function List({ items }: { items: LabNumberedItem[] }) {
  return (
    <ol className="lab-numbered__list">
      {items.map((item, index) => (
        <li
          key={item.num}
          data-reveal="up"
          style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
        >
          <span>{item.num}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function LabNumbered({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  sub,
  items,
  marker,
}: LabNumberedProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} lab-numbered`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: hairline-ruled rows, narrow numeral column ── */}
      <div className="lab-numbered__v lab-numbered__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} />
            <p className="sub">{sub}</p>
          </div>
          <List items={items} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: narrower numeral column, denser rhythm ── */}
      <div className="lab-numbered__v lab-numbered__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="editorial" />
            <p className="sub">{sub}</p>
          </div>
          <List items={items} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, oversized numerals ── */}
      <div className="lab-numbered__v lab-numbered__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <LabTitle title={title} accent="Principles" />
            <p className="sub">{sub}</p>
          </div>
          <List items={items} />
        </div>
      </div>
    </section>
  );
}
