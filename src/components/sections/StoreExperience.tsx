import Image from "next/image";
import { getStores } from "@/lib/data";
import { StoreCard } from "@/components/ui/StoreCard";
import { Reveal } from "@/components/ui/Reveal";
import { brand } from "@/lib/site";

/**
 * SECTION 7 — Store experience.
 * Atmospheric invitation + boutique cards. Mirrors Aurus's "Our stores".
 */
export async function StoreExperience() {
  const stores = await getStores();

  return (
    <section id="stores" className="scroll-mt-24 bg-surface">
      {/* Atmospheric banner */}
      <div className="relative flex h-[70svh] min-h-[460px] w-full items-center justify-center overflow-hidden text-center text-ivory">
        <Image
          src="/images/store-experience.jpg"
          alt="Step into the world of PARKA"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <Reveal className="container-luxe relative z-10">
          <p className="eyebrow !text-ivory/80">The PARKA Experience</p>
          <h2 className="heading-serif mx-auto mt-6 max-w-3xl text-balance text-4xl text-ivory md:text-5xl">
            Step into the world of PARKA
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-ivory/85">
            Where beauty, design, nuanced craft and contemporary artistry
            converge. Visit our boutiques, or arrange a private viewing.
          </p>
          <p className="mt-7 text-[12px] uppercase tracking-couture text-ivory/90">
            Jaipur &nbsp;·&nbsp; Mumbai &nbsp;·&nbsp; New Delhi
          </p>
          <div className="mt-9">
            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-line-light"
            >
              Book an Appointment
            </a>
          </div>
        </Reveal>
      </div>

      {/* Boutique cards */}
      <div className="container-luxe py-20 md:py-28">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {stores.map((store, i) => (
            <Reveal key={store.id} delay={i * 90}>
              <StoreCard store={store} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
