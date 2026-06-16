---
title: Product Overview
status: approved
version: 1
updated: 2026-06-16
route: /product/overview
section: product
nav_label: Overview
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Product Overview

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет весь рабочий процесс EvalLense в одном месте —
что делает продукт, как устроен workflow и какие модули задействованы при оценке.

> Продуктовый бриф страницы для skill `build-pages`. Факты — из Application-доков
> `ai-jury-prod` (`wiki/product/overview.md`, `user-flow.md`, `scope.md`,
> `scientific-evaluation-methodology.md`, `report.md`, `site/homepage-structure.md`).
> MVP — **Pitch Competition (P1–P6), один организатор**; Hackathon/Custom — post-MVP
> (подавать честно). Числа — с источником. Чего нет — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать EvalLense как **operating layer для структурированной
  пакетной оценки питч-деков** — не разовый AI-анализ, а сквозной workflow от сбора
  заявок до решения человека.
- **Для кого:** организаторы — VC-фонды, акселераторы, конкурсы; те, кто решает,
  стоит ли внедрять продукт, и хочет понять картину целиком.
- **Ключевое сообщение:** EvalLense собирает деки, оценивает их консистентно,
  даёт evidence-отчёты и сводит результаты в один review-процесс — а финальное
  решение остаётся за человеком.
- **Целевое действие:** Book a Demo → `/company/contact`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «The operating layer for pitch evaluation» + lens-акцент + CTA |
| 2 | Путь организатора (как работает) | pinned-multi-screen | pin | ink | 7 шагов: Login → Dashboard → Wizard → Collect → Judge → Review → Leaderboard |
| 3 | Конвейер оценки | editorial-split + scrubbed | scrub | light | Decoder → Judges → Summarizer → Scoring → Report |
| 4 | Три модуля продукта | bento | reveal | ink | Entry Hub · Evidence-Based Reports · Review Board (hero-тайл + 3) |
| 5 | AI-жюри | horizontal-gallery | scrub | light | 6 судей J-P1…J-P6, что оценивает каждый |
| 6 | Почему это важно | editorial-split | reveal | light | Меньше ручного ревью, выше консистентность, ясный decision trail |
| 7 | Что вы получаете | stat-band / bento | reveal | ink | Outputs: batch workspace, deck-level evaluations, scores, evidence, leaderboard |
| 8 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** The operating layer for structured pitch evaluation
- **Подзаголовок:** Соберите деки, оцените их консистентно, получите
  evidence-отчёты и сравните результаты в одном review-процессе. *(черновик)*
- **CTA:** Book a Demo

### 2. Путь организатора (как работает)
EvalLense ведёт организатора по **7 шагам** (из `overview.md` / `user-flow.md`),
узлы загораются по скроллу:
1. **Login / Sign Up** — email+password или Google OAuth.
2. **Dashboard** — список проектов, статусы, создание нового.
3. **Wizard (5 шагов)** — режим · детали · критерии/веса · судьи · сбор заявок.
4. **Project Overview** — сбор заявок: ручной или self-upload по ссылке.
5. **Start Judging** — запуск AI-pipeline по каждой заявке.
6. **Jury Review (Human-in-the-Loop)** — организатор ставит финальные баллы по
   измерениям, опираясь на AI-отчёт.
7. **Leaderboard** — ранжирование **по финальным баллам человека**, не по AI.

### 3. Конвейер оценки
Каждая заявка проходит фиксированный pipeline (из `scope.md` §5,
`scientific-evaluation-methodology.md`):
`Decoder → AI Judges → Summarizer → Scoring → Report`.
- **Decoder** — приводит дек (PDF/PPTX/Google Slides) к структурному slide-level
  виду через Vision.
- **AI Judges** — 6 независимых судей оценивают по P1–P6 параллельно.
- **Summarizer** — Function 1 (детерминированная математика) + Function 2
  (narrative), считает `AI Total Score` и собирает отчёт.
- **Scoring** — применяет веса критериев к human Jury Score → `Final Score`.
- **Report** — собирает explainable-отчёт по участнику.

### 4. Три модуля продукта
EvalLense — это три связанных модуля (bento, hero-тайл + 3):
- **Entry Hub** — единая точка входа: сбор заявок и pitch decks в одном месте.
- **Evidence-Based Reports** — отчёты, где scores и выводы привязаны к evidence.
- **Review Board** — рабочая доска для human review, сравнения и leaderboard.

