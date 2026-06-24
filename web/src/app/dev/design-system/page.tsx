import type { Metadata } from "next";

import "./design-system.css";
import { DesignSystemShowcase } from "./DesignSystemShowcase";

export const metadata: Metadata = {
  title: "Design System — EvalLense",
  description:
    "Living UI / brand reference for the EvalLense landing: real tokens, gradients, glass, typography, components, Bento, transitions and motion in one page.",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
