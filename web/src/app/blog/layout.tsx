import { BlogHeader } from "@/components/blog/BlogHeader";
import { Footer } from "@/components/Footer";

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogHeader />
      <main className="blog">{children}</main>
      <Footer />
    </>
  );
}
