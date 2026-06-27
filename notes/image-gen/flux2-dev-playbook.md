# EvalLense · FLUX.2 [dev] 6-bit — Draw Things Playbook

> Как настраивать и гонять **FLUX.2 [dev] (6-bit)** в Draw Things под картинки сайта
> (hero / demo / layers в фирменном lens-стиле). Цель: «журнальное» качество,
> единый бренд-стиль, без выдуманного текста на картинке.
>
> Контекст железа: **Mac, 32 ГБ unified memory.** Все цифры даны под это.
> Связано: рабочая схема MCP-генерации — `memory/drawthings-gen-workflow.md`,
> бренд-токены и слоты — `memory/evellense-page-media-slots.md`.

---

## 0. TL;DR — стартовый пресет (dev 6-bit, Draw Things)

| Поле в Draw Things | Значение | Почему |
|---|---|---|
| **Model** | FLUX.2 [dev] (6-bit) | топ-качество, самый лёгкий dev-квант (~24 ГБ) |
| **Sampler** | **Euler A Trailing** (альт: DPM++ 2M Trailing / DDIM Trailing) | «Trailing»-семплеры оптимальны для flow-моделей (Flux/SD3) |
| **Steps** | **28** (диапазон 28–32; 50 = максимум, прироста мало) | официальный дефолт dev: 50, «28 — хороший трейд-офф» |
| **Text Guidance (CFG)** | **4.0** (диапазон 3.5–4.5) | дефолт dev = 4; выше 5 — пережор, артефакты |
| **Shift** | **Resolution-dependent shift = ON** (авто; вручную ~3.16 @1024, ~1.88 @512) | flow-модели требуют resolution-aware shift |
| **CFG-Zero (cfg_zero_star)** | **ON** | улучшает flow matching на старте сэмплинга |
| **Seed Mode** | Scale Alike | стабильный сид при смене разрешения |
| **Negative prompt** | почти не работает (dev guidance-distilled) | держим короткий «страховочный», но опираемся на позитивные формулировки |
| **Hi-Res Fix** | OFF на черновике → финал апскейлим отдельно (см. §6) | дешевле и чище, чем hires в один проход |

**Рабочий размер под 32 ГБ:** держи кадр **≤ ~1.3–1.5 MP** (16:9 → **1536×864**; 4:3 → **1280×960**),
потом апскейл ×2 (§6). FLUX.2 поддерживает любой аспект до 4 MP, но на 32 ГБ в 6-bit
сразу 4 MP — риск свопа. Лучше «генерь меньше → апскейль».

---

## 1. Промптинг под FLUX.2 (это НЕ SD/Midjourney)

FLUX.2 понимает промпт через **Mistral-24B VLM** — это языковая модель, не CLIP/T5.
Правила меняются кардинально:

1. **Натуральная проза, не теги.** Не `lens, white bg, hairline, minimal`, а связное описание сцены.
   - ❌ `cat, windowsill, sunlight, cozy`
   - ✅ `A tabby cat curled on a sunny windowsill, warm afternoon light on its striped fur`
2. **Структура: Subject → Action/State → Style → Context.** Главный объект — в начало (front-load).
3. **Длина 30–80 слов** на «чистую» картинку. Слишком короткий промпт → артефакты и потеря деталей.
4. **Hex-цвета работают**, если рядом слово `color`: `a marker in #6C4CF1 color`. Используем бренд-хексы напрямую.
5. **Материалы и свет — конкретно:** `transparent optical glass`, `hairline 1px borders`, `soft studio lighting`,
   `gentle caustics`, `seamless white background`. Сильные существительные + материал + свет = предсказуемый результат.
6. **Negative prompt не нужен** в обычном смысле. Пиши позитивно: вместо `no blur` → `sharp focus`;
   вместо `no text` → `clean surfaces with no lettering anywhere, completely textless`.
7. **Prompt upsampling** (фишка dev): модель сама расширяет короткий промпт через Mistral. Если включишь —
   давай короче и конкретнее; если нет — пиши полную прозу сам.

---

## 2. Бренд-преамбула (вставлять в каждый промпт)

Единый стиль = одинаковая «обёртка» вокруг сюжета. Базовый блок EvalLense:

```
Hyperrealistic macro product visual, Apple-grade minimalism, calm premium technology.
Physically accurate transparent optical glass, hairline 1px structure, lots of negative
space, soft studio lighting, gentle natural shadows, subtle refraction and caustics.
Brand colors appear ONLY inside lens refractions and selected glass edges, shifting
smoothly across deep violet #6C4CF1, soft lavender #A99BFF, cyan #2EC5E8 and aqua #36E0C2 —
restrained and localized, never a large rainbow glow. Completely textless: clean surfaces
with no lettering anywhere. No shields, no padlocks, no security icons, no people, no logos.
```

