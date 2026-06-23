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
  const BIRTH_SIZE = 300; // big soft mass it buds off the feature blob from
  const CROSS_MS = 1600; // feature edge → centre — a slow, smooth glide
  const TRAVEL_OP = 0.1; // very faint as it detaches — barely there in flight
  const BLOOM_OP = 0.62; // brighter as it settles into the target card
  const BIRTH_BLUR = 120; // px — VERY soft, formless the whole way across; only
  //                         sharpens as it reaches the tile (held until `enter`)
  const LAND_BLUR = 26; // px — resting blur (matches the .lab-bento__spot base)
  const inset = 6; // spread fills (almost) the WHOLE tile, not a small patch
  // Motion runs through the Web Animations API rather than CSS transitions:
  // toggling `transition` + reflow to (re)start a travel proved unreliable here
  // (the browser collapsed the 1.6s glide into an instant jump). element.animate()
  // gives an explicit duration + keyframes that always run, and commitStyles()
  // lets a new gesture pick up smoothly from the current frame.
  // a gesture runs as a PAIR of animations — motion (transform/size/blur, eased so
  // it oozes out and settles in) and opacity (linear, so its time checkpoints are
  // exact). Tracked together so a new gesture can stop/commit both.
  let anims: Animation[] = [];
  let currentTile: Element | null = null; // the tile the spot is in / heading to
  let fading = false; // true while the leave-fade is running

  const transformStr = (cx: number, cy: number) =>
    `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;

  // current rendered centre of the spot in grid coords — survives mid-flight, so
  // a tile→tile hand-off can start exactly where the spot visually is.
  const currentCenter = () => {
    const sr = spot.getBoundingClientRect();
    const gg = grid.getBoundingClientRect();
    return { x: sr.left - gg.left + sr.width / 2, y: sr.top - gg.top + sr.height / 2 };
  };

  // stop the running animation pair; optionally freeze the current visual frame
  // into inline styles first, so the next animation continues from where it is.
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

  // Glide from (fromX,fromY) to the target tile's CENTRE over CROSS_MS as a PAIR of
  // animations:
  //   • MOTION (transform/size/blur) — eased (ease-in-out): on `birth` it stays a
  //     big soft mass merged with the feature blob, oozes out slowly while necking
  //     into a droplet (so it DISSOLVES out of the parent blob, not a circle that
  //     pops and flies in a straight line), then decelerates + spreads into the
  //     tile. Blur is held very soft until the edge, then sharpens.
  //   • OPACITY — linear, so its time checkpoints are exact (0 at 0ms, 0.2 at
  //     500ms, bright on landing).
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

    // bloom is ON from the very start: it breathes + sways like the parent blob
    // the whole way. The sway (translate) composes with the travel transform; the
    // brightness/blur breathe shares `filter` with the motion's blur sweep, so it
    // visibly takes over once the motion settles — but it's alive from birth.
    spot.classList.add("is-bloom");
    spot.style.animation =
      "lab-bento-spot-pulse 2.8s ease-in-out infinite, lab-bento-spot-sway 9s ease-in-out infinite";

    // ── motion (eased) ──
    const motionKf = birth
      ? [
          // big soft mass fused with the blob → necks into the droplet AS it pulls
          // away (the neck spans into the travel, so it looks like it peels off)
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
      easing: "cubic-bezier(.45,.05,.3,1)", // gentle ease-in-out: ooze out, settle in
      fill: "forwards",
    });

    // ── opacity (linear → exact checkpoints) ──
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
      if (anims[0] !== motion) return; // a newer gesture took over
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
      // landed → while the cursor stays, it breathes (brightness/blur) and sways
      // (drift) in place, like the live blobs on the feature card. On leave it
      // fades out (see fadeOut), it does not drift back.
      spot.style.animation =
        "lab-bento-spot-pulse 2.8s ease-in-out infinite, lab-bento-spot-sway 9s ease-in-out infinite";
    };
  };

  const fitTo = (el: Element) => {
    // already in / heading to this tile and not mid-fade → leave it be (so moving
    // the cursor around inside the same tile doesn't restart the glide).
    if (el === currentTile && !fading) return;
    fading = false; // a fresh target cancels any leave-fade
    currentTile = el;

    const g = grid.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const tcx = r.left - g.left + r.width / 2;
    const tcy = r.top - g.top + r.height / 2;

    if (!spot.classList.contains("is-on")) {
      // Emerging from rest: the piece is BORN at the feature card's edge that
      // faces the target (its nearest blob's shade), then glides across.
      const home = grid.querySelector(FEATURE);
      if (!home) return;
      const fr = home.getBoundingClientRect();
      // nearest blob centre → colour + the starting point
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
      spot.classList.add("is-on");
      // bud off the feature blob, then flow across to the target centre
      glide(bcx, bcy, tcx, tcy, el, r, true);
    } else {
      // tile → tile: carry on from wherever the spot currently is, so it flows
      // to the new target instead of restarting from the feature card.
      const c = currentCenter();
      stopAnim(false);
      glide(c.x, c.y, tcx, tcy, el, r, false);
    }
  };

  // reset the spot to its invisible resting place on the feature card — no
  // transition, so the position snap is never seen. Used on mount and after a
  // leave-fade, so the NEXT hover always emerges fresh from the feature edge.
  const placeAtHome = () => {
    const home = grid.querySelector(FEATURE);
    if (!home) return;
    const g = grid.getBoundingClientRect();
    const r = home.getBoundingClientRect();
    spot.style.transition = "none"; // motion is WAAPI-only; no base CSS transition
    spot.style.animation = "";
    spot.style.translate = ""; // clear any leftover sway offset
    spot.style.filter = ""; // back to the base blur
    spot.style.opacity = "0";
    shrink();
    centerOn(r.left - g.left + r.width / 2, r.top - g.top + r.height / 2);
    currentTile = null;
  };

  // leave: just fade out IN PLACE (no drift back), then silently reset position
  // so the next emerge starts fresh from the feature edge.
  const fadeOut = () => {
    if (fading || !spot.classList.contains("is-on")) return;
    fading = true;
    stopAnim(true); // freeze the current frame so the fade stays put
    spot.style.animation = ""; // stop the pulse/sway
    spot.classList.remove("is-bloom");
    const fade = spot.animate([{ opacity: 0 }], {
      duration: 520,
      easing: "ease",
      fill: "forwards",
    });
    anims = [fade];
    fade.onfinish = () => {
      if (anims[0] !== fade) return; // a new hover took over mid-fade
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
    // a supporting tile takes the spot there; anywhere else inside the grid
    // (feature tile, gaps) fades it out in place.
    if (small && grid.contains(small)) fitTo(small);
    else fadeOut();
  };

  grid.addEventListener("pointermove", onOver);
  grid.addEventListener("pointerleave", fadeOut); // leaving the grid → fade out

  return () => {
    for (const a of anims) a.cancel();
    grid.removeEventListener("pointermove", onOver);
    grid.removeEventListener("pointerleave", fadeOut);
    spot.remove();
  };
}
