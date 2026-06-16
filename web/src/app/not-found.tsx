import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found — EvalLense",
  description:
    "The page you are looking for does not exist or has moved. Head back to the homepage or browse the full site map.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader light />
      <main className="notfound">
        <section className="band soft notfound-hero">
          <div className="wrap notfound-hero__inner">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Error 404
            </span>
            <p className="notfound-code" aria-hidden="true">
              4<span className="grad-word">0</span>4
            </p>
            <h1 className="notfound-title">This page is off the map</h1>
            <p className="sub notfound-sub">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
              Let&rsquo;s get you back on track.
            </p>
            <div className="cta-row notfound-cta">
              <Link className="btn btn-primary" href="/">
                Back to home
              </Link>
              <Link className="btn btn-ghost" href="/sitemap">
                Browse the site map
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
