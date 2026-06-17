import { LabEyebrow, LabTitle } from "./_kit";

/**
 * Section type 16 — FAQ list.
 *
 * A calm, scannable question/answer list rendered as a static definition list
 * (not a JS accordion) so it reads without scripts.
 *
 * Three saved versions (switch in the LabMarkers inspector), all surface-adaptive
 * (`soft` is this archetype's default). Within a version light and ink share
 * identical geometry — only colour tokens flip (surface-invariant); the title
 * size is pinned per version so flipping surface never resizes it.
 *   • **v1 — Polish**: the original two-column grid. No grad-word.
 *   • **v2 — Modern Recomposition**: a single editorial column with larger
 *     questions and a clearer hairline rhythm. Lens accent on "calm".
 *   • **v3 — Expanded Expressive**: a large display head (lens accent on
 *     "scannable") over the two-column grid with more air.
 *
 * Content is the invariant — the same Q/A pairs in every version. Motion is wired
 * purely through `data-reveal` consumed by the page's single `<ScrollFX/>`.
 *
 * See [section-types#16-faq-list](../../../../../wiki/architecture/section-types.md).
 */
export type LabFaqItem = { q: string; a: string };
export type LabFaqProps = {
  id?: string;
  /** `.band` surface — `soft` (light) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  items: LabFaqItem[];
  marker?: string;
};

function Grid({ items }: { items: LabFaqItem[] }) {
  return (
    <dl className="lab-faq__grid" data-reveal="up">
      {items.map((item) => (
        <div key={item.q}>
          <dt>{item.q}</dt>
          <dd>{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LabFaq({
  id = "faq",
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  items,
  marker,
}: LabFaqProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const versions: Array<{ key: string; accent?: string }> = [
    { key: "polish" },
    { key: "recomp", accent: "calm" },
    { key: "expanded", accent: "scannable" },
  ];
  return (
    <section
      id={id}
      className={`band ${surf} lab-faq`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {versions.map((v, index) => (
        <div
          key={v.key}
          className={`lab-faq__v lab-faq__v--${v.key}`}
          data-version={index + 1}
          hidden={index > 0}
        >
          <div className="wrap">
            <div className="head" data-reveal="up">
              <LabEyebrow>{eyebrow}</LabEyebrow>
              <LabTitle title={title} accent={v.accent} />
            </div>
            <Grid items={items} />
          </div>
        </div>
      ))}
    </section>
  );
}
