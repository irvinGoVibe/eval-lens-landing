export function Decisions() {
  return (
    <section
      className="band soft"
      id="decisions"
      data-screen-label="04 From messy decks to faster decisions"
    >
      <div className="wrap">
        <div className="head reveal">
          <span className="eyebrow">
            <span className="dot"></span>Structured reports
          </span>
          <h2 className="title">From messy decks to faster decisions</h2>
          <p className="sub">
            EvalLense turns different pitch decks into clear, comparable reports
            — so your team can review projects faster, focus on what matters,
            and keep the final decision in human hands.
          </p>
          <p className="keymsg">
            Instead of manually reading, comparing, and rewriting notes for
            every deck, your team gets structured reports, batch-level data,
            and a clear decision trail. This saves reviewer-hours without
            turning the final choice into a black box.
          </p>
        </div>

        <div
          className="stage reveal d1"
          data-media="interactive"
          data-od-id="report-stage"
        >
          <span className="media-tag">
            <span className="rec"></span>Interactive live report demo
          </span>
          <span className="play">
            <span className="tri"></span>Open live
          </span>
          <div className="stage-pad">
            <div className="report-flow">
              <div className="messy" aria-hidden="true">
                <div className="deck"><i className="t"></i><i></i><i></i><i></i></div>
                <div className="deck"><i className="t"></i><i></i><i></i></div>
                <div className="deck"><i className="t"></i><i></i><i></i><i></i></div>
                <div className="deck"><i className="t"></i><i></i><i></i><i></i></div>
                <span className="lbl">mixed formats in</span>
              </div>
              <div className="lens">
                <span className="core"></span>
              </div>
              <div className="reports">
                <div className="rep">
                  <div className="top">
                    <span className="nm"><span className="av"></span>Aurora Labs</span>
                    <span className="score">94</span>
                  </div>
                  <div className="grid">
                    <div><span className="pip good"></span><b>Strengths:</b>&nbsp;traction, team</div>
                    <div><span className="pip warn"></span><b>Risks:</b>&nbsp;burn rate</div>
                    <div><span className="pip gap"></span><b>Missing:</b>&nbsp;LOIs</div>
                    <div><span className="pip conf"></span><b>Confidence:</b>&nbsp;High</div>
                  </div>
                  <div className="status">
                    <span className="pill short">● Shortlisted</span>
                    <span className="open">Open report →</span>
                  </div>
                </div>
                <div className="rep">
                  <div className="top">
                    <span className="nm"><span className="av"></span>Northwind AI</span>
                    <span className="score">88</span>
                  </div>
                  <div className="grid">
                    <div><span className="pip good"></span><b>Strengths:</b>&nbsp;market, moat</div>
                    <div><span className="pip warn"></span><b>Risks:</b>&nbsp;GTM</div>
                    <div><span className="pip gap"></span><b>Missing:</b>&nbsp;metrics</div>
                    <div><span className="pip conf"></span><b>Confidence:</b>&nbsp;Med</div>
                  </div>
                  <div className="status">
                    <span className="pill review">● In review</span>
                    <span className="open">Open report →</span>
                  </div>
                </div>
                <div className="rep">
                  <div className="top">
                    <span className="nm"><span className="av"></span>Quanta Bio</span>
                    <span className="score">81</span>
                  </div>
                  <div className="grid">
                    <div><span className="pip good"></span><b>Strengths:</b>&nbsp;science</div>
                    <div><span className="pip warn"></span><b>Risks:</b>&nbsp;regulatory</div>
                    <div><span className="pip gap"></span><b>Missing:</b>&nbsp;revenue</div>
                    <div><span className="pip conf"></span><b>Confidence:</b>&nbsp;Med</div>
                  </div>
                  <div className="status">
                    <span className="pill hold">● On hold</span>
                    <span className="open">Open report →</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="caption">
              <span className="ic">◆</span>
              <span>
                <b>Composition —</b> left: messy decks in different formats →
                center: the EvalLense structuring lens → right: standardized
                report cards (score, strengths, risks, missing evidence,
                confidence, reviewer status). Every card opens into a live
                report; humans approve, adjust, and document the decision.
              </span>
            </div>
          </div>
        </div>

        <div className="labels reveal d2">
          <span className="chip"><span className="tick"></span>Structured reports</span>
          <span className="chip"><span className="tick"></span>Comparable criteria</span>
          <span className="chip"><span className="tick"></span>Live report preview</span>
          <span className="chip"><span className="tick"></span>Human final decision</span>
          <span className="chip"><span className="tick"></span>Saved reviewer-hours</span>
        </div>
        <div className="sect-cta reveal d2">
          <button className="btn btn-ghost">
            View live report demo&nbsp;<span className="arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
