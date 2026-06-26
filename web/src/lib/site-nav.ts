/**
 * Section navigation types for the internal-page header (`PageHeader`).
 *
 * Each internal page declares its own `SectionNav` inline (a `HEADER_NAV` const
 * in the page file) — the section name plus ≤3 anchor links to that page's own
 * sections (see `src/app/product/page.tsx` for the reference). This file only
 * holds the shared type, the Newsroom preset, and the CTA.
 */

/**
 * Icon keys for the mobile menu chip set. Each maps to a thin-stroke line icon
 * in `src/components/nav-icons.tsx`. Used ONLY by `MobileNav` — the desktop
 * `GlobalNavSwitcher` ignores it. Kept as a string-literal union so a typo in
 * the nav data is a type error.
 */
export type NavIcon =
  | "layers"
  | "shield"
  | "tag"
  | "news"
  | "about"
  | "overview"
  | "hub"
  | "report"
  | "board"
  | "method"
  | "consist"
  | "security"
  | "usecase"
  | "research"
  | "product"
  | "press"
  | "overviewPrice"
  | "benefit"
  | "aboutCo"
  | "contact"
  | "anchor";

export type NavLink = {
  label: string;
  href: string;
  /** Optional icon-chip key for the mobile menu (desktop ignores it). */
  icon?: NavIcon;
};

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
  /**
   * Mobile-menu icon-chip key. Additive + optional — the desktop
   * `GlobalNavSwitcher` never reads it; only `MobileNav` does.
   */
  icon?: NavIcon;
  /**
   * Mobile-menu one-line description shown under the section name. NOTE: this is
   * distinct from `description` on the Newsroom-style entry (which is the union
   * discriminator); `desc` is purely cosmetic mobile copy.
   */
  desc?: string;
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
    icon: "layers",
    desc: "The evaluation platform",
    links: [
      { label: "Overview", href: "/product/overview", icon: "overview" },
      { label: "Entry Hub", href: "/product/entry-hub", icon: "hub" },
      {
        label: "Reports",
        href: "/product/evidence-based-reports",
        icon: "report",
      },
      { label: "Review Board", href: "/product/review-board", icon: "board" },
    ],
  },
  {
    label: "Trust",
    href: "/trust/methodology",
    match: "/trust",
    icon: "shield",
    desc: "How we keep scores fair",
    links: [
      { label: "Methodology", href: "/trust/methodology", icon: "method" },
      {
        label: "Consistency",
        href: "/trust/consistency-reliability",
        icon: "consist",
      },
      { label: "Security", href: "/trust/security-privacy", icon: "security" },
      { label: "Use Cases", href: "/trust/use-cases", icon: "usecase" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    match: "/pricing",
    icon: "tag",
    desc: "Plans & what's included",
    links: [
      { label: "Pricing Overview", href: "/pricing", icon: "overviewPrice" },
      { label: "Benefits", href: "/pricing#compare", icon: "benefit" },
    ],
  },
  {
    label: "Newsroom",
    href: "/blog",
    match: "/blog",
    icon: "news",
    desc: "Research & company news",
    links: [
      { label: "Research", href: "/blog/all?research", icon: "research" },
      { label: "Product News", href: "/blog/all?product", icon: "product" },
      {
        label: "Company Updates",
        href: "/blog/all?press-release",
        icon: "press",
      },
    ],
  },
  {
    label: "About",
    href: "/company/about",
    match: "/company",
    icon: "about",
    desc: "The team behind EvalLense",
    links: [
      { label: "About EvalLense", href: "/company/about", icon: "aboutCo" },
      { label: "Contact", href: "/company/contact", icon: "contact" },
    ],
  },
];

/**
 * Full site map for the MOBILE menu (`MobileNav`).
 *
 * Distinct from `GLOBAL_NAV` (the curated desktop switcher with short labels):
 * the mobile sheet is a complete navigation map — every product section with
 * its FULL page names, plus the `prompt-injection-safety` Trust page that the
 * desktop menu omits. Legal/utility routes (Privacy/Terms/Security/Sitemap)
 * are intentionally excluded. Reuses the same `GlobalNavEntry` types; sub-link
 * `icon` keys are omitted (mobile sections render as orbs, sub-links as plain
 * text), which is fine because `icon` is optional on `NavLink`.
 */
export const MOBILE_NAV: GlobalNavEntry[] = [
  {
    label: "Product",
    href: "/product/overview",
    match: "/product",
    icon: "layers",
    desc: "The evaluation platform",
    links: [
      { label: "Overview", href: "/product/overview" },
      { label: "Entry Hub", href: "/product/entry-hub" },
      {
        label: "Evidence-Based Reports",
        href: "/product/evidence-based-reports",
      },
      { label: "Review Board", href: "/product/review-board" },
    ],
  },
  {
    label: "Trust",
    href: "/trust/methodology",
    match: "/trust",
    icon: "shield",
    desc: "How we keep scores fair",
    links: [
      { label: "Methodology", href: "/trust/methodology" },
      {
        label: "Consistency & Reliability",
        href: "/trust/consistency-reliability",
      },
      { label: "Security & Privacy", href: "/trust/security-privacy" },
      { label: "Use Cases", href: "/trust/use-cases" },
      {
        label: "Prompt Injection Safety",
        href: "/trust/prompt-injection-safety",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    match: "/pricing",
    icon: "tag",
    desc: "Plans & what's included",
    links: [
      { label: "Pricing Overview", href: "/pricing" },
      { label: "Benefits", href: "/pricing#compare" },
    ],
  },
  {
    label: "Newsroom",
    href: "/blog",
    match: "/blog",
    icon: "news",
    desc: "Research & company news",
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
    icon: "about",
    desc: "The team behind EvalLense",
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
