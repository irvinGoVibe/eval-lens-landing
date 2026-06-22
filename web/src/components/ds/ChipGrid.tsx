import type { CSSProperties } from "react";

/**
 * ChipGrid — a grid of labeled status chips (a coloured tone dot + a name) with
 * an optional legend. Clean DS component (styles `.ds-chipgrid*` / `.ds-chip*`
 * in `ds.css` under scope `.ds`; NO `.lab-*` / `.section-lab` dependency).
 *
 * Surface-adaptive (`soft` light / `ink`); motion via `data-reveal` consumed by
 * the page's single `<ScrollFX/>`. Pass `tight` to drop the band's top padding so
 * the grid reads as a continuation of the section above it (e.g. a Bento).
 *
 * Used for the "deck completeness" ten-section signal on
 * `/product/evidence-based-reports`, but content-agnostic and reusable.
 */
export type ChipTone = "info" | "warning" | "critical";
export type ChipGridItem = { name: string; sev: ChipTone };
export type ChipGridProps = {
  id?: string;
  /** `.band` surface — `light` (→ `soft`) or `ink`. Default light. */
  surface?: "light" | "ink";
  ariaLabel: string;
  items: ChipGridItem[];
  /** Optional tone legend rendered under the grid. */
  legend?: { sev: ChipTone; label: string }[];
  /** Desktop column count. Default 5. */
  columns?: number;
  /** Drop the band's top padding so it sits tight under the preceding section. */
  tight?: boolean;
  /** Render WITHOUT the `<section>`/`.band`/`.wrap` wrapper, so it can nest inside
   *  another section (e.g. the Bento `slot`). In bare mode the chips gently float. */
  bare?: boolean;
  marker?: string;
};

export function ChipGrid({
  id,
  surface = "light",
  ariaLabel,
  items,
  legend,
  columns = 5,
  tight = false,
  bare = false,
  marker,
}: ChipGridProps) {
  const surf = surface === "ink" ? "ink" : "soft";
  const inner = (
    <>
      <ul
        className="ds-chipgrid__grid"
        data-reveal={bare ? undefined : "up"}
        style={{ "--cols": columns } as CSSProperties}
      >
        {items.map((it, i) => (
          <li
            key={it.name}
            className={`ds-chip ds-chip--${it.sev}`}
            // desynced float phase per chip (negative delay = mid-cycle start)
            style={{ "--float-delay": `-${((i % 6) * 0.55).toFixed(2)}s` } as CSSProperties}
          >
            <span className="ds-chip__dot" aria-hidden="true" />
            <span className="ds-chip__name">{it.name}</span>
          </li>
        ))}
      </ul>
      {legend?.length ? (
        <ul className="ds-chipgrid__legend" aria-label="Legend">
          {legend.map((l) => (
            <li key={l.sev} className={`ds-chipgrid__legenditem ds-chip--${l.sev}`}>
              <span className="ds-chip__dot" aria-hidden="true" /> {l.label}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  if (bare) {
    return (
      <div
        className={`ds-chipgrid ds-chipgrid--bare${surface === "ink" ? " ink" : ""}`}
        aria-label={ariaLabel}
      >
        {inner}
      </div>
    );
  }
  return (
    <section
      id={id}
      className={`band ${surf} ds-chipgrid${tight ? " ds-chipgrid--tight" : ""}`}
      data-marker={marker}
      aria-label={ariaLabel}
    >
      <div className="wrap">{inner}</div>
    </section>
  );
}
