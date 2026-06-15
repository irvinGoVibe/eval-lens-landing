/**
 * In-article video, rendered from a `::video{src= poster=}` Markdown directive
 * (see `MarkdownBody`). Server-renderable — no client interactivity beyond the
 * native <video> controls.
 */
export function ArticleVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  if (!src) return null;
  return (
    <div className="article-video">
      <video
        className="article-video__el"
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
      />
    </div>
  );
}
