import Link from "next/link";
import { VideoBackground } from "@/components/ui/VideoBackground";

/**
 * SECTION 4 — Second storytelling video.
 * Full-width, lazy-loaded (loads as it nears the viewport — performance).
 */
export function StorytellingVideo() {
  return (
    <section className="relative flex h-[88svh] min-h-[540px] w-full items-center justify-center overflow-hidden text-center text-ivory">
      <VideoBackground
        youTubeId="6yx90_7CR78"
        poster="/images/story-poster.jpg"
        title="The PARKA Story"
        lazy
        overlayClassName="bg-charcoal/45"
      />

      <div className="container-luxe relative z-10">
        <p className="eyebrow !text-ivory/80">Our Story</p>
        <h2 className="heading-serif mx-auto mt-6 max-w-3xl text-balance text-4xl text-ivory sm:text-5xl md:text-6xl">
          Inspired by craft, culture and timeless beauty.
        </h2>
        <div className="mt-10">
          <Link href="#about" className="btn-line-light">
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
