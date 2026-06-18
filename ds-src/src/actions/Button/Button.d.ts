import type { ReactNode, CSSProperties } from "react";

/**
 * EvalLense pill button — the single CTA primitive across the site.
 * @startingPoint section="Components" subtitle="Token-driven pill CTA" viewport="700x180"
 */
export interface ButtonProps {
  /** Visual style. Default "primary". */
  variant?: "primary" | "ghost" | "glass" | "dark" | "gradient";
  /** Size. Default "md". */
  size?: "md" | "sm";
  /** Append a trailing → arrow. */
  arrow?: boolean;
  /** Render as an anchor when set; otherwise a <button>. */
  href?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
