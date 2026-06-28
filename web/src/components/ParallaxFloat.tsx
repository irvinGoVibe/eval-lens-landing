"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * ParallaxFloat — wrap a single image so it gently "floats in the air" and
 * leans toward the cursor (subtle pointer parallax). One rAF loop writes a
 * combined transform straight to the <img>:
 *   • idle float — slow sine drift (x/y) + a faint roll, so it hangs in the air;
 *   • pointer parallax — rotateY (lean to the sides) + rotateX, eased toward the
 *     cursor position within the nearest <section>.
 *
 * The wrapper is `display:contents` (no box), so the image keeps whatever
 * layout/sizing its `className` gives it; only `transform` is added. Put
 * `perspective` on the image's PARENT for the 3D tilt to read. Honors
 * prefers-reduced-motion. Keep `tilt`/`floatY` small for a calm effect.
 */
type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  /** max pointer yaw tilt in degrees (default 5) */
  tilt?: number;
  /** idle vertical float amplitude in px (default 9) */
  floatY?: number;
};

export function ParallaxFloat({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  tilt = 5,
  floatY = 9,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const el = wrap.querySelector<HTMLImageElement>("img");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const zone = (el.closest("section") as HTMLElement | null) ?? el;
    let tpx = 0;
    let tpy = 0;
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      tpx = (e.clientX - r.left) / r.width - 0.5;
      tpy = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      tpx = 0;
      tpy = 0;
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      px += (tpx - px) * 0.05;
      py += (tpy - py) * 0.05;
      const fx = Math.cos(t * 0.4) * (floatY * 0.5);
      const fy = Math.sin(t * 0.5) * floatY;
      const rz = Math.sin(t * 0.33) * 0.4;
      const ry = px * tilt + Math.sin(t * 0.28) * 0.9;
      const rx = -py * (tilt * 0.6) + Math.cos(t * 0.24) * 0.7;
      el.style.transform =
        `translate3d(${fx.toFixed(2)}px, ${fy.toFixed(2)}px, 0) ` +
        `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, [tilt, floatY]);

  return (
    <div ref={wrapRef} style={{ display: "contents" }}>
      <Image
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
