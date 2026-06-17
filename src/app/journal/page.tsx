import type { Metadata } from "next";
import { getArticles } from "@/lib/data";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "The Journal" };

export default async function JournalPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        title="The Journal"
        subtitle="Stories & Craft"
        description="Notes on craft, culture and the women who wear PARKA."
        image={{ src: "/images/journal-1.jpg", alt: "PARKA journal" }}
      />
      <section className="container-luxe py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={i * 80}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
