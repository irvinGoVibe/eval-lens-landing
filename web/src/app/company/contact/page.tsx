import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DocsParallax } from "@/components/DocsParallax";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ScrollFX } from "@/components/ScrollFX";
import { FloatFx } from "@/components/FloatFx";
import { BlobField } from "@/components/BlobField";
import { getAllPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";

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
 * 1. hero (section 1) — 16:9 — DONE
 *    /assets/contact/contact-hero-demo-calendar.webp — a booked Demo Call on a
 *    glass weekly calendar (signals converging into one slot).
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

/* 2. Ways to reach us — channel grid (brief §2). The four direct lines sit at
   the top; "Book a Demo" moves below the grid as a single button. The sales
   card carries a "Book a Call" button (bottom-right); the secondary page links
   on Security / Press are de-emphasised and pushed to the card's bottom-right. */
type Channel = {
  tag: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  call?: { label: string; href: string };
  link?: { label: string; href: string };
};

const CHANNELS: Channel[] = [
  {
    tag: "General & sales",
    title: "Product, partnership, pilot",
    body: "Questions about the product, a partnership or a pilot batch.",
    // hello@ is a placeholder per the brief — confirm before launch.
    cta: { label: "hello@evallense.com", href: "mailto:hello@evallense.com" },
    call: { label: "Book a Call", href: "/#demo" },
  },
  {
    tag: "Careers",
    title: "Join the team",
    body: "We are building a better lens for human judgment — come help.",
    cta: { label: "careers@evallense.com", href: "mailto:careers@evallense.com" },
  },
  {
    tag: "Security",
    title: "Report a vulnerability",
    body: "Responsible disclosure for security researchers.",
    cta: { label: "security@evallense.com", href: "mailto:security@evallense.com" },
    link: { label: "Security & privacy", href: "/security" },
  },
  {
    tag: "Press & media",
    title: "Publications & announcements",
    body: "Press enquiries, coverage and announcements.",
    // press@ is a placeholder per the brief — confirm before launch.
    cta: { label: "press@evallense.com", href: "mailto:press@evallense.com" },
    link: { label: "Visit the Newsroom", href: "/blog" },
  },
];

/* 5. Social — follow links. Instagram is the confirmed handle; X / Telegram /
   Medium use the @evallense convention (confirm before launch). Brand glyphs
   are inline simple-icons paths, tinted via currentColor. */
const SOCIALS = [
  {
    name: "X",
    href: "https://x.com/evallense",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/evallense/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "Telegram",
    href: "https://t.me/evallense",
    path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  },
  {
    name: "Medium",
    href: "https://medium.com/@evallense",
    path: "M13.54 12a6.8 6.8 0 1 1-13.6 0 6.8 6.8 0 0 1 13.6 0zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z",
  },
];

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Company",
  links: [
    { label: "Channels", href: "#channels" },
    { label: "Docs", href: "#docs" },
    { label: "Newsroom", href: "#news" },
  ],
};

