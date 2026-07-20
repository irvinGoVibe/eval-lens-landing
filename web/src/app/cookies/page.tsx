import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Cookie Policy — EvalLens",
  description:
    "How EvalLens uses cookies: strictly necessary sign-in and security cookies, privacy-respecting analytics, no advertising cookies, and how to control them.",
};

const UPDATED = "July 20, 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "what",
    heading: "What cookies are",
    body: (
      <p>
        Cookies are small text files a website stores on your device. Similar
        technologies (such as local storage) work in comparable ways. We use them
        sparingly &mdash; only to keep you signed in, to run the Service
        securely, and to understand aggregate usage. This policy explains which
        cookies we use and how to control them. It supplements our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    ),
  },
  {
    id: "types",
    heading: "Cookies we use",
    body: (
      <>
        <p>
          <strong>Strictly necessary cookies.</strong> These keep you signed in
          and protect the Service. Our authentication provider sets a
          session token in an <code>httpOnly</code> cookie so your login persists
          securely between pages, along with cookies used to prevent
          cross&#8209;site request forgery and to keep the Service working. The
          Service cannot function without these, so they cannot be switched off
          from within the app.
        </p>
        <p>
          <strong>Privacy&#8209;respecting analytics.</strong> Where we measure
          aggregate usage to maintain and improve the Service, we use analytics
          designed to minimize personal data and we do not build advertising
          profiles.
        </p>
        <p>
          <strong>No advertising cookies.</strong> We do not use cookies for
          advertising, cross&#8209;site tracking, or to &ldquo;sell&rdquo; or
          &ldquo;share&rdquo; personal information as those terms are defined
          under California law.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    heading: "Third-party cookies",
    body: (
      <p>
        Some cookies are set by the providers that help us run the Service &mdash;
        for example, our authentication and hosting providers, and Google when
        you choose to sign in with Google OAuth. These providers act as our
        service providers; the vendors we rely on are listed on our{" "}
        <a href="/subprocessors">Sub&#8209;processors</a> page.
      </p>
    ),
  },
  {
    id: "control",
    heading: "How to control cookies",
    body: (
      <p>
        You can block or delete cookies through your browser settings, and set
        your browser to warn you before accepting them. Because our sign&#8209;in
        and security cookies are strictly necessary, disabling them may break
        login and prevent the Service from working. Controls for optional
        analytics, where offered, are described where the analytics are used.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this Cookie Policy as our practices evolve. We will revise
        the &ldquo;Last updated&rdquo; date above and, for material changes,
        provide notice where appropriate.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about cookies? Contact{" "}
        <a href="mailto:privacy@evallens.io">privacy@evallens.io</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Cookie Policy"
      updated={UPDATED}
      intro={
        <p>
          EvalLens uses cookies sparingly &mdash; to keep you signed in, to run
          the Service securely, and to understand aggregate usage. We do not use
          advertising cookies. This page explains what we use and how to control
          it.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
