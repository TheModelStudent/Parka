"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  youTubeId?: string;
  /**
   * Local/hosted MP4 source. If provided instead of youTubeId, a native
   * <video> is rendered — the drop-in path for self-hosted MP4 later.
   */
  mp4Src?: string;
  /** Poster shown instantly and as the fallback while the video loads. */
  poster: string;
  title: string;
  /** Defer mounting the player until near the viewport. Default: true. */
  lazy?: boolean;
  /** Prioritise the poster image (use for the above-the-fold hero). */
  priority?: boolean;
  /** Overlay layer classes (premium dark wash). */
  overlayClassName?: string;
  /**
   * Source video is portrait (9:16). YouTube always renders a 16:9 player and
   * pillarboxes portrait footage, so we over-scale the iframe to push the black
   * bars off-screen and let the footage truly fill (cover) the banner.
   * Default true — both PARKA banners are portrait.
   */
  portrait?: boolean;
}

export function VideoBackground({
  youTubeId,
  mp4Src,
  poster,
  title,
  lazy = true,
  priority = false,
  overlayClassName = "bg-[var(--overlay)]",
  portrait = true,
}: VideoBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy]);

  const ytSrc = youTubeId
    ? `https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youTubeId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=0`
    : "";

  /* Portrait (9:16) footage occupies ~31.6% of the 16:9 player width.
     Over-scale (×1.04 safety) so it covers the banner with no black bars. */
  const portraitSize = portrait
    ? { width: "max(185vh, 329vw)", height: "max(104vh, 185vw)" }
    : undefined;

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      {/* Poster — instant paint + graceful fallback */}
      <Image
        src={poster}
        alt={title}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />

      {active && (youTubeId || mp4Src) && (
        <div className="video-cover">
          {youTubeId ? (
            <iframe
              src={ytSrc}
              title={title}
              style={portraitSize}
              allow="autoplay; encrypted-media; picture-in-picture; accelerometer; gyroscope"
              aria-hidden="true"
              tabIndex={-1}
              loading={lazy ? "lazy" : "eager"}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              style={portraitSize}
              className={portrait ? "!h-auto" : undefined}
            >
              <source src={mp4Src} type="video/mp4" />
            </video>
          )}
        </div>
      )}

      {/* Premium dark overlay */}
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />
    </div>
  );
}
