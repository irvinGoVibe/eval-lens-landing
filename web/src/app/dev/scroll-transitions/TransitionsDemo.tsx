"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollFX } from "@/components/ScrollFX";
import { StatementHero, FullStatement } from "@/components/ds";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Tone-flip transition between TWO real DS sections:
 *   [ light StatementHero ]  →  [ tone-flip transition ]  →  [ dark FullStatement ]
 *
 * The transition (pinned, scrubbed):
 *   1. the heading (eyebrow + lens accent + subtitle) rides UP into centre and
 *      HOLDS there;
 *   2. the background flips light → dark via a 3-layer OPACITY crossfade (no
 *      moving seam) that passes through a vivid aurora BLOOM, not grey;
 *   3. the heading inverts black → white as the dark surface arrives.
 *
 * DS sections need `.section-lab .ds` on the container + a mounted <ScrollFX/>
 * (their data-reveal is opacity:0 otherwise). ScrollFX drives the sections'
 * reveals; GSAP ScrollTrigger drives the transition pin — different elements,
 * so the two engines coexist on this dev stand.
 */
export function TransitionsDemo() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const cs = getComputedStyle(scope);
      const fgDark = cs.getPropertyValue("--fg").trim() || "#1d1d1f";
      const fgLight = cs.getPropertyValue("--fg-on-dark").trim() || "#f4f4fb";

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".tf-bg--dark", { opacity: 1 });
        gsap.set(".tf-content", { yPercent: 0, autoAlpha: 1, color: fgLight });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".tf",
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.7,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl
        // 1 · heading rides UP into centre and settles (never above centre)
        .fromTo(".tf-content", { yPercent: 8, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.22 }, 0)
        // 2 · 3-layer opacity crossfade through a vivid aurora bloom (no seam)
        .to(".tf-bg--light", { opacity: 0, duration: 0.45 }, 0.2)
        .fromTo(".tf-bg--mid", { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.18)
        .to(".tf-bg--mid", { opacity: 0, duration: 0.4 }, 0.6)
        .fromTo(".tf-bg--dark", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5)
        // …heading inverts black → white as the bloom darkens into the dark end
        .fromTo(".tf-content", { color: fgDark }, { color: fgLight, duration: 0.32 }, 0.52);

      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <main className="tg section-lab ds" ref={root}>
      {/* ── TOP · a real light section ───────────────────────────────────────*/}
      <StatementHero
        surface="light"
        marker="Top · light section"
        version={1}
        eyebrow="The brief"
        titleLead="AI prepares the analysis — a human"
        titleAccent="decides"
        sub="A real light section to scroll from. Keep going — it flips into the dark section below."
        ctas={[
          { label: "Get started", href: "#" },
          { label: "How it works", href: "#" },
        ]}
        media={{
          ratio: "16/9",
          label: "Hero · lens",
          hint: "Lens-gradient violet→cyan over Apple-neutral, calm depth",
          ariaLabel: "Hero lens illustration",
        }}
      />

      {/* ── MIDDLE · the tone-flip transition ────────────────────────────────*/}
      <section className="tf">
        <div className="tf-pin">
          <div className="tf-bg tf-bg--light" aria-hidden="true" />
          <div className="tf-bg tf-bg--mid" aria-hidden="true" />
          <div className="tf-bg tf-bg--dark" aria-hidden="true" />
          <div className="tf-content">
            <div className="tf-lens" aria-hidden="true" />
            <span className="tf-eyebrow">
              <span className="tf-dot" aria-hidden="true" />
              evidence in · verdict out
            </span>
            <h2 className="tf-h">
              Light becomes <span className="tf-accent">dark</span>.
            </h2>
            <p className="tf-sub">
              The gradient dissolves through a bloom — the heading holds the centre and inverts.
            </p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM · a real dark section ─────────────────────────────────────*/}
      <FullStatement
        surface="ink"
        marker="Bottom · dark section"
        ariaLabel="Full-bleed statement"
        eyebrow="Landed on dark"
        titleLead="One continuous surface —"
        titleAccent="no seam"
        titleTrail="no cut"
        sub="The dark section the transition lands on — the flip carried the page here in one move."
      />

      {/* ScrollFX REQUIRED so the DS sections' data-reveal elements appear. */}
      <ScrollFX />
    </main>
  );
}
