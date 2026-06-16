import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Site Map — EvalLense",
  description:
    "The full page tree of EvalLense, mirrored from the product sitemap. Live pages are clickable links; pages that are not built yet are shown as inactive.",
};

/*
 * ── SITE MAP ─────────────────────────────────────────────────────────────
 * A human-readable tree of every page on the site, in the same monospace
 * box-drawing format used in wiki/product/sitemap.md ("Final Site Structure").
 *
 * Source of truth for the STRUCTURE is wiki/product/sitemap.md. The `status`
 * flag reflects what actually ships under web/src/app today:
 *   ready → a real route exists and renders a page → clickable link
 *   soon  → in the sitemap but not built yet         → inactive, muted
 *
 * When a new page lands, flip its node from "soon" to "ready" and give it an
 * href. Keep this list in sync with the routes under web/src/app.
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
  label: "EvalLense",
  path: "/",
  status: "ready",
  children: [
    { label: "Conversion Page", path: "/", status: "ready" },
    {
      label: "Product",
      path: "/product",
      status: "ready",
      children: [
        { label: "Overview", path: "/product", status: "ready" },
        { label: "Entry Hub", path: "/product/entry-hub", status: "ready" },
        {
          label: "Evidence-Based Reports",
          path: "/product/evidence-based-reports",
          status: "ready",
        },
        {
          label: "Review Board",
          path: "/product/review-board",
          status: "ready",
        },
      ],
    },
    {
      label: "Trust",
      path: "/trust",
      status: "soon",
      children: [
        { label: "Methodology", path: "/trust/methodology", status: "ready" },
        {
          label: "Consistency & Reliability",
          path: "/trust/consistency-reliability",
          status: "ready",
        },
        {
          label: "Prompt Injection Safety",
          path: "/trust/prompt-injection-safety",
          status: "ready",
        },
        {
          label: "Security & Privacy",
          path: "/trust/security-privacy",
          status: "ready",
        },
        { label: "Use Cases", path: "/trust/use-cases", status: "ready" },
      ],
    },
    {
      label: "Company",
      path: "/company",
      status: "soon",
      children: [
        { label: "About", path: "/company/about", status: "soon" },
        // Newsroom currently lives at /blog on the live site.
        {
          label: "Newsroom",
          path: "/company/newsroom",
          href: "/blog",
          status: "ready",
        },
        { label: "Careers", path: "/company/careers", status: "soon" },
        { label: "Contact", path: "/company/contact", status: "soon" },
      ],
    },
    {
      label: "Legal / Technical",
      status: "soon",
      children: [
        { label: "Privacy", path: "/privacy", status: "soon" },
        { label: "Terms", path: "/terms", status: "soon" },
        { label: "Security", path: "/security", status: "soon" },
      ],
    },
  ],
};

/* Build the box-drawing prefix for a node from its ancestors' last-child flags. */
function prefixFor(ancestorsLast: boolean[], isLast: boolean): string {
  if (ancestorsLast.length === 0) return "";
  const guides = ancestorsLast
    .slice(0, -1)
    .map((last) => (last ? "   " : "│  "))
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

  const label = (
    <span className="sm-label">{node.label}</span>
  );
  const route = node.path ? <span className="sm-path">{node.path}</span> : null;

  const content =
    isReady && href ? (
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

export default function SiteMapPage() {
  const rows = renderRows(TREE, [], "root");

  return (
    <>
      <SiteHeader light />
      <main className="sitemap">
        <section className="band soft sitemap-hero">
          <div className="wrap head">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Site Map
            </span>
            <h1 className="title">All pages, one tree</h1>
            <p className="sub">
              The full structure of the EvalLense site, mirrored from the product
              sitemap. Live pages are clickable; pages that aren&apos;t built yet
              are shown as inactive.
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
            <nav aria-label="Site map" className="sm-tree-wrap">
              <ul className="sm-tree">{rows}</ul>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
