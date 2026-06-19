import type { CSSProperties } from "react";
import { LabEyebrow, MediaPlaceholder } from "./_kit";

/**
 * Section type 07 — Bento overview.
 *
 * A compact tile field: one large feature idea plus a set of supporting tiles
 * that explain how the page system holds together. The bento pattern is used
 * for *overview*, not decoration.
 *
 * Three saved versions (switch in the LabMarkers inspector), all
 * surface-adaptive (`.band.soft` / `.band.ink`) and carrying the SAME content
 * (one eyebrow/title/sub + 4 tiles, the first marked `feature`). Within a
 * version, light and ink share identical geometry — only colour tokens flip
 * (surface-invariant):
 *   • **v1 — Polish**: the original composition, token-clean. A band-level head
 *     plus a 3-column grid where the feature tile spans 2×2 and the three
 *     supporting tiles stack in the right column. No grad-word. The feature
 *     tile carries the ratio-locked `MediaPlaceholder`.
 *   • **v2 — Modern Recomposition**: a 1.2fr/1fr magazine split. The eyebrow,
 *     title (lens-accenting "ingredients") and sub live INSIDE the tall feature
 *     tile on the left, above its media figure; the three supporting tiles
 *     stack in a right column and reveal from the right.
 *   • **v3 — Expanded Expressive**: a large display head (lens-accenting "map")
 *     over an irregular 1.6fr/1fr/1fr two-row grid — the feature and media
 *     tiles frame two tall outer columns while Motion/QA stack in the centre.
 *
 * Content/slots are the invariant; only layout differs. The feature media is
 * the visible `MediaPlaceholder` fallback (no real asset yet), ratio-locked to
 * 16/9 for zero CLS. Motion is wired purely through `data-reveal` consumed by
 * the page's single `<ScrollFX/>`.
 *
 * See [section-types#7-bento-overview](../../../../../wiki/architecture/section-types.md).
 */
export type LabBentoMedia = { label: string; hint: string; ariaLabel: string };
export type LabBentoItem = {
  tag: string;
  title: string;
  body: string;
  feature?: boolean;
  media?: LabBentoMedia;
};
export type LabBentoProps = {
  id?: string;
  /** `.band` surface — `ink` (`.ink`) is the default for this archetype. */
  surface?: "light" | "ink";
  /** Optional accessible name for the section. */
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  sub: string;
  /** 4 tiles, first one `feature` (carries the media slot). */
  items: LabBentoItem[];
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
  /** Extra classes applied to the outer `section.band` (e.g. atmosphere layers). */
  className?: string;
};

/**
 * Heading helper. The title is a single string prop; per version one word is
 * lens-accented (v1 none, v2 "ingredients", v3 "map"). Splits on spaces and
 * wraps the FIRST case-insensitive match of `accent` in `.grad-word`
 * (≤1 grad-word per version). The accent is purely a layout-markup concern.
 */
function Title({ title, accent }: { title: string; accent?: string }) {
  if (!accent) {
    return <h2 className="title">{title}</h2>;
  }
  const words = title.split(" ");
  const target = accent.toLowerCase();
  let done = false;
  return (
    <h2 className="title">
      {words.map((word, i) => {
        const space = i > 0 ? " " : "";
        if (!done && word.toLowerCase() === target) {
          done = true;
          return (
            <span key={i}>
              {space}
              <span className="grad-word">{word}</span>
            </span>
          );
        }
        return <span key={i}>{`${space}${word}`}</span>;
      })}
    </h2>
  );
}

/**
 * A single bento tile — mini-tag, heading, body, and (for the feature tile) a
 * ratio-locked media placeholder. Geometry is shared across every version; the
 * per-version grid class scopes placement and the `--feature` modifier the look.
 */
function Tile({ item, delay }: { item: LabBentoItem; delay?: number }) {
  const cls = item.feature
    ? "lab-bento__tile lab-bento__tile--feature"
    : "lab-bento__tile";
  return (
    <li
      className={cls}
      data-reveal={delay != null ? "right" : undefined}
      style={
        delay != null
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      <span className="mini-tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {item.feature && item.media ? (
        <MediaPlaceholder
          className="lab-bento__media"
          ratio="16/9"
          label={item.media.label}
          hint={item.media.hint}
          ariaLabel={item.media.ariaLabel}
        />
      ) : null}
    </li>
  );
}

export function LabBento({
  id = "bento",
  surface = "ink",
  ariaLabel,
  eyebrow,
  title,
  sub,
  items,
  marker,
  className,
}: LabBentoProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const feature = items.find((it) => it.feature);
  const supporting = items.filter((it) => !it.feature);

  return (
    <section
      id={id}
      className={`band ${surf} lab-bento${className ? ` ${className}` : ""}`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: original composition, 3-col, feature spans 2×2 ── */}
      <div className="lab-bento__v lab-bento__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title title={title} />
            <p className="sub">{sub}</p>
          </div>
          <ul
            className="lab-bento__grid"
            data-reveal="up"
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            {items.map((item) => (
              <Tile item={item} key={item.tag} />
            ))}
          </ul>
        </div>
      </div>

      {/* ── v2 — Modern Recomposition: 1.2fr/1fr split, in-tile head ── */}
      <div
        className="lab-bento__v lab-bento__v--recomp"
        data-version="2"
        hidden
      >
        <div className="wrap">
          <div className="lab-bento__grid">
            {feature ? (
              <ul className="lab-bento__feature-col">
                <li
                  className="lab-bento__tile lab-bento__tile--feature"
                  data-reveal="up"
                >
                  <div className="head">
                    <LabEyebrow>{eyebrow}</LabEyebrow>
                    <Title title={title} accent="ingredients" />
                    <p className="sub">{sub}</p>
                  </div>
                  {feature.media ? (
                    <MediaPlaceholder
                      className="lab-bento__media"
                      ratio="16/9"
                      label={feature.media.label}
                      hint={feature.media.hint}
                      ariaLabel={feature.media.ariaLabel}
                    />
                  ) : null}
                </li>
              </ul>
            ) : null}
            <ul className="lab-bento__col">
              {supporting.map((item, i) => (
                <Tile item={item} delay={80 + i * 80} key={item.tag} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head + irregular grid ── */}
      <div
        className="lab-bento__v lab-bento__v--expanded"
        data-version="3"
        hidden
      >
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title title={title} accent="map" />
            <p className="sub">{sub}</p>
          </div>
          <ul className="lab-bento__grid">
            {items.map((item, i) => (
              <li
                key={item.tag}
                className={
                  item.feature
                    ? "lab-bento__tile lab-bento__tile--feature"
                    : "lab-bento__tile"
                }
                data-reveal={item.feature ? "scale" : "up"}
                style={
                  item.feature
                    ? undefined
                    : ({ "--reveal-delay": `${80 + (i - 1) * 70}ms` } as CSSProperties)
                }
              >
                <span className="mini-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.feature && item.media ? (
                  <MediaPlaceholder
                    className="lab-bento__media"
                    ratio="16/9"
                    label={item.media.label}
                    hint={item.media.hint}
                    ariaLabel={item.media.ariaLabel}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
