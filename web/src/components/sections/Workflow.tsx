export function Workflow() {
  return (
    <section
      id="workflow"
      data-screen-label="03 Launch your entry point"
      data-od-id="entry-stage"
    >
      <div className="workflow-heading-pin">
        <div className="workflow-heading">
          <h2 className="title">
            <span className="epic-line l1">Launch your</span>
            <span className="epic-line l2">
              <span className="grad">entry point</span>.
            </span>
          </h2>
          <p className="workflow-sub">
            Create one place where teams submit their pitch decks. EvalLense
            collects every application, organizes the full batch, and lets you
            run evaluation when you&apos;re ready.
          </p>
        </div>
      </div>
      <div className="workflow-heading-slot" aria-hidden="true"></div>
      <div className="wf-scroll" id="wf-scroll">
        <div className="wf-sticky">
          <div className="wf-grid">
            <div className="wf-railcol">
              <div className="wf-nav" role="group" aria-label="Switch workflow step">
                <button
                  type="button"
                  id="wf-navUp"
                  className="wf-nav-btn"
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
                  id="wf-navDown"
                  className="wf-nav-btn"
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
            <div className="wf-rail" id="wf-rail">
              <div className="step" data-step="1">
                <span className="idx">01</span>
                <div className="body">
                  <div className="name">Create entry point</div>
                  <div className="desc">
                    Set up your submission page: name, required materials, deadline.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="2">
                <span className="idx">02</span>
                <div className="body">
                  <div className="name">Share submission link</div>
                  <div className="desc">Share one public link with every team.</div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="3">
                <span className="idx">03</span>
                <div className="body">
                  <div className="name">Teams upload pitch decks</div>
                  <div className="desc">
                    Teams submit decks themselves. No inbox digging.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="4">
                <span className="idx">04</span>
                <div className="body">
                  <div className="name">Applications collected</div>
                  <div className="desc">Every submission lands in one hub.</div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="5">
                <span className="idx">05</span>
                <div className="body">
                  <div className="name">Batch ready</div>
                  <div className="desc">Counters confirm which applications are ready.</div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="step" data-step="6">
                <span className="idx">06</span>
                <div className="body">
                  <div className="name">Run evaluation</div>
                  <div className="desc">
                    Launch analysis. Ready applications enter the pipeline.
                  </div>
                  <div className="track">
                    <i></i>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="wf-window" id="wf-window" data-stage="1">
              <div className="chrome">
                <div className="dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="brand">
                  <span className="glyph"></span>EvalLense
                </div>
                <div className="crumb" id="wf-crumb">
                  New entry point
                </div>
                <div className="spacer"></div>
                <div className="pill" id="wf-stagepill">
                  Setup
                </div>
              </div>

              <div className="canvas">
                <div className="layer on" id="wf-layerA">
                  <div className="a-stack">
                    <div className="wf-entrycard">
                    <div className="setup-card" id="wf-setupCard">
                      <div className="sc-head">
                        <span className="sc-title">New entry point</span>
                        <span className="sc-summary" id="wf-scSummary">
                          TechStars Demo Day &rsquo;26 · 3 materials · closes Mar 14, 2026
                        </span>
                      </div>
                      <div className="field">
                        <label>Project name</label>
                        <div className="input">
                          <span id="wf-evName"></span>
                          <span className="cur" id="wf-evCur"></span>
                        </div>
                      </div>
                      <div className="field">
                        <label>Required materials</label>
                        <div className="chips">
                          <span className="mchip" data-i="0">
                            <span className="bx">✓</span>Pitch deck (PDF)
                          </span>
                          <span className="mchip" data-i="1">
                            <span className="bx">✓</span>Repository{" "}
                            <span className="opt">OPT</span>
                          </span>
                          <span className="mchip" data-i="2">
                            <span className="bx">✓</span>Demo video{" "}
                            <span className="opt">OPT</span>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label>Submission deadline</label>
                        <div className="input">
                          <span id="wf-evDate" className="muted">
                            Select date…
                          </span>
                        </div>
                      </div>
                      <button type="button" className="create-btn" id="wf-createBtn">
                        Create entry point
                      </button>
                    </div>

                    <div className="link-card" id="wf-linkCard">
                      <div className="lc-top">
                        <span className="live">
                          <i></i>Live
                        </span>
                        <span className="lc-label">Public submission link</span>
                      </div>
                      <div className="lc-url">
                        <span className="url">evallense.app/s/techstars-demo-26</span>
                        <button type="button" className="copy" id="wf-copyBtn">
                          Copy link
                        </button>
                      </div>
                      <p className="lc-hint">
                        Share this link with teams — they upload their pitch decks directly.
                      </p>
                    </div>
                    </div>

                    <div className="preview-card" id="wf-previewCard">
                      <div className="pv-bar">
                        <span className="pvdots">
                          <i></i>
                          <i></i>
                          <i></i>
                        </span>
                        <span className="pv-url">evallense.app/s/techstars-demo-26</span>
                        <span className="pv-live">
                          <i></i>Live
                        </span>
                      </div>
                      <div className="pv-body">
                        <div className="pv-hero">
                          <div className="pv-event">
                            TechStars Demo Day <span className="grad">&rsquo;26</span>
                          </div>
                          <div className="pv-tag">
                            Submit your pitch deck for AI evaluation. The organizer makes the
                            final call.
                          </div>
                        </div>
                        <div className="pv-time">
                          <div className="pv-tcell">
                            <div className="l">Start</div>
                            <div className="d">Mar 1</div>
                          </div>
                          <div className="pv-tcell dl">
                            <div className="l">Deadline</div>
                            <div className="d">Mar 14</div>
                          </div>
                          <div className="pv-tcell">
                            <div className="l">Results</div>
                            <div className="d">Mar 20</div>
                          </div>
                        </div>
                        <div className="pv-req">
                          <div className="pv-ph">Required information</div>
                          <div className="pv-grid">
                            <div className="pv-f">
                              <span className="fn">Full name</span>
                              <span className="rq">Required</span>
                            </div>
                            <div className="pv-f">
                              <span className="fn">Email address</span>
                              <span className="rq">Required</span>
                            </div>
                            <div className="pv-f">
                              <span className="fn">Project title</span>
                              <span className="rq">Required</span>
                            </div>
                            <div className="pv-f">
                              <span className="fn">Pitch deck · PDF / Slides</span>
                              <span className="op">Optional</span>
                            </div>
                            <div className="pv-f">
                              <span className="fn">Short description</span>
                              <span className="op">Optional</span>
                            </div>
                            <div className="pv-f">
                              <span className="fn">Comment for jury</span>
                              <span className="op">Optional</span>
                            </div>
                          </div>
                        </div>
                        <div className="pv-cta">
                          <span className="lbl">
                            Submissions close in <b>12 days</b> · Powered by EvalLense
                          </span>
                          <button type="button" className="pv-submit">
                            Submit your entry
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path
                                d="M3 8h9M8.5 4l4 4-4 4"
                                stroke="#fff"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="layer" id="wf-layerB">
                  <div className="upload-page">
                    <div className="up-head">
                      <span className="up-host">
                        <span className="glyph"></span>TechStars Demo Day &rsquo;26
                      </span>
                      <span className="up-deadline">Closes Mar 14</span>
                    </div>
                    <div className="dropzone">
                      <span className="dz-ic">↑</span>Drag your pitch deck here · PDF up to 25 MB
                    </div>
                    <div className="up-list" id="wf-upList">
                      <div className="up-item">
                        <span className="fic">PDF</span>
                        <span className="fn">NovaPay.pdf</span>
                        <span className="fs">4.2 MB</span>
                        <span className="ok">✓</span>
                      </div>
                      <div className="up-item">
                        <span className="fic">PDF</span>
                        <span className="fn">TutorVerse.pdf</span>
                        <span className="fs">6.1 MB</span>
                        <span className="ok">✓</span>
                      </div>
                      <div className="up-item">
                        <span className="fic">PDF</span>
                        <span className="fn">LedgerLoop.pdf</span>
                        <span className="fs">3.4 MB</span>
                        <span className="ok">✓</span>
                      </div>
                      <div className="up-item">
                        <span className="fic">PDF</span>
                        <span className="fn">Orchestrix-AI.pdf</span>
                        <span className="bar">
                          <i id="wf-upProg"></i>
                        </span>
                      </div>
                    </div>
                    <div className="up-counter" id="wf-upCounter">
                      0 teams submitted
                    </div>
                  </div>
                </div>

                <div className="layer" id="wf-layerC">
                  <div className="hub">
                    <div className="hub-head">
                      <h3>Application hub</h3>
                    </div>

                    <div className="counters">
                      <div className="counter">
                        <div className="cv" id="wf-cCollected">
                          0
                        </div>
                        <div className="cl">Applications collected</div>
                      </div>
                      <div className="counter">
                        <div className="cv" id="wf-cReady">
                          0
                        </div>
                        <div className="cl">Ready for evaluation</div>
                      </div>
                      <div className="counter warn">
                        <div className="cv" id="wf-cMissing">
                          0
                        </div>
                        <div className="cl">Missing materials</div>
                      </div>
                    </div>

                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>Team</th>
                          <th>Materials</th>
                          <th>Submitted</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody id="wf-tbody">
                        <tr data-row="1">
                          <td>
                            <div className="team">
                              <span
                                className="av"
                                style={{
                                  background: "linear-gradient(135deg,#6c4cf1,#2ec5e8)",
                                }}
                              >
                                N
                              </span>
                              <span className="tn">NovaPay</span>
                            </div>
                          </td>
                          <td className="mats">PDF · repo · video</td>
                          <td className="subm">2h ago</td>
                          <td>
                            <span className="status complete">
                              <span className="sd"></span>
                              <span className="label-done">Ready</span>
                              <span className="label-proc">Processing</span>
                              <span className="label-score">Scored</span>
                            </span>
                          </td>
                        </tr>
                        <tr data-row="2">
                          <td>
                            <div className="team">
                              <span
                                className="av"
                                style={{
                                  background: "linear-gradient(135deg,#7b5cf6,#a99bff)",
                                }}
                              >
                                T
                              </span>
                              <span className="tn">TutorVerse</span>
                            </div>
                          </td>
                          <td className="mats">PDF · video</td>
                          <td className="subm">5h ago</td>
                          <td>
                            <span className="status complete">
                              <span className="sd"></span>
                              <span className="label-done">Ready</span>
                              <span className="label-proc">Processing</span>
                              <span className="label-score">Scored</span>
                            </span>
                          </td>
                        </tr>
                        <tr data-row="3">
                          <td>
                            <div className="team">
                              <span
                                className="av"
                                style={{
                                  background: "linear-gradient(135deg,#2ec5e8,#36e0c2)",
                                }}
                              >
                                L
                              </span>
                              <span className="tn">LedgerLoop</span>
                            </div>
                          </td>
                          <td className="mats">PDF</td>
                          <td className="subm">1d ago</td>
                          <td>
                            <span className="status complete">
                              <span className="sd"></span>
                              <span className="label-done">Ready</span>
                              <span className="label-proc">Processing</span>
                              <span className="label-score">Scored</span>
                            </span>
                          </td>
                        </tr>
                        <tr data-row="4">
                          <td>
                            <div className="team">
                              <span
                                className="av"
                                style={{
                                  background: "linear-gradient(135deg,#86868b,#b8b8be)",
                                }}
                              >
                                O
                              </span>
                              <span className="tn">Orchestrix AI</span>
                            </div>
                          </td>
                          <td className="mats">PDF</td>
                          <td className="subm">1d ago</td>
                          <td>
                            <span className="status missing">
                              <span className="sd"></span>
                              <span className="label-done">Incomplete</span>
                              <span className="label-proc">Processing</span>
                              <span className="label-score">Scored</span>
                            </span>
                          </td>
                        </tr>
                        <tr data-row="5">
                          <td>
                            <div className="team">
                              <span
                                className="av"
                                style={{
                                  background: "linear-gradient(135deg,#6c4cf1,#36e0c2)",
                                }}
                              >
                                B
                              </span>
                              <span className="tn">Brightline</span>
                            </div>
                          </td>
                          <td className="mats">PDF · repo</td>
                          <td className="subm">2d ago</td>
                          <td>
                            <span className="status complete">
                              <span className="sd"></span>
                              <span className="label-done">Ready</span>
                              <span className="label-proc">Processing</span>
                              <span className="label-score">Scored</span>
                            </span>
                          </td>
                        </tr>
                        <tr className="more-row" data-row="6">
                          <td colSpan={4}>+ 118 more applications</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="hub-foot">
                      <span className="batch-badge" id="wf-batchBadge">
                        <span className="ok">✓</span>Batch ready
                      </span>
                      <button type="button" className="run-btn" id="wf-runBtn">
                        Run evaluation
                      </button>
                    </div>

                    <div className="pipeline" id="wf-pipeline">
                      <div className="pipe-label">
                        <span className="spin"></span>
                        <span className="pl-check" aria-hidden="true">✓</span>
                        <span className="pl-text">
                          Evaluation started · 117 ready applications
                        </span>
                      </div>
                      <div className="pipe-track">
                        <div className="pipe-fill" id="wf-pipeFill"></div>
                        <div className="pipe-node">
                          <div className="nd">◇</div>
                          <div className="nl">Decoder</div>
                        </div>
                        <div className="pipe-node">
                          <div className="nd">§</div>
                          <div className="nl">AI Judges</div>
                        </div>
                        <div className="pipe-node">
                          <div className="nd">∑</div>
                          <div className="nl">Summarizer</div>
                        </div>
                        <div className="pipe-node">
                          <div className="nd">#</div>
                          <div className="nl">Scoring</div>
                        </div>
                        <div className="pipe-node">
                          <div className="nd">▤</div>
                          <div className="nl">Reports</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
