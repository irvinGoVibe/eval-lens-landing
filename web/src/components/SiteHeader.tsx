import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function SiteHeader({ light = false }: { light?: boolean } = {}) {
  return (
    <header
      className={light ? "site-header is-light" : "site-header"}
      id="site-header"
    >
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
