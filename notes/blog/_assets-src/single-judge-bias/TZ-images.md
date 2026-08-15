# ТЗ на изображения — «The bias hiding in a single AI judge»

Статья: `notes/blog/the-bias-in-a-single-ai-judge.md` · Research · accent **cyan** · 3 слота.
Общие правила — канон [`../seven-rooms/TZ-images.md`](../seven-rooms/TZ-images.md) §0:
lens-градиент 118° единственный акцент · белый фон · hairline `#d2d2d7` · SF Pro + Menlo ·
cover text-free · без выдуманных чисел.

**Разрешённые числа статьи:** 12 (типов биасов) · 10% (сдвиг от порядка) · ICC 0.26 / 0.23 ·
150,000+ instances · 9 судей → 2 голоса · 6 судей · Spread ≥ 3.0 · 50%.

| Слот | Файл | Формат |
|---|---|---|
| Cover | `cover.png` | 3000×1580, FLUX.2 [dev], text-free |
| Флип от порядка | `order-flip.png` | SVG→PNG, 1600×760 |
| Панель vs копии | `panel-vs-copies.png` | SVG→PNG, 1600×900 |

---

## 1. `cover.png` — «один судья, наклонённые весы»

- **Сообщение:** одиночный судья выглядит объективным, но его прибор встроенно перекошен.
- **Композиция:** белая студия. По центру один строгий стеклянный монолит-обелиск
  («судья»), внутри его толщи — едва заметный lens-градиентный перекос/линза,
  преломляющая проходящий свет вбок. Перед монолитом два одинаковых белых
  документа-плиты лежат симметрично слева и справа, но преломлённый градиентный луч
  из монолита падает только на один из них, подсвечивая его. Идеальная симметрия
  сцены против несимметричного луча = встроенный перекос. Глянцевый пол, мягкое
  отражение, музейный свет, цвет ≤10% кадра.
- **FLUX-промпт:**
  > Minimalist white studio still: a single tall glass monolith at center with a subtle
  > internal violet-lavender-cyan-aqua gradient lens distortion inside its glass body;
  > two identical thin white document slabs lie symmetrically left and right in front
  > of it, but one refracted gradient light beam from the monolith falls on only one
  > of the two documents, illuminating it; perfect symmetry broken by the asymmetric
  > beam; glossy white floor with soft reflections, museum lighting, extreme negative
  > space, no people, no text, no logos, editorial Apple-style minimalism.
- **Alt:** `A glass monolith refracting light onto only one of two identical documents`.

## 2. `order-flip.png` — «поменяли местами, вердикт перевернулся»

- **Сообщение:** тот же контент, другой порядок, другой победитель — position bias наглядно.
- **Композиция:** два ряда один над другим, разделены hairline.
  - Верхний ряд: две карточки-дека `A` и `B` (буква = крупная SF semibold, ink; карточка
    36×48 условных, hairline-рамка, скруглpost 12px), слева A, справа B; над карточкой A —
    градиентная галочка-точка и mono-лейбл `PICKED`.
  - Нижний ряд: те же карточки, но B слева, A справа (буквы те же!); градиентная точка
    `PICKED` теперь над B (который слева).
  - Справа от рядов вертикальная mono-подпись-вывод: `same decks · new order · new verdict`
    (12px, letter-spacing .14em, muted).
  - Eyebrow сверху: `POSITION BIAS` (Menlo 12px, #6c4cf1).
- **Anti-goals:** не рисовать роборуку/модель; не добавлять проценты (10% живёт в тексте).
- **Alt:** `Two decks swapped in order and the picked one changes with the position`.

## 3. `panel-vs-copies.png` — «9 копий = 2 голоса, 6 независимых = панель»

- **Сообщение:** копии одной модели голосуют одинаково; настоящая панель = разные судьи + видимый разброс.
- **Композиция:** сплит вертикальной hairline на две половины.
  - Левая, `NINE COPIES` (mono eyebrow, muted): 9 одинаковых ink-кружков 14px в сетке 3×3,
    от всех девяти пунктирные линии сходятся в ДВЕ точки-«голоса» внизу (обе ink);
    подпись под низом: `correlated errors · two effective votes` (13px muted).
  - Правая, `SIX INDEPENDENT JUDGES` (mono eyebrow, #6c4cf1): 6 кружков РАЗНОГО вида
    (варьируй: заливка градиентом разной ориентации/фазы у каждого — визуально разные
    судьи), от них сплошные линии к шести РАЗНЫМ точкам на горизонтальной шкале снизу;
    интервал разброса на шкале залит градиентной полосой с mono-лейблом `SPREAD ≥ 3.0`;
    подпись: `independent reads · disagreement measured` (13px, ink).
- **Anti-goals:** не делать левую половину «плохой красной» — у нас нет красного;
  плохость передаётся серостью и схлопыванием в 2 точки.
- **Alt:** `Nine identical judges collapsing into two votes versus six independent judges with visible spread`.
