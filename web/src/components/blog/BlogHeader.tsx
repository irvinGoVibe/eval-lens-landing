import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Newsroom chrome. Unlike the homepage SiteHeader (transparent, light text
 * built to sit over the dark hero video), the blog runs on a white surface —
 * so this bar is opaque, blurred, and dark-text by default, mirroring the
 * solid section header on apple.com/newsroom.
 */
export function BlogHeader() {
  return (
    <header className="blog-header">
      <div className="blog-header__inner">
        <Link href="/" className="brand blog-header__brand" aria-label="EvalLense home">
          <span className="mark" aria-hidden="true"></span>
          EvalLense
        </Link>
        <span className="blog-header__divider" aria-hidden="true"></span>
        <Link href="/blog" className="blog-header__news">
          Newsroom
        </Link>
        <nav className="blog-header__nav" aria-label="Newsroom sections">
          <Link className="blog-header__link" href="/blog#latest">
            Latest News
          </Link>
          <Link className="blog-header__link" href="/blog#loop">
            In the Loop
          </Link>
          <Link className="blog-header__link" href="/blog#more">
            More
          </Link>
        </nav>
        <Button size="sm" className="blog-header__cta" href="/#demo" arrow>
          Book a demo
        </Button>
      </div>
    </header>
  );
}
