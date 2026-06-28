---
title: Entry Hub
status: live-synced
version: 1.2
updated: 2026-06-28
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

> Продуктовый бриф страницы. Факты сверены с источником правды `ai-jury-prod`
> (`wiki/product/scope.md` §4, `user-flow.md` §4–7, `overview.md`;
> `wiki/architecture/wizard.md` §4–§10). **Версия 1.2 синхронизирована с живым
> кодом `web/src/app/product/entry-hub/page.tsx` (2026-06-28)** — все заголовки,
> копи, surface-пропсы и медиа-слоты сверены с source of truth.

## Роль и аудитория

- **Роль страницы:** показать Entry Hub как **стартовую точку каждого batch'а** —
  одна контролируемая форма приёма заявок вместо хаоса каналов.
- **Для кого:** организаторы — VC-фонды, акселераторы, конкурсы; те, кто собирает
  поток заявок и теряет время на их сортировку до начала оценки.
- **Ключевое сообщение:** Entry Hub заменяет разрозненный intake (email, Forms,
  Airtable, Notion, Telegram, диски) одним приёмным потоком — все деки и данные
  попадают в один batch-workspace, готовый к оценке.
- **Целевое действие:** Book a Demo → `/company/contact`.

## Header-nav (якоря страницы)

```
section: "Product"  sectionHref: "/product/entry-hub"
links:
  - How it works  → #how
  - Collected     → #collect
  - Controls      → #controls
```

## Структура секций

> Тональная зона управляется через `ZoneToneFlip` / `ZoneToneFlipReverse` /
> `ZoneBlobs` — единый `ds-zone` охватывает §1–§7; `CtaBand` и `Footer` — вне зоны
> со своими бэкдропами. Результирующий визуальный ритм: **ink · ink · ink → light
> island (§4–§5) → ink · ink → dark (§8)**. Surface-пропс на секции отражает её
> фактическую поверхность (хотя тёмные §1–§3 достигаются базовым слоем зоны,
> а не индивидуальным prop="dark").

| # | Секция | Компонент | ID | Surface prop | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | `StatementHero` v2 | `#top` | `ink` | «One place for / every pitch deck» + CTA |
| 2 | Проблема intake | `FullStatement` v2 | `#problem` | `ink` | «Before judging starts, you're already / chasing files» |
| 3 | Как работает Entry Hub | `PinnedSteps` v3 | `#how` | `ink` | 6 шагов + looping video |
| 4 | Два способа сбора | `EditorialSplit` v3 | `#collect-modes` | `light` | Manual vs Team submission + image |
| 5 | Что собирается | `Bento` v2 | `#collect` | `light` | 4 tile-а: Team, Deck, Note, Status; feature-tile — реальное фото |
| 6 | Встроенные контролы | `Gallery` v4 | `#controls` | `ink` | 6 карточек submission controls |
| 7 | Ценность / финальный тезис | `EditorialSplit` v1 | `#value` | `ink` | 3 bullet-point'а «Ready for review» |
| 8 | Final CTA | `CtaBand` | — | `dark` + bleed | «See your submission flow / in action» + Book a demo |

> Сшивки зон: `ZoneToneFlipReverse` между §3 и §4 (dark→light), `ZoneToneFlip`
> с `targetSelector=".ds-redark"` между §5 и §6 (light→dark). Градиентный
> мост `tr-gradient-bridge` между §7 и §8 (transparent→ink). `ZoneBlobs`
> приколоты к light-острову §4–§5 (`top="38%" bottom="28%"`).

## Контент по секциям

> Ниже — финальный EN-текст прямо из кода. Русским — только редакторские пометки
> в скобках. `[accent]` отмечает слово под градиент-акцент (lens-prop).

### 1. Hero — `StatementHero` v2, surface `ink`

- **Eyebrow:** Entry Hub
- **titleLead:** One place for
- **titleAccent:** every pitch deck
- **Subhead:** Add teams yourself or share a submission link. Every deck and detail lands in one batch, ready for review.
- **CTA:** Book a Demo → `/company/contact`
- **Media slot:** ratio 16:9 · label «Image · intake channels into one lens · 16:9» · hint «Scattered intake channels converging into one clean submission list»

### 2. Проблема intake — `FullStatement` v2, surface `ink`

- **Eyebrow:** The intake problem
- **titleLead:** Before judging starts, you're already
- **titleAccent:** chasing files
- **Sub:** Decks come through email, Forms, Airtable, Notion, Telegram, and shared drives. Some go missing. Others arrive twice. The details you need are split across all of them.
- *(Нет медиа-слота — full-bleed statement, только текст)*

### 3. Как работает Entry Hub — `PinnedSteps` v3, surface `ink`

