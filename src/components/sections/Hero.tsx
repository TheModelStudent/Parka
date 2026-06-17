import Link from "next/link";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ArrowDownIcon } from "@/components/ui/Icons";

/**
 * SECTION 1 — Hero video.
 * The cinematic video IS the first screen (no static hero, slideshow or carousel).
 * Full-screen, autoplay, muted, looping, premium dark overlay.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden text-ivory"
    >
      <VideoBackground
        youTubeId="pHYye_MicJQ"
        poster="/images/hero-poster.jpg"
        title="PARKA — Fine Indian Jewellery"
        lazy={false}
        priority
        overlayClassName="bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/70"
      />

      <div className="container-luxe relative z-10 pb-20 md:pb-28">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow !text-ivory/80">Fine Indian Jewellery</p>
          <h1 className="heading-serif mt-6 text-balance text-5xl text-ivory sm:text-6xl md:text-7xl">
            Crafted for women who carry stories.
          </h1>
          <div className="mt-10">
            <Link href="#new-in" className="btn-line-light">
              Discover Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <ArrowDownIcon className="h-5 w-5 animate-bounce text-ivory/70" />
      </div>
    </section>
  );
}
