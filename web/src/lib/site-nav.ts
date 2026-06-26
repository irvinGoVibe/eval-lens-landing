/**
 * Section navigation types for the internal-page header (`PageHeader`).
 *
 * Each internal page declares its own `SectionNav` inline (a `HEADER_NAV` const
 * in the page file) — the section name plus ≤3 anchor links to that page's own
 * sections (see `src/app/product/page.tsx` for the reference). This file only
 * holds the shared type, the Newsroom preset, and the CTA.
 */

export type NavLink = { label: string; href: string };

/**
 * Global page entry for the header switcher (`GlobalNavSwitcher`).
 *
 * The dropdown next to the brand lets the user jump between the site's main
 * pages without going back home. Every entry shares the top-level `label` +
 * `href` (canonical landing route) + `match` (pathname prefix used to mark the
 * active section). Each entry then carries EITHER a list of in-section `links`
 * (Product / Trust / Pricing / Newsroom / About) OR a one-line `description`.
 * Today every entry uses `links`; the `description` form is kept for any
 * future section that has no sub-links (the whole row then just leads to `href`).
 */
type GlobalNavBase = {
  /** Label shown as the section name in the dropdown row. */
  label: string;
  /** Canonical landing (top-level) route for the section. */
  href: string;
  /** Pathname prefix that identifies the active section. */
  match: string;
};

/** Section with in-menu sub-links (e.g. Product → Overview · Entry Hub · …). */
export type GlobalNavLinksEntry = GlobalNavBase & {
  /** In-section destinations shown beside the section name. */
  links: NavLink[];
  description?: never;
};

/** Section with no sub-links — a descriptive line; the whole row leads to `href`. */
export type GlobalNavDescriptionEntry = GlobalNavBase & {
  /** One-line description shown in place of sub-links. */
  description: string;
  links?: never;
};

export type GlobalNavEntry = GlobalNavLinksEntry | GlobalNavDescriptionEntry;

/** The five top-level destinations, in display order. */
export const GLOBAL_NAV: GlobalNavEntry[] = [
  {
    label: "Product",
    href: "/product/overview",
    match: "/product",
    links: [
      { label: "Overview", href: "/product/overview" },
      { label: "Entry Hub", href: "/product/entry-hub" },
      { label: "Reports", href: "/product/evidence-based-reports" },
      { label: "Review Board", href: "/product/review-board" },
    ],
  },
  {
    label: "Trust",
    href: "/trust/methodology",
    match: "/trust",
    links: [
      { label: "Methodology", href: "/trust/methodology" },
      { label: "Consistency", href: "/trust/consistency-reliability" },
      { label: "Security", href: "/trust/security-privacy" },
      { label: "Use Cases", href: "/trust/use-cases" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    match: "/pricing",
    links: [
      { label: "Pricing Overview", href: "/pricing" },
      { label: "Benefits", href: "/pricing#compare" },
    ],
  },
  {
    label: "Newsroom",
    href: "/blog",
    match: "/blog",
    links: [
      { label: "Research", href: "/blog/all?research" },
      { label: "Product News", href: "/blog/all?product" },
      { label: "Company Updates", href: "/blog/all?press-release" },
    ],
  },
  {
    label: "About",
    href: "/company/about",
    match: "/company",
    links: [
      { label: "About EvalLense", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
];

export type SectionNav = {
  /** Section name shown after the brand divider (e.g. "Product"). */
  section: string;
  /** Where the section name links. Omit for sections without an index page —
   *  it then renders as a plain (non-link) label. */
  sectionHref?: string;
  /** Up to ~3 anchor links to the page's own sections. */
  links: NavLink[];
};

/** Newsroom is the one section whose links are cross-page hashes on /blog rather
 *  than per-page anchors; the blog layout uses it directly. */
export const NEWSROOM_NAV: SectionNav = {
  section: "Newsroom",
  sectionHref: "/blog",
  links: [
    { label: "Latest News", href: "/blog#latest" },
    { label: "In the Loop", href: "/blog#loop" },
    { label: "More", href: "/blog#more" },
  ],
};

/**
 * Internal-page CTA. Replaces the homepage's "Book a demo" — internal pages
 * push toward launching the product app.
 *
 * TODO: point `href` at the real app launch URL once the product app exists.
 * `/#demo` is a functional placeholder that lands on the homepage demo section.
 */
export const LAUNCH_CTA: NavLink = { label: "Launch App", href: "/#demo" };

/**
 * Secondary CTA shown beside `LAUNCH_CTA` in the mobile full-screen menu.
 * Visually subordinate (glass, not a second bright gradient). Targets the real
 * `/company/contact` route — a reasonable placeholder until a dedicated booking
 * URL exists.
 */
export const BOOK_CALL_CTA: NavLink = {
  label: "Book a call",
  href: "/company/contact",
};
