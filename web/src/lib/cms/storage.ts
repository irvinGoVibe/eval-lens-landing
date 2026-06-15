// Server-only media upload to Supabase Storage (service_role).
//
// Uploads cover images / body images / videos into the single public `media`
// bucket (folders bento/, photos/, video/ — see Story 01) and returns the
// public object URL to store on the record or embed in Markdown.

import "server-only";
import { getAdminSupabase } from "./admin-client";

const BUCKET = "media";

/** Subfolder by intent; keeps the bucket layout consistent with the seed. */
export type MediaFolder = "bento" | "photos" | "video";

function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  const base = (dot >= 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "file";
  return `${base}-${Date.now()}${ext}`;
}

/**
 * Uploads a File to `media/<folder>/<safe-name>` and returns its public URL.
 * Throws on failure so the caller can surface a clear error without a partial
 * write to the record.
 */
export async function uploadMedia(
  file: File,
  folder: MediaFolder,
): Promise<string> {
  const supabase = getAdminSupabase();
  const path = `${folder}/${safeName(file.name)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) {
    throw new Error(`uploadMedia: ${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
