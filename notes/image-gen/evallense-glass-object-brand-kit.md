# EvalLense Glass Object Brand Kit

Рабочий бренд-кит для генерации прозрачных 3D glassmorphism-объектов на белых и черных секциях сайта.

Цель: получить серию PNG-ассетов с прозрачным alpha-фоном, которые выглядят как один визуальный мир EvalLense: спокойный premium tech, Apple-grade минимализм, физически убедительное стекло, мягкая рефракция и контролируемый lens-gradient.

Связано:
- `flux2-dev-playbook.md` — настройки FLUX.2 / Draw Things.
- `lora-dataset/README.md` — датасет и captions для будущей style-LoRA.
- `designs/methodology-page/_ds/evallense/README.md` — дизайн-система EvalLense.

---

## 1. Brand Strategy

**Category:** AI-assisted pitch-deck evaluation / investment decision support.

**Audience:** investors, accelerators, analysts, founders preparing evidence-heavy fundraising materials.

**Product promise:** AI structures evidence, scores signals and prepares context; people make the final decision.

**Emotional position:** calm confidence, explainable intelligence, premium diligence, no hype.

**Core metaphor:** a lens that refracts raw pitch-deck material into structured evidence, scores, risks and decision context.

**Visual object logic:** transparent glass objects should feel like instruments of evaluation: lens, matrix, score prism, evidence tray, decision dial, layer stack, deck scanner. They are not dashboards and not generic AI ornaments.

**Avoid:** shields, locks, cyber-security metaphors, people, hands, faces, harsh neon, random icons, flat screenshots, fake UI clutter, printed text, dense data.

---

## 2. Core Visual DNA

Use this thinking in every prompt:

- Premium hyperrealistic 3D glassmorphism object.
- Clear / frosted optical glass, transparent acrylic, carved glass, raised glass UI details.
- Thick polished bevels, thin hairline borders, soft caustic-like reflections.
- Internal pastel refraction, never flat painted color.
- One central object or object group, floating in transparent space.
- Strong silhouette, readable at website scale.
- Text only when necessary; if used, text must be physically embossed, engraved or raised in glass.
- The final output must behave like an isolated transparent PNG asset.

Brand gradient:

```text
violet #6C4CF1 -> lavender #A99BFF -> cyan #2EC5E8 -> aqua #36E0C2
```

Color roles:

- Violet / lavender: AI, advisory layer, context, interpretation.
- Cyan / aqua: human review, active state, final decision, confidence.
- Pearl white / icy blue: light-section readability.
- Deep dark glass / violet-cyan rim: ink-section readability.
- Amber `#e8943a`: use only for attention / review signal, never as decoration.

---

## 3. Transparency Contract

Every final asset must satisfy this:

- Transparent alpha outside the object silhouette.
- No full-canvas background.
- No white, gray, black, gradient or patterned rectangle behind the object.
- No fake transparent checkerboard.
- No floor, wall or shadow plane.
- Only object-bound shadow, object-bound reflection, object-bound glow.
- Enough transparent margin around the object for responsive cropping.

If a generator cannot truly output alpha, render on a perfectly separable solid key background and remove it in post. The final file still must be transparent PNG or transparent WebP.

---

## 4. Master Prompt: Light Section

Use for objects that sit on white / off-white website sections.

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense light brand style.

The object represents AI-assisted pitch-deck evaluation: raw deck material being refracted through a calm analytical lens into structured evidence, scores, risks, or human decision context. Make it feel like a premium product-rendered glass instrument, not a flat UI screenshot.

STYLE:
- Futuristic, calm, Apple-grade, premium tech aesthetic.
- Very high transparency glass, frosted clear surfaces, soft refraction, polished thick glass edges.
- Objects should feel like carved glass, embossed glass, or raised transparent acrylic.
- Buttons, labels, numbers and short words, if any, must look physically made of glass: raised, beveled, translucent, slightly refractive, not flat printed text.
- Use soft depth, gentle shadows inside the object, thin hairline borders, and subtle highlights.
- More airy and delicate than the dark version.

BRAND COLORS:
- Use the EvalLense gradient softly: violet #6C4CF1 -> lavender #A99BFF -> cyan #2EC5E8 -> aqua #36E0C2.
- Colors must be lighter, softer, and more pastel than the dark version.
- Use pale lavender, soft cyan, light aqua, icy blue, pearl white.
- Avoid harsh neon. No heavy saturation.
- The object should feel premium, clean, and luminous.

