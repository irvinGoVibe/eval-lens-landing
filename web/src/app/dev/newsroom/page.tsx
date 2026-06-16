// Dev-only comparison page for the home "Newsroom" block.
// Shows both designs stacked so they can be compared:
//   • Version 1 — the classic 3-up card grid (what was here before)
//   • Version 2 — the Apple-style horizontal carousel (current live block)
// Not linked from anywhere; reach it directly at /dev/newsroom.

import { ScrollOrchestrator } from "@/components/ScrollOrchestrator";
import { HomeBlogBlock } from "@/components/sections/HomeBlogBlock";
import { HomeBlogBlockClassic } from "@/components/sections/HomeBlogBlockClassic";

export const metadata = {
  title: "Newsroom block — A/B compare",
  robots: { index: false, follow: false },
};

function Label({ n, text }: { n: string; text: string }) {
  return (
    <div
      style={{
        maxWidth: "var(--maxw)",
        margin: "0 auto",
        padding: "40px var(--gutter) 8px",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      <span style={{ color: "var(--violet)" }}>{n}</span> · {text}
    </div>
  );
}

export default function NewsroomComparePage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", paddingBottom: 80 }}>
      {/* The live carousel uses a scroll-reveal observer (.reveal / .cards-in).
          On this static compare page we force it visible so it always shows,
          while still mounting ScrollOrchestrator so the entrance spring plays
          when scrolled in a normal browser. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "#home-blog.reveal{opacity:1;transform:none;}#home-blog .news-card{opacity:1;}",
        }}
      />

      <Label n="Version 1" text="Было — card grid (classic)" />
      <HomeBlogBlockClassic />

      <div style={{ height: 1, background: "var(--border-2)", margin: "8px 0" }} />

      <Label n="Version 2" text="Стало — Apple-style carousel (live)" />
      <HomeBlogBlock />

      <ScrollOrchestrator />
    </main>
  );
}
