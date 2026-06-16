const React = window.React;

/**
 * Bento tile — a content card for the homepage bento and feature grids.
 * Title can carry a lens-gradient accent phrase. Renders light or ink (dark)
 * surface with violet-tinted elevation. Children hold the tile body / visual.
 */
export function Tile(props) {
  const {
    eyebrow,
    title,
    titleAccent,
    body,
    surface = "ink",
    children,
    style,
    ...rest
  } = props;

  const isInk = surface === "ink";
  const tileStyle = {
    position: "relative",
    borderRadius: "var(--radius-card)",
    padding: "28px 30px",
    overflow: "hidden",
    background: isInk ? "var(--panel)" : "var(--bg-soft)",
    color: isInk ? "var(--fg-on-dark)" : "var(--fg)",
    border: `1px solid ${isInk ? "var(--border-on-dark-2)" : "var(--border-2)"}`,
    boxShadow: "var(--sh-2)",
    ...style,
  };

  return (
    <div style={tileStyle} {...rest}>
      {eyebrow && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: isInk ? "var(--muted-on-dark)" : "var(--muted)",
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 26,
            lineHeight: 1.1,
            letterSpacing: "-.02em",
            margin: 0,
          }}
        >
          {title}
          {titleAccent && (
            <>
              {" "}
              <span
                style={{
                  background: "var(--lens)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {titleAccent}
              </span>
            </>
          )}
        </h3>
      )}
      {body && (
        <p
          style={{
            marginTop: 10,
            fontFamily: "var(--font-ui)",
            fontSize: 15,
            lineHeight: 1.5,
            color: isInk ? "var(--body-on-dark)" : "var(--muted)",
            maxWidth: "42ch",
          }}
        >
          {body}
        </p>
      )}
      {children}
    </div>
  );
}
