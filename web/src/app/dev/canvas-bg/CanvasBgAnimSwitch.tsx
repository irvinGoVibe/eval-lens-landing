"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dev switcher for the dark canvas background motion (`.ds-canvas__bg--lobes-dark`).
 *
 *   • anim 1 — the fixed-centre orbit (pure CSS; blobs jostle around the middle
 *     of the viewport, edges clamped black).
 *   • anim 2 — SCROLL-BOUND flow: the blobs' vertical position is tied to page
 *     scroll via the `--canvas-flow` custom property, so the colour streams DOWN
 *     from section to section as you scroll instead of holding centre. Driven by
 *     a single GSAP ScrollTrigger (scrubbed), mirroring CanvasBlobs.
 *
 * Toggling sets `data-anim` on the dark layer; the CSS keys off it. The
 * ScrollTrigger only lives while anim 2 is active and is torn down on switch.
 */
export function CanvasBgAnimSwitch() {
  const [anim, setAnim] = useState<1 | 2>(1);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".ds-canvas__bg--lobes-dark");
    if (!el) return;
    el.setAttribute("data-anim", String(anim));

    if (anim !== 2) {
      el.style.removeProperty("--canvas-flow");
      return;
    }

    // span the blobs' Y from above the top to below the bottom across the whole
    // page scroll → the colour flows down through every section.
    const FLOW = 170; // total vh travel (−85vh … +85vh)
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        el.style.setProperty("--canvas-flow", `${self.progress * FLOW - FLOW / 2}vh`);
      },
    });

    return () => {
      st.kill();
      el.style.removeProperty("--canvas-flow");
    };
  }, [anim]);

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 60,
        display: "flex",
        gap: 6,
        alignItems: "center",
        padding: "6px 8px",
        borderRadius: 999,
        background: "rgba(10,10,16,.72)",
        border: "1px solid rgba(255,255,255,.14)",
        backdropFilter: "blur(8px)",
        font: "600 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace",
        color: "rgba(255,255,255,.6)",
        letterSpacing: ".06em",
      }}
    >
      <span style={{ paddingLeft: 4, opacity: 0.7 }}>bg anim</span>
      {([1, 2] as const).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => setAnim(n)}
          style={{
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: 999,
            border: "none",
            background: anim === n ? "rgba(99,102,241,.9)" : "rgba(255,255,255,.08)",
            color: anim === n ? "#fff" : "rgba(255,255,255,.55)",
            font: "inherit",
          }}
        >
          {n === 1 ? "1 · orbit" : "2 · flow"}
        </button>
      ))}
    </div>
  );
}
