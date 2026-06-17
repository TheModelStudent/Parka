import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/shopify/types";
import { ArrowRightIcon } from "./Icons";

/** Large, aspirational collection card with editorial overlay. */
export function CollectionCard({
  collection,
  priority = false,
  className = "",
}: {
  collection: Collection;
  priority?: boolean;
  className?: string;
}) {
  const { handle, title, subtitle, description, image } = collection;

  return (
    <Link
      href={`/collections/${handle}`}
      className={`group relative block overflow-hidden ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-8 text-ivory md:p-10">
        {subtitle && (
          <p className="eyebrow !text-ivory/75">{subtitle}</p>
        )}
        <h3 className="mt-2 font-serif text-3xl font-light md:text-4xl">{title}</h3>
        {description && (
          <p className="mt-2 max-w-sm text-sm font-light text-ivory/80">
            {description}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe">
          Discover
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
