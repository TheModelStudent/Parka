import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/shopify/types";

/** Journal entry card — magazine styling. */
export function ArticleCard({ article }: { article: Article }) {
  const { handle, title, excerpt, image, readingTime, publishedAt } = article;

  return (
    <Link href={`/journal/${handle}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 80vw, 30vw"
          className="object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-105"
        />
      </div>
      <div className="pt-6">
        <p className="text-[11px] uppercase tracking-luxe text-muted">
          {publishedAt} &middot; {readingTime}
        </p>
        <h3 className="mt-3 font-serif text-2xl font-light leading-snug">{title}</h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-muted">{excerpt}</p>
        <span className="link-underline mt-4 inline-block text-[11px] uppercase tracking-luxe text-ink">
          Read More
        </span>
      </div>
    </Link>
  );
}
