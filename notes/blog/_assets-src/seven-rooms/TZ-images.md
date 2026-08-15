# ТЗ на изображения — статья «One job, seven rooms»

Статья: `notes/blog/one-job-seven-rooms.md` · slug `one-job-seven-rooms` · short-key `seven-rooms`
Слоты в статье: 4 (cover + 3 inline). Пути в статье → исходники здесь:

| Слот в статье | Путь в статье | Исходник в этой папке |
|---|---|---|
| Cover | `/assets/blog/seven-rooms/cover.png` | `cover.png` (raster) или `cover.svg` |
| Формула | `/assets/blog/seven-rooms/short-version.png` | `short-version.svg` |
| Три условия | `/assets/blog/seven-rooms/three-conditions.png` | `three-conditions.svg` |
| Что меняется | `/assets/blog/seven-rooms/what-changes.png` | `what-changes.svg` |

Скрипт публикации (`publish.mjs`) сам сожмёт в WebP и перепишет пути — отдельно жать не нужно.

---

## 0. Общие правила (обязательны для всех 4 слотов)

**Палитра (единственный акцент — lens-градиент):**

| Токен | Значение | Использование |
|---|---|---|
| Lens-градиент | `linear-gradient(118deg, #6c4cf1 0%, #a99bff 32%, #2ec5e8 68%, #36e0c2 100%)` | ЕДИНСТВЕННЫЙ цветовой акцент. Заливки ключевых элементов, градиентные обводки, свечения |
| Ink (текст) | `#1d1d1f` | Основной текст/линии на белом |
| Muted | `#6e6e73` | Вторичные подписи |
| Hairline | `#d2d2d7` | Тонкие линии 1px, рамки, сетки |
| Фон | `#ffffff` (или чистый чёрный `#0b0b0f` для cover-варианта B) | Только белый или чёрный. Никаких цветных/серых фонов |

**Типографика (для SVG с подписями):** заголовки/лейблы `-apple-system, "SF Pro Text", "Helvetica Neue", sans-serif`; технические eyebrow-подписи (напр. `CONDITION 01`) — `Menlo, ui-monospace, monospace`, uppercase, letter-spacing 0.14–0.16em, 11–13px. Вес: semibold для ключевых слов, regular для остального. Текст всегда `#1d1d1f`/`#6e6e73`, градиентом красим не текст, а элементы (исключение: одно слово-акцент можно залить градиентом через background-clip-паттерн, как на сайте).

**Числа и данные:** выдуманные метрики ЗАПРЕЩЕНЫ. Разрешены только:
- числа с источником из статьи: `2:30` (DocSend 2024), `2:13` (DocSend 2022), `ICC 0.26` (PLOS One), `0.89 vs 0.61` (PLOS One), `1,000+ runs`, `10 decks`, `Aug 31`;
- откровенно иллюстративные placeholder-подписи без претензии на данные.

**Запрещено везде:** щиты/замки, 3D-хром, стоковые фото людей, чужие логотипы (в т.ч. DocSend/PLOS), мультяшный единорог, градиент как фон целиком, более одного цветового акцента, тени тяжелее `0 10px 30px -24px rgba(40,30,90,.4)`.

**Единорог-маскот:** разрешён, только премиальный — кристалл/стекло в lens-градиенте, гранёный, без глаз-мультяшек. В этой статье уместен ТОЛЬКО на cover (вариант B), в диаграммах не нужен.

**Светлая/тёмная тема сайта:** инлайны рендерятся на светлой подложке карточки статьи — фон SVG белый, непрозрачный (не transparent).

---

## 1. `cover.png` — обложка (главный образ статьи)

- **Роль:** карточка в ленте Newsroom + hero статьи + OG-превью. Должна читаться в миниатюре 400px.
- **Ключевое сообщение:** семь разных «комнат» смотрят на один и тот же объект. Одна работа — семь вокабуляров.
- **Формат:** 3000×1580 px (канон свежих статей), 16:9-ish. Raster (FLUX.2 [dev] 6-bit по плейбуку `notes/image-gen/`) или чистый SVG→PNG, если генерация не даст чистоты.
- **TEXT-FREE:** на растровой обложке ни одной буквы/цифры (правило генерации; текст ляжет поверх версткой сайта).

