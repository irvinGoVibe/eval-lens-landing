import type { ReactNode, CSSProperties } from "react";

/** Pill chip — tag / selector for material types, segments, filters. */
export interface ChipProps {
  children: ReactNode;
  /** Selected state — violet tint + leading lens dot. Default false. */
  checked?: boolean;
  /** Render for a dark surface. Default false. */
  onDark?: boolean;
  style?: CSSProperties;
}

export function Chip(props: ChipProps): JSX.Element;
