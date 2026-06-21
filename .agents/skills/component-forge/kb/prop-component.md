# Rule: prop-component (извлечение в prop-driven Server Component)

**Источник правды:** `redraw-block/references/section-componentization.md`,
эталоны `web/src/components/sections/lab/_kit.tsx`, `LabSplitRing.tsx`.

## Правило

Архетип секции = **один prop-driven Server Component** в
`web/src/components/sections/lab/Lab<Archetype>.tsx`. Различия страниц
выражаются **пропсами**, а не форком файла.

## Обязательное

- **Server Component** — без `"use client"` (секции статичны; интерактив идёт
  через `data-*` + `ScrollFX`, не через клиентский стейт).
- **Контент 1:1 в типизированные пропсы.** Берёшь существующий инлайн-data из
  `dev/section-lab/page.tsx` как форму пропса; экспортируешь `type Lab<Archetype>Props`.
  Ничего не выдумываешь и не теряешь (контент — инвариант).
- **`surface?: 'light' | 'ink'`** пропсом → класс `.band.soft` / `.band.ink`.
  Дефолт — по строке архетипа в `section-types.md`.
- **Реюз примитивов `_kit`** (`LabEyebrow`, `MediaPlaceholder`, `LabContentSet`).
  Не хватает общего примитива — добавляешь его в `_kit`, не копипастишь.
- **`marker?: string`** проп — уголковый тег для стенда (`data-marker`), инертен на странице.
- Стили — в `globals.css` под `.lab-<archetype> …`, не инлайн-CSS в TSX.

## После извлечения

- Заменить инлайн-блок в `dev/section-lab/page.tsx` на `<Lab<Archetype> … />` —
  витрина рендерится без регрессий.
- Имя по типу из `section-types.md`; если тип уже извлечён — расширить пропсами,
  не плодить near-дубль.

## Definition of done

- [ ] Файл `Lab<Archetype>.tsx`, Server Component, экспортирует `Props`-тип.
- [ ] Весь контент инлайн-блока представлен пропсами (ничего не потеряно).
- [ ] `surface` проп → `.band.soft|.ink`; примитивы из `_kit`.
- [ ] `page.tsx` рендерит компонент; `pnpm build` зелёный.
