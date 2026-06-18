import React from "react";

/**
 * Media placeholder — a labeled, aspect-ratio'd slot that stands in for a
 * screenshot, video, or diagram while composing a layout. Soft violet-tinted
 * surface with a hairline border; renders on light or ink surfaces. Swap it
 * for a real <img>/<video> when the asset is ready.
 */
export function MediaPlaceholder(props) {
  const {
    ratio = "16 / 9",
    label = "Media",
    hint,
    onDark = false,
    style,
    ...rest
  } = props;

  return (
    <figure
      style={{
        margin: 0,
        position: "relative",
        aspectRatio: ratio,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        textAlign: "center",
        borderRadius: "var(--radius-card)",
        border: `1px dashed ${onDark ? "var(--border-on-dark)" : "var(--border)"}`,
        background: onDark
          ? "linear-gradient(160deg, rgba(108,76,241,.10), rgba(54,224,194,.05))"
          : "linear-gradient(160deg, rgba(108,76,241,.05), rgba(46,197,232,.04))",
        color: onDark ? "var(--muted-on-dark)" : "var(--muted)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {hint && (
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            lineHeight: 1.4,
            maxWidth: "32ch",
          }}
        >
          {hint}
        </span>
      )}
    </figure>
  );
}
