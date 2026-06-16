import Link from "next/link";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="col">
          <Link className="brand" href="/#top" style={{ marginBottom: 14 }}>
            <span className="mark"></span>EvalLense
          </Link>
          <p>
            Batch-review pitch decks, rank the strongest startups, and give every
            team a clear report. Final decisions stay human-controlled.
          </p>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button className="btn btn-primary btn-sm">Book a demo</button>
            <button className="btn btn-ghost btn-sm">Try live demo</button>
          </div>
        </div>
        <div className="col">
          <h5>Product</h5>
          <Link href="/product">Overview</Link>
          <Link href="/product/entry-hub">Entry hub</Link>
          <Link href="/product/evidence-based-reports">Reports</Link>
          <Link href="/product/review-board">Review board</Link>
        </div>
        <div className="col">
          <h5>Trust</h5>
          <Link href="/trust/methodology">Methodology</Link>
          <Link href="/trust/consistency-reliability">
            Consistency &amp; reliability
          </Link>
          <Link href="/trust/prompt-injection-safety">
            Prompt injection safety
          </Link>
          <Link href="/trust/use-cases">Use cases</Link>
          <Link href="/#trust">Human review</Link>
          <Link href="/trust/security-privacy">Security &amp; privacy</Link>
          <Link href="/#trust">Research</Link>
        </div>
        <div className="col">
          <h5>Company</h5>
          <Link href="/company/about">About</Link>
          <Link href="/blog">Newsroom</Link>
          <a href="#">Contact</a>
          <a href="#">careers@evallense.com</a>
        </div>
      </div>
      <div className="legal wrap">
        <span>© 2026 EvalLense. All rights reserved.</span>
        <span style={{ display: "flex", gap: 18 }}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
        </span>
      </div>
    </footer>
  );
}
