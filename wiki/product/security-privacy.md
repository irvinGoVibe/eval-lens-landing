---
title: Security & Privacy
status: approved
version: 1
updated: 2026-06-16
route: /trust/security-privacy
section: trust
nav_label: Security & Privacy
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Security & Privacy

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Trust-страница: объясняет, как EvalLense обращается с питч-деками, заявками,
отчётами и review-данными как с чувствительной информацией — приватная обработка,
контролируемый доступ, решения под контролем человека.

> Продуктовый бриф страницы для skill `build-pages`. Факты — из Application-доков
> `ai-jury-prod` (`wiki/architecture/auth.md`, `wiki/product/scope.md`,
> `human-in-the-loop.md`, `governance-framework.md`). Это **архитектурные факты
> MVP** (Supabase Auth, RLS, server-side secrets) — без overclaim'а про
> сертификации/шифрование-at-rest, которых в доках нет. Они — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** дать уверенность загружать конфиденциальные материалы
  стартапов и запускать приватные batch-оценки — показать controlled access и
  human-owned decisions как trust-слой.
- **Для кого:** фонды, акселераторы, корпоративные команды — все, кто работает с
  чувствительными деками, финансами и founder-данными.
- **Ключевое сообщение:** деки и результаты оценки — чувствительны. EvalLense
  построен вокруг приватной обработки, контролируемого доступа и решений,
  остающихся за человеком.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  Contact Us.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Private by design» + lens-акцент + CTA |
| 2 | Почему приватность важна | editorial-split | reveal | light | Что чувствительно: стратегия, финансы, founder-данные, исход |
| 3 | Приватное рабочее пространство | bento | reveal | ink | Batch в controlled workspace; один организатор на проект (MVP) |
| 4 | Контроль доступа | feature-grid | reveal | light | Роли, RLS-изоляция проектов, server-only secrets, published-gate публичной формы |
| 5 | Как защищён доступ (под капотом) | pinned-multi-screen | pin | ink | Supabase Auth → httpOnly cookies → RLS auth.uid(); email verification, OAuth, open-redirect guard |
| 6 | Доставка отчётов | editorial-split | reveal | light | Отчёты делятся осознанно, а не утекают случайно |
| 7 | Решения под контролем человека | human-in-the-loop-footer | reveal | light | AI готовит анализ, человек владеет финальным решением и использованием отчёта |
| 8 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo / Contact |

## Контент по секциям

### 1. Hero
- **Заголовок:** Private by design, decided by humans
- **Подзаголовок:** Приватная обработка питч-деков, контролируемый доступ к
  workspace и осознанная доставка отчётов — на каждом шаге. *(черновик)*
- **CTA:** Book a Demo

### 2. Почему приватность важна
Питч-деки и результаты оценки — чувствительны:
- дек может содержать конфиденциальную стратегию;
- финансовые данные требуют осторожности;
- информация о фаундерах должна быть защищена;
- результат оценки влияет на финансирование, отбор и репутацию.

### 3. Приватное рабочее пространство
Каждый batch живёт в **контролируемом workspace** с доступом только для
авторизованных. В MVP — **один организатор на проект**; участники подают заявки
через публичную self-upload страницу `/e/<slug>`, **доступную только когда проект
опубликован** (`is_published=true`), иначе — 404.

### 4. Контроль доступа
Кто что видит — определяется ролями и изоляцией данных (из `auth.md`, `scope.md`):
- **Роли** `user` / `admin` / `participant` (один пользователь может иметь
  несколько ролей); контекст «организатор vs участник» зависит от проекта.
- **Изоляция проектов на уровне БД (RLS).** Postgres применяет row-level
  политики: организатор видит только свои проекты (`organizer_id = auth.uid()`).
- **Server-only secrets.** Service-role ключ и ключи AI Gateway живут **только на
  сервере** и никогда не попадают в клиентский бандл; admin-операции — после
  явной проверки `requireAdmin()`.
- **Защита входа.** Generic-ошибки логина (без утечки о существовании email),
  open-redirect guard (`sanitizeReturnUrl`), обязательная email-верификация.

### 5. Как защищён доступ (под капотом)
Слой аутентификации — стабильный (из `auth.md`):
1. **Supabase Auth** + `@supabase/ssr`; сессия — в **httpOnly cookies**.
2. Cookies автоматически передаются в Postgres → RLS видит `auth.uid()` и
   применяет политики на каждый запрос.
