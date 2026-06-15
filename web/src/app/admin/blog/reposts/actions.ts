"use server";

// Loop-post (repost) CRUD server actions (service_role). Each action re-checks
// the admin session and invalidates the blog cache after a write.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { SESSION_COOKIE, expectedSessionToken } from "@/lib/cms/auth";
import {
  type ArticleStatus,
  type LoopPostInput,
  adminCreateLoopPost,
  adminDeleteLoopPost,
  adminUpdateLoopPost,
} from "@/lib/cms/admin-queries";

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

function readLoopInput(form: FormData): LoopPostInput {
  const kind = str(form, "kind") === "video" ? "video" : "photo";
  const status = (str(form, "status") || "draft") as ArticleStatus;
  const photosRaw = str(form, "photos");
  const photos = photosRaw
    ? photosRaw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;

  return {
    id: str(form, "id"),
    kind,
    author: str(form, "author") || null,
    initials: str(form, "initials") || null,
    accent: str(form, "accent") || "violet",
    caption: str(form, "caption") || null,
    cover: str(form, "cover") || null,
    video: str(form, "video") || null,
    photos: photos && photos.length > 0 ? photos : null,
    date: str(form, "date") || null,
    href: str(form, "href") || null,
    status: status === "published" ? "published" : "draft",
  };
}

function invalidate(): void {
  revalidateTag("blog", "max");
}

export async function createLoopAction(form: FormData): Promise<void> {
  await assertSession();
  await adminCreateLoopPost(readLoopInput(form));
  invalidate();
  redirect("/admin/blog/reposts");
}

export async function updateLoopAction(
  id: string,
  form: FormData,
): Promise<void> {
  await assertSession();
  const { id: _ignored, ...rest } = readLoopInput(form);
  void _ignored;
  await adminUpdateLoopPost(id, rest);
  invalidate();
  redirect("/admin/blog/reposts");
}

export async function deleteLoopAction(id: string): Promise<void> {
  await assertSession();
  await adminDeleteLoopPost(id);
  invalidate();
  redirect("/admin/blog/reposts");
}
