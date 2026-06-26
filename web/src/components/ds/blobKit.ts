import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared kit for the floating PNG orb layers (dev `CanvasBlobs` + prod
 * `ZoneBlobs`). One geometry model, one motion builder, one window registry —
 * so the single `BlobInspector` panel can discover and tune EVERY blob layer on
 * a page, regardless of which component drew it.
 *
 * GEOMETRY lives in JS here (anchor/offset/top/width/cap/opacity), applied as
 * inline styles in the project's vw/vh/min() vocabulary. The `.ds-blob--*` CSS
 * classes stay as the no-flash default for first paint; inline styles override
 * them. The inspector copies values back as a JS `BLOBS` array + `.ds-blob--*`
 * CSS rules — exactly how the codebase splits it.
 */
export type BlobCfg = {
  src: string;
  anchor: "left" | "right";
  ax: number; // left|right offset, vw
  top: number; // top, vh
  w: number; // width, vw
  cap: number; // width ceiling, px (min(${w}vw, ${cap}px))
  op: number; // opacity
  d: { x: number; y: number; r: number; dur: number }; // idle drift
  px: number; // scroll parallax X, % of own size
  py: number; // scroll parallax Y, % of own size
};

export const BLOB_DIR = "/assets/backgrounds/blobs/";
export const BLOB_SRCS = [
  "blob_four_lobes.png",
  "blob_irregular.png",
  "sphere_large.png",
  "sphere_small.png",
];
export const LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** Where a layer's scroll parallax is anchored. `page` = whole-document scroll
 *  (dev canvas); `zone` = the orbs' nearest `.ds-zone` passing through the
 *  viewport (prod ZoneBlobs). */
export type ParallaxMode = "page" | "zone";

/** Public handle the inspector drives. `blobs` IS the component's live config
 *  array (same reference), so mutating it + calling geom/resume previews live. */
export type BlobController = {
  id: string;
  label: string;
  els: HTMLElement[];
  blobs: BlobCfg[];
  geom(i: number): void;
  pause(): void;
  resume(): void;
};

type Registry = { zones: BlobController[]; seq: number };

function reg(): Registry {
  const w = window as unknown as { __blobZones?: Registry };
  return (w.__blobZones ??= { zones: [], seq: 0 });
}

/** Stable unique id per blob-layer instance (also the ScrollTrigger id prefix). */
export function nextZoneId(base: string): string {
  const r = reg();
  return `${base}-${r.seq++}`;
}

/** Register a controller; returns an unregister fn for cleanup. */
export function registerZone(ctl: BlobController): () => void {
  const r = reg();
  r.zones.push(ctl);
  return () => {
    const i = r.zones.indexOf(ctl);
    if (i >= 0) r.zones.splice(i, 1);
  };
}

export function listZones(): BlobController[] {
  const w = window as unknown as { __blobZones?: Registry };
  return w.__blobZones?.zones ?? [];
}

/** Apply a config's placement + size + opacity to its element as inline styles,
 *  in vw/vh/min() so it stays responsive and the copy output is paste-ready. */
export function applyGeom(el: HTMLElement, c: BlobCfg) {
  el.style.width = `min(${c.w}vw, ${c.cap}px)`;
  el.style.top = `${c.top}vh`;
  el.style.opacity = String(c.op);
  if (c.anchor === "left") {
    el.style.left = `${c.ax}vw`;
    el.style.right = "auto";
  } else {
    el.style.right = `${c.ax}vw`;
    el.style.left = "auto";
  }
}

type MotionOpts = { idPrefix: string; trigger: Element; start: string; end: string };

/** Build the two motion layers (idle drift + scroll parallax) for one element. */
export function buildMotion(el: HTMLElement, c: BlobCfg, i: number, o: MotionOpts) {
  // 1) autonomous idle drift — forever, no scroll needed
  gsap.to(el, {
    x: c.d.x,
    y: c.d.y,
    rotation: c.d.r,
    duration: c.d.dur,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: -i * 1.3,
  });
  // 2) scroll travel — from the BASE position (scroll 0 = the reference layout)
  //    to (px,py). Separate props from the idle x/y so GSAP sums them.
  gsap.fromTo(
    el,
    { xPercent: 0, yPercent: 0 },
    {
      xPercent: c.px,
      yPercent: c.py,
      ease: "none",
      scrollTrigger: { id: `${o.idPrefix}-blob-${i}`, trigger: o.trigger, start: o.start, end: o.end, scrub: 1 },
    },
  );
}

/** ScrollTrigger start/end strings for a parallax mode. */
export function parallaxRange(mode: ParallaxMode): { start: string; end: string } {
  return mode === "page"
    ? { start: "top top", end: "bottom bottom" }
    : { start: "top bottom", end: "bottom top" };
}

/** Kill ONLY this layer's tweens + scrollTriggers (matched by `<idPrefix>-blob-<i>`,
 *  so other page triggers are untouched) and reset transforms to base. */
export function killMotion(els: HTMLElement[], idPrefix: string) {
  els.forEach((el, i) => {
    gsap.killTweensOf(el);
    ScrollTrigger.getById(`${idPrefix}-blob-${i}`)?.kill();
  });
  gsap.set(els, { clearProps: "transform" });
}

/** Wire a freshly-mounted blob layer: seat geometry, build motion, expose a
 *  controller, register it, and return an unregister/cleanup fn. */
export function initBlobLayer(args: {
  id: string;
  label: string;
  els: HTMLElement[];
  blobs: BlobCfg[];
  trigger: Element;
  mode: ParallaxMode;
}): () => void {
  const { id, label, els, blobs, trigger, mode } = args;
  const { start, end } = parallaxRange(mode);
  const seat = (i: number) => {
    const el = els[i];
    if (el && blobs[i]) applyGeom(el, blobs[i]);
  };
  els.forEach((el, i) => {
    if (!blobs[i]) return;
    applyGeom(el, blobs[i]);
    buildMotion(el, blobs[i], i, { idPrefix: id, trigger, start, end });
  });
  const ctl: BlobController = {
    id,
    label,
    els,
    blobs,
    geom: seat,
    pause: () => killMotion(els, id),
    resume: () => {
      killMotion(els, id);
      els.forEach((el, i) => blobs[i] && buildMotion(el, blobs[i], i, { idPrefix: id, trigger, start, end }));
    },
  };
  return registerZone(ctl);
}
