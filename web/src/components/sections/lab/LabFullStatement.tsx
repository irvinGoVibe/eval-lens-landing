import { LabEyebrow } from "./_kit";

/**
 * Full-bleed statement (archetype 02, heading + sub variant).
 *
 * A full-height "breath" between dense sections, carrying BOTH a display heading
 * (one lens accent) AND a subordinate sub-heading. Three layout versions of the
 * SAME content (switch via the DevInspector v1/v2/v3); surface-invariant
 * (`.band.soft` / `.band.ink`). Motion via `data-reveal` (needs page `<ScrollFX/>`).
 *
 * Weight hierarchy (ui-ux-pro-max §6): eyebrow = mono label; heading = display
 * 600; sub = 400 muted — clearly subordinate by size + colour, never competing.
 *
 *   • v1 — centered breath (heading + sub stacked, centered).
 *   • v2 — left editorial (stacked, left-aligned).
 *   • v3 — split (heading left, sub in a side column).
 */
export type LabFullStatementProps = {
  id?: string;
  /** Which saved layout version renders (1 centered · 2 left · 3 split). Default 1. */
  version?: 1 | 2 | 3;
  ariaLabel?: string;
  eyebrow: string;
  titleLead: string;
  /** One lens-accented word in the heading. */
  titleAccent?: string;
  titleTrail?: string;
  sub: string;
  marker?: string;
};


export function LabFullStatement({
  id,
  version = 1,
  ariaLabel,
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  marker,
}: LabFullStatementProps) {
  const surf = "ink"; // surface baked: every live call-site is ink (tech-optimization)
  const heading = (
    <h2 className="lab-fullstmt__h">
      {titleLead}
      {titleAccent ? (
        <>
          {" "}
          <span className="grad-word">{titleAccent}</span>
        </>
      ) : null}
      {titleTrail ? ` ${titleTrail}` : null}
    </h2>
  );

  return (
    <section
      id={id}
      className={`band ${surf} lab-fullstmt`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      {/* NB: only the selected version renders (baked in the tech-optimization
          pass — the hidden copies used to ship as dead DOM). */}
      <div
        className={`wrap lab-fullstmt__v lab-fullstmt__v--${version}`}
        data-version={version}
        data-reveal="up"
      >
        <div className="lab-fullstmt__lead">
          <LabEyebrow>{eyebrow}</LabEyebrow>
          {heading}
        </div>
        <p className="lab-fullstmt__sub">{sub}</p>
      </div>
    </section>
  );
}
