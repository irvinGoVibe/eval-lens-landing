"use client";

import { useState } from "react";

/**
 * Coded product mockup for the Review Board "one board for the whole decision"
 * feature tile. Pure Tailwind (no images, canvas, charts, deps, or inline
 * styles). Lightly interactive: pick a startup to update the detail panel and
 * toggle the shortlist; switch the bottom view between Leaderboard / Compare /
 * Shortlist. Bar widths are LITERAL Tailwind classes (runtime-built arbitrary
 * values aren't compiled), so they live on the data.
 */

type Status = "ready" | "review" | "scored" | "blocked";
type Tone = "good" | "warn" | "risk";
type Tab = "leaderboard" | "compare" | "shortlist";

type Finding = { readonly label: string; readonly tone: Tone };

type Startup = {
  readonly name: string;
  readonly status: Status;
  readonly ai: number | null;
  readonly aiW: string;
  readonly jury: number | null;
  readonly juryW: string;
  readonly findings: readonly Finding[];
};

const STATUS_META: Record<
  Status,
  { readonly label: string; readonly chip: string; readonly dot: string; readonly pulse: boolean }
> = {
  ready: {
    label: "Ready",
    chip: "text-emerald-300 bg-emerald-400/10 ring-emerald-400/20",
    dot: "bg-emerald-400",
    pulse: false,
  },
  review: {
    label: "In review",
    chip: "text-amber-300 bg-amber-400/10 ring-amber-400/20",
    dot: "bg-amber-400",
    pulse: true,
  },
  scored: {
    label: "Scored",
    chip: "text-violet-300 bg-violet-400/10 ring-violet-400/20",
    dot: "bg-violet-400",
    pulse: false,
  },
  blocked: {
    label: "Blocked",
    chip: "text-rose-300 bg-rose-400/10 ring-rose-400/20",
    dot: "bg-rose-400",
    pulse: false,
  },
};

const TONE_CHIP: Record<Tone, string> = {
  good: "text-emerald-200/90 bg-emerald-400/10 ring-emerald-400/20",
  warn: "text-amber-200/90 bg-amber-400/10 ring-amber-400/20",
  risk: "text-rose-200/90 bg-rose-400/10 ring-rose-400/20",
};

const STARTUPS: readonly Startup[] = [
  {
    name: "Northwind AI",
    status: "scored",
    ai: 7.8,
    aiW: "w-[78%]",
    jury: 8.6,
    juryW: "w-[86%]",
    findings: [
      { label: "Strong traction", tone: "good" },
      { label: "Thin moat", tone: "warn" },
    ],
  },
  {
    name: "Atlas Freight",
    status: "scored",
    ai: 8.0,
    aiW: "w-[80%]",
    jury: 8.1,
    juryW: "w-[81%]",
    findings: [
      { label: "Clear wedge", tone: "good" },
      { label: "Capital intensive", tone: "warn" },
    ],
  },
  {
    name: "Lumen Health",
    status: "review",
    ai: 8.2,
    aiW: "w-[82%]",
    jury: 7.9,
    juryW: "w-[79%]",
    findings: [
      { label: "Great team", tone: "good" },
      { label: "Reg risk", tone: "risk" },
    ],
  },
  {
    name: "Cobalt Robotics",
    status: "scored",
    ai: 7.1,
    aiW: "w-[71%]",
    jury: 7.4,
    juryW: "w-[74%]",
    findings: [
      { label: "Solid margins", tone: "good" },
      { label: "Long sales cycle", tone: "warn" },
    ],
  },
  {
    name: "Vesper Labs",
    status: "ready",
    ai: 6.4,
    aiW: "w-[64%]",
    jury: null,
    juryW: "w-0",
    findings: [
      { label: "Early signal", tone: "good" },
      { label: "Not scored yet", tone: "warn" },
    ],
  },
  {
    name: "Quill Finance",
    status: "blocked",
    ai: null,
    aiW: "w-0",
    jury: null,
    juryW: "w-0",
    findings: [{ label: "Judge run failed", tone: "risk" }],
  },
];

const TABS: readonly { readonly id: Tab; readonly label: string }[] = [
  { id: "leaderboard", label: "Leaderboard" },
  { id: "compare", label: "Compare" },
  { id: "shortlist", label: "Shortlist" },
];

function fmt(n: number | null): string {
  return n === null ? "—" : n.toFixed(1);
}

