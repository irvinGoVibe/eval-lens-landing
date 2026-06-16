import { Button } from "@/components/ui/Button";

export function Trust() {
  return (
    <section
      className="band soft"
      id="trust"
      data-screen-label="06 Trusted, Explainable, Human-Controlled"
    >
      <div className="wrap">
        <div className="head reveal">
          <span className="eyebrow">
            <span className="dot"></span>Trust center
          </span>
          <h2 className="title">Trusted, Explainable, Human-Controlled</h2>
          <p className="sub">
            EvalLense combines structured methodology, human final decisions,
            secure deck handling, and real proof signals to make batch startup
            evaluation reliable at scale.
          </p>
          <p className="keymsg">
            Speed is not enough. Batch owners need to trust how every
            evaluation was produced, understand the reasoning, review the
            evidence, and keep the final decision under human control.
          </p>
        </div>

        <div className="trust-grid">
          <div className="tcard big reveal" data-od-id="trust-methodology">
            <span className="mini-tag">Core mechanism</span>
            <div className="ic">⚖︎</div>
            <div>
              <h3>Methodology</h3>
              <p>
                Every deck is scored against the same documented criteria.
                Transparent rubric, evidence-linked, reproducible across the
                whole batch.
              </p>
            </div>
            <div className="demo" data-media="interactive">
              <div className="lens">
                <span className="core"></span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontFamily: "var(--font-text)",
                }}
              >
                rubric → evidence → score
              </span>
            </div>
            <a className="lnk" href="#">
              Read methodology <span className="arr">→</span>
            </a>
          </div>

          <div className="tcard big reveal d1" data-od-id="trust-human">
            <span className="mini-tag">Core mechanism</span>
            <div className="ic">✋</div>
            <div>
              <h3>Human-in-the-loop</h3>
              <p>
                EvalLense structures and ranks — people decide. Reviewers
                approve, adjust, override, and document every final call with a
                clear audit trail.
              </p>
            </div>
            <div className="demo" data-media="animation">
              <div className="lens">
                <span className="core"></span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  fontFamily: "var(--font-text)",
                }}
              >
                AI structures · human approves
              </span>
            </div>
            <a className="lnk" href="#">
              See human review <span className="arr">→</span>
            </a>
          </div>

          <div className="tcard reveal d2">
            <div className="ic">★</div>
            <h3 style={{ fontSize: 18 }}>Testimonials</h3>
            <p>
              Who works with us — funds, accelerators, and competitions running
              batches on EvalLense.
            </p>
            <a className="lnk" href="#">
              View cases <span className="arr">→</span>
            </a>
          </div>
          <div className="tcard reveal d2">
            <div className="ic">🔒</div>
            <h3 style={{ fontSize: 18 }}>Security &amp; Privacy</h3>
            <p>
              Encrypted deck handling, scoped access, and clear data ownership
              for every batch.
            </p>
            <a className="lnk" href="#">
              View security <span className="arr">→</span>
            </a>
          </div>
          <div className="tcard reveal d3">
            <div className="ic">🛡︎</div>
            <h3 style={{ fontSize: 18 }}>Prompt Injection Safety</h3>
            <p>
              Decks are treated as untrusted input; instructions hidden inside
              a deck can&apos;t hijack scoring.
            </p>
            <a className="lnk" href="#">
              Read safety notes <span className="arr">→</span>
            </a>
          </div>
          <div
            className="tcard reveal d3"
            style={{ gridColumn: "span 2" }}
          >
            <div className="ic">✎</div>
            <h3 style={{ fontSize: 18 }}>Blog · Research · Case Studies</h3>
            <p>
              How we evaluate, what the data shows, and lessons from real batch
              programs.
            </p>
            <a className="lnk" href="#">
              Explore research <span className="arr">→</span>
            </a>
          </div>
        </div>

        <div className="labels reveal d2" style={{ marginTop: 30 }}>
          <span className="chip"><span className="tick"></span>Structured methodology</span>
          <span className="chip"><span className="tick"></span>Human final decision</span>
          <span className="chip"><span className="tick"></span>Secure deck handling</span>
          <span className="chip"><span className="tick"></span>Prompt injection safety</span>
          <span className="chip"><span className="tick"></span>Real feedback</span>
          <span className="chip"><span className="tick"></span>Research-backed</span>
        </div>
        <div className="sect-cta reveal d2">
          <Button variant="dark" arrow>
            Explore trust center
          </Button>
        </div>
      </div>
    </section>
  );
}
