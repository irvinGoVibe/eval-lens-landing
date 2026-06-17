import type { CSSProperties } from "react";
import { LabEyebrow, MediaPlaceholder } from "./_kit";

/**
 * Section type 04 — Editorial split.
 *
 * The most common inner-page unit: compact copy beside one visual slot.
 * Forged by `component-forge` from the inline `dev/section-lab` block; content
 * (eyebrow, title, sub, one media slot) is the invariant — only layout differs
 * across versions. Each version is surface-adaptive (`.band.soft` / `.band.ink`)
 * and carries the SAME content:
 *   • **v1 — split (base)**: two columns, copy + a ratio-locked media placeholder.
 *   • **v2 — framed (premium)**: reversed editorial frame — the visual sits in a
 *     captioned panel, copy gets a hairline rule and a lens-accented title.
 *   • **v3 — cinematic (bold)**: the scene fills the band; copy + a mono tag sit
 *     over a scrim. Recolors for ink/light; geometry is identical between themes.
 *
 * Light ≡ ink within a version (only color changes) — see
 * `component-forge/kb/surface-invariant.md`. Motion is `data-reveal` only, served
 * by the single page-level `<ScrollFX/>`.
 * See [section-types#4-editorial-split](../../../../../wiki/architecture/section-types.md).
 */
export type LabEditorialSplitProps = {
  id?: string;
  /** `.band` surface — `soft` (light) is the default for this archetype. */
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
  /** Dev-stand corner tag (Section Lab `[data-marker]`); inert elsewhere. */
  marker?: string;
};

function Title({
  titleLead,
  titleAccent,
  titleTrail,
}: Pick<LabEditorialSplitProps, "titleLead" | "titleAccent" | "titleTrail">) {
  return (
    <h2 className="title lab-split__title">
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

export function LabEditorialSplit({
  id,
  surface = "light",
  ariaLabel,
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  media,
  marker,
}: LabEditorialSplitProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const titleParts = { titleLead, titleAccent, titleTrail };

  return (
    <section
      id={id}
      className={`band ${surf} lab-split`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* ── v1 — split (base): two columns, copy + media placeholder ── */}
      <div className="wrap lab-split__grid" data-version="1">
        <div className="lab-split__copy" data-reveal="left">
          <LabEyebrow>{eyebrow}</LabEyebrow>
          <Title {...titleParts} />
          <p className="sub">{sub}</p>
        </div>
        <MediaPlaceholder
          className="lab-split__media"
          ratio={media.ratio}
          label={media.label}
          hint={media.hint}
          ariaLabel={media.ariaLabel}
          reveal="right"
        />
      </div>

      {/* ── v2 — framed (premium): reversed, captioned panel + hairline rule ── */}
      <div className="wrap lab-split__framed" data-version="2" hidden>
        <figure className="lab-split__frame" data-reveal="left">
          <MediaPlaceholder
            className="lab-split__frame-media"
            ratio={media.ratio}
            label={media.label}
            hint={media.hint}
            ariaLabel={media.ariaLabel}
          />
          <figcaption className="lab-split__frame-cap">{media.label}</figcaption>
        </figure>
        <div className="lab-split__copy lab-split__copy--ruled" data-reveal="right">
          <LabEyebrow>{eyebrow}</LabEyebrow>
          <Title {...titleParts} />
          <p className="sub">{sub}</p>
        </div>
      </div>

      {/* ── v3 — cinematic (bold): scene fills the band, copy over a scrim ── */}
      <div className="lab-split__cine" data-version="3" hidden>
        <div
          className="lab-split__cine-scene"
          role="img"
          aria-label={media.ariaLabel}
        />
        <span className="lab-split__cine-tag">{media.label}</span>
        <div className="lab-split__cine-scrim" aria-hidden="true" />
        <div className="wrap lab-split__cine-inner">
          <div className="lab-split__cine-copy" data-reveal="up">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            <Title {...titleParts} />
            <p
              className="sub"
              style={{ "--reveal-delay": "80ms" } as CSSProperties}
            >
              {sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
