const { Button, Eyebrow, Chip } = window.Evallense_c7d744;
const { useState, useEffect, useRef } = React;

/* ----- shared: reveal-on-scroll wrapper ----- */
function Reveal({ as = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("in"); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={"reveal " + className} {...rest}>{children}</Tag>;
}

/* ----- progress ring (lens conic) ----- */
function Ring({ value, max = 10, variant = "ink", size = "lg", cap }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`ring ring--${variant} ${size === "lg" ? "ring--lg" : ""}`} style={{ "--p": pct }}>
      <div className="ring__label">
        <div className="ring__num" style={{ fontSize: size === "lg" ? "clamp(40px,5vw,60px)" : 30 }}>
          {value.toFixed(1)}
        </div>
        {cap ? <div className="ring__cap">{cap}</div> : null}
      </div>
    </div>
  );
}

/* =================== HEADER =================== */
function Header() {
  return (
    <header className="hdr">
      <div className="brand"><span className="mark"></span>EvalLense</div>
      <nav className="nav">
        <a href="#">Product</a>
        <a href="#" aria-current="page">Trust</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </nav>
      <Button variant="primary" arrow size="sm">Book a demo</Button>
    </header>
  );
}

/* =================== 1 · HERO (light) =================== */
function Hero() {
  return (
    <section className="hero sec-light" data-screen-label="01 Hero">
      <div className="hero-bg"></div>
      <div className="wrap-wide">
        <div className="hero-grid">
          <Reveal>
            <Eyebrow>Methodology</Eyebrow>
            <h1 className="h1">The <span className="accent">methodology</span><br />behind every score</h1>
            <p className="lead on-light">
              Six independent AI judges read each deck against a fixed rubric, tie every score to
              evidence in the slides, and hand you a result you can defend. The final call always yours.
            </p>
            <div className="cta-row">
              <Button variant="primary" arrow>Book a demo</Button>
              <Button variant="ghost">Try live demo</Button>
            </div>
          </Reveal>
          <Reveal className="hero-art" style={{ transitionDelay: "120ms" }}>
            <div className="score-card">
              <div className="row">
                <div className="deck-mini" style={{ flex: 1 }}><i></i><i></i><i></i><i></i></div>
                <span className="accent" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22 }}>→</span>
                <Ring value={7.4} variant="light" size="sm" cap="Score" />
              </div>
              <div className="row" style={{ borderTop: "1px solid var(--dsc-border)", paddingTop: 16 }}>
                <span className="score-meta">Evidence-linked</span>
                <span className="evi"><b>6</b>&nbsp;independent reads</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================== 2 · PRINCIPLES (ink) =================== */
