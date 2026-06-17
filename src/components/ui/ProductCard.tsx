import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format";

/** Curated, editorial product tile — image-led, never a marketplace grid cell. */
export function ProductCard({ product }: { product: Product }) {
  const { handle, title, subtitle, image, hoverImage, price, compareAtPrice, badge } =
    product;

  return (
    <Link href={`/products/${handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 70vw, 24vw"
          className={`object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.04] ${
            hoverImage ? "group-hover:opacity-0" : ""
          }`}
        />
        {hoverImage && (
          <Image
            src={hoverImage.src}
            alt={hoverImage.alt}
            fill
            sizes="(max-width: 768px) 70vw, 24vw"
            className="object-cover opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100"
          />
        )}
        {badge && (
          <span className="absolute left-4 top-4 bg-bg/80 px-3 py-1 text-[10px] uppercase tracking-luxe text-ink backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>

      <div className="pt-5 text-center">
        <h3 className="font-serif text-xl font-normal">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-[11px] uppercase tracking-luxe text-muted">
            {subtitle}
          </p>
        )}
        <p className="mt-2 text-sm text-ink/80">
          {formatMoney(price)}
          {compareAtPrice && (
            <span className="ml-2 text-muted line-through">
              {formatMoney(compareAtPrice)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
