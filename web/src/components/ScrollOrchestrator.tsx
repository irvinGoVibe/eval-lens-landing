"use client";

import { useEffect } from "react";

import { onScrollFrame } from "@/lib/scroll-bus";

/**
 * Verbatim port of the original landing-page <script> block.
 * Single client-side mount: progress bar, header tint, reveal IO,
 * hero dual-video sync, hero parallax, Apple-style scroll-scrub for
 * #problem, #workflow epic heading, and workflow scroll demo.
 *
 * Each sub-IIFE matches the original 1-for-1. DOM queries happen after
 * mount so they see the section markup rendered by the server.
 */
export function ScrollOrchestrator() {
  useEffect(() => {
    // runScript() registers every listener / observer / rAF loop / timer it
    // creates and returns a full teardown. That makes StrictMode's dev
    // double-invoke safe (init → teardown → init), lets Fast Refresh remount
    // cleanly, and — critically — a SPA navigation away from the home page
    // tears everything down instead of leaving listeners running against
    // detached nodes. Returning to the home page re-initialises from scratch
    // (no window/module once-flags).
    return runScript();
  }, []);

  return null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
function runScript(): () => void {
  /* teardown registry — every listener / observer / rAF loop / timeout below
     registers its undo here; the effect cleanup runs them all. */
  const cleanups: Array<() => void> = [];
  let disposed = false;
  cleanups.push(() => {
    disposed = true;
  });
  /** addEventListener + auto-registered removeEventListener. */
  const on = (
    target: EventTarget,
    type: string,
    handler: any,
    options?: boolean | AddEventListenerOptions,
  ) => {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  };
  /**
   * Subscribe to the shared scroll/resize frame (see `@/lib/scroll-bus`) and
   * register the teardown. Every scroll-driven block below used to own a
   * `scroll` + `resize` listener pair and a private rAF; they now all paint in
   * one frame behind one listener pair.
   */
  const subscribeScroll = (handler: () => void) => {
    cleanups.push(onScrollFrame(handler));
  };

  /**
   * Turn a horizontal touch gesture into one deterministic step change.
   * The rail itself uses `touch-action: pan-y`, so vertical page scrolling is
   * preserved while a left/right swipe follows the exact same `goTo()` path
   * as the arrow controls. Suppressing the synthetic click prevents the card
   * under the release point from immediately overriding the swipe result.
   */
  const bindStepRailSwipe = (
    rail: HTMLElement,
    enabled: () => boolean,
    onStep: (direction: -1 | 1) => void,
  ) => {
    let startX = 0;
    let startY = 0;
    let tracking = false;
    let suppressClickUntil = 0;

    on(
      rail,
      "touchstart",
      (event: TouchEvent) => {
        if (!enabled() || event.touches.length !== 1) {
          tracking = false;
          return;
        }
        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        tracking = true;
      },
      { passive: true },
    );
    on(
      rail,
      "touchend",
      (event: TouchEvent) => {
        if (!tracking || !enabled()) return;
        tracking = false;
        const touch = event.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (Math.abs(dx) < 44 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
        suppressClickUntil = performance.now() + 500;
        onStep(dx < 0 ? 1 : -1);
      },
      { passive: true },
    );
    on(
      rail,
      "touchcancel",
      () => {
        tracking = false;
      },
      { passive: true },
    );
    on(
      rail,
      "click",
      (event: MouseEvent) => {
        if (performance.now() >= suppressClickUntil) return;
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true,
    );
  };

  /* scroll progress */
  const prog = document.getElementById("progress");
  const onScroll = () => {
    // read phase: layout queries only; the style write runs in the bus's
    // write phase so it cannot force a reflow for later readers.
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    return () => {
      if (prog) prog.style.setProperty("--p", p);
    };
  };
  subscribeScroll(onScroll);
  onScroll()();

  /* site header — flip text colour to contrast whatever section sits under the
     bar. Light text (lavender/white) over the dark zones — the hero, the bento
     `.band.ink`, the dark CTA band — and dark text (violet/ink) over the light
     sections between them. Without this the nav goes dark-on-dark and vanishes
     over the bento + CTA below the hero. */
  (function () {
    const header = document.getElementById("site-header");
    if (!header) return;
    let lastY = window.scrollY;
    let pointerNearHeader = false;
    const HEADER_REVEAL_ZONE = 96;
    const sync = () => {
      const r = header.getBoundingClientRect();
      const x = Math.round(window.innerWidth / 2);
      const y = Math.max(1, Math.round(r.bottom - 2));
      const surface = document
        .elementsFromPoint(x, y)
        .map((el) => {
          if (!(el instanceof HTMLElement)) return false;
          return el.closest<HTMLElement>(
            "#hero, .scroll-scrub, .section-orange-glow, .band, .cta-band--dark",
          );
        })
        .find((el): el is HTMLElement => Boolean(el));
      const overDark = Boolean(
        surface &&
          (surface.id === "hero" ||
            surface.classList.contains("scroll-scrub") ||
            surface.classList.contains("cta-band--dark") ||
            surface.classList.contains("ink") ||
            (surface.classList.contains("section-orange-glow") &&
              surface.getBoundingClientRect().top <= y &&
              surface.getBoundingClientRect().top +
                surface.getBoundingClientRect().height * 0.5 >
                y)),
      );
      const yNow = window.scrollY;
      const delta = yNow - lastY;
      const heroReady = document.body.classList.contains("hero-ready");
      if (Math.abs(delta) > 1) lastY = yNow;
      // write phase: all class toggles deferred behind the frame's reads
      return () => {
        header.classList.toggle("is-light", !overDark);
        if (yNow <= 4) {
          header.classList.remove("is-hidden");
        } else if (heroReady) {
          if (delta > 8 && !pointerNearHeader) header.classList.add("is-hidden");
          else if (delta < -6) header.classList.remove("is-hidden");
        }
      };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointerNearHeader = event.clientY <= HEADER_REVEAL_ZONE;
      if (pointerNearHeader) {
        header.classList.remove("is-hidden");
      } else if (
        window.scrollY > 4 &&
        document.body.classList.contains("hero-ready")
      ) {
        header.classList.add("is-hidden");
      }
    };
    // sync() does elementsFromPoint + getBoundingClientRect, so it must run at
    // most once per frame — the shared scroll frame already guarantees that.
    sync()();
    subscribeScroll(sync);
    // onPointerMove itself does no layout reads (class toggles only) — kept
    // direct so header reveal stays immediate; sync() is no longer called
    // from any per-event path.
    on(window, "pointermove", onPointerMove, { passive: true });
  })();

  /* orange-glow scroll-driven phase — writes --glow-p / --glow-zarya on
     .section-orange-glow so the intro halo (зарево) blooms as the section
     2→3 hand-off begins, then shrinks. Orbs are NOT gated by scroll — they
     stay at fixed brightness independently. */
  (function initOrangeGlowPhase() {
    const glow = document.querySelector(".section-orange-glow") as HTMLElement | null;
    if (!glow) return;
    const compute = () => {
      const rect = glow.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = vh + rect.height;
      const traveled = vh - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      // intro halo: ramps 0→1 over p∈[0,.2], then 1→0 over p∈[.2,.55]
      const zarya = p < 0.2 ? p / 0.2 : Math.max(0, (0.55 - p) / 0.35);
      // write phase — style writes deferred behind the frame's reads
      return () => {
        glow.style.setProperty("--glow-p", p.toFixed(3));
        glow.style.setProperty("--glow-zarya", zarya.toFixed(3));
      };
    };
    compute()();
    subscribeScroll(compute);
  })();

  /* ambient-layer gate — the decorative blooms / blobs / floats run `infinite`
     CSS animations on promoted layers. Off-screen that is pure cost: an
     animation nobody can see, holding a large blurred compositor layer. Mark
     each host so `[data-fx-gate]:not(.is-onscreen)` in globals.css can switch
     its ambient children off, and toggle `is-onscreen` from one observer.
     The 60% rootMargin restarts the loops a screenful before they are seen. */
  (function initAmbientGate() {
    const hosts = document.querySelectorAll<HTMLElement>(
      ".section-orange-glow, .cta-band, .blob-field, .wf-floats, #hero, .scroll-scrub, #decisions",
    );
    if (!hosts.length) return;
    const gate = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle("is-onscreen", e.isIntersecting);
        });
      },
      { rootMargin: "60% 0px 60% 0px" },
    );
    hosts.forEach((host) => {
      host.dataset.fxGate = "";
      gate.observe(host);
    });
    cleanups.push(() => {
      gate.disconnect();
      hosts.forEach((host) => {
        delete host.dataset.fxGate;
        host.classList.remove("is-onscreen");
      });
    });
  })();

  /* reveal on scroll — drives every `.reveal` element, including the home-page
     blog block's section-level fade (#home-blog, Story 02). One-shot: it adds
     `.in` once and unobserves. The Newsroom CARDS get a separate, re-firing
     bounce observer just below; both are owned here (no per-section useEffect). */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  cleanups.push(() => io.disconnect());
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* Newsroom carousel — springy bounce-in / bounce-out for the cards
     (#home-blog). A dedicated observer (kept observing, unlike the one-shot
     `.reveal` IO above) toggles `.cards-in` / `.cards-out` so the cards re-play
     their spring each time the block scrolls into / out of view. CSS owns the
     motion (`news-pop` / `news-drop` in globals.css). */
  (function initNewsroomReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const block = e.target;
          if (e.isIntersecting) {
            block.classList.add("cards-in");
            block.classList.remove("cards-out");
          } else if (block.classList.contains("cards-in")) {
            block.classList.add("cards-out");
            block.classList.remove("cards-in");
          }
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -12% 0px" }
    );
    cleanups.push(() => nio.disconnect());
    // #home-blog is an async Server Component, so it can stream in AFTER this
    // orchestrator mounts. Attach immediately if present, otherwise watch for it.
    const attach = () => {
      const block = document.getElementById("home-blog");
      if (!block) return false;
      nio.observe(block);
      return true;
    };
    if (attach()) return;
    const mo = new MutationObserver(() => {
      if (attach()) {
        mo.disconnect();
        clearTimeout(moGuard);
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // guard: if #home-blog never streams in (blog block absent / failed),
    // stop observing the whole body instead of watching mutations forever.
    const moGuard = setTimeout(() => mo.disconnect(), 15000);
    cleanups.push(() => {
      mo.disconnect();
      clearTimeout(moGuard);
    });
  })();

  /* hero intro: synced dual-video play + copy reveal */
  (function initHeroIntro() {
    const hero = document.getElementById("hero");
    const video = hero?.querySelector(".hero-video") as HTMLVideoElement | null;
    const overlay = hero?.querySelector(".hero-unicorn") as HTMLVideoElement | null;
    const overlayWrap = hero?.querySelector(".hero-unicorn-wrap") as HTMLElement | null;
    const heroHead = hero?.querySelector(".hero-head") as HTMLElement | null;
    const COPY_REVEAL_SEC = 1.4;
    const COPY_REVEAL_MS = COPY_REVEAL_SEC * 1000;
    const OVERLAY_REVEAL_SEC = 2.0;
    const OVERLAY_HIDE_SEC: number | null = 3.2;
    const TEXT_SMASH_AT_SEC: number | null = OVERLAY_REVEAL_SEC;
    const SYNC_DRIFT = 0.04;
    if (!hero) return;

    if (overlay) {
      const isSafari = document.documentElement.classList.contains("ua-safari");
      const sources = Array.from(overlay.querySelectorAll("source"));
      // Respect the responsive `media` attributes: on a phone the min-width
      // sources don't apply, so the 720p mobile encodes must win. Only then
      // pick the format for the browser (mov for Safari, webm otherwise).
      const applies = (s: HTMLSourceElement) => {
        const m = s.getAttribute("media");
        return !m || window.matchMedia(m).matches;
      };
      const candidates = sources.filter(applies);
      const mov = candidates.find((s) => /\.mov/i.test(s.getAttribute("src") || ""));
      const webm = candidates.find((s) => /\.webm/i.test(s.getAttribute("src") || ""));
      const keep = (isSafari ? mov : webm) ?? mov ?? webm;
      sources.forEach((s) => {
        if (s !== keep) s.remove();
      });
      overlay.load();
    }

    const layers = [video, overlay].filter(Boolean) as HTMLVideoElement[];
    const hasPair = !!(video && overlay);

    const reveal = () => {
      hero.classList.add("hero-ready");
      document.body.classList.add("hero-ready");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    if (!video) {
      reveal();
      return;
    }

    let done = false;
    let playing = false;
    let starting = false;
    let maxWait: ReturnType<typeof setTimeout> | null = null;
    let copyTimer: ReturnType<typeof setTimeout> | null = null;
    const ready = new Set<HTMLVideoElement>();

    cleanups.push(() => {
      done = true; // late finish()/timers become no-ops
      if (maxWait) clearTimeout(maxWait);
      if (copyTimer) clearTimeout(copyTimer);
    });

    layers.forEach((el) => {
      el.loop = false;
      el.muted = true;
    });

    const finish = () => {
      if (done) return;
      done = true;
      if (maxWait) clearTimeout(maxWait);
      if (copyTimer) clearTimeout(copyTimer);
      reveal();
    };

    // The fallback deadline may only move CLOSER, never further out. Re-arming
    // used to restart the clock (metadata arriving at 5s on a slow connection
    // pushed the reveal to 5s + duration) and left the hero copy hidden for
    // 10–13s — the page's LCP. The ceiling set at boot now always holds.
    let fallbackDeadline = Infinity;
    const armFallback = (sec: number) => {
      const target = performance.now() + (sec + 1) * 1000;
      if (target >= fallbackDeadline) return;
      fallbackDeadline = target;
      if (maxWait) clearTimeout(maxWait);
      maxWait = setTimeout(finish, (sec + 1) * 1000);
    };

    const scheduleCopyReveal = () => {
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(finish, COPY_REVEAL_MS);
    };

    const markReady = (el: HTMLVideoElement | null) => {
      if (!el || ready.has(el)) return;
      ready.add(el);
      if (ready.size >= layers.length) beginPlayback();
    };

    const beginPlayback = async () => {
      if (playing || starting) return;
      starting = true;

      layers.forEach((el) => {
        try {
          el.pause();
        } catch (_) {}
      });
      layers.forEach((el) => {
        try {
          el.currentTime = 0;
        } catch (_) {}
      });
      await new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      );
      if (disposed) {
        starting = false;
        return;
      }

      try {
        await Promise.all(layers.map((el) => el.play()));
        playing = true;
      } catch (_) {
        playing = false;
      } finally {
        starting = false;
      }
    };

    const keepInSync = () => {
      if (!hasPair || !video || !overlay || video.paused) return;
      if (Math.abs(video.currentTime - overlay.currentTime) > SYNC_DRIFT) {
        try {
          overlay.currentTime = video.currentTime;
        } catch (_) {}
      }
    };

    let overlayShown = false;
    let overlayHidden = false;
    let smashFired = false;
    const maybeRevealOverlay = () => {
      if (
        TEXT_SMASH_AT_SEC != null &&
        !smashFired &&
        heroHead &&
        video.currentTime >= TEXT_SMASH_AT_SEC
      ) {
        heroHead.classList.add("hero-smash");
        smashFired = true;
        const smashT = setTimeout(() => heroHead.classList.remove("hero-smash"), 900);
        cleanups.push(() => clearTimeout(smashT));
      }
      if (!overlayWrap) return;
      if (!overlayShown && video.currentTime >= OVERLAY_REVEAL_SEC) {
        overlayWrap.classList.add("is-visible");
        overlayShown = true;
      }
      if (
        overlayShown &&
        !overlayHidden &&
        OVERLAY_HIDE_SEC != null &&
        video.currentTime >= OVERLAY_HIDE_SEC
      ) {
        overlayWrap.classList.remove("is-visible");
        overlayHidden = true;
      }
    };

    on(video, "playing", scheduleCopyReveal, { once: true });
    on(video, "timeupdate", () => {
      keepInSync();
      maybeRevealOverlay();
      if (video.currentTime * 1000 >= COPY_REVEAL_MS) finish();
    });

    /* fade overlay to opacity 0 the moment it finishes playing */
    if (overlay)
      on(
        overlay,
        "ended",
        () => {
          overlayWrap?.classList.remove("is-visible");
          overlayHidden = true;
        },
        { once: true }
      );

    layers.forEach((el) => {
      const onReady = () => markReady(el);
      if (el.readyState >= 2) onReady();
      on(el, "loadeddata", onReady, { once: true });
      on(el, "canplay", onReady);
      on(
        el,
        "loadedmetadata",
        () => {
          // Cap the re-arm at the initial 3s ceiling. On a slow connection
          // metadata arrives long before the video can play, and re-arming to
          // the full duration used to leave the hero copy hidden for the whole
          // clip length (13s+ observed on Slow 4G) — an LCP disaster. The
          // normal choreography (videos ready → play → 1.4s copy reveal) never
          // reaches this timer; it only caps the degraded-network wait.
          if (video.duration) armFallback(Math.min(video.duration, 3));
        },
        { once: true }
      );
      on(
        el,
        "error",
        () => {
          const errT = setTimeout(finish, 500);
          cleanups.push(() => clearTimeout(errT));
        },
        { once: true }
      );
    });

    armFallback(3);

    const prime = () => {
      if (!playing) beginPlayback();
    };
    on(window, "touchstart", prime, { passive: true, once: true });
    on(window, "click", prime, { once: true });
  })();

  /* hero edge splashes — scroll parallax vs background video */
  (function initHeroSplashesParallax() {
    const hero = document.getElementById("hero");
    const mediaStack = hero?.querySelector(".hero-media-stack") as HTMLElement | null;
    const heroDim = hero?.querySelector(".hero-dim") as HTMLElement | null;
    const unicornWrap = hero?.querySelector(".hero-unicorn-wrap") as HTMLElement | null;
    const splashes = hero?.querySelectorAll(".hero-splash") as NodeListOf<HTMLElement> | undefined;
    if (!hero || !splashes?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const BG_RATE = 0.14;
    const FG_RATE = 0.52;

    const paint = () => {
      // read phase — one rect; every dataset read is DOM-attr only (no layout)
      const rect = hero.getBoundingClientRect();
      const shift = -rect.top;
      const heroH = rect.height || window.innerHeight;

      const bgY = (shift * BG_RATE).toFixed(2) + "px";
      // write phase
      return () => {
      if (mediaStack) mediaStack.style.setProperty("--bg-y", bgY);
      if (heroDim) heroDim.style.setProperty("--bg-y", bgY);
      if (unicornWrap) unicornWrap.style.setProperty("--bg-y", bgY);

      splashes.forEach((el) => {
        const d = parseFloat(el.dataset.depth || "0.5") || 0.5;
        const side = el.dataset.side === "right" ? 1 : -1;
        const px = shift * d * FG_RATE * 0.18 * side;
        const py = shift * d * FG_RATE;
        const fade = Math.max(
          0,
          Math.min(1, 1 - Math.max(0, shift - heroH * 0.65) / (heroH * 0.35))
        );
        el.style.setProperty("--px", px.toFixed(2) + "px");
        el.style.setProperty("--py", py.toFixed(2) + "px");
        el.style.setProperty("--scroll-fade", fade.toFixed(3));
      });
      };
    };

    // paint() reads the hero rect in the bus's read phase and returns the
    // style writes for its write phase — no private rAF hop needed.
    subscribeScroll(paint);
    paint()();
  })();

  /* ============================================================
     Scroll-driven video scrub (Apple-style)
     ============================================================ */
  (function initScrollScrub() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileScrub = window.matchMedia("(max-width: 760px)").matches;
    const sections = document.querySelectorAll(".scroll-scrub");
    if (!sections.length) return;

    sections.forEach((section) => {
      const track = section.querySelector(".scrub-track") as HTMLElement | null;
      const pin = section.querySelector(".scrub-pin") as HTMLElement | null;
      const video = section.querySelector(".scrub-video") as HTMLVideoElement | null;
      const stages = Array.from(section.querySelectorAll(".scrub-stage")) as HTMLElement[];
      const ticks = Array.from(section.querySelectorAll(".scrub-rail .tick")) as HTMLElement[];
      const cue = section.querySelector(".scrub-scroll-cue") as HTMLElement | null;
      const heading = section.querySelector(".scrub-heading") as HTMLElement | null;
      const headingSlot = section.querySelector(".scrub-heading-slot") as HTMLElement | null;
      const stageArea = section.querySelector(".scrub-stage-area") as HTMLElement | null;
      const scene = section.querySelector(".scrub-scene") as HTMLElement | null;
      const scrubFiles = scene
        ? (Array.from(scene.querySelectorAll(".scrub-file")) as HTMLElement[])
        : ([] as HTMLElement[]);
      const scrubCells = scene
        ? (Array.from(scene.querySelectorAll(".scrub-cell")) as HTMLElement[])
        : ([] as HTMLElement[]);
      // cached once — updateSceneCells runs per frame and must not re-query
      const cellBars = scrubCells.map(
        (cell) => cell.querySelector(".bar i") as HTMLElement | null
      );
      if (!track || !pin) return;

      function splitEpicLines() {
        if (!heading || heading.dataset.charsSplit) return;
        heading.dataset.charsSplit = "1";
        let ci = 0;
        const l1 = heading.querySelector(".epic-line.l1");
        if (l1) {
          const text = l1.textContent || "";
          l1.textContent = "";
          text.split("").forEach((ch) => {
            const s = document.createElement("span");
            s.className = "epic-char";
            s.textContent = ch === " " ? " " : ch;
            s.style.setProperty("--ci", String(ci++));
            l1.appendChild(s);
          });
        }
        const l2 = heading.querySelector(".epic-line.l2");
        if (l2) {
          Array.from(l2.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && (node.textContent || "").trim()) {
              const s = document.createElement("span");
              s.className = "epic-char";
              s.textContent = node.textContent;
              l2.replaceChild(s, node);
            }
          });
        }
        heading.style.setProperty("--l1-chars", String(ci));
      }
      splitEpicLines();

      if (reduce) {
        if (heading) {
          heading.style.setProperty("--sub-op", "1");
        }
      }

      let epicPlayed = false;
      let smoothTop: number | null = null;
      let duration = 0;
      let hasVideo = false;
      let targetTime = 0;
      let currentTime = 0;
      let lastSetTime = -1;
      const scrubFps = Math.max(1, Number(video?.dataset.scrubFps) || 15);
      const scrubFrameDuration = 1 / scrubFps;
      let reducedSceneReady = false;
      let progress = 0;
      let rafPending = false;
      let rafHandle = 0;
      let ready = false;

      // Per-frame layout-read cache: tick() gathers EVERY layout read up
      // front, then the update* writers below consume these instead of
      // re-reading layout between style writes (read → write phases).
      let fVh = 0;
      let fTrackTop = 0;
      let fTrackHeight = 0;
      let fScrollY = 0;
      let fPinActive = false;
      let fSlotTop = 0;
      let fHeadingH = 120;

      function markHasVideo() {
        if (hasVideo) return;
        hasVideo = true;
        section.classList.add("has-video");
      }

      if (video) {
        // Belt-and-suspenders: even if some browser autoplays the scrub-video
        // (e.g. iOS Safari with user gesture in another tab), force-pause so
        // it never drifts independently of scroll. Otherwise scrolling back
        // up fights an autoplay that keeps pushing currentTime forward and
        // the rewind looks like it doesn't work.
        try { video.pause(); } catch (_) {}
        const onMetadata = () => {
          duration = video.duration || 0;
          if (duration > 0) {
            ready = true;
            markHasVideo();
            try {
              video.pause();
              video.currentTime = 0;
            } catch (_) {}
            schedule();
          }
        };
        // preload="auto" can fire loadedmetadata BEFORE our listener attaches —
        // especially after hydration of a server-rendered <video>. If duration
        // is already known, run the handler synchronously instead of waiting
        // for an event that will never come.
        if (video.readyState >= 1 && video.duration > 0) {
          onMetadata();
        } else {
          on(video, "loadedmetadata", onMetadata, { once: true });
          // Some browsers expose duration on `durationchange` rather than
          // `loadedmetadata` when the value transitions from NaN to a number.
          on(video, "durationchange", onMetadata, { once: true });
        }
        on(video, "error", () => {
          ready = false;
        }, { once: true });
        // If the browser kicks off playback anyway (autoplay heuristics,
        // metadata events), kill it on each play attempt.
        on(video, "play", () => {
          try { video.pause(); } catch (_) {}
        });
        // Safari can stall the main thread when a stream of random-access
        // currentTime writes arrives before the previous seek completes.
        // Resume from the latest target only after WebKit has decoded a frame.
        on(video, "seeked", schedule);
        // iOS Safari historically needed a play+pause to unlock seek. Keep
        // the prime, but pause again right after so we stay in scrub-only mode.
        const primeOnce = () => {
          if (!ready) return;
          const p = video.play();
          if (p && typeof p.then === "function") {
            p.then(() => video.pause()).catch(() => {});
          }
          window.removeEventListener("touchstart", primeOnce);
          window.removeEventListener("click", primeOnce);
        };
        on(window, "touchstart", primeOnce, { passive: true, once: true });
        on(window, "click", primeOnce, { once: true });

        // Lazy scrub-video bytes: the <video> ships preload="metadata" (see
        // Problem.tsx), so the ~1.8 MB mp4 no longer downloads on first
        // paint. Flip to preload="auto" + load() once the section approaches
        // the viewport (two screens out either way) so the frames are
        // buffered by the time the pin starts scrubbing.
        let warmed = video.preload === "auto";
        const warmIO = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting || warmed) return;
              warmed = true;
              video.preload = "auto";
              try {
                video.load();
              } catch (_) {}
              warmIO.disconnect();
            });
          },
          { rootMargin: "200% 0px 200% 0px" }
        );
        warmIO.observe(section);
        cleanups.push(() => warmIO.disconnect());
      }

      function computeProgress() {
        // consumes the per-frame read cache captured at the top of tick()
        const scrollable = fTrackHeight - fVh;
        if (scrollable <= 0) return 0;
        const scrolled = Math.min(Math.max(-fTrackTop, 0), scrollable);
        return scrolled / scrollable;
      }

      function easeOut(t: number) {
        return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 2.4);
      }
      function easeInOut(t: number) {
        const x = Math.min(1, Math.max(0, t));
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      }
      function suckOpacity(pull: number) {
        if (pull <= 0.56) return 0;
        const t = (pull - 0.56) / 0.2;
        return 1 - Math.pow(1 - Math.min(1, t), 3.2);
      }

      const PHASE = mobileScrub
        ? {
            HOLD_END: 0.08,
            LIFT_START: 0.08,
            LIFT_END: 0.08,
            SUB_START: 0.08,
            VIDEO_START: 0.12,
            SCENE_START: 0.34,
            EXIT_START: 0.9,
          }
        : {
            HOLD_END: 0.2,
            LIFT_START: 0.2,
            LIFT_END: 0.48,
            SUB_START: 0.26,
            VIDEO_START: 0.36,
            SCENE_START: 0.5,
            EXIT_START: 0.88,
          };
      const SUCK_VIDEO_START = 0.56;
      const SUCK_VIDEO_END = 0.94;
      const FILES_GONE_PULL = 0.94;
      const CELLS_PULL_START = 0.82;
      const CELL_REVEAL = 0.34;
      const CELL_ORDER = [2, 1, 0];
      const CELL_BLUR_MAX = 36;
      let suckTargets: { dx: number; dy: number }[] | null = null;
      let suckBaseTransforms: string[] | null = null;
      let cellRest: { startX: number; startY: number }[] | null = null;

      function updateHeading(trackP: number) {
        if (!heading) return;
        if (mobileScrub) {
          // Keep the copy anchored to the sticky pin on touch devices. iOS
          // Safari can rebase a JS-moved position:fixed descendant while its
          // browser chrome collapses, which made this heading jump and overlap
          // the scrubbed frame. The sticky parent already provides the pinning
          // we need, so no per-frame heading position writes are necessary.
          const trackIsOnScreen =
            fPinActive &&
            fTrackTop + fTrackHeight > 0 &&
            trackP < PHASE.EXIT_START - 0.001;
          heading.classList.toggle("is-shown", trackIsOnScreen);
          heading.classList.toggle("is-epic-active", trackIsOnScreen);
          heading.style.setProperty("--sub-op", trackIsOnScreen ? "1" : "0");
          heading.style.opacity = "";
          smoothTop = null;
          return;
        }
        if (reduce) {
          // A reduced-motion visitor still needs the section heading, but it
          // must remain scoped to the sticky scene. Showing this fixed element
          // during initialisation placed it over the homepage hero in Safari.
          const trackIsOnScreen =
            fPinActive && fTrackTop + fTrackHeight > 0 && trackP < PHASE.EXIT_START;
          heading.classList.toggle("is-shown", trackIsOnScreen);
          heading.classList.toggle("is-epic-active", trackIsOnScreen);
          heading.style.setProperty("--h-top", "50vh");
          heading.style.setProperty("--sub-op", "1");
          heading.style.opacity = "";
          return;
        }
        const vh = fVh;
        const scrollY = fScrollY;
        const start = vh * 0.5;
        const pinActive = fPinActive;
        const centerY = vh * 0.5;

        if (scrollY < start * 0.88) {
          heading.classList.remove("is-shown");
          smoothTop = null;
          heading.style.setProperty("--sub-op", "0");
          return;
        }

        heading.classList.add("is-shown");

        if (!epicPlayed) {
          epicPlayed = true;
          smoothTop = centerY;
          heading.classList.add("is-epic-active");
        }

        const headingTopInset = Math.min(64, Math.max(32, vh * 0.055));
        let slotY = centerY;
        if (headingSlot) {
          slotY = fSlotTop + headingTopInset + fHeadingH * 0.38;
        }

        let targetTop = centerY;
        let subOp = 0;
        let liftT = 0;

        if (pinActive) {
          if (trackP < PHASE.LIFT_START) {
            targetTop = centerY;
          } else if (trackP < PHASE.LIFT_END) {
            liftT = (trackP - PHASE.LIFT_START) / (PHASE.LIFT_END - PHASE.LIFT_START);
            targetTop = centerY + (slotY - centerY) * easeInOut(liftT);
          } else {
            targetTop = slotY;
            liftT = 1;
          }

          if (trackP >= PHASE.SUB_START) {
            subOp = easeOut(Math.min(1, (trackP - PHASE.SUB_START) / 0.12));
          }
        }

        if (smoothTop === null) smoothTop = centerY;
        const lerp = pinActive && liftT > 0 && liftT < 1 ? 0.1 : pinActive ? 0.14 : 0.18;
        smoothTop += (targetTop - smoothTop) * lerp;

        heading.style.setProperty("--h-top", smoothTop + "px");
        heading.style.setProperty("--sub-op", String(subOp));
        if (trackP >= PHASE.EXIT_START) {
          heading.style.opacity = String(
            Math.max(0, 1 - (trackP - PHASE.EXIT_START) / 0.08)
          );
        } else {
          heading.style.opacity = "";
        }
      }

      function updateReveal(p: number) {
        const pinActive = fPinActive;
        if (stageArea)
          stageArea.classList.toggle("is-visible", pinActive && p >= PHASE.VIDEO_START);
        if (scene) scene.classList.toggle("is-visible", pinActive && p >= PHASE.SCENE_START);
      }

      function updateExit(p: number) {
        if (!stageArea || reduce) return;
        let y = 0;
        if (p >= PHASE.EXIT_START) {
          const t = (p - PHASE.EXIT_START) / (1 - PHASE.EXIT_START);
          y = easeInOut(Math.min(1, t)) * 60;
        }
        stageArea.style.transform = y > 0 ? `translateY(-${y}vh)` : "";
      }

      function videoProgress(p: number) {
        const end = PHASE.EXIT_START;
        return Math.max(0, Math.min(1, (p - PHASE.VIDEO_START) / (end - PHASE.VIDEO_START)));
      }

      function suckProgress(p: number) {
        const vp = videoProgress(p);
        if (vp <= SUCK_VIDEO_START) return 0;
        return easeInOut(
          Math.min(1, (vp - SUCK_VIDEO_START) / (SUCK_VIDEO_END - SUCK_VIDEO_START))
        );
      }

      function resetFileSuck() {
        suckTargets = null;
        suckBaseTransforms = null;
        if (scene) {
          scene.classList.remove("is-sucking");
          scene.style.removeProperty("--suck-t");
        }
        scrubFiles.forEach((file) => {
          file.style.animation = "";
          file.style.transform = "";
          file.style.opacity = "";
          file.style.filter = "";
          file.style.visibility = "";
        });
        scene?.classList.remove("is-files-gone");
      }

      function captureFileSuckTargets() {
        if (!scene || !scrubFiles.length) return;
        const sr = scene.getBoundingClientRect();
        const cx = sr.left + sr.width * 0.5;
        const cy = sr.top + sr.height * 0.5;
        suckTargets = scrubFiles.map((file) => {
          const r = file.getBoundingClientRect();
          const fx = r.left + r.width * 0.5;
          const fy = r.top + r.height * 0.5;
          return { dx: cx - fx, dy: cy - fy };
        });
        suckBaseTransforms = scrubFiles.map((file) => getComputedStyle(file).transform);
        scene.classList.add("is-sucking");
        scrubFiles.forEach((file, i) => {
          const frozen = suckBaseTransforms![i];
          file.style.animation = "none";
          if (frozen && frozen !== "none") file.style.transform = frozen;
        });
      }

      function updateFileSuck(p: number) {
        if (!scene || !scrubFiles.length || reduce) return;
        const pinActive = fPinActive;
        const sceneOn = pinActive && p >= PHASE.SCENE_START;
        const t = sceneOn ? suckProgress(p) : 0;

        if (t <= 0.001) {
          if (suckTargets) resetFileSuck();
          return;
        }

        if (!suckTargets) captureFileSuckTargets();

        const pull = Math.pow(t, 1.12);
        scene.style.setProperty("--suck-t", pull.toFixed(4));

        const blurShiftX = pull * 400;
        scrubFiles.forEach((file, i) => {
          const target = suckTargets![i];
          if (!target) return;
          const base = suckBaseTransforms![i];
          const m = new DOMMatrix(base && base !== "none" ? base : undefined);
          const scale = Math.max(0.04, 1 - pull * 0.94);
          const shift = new DOMMatrix()
            .translate(target.dx * pull + blurShiftX, target.dy * pull)
            .scaleSelf(scale, scale);
          file.style.transform = shift.multiply(m).toString();
          file.style.opacity = String(Math.max(0, 1 - suckOpacity(pull)));
          const travel = Math.hypot(target.dx, target.dy);
          const cardWeight = 0.5 + 0.5 * Math.min(1, travel / 240);
          const moveX = Math.abs(target.dx * pull + blurShiftX);
          const towardT = Math.min(1, moveX / 72);
          const flyT = Math.pow(pull, 0.48);
          const blur = (10 + towardT * 62) * flyT * cardWeight;
          const bright = 1 + flyT * 0.48;
          file.style.filter =
            blur > 0.4
              ? `blur(${blur.toFixed(1)}px) brightness(${bright.toFixed(2)})`
              : "none";
        });
      }

      function resetSceneCells() {
        cellRest = null;
        if (scene) {
          scene.classList.remove("is-files-gone", "is-cells-active");
        }
        scrubCells.forEach((cell, i) => {
          cell.style.opacity = "";
          cell.style.transform = "";
          cell.style.filter = "";
          const barI = cellBars[i];
          if (barI) barI.style.transform = "";
        });
      }

      function captureCellRest() {
        if (cellRest || !scene) return;
        scrubCells.forEach((cell) => {
          cell.style.transform = "none";
          cell.style.filter = "none";
          cell.style.opacity = "0";
        });
        void scene.offsetHeight;
        const sr = scene.getBoundingClientRect();
        const cx = sr.left + sr.width * 0.5;
        const cy = sr.top + sr.height * 0.5;
        cellRest = scrubCells.map((cell) => {
          const r = cell.getBoundingClientRect();
          return {
            startX: cx - (r.left + r.width * 0.5),
            startY: cy - (r.top + r.height * 0.5),
          };
        });
      }

      function updateSceneCells(p: number) {
        if (!scene || !scrubCells.length) return;
        if (reduce) {
          if (reducedSceneReady) return;
          reducedSceneReady = true;
          scene.classList.add("is-files-gone", "is-cells-active");
          scrubCells.forEach((cell, i) => {
            cell.style.opacity = "1";
            cell.style.transform = "none";
            cell.style.filter = "none";
            const barI = cellBars[i];
            if (barI) {
              const w = parseFloat(barI.style.getPropertyValue("--w") || "0.8");
              barI.style.transform = `scaleX(${w})`;
            }
          });
          return;
        }

        const pinActive = fPinActive;
        const sceneOn = pinActive && p >= PHASE.SCENE_START;
        const suckT = sceneOn ? suckProgress(p) : 0;
        const pull = Math.pow(suckT, 1.12);
        const filesGone = sceneOn && pull >= FILES_GONE_PULL;
        const cellSpan = Math.max(0.001, 1 - CELLS_PULL_START);
        const cellPhase =
          sceneOn && pull >= CELLS_PULL_START
            ? easeOut(Math.min(1, (pull - CELLS_PULL_START) / cellSpan))
            : 0;

        if (!sceneOn) {
          resetSceneCells();
          return;
        }

        scene.classList.toggle("is-files-gone", filesGone);

        if (filesGone) {
          scrubFiles.forEach((file) => {
            file.style.opacity = "0";
            file.style.visibility = "hidden";
          });
        }

        if (cellPhase <= 0) {
          cellRest = null;
          scene.classList.remove("is-cells-active");
          scrubCells.forEach((cell) => {
            cell.style.opacity = "0";
            cell.style.transform = "";
            cell.style.filter = "";
          });
          return;
        }

        scene.classList.add("is-cells-active");
        if (!cellRest) captureCellRest();

        const orderLen = CELL_ORDER.length;
        const stagger = orderLen > 1 ? (1 - CELL_REVEAL) / (orderLen - 1) : 0;

        CELL_ORDER.forEach((idx, orderI) => {
          const cell = scrubCells[idx];
          const rest = cellRest?.[idx];
          if (!cell || !rest) return;
          const slot = orderI * stagger;
          const t = Math.max(0, Math.min(1, (cellPhase - slot) / CELL_REVEAL));
          const e = easeOut(t);
          const x = rest.startX * (1 - e);
          const y = rest.startY * (1 - e);
          const blur = (1 - Math.pow(e, 0.78)) * CELL_BLUR_MAX;
          cell.style.opacity = t > 0.02 ? String(e) : "0";
          cell.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
          cell.style.filter = blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : "none";
          const barI = cellBars[idx];
          if (barI) {
            const w = parseFloat(barI.style.getPropertyValue("--w") || "0.8");
            barI.style.transform = `scaleX(${e * w})`;
          }
        });
      }

      function updateStages(p: number) {
        if (!stages.length) return;
        const n = stages.length;
        const activeIdx = Math.max(0, Math.min(n - 1, Math.floor(p * n)));
        stages.forEach((el, i) => {
          el.classList.toggle("is-active", i === activeIdx);
        });
        if (ticks.length) {
          ticks.forEach((t, i) => {
            const tickActive =
              ticks.length === n
                ? i === activeIdx
                : i === Math.min(ticks.length - 1, Math.floor(p * ticks.length));
            t.classList.toggle("on", tickActive);
          });
        }
        if (cue) {
          cue.classList.toggle("hide", p > 0.05);
        }
      }

      function tick() {
        if (disposed) return;
        rafPending = false;
        // ── read phase: every layout read for this frame, before any write ──
        const trackRect = track!.getBoundingClientRect();
        fVh = window.innerHeight || document.documentElement.clientHeight;
        fTrackTop = trackRect.top;
        fTrackHeight = track!.offsetHeight;
        fPinActive = trackRect.top <= 2;
        fScrollY = window.scrollY || document.documentElement.scrollTop;
        if (headingSlot) fSlotTop = headingSlot.getBoundingClientRect().top;
        // heading is display:none until .is-shown — keep the last real height
        // (falling back to the original 120px estimate) while it's hidden
        if (heading && heading.offsetHeight > 0) fHeadingH = heading.offsetHeight;
        // ── write phase ──
        progress = computeProgress();
        updateHeading(progress);
        updateReveal(progress);
        updateExit(progress);
        updateFileSuck(progress);
        updateSceneCells(progress);
        updateStages(progress);

        if (ready && duration > 0 && video) {
          const vp = videoProgress(progress);
          targetTime = Math.max(0, Math.min(duration - 0.001, vp * duration));
          // Coalesce touch-scroll updates to the newest requested frame. The
          // previous lerp generated a queue of obsolete random-access seeks;
          // WebKit decoded them one after another after the finger stopped,
          // which looked like a freeze followed by several visible jumps.
          currentTime = targetTime;
          const frameTime = Math.min(
            duration - 0.001,
            Math.max(0, Math.round(currentTime * scrubFps) / scrubFps),
          );
          if (
            !video.seeking &&
            Math.abs(frameTime - lastSetTime) >= scrubFrameDuration * 0.5
          ) {
            try {
              video.currentTime = frameTime;
              lastSetTime = frameTime;
            } catch (_) {}
          }
        }
      }

      function schedule() {
        if (rafPending) return;
        rafPending = true;
        rafHandle = requestAnimationFrame(tick);
      }

      const visibleIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) schedule();
          });
        },
        { threshold: 0 }
      );
      visibleIO.observe(pin);
      cleanups.push(() => {
        visibleIO.disconnect();
        cancelAnimationFrame(rafHandle);
      });

      // schedule() (not tick) stays the entry point: tick re-arms itself while
      // it eases the video toward the scroll target, so its rafPending
      // bookkeeping must keep owning that loop.
      subscribeScroll(schedule);
      schedule();
    });
  })();

  /* ============================================================
     Section 3 — epic heading (same pattern as section 2)
     ============================================================ */
  (function initWorkflowHeading() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = document.getElementById("workflow");
    if (!section) return;
    const heading = section.querySelector(".workflow-heading") as HTMLElement | null;
    if (!heading) return;

    function splitEpicLines(el: HTMLElement | null) {
      if (!el || el.dataset.charsSplit) return;
      el.dataset.charsSplit = "1";
      let ci = 0;
      const l1 = el.querySelector(".epic-line.l1");
      if (l1) {
        const text = l1.textContent || "";
        l1.textContent = "";
        text.split("").forEach((ch) => {
          const s = document.createElement("span");
          s.className = "epic-char";
          s.textContent = ch === " " ? "\u00a0" : ch;
          s.style.setProperty("--ci", String(ci++));
          l1.appendChild(s);
        });
      }
      const l2 = el.querySelector(".epic-line.l2");
      if (l2) {
        Array.from(l2.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && (node.textContent || "").trim()) {
            const s = document.createElement("span");
            s.className = "epic-char";
            s.textContent = node.textContent;
            l2.replaceChild(s, node);
          }
        });
      }
      el.style.setProperty("--l1-chars", String(ci));
    }
    splitEpicLines(heading);

    if (reduce) {
      heading.style.setProperty("--sub-op", "1");
      heading.classList.add("is-shown", "is-epic-active");
      return;
    }

    const dockTarget = section.querySelector(".wf-sticky") as HTMLElement | null;

    let epicPlayed = false;
    let smoothTop: number | null = null;
    let visible = false;
    let rafActive = false;

    const PHASE = {
      LIFT_START: 0.15,
      LIFT_END: 0.36,
      SUB_START: 0.62,
    };
    const UP_HIDE_THRESHOLD = 0.08;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 2.4);
    }
    function easeInOut(t: number) {
      const x = Math.min(1, Math.max(0, t));
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function computeProgress() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const trigger = vh * 1.8;
      if (rect.top > trigger) return -1;
      const scrolled = trigger - rect.top;
      const range = vh * 2.2;
      return Math.min(1, scrolled / range);
    }

    function update() {
      const p = computeProgress();
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const centerY = vh * 0.5;

      if (p < UP_HIDE_THRESHOLD) {
        heading!.classList.remove("is-shown", "is-epic-active");
        heading!.style.setProperty("--sub-op", "0");
        heading!.style.opacity = "";
        smoothTop = null;
        epicPlayed = false;
        return;
      }

      if (rect.bottom < 0) {
        heading!.classList.remove("is-shown");
        heading!.style.opacity = "";
        return;
      }

      heading!.classList.add("is-shown");

      if (!epicPlayed) {
        epicPlayed = true;
        smoothTop = centerY;
        heading!.classList.add("is-epic-active");
      }

      const fixedFinalY = vh * 0.3;
      let finalY = fixedFinalY;
      if (dockTarget) {
        const padRect = dockTarget.getBoundingClientRect();
        const gap = Math.max(16, Math.min(vh * 0.04, 40));
        const headingH = heading!.offsetHeight || 250;
        const dockedY = padRect.top - gap - headingH / 2;
        finalY = Math.min(fixedFinalY, dockedY);
      }

      let targetTop = centerY;
      let subOp = 0;
      let liftT = 0;

      if (p < PHASE.LIFT_START) {
        targetTop = centerY;
      } else if (p < PHASE.LIFT_END) {
        liftT = (p - PHASE.LIFT_START) / (PHASE.LIFT_END - PHASE.LIFT_START);
        targetTop = centerY + (finalY - centerY) * easeInOut(liftT);
      } else {
        targetTop = finalY;
        liftT = 1;
      }

      if (p >= PHASE.SUB_START) {
        subOp = easeOut(Math.min(1, (p - PHASE.SUB_START) / 0.14));
      }

      if (smoothTop === null) smoothTop = centerY;
      if (liftT === 1) {
        smoothTop = finalY;
      } else {
        const lerp = liftT > 0 ? 0.12 : 0.16;
        smoothTop += (targetTop - smoothTop) * lerp;
      }

      heading!.style.setProperty("--h-top", smoothTop + "px");
      heading!.style.setProperty("--sub-op", String(subOp));
      heading!.style.opacity = "";
    }

    let rafHandle = 0;

    function loop() {
      if (!visible || disposed) {
        rafActive = false;
        return;
      }
      update();
      rafHandle = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (rafActive) return;
      rafActive = true;
      rafHandle = requestAnimationFrame(loop);
    }

    const visibleIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const wasVisible = visible;
          visible = e.isIntersecting;
          if (visible) startLoop();
          else if (wasVisible) update();
        });
      },
      { threshold: 0, rootMargin: "100% 0px 100% 0px" }
    );
    visibleIO.observe(section);
    cleanups.push(() => {
      visibleIO.disconnect();
      visible = false;
      cancelAnimationFrame(rafHandle);
    });

    on(window, "resize", update);
    update();
  })();

  /* ============================================================
     Section 3 — scroll-driven product workflow demo (block3)
     ============================================================ */
  (function initWorkflowScroll() {
    const section = document.getElementById("workflow");
    if (!section) return;

    const scroll = document.getElementById("wf-scroll");
    const layerA = document.getElementById("wf-layerA");
    const layerB = document.getElementById("wf-layerB");
    const layerC = document.getElementById("wf-layerC");
    const crumb = document.getElementById("wf-crumb");
    const pill = document.getElementById("wf-stagepill");
    const windowEl = document.getElementById("wf-window");
    const steps = Array.from(section.querySelectorAll(".wf-rail .step"));
    const rail = section.querySelector(".wf-rail") as HTMLElement | null;
    if (!scroll || !layerA || !layerB || !layerC || !crumb || !pill || !steps.length) return;

    const scrollEl = scroll;
    const layerAEl = layerA;
    const layerBEl = layerB;
    const layerCEl = layerC;
    const crumbEl = crumb;
    const pillEl = pill;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const setupCard = document.getElementById("wf-setupCard");
    const scBadge = document.getElementById("wf-scBadge");
    const evName = document.getElementById("wf-evName");
    const evCur = document.getElementById("wf-evCur");
    const evDate = document.getElementById("wf-evDate");
    const createBtn = document.getElementById("wf-createBtn");
    const linkCard = document.getElementById("wf-linkCard");
    const copyBtn = document.getElementById("wf-copyBtn");
    const previewCard = document.getElementById("wf-previewCard");
    const mchips = Array.from(section.querySelectorAll(".mchip"));
    const NAME = "TechStars Demo Day \u201926";

    const upItems = Array.from(section.querySelectorAll(".up-item"));
    const upProg = document.getElementById("wf-upProg");
    const upCounter = document.getElementById("wf-upCounter");

    const rows = Array.from(section.querySelectorAll(".tbl tbody tr"));
    const hubStatus = document.getElementById("wf-hubStatus");
    const cCollected = document.getElementById("wf-cCollected");
    const cReady = document.getElementById("wf-cReady");
    const cMissing = document.getElementById("wf-cMissing");
    const batchBadge = document.getElementById("wf-batchBadge");
    const runBtn = document.getElementById("wf-runBtn");
    const pipeline = document.getElementById("wf-pipeline");
    const pipeFill = document.getElementById("wf-pipeFill");
    const pipeNodes = Array.from(section.querySelectorAll(".pipe-node"));

    const STAGES = 6;
    let lastStage = 0;
    let countTok = 0;
    const pillText = ["Setup", "Link ready", "Public upload", "Collecting", "Batch ready", "Running"];
    const crumbText = [
      "New entry point",
      "Submission page · live",
      "Public submission page",
      "Application hub",
      "Application hub · ready",
      "Application hub · processing",
    ];

    function setCounters(c: number, r: number, m: number) {
      if (cCollected) cCollected.textContent = String(c);
      if (cReady) cReady.textContent = String(r);
      if (cMissing) cMissing.textContent = String(m);
    }

    function countUp() {
      const tok = ++countTok;
      let start: number | null = null;
      const dur = 750;
      function tick(ts: number) {
        if (tok !== countTok) return;
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        setCounters(Math.round(123 * p), Math.round(117 * p), Math.round(6 * p));
        if (p < 1) requestAnimationFrame(tick);
        else setCounters(123, 117, 6);
      }
      requestAnimationFrame(tick);
    }

    function resetLinkA() {
      if (!linkCard || !copyBtn || !previewCard) return;
      linkCard.style.opacity = "0";
      linkCard.style.transform = "translateY(14px)";
      copyBtn.classList.remove("copied");
      copyBtn.textContent = "Copy link";
      previewCard.style.display = "none";
      previewCard.style.opacity = "0";
      previewCard.style.transform = "translateY(16px)";
    }

    function fillFormFull() {
      if (evName) evName.textContent = NAME;
      if (evCur) evCur.style.display = "none";
      mchips.forEach((c) => c.classList.add("on"));
      if (evDate) {
        evDate.textContent = "Mar 14, 2026";
        evDate.classList.remove("muted");
      }
      createBtn?.classList.add("ready");
    }

    function setStage(stage: number, frac: number) {
      windowEl?.setAttribute("data-stage", String(stage));
      steps.forEach((s, i) => {
        const n = i + 1;
        s.classList.toggle("active", n === stage);
        s.classList.toggle("done", n < stage);
        const fi = s.querySelector(".track i") as HTMLElement | null;
        if (fi) fi.style.width = n < stage ? "100%" : n === stage ? (frac * 100).toFixed(1) + "%" : "0%";
      });

      pillEl.textContent = pillText[stage - 1];
      crumbEl.textContent = crumbText[stage - 1];
      pillEl.classList.remove("done"); // re-applied below when eval is complete
      if (hubStatus) hubStatus.style.display = ""; // re-shown unless eval is complete

      layerAEl.classList.toggle("on", stage <= 2);
      layerBEl.classList.toggle("on", stage === 3);
      layerCEl.classList.toggle("on", stage >= 4);

      if (stage === 1) {
        setupCard?.classList.remove("done");
        if (scBadge) scBadge.textContent = "Draft";
        resetLinkA();
        const t1 = Math.min(1, frac / 0.4);
        if (evName) evName.textContent = NAME.slice(0, Math.round(NAME.length * t1));
        if (evCur) evCur.style.display = frac < 0.86 ? "inline-block" : "none";
        mchips.forEach((c, i) => c.classList.toggle("on", frac > 0.44 + i * 0.1));
        if (evDate) {
          if (frac > 0.74) {
            evDate.textContent = "Mar 14, 2026";
            evDate.classList.remove("muted");
          } else {
            evDate.textContent = "Select date\u2026";
            evDate.classList.add("muted");
          }
        }
        createBtn?.classList.toggle("ready", frac > 0.88);
      } else if (stage === 2) {
        fillFormFull();
        setupCard?.classList.add("done");
        if (scBadge) scBadge.textContent = "Live";
        if (linkCard) {
          const lp = easeOut(Math.min(1, frac / 0.34));
          linkCard.style.opacity = lp.toFixed(2);
          linkCard.style.transform = "translateY(" + ((1 - lp) * 14).toFixed(1) + "px)";
        }
        const copied = frac > 0.5;
        copyBtn?.classList.toggle("copied", copied);
        if (copyBtn) copyBtn.textContent = copied ? "Copied \u2713" : "Copy link";
        if (previewCard) {
          previewCard.style.display = "flex";
          const pv = easeOut(Math.min(1, Math.max(0, (frac - 0.52) / 0.4)));
          previewCard.style.opacity = pv.toFixed(2);
          previewCard.style.transform = "translateY(" + ((1 - pv) * 16).toFixed(1) + "px)";
        }
      }

      if (stage === 3) {
        upItems.forEach((it, i) => {
          const ip = Math.min(1, Math.max(0, (frac - i * 0.13) / 0.3));
          (it as HTMLElement).style.opacity = ip.toFixed(2);
          (it as HTMLElement).style.transform = "translateY(" + ((1 - ip) * 8).toFixed(1) + "px)";
        });
        const prog = Math.min(100, Math.max(0, ((frac - 0.52) / 0.34) * 100));
        if (upProg) upProg.style.width = prog.toFixed(0) + "%";
        if (upCounter) upCounter.textContent = 11 + Math.round(frac * 112) + " teams submitted";
      }

      if (stage >= 4) {
        rows.forEach((r, i) => {
          const ri = stage > 4 ? 1 : Math.min(1, Math.max(0, (frac - i * 0.11) / 0.34));
          r.classList.toggle("in", ri > 0.5 || stage > 4);
        });

        if (stage === 4) {
          setCounters(0, 0, 0);
          countTok++;
          if (hubStatus) {
            hubStatus.textContent = "Collecting\u2026";
            hubStatus.className = "hub-status";
          }
          batchBadge?.classList.remove("show");
          runBtn?.classList.remove("ready", "pressed");
          pipeline?.classList.remove("show");
          if (pipeFill) pipeFill.style.width = "0%";
          pipeNodes.forEach((n) => n.classList.remove("on"));
          rows.forEach((r) => r.classList.remove("processing", "scored"));
        } else if (stage === 5) {
          if (lastStage !== 5) countUp();
          if (hubStatus) {
            hubStatus.textContent = "Batch ready";
            hubStatus.className = "hub-status ready";
          }
          batchBadge?.classList.toggle("show", frac > 0.22);
          runBtn?.classList.toggle("ready", frac > 0.48);
          runBtn?.classList.remove("pressed");
          pipeline?.classList.remove("show");
          if (pipeFill) pipeFill.style.width = "0%";
          pipeNodes.forEach((n) => n.classList.remove("on"));
          rows.forEach((r) => r.classList.remove("processing", "scored"));
        } else if (stage === 6) {
          countTok++;
          setCounters(123, 117, 6);
          if (hubStatus) {
            hubStatus.textContent = "Evaluation started";
            hubStatus.className = "hub-status run";
          }
          batchBadge?.classList.add("show");
          runBtn?.classList.add("ready");
          runBtn?.classList.toggle("pressed", frac > 0.1);
          rows.forEach((r, i) => {
            if (r.classList.contains("more-row")) return;
            r.classList.toggle("processing", frac > 0.16 + i * 0.05);
          });
          // the bottom pipeline runs as its own dedicated sweep (playPipeline),
          // fired on entering stage 6 — not scrubbed by frac here.
          if (evalDone) applyDoneBadges(); // keep final badges through re-renders
        }
      }
      lastStage = stage;
    }

    // ── manual stepper ───────────────────────────────────────────────
    // Stages advance via the up/down buttons, a card tap, or a horizontal
    // card swipe on mobile — never by page scroll. Every path funnels through
    // goTo(), so the demo's typing / counters / progress bars stay in sync.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navUp = document.getElementById("wf-navUp") as HTMLButtonElement | null;
    const navDown = document.getElementById("wf-navDown") as HTMLButtonElement | null;

    let current = 0;
    let animTok = 0;
    let pipeTok = 0;
    let evalDone = false;

    // teardown: bumping the tokens invalidates any in-flight rAF tween
    // (stage tween / pipeline sweep / counter count-up all check their token)
    cleanups.push(() => {
      animTok++;
      pipeTok++;
      countTok++;
    });

    const pipeLabelText = pipeline?.querySelector(".pl-text") ?? null;

    // final header badges once the evaluation sweep reaches Reports
    function applyDoneBadges() {
      pillEl.textContent = "Complete";
      pillEl.classList.add("done");
      crumbEl.textContent = "Application hub · complete";
      if (hubStatus) hubStatus.style.display = "none"; // hide the hub status badge at the end
      pipeline?.classList.add("done"); // swaps spinner → green check
      if (pipeLabelText) pipeLabelText.textContent = "Evaluation complete · 117 ready applications";
    }

    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function syncNav() {
      if (navUp) navUp.disabled = current <= 1;
      if (navDown) navDown.disabled = current >= STAGES;
    }

    function syncActiveStepIntoView(stage: number, behavior: ScrollBehavior) {
      const step = steps[stage - 1] as HTMLElement | undefined;
      if (!rail || !step || window.innerWidth > 880) return;
      const left = step.offsetLeft - (rail.clientWidth - step.offsetWidth) / 2;
      rail.scrollTo({ left: Math.max(0, left), behavior });
    }

    // Dedicated "run" sweep for the bottom pipeline: the fill runs left→right
    // and the Decoder→…→Reports sectors light up in turn. Fired every time the
    // user lands on stage 6 (incl. re-clicking the card), so it always plays.
    // once the sweep reaches Reports, every ready (complete) application flips
    // from "Processing" to its final "Scored" chip; incomplete rows revert.
    function markScored() {
      rows.forEach((r) => {
        if (r.classList.contains("more-row")) return;
        r.classList.remove("processing");
        r.classList.toggle("scored", !!r.querySelector(".status.complete"));
      });
      evalDone = true;
      applyDoneBadges();
    }

    function playPipeline(animate = true) {
      if (!pipeline || !pipeFill) return;
      const fill = pipeFill;
      const tok = ++pipeTok; // restart cleanly on re-trigger
      pipeline.classList.add("show");
      pipeNodes.forEach((n) => n.classList.remove("on"));
      evalDone = false; // replay shows Running / Processing again, then completes
      pipeline.classList.remove("done"); // spinner back while it runs
      if (pipeLabelText) pipeLabelText.textContent = "Evaluation started · 117 ready applications";
      rows.forEach((r) => r.classList.remove("scored"));
      if (!animate || reduceMotion) {
        fill.style.width = "100%";
        pipeNodes.forEach((n) => n.classList.add("on"));
        markScored();
        return;
      }
      fill.style.width = "0%";
      // Decoder (node 0) is lit from the very start; each later sector lights
      // as the fill reaches it (nodes sit at i/(N-1) along the track).
      const segs = Math.max(1, pipeNodes.length - 1);
      pipeNodes[0]?.classList.add("on");
      const dur = 1700;
      let start: number | null = null;
      function frame(ts: number) {
        if (tok !== pipeTok) return;
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        fill.style.width = (p * 100).toFixed(1) + "%";
        pipeNodes.forEach((n, i) => n.classList.toggle("on", p >= i / segs));
        if (p < 1) requestAnimationFrame(frame);
        else markScored();
      }
      requestAnimationFrame(frame);
    }

    function goTo(stage: number, animate = true) {
      const next = Math.min(STAGES, Math.max(1, stage));
      const tok = ++animTok; // cancels any in-flight tween
      current = next;
      syncNav();
      syncActiveStepIntoView(next, animate && !reduceMotion ? "smooth" : "auto");
      if (!animate || reduceMotion) {
        setStage(next, 1);
        if (next === STAGES) playPipeline(false);
        return;
      }
      const dur = 820;
      let start: number | null = null;
      function frame(ts: number) {
        if (tok !== animTok) return;
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        setStage(next, easeInOut(p));
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      if (next === STAGES) playPipeline(true);
    }

    if (navUp) on(navUp, "click", () => goTo(current - 1));
    if (navDown) on(navDown, "click", () => goTo(current + 1));
    // The primary action in the setup mockup completes stage 1 and advances
    // through the same transition path as the rail, swipe, and down arrow.
    if (createBtn) on(createBtn, "click", () => goTo(2));
    // the "Run evaluation" button on the Batch-ready card launches stage 6
    if (runBtn) on(runBtn, "click", () => goTo(STAGES));
    if (windowEl) {
      on(windowEl, "click", (event: MouseEvent) => {
        const target = event.target as Element | null;
        if (target?.closest("button, a, input, textarea, select, [role='button']")) return;
        goTo(current + 1);
      });
    }
    steps.forEach((s, i) => {
      on(s as HTMLElement, "click", () => goTo(i + 1));
    });
    if (rail) {
      bindStepRailSwipe(rail, () => window.innerWidth <= 880, (direction) =>
        goTo(current + direction),
      );
    }
    // layout-only re-paint; keeps the current stage settled on resize
    on(window, "resize", () => {
      setStage(current, 1);
      syncActiveStepIntoView(current, "auto");
    });

    goTo(1, false);
  })();

  /* ============================================================
     Section 4 — scroll-driven structured decision demo (block4)
     ============================================================ */
  (function initDecisionsScroll() {
    const section = document.getElementById("decisions");
    if (!section) return;

    const scroll = document.getElementById("sd-scroll");
    const windowEl = document.getElementById("sd-window");
    const layerA = document.getElementById("sd-layerA");
    const layerB = document.getElementById("sd-layerB");
    const dash = document.getElementById("sd-dash");
    const beam = document.getElementById("sd-beam");
    const scanTitle = document.getElementById("sd-scanTitle");
    const repgrid = document.getElementById("sd-repgrid");
    const crumb = document.getElementById("sd-crumb");
    const pill = document.getElementById("sd-stagepill");
    const steps = Array.from(section.querySelectorAll(".sd-rail .step"));
    const rail = section.querySelector(".sd-rail") as HTMLElement | null;
    if (
      !scroll ||
      !windowEl ||
      !layerA ||
      !layerB ||
      !dash ||
      !beam ||
      !scanTitle ||
      !repgrid ||
      !crumb ||
      !pill ||
      !steps.length
    )
      return;

    const scrollEl = scroll;
    const windowElRef = windowEl;
    const layerAEl = layerA;
    const layerBEl = layerB;
    const dashEl = dash;
    const beamEl = beam;
    const scanTitleEl = scanTitle;
    const repgridEl = repgrid;
    const crumbEl = crumb;
    const pillEl = pill;

    const deckfield = layerAEl.querySelector(".deckfield") as HTMLElement | null;
    const decks = Array.from(layerAEl.querySelectorAll(".deckfield .deck"));
    const tags = Array.from(layerAEl.querySelectorAll(".deckfield .tag"));
    const repcards = Array.from(layerAEl.querySelectorAll(".repcard"));
    const rows = Array.from(section.querySelectorAll("#sd-tbody tr"));
    const panelScore = document.getElementById("sd-panelScore");
    const panel = section.querySelector(".sd-panel") as HTMLElement | null;
    const revItems = Array.from(section.querySelectorAll(".reveal-item"));

    const dstatus = document.getElementById("sd-dstatus");
    const seg = document.getElementById("sd-seg");
    const segR = seg?.querySelector('[data-d="review"]') as HTMLElement | null;
    const segA = seg?.querySelector('[data-d="approved"]') as HTMLElement | null;
    const noteWrap = document.getElementById("sd-noteWrap");
    const ntext = document.getElementById("sd-ntext");
    const ncur = document.getElementById("sd-ncur");
    const addnote = document.getElementById("sd-addnote");
    const save = document.getElementById("sd-save");
    const NOTE = "Strong team — confirm MX licensing before final approval.";

    // mobile-only affordances (hidden on desktop via CSS, but present in DOM)
    const railCaption = document.getElementById("sd-railCaption");
    const mCount = document.getElementById("sd-mCount");

    const STAGES = 6;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let lastStage = 0;
    const pillText = ["Analyzing", "Extracting", "Standardizing", "Comparing", "Report open", "Decision"];
    const crumbText = [
      "Batch #A24 · 123 decks",
      "Batch #A24 · scanning signals",
      "Batch #A24 · 123 reports",
      "Batch #A24 · ranked",
      "NovaPay · report",
      "NovaPay · decision",
    ];

    function alignDecks(on: boolean) {
      const pos = [
        { l: "7%", t: "12%" },
        { l: "53%", t: "12%" },
        { l: "7%", t: "54%" },
        { l: "53%", t: "54%" },
      ];
      decks.forEach((d, i) => {
        const el = d as HTMLElement;
        if (on) {
          el.style.transform = "rotate(0deg)";
          el.style.left = pos[i].l;
          el.style.top = pos[i].t;
          el.style.width = "40%";
          el.style.height = "38%";
        } else {
          el.style.transform = "";
          el.style.left = "";
          el.style.top = "";
          el.style.width = "";
          el.style.height = "";
        }
      });
    }

    function countUp(el: HTMLElement, target: number) {
      let start: number | null = null;
      const dur = 600;
      function tick(ts: number) {
        if (disposed) return;
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        el.textContent = (target * (0.5 + 0.5 * p)).toFixed(1);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(1);
      }
      requestAnimationFrame(tick);
    }

    function updateHumanLoop(stage: number, frac: number) {
      if (stage < 6) {
        if (dstatus) {
          dstatus.className = "dstatus pending";
          dstatus.textContent = "Pending";
        }
        segR?.classList.remove("on");
        segA?.classList.remove("on");
        noteWrap?.classList.remove("show");
        if (ntext) ntext.textContent = "";
        if (ncur) ncur.style.display = "none";
        addnote?.classList.remove("used");
        dashEl.classList.remove("saved");
        if (save) save.textContent = "Save decision";
        return;
      }
      const picked = frac >= 0.2;
      segA?.classList.toggle("on", picked);
      segR?.classList.remove("on");
      if (dstatus) {
        dstatus.className = picked ? "dstatus approved" : "dstatus pending";
        dstatus.textContent = picked ? "Approved" : "Pending";
      }
      const noteOn = frac >= 0.4;
      noteWrap?.classList.toggle("show", noteOn);
      addnote?.classList.toggle("used", noteOn);
      if (noteOn) {
        const tp = Math.min(1, (frac - 0.4) / 0.3);
        if (ntext) ntext.textContent = NOTE.slice(0, Math.round(NOTE.length * tp));
        if (ncur) ncur.style.display = tp < 1 ? "inline-block" : "none";
      } else {
        if (ntext) ntext.textContent = "";
        if (ncur) ncur.style.display = "none";
      }
      const saved = frac >= 0.78;
      dashEl.classList.toggle("saved", saved);
      if (save) save.textContent = saved ? "Decision saved" : "Save decision";
    }

    function setStage(stage: number, frac: number) {
      steps.forEach((s, i) => {
        const n = i + 1;
        s.classList.toggle("active", n === stage);
        s.classList.toggle("done", n < stage);
        const fill = s.querySelector(".track i") as HTMLElement | null;
        if (fill) {
          fill.style.width =
            n < stage ? "100%" : n === stage ? (frac * 100).toFixed(1) + "%" : "0%";
        }
      });

      pillEl.textContent = pillText[stage - 1];
      crumbEl.textContent = crumbText[stage - 1];

      // mobile caption + step counter (no-ops on desktop where they're hidden)
      if (railCaption) {
        const d = (steps[stage - 1] as HTMLElement | undefined)?.querySelector(".desc");
        railCaption.textContent = d?.textContent ?? "";
      }
      if (mCount) mCount.textContent = `Step ${stage} of ${STAGES}`;

      const bView = stage >= 4;
      layerAEl.classList.toggle("on", !bView);
      layerBEl.classList.toggle("on", bView);
      windowElRef.setAttribute("data-stage", String(stage));

      // "Extract signals" scans the messy decks, then near its END squares
      // them into an even 2×2 grid (this used to live in stage 3).
      const SQUARE_AT = 0.88;
      const sqFade =
        stage === 2 ? Math.max(0, Math.min(1, (frac - SQUARE_AT) / 0.10)) : 0;
      beamEl.style.opacity = stage === 2 ? (1 - sqFade).toFixed(2) : "0";
      if (stage === 2 && deckfield) {
        const h = deckfield.clientHeight || 420;
        const scanP = Math.min(1, frac / SQUARE_AT); // beam reaches the bottom as squaring begins
        beamEl.style.transform = "translateY(" + (scanP * (h - 120)).toFixed(1) + "px)";
      }
      scanTitleEl.style.opacity = stage === 2 ? (1 - sqFade).toFixed(2) : "0";

      tags.forEach((t, i) => {
        const el = t as HTMLElement;
        // signals pop in EARLY during the scan and linger (all up by ~40% of the
        // stage) so they stay readable, then fade only as the decks square up
        const show = stage === 2 && frac * tags.length * 2.3 > i;
        el.style.opacity = show ? (1 - sqFade).toFixed(2) : "0";
        el.style.transform = show ? "translateY(0) scale(1)" : "translateY(6px) scale(.96)";
      });

      if (stage === 2) {
        // square up the four decks at the tail of Extract signals
        alignDecks(frac > SQUARE_AT);
        if (deckfield) deckfield.style.opacity = "1";
        repgridEl.style.opacity = "0";
        repgridEl.style.visibility = "hidden";
      } else if (stage === 3) {
        // decks arrive already squared from stage 2 — Standardize reports only
        // MORPHS those squares into the standardized report cards
        alignDecks(true);
        const rg = Math.min(1, Math.max(0, (frac - 0.08) / 0.7));
        if (deckfield) deckfield.style.opacity = (1 - rg).toFixed(2);
        repgridEl.style.opacity = rg.toFixed(2);
        repgridEl.style.visibility = rg > 0.02 ? "visible" : "hidden";
        repcards.forEach((c, i) => {
          const el = c as HTMLElement;
          const ci = Math.min(1, Math.max(0, (rg - i * 0.12) / 0.4));
          el.style.opacity = ci.toFixed(2);
          el.style.transform = "translateY(" + ((1 - ci) * 10).toFixed(1) + "px)";
        });
      } else if (stage < 2) {
        alignDecks(false);
        if (deckfield) deckfield.style.opacity = "1";
        repgridEl.style.opacity = "0";
        repgridEl.style.visibility = "hidden";
      } else {
        if (deckfield) deckfield.style.opacity = "0";
        repgridEl.style.opacity = "1";
        repgridEl.style.visibility = "visible";
        repcards.forEach((c) => {
          const el = c as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }

      if (bView) {
        rows.forEach((r, i) => {
          const ri = stage > 4 ? 1 : Math.min(1, Math.max(0, (frac - i * 0.14) / 0.4));
          r.classList.toggle("in", ri > 0.5 || stage > 4);
        });

        if (stage >= 5) {
          dashEl.classList.add("open");
          const openP = stage === 5 ? easeOut(Math.min(1, frac / 0.3)) : 1;
          if (panel) panel.style.transform = "translateX(" + ((1 - openP) * 102).toFixed(2) + "%)";
          // tuned so every report section (incl. the closing "Strengths and
          // weaknesses") is fully revealed by frac≈0.8 — the stage now rests at
          // frac=1 (button-driven), so nothing must trail past it.
          const rStart = 0.14;
          const rStep = 0.07;
          const rDur = 0.16;
          revItems.forEach((el, i) => {
            const node = el as HTMLElement;
            const rp =
              stage > 5 ? 1 : Math.min(1, Math.max(0, (frac - rStart - i * rStep) / rDur));
            node.style.opacity = rp.toFixed(2);
            node.style.transform = "translateY(" + ((1 - rp) * 10).toFixed(1) + "px)";
          });
        } else {
          dashEl.classList.remove("open");
          if (panel) panel.style.transform = "translateX(102%)";
          revItems.forEach((el) => {
            const node = el as HTMLElement;
            node.style.opacity = "0";
            node.style.transform = "translateY(10px)";
          });
        }

        dashEl.classList.toggle("review", stage >= 6);
      } else {
        dashEl.classList.remove("open", "review");
        if (panel) panel.style.transform = "translateX(102%)";
        revItems.forEach((el) => {
          const node = el as HTMLElement;
          node.style.opacity = "0";
          node.style.transform = "translateY(10px)";
        });
        rows.forEach((r) => r.classList.remove("in"));
      }

      updateHumanLoop(stage, frac);

      if (stage === 5 && lastStage !== 5 && panelScore) countUp(panelScore, 8.4);
      lastStage = stage;
    }

    // ── manual stepper (same as #workflow) ───────────────────────────
    // Stages switch via the up/down buttons, a card tap, or a horizontal
    // swipe on mobile — never by page scroll. Every path funnels through
    // goTo(), so the demo's reveals stay in sync.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isPhone = () => window.matchMedia("(max-width: 640px)").matches;
    const navUp = document.getElementById("sd-navUp") as HTMLButtonElement | null;
    const navDown = document.getElementById("sd-navDown") as HTMLButtonElement | null;
    // mobile prev / next bar (Next becomes "Replay" on the last stage)
    const mPrev = document.getElementById("sd-mPrev") as HTMLButtonElement | null;
    const mNext = document.getElementById("sd-mNext") as HTMLButtonElement | null;

    let current = 0;
    let animTok = 0;
    let inited = false; // gate chip auto-scroll so the init call can't jump the page
    cleanups.push(() => {
      animTok++; // invalidates any in-flight stage tween rAF
    });
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function syncNav() {
      if (navUp) navUp.disabled = current <= 1;
      if (navDown) navDown.disabled = current >= STAGES;
      if (mPrev) mPrev.disabled = current <= 1;
      // last stage: keep Next enabled but repurpose it to replay the demo
      if (mNext) {
        const atEnd = current >= STAGES;
        mNext.classList.toggle("replay", atEnd);
        mNext.setAttribute("aria-label", atEnd ? "Replay from start" : "Next step");
      }
    }

    function syncActiveStepIntoView(stage: number, behavior: ScrollBehavior) {
      const step = steps[stage - 1] as HTMLElement | undefined;
      if (!rail || !step || window.innerWidth > 640) return;
      const left = step.offsetLeft - (rail.clientWidth - step.offsetWidth) / 2;
      rail.scrollTo({ left: Math.max(0, left), behavior });
    }

    function goTo(stage: number, animate = true) {
      const next = Math.min(STAGES, Math.max(1, stage));
      const tok = ++animTok; // cancels any in-flight tween
      current = next;
      syncNav();
      // keep the active rail card in view on phone (horizontal scroll-snap);
      // skip during the initial call so it can't yank the page to the section
      if (inited && isPhone()) {
        syncActiveStepIntoView(next, animate && !reduceMotion ? "smooth" : "auto");
      }
      if (!animate || reduceMotion) {
        setStage(next, 1);
        return;
      }
      const dur = 820;
      let start: number | null = null;
      function frame(ts: number) {
        if (tok !== animTok) return;
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        setStage(next, easeInOut(p));
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (navUp) on(navUp, "click", () => goTo(current - 1));
    if (navDown) on(navDown, "click", () => goTo(current + 1));
    if (mPrev) on(mPrev, "click", () => goTo(current - 1));
    if (mNext) on(mNext, "click", () => goTo(current >= STAGES ? 1 : current + 1));
    let lastWindowSwipeAt = 0;
    on(windowElRef, "click", (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("button, a, input, textarea, select, [role='button']")) return;
      if (Date.now() - lastWindowSwipeAt < 450) return;
      goTo(current >= STAGES ? 1 : current + 1);
    });
    steps.forEach((s, i) => {
      on(s as HTMLElement, "click", () => goTo(i + 1));
    });
    if (rail) {
      bindStepRailSwipe(rail, isPhone, (direction) => goTo(current + direction));
    }

    // phone: horizontal swipe on the window steps through stages (the dx>dy
    // guard leaves vertical scrolling of the report panel/grid untouched)
    let tsx = 0;
    let tsy = 0;
    on(
      windowElRef,
      "touchstart",
      (e: TouchEvent) => {
        const t = e.changedTouches[0];
        tsx = t.clientX;
        tsy = t.clientY;
      },
      { passive: true },
    );
    on(
      windowElRef,
      "touchend",
      (e: TouchEvent) => {
        const t = e.changedTouches[0];
        const dx = t.clientX - tsx;
        const dy = t.clientY - tsy;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          lastWindowSwipeAt = Date.now();
          goTo(dx < 0 ? current + 1 : current - 1);
        }
      },
      { passive: true },
    );

    on(window, "resize", () => setStage(current, 1));

    goTo(1, false);
    inited = true;
  })();

  /* ============================================================
     Section 4 — deck card physical nudge on hover / press
     ============================================================ */
  (function initDeckCardPhysics() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = document.getElementById("decisions");
    const deckfield = document.querySelector("#decisions .deckfield") as HTMLElement | null;
    if (!section || !deckfield) return;
    const win = document.getElementById("sd-window");
    const cards = Array.from(deckfield.querySelectorAll(".deck")) as HTMLElement[];
    if (!cards.length) return;

    // cards only float / drag in the scattered idle state (Analyzing = stage 1)
    const idle = () => (win?.getAttribute("data-stage") ?? "1") === "1";
    // drag is a mouse affordance only — on touch, leave scrolling intact
    const canDrag = window.matchMedia("(pointer: fine)").matches;
    if (canDrag) section.setAttribute("data-can-grab", "");

    type DeckState = {
      el: HTMLElement;
      ax: number; ay: number; // float amplitude (px)
      fx: number; fy: number; // float frequency (Hz-ish)
      px: number; py: number; // phase offset
      tx: number; ty: number; // applied offset
      scale: number; targetScale: number;
      mode: "float" | "drag" | "return";
      baseTX: number; baseTY: number; // float offset captured at grab
      grabX: number; grabY: number; // pointer origin
      dragTX: number; dragTY: number; // drag target
      maxPull: number; // magnet limit ≈ half a card length
    };

    const states: DeckState[] = cards.map((el, i) => ({
      el,
      ax: 8 + (i % 2) * 5,
      ay: 10 + ((i + 1) % 2) * 5,
      fx: 0.052 + i * 0.009,
      fy: 0.043 + i * 0.0075,
      px: i * 1.7,
      py: i * 2.3,
      tx: 0, ty: 0, scale: 1, targetScale: 1,
      mode: "float",
      baseTX: 0, baseTY: 0, grabX: 0, grabY: 0, dragTX: 0, dragTY: 0,
      maxPull: 80,
    }));

    function release(s: DeckState, pointerId?: number) {
      if (s.mode !== "drag") return;
      s.mode = "return";
      s.targetScale = 1;
      s.el.classList.remove("dragging");
      if (pointerId != null) {
        try { s.el.releasePointerCapture(pointerId); } catch { /* already released */ }
      }
    }

    if (canDrag) states.forEach((s) => {
      on(s.el, "pointerdown", (e: PointerEvent) => {
        if (!idle() || e.button !== 0) return;
        e.preventDefault();
        s.mode = "drag";
        s.baseTX = s.tx; s.baseTY = s.ty;
        s.grabX = e.clientX; s.grabY = e.clientY;
        s.dragTX = s.tx; s.dragTY = s.ty;
        s.targetScale = 1.05;
        s.maxPull = s.el.getBoundingClientRect().width * 0.5; // ~half card length
        s.el.classList.add("dragging");
        try { s.el.setPointerCapture(e.pointerId); } catch { /* unsupported */ }
      });
      on(s.el, "pointermove", (e: PointerEvent) => {
        if (s.mode !== "drag") return;
        const rawX = e.clientX - s.grabX;
        const rawY = e.clientY - s.grabY;
        const dist = Math.hypot(rawX, rawY) || 1;
        const max = s.maxPull;
        // rubber-band: smoothly approaches the limit, never crosses it
        const pulled = max * Math.tanh(dist / max);
        const k = pulled / dist;
        s.dragTX = s.baseTX + rawX * k;
        s.dragTY = s.baseTY + rawY * k;
        // pulled to the limit → auto-release from the cursor and spring home
        if (dist >= max) release(s, e.pointerId);
      });
      const up = (e: PointerEvent) => release(s, e.pointerId);
      on(s.el, "pointerup", up);
      on(s.el, "pointercancel", up);
    });

    // The float loop is gated by section visibility (same pattern as the
    // workflow-heading gate): it only runs while #decisions is within a
    // viewport of the screen. Motion is a pure function of absolute time
    // (t0-anchored sinusoids), so pausing and resuming stays on the same
    // trajectory; on re-entry, "return" mode springs tx/ty smoothly back
    // onto the live float path instead of snapping.
    let visible = false;
    let rafActive = false;
    let rafHandle = 0;
    const t0 = performance.now();

    function frame(now: number) {
      if (!visible || disposed) {
        rafActive = false;
        return;
      }
      const t = (now - t0) / 1000;
      const active = idle();
      const TAU = Math.PI * 2;
      for (const s of states) {
        const gx = active ? Math.sin(t * s.fx * TAU + s.px) * s.ax : 0;
        const gy = active ? Math.cos(t * s.fy * TAU + s.py) * s.ay : 0;
        if (!active && s.mode !== "float") {
          s.mode = "float";
          s.el.classList.remove("dragging");
        }
        if (s.mode === "drag") {
          s.tx += (s.dragTX - s.tx) * 0.4;
          s.ty += (s.dragTY - s.ty) * 0.4;
        } else if (s.mode === "return") {
          // spring back to the live floating baseline, then hand back to float
          s.tx += (gx - s.tx) * 0.12;
          s.ty += (gy - s.ty) * 0.12;
          if (Math.abs(s.tx - gx) < 0.5 && Math.abs(s.ty - gy) < 0.5) s.mode = "float";
        } else {
          s.tx = gx; s.ty = gy;
        }
        s.scale += (s.targetScale - s.scale) * 0.2;
        s.el.style.setProperty("--card-tx", s.tx.toFixed(1) + "px");
        s.el.style.setProperty("--card-ty", s.ty.toFixed(1) + "px");
        s.el.style.setProperty("--card-scale", s.scale.toFixed(3));
      }
      rafHandle = requestAnimationFrame(frame);
    }

    function startLoop() {
      if (rafActive) return;
      rafActive = true;
      // ease from the frozen offsets back onto the live float trajectory
      for (const s of states) if (s.mode === "float") s.mode = "return";
      rafHandle = requestAnimationFrame(frame);
    }

    const visibleIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible = e.isIntersecting;
          if (visible) {
            startLoop();
          } else if (rafActive) {
            cancelAnimationFrame(rafHandle);
            rafActive = false;
          }
        });
      },
      { threshold: 0, rootMargin: "100% 0px 100% 0px" }
    );
    visibleIO.observe(section);
    cleanups.push(() => {
      visibleIO.disconnect();
      visible = false;
      cancelAnimationFrame(rafHandle);
    });
  })();

  return () => cleanups.forEach((f) => f());
}
