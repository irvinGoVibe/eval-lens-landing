import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Sub-processors — EvalLens",
  description:
    "The third-party providers EvalLens uses to run the service — hosting, authentication, AI inference, and sign-in — with the purpose and processing region for each.",
};

const UPDATED = "July 20, 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "intro",
    heading: "About this list",
    body: (
      <p>
        To run EvalLens we rely on a small number of trusted providers
        (&ldquo;sub&#8209;processors&rdquo;) that process personal data on our
        behalf. Each processes information under contract and only on our
        instructions, consistent with our{" "}
        <a href="/privacy">Privacy Policy</a> and, where applicable, our{" "}
        <a href="/dpa">Data Processing Addendum</a>. This page lists the
        sub&#8209;processors we currently use.
      </p>
    ),
  },
  {
    id: "list",
    heading: "Current sub-processors",
    body: (
      <ul>
        <li>
          <strong>Supabase</strong> &mdash; database, authentication, and file
          storage for accounts, submissions, and evaluation data. Processing
          region: European Union / United States.
        </li>
        <li>
          <strong>Vercel</strong> &mdash; application hosting and delivery, and
          the AI Gateway that routes evaluation requests to model providers.
          Processing region: United States / global edge network.
        </li>
        <li>
          <strong>AI model providers</strong> &mdash; large&#8209;language&#8209;model
          inference used to generate advisory evaluation reports, accessed
          through the Vercel AI Gateway. Providers are instructed to process
          content only to deliver the Service and not to train their foundation
          models on it. Processing region: primarily United States.
        </li>
        <li>
          <strong>Google</strong> &mdash; optional Google OAuth sign&#8209;in;
          where you choose it, Google provides basic profile information (such as
          name and email) to authenticate you. Processing region: United States /
          global.
        </li>
      </ul>
    ),
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: (
      <p>
        Some sub&#8209;processors operate outside Georgia and the European
        Economic Area. Where personal data is transferred internationally, we
        rely on appropriate safeguards such as the Standard Contractual Clauses,
        as described in our <a href="/privacy#transfers">Privacy Policy</a>.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this list",
    body: (
      <p>
        We may add or replace sub&#8209;processors as the Service evolves. When we
        make a material change, we will update this page and revise the
        &ldquo;Last updated&rdquo; date above. If you have a data&#8209;processing
        agreement with us that provides for advance notice of new
        sub&#8209;processors, we will follow that process.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about our sub&#8209;processors? Contact{" "}
        <a href="mailto:privacy@evallens.io">privacy@evallens.io</a>.
      </p>
    ),
  },
];

export default function SubprocessorsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Sub-processors"
      updated={UPDATED}
      intro={
        <p>
          The third&#8209;party providers EvalLens uses to run the Service, with
          the purpose and processing region for each. They process data under
          contract and only on our instructions.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
