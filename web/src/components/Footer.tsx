import Link from "next/link";
import { Button } from "@/components/ui/Button";

type FooterProps = {
  /** `light` (default) sits on `--bg-soft`; `dark` sits on `--ink`. */
  variant?: "light" | "dark";
};

/* Social channels — mirror the set used on /company/contact (X, Instagram,
   Telegram, Medium). Brand glyphs are inline simple-icons paths. */
const SOCIALS = [
  {
    name: "X",
    href: "https://x.com/evallense",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/evallense/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "Telegram",
    href: "https://t.me/evallense",
    path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  },
  {
    name: "Medium",
    href: "https://medium.com/@evallense",
    path: "M13.54 12a6.8 6.8 0 1 1-13.6 0 6.8 6.8 0 0 1 13.6 0zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z",
  },
];

export function Footer({ variant = "light" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer className={isDark ? "foot is-dark" : "foot"}>
      <div className="inner">
        <div className="wrap">
          <div className="col col--brand">
            <Link className="brand" href="/#top" style={{ marginBottom: 14 }}>
              <span className="mark"></span>EvalLense
            </Link>
            <p>
              Batch-review pitch decks, rank the strongest startups, and give
              every team a clear report. Final decisions stay human-controlled.
            </p>
            <div className="ctas">
              <Button variant={isDark ? "gradient" : "primary"} size="sm">
                Book a call
              </Button>
              <Button variant={isDark ? "glass" : "ghost"} size="sm">
                Try live demo
              </Button>
            </div>
          </div>
          <div className="nav-cluster">
            <div className="col">
              <h5>Product</h5>
              <nav>
                <Link href="/product/overview">Overview</Link>
                <Link href="/product/entry-hub">Entry hub</Link>
                <Link href="/product/evidence-based-reports">Reports</Link>
                <Link href="/product/review-board">Review board</Link>
                <Link href="/sitemap">Site map</Link>
              </nav>
            </div>
            <div className="col">
              <h5>Trust</h5>
              <nav>
                <Link href="/trust/methodology">Methodology</Link>
                <Link href="/trust/consistency-reliability">
                  Consistency &amp; reliability
                </Link>
                <Link href="/trust/prompt-injection-safety">
                  Prompt injection safety
                </Link>
                <Link href="/trust/security-privacy">Security &amp; privacy</Link>
                <Link href="/trust/use-cases">Use cases</Link>
              </nav>
            </div>
            <div className="col">
              <h5>Company</h5>
              <nav>
                <Link href="/company/about">About</Link>
                <Link href="/blog">Newsroom</Link>
                <Link href="/company/contact">Contact</Link>
                <a href="#">careers@evallense.com</a>
              </nav>
              <span className="foot-social">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="foot-legal">
          <span className="foot-legal__copy">EvalLense © 2026</span>
          <span className="foot-legal__meta">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/security">Security</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
