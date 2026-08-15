import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EvalLens — Скрининг дилфлоу для VC (one-pager)",
  description:
    "Печатный one-pager для фондов: EvalLens скринит входящий дилфлоу по одной планке, ранжирует шортлист и готовит screening-мемо — финальное решение за человеком.",
  robots: { index: false, follow: false },
};

/* Print-first RU one-pager (A4 x2). Self-contained: own <style>, not the site DS.
   Mirrored to notes/one-pager/one-pager-ru.html, which is the source for PDF export. */
const CSS = `:root{
    --violet:#6c4cf1; --lavender:#a99bff; --cyan:#2ec5e8; --aqua:#36e0c2;
    --lens:linear-gradient(118deg,#6c4cf1 0%,#a99bff 32%,#2ec5e8 68%,#36e0c2 100%);
    --lens-soft:linear-gradient(118deg,rgba(108,76,241,.14),rgba(46,197,232,.12) 60%,rgba(54,224,194,.14));
    --ink:#0a0a0d; --fg:#1d1d1f; --muted:#6e6e73; --border:#e6e6ea; --soft:#f6f6f8;
    --font-display:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Helvetica,Arial,sans-serif;
    --font-ui:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;
    --font-mono:"SF Mono",Menlo,ui-monospace,monospace;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  @page{ size:A4; margin:0; }
  html,body{ background:#fff; }
  body{
    font-family:var(--font-ui); color:var(--fg);
    -webkit-print-color-adjust:exact; print-color-adjust:exact;
    font-size:10.2px; line-height:1.45; letter-spacing:-.003em;
  }
  a{ color:inherit; text-decoration:none; }
  .page{
    width:210mm; height:297mm; padding:12mm 15mm 10mm; margin:0 auto;
    position:relative; display:flex; flex-direction:column;
    background:#fff; overflow:hidden;
  }
  .page + .page{ page-break-before:always; }
  h1,h2,h3{ font-family:var(--font-display); font-weight:600; letter-spacing:-.022em; line-height:1.05; }
  .grad{ background:none; color:var(--cyan); }
  .grad .g-word{ white-space:nowrap; }
  .grad .g-char{ color:var(--g-color); }
  .eyebrow{
    font-family:var(--font-mono); font-size:8px; font-weight:500; letter-spacing:.18em;
    text-transform:uppercase; color:var(--violet); display:inline-flex; align-items:center; gap:6px;
  }
  .eyebrow::before{ content:""; width:5px; height:5px; border-radius:50%; background:var(--lens); }
  .muted{ color:var(--muted); }

  /* ---- top brand bar ---- */
  .brandbar{ display:flex; align-items:center; justify-content:space-between; padding-bottom:6mm; border-bottom:1px solid var(--border); }
  .brand{ display:flex; align-items:center; gap:9px; }
  .brand img{ width:22px; height:24px; object-fit:contain; display:block; }
  .brand .wm{ font-family:var(--font-display); font-weight:600; font-size:17px; letter-spacing:-.02em; color:var(--fg); }
  .brand .rule{ font-family:var(--font-mono); font-size:8px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); margin-left:4px; padding-left:12px; border-left:1px solid var(--border); }
  .brandbar .site{ font-family:var(--font-mono); font-size:8.5px; letter-spacing:.1em; color:var(--muted); }

  /* ---- hero ---- */
  .hero{ padding-top:5mm; }
  .hero h1{ font-size:27px; line-height:1.04; max-width:21ch; margin-top:8px; }
  .hero .sub{ font-size:11px; line-height:1.48; color:var(--muted); max-width:66ch; margin-top:9px; }
  .hero .stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-top:6mm; border:1px solid var(--border); border-radius:12px; overflow:hidden; }
  .hero .stats .cell{ padding:9px 12px; border-right:1px solid var(--border); }
  .hero .stats .cell:last-child{ border-right:0; }
  .hero .stats strong{ font-family:var(--font-display); font-weight:600; font-size:22px; letter-spacing:-.02em; display:block; color:var(--fg); }
  .hero .stats span{ font-size:8.6px; line-height:1.32; color:var(--muted); display:block; margin-top:3px; }

  /* ---- section shell ---- */
  .sec{ margin-top:6mm; }
  .sec > .head{ margin-bottom:6px; }
  .sec .title{ font-size:15.5px; margin-top:5px; letter-spacing:-.02em; }

  /* ---- problem grid ---- */
  .prob{ display:grid; grid-template-columns:1fr 1fr; gap:7px 10px; margin-top:8px; }
  .prob .item{ padding:9px 11px; border:1px solid var(--border); border-radius:10px; background:var(--soft); }
  .prob .item .k{ font-family:var(--font-mono); font-size:7.6px; letter-spacing:.12em; text-transform:uppercase; color:var(--violet); }
  .prob .item .t{ font-family:var(--font-display); font-weight:600; font-size:11px; margin:4px 0 3px; letter-spacing:-.01em; }
  .prob .item .b{ font-size:9.3px; line-height:1.42; color:var(--muted); }

  /* ---- workflow steps ---- */
  .flow{ display:grid; grid-template-columns:1fr; gap:0; margin-top:7px; }
  .step{ display:grid; grid-template-columns:26px 1fr; gap:12px; padding:5.4px 0; border-top:1px solid var(--border); }
  .step:last-child{ border-bottom:1px solid var(--border); }
  .step .n{ font-family:var(--font-mono); font-size:10px; color:var(--muted); padding-top:1px; }
  .step .l{ font-family:var(--font-display); font-weight:600; font-size:11.5px; letter-spacing:-.01em; }
  .step .d{ font-size:9.4px; line-height:1.4; color:var(--muted); margin-top:2px; }
  .step.hl .l .grad{ font-weight:600; }

  /* ---- footer note (page 1) ---- */
  .foot{ margin-top:auto; padding-top:6mm; display:flex; justify-content:space-between; align-items:flex-end; }
  .foot .tag{ font-family:var(--font-mono); font-size:8px; letter-spacing:.1em; color:var(--muted); text-transform:uppercase; }
  .foot .pg{ font-family:var(--font-mono); font-size:8px; color:var(--muted); }

  /* ---- "what you get" list ---- */
  .get{ display:grid; grid-template-columns:1fr 1fr; gap:6px 16px; margin-top:8px; }
  .get .row{ display:flex; align-items:flex-start; gap:9px; padding:7px 0; border-bottom:1px solid var(--border); }
  .get .row .dot{ width:7px; height:7px; border-radius:50%; background:var(--lens); flex:none; margin-top:4px; }
  .get .row .g-t{ font-family:var(--font-display); font-weight:600; font-size:11px; }
  .get .row .g-b{ font-size:9px; color:var(--muted); line-height:1.4; }

  /* ---- trust ink peak ---- */
  .ink{ margin-top:6.5mm; border-radius:16px; padding:9mm 11mm; color:#f5f5f7;
    background:radial-gradient(120% 100% at 82% 0%,rgba(124,92,255,.28),transparent 58%), linear-gradient(160deg,#0a0a0d 0%,#16121f 100%); }
  .ink .eyebrow{ color:#a99bff; }
  .ink .eyebrow::before{ background:var(--lens); }
  .ink h2{ font-size:19px; margin-top:7px; color:#fff; max-width:24ch; }
  .ink h2 .grad{ background:none; color:var(--aqua); }
  .ink .lead{ font-size:10.4px; line-height:1.5; color:rgba(255,255,255,.62); max-width:62ch; margin-top:9px; }
  .ink .pillar{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:6.5mm; }
  .ink .pillar .p .p-t{ font-family:var(--font-display); font-weight:600; font-size:10.6px; color:#fff; }
  .ink .pillar .p .p-b{ font-size:9px; line-height:1.42; color:rgba(255,255,255,.55); margin-top:3px; }
  .ink .kicker{ margin-top:6.5mm; padding-top:5mm; border-top:1px solid rgba(255,255,255,.14); font-family:var(--font-display); font-weight:600; font-size:15px; letter-spacing:-.02em; }
  .ink .kicker .grad{ background:none; color:var(--aqua); }

  /* ---- use cases ---- */
  .uc{ display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-top:8px; }
  .uc .c{ padding:9px 10px; border:1px solid var(--border); border-radius:10px; }
  .uc .c .u-t{ font-family:var(--font-display); font-weight:600; font-size:10.4px; letter-spacing:-.01em; }
  .uc .c .u-b{ font-size:8.7px; line-height:1.4; color:var(--muted); margin-top:4px; }

  /* ---- CTA ---- */
  .cta{ margin-top:6.5mm; border:1px solid var(--border); border-radius:14px; padding:8mm 11mm; background:var(--soft);
    display:flex; align-items:center; justify-content:space-between; gap:20px; }
  .cta .c-t{ font-family:var(--font-display); font-weight:600; font-size:15px; letter-spacing:-.02em; }
  .cta .c-t .grad{ background:none; color:var(--cyan); }
  .cta .c-s{ font-size:9.4px; color:var(--muted); margin-top:4px; max-width:48ch; line-height:1.4; }
  .cta .actions{ display:flex; flex-direction:column; gap:7px; flex:none; }
  .cta .btn{ font-family:var(--font-ui); font-size:9.6px; font-weight:500; padding:9px 16px; border-radius:980px; text-align:center; white-space:nowrap; text-decoration:none; display:block; }
  .cta .btn.p{ background:var(--ink); color:#fff; }
  .cta .btn.s{ border:1px solid var(--border); color:var(--fg); background:#fff; }

  .endfoot{ margin-top:auto; padding-top:6mm; display:flex; justify-content:space-between; align-items:flex-end; border-top:1px solid var(--border); }
  .endfoot .links{ font-family:var(--font-mono); font-size:8.4px; letter-spacing:.06em; color:var(--muted); }
  .endfoot .links a{ color:var(--muted); }
  .endfoot .links a.home{ color:var(--fg); font-weight:600; }
  .endfoot .pg{ font-family:var(--font-mono); font-size:8px; color:var(--muted); }`;

