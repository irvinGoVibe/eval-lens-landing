import type { CSSProperties } from "react";
import { Eyebrow, Title } from "@/components/ds";

/**
 * Numbered — clean DS extraction of archetype 10 (editorial numbered list).
 *
 * A faithful 1:1 token port of the deprecated `LabNumbered`: same markup
 * semantics, same three saved versions, on the clean `.ds-*` namespace (no
 * `.lab-*`, no `.section-lab` dependency). Styles live in `ds.css`.
 *
 * A numbered manifesto / set of principles: large `01 / 02 / 03` beside a
 * heading and paragraph — a vertical editorial list, not a card grid. All three
 * versions are surface-adaptive (`soft` light is this archetype's default).
 * Within a version, light and ink share identical geometry — only colour tokens
 * flip; title and numeral sizes are pinned per version.
 *   • v1 Polish — hairline-ruled rows, narrow numeral column, staggered reveal.
 *   • v2 Modern Recomposition — narrower numeral column, tighter rhythm; lens
 *     accent on "editorial".
 *   • v3 Expanded Expressive — large display head (lens accent on "Principles"),
 *     oversized numerals, generous spacing.
 *
 * Content is the invariant. Motion is wired through `data-reveal`, consumed by
 * the page's single `<ScrollFX/>`.
 */
export type NumberedItem = { num: string; title: string; body: string };
export type NumberedProps = {
  id?: string;
  /** `.band` surface — `light` (default → `soft`) or `ink`. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  items: NumberedItem[];
  marker?: string;
};

function List({ items }: { items: NumberedItem[] }) {
  return (
    <ol className="ds-numbered__list">
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

export function Numbered({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  sub,
  items,
  marker,
}: NumberedProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} ds-numbered`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: hairline-ruled rows, narrow numeral column ── */}
      <div className="ds-numbered__v ds-numbered__v--polish" data-version="1">
        <div className="wrap">
          <div className="ds-numbered__head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} />
            <p className="sub">{sub}</p>
          </div>
          <List items={items} />
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: narrower numeral column, denser rhythm ── */}
      <div className="ds-numbered__v ds-numbered__v--recomp" data-version="2" hidden>
        <div className="wrap">
          <div className="ds-numbered__head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent="editorial" />
            <p className="sub">{sub}</p>
          </div>
          <List items={items} />
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head, oversized numerals ── */}
      <div className="ds-numbered__v ds-numbered__v--expanded" data-version="3" hidden>
        <div className="wrap">
          <div className="ds-numbered__head" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title title={title} accent="Principles" />
            <p className="sub">{sub}</p>
          </div>
          <List items={items} />
        </div>
      </div>
    </section>
  );
}
