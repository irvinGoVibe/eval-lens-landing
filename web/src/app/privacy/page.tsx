import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy — EvalLens",
  description:
    "How EvalLens collects, uses, shares and protects personal information, and the privacy rights available under the GDPR, Georgian data-protection law, and the California CCPA/CPRA.",
};

const UPDATED = "June 16, 2026";

const OPERATOR = "Individual Entrepreneur Yaroslav Volovyi";
const OPERATOR_ADDRESS =
  "Gotua Street N26, Floor 10, Flat N37, Saburtalo District, Tbilisi, Georgia";

const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    heading: "Scope of this policy",
    body: (
      <>
        <p>
          This Privacy Policy explains how <strong>{OPERATOR}</strong>, an
          individual entrepreneur registered in Georgia
          (&ldquo;EvalLens,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) handles
          personal information in connection with the EvalLens website and the
          EvalLens pitch&#8209;deck evaluation service (the
          &ldquo;Service&rdquo;). It applies to organizers who use the Service
          and to participants whose materials are submitted to it.
        </p>
        <p>The data controller responsible for your information is:</p>
        <ul>
          <li>
            <strong>Controller:</strong> {OPERATOR}
          </li>
          <li>
            <strong>Legal form:</strong> Individual Entrepreneur, registered in
            Georgia
          </li>
          <li>
            <strong>Identification number:</strong> 305676649
          </li>
          <li>
            <strong>Registering authority:</strong> LEPL National Agency of
            Public Registry (registered February 12, 2024)
          </li>
          <li>
            <strong>Registered address:</strong> {OPERATOR_ADDRESS}
          </li>
        </ul>
        <p>
          EvalLens is operated from <strong>Georgia</strong> and serves business
          customers internationally. By using the Service, you understand that
          your information may be processed in Georgia and in other countries
          where our service providers operate (see &ldquo;How we share
          information&rdquo;). Where we transfer personal data internationally, we
          rely on appropriate safeguards, such as standard contractual clauses.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    heading: "Information we collect",
    body: (
      <>
        <p>We collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Account information.</strong> Name, email address, company,
            and authentication data when an organizer creates an account.
            Passwords are stored only in hashed form by our authentication
            provider; we never store plain&#8209;text passwords.
          </li>
          <li>
            <strong>Submitted content.</strong> Pitch decks (PDF, PPTX, or
            slide links), startup and project details, founder/team information,
            and any comments organizers or participants add. This content may
            contain personal information about founders and team members.
          </li>
          <li>
            <strong>Evaluation data.</strong> Scores, reports, reviewer notes,
            and decisions generated or recorded within the Service.
          </li>
          <li>
            <strong>OAuth profile data.</strong> Where you sign in with Google,
            we receive basic profile information (such as name and email) from
            that provider.
          </li>
          <li>
            <strong>Usage and device data.</strong> Log data, IP address,
            browser type, and similar technical information collected
            automatically when you use the Service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    heading: "How we use information",
    body: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>provide, operate, and maintain the Service;</li>
          <li>
            run AI&#8209;assisted evaluation and generate evidence&#8209;based
            reports (see &ldquo;AI processing&rdquo; below);
          </li>
          <li>authenticate users and secure accounts and workspaces;</li>
          <li>respond to support requests and communicate about the Service;</li>
          <li>monitor, troubleshoot, and improve the Service; and</li>
          <li>
            comply with legal obligations and enforce our{" "}
            <a href="/terms">Terms of Service</a>.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ai",
    heading: "AI processing",
    body: (
      <>
        <p>
          Submitted content is processed by automated AI judges to produce
          structured, advisory evaluation reports. These outputs are
          decision&#8209;support only: a human reviewer makes the final
          decision. AI inference is performed through third&#8209;party AI
          infrastructure acting as our service provider (see
          &ldquo;subprocessors&rdquo;).
        </p>
        <p>
          We do not use submitted pitch decks or participant materials to train
          third&#8209;party foundation models, and we instruct our providers to
          process this content only to deliver the Service to you.
        </p>
      </>
    ),
  },
  {
    id: "share",
    heading: "How we share information",
    body: (
      <>
        <p>We share personal information only as described here:</p>
        <ul>
          <li>
            <strong>Service providers / subprocessors.</strong> We use trusted
            vendors to host data and run the Service, including cloud hosting
            and authentication (e.g., Supabase) and AI inference infrastructure
            (e.g., Vercel AI Gateway and the underlying model providers). They
            process information under contract and only on our instructions.
          </li>
          <li>
            <strong>Within a program.</strong> Materials an organizer collects
            are visible to that organizer&rsquo;s authorized workspace.
            Participant submissions are shared with the organizer running the
            program they applied to.
          </li>
          <li>
            <strong>Legal and safety.</strong> Where required by law, legal
            process, or to protect rights, safety, and the integrity of the
            Service.
          </li>
          <li>
            <strong>Business transfers.</strong> In connection with a merger,
            acquisition, or sale of assets, subject to this policy.
          </li>
        </ul>
        <p>
          <strong>
            We do not sell personal information, and we do not &ldquo;share&rdquo;
            it for cross&#8209;context behavioral advertising
          </strong>{" "}
          as those terms are defined under California law.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies and similar technologies",
    body: (
      <p>
        We use strictly necessary cookies to keep you signed in and to operate
        the Service securely. We use only the cookies needed to provide the
        Service and any privacy&#8209;respecting analytics required to maintain
        it; we do not use advertising cookies. You can control cookies through
        your browser settings, though disabling essential cookies may break
        sign&#8209;in.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "Data retention",
    body: (
      <p>
        We retain personal information for as long as needed to provide the
        Service, comply with our legal obligations, resolve disputes, and
        enforce our agreements. Specific retention periods{" "}
        <strong>[to be confirmed]</strong> depend on the type of data and the
        program context. When information is no longer needed, we delete or
        de&#8209;identify it. You may request deletion as described below.
      </p>
    ),
  },
  {
    id: "security",
    heading: "How we protect information",
    body: (
      <p>
        We use technical and organizational measures to protect personal
        information, including encryption in transit, access controls,
        row&#8209;level data isolation between organizer workspaces, and
        server&#8209;side handling of secrets. More detail is on our{" "}
        <a href="/security">Security</a> page. No method of transmission or
        storage is completely secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "rights",
    heading: "Your privacy rights",
    body: (
      <>
        <p>
          Depending on where you are located, you may have rights under laws such
          as the EU and UK General Data Protection Regulation (GDPR) and the Law
          of Georgia on Personal Data Protection, including the right to access,
          correct, delete, restrict, or object to processing, the right to data
          portability, and the right to withdraw consent at any time. Where we
          rely on your consent we process on that basis; otherwise we process to
          perform our contract with you, to comply with legal obligations, or for
          our legitimate business interests. You may lodge a complaint with your
          local data&#8209;protection authority &mdash; in Georgia, the Personal
          Data Protection Service.
        </p>
        <p>
          If you are a California resident, the California Consumer Privacy Act,
          as amended by the CPRA, gives you the right to:
        </p>
        <ul>
          <li>
            <strong>Know / access</strong> the categories and specific pieces of
            personal information we have collected about you;
          </li>
          <li>
            <strong>Delete</strong> personal information we collected from you,
            subject to legal exceptions;
          </li>
          <li>
            <strong>Correct</strong> inaccurate personal information;
          </li>
          <li>
            <strong>Opt out</strong> of the sale or sharing of personal
            information &mdash; though, as noted above, we do not sell or share
            personal information; and
          </li>
          <li>
            <strong>Non&#8209;discrimination</strong> for exercising your
            rights.
          </li>
        </ul>
        <p>
          To exercise these rights, email{" "}
          <a href="mailto:privacy@evallens.io">privacy@evallens.io</a>. We
          will verify your request before responding. You may use an authorized
          agent where permitted by law.
        </p>
        <p>
          Where we process content on behalf of an organizer (for example,
          participant materials), the organizer is the party responsible for
          that data; we will direct relevant requests to them.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children&rsquo;s privacy",
    body: (
      <p>
        The Service is intended for businesses and professionals and is not
        directed to children. We do not knowingly collect personal information
        from children under 16. If you believe a child has provided us personal
        information, contact us so we can delete it.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        revise the &ldquo;Last updated&rdquo; date above and, for material
        changes, provide additional notice where appropriate.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about this policy or your information? Contact{" "}
        <strong>{OPERATOR}</strong> at{" "}
        <a href="mailto:privacy@evallens.io">privacy@evallens.io</a> or at{" "}
        <strong>{OPERATOR_ADDRESS}</strong>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <p>
          This policy describes what personal information EvalLens collects, how
          we use and share it, how long we keep it, and the choices and rights
          you have &mdash; including rights for California residents.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
