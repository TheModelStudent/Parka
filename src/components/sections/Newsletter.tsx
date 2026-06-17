import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SECTION 9 — "Be a part of our world" (newsletter). Stays near the bottom.
 */
export function Newsletter() {
  return (
    <section id="newsletter" className="scroll-mt-24 bg-surface py-24 md:py-32">
      <Reveal>
        <NewsletterSection />
      </Reveal>
    </section>
  );
}
