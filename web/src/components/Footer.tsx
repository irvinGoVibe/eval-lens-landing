import Link from "next/link";
import { Button } from "@/components/ui/Button";

type FooterProps = {
  /** `light` (default) sits on `--bg-soft`; `dark` sits on `--ink`. */
  variant?: "light" | "dark";
};

/* Public footer channels. Brand glyphs are inline simple-icons paths. */
const SOCIALS = [
  {
    name: "X",
    href: "https://x.com/EvalLensio",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Telegram",
    href: "https://t.me/evallens",
    path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
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
              <span className="mark"></span>EvalLens
            </Link>
            <p>
              Batch-review pitch decks.<br />
              Final decisions stay human-controlled.
            </p>
            <div className="ctas">
              <Button variant={isDark ? "gradient" : "primary"} size="sm" href="https://calendly.com/evallens/30min">
                Book a call
              </Button>
              <Button variant={isDark ? "glass" : "ghost"} size="sm">
                Try live demo
              </Button>
            </div>
          </div>
          <div className="nav-cluster">
            <div className="col">
              <p className="col-h">
                <Link href="/product">Product</Link>
              </p>
              <nav>
                <Link href="/one-pager">One Pager</Link>
                <Link href="/product/entry-hub">Entry Hub</Link>
                <Link href="/product/evidence-based-reports">Reports</Link>
                <Link href="/product/review-board">Review board</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/sitemap">Site map</Link>
              </nav>
            </div>
            <div className="col">
              <p className="col-h">
                <Link href="/trust">Trust</Link>
              </p>
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
              <p className="col-h">Company</p>
              <nav>
                <Link href="/company/about">About</Link>
                <Link href="/blog">Newsroom</Link>
                <Link href="/company/contact">Contact</Link>
                <a href="#">careers@evallens.io</a>
              </nav>
            </div>
          </div>
        </div>
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
        <div className="foot-legal">
          <span className="foot-legal__copy">EvalLens © 2026</span>
          <span className="foot-legal__meta">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/security">Security</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/acceptable-use">Acceptable Use</Link>
            <Link href="/dpa">DPA</Link>
            <Link href="/subprocessors">Sub-processors</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
