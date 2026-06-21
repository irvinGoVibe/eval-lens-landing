import type { ReactNode } from "react";

/**
 * Eyebrow — mono uppercase kicker with a leading lens dot.
 * Surface-aware: violet on light, lavender on `.ink` (via globals `.ink .eyebrow`).
 * Clean DS atom (renames LabEyebrow without the `Lab` prefix).
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={className ? `eyebrow ${className}` : "eyebrow"}>
      <span className="dot" aria-hidden="true" />
      {children}
    </span>
  );
}
