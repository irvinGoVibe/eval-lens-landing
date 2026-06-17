import { LabEyebrow, type LabContentSet } from "./_kit";

/**
 * Section type 02 — Full-bleed statement.
 *
 * One thesis on a full bleed — a "breath" between dense sections. Centered
 * eyebrow + one large display sentence, no grid, no cards.
 *
 * This catalog block is also the reference for the **content axis**: each design
 * version carries BOTH a `placeholder` (neutral lab copy) and a `real` (EvalLense)
 * payload, wrapped in `[data-content-variant]`; CSS shows the one matching the
 * section's `data-content`, which the `LabMarkers` inspector flips per block.
 *
 * Versions are passed as an array — one entry per saved version, each its own
 * content set. (Unlike most archetypes, the saved versions here intentionally
 * carry *different statements* to demonstrate the axis, so the per-version copy
 * is the preserved contract rather than a single invariant sentence.) Within a
 * version, light (`.band.soft`) and ink (`.band.ink`) share identical geometry —
 * only the text colour flips (surface-invariant). Motion is wired purely through
 * `data-reveal` consumed by the page's single `<ScrollFX/>`.
 *
 * See [section-types#2-full-bleed-statement](../../../../../wiki/architecture/section-types.md).
 */
export type LabStatementBlock = { eyebrow: string; text: string };
export type LabStatementProps = {
  id?: string;
  /** `.band` surface — `ink` (dark) is the default for this archetype. */
  surface?: "light" | "ink";
  ariaLabel?: string;
  /** One entry per design version; each carries both content modes. */
  versions: LabContentSet<LabStatementBlock>[];
  marker?: string;
};

export function LabStatement({
  id,
  surface = "ink",
  ariaLabel,
  versions,
  marker,
}: LabStatementProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  return (
    <section
      id={id}
      className={`band ${surf} lab-statement`}
      data-marker={marker}
      data-content="placeholder"
      aria-label={ariaLabel}
    >
      {versions.map((version, index) => (
        <div
          key={index}
          className="wrap lab-statement__inner"
          data-version={index + 1}
          data-reveal="up"
          hidden={index > 0}
        >
          {(["placeholder", "real"] as const).map((mode) => (
            <div key={mode} data-content-variant={mode}>
              <LabEyebrow>{version[mode].eyebrow}</LabEyebrow>
              <p className="lab-statement__text">{version[mode].text}</p>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
