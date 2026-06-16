---
title: Contact
status: draft
version: 0.1
updated: 2026-06-16
route: /company/contact
section: company
nav_label: Contact
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Contact

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Company-страница: точка связи с EvalLense — сюда приземляются все CTA «Book a
Demo» со всего сайта, плюс прямые каналы (общий контакт, careers, security) и
**блок со ссылкой на пользовательскую документацию** (на стороннем сайте).

> Продуктовый бриф страницы для skill `build-pages`. Сайт статичный (бэкенда
> нет) → demo/контакт через email или внешний сервис, без серверной формы.
> Контакт-email'ы, demo-механика и URL документации — **плейсхолдеры**, см.
> «Открытые вопросы». Не выдумывать конкретику сверх этого.

## Роль и аудитория

- **Роль страницы:** дать понятный способ связаться и записаться на demo —
  единая точка приземления всех «Book a Demo», плюс прямой блок-ссылка на
  пользовательскую документацию (управление системой).
- **Для кого:** потенциальные клиенты (фонды, акселераторы, конкурсы), действующие
  пользователи (нужна дока), пресса, кандидаты, security-ресёрчеры.
- **Ключевое сообщение:** с нами легко связаться; demo — в один шаг; а если вы уже
  пользуетесь продуктом — документация рядом.
- **Целевое действие:** Book a Demo (primary) → demo-канал; вторичное — написать
  на общий email / открыть документацию.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Let's talk» + Book a Demo + «или напишите нам» |
| 2 | Способы связи | bento / feature-grid | reveal | light | Карточки: Book a demo · General · Careers · Security · Press |
| 3 | Документация (внешняя) | editorial-split / full-bleed | reveal | ink | «Already using EvalLense? Read the docs» + кнопка ↗ на сторонний сайт |
| 4 | Latest news | horizontal-gallery | reveal | light | Лента 3 последних постов блога + «All news →» (`/blog`) |
| 5 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** Let's talk
- **Подзаголовок:** Запишитесь на demo и увидите оценку на своих деках от начала
  до конца — или просто напишите нам. *(черновик)*
- **CTA:** Book a Demo (primary) · вторичная ссылка «Email us» → общий email.

### 2. Способы связи
Карточки-каналы (bento). Каждая — заголовок, одно предложение, email/действие:
- **Book a demo** — увидеть EvalLense на ваших деках. → demo-канал (primary).
- **General & sales** — вопросы о продукте, партнёрстве, пилоте. → `hello@evallense.com` *(placeholder)*.
- **Careers** — присоединиться к команде. → `careers@evallense.com`.
- **Security** — сообщить об уязвимости (responsible disclosure). → `security@evallense.com`, ссылка на [[sitemap|Security]] (`/security`).
- **Press & media** — публикации и анонсы. → `press@evallense.com` *(placeholder)*; ссылка на Newsroom (`/blog`).

### 3. Документация (внешняя) — ключевой запрошенный блок
Отдельный заметный блок (тёмный, чтобы выделялся):
- **Заголовок:** Already using EvalLense? Read the docs
- **Подзаголовок:** Руководства для организаторов — как настроить программу,
  запустить оценку и управлять рабочим пространством. *(черновик)*
- **Кнопка:** `Open the documentation ↗` → **внешний сайт документации**
  (`[user documentation URL]` — *placeholder*), открывать в новой вкладке
  (`target="_blank" rel="noopener noreferrer"`), с external-индикатором ↗.
- Пометка, что документация живёт на отдельном сайте.

### 4. Latest news (ссылка на блог + лента)
Блок «последние новости» со ссылкой на блог (Newsroom):
- **Заголовок:** Latest from the Newsroom *(черновик)*.
- **Лента:** **3 последних поста** блога — карточками (title + date), каждая
  ведёт на `/blog/<slug>`. Горизонтальная лента (по образцу `.seg-lane`) или
  drop-in `ArticleCard` из блога.
- **Ссылка:** `All news →` → `/blog`.
- **Данные:** `getAllPosts()` из `web/src/lib/blog.ts` (посты: `slug`, `title`,
  `date`); взять `slice(0,3)`. Страница становится **async Server Component**
  (`await getAllPosts()`) — как `web/src/app/blog/page.tsx`. Контент статический
  (build-time), без БД.
