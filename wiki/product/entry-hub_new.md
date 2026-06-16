---
title: Entry Hub
status: generated
version: 1.1
updated: 2026-06-16
route: /product/entry-hub
section: product
nav_label: Entry Hub
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Entry Hub

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет, как EvalLense собирает заявки и pitch decks в одну
контролируемую точку входа вместо разрозненного intake по почте, формам и чатам.

> Продуктовый бриф страницы для skill `build-pages`. Факты сверены с источником
> правды `ai-jury-prod` (`wiki/product/scope.md` §4, `user-flow.md` §4–7,
> `overview.md`; `wiki/architecture/wizard.md` §4–§10). Раздел «Контент по
> секциям» — **финальная EN-копия, готовая к вёрстке** (антислоп-проход пройден,
> единый голос). MVP — **один организатор, Pitch Competition**. Числа — с
> источником. Чего нет / расходится — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать Entry Hub как **стартовую точку каждого batch'а** —
  одна контролируемая форма приёма заявок вместо хаоса каналов.
- **Для кого:** организаторы — VC-фонды, акселераторы, конкурсы; те, кто собирает
  поток заявок и теряет время на их сортировку до начала оценки.
- **Ключевое сообщение:** Entry Hub заменяет разрозненный intake (email, Forms,
  Airtable, Notion, Telegram, диски) одним приёмным потоком — все деки и данные
  попадают в один приватный review-workspace, готовый к оценке.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  See Product Overview → `/product/overview`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «One entry point for every batch» + lens-акцент + CTA |
| 2 | Проблема intake | full-bleed-statement | reveal | ink | Деки приходят из 5+ каналов → потери, дубли, не та работа |
| 3 | Как работает Entry Hub | pinned-multi-screen | pin | light | 6 шагов: create → set up page → publish & share → teams submit → workspace fills → start judging |
| 4 | Два способа сбора | editorial-split | reveal | ink | Manual vs Self-upload (публичная `/e/<slug>`, Google sign-in) |
| 5 | Что собирается | bento | reveal | light | Team, pitch deck (PDF/PPT/PPTX/Slides ≤50MB), note, status |
| 6 | Контроль и доступ | horizontal-gallery | reveal | ink | Publish-gate · Preview · Invite-only · Window · Link/QR · Auto-merge |
| 7 | Ценность | editorial-split | reveal | light | Единый source of truth до старта оценки + pull-quote |
| 8 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

> Поверхности по ритму light↔ink (1L·2I·3L·4I·5L·6I·7L·8I — без трёх подряд, hero
> светлый, проблема/доверие/CTA тёмные, ≥1 горизонтальная галерея). Архетипы и
> классы — из [[section-types|Section Types]] (`eh-hero`, `eh-problem`, `eh-flow`,
> `eh-modes`, `eh-collect`, новый `eh-controls` galley-лейн, `eh-value`,
> `eh-cta`). Ритм — по [[page-design-patterns|Page Design Patterns]].

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки в
> скобках. `[lens]` помечает слово/фразу под градиент-акцент.

### 1. Hero — `light`
- **Eyebrow:** Entry Hub
- **Heading (A, рекоменд.; lens на `one entry point`):** One entry point for every batch
- **Heading (B; lens на `one link`):** Collect every deck through one link
- **Heading (C; lens на `clean batch`):** Start every review from a clean batch
- **Subhead:** Open a private submission page, gather pitch decks and team details in one place, and start evaluation from a batch that's already complete.
- **CTA:** Book a Demo

### 2. Проблема intake — `ink`
- **Eyebrow:** The intake problem
- **Heading:** Decks arrive from everywhere
- **Body:** Email, Google Forms, Airtable, Notion, Telegram, shared drives. Files go missing, duplicates pile up, and the details you need sit in five different places. The work starts long before evaluation does — and it's the wrong work.

### 3. Как работает Entry Hub — `light`
- **Eyebrow:** How it works
- **Heading:** From one link to one ready batch
- **Subhead:** Set up the page once, publish it, and let entries collect themselves. Each step lights up as you scroll.
- **Steps (pinned, 6):**
  1. **Create the project** — A five-step wizard sets the details, criteria, judges, collection method, and a final review. *(Mode — Pitch Competition — is chosen before the wizard opens.)*
  2. **Set up the submission page** — Choose manual or self-upload. For self-upload, set the required deck, the deadline, an optional cap, and whether the page is open or invite-only.
  3. **Publish and share** — Publishing makes your page live at a public link. Copy the link, share a QR code, or preview the page as a participant first.
  4. **Teams submit** — Participants sign in with Google and upload their own deck. Each entry appears in your workspace automatically.
  5. **The workspace fills up** — Every entry lands in one private list with its status and completeness at a glance.
  6. **Start judging** — Launch evaluation once at least one entry is ready.

