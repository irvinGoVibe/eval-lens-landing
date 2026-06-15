"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import type { Post } from "@/lib/blog";

const PAGE_SIZE = 12;

/** All News grid — shows 12 cards, then expands by 12 more on "Show more". */
export function AllNewsGrid({ posts }: { posts: Post[] }) {
  const [count, setCount] = useState(PAGE_SIZE);
  const visible = posts.slice(0, count);
  const hasMore = count < posts.length;

  return (
    <>
      <div className="blog-grid blog-grid--surface">
        {visible.map((post) => (
          <ArticleCard key={post.slug} post={post} variant="grid" />
        ))}
      </div>

      {hasMore && (
        <div className="blog-expand-row">
          <button
            type="button"
            className="blog-expand-btn"
            onClick={() => setCount((c) => c + PAGE_SIZE)}
          >
            Show more
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      )}
    </>
  );
}
