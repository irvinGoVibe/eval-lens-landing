// On-demand cache revalidation for blog content.
//
// Called by a Supabase Database Webhook when an `articles` / `loop_posts`
// row changes. The webhook must send the shared secret in the
// `x-revalidate-secret` header; requests without the correct secret are
// rejected with 401 so arbitrary callers cannot purge the cache.
//
// Optional JSON body: { "slug": "<article-slug>" } also invalidates the
// per-article tag `post:<slug>`.

import { revalidateTag } from "next/cache";

export async function POST(request: Request): Promise<Response> {
  const expected = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");

  if (!expected || !provided || provided !== expected) {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  // `profile: "max"` — stale-while-revalidate (Next 16; single-arg form is
  // deprecated). See node_modules/next/dist/docs/.../revalidateTag.md.
  revalidateTag("blog", "max");

  let slug: string | undefined;
  try {
    const body = (await request.json()) as { slug?: unknown };
    if (typeof body?.slug === "string") slug = body.slug;
  } catch {
    // No / invalid JSON body — fine, we still revalidated the "blog" tag.
  }

  if (slug) {
    revalidateTag(`post:${slug}`, "max");
  }

  return Response.json({ revalidated: true, slug: slug ?? null });
}
