"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

/**
 * Low-commitment lead form: "send us your batch". Posts to /api/lead
 * (site_leads table). Page-local styles, no shared DS changes.
 */
const PROGRAM_TYPES = [
  "Pitch competition",
  "Accelerator",
  "VC fund / open call",
  "Angel network",
  "Grant program",
  "Corporate innovation",
  "Crowdfunding platform",
  "Tender / procurement",
  "Other",
];

export function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sourcePath: window.location.pathname + window.location.search,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("lead_submit", {
        programType: String(data.programType ?? ""),
        path: window.location.pathname,
      });
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="leadform leadform--done" role="status">
        <strong>Got it.</strong> We read every batch request personally and
        reply within one business day, usually with a proposed slot for the
        free retro-test.
      </div>
    );
  }

  return (
    <form className="leadform" onSubmit={onSubmit}>
      <div className="leadform__row">
        <label>
          Name
          <input name="name" type="text" autoComplete="name" />
        </label>
        <label>
          Work email<span aria-hidden="true"> *</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="leadform__row">
        <label>
          Organization
          <input name="org" type="text" autoComplete="organization" />
        </label>
        <label>
          Program type
          <select name="programType" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {PROGRAM_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="leadform__row">
        <label>
          Batch size (approx. decks)
          <input name="batchSize" type="text" inputMode="numeric" placeholder="e.g. 40" />
        </label>
      </div>
      <label>
        Anything we should know
        <textarea name="message" rows={3} />
      </label>
      {/* Honeypot — humans never see it, bots fill it. */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="leadform__hp"
      />
      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Request the free retro-test"}
      </button>
      {state === "error" && (
        <p className="leadform__err" role="alert">
          Something went wrong. Email us instead: hello@evallens.io
        </p>
      )}
      <style>{`
        .leadform{display:flex;flex-direction:column;gap:14px;max-width:640px}
        .leadform__row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .leadform label{display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--muted,#6e6e73);font-weight:500}
        .leadform input,.leadform select,.leadform textarea{font:inherit;font-size:15px;color:var(--fg,#1d1d1f);padding:10px 12px;border:1px solid var(--border,#d2d2d7);border-radius:10px;background:#fff;outline:none}
        .leadform input:focus,.leadform select:focus,.leadform textarea:focus{border-color:#6c4cf1;box-shadow:0 0 0 3px rgba(108,76,241,.12)}
        .leadform button{margin-top:4px;align-self:flex-start}
        .leadform__hp{position:absolute;left:-9999px;height:0;width:0;opacity:0}
        .leadform__err{font-size:13px;color:#b3261e}
        .leadform--done{max-width:640px;padding:18px 20px;border:1px solid var(--border,#d2d2d7);border-radius:14px;background:#f5fff9;font-size:15px;line-height:1.5}
        @media (max-width:640px){.leadform__row{grid-template-columns:1fr}}
      `}</style>
    </form>
  );
}