- Если постов нет — блок не ломается (показать только ссылку `Visit the Newsroom →`).

### 5. Final CTA
- Призыв: увидеть продукт в деле.
- Кнопка: Book a Demo.

## Числа и факты

На контакт-странице конкретных метрик нет. Каналы/адреса — ниже (плейсхолдеры,
кроме careers/security, которые уже используются на сайте).

| Канал | Значение | Статус |
|---|---|---|
| Careers | `careers@evallense.com` | используется (footer) |
| Security | `security@evallense.com` | используется (/security) |
| General | `hello@evallense.com` | placeholder — подтвердить |
| Press | `press@evallense.com` | placeholder — подтвердить |
| Documentation | `[user documentation URL]` | placeholder — нужен URL |
| Demo | mailto или внешний scheduler | open question |
| Соцсети | `@evallense` (TikTok / YouTube) | из `blog-static.ts` |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Линза/точка контакта — сигнал сходится к одной точке | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm |
| docs | секция 3 | Намёк на страницу документации / открытую книгу-гайд | ink-поверхность, hairline-рамка, один lens-акцент, ↗ |

Если изображения не нужны — допустимо обойтись `.media-ph` только в hero и docs.

## Внутренние ссылки

- **Header/Footer nav:** в footer-колонке COMPANY заменить заглушку `Contact`
  (`#`) на `/company/contact`. Это также целевой URL для всех «Book a Demo».
- **Cross-links со страницы:**
  - [[sitemap|Security]] (`/security`) — для security-канала
  - Newsroom (`/blog`) — для press-канала
  - [[sitemap|Product Overview]] (`/product`) — что за продукт
- **Внешняя ссылка:** документация (`[user documentation URL]`) — `target=_blank`.

## SEO / meta

- **`<title>`:** Contact EvalLense — Book a Demo & Talk to Us
- **meta description:** Свяжитесь с EvalLense: запишитесь на demo, напишите по
  общим вопросам, careers или security — и откройте пользовательскую
  документацию по управлению системой. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[sitemap|Карта сайта]] — Company → Contact («контактная форма, demo request, общий контакт»)
- [[vision|Vision]] / [[scope|Scope]] — целевое действие = demo; сайт статичный
- [[design-system|Design System]] — bento, editorial-split, cta-band, токены

### Notes / Chat
- Требование добавить **блок-ссылку на пользовательскую документацию** (на
  стороннем сайте) — из диалога с user.

## Acceptance (что считать готовым)

- [ ] страница доступна по `/company/contact`, обёрнута в `SiteHeader` + `Footer`
- [ ] primary CTA «Book a Demo» работает (demo-канал) и виден вторичный email-путь
- [ ] есть **блок документации** с внешней кнопкой `Open the documentation ↗`
      (`target=_blank rel=noopener`), на месте URL — плейсхолдер до подтверждения
- [ ] контакт-каналы: general · careers · security · press (careers/security — реальные)
- [ ] **Latest news** блок: 3 последних поста из `getAllPosts()` (ссылки на
      `/blog/<slug>`) + `All news →` (`/blog`); страница async Server Component
- [ ] footer-ссылка `Contact` → `/company/contact`; (по согласованию) `/#demo` по сайту → `/company/contact`
- [ ] только токены/классы из [[design-system|Design System]]; движение через data-атрибуты + `<ScrollFX/>`
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **URL пользовательской документации** — нужен реальный адрес стороннего сайта
  (GitBook / Notion / отдельный домен?). Сейчас `[user documentation URL]`.
- **Demo-механика на статике** — mailto (`hello@`/`demo@`) или внешний scheduler
  (Calendly / Cal.com)? От этого зависит, куда ведёт primary CTA и все «Book a
  Demo» по сайту.
- **Контактная форма** — sitemap упоминает «контактную форму»; на статике нужна
  3rd-party (Formspree/Tally/…) или backend. По умолчанию — email-каналы без
  формы; форму добавим, если согласуем сервис.
- **Email-адреса** — подтвердить `hello@` и `press@` (или заменить на реальные).
- **Сроки ответа / SLA** — не обещать конкретику без подтверждения.
- **Глобальная замена `/#demo` → `/company/contact`** по всем собранным страницам
  — делать сейчас или отдельным проходом.
