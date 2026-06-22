import type { Metadata } from "next";
import "./glass-dock.css";
import { Component } from "@/components/ui/liquid-glass";

export const metadata: Metadata = {
  title: "Liquid Glass dock — EvalLense",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Component />;
}
