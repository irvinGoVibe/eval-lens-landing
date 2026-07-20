import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Acceptable Use Policy — EvalLens",
  description:
    "The rules for using the EvalLens pitch-deck evaluation service: prohibited uses, evaluation integrity and anti-manipulation, security, third-party rights, and how we enforce this policy.",
};

const UPDATED = "July 20, 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "scope",
    heading: "Scope",
    body: (
      <p>
        This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs your use of the
        EvalLens website and service (the &ldquo;Service&rdquo;) and forms part
        of our <a href="/terms">Terms of Service</a>. Capitalized terms not
        defined here have the meaning given in the Terms. If you break this
        policy, we may act as described in &ldquo;Enforcement&rdquo; below.
      </p>
    ),
  },
  {
    id: "prohibited",
    heading: "Prohibited uses",
    body: (
      <>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>
            break the law, infringe intellectual&#8209;property or privacy
            rights, or facilitate anything unlawful, fraudulent, or harmful;
          </li>
          <li>
            submit content you do not have the rights or permissions to share,
            or that you are not authorized to have evaluated;
          </li>
          <li>
            upload malware, or content that is defamatory, harassing, or that
            violates a third party&rsquo;s rights;
          </li>
          <li>
            misrepresent your identity or your authority to act for an
            organization, or impersonate another person or entity; or
          </li>
          <li>
            use the Service to build a competing product, or resell it, except
            as expressly permitted in writing.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "integrity",
    heading: "Evaluation integrity",
    body: (
      <>
        <p>
          EvalLens produces advisory, evidence&#8209;based reports that help
          humans decide. To keep evaluations fair, you agree not to:
        </p>
        <ul>
          <li>
            embed hidden instructions, prompt&#8209;injection, or adversarial
            content in a submission to manipulate, bias, or subvert the
            evaluation;
          </li>
          <li>
            attempt to reverse&#8209;engineer scoring in order to game results,
            or submit deliberately falsified materials; or
          </li>
          <li>
            interfere with another participant&rsquo;s submission or with a
            reviewer&rsquo;s workspace.
          </li>
        </ul>
        <p>
          Submitted deck content is treated as evidence to analyze, not as
          instructions to follow. The final decision always rests with a human
          reviewer.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security and system integrity",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            probe, scan, or test the vulnerability of the Service, or breach or
            circumvent its authentication or security;
          </li>
          <li>
            access data or workspaces that are not yours, or attempt to defeat
            workspace isolation;
          </li>
          <li>
            scrape, crawl, or harvest data at scale, or place an unreasonable
            load on the Service; or
          </li>
          <li>
            introduce automated agents or scripts that disrupt the Service or
            other users.
          </li>
        </ul>
        <p>
          Good&#8209;faith security research is welcome under our{" "}
          <a href="/security">responsible&#8209;disclosure</a> process.
        </p>
      </>
    ),
  },
  {
    id: "responsibility",
    heading: "Your responsibility for content",
    body: (
      <p>
        You are responsible for the materials you and your participants submit,
        for having the necessary rights and permissions, and for providing any
        legally required notices and obtaining any required consent. Where you
        collect materials from participants, you remain responsible for how you
        run your program. Our handling of personal data is described in our{" "}
        <a href="/privacy">Privacy Policy</a> and, where applicable, our{" "}
        <a href="/dpa">Data Processing Addendum</a>.
      </p>
    ),
  },
  {
    id: "enforcement",
    heading: "Enforcement",
    body: (
      <p>
        If we reasonably believe you have violated this policy, we may remove or
        disable offending content, throttle or suspend access, or terminate the
        account, with or without notice depending on the severity and any legal
        obligations. Where practical we will tell you what happened and how to
        resolve it. Nothing here limits any other rights or remedies available
        to us under the <a href="/terms">Terms</a> or applicable law.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this AUP from time to time. We will revise the
        &ldquo;Last updated&rdquo; date above and, for material changes, provide
        reasonable notice. Continued use after changes take effect means you
        accept the updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        Questions about acceptable use? Contact{" "}
        <a href="mailto:legal@evallens.io">legal@evallens.io</a>. To report abuse
        or a security issue, email{" "}
        <a href="mailto:security@evallens.io">security@evallens.io</a>.
      </p>
    ),
  },
];

export default function AcceptableUsePage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Acceptable Use Policy"
      updated={UPDATED}
      intro={
        <p>
          These rules keep EvalLens safe and evaluations fair. They cover what
          you may not do with the Service, how we protect evaluation integrity,
          and what happens if the policy is broken.
        </p>
      }
      sections={SECTIONS}
    />
  );
}
