import Image from "next/image";
import type { Store } from "@/lib/shopify/types";

/** Boutique card for the store-experience section. */
export function StoreCard({ store }: { store: Store }) {
  const { city, name, address, note, image, appointmentUrl, mapUrl } = store;

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 80vw, 30vw"
          className="object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
          <p className="eyebrow !text-ivory/75">{city}</p>
          <h3 className="mt-1 font-serif text-2xl font-light">{name}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm font-light text-muted">{address}</p>
      {note && <p className="mt-1 text-xs font-light italic text-muted">{note}</p>}
      <div className="mt-3 flex gap-6 text-[11px] uppercase tracking-luxe">
        <a
          href={appointmentUrl}
          target="_blank"
          rel="noreferrer"
          className="link-underline text-ink"
        >
          Book a Visit
        </a>
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="link-underline text-muted"
        >
          Directions
        </a>
      </div>
    </div>
  );
}
