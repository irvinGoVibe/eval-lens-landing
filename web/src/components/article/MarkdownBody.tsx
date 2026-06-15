// Public article body renderer (Story 02): Markdown source -> the existing
// `.article-*` typography, plus an allowlist of directives.
//
// - `react-markdown` + `remark-gfm` for the Markdown itself.
// - `remark-directive` + the local `remarkArticleDirectives` plugin below turn
//   `::video{src= poster=}` and `:::gallery ... :::` into custom elements that
//   the `components` map renders as <ArticleVideo> / <ArticleGallery>.
// - Raw HTML is OFF: no `rehype-raw`, no `allowDangerousHtml`. Anything that
//   isn't supported Markdown or an allowlisted directive renders as text, never
//   as executable HTML (no XSS surface).

import Markdown, { type Components } from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { ArticleGallery } from "./ArticleGallery";
import { ArticleVideo } from "./ArticleVideo";

// Minimal local node shape — avoids depending on `unified`/`unist` type
// packages (not installed) while keeping the directive transform typed.
interface MdNode {
  type: string;
  name?: string;
  url?: string;
  attributes?: Record<string, string | null | undefined>;
  children?: MdNode[];
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
}

/** Collect every image `url` inside a directive's subtree (for `:::gallery`). */
function collectImageUrls(node: MdNode): string[] {
  const urls: string[] = [];
  // `visit` accepts any unist tree; cast through unknown for our local shape.
  visit(node as never, "image", (img: MdNode) => {
    if (typeof img.url === "string" && img.url) urls.push(img.url);
  });
  return urls;
}

/**
 * Map the allowlisted directives onto custom hast element names. Unknown
 * directives are left untouched (they degrade to their textual content).
 */
function remarkArticleDirectives() {
  return (tree: MdNode) => {
    visit(tree as never, (node: MdNode) => {
      const directive = node;
    if (
      directive.type !== "textDirective" &&
      directive.type !== "leafDirective" &&
      directive.type !== "containerDirective"
    ) {
      return;
    }

    if (directive.name === "video") {
      const attrs = directive.attributes ?? {};
      const data = directive.data ?? (directive.data = {});
      data.hName = "article-video";
      data.hProperties = {
        "data-src": attrs.src ?? "",
        "data-poster": attrs.poster ?? "",
      };
      // Drop directive children so no stray text renders inside the element.
      directive.children = [];
    } else if (directive.name === "gallery") {
      const photos = collectImageUrls(directive);
      const data = directive.data ?? (directive.data = {});
      data.hName = "article-gallery";
      data.hProperties = { "data-photos": JSON.stringify(photos) };
      directive.children = [];
    }
    });
  };
}

// Type-loose wrappers: react-markdown hands custom elements their hast props
// (including the `data-*` attributes we set above) as plain string props.
type CustomProps = { "data-src"?: string; "data-poster"?: string; "data-photos"?: string };

function ArticleVideoNode(props: CustomProps) {
  return (
    <ArticleVideo
      src={props["data-src"] ?? ""}
      poster={props["data-poster"] || undefined}
    />
  );
}

function ArticleGalleryNode(props: CustomProps) {
  let photos: string[] = [];
  try {
    photos = JSON.parse(props["data-photos"] ?? "[]") as string[];
  } catch {
    photos = [];
  }
  return <ArticleGallery photos={photos} />;
}

// The custom directive element names (`article-video`, `article-gallery`) are
// not part of the `Components` key union, so the object is assembled untyped
// and cast — react-markdown still passes each custom element its hast props.
const components = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="article-h2">{children}</h2>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="article-p">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="article-list">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ul className="article-list">{children}</ul>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="article-quote">{children}</blockquote>
  ),
  "article-video": ArticleVideoNode,
  "article-gallery": ArticleGalleryNode,
} as unknown as Components;

export function MarkdownBody({ markdown }: { markdown: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkDirective, remarkArticleDirectives]}
      components={components}
    >
      {markdown}
    </Markdown>
  );
}
