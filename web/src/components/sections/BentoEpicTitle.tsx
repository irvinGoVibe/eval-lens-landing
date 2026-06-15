"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

/* Two headings in the landing's language:
   - BentoScrollHeading: the section header — a fixed overlay that starts
     large at screen-center, types in per character (with a trailing period),
     then shrinks and docks onto a slot reserved in the summary card as you
     scroll. Self-contained (own rAF loop), so it also works on /bento where
     ScrollOrchestrator isn't mounted.
   - BentoCardTitle: a clean static display heading with a gradient word. */

function splitChars(text: string) {
  return text.split("").map((ch, i) =>
    ch === " " ? (
      <span key={i}> </span>
    ) : (
      <span key={i} className="bchar" style={{ "--ci": i } as CSSProperties}>
        {ch}
      </span>
    ),
  );
}

function easeInOut(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const BIG = 1.85;

export function BentoScrollHeading({
  plain,
  grad,
  slotId,
}: {
  plain: string;
  grad: string;
  slotId: string;
}) {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const head = headRef.current;
    const slot = document.getElementById(slotId);
    if (!head || !slot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: no flight — sit docked on the slot, fully revealed.
    if (reduce) {
      head.classList.add("is-shown", "is-active");
      head.style.setProperty("--bh-scale", "1");
      const dock = () => {
        const r = slot.getBoundingClientRect();
        head.style.setProperty("--bh-top", `${r.top + r.height / 2}px`);
      };
      dock();
      window.addEventListener("scroll", dock, { passive: true });
      window.addEventListener("resize", dock);
      return () => {
        window.removeEventListener("scroll", dock);
        window.removeEventListener("resize", dock);
      };
    }

    let activated = false;
    let running = false;
    let activatedAt = 0;
    let smoothTop: number | null = null;
    let smoothScale = BIG;
    // how long the centered type-in runs before the heading is allowed to
    // move — matches the CSS timing: chars (--ci*34ms) + gradient wipe + the
    // trailing period (+720ms) + the .65s tail, plus a small settle pause
    const TYPE_MS = plain.length * 34 + 1700;

    const update = (now: number) => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = slot.getBoundingClientRect();
      const slotCenter = r.top + r.height / 2;
      const centerY = vh * 0.5;
      // p: 0 while the slot sits a screen below (heading centered, large) →
      // 1 once the slot has risen to its docked band near the top.
      const startY = vh * 1.05;
      const endY = vh * 0.26;

      const onScreen = r.bottom > -vh * 0.25 && slotCenter < startY + vh * 0.3;
      if (!onScreen) {
        head.classList.remove("is-shown");
        return;
      }
      head.classList.add("is-shown");
      if (!activated) {
        activated = true;
        activatedAt = now;
        head.classList.add("is-active");
      }

      const p = Math.min(1, Math.max(0, (startY - slotCenter) / (startY - endY)));
      const e = easeInOut(p);
      // hold dead-centre and large until the type-in (incl. the period) has
      // finished; only then does scroll drive the flight into the card
      const typing = now - activatedAt < TYPE_MS;
      const targetTop = typing ? centerY : lerp(centerY, slotCenter, e);
      const targetScale = typing ? BIG : lerp(BIG, 1, e);
      // ease the hold → flight handoff so there's no jump
      smoothTop = smoothTop === null ? targetTop : smoothTop + (targetTop - smoothTop) * 0.16;
      smoothScale += (targetScale - smoothScale) * 0.16;
      head.style.setProperty("--bh-top", `${smoothTop}px`);
      head.style.setProperty("--bh-scale", String(smoothScale));
    };

    // rAF loop while the section is anywhere near the viewport; cheaper than a
    // scroll listener and immune to non-window scroll containers.
    const loop = (now: number) => {
      if (!running) return;
      update(now);
      requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      (entries) => {
        const near = entries.some((en) => en.isIntersecting);
        if (near && !running) {
          running = true;
          requestAnimationFrame(loop);
        } else if (!near) {
          running = false;
          update(performance.now());
        }
      },
      { rootMargin: "120% 0px 120% 0px" },
    );
    io.observe(slot);
    update(performance.now());

    return () => {
      running = false;
      io.disconnect();
    };
  }, [slotId, plain.length]);

  return (
    <div
      ref={headRef}
      className="bento-heading text-center"
      style={{ "--nchars": plain.length } as CSSProperties}
    >
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(23px,2.3vw,33px)] font-semibold leading-[1.12] tracking-tight text-[var(--fg-on-dark)]">
        {splitChars(plain)}
        <br />
        <span className="bgrad">{grad}</span>
        <span className="bchar" style={{ "--ci": plain.length + 6 } as CSSProperties}>
          .
        </span>
      </h2>
    </div>
  );
}

/** Clean static card heading: display font, optional gradient brand word. */
export function BentoCardTitle({
  plain,
  grad,
  className = "",
}: {
  plain: string;
  grad?: string;
  className?: string;
}) {
  return (
    <h3
      className={`font-[family-name:var(--font-display)] font-semibold leading-[1.12] tracking-tight text-[var(--fg-on-dark)] ${className}`}
    >
      {plain}
      {grad && (
        <span className="bg-[image:var(--lens)] bg-clip-text text-transparent">
          {grad}
        </span>
      )}
    </h3>
  );
}