### 4. Два способа сбора — `ink`
- **Eyebrow:** Two ways to collect
- **Heading:** Add teams yourself, or let them submit
- **Subhead:** Pick the method that fits your event. Both land entries in the same workspace.
- **Split — left (Manual):**
  - **Manual** *(label)* — Add each team yourself on the project page: name, project, pitch deck, and an optional note for the jury.
- **Split — right (Self-upload):**
  - **Self-upload** *(label)* — Share one public link. Teams sign in with Google and upload their own deck — no files in your inbox, no accounts to manage on your side.

### 5. Что собирается — `light`
- **Eyebrow:** What gets collected
- **Heading:** Everything the review needs, in one record
- **Subhead:** Each entry carries the same fields, so the batch is consistent before evaluation starts.
- **Tiles:**
  - **Team and project** *(feature)* — Startup name, the founder or team, and a short description in each team's own words.
  - **Pitch deck** — PDF, PPT, PPTX, or a Google Slides link — one file per team, up to 50 MB.
  - **Note for the jury** — An optional comment each team can add for context.
  - **Submission status** — Every entry shows ready, incomplete, or submitted at a glance.

### 6. Контроль и доступ — `ink`
- **Eyebrow:** Built-in controls
- **Heading:** You decide who submits, and when
- **Subhead:** The page is private until you say otherwise, and submissions close on your terms.
- **Cards (horizontal gallery):**
  - **Publish gate** — Your page stays private until you publish it. Before that, the public link returns nothing.
  - **Preview first** — See exactly what teams will see before you go live.
  - **Open or invite-only** — Let anyone with the link submit, or restrict it to a list of emails you seed.
  - **Submission window** — Entries open on your start date and close at the deadline — or the moment you start judging.
  - **Link, QR, and share** — Copy the link, share a QR code, or post it to Telegram or X in one click.
  - **Auto-linked invites** — Pre-add a team by email; when they sign in with the same Google account, their entry links up on its own.

### 7. Ценность — `light`
- **Eyebrow:** Why it matters
- **Heading:** One clean batch before evaluation starts
- **Subhead:** Every deck and every detail your review needs, in one private workspace — not scattered across inboxes, forms, and drives. When you start judging, the batch is already complete and consistent.
- **Pull-quote (right):** Collect once, in one place. From there, EvalLense prepares the analysis — and the final call is always yours.
- **Quote tag:** Pitch Competition · one organizer

### 8. Final CTA — `ink`
- **Eyebrow:** Get started
- **Heading:** See your intake flow on your own event
- **Subhead:** Book a demo and watch one link turn a flood of decks into a clean, ready-to-judge batch.
- **CTA:** Book a Demo

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| Способов сбора заявок | 2 (Manual · Self-upload) | `scope.md` §4, `user-flow.md` §6, `overview.md` §Ключевые возможности |
| Форматы дека | PDF / PPT / PPTX / Google Slides URL | `scope.md` AC4.M2–M3, `wizard.md` §4 |
| Лимит файла дека | до 50 MB *(placeholder, см. OQ)* | `scope.md` AC4.M2 + OQ3, `wizard.md` §6 |
| Публичная форма | `/e/<slug>`, доступна только при `is_published=true` (иначе 404) | `scope.md` AC4.S1, `wizard.md` §9.4 |
| Submit-аутентификация | Google OAuth (анонимный submit убран) | `scope.md` AC4.S3, `wizard.md` §4.4.1 |
| Режимы доступа | Open (default) · Invite-only | `wizard.md` §4.4.1 (миграция 047) |
| Старт оценки | при ≥1 участнике со статусом `ready` | `scope.md` AC4.G2, `user-flow.md` §6.3 |
| Окно приёма | `start_date ≤ now < deadline` И `status='collecting'` | `wizard.md` §4.4.2, §9.4 |
| Late-submit | запрещён в MVP | `scope.md` AC4.S6, `wizard.md` §4.4.2 |
| Publish | set-once, unpublish в MVP нет | `wizard.md` §4.4.3 |
| Шагов wizard до сбора | 5 (Details · Criteria · Jury · Participants · Review) | `scope.md` §3, `wizard.md` §2 |
| Организаторов на проект (MVP) | 1 | `scope.md` §Границы, `overview.md` §Для кого |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Разрозненные каналы-иконки (mail/forms/chat) сходятся в одну линзу-воронку → один чистый список | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра; `.media-ph` 16:9. Alt: «Scattered intake channels converging into one clean submission list» |
| flow | секция 3 | Трек 6 шагов: create → set up → publish → submit → workspace → start; узлы загораются вдоль трека | те же токены, light-поверхность, тонкие линии-узлы; `.media-ph` 4:3 |
| upload | секция 4/5 | Публичная upload-страница `/e/<slug>` (Google sign-in + deck upload) рядом с dashboard заявок | реалистичный UI-mockup, hairline-рамки, один lens-акцент; правдоподобные поля (Full name · Project · Deck · 50 MB); `.media-ph` 16:9 |

