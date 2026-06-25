"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { ScrollFX } from "@/components/ScrollFX";
import { StatementHero, Gallery } from "@/components/ds";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, Flip);

const GALLERY_ITEMS = [
  { tag: "Seed", title: "Pre-product bets", body: "Judge teams and markets when there is more vision than traction." },
  { tag: "Series A", title: "Early traction", body: "Weigh growth, retention and unit economics against the category." },
  { tag: "Growth", title: "Scaling proof", body: "Compare efficiency and defensibility as the numbers mature." },
  { tag: "Diligence", title: "Evidence trail", body: "Every score links to the deck page and the source behind it." },
  { tag: "Committee", title: "Shared view", body: "One comparable report the whole table can read the same way." },
];

/**
 * EXPERIMENT — the bottom section's OWN heading is the shared element.
 *
 * Bottom section is a real <Gallery surface="ink" /> (LabGallery). On scroll
 * through the pinned transition, its real `.head` (eyebrow + title + sub):
 *   1. DETACHES from the gallery and flies up to the screen centre (GSAP Flip),
 *      over the still-light gradient — colour forced dark so it reads;
 *   2. HOLDS centre while the gradient flips light→dark (3-layer opacity bloom)
 *      and the heading inverts dark→white;
 *   3. REDOCKS back into the gallery (Flip) as the pin releases — landing in its
 *      real place, the gallery's own ink styles restored.
 *
 * Detach is a class toggle (NOT reparent) so the head keeps its `.lab-gallery`-
 * scoped styles; Flip animates the layout delta. Colour override via `--tf-ink`.
 */
export function TransitionsDemo() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const cs = getComputedStyle(scope);
      const fgDark = cs.getPropertyValue("--fg").trim() || "#1d1d1f";
      const fgLight = cs.getPropertyValue("--fg-on-dark").trim() || "#f4f4fb";

      // the VISIBLE gallery head (v1; v3 is hidden — don't grab that copy)
      const head = scope.querySelector<HTMLElement>('.lab-gallery [data-version="1"] .head');
      const galleryEl = scope.querySelector<HTMLElement>(".lab-gallery");
      if (!head || !galleryEl) return;

      // accent word — wrap the title's first word in a lens-gradient `.grad-word`
      // (idempotent across HMR). Stays accented in the gallery and while travelling.
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
      const startY = Math.round(window.innerHeight * 0.42); // starts this far BELOW centre
      const dockY = Math.round(window.innerHeight * 0.3); // travels this far DOWN toward its dock

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".tf-bg--dark", { opacity: 1 });
        return; // head stays in the gallery, ink styles, no travel
      }

      let detached = false;
      let autoPlayed = false; // guards the one-shot auto-scroll per pass

      // detach is INSTANT — the vertical travel is scrub-driven (--tf-y), so the
      // head rides the scroll up from below into centre. Lock width/left so going
      // position:fixed doesn't shrink-to-fit (that caused the horizontal wander).
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
        // do NOT restore data-reveal (re-adding flashed it to opacity:0 → end jerk).
        // back.out → overshoots slightly past its slot, then settles back.
        Flip.from(state, {
          duration: 0.85,
          ease: "back.out(1.5)",
          onComplete: () => gsap.set(head, { clearProps: "--tf-ink,--tf-title" }),
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".tf",
          start: "top top",
          end: () => "+=" + window.innerHeight * 2,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          // head detaches + rides up from below as you scroll IN (manual, 0→~0.45)
          onEnter: detach,
          onEnterBack: detach,
          // AUTO-PLAY: as soon as the heading reaches centre (progress ~0.34) — it
          // then starts driving DOWN while the bg is still white — anchor-scroll
          // the rest to the gallery. Not autoKilled, so momentum can't cancel it.
          onUpdate: (self) => {
            if (!autoPlayed && self.direction === 1 && self.progress >= 0.34) {
              autoPlayed = true;
              // anchor-scroll all the way to the gallery — the page rides down WITH
              // the heading to its final place (transition plays + redock en route).
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
        // heading rides UP from below into centre — quick, on WHITE (0→0.3)…
        .fromTo(head, { "--tf-y": startY }, { "--tf-y": 0, duration: 0.3 }, 0)
        // …then immediately starts driving DOWN — STILL on the white bg — and the
        // gradient flip only catches up after. The gradient stays put; the heading
        // moves. (descend 0.34→0.94)
        .to(head, { "--tf-y": dockY, duration: 0.6, ease: "power1.in" }, 0.34)
        // BRIDGE flip (no dirty grey) — held white through the rise, then fades as
        // the heading is already descending: light → brand bridge + glow → dark.
        .to(".tf-bg--light", { opacity: 0, duration: 0.4 }, 0.3)
        .fromTo(".tf-bg--mid", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.34)
        .to(".tf-bg--mid", { opacity: 0, duration: 0.3 }, 0.62)
        .fromTo(".tf-bg--glow", { opacity: 0 }, { opacity: 1, duration: 0.28 }, 0.36)
        .to(".tf-bg--glow", { opacity: 0, duration: 0.28 }, 0.62)
        .fromTo(".tf-bg--dark", { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.5)
        // eyebrow: plain dark → white (late, once descending into the dark)
        .to(head, { "--tf-ink": fgLight, duration: 0.22, ease: "none" }, 0.6)
        // title + sub IGNITE: dark → transparent (lens gradient shows) → white;
        // accent word stays lens.
        .to(head, { "--tf-title": "transparent", duration: 0.12, ease: "none" }, 0.54)
        .to(head, { "--tf-title": fgLight, duration: 0.16, ease: "none" }, 0.66);

      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <main className="tg section-lab ds" ref={root}>
      {/* TOP — real light section */}
      <StatementHero
        surface="light"
        marker="Top · light section"
        version={1}
        eyebrow="The brief"
        titleLead="AI prepares the analysis — a human"
        titleAccent="decides"
        sub="A real light section to scroll from. Keep going — the section below hands its heading up into the flip."
        ctas={[
          { label: "Get started", href: "#" },
          { label: "How it works", href: "#" },
        ]}
        media={{ ratio: "16/9", label: "Hero · lens", hint: "Lens-gradient over neutral", ariaLabel: "Hero lens" }}
      />

      {/* MIDDLE — the tone-flip transition (gradient only; the gallery's head
          flies in here) */}
      <section className="tf">
        <div className="tf-pin">
          <div className="tf-bg tf-bg--light" aria-hidden="true" />
          <div className="tf-bg tf-bg--mid" aria-hidden="true" />
          <div className="tf-bg tf-bg--dark" aria-hidden="true" />
          <div className="tf-bg tf-bg--glow" aria-hidden="true" />
        </div>
      </section>

      {/* BOTTOM — real dark gallery; its OWN head is the flying/redocking element */}
      <Gallery
        surface="ink"
        marker="Bottom · dark gallery"
        ariaLabel="Horizontal gallery"
        eyebrow="Investment stages"
        title="Equal ideas in one scrollable lane"
        sub="The heading you saw fly through the flip is this section's own — it just landed back in place."
        laneLabel="Investment stages — horizontally scrollable"
        items={GALLERY_ITEMS}
      />

      {/* ScrollFX REQUIRED so the DS sections' data-reveal elements appear. */}
      <ScrollFX />
    </main>
  );
}
