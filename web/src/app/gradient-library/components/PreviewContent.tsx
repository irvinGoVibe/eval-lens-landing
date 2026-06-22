"use client";

/**
 * Demo content layered over every preview so contrast, glass behaviour and
 * hierarchy can be judged against the real background. Short neutral copy,
 * no lorem. `glass` toggles the glass card; `pattern` is informational only
 * (the pattern lives in the background layer).
 */
export function PreviewContent({
  glass = true,
  compact = false,
}: {
  glass?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`gl-demo${compact ? " gl-demo--compact" : ""}`}>
      <div className="gl-demo__copy">
        <span className="gl-demo__eyebrow">Background preview</span>
        <h3 className="gl-demo__title">Lens your next unicorn</h3>
        <p className="gl-demo__body">
          Readable type and live surfaces, sitting on the real background so you
          can judge contrast before you ship it.
        </p>
        <div className="gl-demo__actions">
          <button type="button" className="gl-btn gl-btn--primary">
            Start a review
          </button>
          <button type="button" className="gl-btn gl-btn--ghost">
            See a report
          </button>
        </div>
      </div>

      <div className="gl-demo__cards">
        {glass && (
          <div className="gl-card gl-card--glass">
            <span className="gl-card__label">Glass surface</span>
            <p className="gl-card__text">
              Frosted panel — checks blur, edge light and legibility over the
              field.
            </p>
          </div>
        )}
        <div className="gl-card gl-card--metric">
          <span className="gl-card__metric">94.2</span>
          <span className="gl-card__label">Consistency score</span>
        </div>
      </div>
    </div>
  );
}
