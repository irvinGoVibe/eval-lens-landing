"use client";

import type { AdminLoopPost } from "@/lib/cms/admin-queries";

const ACCENTS = ["violet", "cyan", "aqua", "orange"];

export function LoopForm({
  action,
  post,
}: {
  action: (formData: FormData) => void | Promise<void>;
  post?: AdminLoopPost | null;
}) {
  const p = post ?? null;
  const editing = Boolean(p);
  return (
    <form className="admin-form" action={action}>
      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="l-id">ID</label>
          <input
            id="l-id"
            name="id"
            className="admin-input"
            defaultValue={p?.id ?? ""}
            required
            readOnly={editing}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="l-kind">Тип</label>
          <select
            id="l-kind"
            name="kind"
            className="admin-select"
            defaultValue={p?.kind ?? "photo"}
          >
            <option value="photo">photo</option>
            <option value="video">video</option>
          </select>
        </div>
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="l-author">Автор</label>
          <input
            id="l-author"
            name="author"
            className="admin-input"
            defaultValue={p?.author ?? ""}
          />
        </div>
        <div className="admin-field">
          <label htmlFor="l-initials">Инициалы</label>
          <input
            id="l-initials"
            name="initials"
            className="admin-input"
            defaultValue={p?.initials ?? ""}
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="l-caption">Подпись</label>
        <input
          id="l-caption"
          name="caption"
          className="admin-input"
          defaultValue={p?.caption ?? ""}
        />
      </div>

      <div className="admin-row">
        <div className="admin-field">
          <label htmlFor="l-accent">Accent</label>
          <select
            id="l-accent"
            name="accent"
            className="admin-select"
            defaultValue={p?.accent ?? ACCENTS[0]}
          >
            {ACCENTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="l-date">Дата</label>
          <input
            id="l-date"
            name="date"
            type="date"
            className="admin-input"
            defaultValue={p?.date ?? ""}
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="l-cover">Обложка (URL)</label>
        <input
          id="l-cover"
          name="cover"
          className="admin-input"
          defaultValue={p?.cover ?? ""}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="l-video">Видео (URL, для type=video)</label>
        <input
          id="l-video"
          name="video"
          className="admin-input"
          defaultValue={p?.video ?? ""}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="l-photos">Фото галереи (по одному URL на строку)</label>
        <textarea
          id="l-photos"
          name="photos"
          className="admin-textarea"
          style={{ minHeight: 120 }}
          defaultValue={(p?.photos ?? []).join("\n")}
        />
      </div>

      <div className="admin-field">
        <label htmlFor="l-href">Ссылка на исходный пост</label>
        <input
          id="l-href"
          name="href"
          className="admin-input"
          defaultValue={p?.href ?? ""}
        />
      </div>

      <div className="admin-field" style={{ maxWidth: 220 }}>
        <label htmlFor="l-status">Статус</label>
        <select
          id="l-status"
          name="status"
          className="admin-select"
          defaultValue={p?.status ?? "draft"}
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
