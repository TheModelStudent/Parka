import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle, getRelatedProducts } from "@/lib/data";
import { formatMoney } from "@/lib/format";
import { brand } from "@/lib/site";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { AddToBagButton } from "@/components/ui/AddToBagButton";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  return { title: product?.title ?? "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();
  const related = await getRelatedProducts(product);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="pt-24 md:pt-28">
      <section className="container-luxe grid grid-cols-1 gap-10 py-8 md:grid-cols-2 md:gap-16 md:py-14">
        <ProductGallery images={gallery} badge={product.badge} />

        <div className="md:py-6">
          <p className="eyebrow capitalize">{product.category}</p>
          <h1 className="heading-serif mt-3 text-4xl md:text-5xl">{product.title}</h1>
          {product.subtitle && (
            <p className="mt-3 text-sm uppercase tracking-luxe text-muted">{product.subtitle}</p>
          )}
          <p className="mt-6 text-xl text-ink">{formatMoney(product.price)}</p>

          <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-muted">
            Hand-crafted in our atelier and made to order. Each PARKA piece is set by
            artisans whose craft has passed through generations — an heirloom from the
            moment it is finished.
          </p>

          {product.materials && product.materials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.materials.map((m) => (
                <span key={m} className="border border-line px-3 py-1 text-[11px] uppercase tracking-luxe text-muted">
                  {m}
                </span>
              ))}
            </div>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <AddToBagButton />
            <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="btn-line">
              Enquire
            </a>
          </div>

          <ul className="mt-10 space-y-3 border-t border-line pt-8 text-sm font-light text-muted">
            <li>Complimentary insured shipping, door-delivered.</li>
            <li>Certified materials with a lifetime of care.</li>
            <li>Private viewings available at all PARKA boutiques.</li>
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-luxe py-16 md:py-24">
          <h2 className="heading-serif mb-10 text-3xl md:text-4xl">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
