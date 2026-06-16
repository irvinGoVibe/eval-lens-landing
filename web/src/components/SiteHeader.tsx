import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Homepage header — transparent over the hero with light text. On scroll past
 * the hero, `ScrollOrchestrator` toggles `is-light` so the text flips to dark
 * for the light sections below (the bar itself stays transparent). Internal
 * pages use `PageHeader` instead.
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
          <a className="site-header__link" href="#workflow">Product</a>
          <a className="site-header__link" href="#problem">Block</a>
          <a className="site-header__link" href="#results">Pricing</a>
          <Link className="site-header__link" href="/blog">Newsroom</Link>
        </nav>
        <Button href="#demo" className="site-header__cta" arrow>
          Book a demo
        </Button>
      </div>
    </header>
  );
}
