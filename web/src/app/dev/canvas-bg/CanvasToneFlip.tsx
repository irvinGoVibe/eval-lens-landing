"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gallery } from "@/components/ds";
import type { GalleryItem } from "@/components/ds";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * canvas-bg tone-flip seam — ports the /dev/scroll-transitions transition onto
 * the shared canvas. A pinned seam sits between the LIGHT canvas group above and
 * the DARK gallery this component renders below. On scroll through the pin:
 *   1. a fixed transition heading rides up from below into the screen centre
 *      over the still-light lobes;
 *   2. the GLOBAL through-background flips light→dark — `.ds-canvas__bg--lobes`
 *      stays put while `.ds-canvas__bg--lobes-dark` crossfades in over it,
 *      passing through a brand BRIDGE + GLOW (no dirty grey) — and the head
 *      inverts dark→white;
 *   3. the transition heading moves vertically into the gallery slot, then the
 *      real gallery heading is revealed in-place.
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

      const seam = scope.querySelector<HTMLElement>(".cbg-tf");
      const flyer = scope.querySelector<HTMLElement>(".cbg-tf-flyer");
      const midBg = scope.querySelector<HTMLElement>(".cbg-tf-bg--mid");
      const glowBg = scope.querySelector<HTMLElement>(".cbg-tf-bg--glow");
      if (!seam || !flyer || !midBg || !glowBg) return;

      const cs = getComputedStyle(scope);
      const fgDark = cs.getPropertyValue("--fg").trim() || "#1d1d1f";
      const fgLight = cs.getPropertyValue("--fg-on-dark").trim() || "#f4f4fb";

      // the VISIBLE gallery head (v1; v3 is hidden — don't grab that copy)
      const head = scope.querySelector<HTMLElement>('.lab-gallery [data-version="1"] .head');
      const galleryEl = scope.querySelector<HTMLElement>(".lab-gallery");
      if (!head || !galleryEl) return;
      const revealValue = head.getAttribute("data-reveal");

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

      head.removeAttribute("data-reveal");
      head.classList.add("is-in");
      gsap.set(head, { clearProps: "transform,opacity" });

      const hideDockedHead = () => {
        head.style.visibility = "hidden";
      };
      const showDockedHead = () => {
        head.style.visibility = "visible";
      };

      const measureReleaseY = () => {
        const headRect = head.getBoundingClientRect();
        const galleryRect = galleryEl.getBoundingClientRect();
        const centerInGallery = headRect.top - galleryRect.top + headRect.height / 2;
        return Math.round(centerInGallery - window.innerHeight / 2);
      };

      hideDockedHead();
      gsap.set(flyer, {
        "--tf-ink": fgDark,
        "--tf-title": fgDark,
        "--tf-y": () => Math.round(window.innerHeight * 0.42),
        autoAlpha: 0,
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (darkBg) gsap.set(darkBg, { opacity: 1 });
        showDockedHead();
        return;
      }

      let tl: gsap.core.Timeline | undefined;
      tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: seam,
          start: "top top",
          end: () => "+=" + seam.offsetHeight,
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: (self) => {
            hideDockedHead();
            gsap.set(flyer, { autoAlpha: 1 });
            tl?.progress(self.progress);
          },
          onEnterBack: (self) => {
            hideDockedHead();
            gsap.set(flyer, { autoAlpha: 1 });
            tl?.progress(self.progress);
          },
          onToggle: (self) => {
            if (self.isActive) {
              hideDockedHead();
              gsap.set(flyer, { autoAlpha: 1 });
            }
          },
          onLeave: () => {
            showDockedHead();
            gsap.set(flyer, { autoAlpha: 0 });
          },
          onLeaveBack: () => {
            hideDockedHead();
            gsap.set(flyer, { autoAlpha: 0 });
          },
          onRefresh: (self) => {
            tl?.progress(self.progress);
          },
        },
      });

      tl
        .addLabel("heading-enter", 0)
        .fromTo(
          flyer,
          { "--tf-y": () => Math.round(window.innerHeight * 0.42) },
          { "--tf-y": 0, duration: 0.28 },
          "heading-enter",
        )
        .addLabel("background-transition", 0.34);

      // the GLOBAL through-background flip: dark lobes crossfade in over light —
      // this is the motion the reader sees while the heading holds at centre.
      if (darkBg) {
        tl.fromTo(darkBg, { opacity: 0 }, { opacity: 1, duration: 0.46 }, "background-transition");
      }

      tl
        // BRIDGE + GLOW bloom across the same window → light → brand colour → dark.
        .fromTo(midBg, { opacity: 0 }, { opacity: 1, duration: 0.24 }, "background-transition")
        .to(midBg, { opacity: 0, duration: 0.28 }, "background-transition+=0.24")
        .fromTo(glowBg, { opacity: 0 }, { opacity: 1, duration: 0.22 }, "background-transition+=0.02")
        .to(glowBg, { opacity: 0, duration: 0.26 }, "background-transition+=0.24")
        // eyebrow: plain dark → white while the heading is locked at centre
        .to(flyer, { "--tf-ink": fgLight, duration: 0.2, ease: "none" }, "background-transition+=0.16")
        // title + sub IGNITE: dark → transparent (lens shows) → white; accent stays lens.
        .to(flyer, { "--tf-title": "transparent", duration: 0.12, ease: "none" }, "background-transition+=0.1")
        .to(flyer, { "--tf-title": fgLight, duration: 0.18, ease: "none" }, "background-transition+=0.26")
        .addLabel("heading-release", 0.82)
        .to(
          flyer,
          {
            "--tf-y": () => measureReleaseY(),
            duration: 0.18,
            ease: "power1.inOut",
          },
          "heading-release",
        );

      ScrollTrigger.refresh();

      return () => {
        if (revealValue) head.setAttribute("data-reveal", revealValue);
        showDockedHead();
        gsap.set(head, { clearProps: "visibility,transform,opacity" });
        gsap.set(flyer, { clearProps: "visibility,opacity,--tf-ink,--tf-title,--tf-y" });
        if (darkBg) gsap.set(darkBg, { clearProps: "opacity" });
      };
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
          <div className="cbg-tf-flyer">
            <div className="head">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Investment stages
              </span>
              <h2 className="title">
                <span className="grad-word">Equal</span> ideas in one scrollable lane
              </h2>
              <p className="sub">
                The heading you saw fly through the flip is this section&apos;s own — it just landed back in place over the dark canvas.
              </p>
            </div>
          </div>
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
