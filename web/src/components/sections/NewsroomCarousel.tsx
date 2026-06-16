"use client";

// Apple-style horizontal card carousel for the home "Newsroom" block.
// Localized button-driven scrolling only (scrollBy on the track) — this is not
// scroll-scrub/parallax, so it stays out of ScrollOrchestrator by design. The
// section fetches data server-side and passes plain card data in as props.

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CategoryTag } from "@/components/blog/CategoryTag";
import type { Accent, Category } from "@/lib/blog";

export interface NewsroomCard {
  slug: string;
  category: Category;
  accent: Accent;
  title: string;
  excerpt: string;
  cover: string;
}

export function NewsroomCarousel({ cards }: { cards: NewsroomCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
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

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".news-card");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <div className="news-carousel">
      <div className="news-carousel__track" ref={trackRef}>
        {cards.map((card) => (
          <Link
            key={card.slug}
            href={`/blog/${card.slug}`}
            className="news-card"
            data-accent={card.accent}
          >
            <span className="news-card__top">
              <CategoryTag category={card.category} accent={card.accent} />
              <h3 className="news-card__title">{card.title}</h3>
              <p className="news-card__excerpt">{card.excerpt}</p>
            </span>
            <span className="news-card__media">
              <Image
                src={card.cover}
                alt=""
                fill
                sizes="(max-width: 700px) 80vw, 340px"
                className="news-card__img"
              />
            </span>
            <span className="news-card__plus" aria-hidden="true">
              +
            </span>
          </Link>
        ))}
      </div>

      <div className="news-carousel__nav">
        <button
          type="button"
          className="news-arrow"
          aria-label="Previous"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="news-arrow"
          aria-label="Next"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