**Композиция (вариант A — рекомендую, «семь дверей»):**
- Белый фон. Горизонтальный ряд из семи одинаковых дверных проёмов-порталов (простые прямоугольные арки, hairline-обводка `#d2d2d7`, лёгкая перспектива, как анфилада залов галереи).
- Сквозь ВСЕ семь проёмов виден ОДИН и тот же объект в центре глубины: линза/кристалл, залитая lens-градиентом, с мягким свечением.
- Проёмы чуть отличаются пропорциями/наличниками (намёк на разные «комнаты»), но выровнены по одной оси — взгляд собирается в одну точку.
- Свет: холодный, музейный; градиентный объект — единственное цветовое пятно, ≤10% площади кадра.
- Настроение: Apple-минимализм, тишина, глубина. Не sci-fi, не корпоративный клипарт.

**FLUX-промпт (вариант A):**
> Minimalist architectural still: a straight enfilade of seven identical white doorway portals receding in perspective on a pure white background, thin light-gray outlines, museum lighting. Through all seven aligned doorways, one single glowing faceted glass lens object in the far room, lit with a violet-to-lavender-to-cyan-to-aqua gradient (118 degrees), soft bloom. Extreme negative space, Apple-style product minimalism, editorial photography look, no people, no text, no logos, clean studio light, subtle soft shadow under the object.

**Вариант B (запасной, «единорог за семью стёклами»):** чёрный фон `#0b0b0f`; гранёный стеклянный единорог в lens-градиенте в центре; перед ним семь тонких стеклянных панелей-слоёв под разными углами, каждая слегка преломляет его силуэт по-своему — семь разных «прочтений» одного объекта. Text-free, свечение сдержанное.

**Alt:** `Seven doorways aligned in a row, all opening onto the same gradient lens object`.

---

## 2. `short-version.svg` — формула теста (стоит СРАЗУ после H2 "The short version", ДО code-блока с формулой)

- **Роль:** мгновенно показать тест из трёх условий до того, как читатель дочитает текст. Самая цитируемая/шарабельная картинка статьи.
- **Ключевое сообщение:** фит = произведение трёх условий; выпало одно — работы нет.
- **Формат:** SVG 1600×760 (≈2.1:1, инлайн-лента), белый фон.

**Композиция — «три кольца-множителя»:**
- Три одинаковых кольца в ряд (обводка 2px), между ними знаки `×` (Menlo, `#6e6e73`, 28px), после третьего `=` и итоговый элемент.
- Кольцо 1: label внутри `VOLUME`, подпись под кольцом `more submissions than the calendar absorbs` (13px, `#6e6e73`).
- Кольцо 2: `CAPACITY`, подпись `senior review hours are fixed`.
- Кольцо 3: `EXPOSURE`, подпись `someone can ask you why`.
- Обводка колец: hairline `#d2d2d7`, но у каждого кольца дуга ~90° залита lens-градиентом (градиентный штрих поверх) — три акцентных дуги суммарно и есть весь цвет.
- Итог после `=`: маленькая горизонтальная плашка-«лидерборд» (3 строки-скелетона, верхняя чуть шире) с градиентной hairline-обводкой и eyebrow-подписью `THE JOB` (Menlo 11px) + строка `a shortlist you can defend` под ней.
- Eyebrow над всей схемой слева: `THE FIT TEST` (Menlo, 12px, letter-spacing .16em, `#6c4cf1`).

**Anti-goals:** не Venn (Venn — в слоте 3), не иконки-клипарты внутри колец, не заливать кольца целиком.

**Alt:** `Three factors multiplied: volume, capacity, exposure equals a defensible shortlist`.

---

## 3. `three-conditions.svg` — три условия глубже (стоит в конце H2 "Condition three: exposure")

- **Роль:** закрепить прочитанные три секции в одну картину; показать, что «два из трёх» — не наш случай, и что решает exposure.
- **Ключевое сообщение:** зоны пересечения без третьего условия = другие решения; полное пересечение = эта работа.
- **Формат:** SVG 1600×1000, белый фон.

