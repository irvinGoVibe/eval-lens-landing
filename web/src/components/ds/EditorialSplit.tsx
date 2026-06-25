import type { CSSProperties } from "react";
import { Eyebrow, Media } from "@/components/ds";

/**
 * EditorialSplit — clean DS extraction of archetype 04 (editorial split).
 *
 * A faithful 1:1 token port of the deprecated `LabEditorialSplit`: same markup
 * semantics, same three saved versions, on the clean `.ds-*` namespace (no
 * `.lab-*`, no `.section-lab` dependency). Styles live in `ds.css`.
 *
 * The most common inner-page unit: compact copy beside one visual slot. Content
 * (eyebrow, title, sub, one media slot) is the invariant — only layout differs
 * across versions, each surface-adaptive (`soft` light is this archetype's
 * default; `ink` flips colour only, geometry stays put):
 *   • v1 — split (base): two columns, copy left + a ratio-locked media slot right.
 *   • v2 — mirror: a clean left/right swap of v1 — media on the left, copy on
 *     the right; same plain layout, no frame, caption or rule.
 *   • v3 — cinematic (bold): the scene fills the band; copy + a mono tag sit
 *     over a scrim.
 *
 * Adds an OPTIONAL backward-compatible `points` list (token-driven dot +
 * heading + body rows) rendered after the sub in every version's copy column.
 * With no `points`, the rendered structure is identical to `LabEditorialSplit`.
 *
 * Motion is `data-reveal` only, consumed by the page's single `<ScrollFX/>`.
 */
export type EditorialSplitProps = {
  id?: string;
  /** `.band` surface — `light` (default → `soft`) or `ink`. */
  surface?: "light" | "ink";
  /** Optional accessible name for the section. */
  ariaLabel?: string;
  eyebrow: string;
  /** Plain text before the optional lens-accented phrase. */
  titleLead: string;
  /** The lens-gradient (`.grad-word`) phrase inside the title. */
  titleAccent?: string;
  /** Optional plain text after the accent. */
  titleTrail?: string;
  sub: string;
  media: { ratio: string; label: string; hint: string; ariaLabel: string };
  /** Optional grounded-detail rows (dot + heading + body) under the sub. */
  points?: { title: string; body: string }[];
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

function Title({
  titleLead,
  titleAccent,
  titleTrail,
}: Pick<EditorialSplitProps, "titleLead" | "titleAccent" | "titleTrail">) {
  return (
    <h2 className="title ds-split__title">
      {titleLead}
      {titleAccent ? (
        <>
          {" "}
          <span className="grad-word">{titleAccent}</span>
        </>
      ) : null}
      {titleTrail ? titleTrail : null}
    </h2>
  );
}

function Points({ points }: { points?: EditorialSplitProps["points"] }) {
  if (!points?.length) return null;
  return (
    <ul className="ds-split__points">
      {points.map((pt, i) => (
        <li key={i} className="ds-split__point">
          <span className="ds-split__point-dot" aria-hidden="true" />
          <h3 className="ds-split__point-h">{pt.title}</h3>
          <p className="ds-split__point-p">{pt.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function EditorialSplit({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  media,
  points,
  marker,
}: EditorialSplitProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const titleParts = { titleLead, titleAccent, titleTrail };

  return (
    <section
      id={id}
      className={`band ${surf} ds-split`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — split (base): two columns, copy + media placeholder ── */}
      <div className="wrap ds-split__grid" data-version="1">
        <div className="ds-split__copy" data-reveal="left">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title {...titleParts} />
          <p className="sub">{sub}</p>
          <Points points={points} />
        </div>
        <Media
          className="ds-split__media"
          ratio={media.ratio}
          label={media.label}
          hint={media.hint}
          ariaLabel={media.ariaLabel}
          reveal="right"
        />
      </div>

      {/* ── v2 — mirror: clean swap of v1 — media left, copy right ── */}
      <div className="wrap ds-split__grid ds-split__grid--mirror" data-version="2" hidden>
        <Media
          className="ds-split__media"
          ratio={media.ratio}
          label={media.label}
          hint={media.hint}
          ariaLabel={media.ariaLabel}
          reveal="left"
        />
        <div className="ds-split__copy" data-reveal="right">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title {...titleParts} />
          <p className="sub">{sub}</p>
          <Points points={points} />
        </div>
      </div>

      {/* ── v3 — cinematic (bold): scene fills the band, copy over a scrim ── */}
      <div className="ds-split__cine" data-version="3" hidden>
        <div
          className="ds-split__cine-scene"
          role="img"
          aria-label={media.ariaLabel}
        />
        <div className="ds-split__cine-scrim" aria-hidden="true" />
        <div className="wrap ds-split__cine-inner">
          <div className="ds-split__cine-copy" data-reveal="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title {...titleParts} />
            <p
              className="sub"
              style={{ "--reveal-delay": "80ms" } as CSSProperties}
            >
              {sub}
            </p>
          </div>
          {points?.length ? (
            <div
              className="ds-split__cine-aside"
              data-reveal="up"
              style={{ "--reveal-delay": "160ms" } as CSSProperties}
            >
              <Points points={points} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
