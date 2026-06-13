"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const UnicornScene = dynamic(() => import("./UnicornScene"), { ssr: false });

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Compact mount of UnicornScene for the bento orb: lazy-mounts near the
 *  viewport, pauses the frameloop when scrolled out, falls back to a static
 *  glow for no-WebGL / reduced-motion clients. */
export function BentoHorse() {
  const holder = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;

    const mountIo = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        mountIo.disconnect();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (reduced.matches || !canUseWebGL()) {
          setFallback(true);
          return;
        }
        setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        setMounted(true);
      },
      { rootMargin: "400px 0px" },
    );
    const viewIo = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { rootMargin: "80px 0px" },
    );
    mountIo.observe(el);
    viewIo.observe(el);
    return () => {
      mountIo.disconnect();
      viewIo.disconnect();
    };
  }, []);

  return (
    <div ref={holder} className="absolute inset-0">
      {mounted && !fallback ? (
        <UnicornScene isMobile={isMobile} active={inView} zoom={1.09} />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(124,92,246,0.5),rgba(58,168,255,0.18)_55%,rgba(5,6,12,0)_75%)]"
        />
      )}
    </div>
  );
}
