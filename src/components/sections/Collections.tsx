import { getCollections } from "@/lib/data";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 5 — Collections.
 * Large, aspirational visual cards — not transactional.
 */
export async function Collections() {
  const collections = await getCollections();

  return (
    <section
      id="collections"
      className="scroll-mt-24 bg-surface py-24 md:py-32 lg:py-40"
    >
      <div className="container-luxe">
        <Reveal className="text-center">
          <p className="eyebrow">Curated Worlds</p>
          <h2 className="heading-serif mt-4 text-4xl text-ink md:text-5xl">
            Discover our collections
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-muted">
            Four worlds, each shaped by a different muse — from heirloom bridal
            polki to the quiet brilliance of diamonds.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {collections.map((collection, i) => (
            <Reveal key={collection.id} delay={(i % 2) * 100}>
              <CollectionCard
                collection={collection}
                priority={i < 2}
                className="h-[480px] md:h-[600px]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
