// Cached Supabase reads for the blog. Each query is a `use cache` function
// tagged so it can be invalidated on-demand via the /api/revalidate route
// handler (Supabase Database Webhook). See web/AGENTS.md — this is Next 16.

import "server-only";
import { cacheTag } from "next/cache";
import { getSupabase } from "./client";
import { type ArticleRow, type LoopRow, mapArticle, mapLoopPost } from "./map";
import type { LoopPost, Post } from "./types";

const ARTICLE_COLUMNS =
  "slug, category, accent, title, excerpt, date, read_minutes, cover, author, role, body";
const LOOP_COLUMNS =
  "id, kind, author, initials, accent, caption, cover, video, photos, date, href";

/** All published articles, newest first (by `date`). */
export async function fetchAllPosts(): Promise<Post[]> {
  "use cache";
  cacheTag("blog");

  const { data, error } = await getSupabase()
    .from("articles")
    .select(ARTICLE_COLUMNS)
    .eq("status", "published")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(`Failed to load articles from Supabase: ${error.message}`);
  }

  return ((data as ArticleRow[] | null) ?? []).map(mapArticle);
}

/** Published loop posts in insertion order (no extra sort). */
export async function fetchLoopPosts(): Promise<LoopPost[]> {
  "use cache";
  cacheTag("blog");

  const { data, error } = await getSupabase()
    .from("loop_posts")
    .select(LOOP_COLUMNS)
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load loop posts from Supabase: ${error.message}`);
  }

  return ((data as LoopRow[] | null) ?? []).map(mapLoopPost);
}

/** A single published article by slug, or null if not found. */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  "use cache";
  cacheTag("blog", `post:${slug}`);

  const { data, error } = await getSupabase()
    .from("articles")
    .select(ARTICLE_COLUMNS)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load article "${slug}" from Supabase: ${error.message}`,
    );
  }

  return data ? mapArticle(data as ArticleRow) : null;
}
