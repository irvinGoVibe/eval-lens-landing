import type { CSSProperties, ReactNode } from "react";

/**
 * Section Lab content mode — the third PER-SECTION control, alongside the
 * Light/Dark surface and v1/v2/v3 version toggles in each block's `LabMarkers`
 * inspector panel. Switching it flips `data-content` on that one section.
 * Blocks that support both modes render BOTH payloads wrapped in
 * `[data-content-variant="placeholder"|"real"]`; CSS shows the one matching the
 * section's `data-content` (see globals.css → "per-block Content axis").
 * `LabMarkers` owns the control and persists each block's choice in localStorage
 * under `lab:content:<marker>`.
 */
export type LabContentMode = "placeholder" | "real";

/** A payload that exists in both content modes — `set[mode]` picks one. */
export type LabContentSet<T> = { placeholder: T; real: T };

/**
 * Shared primitives for the Section Lab catalog
 * ([web/src/app/dev/section-lab](../../../app/dev/section-lab/page.tsx)).
 *
 * Each catalog section type lives in its own prop-driven Server Component in
 * this folder so it can be tuned in isolation and later dropped onto a real
 * page. These two primitives — the mono eyebrow and the visible media
 * placeholder — repeat across almost every section type, so they are factored
 * out here instead of being copy-pasted 20 times.
 *
 * Styling still lives in `globals.css` under `.section-lab .lab-*`; the markup
 * here is intentionally identical to the original inline version so the stand
 * renders pixel-for-pixel the same.
 */

/** Mono eyebrow with the leading lens dot — `01 · Statement hero`, etc. */
export function LabEyebrow({
  children,
  reveal,
  delay,
}: {
  children: ReactNode;
  /** Attach `data-reveal` when the eyebrow animates on its own. */
  reveal?: "up" | "left" | "right" | "scale";
  /** `--reveal-delay` in ms (only meaningful with `reveal`). */
  delay?: number;
}) {
  return (
    <span
      className="eyebrow"
      data-reveal={reveal}
      style={
        delay != null ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
    >
      <span className="dot" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Visible, ratio-locked placeholder standing in for a not-yet-generated asset. */
export function MediaPlaceholder({
  ratio,
  label,
  hint,
  ariaLabel,
  className,
  reveal,
}: {
  /** CSS `aspect-ratio` value, e.g. `"16/9"`. */
  ratio: string;
  /** Mono pill label, e.g. `Image · hero lens · 16:9`. */
  label: string;
  /** Generation brief shown under the label. */
  hint: string;
  ariaLabel: string;
  /** Extra section-specific class (e.g. `lab-hero__media`). */
  className?: string;
  reveal?: "up" | "left" | "right" | "scale";
}) {
  return (
    <figure
      className={className ? `media-ph ${className}` : "media-ph"}
      style={{ "--ratio": ratio } as CSSProperties}
      data-reveal={reveal}
      role="img"
      aria-label={ariaLabel}
    >
      <span className="media-ph__label">{label}</span>
      <span className="media-ph__hint">{hint}</span>
    </figure>
  );
}