BACKGROUND / TRANSPARENCY:
- The object should be rendered as if photographed on a clean white / off-white studio background.
- But the final image must have NO actual background.
- Everything outside the outer silhouette of the object must be fully transparent alpha.
- Keep only the object, its glass body, internal refractions, soft object-bound highlights, and subtle object-bound shadow/reflection.
- Do not create a white rectangle, gray canvas, gradient backdrop, checkerboard, floor, wall, or full-frame glow.
- The object should remain readable on a white website section because its glass edges, shadows and soft color refractions are visible.

LIGHTING:
- Soft white studio lighting baked into the glass object.
- Gentle top-left highlights.
- Subtle pearl reflections.
- Very soft pastel violet/cyan/aqua rim light.
- Object-bound shadow only, very soft and minimal.
- No large background haze.

COMPOSITION:
- One clear central object or object group.
- Floating in space, centered, with transparent margin around it.
- Slight 3/4 perspective.
- Strong readable silhouette.
- Minimal text only if needed.
- Text and buttons should be glass-embossed, raised, carved, or engraved into the object.
- No people, no hands, no faces, no random logos.

MATERIAL:
- Ultra-clear glass / frosted glass / translucent acrylic.
- High transparency, around 50-80% visible-through feeling.
- Beveled edges.
- Soft caustic-like reflections.
- Thin white highlights along edges.
- Internal pastel gradient refraction, not painted flat color.

NEGATIVE:
- no fake transparent checkerboard
- no white background rectangle
- no gray canvas
- no full-canvas background
- no flat UI screenshot
- no printed flat text
- no heavy dark panels
- no harsh neon
- no cyberpunk clutter
- no plastic look
- no metal overload
- no people
```

---

## 5. Master Prompt: Dark Section

Use for objects that sit on black / ink website sections.

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense brand style.

The object represents AI-assisted pitch-deck evaluation: raw deck material being refracted through a calm analytical lens into structured evidence, scores, risks, or human decision context. Make it feel like a premium product-rendered glass instrument, not a flat UI screenshot.

STYLE:
- Futuristic, calm, Apple-grade, premium tech aesthetic.
- Hyperrealistic glass, frosted transparent surfaces, thick polished glass edges, subtle refraction, soft internal glow.
- Use translucent / semi-transparent objects, not flat UI.
- Thin hairline borders, layered depth, soft reflections attached to the object.
- No clutter, no noisy details, no cheap sci-fi, no cartoon style.

BRAND COLORS:
- Main lens gradient: violet #6C4CF1 -> lavender #A99BFF -> cyan #2EC5E8 -> aqua #36E0C2.
- Use violet/lavender for advisory / AI / context elements.
- Use cyan/aqua for active / human / final decision elements.
- Keep the palette restrained. Mostly dark glass with controlled violet-cyan highlights.

BACKGROUND / TRANSPARENCY:
- The final image must have NO full-canvas background.
- Render the object as if it was photographed on a deep black cinematic background, but remove the outer background completely.
- Keep only the object, its internal dark glass surfaces, attached glows, rim lights, and object-bound reflections.
- Everything outside the outer silhouette of the object must be fully transparent alpha.
- Do not create a fake checkerboard background.
- Do not place the object on a white, gray, black, gradient, or patterned canvas.
- Output should look like a transparent PNG asset: isolated object only.

COMPOSITION:
- One clear central object or object group.
- Floating in space, centered, with enough empty transparent margin around it.
- Slight 3/4 perspective, premium product-render lighting.
- Strong silhouette, readable at website scale.
- Minimal text only if needed. Use short labels, clean sans-serif or mono typography.
- No people, no hands, no faces, no logos unless explicitly requested.

LIGHTING:
- Black-environment lighting baked into the object only.
- Soft violet and cyan rim lights.
- Subtle glow around glass edges, but glow must stay attached to the object and fade naturally.
- No large background bloom or full-frame haze.
- No floor, no wall, no shadow plane. Only object-bound reflection or glow.

NEGATIVE:
- no fake transparent checkerboard
- no full background
- no flat dashboard screenshot
- no dense text
- no random icons
- no plastic look
- no metallic chrome overload
- no neon cyberpunk clutter
- no people
- no shields, locks, or security metaphors unless specifically requested
```

