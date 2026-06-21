# Rule: theme-typography-geometry (Light ↔ Dark — одна геометрия типографики)

**Источник правды:** `surface-invariant` (light↔ink = только цвет), `contract-lock`
(theme contract). Эта карточка усиливает их по типографике.

## Нерушимое правило

```yaml
typography_geometry:
  shared_between_themes: true
```

Внутри **одной версии** Light и Dark **обязаны совпадать** по:

```
font-family · font-size · font-weight · line-height · letter-spacing ·
max-width · grid position · target line count · container width · alignment
```

## Разрешено менять между темами

```
text color · background color · overlay · shadow · media treatment ·
decorative contrast
```

## Запрещено

- Любая геометрия по поверхности: `surface === 'ink' ? 'text-2xl' : 'text-xl'`,
  другая ширина текста, другой вес/tracking/line-height под тёмную тему.
- При флипе Light/Dark текст не должен прыгать или менять ширину.

## Исключение

Изменение typography geometry между темами допускается **только** как отдельное
явно approved исключение с объяснением (фиксируется в брифе). По умолчанию — запрет.

## Почему

User выбирает **одну** версию и переиспользует её на светлых И тёмных страницах.
Разная геометрия по теме = две разные вёрстки, «выбрать одну версию» невозможно.
Сравнивать попарно: **V1 L↔D**, **V2 L↔D**, **V3 L↔D**. Геометрия V1/V2/V3 между
собой различается (и должна — см. `version-protocol`/`typography-contract`).
