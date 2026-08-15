# Сводное ТЗ на изображения — батч блога (август 2026)

Один документ на 4 статьи. **Ты генеришь только обложки (§1–§4, четыре файла).**
Диаграммы-SVG (§5) пишу я кодом — их генерить не нужно, они здесь для полноты картины.

## §0. Общие правила (действуют на все обложки)

**Палитра:**

| Токен | Значение | Роль |
|---|---|---|
| Lens-градиент | `linear-gradient(118deg, #6c4cf1 0%, #a99bff 32%, #2ec5e8 68%, #36e0c2 100%)` | ЕДИНСТВЕННЫЙ акцент, ≤10-12% площади кадра |
| Фон | `#ffffff` (или `#0b0b0f` там, где явно указано «тёмная») | Только белый или чёрный |
| Материал | белое матовое стекло, hairline-грани | Основной объём сцены |

**Формат всех обложек:** 3000×1580 px (16:9-ish), FLUX.2 [dev] 6-bit по плейбуку `notes/image-gen/`.

**TEXT-FREE — жёстко.** Ни одной буквы, цифры, логотипа, интерфейсного элемента с текстом.
Заголовок кладётся версткой сайта поверх. Если генератор упрямо рисует надписи — перегенерь.

**Свет и настроение:** музейный/студийный, много воздуха, мягкие тени, глянцевый пол с
лёгким отражением. Apple-style продуктовый минимализм, editorial-фотография. Не sci-fi,
не неон, не корпоративный клипарт, не 3D-хром.

**Запрещено везде:** люди с различимыми лицами · стоковые «команды у ноутбука» · щиты/замки ·
роботы и человекоподобный AI · мультяшный единорог · чужие логотипы · градиент как фон
целиком · более одного цветового акцента · читаемый текст.

**Проверка перед сдачей:** читается ли образ в миниатюре 400px (карточка в ленте)?
Если в маленьком размере видно только белое пятно — акцент слишком мелкий, увеличивай объект.

---

## §1. `single-judge-bias/cover.png` — «Один судья, встроенный перекос»

- **Статья:** The bias hiding in a single AI judge (Research, cyan) · slug `the-bias-in-a-single-ai-judge`
- **Куда класть:** `notes/blog/_assets-src/single-judge-bias/cover.png`
- **Сообщение:** одиночный судья выглядит объективным, но его оптика перекошена, и перекос невидим изнутри.
- **Композиция:** белая студия. По центру один строгий стеклянный монолит-обелиск («судья»),
  внутри толщи стекла — едва заметная градиентная линза-искажение. Перед монолитом
  симметрично лежат два одинаковых тонких белых документа-плиты (слева и справа).
  Преломлённый градиентный луч из монолита падает ТОЛЬКО на один из двух документов,
  подсвечивая его. Идеальная симметрия сцены против несимметричного луча = встроенный перекос.
- **FLUX-промпт:**
  > Minimalist white studio still: a single tall glass monolith at center with a subtle internal violet-lavender-cyan-aqua gradient lens distortion inside its glass body; two identical thin white document slabs lie symmetrically left and right in front of it, but one refracted gradient light beam from the monolith falls on only one of the two documents, illuminating it; perfect symmetry broken by the asymmetric beam; glossy white floor with soft reflections, museum lighting, extreme negative space, no people, no text, no logos, editorial Apple-style minimalism.
- **Alt:** `A glass monolith refracting light onto only one of two identical documents`

---

## §2. `how-to-evaluate-tool/cover.png` — «Кто проверяет проверяющего»

- **Статья:** How to evaluate an AI evaluation tool (Research, violet) · дата 2026-04-25
- **Куда класть:** `notes/blog/_assets-src/how-to-evaluate-tool/cover.png`
- **Сообщение:** прежде чем инструмент начнёт мерить твои заявки, его самого надо положить на эталон.
- **Композиция:** белый студийный стол сверху-сбоку. По центру лежит стеклянная линза-диск
  (объект «инструмент»), залитая lens-градиентом. Она лежит НА эталонной калибровочной
  пластине — тонкая hairline-сетка с равномерными делениями (как измерительный эталон,
  но БЕЗ цифр и подписей). Сверху над линзой зависла вторая, чистая прозрачная линза-проверщик,
  через которую видно, что деления сетки под градиентной линзой чуть смещены = инструмент
  проверяют инструментом. Одна мягкая тень, максимум воздуха.
- **FLUX-промпт:**
  > Minimalist white studio product still, slight top-down angle: a glass lens disc filled with a violet-lavender-cyan-aqua gradient rests on a precise calibration plate made of thin evenly-spaced hairline grid lines, no numbers or labels; a second clean transparent lens hovers above it, and through it the grid lines beneath the gradient lens appear slightly displaced; measuring instrument being measured, single soft shadow, museum lighting, extreme negative space, no people, no text, no logos, editorial Apple-style minimalism.
