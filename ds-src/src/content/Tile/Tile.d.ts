import type { ReactNode, CSSProperties } from "react";

/**
 * Bento tile — content card for the homepage bento and feature grids.
 * @startingPoint section="Components" subtitle="Bento content tile" viewport="700x300"
 */
export interface TileProps {
  /** Small uppercase mono label. */
  eyebrow?: string;
  /** Tile title. */
  title?: string;
  /** Optional trailing phrase painted with the lens gradient. */
  titleAccent?: string;
  /** Body copy. */
  body?: string;
  /** Surface. Default "ink" (dark). */
  surface?: "ink" | "light";
  /** Tile body / visual / chips. */
  children?: ReactNode;
  style?: CSSProperties;
}

export function Tile(props: TileProps): JSX.Element;
