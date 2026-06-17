import { ParkaMark } from "@/components/ui/ParkaMark";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 2 — PARKA signature.
 * The uploaded SVG, treated as an artist's signature: large, centered, emotional.
 */
export function Signature() {
  return (
    <section
      id="signature"
      className="relative overflow-hidden bg-bg py-28 md:py-40"
    >
      <div className="container-luxe">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow">The House of PARKA</p>

          <div className="mt-10 flex w-full items-center justify-center gap-6 md:gap-10">
            <span className="hidden h-px w-16 bg-line md:block md:w-28" />
            <ParkaMark
              className="h-44 w-auto sm:h-52 md:h-64"
              toneClassName="bg-ink"
              title="PARKA"
            />
            <span className="hidden h-px w-16 bg-line md:block md:w-28" />
          </div>

          <p className="heading-serif mt-12 max-w-3xl text-3xl text-ink sm:text-4xl md:text-[2.75rem]">
            Jewellery inspired by heritage, crafted for today.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