## Внутренние ссылки

- **Header/Footer nav:** пункт `Entry Hub` → `/product/entry-hub`
  (footer-секция PRODUCT, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Product Overview]] — весь workflow
  - [[sitemap|Evidence-Based Reports]] — что получается после оценки
  - [[sitemap|Review Board]] — где человек ревьюит и решает
  - [[sitemap|Security & Privacy]] — как защищён workspace и деки

## SEO / meta

- **`<title>`:** EvalLense Entry Hub — One Intake Flow for Pitch Decks
- **meta description:** Entry Hub replaces scattered intake with one controlled
  flow: a private submission page, deck collection by link or by hand, and a clean
  batch-workspace before evaluation starts. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — для кого продукт
- [[scope|Scope]] — границы первой версии сайта
- [[sitemap|Карта сайта]] — Entry Hub (batch entry, submission flow, deck collection)
- [[design-system|Design System]] — full-bleed-statement, pinned, bento, horizontal-gallery, токены
- [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]] — архетипы

### Application (`ai-jury-prod`) — сверено 2026-06-16
- `wiki/product/scope.md` §4 — Project Overview, manual/self-upload, publish-gate, лимиты, AC4.*
- `wiki/product/user-flow.md` §4–7 — Dashboard → Wizard → Project Overview → Start Judging
- `wiki/product/overview.md` — два способа сбора, wizard, ключевые возможности
- `wiki/architecture/wizard.md` §4 (Step 4 Participants), §4.4 (self-upload, OAuth, invite, merge, edit-window), §6 (file upload), §9 (landing), §10 (publish/QR/share)

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product/entry-hub`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 8 секций из «Структура секций» собраны с финальной EN-копией
- [ ] есть тёмный full-bleed statement (секция 2), pinned-multi-screen flow (секция 3) и горизонтальная галерея controls (секция 6)
- [ ] поверхности секций соответствуют колонке «Поверхность» (1L·2I·3L·4I·5L·6I·7L·8I)
- [ ] добавлена ссылка в footer-nav (PRODUCT)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Точный список обязательных полей публичной формы.** `scope.md` OQ5 помечен
  открытым, но `wizard.md` §9.1 (Required Information) уже фиксирует: Full name ·
  Email · Project title · Short description (+ опц. Comment for jury). Копия секции
  5 опирается на §9.1; если фаундер закрывает OQ5 иначе — поправить.
- **Лимит 50 MB** — в `scope.md` помечен placeholder (OQ3); подавать аккуратно
  («up to 50 MB»), готовы убрать точное число, если изменится.
- **Статус режима Hackathon** — расхождение в источнике: `scope.md` (Hackathon
  post-MVP, в modal disabled) vs `wizard.md` §3 + ADR-012 + `PROJECT-ENTRYPOINT.md`
  (Pitch и Hackathon — оба first-class в MVP target-state). Для Entry-Hub сбор
  одинаков в любом режиме, поэтому страница держится Pitch-нарратива; поле
  `github_repo_url` появляется только в Hackathon-режиме. Решение — за фаундером.
- **CSV-импорт участников** — post-MVP (`scope.md` §«НЕ в MVP»); не обещать.
- **Email-уведомления** (submit confirmation, deadline reminders) — post-MVP
  (`scope.md`); только email verification в MVP.
- **Unpublish / late-submit / cover-image upload / inline-edit landing** — post-MVP
  (`wizard.md` §4.4.3, §9); не обещать как доступное.
