import Link from "next/link";
import { getArticles } from "@/lib/data";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 8 — Our Journal. Editorial entries; stays near the bottom (as Aurus).
 */
export async function Journal() {
  const articles = await getArticles();

  return (
    <section id="journal" className="scroll-mt-24 bg-bg py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <Reveal className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <p className="eyebrow">Stories &amp; Craft</p>
            <h2 className="heading-serif mt-4 text-4xl text-ink md:text-5xl">
              Our journal
            </h2>
          </div>
          <Link
            href="#journal"
            className="link-underline hidden text-[11px] uppercase tracking-luxe text-ink sm:inline-flex"
          >
            All Stories
          </Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={i * 90}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
