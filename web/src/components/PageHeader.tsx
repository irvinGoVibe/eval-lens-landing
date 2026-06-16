import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeaderThemeSync } from "@/components/HeaderThemeSync";
import { LAUNCH_CTA, type NavLink, type SectionNav } from "@/lib/site-nav";

/**
 * Internal-page chrome — the shared header for every page that isn't the
 * homepage. Built on the same logic as the Newsroom header: the brand links
 * home, a divider separates it from the section name, and the page's own
 * in-page anchor links sit on the right. The CTA is "Launch App" (open the
 * product, gradient pill), not the homepage's "Book a demo".
 *
 * Surface is a blurred glass bar that adapts to the band beneath it:
 *  - over a light band — translucent light glass, dark text;
 *  - over a dark `.band.ink` — translucent near-black glass, light text.
 * `HeaderThemeSync` flips the variant on scroll; CSS transitions cross-fade it.
 * `theme` only sets the initial (server-rendered) surface to avoid a flash.
 *
 * Anchor links are passed per page via `nav.links` — each page declares which
 * of its own sections to expose. The homepage keeps its own `SiteHeader`.
 */
export function PageHeader({
  nav,
  theme = "light",
  cta = LAUNCH_CTA,
}: {
  /** Section + per-page anchor links. `nav.links` are in-page anchors for the
   *  page being rendered. Omit `nav` for bare pages (sitemap, 404): brand +
   *  CTA only. */
  nav?: SectionNav;
  theme?: "light" | "dark";
  cta?: NavLink;
}) {
  const className = ["page-header", theme === "dark" && "page-header--dark"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      <div className="page-header__inner">
        <Link
          href="/"
          className="brand page-header__brand"
          aria-label="EvalLense home"
        >
          <span className="mark" aria-hidden="true"></span>
          EvalLense
        </Link>

        {nav && (
          <>
            <span className="page-header__divider" aria-hidden="true"></span>
            {nav.sectionHref ? (
              <Link href={nav.sectionHref} className="page-header__section">
                {nav.section}
              </Link>
            ) : (
              <span className="page-header__section">{nav.section}</span>
            )}
            <nav
              className="page-header__nav"
              aria-label={`${nav.section} sections`}
            >
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="page-header__link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </>
        )}

        {/* "Launch App" — the bright footer gradient (`btn-gradient` / --grad-cta)
            on the light bar. On the dark bar `.page-header--dark .page-header__cta`
            overrides it with a translucent outline so it doesn't blow out. */}
        <Button
          variant="gradient"
          size="sm"
          className="page-header__cta"
          href={cta.href}
          arrow
        >
          {cta.label}
        </Button>
      </div>
      <HeaderThemeSync />
    </header>
  );
}
