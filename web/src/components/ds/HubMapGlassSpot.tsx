"use client";

import { useEffect, useRef } from "react";

/**
 * Enhancer for the ink (glass) `HubMap` — the clean-DS twin of `BentoGlassSpot`,
 * targeting the `.ds-hubmap*` namespace instead of `.lab-bento*`. Adds the
 * "travelling spot": one muted colour patch that lives UNDER the glass cards. On
 * hovering a supporting tile, a compact blob peels off the feature tile's nearest
 * parent blob, creeps across the grid (frosted by each pane it passes beneath),
 * spreads to fill the hovered tile, then fades on leave.
 *
 * Renders nothing visible: finds its parent `.ds-hubmap` section, injects the
 * `.ds-glass__*` sheen layers into every card and a `.ds-hubmap__spot` overlay
 * into every `.ds-hubmap__grid` (all version copies), and drives them via pointer
 * delegation. Mounted by `HubMap` only on `surface="ink"`; no-op under
 * reduced-motion. The card glass material itself is pure CSS (see ds.css).
 *
 * NOTE: this is a near-verbatim port of `BentoGlassSpot`; kept separate so the
 * clean DS does not depend on the deprecated `.lab-*` substrate. Dedup candidate
 * once a shared glass primitive is extracted.
 */
export function HubMapGlassSpot() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const section = anchor.closest(".ds-hubmap");
    if (!section) return;

    const cleanups: Array<() => void> = [];

    section.querySelectorAll<HTMLElement>(".ds-hubmap__card").forEach((tile) => {
      cleanups.push(injectGlassLayers(tile));
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section
        .querySelectorAll<HTMLElement>(".ds-hubmap__grid")
        .forEach((grid) => cleanups.push(attachSpot(grid)));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <span ref={anchorRef} hidden aria-hidden="true" />;
}

/** Inject the shared `.ds-glass` frost layers (wash + orbit + glare) into a card
 *  so it renders the exact RichBento glass material. Returns a teardown. No-op if
 *  already injected. */
function injectGlassLayers(tile: HTMLElement): () => void {
  if (tile.querySelector(":scope > .ds-glass__wash")) return () => {};
  const layers = ["ds-glass__wash", "ds-glass__orbit", "ds-glass__glare"].map((cls) => {
    const el = document.createElement("div");
    el.className = cls;
    el.setAttribute("aria-hidden", "true");
    return el;
  });
  const first = tile.firstChild;
  for (const el of layers) tile.insertBefore(el, first);
  return () => layers.forEach((el) => el.remove());
}

/** Wire a single grid: inject the spot, run the travel/bloom logic. Returns a
 *  teardown that removes the spot and its listeners. */
function attachSpot(grid: HTMLElement): () => void {
  const FEATURE = ".ds-hubmap__card--feature";
  const SMALL = ".ds-hubmap__card:not(.ds-hubmap__card--feature)";

  const spot = document.createElement("div");
  spot.className = "ds-hubmap__spot";
  spot.setAttribute("aria-hidden", "true");
  grid.insertBefore(spot, grid.firstChild);

  const TRAVEL = 168;
  const BIRTH_SIZE = 300;
  const CROSS_MS = 1600;
  const TRAVEL_OP = 0.1;
  const BLOOM_OP = 0.62;
  const BIRTH_BLUR = 120;
  const LAND_BLUR = 26;
  const inset = 6;
  let anims: Animation[] = [];
  let currentTile: Element | null = null;
  let fading = false;

  const transformStr = (cx: number, cy: number) =>
    `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;

  const currentCenter = () => {
    const sr = spot.getBoundingClientRect();
    const gg = grid.getBoundingClientRect();
    return { x: sr.left - gg.left + sr.width / 2, y: sr.top - gg.top + sr.height / 2 };
  };

  const stopAnim = (commit: boolean) => {
    for (const a of anims) {
      if (commit) {
        try {
          a.commitStyles();
        } catch {
          /* element detached — nothing to freeze */
        }
      }
      a.cancel();
    }
    anims = [];
  };

  const BLOBS = [
    { fx: 0.3, fy: 0.4, c: "70, 140, 255" },
    { fx: 0.72, fy: 0.62, c: "46, 197, 232" },
    { fx: 0.52, fy: 0.82, c: "120, 170, 255" },
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

  const glide = (
    fromX: number,
    fromY: number,
    tcx: number,
    tcy: number,
    el: Element,
    r: DOMRect,
    birth: boolean,
  ) => {
    const enter = Math.max(
      enterFraction(fromX, fromY, tcx, tcy, r, grid.getBoundingClientRect()),
      0.6,
    );
    const fullW = Math.max(0, r.width - inset * 2);
    const fullH = Math.max(0, r.height - inset * 2);
    const radius = getComputedStyle(el).borderRadius;

    spot.classList.add("is-bloom");
    spot.style.animation =
      "ds-hubmap-spot-pulse 2.8s ease-in-out infinite, ds-hubmap-spot-sway 9s ease-in-out infinite";

    const motionKf = birth
      ? [
          { offset: 0, transform: transformStr(fromX, fromY), width: `${BIRTH_SIZE}px`, height: `${BIRTH_SIZE}px`, borderRadius: "50%", filter: `blur(${BIRTH_BLUR}px)` },
          { offset: 0.34, width: `${TRAVEL}px`, height: `${TRAVEL}px`, borderRadius: "50%", filter: `blur(${BIRTH_BLUR}px)` },
          { offset: enter, width: `${TRAVEL}px`, height: `${TRAVEL}px`, borderRadius: "50%", filter: `blur(${BIRTH_BLUR}px)` },
          { offset: 1, transform: transformStr(tcx, tcy), width: `${fullW}px`, height: `${fullH}px`, borderRadius: radius, filter: `blur(${LAND_BLUR}px)` },
        ]
      : [
          { offset: 0, transform: transformStr(fromX, fromY), width: `${TRAVEL}px`, height: `${TRAVEL}px`, borderRadius: "50%", filter: `blur(${BIRTH_BLUR}px)` },
          { offset: enter, width: `${TRAVEL}px`, height: `${TRAVEL}px`, borderRadius: "50%", filter: `blur(${BIRTH_BLUR}px)` },
          { offset: 1, transform: transformStr(tcx, tcy), width: `${fullW}px`, height: `${fullH}px`, borderRadius: radius, filter: `blur(${LAND_BLUR}px)` },
        ];
    const motion = spot.animate(motionKf, {
      duration: CROSS_MS,
      easing: "cubic-bezier(.45,.05,.3,1)",
      fill: "forwards",
    });

    const opacityKf = birth
      ? [
          { offset: 0, opacity: 0 },
          { offset: 0.16, opacity: TRAVEL_OP },
          { offset: 500 / CROSS_MS, opacity: 0.2 },
          { offset: 1, opacity: BLOOM_OP },
        ]
      : [
          { offset: 0, opacity: TRAVEL_OP },
          { offset: 1, opacity: BLOOM_OP },
        ];
    const op = spot.animate(opacityKf, { duration: CROSS_MS, easing: "linear", fill: "forwards" });

    anims = [motion, op];
    motion.onfinish = () => {
      if (anims[0] !== motion) return;
      for (const a of anims) {
        try {
          a.commitStyles();
        } catch {
          /* detached */
        }
        a.cancel();
      }
      anims = [];
      spot.classList.add("is-bloom");
      spot.style.animation =
        "ds-hubmap-spot-pulse 2.8s ease-in-out infinite, ds-hubmap-spot-sway 9s ease-in-out infinite";
    };
  };

  const fitTo = (el: Element) => {
    if (el === currentTile && !fading) return;
    fading = false;
    currentTile = el;

    const g = grid.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const tcx = r.left - g.left + r.width / 2;
    const tcy = r.top - g.top + r.height / 2;

    if (!spot.classList.contains("is-on")) {
      const home = grid.querySelector(FEATURE);
      if (!home) return;
      const fr = home.getBoundingClientRect();
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
      spot.style.background = `radial-gradient(58% 58% at 46% 42%, rgba(${best.c}, 0.42), transparent 74%)`;
      spot.classList.add("is-on");
      glide(bcx, bcy, tcx, tcy, el, r, true);
    } else {
      const c = currentCenter();
      stopAnim(false);
      glide(c.x, c.y, tcx, tcy, el, r, false);
    }
  };

  const placeAtHome = () => {
    const home = grid.querySelector(FEATURE);
    if (!home) return;
    const g = grid.getBoundingClientRect();
    const r = home.getBoundingClientRect();
    spot.style.transition = "none";
    spot.style.animation = "";
    spot.style.translate = "";
    spot.style.filter = "";
    spot.style.opacity = "0";
    shrink();
    centerOn(r.left - g.left + r.width / 2, r.top - g.top + r.height / 2);
    currentTile = null;
  };

  const fadeOut = () => {
    if (fading || !spot.classList.contains("is-on")) return;
    fading = true;
    stopAnim(true);
    spot.style.animation = "";
    spot.classList.remove("is-bloom");
    const fade = spot.animate([{ opacity: 0 }], {
      duration: 520,
      easing: "ease",
      fill: "forwards",
    });
    anims = [fade];
    fade.onfinish = () => {
      if (anims[0] !== fade) return;
      fade.cancel();
      anims = [];
      fading = false;
      spot.classList.remove("is-on");
      placeAtHome();
    };
  };

  placeAtHome();
  void spot.offsetWidth;

  const onOver = (e: PointerEvent) => {
    const target = e.target as Element | null;
    const small = target?.closest(SMALL);
    if (small && grid.contains(small)) fitTo(small);
    else fadeOut();
  };

  grid.addEventListener("pointermove", onOver);
  grid.addEventListener("pointerleave", fadeOut);

  return () => {
    for (const a of anims) a.cancel();
    grid.removeEventListener("pointermove", onOver);
    grid.removeEventListener("pointerleave", fadeOut);
    spot.remove();
  };
}
