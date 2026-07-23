// Password-gated article preview. The article row stays `draft` in the CMS
// (invisible on the public blog); this route renders it for anyone holding the
// shared password. Access model mirrors the admin session: the httpOnly cookie
// stores the SHA-256 digest of the password, never the password itself.

import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "@/components/LanSafeLink";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { MarkdownBody } from "@/components/article/MarkdownBody";
import { CategoryTag } from "@/components/blog/CategoryTag";
import { formatDate } from "@/lib/blog";
import type { Accent, Category } from "@/lib/blog";
import { adminGetArticle } from "@/lib/cms/admin-queries";
import { safeEqual } from "@/lib/cms/auth";
import { PRIVATE_POSTS, privateCookieName } from "@/lib/private-posts";
import { unlockPrivatePost } from "./actions";

export const metadata: Metadata = {
  title: "Private preview — EvalLens Newsroom",
  robots: { index: false, follow: false },
};

// Prerender a static shell per protected slug (mirrors /blog/[slug]) — the
// layout chrome needs a known pathname under `cacheComponents`; the dynamic
// cookie check stays inside the Suspense boundary below.
export function generateStaticParams() {
  return Object.keys(PRIVATE_POSTS).map((slug) => ({ slug }));
}

// With `cacheComponents`, request-time data (cookies) must be read inside a
// <Suspense> boundary or the prerender pass fails the production build. The
// page shell stays static; the gate does all the dynamic work.
export default function PrivateArticlePage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <PrivateArticleGate {...props} />
    </Suspense>
  );
}

async function PrivateArticleGate({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;

  const expected = PRIVATE_POSTS[slug];
  if (!expected) notFound();

  const jar = await cookies();
  const session = jar.get(privateCookieName(slug))?.value ?? "";
  const unlocked = session.length === expected.length && safeEqual(session, expected);

  if (!unlocked) {
    return (
      <div className="wrap blog-wrap" style={{ padding: "120px 0 160px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
          <h1 className="article-title" style={{ fontSize: "2rem" }}>
            This story is private
          </h1>
          <p className="article-dek" style={{ marginTop: 12 }}>
            Enter the password you received from the EvalLens team.
          </p>
          <form
            action={unlockPrivatePost}
            style={{ marginTop: 28, display: "grid", gap: 12 }}
          >
            <input type="hidden" name="slug" value={slug} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoFocus
              required
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.18)",
                fontSize: "1rem",
              }}
            />
            <button type="submit" className="btn btn-primary">
              Open the story
            </button>
          </form>
          {error ? (
            <p style={{ marginTop: 16, color: "#b42318" }}>
              That password didn&apos;t match. Try again.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const post = await adminGetArticle(slug);
  if (!post) notFound();

  return (
    <article className="article">
      <div className="wrap blog-wrap">
        <Link href="/blog" className="article-back">
          <span aria-hidden="true">←</span> Newsroom
        </Link>

        <header className="article-head">
          <CategoryTag
            category={post.category as Category}
            accent={post.accent as Accent}
          />
          <h1 className="article-title">{post.title}</h1>
          <p className="article-dek">{post.excerpt}</p>
          <div className="article-meta">
            <span className="article-byline">
              {post.author}
              <span className="article-byline__role">{post.role}</span>
            </span>
            <span className="article-meta__dot" aria-hidden="true">
              ·
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="article-meta__dot" aria-hidden="true">
              ·
            </span>
            <span>{post.read_minutes ?? 4} min read</span>
          </div>
        </header>
      </div>

      {post.cover ? (
        <div className="article-cover wrap blog-wrap" data-accent={post.accent}>
          <Image
            src={post.cover}
            alt=""
            width={1180}
            height={620}
            className="article-cover__img"
            priority
            sizes="(max-width: 1240px) 100vw, 1180px"
          />
        </div>
      ) : null}

      <div className="wrap blog-wrap">
        <div className="article-body">
          <MarkdownBody markdown={post.body ?? ""} />
        </div>
      </div>
    </article>
  );
}