### 5. AI-жюри
Оценку ведёт **жюри из 6 AI-судей**, каждый со своей линзой (из
`scientific-evaluation-methodology.md`), горизонтальная галерея:
- **J-P1 Problem** — боль, пользователь, срочность, альтернативы.
- **J-P2 Solution Logic** — логика продукта, дифференциация, связность.
- **J-P3 Business Value / Market** — рынок, ценность, монетизация.
- **J-P4 Pitch Quality** — ясность, нарратив, структура, подача.
- **J-P5 Team Readiness** — founder-market fit, навыки, исполнение.
- **J-P6 Feasibility** — roadmap, ресурсы, операционная реалистичность.
Судьи работают **независимо** и не видят оценок друг друга.

### 6. Почему это важно
EvalLense снижает нагрузку ручного ревью, повышает консистентность оценки и даёт
команде более ясный **decision trail** — без превращения выбора в «чёрный ящик».

### 7. Что вы получаете
После прогона организатор получает (из `overview.md`, `report.md`):
- структурированный batch-workspace;
- deck-level оценки по P1–P6 с confidence;
- judge assessments и evidence-привязку;
- strengths / weaknesses, deck completeness signals;
- leaderboard / comparison view по human Final Score.

### 8. Final CTA
- Призыв: увидеть весь workflow на своих деках.
- Кнопка: Book a Demo.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Шагов в пути организатора | 7 | overview.md / user-flow.md |
| Шагов wizard | 5 (режим · детали · критерии · судьи · сбор) | overview.md |
| Стадий pipeline | 5 (Decoder→Judges→Summarizer→Scoring→Report) | scope.md §5 |
| AI-судей | 6 (J-P1…J-P6), независимы | scientific-evaluation-methodology.md |
| Измерений оценки | 6 (P1–P6) | scientific-evaluation-methodology.md |
| Модулей продукта | 3 (Entry Hub · Reports · Review Board) | sitemap.md / overview.md |
| Шкала оценки | 0.0–10.0 (0–100 только для UI) | report.md §8.3 |
| Ранжирование | по human Final Score, не по AI | overview.md / governance-framework.md |
| Текущий режим | Pitch Competition (P1–P6) | scope.md §1 |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Поток деков сходится в линзу и выходит ranked-workspace | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра |
| flow | секция 2 | Горизонтальный трек 7 шагов, узлы загораются | те же токены, ink-поверхность, тонкие линии-узлы |
| pipeline | секция 3 | Decoder→Judges→Summarizer→Scoring→Report как линза-трек | lens-акцент на одном узле, минимализм |
| modules | секция 4 | Bento трёх модулей с иконками-сигналами | hairline-тайлы, один lens-акцент |

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `Overview` → `/product/overview` (footer-секция
  PRODUCT, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Entry Hub]] — точка входа и сбор заявок
  - [[sitemap|Evidence-Based Reports]] — что внутри отчёта
  - [[sitemap|Review Board]] — доска решений и leaderboard
  - [[sitemap|Methodology]] — научная методология оценки

## SEO / meta

- **`<title>`:** EvalLense — Product Overview: Batch Pitch Deck Evaluation
- **meta description:** Как работает EvalLense: сбор заявок в Entry Hub, оценка
  6 AI-судьями, evidence-отчёты и Review Board с leaderboard — решение остаётся
  за человеком. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — зачем продукт и в чём ценность
- [[scope|Scope]] — границы первой версии сайта
- [[sitemap|Карта сайта]] — Product: overview / entry-hub / reports / review-board
- [[design-system|Design System]] — pipeline-status, bento, horizontal-gallery, токены

### Application (`ai-jury-prod`)
- `wiki/product/overview.md` — одним абзацем, 7 шагов, wizard, модули, возможности
- `wiki/product/user-flow.md` — путь организатора по экранам
- `wiki/product/scope.md` §5 — pipeline (Decoder→Judges→Summarizer→Scoring)
- `product/website/methodology/scientific-evaluation-methodology.md` — судьи, измерения
- `wiki/product/report.md` — структура отчёта и outputs

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product/overview`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 8 секций из «Структура секций» собраны
- [ ] есть pinned-multi-screen «7 шагов» (секция 2) и horizontal-gallery судей (секция 5)
- [ ] добавлена ссылка в footer-nav (PRODUCT)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Hackathon/Custom режимы** — post-MVP; на странице не обещать как доступные.
- **Публичные цифры** (число прогонов, экономия времени) — брать только из
  утверждённых материалов; не выдумывать.
- **Tagline hero** — из утверждённых маркетинг-материалов.
- **Debug Mode** — внутренний инструмент; на публичной странице не показывать.
