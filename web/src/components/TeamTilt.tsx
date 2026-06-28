"use client";

import { useEffect, type ReactElement } from "react";

/**
 * TeamTilt — subtle pointer parallax for the About team dossier cards.
 *
 * On pointer move it writes `--mx` / `--my` (cursor offset, -0.5..0.5) on each
 * `.ab-dossier`; the CSS drifts the portrait WITH the cursor and the badges the
 * other way, for depth. The card frame itself is never transformed, so the
 * reveal entrance + `:hover` lift keep working untouched. Touch / reduced-motion
 * get nothing.
 */
export function TeamTilt(): ReactElement {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".ab-dossier"),
    );
    const cleanups = cards.map((card) => {
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
        card.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
      };
      const leave = () => {
        card.style.setProperty("--mx", "0");
        card.style.setProperty("--my", "0");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return <style>{TILT_CSS}</style>;
}

/* No backticks / interpolation inside — keeps JSX parsing safe. */
const TILT_CSS = `
  .about .ab-dossier__photo{
    transform:scale(1.04) translate(calc(var(--mx,0) * 13px), calc(var(--my,0) * 15px));
    transition:transform .4s cubic-bezier(.2,.7,.2,1); will-change:transform;
  }
  .about .ab-dossier__specs,
  .about .ab-dossier__tag{
    transform:translate(calc(var(--mx,0) * -11px), calc(var(--my,0) * -12px));
    transition:transform .4s cubic-bezier(.2,.7,.2,1);
  }
  @media (prefers-reduced-motion: reduce){
    .about .ab-dossier__photo{ transform:none; }
    .about .ab-dossier__specs,
    .about .ab-dossier__tag{ transform:none; }
  }
`;
