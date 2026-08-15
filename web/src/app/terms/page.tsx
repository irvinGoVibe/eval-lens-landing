import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service — EvalLens",
  description:
    "The terms for business use of the EvalLens pitch deck evaluation service: acceptable use, AI output disclaimers, liability limits, VAT, and Georgian law.",
};

const UPDATED = "June 16, 2026";

const OPERATOR = "Individual Entrepreneur Yaroslav Volovyi";

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    body: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are a legal agreement
          between you and <strong>{OPERATOR}</strong>, an individual entrepreneur
          registered in Georgia
          (&ldquo;EvalLens,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) governing
          your access to and use of the EvalLens website and service (the
          &ldquo;Service&rdquo;). The Service is provided to businesses and
          organizations only. By creating an account or using the Service, you
          represent that you are acting on behalf of a business or organization
          (and not as a consumer) and that you have authority to bind that
          organization to these Terms.
        </p>
        <p>The Service is operated by:</p>
        <ul>
          <li>
            <strong>Operator:</strong> {OPERATOR}
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
            <strong>Registered address:</strong> Gotua Street N26, Floor 10, Flat
            N37, Saburtalo District, Tbilisi, Georgia
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "service",
    heading: "The Service",
    body: (
      <p>
        EvalLens is a business software and development service for evaluating
        pitch decks. For each client we configure and adapt the evaluation
        workflow to the client&rsquo;s program and requirements; the Service
        collects submissions, runs AI&#8209;assisted evaluation, and produces
        structured, advisory reports to help human reviewers compare and decide.
        EvalLens does not make funding, selection, or hiring decisions; those
        decisions remain with you.
      </p>
    ),
  },
  {
    id: "illustrative-content",
    heading: "Illustrative content and sample data",
    body: (
      <p>
        All interface previews, product screenshots, sample reports, scores,
        pitch&#8209;deck titles, company and project names, and other
        demonstration material shown on this website are{" "}
        <strong>fictitious and for illustration only</strong>. They are created
        to showcase how EvalLens works and do <strong>not</strong> represent
        real submissions, real companies, real evaluations, or actual results.
        Any resemblance to a real project, company, or person is coincidental.
      </p>
    ),
  },
  {
    id: "accounts",
    heading: "Eligibility and accounts",
    body: (
      <p>
        The Service is offered to businesses and organizations only and is not
        intended for consumers. By using it, you represent that you are acting in
        a business or professional capacity and not as a consumer. You must be at
        least 18 years old and able to form a binding contract to use the
        Service. You agree to provide accurate account information, to keep your
        credentials confidential, and to be responsible for activity under your
        account. Notify us promptly of any unauthorized use.
      </p>
    ),
  },
  {
    id: "content",
    heading: "Your content and responsibilities",
    body: (
      <>
        <p>
          You retain ownership of the pitch decks, materials, and data you or
          your participants submit (&ldquo;Customer Content&rdquo;). You grant us
          a limited license to host, process, and display Customer Content solely
          to provide the Service to you. Where Customer Content includes personal
          data that we process on your behalf, our{" "}
          <a href="/dpa">Data Processing Addendum</a> applies, and the providers
          that help us run the Service are listed on our{" "}
          <a href="/subprocessors">Sub&#8209;processors</a> page.
        </p>
        <p>You represent and warrant that:</p>
        <ul>
          <li>
            you have the rights and any necessary permissions to submit Customer
            Content and to have it evaluated;
          </li>
          <li>
            where you collect materials from participants, you have provided any
            legally required notices and obtained any required consent; and
          </li>
          <li>
            your use of the Service complies with applicable laws and these
            Terms.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: (
      <>
        <p>
          Your use of the Service is subject to our{" "}
          <a href="/acceptable-use">Acceptable Use Policy</a>, which forms part of
          these Terms. In summary, you agree not to:
        </p>
        <ul>
          <li>use the Service for unlawful, infringing, or harmful purposes;</li>
          <li>
            submit content that violates third&#8209;party rights or that you
            are not authorized to share;
          </li>
          <li>
            attempt to manipulate, bias, or subvert the evaluation (including
            embedding hidden instructions or adversarial content in
            submissions);
          </li>
          <li>
            probe, scrape, overload, or interfere with the Service, or
            circumvent its security; or
          </li>
          <li>
            reverse engineer or copy the Service except as permitted by law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ai-disclaimer",
    heading: "AI outputs are advisory",
    body: (
      <p>
        Evaluation reports, scores, and other AI outputs are generated
        automatically, are advisory, and may contain errors or omissions. They
        are <strong>not</strong> professional, legal, financial, or investment
        advice, and they do not guarantee any outcome. You are responsible for
        reviewing outputs and for any decision you make. The final decision is
        always yours.
      </p>
    ),
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: (
      <p>
        The Service, including its software, design, and content (excluding
        Customer Content), is owned by EvalLens and its licensors and is
        protected by intellectual&#8209;property laws. We grant you a limited,
        non&#8209;exclusive, non&#8209;transferable right to use the Service per
        these Terms. If you send us feedback, you grant us a perpetual,
        royalty&#8209;free license to use it to improve the Service.
      </p>
    ),
  },
  {
    id: "third-party",
    heading: "Third-party services",
    body: (
      <p>
        The Service relies on third&#8209;party providers (for example, hosting,
        authentication, and AI infrastructure). Your use may be subject to those
        providers&rsquo; terms. We are not responsible for third&#8209;party
        services we do not control.
      </p>
    ),
  },
  {
    id: "fees",
    heading: "Fees and payment",
    body: (
      <>
        <p>
          Fees for the Service and for any development or configuration work are
          set out in the applicable order, statement of work, or plan presented
          before you incur a charge, and those terms form part of this agreement.
        </p>
        <p>We use two payment methods depending on the plan:</p>
        <ul>
          <li>
            <strong>Invoiced engagements (default).</strong> Managed
            configuration and most subscriptions are invoiced by{" "}
            <strong>{OPERATOR}</strong> and paid by bank transfer to the account
            stated on the invoice, on the terms set out in your order or
            statement of work.
          </li>
          <li>
            <strong>Smaller plans paid by card.</strong> Where a card checkout is
            offered for a smaller plan, the payment is processed by a
            third&#8209;party <strong>merchant&#8209;of&#8209;record</strong> that
            acts as the seller of record for that transaction. That provider
            handles payment, billing, and applicable&#8209;tax collection for
            those purchases, and its terms apply to the payment.
          </li>
        </ul>
        <p>
          Unless stated otherwise, all fees are{" "}
          <strong>exclusive of value&#8209;added tax (VAT) and any other
          taxes</strong>. For invoiced business customers, where the
          reverse&#8209;charge mechanism applies{" "}
          <strong>you are responsible for self&#8209;accounting for VAT in your
          own jurisdiction</strong>, and you agree to provide a valid VAT or tax
          registration number on request. For card purchases handled by the
          merchant&#8209;of&#8209;record, any VAT or sales tax is collected by
          that provider. You are responsible for all taxes arising from your use
          of the Service other than taxes on our income.
        </p>
        <p>
          <strong>Refunds.</strong> Except where required by law, fees for
          invoiced engagements are non&#8209;refundable once the corresponding
          work or subscription period has begun, unless your order or statement
          of work says otherwise. For card purchases, refunds are handled under
          the merchant&#8209;of&#8209;record&rsquo;s refund policy shown at
          checkout.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    heading: "Disclaimer of warranties",
    body: (
      <p>
        The Service is provided <strong>&ldquo;as is&rdquo;</strong> and
        <strong> &ldquo;as available,&rdquo;</strong> without warranties of any
        kind, whether express, implied, or statutory, including implied
        warranties of merchantability, fitness for a particular purpose, and
        non&#8209;infringement. We do not warrant that the Service will be
        uninterrupted, error&#8209;free, or that outputs will be accurate or
        reliable. Some jurisdictions do not allow certain disclaimers, so parts
        of this section may not apply to you.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, EvalLens and its suppliers will
        not be liable for any indirect, incidental, special, consequential, or
        punitive damages, or any loss of profits, data, or goodwill, arising from
        or related to the Service. Our total liability for any claim relating to
        the Service will not exceed{" "}
        <strong>
          the greater of the total fees you paid for the Service in the twelve
          (12) months before the event giving rise to the claim, or US$100
        </strong>
        . Some jurisdictions do not allow these limits, so they may not fully
        apply to you.
      </p>
    ),
  },
  {
    id: "indemnity",
    heading: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold harmless EvalLens from claims, damages,
        and expenses (including reasonable legal fees) arising from your Customer
        Content, your use of the Service, or your breach of these Terms or of
        applicable law.
      </p>
    ),
  },
  {
    id: "termination",
    heading: "Termination",
    body: (
      <p>
        You may stop using the Service at any time. We may suspend or terminate
        access if you breach these Terms or to protect the Service or its users.
        On termination, your right to use the Service ends; sections that by
        their nature should survive (such as content licenses to feedback,
        disclaimers, liability limits, and indemnities) will survive.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of <strong>Georgia</strong>, without
        regard to its conflict&#8209;of&#8209;laws rules. You and{" "}
        <strong>{OPERATOR}</strong> agree to the{" "}
        <strong>exclusive jurisdiction of the competent courts located in
        Tbilisi, Georgia</strong>, for any dispute arising out of or relating to
        these Terms or the Service, except that either party may seek injunctive
        or other equitable relief in any court of competent jurisdiction to
        protect its intellectual property or confidential information.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. We will revise the
        &ldquo;Last updated&rdquo; date and, for material changes, provide
        reasonable notice. Continued use after changes take effect means you
        accept the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about these Terms? Contact{" "}
        <strong>{OPERATOR}</strong> at{" "}
        <a href="mailto:legal@evallens.io">legal@evallens.io</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Terms of Service"
      updated={UPDATED}
      intro={
        <p>
          These terms govern your use of EvalLens. Please read them carefully
          &mdash; they cover acceptable use, the advisory nature of AI outputs,
          warranties and liability, and how disputes are handled.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
