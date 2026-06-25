"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { Gallery } from "@/components/ds";
import type { GalleryItem } from "@/components/ds";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, Flip);

/**
 * canvas-bg tone-flip seam — ports the /dev/scroll-transitions transition onto
 * the shared canvas. A pinned seam sits between the LIGHT canvas group above and
 * the DARK gallery this component renders below. On scroll through the pin:
 *   1. the gallery's OWN head detaches (class toggle, keeps its lab styles) and
 *      rides up from below into the screen centre over the still-light lobes;
 *   2. the GLOBAL through-background flips light→dark — `.ds-canvas__bg--lobes`
 *      stays put while `.ds-canvas__bg--lobes-dark` crossfades in over it,
 *      passing through a brand BRIDGE + GLOW (no dirty grey) — and the head
 *      inverts dark→white;
 *   3. the head REDOCKS (Flip) back into the gallery as the pin releases.
 *
 * Reusable boundary move (cf. /dev/parallax-spike opacity crossfade), NOT a
 * forbidden `tr-gradient-bridge`. All GSAP is client-side, scoped, auto-cleaned
 * and prefers-reduced-motion aware.
 */
export function CanvasToneFlip({ items }: { items: GalleryItem[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      // the GLOBAL dark through-background lives on the page's `.ds-canvas` main,
      // OUTSIDE this scope — grab the node directly so gsap can drive its opacity.
      const canvas = scope.closest<HTMLElement>(".ds-canvas");
      const darkBg = canvas?.querySelector<HTMLElement>(".ds-canvas__bg--lobes-dark");

      const cs = getComputedStyle(scope);
      const fgDark = cs.getPropertyValue("--fg").trim() || "#1d1d1f";
      const fgLight = cs.getPropertyValue("--fg-on-dark").trim() || "#f4f4fb";

      // the VISIBLE gallery head (v1; v3 is hidden — don't grab that copy)
      const head = scope.querySelector<HTMLElement>('.lab-gallery [data-version="1"] .head');
      const galleryEl = scope.querySelector<HTMLElement>(".lab-gallery");
      if (!head || !galleryEl) return;

      // accent word — wrap the title's first word in a lens-gradient `.grad-word`
      // (idempotent across HMR). v1 renders the title plain, so inject it here.
      const titleEl = head.querySelector<HTMLElement>("h2");
      if (titleEl && !titleEl.querySelector(".grad-word")) {
        const [first, ...rest] = (titleEl.textContent ?? "").split(" ");
        titleEl.textContent = "";
        const span = document.createElement("span");
        span.className = "grad-word";
        span.textContent = first;
        titleEl.appendChild(span);
        if (rest.length) titleEl.appendChild(document.createTextNode(` ${rest.join(" ")}`));
      }

      gsap.set(head, { "--tf-ink": fgDark, "--tf-title": fgDark });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (darkBg) gsap.set(darkBg, { opacity: 1 });
        return; // head stays in the gallery, ink styles, no travel
      }

      const startY = Math.round(window.innerHeight * 0.42); // starts this far BELOW centre
      const dockY = Math.round(window.innerHeight * 0.3); // travels this far DOWN toward its dock

      let detached = false;
      let autoPlayed = false; // guards the one-shot auto-scroll per pass

      // detach is INSTANT — the vertical travel is scrub-driven (--tf-y). Lock
      // width/left so going position:fixed doesn't shrink-to-fit.
      const detach = () => {
        if (detached) return;
        detached = true;
        const r = head.getBoundingClientRect();
        head.style.width = `${r.width}px`;
        head.style.left = `${r.left}px`;
        head.removeAttribute("data-reveal"); // stop .is-in{transform:none}/opacity fighting
        head.classList.add("tf-detached");
        gsap.set(head, { "--tf-ink": fgDark, "--tf-title": fgDark });
      };
      const redock = () => {
        if (!detached) return;
        detached = false;
        const state = Flip.getState(head);
        head.classList.remove("tf-detached");
        head.style.removeProperty("width");
        head.style.removeProperty("left");
        Flip.from(state, {
          duration: 0.85,
          ease: "back.out(1.5)",
          onComplete: () => gsap.set(head, { clearProps: "--tf-ink,--tf-title" }),
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".cbg-tf",
          start: "top top",
          end: () => "+=" + window.innerHeight * 2,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: detach,
          onEnterBack: detach,
          // AUTO-PLAY: once the heading reaches centre (~0.34) anchor-scroll the
          // rest to the gallery, so the page rides down WITH the heading.
          onUpdate: (self) => {
            if (!autoPlayed && self.direction === 1 && self.progress >= 0.34) {
              autoPlayed = true;
              gsap.to(window, {
                scrollTo: { y: galleryEl, offsetY: 0, autoKill: false },
                duration: 1.1,
                ease: "power2.inOut",
                overwrite: true,
              });
            } else if (self.progress < 0.25) {
              autoPlayed = false; // re-arm once scrolled back near the start
            }
          },
          onLeave: () => {
            autoPlayed = true;
            redock();
          },
          onLeaveBack: () => {
            autoPlayed = false;
            redock();
          },
        },
      });

      tl
        // heading rides UP from below into centre — quick, on the LIGHT lobes (0→0.3)…
        .fromTo(head, { "--tf-y": startY }, { "--tf-y": 0, duration: 0.3 }, 0)
        // …then immediately starts driving DOWN — STILL light — and the flip catches up.
        .to(head, { "--tf-y": dockY, duration: 0.6, ease: "power1.in" }, 0.34);

      // the GLOBAL through-background flip: dark lobes crossfade in over light.
      if (darkBg) {
        tl.fromTo(darkBg, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.5);
      }

      tl
        // BRIDGE + GLOW bloom — peaks mid-flip so light → brand colour → dark.
        .fromTo(".cbg-tf-bg--mid", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.34)
        .to(".cbg-tf-bg--mid", { opacity: 0, duration: 0.3 }, 0.62)
        .fromTo(".cbg-tf-bg--glow", { opacity: 0 }, { opacity: 1, duration: 0.28 }, 0.36)
        .to(".cbg-tf-bg--glow", { opacity: 0, duration: 0.28 }, 0.62)
        // eyebrow: plain dark → white (late, once descending into the dark)
        .to(head, { "--tf-ink": fgLight, duration: 0.22, ease: "none" }, 0.6)
        // title + sub IGNITE: dark → transparent (lens shows) → white; accent stays lens.
        .to(head, { "--tf-title": "transparent", duration: 0.12, ease: "none" }, 0.54)
        .to(head, { "--tf-title": fgLight, duration: 0.16, ease: "none" }, 0.66);

      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <div className="cbg-flip" ref={root}>
      {/* the tone-flip seam — pinned; its bridge/glow bloom mid-transition */}
      <section className="cbg-tf" aria-hidden="true">
        <div className="cbg-tf-pin">
          <div className="cbg-tf-bg cbg-tf-bg--mid" />
          <div className="cbg-tf-bg cbg-tf-bg--glow" />
        </div>
      </section>

      {/* the DARK destination block — its OWN head is the flying/redocking element */}
      <Gallery
        id="gallery-dark"
        surface="ink"
        eyebrow="Investment stages"
        title="Equal ideas in one scrollable lane"
        sub="The heading you saw fly through the flip is this section's own — it just landed back in place over the dark canvas."
        laneLabel="Investment stages — horizontally scrollable"
        items={items}
      />
    </div>
  );
}
