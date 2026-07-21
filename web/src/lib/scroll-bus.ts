/**
 * Shared scroll/resize dispatcher.
 *
 * Every scroll-driven effect on the site used to bind its own
 * `window.addEventListener("scroll", …)` plus its own rAF throttle. That is
 * one listener and one animation frame per effect: the browser walks a longer
 * listener list on every scroll tick, and the paints land in separate frames.
 *
 * This module keeps exactly ONE `scroll` + `resize` (+ visualViewport resize)
 * listener for the whole page and one rAF, then runs every subscriber inside
 * that single frame, in subscription order. Subscribers are the same callbacks
 * as before — they must only read layout and write styles, never bind more
 * listeners.
 *
 * Client-only: `onScrollFrame` touches `window`, so call it from an effect.
 */

/**
 * A subscriber runs in the READ phase (layout queries are cheap here — nothing
 * has invalidated styles yet this frame). If it returns a function, that runs
 * in the WRITE phase after every subscriber has finished reading. Interleaving
 * read→write→read across subscribers is what forces synchronous layouts; the
 * two-phase split lets the browser lay out at most once per frame.
 */
type Frame = () => void | (() => void);

const subscribers = new Set<Frame>();
let rafHandle = 0;
let bound = false;

const flush = () => {
  rafHandle = 0;
  const writes: Array<() => void> = [];
  // Snapshot: a subscriber may unsubscribe itself (or another) mid-pass.
  for (const run of Array.from(subscribers)) {
    if (!subscribers.has(run)) continue;
    try {
      const write = run();
      if (typeof write === "function") writes.push(write);
    } catch (error) {
      // One broken effect must not stop the rest of the frame from painting —
      // that would freeze unrelated sections. Surface it instead of hiding it.
      console.error("[scroll-bus] subscriber failed", error);
    }
  }
  for (const write of writes) {
    try {
      write();
    } catch (error) {
      console.error("[scroll-bus] subscriber write failed", error);
    }
  }
};

/** Coalesce every scroll/resize burst into at most one pass per frame. */
const schedule = () => {
  if (rafHandle) return;
  rafHandle = requestAnimationFrame(flush);
};

const bind = () => {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.visualViewport?.addEventListener("resize", schedule);
};

const unbind = () => {
  if (!bound) return;
  bound = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  window.visualViewport?.removeEventListener("resize", schedule);
  if (rafHandle) {
    cancelAnimationFrame(rafHandle);
    rafHandle = 0;
  }
};

/**
 * Run `callback` once per frame while the page scrolls or resizes.
 * Returns the unsubscribe; the last unsubscribe drops the shared listeners.
 */
export function onScrollFrame(callback: Frame): () => void {
  subscribers.add(callback);
  bind();
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0) unbind();
  };
}

/**
 * Ask for a pass without an event — initial paint, or after an async input
 * (video metadata, fonts) changed what the subscribers would measure.
 */
export function requestScrollFrame(): void {
  schedule();
}
