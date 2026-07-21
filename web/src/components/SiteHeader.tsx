import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/Button";
import { LAUNCH_CTA, type SectionNav } from "@/lib/site-nav";

const HOME_NAV: SectionNav = {
  section: "Home",
  sectionHref: "/",
  links: [
    { label: "Find leaders", href: "#problem" },
    { label: "Entry point", href: "#workflow" },
    { label: "Structured reports", href: "#decisions" },
    { label: "Trust & control", href: "#system" },
  ],
};

/**
 * Homepage header — fixed and transparent, sitting over the page. The bar never
 * gets a background; instead `ScrollOrchestrator` flips `is-light` as you scroll
 * so the text always contrasts the section beneath it: light (lavender / white)
 * over the dark sections (hero, bento `#system`, dark CTA band), dark (violet /
 * ink) over the light sections in between. Internal pages use `PageHeader`.
 */
export function SiteHeader() {
  const glassStyle = {
    WebkitBackdropFilter: "saturate(220%) blur(36px)",
    backdropFilter: "saturate(220%) blur(36px)",
  };

  return (
    <header className="site-header" id="site-header">
      <div
        className="site-header__glass"
        aria-hidden="true"
        style={glassStyle}
      ></div>
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="EvalLens home">
          <BrandLogo />
        </a>
        <nav className="site-header__nav" aria-label="Primary">
          <Link className="site-header__link" href="/product/overview">
            Product
          </Link>
          <Link className="site-header__link" href="/trust/methodology">
            Trust
          </Link>
          <Link className="site-header__link" href="/pricing">
            Pricing
          </Link>
          <Link className="site-header__link" href="/company/contact">
            Contact
          </Link>
        </nav>
        <Button href="/#demo" className="site-header__cta" arrow>
          Launch App
        </Button>
        <MobileNav nav={HOME_NAV} cta={LAUNCH_CTA} />
      </div>
    </header>
  );
}