- **Eyebrow:** How it works
- **Title:** From setup / to judging in / [six steps]
- **Sub:** Choose how teams enter. Add them yourself or open submissions. Every entry lands in the same workspace.
- **Steps (6, pinned):**
  | # | Label | Desc |
  |---|---|---|
  | 01 | Set up the project | Add the event details, criteria, and judges. |
  | 02 | Choose how teams enter | Add teams yourself or let them submit through a public page. |
  | 03 | Add or share | Add teams manually, or publish and share the submission link. |
  | 04 | Collect the entries | Every deck and team detail lands in the same project workspace. |
  | 05 | Check readiness | See what's ready, what's incomplete, and what still needs attention. |
  | 06 | Start judging | Launch evaluation once at least one entry is ready. |
- **Media:** `DelayedLoopVideo` — src `/assets/entry-hub/entry-hub-flow-v2.mp4`, gap 7 s (play once, hold last frame, replay). Ratio 4:3. Frame-class `lab-rv__square--video`. aria-label «The EvalLense Entry Hub interface, from project setup to start judging».

### 4. Два способа сбора — `EditorialSplit` v3, surface `light`

- **Eyebrow:** Two ways to add teams
- **titleLead:** Add teams yourself or
- **titleAccent:** collect submissions
- **Sub:** Use manual entry or share a public submission link. Everything stays in one workspace.
- **Points (2):**
  - **Add manually** — Add each team from the project page: name, project, pitch deck, and an optional note for the jury.
  - **Team submission** — Share one public link. Teams sign in with Google and upload their own decks. No email attachments or accounts to manage.
- **Media slot:** ratio 16:9 · label «Image · public upload page · 16:9» · hint «Public upload page (Google sign-in + deck upload) beside the entries dashboard»

### 5. Что собирается — `Bento` v2, surface `light`

- **Eyebrow:** One complete entry
- **Title:** Everything judges need, in one [record]
- **Sub:** Every entry follows the same structure, so judging starts with clean, consistent data.
- **Tiles (4):**
  | Tag | Title | Body | Feature |
  |---|---|---|---|
  | Team | Team and project | Startup name, the founder or team, and a short description in each team's own words. | ✅ (с реальным изображением) |
  | Deck | Pitch deck | PDF, PPT, PPTX, or Google Slides link. One deck per team, up to 50 MB. | — |
  | Note | Note for judges | An optional note teams can add for context. | — |
  | Status | Entry status | See whether each entry is ready, incomplete, or submitted. | — |
- **Feature-tile media (реальный asset):** src `/assets/entry-hub/entry-record-v2.webp` · 1536×1024 · label «Image · entry record · 16:9» · hint «One structured record for the team, deck, note, and status»
- *(Page-local стиль: `#collect .lab-bento__media--img { transform: scale(1.1) }` — лёгкое увеличение feature-картинки)*

### 6. Встроенные контролы — `Gallery` v4, surface `ink`

- **Eyebrow:** Submission controls
- **titleAccent:** Control
- **Title:** who can submit and when
- **Sub:** Keep the page private, choose who gets access, and close submissions on your schedule.
- **Cards (6, горизонтальная галерея):**
  | Tag | Title | Body |
  |---|---|---|
  | Publish | Publish when ready | Keep the submission page private until you are ready to publish. |
  | Preview | Preview before publishing | Check exactly what teams will see before the page goes live. |
  | Access | Open or restricted access | Accept submissions from anyone with the link or only from approved email addresses. |
  | Window | Set the submission window | Choose when submissions open and close. You can also close them when judging begins. |
  | Share | Share by link or QR code | Share the submission page by link, QR code, Telegram, or X. |
  | Invites | Automatically link invites | Add a team by email. When they sign in with the same Google account, their submission connects automatically. |
- **Lane label:** «Entry Hub controls — horizontally scrollable»

### 7. Ценность — `EditorialSplit` v1, surface `ink`

- **Eyebrow:** Ready for review
- **titleLead:** Start judging with
- **titleAccent:** everything in place
- **Sub:** No missing files, scattered notes, or inconsistent submission formats.
- **Points (3):**
  - **One shared workspace** — Keep every deck, note, and team detail in one place instead of across inboxes, forms, and drives.
  - **Complete by default** — Every submission follows the same structure, making missing information easy to spot before judging starts.
  - **Ready to evaluate** — Start evaluation with a complete, consistent set of submissions.
- **Media (реальный asset):** src `/assets/entry-hub/evallense-brandkit-workspace-unicorn-08.webp` · 1672×941 · ratio 16:9 · hint «High-contrast EvalLense workspace with crisp liquid-glass screens, a front-facing holographic unicorn head, world clocks, and a black RGB keyboard»

### 8. Final CTA — `CtaBand`, theme `dark`, bleed

