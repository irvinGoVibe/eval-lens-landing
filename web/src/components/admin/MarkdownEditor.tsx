"use client";

import { useState } from "react";
import { MarkdownBody } from "@/components/article/MarkdownBody";
import { uploadArticleMediaAction } from "@/app/admin/blog/articles/actions";

/**
 * Lightweight Markdown editor: a textarea (the `body` form field) with a live
 * preview rendered by the SAME `MarkdownBody` the public article page uses, so
 * what the editor sees matches what ships. No heavyweight WYSIWYG dependency.
 *
 * Includes an inline media upload that appends a Markdown image (or `::video`
 * directive) referencing the uploaded Storage URL at the end of the body.
 */
export function MarkdownEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    const form = new FormData();
    form.set("file", file);
    const result = await uploadArticleMediaAction(form);
    setUploading(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    const snippet = file.type.startsWith("video/")
      ? `\n\n::video{src="${result.url}"}\n`
      : `\n\n![](${result.url})\n`;
    setValue((v) => v + snippet);
  }

  return (
    <div>
      <div className="admin-actions" style={{ marginBottom: 8 }}>
        <label className="admin-btn">
          {uploading ? "Загрузка…" : "Загрузить медиа"}
          <input
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={onUpload}
            disabled={uploading}
          />
        </label>
        <span className="admin-hint">
          Поддержка: ## заголовок, &gt; цитата, - список, ![](url),
          ::video&#123;src=&#125;, :::gallery
        </span>
      </div>
      {error && <p className="admin-error">{error}</p>}
      <div className="admin-md">
        <textarea
          name={name}
          className="admin-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="admin-md__preview article-body">
          <MarkdownBody markdown={value} />
        </div>
      </div>
    </div>
  );
}
