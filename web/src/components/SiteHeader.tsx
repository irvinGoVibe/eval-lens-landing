import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Homepage header — fixed and transparent, sitting over the page. The bar never
 * gets a background; instead `ScrollOrchestrator` flips `is-light` as you scroll
 * so the text always contrasts the section beneath it: light (lavender / white)
 * over the dark sections (hero, bento `#system`, dark CTA band), dark (violet /
 * ink) over the light sections in between. Internal pages use `PageHeader`.
 */
export function SiteHeader() {
  return (
    <header className="site-header" id="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="EvalLense home">
          <span className="mark" aria-hidden="true"></span>
          EvalLense
        </a>
        <nav className="site-header__nav" aria-label="Primary">
          <Link className="site-header__link" href="/product/overview">
            Product
          </Link>
          <Link className="site-header__link" href="/trust/methodology">
            Trust
          </Link>
          <a className="site-header__link" href="#pricing">
            Pricing
          </a>
          <Link className="site-header__link" href="/company/contact">
            Contact
          </Link>
        </nav>
        <Button href="/#demo" className="site-header__cta" arrow>
          Launch App
        </Button>
      </div>
    </header>
  );
}
