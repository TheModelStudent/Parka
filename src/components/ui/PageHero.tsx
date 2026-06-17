import Image from "next/image";
import type { ImageRef } from "@/lib/shopify/types";

/** Compact editorial banner for inner pages (PLP / PDP / journal). */
export function PageHero({
  title,
  subtitle,
  description,
  image,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  image: ImageRef;
}) {
  return (
    <section className="relative flex h-[46svh] min-h-[340px] w-full items-center justify-center overflow-hidden text-center text-ivory">
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="container-luxe relative z-10 pt-16">
        {subtitle && <p className="eyebrow !text-ivory/80">{subtitle}</p>}
        <h1 className="heading-serif mt-4 text-4xl text-ivory md:text-6xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-ivory/85">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
