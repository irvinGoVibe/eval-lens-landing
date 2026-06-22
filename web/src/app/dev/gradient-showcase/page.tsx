import type { Metadata } from "next";
import "./styles/gradient-showcase.css";
import { GradientShowcasePage } from "./components/GradientShowcasePage";
import { buildShowcaseStylesheet } from "./registries/stylesheet";

export const metadata: Metadata = {
  title: "Gradient Showcase — EvalLense",
  description:
    "Internal background testbed: CSS-first gradients, patterns and scroll-driven fields on the EvalLense palette, evaluated at real scale.",
  robots: { index: false, follow: false },
};

// The full preset catalog as one server-rendered stylesheet — copied CSS and
// rendered CSS come from the same builder, so they always match.
const showcaseCss = buildShowcaseStylesheet();

export default function Page() {
  return (
    <main className="gradient-showcase-page">
      <style dangerouslySetInnerHTML={{ __html: showcaseCss }} />
      <GradientShowcasePage />
    </main>
  );
}
