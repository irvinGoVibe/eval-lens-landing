// Mapping from Supabase rows (snake_case DB columns) to the domain model.

import type { Accent, Category, LoopKind, LoopPost, Post } from "./types";

/** Shape of a row from the `articles` table (selected columns). */
export interface ArticleRow {
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
  /** Markdown source (Story 02; previously a JSONB Block[]). */
  body: string | null;
}

/** Shape of a row from the `loop_posts` table (selected columns). */
export interface LoopRow {
  id: string;
  kind: string;
  author: string | null;
  initials: string | null;
  accent: string | null;
  caption: string | null;
  cover: string | null;
  video: string | null;
  photos: unknown;
  date: string | null;
  href: string | null;
}

/** The three valid Newsroom rubrics (Story 03). */
const CATEGORIES: readonly Category[] = ["Press Release", "Product", "Research"];

/**
 * Normalize a DB `category` string against the three-value taxonomy. The DB
 * CHECK constraint (migration 20260615000005) already enforces this, but a row
 * carrying a retired rubric (e.g. before the migration is applied) must not be
 * blindly cast to `Category`. Unknown values fall back to "Product" so the
 * renderer always receives a valid rubric.
 */
function normalizeCategory(value: string): Category {
  return (CATEGORIES as readonly string[]).includes(value)
    ? (value as Category)
    : "Product";
}

export function mapArticle(row: ArticleRow): Post {
  return {
    slug: row.slug,
    category: normalizeCategory(row.category),
    accent: row.accent as Accent,
    title: row.title,
    excerpt: row.excerpt ?? "",
    date: row.date,
    readMinutes: row.read_minutes ?? 0,
    cover: row.cover ?? "",
    author: row.author ?? "",
    role: row.role ?? "",
    // Markdown source. Defensive: until migration 20260615000003 is applied the
    // column may still be a JSONB Block[]; coerce non-strings to "" so the
    // renderer never receives a non-string body.
    body: typeof row.body === "string" ? row.body : "",
  };
}

export function mapLoopPost(row: LoopRow): LoopPost {
  const photos = Array.isArray(row.photos)
    ? (row.photos as string[])
    : undefined;

  return {
    id: row.id,
    kind: row.kind as LoopKind,
    author: row.author ?? "",
    initials: row.initials ?? "",
    accent: (row.accent ?? "violet") as Accent,
    caption: row.caption ?? "",
    cover: row.cover ?? "",
    ...(row.video ? { video: row.video } : {}),
    ...(photos ? { photos } : {}),
    date: row.date ?? "",
    href: row.href ?? "",
  };
}
