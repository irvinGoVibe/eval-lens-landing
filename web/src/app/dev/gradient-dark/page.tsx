import type { Metadata } from "next";
import { GradientPlayground } from "../_shared/GradientPlayground";
import "../_shared/gradient.css";

/**
 * dev/gradient-dark — isolated test stand for the DARK WebGL "liquid surface"
 * gradient (OGL). Mostly dark base with the same violet→lavender→cyan→aqua
 * cloud field a touch more saturated, glass cards on top + a live control
 * panel. Not wired into the real site. Throwaway dev page.
 */
export const metadata: Metadata = {
  title: "Gradient (dark) — dev",
  robots: { index: false, follow: false },
};

export default function GradientDarkPage() {
  return <GradientPlayground variant="dark" />;
}
