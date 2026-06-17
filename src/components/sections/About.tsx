import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 6 — About PARKA (anchor: #about).
 * Brand storytelling: image-led, restrained copy. Mirrors Aurus's "Our story".
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-bg py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Imagery */}
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src="/images/about-portrait.jpg"
                alt="A PARKA muse adorned in heritage jewellery"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-4 hidden aspect-square w-40 overflow-hidden border-8 border-bg bg-surface sm:block md:w-52 lg:-right-10">
              <Image
                src="/images/about-detail.jpg"
                alt="Detail of PARKA kundan craftsmanship"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={120}>
            <p className="eyebrow">Our Story</p>
            <h2 className="heading-serif mt-5 text-4xl text-ink md:text-5xl">
              Inspired by art, design, craft &amp; culture
            </h2>
            <div className="mt-7 space-y-5 text-[15px] font-light leading-relaxed text-muted">
              <p>
                PARKA is a contemporary Indian fine jewellery house, rooted in
                craft and shaped by a quiet irreverence for rules. We reinterpret
                tradition — bringing together diverse influences so that each
                piece lives on the cusp of history and modernity.
              </p>
              <p>
                Every jewel is made slowly, by hand, by artisans who have carried
                their craft across generations. The result is meant to be worn,
                loved, and one day passed on — an heirloom in the making.
              </p>
            </div>
            <p className="mt-8 font-serif text-2xl font-light italic text-ink">
              For women who carry stories.
            </p>
            <div className="mt-9">
              <Link href="#collections" className="btn-line">
                Explore the Maison
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
