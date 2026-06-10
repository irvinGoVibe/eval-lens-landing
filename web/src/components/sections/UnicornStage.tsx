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

/** Static poster in the same palette for no-WebGL / reduced-motion clients. */
function FallbackGlow() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute left-[44%] top-1/2 h-[62%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,76,241,0.38),transparent_72%)] blur-2xl" />
      <div className="absolute left-[60%] top-[56%] h-[46%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(58,168,255,0.22),transparent_72%)] blur-2xl" />
      <div className="absolute left-1/2 top-[30%] h-[26%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(169,155,255,0.3),transparent_70%)] blur-xl" />
    </div>
  );
}

export function UnicornStage() {
  const holder = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;

    // Mount the canvas only when the section approaches the viewport, then
    // keep it mounted but pause the frameloop whenever it scrolls back out.
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
      { rootMargin: "600px 0px" },
    );
    const viewIo = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { rootMargin: "120px 0px" },
    );
    mountIo.observe(el);
    viewIo.observe(el);
    return () => {
      mountIo.disconnect();
      viewIo.disconnect();
    };
  }, []);

  return (
    <div
      ref={holder}
      className="relative h-[min(72svh,680px)] min-h-[380px] w-full"
    >
      {mounted && !fallback ? (
        <UnicornScene isMobile={isMobile} active={inView} />
      ) : (
        <FallbackGlow />
      )}
    </div>
  );
}
