import type { Metadata } from "next";
import Link from "next/link";
import { getCollectionPage } from "@/lib/data";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionView } from "@/components/ui/CollectionView";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const { meta } = await getCollectionPage(params.handle);
  return { title: meta.title };
}

export default async function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const { meta, products } = await getCollectionPage(params.handle);
  return (
    <>
      <PageHero title={meta.title} subtitle={meta.subtitle} description={meta.description} image={meta.image} />
      <section className="container-luxe py-16 md:py-24">
        {products.length > 0 ? (
          <CollectionView products={products} showCategoryFilter />
        ) : (
          <div className="py-16 text-center">
            <p className="eyebrow">Arriving soon</p>
            <h2 className="heading-serif mt-4 text-3xl md:text-4xl">This edit is being crafted</h2>
            <p className="mx-auto mt-4 max-w-md text-sm font-light text-muted">
              These pieces are still in the atelier. In the meantime, discover our latest arrivals.
            </p>
            <Link href="/collections/new" className="btn-line mt-9 inline-flex">
              Shop New In
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
