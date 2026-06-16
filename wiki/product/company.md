---
title: Company
status: generated
version: 1.0
updated: 2026-06-16
route: /company
section: company
nav_label: Company
in_header_nav: true
in_footer_nav: false
cta: Book a Demo
---

# Company

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Разводящая страница раздела **Company**: открыл — и сразу понял, кто стоит за
EvalLense и как связаться, и за один клик попал на любую страницу раздела
(About, Newsroom, Careers, Contact).

> Это **продуктовый бриф страницы** — первичный источник для skill `build-pages`.
> Главная задача страницы — **wayfinding**: коротко представить компанию и развести
> по внутренним страницам. Факты — из [[sitemap|Карты сайта]] §Company и
> [[about|About]]. Чего нет — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** точка входа в раздел Company. Одним экраном дать понять, кто
  и зачем строит EvalLense, и развести по страницам About / Newsroom / Careers /
  Contact.
- **Для кого:** организаторы, партнёры, пресса, кандидаты — все, кому нужна
  корпоративная информация или контакт.
- **Ключевое сообщение:** за EvalLense стоит команда с ясной миссией —
  сделать оценку стартапов структурной, объяснимой и управляемой человеком.
- **Целевое действие:** Book a Demo / Contact → `/company/contact`; вторично —
  переход на About, Newsroom или Careers.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «The team behind EvalLense» + lens-акцент + CTA |
| 2 | Миссия одной строкой | full-bleed-statement | reveal | ink | Зачем существует продукт (из About) |
| 3 | Карта раздела | bento | reveal | light | 4 тайла-ссылки: About · Newsroom · Careers (soon) · Contact |
| 4 | Как с нами связаться | editorial-split | reveal | light | Demo request / общий контакт → ведёт на Contact |
| 5 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** The team behind EvalLense
- **Подзаголовок:** Кто строит продукт, что нового и как связаться — раздел
  Company в одном месте. *(черновик)*
- **CTA:** Book a Demo

### 2. Миссия одной строкой
EvalLense строят, чтобы сделать **оценку стартапов более структурной, объяснимой
и управляемой человеком** — без превращения решения в «чёрный ящик».
*(финальная формулировка — из [[about|About]].)*

### 3. Карта раздела
Четыре тайла-ссылки (bento). Каждый — название, одна строка сути, переход:
- **About** → `/company/about` — кто мы, зачем строим EvalLense, продуктовая
  миссия.
- **Newsroom** → `/blog` — новости, обновления и публичные анонсы. *(сейчас
  Newsroom живёт на `/blog`.)*
- **Careers** → `/company/careers` — вакансии и будущие роли. *(скоро — пометить
  как «coming soon», если страница ещё не готова.)*
- **Contact** → `/company/contact` — контактная форма, demo request, общий контакт.

### 4. Как с нами связаться
Короткий блок: demo request и общий контакт ведут на [[contact|Contact]].
Главный путь действия со страницы — Book a Demo.

### 5. Final CTA
- Призыв: поговорить о пилоте на ваших деках.
- Кнопка: Book a Demo.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Внутренних страниц раздела | 4 (About · Newsroom · Careers · Contact) | sitemap.md §Company |
| Готовность Careers | post-MVP («soon») | sitemap.md §P0 / sitemap (status) |
| Newsroom-маршрут | сейчас `/blog` | sitemap.md §Company (href) |

> Никаких выдуманных корпоративных цифр (размер команды, год основания) — только
> из утверждённых материалов [[about|About]].

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Спокойный корпоративный образ-линза, без лиц-стоков | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm |
| map | секция 3 | Bento четырёх company-страниц, один lens-акцент | hairline-тайлы, ink/light, минимализм |

## Внутренние ссылки

- **Header nav:** пункт `Company` → `/company` (top-level раздел; `sectionHref`
  внутренних company-страниц указывает сюда). См. [[sitemap|Карта сайта]] §Header.
  Допустим короткий вариант хедера без «Company» — тогда раздел доступен из футера.
- **Cross-links со страницы (карта раздела):**
  - [[about|About]] → `/company/about`
  - [[newsroom|Newsroom]] → `/blog`
  - [[careers|Careers]] → `/company/careers` *(soon)*
  - [[contact|Contact]] → `/company/contact`

## SEO / meta

- **`<title>`:** EvalLense — Company: Team, Newsroom & Contact
- **meta description:** Кто строит EvalLense и как связаться: About, Newsroom,
  Careers и Contact — выберите страницу раздела Company. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[sitemap|Карта сайта]] §Company — состав раздела и «что раскрывает» каждая страница
- [[about|About]] — миссия и позиционирование компании
- [[contact|Contact]] / [[newsroom|Newsroom]] — куда ведёт карта раздела
- [[design-system|Design System]] — bento, editorial-split, токены
- [[page-design-patterns|Page Design Patterns]] — архетипы и ритм

### Notes / Chat
- Запрос на разводящие страницы Product / Trust / Company (этот диалог, 2026-06-16).

## Acceptance (что считать готовым)

- [ ] страница доступна по `/company`, обёрнута в `SiteHeader` + `Footer`
- [ ] карта раздела ведёт на About, Newsroom (`/blog`), Careers, Contact; ссылки рабочие
- [ ] Careers помечен «soon», если страница ещё не готова (нет «осиротевшей» ссылки)
- [ ] `sectionHref` внутренних company-страниц указывает на `/company`
- [ ] собраны все секции из «Структура секций» (≥5 архетипов, ≥1 тёмный statement)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Newsroom-маршрут:** на сайте Newsroom = `/blog`. Решить, ведёт ли тайл на
  `/blog` или на будущий `/company/newsroom` (сейчас — `/blog`).
- **Careers готовность:** страница `status: soon`. Если её нет — тайл «coming soon»
  без перехода, либо завести страницу-заглушку.
- **Company в хедере:** sitemap допускает короткий хедер `Product · Trust · Book a
  Demo` без «Company». Подтвердить, попадает ли `/company` в header nav или только
  в футер.
- **Миссия/команда** — формулировки и любые цифры брать из [[about|About]].
