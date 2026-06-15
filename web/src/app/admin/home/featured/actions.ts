"use server";

// Save the home-page blog-block selection (service_role). Re-checks the admin
// session and invalidates both the blog cache and the home-block tag.

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { SESSION_COOKIE, expectedSessionToken } from "@/lib/cms/auth";
import { adminSaveFeatured } from "@/lib/cms/admin-queries";

async function assertSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const expected = await expectedSessionToken();
  if (!expected || !token || token !== expected) {
    throw new Error("Unauthorized");
  }
}

export async function saveFeaturedAction(
  slugs: string[],
): Promise<{ ok: true }> {
  await assertSession();
  await adminSaveFeatured(slugs);
  revalidateTag("blog", "max");
  revalidateTag("home", "max");
  return { ok: true };
}
