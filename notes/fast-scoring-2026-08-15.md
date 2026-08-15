# Fast-scoring CRO: /pricing · /trust/use-cases · /trust/use-cases/crowdfunding

*Дата: 2026-08-15. Методология: скилл fast-scoring (7 измерений CRO). Контент снят с прода (www.evallens.io), сверен с кодом в `web/src/app/`. Код не менялся.*

**Данность (не предлагать заново):** на сегментных страницах уже живёт оффер «free retro-test through August 31, up to 10 decks» и hero-CTA «See a sample report». Рекомендации ниже касаются только размещения и согласованности уже существующего.

**Сводка оценок (из 10):**

| Измерение | /pricing | /trust/use-cases | /crowdfunding |
|---|---|---|---|
| Value proposition | 8 | 8 | 9 |
| Заголовок | 8 | 8 | 9 |
| CTA | 5 | 6 | 7 |
| Иерархия / сканируемость | 8 | 7 | 8 |
| Trust-сигналы | 6 | 7 | 7 |
| Работа с возражениями | 8 | 6 | 9 |
| Friction | 5 | 7 | 7 |
| **Итог** | **6.9** | **7.0** | **8.0** |

---

## 1. /pricing

**Тип страницы:** pricing. **Целевая конверсия:** Book a demo / заявка на план (доступ = limited partner program, self-serve чекаута нет). **Трафик:** тёплый, из навигации и сегментных страниц.

### Скоринг по измерениям

**1. Value proposition: 8/10.**
«Pay for the event, not every seat» + саб «Each plan gives you a fixed number of evaluated submissions for one event window. No seats, tokens, or usage surprises» проходят 5-секундный тест: модель ценообразования понятна мгновенно, страх meter-billing снят сразу. Минус балл: холодный визитёр не получает «что делает EvalLens» до Bento-секции глубоко внизу; одна строка продуктовой ценности над планами закрыла бы это.

**2. Заголовок: 8/10.**
Паттерн контраста «X, not Y» дифференцирует от per-seat SaaS. Коротко, по-эппловски. Не хватает исхода (ranked cohort), но для utility-страницы допустимо.

**3. CTA: 5/10.** Главная проблема страницы.
- Все три CTA планов («Start Micro», «Start Pitch», «Choose Cohort») ведут на `/company/contact`, общую контакт-страницу. Глагол «Start» обещает self-serve, а в момент максимального интента пользователь получает форму «напишите нам». Разрыв ожидания ровно на пике готовности платить.
- 9+ разных лейблов CTA на одной странице: Start Micro / Start Pitch / Choose Cohort / Talk to sales / Book a demo / Get started / Book a call / Try live demo / Book a partner call. Три разных destination (contact, Calendly, app). Это шум, а не иерархия.
- Футерный блок честно говорит «No public sign-up yet», что тихо противоречит глаголам «Start» выше по странице.

**4. Иерархия / сканируемость: 8/10.**
Логика утилитарной страницы выдержана: founding-баннер → карточки (Cohort помечен recommended) → compare-таблица → fit-матрица «Where EvalLens fits» → Bento → FAQ → финальный CTA. Зачёркнутый list price против founding price даёт якорение. Страница плотная, но для pricing это норм.

**5. Trust: 6/10.**
Есть: ссылки Methodology / Security & Privacy, FAQ «Who makes the final decision? A person», «prompt-injection checks built in», микрогарантия «нечитаемый дек не сгорает». Нет вообще: социального доказательства. Ни канонического числа прогонов (1,000+), ни тестимониалов, ни лого, ни кейс-цифр рядом с ценой. Деньги просят на голой методологии.

**6. Возражения: 8/10.**
FAQ из 11 вопросов закрывает почти всё: что такое submission, «это подписка?», top-up, сгоревшие деки, resubmit, безопасность данных, кто решает. Не закрыто: риск-реверс не собран воедино (гарантийные элементы рассыпаны по FAQ), и выбор плана между 40 и 150 сабмишенов остаётся на пользователе.

