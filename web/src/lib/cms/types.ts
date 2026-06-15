// EvalLense Newsroom — shared editorial content model.
//
// These types are the single source of truth for the blog domain model.
// They were extracted from `lib/blog.ts` so the CMS data layer (`client.ts`,
// `map.ts`) and the thin facade (`lib/blog.ts`) reference one definition.

export type Category = "Press Release" | "Product" | "Research";

/** Accent tint used for the category tag + hover treatments. */
export type Accent = "violet" | "cyan" | "aqua" | "orange";

/**
 * @deprecated The structured block model was replaced by a Markdown `body`
 * string in Story 02 (see `Post.body`). The type is kept only so any lingering
 * type-only re-export does not break; no runtime value is shaped like this
 * anymore. Remove once no consumer imports it.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export interface Post {
  slug: string;
  category: Category;
  accent: Accent;
  title: string;
  /** One-sentence dek shown on cards and at the top of the article. */
  excerpt: string;
  /** ISO date — drives ordering and the human-readable stamp. */
  date: string;
  readMinutes: number;
  /** Public media URL (Supabase Storage). */
  cover: string;
  author: string;
  role: string;
  /**
   * Article body as a Markdown source string (Story 02). Rendered by the
   * public article page through `react-markdown` (+ `remark-gfm`,
   * `remark-directive`) mapped onto the `.article-*` classes; raw HTML is off.
   */
  body: string;
}

/** "In the Loop" supports two repost formats (à la Apple Newsroom):
 *  - video: a vertical clip (dark card, plays on hover, popup player)
 *  - photo: a photo / gallery post (light card, zooms on hover, popup viewer) */
export type LoopKind = "video" | "photo";

/**
 * A reposted social item shown in the "In the Loop" rail and opened in a
 * popup on click. All media paths are public Storage URLs; `href` is the
 * original social post.
 */
export interface LoopPost {
  id: string;
  kind: LoopKind;
  author: string;
  /** Initials shown in the gradient avatar (e.g. "EL"). */
  initials: string;
  accent: Accent;
  caption: string;
  /** Poster frame (video) or main image (photo). */
  cover: string;
  /** Clip URL — required for `kind: "video"`. */
  video?: string;
  /** Gallery images for `kind: "photo"` (includes the cover); 2+ → gallery. */
  photos?: string[];
  /** ISO date — shown as "June 8, 2026" on the card. */
  date: string;
  /** Original social post. */
  href: string;
}
