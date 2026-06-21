type HeadingProps = {
  /** Plain leading copy. */
  lead: string;
  /** One optional word painted with the lens gradient (`.grad-word`). */
  accent?: string;
  /** Optional copy after the accent word. */
  trail?: string;
  /** Heading level/tag. Defaults to `h2`. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Heading — section title with at most one lens-accented word.
 * Renders the global `.title` class (surface-aware); the accent is a layout
 * concern, never a content change. Clean DS atom (renames LabTitle, adds
 * lead/accent/trail so heroes/splits can accent mid-phrase).
 */
export function Heading({ lead, accent, trail, as = "h2", className }: HeadingProps) {
  const Tag = as;
  const cls = className ? `title ${className}` : "title";
  return (
    <Tag className={cls}>
      {lead}
      {accent ? (
        <>
          {" "}
          <span className="grad-word">{accent}</span>
        </>
      ) : null}
      {trail ? ` ${trail}` : null}
    </Tag>
  );
}
