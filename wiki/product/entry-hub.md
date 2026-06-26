---
title: Entry Hub
status: approved
version: 1
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

> Продуктовый бриф страницы для skill `build-pages`. Факты — из Application-доков
> `ai-jury-prod` (`wiki/product/overview.md`, `user-flow.md` §4–7, `scope.md` §4,
> `site/homepage-structure.md` Product Workflow). MVP — один организатор, Pitch
> mode, self-upload через published-gate. Чего нет — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать Entry Hub как **стартовую точку каждого batch'а** —
  одна контролируемая форма приёма заявок вместо хаоса каналов.
- **Для кого:** program owners, фонды, акселераторы, организаторы конкурсов —
  те, кто собирает поток заявок и теряет время на их сортировку.
- **Ключевое сообщение:** Entry Hub заменяет разрозненный intake (email, Forms,
  Airtable, Notion, Telegram) одним приёмным потоком — все деки и данные попадают
  в один review-workspace.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  See Product Overview → `/product`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «One entry point for every batch» + lens-акцент + CTA |
| 2 | Проблема intake | full-bleed-statement | reveal | ink | Деки приходят из 5+ каналов → хаос, потери, дубли |
| 3 | Как работает Entry Hub | pinned-multi-screen | pin | light | 6 шагов: create → configure → share link → upload → workspace → start |
| 4 | Что собирается | feature-grid | reveal | light | Startup, team, pitch deck (PDF/PPT/PPTX ≤50MB), program fields, status |
| 5 | Два способа сбора | editorial-split | reveal | ink | Manual vs Self-upload (публичная `/e/<slug>`, published-gate) |
| 6 | Ценность | editorial-split | reveal | light | Единый source of truth до старта оценки |
| 7 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** One entry point for every evaluation batch
- **Подзаголовок:** Запустите приватный поток приёма pitch decks и соберите всё,
  что нужно review-команде, в одном месте. *(черновик)*
- **CTA:** Book a Demo

### 2. Проблема intake
Один тезис на тёмном экране: питч-деки и данные участников приходят через много
каналов — **email · Google Forms · Airtable · Notion · Telegram · ручные
загрузки**. Это даёт хаос трекинга, потерянные файлы, дубли и медленную
подготовку к ревью. Команда тратит время на разбор данных, а не на оценку.

### 3. Как работает Entry Hub
Базовый flow (из `user-flow.md` / `scope.md` §4), узлы загораются по скроллу:
1. **Создать проект** через wizard (режим · детали · критерии · судьи · сбор).
2. **Настроить submission page** — какие материалы требуются, дедлайн, лимит.
3. **Поделиться entry-ссылкой** — публичная страница `/e/<slug>`.
4. **Участники загружают деки** сами; заявка появляется автоматически.
5. **Заявки собираются в приватном workspace** — список, статусы, completeness.
6. **Оценка стартует с чистого batch'а** — `Start Judging` при ≥1 готовой заявке.

### 4. Что собирается
В одну форму попадает (из `scope.md` §4, `user-flow.md` §6):
- **Startup name** и **founder / team** информация;
- **pitch deck** — PDF / PPT / PPTX или Google Slides URL, файл до **50 MB**;
- **program-specific поля** и комментарий;
- **submission metadata** и **review status** (ready / incomplete / submitted).

### 5. Два способа сбора
EvalLense даёт два режима приёма (из `overview.md` / `scope.md`):
- **Manual.** Организатор сам добавляет участников на Project Overview (имя,
  проект, дек, опциональные материалы).
- **Self-upload.** Генерируется **публичная страница `/e/<slug>`**; участники
  загружаются сами по ссылке. Страница доступна **только когда проект опубликован**
  (`is_published=true`), иначе — 404. Late-submit после старта оценки закрыт.

### 6. Ценность
Entry Hub даёт команде **единый source of truth до старта оценки**: не нужно
гоняться за деками по почте, формам, папкам и чатам — всё в одном чистом hub'е,
готовом к пакетной оценке.

