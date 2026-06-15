"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LoopPost } from "@/lib/blog";
import { formatDate } from "@/lib/format-date";

function VideoGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h8A1.5 1.5 0 0 1 15 6.5v11A1.5 1.5 0 0 1 13.5 19h-8A1.5 1.5 0 0 1 4 17.5v-11ZM16 9.2l3.4-2.1c.5-.3 1.1.06 1.1.64v8.5c0 .58-.6.94-1.1.64L16 14.8V9.2Z" />
    </svg>
  );
}

function PhotoStackGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <rect x="7" y="3" width="14" height="11" rx="2" fill="currentColor" opacity=".4" />
      <rect x="3" y="7" width="14" height="14" rx="2.4" fill="currentColor" />
    </svg>
  );
}

/** Video repost — dark card; the clip auto-plays on hover. */
function VideoCard({ post, onOpen }: { post: LoopPost; onOpen: () => void }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const enter = () => {
    const v = vidRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };
  const leave = () => vidRef.current?.pause();

  return (
    <button
      type="button"
      className="loop-card loop-card--video"
      data-accent={post.accent}
      onClick={onOpen}
      onMouseEnter={enter}
      onMouseLeave={leave}
      aria-label={`Play: ${post.caption}`}
    >
      <span className="loop-card__media">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 600px) 72vw, 300px"
          className="loop-card__img"
        />
        {post.video && (
          <video
            ref={vidRef}
            className="loop-card__preview"
            src={post.video}
            poster={post.cover}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
          />
        )}
        <span className="loop-card__shade" aria-hidden="true"></span>
      </span>
      <span className="loop-card__overlay">
        <span className="loop-card__author">
          <span className="loop-card__avatar" data-accent={post.accent}>
            {post.initials}
          </span>
          {post.author}
        </span>
        <span className="loop-card__caption">{post.caption}</span>
        <span className="loop-card__meta">
          {formatDate(post.date)}
          <span aria-hidden="true">·</span>
          <VideoGlyph />
        </span>
      </span>
    </button>
  );
}

/** Photo / gallery repost — same-size card with an edge-to-edge image on top
 *  and a white text block below; the image zooms on hover. */
function PhotoCard({ post, onOpen }: { post: LoopPost; onOpen: () => void }) {
  const isGallery = (post.photos?.length ?? 0) > 1;
  return (
    <button
      type="button"
      className="loop-card loop-card--photo"
      data-accent={post.accent}
      onClick={onOpen}
      aria-label={`Open: ${post.caption}`}
    >
      <span className="loop-photo">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(max-width: 600px) 72vw, 300px"
          className="loop-photo__img"
        />
      </span>
      <span className="loop-body">
        <span className="loop-card__author loop-body__author">
          <span className="loop-card__avatar" data-accent={post.accent}>
            {post.initials}
          </span>
          {post.author}
        </span>
        <span className="loop-body__caption">{post.caption}</span>
        <span className="loop-body__meta">
          {formatDate(post.date)}
          {isGallery && (
            <>
              <span aria-hidden="true">·</span>
              <PhotoStackGlyph />
            </>
          )}
        </span>
      </span>
    </button>
  );
}

/** Split a caption into a bold lead sentence + the rest (à la Apple's posts). */
function splitCaption(text: string): [string, string] {
  const m = text.match(/[.!?](\s+)/);
  if (!m || m.index === undefined) return [text, ""];
  const cut = m.index + 1;
  return [text.slice(0, cut).trim(), text.slice(cut).trim()];
}

/** Popup photo carousel — click arrows / dots to page through a gallery.
 *  Own state, so it resets whenever it remounts (keyed by post id). */
