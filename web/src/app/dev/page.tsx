import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dev Pages — EvalLense",
  description:
    "Technical / internal development pages: labs, demos and inspection surfaces. Mirrors the site map tree, scoped to the /dev routes only.",
  robots: { index: false, follow: false },
};

type Status = "ready" | "soon";

type TreeNode = {
  label: string;
  path?: string;
  href?: string;
  status: Status;
  children?: TreeNode[];
};

function toLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildDevTree(): TreeNode {
  const devDir = join(process.cwd(), "src/app/dev");
  let children: TreeNode[] = [];

  if (existsSync(devDir)) {
    children = readdirSync(devDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .filter((d) => existsSync(join(devDir, d.name, "page.tsx")))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((d) => ({
        label: toLabel(d.name),
        path: `/dev/${d.name}`,
        status: "ready" as Status,
      }));
  }

  return { label: "Dev", path: "/dev", status: "ready", children };
}

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
  const rows = renderRows(buildDevTree(), [], "root");

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