### 7. Final CTA
- Призыв: увидеть, как entry-поток собирается на вашем событии.
- Кнопка: Book a Demo.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Способов сбора заявок | 2 (Manual · Self-upload) | overview.md / scope.md §4 |
| Форматы дека | PDF / PPT / PPTX / Google Slides | scope.md AC4.M2–M3 |
| Лимит файла дека | до 50 MB | scope.md AC4.M2 |
| Публичная форма | `/e/<slug>`, доступна при `is_published=true` | scope.md AC4.S1 |
| Старт оценки | при ≥1 участнике со статусом `ready` | user-flow.md §6.3 |
| Шагов wizard до сбора | 5 | overview.md |
| Организаторов на проект (MVP) | 1 | scope.md §1 |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Разрозненные каналы-иконки сходятся в одну линзу-воронку | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра |
| flow | секция 3 | Трек 6 шагов: setup → link → upload → workspace | те же токены, узлы загораются вдоль трека |
| upload | секция 5 | Публичная upload-страница `/e/<slug>` + dashboard заявок | реалистичный UI-mockup, hairline-рамки, один lens-акцент |

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `Entry Hub` → `/product/entry-hub`
  (footer-секция PRODUCT, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Product Overview]] — весь workflow
  - [[sitemap|Evidence-Based Reports]] — что получается после оценки
  - [[sitemap|Security & Privacy]] — как защищён workspace и деки

## SEO / meta

- **`<title>`:** EvalLense Entry Hub — One Intake Flow for Pitch Decks
- **meta description:** Entry Hub заменяет разрозненный приём заявок одним
  контролируемым потоком: публичная submission-страница, сбор pitch decks и
  чистый batch-workspace до старта оценки. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — для кого продукт
- [[scope|Scope]] — границы первой версии сайта
- [[sitemap|Карта сайта]] — Entry Hub (batch entry, submission flow, deck collection)
- [[design-system|Design System]] — full-bleed-statement, pinned, feature-grid

### Application (`ai-jury-prod`)
- `wiki/product/overview.md` — wizard, два способа сбора, ключевые возможности
- `wiki/product/user-flow.md` §4–7 — Dashboard → Wizard → Project Overview → Start Judging
- `wiki/product/scope.md` §4 — manual/self-upload, published-gate, лимиты файла
- `wiki/product/site/homepage-structure.md` — Product Workflow «Launch your entry point»

## Статус реализации

### 2026-06-26 — Design rhythm завершён

Страница `/product/entry-hub` собрана и задизайнена:

**Сделано:**
- 8 секций на DS-барреле (`@/components/ds`): StatementHero · FullStatement · PinnedSteps · EditorialSplit ×2 · Bento · Gallery · CtaBand
- Тональный ритм **dark→light→dark** через zone-rhythm:
  - §1–3 ink (тёмная база `ds-zone__bg--on`)
  - §3→§4 `ZoneToneFlipReverse` (ink→light + brand bloom)
  - §4–5 light (светлый остров + `ZoneBlobs top="38%" bottom="28%"`)
  - §5→§6 `ZoneToneFlip targetSelector=".ds-redark"` (light→ink возврат)
  - §6–7 ink (второй тёмный слой `ds-redark`)
- `CanvasFlowField blue` — синие flow-blobs поверх тёмных секций
- `tr-gradient-bridge` 200px (transparent→ink) между §7 и CtaBand
- `CtaBand theme="dark" bleed videoSrc="/assets/cta/neo.mp4"` — видео-CTA
- Footer `variant="dark"`
- §7 EditorialSplit v3 с 3 пунктами («One private workspace» / «Complete and consistent» / «The final call is yours»)
- §6 Gallery `titleAccent="You decide"` + LabGallery расширен `titleLead`/`titleAccent` пропами

**Осталось:**
- [ ] Загрузить изображения (media-слоты на страницах — сейчас labeled placeholders)
- [ ] Вычитать и откорректировать тексты

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product/entry-hub`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 7 секций из «Структура секций» собраны
- [ ] есть тёмный full-bleed statement (секция 2) и pinned-multi-screen flow (секция 3)
- [ ] добавлена ссылка в footer-nav (PRODUCT)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **CSV-импорт участников** — post-MVP; не обещать.
- **Точный список обязательных полей** публичной формы — в Application открытый
  вопрос (scope.md OQ5); не фиксировать выдуманный список.
- **Email-уведомления** (submit confirmation, deadline reminders) — post-MVP.
- **Лимит 50 MB** — в Application помечен как placeholder (scope.md OQ3); подавать
  аккуратно либо без точного числа.
