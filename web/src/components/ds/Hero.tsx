import { Button } from "@/components/ui/Button";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";

type HeroCta = {
  label: string;
  href?: string;
  variant?: "primary" | "ghost" | "gradient" | "dark";
};

type HeroProps = {
  eyebrow: string;
  titleLead: string;
  /** One lens-accented word in the title. */
  titleAccent?: string;
  titleTrail?: string;
  sub?: string;
  ctas?: HeroCta[];
  /** Band surface — `soft` (default light) / `light` / `ink` (dark). */
  surface?: "light" | "soft" | "ink";
  /** Layout version: 1 centered · 2 left-aligned · 3 oversized display. */
  version?: 1 | 2 | 3;
  id?: string;
};

/**
 * Hero — Statement hero section. Eyebrow → large title (one lens accent) → sub →
 * CTA row. Centered, lots of air, surface-agnostic (light/soft/ink). Composed
 * entirely from DS atoms (Eyebrow · Heading · Button) on the shared `.band` /
 * `.wrap` surfaces — theme-agnostic, only tokens. First DS Section.
 */
export function Hero({
  eyebrow,
  titleLead,
  titleAccent,
  titleTrail,
  sub,
  ctas = [],
  surface = "soft",
  version = 1,
  id,
}: HeroProps) {
  const surf = surface === "ink" ? "ink" : surface === "light" ? "" : "soft";
  const cls = ["band", surf, "ds-hero"].filter(Boolean).join(" ");
  return (
    <section id={id} className={cls} data-version={version}>
      <div className="wrap ds-hero__inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading
          as="h1"
          className="ds-hero__title"
          lead={titleLead}
          accent={titleAccent}
          trail={titleTrail}
        />
        {sub ? <p className="sub ds-hero__sub">{sub}</p> : null}
        {ctas.length > 0 ? (
          <div className="ds-hero__cta">
            {ctas.map((c) => (
              <Button key={c.label} variant={c.variant ?? "primary"} href={c.href}>
                {c.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
