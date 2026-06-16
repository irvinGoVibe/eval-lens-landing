import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ScrollFX } from "@/components/ScrollFX";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Contact EvalLense — Book a Demo & Talk to Us",
  description:
    "Get in touch with EvalLense: book a demo, reach us for sales, careers or security, and open the product documentation for organizers.",
};

/*
 * ── IMAGE / VISUAL SLOTS ─────────────────────────────────────────────────
 * The image generator is NOT wired up. The visual slots below are VISIBLE,
 * labeled `.media-ph` placeholders (global primitive in globals.css) on
 * canonical tokens — never an empty grey div. Each carries an --ratio so the
 * real asset drops in with zero layout shift. When a generator is available,
 * produce the assets and drop them into web/public/assets/contact/.
 *
 * 1. hero (section 1) — 16:9
 *    A point of contact: a signal converging to a single lens point.
 *    Prompt: lens-gradient violet→cyan→aqua over an Apple-neutral surface,
 *    soft violet depth, hairline structure, calm; a signal that converges to
 *    one point.
 *
 * 2. docs (section 3, ink) — 4:3
 *    A hint of a documentation page / an open guide book.
 *    Prompt: ink surface, hairline frame, a single lens accent, an external ↗
 *    indicator; calm, minimal.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 * This page opts into the generic ScrollFX engine via data-attributes only
 * (data-reveal). No per-section useEffect, no ScrollOrchestrator edits.
 * reduced-motion is handled by the engine + the primitives' @media block.
 * <ScrollFX/> is mounted once after <Footer/>.
 *
 * ── CONTENT ──────────────────────────────────────────────────────────────
 * The site is STATIC (no backend) — channels are mailto: / external links,
 * no server-side form. Email addresses and the demo/docs URLs are
 * PLACEHOLDERS per the brief (see Open Questions) — only careers@evallense.com
 * and security@evallense.com are real and already used on the site. Latest
 * news is read at build time via getAllPosts() — exactly like /blog.
 *
 * ── PLACEHOLDERS (brief §Open Questions) ──────────────────────────────────
 *   - demo channel: Book a Demo → /#demo (until a real scheduler/mailto)
 *   - hello@evallense.com  — general & sales (placeholder, confirm)
 *   - press@evallense.com  — press & media (placeholder, confirm)
 *   - DOCS_URL below       — external user-documentation site (placeholder)
 */

/* TODO: real user-docs URL — [user documentation URL] */
const DOCS_URL = "https://docs.evallense.com";

/* 2. Ways to reach us — bento / feature-grid (brief §2). */
const CHANNELS = [
  {
    tag: "Demo",
    title: "Book a demo",
    body: "See EvalLense run on your own decks, end to end.",
    feature: true,
    cta: { label: "Book a Demo", href: "/#demo", external: false },
  },
  {
    tag: "General & sales",
    title: "Product, partnership, pilot",
    body: "Questions about the product, a partnership or a pilot batch.",
    // hello@ is a placeholder per the brief — confirm before launch.
    cta: { label: "hello@evallense.com", href: "mailto:hello@evallense.com", external: false },
  },
  {
    tag: "Careers",
    title: "Join the team",
    body: "We are building a better lens for human judgment — come help.",
    cta: { label: "careers@evallense.com", href: "mailto:careers@evallense.com", external: false },
  },
  {
    tag: "Security",
    title: "Report a vulnerability",
    body: "Responsible disclosure for security researchers.",
    cta: { label: "security@evallense.com", href: "mailto:security@evallense.com", external: false },
    link: { label: "Security & privacy", href: "/security" },
  },
  {
    tag: "Press & media",
    title: "Publications & announcements",
    body: "Press enquiries, coverage and announcements.",
    // press@ is a placeholder per the brief — confirm before launch.
    cta: { label: "press@evallense.com", href: "mailto:press@evallense.com", external: false },
    link: { label: "Visit the Newsroom", href: "/blog" },
  },
];

