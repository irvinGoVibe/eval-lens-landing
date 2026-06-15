"use client";

import { MarkdownEditor } from "./MarkdownEditor";
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
  return (
    <form className="admin-form" action={action}>
      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="f-title">Заголовок</label>
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
        <label htmlFor="f-excerpt">Дек (excerpt)</label>
        <input
          id="f-excerpt"
          name="excerpt"
          className="admin-input"
          defaultValue={a?.excerpt ?? ""}
        />
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="f-category">Рубрика</label>
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
          <label htmlFor="f-date">Дата</label>
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
          <label htmlFor="f-read">Минут чтения</label>
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
          <label htmlFor="f-author">Автор</label>
          <input
            id="f-author"
            name="author"
            className="admin-input"
            defaultValue={a?.author ?? ""}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="f-role">Роль</label>
          <input
            id="f-role"
            name="role"
            className="admin-input"
            defaultValue={a?.role ?? ""}
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="f-cover">Обложка (URL)</label>
        <input
          id="f-cover"
          name="cover"
          className="admin-input"
          defaultValue={a?.cover ?? ""}
          placeholder="https://…/media/bento/cover.png"
        />
        <span className="admin-hint">Или загрузите файл обложки:</span>
        <input id="f-coverFile" name="coverFile" type="file" accept="image/*" />
      </div>

      <div className="admin-field">
        <label>Тело (Markdown)</label>
        <MarkdownEditor name="body" defaultValue={a?.body ?? ""} />
      </div>

      <div className="admin-field" style={{ maxWidth: 220 }}>
        <label htmlFor="f-status">Статус</label>
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

      <div className="admin-actions">
        <button type="submit" className="admin-btn admin-btn--primary">
          Сохранить
        </button>
      </div>
    </form>
  );
}
