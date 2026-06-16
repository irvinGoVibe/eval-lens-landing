import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";

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
            Instead of manually reading, comparing, and rewriting notes for
            every deck, your team gets structured reports, batch-level data,
            and a clear decision trail. This saves reviewer-hours without
            turning the final choice into a black box.
          </p>
       
        </div>
      </div>

      <div className="sd-scroll" id="sd-scroll">
        <div className="sd-sticky">
          <div className="sd-grid">
            <div className="sd-railcol">
              <div className="sd-nav" role="group" aria-label="Switch step">
                <button
                  type="button"
                  id="sd-navUp"
                  className="sd-nav-btn"
                  aria-label="Previous step"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 15l6-6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  id="sd-navDown"
                  className="sd-nav-btn"
                  aria-label="Next step"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            <div className="sd-rail" id="sd-rail">
              <div className="sd-rail-lead">The workflow</div>
              <div className="step" data-step="1">
                <span className="idx">01</span>
                <div className="body">
                  <div className="name">Messy decks</div>
                  <div className="desc">
                    Every team submits a different format, length, and style.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="2">
                <span className="idx">02</span>
                <div className="body">
                  <div className="name">Extract signals</div>
                  <div className="desc">
                    EvalLense reads each deck and pulls the signals that matter.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="3">
                <span className="idx">03</span>
                <div className="body">
                  <div className="name">Standardize reports</div>
                  <div className="desc">
                    Different decks become one consistent report structure.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="4">
                <span className="idx">04</span>
                <div className="body">
                  <div className="name">Compare candidates</div>
                  <div className="desc">
                    Every project, side by side, ranked and comparable.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="5">
                <span className="idx">05</span>
                <div className="body">
                  <div className="name">Open report</div>
                  <div className="desc">
                    See why — score breakdown, evidence, and questions.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="6">
                <span className="idx">06</span>
                <div className="body">
                  <div className="name">Human review</div>
                  <div className="desc">
                    AI prepares the analysis. A person makes the call.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="sd-window" id="sd-window" data-stage="1">
              <div className="sd-chrome">
                <div className="dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="brand">
                  <span className="glyph"></span>EvalLense
                </div>
                <div className="crumb" id="sd-crumb">
                  Batch #A24 · 123 decks
                </div>
                <div className="spacer"></div>
                <div className="pill" id="sd-stagepill">
                  Analyzing
                </div>
              </div>

              <div className="sd-canvas">
                <div className="sd-layer on" id="sd-layerA">
                  <div className="deckfield">
                    <div className="scan-title" id="sd-scanTitle">
                      Scanning 4 of 123 · extracting signals
                    </div>

                    <div className="deck k1">
                      <div className="dname">NovaPay</div>
                      <span className="meta">PDF · 19 slides</span>
                      <div className="bars">
                        <span style={{ width: "90%" }}></span>
                        <span style={{ width: "70%" }}></span>
                        <span style={{ width: "80%" }}></span>
                      </div>
                    </div>
                    <div className="deck k2">
                      <div className="dname">TutorVerse</div>
                      <span className="meta">Keynote · 11 slides</span>
                      <div className="bars">
                        <span style={{ width: "80%" }}></span>
                        <span style={{ width: "55%" }}></span>
                      </div>
                    </div>
                    <div className="deck k3">
                      <div className="dname">LedgerLoop</div>
                      <span className="meta">PDF · 27 slides</span>
                      <div className="bars">
                        <span style={{ width: "85%" }}></span>
                        <span style={{ width: "65%" }}></span>
                        <span style={{ width: "75%" }}></span>
                        <span style={{ width: "50%" }}></span>
                      </div>
                    </div>
                    <div className="deck k4">
                      <div className="dname">Orchestrix AI</div>
                      <span className="meta">Docs · 8 slides</span>
                      <div className="bars">
                        <span style={{ width: "60%" }}></span>
                        <span style={{ width: "80%" }}></span>
                      </div>
                    </div>

                    <div className="beam" id="sd-beam"></div>

                    <span className="tag t1">
                      <span className="d"></span>Problem
                    </span>
                    <span className="tag t2">
                      <span className="d"></span>Market
                    </span>
                    <span className="tag t3">
                      <span className="d"></span>Team
                    </span>
                    <span className="tag t4">
                      <span className="d"></span>Traction
                    </span>
                    <span className="tag t5 warn">
                      <span className="d"></span>Risks
                    </span>
                    <span className="tag t6 warn">
                      <span className="d"></span>Missing evidence
                    </span>
                  </div>

                  <div className="repgrid" id="sd-repgrid">
                    <div className="repcard">
                      <div>
                        <div className="rc-name">NovaPay</div>
                        <div className="rc-tagline">Cross-border payouts for SMBs</div>
                      </div>
                      <div>
                        <div className="rc-score">8.4</div>
                        <div className="rc-conf">High conf.</div>
                      </div>
                      <div className="rc-fields">
                        <span className="f">3 strengths</span>
                        <span className="f">2 risks</span>
                        <span className="f miss">1 missing</span>
                      </div>
                      <div className="rc-status">
                        <span className="status review">
                          <span className="sd"></span>Needs review
                        </span>
                      </div>
                    </div>
                    <div className="repcard">
                      <div>
                        <div className="rc-name">TutorVerse</div>
                        <div className="rc-tagline">AI tutoring marketplace</div>
                      </div>
                      <div>
                        <div className="rc-score">7.8</div>
                        <div className="rc-conf">Med conf.</div>
                      </div>
                      <div className="rc-fields">
                        <span className="f">2 strengths</span>
                        <span className="f">3 risks</span>
                        <span className="f miss">2 missing</span>
                      </div>
                      <div className="rc-status">
                        <span className="status open">
                          <span className="sd"></span>Open report
                        </span>
                      </div>
                    </div>
                    <div className="repcard">
                      <div>
                        <div className="rc-name">LedgerLoop</div>
                        <div className="rc-tagline">Reconciliation for fintechs</div>
                      </div>
                      <div>
                        <div className="rc-score">7.2</div>
                        <div className="rc-conf">High conf.</div>
                      </div>
                      <div className="rc-fields">
                        <span className="f">3 strengths</span>
                        <span className="f">1 risk</span>
                      </div>
                      <div className="rc-status">
                        <span className="status reviewed">
                          <span className="sd"></span>Reviewed
                        </span>
                      </div>
                    </div>
                    <div className="repcard">
                      <div>
                        <div className="rc-name">Orchestrix AI</div>
                        <div className="rc-tagline">Workflow agents for ops</div>
                      </div>
                      <div>
                        <div className="rc-score">6.9</div>
                        <div className="rc-conf">Low conf.</div>
                      </div>
                      <div className="rc-fields">
                        <span className="f">2 strengths</span>
                        <span className="f">2 risks</span>
                        <span className="f miss">3 missing</span>
                      </div>
                      <div className="rc-status">
                        <span className="status miss">
                          <span className="sd"></span>Missing evidence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sd-layer" id="sd-layerB">
                  <div className="sd-dash" id="sd-dash">
                    <div className="table-wrap">
                      <div className="th-bar">
                        <h3>Candidates</h3>
                        <span className="count">Sorted by score · 123 total</span>
                      </div>
                      <table className="tbl">
                        <thead>
                          <tr>
                            <th>Startup</th>
                            <th className="r">Score</th>
                            <th>Confidence</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody id="sd-tbody">
                          <tr className="top sel" data-row="1">
                            <td>
                              <div className="cand">
                                <span
                                  className="av"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#6c4cf1,#2ec5e8)",
                                  }}
                                >
                                  N
                                </span>
                                <div>
                                  <div className="cn">NovaPay</div>
                                  <div className="cs">Cross-border payouts</div>
                                </div>
                              </div>
                            </td>
                            <td className="r">
                              <span className="score">8.4</span>
                            </td>
                            <td>
                              <span className="conf">
                                <span
                                  className="ring"
                                  style={
                                    {
                                      "--v": 86,
                                      "--c": "var(--sd-green)",
                                    } as CSSProperties
                                  }
                                ></span>
                                <span className="cl">High</span>
                              </span>
                            </td>
                            <td>
                              <span className="status review">
                                <span className="sd"></span>Needs review
                              </span>
                            </td>
                          </tr>
                          <tr data-row="2">
                            <td>
                              <div className="cand">
                                <span
                                  className="av"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#7b5cf6,#a99bff)",
                                  }}
                                >
                                  T
                                </span>
                                <div>
                                  <div className="cn">TutorVerse</div>
                                  <div className="cs">AI tutoring marketplace</div>
                                </div>
                              </div>
                            </td>
                            <td className="r">
                              <span className="score">7.8</span>
                            </td>
                            <td>
                              <span className="conf">
                                <span
                                  className="ring"
                                  style={
                                    {
                                      "--v": 58,
                                      "--c": "var(--sd-amber)",
                                    } as CSSProperties
                                  }
                                ></span>
                                <span className="cl">Medium</span>
                              </span>
                            </td>
                            <td>
                              <span className="status open">
                                <span className="sd"></span>Open report
                              </span>
                            </td>
                          </tr>
                          <tr data-row="3">
                            <td>
                              <div className="cand">
                                <span
                                  className="av"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#2ec5e8,#36e0c2)",
                                  }}
                                >
                                  L
                                </span>
                                <div>
                                  <div className="cn">LedgerLoop</div>
                                  <div className="cs">Reconciliation for fintechs</div>
                                </div>
                              </div>
                            </td>
                            <td className="r">
                              <span className="score">7.2</span>
                            </td>
                            <td>
                              <span className="conf">
                                <span
                                  className="ring"
                                  style={
                                    {
                                      "--v": 84,
                                      "--c": "var(--sd-green)",
                                    } as CSSProperties
                                  }
                                ></span>
                                <span className="cl">High</span>
                              </span>
                            </td>
                            <td>
                              <span className="status reviewed">
                                <span className="sd"></span>Reviewed
                              </span>
                            </td>
                          </tr>
                          <tr data-row="4">
                            <td>
                              <div className="cand">
                                <span
                                  className="av"
                                  style={{
                                    background:
                                      "linear-gradient(135deg,#86868b,#b8b8be)",
                                  }}
                                >
                                  O
                                </span>
                                <div>
                                  <div className="cn">Orchestrix AI</div>
                                  <div className="cs">Workflow agents for ops</div>
                                </div>
                              </div>
                            </td>
                            <td className="r">
                              <span className="score">6.9</span>
                            </td>
                            <td>
                              <span className="conf">
                                <span
                                  className="ring"
                                  style={
                                    {
                                      "--v": 34,
                                      "--c": "var(--sd-amber)",
                                    } as CSSProperties
                                  }
                                ></span>
                                <span className="cl">Low</span>
                              </span>
                            </td>
                            <td>
                              <span className="status miss">
                                <span className="sd"></span>Missing evidence
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <aside className="sd-panel">
                      <div className="p-head">
                        <div className="p-top">
                          <div>
                            <div className="p-name">NovaPay</div>
                            <div className="p-tag">Cross-border payouts for SMBs</div>
                          </div>
                          <div className="p-scorewrap">
                            <div className="p-score" id="sd-panelScore">
                              8.4
                            </div>
                            <div className="p-scorel">EvalLense score</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-body">
                        <div className="sect reveal-item" style={{ transitionDelay: ".05s" }}>
                          <h4>Score breakdown</h4>
                          <div className="brk">
                            <div className="row">
                              <span className="k">Problem</span>
                              <span className="bar">
                                <i style={{ "--w": "88%" } as CSSProperties}></i>
                              </span>
                              <span className="n">8.8</span>
                            </div>
                            <div className="row">
                              <span className="k">Market</span>
                              <span className="bar">
                                <i style={{ "--w": "82%" } as CSSProperties}></i>
                              </span>
                              <span className="n">8.2</span>
                            </div>
                            <div className="row">
                              <span className="k">Team</span>
                              <span className="bar">
                                <i style={{ "--w": "90%" } as CSSProperties}></i>
                              </span>
                              <span className="n">9.0</span>
                            </div>
                            <div className="row">
                              <span className="k">Traction</span>
                              <span className="bar">
                                <i style={{ "--w": "74%" } as CSSProperties}></i>
                              </span>
                              <span className="n">7.4</span>
                            </div>
                          </div>
                        </div>

                        <div className="sect reveal-item" style={{ transitionDelay: ".1s" }}>
                          <h4>Strengths</h4>
                          <div className="li good">
                            <span className="mk">✓</span>
                            <span>
                              Live revenue with 14% MoM growth across 3 corridors.
                            </span>
                          </div>
                          <div className="li good">
                            <span className="mk">✓</span>
                            <span>
                              Founders shipped a regulated payments product before.
                            </span>
                          </div>
                        </div>

                        <div className="sect reveal-item" style={{ transitionDelay: ".15s" }}>
                          <h4>Risks</h4>
                          <div className="li risk">
                            <span className="mk">!</span>
                            <span>Licensing path unclear in two target markets.</span>
                          </div>
                          <div className="li risk">
                            <span className="mk">!</span>
                            <span>Single-rail dependency for settlement.</span>
                          </div>
                        </div>

                        <div className="sect reveal-item" style={{ transitionDelay: ".2s" }}>
                          <h4>Missing evidence</h4>
                          <div className="li miss">
                            <span className="mk">?</span>
                            <span>No churn or retention cohort data provided.</span>
                          </div>
                        </div>
                      </div>

                      <div className="decision">
                        <div className="ai-rec">
                          <span className="ai-badge">
                            <span className="g"></span>EvalLense AI
                          </span>
                          <span className="ai-rec-text">
                            Analysis ready · suggests <b>Shortlist</b>
                          </span>
                          <span className="hint">recommendation, not a decision</span>
                        </div>

                        <div className="human-head">
                          <span className="reviewer">
                            <span className="ravatar">IJ</span>
                            <span className="rmeta">
                              <b>Irvin Jang</b>
                              <i>Jury reviewer</i>
                            </span>
                          </span>
                          <span className="dstatus pending" id="sd-dstatus">
                            Pending
                          </span>
                        </div>

                        <div className="seg" id="sd-seg">
                          <button type="button" data-d="review">
                            <span className="sd"></span>Needs review
                          </button>
                          <button type="button" data-d="approved">
                            <span className="sd"></span>Approved
                          </button>
                        </div>

                        <div className="note-wrap" id="sd-noteWrap">
                          <div className="note">
                            <span className="ntext" id="sd-ntext"></span>
                            <span className="cur" id="sd-ncur"></span>
                          </div>
                        </div>

                        <div className="dec-row">
                          <button type="button" className="addnote" id="sd-addnote">
                            ＋ Add note
                          </button>
                          <button type="button" className="save" id="sd-save">
                            Save decision
                          </button>
                        </div>

                        <div className="audit">
                          <span className="ok">✓</span>
                          <span>
                            Decision recorded by <b>Irvin Jang</b> · audit trail #DR-0241
                          </span>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="labels reveal d2">
          <span className="chip">
            <span className="tick"></span>Structured reports
          </span>
          <span className="chip">
            <span className="tick"></span>Comparable criteria
          </span>
          <span className="chip">
            <span className="tick"></span>Live report preview
          </span>
          <span className="chip">
            <span className="tick"></span>Human final decision
          </span>
          <span className="chip">
            <span className="tick"></span>Saved reviewer-hours
          </span>
        </div>
        <div className="sect-cta reveal d2">
          <Button variant="ghost" arrow>
            View live report demo
          </Button>
        </div>
      </div>
    </section>
  );
}