- **Alt:** `A gradient lens resting on a calibration grid, inspected through a second lens`

---

## §3. `hundreds-of-decks/cover.png` — «Поток в шортлист»

- **Статья:** Hundreds of decks, one ranked shortlist (Product, cyan) · дата 2026-05-09
- **Куда класть:** `notes/blog/_assets-src/hundreds-of-decks/cover.png`
- **Сообщение:** хаотичный поток заявок проходит через одну линзу и выходит коротким упорядоченным списком.
- **Композиция:** горизонтальная сцена, читается слева направо. Слева — плотное хаотичное
  облако из СОТЕН тонких белых плит-документов, лежащих под разными углами, уходящее за край
  кадра (ощущение «их не сосчитать»). В центре — вертикальная стеклянная линза-щель, залитая
  lens-градиентом, через которую поток проходит. Справа — ровная аккуратная стопка/колонка
  всего из 5 плит, строго выровненных, с одинаковым шагом; верхняя плита чуть выдвинута вперёд
  и подсвечена градиентом (= первое место). Контраст «хаос → порядок» держит весь кадр.
- **FLUX-промпт:**
  > Wide minimalist white studio scene reading left to right: on the left a dense chaotic cloud of hundreds of thin white document slabs at random angles extending beyond the frame; at center a vertical glass slit-lens filled with a violet-lavender-cyan-aqua gradient that the flow passes through; on the right just five document slabs in a perfectly aligned evenly-spaced vertical stack, the top one slightly forward and lit with the gradient; chaos to order contrast, glossy floor with soft reflection, museum lighting, no people, no text, no logos, editorial Apple-style minimalism.
- **Alt:** `Hundreds of scattered documents passing through a gradient lens into a ranked stack of five`

---

## §4. `demo-day-scale/cover.png` — «На сцену выходят единицы»

- **Статья:** Judging at Demo Day scale (Product, aqua) · дата 2026-05-23
- **Куда класть:** `notes/blog/_assets-src/demo-day-scale/cover.png`
- **Сообщение:** из сотен заявок на сцену выходят единицы, и организатор должен объяснить почему.
- **Тёмная обложка** (единственная в батче): фон `#0b0b0f`, чтобы карточка в ленте
  контрастировала с соседями и отражала вечерний формат Demo Day.
- **Композиция:** тёмный зал. Впереди — низкая сцена-подиум, на ней в конусе градиентного
  света стоят вертикально ТРИ тонкие плиты-документа (финалисты), чуть разной высоты.
  За сценой, в глубине и в тени, уходят вдаль ровные ряды таких же плит — десятки и сотни,
  теряющиеся в темноте. Единственный источник цвета — конус света на сцене и его отблеск на
  глянцевом полу. Никаких зрителей, стульев и лиц.
- **FLUX-промпт:**
  > Dark minimalist stage scene, near-black background: a low podium in front where three thin vertical document slabs of slightly different heights stand inside a cone of violet-lavender-cyan-aqua gradient light; behind and beyond the stage, orderly rows of identical slabs recede into darkness, dozens fading out of sight; the light cone is the only color source, reflecting softly on a glossy dark floor; no people, no chairs, no faces, no text, no logos, cinematic quiet, editorial minimalism.
- **Alt:** `Three finalist documents lit on a stage with hundreds more receding into the dark`

---

## §5. SVG-диаграммы — НЕ генерить, делаю я кодом

Здесь для полноты картины. Я пишу их как SVG (детерминированно, по канону
[`seven-rooms/TZ-images.md`](seven-rooms/TZ-images.md) §0), тебе трогать не нужно.

| Статья | Файл | Что показывает |
|---|---|---|
| bias | `single-judge-bias/order-flip.png` | Те же два дека, поменянные местами → меняется выбранный |
| bias | `single-judge-bias/panel-vs-copies.png` | 9 копий модели схлопываются в 2 голоса vs 6 независимых судей со Spread |
| how-to-evaluate-tool | 1-2 слота | Чек-лист покупателя / матрица «что спрашивать у вендора» |
| hundreds-of-decks | 1-2 слота | Пайплайн батча и точка человеческого решения |
| demo-day-scale | 1-2 слота | Таймлайн цикла отбора к Demo Day |

Точные слоты по трём новым статьям зафиксирую, когда допишу тексты (ресёрч в работе).

---

## Приёмка

- [ ] 4 файла с точными именами в точных папках (§1–§4)
- [ ] Все text-free, все 3000×1580
- [ ] Один цветовой акцент = lens-градиент, ≤10-12% площади
- [ ] §4 на тёмном фоне, §1-§3 на белом
- [ ] Каждая читается в миниатюре 400px
