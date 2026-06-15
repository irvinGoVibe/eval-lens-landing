import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/article/MarkdownBody";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryTag } from "@/components/blog/CategoryTag";
import {
  formatDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Story not found — EvalLense Newsroom" };

  return {
    title: `${post.title} — EvalLense Newsroom`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.cover }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  return (
    <article className="article">
      <div className="wrap blog-wrap">
        <Link href="/blog" className="article-back">
          <span aria-hidden="true">←</span> Newsroom
        </Link>

        <header className="article-head">
          <CategoryTag category={post.category} accent={post.accent} />
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
            <span>{post.readMinutes} min read</span>
          </div>
        </header>
      </div>

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

      <div className="wrap blog-wrap">
        <div className="article-body">
          <MarkdownBody markdown={post.body} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="blog-section blog-section--related">
          <div className="wrap blog-wrap">
            <div className="blog-section-head">
              <h2>More from the Newsroom</h2>
              <Link href="/blog/all" className="blog-seeall">
                See all <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="blog-grid">
              {related.map((p) => (
                <ArticleCard key={p.slug} post={p} variant="grid" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
