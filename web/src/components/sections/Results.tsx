import { Button } from "@/components/ui/Button";

export function Results() {
  return (
    <section
      className="band"
      id="results"
      data-screen-label="05 Select the best. Help every team improve."
    >
      <div className="wrap">
        <div className="head reveal">
          <span className="eyebrow">
            <span className="dot"></span>Two outcomes, one batch
          </span>
          <h2 className="title">Select the best. Help every team improve.</h2>
          <p className="sub">
            EvalLense gives batch owners a private decision dashboard and
            structured reports for every participant — so you can choose
            stronger candidates and give every team useful feedback.
          </p>
          <p className="keymsg">
            The batch owner gets more than a shortlist. They get a way to raise
            the quality of the whole applicant pool: every founder receives
            clear feedback, understands what&apos;s missing, and can improve
            before coming back stronger.
          </p>
        </div>

        <div
          className="stage reveal d1"
          data-media="animation"
          data-od-id="results-stage"
        >
          <span className="media-tag">
            <span className="rec"></span>Scroll animation · split output
          </span>
          <span className="play">
            <span className="tri"></span>Preview
          </span>
          <div className="stage-pad">
            <div className="two-out">
              <div className="panel">
                <h4>
                  <span className="tag">Private</span> Owner decision dashboard
                </h4>
                <div className="dash-row">
                  <span className="n">01</span>
                  <span className="nm">Aurora Labs · 94</span>
                  <span className="ctrl">
                    <span className="c y">✓</span>
                    <span className="c n">↺</span>
                  </span>
                </div>
                <div className="dash-row">
                  <span className="n">02</span>
                  <span className="nm">Northwind AI · 88</span>
                  <span className="ctrl">
                    <span className="c y">✓</span>
                    <span className="c n">↺</span>
                  </span>
                </div>
                <div className="dash-row">
                  <span className="n">03</span>
                  <span className="nm">Quanta Bio · 81</span>
                  <span className="ctrl">
                    <span className="c n">✓</span>
                    <span className="c n">↺</span>
                  </span>
                </div>
                <div className="dash-row">
                  <span className="n">04</span>
                  <span className="nm">Vela Robotics · 77</span>
                  <span className="ctrl">
                    <span className="c n">✓</span>
                    <span className="c n">↺</span>
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--muted)",
                    marginTop: 4,
                    fontFamily: "var(--font-text)",
                  }}
                >
                  ranked · review status · human controls
                </div>
              </div>

              <div className="center-lens" aria-hidden="true">
                <div className="lens">
                  <span className="core"></span>
                </div>
                <span className="cap">one batch review</span>
              </div>

              <div className="panel">
                <h4>
                  <span className="tag">Shared</span> Participant feedback report
                </h4>
                <div className="fb-block">
                  <div className="h">
                    <span className="pip good" style={{ background: "var(--aqua)" }}></span>
                    Strengths
                  </div>
                  <p>Clear traction story, credible founding team, strong wedge.</p>
                </div>
                <div className="fb-block">
                  <div className="h">
                    <span className="pip" style={{ background: "#f0a93a" }}></span>
                    Weaknesses &amp; risks
                  </div>
                  <p>Burn rate vs. runway unclear; competitive moat under-argued.</p>
                </div>
                <div className="fb-block">
                  <div className="h">
                    <span className="pip" style={{ background: "var(--lavender)" }}></span>
                    Missing evidence
                  </div>
                  <p>No signed LOIs or retention cohort data attached.</p>
                </div>
                <div className="fb-block">
                  <div className="h">
                    <span className="pip" style={{ background: "var(--cyan)" }}></span>
                    Next steps
                  </div>
                  <p>Add 2 customer LOIs and a 6-month retention chart, then resubmit.</p>
                </div>
              </div>
            </div>

            <div className="loop reveal d2">
              <span className="node">Batch review</span>
              <span className="lk">→</span>
              <span className="node">Owner decision</span>
              <span className="lk">→</span>
              <span className="node">Participant feedback</span>
              <span className="lk">→</span>
              <span className="node">Better future submissions</span>
              <span className="lk">↻</span>
            </div>
            <div className="caption">
              <span className="ic">◆</span>
              <span>
                <b>Composition —</b> center lens = one batch review; left =
                private owner dashboard (ranked candidates, review status,
                human decision controls); right = participant feedback report
                (strengths, gaps, missing evidence, next steps). The loop shows
                pool quality compounding over time.
              </span>
            </div>
          </div>
        </div>

        <div className="labels reveal d2">
          <span className="chip"><span className="tick"></span>Private shortlist</span>
          <span className="chip"><span className="tick"></span>Founder feedback</span>
          <span className="chip"><span className="tick"></span>Better applications</span>
          <span className="chip"><span className="tick"></span>Human decision</span>
          <span className="chip"><span className="tick"></span>Reusable reports</span>
        </div>
        <div className="sect-cta reveal d2">
          <Button variant="ghost" arrow>
            View sample feedback
          </Button>
        </div>
      </div>
    </section>
  );
}