---

## 6. Object Families

Use one object family per generation. Do not mix too many metaphors.

### A. Lens Matrix

Best for hero, methodology and scoring sections.

```text
Central object: a thick transparent biconvex glass lens intersecting a small stack of translucent pitch-deck cards. The cards refract through the lens into a clean floating matrix of raised glass score cells. The cells contain only abstract bars, dots and short embossed marks, no readable printed text. One cyan/aqua decision cell is subtly more active than the advisory violet cells.
```

### B. Evidence Prism

Best for explainability / evidence sections.

```text
Central object: a clear triangular optical prism made of frosted glass, with three translucent deck sheets entering from one side and splitting into three restrained evidence streams. The streams appear as thin raised glass ribbons with pale violet, cyan and aqua refractions. Keep the form elegant, sparse and physically plausible.
```

### C. Human Decision Dial

Best for human-in-the-loop sections.

```text
Central object: a circular glass decision dial with layered transparent rings. Outer rings show advisory signals in soft violet/lavender; the inner final ring glows subtly in cyan/aqua. Add a small raised glass pointer or selector, but no hands and no person. It should suggest that the final call is controlled by a human, not made by AI.
```

### D. Layer Stack

Best for process / methodology sections.

```text
Central object: four stacked horizontal glass layer-bars connected by thin hairline vertical glass channels. A single subtle lens-gradient thread moves from top to bottom, becoming cleaner and more structured through each layer. Use raised transparent labels only if necessary, engraved into the glass, not printed.
```

### E. Deck Scanner

Best for product explanation / demo sections.

```text
Central object: a floating transparent glass scanner frame holding a few pitch-deck cards. A soft lens-gradient scan line passes across the cards and produces a small evidence tray beside it. The tray is made of clear beveled glass with restrained violet-cyan internal refractions.
```

### F. Review Signal

Best for risk, injection, confidence or caveat sections.

```text
Central object: a calm glass evidence tray where one small amber-tinted glass marker is gently separated from a group of violet/cyan markers. The amber marker means "review signal", not danger or rejection. No warning icons, no shields, no locks, no red alert styling.
```

---

## 7. Ready-to-Run Prompts

### Light: Lens Matrix

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense light brand style: a thick transparent biconvex glass lens intersecting a small stack of translucent pitch-deck cards, refracting them into a clean floating matrix of raised glass score cells. Use ultra-clear and frosted optical glass, polished bevels, thin hairline borders, soft caustic-like reflections and very high transparency. The EvalLense gradient appears only as internal pastel refraction and edge light: violet #6C4CF1, lavender #A99BFF, cyan #2EC5E8 and aqua #36E0C2, softened into pale lavender, icy blue and light aqua. Render as if photographed on a clean white/off-white studio background, but the final image must have fully transparent alpha outside the object silhouette. Keep only the object, object-bound highlights, tiny object-bound shadow/reflection and transparent margin. Slight 3/4 perspective, centered, strong silhouette, no people, no hands, no logos, no fake checkerboard, no background rectangle, no flat UI screenshot, no printed text, no harsh neon.
```

### Dark: Lens Matrix

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense brand style: a dark transparent biconvex glass lens intersecting a small stack of translucent pitch-deck cards, refracting them into a clean floating matrix of raised glass score cells. Use frosted transparent surfaces, thick polished glass edges, subtle refraction, soft internal glow, layered depth and thin hairline borders. The EvalLense lens gradient appears as controlled violet #6C4CF1, lavender #A99BFF, cyan #2EC5E8 and aqua #36E0C2 rim light, with violet/lavender for advisory context and cyan/aqua for active human decision elements. Render as if photographed on a deep black cinematic background, but remove the outer background completely: fully transparent alpha outside the object silhouette. Keep only internal dark glass surfaces, attached glows, rim lights and object-bound reflections. Slight 3/4 perspective, centered, strong silhouette, no people, no hands, no logos, no fake checkerboard, no full background, no flat dashboard screenshot, no dense text, no cyberpunk clutter, no shields, no locks.
```

