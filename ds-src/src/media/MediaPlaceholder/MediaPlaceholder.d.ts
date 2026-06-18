import type { CSSProperties } from "react";

/**
 * Media placeholder — labeled aspect-ratio slot standing in for a real asset.
 * @startingPoint section="Media" subtitle="Aspect-ratio media slot" viewport="640x420"
 */
export interface MediaPlaceholderProps {
  /** CSS aspect-ratio, e.g. "16 / 9" or "1 / 1". Default "16 / 9". */
  ratio?: string;
  /** Short uppercase label. Default "Media". */
  label?: string;
  /** Optional descriptive line under the label. */
  hint?: string;
  /** Render on a dark/ink surface. Default false. */
  onDark?: boolean;
  style?: CSSProperties;
}

export function MediaPlaceholder(props: MediaPlaceholderProps): JSX.Element;
