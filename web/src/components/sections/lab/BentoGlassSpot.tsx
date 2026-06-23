"use client";

import { useEffect, useRef } from "react";

/**
 * Enhancer for the ink (glass) `LabBento` — adds the "travelling spot": one
 * muted colour patch that lives UNDER the glass tiles. On hovering a supporting
 * tile, a compact blob peels off the centre of the feature tile's nearest
 * parent blob, creeps across the grid (frosted by each pane it passes beneath),
 * and once it crosses the hovered tile's border spreads to fill it — drifting
 * back home on pointer-leave.
 *
 * Renders nothing visible: it finds its parent `.lab-bento` section, injects a
 * `.lab-bento__spot` overlay into every `.lab-bento__grid` (all version copies)
 * and drives it via pointer delegation. Geometry-based, so it adapts to each
 * version's grid. Mounted by LabBento only on `surface="ink"`; no-op under
 * reduced-motion.
 */
export function BentoGlassSpot() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const section = anchor.closest(".lab-bento");
    if (!section) return;

    const cleanups: Array<() => void> = [];

    // Frost layers — inject the SAME .ds-glass overlays the RichBento tiles
    // carry (__wash + __orbit + __glare) into every tile, so the fill/sheen is
    // identical. Static (orbit drifts via CSS keyframe, auto-off under
    // reduced-motion); recoloured to this bento's blue/cyan in globals.css.
    section.querySelectorAll<HTMLElement>(".lab-bento__tile").forEach((tile) => {
      cleanups.push(injectGlassLayers(tile));
    });

    // Travelling spot — motion; skipped under reduced-motion (CSS also hides it).
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section
        .querySelectorAll<HTMLElement>(".lab-bento__grid")
        .forEach((grid) => cleanups.push(attachSpot(grid)));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <span ref={anchorRef} hidden aria-hidden="true" />;
}

/** Inject the shared `.ds-glass` frost layers (wash + orbit + glare) into a
 *  tile so it renders the exact RichBento glass material. Returns a teardown
 *  that removes them. No-op if already injected. */
function injectGlassLayers(tile: HTMLElement): () => void {
  if (tile.querySelector(":scope > .ds-glass__wash")) return () => {};
  const layers = ["ds-glass__wash", "ds-glass__orbit", "ds-glass__glare"].map((cls) => {
    const el = document.createElement("div");
    el.className = cls;
    el.setAttribute("aria-hidden", "true");
    return el;
  });
  // prepend in order so they sit BEHIND the tile's content (wash/orbit z:0,
  // glare z:1, content z:1 but later in DOM → above the glare)
  const first = tile.firstChild;
  for (const el of layers) tile.insertBefore(el, first);
  return () => layers.forEach((el) => el.remove());
}

/** Wire a single grid: inject the spot, run the travel/bloom logic. Returns a
 *  teardown that removes the spot and its listeners. */
