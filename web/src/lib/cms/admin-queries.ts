// Server-only admin data layer (service_role): CRUD over articles / loop_posts
// and the home featured selection. Reads here are NOT cached and return ALL
// statuses (draft + published) — the admin must see drafts. Public reads stay
// in `queries.ts` (anon, `use cache`, published-only).

import "server-only";
import { getAdminSupabase } from "./admin-client";

export type ArticleStatus = "draft" | "published";

/** Full admin view of an article row (all statuses, incl. home fields). */
export interface AdminArticle {
  id: string;
  slug: string;
  category: string;
  accent: string;
  title: string;
  excerpt: string | null;
  date: string;
  read_minutes: number | null;
  cover: string | null;
  author: string | null;
  role: string | null;
  body: string | null;
  status: ArticleStatus;
  home_featured: boolean;
  home_position: number | null;
}

export interface AdminLoopPost {
  id: string;
  kind: "video" | "photo";
  author: string | null;
  initials: string | null;
  accent: string | null;
  caption: string | null;
  cover: string | null;
  video: string | null;
  photos: string[] | null;
  date: string | null;
  href: string | null;
  status: ArticleStatus;
}

const ADMIN_ARTICLE_COLUMNS =
  "id, slug, category, accent, title, excerpt, date, read_minutes, cover, author, role, body, status, home_featured, home_position";
const ADMIN_LOOP_COLUMNS =
  "id, kind, author, initials, accent, caption, cover, video, photos, date, href, status";

// ---- Articles -------------------------------------------------------------

export async function adminListArticles(): Promise<AdminArticle[]> {
  const { data, error } = await getAdminSupabase()
    .from("articles")
    .select(ADMIN_ARTICLE_COLUMNS)
    .order("date", { ascending: false });
  if (error) throw new Error(`adminListArticles: ${error.message}`);
  return (data as AdminArticle[] | null) ?? [];
}

export async function adminGetArticle(
  slug: string,
): Promise<AdminArticle | null> {
  const { data, error } = await getAdminSupabase()
    .from("articles")
    .select(ADMIN_ARTICLE_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`adminGetArticle: ${error.message}`);
  return (data as AdminArticle | null) ?? null;
}

export type ArticleInput = Omit<AdminArticle, "id" | "home_featured" | "home_position">;

export async function adminCreateArticle(input: ArticleInput): Promise<void> {
  const { error } = await getAdminSupabase().from("articles").insert(input);
  if (error) throw new Error(`adminCreateArticle: ${error.message}`);
}

export async function adminUpdateArticle(
  slug: string,
  input: ArticleInput,
): Promise<void> {
  const { error } = await getAdminSupabase()
    .from("articles")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("slug", slug);
  if (error) throw new Error(`adminUpdateArticle: ${error.message}`);
}

export async function adminDeleteArticle(slug: string): Promise<void> {
  const { error } = await getAdminSupabase()
    .from("articles")
    .delete()
    .eq("slug", slug);
  if (error) throw new Error(`adminDeleteArticle: ${error.message}`);
}

// ---- Home featured selection ---------------------------------------------

/** Ordered list of slugs to show in the home blog block. Replaces the prior
 *  selection entirely: every published article is reset, then the chosen
 *  slugs are flagged with their position. */
export async function adminSaveFeatured(slugs: string[]): Promise<void> {
  const supabase = getAdminSupabase();

  // 1) Clear current selection.
  const { error: clearError } = await supabase
    .from("articles")
    .update({ home_featured: false, home_position: null })
    .eq("home_featured", true);
  if (clearError) throw new Error(`adminSaveFeatured (clear): ${clearError.message}`);

  // 2) Flag the new selection with positions.
  for (let i = 0; i < slugs.length; i++) {
    const { error } = await supabase
      .from("articles")
      .update({ home_featured: true, home_position: i })
      .eq("slug", slugs[i]);
    if (error) throw new Error(`adminSaveFeatured (set ${slugs[i]}): ${error.message}`);
  }
}

// ---- Loop posts -----------------------------------------------------------

export async function adminListLoopPosts(): Promise<AdminLoopPost[]> {
  const { data, error } = await getAdminSupabase()
    .from("loop_posts")
    .select(ADMIN_LOOP_COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`adminListLoopPosts: ${error.message}`);
  return (data as AdminLoopPost[] | null) ?? [];
}

export async function adminGetLoopPost(id: string): Promise<AdminLoopPost | null> {
  const { data, error } = await getAdminSupabase()
    .from("loop_posts")
    .select(ADMIN_LOOP_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`adminGetLoopPost: ${error.message}`);
  return (data as AdminLoopPost | null) ?? null;
}

export type LoopPostInput = Omit<AdminLoopPost, never>;

export async function adminCreateLoopPost(input: LoopPostInput): Promise<void> {
  const { error } = await getAdminSupabase().from("loop_posts").insert(input);
  if (error) throw new Error(`adminCreateLoopPost: ${error.message}`);
}

export async function adminUpdateLoopPost(
  id: string,
  input: Omit<LoopPostInput, "id">,
): Promise<void> {
  const { error } = await getAdminSupabase()
    .from("loop_posts")
    .update(input)
    .eq("id", id);
  if (error) throw new Error(`adminUpdateLoopPost: ${error.message}`);
}

export async function adminDeleteLoopPost(id: string): Promise<void> {
  const { error } = await getAdminSupabase()
    .from("loop_posts")
    .delete()
    .eq("id", id);
  if (error) throw new Error(`adminDeleteLoopPost: ${error.message}`);
}
