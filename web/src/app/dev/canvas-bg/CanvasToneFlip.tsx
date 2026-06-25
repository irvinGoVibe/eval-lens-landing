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

      let detached = false;
      let autoPlayed = false; // guards the one-shot auto-scroll per pass
      let autoScrolling = false; // true while the take-over scroll is animating

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
        // calm settle, NO overshoot — `back.out` overshot the slot and snapped
        // back, which read as the heading wobbling (most visible on reverse).
        Flip.from(state, {
          duration: 0.7,
          ease: "power2.out",
          onComplete: () => gsap.set(head, { clearProps: "--tf-ink,--tf-title" }),
        });
      };

      // Advance to the gallery and dock the head ONCE it has arrived. The head
      // holds at viewport centre the whole way down; only when the gallery is in
      // place (its head slot near the top) does it dock UP into it. This is the
      // ONLY path that docks going forward — never an in-place redock at the pin
      // end, where the gallery is still below the fold and the head would be
      // flung DOWN out of view. Idempotent via the `autoScrolling` guard.
      const advanceAndDock = () => {
        if (autoScrolling || !detached) return;
        autoPlayed = true;
        autoScrolling = true;
        gsap.to(window, {
          scrollTo: { y: galleryEl, offsetY: 0, autoKill: false },
          duration: 1.0,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            autoScrolling = false;
            redock();
          },
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
          // AUTO-PLAY: as soon as the heading has risen into view and the reader
          // is moving DOWN, take over and anchor-scroll the rest to the gallery so
          // the transition rides through to the next block in one motion (no long
          // manual scrub of the 2-screen pin). Fires EARLY (~0.18) so it engages
          // promptly. Direction-gated to `=== 1` only — never auto-scroll while the
          // reader is going back UP (that fought the reverse scrub and made the
          // heading shudder).
          onUpdate: (self) => {
            if (!autoPlayed && self.direction === 1 && self.progress >= 0.18) {
              advanceAndDock();
            } else if (self.progress < 0.12) {
              autoPlayed = false; // re-arm once scrolled back near the start
            }
          },
          // If the reader scrubbed all the way to the pin end without the early
          // take-over firing (e.g. trackpad inertia flickered the direction past
          // the 0.18 gate), DON'T redock in place — the gallery is below the fold
          // here and the head would be flung down. Anchor-scroll it home instead;
          // advanceAndDock is a no-op if the take-over is already running.
          onLeave: advanceAndDock,
          onLeaveBack: () => {
            autoPlayed = false;
            redock();
          },
        },
      });

      // The heading rises to centre on the light lobes (0 → RISE_END) and then
      // HOLDS there for the whole flip — it must NOT travel down out of view while
      // the background changes. The only motion during the flip is the background
      // (dark lobes cross-fade) and the heading's own colour invert; the heading
      // itself only leaves centre at the very end, when it docks UP into the
      // arrived gallery (redock, on the take-over scroll's onComplete).
      const RISE_END = 0.3;
      const SYNC = 0.4; // background flip begins here, heading staying centred
      const SYNC_DUR = 0.5;

      tl
        // heading rides UP from below into centre, then stays put (no descent).
        .fromTo(head, { "--tf-y": startY }, { "--tf-y": 0, duration: RISE_END }, 0);

      // the GLOBAL through-background flip: dark lobes crossfade in over light —
      // this is the motion the reader sees while the heading holds at centre.
      if (darkBg) {
        tl.fromTo(darkBg, { opacity: 0 }, { opacity: 1, duration: SYNC_DUR }, SYNC);
      }

      tl
        // BRIDGE + GLOW bloom across the same window → light → brand colour → dark.
        .fromTo(".cbg-tf-bg--mid", { opacity: 0 }, { opacity: 1, duration: 0.26 }, SYNC)
        .to(".cbg-tf-bg--mid", { opacity: 0, duration: 0.3 }, SYNC + 0.26)
        .fromTo(".cbg-tf-bg--glow", { opacity: 0 }, { opacity: 1, duration: 0.24 }, SYNC + 0.02)
        .to(".cbg-tf-bg--glow", { opacity: 0, duration: 0.28 }, SYNC + 0.26)
        // eyebrow: plain dark → white, mid-descent as the dark arrives
        .to(head, { "--tf-ink": fgLight, duration: 0.2, ease: "none" }, SYNC + 0.18)
        // title + sub IGNITE: dark → transparent (lens shows) → white; accent stays lens.
        .to(head, { "--tf-title": "transparent", duration: 0.12, ease: "none" }, SYNC + 0.12)
        .to(head, { "--tf-title": fgLight, duration: 0.18, ease: "none" }, SYNC + 0.28);

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
