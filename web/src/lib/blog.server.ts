// EvalLense Newsroom — server-only blog data getters.
//
// These functions read editorial content from Supabase (via the cached,
// `server-only` `cms/queries` module) and are therefore server-only too.
// They are re-exported from `@/lib/blog` so server components keep the single
// `@/lib/blog` import surface, while this module's server-only graph
// (`cms/queries` → `@supabase/supabase-js`, `'use cache'`, `cacheTag`) is never
// pulled into a client bundle.
//
// Source is selected by the `BLOG_SOURCE` env flag:
//   - unset / "supabase" (default) → read from Supabase
//   - "static"                     → read the in-repo arrays in `blog-static`
import "server-only";

import { LOOP_POSTS, POSTS } from "./blog-static";
import {
  fetchAllPosts,
  fetchFeaturedPosts,
  fetchLoopPosts,
  fetchPostBySlug,
} from "./cms/queries";
import type { LoopPost, Post } from "./cms/types";

function useStaticSource(): boolean {
  return process.env.BLOG_SOURCE === "static";
}

function toTime(iso: string): number {
  return new Date(iso).getTime();
}

function sortByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => toTime(b.date) - toTime(a.date));
}

export async function getAllPosts(): Promise<Post[]> {
  if (useStaticSource()) {
    return sortByDateDesc(POSTS);
  }
  return fetchAllPosts();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (useStaticSource()) {
    return sortByDateDesc(POSTS).find((p) => p.slug === slug);
  }
  return (await fetchPostBySlug(slug)) ?? undefined;
}

/** Posts to offer as "Read more" at the bottom of an article. */
export async function getRelatedPosts(slug: string, limit = 3): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export async function getLoopPosts(): Promise<LoopPost[]> {
  if (useStaticSource()) {
    return LOOP_POSTS;
  }
  return fetchLoopPosts();
}

/**
 * Articles for the home-page blog block: the editor's featured selection in
 * order, falling back to the newest published articles when nothing is chosen.
 */
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  if (useStaticSource()) {
    return sortByDateDesc(POSTS).slice(0, limit);
  }
  return fetchFeaturedPosts(limit);
}
