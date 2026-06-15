import Image from "next/image";
import Link from "next/link";
import { CategoryTag } from "@/components/blog/CategoryTag";
import { formatDate, type Post } from "@/lib/blog";

type Variant = "feature" | "grid" | "list";

/**
 * One Newsroom story tile.
 *  - feature: large hero card (image on top, big headline)
 *  - grid:    standard card in the Latest News grid
 *  - list:    compact row used in the featured side rail (no image)
 */
export function ArticleCard({
  post,
  variant = "grid",
  priority = false,
}: {
  post: Post;
  variant?: Variant;
  priority?: boolean;
}) {
  const meta = (
    <span className="blog-card__meta">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readMinutes} min read</span>
    </span>
  );

  if (variant === "list") {
    return (
      <Link href={`/blog/${post.slug}`} className="blog-card blog-card--list">
        <CategoryTag category={post.category} accent={post.accent} />
        <h3 className="blog-card__title">{post.title}</h3>
        {meta}
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`blog-card blog-card--${variant}`}
      data-accent={post.accent}
    >
      <span className="blog-card__media">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={
            variant === "feature"
              ? "(max-width: 900px) 100vw, 60vw"
              : "(max-width: 700px) 100vw, 33vw"
          }
          className="blog-card__img"
          priority={priority}
        />
      </span>
      <span className="blog-card__body">
        <CategoryTag category={post.category} accent={post.accent} />
        <h3 className="blog-card__title">{post.title}</h3>
        {variant === "feature" && (
          <p className="blog-card__excerpt">{post.excerpt}</p>
        )}
        {meta}
      </span>
    </Link>
  );
}
