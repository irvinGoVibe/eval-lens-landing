"use client";

import { useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { ImageDropzone } from "./ImageDropzone";
import { uploadArticleMediaAction } from "@/app/admin/blog/articles/actions";
import type { AdminArticle } from "@/lib/cms/admin-queries";

const CATEGORIES = ["Press Release", "Product", "Research"];
const ACCENTS = ["violet", "cyan", "aqua", "orange"];

export function ArticleForm({
  action,
  article,
}: {
  action: (formData: FormData) => void | Promise<void>;
  article?: AdminArticle | null;
}) {
  const a = article ?? null;
  const [cover, setCover] = useState(a?.cover ?? "");
  return (
    <form className="admin-form" action={action}>
      <section className="admin-section">
        <h2 className="admin-section__title">Details</h2>
      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="f-title">Title</label>
          <input
            id="f-title"
            name="title"
            className="admin-input"
            defaultValue={a?.title ?? ""}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="f-slug">Slug</label>
          <input
            id="f-slug"
            name="slug"
            className="admin-input"
            defaultValue={a?.slug ?? ""}
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="f-excerpt">Deck (excerpt)</label>
        <input
          id="f-excerpt"
          name="excerpt"
          className="admin-input"
          defaultValue={a?.excerpt ?? ""}
        />
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="f-category">Category</label>
          <select
            id="f-category"
            name="category"
            className="admin-select"
            defaultValue={a?.category ?? CATEGORIES[0]}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="f-accent">Accent</label>
          <select
            id="f-accent"
            name="accent"
            className="admin-select"
            defaultValue={a?.accent ?? ACCENTS[0]}
          >
            {ACCENTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="f-date">Date</label>
          <input
            id="f-date"
            name="date"
            type="date"
            className="admin-input"
            defaultValue={a?.date ?? ""}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="f-read">Read minutes</label>
          <input
            id="f-read"
            name="read_minutes"
            type="number"
            min="0"
            className="admin-input"
            defaultValue={a?.read_minutes ?? ""}
          />
        </div>
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="f-author">Author</label>
          <input
            id="f-author"
            name="author"
            className="admin-input"
            defaultValue={a?.author ?? ""}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="f-role">Role</label>
          <input
            id="f-role"
            name="role"
            className="admin-input"
            defaultValue={a?.role ?? ""}
          />
        </div>
      </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">Cover image</h2>
      <div className="admin-field">
        <label htmlFor="f-cover">Cover</label>
        <ImageDropzone
          accept="image/*"
          label="Drag & drop a cover image here, or"
          hint="Drop or choose an image — it uploads to Storage and fills the URL below."
          onUpload={async (file) => {
            const fd = new FormData();
            fd.set("file", file);
            const result = await uploadArticleMediaAction(fd);
            if ("url" in result) setCover(result.url);
            return result;
          }}
        />
        <input
          id="f-cover"
          name="cover"
          className="admin-input"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          placeholder="https://…/media/bento/cover.png"
        />
        <span className="admin-hint">Cover image URL (filled on upload, or enter manually).</span>
      </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">Content</h2>
      <div className="admin-field">
        <label htmlFor="f-body">Body (Markdown)</label>
        <MarkdownEditor name="body" defaultValue={a?.body ?? ""} textareaId="f-body" />
      </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section__title">Publish</h2>
      <div className="admin-field" style={{ maxWidth: 220 }}>
        <label htmlFor="f-status">Status</label>
        <select
          id="f-status"
          name="status"
          className="admin-select"
          defaultValue={a?.status ?? "draft"}
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </div>
      </section>

      <div className="admin-savebar">
        <button type="submit" className="admin-btn admin-btn--primary">
          Save
        </button>
      </div>
    </form>
  );
}
