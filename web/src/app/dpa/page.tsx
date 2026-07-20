import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Data Processing Addendum — EvalLens",
  description:
    "The Data Processing Addendum governing how EvalLens processes personal data on a customer's behalf: roles, instructions, security, sub-processors, data-subject assistance, breach notice, deletion, and international transfers.",
};

const UPDATED = "July 20, 2026";

const OPERATOR = "Individual Entrepreneur Yaroslav Volovyi";

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    heading: "Overview and how this applies",
    body: (
      <p>
        This Data Processing Addendum (&ldquo;DPA&rdquo;) forms part of the{" "}
        <a href="/terms">Terms of Service</a> between you (the
        &ldquo;Customer&rdquo;) and <strong>{OPERATOR}</strong> (&ldquo;EvalLens,
        &rdquo; &ldquo;we&rdquo;) and applies where we process personal data on
        the Customer&rsquo;s behalf in providing the Service. If a signed
        agreement between the parties includes different data&#8209;processing
        terms, that agreement controls. Terms such as &ldquo;controller,&rdquo;
        &ldquo;processor,&rdquo; &ldquo;data subject,&rdquo; and
        &ldquo;processing&rdquo; have the meaning given under applicable
        data&#8209;protection law, including the EU/UK GDPR and the Law of Georgia
        on Personal Data Protection.
      </p>
    ),
  },
  {
    id: "roles",
    heading: "Roles of the parties",
    body: (
      <p>
        For personal data contained in submissions and evaluation materials the
        Customer provides or collects (&ldquo;Customer Personal Data&rdquo;), the
        Customer is the <strong>controller</strong> and EvalLens is the{" "}
        <strong>processor</strong> acting on the Customer&rsquo;s documented
        instructions. Where EvalLens determines the purposes and means of
        processing &mdash; for example, account administration and securing the
        Service &mdash; EvalLens acts as a controller and its{" "}
        <a href="/privacy">Privacy Policy</a> applies.
      </p>
    ),
  },
  {
    id: "scope",
    heading: "Subject-matter, nature and purpose",
    body: (
      <>
        <p>
          The processing covers what is needed to provide the Service:
        </p>
        <ul>
          <li>
            <strong>Subject&#8209;matter and duration:</strong> processing of
            Customer Personal Data for the term of the Service and until deletion
            or return as described below.
          </li>
          <li>
            <strong>Nature and purpose:</strong> hosting, storing, and running
            AI&#8209;assisted evaluation of submitted materials to produce
            advisory, decision&#8209;support reports for the Customer.
          </li>
          <li>
            <strong>Types of data:</strong> account and contact details, and the
            contents of submissions (which may include founder/team information
            and any personal data the Customer or its participants include).
          </li>
          <li>
            <strong>Data subjects:</strong> the Customer&rsquo;s personnel and
            the participants whose materials are submitted to the Service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "instructions",
    heading: "Processing on documented instructions",
    body: (
      <p>
        EvalLens processes Customer Personal Data only on the Customer&rsquo;s
        documented instructions &mdash; including as set out in this DPA, the
        Terms, and the Customer&rsquo;s configuration and use of the Service
        &mdash; unless required to do otherwise by applicable law, in which case
        we will inform the Customer unless the law prohibits it. We do not use
        submitted materials to train third&#8209;party foundation models, and we
        instruct our providers to process this content only to deliver the
        Service. We will tell the Customer if we believe an instruction infringes
        applicable data&#8209;protection law.
      </p>
    ),
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: (
      <p>
        We ensure that personnel authorized to process Customer Personal Data are
        bound by appropriate confidentiality obligations and access such data
        only as needed to provide the Service, following least&#8209;privilege
        principles.
      </p>
    ),
  },
  {
    id: "security",
    heading: "Security measures",
    body: (
      <p>
        We implement appropriate technical and organizational measures to protect
        Customer Personal Data, including encryption in transit, access controls,
        row&#8209;level isolation between customer workspaces, and
        server&#8209;side handling of secrets. A fuller description is on our{" "}
        <a href="/security">Security</a> page. We may update these measures over
        time provided the level of protection is not materially reduced.
      </p>
    ),
  },
  {
    id: "subprocessors",
    heading: "Sub-processors",
    body: (
      <p>
        The Customer authorizes EvalLens to engage the sub&#8209;processors listed
        on our <a href="/subprocessors">Sub&#8209;processors</a> page to help
        provide the Service. We impose data&#8209;protection obligations on each
        sub&#8209;processor that are no less protective than those in this DPA and
        remain responsible for their performance. We will notify the Customer of
        intended additions or replacements as described on that page, giving the
        Customer an opportunity to object on reasonable data&#8209;protection
        grounds.
      </p>
    ),
  },
  {
    id: "data-subjects",
    heading: "Data-subject requests",
    body: (
      <p>
        Taking into account the nature of the processing, we will provide
        reasonable assistance to help the Customer respond to data&#8209;subject
        requests (such as access, correction, deletion, restriction, portability,
        and objection). If we receive such a request directly from a data subject
        about Customer Personal Data, we will direct them to the Customer rather
        than respond ourselves, unless legally required to act.
      </p>
    ),
  },
  {
    id: "assistance",
    heading: "Assistance with compliance",
    body: (
      <p>
        Taking into account the information available to us, we will provide
        reasonable assistance to the Customer with data&#8209;protection impact
        assessments and prior consultations with supervisory authorities, and
        with the Customer&rsquo;s obligations to keep Customer Personal Data
        secure, to the extent these relate to our processing.
      </p>
    ),
  },
  {
    id: "breach",
    heading: "Personal-data breach notification",
    body: (
      <p>
        We will notify the Customer without undue delay after becoming aware of a
        personal&#8209;data breach affecting Customer Personal Data, and provide
        information reasonably available to us to help the Customer meet its own
        notification obligations. Our notice is not an acknowledgment of fault or
        liability.
      </p>
    ),
  },
  {
    id: "deletion",
    heading: "Return and deletion",
    body: (
      <p>
        On termination of the Service, or on the Customer&rsquo;s request, we will
        delete or return Customer Personal Data in accordance with the retention
        periods described in our <a href="/privacy#retention">Privacy Policy</a>,
        except where applicable law requires continued storage. Residual copies in
        routine backups are purged on our ordinary backup cycle.
      </p>
    ),
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: (
      <p>
        Where we or our sub&#8209;processors transfer Customer Personal Data
        across borders, we rely on appropriate safeguards &mdash; such as the
        European Commission&rsquo;s Standard Contractual Clauses and the UK
        addendum where relevant, or transfers to a jurisdiction recognized as
        adequate. Further detail is in our{" "}
        <a href="/privacy#transfers">Privacy Policy</a>.
      </p>
    ),
  },
  {
    id: "audits",
    heading: "Audits and information",
    body: (
      <p>
        We will make available information reasonably necessary to demonstrate
        compliance with this DPA and, on reasonable prior notice and subject to
        confidentiality, allow for and contribute to audits conducted by the
        Customer or an independent auditor it mandates. To minimize disruption,
        the parties will agree on scope, timing, and cost in advance, and we may
        satisfy audit requests by providing relevant documentation or summaries
        of third&#8209;party assessments where available.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        To put a signed copy of this DPA in place, or for any data&#8209;processing
        question, contact{" "}
        <a href="mailto:privacy@evallens.io">privacy@evallens.io</a>.
      </p>
    ),
  },
];

export default function DpaPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Data Processing Addendum"
      updated={UPDATED}
      intro={
        <p>
          This addendum governs how EvalLens processes personal data on a
          customer&rsquo;s behalf &mdash; the roles of the parties, our
          instructions and security duties, sub&#8209;processors, breach notice,
          deletion, and international transfers.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
