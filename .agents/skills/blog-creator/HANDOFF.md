# EvalLense blog-creator — handoff (продолжение в новой сессии)

Версия: blog-creator v1.0.0 · создан 2026-06-17 · язык работы: русский.

## Что это
Скилл создаёт и переписывает статьи блога EvalLense (Newsroom) — брифы
`eval-lens-landing/wiki/product/site/blog/<slug>.md`. Единый голос автора —
`Anonymous Unicorn`; качество обеспечивает пул экспертных персон-линз.

## Два слоя персон
- **Слой A — голос автора.** Единый автор `Anonymous Unicorn` — СОСТАВНАЯ персона.
  Канон в wiki (бренд/контент-слой, НЕ в технических docs):
  `wiki/product/site/blog/_voice-anonymous-unicorn.md`. Формула долей: Jason Fried
  30% · Lenny Rachitsky 25% · Packy McCormick 20% · Paul Graham 15% · April Dunford
  10%; Jason Lemkin — отдельный SaaS knowledge layer (фактура ARR/NRR/CAC/churn),
  не голос. Моделируем НАБОР ПРИЁМОВ, не имитируем конкретного живого автора.
  Документ собран по веб-research реальных текстов авторов (приёмы, обороты,
  use/avoid), + повторяемая структура статьи и 4 режима контента.
- **Слой B — линзы качества** (`references/personas.md`): ведущая **Lens 0 — JTBD
  Brief Architect** (создаёт ПЛАН: зачем статья, цель, ОДНА главная мысль,
  сторителлинг/режим, бюджет визуала, факты к проверке — под план подбираются
  остальные), затем 7 линз из набора **Marketing Skills** (`marketingskills-main.zip`)
  + **humanizer**: Content Strategist · Conversion Copywriter · Product Marketer ·
  Marketing Psychologist · AEO/GEO Editor · Structural Copy Editor · Humanizer.
  **Работают В КОМБИНАЦИИ** — текст проходит через все 7 последовательно, ни одну
  не пропускаем.

## Состав скилла
- `SKILL.md` — flow: вход (тема=CREATE / slug=REWRITE) + выбор режима контента →
  факты из источников правды → комбинированный прогон линз 1–7 → сведение к голосу
  Unicorn → сборка брифа → запись → отчёт.
- `references/personas.md` — 7 линз качества + привязка к режимам.
- `references/article-format.md` — frontmatter по `cms/types.ts`
  (Category: Research|Product|Press Release; Accent: cyan|violet|aqua|orange),
  структура тела, медиа-слоты.
- `references/visuals.md` — проектирование визуала: **V0 — бюджет (сколько
  визуалов под объём статьи)**, затем для каждого слота (cover/inline/диаграмма/
  таблица/UI-мокап) **3 варианта на выбор** с готовым промптом в фирменном стиле
  (lens-градиент, бел/чёрн фон), разметкой таблицы или описанием интерфейса; пути
  `/assets/blog/<short>/<slot>`.
- `evals/evals.json` — 7 тест-кейсов (create, rewrite, роудмеп, голос+режим,
  визуал 3-варианта, отказ от гиперболы, JTBD-план).

## Flow (8 шагов)
0 контекст+голос · 1 вход+режим работы · **2 ПЛАН (JTBD, ведущий)** · 3 факты ·
4 прогон 7 линз под план · 5 бриф · 6 визуал (бюджет+3 варианта) · 7 запись ·
8 отчёт.

## Запись результата (Шаг 7)
- 7a — рабочий бриф в wiki: REWRITE → `wiki/product/site/blog/<slug>_new.md`
  (оригинал не трогаем); CREATE → `wiki/product/site/blog/<slug>.md`.
- 7b — **финальная доставка в репо**: публикационная версия (с frontmatter и
  :::gallery-слотами) → `eval-lens-landing/notes/blog/<slug>.md`, имя файла = slug.
  Это «куда складываются все статьи блога».

## Режимы контента (mode → доминирующее влияние голоса)
- Startup observation → Paul Graham + Jason Fried
- Practical playbook → Lenny + April Dunford
- SaaS teardown → Jason Lemkin (факты) + Fried (голос)
- Future narrative → Packy + Paul Graham

## Источники правды (не выдумывать факты)
- Продукт: `…/AI_JURI/AI Juri new /ai-jury-prod` (вход `PROJECT-ENTRYPOINT.md`;
  в пути пробелы — кавычки; `.env` не читать).
- Сайт/нарратив: `eval-lens-landing/wiki/` (`architecture/blog.md`,
  `product/*.md`, существующие статьи), `.agents/product-marketing.md`.

## Инварианты (не нарушать)
- Имя продукта — **EvalLense** (AI Jury — только origin story).
- **human-in-the-loop**: AI готовит анализ — решает человек. Нет «AI решает».
- Подпись — **Anonymous Unicorn**; `status: draft`.
- Trust: **1,000+ runs**; фича — **Truth Check** (не Trust Check); роудмеп прямо.
- CTA: Book a demo / Try live demo. Tone: Apple-минимализм, антислоп обязателен.
- REWRITE пишет `<slug>_new.md`, оригинал не трогаем.

## Размещение
Реальные файлы — `eval-lens-landing/.claude/skills/blog-creator/`.
Симлинк для корня проекта — `.claude/skills/blog-creator` →
`../../eval-lens-landing/.claude/skills/blog-creator` (как у `evallense-site`).

## Как продолжить
«/blog-creator напиши статью про X» или «перепиши статью <slug>». Скилл сам
подтянет product-marketing.md, personas.md и article-format.md.

## Открытые вопросы (для фаундера)
- Подтвердить медиа-пайплайн (кто/как генерит cover и inline по конвенции путей).
- Источник правды по роудмепу (Hackathon judge / Truth Check) — финальные формулировки.
- Нужны ли категории кроме Research/Product/Press Release.
