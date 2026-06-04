import type { CSSProperties } from "react";

type BarStyle = CSSProperties & { "--w"?: string };

const files = [
  { cls: "f1 lg", tag: "Pitch deck · 001", nm: "Aurora Labs" },
  { cls: "f2 sm", tag: "Pitch deck · 023", nm: "Northwind AI" },
  { cls: "f3", tag: "Pitch deck · 067", nm: "Quanta Bio" },
  { cls: "f4 sm", tag: "Pitch deck · 094", nm: "Vela Robotics" },
  { cls: "f5 sm", tag: "Pitch deck · 123", nm: "Helio Sense" },
  { cls: "f6", tag: "Pitch deck · 041", nm: "Stark IO" },
  { cls: "f7 sm", tag: "Pitch deck · 058", nm: "Prism Health" },
  { cls: "f8 lg", tag: "Pitch deck · 076", nm: "Novalink" },
  { cls: "f9", tag: "Pitch deck · 112", nm: "Cipher Grid" },
  { cls: "f10 sm", tag: "Pitch deck · 089", nm: "Bloom AI" },
];

const cells = [
  { cls: "c1", n: "01", nm: "Aurora Labs", w: ".94", sc: "94" },
  { cls: "c2", n: "02", nm: "Northwind AI", w: ".88", sc: "88" },
  { cls: "c3", n: "03", nm: "Quanta Bio", w: ".81", sc: "81" },
];

export function Problem() {
  return (
    <section
      className="scroll-scrub"
      id="problem"
      data-screen-label="02 Find the leaders hidden in your pitch deck flow"
      data-od-id="problem-stage"
    >
      <div className="scrub-lead" aria-hidden="true"></div>
      <div className="scrub-track">
        <div className="scrub-pin">
          <div className="scrub-heading-slot" aria-hidden="true"></div>
          <div className="scrub-heading">
            <h2 className="scrub-title">
              <span className="epic-line l1">Find the leaders</span>
              <span className="epic-line l2">
                <span className="grad">hidden in your flow</span>.
              </span>
            </h2>
            <p className="scrub-sub">
              EvalLense batch-analyzes every deck, compares applications in one
              format, and brings the strongest candidates to the top.
            </p>
          </div>

          <div className="scrub-stage-area">
            <div className="scrub-fallback" aria-hidden="true"></div>
            {/* No autoPlay: this video is purely scrubbed by scroll position
                via ScrollOrchestrator. Autoplay would fight the seek-back
                logic and make scrolling up feel like it doesn't rewind. */}
            <video
              className="scrub-video"
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              poster="/assets/section2-scroll-2-poster.jpg"
            >
              <source src="/assets/section2-scroll-2.mp4" type="video/mp4" />
            </video>
            <div className="scrub-veil" aria-hidden="true"></div>

            <div className="scrub-scene" aria-hidden="true">
              <div className="scrub-files">
                {files.map((f) => (
                  <div key={f.cls} className={`scrub-file ${f.cls}`}>
                    <span className="tag">{f.tag}</span>
                    <span className="nm">
                      <span className="av"></span>
                      {f.nm}
                    </span>
                    <span className="lines">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                  </div>
                ))}
              </div>

              <div className="scrub-cells">
                {cells.map((c) => (
                  <div key={c.cls} className={`scrub-cell ${c.cls}`}>
                    <span className="n">{c.n}</span>
                    <span className="nm">{c.nm}</span>
                    <span className="bar">
                      <i style={{ "--w": c.w } as BarStyle}></i>
                    </span>
                    <span className="sc">{c.sc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="scrub-bottom-fade" aria-hidden="true"></div>
          </div>
        </div>
      </div>
      <div className="scrub-tail" aria-hidden="true"></div>
    </section>
  );
}
