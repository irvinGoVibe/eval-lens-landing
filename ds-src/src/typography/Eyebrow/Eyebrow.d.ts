import type { ReactNode, CSSProperties } from "react";

/** Section eyebrow — small uppercase mono label that orients a block. */
export interface EyebrowProps {
  children: ReactNode;
  /** Leading lens dot. Default true. */
  dot?: boolean;
  /** Use the lavender accent for dark surfaces. Default false. */
  onDark?: boolean;
  style?: CSSProperties;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
