"use client";

import { useEffect, useRef } from "react";
import { RichGlass } from "./RichGlass";

/**
 * Page-local bento whose tiles use the Aurora "rich · wash + sheen
 * (scroll-bound)" glass (shared `.ds-glass` material). Same overview content as
 * the DS bento; production DS <Bento> stays untouched. Asymmetric layout: a
 * large feature tile, a stacked right column, and a wide tile below.
 *
 * Hover interaction: the colour blob that lives in the big feature tile breaks
 * free and flies across the grid — gliding OVER the other tiles (screen-blended
 * glow) — to land on whichever small tile the pointer is over, then drifts back
 * home when the pointer leaves. Implemented as one shared `.lgx-rb__spot`
 * overlay whose translate is driven from JS via pointer delegation on the grid.
 */

export type RichBentoItem = { tag: string; title: string; body: string };

export function RichBento({
  eyebrow,
  title,
  titleAccent,
  sub,
  items,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  sub: string;
  items: RichBentoItem[];
}) {
  const [feature, topRight, midRight, bottom] = items;

  const gridRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const spot = spotRef.current;
    if (!grid || !spot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const TRAVEL = 168; // compact diameter while creeping under the glass
    const TRAVEL_MS = 820; // matches the CSS transform duration (0.82s)
    const inset = 6; // spread fills (almost) the WHOLE tile, not a small patch
    let bloomTimer = 0;

    // where the current flight starts (grid coords) — feeds the border-crossing
    // calc so the spot only begins spreading once it enters the target tile
    let originX = 0;
    let originY = 0;

    // the feature tile's drifting blobs (feature-local fractions + their hue):
    // the detaching piece takes the colour of whichever it peels off nearest.
    const BLOBS = [
      { fx: 0.3, fy: 0.4, c: "70, 140, 255" }, // blue, upper-left
      { fx: 0.72, fy: 0.62, c: "46, 197, 232" }, // cyan, lower-right
      { fx: 0.52, fy: 0.82, c: "120, 170, 255" }, // light blue, bottom
    ];

    // Centre the spot on a point in grid-space (size-agnostic: the trailing
    // -50%,-50% keeps it centred so a later bloom grows from the middle).
    const centerOn = (cx: number, cy: number) => {
      spot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    };
    const shrink = () => {
      spot.style.width = `${TRAVEL}px`;
      spot.style.height = `${TRAVEL}px`;
      spot.style.borderRadius = "50%";
    };

    // Fraction (0..1) of the from→target path at which it first enters the
    // target tile's box — i.e. the instant it crosses the tile's border.
    const enterFraction = (fx: number, fy: number, cx: number, cy: number, rect: DOMRect, gRect: DOMRect) => {
      const cl = rect.left - gRect.left;
      const cr = rect.right - gRect.left;
      const ct = rect.top - gRect.top;
      const cb = rect.bottom - gRect.top;
      const dx = cx - fx || 1e-6;
      const dy = cy - fy || 1e-6;
      let tx = 0;
      let ty = 0;
      if (fx < cl) tx = (cl - fx) / dx;
      else if (fx > cr) tx = (cr - fx) / dx;
      if (fy < ct) ty = (ct - fy) / dy;
      else if (fy > cb) ty = (cb - fy) / dy;
      return Math.min(1, Math.max(0, Math.max(tx, ty)));
    };

    // Send the spot to `el`: creep there small + muted, then — once it crosses
    // the tile's border — spread gradually to fill the tile's box.
    const fitTo = (el: Element) => {
      window.clearTimeout(bloomTimer);
      const g = grid.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const tcx = r.left - g.left + r.width / 2;
      const tcy = r.top - g.top + r.height / 2;
      let fromX = originX;
      let fromY = originY;

      // Emerging from rest? The piece flies out of the CENTRE of the feature
      // tile's nearest parent blob (deep inside the big card), taking that
      // blob's colour — so it stays compact across the card + the gap and only
      // spreads once it crosses the target tile's border.
      // (When moving tile→tile the spot is already lit, so it just flows on.)
      if (!spot.classList.contains("is-on")) {
        const home = grid.querySelector(".lgx-rb__cell--feature");
        if (home) {
          const fr = home.getBoundingClientRect();
          // pick the blob whose centre is nearest the target; fly from there
          let best = BLOBS[0];
          let bcx = 0;
          let bcy = 0;
          let bestD = Infinity;
          for (const b of BLOBS) {
            const cxg = fr.left - g.left + b.fx * fr.width;
            const cyg = fr.top - g.top + b.fy * fr.height;
            const d = (cxg - tcx) ** 2 + (cyg - tcy) ** 2;
            if (d < bestD) {
              bestD = d;
              best = b;
              bcx = cxg;
              bcy = cyg;
            }
          }
          // same hue + muted weight as the feature tile's own blob (not lighter)
          spot.style.background = `radial-gradient(58% 58% at 46% 42%, rgba(${best.c}, 0.6), transparent 73%)`;
          fromX = bcx;
          fromY = bcy;
          const keep = spot.style.transition;
          spot.style.transition = "none";
          shrink();
          centerOn(bcx, bcy);
          void spot.offsetWidth;
          spot.style.transition = keep;
        }
      }

      spot.classList.add("is-on");
      spot.classList.remove("is-bloom");
      // creep over — compact — to the tile's centre
      shrink();
      centerOn(tcx, tcy);
      // start spreading the moment it crosses the tile's border, not at centre
      const delay = enterFraction(fromX, fromY, tcx, tcy, r, g) * TRAVEL_MS;
      bloomTimer = window.setTimeout(() => {
        spot.classList.add("is-bloom");
        spot.style.width = `${Math.max(0, r.width - inset * 2)}px`;
        spot.style.height = `${Math.max(0, r.height - inset * 2)}px`;
        spot.style.borderRadius = getComputedStyle(el).borderRadius;
      }, delay);

      originX = tcx;
      originY = tcy;
    };

    // Resting home: shrink, fade out, creep back under the feature tile. The
    // feature keeps its OWN blob — only this spot travels.
    const park = () => {
      window.clearTimeout(bloomTimer);
      spot.classList.remove("is-on", "is-bloom");
      const home = grid.querySelector(".lgx-rb__cell--feature");
      if (!home) return;
      const g = grid.getBoundingClientRect();
      const r = home.getBoundingClientRect();
      shrink();
      centerOn(r.left - g.left + r.width / 2, r.top - g.top + r.height / 2);
    };

    // park silently on mount — no transition, so it doesn't slide in from 0,0
    const prev = spot.style.transition;
    spot.style.transition = "none";
    park();
    // force reflow so the parked position commits before transitions resume
    void spot.offsetWidth;
    spot.style.transition = prev;

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const small = target?.closest(".lgx-rb__cell--mr, .lgx-rb__cell--b");
      if (small && grid.contains(small)) fitTo(small);
      else park();
    };

    grid.addEventListener("pointermove", onOver);
    grid.addEventListener("pointerleave", park);
    window.addEventListener("resize", park, { passive: true });

    return () => {
      window.clearTimeout(bloomTimer);
      grid.removeEventListener("pointermove", onOver);
      grid.removeEventListener("pointerleave", park);
      window.removeEventListener("resize", park);
    };
  }, []);

  const inner = (it: RichBentoItem, big = false) => (
    <>
      <span className="lgx-rb__tag">{it.tag}</span>
      <h3 className={`lgx-rb__ctitle${big ? " lgx-rb__ctitle--big" : ""}`}>{it.title}</h3>
      <p className="lgx-rb__body">{it.body}</p>
    </>
  );

  return (
    <section className="lgx-rb" aria-label={title}>
      <div className="lgx-rb__head">
        <span className="lgx-rb__eyebrow"><span className="lgx-rb__dot" />{eyebrow}</span>
        <h2 className="lgx-rb__title">
          {title}
          {titleAccent ? <> <span className="lgx-rb__grad">{titleAccent}</span></> : null}
        </h2>
        <p className="lgx-rb__sub">{sub}</p>
      </div>

      <div className="lgx-rb__grid" ref={gridRef}>
        <div className="lgx-rb__spot" aria-hidden="true" ref={spotRef} />
        {feature ? (
          <RichGlass className="lgx-rb__cell lgx-rb__cell--feature">{inner(feature, true)}</RichGlass>
        ) : null}
        <div className="lgx-rb__col">
          {topRight ? (
            <RichGlass className="lgx-rb__cell lgx-rb__cell--mr">{inner(topRight)}</RichGlass>
          ) : null}
          {midRight ? (
            <RichGlass className="lgx-rb__cell lgx-rb__cell--mr">{inner(midRight)}</RichGlass>
          ) : null}
        </div>
        {bottom ? (
          <RichGlass className="lgx-rb__cell lgx-rb__cell--b">{inner(bottom)}</RichGlass>
        ) : null}
      </div>
    </section>
  );
}