Фон-варианты (выбирай под секцию):
- **Light:** `clean off-white seamless studio background, #ffffff to #f5f5f7`
- **Ink:** `deep near-black seamless background, #0a0a0d to #1b1b26, lots of dark negative space`

Короткий страховочный negative (на случай протечки):
`text, letters, words, typography, numbers, glyphs, garbled text, watermark, shields, padlocks, people, logos, rainbow glow, clutter, low quality`

---

## 3. Консистентность бренда = Reference Images (ГЛАВНОЕ, вместо LoRA)

FLUX.2 нативно принимает **до 10 референс-картинок** (Draw Things: image-to-image /
moodboard / image-prompt). Это и есть наш способ держать единый стиль hero/demo/layers
**без всякой тренировки**.

- **Эффективный диапазон: 4–6 референсов.** Меньше 3 — мало инфы, больше 8 — толку ноль, только память жрёт.
- **Вес референса: старт 0.7** (рабочий диапазон 0.6–0.8). Ниже — стиль «уплывает», выше — копирует композицию.
- **Воркфлоу:**
  1. Доводим **один эталонный hero** (у нас уже есть сильный кадр-лупа) до идеала.
  2. Кладём его (+1–2 кропа деталей: рим линзы, маркеры-пилюли, рефракция) как референсы.
  3. Генерим demo и layers с этим набором @ вес ~0.7 → они наследуют материал, свет, палитру.
- Так слоты выглядят как одна серия, а не три разные картинки.

> Альтернатива для точных правок поверх готового кадра — **Flux Kontext** (отдельная edit-модель
> в Draw Things, 12B): меняет элементы по тексту, сохраняя стиль. Полезно для локальных доводок
> (передвинуть маркер, сменить фон light↔ink), но как основной генератор для нас — FLUX.2 [dev].

---

## 4. Рецепты под слоты

Бренд-преамбула (§2) + сюжет ниже. Размеры — «черновые», финал апскейлим ×2 (§6).

### hero — 16:9, light, 1536×864
```
A large upright round biconvex magnifying optical lens stands in the RIGHT 60% of the frame;
the entire LEFT 40% is empty calm space for a headline. A few translucent glass pitch-deck
slides hinting at charts and metrics float into the lens from the center. As they pass through
the convex glass they are refracted and sorted into a few clean UNLABELED rounded marker pills
on the right; ONE marker sits apart, glowing slightly — an isolated review-signal pulled aside,
not destroyed. The main refracted stream stays straight, clean and structured.
```

### demo — 4:3, light, 1280×960
```
Two side-by-side translucent glass cards with hairline borders and soft violet depth shadow.
The left card is a pitch-deck slide; the right card is an evaluation report whose content is
suggested by clean rows and a small rounded score badge. One row is gently marked with a single
thin lens-gradient accent line, set apart as a review signal. Calm realistic premium interface.
```
(reference: hero @ 0.7 — чтобы материал/палитра совпали)

### layers — 4:3, ink, 1280×960
```
Four stacked horizontal glass layer-bars connected by thin 1px hairline vertical lines, top to
bottom. A glowing thin thread in the brand gradient descends through the layers and visibly fades
and dims toward the bottom bar. Deep near-black studio background, lots of dark negative space,
soft violet depth, premium editorial diagram aesthetic.
```
(reference: hero-кроп рефракции @ 0.6–0.7)

---

## 5. Куда падают файлы / как гоним

- Через **MCP** (`generate_image`) — но на dev 6-bit генерация долгая, `fetch failed` = таймаут
  обёртки, **не ошибка**: Draw Things дописывает кадр и сохраняет сам в `~/Downloads/evellens img/`
  (`<первые слова промпта>_<seed>.png`). Забираем оттуда. Подробности — `memory/drawthings-gen-workflow.md`.
- Через **приложение** — обычный Generate; результат в Version History (правый клик → Export).
- `output_path` у MCP при таймауте игнорируется — не полагаемся на него.

---

## 6. Финиш-апскейл (тот самый «глянец»)

Не гонимся за большим разрешением в один проход. Лучше: **генерь ~1.3 MP → апскейль ×2**.

- **Upscaler:** RealESRGAN **4x-UltraSharp** (в Draw Things ESRGAN ускорен ~2×).
- **Img2img-доводка после апскейла:** denoise **0.1–0.35** (выше — поплывёт композиция).
- **Ultimate Upscaler LoRA для Flux.2 Klein 9B** (официальная от Draw Things): 4-шаговый проход,
  добивает высокочастотные текстуры и убирает артефакты компрессии. Применять на финальной картинке
  (на Klein 9B как «полироль»), не на этапе основной генерации dev.
- Для веба после апскейла — конвертить в **WebP** (`sharp`), класть по конвенции
  `web/public/assets/<page-folder>/<slot>.webp` (см. media-slots memory).

---

## 7. Производительность и память (32 ГБ) — РЕАЛЬНОСТЬ С ЗАМЕРА

