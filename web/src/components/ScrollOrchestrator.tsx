"use client";

import { useEffect, useRef } from "react";

/**
 * Verbatim port of the original landing-page <script> block.
 * Single client-side mount: progress bar, header tint, reveal IO,
 * hero dual-video sync, hero parallax, Apple-style scroll-scrub for
 * #problem, and #workflow heading orchestration.
 *
 * Each sub-IIFE matches the original 1-for-1. DOM queries happen after
 * mount so they see the section markup rendered by the server.
 */
export function ScrollOrchestrator() {
  const ranRef = useRef(false);

  useEffect(() => {
    // StrictMode in dev double-invokes effects. The original script mutates
    // global DOM state and adds window listeners — running it twice
    // double-registers everything. Guard so the body only runs once.
    if (ranRef.current) return;
    ranRef.current = true;

    runScript();
    // Intentionally no cleanup: the landing page never unmounts this in
    // practice, and the original script also installed permanent listeners.
  }, []);

  return null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
function runScript() {
  /* scroll progress */
  const prog = document.getElementById("progress");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (prog) prog.style.setProperty("--p", (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* site header — light text on hero, dark text on light bands */
  (function () {
    const header = document.getElementById("site-header");
    const hero = document.getElementById("hero");
    if (!header || !hero) return;
    const sync = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      header.classList.toggle("is-light", heroBottom < 72);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
  })();

  /* reveal on scroll */
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
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

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
      const mov = sources.find((s) => /\.mov/i.test(s.getAttribute("src") || ""));
      const webm = sources.find((s) => /\.webm/i.test(s.getAttribute("src") || ""));
      const keep = isSafari ? mov : webm;
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

    const armFallback = (sec: number) => {
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
        setTimeout(() => heroHead.classList.remove("hero-smash"), 900);
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

    video.addEventListener("playing", scheduleCopyReveal, { once: true });
    video.addEventListener("timeupdate", () => {
      keepInSync();
      maybeRevealOverlay();
      if (video.currentTime * 1000 >= COPY_REVEAL_MS) finish();
    });

    /* fade overlay to opacity 0 the moment it finishes playing */
    overlay?.addEventListener(
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
      el.addEventListener("loadeddata", onReady, { once: true });
      el.addEventListener("canplay", onReady);
      el.addEventListener(
        "loadedmetadata",
        () => {
          if (video.duration) armFallback(video.duration);
        },
        { once: true }
      );
      el.addEventListener("error", () => setTimeout(finish, 500), { once: true });
    });

    armFallback(3);

    const prime = () => {
      if (!playing) beginPlayback();
    };
    window.addEventListener("touchstart", prime, { passive: true, once: true });
    window.addEventListener("click", prime, { once: true });
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
    let raf = 0;

    const paint = () => {
      raf = 0;
      const rect = hero.getBoundingClientRect();
      const shift = -rect.top;
      const heroH = rect.height || window.innerHeight;

      const bgY = (shift * BG_RATE).toFixed(2) + "px";
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

    const schedule = () => {
      if (!raf) {
        raf = requestAnimationFrame(paint);
      }
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
  })();

  /* ============================================================
     Scroll-driven video scrub (Apple-style)
     ============================================================ */
  (function initScrollScrub() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
          heading.style.setProperty("--h-top", "50vh");
          heading.style.setProperty("--sub-op", "1");
          heading.classList.add("is-shown", "is-epic-active");
        }
        stageArea?.classList.add("is-visible");
        scene?.classList.add("is-visible");
      }

      let epicPlayed = false;
      let smoothTop: number | null = null;
      let duration = 0;
      let hasVideo = false;
      let targetTime = 0;
      let currentTime = 0;
      let lastSetTime = -1;
      let progress = 0;
      let rafPending = false;
      let ready = false;

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
          video.addEventListener("loadedmetadata", onMetadata, { once: true });
          // Some browsers expose duration on `durationchange` rather than
          // `loadedmetadata` when the value transitions from NaN to a number.
          video.addEventListener("durationchange", onMetadata, { once: true });
        }
        video.addEventListener("error", () => {
          ready = false;
        }, { once: true });
        // If the browser kicks off playback anyway (autoplay heuristics,
        // metadata events), kill it on each play attempt.
        video.addEventListener("play", () => {
          try { video.pause(); } catch (_) {}
        });
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
        window.addEventListener("touchstart", primeOnce, { passive: true, once: true });
        window.addEventListener("click", primeOnce, { once: true });
      }

      function computeProgress() {
        const rect = track!.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const scrollable = track!.offsetHeight - vh;
        if (scrollable <= 0) return 0;
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
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

      const PHASE = {
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
        if (!heading || reduce) return;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const start = vh * 0.5;
        const pinActive = track!.getBoundingClientRect().top <= 2;
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
          const sr = headingSlot.getBoundingClientRect();
          const blockH = heading ? heading.offsetHeight : 120;
          slotY = sr.top + headingTopInset + blockH * 0.38;
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
        const pinActive = track!.getBoundingClientRect().top <= 2;
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
        const pinActive = track!.getBoundingClientRect().top <= 2;
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
        scrubCells.forEach((cell) => {
          cell.style.opacity = "";
          cell.style.transform = "";
          cell.style.filter = "";
          const barI = cell.querySelector(".bar i") as HTMLElement | null;
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
          scene.classList.add("is-files-gone", "is-cells-active");
          scrubCells.forEach((cell) => {
            cell.style.opacity = "1";
            cell.style.transform = "none";
            cell.style.filter = "none";
            const barI = cell.querySelector(".bar i") as HTMLElement | null;
            if (barI) {
              const w = parseFloat(barI.style.getPropertyValue("--w") || "0.8");
              barI.style.transform = `scaleX(${w})`;
            }
          });
          return;
        }

        const pinActive = track!.getBoundingClientRect().top <= 2;
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
          const barI = cell.querySelector(".bar i") as HTMLElement | null;
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
        rafPending = false;
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
          if (reduce) {
            currentTime = targetTime;
          } else {
            currentTime += (targetTime - currentTime) * 0.18;
          }
          if (Math.abs(currentTime - lastSetTime) > 1 / 120) {
            try {
              video.currentTime = currentTime;
              lastSetTime = currentTime;
            } catch (_) {}
          }
          if (Math.abs(targetTime - currentTime) > 0.002) {
            schedule();
          }
        }
      }

      function schedule() {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(tick);
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

      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
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
          s.textContent = ch === " " ? " " : ch;
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

    let epicPlayed = false;
    let smoothTop: number | null = null;
    let visible = false;
    let rafActive = false;

    // Same shape as the problem section's PHASE: HOLD → LIFT → SUB → EXIT.
    // Tuned against trigger=1.8·vh + range=2.2·vh:
    //  - LIFT plays on pure black (track bg + tail).
    //  - Heading then pins at finalY through the orange-glow band.
    //  - SUB_START fires as the white workflow bg is approaching the heading.
    //  - After a brief beat with both title + sub on white, EXIT fades both out.
    //  - EXIT_END must finish inside [0,1] so opacity actually reaches 0
    //    (otherwise the clamped tail leaves the heading visibly hanging).
    const PHASE = {
      LIFT_START: 0.15,
      LIFT_END: 0.36,
      SUB_START: 0.62,
      EXIT_START: 0.82,
    };
    const EXIT_FADE_WIDTH = 0.1;
    const EXIT_END = PHASE.EXIT_START + EXIT_FADE_WIDTH;

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
      // Trigger is tuned so the type-in fires the moment the problem-section
      // pin releases and the viewport flips to solid black (track bg + scrub-tail).
      // workflow.rect.top is ≈ 1.5–1.6·vh at that point, so trigger=1.8·vh starts
      // the reveal slightly before pin-release and types-in across the dark band.
      const trigger = vh * 1.8;
      if (rect.top > trigger) return -1;
      const scrolled = trigger - rect.top;
      // Range widened (was 1.6·vh) so that after LIFT_END the heading has room
      // to sit at finalY while the dark→orange→white band slides past, before
      // SUB_START fires on white at ≈ p=0.72.
      const range = vh * 2.2;
      return Math.min(1, scrolled / range);
    }

    function update() {
      const p = computeProgress();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const centerY = vh * 0.5;

      // Hide if before trigger (scrolled back up above) OR after the EXIT
      // fade has fully completed (so the heading doesn't linger half-faded
      // outside the active range due to the p clamp to [0,1]).
      if (p < 0 || p >= EXIT_END) {
        heading!.classList.remove("is-shown");
        heading!.style.setProperty("--sub-op", "0");
        heading!.style.opacity = "";
        smoothTop = null;
        return;
      }

      heading!.classList.add("is-shown");

      if (!epicPlayed) {
        epicPlayed = true;
        smoothTop = centerY;
        heading!.classList.add("is-epic-active");
      }

      // Heading's final viewport-y after the lift — fixed point in the upper
      // third of the screen, regardless of where the document-flow slot sits.
      // This is what makes the heading travel UP from center (instead of down
      // toward the still-off-screen slot), then stay pinned at the top through
      // the black→gray→white transition until EXIT fade.
      const finalY = vh * 0.22;

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
      const lerp = liftT > 0 && liftT < 1 ? 0.12 : 0.16;
      smoothTop += (targetTop - smoothTop) * lerp;

      heading!.style.setProperty("--h-top", smoothTop + "px");
      heading!.style.setProperty("--sub-op", String(subOp));

      if (p >= PHASE.EXIT_START) {
        heading!.style.opacity = String(
          Math.max(0, 1 - (p - PHASE.EXIT_START) / EXIT_FADE_WIDTH)
        );
      } else {
        heading!.style.opacity = "";
      }
    }

    function loop() {
      if (!visible) {
        rafActive = false;
        return;
      }
      update();
      requestAnimationFrame(loop);
    }

    function startLoop() {
      if (rafActive) return;
      rafActive = true;
      requestAnimationFrame(loop);
    }

    const visibleIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const wasVisible = visible;
          visible = e.isIntersecting;
          if (visible) startLoop();
          // Flush a final update on the transition OUT so the heading hides
          // cleanly when reverse-scrolling past the trigger (otherwise the
          // rAF loop stops mid-state and leaves it stuck on screen).
          else if (wasVisible) update();
        });
      },
      // Bottom margin widened to 100% (was 50%) so the loop stays alive past
      // the heading's hide threshold — without this, on reverse-scroll the
      // observer flips invisible BEFORE update() ever sees p<0, freezing the
      // heading at its last visible position (typically dead-center).
      { threshold: 0, rootMargin: "100% 0px 100% 0px" }
    );
    visibleIO.observe(section);

    window.addEventListener("resize", update);
    update();
  })();
}
