import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "glass" | "dark" | "gradient";
type Size = "md" | "sm";

type BaseProps = {
  /** Visual style. Omit for a bare `btn` that relies on a custom `className`
   *  (e.g. the header CTA, which is styled via `.site-header__cta`). */
  variant?: Variant;
  size?: Size;
  /** Append a trailing `→` arrow (the animated `.arr` span). */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(variant: Variant | undefined, size: Size, className?: string) {
  return [
    "btn",
    variant && `btn-${variant}`,
    size === "sm" && "btn-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Single source of truth for the pill buttons across the site. Renders the same
 * legacy `.btn` classes (so context styles like `.hero .cta-row .btn` and
 * `.site-header__cta` keep working) and wraps children in `.btn-txt` so they sit
 * above the gradient overlays.
 *
 * - `href` starting with `/` → Next `<Link>` (internal navigation)
 * - other `href` (`#`, `mailto:`, `http…`) → plain `<a>`
 * - no `href` → `<button type="button">`
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    className,
    children,
    ...rest
  } = props;

  const cls = classes(variant, size, className);
  const inner = (
    <>
      <span className="btn-txt">{children}</span>
      {arrow && (
        <span className="arr" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<"a">;
    if (href!.startsWith("/")) {
      return (
        <Link href={href!} className={cls} {...anchorRest}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...anchorRest}>
        {inner}
      </a>
    );
  }

  const { type, ...buttonRest } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type ?? "button"} className={cls} {...buttonRest}>
      {inner}
    </button>
  );
}