export default async function ContactPage() {
  // Latest news — read at build time, exactly like /blog. Gracefully empty.
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <SiteHeader light />
      <main className="contact">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft ct-hero">
          <div className="wrap ct-hero__inner">
            <span
              className="eyebrow"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <span className="dot" aria-hidden="true"></span>
              Contact
            </span>
            <h1
              className="ct-hero__title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Let&apos;s <span className="grad-word">talk</span>
            </h1>
            <p
              className="sub ct-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo and watch the evaluation run on your own decks from
              start to finish — or just send us a note.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
              <Button variant="ghost" href="mailto:hello@evallense.com">
                Email us
              </Button>
            </div>
            {/* hero visual slot — see prompt 1 in file header */}
            <figure
              className="media-ph ct-hero__media"
              style={{ ["--ratio" as string]: "16/9" }}
              data-reveal="scale"
              role="img"
              aria-label="A signal converging to a single lens point — a point of contact"
            >
              <span className="media-ph__label">
                Image · a signal into one point · 16:9
              </span>
              <span className="media-ph__hint">
                A signal converging to a single lens point — lens-gradient
                violet→cyan→aqua, calm; see prompt 1 in file header
              </span>
            </figure>
          </div>
        </section>

        {/* 2. Ways to reach us — bento / feature-grid, light. */}
        <section className="band ct-channels">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Ways to reach us
              </span>
              <h2 className="title">Pick the channel that fits</h2>
              <p className="sub">
                A demo is one step away. For everything else — sales, careers,
                security or press — there is a direct line below.
              </p>
            </div>
            <ul className="ct-grid" data-reveal="up">
              {CHANNELS.map((c) => (
                <li
                  key={c.tag}
                  className={
                    c.feature ? "ct-tile ct-tile--feature" : "ct-tile"
                  }
                >
                  <span className="mini-tag">{c.tag}</span>
                  <h3 className="ct-tile__h">{c.title}</h3>
                  <p className="ct-tile__p">{c.body}</p>
                  <div className="ct-tile__actions">
                    <a
                      className={c.feature ? "btn btn-primary btn-sm" : "ct-tile__mail"}
                      href={c.cta.href}
                    >
                      {c.cta.label}
                    </a>
                    {c.link && (
                      <Link className="ct-tile__link" href={c.link.href}>
                        {c.link.label} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Documentation (external) — editorial split / full-bleed, DARK. */}
        <section className="band ink ct-docs">
          <div className="wrap ct-docs__split">
            <div className="ct-docs__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Documentation
              </span>
              <h2 className="title">Already using EvalLense? Read the docs</h2>
              <p className="sub">
                Guides for organizers — how to set up a program, run an
                evaluation and manage your workspace. The documentation lives on
                a separate site.
              </p>
              {/* external user-docs link — opens in a new tab, ↗ indicator.
                  URL is a placeholder; see DOCS_URL + brief §Open Questions */}
              <div className="ct-docs__cta">
                <Button
                  href={DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the documentation{" "}
                  <span aria-hidden="true">↗</span>
                </Button>
              </div>
            </div>
            {/* docs visual slot — see prompt 2 in file header */}
            <figure
              className="media-ph ct-docs__media"
              style={{ ["--ratio" as string]: "4/3" }}
              data-reveal="right"
              role="img"
              aria-label="A hint of the documentation site — an open guide"
            >
              <span className="media-ph__label">
                Image · documentation guide · 4:3
              </span>
              <span className="media-ph__hint">
                A hint of the documentation page on a separate site — ink
                surface, hairline frame, one lens accent, ↗; see prompt 2 in
                file header
              </span>
            </figure>
          </div>
        </section>

        {/* 4. Latest news — horizontal-gallery, light. 3 newest posts. */}
        <section className="band ct-news">
          <div className="wrap">
            <div className="head ct-news__head" data-reveal="up">
              <div className="ct-news__heading">
                <span className="eyebrow">
                  <span className="dot" aria-hidden="true"></span>
                  Newsroom
                </span>
                <h2 className="title">Latest from the Newsroom</h2>
              </div>
              <Link className="ct-news__all" href="/blog">
                {posts.length > 0 ? "All news" : "Visit the Newsroom"}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          {posts.length > 0 && (
            /* horizontal gallery — scrolls INSIDE its own overflow container,
               never moving the page; scroll-snap like .usecases .seg-lane */
            <ul
              className="seg-lane"
              data-reveal="up"
              tabIndex={0}
              aria-label="Latest news — scroll horizontally"
            >
              {posts.map((post) => (
                <li key={post.slug} className="seg-card ct-news-card">
                  <Link className="ct-news-card__link" href={`/blog/${post.slug}`}>
                    <span className="seg-card__signal" aria-hidden="true"></span>
                    <span className="mini-tag">{post.category}</span>
                    <h3 className="ct-news-card__title">{post.title}</h3>
                    <time className="ct-news-card__date" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 5. Final CTA — quiet CTA, DARK. */}
        <section className="band ink ct-cta">
          <div className="wrap head">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Get started
            </span>
            <h2
              className="title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              See EvalLense run on your own applications
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Book a demo to walk through the product and run a pilot batch on
              your own decks.
            </p>
            <div
              className="sect-cta"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