3. Методы входа: **email + password** (обязательная верификация), **Google
   OAuth**, **сброс пароля** по email-ссылке; обработка конфликта провайдеров.
4. Защищённые маршруты закрыты middleware; service-role ключ обходит RLS и
   используется **только** в admin-API после `requireAdmin()`.

### 6. Доставка отчётов
Отчёты должны делиться **осознанно**, а не утекать случайно. В MVP
participant-facing share отчётов — за рамками; доступ к отчёту идёт через
авторизованный workspace организатора. *(public share — post-MVP, см. scope)*

### 7. Решения под контролем человека
EvalLense **готовит анализ**, но финальные решения и использование отчёта
остаются за человеком (governance). `AI Total Score` — advisory; ранжирование
строится по human `Final Score`. AI не становится «невидимым финальным судьёй».

### 8. Final CTA
- Призыв: обсудить приватный пилот на ваших данных.
- Кнопки: Book a Demo · Contact Us.

## Числа и факты

Архитектурные факты (числовых security-KPI в доках нет — не выдумывать).

| Факт | Значение | Источник |
|---|---|---|
| Auth-слой | Supabase Auth + `@supabase/ssr`, httpOnly cookies | auth.md §1 |
| Изоляция данных | Postgres RLS, `organizer_id = auth.uid()` | auth.md §8 |
| Методы входа | email+password (verification), Google OAuth, reset | auth.md §4 |
| Секреты | service-role / AI Gateway keys — только server-side | auth.md §5, scope.md AC5.J2 |
| Публичная форма заявок | доступна только при `is_published=true`, иначе 404 | scope.md AC4.S1 |
| Доступ организатора | один организатор на проект (MVP) | scope.md §1 |
| Лимит файла дека | PDF/PPT/PPTX до 50 MB | scope.md AC4.M2 |
| Финальное решение | человек (Jury Score / Final Score) | governance-framework.md |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Дек, входящий в приватный «контур» линзы; мягкий замок-намёк без security-театра | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, hairline-структура |
| access | секция 5 | Цепочка cookies → server → RLS → данные проекта изолированы | те же токены, ink-поверхность, тонкие линии-потоки |

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `Security & Privacy` →
  `/trust/security-privacy` (footer-секция TRUST, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Prompt Injection Safety]] — почему контент дека не ломает оценку
  - [[sitemap|Methodology]] — как устроена оценка
  - страница `/security` (Legal/Technical) — технические меры (когда появится)

## SEO / meta

- **`<title>`:** EvalLense — Security & Privacy for Pitch Deck Evaluation
- **meta description:** Приватная обработка питч-деков, изоляция проектов на
  уровне БД, server-only secrets и решения под контролем человека — security как
  trust-слой EvalLense. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — human-in-the-loop, приватная работа с деками
- [[scope|Scope]] — границы MVP (share отчётов — post-MVP)
- [[sitemap|Карта сайта]] — Security & Privacy (private handling, controlled access)
- [[design-system|Design System]] — bento, feature-grid, human-in-the-loop footer

### Application (`ai-jury-prod`)
- `wiki/architecture/auth.md` — Supabase Auth, RLS, роли, server-only secrets
- `wiki/product/scope.md` — published-gate, лимиты файла, один организатор, секреты
- `wiki/product/human-in-the-loop.md` / `governance-framework.md` — human-owned decisions

## Acceptance (что считать готовым)

- [ ] страница доступна по `/trust/security-privacy`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 8 секций из «Структура секций» собраны
- [ ] есть pinned-multi-screen «под капотом» (секция 5) и человек-в-контуре (секция 7)
- [ ] добавлена ссылка в footer-nav (TRUST)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Сертификации и шифрование-at-rest.** В доках это не зафиксировано — не
  заявлять SOC2/ISO/at-rest-encryption, пока не подтверждено. Кандидат в
  отдельную страницу `/security` (Legal/Technical).
- **Data retention / удаление деков.** Политика хранения и удаления не описана —
  уточнить до публичных формулировок.
- **Что публично говорить про инфраструктуру** (Supabase/Postgres/Vercel) —
  согласовать уровень раскрытия стека на внешнем сайте.
- **Share отчётов наружу** — post-MVP; на странице подавать как «осознанная
  доставка», без обещания готовой фичи.
