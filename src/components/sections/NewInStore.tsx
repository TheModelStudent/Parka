import Image from "next/image";
import Link from "next/link";
import { getNewInCategories, getNewProducts } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

/**
 * SECTION 3 — New In Store.
 * Editorial category discovery (Earrings · Necklaces · Bracelets · Rings),
 * followed by a curated "Newly Added" rail. Curated, not a marketplace grid.
 */
export async function NewInStore() {
  const [categories, products] = await Promise.all([
    getNewInCategories(),
    getNewProducts(),
  ]);

  return (
    <section
      id="new-in"
      className="scroll-mt-24 bg-bg py-24 md:py-32 lg:py-40"
    >
      <div className="container-luxe">
        <Reveal className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Newly Arrived</p>
            <h2 className="heading-serif mt-4 text-4xl text-ink md:text-5xl">
              New In Store
            </h2>
          </div>
          <Link
            href="#new-in"
            className="link-underline hidden text-[11px] uppercase tracking-luxe text-ink sm:inline-flex"
          >
            View Everything
          </Link>
        </Reveal>

        {/* Category tiles */}
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-7">
          {categories.map((cat, i) => (
            <Reveal key={cat.handle} delay={i * 80}>
              <Link href={`/collections/${cat.handle}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt}
                    fill
                    sizes="(max-width: 768px) 45vw, 22vw"
                    className="object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="pt-5 text-center">
                  <h3 className="font-serif text-2xl font-light text-ink">
                    {cat.title}
                  </h3>
                  {cat.blurb && (
                    <p className="mt-1 text-[11px] uppercase tracking-luxe text-muted">
                      {cat.blurb}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Curated product rail */}
      <div className="mt-20 md:mt-28">
        <div className="container-luxe mb-10 flex items-end justify-between">
          <h3 className="font-serif text-2xl font-light text-ink md:text-3xl">
            Pieces just added
          </h3>
          <Link
            href="#new-in"
            className="link-underline inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-ink"
          >
            All New <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-7 md:px-10 lg:px-16 [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[23%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
