"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageRef } from "@/lib/shopify/types";

/** PDP gallery — large image with a thumbnail strip (vertical on desktop). */
export function ProductGallery({ images, badge }: { images: ImageRef[]; badge?: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-5">
      {images.length > 1 && (
        <div className="flex gap-3 md:flex-col">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden bg-surface transition md:h-20 md:w-20 ${
                active === i ? "ring-1 ring-gold ring-offset-2 ring-offset-bg" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-surface">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {badge && (
          <span className="absolute left-4 top-4 bg-bg/80 px-3 py-1 text-[10px] uppercase tracking-luxe text-ink backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
