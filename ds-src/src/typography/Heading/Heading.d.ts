import type { ReactNode, CSSProperties } from "react";

/**
 * Display heading — the EvalLense statement headline, with an optional
 * lens-gradient accent phrase.
 * @startingPoint section="Typography" subtitle="Statement heading with lens accent" viewport="760x220"
 */
export interface HeadingProps {
  /** The headline text (lead phrase). */
  children: ReactNode;
  /** Trailing phrase painted with the lens gradient — one phrase per heading. */
  accent?: string;
  /** Semantic heading level → h1–h3. Default 2. */
  level?: 1 | 2 | 3;
  /** Visual size, independent of level. Default "lg". */
  size?: "sm" | "md" | "lg";
  /** Flip text color for dark surfaces. Default false. */
  onDark?: boolean;
  /** Text alignment. Default "left". */
  align?: "left" | "center" | "right";
  style?: CSSProperties;
}

export function Heading(props: HeadingProps): JSX.Element;
