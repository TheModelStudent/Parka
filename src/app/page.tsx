import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { NewInStore } from "@/components/sections/NewInStore";
import { StorytellingVideo } from "@/components/sections/StorytellingVideo";
import { Collections } from "@/components/sections/Collections";
import { About } from "@/components/sections/About";
import { StoreExperience } from "@/components/sections/StoreExperience";
import { Journal } from "@/components/sections/Journal";
import { Newsletter } from "@/components/sections/Newsletter";

/**
 * PARKA homepage.
 *
 * Section order follows the brief exactly (Aurus blueprint, PARKA identity):
 *   1. Hero video        2. PARKA signature    3. New In Store
 *   4. Storytelling video 5. Collections       6. About PARKA (#about)
 *   7. Store experience   8. Our Journal        9. Be a part of our world
 * Header & Footer live in the root layout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Signature />
      <NewInStore />
      <StorytellingVideo />
      <Collections />
      <About />
      <StoreExperience />
      <Journal />
      <Newsletter />
    </>
  );
}
