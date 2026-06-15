"use client";

import { useState } from "react";
import { MarkdownBody } from "@/components/article/MarkdownBody";
import { ImageDropzone } from "./ImageDropzone";
import { uploadArticleMediaAction } from "@/app/admin/blog/articles/actions";

/**
 * Lightweight Markdown editor: a textarea (the `body` form field) with a live
 * preview rendered by the SAME `MarkdownBody` the public article page uses, so
 * what the editor sees matches what ships. No heavyweight WYSIWYG dependency.
 *
 * A drag-and-drop zone uploads media via a server action and appends a Markdown
 * image (or `::video` directive) referencing the uploaded Storage URL to the
 * body. Upload always goes through the server action — never the client.
 */
export function MarkdownEditor({
  name,
  defaultValue,
  textareaId,
}: {
  name: string;
  defaultValue: string;
  /** Id for the body textarea so an external <label htmlFor> can target it. */
  textareaId?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <ImageDropzone
          label="Drag & drop an image or video here, or"
          hint="Supported: ## heading, > quote, - list, ![](url), ::video{src=}, :::gallery"
          onUpload={async (file) => {
            const form = new FormData();
            form.set("file", file);
            const result = await uploadArticleMediaAction(form);
            if ("url" in result) {
              const snippet = file.type.startsWith("video/")
                ? `\n\n::video{src="${result.url}"}\n`
                : `\n\n![](${result.url})\n`;
              setValue((v) => v + snippet);
            }
            return result;
          }}
        />
      </div>
      <div className="admin-md">
        <textarea
          id={textareaId}
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