- **Eyebrow:** See it in action
- **Title:** See your submission flow [in action]
- **Sub:** Book a demo and walk through the full journey from public link to structured review workspace.
- **CTA:** Book a demo → `/company/contact`
- **Background video:** `/assets/cta/neo.mp4` (looping), Aurora CSS fallback: `violet`

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| Способов сбора заявок | 2 (Manual · Team submission) | `scope.md` §4, `user-flow.md` §6, `overview.md` §Ключевые возможности |
| Форматы дека | PDF / PPT / PPTX / Google Slides URL | `scope.md` AC4.M2–M3, `wizard.md` §4 |
| Лимит файла дека | до 50 MB *(placeholder, см. OQ)* | `scope.md` AC4.M2 + OQ3, `wizard.md` §6 |
| Публичная форма | `/e/<slug>`, доступна только при `is_published=true` (иначе 404) | `scope.md` AC4.S1, `wizard.md` §9.4 |
| Submit-аутентификация | Google OAuth (анонимный submit убран) | `scope.md` AC4.S3, `wizard.md` §4.4.1 |
| Режимы доступа | Open (default) · Invite-only | `wizard.md` §4.4.1 (миграция 047) |
| Старт оценки | при ≥1 участнике со статусом `ready` | `scope.md` AC4.G2, `user-flow.md` §6.3 |
| Окно приёма | `start_date ≤ now < deadline` И `status='collecting'` | `wizard.md` §4.4.2, §9.4 |
| Late-submit | запрещён в MVP | `scope.md` AC4.S6, `wizard.md` §4.4.2 |
| Publish | set-once, unpublish в MVP нет | `wizard.md` §4.4.3 |
| Организаторов на проект (MVP) | 1 | `scope.md` §Границы, `overview.md` §Для кого |

## Изображения и медиа

| Слот | Секция | Статус | Путь / описание |
|---|---|---|---|
| hero | §1 | placeholder | 16:9 — scattered intake channels converging into one clean submission list |
| flow | §3 | **реальное видео** | `/assets/entry-hub/entry-hub-flow-v2.mp4` — DelayedLoopVideo, 4:3 |
| upload-modes | §4 | placeholder | 16:9 — public upload page (Google sign-in + deck upload) beside the entries dashboard |
| entry-record | §5 (feature tile) | **реальный asset** | `/assets/entry-hub/entry-record-v2.webp` 1536×1024 |
| workspace-unicorn | §7 | **реальный asset** | `/assets/entry-hub/evallense-brandkit-workspace-unicorn-08.webp` 1672×941 |
| cta-video | §8 | **реальное видео** | `/assets/cta/neo.mp4` (shared) |

> Все реальные ассеты хранятся в `web/public/assets/entry-hub/`. Незаполненные
> placeholder-слоты (§1, §4) рендерятся DS-компонентом как ratio-locked labeled
> div — визуально видимы, не пустые серые блоки. Для генерации — см.
> [[drawthings-gen-workflow|Draw Things workflow]] и [[flux2-dev-playbook|FLUX.2 playbook]].

## SEO / meta

- **`<title>`:** EvalLense Entry Hub — One Intake Flow for Pitch Decks
- **meta description:** Entry Hub replaces scattered intake with one controlled flow: a private submission page, deck collection by link or by hand, and a clean batch-workspace before evaluation starts. *(≤155)*
- **OG-изображение:** слот `hero`

## Внутренние ссылки

- **Footer nav:** пункт `Entry Hub` → `/product/entry-hub` (секция PRODUCT).
- **Cross-links со страницы:** не заданы в коде явно; навигация — через header.

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — для кого продукт
- [[scope|Scope]] — границы первой версии сайта
- [[sitemap|Карта сайта]] — Entry Hub (batch entry, submission flow, deck collection)
- [[design-system|Design System]] — DS компоненты, токены
- [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]] — архетипы

### Application (`ai-jury-prod`) — сверено 2026-06-16
- `wiki/product/scope.md` §4 — Project Overview, manual/self-upload, publish-gate, лимиты, AC4.*
- `wiki/product/user-flow.md` §4–7 — Dashboard → Wizard → Project Overview → Start Judging
- `wiki/product/overview.md` — два способа сбора, wizard, ключевые возможности
- `wiki/architecture/wizard.md` §4 (Step 4 Participants), §4.4 (self-upload, OAuth, invite, merge, edit-window), §6 (file upload), §9 (landing), §10 (publish/QR/share)

## Acceptance (что считать готовым)

- [x] страница доступна по `/product/entry-hub`, обёрнута в `PageHeader` + `Footer` + `ScrollFX`
- [x] все 8 секций собраны из DS-бареля (`@/components/ds`)
- [x] тональная зона §1–§7 управляется через `ZoneToneFlip` / `ZoneToneFlipReverse` / `ZoneBlobs`
- [x] §3 использует `DelayedLoopVideo` с реальным mp4-ассетом (не placeholder)
- [x] §5 feature-tile имеет реальный image-ассет (`entry-record-v2.webp`)
- [x] §7 имеет реальный image-ассет (`evallense-brandkit-workspace-unicorn-08.webp`)
- [x] §8 `CtaBand` с `bleed` и looping video (`neo.mp4`)
- [x] header-nav с тремя якорями (#how, #collect, #controls)

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
- **Hero placeholder (§1) и upload-modes placeholder (§4)** — два слота ещё без
  реальных ассетов. Сгенерировать через Draw Things / FLUX.2 per
  [[drawthings-gen-workflow|Draw Things workflow]].