const PRINCIPLES = [
  ["AI supports the decision — it doesn't own it.", "Every AI score is advisory. You set the final score, and the ranking is built from yours."],
  ["Every score is explainable.", "Each number traces back to evidence in the deck and the rubric band it lands in — not a black-box verdict."],
  ["Disagreement is useful.", "When judges diverge on a dimension, the report shows the spread instead of burying it in an average."],
  ["Methodology matters more than the model.", "Reliability comes from fixed criteria, defined judge roles, and a deterministic scoring step — not from any single model."],
];
function Principles() {
  return (
    <section className="sec sec-ink" data-screen-label="02 Principles">
      <div className="wrap">
        <Reveal>
          <Eyebrow onDark>What we hold to</Eyebrow>
          <h2 className="h2 on-ink" style={{ marginTop: 14 }}>Four principles<br />behind the <span className="accent">method</span></h2>
        </Reveal>
        <div className="num-list">
          {PRINCIPLES.map(([h, b], i) => (
            <Reveal key={i} className="num-item" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="num-idx">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="num-h">{h}</h3>
                <p className="num-b">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 3 · PIPELINE (light, pinned multi-screen) =================== */
const STAGES = [
  ["Decoder", "Any format becomes one structured view", "Any format — PDF, PPTX, or Google Slides — becomes one structured, slide-level view the judges can read."],
  ["AI Judges", "Six independent reads, in parallel", "Six independent judges score the deck across P1–P6, in parallel, without seeing one another's scores."],
  ["Summarizer", "Math first, then narrative", "A deterministic math step aggregates the scores; a second step writes the narrative and the questions to ask each team."],
  ["Scoring", "Your weights form the Final Score", "Your criterion weights apply to the human Jury Score to form the Final Score."],
  ["Report", "An explainable report per team", "An explainable report is assembled for every participant."],
];
function Pipeline() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const past = Math.min(Math.max(-rect.top, 0), total);
        const frac = total > 0 ? past / total : 0;
        const idx = Math.min(STAGES.length - 1, Math.floor(frac * STAGES.length + 0.0001));
        setActive(idx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const cur = STAGES[active];
  return (
    <section className="sec-light" data-screen-label="03 Pipeline">
      <div className="pin-wrap" ref={wrapRef} style={{ minHeight: "260vh" }}>
        <div className="pin-sticky">
          <div className="sec" style={{ paddingBottom: "clamp(48px,7vh,90px)" }}>
            <div className="wrap-wide">
              <Reveal style={{ marginBottom: "clamp(32px,4vw,52px)" }}>
                <Eyebrow>The pipeline</Eyebrow>
                <h2 className="h2" style={{ marginTop: 14 }}>Every deck runs the same <span className="accent">five stages</span></h2>
                <p className="lead on-light">The path is fixed, so no two decks are read differently. Each stage lights up as you scroll.</p>
              </Reveal>
              <div className="pipe-grid">
                <div className="pipe-rail">
                  {STAGES.map((s, i) => (
                    <div key={i} className="pipe-step" data-on={i === active} onClick={() => setActive(i)}>
                      <div className="pipe-dot">{String(i + 1).padStart(2, "0")}</div>
                      <div className="pipe-name">{s[0]}</div>
                    </div>
                  ))}
                </div>
                <div className="pipe-stage">
                  <div className="stage-bar"><i></i><i></i><i></i><span>{cur[0]} · stage {active + 1} of 5</span></div>
                  <div className="stage-body">
                    <div className="stage-k">Stage {String(active + 1).padStart(2, "0")}</div>
                    <h3 className="stage-h">{cur[1]}</h3>
                    <p className="stage-p">{cur[2]}</p>
                    <div className="stage-track">
                      {STAGES.map((_, i) => <b key={i} data-done={i <= active}></b>)}
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

/* =================== 4 · JURY + COVERAGE (ink) =================== */
const JUDGES = [
  ["Problem", "J-P1", "Who actually suffers from this pain, how often, and what do they do about it today?", "A named user, pain that's frequent and costly, an honest read of today's alternatives."],
  ["Solution Logic", "J-P2", "Does this approach actually solve the problem, and why is it better than the alternatives?", "A clear mechanism, a defensible “why us”, a sharp wedge over a do-everything platform."],
  ["Business Value / Market", "J-P3", "Is the market real and reachable, with a credible way to make money and defend the position?", "A beachhead segment, monetization that fits the buyer, real defensibility."],
  ["Pitch Quality", "J-P4", "Can a reviewer follow what this is and why it matters, without guessing?", "Narrative structure and clear language. Grades the communication, not the idea."],
  ["Team Readiness", "J-P5", "Do these people have the experience and founder-market fit to execute?", "Evidence of shipping over titles, a complete team, gaps owned rather than hidden."],
  ["Feasibility", "J-P6", "Given the resources, timeline, and risks, can the team actually deliver?", "A sequenced roadmap, resources matched to ambition, a sober view of risk."],
];
const COVERAGE = [
  ["Problem significance", 4, 5],
  ["Solution differentiation", 4, 5],
  ["Market attractiveness", 5, 6],
  ["Business model / GTM", 4, 5],
  ["Team / founder fit", 2, 3],
  ["Feasibility / readiness", 5, 6],
];
function Jury() {
  return (
    <section className="sec sec-ink" data-screen-label="04 Jury">
      <div className="wrap-wide">
        <Reveal style={{ marginBottom: "clamp(28px,4vw,44px)" }}>
          <Eyebrow onDark>The AI jury</Eyebrow>
          <h2 className="h2 on-ink" style={{ marginTop: 14 }}>Six judges, <span className="accent">six lenses</span></h2>
          <p className="lead on-ink">
            Each judge owns one lens and answers a single question. They run in parallel and never compare
            notes — six independent reads, not one blurred opinion.
          </p>
        </Reveal>
        <Reveal>
          <div className="gallery">
            {JUDGES.map((j, i) => (
              <article key={i} className="judge">
                <div className="jhead">
                  <span className="jname">{j[0]}</span>
                  <span className="jcode">{j[1]}</span>
                </div>
                <p className="jq">{j[2]}</p>
                <p className="jlook"><b>Looks for</b>{j[3]}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="cov">
          <Reveal>
            <Eyebrow onDark>Coverage</Eyebrow>
            <h2 className="h2 on-ink" style={{ marginTop: 14, fontSize: "clamp(28px,3.4vw,42px)" }}>
              No score rests on <span className="accent">one opinion</span>
            </h2>
            <p className="lead on-ink">Every dimension gets one lead judge and several independent cross-checks from the rest of the panel.</p>
          </Reveal>
          <Reveal className="cov-grid">
            {COVERAGE.map((c, i) => (
              <div key={i} className="cov-row">
                <span className="cov-name">{c[0]}</span>
                <span className="cov-dots">
                  <span className="dot dot--lead" title="lead"></span>
                  {Array.from({ length: c[1] }).map((_, k) => <span key={k} className="dot dot--cross" title="cross-check"></span>)}
                </span>
                <span className="cov-reads">{c[2]} reads</span>
              </div>
            ))}
          </Reveal>
          <div className="cov-legend">
            <span><span className="dot dot--lead"></span> Lead</span>
            <span><span className="dot dot--cross"></span> Cross-check</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== 5 · RUBRIC (light split) =================== */
const PROC = [
  ["Cite the evidence", "Slide-grounded facts only, each tied to a specific slide. No claim without a reference."],
  ["Weigh it both ways", "What raises the score, what lowers it, and what the deck never establishes."],
  ["Name the band", "The judge states, in words, which rubric band the evidence lands in."],
  ["Then the score", "The number must sit inside that band. On the edge, an incomplete deck rounds down, not up."],
];
const BANDS = [
  ["0–3", "absent or unsubstantiated"],
  ["4–6", "plausible but thin"],
  ["7–8", "specific and credible"],
  ["9–10", "demonstrated, not asserted"],
];
function Rubric() {
  return (
    <section className="sec sec-light" data-screen-label="05 Rubric">
      <div className="wrap-wide">
        <div className="split">
          <Reveal>
            <Eyebrow>The rubric</Eyebrow>
            <h2 className="h2" style={{ marginTop: 14 }}>One scale, four bands, <span className="accent">evidence first</span></h2>
            <p className="lead on-light">
              Every dimension is scored on the same 0–10 scale, split into four bands. A judge has to assemble
              the evidence before it can name a score — never the other way around.
            </p>
            <div className="proc">
              {PROC.map((p, i) => (
                <div key={i} className="proc-item">
                  <div className="proc-n">{i + 1}</div>
                  <div>
                    <h3 className="proc-h">{p[0]}</h3>
                    <p className="proc-b">{p[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal style={{ transitionDelay: "100ms" }}>
            <div className="scale">
              <div className="scale-bar">
                {BANDS.map((b, i) => (
                  <div key={i} className="band"><b>{b[0]}</b><span>{b[1]}</span></div>
                ))}
              </div>
              <div className="scale-flow">
                <b>Evidence</b><i>→</i><b>Band</b><i>→</i><b>Score</b>
                <span style={{ marginLeft: "auto", color: "var(--muted)" }}>score emitted last</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================== 6 · SCORING MODEL (ink split + scrub ring) =================== */
const POINTS = [
  ["Per dimension", "Judge scores are combined by their routing weight and adjusted for confidence to form an AI Criterion Score."],
  ["Across dimensions", "Your criterion weights roll those up into the AI Total Score, on a 0–10 scale."],
  ["Confidence", "Every score carries a low, medium, or high confidence signal, and lower confidence pulls the result toward caution."],
  ["Spread", "Where judges disagree on a dimension, the report flags it — consensus, split, or conflict — instead of averaging it away."],
  ["Reproducible", "No model runs in this step. The same judge outputs and weights give the same score, every time."],
];
function Scoring() {
  const TARGET = 7.4;
  const [val, setVal] = useState(TARGET);
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVal(TARGET); return; }
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const frac = Math.min(Math.max((vh - rect.top) / (vh * 0.9), 0), 1);
        setVal(+(frac * TARGET).toFixed(1));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="sec sec-ink" data-screen-label="06 Scoring" ref={ref}>
      <div className="wrap-wide">
        <div className="split">
          <Reveal>
            <Eyebrow onDark>The scoring model</Eyebrow>
            <h2 className="h2 on-ink" style={{ marginTop: 14 }}>From six reads to <span className="accent">one advisory score</span></h2>
            <p className="lead on-ink">
              A deterministic math step turns the judges' scores into one number — the same inputs always
              produce the same result. It's an advisory reference, not the ranking.
            </p>
            <div className="pts">
              {POINTS.map((p, i) => (
                <div key={i} className="pt"><b>{p[0]}</b><span>{p[1]}</span></div>
              ))}
            </div>
          </Reveal>
          <Reveal style={{ transitionDelay: "100ms" }}>
            <div className="ring-stage">
              <Ring value={val} variant="ink" size="lg" cap="AI Criterion Score" />
              <div className="ring-chips">
                <Chip onDark>Confidence · high</Chip>
                <Chip onDark>Spread · consensus</Chip>
                <Chip onDark>Reproducible</Chip>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================== 7 · HUMAN-IN-THE-LOOP (light split) =================== */
function HumanLoop() {
  return (
    <section className="sec sec-light" data-screen-label="07 Human">
      <div className="wrap-wide">
        <div className="split">
          <Reveal>
            <Eyebrow>Where the human decides</Eyebrow>
            <h2 className="h2" style={{ marginTop: 14 }}>The AI prepares.<br /><span className="accent">You decide.</span></h2>
            <p className="lead on-light">
              Every AI score is advisory. You read the evidence, set your Jury Score on each dimension, and the
              leaderboard is built from your Final Score — never from the AI's.
            </p>
          </Reveal>
          <Reveal style={{ transitionDelay: "100ms" }}>
            <figure className="pull" style={{ margin: 0 }}>
              <blockquote className="pull-q">“Six AI lenses do the reading. The final call is always yours.”</blockquote>
              <figcaption className="pull-tag">Pitch Competition · P1–P6</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================== 8 · FINAL CTA (ink) =================== */
function FinalCTA() {
  return (
    <section className="sec cta sec-ink" data-screen-label="08 CTA">
      <div className="wrap">
        <Reveal>
          <Eyebrow onDark dot={false}>Get started</Eyebrow>
          <h2 className="h2 on-ink" style={{ marginTop: 16, maxWidth: "18ch" }}>
            See the methodology run on <span className="accent">your own decks</span>
          </h2>
          <p className="lead on-ink" style={{ maxWidth: "52ch" }}>
            Book a demo and watch one deck go from slides to an evidence-linked, explainable score.
          </p>
          <div className="cta-row center">
            <Button variant="glass" arrow>Book a demo</Button>
            <Button variant="glass">Try live demo</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =================== FOOTER =================== */
const FOOT = [
  ["Product", ["Overview", "Use cases", "Pricing", "Newsroom"]],
  ["Trust", ["Methodology", "Consistency & Reliability", "Prompt Injection Safety", "Evidence-Based Reports", "Review Board"]],
  ["Company", ["About", "Contact"]],
];
function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap-wide">
        <div className="ftr-grid">
          <div className="ftr-col">
            <div className="brand" style={{ color: "var(--fg-on-dark)", marginBottom: 16 }}><span className="mark"></span>EvalLense</div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, lineHeight: 1.55, color: "var(--muted-on-dark)", maxWidth: "32ch", margin: "0 0 20px" }}>
              AI prepares the analysis. A human makes the final call.
            </p>
            <Button variant="glass" arrow size="sm">Book a demo</Button>
          </div>
          {FOOT.map(([title, links], i) => (
            <div key={i} className="ftr-col">
              <h4>{title}</h4>
              {links.map((l, k) => (
                <a key={k} href="#" aria-current={l === "Methodology" ? "page" : undefined}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="ftr-bottom">
          <span>© 2026 EvalLense</span>
          <span>Trusted · Explainable · Human-controlled</span>
        </div>
      </div>
    </footer>
  );
}

/* =================== PAGE =================== */
function Page() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Principles />
        <Pipeline />
        <Jury />
        <Rubric />
        <Scoring />
        <HumanLoop />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Page />);
