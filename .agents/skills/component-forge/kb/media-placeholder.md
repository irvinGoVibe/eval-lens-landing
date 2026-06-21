# Rule: media-placeholder (FALLBACK — видимый .media-ph, когда нет ассета)

**Источник правды:** `MediaPlaceholder` в `web/src/components/sections/lab/_kit.tsx`.

> **Это fallback, не основной путь.** Основной путь — реальный **demo-content**
> из ассетов проекта (см. [demo-media](demo-media.md)). `.media-ph` ставится
> только при `asset-gap`: подходящего медиа в проекте нет / нечем подготовить.

## Правило

Медиа-слот, для которого **нет реального ассета**, — **видимый ratio-locked
плейсхолдер** `MediaPlaceholder`, а не пустота и не `<img>` на битый путь.

## Использование

```tsx
<MediaPlaceholder
  ratio="4/3"                      // CSS aspect-ratio → нет CLS
  label="Image · editorial proof · 4:3"   // mono-пилюля: что за ассет
  hint="A calm product panel with one lens accent and evidence rows."  // бриф генерации
  ariaLabel="Editorial split visual placeholder"
  className="lab-<archetype>__media"      // секционный класс
  reveal="right"                   // опц. data-reveal
/>
```

## Обязательное

- `ratio` всегда задан (`aspect-ratio`) — нулевой layout-shift.
- `label` — mono-пилюля формата `Image · <что> · <соотношение>`.
- `hint` — короткий бриф генерации (что на картинке, один lens-акцент, evidence).
- `ariaLabel` — осмысленное имя для скринридера; `role="img"` уже в примитиве.
- Видео в смелой версии — `poster`/placeholder, тот же принцип.

## Проверка

Нет пустых медиа-слотов; у каждого плейсхолдера задан `--ratio`, label и hint.
