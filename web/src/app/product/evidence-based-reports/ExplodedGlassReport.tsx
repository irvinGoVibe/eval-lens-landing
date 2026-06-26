"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * ExplodedGlassReport — the §3 "Anatomy of the report" visual.
 *
 * Three translucent glass report sheets stacked in depth; an autonomous GSAP
 * loop flies each one forward to the camera in turn (Summary → Score → Questions)
 * then recedes it, forever. Pure DOM + CSS transforms (translate / scale / opacity
 * / blur via a CSS var) — no canvas / WebGL / video. Honours prefers-reduced-motion
 * by leaving the static layered stack in place (timeline simply never builds).
 *
 * This is an INDEPENDENT loop (not scroll-driven), so a self-contained useGSAP
 * timeline is the right home — it doesn't belong in the scroll ScrollOrchestrator.
 *
 * Styles: `.egr-*` in `ds.css`. Mounts inside the LabPinnedSteps v3 media column
 * via its additive `mediaNode` prop.
 */

const N = 3;
/** Depth roles, by slot. [0] = front/active, [1] = middle, [2] = back. dx/dy are
 *  added on top of the -50/-50 centring baseline (so the stack fans up-right). */
const ROLES = [
  { dx: 0, dy: 0, scale: 1, opacity: 1, blur: 0, z: 30 },
  { dx: 12, dy: -9, scale: 0.94, opacity: 0.7, blur: 4, z: 20 },
  { dx: 24, dy: -18, scale: 0.88, opacity: 0.46, blur: 8, z: 10 },
];
const HOLD = 1.9; // seconds the active card stays in focus
const TRANS = 0.95; // seconds per layer transition

