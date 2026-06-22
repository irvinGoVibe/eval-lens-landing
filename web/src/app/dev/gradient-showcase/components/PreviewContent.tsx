import type { Theme } from "../registries";

/**
 * The test content rendered over every background: a heading, a short
 * paragraph, and one glass card to check legibility against the field.
 */
export function PreviewContent({
  heading,
  body,
  theme,
}: {
  heading: string;
  body: string;
  theme: Theme;
}) {
  return (
    <div className={`gsc-content gsc-content-${theme}`}>
      <h3 className="gsc-test-heading">{heading}</h3>
      <p className="gsc-test-body">{body}</p>

      <div className="gsc-glass">
        <span className="gsc-glass-eyebrow">Legibility check</span>
        <p className="gsc-glass-text">
          A glass card sits over the background — confirm body text, borders and
          the metric below all stay readable at real scale.
        </p>
        <div className="gsc-glass-row">
          <span className="gsc-dot" aria-hidden />
          <span className="gsc-glass-metric">Sample metric</span>
          <span className="gsc-glass-value">98.6</span>
        </div>
      </div>
    </div>
  );
}