const BODY = `<!-- ============ PAGE 1 ============ -->
<section class="page">
  <div class="brandbar">
    <div class="brand">
      <img src="/assets/brand/evallense-logo.webp" alt="" />
      <span class="wm">EvalLens</span>
      <span class="rule">AI готовит анализ — решает человек</span>
    </div>
    <a class="site" href="https://evallens.io">evallens.io</a>
  </div>

  <div class="hero">
    <span class="eyebrow">Отбор заявок для инвестиционных фондов</span>
    <h1>Разбирайте входящие заявки быстрее — и не упустите <span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">л</span><span class="g-char" style="--g-color:rgb(145, 123, 249)">у</span><span class="g-char" style="--g-color:rgb(144, 163, 250)">ч</span><span class="g-char" style="--g-color:rgb(71, 189, 237)">ш</span><span class="g-char" style="--g-color:rgb(49, 208, 217)">у</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">ю</span></span></span>.</h1>
    <p class="sub">EvalLens внимательно читает каждую входящую презентацию и оценивает все по одинаковым правилам — чтобы сильный проект не затерялся в общем потоке. Целую пачку заявок можно разобрать за день, а окончательное решение всегда остаётся за вами.</p>

    <div class="stats">
      <div class="cell"><strong>1</strong><span>единые правила оценки для всех заявок — без разнобоя между людьми</span></div>
      <div class="cell"><strong>100%</strong><span>входящих заявок разбираются внимательно, а не бегло пролистываются</span></div>
      <div class="cell"><strong>4–5 мин</strong><span>занимает разбор одной презентации</span></div>
      <div class="cell"><strong>1000+</strong><span>проверок, на которых отлажена оценка</span></div>
    </div>
  </div>

  <div class="sec">
    <div class="head">
      <span class="eyebrow">Почему разбирать вручную не получается</span>
      <h2 class="title">Заявок много. <span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">В</span><span class="g-char" style="--g-color:rgb(115, 85, 243)">р</span><span class="g-char" style="--g-color:rgb(122, 94, 244)">е</span><span class="g-char" style="--g-color:rgb(129, 103, 246)">м</span><span class="g-char" style="--g-color:rgb(136, 112, 247)">е</span><span class="g-char" style="--g-color:rgb(143, 122, 249)">н</span><span class="g-char" style="--g-color:rgb(150, 131, 251)">и</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(157, 140, 252)">в</span><span class="g-char" style="--g-color:rgb(164, 149, 254)">н</span><span class="g-char" style="--g-color:rgb(164, 157, 254)">и</span><span class="g-char" style="--g-color:rgb(150, 161, 251)">м</span><span class="g-char" style="--g-color:rgb(136, 166, 249)">а</span><span class="g-char" style="--g-color:rgb(122, 171, 246)">т</span><span class="g-char" style="--g-color:rgb(108, 176, 244)">е</span><span class="g-char" style="--g-color:rgb(93, 181, 241)">л</span><span class="g-char" style="--g-color:rgb(79, 186, 238)">ь</span><span class="g-char" style="--g-color:rgb(65, 191, 236)">н</span><span class="g-char" style="--g-color:rgb(51, 195, 233)">о</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(47, 199, 229)">п</span><span class="g-char" style="--g-color:rgb(48, 202, 225)">р</span><span class="g-char" style="--g-color:rgb(48, 205, 220)">о</span><span class="g-char" style="--g-color:rgb(49, 208, 216)">ч</span><span class="g-char" style="--g-color:rgb(50, 212, 212)">и</span><span class="g-char" style="--g-color:rgb(51, 215, 207)">т</span><span class="g-char" style="--g-color:rgb(52, 218, 203)">а</span><span class="g-char" style="--g-color:rgb(53, 221, 198)">т</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">ь</span></span></span> — не хватает.</h2>
    </div>
    <div class="prob">
      <div class="item"><div class="k">Объём</div><div class="t">Поток не иссякает</div><div class="b">Заявок за неделю приходит больше, чем команда успевает внимательно прочитать.</div></div>
      <div class="item"><div class="k">Время</div><div class="t">Всё держится на нескольких людях</div><div class="b">Первые заявки читают вдумчиво, дальше — по диагонали. А сильный проект может оказаться как раз в конце.</div></div>
      <div class="item"><div class="k">Единые правила</div><div class="t">Планка всё время разная</div><div class="b">Один смотрит на выручку, другой — на команду. Дважды оценить одинаково не получается.</div></div>
      <div class="item"><div class="k">Прозрачность</div><div class="t">Решение потом не объяснить</div><div class="b">Через полгода уже не вспомнить, почему заявку взяли или отклонили — ни коллегам, ни инвесторам фонда.</div></div>
    </div>
  </div>

  <div class="sec">
    <div class="head">
      <span class="eyebrow">Весь путь — от загрузки до решения</span>
      <h2 class="title">Как проходит один отбор</h2>
    </div>
    <div class="flow">
      <div class="step"><div class="n">01</div><div><div class="l">Соберите заявки</div><div class="d">Основатели стартапов присылают презентации, вы добавляете свои — всё собирается в одном месте.</div></div></div>
      <div class="step"><div class="n">02</div><div><div class="l">Задайте свои правила оценки</div><div class="d">Выберите шкалу и то, что для вас важнее, — под задачи именно вашего фонда.</div></div></div>
      <div class="step"><div class="n">03</div><div><div class="l">Запустите разбор</div><div class="d">EvalLens разбирает каждую презентацию по пунктам — примерно 4–5 минут на заявку после загрузки.</div></div></div>
      <div class="step"><div class="n">04</div><div><div class="l">Посмотрите общий рейтинг</div><div class="d">Все заявки выстроены по вашим правилам в единый список — сразу видно всех, от сильных к слабым.</div></div></div>
      <div class="step hl"><div class="n">05</div><div><div class="l"><span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">П</span><span class="g-char" style="--g-color:rgb(118, 89, 243)">о</span><span class="g-char" style="--g-color:rgb(128, 102, 246)">с</span><span class="g-char" style="--g-color:rgb(139, 116, 248)">т</span><span class="g-char" style="--g-color:rgb(149, 129, 250)">а</span><span class="g-char" style="--g-color:rgb(159, 142, 253)">в</span><span class="g-char" style="--g-color:rgb(169, 155, 255)">ь</span><span class="g-char" style="--g-color:rgb(149, 162, 251)">т</span><span class="g-char" style="--g-color:rgb(128, 169, 247)">е</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(108, 176, 244)">с</span><span class="g-char" style="--g-color:rgb(87, 183, 240)">в</span><span class="g-char" style="--g-color:rgb(66, 190, 236)">о</span><span class="g-char" style="--g-color:rgb(46, 197, 232)">и</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(47, 202, 226)">о</span><span class="g-char" style="--g-color:rgb(49, 206, 219)">ц</span><span class="g-char" style="--g-color:rgb(50, 211, 213)">е</span><span class="g-char" style="--g-color:rgb(51, 215, 207)">н</span><span class="g-char" style="--g-color:rgb(53, 220, 200)">к</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">и</span></span></span></div><div class="d">Пройдитесь по списку, опираясь на разбор от AI, и поставьте оценки на основе своего опыта. Последнее слово — за вами, а не за программой.</div></div></div>
      <div class="step"><div class="n">06</div><div><div class="l">Раздайте краткие справки коллегам</div><div class="d">По каждой заявке — справка на одну страницу: суть проекта, риски, чего не хватает и вывод «изучать подробнее или отказать». Обсуждение начинается не с нуля.</div></div></div>
    </div>
  </div>

  <div class="foot">
    <div class="tag">EvalLens · Краткое описание · Отбор заявок для инвестиционных фондов</div>
    <div class="pg">01 / 02</div>
  </div>
</section>

<!-- ============ PAGE 2 ============ -->
<section class="page">
  <div class="brandbar">
    <div class="brand">
      <img src="/assets/brand/evallense-logo.webp" alt="" />
      <span class="wm">EvalLens</span>
      <span class="rule">AI готовит анализ — решает человек</span>
    </div>
    <a class="site" href="https://evallens.io">evallens.io</a>
  </div>

  <div class="sec" style="margin-top:8mm;">
    <div class="head">
      <span class="eyebrow">Что остаётся на руках</span>
      <h2 class="title">Что <span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">ф</span><span class="g-char" style="--g-color:rgb(169, 155, 255)">о</span><span class="g-char" style="--g-color:rgb(46, 197, 232)">н</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">д</span></span></span> получает после разбора</h2>
    </div>
    <div class="get">
      <div class="row"><span class="dot"></span><div><div class="g-t">Краткая справка по каждой заявке</div><div class="g-b">Суть проекта, сильные стороны, риски и вывод — в одинаковом виде для всех.</div></div></div>
      <div class="row"><span class="dot"></span><div><div class="g-t">Готовый рейтинг заявок</div><div class="g-b">Все проекты оценены по единым правилам — от сильных к слабым.</div></div></div>
      <div class="row"><span class="dot"></span><div><div class="g-t">Вопросы для обсуждения</div><div class="g-b">Что стоит проверить при встрече. Итоговое заключение вы пишете сами.</div></div></div>
      <div class="row"><span class="dot"></span><div><div class="g-t">Риски и нехватка данных</div><div class="g-b">Где в презентации пробелы и что нужно уточнить у основателя.</div></div></div>
      <div class="row"><span class="dot"></span><div><div class="g-t">Единые правила для всех</div><div class="g-b">Все заявки оценены по одной логике — их можно честно сравнивать между собой.</div></div></div>
      <div class="row"><span class="dot"></span><div><div class="g-t">Ссылки на конкретные факты</div><div class="g-b">За каждой оценкой — место в презентации. Есть чем подкрепить решение перед коллегами и инвесторами.</div></div></div>
    </div>
  </div>

  <div class="ink">
    <span class="eyebrow">AI готовит — решают люди</span>
    <h2>Не «чёрный ящик» и не <span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">з</span><span class="g-char" style="--g-color:rgb(122, 94, 244)">а</span><span class="g-char" style="--g-color:rgb(136, 112, 247)">м</span><span class="g-char" style="--g-color:rgb(150, 131, 251)">е</span><span class="g-char" style="--g-color:rgb(164, 149, 254)">н</span><span class="g-char" style="--g-color:rgb(150, 161, 251)">а</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(122, 171, 246)">ч</span><span class="g-char" style="--g-color:rgb(93, 181, 241)">е</span><span class="g-char" style="--g-color:rgb(65, 191, 236)">л</span><span class="g-char" style="--g-color:rgb(47, 199, 229)">о</span><span class="g-char" style="--g-color:rgb(48, 205, 220)">в</span><span class="g-char" style="--g-color:rgb(50, 212, 212)">е</span><span class="g-char" style="--g-color:rgb(52, 218, 203)">к</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">у</span></span></span>.</h2>
    <p class="lead">EvalLens разбирает каждую презентацию по шести направлениям — собирает факты, риски и вопросы — и передаёт их людям, которые принимают решение. Программа не выносит приговор. Она просто помогает внимательно прочитать больше заявок: сильный проект получает такой же разбор, как и тот, что пришёл по личной рекомендации.</p>
    <div class="pillar">
      <div class="p"><div class="p-t">Единые правила для всех</div><div class="p-b">Одна и та же логика оценки. Проект «с улицы» разбирают так же внимательно, как пришедший по рекомендации.</div></div>
      <div class="p"><div class="p-t">За каждой оценкой — факт</div><div class="p-b">Оценки опираются на конкретные места в презентации. Их можно обосновать, а не сослаться на интуицию.</div></div>
      <div class="p"><div class="p-t">Итоговую оценку ставите вы</div><div class="p-b">Решение остаётся за людьми. Рейтинг строится по вашей оценке, а не по мнению программы.</div></div>
    </div>
    <div class="kicker"><span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">A</span><span class="g-char" style="--g-color:rgb(113, 82, 242)">I</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(117, 88, 243)">г</span><span class="g-char" style="--g-color:rgb(122, 94, 244)">о</span><span class="g-char" style="--g-color:rgb(127, 100, 245)">т</span><span class="g-char" style="--g-color:rgb(131, 106, 246)">о</span><span class="g-char" style="--g-color:rgb(136, 112, 247)">в</span><span class="g-char" style="--g-color:rgb(141, 119, 249)">и</span><span class="g-char" style="--g-color:rgb(146, 125, 250)">т</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(150, 131, 251)">а</span><span class="g-char" style="--g-color:rgb(155, 137, 252)">н</span><span class="g-char" style="--g-color:rgb(160, 143, 253)">а</span><span class="g-char" style="--g-color:rgb(164, 149, 254)">л</span><span class="g-char" style="--g-color:rgb(169, 155, 255)">и</span><span class="g-char" style="--g-color:rgb(160, 158, 253)">з</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(150, 161, 251)">—</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(141, 165, 250)">р</span><span class="g-char" style="--g-color:rgb(131, 168, 248)">е</span><span class="g-char" style="--g-color:rgb(122, 171, 246)">ш</span><span class="g-char" style="--g-color:rgb(112, 174, 244)">е</span><span class="g-char" style="--g-color:rgb(103, 178, 243)">н</span><span class="g-char" style="--g-color:rgb(93, 181, 241)">и</span><span class="g-char" style="--g-color:rgb(84, 184, 239)">е</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(74, 187, 237)">п</span><span class="g-char" style="--g-color:rgb(65, 191, 236)">р</span><span class="g-char" style="--g-color:rgb(55, 194, 234)">и</span><span class="g-char" style="--g-color:rgb(46, 197, 232)">н</span><span class="g-char" style="--g-color:rgb(47, 199, 229)">и</span><span class="g-char" style="--g-color:rgb(47, 201, 226)">м</span><span class="g-char" style="--g-color:rgb(48, 203, 223)">а</span><span class="g-char" style="--g-color:rgb(48, 205, 220)">е</span><span class="g-char" style="--g-color:rgb(49, 207, 217)">т</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(50, 209, 214)">ч</span><span class="g-char" style="--g-color:rgb(50, 212, 212)">е</span><span class="g-char" style="--g-color:rgb(51, 214, 209)">л</span><span class="g-char" style="--g-color:rgb(52, 216, 206)">о</span><span class="g-char" style="--g-color:rgb(52, 218, 203)">в</span><span class="g-char" style="--g-color:rgb(53, 220, 200)">е</span><span class="g-char" style="--g-color:rgb(53, 222, 197)">к</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">.</span></span></span></div>
  </div>

  <div class="sec">
    <div class="head">
      <span class="eyebrow">Где это пригодится</span>
      <h2 class="title">Собрано под то, как <span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">ф</span><span class="g-char" style="--g-color:rgb(169, 155, 255)">о</span><span class="g-char" style="--g-color:rgb(46, 197, 232)">н</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">д</span></span></span> отбирает проекты</h2>
    </div>
    <div class="uc">
      <div class="c"><div class="u-t">Отбор входящих заявок</div><div class="u-b">Каждая заявка получает полноценный разбор — сильный проект не теряется в общей массе.</div></div>
      <div class="c"><div class="u-t">Отбор под задачи фонда</div><div class="u-b">Оценка проектов под цели вашего фонда, а не под общий шаблон. Больше веса тому, что важно вам.</div></div>
      <div class="c"><div class="u-t">Подготовка к встрече</div><div class="u-b">Прошедшая отбор заявка приходит с сильными сторонами, рисками и списком, что проверить.</div></div>
      <div class="c"><div class="u-t">Оценка многих проектов сразу</div><div class="u-b">Разберите всю группу заявок за один раз — например, сразу после выступлений на демо-дне.</div></div>
    </div>
  </div>

  <div class="cta">
    <div>
      <div class="c-t">Попробуйте на своих <span class="grad" data-gradient-ready="true"><span class="g-word"><span class="g-char" style="--g-color:rgb(108, 76, 241)">р</span><span class="g-char" style="--g-color:rgb(121, 93, 244)">е</span><span class="g-char" style="--g-color:rgb(134, 110, 247)">а</span><span class="g-char" style="--g-color:rgb(147, 127, 250)">л</span><span class="g-char" style="--g-color:rgb(160, 144, 253)">ь</span><span class="g-char" style="--g-color:rgb(160, 158, 253)">н</span><span class="g-char" style="--g-color:rgb(134, 167, 248)">ы</span><span class="g-char" style="--g-color:rgb(108, 176, 244)">х</span></span> <span class="g-word"><span class="g-char" style="--g-color:rgb(81, 185, 239)">з</span><span class="g-char" style="--g-color:rgb(55, 194, 234)">а</span><span class="g-char" style="--g-color:rgb(47, 201, 227)">я</span><span class="g-char" style="--g-color:rgb(49, 207, 218)">в</span><span class="g-char" style="--g-color:rgb(51, 212, 210)">к</span><span class="g-char" style="--g-color:rgb(52, 218, 202)">а</span><span class="g-char" style="--g-color:rgb(54, 224, 194)">х</span></span></span></div>
      <div class="c-s">Разберём настоящую пачку ваших входящих заявок, подготовим краткие справки для команды и покажем, как EvalLens выстраивает проекты по важности. Решение остаётся за вами.</div>
    </div>
    <div class="actions">
      <a class="btn p" href="https://evallens.io/company/contact">Попробовать</a>
      <a class="btn s" href="https://calendly.com/evallens/30min">Записаться на показ</a>
    </div>
  </div>

  <div class="endfoot">
    <div class="links"><a class="home" href="https://evallens.io">evallens.io</a>  ·  <a href="https://evallens.io/company/contact">оставить заявку</a>  ·  <a href="https://calendly.com/evallens/30min">calendly.com/evallens/30min</a></div>
    <div class="pg">02 / 02</div>
  </div>
</section>`;

export default function OnePagerRuPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
    </>
  );
}
