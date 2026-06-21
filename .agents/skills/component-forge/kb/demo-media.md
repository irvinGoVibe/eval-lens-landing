# Rule: demo-media (реальный demo-content, не пустой placeholder — Фаза 4B)

**Источник правды:** существующие ассеты `web/public/assets/**`, агент `media-curator`.

## Что такое demo-content

Это **реальный** медиа-ассет (фото / видео / screenshot / 3D-poster) из проекта,
которым блок наполняется, чтобы оценить композицию, crop, light/dark, responsive,
плотность и загрузку. Может быть смыслово нейтральным/временным. Статус —
**`demo-content`**, не «placeholder». Пустой `.media-ph` — это **fallback** только
при `asset-gap` (см. [media-placeholder](media-placeholder.md)).

## Главное правило — цвет под тему

Ассет должен быть **правильным по теме**: для light — светлый/«белый» фон-объект,
для dark — тёмный/«чёрный». Если один не годится на обе — готовим пару (см. ниже).

## Обработка — МИНИМАЛЬНАЯ

Разрешено: подбор по примерному размеру, **пережатие**, ресайз, desktop/mobile
варианты, light/dark варианты, video poster. **Запрещено:** художественная
ретушь, текст/лого/UI внутрь картинки, правка/перемещение/переименование
исходников, генерация новых изображений, скачивание внешних ассетов, новый
transcoding-stack без approval. Нечем пережать → `asset-gap` или `.media-ph`-fallback.

## Theme-aware стратегии

`single-adaptive` (один годится на обе), `light-specific`, `dark-specific`,
`paired-light-dark` (разные ассеты на light и dark). Для каждой темы проверить
контраст, читаемость, слияние с фоном, пере-/недо-экспонированные зоны,
совместимость с glass/overlay, text-safe area.

## Порядок поиска (media-curator)

0. **`web/public/assets/_demo-pool/`** — библиотека стаб-медиа, **искать здесь
   в первую очередь** (см. её README) →
1. медиа, уже связанные с архетипом → 2. соседние Section Lab блоки →
3. все медиа проекта (`web/public/assets/**`) → 4. brand-ассеты EvalLense →
5. product screenshots → 6. видео+постеры → 7. повторное использование →
8. выбрать лучший исходник/пару → 9. **показать дизайнеру** → 10. после approval
готовить производные (в `web/public/assets/section-lab/<archetype>/`, не в пуле).

## Нейминг производных

`web/public/assets/section-lab/<archetype>/` (исходники не трогаем):
`archetype-04-v2-dark-desktop.webp`, `…-light-mobile.webp`, `…-v3-poster.webp`,
`…-v3-demo.mp4`. Создавать **только** варианты из утверждённого brief.

## Поток (через оркестратора)

дизайнер → **media-brief** → оркестратор → `media-curator` → **media-package** →
оркестратор → дизайнер (**approval**). Фронт получает медиа только при статусе
`media-approved`. Форматы — уже поддерживаемые проектом (WebP/AVIF/PNG/JPEG/SVG; видео — как в проекте).
