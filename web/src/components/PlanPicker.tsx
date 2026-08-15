"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

/**
 * Two-question plan selector for /pricing (fast-scoring High-Impact #2).
 * Removes plan-anxiety without inventing tiers: the recommendation maps
 * strictly onto the published packages (15 / 40 / 150 submissions, and the
 * sales-sized Funds band above that).
 */
type Volume = "lt15" | "lt40" | "lt150" | "more";
type Scope = "one" | "several";

const VOLUMES: { id: Volume; label: string }[] = [
  { id: "lt15", label: "Up to 15" },
  { id: "lt40", label: "15 to 40" },
  { id: "lt150", label: "40 to 150" },
  { id: "more", label: "More than 150" },
];

const SCOPES: { id: Scope; label: string }[] = [
  { id: "one", label: "One event" },
  { id: "several", label: "Several projects" },
];

function recommend(v: Volume, s: Scope) {
  if (v === "more") {
    return {
      plan: "Funds and annual programs",
      why: "Above 150 submissions we size the package on a call rather than selling a fixed tier.",
      cta: { label: "Talk to sales", href: "mailto:hello@evallens.io" },
    };
  }
  if (v === "lt150" || s === "several") {
    return {
      plan: "Cohort",
      why:
        s === "several"
          ? "Several projects in one window is what the Cohort package covers, with custom criteria and weights."
          : "150 submissions in one window, with custom criteria and weights.",
      cta: { label: "Book Cohort setup", href: "/company/contact" },
    };
  }
  if (v === "lt40") {
    return {
      plan: "Pitch Competition",
      why: "One full event end to end, 40 submissions, your own branding on the reports.",
      cta: { label: "Book Pitch setup", href: "/company/contact" },
    };
  }
  return {
    plan: "Micro",
    why: "A small one-off session, 15 submissions, the full six-judge panel included.",
    cta: { label: "Book Micro setup", href: "/company/contact" },
  };
}

export function PlanPicker() {
  const [volume, setVolume] = useState<Volume | null>(null);
  const [scope, setScope] = useState<Scope | null>(null);
  const result = volume && scope ? recommend(volume, scope) : null;

  function pickVolume(v: Volume) {
    setVolume(v);
    if (scope) track("plan_picker_result", { volume: v, scope });
  }
  function pickScope(s: Scope) {
    setScope(s);
    if (volume) track("plan_picker_result", { volume, scope: s });
  }

  return (
    <div className="planpick" data-reveal="up">
      <p className="planpick__eyebrow">Not sure which package?</p>

      <div className="planpick__row">
        <span className="planpick__q">How many submissions in one window?</span>
        <div className="planpick__opts">
          {VOLUMES.map((o) => (
            <button
              key={o.id}
              type="button"
              className={volume === o.id ? "is-on" : ""}
              onClick={() => pickVolume(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="planpick__row">
        <span className="planpick__q">One event, or several projects?</span>
        <div className="planpick__opts">
          {SCOPES.map((o) => (
            <button
              key={o.id}
              type="button"
              className={scope === o.id ? "is-on" : ""}
              onClick={() => pickScope(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="planpick__out" role="status">
          <div>
            <span className="planpick__label">Start with</span>
            <strong>{result.plan}</strong>
            <p>{result.why}</p>
          </div>
          <a className="btn btn-primary btn-sm" href={result.cta.href}>
            {result.cta.label}
          </a>
        </div>
      )}

      <style>{`
        .pricing .planpick{
          margin-top:30px; padding:24px 26px; border:1px solid var(--border,#d2d2d7);
          border-radius:20px; background:#fff;
        }
        .pricing .planpick__eyebrow{
          margin:0 0 16px; font-size:13px; font-weight:600; letter-spacing:.02em;
        }
        .pricing .planpick__row{
          display:flex; flex-wrap:wrap; align-items:center; gap:12px 18px; margin-bottom:14px;
        }
        .pricing .planpick__q{ font-size:14px; color:var(--muted); min-width:250px; }
        .pricing .planpick__opts{ display:flex; flex-wrap:wrap; gap:8px; }
        .pricing .planpick__opts button{
          font:inherit; font-size:13.5px; padding:8px 14px; border-radius:999px;
          border:1px solid var(--border,#d2d2d7); background:#fff; color:var(--fg,#1d1d1f);
          cursor:pointer; transition:border-color .15s, box-shadow .15s;
        }
        .pricing .planpick__opts button:hover{ border-color:#a99bff; }
        .pricing .planpick__opts button.is-on{
          border-color:#6c4cf1; box-shadow:0 0 0 3px rgba(108,76,241,.12);
          font-weight:600;
        }
        .pricing .planpick__out{
          margin-top:18px; padding-top:18px; border-top:1px solid var(--border,#d2d2d7);
          display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px;
        }
        .pricing .planpick__label{
          display:block; font-size:12px; letter-spacing:.14em; text-transform:uppercase;
          color:var(--muted); margin-bottom:4px;
        }
        .pricing .planpick__out strong{ font-size:20px; font-weight:700; }
        .pricing .planpick__out p{ margin:6px 0 0; font-size:13.5px; color:var(--muted); max-width:56ch; }
      `}</style>
    </div>
  );
}
