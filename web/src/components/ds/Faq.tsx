import type { ReactNode } from "react";

import { Eyebrow, Title } from "@/components/ds";

/**
 * Faq — clean DS extraction of archetype 16 (FAQ list).
 *
 * A faithful token port of the deprecated `LabFaq`, on the clean `.ds-*`
 * namespace (no `.lab-*`, no `.section-lab` dependency). Styles live in
 * `ds.css`. A calm, scannable question/answer list rendered as a static
 * definition list (`<dl>`) — no JS accordion, reads without scripts.
 *
 * Content (eyebrow, title, Q/A pairs) is the invariant — only layout differs
 * across the three saved versions, each surface-adaptive (`light` default →
 * `soft`; `ink` flips colour only, geometry stays put):
 *   • v1 — Polish: the original two-column hairline-ruled grid.
 *   • v2 — Modern Recomposition: a single editorial column with larger
 *     questions and a clearer hairline rhythm.
 *   • v3 — Expanded Expressive: a large display head over the two-column grid
 *     with more air.
 *
 * Motion is `data-reveal` only, consumed by the page's single `<ScrollFX/>`.
 */
export type FaqItem = { q: string; a: ReactNode };
export type FaqProps = {
  id?: string;
  /** `.band` surface — `light` (default → `soft`) or `ink`. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  /** Optional lens-accented word inside the title (first case-insensitive match). */
  titleAccent?: string;
  items: FaqItem[];
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

function Grid({ items }: { items: FaqItem[] }) {
  return (
    <dl className="ds-faq__grid" data-reveal="up">
      {items.map((item, i) => (
        <div key={i}>
          <dt>{item.q}</dt>
          <dd>{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Faq({
  id = "faq",
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  titleAccent,
  items,
  marker,
}: FaqProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const versions = ["polish", "recomp", "expanded"] as const;
  return (
    <section
      id={id}
      className={`band ${surf} ds-faq`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {versions.map((key, index) => (
        <div
          key={key}
          className={`ds-faq__v ds-faq__v--${key}`}
          data-version={index + 1}
          hidden={index > 0}
        >
          <div className="wrap">
            <div className="head" data-reveal="up">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Title title={title} accent={titleAccent} />
            </div>
            <Grid items={items} />
          </div>
        </div>
      ))}
    </section>
  );
}
