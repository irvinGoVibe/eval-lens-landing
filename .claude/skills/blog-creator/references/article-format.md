# Формат статьи блога EvalLense

Канон — типы в `web/src/lib/cms/types.ts` (`Post`, `Category`, `Accent`) и две
эталонные статьи в `wiki/product/site/blog/`. Бриф статьи = YAML-frontmatter +
Markdown-тело.

---

## Frontmatter (строго по схеме `Post`)

```yaml
---
slug: how-evallense-evaluates-pitch-decks   # kebab-case, = имя файла
category: Research                           # Research | Product | Press Release
accent: cyan                                 # cyan | violet | aqua | orange
title: How EvalLense evaluates pitch decks   # statement-заголовок (паттерны copy-system)
excerpt: A look inside the methodology — how a deck becomes a structured, evidence-backed score, and why the final ranking stays yours.
date: 2026-06-15                             # YYYY-MM-DD
readMinutes: 5                               # честная оценка по объёму тела
cover: /assets/blog/how-evallense-evaluates/cover.png
author: Anonymous Unicorn                     # ВСЕГДА это значение
status: draft                                 # черновик на ревью
---
```

**Допустимые значения (не выдумывать новые):**
- `category`: `Research` · `Product` · `Press Release`.
- `accent`: `cyan` · `violet` · `aqua` · `orange` (тинт для тега категории и
  hover). Подбирай по категории/теме консистентно с существующими статьями.
- `author`: всегда `Anonymous Unicorn`.
- `status`: `draft` (публикацию решает человек).

Порядок и имена полей не менять — их читает контент-слой/сборка.

---

## Тело (Markdown)

Фирменная структура (см. эталон `how-evallense-evaluates-pitch-decks.md`):

1. **Хук** — 1–2 абзаца: конкретная проблема читателя, ставка. Без разогрева.
2. **«Короткая версия»** (опционально, но сильно работает) — компактная схема в
   ```text```-блоке (например пайплайн `Deck → Decoder → 6 judges → … → Leaderboard`)
   + одна строка-суть: «AI prepares the evaluation. You make the final decision.»
3. **Секции H2** — каждая закрывает одну под-работу читателя; statement-заголовок;
   первый абзац самодостаточен (AEO). Таблицы для перечислений (напр. P1–P6),
   списки с параллельной структурой.
4. **Медиа-слоты** по месту (см. ниже).
5. **Мост к ценности + мягкий следующий шаг** — без навязчивого CTA; основной
   CTA сайта (Book a demo) упоминается естественно, если уместно.

### Медиа-слоты (конвенция)

- Cover: `/assets/blog/<short>/cover.png` (где `<short>` — короткий ключ статьи,
  напр. `how-evallense-evaluates`, `whats-next`).
- Inline-картинки в галерее:
  ```markdown
  :::gallery
  ![](/assets/blog/<short>/pipeline.png)
  :::
  ```
- В отчёте человеку перечисли нужные визуалы — **по 3 варианта на слот** с готовым
  промптом/разметкой и путём (полный гайд — [visuals.md](visuals.md); стиль — см.
  память `evallense-page-media-slots`: lens-градиент, бел/чёрн фон).

---

## Категории и роль в Newsroom

См. `wiki/architecture/blog.md`. Newsroom = Latest News (featured + rail) +
In the Loop (репосты соцсетей, не статьи) + More from Newsroom (плитки-категории).
**Свой маршрут `/blog/<slug>` есть только у статьи (`Post`)**, не у loop-поста.

Ориентир соответствия (подтверждай по факту темы):
- `Research` — методология, как устроена оценка, что показывают данные.
- `Product` — фичи, роудмеп (подаём прямо), как пользоваться.
- `Press Release` — анонсы, партнёрства, вехи.

---

## Инварианты копии (коротко; полный канон — copy-system.md)

- Имя продукта — **EvalLense**; «AI Jury» — только origin story (/company/about).
- **human-in-the-loop**: AI scores/prepares/structures — **people decide**.
  Запрещено «AI judges/decides/verdict» в смысле «AI решает».
- Trust-сигналы: **1,000+ runs**, evidence-based, audit trail.
- **Truth Check** (не «Trust Check»).
- CTA: основной **Book a demo**, вторичный **Try live demo** — новые не вводить.
- Tone: Apple-минимализм, statement-first, data-forward, без гиперболы; антислоп
  обязателен.
