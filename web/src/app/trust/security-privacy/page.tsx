import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import type { SectionNav } from "@/lib/site-nav";
import { Footer } from "@/components/Footer";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  EditorialSplit,
  Bento,
  Numbered,
  PinnedSteps,
  QuietCta,
} from "@/components/ds";

/** Header nav for this page — anchor links to its own sections. ≤3. */
const HEADER_NAV: SectionNav = {
  section: "Trust",
  sectionHref: "/trust",
  links: [
    { label: "Workspace", href: "#workspace" },
    { label: "Access", href: "#flow" },
  ],
};

export const metadata: Metadata = {
  title: "EvalLense — Security & Privacy for Pitch Deck Evaluation",
  description:
    "Private deck handling, database-level project isolation, server-only secrets and human-owned decisions — security as the trust layer of EvalLense.",
};

export default function SecurityPrivacyPage() {
  return (
    <>
      <PageHeader nav={HEADER_NAV} />
      <main className="section-lab ds">
        {/* 1. Statement hero — soft (page-top). */}
        <StatementHero
          id="top"
          surface="soft"
          eyebrow="Security & Privacy"
          titleLead="Private by design, decided by"
          titleAccent="humans"
          sub="Private pitch-deck handling, controlled access to the workspace and deliberate report delivery — at every step. The decision stays with a person."
          ctas={[{ label: "Book a Demo", href: "/#demo" }]}
          media={{
            ratio: "16/9",
            label: "Image · deck in a private perimeter · 16:9",
            hint: "A deck enters a contained lens perimeter, soft lock hint, no security theatre — lens-gradient violet→cyan→aqua, calm.",
            ariaLabel:
              "A deck entering a private lens perimeter with a soft lock hint",
          }}
        />

        {/* 2. Why privacy matters — editorial split, light. */}
        <EditorialSplit
          surface="light"
          ariaLabel="Why privacy matters"
          eyebrow="Why privacy matters"
          titleLead="Decks and results are sensitive"
          sub="Pitch decks and evaluation results carry information that should not move freely. Handling them carelessly puts founders, funds and outcomes at risk."
          media={{
            ratio: "4/3",
            label: "Image · what is sensitive in a deck · 4:3",
            hint: "A quiet, calm view of a deck on an Apple-neutral surface — sensitive lines softly held in the lens, no padlocks, no alarm.",
            ariaLabel:
              "A calm depiction of the sensitive information carried inside a pitch deck",
          }}
          points={[
            {
              title: "Confidential strategy",
              body: "A deck can carry confidential strategy that should not leak.",
            },
            {
              title: "Financial data",
              body: "Financial data needs careful, controlled handling.",
            },
            {
              title: "Founder information",
              body: "Founder information has to be protected.",
            },
            {
              title: "Evaluation outcome",
              body: "An evaluation result shapes funding, selection and reputation.",
            },
          ]}
        />

        {/* 3. Private workspace — bento, light. */}
        <Bento
          id="workspace"
          surface="light"
          eyebrow="Private workspace"
          title="Every batch lives in a controlled space"
          sub="Evaluation doesn't happen in the open. Each batch runs inside a controlled workspace where access is scoped to the people who belong there."
          items={[
            {
              tag: "Controlled workspace",
              title: "A batch is not a public document",
              body: "Decks, applications, scores and reports stay inside an authorized workspace. Nothing about a batch is exposed by default — access is granted, not assumed.",
              feature: true,
              media: {
                label: "Image · a controlled, private workspace · 16:9",
                hint: "A scoped perimeter holding decks, scores and reports — calm lens-gradient surface, access granted not assumed, no security theatre.",
                ariaLabel:
                  "A controlled, private workspace where a batch's decks, scores and reports stay scoped to authorized people",
              },
            },
            {
              tag: "One organizer",
              title: "One organizer per project",
              body: "In the MVP a project belongs to a single organizer, who owns its decks, evaluations and reports.",
            },
            {
              tag: "Published-gate",
              title: "Intake opens on purpose",
              body: "Participants submit through the public page /e/<slug>, which is reachable only when the project is published — otherwise it returns 404.",
            },
          ]}
        />

        {/* 4. Access control — numbered, light. */}
        <Numbered
          surface="light"
          ariaLabel="Access control"
          eyebrow="Access control"
          title="Who sees what is enforced, not trusted"
          sub="Access is decided by roles and data isolation, with secrets kept off the client and sign-in hardened against common leaks."
          items={[
            {
              num: "01",
              title: "Database-level project isolation",
              body: "Postgres applies row-level policies on every query: an organizer sees only their own projects (organizer_id = auth.uid()). Isolation lives in the database, not just in the UI.",
            },
            {
              num: "02",
              title: "Role-based access",
              body: "Roles user / admin / participant decide who sees what; a person can hold several, and the organizer-vs-participant context depends on the project.",
            },
            {
              num: "03",
              title: "Server-only secrets",
              body: "Service-role and AI Gateway keys live only on the server and never reach the client bundle; admin operations run after an explicit requireAdmin() check.",
            },
            {
              num: "04",
              title: "Hardened sign-in",
              body: "Generic login errors avoid leaking whether an email exists, an open-redirect guard sanitizes return URLs, and email verification is required.",
            },
            {
              num: "05",
              title: "Published-gate on intake",
              body: "The public self-upload page /e/<slug> is reachable only when the project is published (is_published=true) — otherwise it returns 404.",
            },
          ]}
        />

        {/* 5. Under the hood — pinned steps, ink. */}
        <PinnedSteps
          id="flow"
          surface="ink"
          ariaLabel="How access is protected under the hood"
          eyebrow="Under the hood"
          title={{ line1: "How access", line2: "is protected" }}
          sub="The authentication layer is stable: a session in httpOnly cookies hands off to Postgres, where row-level policies decide what each request can see."
          steps={[
            {
              num: "01",
              label: "Supabase Auth",
              desc: "Authentication runs on Supabase Auth with @supabase/ssr — the proven layer that issues and validates the session.",
            },
            {
              num: "02",
              label: "httpOnly cookies",
              desc: "The session lives in httpOnly cookies, so client-side scripts can't read the token directly.",
            },
            {
              num: "03",
              label: "RLS auth.uid()",
              desc: "Cookies travel to Postgres automatically; RLS reads auth.uid() and applies row-level policies on every request.",
            },
            {
              num: "04",
              label: "Methods & middleware",
              desc: "Email + password (verified), Google OAuth and email reset; protected routes sit behind middleware, and the service-role key is used only in admin APIs after requireAdmin().",
            },
          ]}
          media={{
            ratio: "4/3",
            label: "Image · access flow · 4:3",
            hint: "cookies → server → RLS → isolated project data; a session thread narrows into one project.",
            ariaLabel:
              "A chain from cookies through the server to RLS and isolated project data",
          }}
        />

        {/* 6. Report delivery — editorial split, soft (light → .soft). */}
        <EditorialSplit
          surface="light"
          ariaLabel="Report delivery"
          eyebrow="Report delivery"
          titleLead="Reports are shared deliberately"
          sub="Reports should be shared on purpose, not leak by accident. Access runs through the organizer's authorized workspace rather than an open link."
          media={{
            ratio: "4/3",
            label: "Image · deliberate report delivery · 4:3",
            hint: "A report handed off on purpose through the organizer's authorized workspace — calm lens-gradient surface, a deliberate hand-off, not an open link.",
            ariaLabel:
              "A report shared deliberately through the organizer's authorized workspace",
          }}
          points={[
            {
              title: "Deliberate, not leaked",
              body: "A report reaches someone because the organizer chose to share it — not because it slipped out. Participant-facing sharing is a post-MVP capability.",
            },
          ]}
        />

        {/* 7. Human in the loop — editorial split, light. */}
        <EditorialSplit
          surface="light"
          ariaLabel="Human in the loop"
          eyebrow="Human in the loop"
          titleLead="Decisions stay with a"
          titleAccent="person"
          sub="EvalLense prepares the analysis, but the final decision and how a report is used stay with a human. AI doesn't become an invisible final judge. AI prepares, a person decides — the outcome is human-owned, not automated."
          media={{
            ratio: "4/3",
            label: "Image · AI → human handoff · 4:3",
            hint: "AI prepares an advisory analysis that flows to a person who owns the decision — calm lens-gradient surface, a quiet hand-off, no automated verdict.",
            ariaLabel:
              "An AI-to-human handoff where AI prepares the analysis and a person owns the decision",
          }}
          points={[
            {
              title: "AI — advisory analysis",
              body: "AI Total Score is advisory and does not rank participants — it is a reference, not a verdict.",
            },
            {
              title: "Human — owns the Final Score",
              body: "Ranking is built from the human Final Score; the organizer decides how the report is used.",
            },
          ]}
        />

        {/* 8. Final CTA — quiet CTA, ink. */}
        <QuietCta
          id="cta"
          surface="ink"
          eyebrow="Get started"
          title="Run a private pilot on your own data"
          sub="Book a demo and see private handling, controlled access and human-owned decisions end to end."
          cta={{ label: "Book a Demo", href: "/#demo" }}
        />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