function PopupGallery({ photos }: { photos: string[] }) {
  const [i, setI] = useState(0);
  const many = photos.length > 1;
  const go = (dir: 1 | -1) => setI((p) => (p + dir + photos.length) % photos.length);

  return (
    <div className="loop-modal__gallery">
      <div className="loop-modal__photo">
        <Image
          src={photos[i]}
          alt=""
          fill
          sizes="(max-width: 720px) 80vw, 420px"
          className="loop-modal__photo-img"
        />
        {many && (
          <>
            <button
              type="button"
              className="loop-gal-nav loop-gal-nav--prev"
              aria-label="Previous photo"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="loop-gal-nav loop-gal-nav--next"
              aria-label="Next photo"
              onClick={() => go(1)}
            >
              ›
            </button>
            <span className="loop-gal-count">
              {i + 1} / {photos.length}
            </span>
          </>
        )}
      </div>
      {many && (
        <div className="loop-gal-dots" aria-label="Photos">
          {photos.map((p, idx) => (
            <button
              key={`${p}-${idx}`}
              type="button"
              className={`loop-gal-dot${idx === i ? " is-active" : ""}`}
              aria-label={`Photo ${idx + 1}`}
              aria-current={idx === i ? "true" : undefined}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Apple Newsroom "In the Loop" — a paged rail of reposted social items
 *  (video reels + photo posts) that open in a popup on click. */
export function InTheLoop({ posts }: { posts: LoopPost[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : posts[activeIndex];
  const [lead, body] = active ? splitCaption(active.caption) : ["", ""];

  // Deep-link: on mount, open the popup if `?loop=<id>` points at a known post.
  // Unknown / missing id is a graceful no-op. Runs once — listing/closing must
  // not re-trigger it, so it deliberately omits `searchParams` from deps.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("loop");
    if (!id) return;
    const idx = posts.findIndex((p) => p.id === id);
    if (idx >= 0) setActiveIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  // Mirror the open item into `?loop=<id>` (open / step) and strip it on close.
  // `router.replace` of the same path/segment updates the URL without
  // remounting, so `activeIndex` survives. Skips writes when the URL already
  // matches to avoid redundant history churn.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get("loop");
    const target =
      activeIndex === null ? null : (posts[activeIndex]?.id ?? null);
    if (current === target) return;
    if (target === null) params.delete("loop");
    else params.set("loop", target);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [activeIndex, posts, pathname, router, searchParams]);

  // Flip through items inside the popup (wraps around).
  const step = useCallback(
    (dir: 1 | -1) =>
      setActiveIndex((i) =>
        i === null ? i : (i + dir + posts.length) % posts.length,
      ),
    [posts.length],
  );

  // Page count from the *scrollable* range (not clientWidth ratio, which
  // collapses to 1 once the rail bleeds past the viewport edge).
  const pageCount = (el: HTMLDivElement) => {
    const maxScroll = el.scrollWidth - el.clientWidth;
    return maxScroll <= 4 ? 1 : Math.ceil(el.scrollWidth / el.clientWidth);
  };

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const total = pageCount(el);
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setPages(total);
    setPage(Math.min(total - 1, Math.max(0, Math.round(ratio * (total - 1)))));
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  // Map a page index onto the actual scroll range and glide there.
  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const total = pageCount(el);
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = total > 1 ? (i / (total - 1)) * maxScroll : 0;
    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const scrollByPage = (dir: 1 | -1) =>
    goTo(Math.min(pages - 1, Math.max(0, page + dir)));

  // Lock body scroll + keyboard (Esc / ← / →) while the popup is open.
  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, step]);

  return (
    <section className="blog-loop" id="loop">
      <div className="wrap blog-wrap">
        <div className="loop-head">
          <h2>In the Loop</h2>
        </div>

        <div className="loop-rail" ref={trackRef}>
          {posts.map((post, idx) => (
            <div className="loop-rail__item" key={post.id}>
              {post.kind === "video" ? (
                <VideoCard post={post} onOpen={() => setActiveIndex(idx)} />
              ) : (
                <PhotoCard post={post} onOpen={() => setActiveIndex(idx)} />
              )}
            </div>
          ))}
        </div>

        <div className="loop-controls">
          <div className="loop-dots" aria-label="Slides">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`loop-dot${i === page ? " is-active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="loop-arrows">
            <button
              type="button"
              className="loop-arrow"
              aria-label="Previous"
              disabled={page <= 0}
              onClick={() => scrollByPage(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="loop-arrow"
              aria-label="Next"
              disabled={page >= pages - 1}
              onClick={() => scrollByPage(1)}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {active &&
        createPortal(
          <div
            className="loop-modal"
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              className="loop-modal__nav loop-modal__nav--prev"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              ‹
            </button>

            <div
              className={`loop-modal__panel loop-modal__panel--${active.kind}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="loop-modal__bar">
                <button
                  type="button"
                  className="loop-modal__close"
                  aria-label="Close"
                  onClick={() => setActiveIndex(null)}
                >
                  ✕
                </button>
                <span className="loop-modal__count">
                  {(activeIndex ?? 0) + 1} / {posts.length}
                </span>
                <a
                  className="loop-modal__share"
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div
                className={`loop-modal__content loop-modal__content--${active.kind}`}
                key={active.id}
              >
                {active.kind === "video" ? (
                  <div className="loop-modal__player">
                    <video
                      className="loop-modal__video"
                      src={active.video}
                      poster={active.cover}
                      autoPlay
                      loop
                      muted
                      controls
                      playsInline
                    />
                  </div>
                ) : (
                  <PopupGallery photos={active.photos ?? [active.cover]} />
                )}
                <div className="loop-modal__info">
                  <span className="loop-card__author loop-modal__author">
                    <span className="loop-card__avatar" data-accent={active.accent}>
                      {active.initials}
                    </span>
                    {active.author}
                  </span>
                  {active.kind === "photo" ? (
                    <div className="loop-modal__text">
                      <p className="loop-modal__lead">{lead}</p>
                      {body && <p className="loop-modal__caption">{body}</p>}
                    </div>
                  ) : (
                    <p className="loop-modal__caption">{active.caption}</p>
                  )}
                  <span className="loop-modal__date">{formatDate(active.date)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="loop-modal__nav loop-modal__nav--next"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              ›
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