export function ExplodedGlassReport() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-egr-card]"),
      );
      if (cards.length !== N) return;

      // role of card `i` when card `phase` is the active/front one
      const roleOf = (i: number, phase: number) => ROLES[(i - phase + N) % N];
      const toVars = (r: (typeof ROLES)[number]) => ({
        xPercent: -50 + r.dx,
        yPercent: -50 + r.dy,
        scale: r.scale,
        opacity: r.opacity,
        "--egr-blur": r.blur,
      });

      // place phase 0 instantly
      cards.forEach((card, i) => {
        const r = roleOf(i, 0);
        gsap.set(card, { ...toVars(r), zIndex: r.z });
      });

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return; // static layered stack — no motion

      const tl = gsap.timeline({ repeat: -1 });
      for (let step = 1; step <= N; step++) {
        const phase = step % N; // 1,2,0 → active card index for this step
        cards.forEach((card, i) => {
          const r = roleOf(i, phase);
          tl.to(
            card,
            {
              ...toVars(r),
              duration: TRANS,
              ease: "power3.inOut",
              // restack as the move begins so the incoming card flies on top
              onStart: () => {
                card.style.zIndex = String(r.z);
              },
            },
            // first card of each group waits out the hold; the rest move with it
            i === 0 ? `+=${HOLD}` : "<",
          );
        });
        // gentle content "settle" on the newly-active card
        const body = cards[phase].querySelector<HTMLElement>("[data-egr-body]");
        if (body) {
          tl.fromTo(
            body,
            { yPercent: 3, opacity: 0.5 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "<0.25",
          );
        }
      }
    },
    { scope },
  );

  return (
    <div className="egr" ref={scope} aria-hidden="true">
      <div className="egr__glow" />
      <div className="egr__scene">
        {/* Card 1 — Project Summary */}
        <article className="egr-card egr-card--summary" data-egr-card>
          <div className="egr-card__inner" data-egr-body>
            <header className="egr-card__head">
              <span className="egr-chip">Project Summary</span>
              <span className="egr-score">
                Score <b>7.8</b>
              </span>
            </header>
            <p className="egr-desc">
              B2B compliance platform for mid-market teams.
            </p>
            <div className="egr-cols">
              <div className="egr-col">
                <span className="egr-col__h egr-col__h--up">Strengths</span>
                <span className="egr-tag">Clear ICP</span>
                <span className="egr-tag">Strong early traction</span>
              </div>
              <div className="egr-col">
                <span className="egr-col__h egr-col__h--down">Weaknesses</span>
                <span className="egr-tag">Limited moat detail</span>
                <span className="egr-tag">Sparse financials</span>
              </div>
            </div>
            <div className="egr-verify">
              <span className="egr-col__h">Verify live</span>
              <div className="egr-verify__row">
                <span className="egr-tag egr-tag--ghost">
                  Acquisition efficiency
                </span>
                <span className="egr-tag egr-tag--ghost">Sales cycle</span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2 — AI Score Report */}
        <article className="egr-card egr-card--score" data-egr-card>
          <div className="egr-card__inner" data-egr-body>
            <header className="egr-card__head">
              <span className="egr-chip">AI Score Report</span>
              <span className="egr-score">
                Confidence <b>82%</b>
              </span>
            </header>
            <div className="egr-dims">
              {[
                ["Market", 8.2],
                ["Team", 7.4],
                ["Traction", 6.9],
                ["Business model", 7.6],
                ["Product", 7.8],
                ["Execution", 7.1],
              ].map(([name, v]) => (
                <div className="egr-dim" key={name as string}>
                  <span className="egr-dim__n">{name}</span>
                  <span className="egr-dim__bar">
                    <i style={{ width: `${((v as number) / 10) * 100}%` }} />
                  </span>
                  <span className="egr-dim__v">{(v as number).toFixed(1)}</span>
                </div>
              ))}
            </div>
            <div className="egr-cols egr-cols--tight">
              <div className="egr-col">
                <span className="egr-col__h egr-col__h--up">Supports</span>
                <span className="egr-tag">Strong ICP</span>
                <span className="egr-tag">Good retention</span>
              </div>
              <div className="egr-col">
                <span className="egr-col__h egr-col__h--down">Lowers</span>
                <span className="egr-tag">No CAC detail</span>
                <span className="egr-tag">Thin moat</span>
              </div>
            </div>
            <div className="egr-matrix" aria-hidden="true">
              <span className="egr-matrix__lbl">Judge matrix</span>
              <div className="egr-matrix__grid">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                  <i
                    key={c}
                    className={`egr-cell${[0, 1, 4, 5, 7].includes(c) ? " on" : ""}${c === 5 ? " warn" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Card 3 — Questions for Live Q&A */}
        <article className="egr-card egr-card--questions" data-egr-card>
          <div className="egr-card__inner" data-egr-body>
            <header className="egr-card__head">
              <span className="egr-chip">Questions for Live Q&amp;A</span>
            </header>
            <ul className="egr-q">
              <li className="egr-qitem egr-qitem--crit">
                <span className="egr-qdot" />
                <span className="egr-qtext">
                  How will CAC scale with paid growth?
                  <span className="egr-qtag">Go-to-market</span>
                </span>
              </li>
              <li className="egr-qitem egr-qitem--imp">
                <span className="egr-qdot" />
                <span className="egr-qtext">
                  What drives retention beyond compliance need?
                  <span className="egr-qtag">Product</span>
                </span>
              </li>
              <li className="egr-qitem egr-qitem--imp">
                <span className="egr-qdot" />
                <span className="egr-qtext">
                  Why is this moat durable?
                  <span className="egr-qtag">Competition</span>
                </span>
              </li>
              <li className="egr-qitem egr-qitem--opt">
                <span className="egr-qdot" />
                <span className="egr-qtext">
                  What changed since the last raise?
                  <span className="egr-qtag">Execution</span>
                </span>
              </li>
            </ul>
            <div className="egr-qlegend">
              <span className="egr-qleg egr-qleg--crit">Critical</span>
              <span className="egr-qleg egr-qleg--imp">Important</span>
              <span className="egr-qleg egr-qleg--opt">Optional</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
