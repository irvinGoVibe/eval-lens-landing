"use client";

import { useEffect, type ReactElement } from "react";

/**
 * AngelFx — makes the flying angel on the Angel Investors bento card feel alive:
 *   • ambient float — gently bobs like a floating object (via the independent
 *     `translate` property, so it never fights the transform below);
 *   • stronger pointer parallax — drifts toward the cursor across the card;
 *   • grab & drag — press the angel, pull it toward you (rubber-band resistance),
 *     release and it springs back home with a little overshoot.
 *
 * Touch / reduced-motion get nothing. Pointer-events are enabled only on the
 * angel image itself (its CTA sits clear at the bottom-left of the card).
 */
const SEL_IMG = '.ab-bento [data-key="angel"] .ab-bento__bgimg img';
const SEL_CARD = '.ab-bento [data-key="angel"]';
const ROT = "rotate(-5deg)";

export function AngelFx(): ReactElement {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = document.querySelector<HTMLElement>(SEL_IMG);
    const card = document.querySelector<HTMLElement>(SEL_CARD);
    if (!img || !card) return;
    const canHover = window.matchMedia("(hover: hover)").matches;

    img.style.pointerEvents = "auto";
    img.style.cursor = "grab";
    img.style.touchAction = "none";
    img.style.willChange = "transform";

    let px = 0;
    let py = 0; // parallax offset
    let dx = 0;
    let dy = 0; // drag offset
    let dragging = false;
    let sx = 0;
    let sy = 0;

    const apply = () => {
      img.style.transform = `translate(${px + dx}px, ${py + dy}px) ${ROT}`;
    };

    const onParallax = (e: PointerEvent) => {
      if (dragging) return;
      const r = card.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 30;
      py = ((e.clientY - r.top) / r.height - 0.5) * 24;
      img.style.transition = "transform .22s ease";
      apply();
    };
    const onLeave = () => {
      if (dragging) return;
      px = 0;
      py = 0;
      img.style.transition = "transform .5s ease";
      apply();
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      sx = e.clientX;
      sy = e.clientY;
      img.style.transition = "none";
      img.style.cursor = "grabbing";
      try {
        img.setPointerCapture(e.pointerId);
      } catch {
        /* not capturable */
      }
      e.preventDefault();
    };
    const onDrag = (e: PointerEvent) => {
      if (!dragging) return;
      const rx = e.clientX - sx;
      const ry = e.clientY - sy;
      // rubber-band: follows the cursor but resists the further you pull
      dx = Math.sign(rx) * Math.pow(Math.abs(rx), 0.82) * 1.1;
      dy = Math.sign(ry) * Math.pow(Math.abs(ry), 0.82) * 1.1;
      apply();
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      dx = 0;
      dy = 0;
      img.style.cursor = "grab";
      img.style.transition = "transform .75s cubic-bezier(.34,1.4,.5,1)"; // springy snap-back
      apply();
      try {
        img.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };

    if (canHover) {
      card.addEventListener("pointermove", onParallax);
      card.addEventListener("pointerleave", onLeave);
    }
    img.addEventListener("pointerdown", onDown);
    img.addEventListener("pointermove", onDrag);
    img.addEventListener("pointerup", onUp);
    img.addEventListener("pointercancel", onUp);

    return () => {
      card.removeEventListener("pointermove", onParallax);
      card.removeEventListener("pointerleave", onLeave);
      img.removeEventListener("pointerdown", onDown);
      img.removeEventListener("pointermove", onDrag);
      img.removeEventListener("pointerup", onUp);
      img.removeEventListener("pointercancel", onUp);
      img.style.pointerEvents = "";
      img.style.cursor = "";
      img.style.transform = "";
      img.style.transition = "";
      img.style.willChange = "";
    };
  }, []);

  return <style>{ANGEL_CSS}</style>;
}

/* Ambient float runs on `translate` (independent of the JS-driven transform). */
const ANGEL_CSS = `
  .ab-bento [data-key="angel"] .ab-bento__bgimg img{
    animation:angel-bob 5.5s ease-in-out infinite;
  }
  @keyframes angel-bob{
    0%,100%{ translate:0 0; }
    50%{ translate:-4px -9px; }
  }
  @media (prefers-reduced-motion: reduce){
    .ab-bento [data-key="angel"] .ab-bento__bgimg img{ animation:none; }
  }
`;
