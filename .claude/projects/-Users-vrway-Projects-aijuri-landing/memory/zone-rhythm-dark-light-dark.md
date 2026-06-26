---
name: zone-rhythm-dark-light-dark
description: Паттерн dark→light→dark для zone-rhythm — стек слоёв, компоненты, ключевые CSS-классы. Эталон: /trust/prompt-injection-safety/page.tsx
metadata:
  type: project
---

## dark→light→dark zone-rhythm паттерн

**Эталон:** `web/src/app/trust/prompt-injection-safety/page.tsx`

**Why:** стандартный zone-rhythm (methodology) = light→dark→light (`--lobes` светлая база всегда on). Для dark→light→dark нужен другой стек — тёмная база on + второй тёмный слой `.ds-redark`.

### Стек слоёв (back→front, DOM order):

```jsx
<div className="ds-zone">
  {/* 1) Тёмная база — ВСЕГДА on (ds-zone__bg--on, не opacity:0) */}
  <div className="ds-zone__bg ds-canvas__bg--lobes-dark ds-zone__bg--on" aria-hidden="true">
    <span className="ds-canvas__spark ds-canvas__spark--1" />
    <span className="ds-canvas__spark ds-canvas__spark--2" />
    <span className="ds-canvas__spark ds-canvas__spark--3" />
  </div>
  {/* 2) Светлый слой — opacity:0, фейдится IN через ZoneToneFlipReverse (dark→light шов) */}
  <div className="ds-zone__bg ds-canvas__bg--lobes ds-relight" aria-hidden="true" />
  {/* 3) Второй тёмный слой — opacity:0, фейдится IN через ZoneToneFlip targetSelector=".ds-redark" */}
  <div className="ds-zone__bg ds-canvas__bg--lobes-dark ds-redark" aria-hidden="true">
    <span className="ds-canvas__spark ds-canvas__spark--1" />
    <span className="ds-canvas__spark ds-canvas__spark--2" />
    <span className="ds-canvas__spark ds-canvas__spark--3" />
  </div>
  {/* 4) Бренд-блум (для dark→light шва) */}
  <div className="ds-flip-bridge" aria-hidden="true" />
  <div className="ds-flip-bridge__glow" aria-hidden="true" />
  {/* 5) Блобы — оба клипа (top + bottom) НА ОДНОМ компоненте, над светлым островом */}
  <ZoneBlobs top="28%" bottom="18%" />
  ...секции...
</div>
```

### Швы:

| Стык | Компонент |
|---|---|
| dark→light (ink→light) | `<ZoneToneFlipReverse />` |
| light→dark (light→ink) | `<ZoneToneFlip targetSelector=".ds-redark" />` |

### Ключевые отличия от light→dark→light:

- `ds-zone__bg--on` вместо `ds-zone__bg--contained` — делает тёмный слой видимым изначально
- Нет `--lobes` (светлой базы) в стопке — она не нужна при тёмном старте
- Два `--lobes-dark` слоя: первый `--on` (база), второй `.ds-redark` (возврат)
- `ZoneToneFlip` принимает `targetSelector=".ds-redark"` — иначе попадёт на первый тёмный слой (уже on)
- `ZoneBlobs` — оба клипа `top` и `bottom` можно на ОДНОМ компоненте

**How to apply:** при dark→light→dark в zone-rhythm использовать этот стек. НЕ использовать `--lobes` как базу и НЕ использовать ZoneToneFlip без targetSelector.
