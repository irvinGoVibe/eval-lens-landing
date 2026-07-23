"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { safeEqual, sha256Hex } from "@/lib/cms/auth";
import { PRIVATE_POSTS, privateCookieName } from "@/lib/private-posts";

/** Checks the entered password for a protected slug; on success stores its
 *  digest in an httpOnly cookie (the same value we compare against later). */
export async function unlockPrivatePost(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") ?? "");
  const password = String(formData.get("password") ?? "");

  const expected = PRIVATE_POSTS[slug];
  if (!expected) redirect("/blog");

  const digest = await sha256Hex(password);
  if (!safeEqual(digest, expected)) {
    redirect(`/blog/private/${slug}?error=1`);
  }

  const jar = await cookies();
  jar.set(privateCookieName(slug), digest, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/blog/private/${slug}`,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  redirect(`/blog/private/${slug}`);
}
