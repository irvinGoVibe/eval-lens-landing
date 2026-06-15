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
import { type MediaFolder, uploadMedia } from "@/lib/cms/storage";

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

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024; // 50 MB — mirrors the client limit.

/**
 * Server-side defense-in-depth for uploads: reject anything that is not an
 * image/video or that exceeds the size ceiling before it ever reaches Storage.
 * Mirrors the client-side check in ImageDropzone so a forged request can't
 * bypass it.
 */
function validateUpload(file: File): string | null {
  const type = file.type || "";
  if (!type.startsWith("image/") && !type.startsWith("video/")) {
    return `Unsupported file type: ${type || "unknown"}. Use an image or video.`;
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "File is too large (max 50 MB).";
  }
  return null;
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

/**
 * Standalone media upload used by the repost form's drag-and-drop zones.
 * `folder` picks the Storage subpath: `bento` for cover/gallery images,
 * `video` for video files, `photos` for gallery photos.
 */
export async function uploadLoopMediaAction(
  folder: MediaFolder,
  form: FormData,
): Promise<{ url: string } | { error: string }> {
  await assertSession();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file." };
  }
  const invalid = validateUpload(file);
  if (invalid) {
    return { error: invalid };
  }
  try {
    const url = await uploadMedia(file, folder);
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed." };
  }
}
