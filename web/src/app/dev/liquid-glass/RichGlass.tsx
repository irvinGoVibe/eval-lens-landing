"use client";

/**
 * Rich glass surface — the `/dev/aurora` "rich · wash + sheen (scroll-bound)"
 * material, self-contained for this route. Renders the SHARED `.ds-glass`
 * structure (pane + scroll-bound pearlescent `__wash` + drifting `__orbit` +
 * static optical `__glare`) whose CSS lives in `components/ds/ds.css` (loaded
 * globally), so the look is identical to Aurora.
 *
 * Only `transform` animates (blur is static); the scroll work is gated by an
 * IntersectionObserver + a single rAF, and skipped under reduced-motion.
 */

import { useEffect, useRef, type ReactNode } from "react";

export function RichGlass({
  children,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light" | "brand";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      card.style.setProperty("--scroll-progress", p.toString());
    };
    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(update);
    };
    const obs = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
      },
      { threshold: 0 },
    );
    obs.observe(card);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toneClass =
    tone === "light" ? " ds-glass--light" : tone === "brand" ? " ds-glass--brand" : "";

  return (
    <div ref={ref} className={`ds-glass${toneClass}${className ? ` ${className}` : ""}`}>
      <div className="ds-glass__wash" aria-hidden="true" />
      {tone !== "light" ? <div className="ds-glass__orbit" aria-hidden="true" /> : null}
      <div className="ds-glass__glare" aria-hidden="true" />
      <div className="ds-glass__content">{children}</div>
    </div>
  );
}
