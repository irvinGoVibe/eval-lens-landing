import React from "react";

/**
 * Section eyebrow — small uppercase mono label that orients a block.
 * Optional leading lens dot. Optional element (a clean headline can stand alone).
 */
export function Eyebrow(props) {
  const { children, dot = true, onDark = false, style, ...rest } = props;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: onDark ? "var(--lavender)" : "var(--muted)",
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--lens)",
          }}
        />
      )}
      {children}
    </span>
  );
}
