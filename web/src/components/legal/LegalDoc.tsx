import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";

/*
 * Shared layout for the Legal / Technical pages (/privacy, /terms, /security).
 *
 * These are document-style pages, not Apple-grade scroll pages — clean readable
 * text, a sticky table of contents, a "last updated" stamp and a visible
 * draft/review notice. No ScrollFX, no data-reveal: legal copy must be readable
 * immediately and with JS disabled.
 *
 * Content is authored in each page file and passed as `sections`. Bracketed
 * placeholders (e.g. [Legal entity name]) are intentional — they must be filled
 * in by the company before these pages are relied upon.
 */

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

export function LegalDoc({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  // Header anchors = this page's first three document sections (each already
  // carries an id). Adjust per page later — keep it to ≤3.
  const headerNav: SectionNav = {
    section: "Legal",
    links: sections.slice(0, 3).map((s) => ({ label: s.heading, href: `#${s.id}` })),
  };

  return (
    <>
      <PageHeader nav={headerNav} />
      <main className="legal">
        <section className="band soft legal-hero">
          <div className="wrap legal-hero__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              {eyebrow}
            </span>
            <h1 className="legal-hero__title">{title}</h1>
            <p className="legal-meta">Last updated: {updated}</p>
            <div className="legal-intro">{intro}</div>

            <aside className="legal-disclaimer" role="note">
              <strong>Draft for review.</strong> This page is a working draft
              provided for transparency. It has not been reviewed by qualified
              legal counsel and does not constitute legal advice. Bracketed
              placeholders such as <code>[Legal entity name]</code> must be
              completed and the text reviewed before it is relied upon.
            </aside>
          </div>
        </section>

        <section className="band legal-body-band">
          <div className="wrap legal-grid">
            <aside className="legal-toc" aria-label="On this page">
              <p className="legal-toc__title">On this page</p>
              <nav>
                <ol>
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.heading}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="legal-article">
              {sections.map((s, i) => (
                <section
                  className="legal-section"
                  id={s.id}
                  key={s.id}
                  aria-labelledby={`${s.id}-h`}
                >
                  <h2 className="legal-h2" id={`${s.id}-h`}>
                    <span className="legal-h2__num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  <div className="legal-prose">{s.body}</div>
                </section>
              ))}

              <p className="legal-foot-note">
                Questions about this page? Contact{" "}
                <a href="mailto:legal@evallense.com">legal@evallense.com</a>.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
