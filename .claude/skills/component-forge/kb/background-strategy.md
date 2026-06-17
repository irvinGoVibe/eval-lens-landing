# Rule: background-strategy (функция, а не картинка по умолчанию)

**Источник правды:** `demo-media` (реальный demo-content в слотах), `token-binding`
(фон через токены). Проектный принцип: **фото не ставим фоном под текст** — фото
живёт в контейнерных слотах, full-bleed-сцены делаем generated CSS/SVG.

## Не навязывать картинку как фон

**Плохая логика:** «есть доступные изображения → одно обязано стать background».
Asset pool — **не** обязательный источник фона.

**Правильная логика:**

```
определить функцию фона → решить, нужен ли фон вообще → выбрать лучший способ
```

## Допустимые стратегии

```
none · solid-surface · theme-surface · css-gradient · radial-glow · mesh-gradient ·
css-grid · svg-lines · svg-dots · svg-squares · geometric-pattern · soft-noise ·
decorative-frame · product-ui · data-visualization · image-object · image-background ·
video-object · video-background
```

Приоритет: сначала **none / surface / CSS / SVG** примитивы; `image-background` /
`video-background` — когда фон реально несёт смысл, и фото не уходит full-bleed под
текст (см. принцип выше — фото в контейнерных слотах).

## Дизайнеру РАЗРЕШЕНО создавать reusable CSS/SVG background primitives

Градиенты, сетки, точки, квадраты, mesh, glow, мягкий noise, decorative frame —
как переиспользуемые CSS/SVG-примитивы (на канонических токенах, без хардкода —
`token-binding`). Это предпочтительнее, чем пихать существующее фото под текст.

## Проверка

- Фон выбран по **функции**, а не «потому что был ассет».
- Если фон не нужен — `none`/`surface`, и это нормально.
- Фото/видео-фон не ухудшает читаемость текста (контраст, text-safe area, overlay).
- Новые декоративные фоны — на токенах, переиспользуемые, не one-off хардкод.
