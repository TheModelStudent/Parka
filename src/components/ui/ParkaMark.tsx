import type { CSSProperties } from "react";

interface ParkaMarkProps {
  /** Sizing classes, e.g. "h-14". Aspect ratio is applied automatically. */
  className?: string;
  /** Tailwind background-color class that "paints" the mark. Defaults to theme ink. */
  toneClassName?: string;
  title?: string;
  style?: CSSProperties;
}

/**
 * The PARKA brand mark (the uploaded necklace + wordmark SVG).
 *
 * Rendered with a CSS mask rather than an <img>, so a single vector asset
 * adapts to any theme/context simply by changing its background color — ink in
 * light mode, ivory over the dark hero, antique gold on accents, etc.
 * This keeps the logo crisp (vector) and performant (cached once, no large DOM).
 */
const maskStyle: CSSProperties = {
  WebkitMaskImage: "url(/parka-mark.svg)",
  maskImage: "url(/parka-mark.svg)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export function ParkaMark({
  className = "h-14",
  toneClassName = "bg-ink",
  title = "PARKA",
  style,
}: ParkaMarkProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`block aspect-[816/800] ${toneClassName} ${className}`}
      style={{ ...maskStyle, ...style }}
    />
  );
}
