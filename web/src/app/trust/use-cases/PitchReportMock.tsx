"use client";

import { useState } from "react";

/* ── Ported, simplified content from the real pitch_report (EduPath SEA) ── */

const SLIDES = [
  ["Cover", "EduPath SEA", "EdTech platform for SE Asia · Pre-seed · seeking $500K · Anna Lee, Mark Davis"],
  ["Market", "Global EdTech TAM · $24B", "$24B market, +18% YoY · SEA focus · no source cited on slide"],
  ["Problem", "Slide missing", "No problem statement submitted — affects P1"],
  ["Solution", "Slide missing", "No solution description submitted — affects P2"],
  ["Team", "Anna Lee & Mark Davis", "ex-Google SWE · YC Alumni · complementary tech + biz"],
  ["Business model", "Slide missing", "No pricing, revenue model or GTM motion — affects P4"],
];

type Dim = {
  code: string;
  name: string;
  score: number;
  weight: number;
  conf: "high" | "medium";
};

const DIMS: Dim[] = [
  { code: "P1", name: "Problem significance", score: 5.0, weight: 0.15, conf: "medium" },
  { code: "P2", name: "Solution differentiation", score: 5.0, weight: 0.15, conf: "medium" },
  { code: "P3", name: "Market attractiveness", score: 7.6, weight: 0.2, conf: "high" },
  { code: "P4", name: "Business model / GTM", score: 4.4, weight: 0.15, conf: "high" },
  { code: "P5", name: "Team / founder fit", score: 8.6, weight: 0.2, conf: "medium" },
  { code: "P6", name: "Feasibility / readiness", score: 6.4, weight: 0.15, conf: "medium" },
];

const TOTAL = DIMS.reduce((s, d) => s + d.score * d.weight, 0); // 6.36

const ABOUT =
  "EduPath SEA is an EdTech startup targeting Southeast Asia. The submitted materials show market opportunity and team clearly, but problem, solution, monetization and GTM are weaker.";

const STRENGTHS = "Operator background, complementary team, clear regional category, readable deck.";
const WEAKNESSES = "No solution slide, no business model, no defined ICP, thin market-sizing evidence.";

const JUDGES: { name: string; role: string; text: string }[] = [
  { name: "Business Value / Market", role: "P3 / P4", text: "Market thesis, but no business thesis — no pricing, revenue model or first-customer path." },
  { name: "Team Readiness", role: "P5", text: "Team is the strongest asset, but some trust signals need live confirmation." },
  { name: "Problem", role: "P1", text: "EdTech domain is clear, but customer pain, urgency and evidence of need are not." },
  { name: "Solution Logic", role: "P2", text: "Differentiation barely described — needs a live demo or a clear product explanation." },
];

const QUESTIONS: { id: string; tag: "critical" | "important"; text: string; why: string }[] = [
  { id: "Q1", tag: "critical", text: "Confirm Mark Davis's YC status — company name and batch.", why: "Closes P5 team / integrity. If unconfirmed, team score drops." },
  { id: "Q2", tag: "critical", text: "How does the product make money? Pricing, revenue model, unit economics.", why: "Closes P4 business model — the critical deck gap." },
  { id: "Q3", tag: "critical", text: "Who is the first paying customer? Segment, country, decision-maker.", why: "Closes P1 / P4: customer specificity and first-customer path." },
  { id: "Q4", tag: "important", text: "GTM motion in SEA: which country first, which channel, who do you sell to?", why: "Tests GTM feasibility — can lift P4 / P6." },
  { id: "Q5", tag: "important", text: "Where is the product now — MVP, prototype, pilot? 6-month milestones?", why: "Closes P6 feasibility / readiness." },
];

const REPORT_TABS = ["Project Summary", "AI Score Report", "Questions for Participants", "Live Jury Voting"];

function barColor(score: number) {
  if (score >= 6.5) return "var(--aqua, #36e0c2)";
  if (score >= 5) return "#f5b94a";
  return "#f17e7e";
}

