# Unicorn Screener: инвентарь блога конкурента

Источник: https://www.unicornscreener.vc/blog
Снято: 2026-08-03
Зачем: банк тем и разбор редакционной механики прямого аналога (AI first-pass due diligence, $9 за анализ, 100-балльный алгоритм по 5 измерениям).

Правило: берём углы, форматы и структуру, тексты не копируем. Свои цифры, свои источники, своя фактура из ai-jury-prod.

## Что у них опубликовано (11 статей, все ~3-4 мин)

| Дата | Заголовок | Slug | О чём |
|---|---|---|---|
| 2026-08-02 | Impossible Startup Ideas: Why Disruptive Beats Incremental | `impossible-startup-ideas-disruptive-vs-incremental` | единороги вырастают из идей, которые считали невозможными |
| 2026-08-01 | World Models: The AI Breakthrough That Could Dethrone LLMs | `world-models-the-ai-breakthrough-that-could-dethrone-llms` | венчур Яна ЛеКуна на $1B, world models против LLM |
| 2026-07-21 | 7 Humanoid Robot Startups Racing to Replace Human Labor | `7-humanoid-robot-startups-racing-to-replace-human-labor` | роботы на производстве и складах |
| 2026-07-11 | Cybersecurity Startups: A $244B Market Opportunity in 2026 | `cybersecurity-startups-a-244b-market-opportunity-in-2026` | размер рынка и M&A в безопасности |
| 2026-07-01 | AI Infrastructure vs AI Apps: Where Should VCs Bet? | `ai-infrastructure-vs-ai-apps-where-should-vcs-bet` | распределение GenAI-расходов инфра/приложения |
| 2026-06-21 | 8 Physical AI Startups Racing to Build the Robot Economy | `8-physical-ai-startups-racing-to-build-the-robot-economy` | гуманоиды и «мозги» роботов |
| 2026-06-21 | 8 Quantum & Photonics Startups VCs Are Watching in 2026 | `8-quantum-photonics-startups-vcs-are-watching-in-2026` | deep tech, свет вместо электронов |
| 2026-06-21 | Deal Flow Quality vs Quantity: What the VC Data Says | `deal-flow-quality-vs-quantity-what-the-vc-data-says` | компромиссы стратегии по стадиям |
| 2026-06-21 | How to Evaluate AI Startups Before Writing the Check | `how-to-evaluate-ai-startups-before-writing-the-check` | фреймворк оценки AI-венчуров |
| 2026-05-25 | Why Startups Fail: What the Data Actually Shows | `why-startups-fail-what-the-data-actually-shows` | CB Insights, 431 провалившийся стартап |
| 2026-05-06 | 7 AI Agent Startups Funded by Top VCs in 2026 | `7-ai-agent-startups-funded-by-top-vcs-in-2026` | AI-агенты в legal и HVAC |

Наблюдение: блог запущен в мае 2026, три статьи выкачены одним днём 21 июня (бэкдейтинг или пакетная заливка), дальше ритм примерно 2 статьи в месяц с ускорением к августу.

## Их редакционная механика (разбор на примере `how-to-evaluate-ai-startups`)

- Объём ~1500 слов, помечено «4 min read». Обещание времени стоит на карточке и в шапке.
- Каркас статьи: Key Takeaways сверху → раздел-напряжение («The AI Investment Trap») → 5 разделов-вопросов, каждый заголовок это буквально вопрос инвестора → «How to Put This Into Practice» → короткий вывод → Related Articles с тремя карточками.
- Плотность цифр очень высокая: доля AI в мировом венчуре, прогноз провалов, суммы раундов, бенчмарки маржи. Каждый тезис висит на числе.
- CTA на продукт вшиты в тело текста, не только в конце (бесплатный скрининг, лидерборд).
- Байлайна автора нет, только дата и время чтения.
- Картинки: одна hero сверху плюс превьюшки связанных статей.

## Два их контент-движка

1. **Списки «N стартапов в вертикали X, за которыми следят VC»**: гуманоиды, physical AI, квант и фотоника, кибербез, AI-агенты. Дёшево в производстве, хорошо ловит поиск, естественно ведёт в их скринер.
2. **Данные про сам процесс инвестирования**: почему стартапы падают, качество против количества в дилфлоу, как оценивать AI-стартап. Это их прямой JTBD-контент, самый близкий к нашему.

## Что берём для EvalLens

Наш угол сильнее в движке №2: у них скоринг из внешних данных, у нас панель, которая читает сам дек, плюс 1000+ прогонов собственной фактуры. Кандидаты в контент-план:

- Ответ на «Deal Flow Quality vs Quantity» с нашей стороны: что реально происходит с первым гейтом, когда входящих больше сотни в месяц.
- Свой разбор «почему стартапы не проходят первый гейт» на нашей статистике прогонов, а не на CB Insights.
- Формат «5 вопросов» как каркас, но про то, что видно в деке и чего в деке не хватает (наш Truth Check).
- Контр-тема к их 100-балльному алгоритму: почему единый балл без разбора весов и без полноты данных вводит в заблуждение, и что мы показываем вместо него.
- Их вертикальные списки не копируем как есть: у нас нет их дата-базы. Если делать, то через призму «как такие деки выглядят на входе и где они ломаются».

Связано: [[blog-creator skill]], [[evallense blog marketing framing]], [[blog delivery = notes only]].
