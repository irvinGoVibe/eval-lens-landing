"use client";

import { useEffect, useRef } from "react";

/**
 * LazyVideo — a below-fold-safe drop-in for a plain `<video>`.
 *
 * SSR renders the identical `<video>` markup (same className/poster/aria, so
 * CSS and layout are untouched) but with `preload="none"` and WITHOUT the
 * `autoplay` attribute — the browser fetches zero video bytes at page load
 * (the poster still paints). An IntersectionObserver flips `preload` and
 * starts fetching/playing only when the section approaches the viewport
 * (default 600px ahead), matching the proven BentoHorse mount-gate pattern.
 *
 * Modes:
 *  - `mode="loop"`   (default): behaves like `<video autoPlay muted loop>`.
 *  - `mode="scrub"`  : no playback — renders `data-scrub-video` (+`data-frames`)
 *    for ScrollFX, which seeks `currentTime` from the pin; we only trigger the
 *    buffer load near the viewport. ScrollFX already guards duration=NaN until
 *    metadata arrives.
 *
 * Do NOT use for above-the-fold hero videos — those want eager fetch.
 */
type Props = {
  src: string;
  type?: string;
  className?: string;
  poster?: string;
  mode?: "loop" | "scrub";
  /** data-frames forwarded for ScrollFX scrub mode. */
  frames?: number | string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  /** How far ahead of the viewport to start fetching. */
  rootMargin?: string;
};

export function LazyVideo({
  src,
  type = "video/mp4",
  className,
  poster,
  mode = "loop",
  frames,
  ariaLabel,
  ariaHidden,
  rootMargin = "600px 0px",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let io: IntersectionObserver | null = null;
    let raf = 0;
    let cancelled = false;

    const marginPx = parseInt(rootMargin, 10) || 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      v.preload = "auto";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (mode === "loop" && !reduce) {
        // play() starts resource selection after the preload hint changes.
        // Calling load() here would cancel that first request and start it
        // again, surfacing as net::ERR_ABORTED and flashing the poster in
        // Safari. Muted playback may autostart without a gesture; swallow the
        // play promise if the browser still declines it.
        void v.play().catch(() => {});
      }
    };

    const observe = () => {
      if (cancelled) return;
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          // Pinned sections get their tall scroll heights from ScrollFX after
          // hydration, so the first intersection can be a transient layout
          // state. Re-check the real position a beat later; a false trigger
          // just resumes observing.
          io?.disconnect();
          timer = setTimeout(() => {
            if (cancelled) return;
            const top = v.getBoundingClientRect().top;
            if (top < window.innerHeight + marginPx) start();
            else observe();
          }, 300);
        },
        { rootMargin },
      );
      io.observe(v);
    };

    // Don't observe until layout has settled: right after hydration the page
    // is still short (images/videos not sized yet), so a below-fold section
    // can transiently sit inside rootMargin and defeat the gate. Wait for
    // window load + a double rAF, then attach the observer.
    const armed = () => {
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(observe);
      });
    };
    if (document.readyState === "complete") {
      armed();
    } else {
      window.addEventListener("load", armed, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", armed);
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      io?.disconnect();
    };
  }, [mode, rootMargin]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop={mode === "loop"}
      playsInline
      preload="none"
      disablePictureInPicture
      poster={poster}
      data-scrub-video={mode === "scrub" ? "" : undefined}
      data-frames={mode === "scrub" ? frames : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <source src={src} type={type} />
    </video>
  );
}
