import React from "react";

/**
 * Display heading — the EvalLense statement headline. Renders in the SF Pro
 * Display stack at weight 600 with tight tracking and balanced wrapping. An
 * optional `accent` phrase is painted with the brand lens gradient (use it on
 * ONE phrase per heading, never the whole line). Pick the semantic level with
 * `level`; the visual size is independent via `size`.
 */
export function Heading(props) {
  const {
    children,
    accent,
    level = 2,
    size = "lg",
    onDark = false,
    align = "left",
    style,
    ...rest
  } = props;

  const Tag = `h${level}`;
  const fontSize = {
    sm: "clamp(22px, 3vw, 30px)",
    md: "clamp(28px, 4vw, 42px)",
    lg: "clamp(34px, 5.5vw, 60px)",
  }[size];

  const accentSpan = accent ? (
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
        {accent}
      </span>
    </>
  ) : null;

  return (
    <Tag
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize,
        lineHeight: 1.04,
        letterSpacing: "-.03em",
        textWrap: "balance",
        textAlign: align,
        margin: 0,
        color: onDark ? "var(--fg-on-dark)" : "var(--fg)",
        ...style,
      }}
      {...rest}
    >
      {children}
      {accentSpan}
    </Tag>
  );
}
