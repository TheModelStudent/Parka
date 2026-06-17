import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleByHandle } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const article = await getArticleByHandle(params.handle);
  return { title: article?.title ?? "Journal" };
}

export default async function ArticlePage({
  params,
}: {
  params: { handle: string };
}) {
  const article = await getArticleByHandle(params.handle);
  if (!article) notFound();

  return (
    <article>
      <div className="relative flex h-[56svh] min-h-[380px] w-full items-center justify-center overflow-hidden text-center text-ivory">
        <Image src={article.image.src} alt={article.image.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="container-luxe relative z-10 pt-16">
          <p className="eyebrow !text-ivory/80">
            {article.publishedAt} &middot; {article.readingTime}
          </p>
          <h1 className="heading-serif mx-auto mt-4 max-w-3xl text-4xl text-ivory md:text-6xl">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="container-luxe max-w-2xl py-16 md:py-24">
        <p className="font-serif text-2xl font-light leading-relaxed text-ink">
          {article.excerpt}
        </p>
        <div className="mt-8 space-y-6 text-[15px] font-light leading-relaxed text-muted">
          <p>
            At PARKA, every piece begins long before the first stone is set — in
            conversations between designers and the artisans who bring a drawing to
            life. It is a slow, deliberate process, and a deeply human one.
          </p>
          <p>
            We believe jewellery should carry meaning as well as beauty: a sense of
            where it came from, the hands that made it, and the story of the person
            who chooses to wear it. That belief shapes everything we create.
          </p>
          <p>
            This is the spirit of the PARKA journal — a place to share the craft,
            culture and quiet details behind the collections.
          </p>
        </div>
        <Link href="/journal" className="link-underline mt-12 inline-block text-[11px] uppercase tracking-luxe text-ink">
          Back to the Journal
        </Link>
      </div>
    </article>
  );
}
