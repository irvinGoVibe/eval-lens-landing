import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/LanSafeLink";
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
import { SITE_URL } from "@/lib/site-url";

/**
 * Pull Q&A pairs out of a "## Common questions" markdown section so articles
 * that carry an FAQ get FAQPage JSON-LD for free. Returns [] when the section
 * is absent or holds fewer than two well-formed `**Question?** answer` pairs.
 */
function extractFaq(markdown: string): { q: string; a: string }[] {
  const section = markdown.match(/^## Common questions\s*$([\s\S]*?)(?=^## |\n*$(?![\s\S]))/m);
  if (!section) return [];
  const pairs: { q: string; a: string }[] = [];
  const re = /\*\*(.+?\?)\*\*\s*([\s\S]+?)(?=\n\s*\n\*\*|\s*$)/g;
  for (const m of section[1].matchAll(re)) {
    const strip = (s: string) =>
      s
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    const q = strip(m[1]);
    const a = strip(m[2]);
    if (q && a) pairs.push({ q, a });
  }
  return pairs.length >= 2 ? pairs : [];
}

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
  if (!post) return { title: "Story not found — EvalLens Newsroom" };

  return {
    title: `${post.title} — EvalLens Newsroom`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.cover }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
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

  // Article JSON-LD — every field already lives on the post record.
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const coverAbs = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${SITE_URL}${post.cover}`
    : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: coverAbs ? [coverAbs] : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    url: articleUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "EvalLens",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/icon-512.png` },
    },
  };

  const faq = extractFaq(post.body);
  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }
      : null;

  return (
    <article className="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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

      {/* Page-local: in-article :::gallery visuals used to break out to the full
          viewport (width:100vw), which on wide screens rendered a huge slab far
          bigger than the article's own cover. Cap them at the cover's width and
          give them the same rounded frame, so every image on the page reads at
          one scale. Shared globals untouched. */}
      <style>{`
        .article-gallery{
          --gal-w: min(var(--maxw), calc(100vw - var(--gutter) * 2));
          width: var(--gal-w);
          margin-left: calc(50% - var(--gal-w) / 2);
          margin-right: calc(50% - var(--gal-w) / 2);
        }
        .article-gallery__photo{
          max-height: none;
          border: 1px solid var(--border-2);
          border-block: 1px solid var(--border-2);
          border-radius: var(--radius-stage);
        }
      `}</style>
      <div className="article-cover wrap blog-wrap" data-accent={post.accent}>
        <Image
          src={post.cover}
          alt={`${post.title} — article cover`}
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
