"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * §5 Spread (consistency-reliability) — the three judge-target lenses
 * (Consensus / Split / Conflict), each a separate image staggered by CSS
 * (`.cr-lens--*`, page-local). This client wrapper makes them feel alive:
 *
 *   • idle float — each lens drifts on its own slow sine (desynced via phase),
 *     plus a faint 3D wobble, so they look like they hang in the air;
 *   • pointer parallax — as the cursor moves over the section the lenses tilt
 *     in 3D (rotateY = lean to the sides, rotateX = pitch) by a per-lens depth
 *     factor, so they lean by different amounts → parallax depth.
 *
 * One rAF loop writes a combined transform straight to each lens (no per-frame
 * React state). Positioning stays in CSS (top/left), so the transform only adds
 * float + tilt. Disabled on reduced-motion and on the mobile stacked layout.
 */
const LENSES = [
  { cls: "cr-lens--consensus", src: "/assets/consistency/spread-target-consensus.webp", w: 474, h: 638, sizes: "(max-width:880px) 30vw, 200px", depth: 0.7, phase: 0 },
  { cls: "cr-lens--split", src: "/assets/consistency/spread-target-split.webp", w: 543, h: 650, sizes: "(max-width:880px) 30vw, 224px", depth: 1, phase: 2.1 },
  { cls: "cr-lens--conflict", src: "/assets/consistency/spread-target-conflict.webp", w: 540, h: 645, sizes: "(max-width:880px) 30vw, 222px", depth: 0.85, phase: 4.2 },
] as const;

export function SpreadLensScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 880px)").matches) return;

    const lenses = LENSES.map((L) => scene.querySelector<HTMLElement>(`.${L.cls}`));
    const zone = (scene.closest("section") as HTMLElement | null) ?? scene;

    let tpx = 0;
    let tpy = 0;
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      const r = scene.getBoundingClientRect();
      tpx = (e.clientX - r.left) / r.width - 0.5;
      tpy = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      tpx = 0;
      tpy = 0;
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      px += (tpx - px) * 0.06;
      py += (tpy - py) * 0.06;
      for (let i = 0; i < lenses.length; i++) {
        const el = lenses[i];
        if (!el) continue;
        const { depth, phase } = LENSES[i];
        const fx = Math.sin(t * 0.42 + phase) * 6;
        const fy = Math.cos(t * 0.36 + phase) * 8;
        const fz = Math.sin(t * 0.3 + phase) * 1;
        const ry = px * 15 * depth + Math.sin(t * 0.28 + phase) * 1.6;
        const rx = -py * 10 * depth + Math.cos(t * 0.24 + phase) * 1.2;
        el.style.transform =
          `translate3d(${fx.toFixed(2)}px, ${fy.toFixed(2)}px, 0) ` +
          `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${fz.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="cr-spread-scene" ref={sceneRef} aria-hidden="true" style={{ perspective: "1100px" }}>
      {LENSES.map((L) => (
        <Image
          key={L.cls}
          className={`cr-lens ${L.cls}`}
          src={L.src}
          alt=""
          width={L.w}
          height={L.h}
          sizes={L.sizes}
          style={{ willChange: "transform" }}
        />
      ))}
    </div>
  );
}
