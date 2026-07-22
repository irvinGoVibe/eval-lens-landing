"use client";

import { useEffect } from "react";

import { onScrollFrame } from "@/lib/scroll-bus";

/**
 * Scroll FX runtime for INTERNAL pages (not the homepage — that's
 * ScrollOrchestrator). One shared rAF loop per page, opt-in purely via
 * data-attributes, with proper cleanup so client-side navigation between
 * pages neither stacks listeners nor leaves the engine dead.
 *
 *   [data-reveal]                fade/translate in on enter (IO).
 *     variants: data-reveal="fade|up|left|right|scale"
 *     stagger:  style={{ "--reveal-delay": "120ms" }}
 *   [data-scrub]                 writes --scrub 0→1 as it crosses the viewport.
 *   [data-pin][data-pin-steps=N] tall track + sticky [data-pin-stage];
 *     writes --pin 0→1 and lights [data-pin-step] children sequentially
 *     (.is-active cumulative, .is-current = the active one, --pin-step index).
 *   <video data-scrub-video> inside a [data-pin] section is seeked by that
 *     section's pin progress (no autoplay). Optional data-frames="N" quantizes
 *     the scrub into N discrete frames across the clip.
 *   <video data-play-once> plays a single time when it scrolls into view, then
 *     stops on its last frame (no loop). Optional data-replay-delay="<ms>"
 *     restarts it that long after each end (a paced loop). Reduced-motion never
 *     auto-plays it — it stays on the first frame.
 *
 * Respects prefers-reduced-motion: reveals show immediately, pins settle
 * fully revealed, scrubs pin to a static end state.
 *
 * Mount once per internal page (after the footer), like the homepage mounts
 * ScrollOrchestrator. Keeps the CLAUDE.md rule: no per-section useEffect —
 * a single loop drives the whole page.
 */
