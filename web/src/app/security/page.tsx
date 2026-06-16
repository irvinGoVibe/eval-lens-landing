import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Security — EvalLense",
  description:
    "How EvalLense protects pitch decks and account data: encryption in transit, access controls, workspace isolation, server-side secrets, and responsible disclosure.",
};

const UPDATED = "June 16, 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "approach",
    heading: "Our approach",
    body: (
      <p>
        Pitch decks and evaluation results are sensitive, so security is built
        into how EvalLense works rather than bolted on. We aim for private
        handling of submitted materials, controlled access to workspaces, and
        decisions that stay under human control. This page summarizes the
        technical and organizational measures we use; it is informational and
        not a contractual commitment.
      </p>
    ),
  },
  {
    id: "data-protection",
    heading: "Data protection",
    body: (
      <p>
        Data is encrypted in transit using TLS. Data is hosted with reputable
        cloud infrastructure providers and protected by access controls.
        Sensitive details such as pitch decks and account data are handled only
        as needed to run the Service, as described in our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    ),
  },
  {
    id: "auth",
    heading: "Authentication and access control",
    body: (
      <>
        <p>
          Access to the Service is authenticated and scoped to the minimum each
          user needs:
        </p>
        <ul>
          <li>
            Sign&#8209;in is handled by a managed authentication provider with
            sessions kept in <code>httpOnly</code> cookies; we support email and
            password (with verification) and Google OAuth.
          </li>
          <li>
            Each project is isolated at the database level, so an organizer can
            access only their own projects and submissions
            (row&#8209;level&#8209;security on every query).
          </li>
          <li>
            Administrative operations are gated behind explicit permission
            checks, and privileged access follows least&#8209;privilege
            principles.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "secrets",
    heading: "Secrets and keys",
    body: (
      <p>
        Service&#8209;side credentials &mdash; including database service keys
        and AI&#8209;provider keys &mdash; are stored and used only on the server
        and are never shipped to the browser or exposed in client code.
      </p>
    ),
  },
  {
    id: "workspaces",
    heading: "Private workspaces",
    body: (
      <p>
        Each evaluation batch lives in a controlled workspace available only to
        authorized reviewers. Public submission pages are reachable only when an
        organizer explicitly publishes a project; otherwise they return
        &ldquo;not found.&rdquo; Reports are accessed through the
        organizer&rsquo;s authenticated workspace.
      </p>
    ),
  },
  {
    id: "ai-safety",
    heading: "Evaluation integrity",
    body: (
      <p>
        Submitted deck content is treated as evidence to analyze, not as
        instructions to follow, so hidden or adversarial text in a deck cannot
        rewrite the evaluation rules. The numeric layer is deterministic and the
        AI score is advisory, with a human making the final decision. More detail
        is on our{" "}
        <a href="/trust/prompt-injection-safety">Prompt Injection Safety</a> and{" "}
        <a href="/trust/security-privacy">Security &amp; Privacy</a> pages.
      </p>
    ),
  },
  {
    id: "certifications",
    heading: "Certifications and audits",
    body: (
      <p>
        EvalLense does not currently hold formal third&#8209;party security
        certifications (such as SOC&nbsp;2 or ISO&nbsp;27001). As the product
        matures, we expect to formalize additional controls and will update this
        page accordingly. <strong>[Status to be confirmed.]</strong>
      </p>
    ),
  },
  {
    id: "disclosure",
    heading: "Responsible disclosure",
    body: (
      <p>
        If you believe you have found a security vulnerability, please report it
        to <a href="mailto:security@evallense.com">security@evallense.com</a>{" "}
        with enough detail to reproduce the issue. Please give us reasonable time
        to investigate and remediate before public disclosure, and avoid
        accessing or modifying data that is not yours. We appreciate good&#8209;faith
        research.
      </p>
    ),
  },
  {
    id: "limitations",
    heading: "No absolute guarantee",
    body: (
      <p>
        No product or transmission method is perfectly secure. While we work to
        protect your information, we cannot guarantee absolute security. Your use
        of the Service is also subject to our{" "}
        <a href="/terms">Terms of Service</a>.
      </p>
    ),
  },
  {
    id: "updates",
    heading: "Updates to this page",
    body: (
      <p>
        We may update this page as our practices evolve. The
        &ldquo;Last updated&rdquo; date above reflects the latest revision.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalDoc
      eyebrow="Legal / Technical"
      title="Security"
      updated={UPDATED}
      intro={
        <p>
          An overview of the technical and organizational measures EvalLense uses
          to protect pitch decks, account data, and evaluation results &mdash;
          and how to report a vulnerability.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
