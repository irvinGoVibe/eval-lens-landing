/**
 * Section navigation types for the internal-page header (`PageHeader`).
 *
 * Each internal page declares its own `SectionNav` inline (a `HEADER_NAV` const
 * in the page file) — the section name plus ≤3 anchor links to that page's own
 * sections (see `src/app/product/page.tsx` for the reference). This file only
 * holds the shared type, the Newsroom preset, and the CTA.
 */

export type NavLink = { label: string; href: string };

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
