export const metadata = {
  title: "Chrome backdrop-filter debug",
  robots: { index: false, follow: false },
};

const navItems = ["Light", "Image", "Dark", "Text"];

export default function BackdropFilterDebugPage() {
  return (
    <main className="bf-page">
      <header className="bf-header" id="bf-header">
        <div className="bf-header__inner">
          <a className="bf-brand" href="/">
            <span aria-hidden className="bf-mark" />
            EvalLense
          </a>
          <nav className="bf-nav" aria-label="Backdrop debug sections">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>
          <a className="bf-cta" href="#debug">
            Inspect
            <span aria-hidden>→</span>
          </a>
        </div>
      </header>

      <section id="light" className="bf-section bf-section--light" data-header-theme="light">
        <div className="bf-wrap bf-hero">
          <p className="bf-kicker">Chrome backdrop-filter test</p>
          <h1>Scroll this page under the fixed glass header.</h1>
          <p className="bf-lead">
            The diagonal pattern, large letters, and color blocks should smear
            underneath the header. If they stay sharp in Chrome, backdrop-filter
            is not being applied.
          </p>
          <div className="bf-stripes" aria-hidden>
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i}>BLUR TEST</span>
            ))}
          </div>
        </div>
      </section>

      <section id="image" className="bf-section bf-section--image" data-header-theme="light">
        <div className="bf-wrap bf-grid">
          <article>
            <p className="bf-kicker">Image-like backdrop</p>
            <h2>High contrast gradients and fine detail.</h2>
            <p>
              This block simulates an image behind the header: saturated color,
              hard edges, tiny labels, and repeated shapes.
            </p>
          </article>
          <div className="bf-photo" aria-hidden>
            <span>01</span>
            <span>Deck signal</span>
          </div>
          <div className="bf-photo bf-photo--cyan" aria-hidden>
            <span>02</span>
            <span>Evidence map</span>
          </div>
        </div>
      </section>

      <section id="dark" className="bf-section bf-section--dark" data-header-theme="dark">
        <div className="bf-wrap bf-grid">
          <article>
            <p className="bf-kicker">Dark section</p>
            <h2>White text and neon lines should blur through the bar.</h2>
            <p>
              The header uses the same CSS property on every section. Only the
              content beneath it changes.
            </p>
          </article>
          <div className="bf-lines" aria-hidden>
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="text" className="bf-section bf-section--text" data-header-theme="light">
        <div className="bf-wrap">
          <p className="bf-kicker">Text sharpness test</p>
          <div className="bf-typewall" aria-hidden>
            BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER
            BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER
            BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER
            BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER BACKDROP FILTER
          </div>
        </div>
      </section>

      <section id="debug" className="bf-section bf-section--debug" data-header-theme="light">
        <div className="bf-wrap bf-debug">
          <h2>What to check in DevTools</h2>
          <p>
            Select <code>.bf-header::before</code>. Computed styles should show
            <code>backdrop-filter: saturate(220%) blur(36px)</code> and
            <code>-webkit-backdrop-filter</code> with the same value.
          </p>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const header = document.getElementById("bf-header");
              if (!header) return;

              const sync = () => {
                const rect = header.getBoundingClientRect();
                const x = Math.round(window.innerWidth / 2);
                const y = Math.max(1, Math.round(rect.bottom - 2));
                const section = document
                  .elementsFromPoint(x, y)
                  .find((el) => el instanceof HTMLElement && el.classList.contains("bf-section"));
                const dark = section instanceof HTMLElement && section.dataset.headerTheme === "dark";
                header.classList.toggle("bf-header--dark", dark);
              };

              sync();
              window.addEventListener("scroll", sync, { passive: true });
              window.addEventListener("resize", sync);
            })();
          `,
        }}
      />

      <style>{`
        .bf-page {
          min-height: 100vh;
          color: #111320;
          background: #f5f6fb;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .bf-header {
          position: fixed;
          inset: 0 0 auto;
          z-index: 1000;
          height: 72px;
          isolation: isolate;
        }
        .bf-header::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          background: rgba(255, 255, 255, 0.34);
          backdrop-filter: saturate(220%) blur(36px);
          -webkit-backdrop-filter: saturate(220%) blur(36px);
          border-bottom: 1px solid rgba(55, 55, 80, 0.18);
          box-shadow: 0 18px 55px rgba(80, 70, 130, 0.16);
          transition: background-color 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
        }
        .bf-header--dark::before {
          background: rgba(5, 6, 12, 0.48);
          border-bottom-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.22);
        }
        .bf-header__inner {
          position: relative;
          z-index: 1;
          max-width: 1160px;
          height: 100%;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .bf-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: #111320;
          text-decoration: none;
          white-space: nowrap;
          transition: color 240ms ease;
        }
        .bf-mark {
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7c5cf6, #28d7ff 55%, #8cffc8);
          box-shadow: 0 0 22px rgba(124, 92, 246, 0.55);
        }
        .bf-nav {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-left: auto;
        }
        .bf-nav a,
        .bf-cta {
          font: 600 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(28, 31, 48, 0.74);
          text-decoration: none;
          transition: color 240ms ease, background 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
        }
        .bf-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: white;
          padding: 12px 18px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7c5cf6, #2f7cff);
          box-shadow: 0 16px 35px rgba(90, 80, 230, 0.28);
        }
        .bf-header--dark .bf-brand {
          color: #fff;
        }
        .bf-header--dark .bf-nav a {
          color: rgba(236, 234, 255, 0.72);
        }
        .bf-header--dark .bf-cta {
          color: #fff;
          background: rgba(124, 92, 246, 0.24);
          border: 1px solid rgba(226, 218, 255, 0.38);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.2);
        }
        .bf-section {
          min-height: 100vh;
          padding: 124px 28px 72px;
          position: relative;
          overflow: hidden;
        }
        .bf-wrap {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
        }
        .bf-kicker {
          margin: 0 0 18px;
          font: 600 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7455f4;
        }
        .bf-hero h1,
        .bf-grid h2,
        .bf-debug h2 {
          margin: 0;
          max-width: 820px;
          font-size: clamp(48px, 8vw, 112px);
          line-height: 0.96;
          letter-spacing: -0.045em;
        }
        .bf-lead,
        .bf-grid p,
        .bf-debug p {
          margin: 24px 0 0;
          max-width: 680px;
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.45;
          color: rgba(28, 31, 48, 0.68);
        }
        .bf-section--light {
          background:
            radial-gradient(circle at 18% 24%, rgba(124, 92, 246, 0.28), transparent 36%),
            radial-gradient(circle at 78% 34%, rgba(46, 197, 232, 0.32), transparent 38%),
            repeating-linear-gradient(45deg, transparent 0 18px, rgba(124, 92, 246, 0.13) 18px 20px),
            #f4f5fb;
        }
        .bf-stripes {
          margin-top: 64px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          transform: rotate(-4deg);
        }
        .bf-stripes span {
          display: block;
          padding: 26px 18px;
          border-radius: 14px;
          font: 800 clamp(28px, 4vw, 54px)/1 ui-monospace, monospace;
          letter-spacing: -0.04em;
          color: rgba(45, 30, 130, 0.46);
          background: rgba(255, 255, 255, 0.38);
          border: 1px solid rgba(124, 92, 246, 0.26);
        }
        .bf-section--image {
          background:
            linear-gradient(120deg, rgba(255,255,255,.92), rgba(243,247,255,.72)),
            repeating-linear-gradient(90deg, rgba(25, 30, 50, .08) 0 2px, transparent 2px 38px);
        }
        .bf-grid {
          display: grid;
          grid-template-columns: 0.85fr 1fr;
          gap: 28px;
          align-items: center;
        }
        .bf-grid article {
          grid-row: span 2;
        }
        .bf-photo {
          min-height: 300px;
          border-radius: 28px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: white;
          background:
            radial-gradient(circle at 22% 22%, rgba(255,255,255,.9), transparent 15%),
            radial-gradient(circle at 70% 34%, rgba(46, 197, 232, .95), transparent 24%),
            radial-gradient(circle at 42% 70%, rgba(124, 92, 246, .9), transparent 30%),
            linear-gradient(135deg, #130b34, #2761ff 55%, #00d8ff);
          box-shadow: 0 42px 80px rgba(28, 44, 130, 0.25);
        }
        .bf-photo--cyan {
          background:
            repeating-linear-gradient(135deg, rgba(255,255,255,.32) 0 4px, transparent 4px 16px),
            radial-gradient(circle at 66% 44%, #70ffe6, transparent 24%),
            linear-gradient(135deg, #081328, #2ec5e8 58%, #8cffc8);
        }
        .bf-photo span:first-child {
          font: 800 96px/0.8 ui-monospace, monospace;
          opacity: 0.74;
        }
        .bf-photo span:last-child {
          font: 700 13px/1 ui-monospace, monospace;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .bf-section--dark {
          color: white;
          background:
            radial-gradient(circle at 25% 30%, rgba(124, 92, 246, 0.52), transparent 34%),
            radial-gradient(circle at 75% 62%, rgba(46, 197, 232, 0.36), transparent 32%),
            #05060c;
        }
        .bf-section--dark .bf-grid p {
          color: rgba(255,255,255,.68);
        }
        .bf-lines {
          min-height: 600px;
          display: grid;
          gap: 12px;
          transform: rotate(-10deg);
        }
        .bf-lines span {
          height: 15px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, #7c5cf6, #2ec5e8, transparent);
          box-shadow: 0 0 28px rgba(46, 197, 232, .36);
        }
        .bf-section--text {
          background: #fff;
        }
        .bf-typewall {
          font: 900 clamp(60px, 12vw, 170px)/0.88 ui-sans-serif, system-ui, sans-serif;
          letter-spacing: -0.08em;
          color: rgba(17, 19, 32, 0.16);
          max-width: 1100px;
        }
        .bf-section--debug {
          min-height: 60vh;
          background:
            repeating-linear-gradient(45deg, rgba(124, 92, 246, .12) 0 1px, transparent 1px 18px),
            #f3f4fa;
        }
        .bf-debug {
          padding: 42px;
          border-radius: 28px;
          background: rgba(255,255,255,.6);
          border: 1px solid rgba(30, 30, 60, .12);
        }
        code {
          padding: 2px 7px;
          border-radius: 6px;
          background: rgba(124, 92, 246, .12);
          color: #4c35c7;
        }
        @media (max-width: 760px) {
          .bf-nav { display: none; }
          .bf-header__inner { padding: 0 18px; }
          .bf-grid { grid-template-columns: 1fr; }
          .bf-grid article { grid-row: auto; }
          .bf-stripes { grid-template-columns: 1fr; }
          .bf-cta { padding: 10px 13px; }
        }
      `}</style>
    </main>
  );
}
