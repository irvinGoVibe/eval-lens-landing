"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactElement } from "react";

/**
 * DocsParallax — the documentation-guide image with two stacked motions:
 *   • ambient float — the whole glass scene gently bobs (via the independent
 *     `translate` property, so it never fights the tilt below);
 *   • pointer parallax — a perspective tilt that follows the cursor, which makes
 *     the centre flow buttons and the outer doc cards shift at different depths.
 *
 * Touch / `prefers-reduced-motion` get a static image. The figure keeps
 * `.ct-docs__media` (column sizing) + `data-reveal` (entrance) untouched.
 */
export function DocsParallax(): ReactElement {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${px * 9}deg`);
      el.style.setProperty("--rx", `${-py * 7}deg`);
    };
    const reset = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <figure ref={ref} className="ct-docs__media ct-docs-fx" data-reveal="right">
      <Image
        className="ct-docs-fx__img"
        src="/assets/contact/documentation-guide.webp"
        alt="EvalLense documentation guide — API reference, architecture, data model, security, changelog and the evaluation flow on a glass blueprint"
        width={1508}
        height={1024}
        sizes="(max-width: 980px) 92vw, 520px"
      />
      <style>{DOCS_CSS}</style>
    </figure>
  );
}

/* No backticks / interpolation inside. */
const DOCS_CSS = `
  .ct-docs-fx{ margin:0; }
  .ct-docs-fx__img{
    display:block; width:100%; height:auto;
    transform:perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
    transition:transform .35s cubic-bezier(.2,.7,.2,1);
    animation:ct-docs-float 8s ease-in-out infinite;
    will-change:transform, translate;
  }
  @keyframes ct-docs-float{ 0%,100%{ translate:0 0; } 50%{ translate:0 -11px; } }
  @media (prefers-reduced-motion: reduce){
    .ct-docs-fx__img{ transform:none; animation:none; }
  }
`;