export function PitchReportMock() {
  const [tab, setTab] = useState(0);
  const [slide, setSlide] = useState(0);
  const [votes, setVotes] = useState<Record<string, number | null>>(
    Object.fromEntries(DIMS.map((d) => [d.code, null])),
  );
  const [submitted, setSubmitted] = useState(false);

  const filled = DIMS.filter((d) => votes[d.code] != null).length;

  const adj = (code: string, step: number, ai: number) => {
    setVotes((v) => {
      const cur = v[code] ?? ai;
      const next = Math.min(10, Math.max(1, Math.round((cur + step) * 2) / 2));
      return { ...v, [code]: next };
    });
  };

  return (
    <div className="rpt">
      {/* Report header — project identity + total score */}
      <div className="rpt-header">
        <div className="rpt-head-main">
          <p className="rpt-kicker">Pitch Report · AI Jury</p>
          <h3 className="rpt-project"><span className="grad-word">EduPath</span> SEA</h3>
          <div className="rpt-meta">
            <span className="rpt-pill rpt-pill--ok">AI Report Ready</span>
            <span className="rpt-pill">6 slides submitted</span>
          </div>
        </div>
        <div className="rpt-score-box">
          <span className="rpt-score-num">{TOTAL.toFixed(2)}</span>
          <span className="rpt-score-lbl">AI Total Score / 10</span>
        </div>
      </div>

      {/* macOS-style window tabs */}
      <div className="rpt-tabs" role="tablist">
        {REPORT_TABS.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={tab === i}
            className={`rpt-tab${tab === i ? " on" : ""}`}
            onClick={() => setTab(i)}
          >
            {tab === i && <span className="rpt-tab-x" aria-hidden="true">×</span>}
            <span className="rpt-tab-n" aria-hidden="true">{`0${i + 1}`}</span>
            <span className="rpt-tab-label">{label}</span>
          </button>
        ))}
        <span className="rpt-newtab" aria-hidden="true">+</span>
      </div>

      {/* ── 01 · Project Summary ── */}
      {tab === 0 && (
        <div className="rpt-page rpt-summary">
          <div className="rpt-col">
            <div className="rpt-block rpt-deck-block">
              <p className="rpt-eyebrow">Pitch deck</p>
              <div className="rpt-slide">
                <div>
                  <p className="rpt-slide-kicker">Slide {slide + 1} · {SLIDES[slide][0]}</p>
                  <p className="rpt-slide-title">{SLIDES[slide][1]}</p>
                </div>
                <p className="rpt-slide-foot">{SLIDES[slide][2]}</p>
              </div>
              <div className="rpt-dots">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`rpt-dot${i === slide ? " on" : ""}`}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
            </div>
            <div className="rpt-block">
              <p className="rpt-eyebrow">AI scores · P1–P6</p>
              <div className="rpt-scorerows">
                {DIMS.map((d) => (
                  <div key={d.code} className="rpt-scorerow">
                    <span className="rpt-dim-code">{d.code}</span>
                    <span className="rpt-dim-name">{d.name}</span>
                    <span className="rpt-bar">
                      <span className="rpt-fill" style={{ width: `${d.score * 10}%`, background: barColor(d.score) }} />
                    </span>
                    <span className="rpt-dim-score">{d.score.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rpt-col">
            <div className="rpt-block">
              <p className="rpt-eyebrow">Project summary</p>
              <p className="rpt-about">{ABOUT}</p>
            </div>
            <div className="rpt-callout rpt-callout--up"><strong>Why it may pass.</strong> Strong team signal and a clear category. If live Q&amp;A shows revenue model, ICP and first-customer path, the score can rise.</div>
            <div className="rpt-callout rpt-callout--down"><strong>Why it may not.</strong> No problem statement, solution logic, pricing or GTM. If that is a thinking gap, not a deck gap, the score stays weak.</div>
            <div className="rpt-callout rpt-callout--warn"><strong>Confirm live.</strong> Revenue model, GTM in SEA, the customer segment, current product stage and the disputed team claim.</div>
            <div className="rpt-sw">
              <div className="rpt-sw-card"><p className="rpt-eyebrow">Strengths</p><p className="rpt-sw-text">{STRENGTHS}</p></div>
              <div className="rpt-sw-card"><p className="rpt-eyebrow">Weaknesses</p><p className="rpt-sw-text">{WEAKNESSES}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* ── 02 · AI Score Report ── */}
      {tab === 1 && (
        <div className="rpt-page rpt-aireport">
          <div className="rpt-table-wrap">
            <table className="rpt-table">
              <thead>
                <tr>
                  <th>Crit.</th><th>Name</th><th className="num">AI</th>
                  <th className="num">Weight</th><th className="num">Weighted</th><th>Conf.</th>
                </tr>
              </thead>
              <tbody>
                {DIMS.map((d) => (
                  <tr key={d.code}>
                    <td><strong>{d.code}</strong></td>
                    <td>{d.name}</td>
                    <td className="num">{d.score.toFixed(1)}</td>
                    <td className="num">{d.weight.toFixed(2)}</td>
                    <td className="num">{(d.score * d.weight).toFixed(2)}</td>
                    <td><span className={`rpt-conf ${d.conf === "high" ? "h" : "m"}`}>{d.conf}</span></td>
                  </tr>
                ))}
                <tr className="rpt-total-row">
                  <td colSpan={4}><strong>AI Total Score</strong></td>
                  <td className="num"><strong>{TOTAL.toFixed(2)}</strong></td>
                  <td>weighted</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="rpt-eyebrow">Short AI judge conclusions</p>
          <div className="rpt-judges">
            {JUDGES.map((j) => (
              <div key={j.name} className="rpt-judge">
                <div className="rpt-judge-head">
                  <span className="rpt-judge-name">{j.name}</span>
                  <span className="rpt-judge-role">{j.role}</span>
                </div>
                <p className="rpt-judge-text">{j.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 03 · Questions for Participants ── */}
      {tab === 2 && (
        <div className="rpt-page rpt-questions">
          <p className="rpt-eyebrow">Critical questions</p>
          {QUESTIONS.filter((q) => q.tag === "critical").map((q) => (
            <div key={q.id} className="rpt-q rpt-q--critical">
              <span className="rpt-q-num">{q.id}</span>
              <div>
                <p className="rpt-q-text">{q.text}</p>
                <p className="rpt-q-why">{q.why}</p>
              </div>
            </div>
          ))}
          <p className="rpt-eyebrow" style={{ marginTop: "14px" }}>Important questions</p>
          {QUESTIONS.filter((q) => q.tag === "important").map((q) => (
            <div key={q.id} className="rpt-q rpt-q--important">
              <span className="rpt-q-num">{q.id}</span>
              <div>
                <p className="rpt-q-text">{q.text}</p>
                <p className="rpt-q-why">{q.why}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 04 · Live Jury Voting ── */}
      {tab === 3 && (
        <div className="rpt-page rpt-voting">
          <div className="rpt-vote-col">
            <p className="rpt-eyebrow">Live jury voting</p>
            <div className="rpt-table-wrap">
              <table className="rpt-table">
                <thead>
                  <tr><th>Crit.</th><th>Name</th><th className="num">AI</th><th className="num">Jury</th><th className="num">Δ</th></tr>
                </thead>
                <tbody>
                  {DIMS.map((d) => {
                    const v = votes[d.code];
                    const delta = v == null ? null : v - d.score;
                    return (
                      <tr key={d.code}>
                        <td><strong>{d.code}</strong></td>
                        <td>{d.name}</td>
                        <td className="num">{d.score.toFixed(1)}</td>
                        <td className="num">
                          <span className="rpt-stepper">
                            <button className="rpt-pm" onClick={() => adj(d.code, -0.5, d.score)} aria-label="Decrease">−</button>
                            <span className="rpt-vote-val">{v == null ? "–" : v.toFixed(1)}</span>
                            <button className="rpt-pm" onClick={() => adj(d.code, 0.5, d.score)} aria-label="Increase">+</button>
                          </span>
                        </td>
                        <td className="num" style={{ color: delta == null ? undefined : delta < 0 ? "#f17e7e" : delta > 0 ? "var(--aqua,#36e0c2)" : undefined }}>
                          {delta == null ? "–" : (delta > 0 ? "+" : "") + delta.toFixed(1)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="rpt-vote-foot">
              <span className="rpt-vote-status">{submitted ? "Submitted" : "Draft"} · {filled} / 6 scored</span>
              <button className="rpt-submit" onClick={() => setSubmitted(true)}>Submit vote</button>
            </div>
          </div>

          <div className="rpt-vote-side">
            <p className="rpt-eyebrow">Jury comment</p>
            <div className="rpt-comment">A short jury opinion after the live pitch and Q&amp;A goes here…</div>
            <p className="rpt-eyebrow" style={{ marginTop: "14px" }}>How the final score works</p>
            <p className="rpt-note">Final Jury Score = Σ (jury criterion score × weight). The AI report prepares the read; the human vote is final.</p>
          </div>
        </div>
      )}
    </div>
  );
}
