# EvalLense — датасет для бренд-LoRA

Цель: обучить **style-LoRA** «визуальный язык EvalLense» — стеклянные UI-панели с
свечением violet→cyan, линза/сканер, дек и evidence-панели, hairline, премиальный
минимал-футуризм. Фон (тёмный/светлый) задаётся промптом, поэтому в датасете держим
**оба surface** одного языка, помечая фон в caption.

- **Trigger word:** `evllens style` (в начале каждого caption).
- **База тренировки:** FLUX.2 [dev] — **только облако** (Ostris AI Toolkit / RunComfy / fal).
  Локально на 32 ГБ не тянем (см. `../flux2-dev-playbook.md` §7–§8).
- **Целевой стиль:** Кластер A (тёмный футуристичный glassmorphism) как ядро + светлые
  кадры того же языка.

## Состав (текущие сиды → `seed/`)

Тёмные (ядро стиля):
- `dark_deck-scan` — дек → evidence score, неоновые контуры.
- `dark_jury-decision` — человек + панели scores/risks/evidence + final decision (human-in-the-loop). ✅ on-message.
- `dark_scoring-matrix` — дек → линза → сетка скоров. ✅ почти готовый концепт hero.
- `dark_deck-vault` / `dark_deck-vault-art` — хранилище дека (горизонт + вертикаль).

Светлые (тот же язык, surface=light):
- `light_deck-scan`, `light_scoring-matrix`.

Каждому кадру — сайдкар `*.txt` с caption.

## Выкинули (не берём)

- `injection-blocked` — красный + щит + замок + «Blocked». Off-message (мы «отводим на
  ревью», а не блокируем) и нарушает бренд-правило (no shields/locks/red). Если нужен сюжет
  инъекции — **переснять**: amber-маркер + «review signal», без щита.
- `light-lens-1..4`, `light-lens-telescope` — другой стиль (яркий кристаллический взрыв),
  с ядром не миксуется.
- `bg-*`, `dark-unicorn-*`, постеры — не про этот стиль/сюжет.

## Чего не хватает (догенерить ~10–15 в ТОМ ЖЕ языке)

Сейчас годных ~7. Для style-LoRA нужно **15–25**. Догенерить (референс = `dark_deck-scan` +
финальный dev-hero), варьируя сюжет, но держа единый язык:

1. Линза-сканер крупным планом (наш hero-объект), тёмный + светлый.
2. Дек проходит сквозь линзу → классификация (как scoring-matrix), 2–3 ракурса.
3. Слои judges → math → advisory → human (вертикальные панели).
4. Один evidence-маркер, отведённый в сторону, **amber #e8943a** (пойманная инъекция, on-message).
5. Human-in-the-loop (силуэт + панели), вариации.
6. Пустые «hero-плейты» только с линзой и воздухом под заголовок.

Баланс surface: ~60% тёмные / 40% светлые. Разрешение ≥1024 (наши 1536×1024 — ок).

## Шаблон caption

```
evllens style, <что на кадре: subject + действие>, <surface: dark studio background |
clean white studio background>, translucent glass UI panels with <violet to cyan glowing
hairline edges | soft violet to cyan glow>, premium minimal futuristic product render
```

Правила: тёплый акцент описываем явно (`a single marker glowing warm amber`), текст/цифры
в кадре не воспеваем (для textless-выдачи), один стиль-язык на весь датасет.

## Параметры тренировки (ориентир, облако, FLUX.2 dev)

- images: 15–25 · steps: 1000–2000 · LR: 1e-4 · network dim (rank): 16 · res: 1024
- cache text embeddings (фиксированные captions) · trigger `evllens style`
- На выходе `.safetensors` → Draw Things (PEFT/LoRA) поверх dev (в облаке) или Klein-инференс.

## Статус

- [x] Каркас датасета + 7 сидов + captions + trigger
- [ ] Решить surface-баланс и финально утвердить стиль
- [ ] Догенерить 10–15 кадров (после фикса hero-стиля)
- [ ] Финальная чистка/кроп до 1024, единые captions
- [ ] Облачная тренировка → `.safetensors`
