# Сводное ТЗ на изображения — вторая волна статей (4 шт)

Четыре драфта ждут только картинок. Общие правила — канон
[`seven-rooms/TZ-images.md`](seven-rooms/TZ-images.md) §0: lens-градиент 118° единственный акцент
(≤10-12% кадра), обложки 3000×1580 text-free, диаграммы 1600×760-900 c подписями SF/Menlo,
поля ≥100px, без мёртвых зон, вертикального текста нет.

| Статья | Папка `_assets-src/` | Файлы |
|---|---|---|
| Six lenses are not six models | `six-lenses/` | cover + 2 |
| What the ERC ban actually allows | `erc-ban-allows/` | cover + 2 |
| When every application is good | `every-application-good/` | cover + 2 |
| The prompt in a private Slack | `private-slack-prompt/` | cover + 2 |

---

## 1. six-lenses/ (Research, cyan)

**`cover.png`** — «шесть костюмов, один судья». Белая студия. Слева ряд из шести одинаковых
стеклянных фигур-силуэтов, стоящих плечом к плечу, НО у всех шести одна общая тень на полу,
сливающаяся в единый тёмный силуэт (= корреляция, толпа с одним мнением). Справа отдельно —
шесть РАЗНЫХ по форме стеклянных линз (круглая, овальная, призма...), каждая со своей чёткой
отдельной тенью, одна залита градиентом. Контраст «одинаковые с общей тенью vs разные с раздельными».
> FLUX: White studio still: on the left six identical glass figures standing in a row that cast one single merged dark shadow on the floor; on the right six differently shaped glass lenses (disc, oval, prism, ring) each casting its own crisp separate shadow, one lens filled with a violet-lavender-cyan-aqua gradient; the contrast of sameness-with-one-shadow versus difference-with-many-shadows, museum lighting, extreme negative space, no people, no text, no logos, Apple-style minimalism.

**`overlap-gap.svg`** (1600×760) — две группы точек-«мнений». Слева `AI REVIEWERS`: 6 ink-кругов,
сильно перекрывающихся (наложение ~70%), зона наложения затемнена; mono-подпись `21% overlap`.
Справа `HUMAN REVIEWERS`: 6 кругов, почти не перекрывающихся; `3% overlap`. Один градиентный
акцент: обводка правой группы. Eyebrow: `WHOSE OPINIONS ARE OPINIONS`. Низ: атрибуция
`45 experts grading AI-written reviews of Nature-family papers (arXiv, 2026)`.

**`three-tests.svg`** (1600×760) — три карточки-теста ансамбля из статьи (проверь формулировки в
notes/blog/six-lenses-are-not-six-models.md, секция «tests»): номер в градиентном круге + название
+ одна строка сути. Eyebrow: `TEST ANY ENSEMBLE`.

---

## 2. erc-ban-allows/ (Research, orange)

