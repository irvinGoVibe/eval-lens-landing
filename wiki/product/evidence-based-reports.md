---
title: Evidence-Based Reports
status: approved
version: 1
updated: 2026-06-16
route: /product/evidence-based-reports
section: product
nav_label: Evidence-Based Reports
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Evidence-Based Reports

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет главный output EvalLense — структурированные отчёты,
где scores и выводы привязаны к содержимому дека.

> Продуктовый бриф страницы для skill `build-pages`. Факты — из Application-доков
> `ai-jury-prod` (`wiki/product/report.md`, `scope.md` §5.3/§7,
> `scientific-evaluation-methodology.md`, `human-in-the-loop.md`). Подавать как
> explainable-отчёт, **без** «gap analysis / due diligence» (правило брифа).
> Чего нет — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать, что после оценки пользователь получает
  **explainable-отчёт**, а не «голый» AI-балл — каждый score объясним, важные
  выводы привязаны к evidence из дека.
- **Для кого:** review-команды, program owners, инвесткомитеты — те, кому отчёт
  нужен для ревью, shortlist и решения.
- **Ключевое сообщение:** каждый score должен быть объясним; каждый важный вывод —
  связан с evidence из питч-дека. EvalLense выдаёт не число, а обоснование.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  View Sample Report (когда появится).

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Every score, explained» + lens-акцент + CTA |
| 2 | Почему обычного AI-балла мало | full-bleed-statement | reveal | ink | Балл без обоснования трудно доверять |
| 3 | Анатомия отчёта | horizontal-gallery | scrub | light | Project Summary · AI Score Report · Questions · evidence · breakdown |
| 4 | Как считается score | editorial-split + scrubbed | scrub | ink | Формула A(d), confidence-веса, AI Total Score; advisory |
| 5 | Привязка к evidence | editorial-split | reveal | light | SourceRefs (слайд + цитата), deck completeness (10 секций) |
| 6 | Где используется отчёт | feature-grid | reveal | light | Reviewer prep · shortlist · founder feedback · IC prep |
| 7 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** Every score, explained — back to the deck
- **Подзаголовок:** Получайте структурированные отчёты, которые объясняют, как
  оценён каждый стартап и какое evidence стоит за результатом. *(черновик)*
- **CTA:** Book a Demo

### 2. Почему обычного AI-балла мало
Один тезис на тёмном экране: **score без обоснования трудно доверять.** Команде
нужно понимать, *почему* дек встал высоко или низко; фаундерам — структурный
feedback; program owner'у — decision trail. Голый балл этого не даёт.

### 3. Анатомия отчёта
Отчёт по участнику — это несколько слоёв (из `report.md`), горизонтальная галерея:
- **Project Summary** — `consolidatedSummary`, `AI Total Score`, P1–P6 overview,
  `why can pass` / `why can fail` / `what must be confirmed live`, strengths/weaknesses.
- **AI Score Report** — methodology, initial criteria, AI Score Formation,
  short judge conclusions, **Judge Contribution Matrix**, P1–P6 detailed breakdown.
- **Questions for Participants** — сгенерированные вопросы для live Q&A
  (critical / important / optional), привязанные к P1–P6.
- **Dimension scores**, **judge assessments**, **evidence references**.

### 4. Как считается score
Score считается **детерминированно** (Summarizer Function 1, без LLM —
из `report.md` §8, `scope.md` §5.3):
- per-dimension `R(d)` — взвешенный средний score судей;
- `AI Criterion Score = R(d) · [1 − 0.15·(1 − C(d))]` (штраф за низкую confidence
  ≤ 15%);
- `AI Total Score = Σ AI Criterion Score · Criterion Weight`;
- шкала **0.0–10.0** (0–100 — только UI-визуализация);
- `AI Total Score` — **advisory**: финальный rank строится по human `Jury Score`.
- **Judge Contribution Matrix** показывает роли судей (Primary / Secondary /
  Advisory) по P1–P6 и подсвечивает сильные расхождения.

### 5. Привязка к evidence
Explainability — сквозной слой (из `report.md` §7, §9):
- **SourceRefs** — каждое AI-утверждение прослеживается до слайда (`slide number`,
  `slide title`, `note`): «what supports score» / «what reduces score».
