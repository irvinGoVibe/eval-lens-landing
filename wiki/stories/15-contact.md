---
status: draft
version: 0.1
updated: 2026-06-16
linear_project:
linear_parent_issue:
linear_issues:
---

# Story 15 - Contact page (/company/contact)

Status: Draft
Owner:
Team:
Priority:
Linear Mapping: Project by default

## Summary

Коротко:
- что меняем — добавляем внутреннюю Next.js-страницу `/company/contact`
  (Contact) как Apple-grade scroll-страницу по образцу `/company/about`,
  `/trust/use-cases` и `/product` (statement-hero, bento/feature-grid,
  editorial-split/full-bleed, horizontal-gallery, quiet-cta).
- зачем меняем — нужна единая точка связи: сюда приземляются все CTA «Book a
  Demo» со всего сайта, плюс прямые каналы (general/sales, careers, security,
  press), заметный блок-ссылка на **пользовательскую документацию** (на
  стороннем сайте) и лента последних новостей Newsroom.
- ожидаемый эффект — потенциальные клиенты, действующие пользователи, пресса,
  кандидаты и security-ресёрчеры получают понятный способ связаться и записаться
  на demo в один шаг; страница связывает Book a Demo, email-каналы, docs и блог.

## Problem

- Footer-колонка Company ведёт `Contact` на пустой якорь `#`; отдельной
  Contact-страницы нет.
- Все «Book a Demo» по сайту сейчас ведут на `/#demo`; нет единой точки
  приземления контакта и demo-запроса.
- Нет заметного места со ссылкой на пользовательскую документацию (на стороннем
  сайте) и прямых контакт-каналов (general/sales, careers, security, press).

## Goal

После завершения:
- страница `/company/contact` доступна, обёрнута в `SiteHeader light` +
  `Footer`, собрана по 5 секциям брифа, со scroll-driven движением через
  `ScrollFX`.
- primary CTA `Book a Demo` (`/#demo`) виден; есть вторичный email-путь.
- есть блок документации с внешней кнопкой `Open the documentation ↗`
  (`target=_blank rel=noopener`); URL — плейсхолдер до подтверждения.
- есть контакт-каналы: general/sales, careers (`careers@evallense.com`),
  security (`security@evallense.com` + ссылка `/security`), press (ссылка
  `/blog`).
- есть блок Latest news: 3 последних поста из `getAllPosts()` (ссылки на
  `/blog/<slug>`) + `All news →` (`/blog`); страница async Server Component.
- footer-nav (колонка Company) ведёт `Contact` на `/company/contact`.

## Scope

### In scope
- `web/src/app/company/contact/page.tsx` (async Server Component + metadata).
- page-scoped CSS под обёрткой `.contact …` в конце `web/src/app/globals.css`.
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Company) —
  `<a href="#">Contact</a>` → `<Link href="/company/contact">Contact</Link>`
  (только эта строка).
- story-файл `wiki/stories/15-contact.md`.

### Out of scope
- серверная контактная форма (сайт статичный — без backend); каналы — через
  `mailto:` / внешние ссылки.
- генерация реальных ассетов (используются видимые `.media-ph`).
- правки `ScrollOrchestrator` / `ScrollFX`, секций главной, других
  страниц/секций, `lib/blog`.
- header-nav (бриф: `in_header_nav: false`).
- новые токены/цвета/тени/радиусы; новые пакеты.
- глобальная замена `/#demo` → `/company/contact` по всему сайту (отдельный
  проход; см. Open Questions).

## Users / Actors

- primary user: потенциальные клиенты (фонды, акселераторы, конкурсы),
  действующие пользователи (нужна дока), пресса, кандидаты, security-ресёрчеры.
- system actor: статический рендер Next.js (страница без backend/process.env;
  `getAllPosts()` исполняется на build-time, как на `/blog`).

## Source of Truth

### Wiki
- [[wiki/product/contact.md]] — продуктовый бриф (5 секций, контакт-каналы,
  документация, Latest news, SEO) — первичный источник.
- [[wiki/architecture/page-design-patterns.md]] — архетипы, ритм, движок, QA.
- [[wiki/architecture/design-system.md]] — токены и классы.
- `web/src/app/company/about/page.tsx` — структурный эталон.
- `web/src/app/trust/use-cases/page.tsx` — образец `.seg-lane` галереи.
- `web/src/app/blog/page.tsx` — образец async `getAllPosts()` (build-time).

### Notes
- блоки `.about`/`.usecases` в `web/src/app/globals.css` — образцы; `.seg-lane`
  для горизонтальной ленты постов.

### Chat / Working Context
- Требование добавить блок-ссылку на пользовательскую документацию (на
  стороннем сайте) — из диалога с user. Батч-сборка по skill `build-pages`.

## Main Flow

1. Пользователь приходит из footer-колонки Company → `Contact` (или по любому
   «Book a Demo»).
2. Hero задаёт сообщение «Let's talk» + primary `Book a Demo` + вторичный
   «Email us».
3. Скролл проводит через 5 секций: hero (light) → способы связи (bento, light)
   → документация (editorial-split/full-bleed, dark) → Latest news
   (horizontal-gallery, light) → final CTA (dark).
4. CTA `Book a Demo` (`/#demo`); вторичные пути — `mailto:` каналы, внешний
   docs-URL, `/blog`.

## Business Rules

- Движение — только через data-атрибуты (`data-reveal` и т.п.) и смонтированный
  `<ScrollFX/>` (после `<Footer/>`). Никаких per-section `useEffect`, никаких
  правок `ScrollOrchestrator` / `ScrollFX`.
