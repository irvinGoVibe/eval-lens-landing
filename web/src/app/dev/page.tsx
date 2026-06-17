import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dev Pages — EvalLense",
  description:
    "Technical / internal development pages: labs, demos and inspection surfaces. Mirrors the site map tree, scoped to the /dev routes only.",
  robots: { index: false, follow: false },
};

/*
 * ── DEV MAP ──────────────────────────────────────────────────────────────
 * Same monospace box-drawing tree as /sitemap, but scoped to the technical
 * /dev/* routes only — labs, demos and inspection surfaces that never ship to
 * the public site map.
 *
 * Source of truth is what actually exists under web/src/app/dev. When a new
 * dev surface lands, add a node here. `status`:
 *   ready → a real route exists and renders a page → clickable link
 *   soon  → planned but not built yet              → inactive, muted
 */

type Status = "ready" | "soon";

type TreeNode = {
  label: string;
  path?: string; // route shown next to the label
  href?: string; // where the link points (defaults to path)
  status: Status;
  children?: TreeNode[];
};

const TREE: TreeNode = {
  label: "Dev",
  path: "/dev",
  status: "ready",
  children: [
    {
      label: "Backdrop Filter",
      path: "/dev/backdrop-filter",
      status: "ready",
    },
    { label: "Gallery", path: "/dev/gallery", status: "ready" },
    { label: "Newsroom", path: "/dev/newsroom", status: "ready" },
    {
      label: "Real Header Backdrop",
      path: "/dev/real-header-backdrop",
      status: "ready",
    },
    { label: "Section Lab", path: "/dev/section-lab", status: "ready" },
    { label: "Visual Lab", path: "/dev/visual-lab", status: "ready" },
    { label: "Vivid Demo", path: "/dev/vivid-demo", status: "ready" },
  ],
};

/* Build the box-drawing prefix for a node from its ancestors' last-child flags. */
function prefixFor(ancestorsLast: boolean[], isLast: boolean): string {
  if (ancestorsLast.length === 0) return "";
  const guides = ancestorsLast
    .slice(0, -1)
    .map((last) => (last ? "   " : "│  "))
    .join("");
  return guides + (isLast ? "└─ " : "├─ ");
}

function renderRows(
  node: TreeNode,
  ancestorsLast: boolean[],
  keyPath: string,
): ReactNode[] {
  const isLast = ancestorsLast.length === 0 ? true : ancestorsLast[ancestorsLast.length - 1];
  const prefix = prefixFor(ancestorsLast, isLast);
  const isReady = node.status === "ready";
  const href = node.href ?? node.path;

  const label = <span className="sm-label">{node.label}</span>;
  const route = node.path ? <span className="sm-path">{node.path}</span> : null;

  const content = isReady ? (
    href ? (
      <Link
        className="sm-node sm-node--ready"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        {route}
        <span className="sm-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    ) : (
      <span className="sm-node sm-node--header">
        {label}
        {route}
      </span>
    )
  ) : (
    <span className="sm-node sm-node--soon" aria-disabled="true">
      {label}
      {route}
      <span className="sm-badge">soon</span>
    </span>
  );

  const row = (
    <li className="sm-row" key={keyPath}>
      {prefix && (
        <span className="sm-guide" aria-hidden="true">
          {prefix}
        </span>
      )}
      {content}
    </li>
  );

  const childRows = (node.children ?? []).flatMap((child, i, arr) =>
    renderRows(
      child,
      [...ancestorsLast, i === arr.length - 1],
      `${keyPath}.${i}`,
    ),
  );

  return [row, ...childRows];
}

export default function DevMapPage() {
  const rows = renderRows(TREE, [], "root");

  return (
    <>
      <PageHeader />
      <main className="sitemap">
        <section className="band soft sitemap-hero">
          <div className="wrap head">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Dev
            </span>
            <h1 className="title">Technical dev pages</h1>
            <p className="sub">
              Internal labs, demos and inspection surfaces under{" "}
              <code>/dev</code>. These never appear in the public site map — this
              tree mirrors it, scoped to the development routes only.
            </p>
          </div>
        </section>

        <section className="band sitemap-tree-band">
          <div className="wrap">
            <div className="sm-legend" aria-hidden="true">
              <span className="sm-legend__item">
                <span className="sm-legend__dot sm-legend__dot--ready"></span>
                Live page
              </span>
              <span className="sm-legend__item">
                <span className="sm-legend__dot sm-legend__dot--soon"></span>
                Not built yet
              </span>
            </div>
            <nav aria-label="Dev pages" className="sm-tree-wrap">
              <ul className="sm-tree">{rows}</ul>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
