const React = window.React;

/**
 * EvalLense pill button — the single CTA primitive across the site.
 * Variants: primary (solid violet), ghost (violet hairline), glass (the shared
 * liquid-glass material — for hero/dark/cinematic surfaces), dark (solid ink),
 * gradient (purple→blue filled, for in-app / footer CTAs). Sizes md|sm.
 * Styling lives in tokens/components.css (mirrored verbatim from the live site,
 * including the ::before/::after sheen + bloom layers), so glass and gradient
 * match the homepage exactly. Children are wrapped in .btn-txt so they sit
 * above the gradient/glass overlays.
 */
export function Button(props) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    href,
    children,
    className,
    ...rest
  } = props;

  const cls = [
    "ds-btn",
    `ds-btn-${variant}`,
    size === "sm" && "ds-btn-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className="btn-txt">{children}</span>
      {arrow && (
        <span className="arr" aria-hidden="true">→</span>
      )}
    </>
  );

  if (typeof href === "string") {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
