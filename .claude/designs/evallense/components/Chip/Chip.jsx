const React = window.React;

/**
 * Pill chip — a tag/selector used for material types, audience segments, filters
 * (e.g. "Pitch deck (PDF)", "VC Funds"). Optional checked state with a lens dot.
 * Renders on light or dark surfaces.
 */
export function Chip(props) {
  const { children, checked = false, onDark = false, style, ...rest } = props;

  const surface = onDark
    ? {
        background: checked ? "rgba(108,76,241,.18)" : "rgba(255,255,255,.05)",
        color: "var(--fg-on-dark)",
        border: `1px solid ${checked ? "rgba(169,155,255,.5)" : "var(--border-on-dark)"}`,
      }
    : {
        background: checked ? "rgba(108,76,241,.08)" : "var(--bg)",
        color: "var(--fg)",
        border: `1px solid ${checked ? "var(--violet)" : "var(--border)"}`,
      };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--font-text)",
        fontSize: 13,
        lineHeight: 1,
        padding: "8px 13px",
        borderRadius: "var(--r-pill)",
        whiteSpace: "nowrap",
        ...surface,
        ...style,
      }}
      {...rest}
    >
      {checked && (
        <span
          aria-hidden="true"
          style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--lens)" }}
        />
      )}
      {children}
    </span>
  );
}
