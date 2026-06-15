"use server";

// Article CRUD server actions (service_role, server-side). Each action
// re-verifies the admin session (the proxy is only an optimistic gate) and
// invalidates the blog cache tags after a write.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { SESSION_COOKIE, expectedSessionToken } from "@/lib/cms/auth";
import {
  type ArticleInput,
  type ArticleStatus,
  adminCreateArticle,
  adminDeleteArticle,
  adminUpdateArticle,
} from "@/lib/cms/admin-queries";
import { uploadMedia } from "@/lib/cms/storage";

async function assertSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const expected = await expectedSessionToken();
  if (!expected || !token || token !== expected) {
    throw new Error("Unauthorized");
  }
}

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

async function readArticleInput(form: FormData): Promise<ArticleInput> {
  // Optional cover upload: if a file is provided it wins over the URL field.
  let cover = str(form, "cover");
  const coverFile = form.get("coverFile");
  if (coverFile instanceof File && coverFile.size > 0) {
    cover = await uploadMedia(coverFile, "bento");
  }

  const readMinutesRaw = str(form, "read_minutes");
  const status = (str(form, "status") || "draft") as ArticleStatus;

  return {
    slug: str(form, "slug"),
    category: str(form, "category"),
    accent: str(form, "accent") || "violet",
    title: str(form, "title"),
    excerpt: str(form, "excerpt") || null,
    date: str(form, "date"),
    read_minutes: readMinutesRaw ? Number(readMinutesRaw) : null,
    cover: cover || null,
    author: str(form, "author") || null,
    role: str(form, "role") || null,
    body: str(form, "body") || null,
    status: status === "published" ? "published" : "draft",
  };
}

function invalidate(slug: string): void {
  revalidateTag("blog", "max");
  revalidateTag(`post:${slug}`, "max");
  revalidateTag("home", "max");
}

export async function createArticleAction(form: FormData): Promise<void> {
  await assertSession();
  const input = await readArticleInput(form);
  await adminCreateArticle(input);
  invalidate(input.slug);
  redirect("/admin/blog/articles");
}

export async function updateArticleAction(
  originalSlug: string,
  form: FormData,
): Promise<void> {
  await assertSession();
  const input = await readArticleInput(form);
  await adminUpdateArticle(originalSlug, input);
  invalidate(originalSlug);
  if (input.slug !== originalSlug) invalidate(input.slug);
  redirect("/admin/blog/articles");
}

export async function deleteArticleAction(slug: string): Promise<void> {
  await assertSession();
  await adminDeleteArticle(slug);
  invalidate(slug);
  redirect("/admin/blog/articles");
}

/** Standalone media upload used by the in-editor "upload image" control. */
export async function uploadArticleMediaAction(
  form: FormData,
): Promise<{ url: string } | { error: string }> {
  await assertSession();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file." };
  }
  const folder = file.type.startsWith("video/") ? "video" : "photos";
  try {
    const url = await uploadMedia(file, folder);
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }
}
