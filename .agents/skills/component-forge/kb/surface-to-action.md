# Rule: surface-to-action (матрица «поверхность → действие» — Фаза 3)

**Источник правды:** `web/src/app/globals.css` — кнопки `/* buttons */` (≈ строки
328–369) + **liquid-glass группа** «Hero iOS-style Liquid Glass CTAs» (≈ строки
736–860); `CLAUDE.md` (glass-правило); DS-бандл
`.claude/designs/evallense/components/Button/buttons.card.html` (карта Button
делит On light / On ink) + `tokens/components.css`. Матрица **не вводит новых
вариантов** — записывает то, что уже в коде.

## Что это

Таблица «какую кнопку на какую поверхность», чтобы дизайнер/фронт не поставил
неверную кнопку. Сверяется с globals.css/бандлом (не выдумывается). Применяется в
Фазе 3 (DS Guard), 4A (Art Direction), 5 (Impl), 6 (Render QA).

## Варианты кнопок (что есть в коде)

| Класс | Вид | Где работает |
|---|---|---|
| `.btn-gradient` | заливной градиент (violet→blue) + свечение, `--grad-cta` | light **и** dark (свой glow) |
| `.btn-primary` | заливной фиолет (`--violet`), белый текст | light |
| `.btn-ghost` | обводка (на light — violet-контур; on-dark — белый контур) | light и dark |
| `.btn-dark` | заливной тёмный (`--fg`), белый текст | light |
| **liquid-glass** (`.btn-glass` / `.hero .cta-row .btn` в группе 736–860) | frosted backdrop-blur «сталь/лёд», inset-блики | **только поверх сцены/медиа на тёмном** |
| `.btn-glass` (базовый, строка 337) | плоское полупрозрачное стекло | фолбэк; «дорогой» вид даёт группа 736–860 |

> **Liquid-glass = backdrop-blur(44px):** он размывает то, что ЗА ним. На **плоском**
> тёмном тусклый и «не наш» — нужен герой/сцена/медиа за кнопкой. На плоской тёмной
> секции без сцены primary = `.btn-gradient`, а не glass.

## Матрица

```
## Surface-to-action matrix
### Light surface (.band.soft)
- Primary (CTA):     .btn-gradient   (в теле страницы стандартный primary — .btn-primary)
- Secondary:         .btn-ghost (violet-контур)
- Размер:            .btn (default) / .btn-sm
- Text/Border:       --fg / --border

### Dark surface (.band.ink) — ПЛОСКАЯ, без сцены/медиа
- Primary (CTA):     .btn-gradient (свой glow, читается на чёрном)
- Secondary:         .btn-ghost on-dark (белый контур)
- Text/Border:       on-dark токены / --border-on-dark

### Dark surface СО СЦЕНОЙ/МЕДИА (hero, cinematic v3, .cta-band, футер)
- Primary (CTA):     liquid-glass (.hero .cta-row .btn / .btn-glass, ОБЩАЯ группа 736–860)
- Secondary:         тёмное стекло (.hero .cta-row .btn-glass) ИЛИ ghost on-dark
- Требование:        под кнопкой реальная сцена/медиа (иначе glass тусклый)

### Кнопка ПОВЕРХ МЕДИА (object/background)
- Выбор по эффективному тону фона ПОД кнопкой, не по surface секции:
  тёмное медиа → liquid-glass ; светлое медиа → .btn-gradient / .btn-primary
- Всегда: text-safe зона + контраст ≥ AA.

### Состояния (globals)
- База .btn ; :active → scale(.97) ; :hover есть у всех вариантов (+ у glass — усиление blur/блика).
- ⚠️ ГЭП DS: у .btn НЕТ :focus-visible и :disabled — добавить в DS (важно для a11y/клавиатуры).
```

## Правила

- **Не придумывать новый button variant**, если его нет в коде.
- liquid-glass — **только** через общую группу 736–860 (см. [glass-rule](glass-rule.md)),
  не плоский базовый `.btn-glass` и не локальный glass.
- glass требует сцену/медиа за собой; на плоском тёмном → `.btn-gradient`.
- Если docs (`design-system.md`) и код (`globals.css`) противоречат — зафиксировать конфликт явно.

## Проверка

Каждое действие в V1/V2/V3 берётся из матрицы под свою поверхность (и под тон медиа,
если кнопка поверх него); нет кнопок/glass мимо неё; liquid-glass не стоит на плоском фоне.