> ⚠️ **Замер на нашем железе: dev 6-bit ≈ ~50 МИНУТ на один кадр @1536×864.**
> 24 ГБ весов + Mistral-энкодер не влезают в 32 ГБ → жёсткий своп. Это **нежизнеспособно**
> ни для итераций, ни даже для финала (риск swap-краша). **Локально dev 6-bit не используем.**

**Рабочая стратегия вместо dev-локально:**
1. **Итерации композиции/смысла — на `FLUX.2 [klein] 9B (8-bit)` локально.** ~10 ГБ, влезает с запасом,
   кадр — секунды/минута, большой скачок качества с нынешней 4B. Здесь крутим раскладку, цвет, amber-маркер.
2. **Финальный «журнальный» кадр — на FLUX.2 [dev] в ОБЛАКЕ** (fal.ai / Replicate / RunComfy):
   полноценный GPU, dev-кадр за секунды, тот же промпт из §4. Скачиваем PNG → апскейл/WebP (§6).
3. dev-LoRA (когда дойдём) — тоже только облако (см. §8), что совпадает.

- Klein 4B (текущая) — только как быстрый набросок; для продакшн-качества переходим на Klein 9B (8-bit).
- Если всё же гнать что-то тяжёлое локально: закрой браузер с вкладками/Photoshop, понижай до ~1024 ширины.

---

## 8. Бренд-LoRA — честная реальность и план

Хотим LoRA под наш lens-стиль. Факты:

- **Тренировка LoRA на FLUX.2 [dev] требует 24 ГБ VRAM минимум, 80 ГБ рекомендовано.**
  На 32 ГБ Mac полноценно **не обучить** (модель 32B + градиенты не влезут; даже QLoRA — на грани).
- LoRA привязана к базе: LoRA, обученная на Klein, **не применится** к dev. Хотим использовать dev →
  и обучать надо на dev → значит **облачный GPU** (Ostris AI Toolkit / RunComfy / fal, 24–80 ГБ).
- Параметры тренировки (ориентир): датасет **15–30** (до 20–60) картинок @1024, **800–1500** шагов
  (RunComfy: до 1000–3000), LR **1e-4** (DT-стиль: 0.0004), **rank 16**, единые натуральные captions,
  trigger word в промпте при использовании.

**Прагматичный план:**
1. **Сейчас:** держим стиль через **reference-images (§3)** — LoRA не нужна для старта.
2. **Параллельно:** копим датасет из лучших dev-кадров (15–25 шт., один стиль) + чищу/captioню — это я делаю по репозиторию.
3. **Когда датасет готов:** обучаем dev-LoRA **в облаке** (не локально), скачиваем `.safetensors`,
   кладём в Draw Things (вкладка PEFT / секция LoRA «+») и применяем поверх dev 6-bit с trigger word.
4. **Локальная альтернатива** (если не хотим облако): обучить LoRA на **Klein 9B** (влезает на Mac с QLoRA)
   и генерить на Klein 9B + Ultimate Upscaler — дешевле и быстрее, но это уже не dev-качество базы.

---

## Источники

- [FLUX.2 model card (HF) — guidance 4, steps 28–50](https://huggingface.co/black-forest-labs/FLUX.2-dev)
- [black-forest-labs/flux2 (official repo) — 32B, prompt upsampling, LoRA](https://github.com/black-forest-labs/flux2)
- [FLUX.2 Mistral text encoder (DeepWiki)](https://deepwiki.com/black-forest-labs/flux2/3.2-text-encoders)
- [Flux 2 prompt guide — proза, hex, нет negative, 30–80 слов](https://www.ambienceai.com/tutorials/flux-prompting-guide)
- [FLUX.2 quantized (GGUF/FP8) settings — Euler, CFG 4, steps 28](https://www.stablediffusiontutorials.com/2025/11/flux-2.html)
- [Draw Things review — Euler A Trailing для Flux, LoRA train params](https://www.heyuan110.com/posts/ai/2026-02-15-draw-things-ultimate-guide/)
- [Draw Things on X — Flux dev: Trailing samplers, shift 1.88@512 / 3.16@1024](https://x.com/drawthingsapp/status/1820881468891295762)
- [FLUX.2 LoRA training (RunComfy/Ostris) — 24–80GB VRAM, 15–60 img, 800–3000 steps](https://www.runcomfy.com/trainer/ai-toolkit/flux-2-dev-lora-training)
- [FLUX.2 multi-image reference — до 10 (раб. 4–6), вес 0.7](https://www.promptus.ai/blog/flux-context-guide-multi-image-ai-generation)
- [Draw Things Ultimate Upscaler LoRA (Flux.2 Klein 9B)](https://x.com/drawthingsapp/status/2054733373281837260)
- [Draw Things WIKI — Flux / Configuration Basics](https://wiki.drawthings.ai/wiki/Flux)
