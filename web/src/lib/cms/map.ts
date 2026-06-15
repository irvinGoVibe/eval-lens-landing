// Mapping from Supabase rows (snake_case DB columns) to the domain model.

import type {
  Accent,
  Block,
  Category,
  LoopKind,
  LoopPost,
  Post,
} from "./types";

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
  body: unknown;
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

export function mapArticle(row: ArticleRow): Post {
  return {
    slug: row.slug,
    category: row.category as Category,
    accent: row.accent as Accent,
    title: row.title,
    excerpt: row.excerpt ?? "",
    date: row.date,
    readMinutes: row.read_minutes ?? 0,
    cover: row.cover ?? "",
    author: row.author ?? "",
    role: row.role ?? "",
    body: Array.isArray(row.body) ? (row.body as Block[]) : [],
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
