"use client";

import { useEffect, useRef, type ReactElement, type ReactNode } from "react";

export type GlassCardProps = {
  children: ReactNode;
  /** Layout classes (margin, max-width, z-index) — not the glass material. */
  className?: string;
  /**
   * `true` (default): adds the wash layer + static optical sheen, and binds the
   * washes to scroll. `false`: plain glass — just the pane + edge, zero JS.
   */
  rich?: boolean;
  /**
   * `"dark"` (default): smoky glass for dark surfaces (screen glow, light text).
   * `"light"`: cool tinted glass for light surfaces (multiply glow, dark text).
   * `"brand"`: saturated translucent CTA-gradient glass (purple→blue), white text.
   */
  tone?: "dark" | "light" | "brand";
};

/**
 * Clear frosted glass (CSS, no glass library). Two modes for A/B comparison:
 *  - rich  → transparent pane + sheen + scroll-bound pearlescent washes
 *  - plain → transparent pane only (no sheen, no washes)
 *
 * In rich mode the scroll work is gated by an IntersectionObserver and only
 * `transform` animates (blur is static); it's skipped under reduced-motion.
 */
export function GlassCard({
  children,
  className,
  rich = true,
  tone = "dark",
}: GlassCardProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rich) {
      return;
    }
    const card = ref.current;
    if (!card) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let visible = false;

    const update = (): void => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)),
      );
      card.style.setProperty("--scroll-progress", progress.toString());
    };

    const onScroll = (): void => {
      if (!visible || frame) {
        return;
      }
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          update();
        }
      },
      { threshold: 0 },
    );
    observer.observe(card);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [rich]);

  const toneClass =
    tone === "light"
      ? " ds-glass--light"
      : tone === "brand"
        ? " ds-glass--brand"
        : "";
  return (
    <div ref={ref} className={`ds-glass${toneClass}${className ? ` ${className}` : ""}`}>
      {rich ? <div className="ds-glass__wash" aria-hidden="true" /> : null}
      {rich && tone !== "light" ? (
        <div className="ds-glass__orbit" aria-hidden="true" />
      ) : null}
      {rich ? <div className="ds-glass__glare" aria-hidden="true" /> : null}
      <div className="ds-glass__content">{children}</div>
    </div>
  );
}