function attachSpot(grid: HTMLElement): () => void {
  const FEATURE = ".lab-bento__tile--feature";
  const SMALL = ".lab-bento__tile:not(.lab-bento__tile--feature)";

  const spot = document.createElement("div");
  spot.className = "lab-bento__spot";
  spot.setAttribute("aria-hidden", "true");
  grid.insertBefore(spot, grid.firstChild);

  const TRAVEL = 168; // compact diameter while creeping under the glass
  const CROSS_MS = 1600; // wall → centre — a slow, smooth glide
  const BLOOM_MS = 850; // slow spread once inside the target tile
  const TRAVEL_OP = 0.44; // the detached piece's weight while it flows (visible)
  const BLOOM_OP = 0.62; // brighter as it settles into the target card
  const inset = 6; // spread fills (almost) the WHOLE tile, not a small patch
  let bloomTimer = 0;
  let originX = 0;
  let originY = 0;

  // drive the transition inline (per-segment transform duration; also dodges the
  // globals.css hot-reload cache). Width/height/radius keep the slow bloom curve.
  const applyTransition = (transformMs: number) => {
    spot.style.transition =
      `transform ${transformMs}ms cubic-bezier(.55,0,.3,1),` +
      `width ${BLOOM_MS}ms cubic-bezier(.33,.7,.3,1),` +
      `height ${BLOOM_MS}ms cubic-bezier(.33,.7,.3,1),` +
      `border-radius ${BLOOM_MS}ms cubic-bezier(.33,.7,.3,1),` +
      `opacity 500ms ease`;
  };

  // the feature tile's drifting blobs (feature-local fractions + their hue):
  // the detaching piece takes the colour of whichever it peels off nearest.
  const BLOBS = [
    { fx: 0.3, fy: 0.4, c: "70, 140, 255" }, // blue, upper-left
    { fx: 0.72, fy: 0.62, c: "46, 197, 232" }, // cyan, lower-right
    { fx: 0.52, fy: 0.82, c: "120, 170, 255" }, // light blue, bottom
  ];

  const centerOn = (cx: number, cy: number) => {
    spot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  };
  const shrink = () => {
    spot.style.width = `${TRAVEL}px`;
    spot.style.height = `${TRAVEL}px`;
    spot.style.borderRadius = "50%";
  };

  const enterFraction = (
    fx: number,
    fy: number,
    cx: number,
    cy: number,
    rect: DOMRect,
    gRect: DOMRect,
  ) => {
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

  // ONE smooth flow from (fromX,fromY) to the target tile's CENTRE over CROSS_MS.
  // Opacity ramps from the dim travel weight up to the bright one across the whole
  // glide (ease-in → stays dim most of the way, brightest as it nears the centre),
  // so it really FLOWS rather than jumping + popping. Must be called with the
  // spot already sitting at the dim travel opacity.
  const crossTo = (fromX: number, fromY: number, tcx: number, tcy: number, el: Element, r: DOMRect, g: DOMRect) => {
    // stay compact most of the glide (pressed to the wall) so the wall→centre
    // flow really READS, then spread near the centre
    const spreadDelay = Math.max(enterFraction(fromX, fromY, tcx, tcy, r, g), 0.6) * CROSS_MS;
    spot.style.transition =
      `transform ${CROSS_MS}ms cubic-bezier(.33,0,.2,1),` +
      `width ${BLOOM_MS}ms cubic-bezier(.33,.7,.3,1),` +
      `height ${BLOOM_MS}ms cubic-bezier(.33,.7,.3,1),` +
      `border-radius ${BLOOM_MS}ms cubic-bezier(.33,.7,.3,1),` +
      `opacity ${CROSS_MS}ms ease-in`;
    shrink();
    centerOn(tcx, tcy);
    spot.style.opacity = `${BLOOM_OP}`; // brighter the closer it gets to the centre
    // spread — begins as it crosses the border, growing from there (not the centre)
    bloomTimer = window.setTimeout(() => {
      spot.classList.add("is-bloom");
      spot.style.width = `${Math.max(0, r.width - inset * 2)}px`;
      spot.style.height = `${Math.max(0, r.height - inset * 2)}px`;
      spot.style.borderRadius = getComputedStyle(el).borderRadius;
      // it has landed → start the gentle breathing pulse
      spot.style.animation = "lab-bento-spot-pulse 2.8s ease-in-out infinite";
    }, spreadDelay);
  };

  const fitTo = (el: Element) => {
    window.clearTimeout(bloomTimer);
    spot.style.animation = ""; // no pulse while it's flowing
    const g = grid.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const tcx = r.left - g.left + r.width / 2;
    const tcy = r.top - g.top + r.height / 2;

    spot.classList.remove("is-bloom");

    if (!spot.classList.contains("is-on")) {
      // Emerging from rest: the piece is BORN near the feature card's edge that
      // faces the target (its nearest blob's shade), then FLOWS in one smooth
      // glide across to the target tile, brightening toward its centre.
      const home = grid.querySelector(FEATURE);
      if (!home) return;
      const fr = home.getBoundingClientRect();
      // nearest blob centre → colour + a starting point
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
      // dim + diffuse — the SAME muted weight as the feature's unselected blob
      spot.style.background = `radial-gradient(58% 58% at 46% 42%, rgba(${best.c}, 0.42), transparent 74%)`;

      // appear INSIDE the target tile, pressed to the wall nearest that blob —
      // clamp the source blob onto the target's box → its near edge point
      const inset = 14;
      const ox = Math.min(Math.max(bcx, r.left - g.left + inset), r.right - g.left - inset);
      const oy = Math.min(Math.max(bcy, r.top - g.top + inset), r.bottom - g.top - inset);

      // born pressed to that wall, compact + dim (no pop)
      spot.style.transition = "none";
      shrink();
      centerOn(ox, oy);
      spot.style.opacity = `${TRAVEL_OP}`;
      void spot.offsetWidth;
      spot.classList.add("is-on");

      // glide from the wall to the centre, brightening as it goes in
      crossTo(ox, oy, tcx, tcy, el, r, g);
    } else {
      // already out (tile → tile): dim instantly, then flow on to the new target
      spot.style.transition = "none";
      spot.style.opacity = `${TRAVEL_OP}`;
      void spot.offsetWidth;
      crossTo(originX, originY, tcx, tcy, el, r, g);
    }

    originX = tcx;
    originY = tcy;
  };

  const park = () => {
    window.clearTimeout(bloomTimer);
    spot.style.animation = ""; // stop pulsing on the way home
    spot.classList.remove("is-on", "is-bloom");
    const home = grid.querySelector(FEATURE);
    if (!home) return;
    const g = grid.getBoundingClientRect();
    const r = home.getBoundingClientRect();
    applyTransition(CROSS_MS);
    spot.style.opacity = "0";
    shrink();
    centerOn(r.left - g.left + r.width / 2, r.top - g.top + r.height / 2);
  };

  // park silently on mount — no transition, so it doesn't slide in from 0,0
  const home0 = grid.querySelector(FEATURE);
  if (home0) {
    const g0 = grid.getBoundingClientRect();
    const r0 = home0.getBoundingClientRect();
    spot.style.transition = "none";
    shrink();
    centerOn(r0.left - g0.left + r0.width / 2, r0.top - g0.top + r0.height / 2);
    void spot.offsetWidth;
  }

  const onOver = (e: PointerEvent) => {
    const target = e.target as Element | null;
    const small = target?.closest(SMALL);
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
    spot.remove();
  };
}
