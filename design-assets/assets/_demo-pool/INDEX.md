# _demo-pool INDEX — каталог стаб-медиа (с тегами)

Каталог переиспользуемых demo-ассетов в стиле EvalLense (неоновый lens-градиент
на тёмном). `media-curator` читает этот индекс **первым** (Фаза 4B) и подбирает по
тегам под media-brief. Файлы — копии проектных ассетов; производные кладутся в
`web/public/assets/section-lab/<archetype>/`, эти не трогаем.

## Теги
- **type:** `photo` | `video`
- **role:** `background` (фон/сцена под копию) | `object` (предмет/панель в слот)
- **theme:** `dark` (светлый фон) | `light` | `adaptive`
- **ratio:** примерная ориентация
- **text:** есть ли вшитый текст/цифры (для «object со смыслом» — осторожно)

## Photo

| Файл | type | role | theme | ratio | text | Сюжет / стиль |
|---|---|---|---|---|---|---|
| `photo/light-lens-2.png` | photo | background | **light** | 3:2 | нет | белый фон, lens + карточки веером — **самый чистый светлый** (без текста) |
| `photo/light-lens-3.png` | photo | background | **light** | 3:2 | нет | белый фон, lens-взрыв с осколками-графиками |
| `photo/light-lens-1.png` | photo | background | **light** | 3:2 | да («8.7») | белый фон, lens «8.7» + карточки веером |
| `photo/light-lens-4.png` | photo | background | **light** | 3:2 | да (цифры) | белый фон, lens + россыпь чисел/процентов |
| `photo/light-lens-telescope.webp` | photo | object/background | **light** | 3:2 | нет | белый фон, стеклянный lens-«телескоп» с «8.7» — чистый светлый объект |
| `photo/light-blocked-card.jpeg` | photo | object | **light** | 3:2 | да | белый фон, UI-карточка Pitch Deck «Blocked» — светлая пара к `injection-blocked` |
| `photo/light-deck-scan.webp` | photo | object | **light** | 3:2 | да | белый фон, Pitch Deck + Evidence score 8.7 — светлая пара к `deck-scan` |
| `photo/light-scoring-matrix.webp` | photo | object | **light** | 3:2 | да | белый фон, scoring matrix + lens-кольцо + 6 карточек — светлая пара к `scoring-matrix` |
| `photo/section2-scroll-2-poster.jpg` | photo | background | dark | 16:9 | нет | разложенные стеклянные lens-кольца на чёрном — сильный фон-сцена |
| `photo/hero-intro-2-poster.webp` | photo | background | dark | 16:9 | нет | неоновый «единорог» в движении — выразительный фон |
| `photo/bg-new.png` | photo | background | dark | 16:9 | нет | парящие стеклянные кубы/кристаллы на чёрном — чистый абстрактный фон |
| `photo/bg-cube-1.png` | photo | background | dark | 16:9 | нет | стеклянные кубы (постер к `video/cube-1.mp4`) |
| `photo/bg-uniqorn.png` | photo | background | dark | 16:9 | да (цифры) | паттерн «кристальные единороги + цифры» — декоративный фон |
| `photo/deck-vault-art.png` | photo | object | dark | 1:1 | нет | арт «сейф с деками», без текста — чистый объект |
| `photo/dark-unicorn-head-front.jpeg` | photo | object | dark | 1:1 | нет | кристальная голова единорога анфас, без текста — чистый объект |
| `photo/dark-unicorn-head-profile.jpeg` | photo | object | dark | 1:1 | нет | кристальная голова единорога в профиль, без текста — чистый объект |
| `photo/deck-vault.png` | photo | background | dark | 3:2 | **да** | сейф + заголовок «Private deck vault» (вшит текст) |
| `photo/jury-decision.png` | photo | object | dark | 3:2 | да | силуэт + парящие карточки Scores/Risks/Evidence |
| `photo/scoring-matrix.png` | photo | object | dark | 16:9 | да | матрица оценок + lens-кольцо |
| `photo/deck-scan.png` | photo | object | dark | 3:2 | да | панель питча + карточка Evidence score 8.7 |
| `photo/injection-blocked.png` | photo | object | dark | 3:2 | да | UI-карточка с red-alert «Blocked» |

## Video (фоновые лупы, dark)

| Файл | type | role | theme | ratio | Сюжет / стиль |
|---|---|---|---|---|---|
| `video/light-bg.mp4` | video | background | **light** | 16:9 | **светлый** фоновый луп (white background) — единственное светлое видео |
| `video/bg-stones.mp4` | video | background | dark | 16:9 | тёмный луп «камни/кристаллы» |
| `video/section2-scroll-2.webm` | video | background | dark | 16:9 | стеклянные lens-компоненты (poster — выше) |
| `video/hero-intro-2.mp4` | video | background | dark | 16:9 | hero-интро, неоновый единорог (poster — выше) |
| `video/uniqorn-1.mp4` | video | background | dark | 16:9 | единорог-луп (CTA) |
| `video/uniqorn-2.mp4` | video | background | dark | 16:9 | единорог-луп (CTA) |
| `video/neo.mp4` | video | background | dark | 16:9 | абстрактный неон-луп (CTA) |
| `video/cube-1.mp4` | video | background | dark | 16:9 | абстрактный куб-луп (CTA) |

## Покрытие
- **Light:** фон — `light-lens-1..4`, `light-lens-telescope`; object — `light-lens-telescope`,
  `light-blocked-card`, `light-deck-scan`, `light-scoring-matrix`; видео — `light-bg.mp4`. ✅
- **Dark:** фонов и объектов много (см. выше); видео — 6 лупов.
- **Пары light↔dark** (для `paired-light-dark`): `light-blocked-card`↔`injection-blocked`,
  `light-deck-scan`↔`deck-scan`, `light-scoring-matrix`↔`scoring-matrix`.
- Чистые object без текста: `light-lens-2`, `light-lens-telescope` (light);
  `deck-vault-art`, `dark-unicorn-head-front/profile` (dark).

## Остаётся
- **Newsletter cards** в Drive (4 шт.) — всё ещё **0B** (не скачаны); забрать после докачки.
- В `~/Downloads` бренд-логотипы (L+единорог, белый/тёмный) и `2 screenshot-2.png` (13M)
  — НЕ в пуле: логотип ≠ нейтральное демо (только по решению дизайнера), скрин не смотрен.

> Обновлять при добавлении файлов: положил ассет в `photo/` или `video/` —
> допиши строку с тегами.
