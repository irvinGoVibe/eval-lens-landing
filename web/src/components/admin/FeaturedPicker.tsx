"use client";

import { useState, useTransition } from "react";
import { saveFeaturedAction } from "@/app/admin/home/featured/actions";

export interface FeaturedOption {
  slug: string;
  title: string;
  status: string;
  selected: boolean;
  position: number | null;
}

/**
 * Picks which published articles appear in the home blog block and their order.
 * Selected slugs are kept in an ordered list; up/down reorders; only published
 * articles can be selected (drafts are shown but disabled).
 */
export function FeaturedPicker({ options }: { options: FeaturedOption[] }) {
  const initial = options
    .filter((o) => o.selected)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((o) => o.slug);
  const [order, setOrder] = useState<string[]>(initial);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const bySlug = new Map(options.map((o) => [o.slug, o]));

  function toggle(slug: string) {
    setSaved(false);
    setOrder((cur) =>
      cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug],
    );
  }

  function move(slug: string, dir: 1 | -1) {
    setSaved(false);
    setOrder((cur) => {
      const i = cur.indexOf(slug);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= cur.length) return cur;
      const next = [...cur];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function save() {
    startTransition(async () => {
      await saveFeaturedAction(order);
      setSaved(true);
    });
  }

  const available = options.filter(
    (o) => o.status === "published" && !order.includes(o.slug),
  );

  return (
    <div>
      <h2 className="admin-h1" style={{ fontSize: 16 }}>
        Выбранные (в порядке показа)
      </h2>
      <div className="admin-featured">
        {order.length === 0 && (
          <p className="admin-hint">
            Пусто — на главной показываются свежие статьи по дате (фолбэк).
          </p>
        )}
        {order.map((slug, i) => {
          const o = bySlug.get(slug);
          return (
            <div key={slug} className="admin-featured__item is-on">
              <span className="admin-featured__pos">{i + 1}.</span>
              <span className="admin-featured__title">{o?.title ?? slug}</span>
              <button
                type="button"
                className="admin-btn"
                onClick={() => move(slug, -1)}
                disabled={i === 0}
                aria-label="Выше"
              >
                ↑
              </button>
              <button
                type="button"
                className="admin-btn"
                onClick={() => move(slug, 1)}
                disabled={i === order.length - 1}
                aria-label="Ниже"
              >
                ↓
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={() => toggle(slug)}
              >
                Убрать
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="admin-h1" style={{ fontSize: 16, marginTop: 24 }}>
        Доступные (published)
      </h2>
      <div className="admin-featured">
        {available.map((o) => (
          <div key={o.slug} className="admin-featured__item">
            <span className="admin-featured__title">{o.title}</span>
            <button
              type="button"
              className="admin-btn"
              onClick={() => toggle(o.slug)}
            >
              + Добавить
            </button>
          </div>
        ))}
        {available.length === 0 && (
          <p className="admin-hint">Все опубликованные статьи уже выбраны.</p>
        )}
      </div>

      <div className="admin-actions" style={{ marginTop: 20 }}>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={save}
          disabled={pending}
        >
          {pending ? "Сохранение…" : "Сохранить выбор"}
        </button>
        {saved && <span className="admin-hint">Сохранено.</span>}
      </div>
    </div>
  );
}
