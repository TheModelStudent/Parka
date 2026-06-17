import type { CSSProperties } from "react";

interface BrandLogoProps {
  /** Sizing classes, e.g. "h-7". The wordmark aspect ratio is applied automatically. */
  className?: string;
  /** Tailwind background-color class that "paints" the wordmark. Defaults to theme ink. */
  toneClassName?: string;
  title?: string;
  style?: CSSProperties;
}

/**
 * The PARKA brand wordmark (the official "Parka" logo).
 *
 * Rendered with a CSS mask so the single asset recolours to fit any context —
 * ivory over the dark hero, ink on the solid light header, warm-white in dark
 * mode. This is the interactive site logo (header / footer). The decorative
 * necklace sketch (ParkaMark) is reserved for the homepage signature only.
 */
const maskStyle: CSSProperties = {
  WebkitMaskImage: "url(/parka-logo.png)",
  maskImage: "url(/parka-logo.png)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "left center",
  maskPosition: "left center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export function BrandLogo({
  className = "h-7",
  toneClassName = "bg-ink",
  title = "PARKA",
  style,
}: BrandLogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`block aspect-[1423/500] ${toneClassName} ${className}`}
      style={{ ...maskStyle, ...style }}
    />
  );
}
