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
  /** `.band` surface — `ink` (dark) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  eyebrow: string;
  titleLead: string;
  /** One lens-accented word in the heading. */
  titleAccent?: string;
  titleTrail?: string;
  sub: string;
  marker?: string;
};

const VERSIONS = [1, 2, 3] as const;

export function LabFullStatement({
  id,
  surface = "ink",
  ariaLabel,
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  marker,
}: LabFullStatementProps) {
  const surf = surface === "ink" ? "ink" : "soft";
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
      {VERSIONS.map((v) => (
        <div
          key={v}
          className={`wrap lab-fullstmt__v lab-fullstmt__v--${v}`}
          data-version={v}
          data-reveal="up"
          hidden={v !== 1}
        >
          <div className="lab-fullstmt__lead">
            <LabEyebrow>{eyebrow}</LabEyebrow>
            {heading}
          </div>
          <p className="lab-fullstmt__sub">{sub}</p>
        </div>
      ))}
    </section>
  );
}