export default async function ContactPage() {
  // Latest news — read at build time, exactly like /blog. Gracefully empty.
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <FloatFx />
      <main className="contact">
        {/* 1. Hero — statement-hero, light. Visual slot via .media-ph. */}
        <section className="band soft ct-hero blob-host">
          <BlobField />
          <style>{`
            /* Re-ordered: title -> bare PNG -> sub -> buttons; block nudged up;
               the demo-call image loses its glass frame (just the PNG floats). */
            .contact .ct-hero{ padding-top:clamp(96px,12vw,150px); }
            .contact .ct-hero__media{ box-shadow:none; border:0; background:none; border-radius:0; overflow:visible; margin-top:clamp(16px,2.4vw,36px); }
            .contact .ct-hero__sub{ margin-top:clamp(18px,2.4vw,30px); }
            .contact .ct-hero .cta-row{ margin-top:clamp(20px,2.6vw,32px); }
          `}</style>
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
            {/* hero visual — bare demo-call PNG (no frame), above the sub */}
            <figure
              className="ct-hero__media"
              data-reveal="scale"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              <Image
                className="ev-float"
                src="/assets/contact/contact-hero-demo-calendar.webp"
                alt="A booked Demo Call on a glass weekly calendar — EvalLense converging signals into one slot"
                width={1678}
                height={944}
                sizes="(max-width: 980px) 100vw, 920px"
                priority
              />
            </figure>
            <p
              className="sub ct-hero__sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "270ms" }}
            >
              Book a demo and watch the evaluation run on your own decks from
              start to finish — or just send us a note.
            </p>
            <div
              className="cta-row"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "360ms" }}
            >
              <Button href="/#demo">Book a Demo</Button>
              <Button variant="ghost" href="mailto:hello@evallense.com">
                Email us
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Ways to reach us — bento / feature-grid, light. */}
        <section id="channels" className="band ct-channels blob-host">
          <BlobField variant="b" />
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Ways to reach us
              </span>
              <h2 className="title">Pick the channel that <span className="grad-word">fits</span></h2>
              <p className="sub">
                A demo is one step away. For everything else — sales, careers,
                security or press — there is a direct line below.
              </p>
            </div>
            <ul className="ct-grid" data-reveal="up">
              {CHANNELS.map((c) => (
                <li key={c.tag} className="ct-tile">
                  <span className="mini-tag">{c.tag}</span>
                  <h3 className="ct-tile__h">{c.title}</h3>
                  <p className="ct-tile__p">{c.body}</p>
                  <div className="ct-tile__actions">
                    <a className="ct-tile__mail" href={c.cta.href}>
                      {c.cta.label}
                    </a>
                    {c.call && (
                      <a
                        className="btn btn-primary btn-sm ct-tile__call"
                        href={c.call.href}
                      >
                        {c.call.label}
                      </a>
                    )}
                    {c.link && (
                      <Link className="ct-tile__link" href={c.link.href}>
                        {c.link.label} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {/* Book a Demo — moved below the four channel cards */}
            <div className="ct-channels__demo" data-reveal="up">
              <Button href="/#demo">Book a Demo</Button>
            </div>
          </div>
        </section>

        {/* 3. Documentation (external) — editorial split / full-bleed, DARK. */}
        <section id="docs" className="band ink ct-docs">
          <div className="wrap ct-docs__split">
            <div className="ct-docs__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Documentation
              </span>
              <h2 className="title">Already using EvalLense? Read the <span className="grad-word">docs</span></h2>
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
            {/* docs visual — real image, floating + pointer parallax */}
            <DocsParallax />
          </div>
        </section>

        {/* 4. Latest news — horizontal-gallery, light. 3 newest posts. */}
        <section id="news" className="band ct-news blob-host">
          <BlobField />
          <div className="wrap">
            <div className="head ct-news__head" data-reveal="up">
              <div className="ct-news__heading">
                <span className="eyebrow">
                  <span className="dot" aria-hidden="true"></span>
                  Newsroom
                </span>
                <h2 className="title">Latest from the <span className="grad-word">Newsroom</span></h2>
              </div>
              <Link className="ct-news__all" href="/blog">
                {posts.length > 0 ? "All news" : "Visit the Newsroom"}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            {posts.length > 0 && (
              /* Reuse the canonical Newsroom card (ArticleCard) in the shared
                 .blog-grid — same element/layout as /blog, no custom markup. */
              <div
                className="blog-grid blog-grid--surface"
                data-reveal="up"
                style={{ marginTop: "clamp(28px,4vw,48px)" }}
              >
                {posts.map((post) => (
                  <ArticleCard key={post.slug} post={post} variant="grid" />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. Social — follow links, light soft band. */}
        <section className="band soft ct-social blob-host">
          <BlobField variant="b" />
          <div className="wrap head">
            <span className="eyebrow" data-reveal="up">
              <span className="dot" aria-hidden="true"></span>
              Social
            </span>
            <h2
              className="title"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "90ms" }}
            >
              Follow <span className="grad-word">EvalLense</span>
            </h2>
            <p
              className="sub"
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              Product news, behind-the-scenes and updates — wherever you are.
            </p>
            <div
              className="cta-row ct-social__links"
              data-reveal="up"
              style={{
                ["--reveal-delay" as string]: "270ms",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {SOCIALS.map((s) => (
                <Button
                  key={s.name}
                  variant="ghost"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={s.path} />
                    </svg>
                    {s.name}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Final CTA — quiet CTA, DARK. */}
        <section className="band ink ct-cta">
          {/* full-bleed looping video background + darkening scrim
              (same treatment as the About final-CTA). */}
          <style>{`
            .contact .ct-cta{ position:relative; isolation:isolate; overflow:hidden; }
            .contact .ct-cta__bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; pointer-events:none; }
            .contact .ct-cta__scrim{ position:absolute; inset:0; z-index:1; pointer-events:none;
              background:linear-gradient(180deg, rgba(248,244,237,.42) 0%, rgba(242,236,227,.56) 100%); }
            .contact .ct-cta .head{ position:relative; z-index:2; }
            @media (prefers-reduced-motion:reduce){ .contact .ct-cta__bg{ display:none; } }
          `}</style>
          <video className="ct-cta__bg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/assets/contact/get-started-bg.mp4" type="video/mp4" />
          </video>
          <div className="ct-cta__scrim" aria-hidden="true" />
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
              See EvalLense run on <span className="grad-word">your own applications</span>
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
