"use client";

import { useEffect, useRef } from "react";

/**
 * DelayedLoopVideo — autoplays a muted clip ONCE, holds on its last frame, then
 * replays after a fixed gap (default 7s), repeating indefinitely. Unlike a
 * native `loop`, there is a deliberate pause between plays.
 *
 * Drop-in for a plain `<video>`: it renders only the `<video>` element (styling
 * comes from the parent, e.g. `.cr-honest-media video`), so existing CSS keeps
 * working. `prefers-reduced-motion` → plays once and stops (no auto-restart).
 */
type Props = {
  src: string;
  type?: string;
  /** Seconds to wait after the clip ends before replaying. */
  gap?: number;
  className?: string;
  poster?: string;
  /** Forwarded to the <video> (e.g. aria-hidden); the wrapper usually sets it. */
  ariaHidden?: boolean;
};

export function DelayedLoopVideo({
  src,
  type = "video/mp4",
  gap = 7,
  className,
  poster,
  ariaHidden,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Restart from the top. Muted playback is allowed to autoplay without a
    // user gesture; swallow the AbortError play() can throw if interrupted.
    const play = () => {
      v.currentTime = 0;
      void v.play().catch(() => {});
    };

    // On end: keep the last frame visible, then replay after `gap` seconds.
    const onEnded = () => {
      if (reduce) return; // reduced-motion: play once, then stop
      timer = setTimeout(play, gap * 1000);
    };

    v.addEventListener("ended", onEnded);

    // Viewport-gated: fetch + first play only when the section approaches
    // (same pattern as LazyVideo/BentoHorse) — the clip may sit below the fold.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        v.preload = "auto";
        // play() starts resource selection. An explicit load() after changing
        // preload cancels the first request, which Chrome reports as
        // net::ERR_ABORTED and Safari may expose as a poster/frame reset.
        if (!reduce) play();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(v);

    return () => {
      io.disconnect();
      v.removeEventListener("ended", onEnded);
      if (timer) clearTimeout(timer);
    };
  }, [gap]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      playsInline
      preload="none"
      poster={poster}
      aria-hidden={ariaHidden}
    >
      <source src={src} type={type} />
    </video>
  );
}