**7. Friction: 5/10.**
Детур через контакт-форму после «Start Micro» при живом Calendly в двух кликах ниже. «Get started» в финальном CTA снова ведёт на contact, интент не ясен. «Launch App» в хедере для не-партнёра упирается в стену (доступа нет). Каждый лишний шаг на pricing-странице стоит дороже, чем где-либо.

### Quick Wins
1. Синхронизировать глагол и destination CTA планов: либо вести в Calendly с предвыбранным планом (параметром), либо переименовать в честное «Book Micro setup» / «Set up my event». Managed-service модель это позволяет: «настроим за день» и есть позиционирование.
2. Добавить одну строку proof рядом с карточками планов: «1,000+ evaluation runs behind the methodology» (каноническое число; на странице сейчас ноль цифр доверия).
3. Подпись-инвариант под карточками: «AI prepares the analysis. You make the final call.» (уже есть в FAQ, поднять к деньгам).
4. Указать год в founding-note карточек («until Aug 31» → «until Aug 31, 2026»), как в баннере: три недели до дедлайна, дата должна читаться однозначно.

### High-Impact
1. Свести все CTA страницы к двум интентам: primary «Book a demo» (Calendly) и secondary «Talk to sales» (mailto/form). Один лейбл на интент, повторённый в ключевых точках, вместо девяти формулировок.
2. Мини-селектор «Which plan fits»: 2–3 вопроса (сколько заявок, сколько событий, нужен ли кастом критериев) → подсветка плана. Снимает plan-anxiety, который сейчас закрыт только одним FAQ про VC.
3. Собрать «Zero-surprise guarantee» строку из уже существующих обещаний: нечитаемый дек не считается + цена фиксируется на 12 месяцев + 180 дней validity. Риск-реверс есть, но невидим как единый блок.

### Test Ideas
- CTA планов: action-first («Start Micro») vs outcome-first («Rank 15 decks»).
- Порядок карточек: Micro слева (лестница вверх) vs Cohort первым (якорь вниз).
- Founding-баннер сверху vs только зачёркнутые list-цены.
- Compare-таблица развёрнута vs свёрнута по умолчанию (длина страницы vs полнота).

### Переписанные варианты (EN)

Headline (текущий: «Pay for the event, not every seat»):
1. «One event. One price. Every deck read.» (ритм триады, добавляет продуктовый исход к модели цены)
2. «Priced per event, not per seat.» (тот же контраст, короче, законченная точка)
3. «Pay for the batch. The final call stays yours.» (модель цены + инвариант в одной строке)

CTA планов (текущие: Start Micro / Start Pitch / Choose Cohort → contact):
1. «Book Micro setup» / «Book Pitch setup» / «Book Cohort setup» (глагол совпадает с реальностью managed-сервиса)
2. «Set up my event» (один лейбл на все планы, план передаётся параметром)
3. «Get ranked in a day» (оффер-led, опирается на позиционирование скорости; тестовый вариант)

Финальный CTA (текущий: «Book a demo» + «Get started»):
1. Primary «Book a demo», secondary «Email us» (убрать двусмысленный «Get started»)
2. Саб-строка: «AI prepares the analysis. You decide.» вместо нейтральной подводки.

---

## 2. /trust/use-cases (хаб)

**Тип страницы:** hub / landing для восьми сегментов. **Целевая конверсия:** переход в сегментную страницу + Book a workflow call. **Трафик:** навигация, сегментные страницы (обратный ход), внешние ссылки на sample report.

### Скоринг по измерениям

**1. Value proposition: 8/10.**
H1 «Make every shortlist easier to explain» + саб «...into evidence, risks, gaps, and questions your team can use before the meeting. AI prepares the read. Your team decides». Выгода (защитимость решения) ясна за 5 секунд, инвариант встроен. Лёгкая абстрактность «shortlist» держит планку, но для тёплого трафика ок.

**2. Заголовок: 8/10.**
Outcome-focused, попадает в JTBD «защитить решение». Хорошо контрастирует с обычным «AI-скрининг быстрее».