- **Deck completeness signals** — показывают, какой из **10 ключевых блоков**
  (problem · solution · market · business model · traction · team · roadmap ·
  financials · ask · other) отсутствует или раскрыт слабо, с severity
  `info / warning / critical`. Это **не** Truth Check — сигнал о пробеле, не вердикт.

### 6. Где используется отчёт
Один формат отчёта работает на весь процесс (из `report.md` §1, raw-брифа):
- подготовка внутреннего ревьюера;
- обсуждение shortlist;
- структурный feedback фаундеру;
- подготовка инвесткомитета / program selection;
- архив batch'а после события.

### 7. Final CTA
- Призыв: увидеть реальный отчёт на своём деке.
- Кнопка: Book a Demo.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Слоёв отчёта | Project Summary · AI Score Report · Questions | report.md §4 |
| Блоков AI Score Report | 6 (methodology · criteria · formation · conclusions · matrix · breakdown) | report.md §8 |
| Измерений в breakdown | 6 (P1–P6) | report.md §8.6 |
| Формула AI Criterion Score | A(d)=R(d)·[1−0.15·(1−C(d))] | report.md §8.1 |
| Шкала | 0.0–10.0 (0–100 только UI) | report.md §8.3 |
| Deck-completeness секций | 10 (problem…other), severity info/warning/critical | report.md §7 |
| Роли судьи в матрице | Primary / Secondary / Advisory | report.md §8.5 |
| Статус AI Total Score | advisory (rank по human Jury Score) | report.md §8.1 |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Балл, от которого тянутся линии-цитаты к слайдам дека | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm |
| anatomy | секция 3 | Галерея карточек: score+confidence ring, evidence quote, breakdown bars, matrix, completeness | реалистичные UI-карточки, hairline-рамки, один lens-акцент |
| evidence | секция 5 | Цитата со слайда с page-ref + 10 секций completeness | те же токены, тонкие линии-связи слайд↔вывод |

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `Evidence-Based Reports` →
  `/product/evidence-based-reports` (footer-секция PRODUCT, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Methodology]] — как устроена оценка и scoring model
  - [[sitemap|Review Board]] — как отчёты сравниваются и ведут к решению
  - [[sitemap|Consistency & Reliability]] — почему score устойчив

## SEO / meta

- **`<title>`:** EvalLense — Evidence-Based Reports for Pitch Evaluation
- **meta description:** Explainable-отчёты EvalLense: scores по P1–P6 с
  обоснованием, judge-матрица, привязка к слайдам дека и deck-completeness — не
  «чёрный ящик», а проверяемый вывод. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — explainable-отчёты как ценность
- [[sitemap|Карта сайта]] — Evidence-Based Reports (score linked to evidence)
- [[design-system|Design System]] — horizontal-gallery, report-panel, score+ring

### Application (`ai-jury-prod`)
- `wiki/product/report.md` — слои отчёта, AI Score Report, SourceRefs, completeness
- `wiki/product/scope.md` §5.3 / §7 — Summarizer F1/F2, формула, Report AC
- `product/website/methodology/scientific-evaluation-methodology.md` — что выдаёт судья
- `wiki/product/human-in-the-loop.md` — advisory AI vs human Jury Score

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product/evidence-based-reports`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 7 секций из «Структура секций» собраны
- [ ] есть тёмный full-bleed statement (секция 2) и horizontal-gallery анатомии (секция 3)
- [ ] добавлена ссылка в footer-nav (PRODUCT)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **SourceRefs в UI** — в Application данные собираются, но в UI пока не
  отображаются (report.md §9); не обещать как готовую фичу — формулировать как
  «привязка к слайдам», решение об отображении после production-теста.
- **Export отчёта (PDF)** — post-MVP (report.md §14); raw-бриф упоминает
  «exportable report» — подавать как «shareable для внутреннего ревью», export —
  в открытые вопросы.
- **View Sample Report** — нужен реальный пример/маршрут; пока CTA вторичный.
- **Не называть** «gap analysis / due diligence» (правило raw-брифа).
