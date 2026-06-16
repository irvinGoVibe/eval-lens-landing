import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { NEWSROOM_NAV } from "@/lib/site-nav";

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Newsroom keeps "Book a demo" — it pre-dates the "Launch App" internal CTA
          and stays as the reference surface other internal pages mirror. */}
      <PageHeader nav={NEWSROOM_NAV} cta={{ label: "Book a demo", href: "/#demo" }} />
      <main className="blog">{children}</main>
      <Footer />
    </>
  );
}
