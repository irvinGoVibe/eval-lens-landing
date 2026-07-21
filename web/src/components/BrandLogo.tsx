type BrandLogoProps = {
  /** `dark` is the black wordmark for light surfaces; `light` is white. */
  tone?: "auto" | "dark" | "light";
  className?: string;
};

/** Official EvalLens wordmark. Surface-aware variants are handled in CSS. */
export function BrandLogo({
  tone = "auto",
  className,
}: BrandLogoProps) {
  const classes = ["brand-logo", `brand-logo--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} aria-hidden="true" />;
}