export function ScrollFX() {
  useEffect(() => {
    /* Release the homepage hero scroll-lock on internal pages. The global
     * `body:not(.hero-ready){overflow:hidden}` rule is lifted on the homepage
     * by ScrollOrchestrator; internal pages have no orchestrator, so without
     * this the body stays an overflow:hidden clip container and every
     * `position:sticky` pin stage (data-pin) silently fails to stick. ScrollFX
     * is mounted once on every internal page, so this is the canonical place
     * to lift it (mirrors web/src/app/bento/ScrollUnlock.tsx).
     *
     * EXCEPTION — /demoday mounts BOTH engines: the home Hero (with its intro
     * choreography in ScrollOrchestrator) plus this ScrollFX for the ported DS
     * pins/reveals. On that page ScrollOrchestrator is the sole owner of
     * `hero-ready` — it sets the class after the intro and deliberately never
     * removes it. If ScrollFX also toggled the class, its cleanup (dev Strict
     * Mode mount→cleanup→mount, and the async race with the Hero video) would
     * strip `hero-ready`, re-lock the body (overflow:hidden) and silently kill
     * every sticky pin stage. So when the real home Hero is present
     * (`#hero .hero-video` — internal StatementHero uses id="hero" but has no
     * .hero-video), ScrollFX does NOT manage the lock at all and leaves it to
     * ScrollOrchestrator. Internal pages have no such element, so their
     * behaviour is unchanged. */
    const homeHeroPresent = Boolean(
      document.querySelector("#hero .hero-video"),
    );
    const bodyWasLocked =
      !homeHeroPresent && !document.body.classList.contains("hero-ready");
    if (bodyWasLocked) document.body.classList.add("hero-ready");
    const unlock = () => {
      if (bodyWasLocked) document.body.classList.remove("hero-ready");
    };

    /* 0 — ambient-layer gate for internal pages. Same mechanism the homepage
       runs in ScrollOrchestrator: decorative `infinite` animations hold
       promoted compositor layers even while their section is screens away.
       Hosts (globals.css ambient groups) reuse the `[data-fx-gate]` +
       `is-onscreen` CSS gate; individual DS ornaments get `.fx-off` (see
       ds.css) because their styles live on the element / its pseudo. */
    const gateCleanups: Array<() => void> = [];
    {
      const hosts = document.querySelectorAll<HTMLElement>(
        ".section-orange-glow, .cta-band, .blob-field, .wf-floats",
      );
      const ornaments = document.querySelectorAll<HTMLElement>(
        ".ds-blob, .ds-flow__blob, .ds-glass__orbit, .ds-chipgrid--bare .ds-chip, .ds-hubmap__card--feature",
      );
      if (hosts.length || ornaments.length) {
        const gate = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              const el = e.target as HTMLElement;
              if (el.dataset.fxGate !== undefined) {
                el.classList.toggle("is-onscreen", e.isIntersecting);
              } else {
                el.classList.toggle("fx-off", !e.isIntersecting);
              }
            });
          },
          { rootMargin: "60% 0px 60% 0px" },
        );
        hosts.forEach((host) => {
          host.dataset.fxGate = "";
          gate.observe(host);
        });
        ornaments.forEach((el) => gate.observe(el));
        gateCleanups.push(() => {
          gate.disconnect();
          hosts.forEach((host) => {
            delete host.dataset.fxGate;
            host.classList.remove("is-onscreen");
          });
          ornaments.forEach((el) => el.classList.remove("fx-off"));
        });
      }
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    /* 1 — reveal on enter.
       `.is-revealing` carries the `will-change` for the length of the fade and
       is dropped on transitionend: a page can hold hundreds of [data-reveal]
       nodes, and promoting all of them for the whole session (the old base-rule
       `will-change`) costs far more texture memory than it ever saves. */
    const reveals = Array.from(document.querySelectorAll("[data-reveal]"));
    let io: IntersectionObserver | null = null;
    const revealCleanups: Array<() => void> = [];
    if (reveals.length) {
      if (reduce) {
        // No transition to promote for — reduced motion cuts straight to the
        // revealed state.
        reveals.forEach((el) => el.classList.add("is-in"));
      } else {
        const settle = (el: Element) => {
          let timer = 0;
          const done = () => {
            el.classList.remove("is-revealing");
            el.removeEventListener("transitionend", done);
            window.clearTimeout(timer);
          };
          el.addEventListener("transitionend", done);
          // transitionend never fires if the element is hidden or the value
          // does not actually change; the timeout guarantees the release.
          // .75s transition + up to ~.6s of --reveal-delay stagger.
          timer = window.setTimeout(done, 1600);
          revealCleanups.push(done);
        };
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-revealing", "is-in");
                settle(e.target);
                io?.unobserve(e.target);
              }
            });
          },
          { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
        );
        reveals.forEach((el) => io!.observe(el));
      }
    }

    /* 1b — [data-play-once]: play a video a single time when it scrolls into
       view. With an optional data-replay-delay="<ms>" it restarts that long
       after each end (a paced loop); without it, it stops on its last frame.
       Reduced-motion never auto-plays it (stays on the first frame). */
    let playIo: IntersectionObserver | null = null;
    const playCleanups: Array<() => void> = [];
    if (!reduce) {
      const playOnce = Array.from(
        document.querySelectorAll<HTMLVideoElement>("video[data-play-once]"),
      );
      if (playOnce.length) {
        playOnce.forEach((v) => {
          const delay = parseInt(v.getAttribute("data-replay-delay") || "0", 10);
          if (!(delay > 0)) return;
          let timer = 0;
          const onEnded = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
              try {
                v.currentTime = 0;
              } catch {
                /* not seekable — play() restarts from wherever it is */
              }
              void v.play().catch(() => {});
            }, delay);
          };
          v.addEventListener("ended", onEnded);
          playCleanups.push(() => {
            window.clearTimeout(timer);
            v.removeEventListener("ended", onEnded);
          });
        });
        playIo = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              const v = e.target as HTMLVideoElement;
              void v.play().catch(() => {
                /* autoplay blocked — leave it on the first frame */
              });
              playIo?.unobserve(v);
            });
          },
          { threshold: 0.4 },
        );
        playOnce.forEach((v) => playIo!.observe(v));
      }
    }

    /* 2 + 3 — scrub & pin share one rAF loop */
    const scrubs = Array.from(document.querySelectorAll("[data-scrub]")) as HTMLElement[];
    const pins = Array.from(document.querySelectorAll("[data-pin]")) as HTMLElement[];
    // Cinema intentionally keeps the full web transition even when the device
    // requests reduced motion. Other scrub/pin scenes retain their static end
    // state, so this exception stays tightly scoped to the cinematic primitive.
    const animatedScrubs = reduce ? [] : scrubs;
    const animatedPins = reduce
      ? pins.filter((section) => section.classList.contains("ds-cinema"))
      : pins;
    const reducedMetaCleanups: Array<() => void> = [];

    const seekVideoEnd = (video: HTMLVideoElement) => {
      if (video.duration && Number.isFinite(video.duration)) {
        try {
          video.currentTime = video.duration;
        } catch {
          /* not seekable yet */
        }
      }
    };

    if (reduce) {
      scrubs.forEach((el) => el.style.setProperty("--scrub", "1"));
      // Native autoplay ignores prefers-reduced-motion. Freeze declarative
      // background loops on their first frame so internal pages do not keep
      // animating after the rest of the motion system has settled.
      document
        .querySelectorAll<HTMLVideoElement>("video[autoplay]")
        .forEach((video) => {
          const freeze = () => {
            video.pause();
            try {
              video.currentTime = 0;
            } catch {
              /* metadata is not seekable yet; loadedmetadata retries below */
            }
          };
          freeze();
          video.addEventListener("loadedmetadata", freeze);
          reducedMetaCleanups.push(() =>
            video.removeEventListener("loadedmetadata", freeze),
          );
        });
      pins
        .filter((section) => !section.classList.contains("ds-cinema"))
        .forEach((section) => {
          section.style.setProperty("--pin", "1");
          section.querySelectorAll("[data-pin-step]").forEach((it) => {
            it.classList.add("is-active", "is-current");
          });
          section
            .querySelectorAll<HTMLVideoElement>("video[data-scrub-video]")
            .forEach((video) => {
              const onMeta = () => seekVideoEnd(video);
              onMeta();
              video.addEventListener("loadedmetadata", onMeta);
              reducedMetaCleanups.push(() =>
                video.removeEventListener("loadedmetadata", onMeta),
              );
            });
        });
    }

    if (!animatedScrubs.length && !animatedPins.length) {
      return () => {
        io?.disconnect();
        playIo?.disconnect();
        playCleanups.forEach((fn) => fn());
        reducedMetaCleanups.forEach((fn) => fn());
        unlock();
      };
    }

    const paintScrub = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = vh + r.height;
      const traveled = vh - r.top;
      el.style.setProperty("--scrub", clamp01(total > 0 ? traveled / total : 0).toFixed(4));
    };

    const paintPin = (section: HTMLElement) => {
      const declared = parseInt(section.getAttribute("data-pin-steps") || "0", 10);
      // Only the VISIBLE version's steps count — a section can carry several
      // saved versions ([data-version]) each with their own [data-pin-step]; the
      // hidden ones (display:none → offsetParent null) must not shift the index.
      const items = Array.from(
        section.querySelectorAll<HTMLElement>("[data-pin-step]"),
      ).filter((el) => el.offsetParent !== null);
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollable = section.offsetHeight - vh;
      const p = scrollable > 0 ? clamp01(-r.top / scrollable) : r.top < vh ? 1 : 0;
      section.style.setProperty("--pin", p.toFixed(4));
      const n = declared || items.length || 1;
      if (items.length) {
        const activeIdx = Math.max(0, Math.min(n - 1, Math.floor(p * n)));
        items.forEach((it, i) => {
          it.classList.toggle("is-active", i <= activeIdx);
          it.classList.toggle("is-current", i === activeIdx);
        });
        section.style.setProperty("--pin-step", String(activeIdx));
      }
      // A section can carry several hidden version copies (display:none), and
      // `mediaNode` renders into both the v1 and v3 blocks — so more than one
      // scrub video can exist. Seek only the VISIBLE one (offsetParent != null),
      // mirroring the step filter above; a plain querySelector would grab the
      // hidden v1 copy and the on-screen video would never move.
      const video =
        Array.from(
          section.querySelectorAll<HTMLVideoElement>("video[data-scrub-video]"),
        ).find((v) => v.offsetParent !== null) ?? null;
      if (video && video.duration && Number.isFinite(video.duration)) {
        // Scrub the clip from the pin progress, quantized into `data-frames`
        // whole frames. Each pin step owns a segment of the clip: a step's
        // optional [data-frame] anchor is the frame shown the moment it turns
        // active, and the video eases smoothly from one step's anchor to the
        // next across that step's scroll span (piecewise-linear through the
        // anchors). Missing anchors fall back to an even split, which lands
        // exactly on the plain linear scrub — so unanchored clips are
        // unchanged. The clip always finishes on its last frame as the pin
        // completes.
        const frames = parseInt(video.getAttribute("data-frames") || "0", 10);
        let t: number;
        if (frames > 1) {
          const lastFrame = frames - 1;
          const anchorAt = (k: number) => {
            if (k >= n) return lastFrame; // implicit end control point
            const raw = items[k]?.getAttribute("data-frame");
            const v = raw != null ? parseInt(raw, 10) : NaN;
            return Number.isFinite(v)
              ? Math.max(0, Math.min(lastFrame, v))
              : Math.round((k / n) * lastFrame);
          };
          const scaled = clamp01(p) * n; // 0 → n across the pin
          const seg = Math.min(Math.floor(scaled), n - 1);
          const local = scaled - seg; // 0 → 1 within the current step
          const f0 = anchorAt(seg);
          const f1 = anchorAt(seg + 1);
          const frame = Math.round(f0 + local * (f1 - f0));
          t = (frame / lastFrame) * video.duration;
        } else {
          t = p * video.duration;
        }
        if (Math.abs(video.currentTime - t) > 0.015) {
          try {
            video.currentTime = t;
          } catch {
            /* not seekable yet — a later frame will catch up */
          }
        }
      }
    };

    let rafPending = false;
    const paint = () => {
      rafPending = false;
      animatedScrubs.forEach(paintScrub);
      animatedPins.forEach(paintPin);
    };
    const schedule = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(paint);
    };

    // Re-seek scrub videos once their metadata (and thus duration) is ready, so
    // the first paint lands on the right frame without waiting for a scroll.
    const pinVideos = animatedPins.flatMap((s) =>
      Array.from(s.querySelectorAll<HTMLVideoElement>("video[data-scrub-video]")),
    );
    pinVideos.forEach((v) => v.addEventListener("loadedmetadata", schedule));

    const unsubscribeScroll = onScrollFrame(paint);
    schedule();

    return () => {
      unsubscribeScroll();
      gateCleanups.forEach((fn) => fn());
      revealCleanups.forEach((fn) => fn());
      io?.disconnect();
      playIo?.disconnect();
      playCleanups.forEach((fn) => fn());
      reducedMetaCleanups.forEach((fn) => fn());
      unlock();
      pinVideos.forEach((v) => v.removeEventListener("loadedmetadata", schedule));
    };
  }, []);

  return null;
}
