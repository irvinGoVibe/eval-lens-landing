import type { Metadata } from "next";
import { GradientPlayground } from "../_shared/GradientPlayground";
import "../_shared/gradient.css";

/**
 * dev/gradient-light — isolated test stand for the LIGHT WebGL "liquid surface"
 * gradient (OGL). Mostly near-white base with a soft violet→lavender→cyan→aqua
 * cloud field, glass cards on top + a live control panel. Not wired into the
 * real site. Throwaway dev page.
 */
export const metadata: Metadata = {
  title: "Gradient (light) — dev",
  robots: { index: false, follow: false },
};

export default function GradientLightPage() {
  return <GradientPlayground variant="light" />;
}