**3. CTA: 6/10.**
- Hero: «Book a workflow call» и «See sample output» рендерятся одинаковыми glass-кнопками (ink-поверхность, `StatementHero`/`Button` дают обоим glass). Нет визуального primary, внимание делится 50/50.
- §2b CtaBand: primary «Book a workflow call» и secondary «See it live» ведут на ОДИН И ТОТ ЖЕ Calendly-URL. «See it live» обещает продукт, а открывает календарь: microразрыв доверия.
- Финальный band: третий лейбл для того же Calendly («Book a Demo»). Три имени одного действия на одной странице: workflow call / see it live / book a demo.
- 8 карточек с идентичным «See the workflow»: это как раз хорошо (сканируемость).

**4. Иерархия / сканируемость: 7/10.**
Sample report высоко на странице (сразу §2) — сильнейшее решение: главный актив показан до всех обещаний. Vignettes «Where review breaks» и PinnedSteps работают. Минусы: hero-видео между заголовком и сабом отталкивает CTA ниже фолда на ноутбуках; страница из 9 секций длинна даже для хаба; «Want this for your batch?» идёт до болевых секций, аргумент слегка перевёрнут.

**5. Trust: 7/10.**
Реальный pitch-report в кабинете (show, don't tell) — лучший trust-актив сайта. Секция «The claims above are inspectable» с четырьмя trust-страницами добротная. Honest scope (Available now / Roadmap) обезоруживает. Но: ни одной цифры (1,000+ runs отсутствует), ни тестимониала, ни лого, ни имени.

**6. Возражения: 6/10.**
Карточки «Built for controlled review» бьют по AI-страхам (human control, injection, sensitive by default). Но FAQ на хабе нет, и два верхних вопроса тёплого визитёра не отвечены на странице вовсе: «сколько стоит» (нет ни одной ссылки на /pricing в теле) и «сколько занимает настройка».

**7. Friction: 7/10.**
Якорь на sample output = минимальный порог входа, Calendly = низкий friction. Минусы: выбор из 8 карточек без помощи в самоидентификации; существующий retro-test оффер виден только в body карточки Accelerators, остальные 7 сегментов и сам хаб его не показывают, хотя оффер уже живёт на всех сегментных страницах.

### Quick Wins
1. Задать иерархию hero-CTA: «See sample output» primary (это правильный первый шаг хаба, low-commitment, ведёт к сильнейшему активу), «Book a workflow call» secondary. Сейчас обе glass.
2. Починить «See it live» в §2b: либо убрать (оставить один primary), либо навести на реальный live-актив. Двойная кнопка на один URL с разными обещаниями хуже одной кнопки.
3. Один лейбл для Calendly по всей странице: «Book a workflow call» (и в финальном band вместо «Book a Demo»).
4. Тонкая строка с уже существующим оффером возле «Want this for your batch?»: «First run free through Aug 31, up to 10 decks» (эхо сегментных страниц на уровне хаба, не новый оффер).
5. Цифра доверия у sample output или trust-pack: «1,000+ evaluation runs».

### High-Impact
1. Ответить на «сколько стоит» на хабе: одна строка «Per event, not per seat» + ссылка на /pricing в Honest-scope или финальном band. Сейчас ценовой вопрос обрывает самостоятельное путешествие.
2. Помощь в самоидентификации над сеткой из 8 карточек: строка-роутер «Running a competition? Screening dealflow? Listing projects?» с якорями, или сортировка карточек по приоритету трафика.
3. Переставить «Want this for your batch?» после «Where review breaks» (боль → доказательство → оффер), либо продублировать CTA-band внизу воронки боли.

### Test Ideas
- Hero: видео autoplay vs статичный постер (LCP + доезд до CTA, особенно mobile).
- Порядок hero-CTA: sample-first vs call-first.
- «See the workflow» vs сегментные глаголы («See the screening flow», «See the dealflow read»).
- Позиция vignettes: до vs после sample output.

### Переписанные варианты (EN)

Headline (текущий: «Make every shortlist easier to explain.»):
1. «Every shortlist, explained.» (жёстче, чистый Apple-statement, тот же смысл)
2. «Shortlists you can defend.» (прямой JTBD защиты решения)
3. «Read everything. Explain every rank.» (двойной императив: полнота чтения + защитимость)

CTA:
1. «See sample output» → «See a real report» (конкретность: это настоящий отчёт, слово real работает сильнее sample)
2. «See sample output» → «Open the sample report» (глагол открытия снижает порог: не поход, а клик)
3. «Book a workflow call» → оставить как канонический лейбл Calendly по всей странице; альтернатива для теста «Map my workflow» (выгода вместо процедуры).
Саб финального band: добавить инвариант «AI prepares the read. Your team makes the call.»

---

## 3. /trust/use-cases/crowdfunding (лидер панель-ревью)

**Тип страницы:** сегментный landing для регулируемых CSP (ECSPR). **Целевая конверсия:** Scope the pilot (Calendly). **Трафик:** хаб use-cases, прямые заходы compliance/операционных ролей, аутрич.

### Скоринг по измерениям

**1. Value proposition: 9/10.**
«Screen every project owner in days. Keep the file your NCA will ask for» бьёт в оба рога дилеммы сегмента (скорость листинга vs защитимость файла) на языке клиента: NCA, ECSPR, KIIS, Art. 12/26. Лучшая message-market подгонка из трёх страниц. Единственная оговорка: плотный EU-жаргон сознательно отсекает нерегулируемые платформы; для целевого ICP это плюс.

**2. Заголовок: 9/10.**
Два коротких предложения, обе выгоды, ноль воды. Саб длинноват (три плотные строки), но несёт весь механизм: reads end to end → evidence-linked file → analysts verify → committee decides.

**3. CTA: 7/10.**
«Scope the pilot» (Calendly) + «See a sample report» (данность). Проблемы размещения, не состава:
- Обе кнопки на ink-поверхности рендерятся одинаковым glass (переданный `variant: "glass"` игнорируется, но и primary не выделен): нет визуальной иерархии.
- «See a sample report» уводит со страницы на хаб-якорь `#sample-output`, где лежит generic pitch-report, а не screening file. Обещание «report» для CSP-персоны слегка расходится с показанным артефактом.
- Бесплатный первый прогон (существующий оффер) виден только в саб-тексте финального CtaBand, на самом дне страницы. До него доживают не все.

**4. Иерархия / сканируемость: 8/10.**
Ладная арка: StatBand double bind → supervisory chain (Quote → Finding → Routed → Committee → Retained) → 7 шагов с паттерном «You get:» → ESMA-блок → пилотные метрики → FAQ → финальный CTA. Chain-секция отличная. 7 шагов на грани длины, но каждый несёт отдельный regulatory-крючок.

**5. Trust: 7/10.**
Регуляторная грамотность сама по себе trust-план: «Built to ESMA's dialect», честное «No tool can, and we won't claim to», «no quote, no finding», честный ответ на «Who else runs this?» (founding cohort, без выдуманных лого). Но собственных цифр у страницы нет: ни runs count, ни кейса; пилотные метрики пока обещания, не результаты.

**6. Возражения: 9/10.**
Сильнейший FAQ на сайте: разрешено ли AI регулируемому CSP, границы Art. 5/23(11), misread-протокол, какие модели видят документы, интеграция, «кто ещё». Секция «The paragraph your Compliance Officer reads first» снимает блокер-персону превентивно. Оставшийся зазор: цена. «Fixed-fee pilot» без порядка величины, а ссылка «See pricing» ведёт на USD event-планы ($99 Micro), тогда как страница обещает «priced to your monthly inbound, in EUR, invoiced»: клик рождает вопрос вместо ответа.
Плюс внутренняя нестыковка чисел: пилот описан как «Thirty applications» и «Fixed-fee pilot», а финальный оффер как «first run is free through August 31, for batches up to 10 decks». Читателю неясно: пилот платный или бесплатный, 30 или 10.

**7. Friction: 7/10.**
Один Calendly-путь + mailto-фолбэк: хорошо. Friction-точки: оффер спрятан внизу; сэмпл в один клик от страницы, но в другом контексте; pricing-клик со сменой валюты и модели; для compliance-led покупателя нет промежуточной конверсии легче звонка.

### Quick Wins
1. Согласовать лестницу чисел одним копирайт-фиксом: бесплатный retro-run (up to 10 decks, до Aug 31) как вход → fixed-fee parallel pilot (30 applications) как следующий шаг. Сейчас «fixed-fee» и «free», «30» и «10» живут в соседних секциях без связи.
2. Поднять существующий оффер наверх: строка-badge под hero-CTA «First run free through Aug 31 · up to 10 decks» (перенос видимости, не новый оффер).
3. Снять pricing-whiplash: у «See pricing» в §6 либо убрать ссылку, либо подписать ожидание («event plans; CSP screening is priced to inbound, in EUR»).
4. Микро-иерархия hero-CTA: выделить «Scope the pilot» как primary (сейчас обе glass).

### High-Impact
1. Профильный sample-артефакт: redacted screening file (dossier с findings, verification checklist, committee log) вместо перенаправления на generic pitch-report хаба. Для этого ICP артефакт = продукт; текущий сэмпл продаёт соседний сегмент.
2. Лёгкая промежуточная конверсия для compliance-персоны: «Request the security pack» (mailto/форма). Страница сама говорит «the security pack ships before the pilot», но получить его можно только через звонок.
3. Как только появится первый founding-cohort пилот: одна анонимизированная метрика (analyst-hours before/after) в секцию «Measured, not asserted». До тех пор туда же уместно каноническое «1,000+ evaluation runs» на уровне методологии.

### Test Ideas
- Primary hero-CTA: «Scope the pilot» (process-led) vs «Run the free retro-test» (offer-led, оффер уже существует).
- Размещение оффера: hero-badge vs только финальный band.
- Порядок секций для compliance-трафика: FAQ выше пилотных метрик.
- Плотность жаргона на платном трафике: ECSPR-first hero vs speed-first hero (для не-EU платформ).

### Переписанные варианты (EN)

Headline (текущий: «Screen every project owner in days. Keep the file your NCA will ask for.»):
1. «Days to a listing decision. A file that holds.» (тот же двойной JTBD, короче на треть)
2. «Screen in days. Keep the record for years.» (зеркалит «5 yrs» из StatBand, симметрия days/years)
3. «Fast enough for the deal. Documented enough for the NCA.» (открытая формула дилеммы; длиннее, но тестопригодна)

CTA:
1. «Scope the pilot» → «Scope your pilot» (притяжательность повышает ownership; минимальный дифф)
2. «Book the 30-minute scoping call» (конкретность длительности снижает страх продажного звонка)
3. Offer-led вариант для теста: «Run the free retro-test» (использует существующий оффер как вход; primary до Aug 31, после дедлайна возврат к Scope the pilot)

Финальный band: саб уже несёт оффер; добавить инвариант-строку «EvalLens prepares the file. Your committee decides.» (сейчас инвариант есть в How-it-works, но не в точке конверсии).

---

## Кросс-страничные наблюдения

1. **Calendly-лейблы расходятся по сайту:** workflow call / demo / partner call / see it live / scope the pilot ведут на один URL. На сегментных страницах специализация оправдана («Scope the pilot»), внутри одной страницы нужен один лейбл на интент.
2. **Каноническое trust-число (1,000+ evaluation runs) не используется ни на одной из трёх страниц.** Ноль цифр социального доказательства на pricing вреднее всего.
3. **Инвариант «AI prepares, human decides» присутствует везде, но не в точках конверсии** (карточки планов, финальные CTA-band). Он одновременно и позиционирование, и снятие главного возражения: место ему рядом с кнопкой.
4. **Generic sample report обслуживает все сегменты.** Для регуляторных сегментов (crowdfunding, tenders, grants) артефакт-сэмпл в их формате даст больший прирост, чем любая правка копии.
