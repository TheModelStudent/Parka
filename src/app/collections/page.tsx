import type { Metadata } from "next";
import { getAllCollections } from "@/lib/data";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Collections" };

export default async function CollectionsIndexPage() {
  const collections = await getAllCollections();
  return (
    <>
      <PageHero
        title="Collections"
        subtitle="Curated Worlds"
        description="Each PARKA collection is shaped by a different muse — explore them all."
        image={{ src: "/images/collection-bridal.jpg", alt: "PARKA collections" }}
      />
      <section className="container-luxe py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 90}>
              <CollectionCard collection={c} priority={i < 2} className="h-[440px] md:h-[560px]" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