### Light: Evidence Prism

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense light brand style: a clear triangular optical prism made of frosted glass, with three translucent pitch-deck sheets entering from one side and splitting into three restrained evidence streams made of raised glass ribbons. The object should feel carved from ultra-clear optical glass with polished bevels, thin white edge highlights, soft caustics and delicate internal refraction. Use the EvalLense gradient only as pastel refraction inside the glass: violet #6C4CF1, lavender #A99BFF, cyan #2EC5E8 and aqua #36E0C2, all pale and luminous. Render for a clean white/off-white studio environment, but output transparent alpha outside the object; no background rectangle, floor, wall, full-frame glow or checkerboard. Centered, floating, slight 3/4 perspective, readable silhouette, no people, no logos, no printed text.
```

### Dark: Human Decision Dial

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense brand style: a circular transparent glass decision dial with layered rings, where outer advisory rings glow softly in violet #6C4CF1 and lavender #A99BFF and the inner final decision ring glows in cyan #2EC5E8 and aqua #36E0C2. Add a small raised glass selector, physically beveled and translucent, suggesting human control without showing any person or hand. Use dark frosted glass, thick polished edges, subtle refraction, attached rim lights, object-bound reflections and restrained internal glow. Render as if photographed on a deep black cinematic background, but final output must have transparent alpha outside the object silhouette. No full background, no floor, no wall, no fake checkerboard, no flat dashboard, no dense text, no shields, no locks, no cyberpunk clutter.
```

### Light: Review Signal

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense light brand style: a calm transparent glass evidence tray with several small raised glass markers in pale violet/cyan/aqua refraction, and one tiny amber #e8943a glass marker gently separated to the side as a review signal. Make the amber marker soft and premium, not alarming. Use ultra-clear frosted glass, polished bevels, hairline borders, pearl reflections, soft caustics and object-bound shadow only. Render as if photographed on a white/off-white studio background, but final output must have fully transparent alpha outside the object silhouette. No warning icons, no red alert styling, no shields, no locks, no people, no printed text, no background rectangle, no fake checkerboard.
```

### Dark: Layer Stack

```text
Create a premium hyperrealistic 3D glassmorphism object in the EvalLense brand style: four stacked horizontal dark transparent glass layer-bars connected by thin hairline vertical glass channels. A single subtle lens-gradient thread descends through the layers, shifting from violet #6C4CF1 and lavender #A99BFF advisory context into cyan #2EC5E8 and aqua #36E0C2 final decision clarity. Use frosted transparent surfaces, thick polished bevels, soft internal glow, attached rim lights and object-bound reflections only. Render as if photographed on deep black cinematic background, but remove the entire outer background so everything outside the object silhouette is transparent alpha. No floor, no wall, no full-frame haze, no fake checkerboard, no flat UI screenshot, no dense text, no people, no shields, no locks.
```

---

## 8. Generation Settings

Recommended working settings for FLUX.2 / Draw Things are in `flux2-dev-playbook.md`. Short version:

- Iterate locally on FLUX.2 Klein 9B when speed matters.
- Use FLUX.2 dev in cloud for final production frames.
- Use 4-6 reference images at weight around `0.6-0.8` once a hero object is approved.
- Generate around `1280x960`, `1536x864`, or comparable 1.3-1.5MP working sizes, then upscale.
- Final assets: transparent PNG source; optimized transparent WebP for site.

Suggested aspect ratios:

- Hero / wide object: `16:9`.
- Section illustration: `4:3`.
- Tall process object: `3:4`.
- Icon-like object: `1:1`.

---

## 9. QA Checklist

Before an image enters the site:

- [ ] Transparent alpha outside the object.
- [ ] No hidden full-frame rectangle when placed on white and black backgrounds.
- [ ] Object readable on its target surface.
- [ ] Glass details are physical, not flat UI paint.
- [ ] Brand gradient appears as refraction / rim / internal glow, not a rainbow overlay.
- [ ] No people, hands, faces, logos, shields or locks.
- [ ] No dense or garbled text.
- [ ] The metaphor supports EvalLense: evidence, lens, scoring, review, human final decision.
- [ ] Looks consistent with other EvalLense media assets.

---

## 10. Naming Convention

Use predictable names:

```text
evallense-glass-[surface]-[object-family]-[variant]-src.png
evallense-glass-[surface]-[object-family]-[variant].webp
```

Examples:

```text
evallense-glass-light-lens-matrix-01-src.png
evallense-glass-dark-layer-stack-01.webp
evallense-glass-light-review-signal-01.webp
```

