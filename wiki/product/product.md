---
title: Product
status: generated
version: 1.0
updated: 2026-06-16
route: /product
section: product
nav_label: Product
in_header_nav: true
in_footer_nav: false
cta: Book a Demo
---

# Product

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Разводящая страница раздела **Product**: открыл — и сразу понял, что умеет
EvalLense, и за один клик попал на любую внутреннюю страницу раздела
(Overview, Entry Hub, Evidence-Based Reports, Review Board).

> Это **продуктовый бриф страницы** — первичный источник для skill `build-pages`.
> Главная задача страницы — **wayfinding**: коротко объяснить раздел и развести по
> внутренним страницам, а не дублировать их контент. Глубокий разбор workflow живёт
> на [[overview|Product Overview]] (`/product/overview`). Факты — из [[sitemap|Карты сайта]]
> и [[overview|Overview]]. Чего нет — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** точка входа в раздел Product. Одним экраном показать, что
  EvalLense — это сквозной workflow (сбор → оценка → отчёт → решение), и развести
  посетителя по четырём внутренним страницам раздела.
- **Для кого:** организаторы — VC-фонды, акселераторы, конкурсы; те, кто пришёл из
  хедера «Product» и хочет быстро сориентироваться, что внутри.
- **Ключевое сообщение:** всё, что делает EvalLense, собрано в одном разделе —
  начни с обзора или сразу иди в нужный модуль.
- **Целевое действие:** Book a Demo → `/company/contact`; вторично — переход на
  одну из внутренних страниц раздела.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Everything EvalLense does, in one place» + lens-акцент + CTA |
| 2 | Что закрывает раздел | full-bleed-statement | reveal | ink | Одна мысль: продукт — это workflow от заявки до решения человека |
| 3 | Карта раздела | bento | reveal | light | 4 тайла-ссылки: Overview (hero-тайл) · Entry Hub · Evidence-Based Reports · Review Board |
| 4 | Как модули складываются | pinned-multi-screen | pin | ink | Entry → Judge → Report → Review; каждый шаг ведёт на свою страницу |
| 5 | С чего начать | editorial-split | reveal | light | Рекомендация: новым — Overview; знаешь продукт — сразу в модуль |
| 6 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** Everything EvalLense does, in one place
- **Подзаголовок:** Сбор заявок, оценка AI-жюри, evidence-отчёты и review-доска —
  четыре страницы раздела, один сквозной workflow. *(черновик)*
- **CTA:** Book a Demo

### 2. Что закрывает раздел
EvalLense — это **operating layer для структурированной пакетной оценки
питч-деков**: не разовый AI-анализ, а путь от сбора заявок до решения человека.
Раздел Product показывает этот путь и его модули.

### 3. Карта раздела
Четыре тайла-ссылки (bento, hero-тайл + 3). Каждый — название, одна строка сути,
переход:
- **Overview** → `/product/overview` — весь workflow EvalLense в одном месте: 7 шагов,
  pipeline, AI-жюри, что вы получаете. *(стартовая точка раздела)*
- **Entry Hub** → `/product/entry-hub` — единая точка входа: сбор заявок и pitch
  decks, self-upload по ссылке, приватный workspace.
- **Evidence-Based Reports** → `/product/evidence-based-reports` — отчёты, где
  scores и выводы привязаны к evidence из дека.
- **Review Board** → `/product/review-board` — доска human-review: сравнение,
  leaderboard, финальное решение человека.

### 4. Как модули складываются
Короткий проход по тому, как страницы раздела соединяются в один workflow
(узлы загораются по скроллу, каждый кликабелен на свою страницу):
1. **Entry Hub** — деки собраны в одном месте.
2. **AI-жюри + Reports** — каждый дек оценён 6 судьями, собран evidence-отчёт.
3. **Review Board** — организатор сравнивает, ранжирует и принимает решение.

За полным разбором каждого шага — кнопка/ссылка на [[overview|Overview]].

### 5. С чего начать
- **Впервые здесь** → начните с **Overview** — он показывает картину целиком.
- **Уже знаете продукт** → идите сразу в нужный модуль из карты раздела выше.

### 6. Final CTA
- Призыв: увидеть весь workflow на своих деках.
- Кнопка: Book a Demo.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Внутренних страниц раздела | 4 (Overview · Entry Hub · Reports · Review Board) | sitemap.md §Product |
| Модулей продукта | 3 (Entry Hub · Reports · Review Board) | sitemap.md / overview.md |
| Стадий workflow | сбор → оценка → отчёт → решение | overview.md |

> Конкретные продуктовые цифры (число судей, шагов и т.д.) живут на [[overview|Overview]];
> на разводящей странице их не дублируем, чтобы не расходились источники.

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Четыре маршрута сходятся в одну линзу-раздел | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра |
| map | секция 3 | Bento четырёх страниц с иконками-сигналами, один lens-акцент на hero-тайле | hairline-тайлы, ink/light, минимализм |

## Внутренние ссылки

- **Header nav:** пункт `Product` → `/product` (top-level раздел; `sectionHref`
  внутренних страниц раздела указывает сюда). См. [[sitemap|Карта сайта]] §Header.
- **Cross-links со страницы (карта раздела):**
  - [[overview|Product Overview]] → `/product/overview`
  - [[entry-hub|Entry Hub]] → `/product/entry-hub`
  - [[evidence-based-reports|Evidence-Based Reports]] → `/product/evidence-based-reports`
  - [[review-board|Review Board]] → `/product/review-board`

## SEO / meta

- **`<title>`:** EvalLense — Product: AI Pitch Deck Evaluation Workflow
- **meta description:** Раздел Product EvalLense: обзор workflow, Entry Hub,
  evidence-отчёты и Review Board — выберите страницу и посмотрите, как устроена
  оценка. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[sitemap|Карта сайта]] §Product — состав раздела и «что раскрывает» каждая страница
- [[overview|Product Overview]] — глубокий разбор продукта (куда ведёт карта раздела)
- [[design-system|Design System]] — bento, pinned-multi-screen, токены
- [[page-design-patterns|Page Design Patterns]] — архетипы и ритм

### Notes / Chat
- Запрос на разводящие страницы Product / Trust / Company (этот диалог, 2026-06-16).

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product`, обёрнута в `SiteHeader` + `Footer`
- [ ] карта раздела ведёт на все 4 внутренние страницы (Overview + 3 модуля), ссылки рабочие
- [ ] `sectionHref` внутренних страниц раздела указывает на `/product`
- [ ] собраны все секции из «Структура секций» (≥5 архетипов, ≥1 pinned, ≥1 тёмный statement)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Header section label vs страница:** хедер сейчас показывает «Product» как
  лейбл раздела. После появления разводящей страницы решить, кликается ли лейбл
  в `/product` (рекомендуется — да).
- **Дублирование с Overview:** держать разводящую страницу лёгкой; глубину —
  только на [[overview|Overview]]. При расхождении — править Overview, не хаб.
- **Tagline hero** — финальную формулировку взять из утверждённых маркетинг-материалов.
