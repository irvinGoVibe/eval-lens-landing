export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="col">
          <a className="brand" href="#top" style={{ marginBottom: 14 }}>
            <span className="mark"></span>EvalLense
          </a>
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
          <a href="#problem">Overview</a>
          <a href="#workflow">Entry hub</a>
          <a href="#decisions">Reports</a>
          <a href="#results">Batch results</a>
        </div>
        <div className="col">
          <h5>Trust</h5>
          <a href="#trust">Methodology</a>
          <a href="#trust">Human review</a>
          <a href="#trust">Security &amp; privacy</a>
          <a href="#trust">Research</a>
        </div>
        <div className="col">
          <h5>Company</h5>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
          <a href="#">careers@evallense.com</a>
        </div>
      </div>
      <div className="legal wrap">
        <span>© 2026 EvalLense. All rights reserved.</span>
        <span style={{ display: "flex", gap: 18 }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </span>
      </div>
    </footer>
  );
}