function MiniBar({ widthClass, tone }: { widthClass: string; tone: "ai" | "jury" }) {
  const fill =
    tone === "jury"
      ? "bg-gradient-to-r from-violet-400 to-cyan-300"
      : "bg-white/25";
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
      <div className={`h-full rounded-full ${fill} ${widthClass} transition-[width] duration-500 ease-out`} />
    </div>
  );
}

export function ReviewBoardMockup() {
  const [selected, setSelected] = useState<number>(0);
  const [tab, setTab] = useState<Tab>("leaderboard");
  const [shortlist, setShortlist] = useState<readonly number[]>([0, 1]);

  const active = STARTUPS[selected];

  const toggleShort = (i: number): void => {
    setShortlist((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const ranked = STARTUPS.map((s, i) => ({ s, i }))
    .filter((r) => r.s.jury !== null)
    .sort((a, b) => (b.s.jury ?? 0) - (a.s.jury ?? 0));

  return (
    <div className="aspect-[16/9] w-full select-none overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(120%_120%_at_15%_0%,#11152a_0%,#080a14_55%,#06070e_100%)] text-white shadow-[0_30px_80px_-40px_rgba(60,40,160,0.6)]">
      <div className="flex h-full flex-col gap-2 p-[3.2%] @container">
        {/* header */}
        <div className="flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[clamp(8px,1.4cqw,11px)] tracking-[0.22em] text-violet-300/90">
              REVIEW BOARD
            </span>
            <span className="hidden truncate text-[clamp(8px,1.2cqw,10px)] text-white/35 sm:inline">
              · Batch ready
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-0.5 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
            <span className="font-mono text-[clamp(8px,1.2cqw,10px)] text-white/70">24 startups</span>
          </div>
        </div>

        {/* main */}
        <div className="grid min-h-0 flex-1 grid-cols-[1.7fr_1fr] gap-2">
          {/* startup list */}
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
            <div className="grid shrink-0 grid-cols-[1fr_auto_2.4rem_2.4rem] items-center gap-2 border-b border-white/10 px-2.5 py-1.5 font-mono text-[clamp(7px,1cqw,9px)] uppercase tracking-[0.12em] text-white/35">
              <span>Startup</span>
              <span className="text-right">Status</span>
              <span className="text-right">AI</span>
              <span className="text-right text-violet-300/70">Jury</span>
            </div>
            <ul className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {STARTUPS.map((s, i) => {
                const meta = STATUS_META[s.status];
                const isSel = i === selected;
                const isShort = shortlist.includes(i);
                return (
                  <li key={s.name} className="min-h-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-pressed={isSel}
                      className={`group grid h-full w-full grid-cols-[1fr_auto_2.4rem_2.4rem] items-center gap-2 px-2.5 text-left transition-colors duration-200 ${
                        isSel ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-1.5">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleShort(i);
                          }}
                          className={`shrink-0 text-[11px] leading-none transition-colors ${
                            isShort ? "text-amber-300" : "text-white/20 group-hover:text-white/40"
                          }`}
                          aria-hidden="true"
                        >
                          ★
                        </span>
                        <span
                          className={`truncate text-[clamp(9px,1.5cqw,12px)] ${
                            isSel ? "text-white" : "text-white/80"
                          }`}
                        >
                          {s.name}
                        </span>
                      </span>
                      <span
                        className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[clamp(7px,1cqw,9px)] ring-1 ${meta.chip}`}
                      >
                        <span
                          className={`h-1 w-1 rounded-full ${meta.dot} ${meta.pulse ? "animate-pulse" : ""}`}
                        />
                        <span className="hidden whitespace-nowrap @[26rem]:inline">{meta.label}</span>
                      </span>
                      <span className="text-right font-mono text-[clamp(8px,1.2cqw,11px)] tabular-nums text-white/40">
                        {fmt(s.ai)}
                      </span>
                      <span
                        className={`text-right font-mono text-[clamp(9px,1.4cqw,13px)] font-semibold tabular-nums ${
                          s.jury === null ? "text-white/25" : "text-cyan-200"
                        }`}
                      >
                        {fmt(s.jury)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* detail: AI reference vs Jury primary + findings */}
          <div className="flex min-h-0 min-w-0 flex-col gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <span className="truncate text-[clamp(9px,1.5cqw,12px)] font-medium text-white">
              {active.name}
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-white/[0.03] p-1.5">
                <span className="block font-mono text-[clamp(6px,0.9cqw,8px)] uppercase tracking-[0.1em] text-white/35">
                  AI total
                </span>
                <span className="block font-mono text-[clamp(11px,1.8cqw,16px)] tabular-nums text-white/45">
                  {fmt(active.ai)}
                </span>
                <MiniBar widthClass={active.aiW} tone="ai" />
                <span className="mt-0.5 block text-[clamp(6px,0.9cqw,8px)] text-white/30">reference</span>
              </div>
              <div className="rounded-md bg-violet-400/[0.08] p-1.5 ring-1 ring-violet-400/15">
                <span className="block font-mono text-[clamp(6px,0.9cqw,8px)] uppercase tracking-[0.1em] text-violet-200/60">
                  Jury score
                </span>
                <span className="block font-mono text-[clamp(11px,1.8cqw,16px)] font-semibold tabular-nums text-cyan-200">
                  {fmt(active.jury)}
                </span>
                <MiniBar widthClass={active.juryW} tone="jury" />
                <span className="mt-0.5 block text-[clamp(6px,0.9cqw,8px)] text-violet-200/45">ranking</span>
              </div>
            </div>

            <div className="flex min-h-0 flex-col gap-1 overflow-hidden">
              <span className="font-mono text-[clamp(6px,0.9cqw,8px)] uppercase tracking-[0.12em] text-white/35">
                Judge findings
              </span>
              <div className="flex flex-wrap gap-1 overflow-hidden">
                {active.findings.map((f) => (
                  <span
                    key={f.label}
                    className={`truncate rounded-full px-1.5 py-0.5 text-[clamp(7px,1.1cqw,10px)] ring-1 ${TONE_CHIP[f.tone]}`}
                  >
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* bottom: tabbed Compare / Leaderboard / Shortlist */}
        <div className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-2">
          <div className="mb-1.5 flex items-center gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`rounded-full px-2 py-0.5 font-mono text-[clamp(7px,1cqw,9px)] uppercase tracking-[0.1em] transition-colors ${
                  tab === t.id
                    ? "bg-white/10 text-white ring-1 ring-white/15"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "leaderboard" ? (
            <ol className="flex flex-col gap-1">
              {ranked.slice(0, 3).map((r, idx) => (
                <li key={r.s.name} className="flex items-center gap-2">
                  <span className="w-3 shrink-0 font-mono text-[clamp(7px,1cqw,9px)] text-white/40">
                    {idx + 1}
                  </span>
                  <span className="w-[28%] shrink-0 truncate text-[clamp(8px,1.2cqw,10px)] text-white/80">
                    {r.s.name}
                  </span>
                  <MiniBar widthClass={r.s.juryW} tone="jury" />
                  <span className="w-7 shrink-0 text-right font-mono text-[clamp(8px,1.2cqw,10px)] tabular-nums text-cyan-200">
                    {fmt(r.s.jury)}
                  </span>
                </li>
              ))}
            </ol>
          ) : null}

          {tab === "compare" ? (
            <div className="flex flex-col gap-1">
              {[active, ranked[0].s].map((s, idx) => (
                <div key={`${s.name}-${idx}`} className="flex items-center gap-2">
                  <span className="w-[30%] shrink-0 truncate text-[clamp(8px,1.2cqw,10px)] text-white/75">
                    {idx === 0 ? s.name : `${s.name} · top`}
                  </span>
                  <MiniBar widthClass={s.juryW} tone="jury" />
                  <span className="w-7 shrink-0 text-right font-mono text-[clamp(8px,1.2cqw,10px)] tabular-nums text-cyan-200">
                    {fmt(s.jury)}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "shortlist" ? (
            <div className="flex min-h-[2.2rem] flex-wrap items-center gap-1">
              {shortlist.length === 0 ? (
                <span className="text-[clamp(8px,1.2cqw,10px)] text-white/35">
                  Star a startup to shortlist it.
                </span>
              ) : (
                shortlist.map((i) => (
                  <span
                    key={STARTUPS[i].name}
                    className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[clamp(8px,1.2cqw,10px)] text-amber-200 ring-1 ring-amber-400/20"
                  >
                    <span aria-hidden="true">★</span>
                    <span className="truncate">{STARTUPS[i].name}</span>
                  </span>
                ))
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
