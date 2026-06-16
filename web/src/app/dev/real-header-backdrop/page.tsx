import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Real header backdrop debug",
  robots: { index: false, follow: false },
};

export default function RealHeaderBackdropPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="rh-page">
        <section className="rh-section rh-light">
          <div className="rh-wrap">
            <p className="rh-kicker">Real SiteHeader test</p>
            <h1>The actual homepage header is above this pattern.</h1>
            <div className="rh-pattern" aria-hidden>
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i}>REAL HEADER BLUR</span>
              ))}
            </div>
          </div>
        </section>
        <section className="rh-section rh-dark">
          <div className="rh-wrap">
            <p className="rh-kicker">Dark mode handoff</p>
            <h2>Scroll here and the real header should stay readable.</h2>
            <div className="rh-lines" aria-hidden>
              {Array.from({ length: 34 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <style>{`
        .rh-page {
          min-height: 100vh;
          background: #f5f6fb;
          color: #101320;
        }
        .rh-section {
          min-height: 100vh;
          padding: 110px var(--gutter) 72px;
          overflow: hidden;
        }
        .rh-wrap {
          width: min(1160px, 100%);
          margin: 0 auto;
        }
        .rh-kicker {
          margin: 0 0 18px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--violet);
        }
        .rh-section h1,
        .rh-section h2 {
          margin: 0;
          max-width: 920px;
          font-family: var(--font-display);
          font-size: clamp(54px, 8vw, 112px);
          line-height: .96;
          letter-spacing: -.045em;
        }
        .rh-light {
          background:
            radial-gradient(circle at 24% 24%, rgba(124, 92, 246, .28), transparent 34%),
            radial-gradient(circle at 76% 34%, rgba(46, 197, 232, .34), transparent 38%),
            repeating-linear-gradient(45deg, transparent 0 16px, rgba(124, 92, 246, .16) 16px 18px),
            #f5f6fb;
        }
        .rh-pattern {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          transform: rotate(-4deg);
        }
        .rh-pattern span {
          padding: 24px 18px;
          border-radius: 14px;
          background: rgba(255,255,255,.42);
          border: 1px solid rgba(124,92,246,.28);
          color: rgba(45,30,130,.48);
          font: 800 clamp(24px, 4vw, 52px)/1 var(--font-mono);
          letter-spacing: -.04em;
        }
        .rh-dark {
          color: #fff;
          background:
            radial-gradient(circle at 24% 30%, rgba(124, 92, 246, .54), transparent 34%),
            radial-gradient(circle at 78% 64%, rgba(46, 197, 232, .38), transparent 32%),
            #05060c;
        }
        .rh-lines {
          margin-top: 56px;
          display: grid;
          gap: 12px;
          transform: rotate(-9deg);
        }
        .rh-lines span {
          height: 15px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, #7c5cf6, #2ec5e8, transparent);
          box-shadow: 0 0 28px rgba(46,197,232,.36);
        }
        @media (max-width: 760px) {
          .rh-pattern { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
