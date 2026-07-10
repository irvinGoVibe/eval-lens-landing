"use client";

import { Button } from "@/components/ui/Button";

type HeroActionsProps = {
  primaryLabel: string;
  primaryHref?: string;
  primaryAction?: "restart-unicorn";
  showSecondary: boolean;
};

export function HeroActions({
  primaryLabel,
  primaryHref,
  primaryAction,
  showSecondary,
}: HeroActionsProps) {
  const restartUnicorn = () => {
    const hero = document.getElementById("hero");
    const backgroundVideo = hero?.querySelector(".hero-video") as HTMLVideoElement | null;
    const unicorn = hero?.querySelector(".hero-unicorn") as HTMLVideoElement | null;
    const wrap = hero?.querySelector(".hero-unicorn-wrap") as HTMLElement | null;

    try {
      backgroundVideo?.pause();
      if (backgroundVideo) backgroundVideo.currentTime = 0;
      void backgroundVideo?.play().catch(() => {});
    } catch {}

    if (!unicorn) return;

    const hideUnicorn = () => wrap?.classList.remove("is-visible");
    unicorn.addEventListener("ended", hideUnicorn, { once: true });

    try {
      unicorn.pause();
      unicorn.currentTime = 0;
      wrap?.classList.add("is-visible");
      void unicorn.play().catch(() => {
        unicorn.removeEventListener("ended", hideUnicorn);
      });
    } catch {
      unicorn.removeEventListener("ended", hideUnicorn);
      wrap?.classList.add("is-visible");
    }
  };

  return (
    <div className="cta-row hero-fade d4">
      {primaryAction === "restart-unicorn" ? (
        <Button onClick={restartUnicorn}>{primaryLabel}</Button>
      ) : (
        <Button href={primaryHref ?? "https://calendly.com/evallens/30min"}>
          {primaryLabel}
        </Button>
      )}
      {showSecondary ? (
        <Button variant="glass" arrow>
          Try live demo
        </Button>
      ) : null}
    </div>
  );
}
