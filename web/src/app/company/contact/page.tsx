import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DocsParallax } from "@/components/DocsParallax";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/ds";
import { ScrollFX } from "@/components/ScrollFX";
import { FloatFx } from "@/components/FloatFx";
import { BlobField } from "@/components/BlobField";
import { getAllPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";

export const metadata: Metadata = {
  title: "Contact EvalLens — Book a demo & Talk to Us",
  description:
    "Get in touch with EvalLens: book a demo, reach us for sales, careers or security, and open the product documentation for organizers.",
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
 * PLACEHOLDERS per the brief (see Open Questions) — only careers@evallens.io
 * and security@evallens.io are real and already used on the site. Latest
 * news is read at build time via getAllPosts() — exactly like /blog.
 *
 * ── PLACEHOLDERS (brief §Open Questions) ──────────────────────────────────
 *   - demo channel: Book a demo → /#demo (until a real scheduler/mailto)
 *   - hello@evallens.io  — general & sales (placeholder, confirm)
 *   - press@evallens.io  — press & media (placeholder, confirm)
 */

/* 2. Ways to reach us — channel grid (brief §2). The four direct lines sit at
   the top; "Book a demo" moves below the grid as a single button. The sales
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
    cta: { label: "hello@evallens.io", href: "mailto:hello@evallens.io" },
    call: { label: "Book a Call", href: "https://calendly.com/evallens/30min" },
  },
  {
    tag: "Careers",
    title: "Join the team",
    body: "We are building a better lens for human judgment — come help.",
    cta: { label: "careers@evallens.io", href: "mailto:careers@evallens.io" },
  },
  {
    tag: "Security",
    title: "Report a vulnerability",
    body: "Responsible disclosure for security researchers.",
    cta: { label: "security@evallens.io", href: "mailto:security@evallens.io" },
    link: { label: "Security & privacy", href: "/security" },
  },
  {
    tag: "Press & media",
    title: "Publications & announcements",
    body: "Press enquiries, coverage and announcements.",
    // press@ is a placeholder per the brief — confirm before launch.
    cta: { label: "press@evallens.io", href: "mailto:press@evallens.io" },
    link: { label: "Visit the Newsroom", href: "/blog" },
  },
];

/* 5. Social — public channels. Brand glyphs are inline simple-icons paths,
   tinted via currentColor. */
const SOCIALS = [
  {
    name: "X",
    href: "https://x.com/EvalLensio",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/evallens",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    name: "Telegram",
    href: "https://t.me/evallens",
    path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  },
];

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Company",
  links: [
    { label: "Channels", href: "#channels" },
    { label: "How it works", href: "#docs" },
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
                alt="A booked Demo Call on a glass weekly calendar — EvalLens converging signals into one slot"
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
              <Button href="https://calendly.com/evallens/30min">Book a demo</Button>
              <Button variant="ghost" href="#batch">
                Send us your batch
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
            {/* Book a demo — moved below the four channel cards */}
            <div className="ct-channels__demo" data-reveal="up">
              <Button href="https://calendly.com/evallens/30min">Book a demo</Button>
            </div>
          </div>
        </section>

        {/* 2b. Batch intake — low-commitment lane: send the batch, get the
            free retro-test. Writes to site_leads via /api/lead. */}
        <section id="batch" className="band ct-batch">
          <div className="wrap">
            <div className="head" data-reveal="up">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                Send us your batch
              </span>
              <h2 className="title">
                Skip the call. Start with <span className="grad-word">your decks</span>
              </h2>
              <p className="sub">
                Tell us what your program reviews and roughly how many decks are
                in the pile. Through August 31 the first retro-test run is free,
                for batches up to 10 decks. AI prepares the analysis; your team
                makes the call.
              </p>
            </div>
            <div data-reveal="up">
              <LeadForm />
            </div>
          </div>
        </section>

        {/* 3. Documentation (external) — editorial split / full-bleed, DARK. */}
        <section id="docs" className="band ink ct-docs">
          <div className="wrap ct-docs__split">
            <div className="ct-docs__copy" data-reveal="left">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>
                How it works
              </span>
              <h2 className="title">Want the mechanics first? Read the <span className="grad-word">methodology</span></h2>
              <p className="sub">
                How the panel reads a deck, why a score repeats on a re-run, and
                what happens to a document you upload. Written for the person
                who has to defend the shortlist.
              </p>
              {/* Was an external docs site that does not exist yet (the
                  placeholder host did not resolve). Until it ships, this points
                  at the Trust pages, which answer the same questions. */}
              <div className="ct-docs__cta">
                <Button href="/trust/methodology">Read the methodology</Button>
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
              Follow <span className="grad-word">EvalLens</span>
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
        <CtaBand
          theme="dark"
          videoSrc="/assets/contact/get-started-bg.mp4"
          videoPoster="/assets/contact/get-started-bg-poster.webp"
          eyebrow="Get started"
          title="See EvalLens run on"
          titleAccent="your own applications"
          sub="Book a demo to walk through the product and run a pilot batch on your own decks."
          primary={{ label: "Book a demo", href: "https://calendly.com/evallens/30min" }}
        />
      </main>
      <Footer variant="dark" />
      <ScrollFX />
    </>
  );
}
