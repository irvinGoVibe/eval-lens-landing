import Link from "@/components/LanSafeLink";
import { Eyebrow } from "@/components/ds";
import styles from "./UseCaseDetail.module.css";

const USE_CASES = [
  {
    tag: "Angel networks",
    headline: "Every deal fully read before screening night.",
    href: "/trust/use-cases/angel-networks",
  },
  {
    tag: "Pitch competitions",
    headline: "Every rank carries its receipts.",
    href: "/trust/use-cases/pitch-competitions",
  },
  {
    tag: "Hackathons",
    headline: "Every project gets a full read before the expo floor opens.",
    href: "/trust/use-cases/hackathons",
  },
  {
    tag: "VC open calls",
    headline: "Your open call, actually read.",
    href: "/trust/use-cases/vc-open-calls",
  },
  {
    tag: "Accelerators",
    headline: "Every application gets a full read.",
    href: "/trust/use-cases/accelerators",
  },
  {
    tag: "Corporate innovation",
    headline: "From challenge statement to a signed PoC.",
    href: "/trust/use-cases/corporate-innovation",
  },
  {
    tag: "Grants & prizes",
    headline: "Every score survives the audit.",
    href: "/trust/use-cases/grants-prizes",
  },
  {
    tag: "Crowdfunding platforms",
    headline: "Screen project owners in days. Keep the file.",
    href: "/trust/use-cases/crowdfunding",
  },
  {
    tag: "Tenders & RFPs",
    headline: "Awards that survive the challenge.",
    href: "/trust/use-cases/tenders",
  },
] as const;

export function UseCaseRelated({ currentHref }: { currentHref: string }) {
  const items = USE_CASES.filter((item) => item.href !== currentHref);

  return (
    <section className={`band ink ${styles.related}`} aria-labelledby="related-use-cases-title">
      <div className="wrap">
        <div className={styles.relatedHead} data-reveal="up">
          <Eyebrow>More use cases</Eyebrow>
          <h2 id="related-use-cases-title" className="title">
            The same evidence standard, in{" "}
            <span className={styles.relatedAccent}>every review room.</span>
          </h2>
        </div>
        <nav className={styles.relatedGrid} aria-label="Other EvalLens use cases">
          {items.map((item) => (
            <Link key={item.href} className={styles.relatedCard} href={item.href} data-reveal="up">
              <span className={styles.relatedTag}>{item.tag}</span>
              <span className={styles.relatedHeadline}>{item.headline}</span>
              <span className={styles.relatedArrow} aria-hidden="true">
                View use case →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