**Композиция — «честный Venn»:**
- Три круга (обводка 1.5px `#1d1d1f` opacity .55), классический Venn. Подписи снаружи каждого круга: `Volume`, `Capacity`, `Exposure` (SF semibold 20px) + под каждой одна mono-строка факта из статьи, привязанного к кругу:
  - Volume → `avg first read: 2:30 (DocSend, 2024)`
  - Capacity → `review hours don't stretch`
  - Exposure → `reviewer agreement: ICC 0.26 (PLOS One)`
- Парные пересечения подписаны тем, что реально нужно в этих случаях (из секции "When the answer is no", 13px `#6e6e73`, курсивом не увлекаться):
  - Volume∩Capacity (без Exposure) → `a faster pipeline is enough`
  - Volume∩Exposure (без Capacity) → `hire more readers`
  - Capacity∩Exposure (без Volume) → `just read them`
- Центральная зона тройного пересечения: единственная заливка lens-градиентом (мягкая, opacity ~.9), в ней label `THIS JOB` (Menlo 12px, белый).
- Eyebrow сверху слева: `WHERE THE FIT LIVES`.

**Anti-goals:** не перегружать процентами; никаких чисел, кроме двух source-цифр выше; не красить парные зоны.

**Alt:** `Venn diagram of volume, capacity and exposure; only the triple overlap is the job EvalLens does`.

---

## 4. `what-changes.svg` — конфигурация vs инвариант (стоит после H2 "What changes between rooms, and what does not")

- **Роль:** визуально доказать «one engine, many rooms»: сменные части сверху, несменяемый инвариант снизу.
- **Ключевое сообщение:** меняются панель/веса/интейк; инвариант — независимые судьи, evidence, advisory AI-score, человеческий Jury Score, восстановимый след.
- **Формат:** SVG 1600×1000, белый фон.

**Композиция — «сменные картриджи над единой рельсой»:**
- Верхняя треть: три «картриджа»-карточки (hairline-рамка, скругление 16px) с eyebrow `CHANGES PER PROGRAM`:
  1. `Mode & panel` — внутри два чипа: `Pitch · 6 judges` / `Hackathon · 5 judges`;
  2. `Criteria weights` — три горизонтальных слайдера-полоски разной длины (без цифр);
  3. `Intake` — два чипа: `manual` / `public upload page`.
  Карточки соединены пунктирными hairline-коннекторами вниз, к рельсе (намёк «вставляются»).
- Нижняя половина: одна широкая горизонтальная рельса-плашка с градиентной hairline-обводкой (2px, lens-градиент) и eyebrow `NEVER CHANGES`. Внутри рельсы 5 узлов слева направо (точка + подпись):
  `independent judges` → `evidence-linked scores` → `AI Total Score · advisory` → `Jury Score · human` → `reconstructible trail`.
  Узел `Jury Score · human` — единственный залит градиентом целиком (это точка решения); остальные точки — ink.
- Между узлами тонкие стрелки `#d2d2d7`.

**Anti-goals:** не рисовать полный пайплайн продукта (Decoder и т.п. в статье не упоминаются — в картинке их быть не должно); не делать из рельсы «щит надёжности».

**Alt:** `Swappable program settings on top, the invariant review engine underneath, human Jury Score highlighted`.

---

## Приёмка (чек-лист перед публикацией)

- [ ] Один цветовой акцент = lens-градиент 118°, ≤10–15% площади каждого изображения.
- [ ] Фон белый непрозрачный (cover-вариант B — чёрный).
- [ ] Cover — text-free; в SVG-инлайнах все подписи по типографике из §0.
- [ ] Ни одного выдуманного числа; source-цифры только из списка §0.
- [ ] Нет запрещённого: щиты, 3D-хром, фото-люди, чужие логотипы, мультяшность.
- [ ] Cover читается в миниатюре 400px; SVG-подписи читаются на ширине 720px.
- [ ] Имена файлов = basename путей из статьи (`cover`, `short-version`, `three-conditions`, `what-changes`).
