"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * In-article paged photo gallery, rendered from a `:::gallery` Markdown
 * directive (see `MarkdownBody`). The paging logic mirrors `PopupGallery`
 * from `components/blog/InTheLoop.tsx` (which is in the "don't touch" set, so
 * the behaviour is duplicated here rather than imported).
 */
export function ArticleGallery({ photos }: { photos: string[] }) {
  const [i, setI] = useState(0);
  const many = photos.length > 1;
  const go = (dir: 1 | -1) =>
    setI((p) => (p + dir + photos.length) % photos.length);

  if (photos.length === 0) return null;

  return (
    <div className="article-gallery">
      <div className="article-gallery__photo">
        <Image
          src={photos[i]}
          alt=""
          fill
          sizes="(max-width: 760px) 92vw, 720px"
          className="article-gallery__img"
        />
        {many && (
          <>
            <button
              type="button"
              className="article-gallery__nav article-gallery__nav--prev"
              aria-label="Previous photo"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="article-gallery__nav article-gallery__nav--next"
              aria-label="Next photo"
              onClick={() => go(1)}
            >
              ›
            </button>
            <span className="article-gallery__count">
              {i + 1} / {photos.length}
            </span>
          </>
        )}
      </div>
      {many && (
        <div className="article-gallery__dots" aria-label="Photos">
          {photos.map((p, idx) => (
            <button
              key={`${p}-${idx}`}
              type="button"
              className={`article-gallery__dot${idx === i ? " is-active" : ""}`}
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
