"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type DeckSlide = { id: string; label: string };

type DeckNavProps = { slides: DeckSlide[] };

/**
 * Presentation navigator for /deck: arrow-key slide jumps, side dots, and a
 * slide counter. Slides are located by wrapper ids passed in `slides` — the
 * page itself stays a normal scroll document, so every DS section keeps its
 * natural height and ScrollFX reveals keep working.
 */
export function DeckNav({ slides }: DeckNavProps) {
  const [active, setActive] = useState(0);
  // Synchronous mirror of the current slide — state updates lag behind rapid
  // key presses, so navigation math reads/writes the ref.
  const activeRef = useRef(0);

  useEffect(() => {
    const onScroll = (): void => {
      const probe = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      slides.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= probe) idx = i;
      });
      activeRef.current = idx;
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slides]);

  // Native smooth scrolling is unreliable alongside the site's scroll
  // orchestration, so slides are animated with an explicit rAF tween of
  // instant scroll steps.
  const go = useCallback(
    (i: number): void => {
      const clamped = Math.max(0, Math.min(slides.length - 1, i));
      const el = document.getElementById(slides[clamped].id);
      if (!el) return;
      activeRef.current = clamped;
      setActive(clamped);
      const from = window.scrollY;
      const to = el.offsetTop;
      if (document.hidden) {
        // rAF is frozen in hidden tabs — jump without the tween.
        window.scrollTo({ top: to, behavior: "instant" });
        return;
      }
      const dur = 420;
      const start = performance.now();
      const ease = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const step = (now: number): void => {
        const p = Math.min(1, (now - start) / dur);
        window.scrollTo({ top: from + (to - from) * ease(p), behavior: "instant" });
        if (p < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    },
    [slides],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(activeRef.current + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(activeRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, slides.length]);

  return (
    <nav className="deck-nav" aria-label="Слайды презентации">
      <ol className="deck-nav__dots">
        {slides.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={i === active ? "deck-nav__dot is-active" : "deck-nav__dot"}
              aria-label={`Слайд ${i + 1}: ${s.label}`}
              aria-current={i === active ? "true" : undefined}
              title={s.label}
              onClick={() => go(i)}
            />
          </li>
        ))}
      </ol>
      <span className="deck-nav__count" aria-hidden="true">
        {active + 1} / {slides.length}
      </span>
    </nav>
  );
}
