import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { LabEyebrow, MediaPlaceholder } from "./_kit";
import { BentoGlassSpot } from "./BentoGlassSpot";

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
export type LabBentoMedia = {
  label: string;
  hint: string;
  ariaLabel: string;
  /** Real asset path. When set, a `next/image` renders instead of the placeholder. */
  src?: string;
  /** Intrinsic asset size in px (for ratio / no CLS). Default 1536×1024. */
  width?: number;
  height?: number;
  /** CSS `aspect-ratio` for the PLACEHOLDER frame. Default `16/9`. */
  ratio?: string;
};
/**
 * A decorative background image ATTACHED to a tile. Rendered only when present
 * — there is no placeholder fallback (unlike the feature-tile `media`). It is
 * positioned absolutely in a tile CORNER (default bottom-left) and painted
 * BEHIND the text (low z-index), so the tag/heading/body always read on top of
 * it — a watermark, not an in-flow glyph. Per-card `corner` lets it sit in a
 * different spot on different tiles.
 */
export type LabBentoIcon = {
  /** Asset path (e.g. a `/public` path or imported static asset). */
  src: string;
  /** Accessible label; empty (the default) marks the image decorative. */
  alt?: string;
  /** Which corner to anchor to. Default: `"bl"` (bottom-left). */
  corner?: "bl" | "br" | "tl" | "tr";
  /** Intrinsic asset size in px (for correct aspect ratio / no CLS). Default 145×256. */
  width?: number;
  height?: number;
};
export type LabBentoItem = {
  tag: string;
  title: string;
  /** Tile copy. Usually a plain string (rendered in a `white-space:pre-line`
   *  <p>, so `\n` controls line breaks); accepts ReactNode when a tile needs
   *  inline emphasis (e.g. <strong> sub-labels) inside that same paragraph. */
  body: ReactNode;
  feature?: boolean;
  media?: LabBentoMedia;
  /** Optional icon/image attached to THIS tile. Rendered only when set; no placeholder. */
  icon?: LabBentoIcon;
  /** Optional content rendered INSIDE this tile, below the body (e.g. a bare
   *  ChipGrid in the feature card). Default: nothing. */
  slot?: ReactNode;
};
export type LabBentoProps = {
  id?: string;
  /** `.band` surface — `ink` (`.ink`) is the default for this archetype. */
  surface?: "light" | "ink";
  /** Which saved version renders (1 Polish · 2 Recomp · 3 Expanded). Default 1. */
  version?: 1 | 2 | 3;
  /** Optional accessible name for the section. */
  ariaLabel?: string;
  eyebrow: string;
  title: string;
  /** Word in `title` to lens-accent. Overrides the per-version default
   *  (v1 none · v2 "ingredients" · v3 "map"). */
  titleAccent?: string;
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
  const accentIdx = words.findIndex((w) => w.toLowerCase() === target);
  return (
    <h2 className="title">
      {words.map((word, i) => {
        const space = i > 0 ? " " : "";
        if (i === accentIdx) {
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
 * The attached tile watermark — rendered ONLY when the item carries `icon` (no
 * placeholder). Positioned absolutely in a corner (default bottom-left) and
 * painted behind the text via CSS, so it reads as a background image and never
 * covers the tag/heading/body. `next/image` runs `unoptimized` so any local
 * format (incl. SVG) renders without optimizer config; the explicit
 * width/height keep its aspect ratio CLS-free. Display size is set in CSS.
 */
function TileIcon({ icon, feature }: { icon: LabBentoIcon; feature?: boolean }) {
  const corner = icon.corner ?? "bl";
  return (
    <span
      className={`lab-bento__icon lab-bento__icon--${corner}${
        feature ? " lab-bento__icon--feature" : ""
      }`}
      aria-hidden="true"
    >
      <Image
        src={icon.src}
        alt={icon.alt ?? ""}
        width={icon.width ?? 145}
        height={icon.height ?? 256}
        unoptimized
      />
    </span>
  );
}

/**
 * Feature-tile media: a real `next/image` (ratio-locked, object-fit cover) when
 * `media.src` is set, else the visible ratio placeholder. Both share the
 * `lab-bento__media` slot (pushed to the tile bottom).
 */
function FeatureMedia({ media }: { media: LabBentoMedia }) {
  if (media.src) {
    return (
      <Image
        className="lab-bento__media lab-bento__media--img"
        src={media.src}
        alt={media.ariaLabel}
        width={media.width ?? 1536}
        height={media.height ?? 1024}
        sizes="(max-width:880px) 90vw, 640px"
      />
    );
  }
  return (
    <MediaPlaceholder
      className="lab-bento__media"
      ratio={media.ratio ?? "16/9"}
      label={media.label}
      hint={media.hint}
      ariaLabel={media.ariaLabel}
    />
  );
}

/**
 * A single bento tile — optional attached icon, mini-tag, heading, body, and
 * (for the feature tile) a ratio-locked media placeholder. Geometry is shared
 * across every version; the per-version grid class scopes placement and the
 * `--feature` modifier the look.
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
      {item.icon ? <TileIcon icon={item.icon} feature={item.feature} /> : null}
      <span className="mini-tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {item.media ? <FeatureMedia media={item.media} /> : null}
      {item.slot ? <div className="lab-bento__tileslot">{item.slot}</div> : null}
    </li>
  );
}

export function LabBento({
  id = "bento",
  surface = "ink",
  version = 1,
  ariaLabel,
  eyebrow,
  title,
  titleAccent,
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
      <div className="lab-bento__v lab-bento__v--polish" data-version="1" hidden={version !== 1}>
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title title={title} accent={titleAccent} />
            <p className="sub">{sub}</p>
          </div>
          <ul
            className="lab-bento__grid"
            data-reveal="up"
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            {items.map((item, i) => (
              <Tile item={item} key={`${item.tag}-${i}`} />
            ))}
          </ul>        </div>
      </div>

      {/* ── v2 — Modern Recomposition: 1.2fr/1fr split, in-tile head ── */}
      <div
        className="lab-bento__v lab-bento__v--recomp"
        data-version="2"
        hidden={version !== 2}
      >
        <div className="wrap">
          <div className="lab-bento__grid">
            {feature ? (
              <ul className="lab-bento__feature-col">
                <li
                  className="lab-bento__tile lab-bento__tile--feature"
                  data-reveal="up"
                >
                  {feature.icon ? (
                    <TileIcon icon={feature.icon} feature />
                  ) : null}
                  <div className="head">
                    <LabEyebrow>{eyebrow}</LabEyebrow>
                    <Title title={title} accent={titleAccent ?? "ingredients"} />
                    <p className="sub">{sub}</p>
                  </div>
                  {feature.media ? <FeatureMedia media={feature.media} /> : null}
                  {feature.slot ? (
                    <div className="lab-bento__tileslot">{feature.slot}</div>
                  ) : null}
                </li>
              </ul>
            ) : null}
            <ul className="lab-bento__col">
              {supporting.map((item, i) => (
                <Tile item={item} delay={80 + i * 80} key={`${item.tag}-${i}`} />
              ))}
            </ul>
          </div>        </div>
      </div>

      {/* ── v3 — Expanded Expressive: large display head + irregular grid ── */}
      <div
        className="lab-bento__v lab-bento__v--expanded"
        data-version="3"
        hidden={version !== 3}
      >
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title title={title} accent={titleAccent ?? "map"} />
            <p className="sub">{sub}</p>
          </div>
          <ul className="lab-bento__grid">
            {items.map((item, i) => (
              <li
                key={`${item.tag}-${i}`}
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
                {item.icon ? (
                  <TileIcon icon={item.icon} feature={item.feature} />
                ) : null}
                <span className="mini-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.media ? <FeatureMedia media={item.media} /> : null}
                {item.slot ? (
                  <div className="lab-bento__tileslot">{item.slot}</div>
                ) : null}
              </li>
            ))}
          </ul>        </div>
      </div>

      {/* ink (glass) bento → the under-glass travelling spot; inert elsewhere */}
      {surface === "ink" ? <BentoGlassSpot /> : null}
    </section>
  );
}
