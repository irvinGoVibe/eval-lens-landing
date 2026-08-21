import type { ReactNode } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ds";
import { Button } from "@/components/ui/Button";
import styles from "./UseCaseDetail.module.css";

type HeroCta = {
  label: string;
  href: string;
  partnerAccess?: boolean;
};

export function UseCaseDetailHero({
  id,
  eyebrow,
  title,
  sub,
  primary,
  secondary,
  mediaAlt,
  blendMediaCanvas = false,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  sub: string;
  primary: HeroCta;
  secondary: HeroCta;
  mediaAlt: string;
  blendMediaCanvas?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${styles.hero} ${blendMediaCanvas ? styles.heroMediaBlend : ""} light`}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.stage}>
        <div className={styles.copy}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id={`${id}-title`} className={styles.title}>
            {title}
          </h1>
          <p className={styles.sub}>{sub}</p>
          <div className={styles.actions}>
            <Button
              href={primary.href}
              variant="gradient"
              data-partner-access={primary.partnerAccess ? "true" : undefined}
            >
              {primary.label}
            </Button>
            <Button
              href={secondary.href}
              variant="ghost"
              data-partner-access={secondary.partnerAccess ? "true" : undefined}
            >
              {secondary.label}
            </Button>
          </div>
        </div>
        <Image
          className={`${styles.media} ${blendMediaCanvas ? styles.mediaCanvasBlend : ""}`}
          src="/assets/use-cases/shared/evidence-report-stack.webp"
          alt={mediaAlt}
          width={1536}
          height={1024}
          sizes="(max-width: 900px) 120vw, 69vw"
          priority
        />
      </div>
    </section>
  );
}

export function HeroAccent({ children }: { children: ReactNode }) {
  return <span className={styles.accent}>{children}</span>;
}