- Только канонические токены `:root` и существующие глобальные классы; без
  новых цветов/теней/радиусов, без `--wf-*` / `--sd-*`.
- Контакт-email'ы и demo/docs-URL — плейсхолдеры (см. Open Questions); реальные
  только `careers@evallense.com`, `security@evallense.com`. Не выдумывать
  конкретику сверх брифа.
- Сайт статичный: контактная форма серверная не делается; каналы — `mailto:` /
  внешние ссылки.
- Latest news: `(await getAllPosts()).slice(0,3)`; если постов нет — блок не
  ломается (показать только `Visit the Newsroom →`).
- `prefers-reduced-motion` тих: контент виден (reveal статичны).

## Edge Cases

- Нет постов в Newsroom — лента не рендерится, остаётся ссылка `Visit the
  Newsroom →` (`/blog`).
- Узкие экраны: bento-сетка каналов схлопывается в один столбец; editorial-split
  документации — в один столбец; лента `.seg-lane` остаётся горизонтальной
  внутри своего overflow-контейнера.
- Горизонтальный скролл страницы запрещён: flex/grid-дети `min-width:0`; медиа
  без фикс-ширин (`max-width:100%`); `media-ph` держит `aspect-ratio`; лента
  скроллится внутри `overflow-x:auto`; без `100vw`.

## Technical Impact

Какие зоны затрагиваются:
- frontend: новая страница (async Server Component) + page-scoped CSS +
  footer-ссылка.
- backend: нет.
- database: нет (`getAllPosts()` — build-time data, как на `/blog`).
- infrastructure: нет (статический рендер на Vercel).

## Dependencies

### Depends on
- generic scroll-FX примитивы и `ScrollFX` (Story 04).
- `.media-ph` примитив; `.seg-lane` паттерн; `SiteHeader light`, `Footer`.
- `getAllPosts()` из `@/lib/blog` (Newsroom data).

### Blocks
- глобальную замену `/#demo` → `/company/contact` по собранным страницам.
- генерацию реальных ассетов для слотов hero / docs.

## Deliverables

- `web/src/app/company/contact/page.tsx`
- CSS-блок `.contact …` в `web/src/app/globals.css`
- footer-ссылка в `web/src/components/Footer.tsx` (колонка Company)
- `wiki/stories/15-contact.md`

## Acceptance Criteria

- [ ] маршрут `/company/contact` доступен и рендерится; обёртка
      `<main className="contact">`
- [ ] страница обёрнута в `SiteHeader light` + `Footer`; `<ScrollFX/>`
      смонтирован после `<Footer/>`
- [ ] собраны ровно 5 секций из «Структура секций» брифа (последняя — Final CTA)
- [ ] primary CTA `Book a Demo` (`/#demo`) виден; есть вторичный email-путь
      («Email us», `mailto:`)
- [ ] блок документации (DARK) с внешней кнопкой `Open the documentation ↗`
      (`target=_blank rel=noopener noreferrer`, ↗-индикатор); URL — плейсхолдер
- [ ] контакт-каналы: general/sales · careers · security (ссылка `/security`)
      · press (ссылка `/blog`); careers/security — реальные email'ы
- [ ] Latest news: `(await getAllPosts()).slice(0,3)` → карточки (title + date)
      на `/blog/<slug>` + `All news →` (`/blog`); страница async Server
      Component; пусто — `Visit the Newsroom →`
- [ ] ≥1 тёмная полоса (секции 3 и 5) + ≥1 горизонтальная лента (секция 4);
      чередование light→light→ink→light→ink
- [ ] media-ph где нет ассета (hero; docs опционально); без горизонтального
      скролла страницы
- [ ] использованы только канонические токены/классы (нет `--wf-*` / `--sd-*`,
      новых цветов/теней/радиусов)
- [ ] footer-ссылка (колонка Company) `Contact` → `/company/contact`; остальные
      company-ссылки не тронуты
- [ ] движение через data-атрибуты + `ScrollFX`, без per-section `useEffect`
- [ ] `prefers-reduced-motion` тих (контент виден)
- [ ] `cd web && pnpm build` зелёный

## Linear Publish Plan

(заполняется, только если Linear подключён)

### Publish Mode
- [ ] Project + child issues
- [ ] Issues only

### Issues
- [ ]

## Definition of Done

- [ ] source logic зафиксирована в wiki (бриф)
- [ ] реализация завершена
- [ ] acceptance criteria подтверждены
- [ ] изменения отражены в relevant docs

## Open Questions

(перенесено из брифа §Открытые вопросы)
- **URL пользовательской документации** — нужен реальный адрес стороннего сайта
  (GitBook / Notion / отдельный домен?). Сейчас плейсхолдер `[user
  documentation URL]` (в коде заглушка `https://docs.evallense.com`).
- **Demo-механика на статике** — `mailto:` (`hello@`/`demo@`) или внешний
  scheduler (Calendly / Cal.com)? От этого зависит, куда ведёт primary CTA и все
  «Book a Demo» по сайту. Сейчас — `/#demo`.
- **Контактная форма** — sitemap упоминает «контактную форму»; на статике нужна
  3rd-party (Formspree/Tally/…) или backend. По умолчанию — email-каналы без
  формы; форму добавим, если согласуем сервис.
- **Email-адреса** — подтвердить `hello@evallense.com` и `press@evallense.com`
  (placeholder); реальные только `careers@`/`security@`.
- **Сроки ответа / SLA** — не обещать конкретику без подтверждения.
- **Глобальная замена `/#demo` → `/company/contact`** по всем собранным
  страницам — делать сейчас или отдельным проходом.

## Change Log

- 2026-06-16 - created
</content>
</invoke>