**`cover.png`** — «граница из света». Тёмная сцена (#0b0b0f). Горизонтальная плоскость-стол,
разделённая одной тонкой светящейся градиентной линией на две зоны. Слева, в тени: аккуратные
стопки белых документов, конвейерная лента-намёк (= administration, разрешено, работает).
Справа, за линией: один документ на пьедестале под одиночным холодным белым лучом сверху
(= evaluation, только человек). Никаких запретных знаков, никаких красных цветов — граница
как спокойный факт архитектуры.
> FLUX: Dark minimalist scene: a wide surface divided by one thin glowing violet-lavender-cyan-aqua gradient line into two zones; left zone holds neat stacks of white documents in soft workflow arrangement, dimly lit; right zone holds a single document on a small pedestal under one cold white spotlight from above; a calm architectural boundary, no barrier signs, no red, glossy floor reflections, no people, no text, no logos, cinematic quiet.

**`two-rules.svg`** (1600×760) — сплит: `ERC · MARCH 2026` (нельзя делегировать суждение) vs
`NIH · 2023` (нельзя выносить конфиденциальное). Под каждой — 2-3 строки-пункта из статьи.
Внизу общая градиентная плашка-вывод: `Two fences. One boundary: administration is open, judgment is human.`

**`allowed-table.svg`** (1600×900) — таблица «можно/нельзя» из статьи (возьми все 9 операций из
notes/blog/what-the-erc-ban-actually-allows.md): операция + столбец Allowed (ink-галочка) /
Human only (ink-точка). Одна градиентная строка-заголовок. Eyebrow: `WHAT STILL RUNS`.

---

## 3. every-application-good/ (Research, violet — флагман)

**`cover.png`** — «сито и штангенциркуль». Белая студия, сплит-сцена. Слева крупное стеклянное
сито/решето, сквозь которое просыпались и лежат под ним немногие тёмные крошки-обломки
(= старая работа: отсеять мусор, мусора почти нет). Справа — стеклянный штангенциркуль
(calipers), измеряющий зазор между двумя ПОЧТИ одинаковыми белыми плитами-деками; шкала
инструмента подсвечена градиентом (= новая работа: различать близкое). Метафора статьи дословно.
> FLUX: White studio split scene: on the left a large glass sieve with only a few small dark crumbs fallen through beneath it; on the right a precise glass caliper measuring the tiny gap between two nearly identical white document slabs, the caliper's measuring edge glowing with a violet-lavender-cyan-aqua gradient; old job of sieving versus new job of measuring fine differences, museum lighting, soft shadows, no people, no text, no logos, editorial Apple-style minimalism.

**`sieve-to-calipers.svg`** (1600×760) — было/стало: слева воронка с широким горлом и подписями
`2019 · 20% weak`, справа узкий измерительный зазор `2025 · 5% weak`; между ними стрелка и
mono `+57% volume`. Атрибуция источников из статьи внизу.

**`spread-flag.svg`** (1600×760) — как видимое расхождение решает «различение хорошего от
хорошего»: три заявки-строки с почти равными average (7.1 / 7.0 / 7.2), но у средней Spread-полоса
широкая и градиентная с флажком `CONTESTED — human attention here`, у крайних узкая серая.
Eyebrow: `SAME AVERAGE, DIFFERENT STORY`.

---

## 4. private-slack-prompt/ (Research, orange)

**`cover.png`** — «промпт-призрак против прибора». Тёмная сцена. Слева полупрозрачный,
едва видимый контур чат-пузыря из тонких пунктирных hairline-линий, тающий в темноте
(= безымянный промпт: быстрый, бесплотный, бесследный). Справа — плотный физический
стеклянный прибор-линза на подставке с градиентным ядром и чёткой тенью (= инструмент
с методологией и следом). Без интерфейсов, без текста в пузыре.
> FLUX: Dark scene contrast: on the left a barely visible ghost outline of a chat bubble drawn in thin dashed hairlines, translucent and dissolving into darkness; on the right a solid physical glass instrument, a lens with a violet-lavender-cyan-aqua gradient core mounted on a small stand, casting a crisp shadow with soft reflection; the ephemeral versus the accountable, cinematic quiet, no interface elements, no people, no text, no logos, editorial minimalism.

**`three-invoices.svg`** (1600×760) — «три счёта, которые придут позже»: три карточки
(Irreproducibility · 60% same-input variance / Invented evidence · 17-33% hallucination measured
vs "hallucination-free" claimed / No trail · nothing to show when asked why). Номера в градиентных
кругах, атрибуции из статьи. Eyebrow: `THE INVOICES ARRIVE LATER`.

**`prompt-vs-process.svg`** (1600×900) — таблица-сплит по операциям (same model, different
discipline): rubric fixed? / evidence cited? / same input same score? / who signed? — колонки
`PROMPT` (ink-прочерки) vs `PROCESS` (галочки, одна градиентная строка). Низ: `The models are
the same. The discipline is the difference.`

---

## Приёмка

- [ ] 4 папки, 12 файлов, имена точные
- [ ] Обложки text-free 3000×1580; erc и slack — тёмные, остальные белые
- [ ] Диаграммы: подписи горизонтальны, перенос слов не ломает фразы, поля ≥100px
- [ ] Числа в диаграммах — только из статей (21/3, 60%, 17-33%, +57%, 20→5%, 7.1/7.0/7.2)
- [ ] Кинул файлы → скажи «картинки на месте», публикую все четыре
