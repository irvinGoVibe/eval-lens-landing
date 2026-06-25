import type { CSSProperties } from "react";
import { LabEyebrow } from "./_kit";

/**
 * Section type 06 — Horizontal gallery.
 *
 * A native scroll-snap lane that keeps a set of *equal* ideas (roles, report
 * parts, segments, archetypes) from stacking into a tall wall of cards. Use it
 * where every item carries the same weight and the page should read sideways,
 * not downward.
 *
 * Three saved versions (switch in the LabMarkers inspector), all
 * surface-adaptive (`.band.soft` / `.band.ink`) and carrying the SAME content.
 * Within a version, light and ink share identical geometry — only colour
 * tokens flip (surface-invariant):
 *   • **v1 — Polish**: the original composition, token-clean. A head + the
 *     scroll-snap lane of equal cards. No media. Reveal-on-enter, staggered.
 *   • **v3 — Expanded Expressive**: a tall band over an ambient full-bleed
 *     backdrop (real demo media, surface-swapped) behind a generated-CSS scrim;
 *     larger type, generous air, cards reveal as the lane is traversed, and the
 *     backdrop parallaxes via `data-scrub` → `--scrub`. Ink V3 cards become
 *     liquid glass over the real scene. Photo is hidden on mobile (CSS gradient
 *     fallback).
 *
 * The lane itself is the invariant: `<ol>` scroll-snap container, keyboard
 * reachable with a visible focus ring, `<li>` cards = signal dot + tag +
 * heading + body. Content/slots are the invariant; only layout differs.
 *
 * The v3 backdrop is the paired light/dark `gallery-v3` asset, set as a CSS
 * `background-image` so the surface toggle swaps it by recolour without
 * touching geometry. The scrim under copy is surface-adaptive (deep light wash
 * on `.soft`, base + radial darken on `.ink`).
 *
 * See [section-types#6-horizontal-gallery](../../../../../wiki/architecture/section-types.md).
 */
export type LabGalleryItem = {
  tag: string;
  title: string;
  body: string;
  /** When set, the `tag` label renders as a link (only the tag word, not the card). */
  href?: string;
};

export type LabGalleryProps = {
  id?: string;
  /** `.band` surface — `light` (`.soft`) is the default for this archetype. */
  surface?: "light" | "ink";
  /** Optional accessible name for the section. */
  ariaLabel?: string;
  eyebrow: string;
  /** Section heading. The first word is lens-accented in v3. */
  title: string;
  sub: string;
  /** Accessible name for the scroll-snap `<ol>` lane. */
  laneLabel: string;
  /** The equal cards — one signal dot + tag + heading + body each. */
  items: LabGalleryItem[];
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

/**
 * Heading. v1 renders the title plain (no grad-word per brief); v3 wraps the
 * first word in `.grad-word` for the lens accent. `title` stays a single
 * string prop — the accent is purely a layout-markup concern.
 */
function Title({ title, accent }: { title: string; accent: boolean }) {
  if (!accent) {
    return <h2 className="title">{title}</h2>;
  }
  const [first, ...rest] = title.split(" ");
  return (
    <h2 className="title">
      <span className="grad-word">{first}</span>
      {rest.length ? ` ${rest.join(" ")}` : null}
    </h2>
  );
}

/** A single equal card — signal dot, tag, heading, body. Geometry is shared
 *  across every version; only the wrapping class scopes the per-version look. */
function Card({ item, index }: { item: LabGalleryItem; index: number }) {
  return (
    <li
      className="lab-gallery__card"
      style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
    >
      <span className="lab-signal" aria-hidden="true" />
      {item.href ? (
        <a className="mini-tag mini-tag--link" href={item.href}>{item.tag}</a>
      ) : (
        <span className="mini-tag">{item.tag}</span>
      )}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </li>
  );
}

export function LabGallery({
  id = "gallery",
  surface = "light",
  ariaLabel,
  eyebrow,
  title,
  sub,
  laneLabel,
  items,
  marker,
}: LabGalleryProps) {
  const surf = surface === "ink" ? "ink" : "soft";

  return (
    <section
      id={id}
      className={`band ${surf} lab-gallery`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — Polish: the original composition, token-clean ── */}
      <div className="lab-gallery__v lab-gallery__v--polish" data-version="1">
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title title={title} accent={false} />
            <p className="sub">{sub}</p>
          </div>
        </div>
        <ol
          className="lab-gallery__lane"
          data-reveal="up"
          tabIndex={0}
          aria-label={laneLabel}
        >
          {items.map((item, i) => (
            <Card item={item} index={i} key={item.tag} />
          ))}
        </ol>
      </div>

      {/* ── v4 — Grid rows: the SAME glass cards as v1 (`--polish` is kept so the
          frosted-glass card material is inherited verbatim), but laid out in a
          contained grid instead of the full-bleed scroll lane. No horizontal
          scroll — cards wrap into as many rows as the item count needs (2, 3, …).
          Only the container layout differs (`--grid`); content is the invariant. ── */}
      <div
        className="lab-gallery__v lab-gallery__v--polish lab-gallery__v--grid"
        data-version="4"
        hidden
      >
        <div className="wrap">
          <div className="head" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title title={title} accent={false} />
            <p className="sub">{sub}</p>
          </div>
          <ul className="lab-gallery__grid" data-reveal="up" aria-label={laneLabel}>
            {items.map((item, i) => (
              <Card item={item} index={i} key={item.tag} />
            ))}
          </ul>
        </div>
      </div>

      {/* ── v3 — Expanded Expressive: ambient backdrop + parallax + glass ── */}
      <div
        className="lab-gallery__v lab-gallery__v--expr"
        data-version="3"
        data-scrub
        hidden
      >
        {/* full-bleed photo backdrop (parallax) under a generated-CSS scrim */}
        <div className="lab-gallery__backdrop" aria-hidden="true" />
        <div className="lab-gallery__scrim" aria-hidden="true" />
        <div className="lab-gallery__exprinner">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <LabEyebrow>{eyebrow}</LabEyebrow>
              <Title title={title} accent />
              <p className="sub">{sub}</p>
            </div>
          </div>
          <ol
            className="lab-gallery__lane lab-gallery__lane--expr"
            data-reveal="up"
            tabIndex={0}
            aria-label={laneLabel}
          >
            {items.map((item) => (
              <li className="lab-gallery__card" key={item.tag}>
                <span className="lab-signal" aria-hidden="true" />
                {item.href ? (
        <a className="mini-tag mini-tag--link" href={item.href}>{item.tag}</a>
      ) : (
        <span className="mini-tag">{item.tag}</span>
      )}
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
