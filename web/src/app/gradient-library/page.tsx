import type { Metadata } from "next";
import "./styles/gradient-library.css";
import { GradientLibraryPage } from "./components/GradientLibraryPage";

export const metadata: Metadata = {
  title: "Gradient & Background Library — EvalLense",
  description:
    "Internal showcase: a working catalog of CSS-first gradients, patterns and scroll-driven backgrounds for EvalLense surfaces.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <GradientLibraryPage />;
}
