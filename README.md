# PARKA — Luxury Indian Jewellery House

The PARKA homepage. A contemporary Indian fine-jewellery experience built with
**Next.js (App Router) · TypeScript · Tailwind CSS**.

It is designed brand-first: the homepage is meant to make a visitor *feel*
something before it ever asks them to shop — large editorial photography,
cinematic video, luxury serif typography, generous whitespace and slow pacing.
The structure, scroll rhythm and section ordering are modelled on
[Aurus Jewels](https://www.aurusjewels.in), reimagined entirely for PARKA.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

> **No-install preview:** open `preview.html` directly in a browser to see the
> design (theme toggle and both videos work) without running Node.

---

## Homepage structure (in order)

1. **Header** — sticky; transparent over the hero, solid on scroll. Logo (the
   PARKA SVG) top-left, persistent + clickable. Light/dark toggle.
2. **Hero video** — full-screen, autoplay, muted, looping, dark overlay.
   _"Crafted for women who carry stories."_ → **Discover Collection**.
3. **PARKA signature** — the uploaded SVG, large and centered, as a brand
   signature. _"Jewellery inspired by heritage, crafted for today."_
4. **New In Store** — editorial categories (Earrings · Necklaces · Bracelets ·
   Rings) + a curated "just added" product rail.
5. **Storytelling video** — full-width, lazy-loaded. _"Our Story"_ → **Read
   More** (scrolls to About).
6. **Collections** — large, aspirational collection cards.
7. **About PARKA** (`#about`) — brand storytelling.
8. **Store experience** (`#stores`) — atmospheric invitation + boutique cards.
9. **Our Journal** — editorial entries (kept near the bottom, as in Aurus).
10. **Be a part of our world** — newsletter (kept near the bottom).
11. **Footer**.

---

## Project layout

```
src/
  app/
    layout.tsx            # fonts, theme init (no-flash), Header + Footer
    page.tsx              # composes the 9 sections in order
    globals.css           # luxury light/dark palette (CSS variables) + utilities
  components/
    ThemeProvider.tsx     # theme context + localStorage persistence
    layout/               # Header, Footer, ThemeToggle, MobileNav
    sections/             # one file per homepage section
    ui/                   # ParkaMark, Reveal, VideoBackground + Shopify cards
  lib/
    site.ts               # brand info, navigation, footer config
    data.ts               # mock content (async — drop-in Shopify swap)
    format.ts             # money formatting
    shopify/              # types + Storefront API client stub
public/
  parka-mark.svg          # the PARKA logo / signature artwork
  images/                 # curated, optimised photography
```

## Reusable, Shopify-ready commerce components

`ProductCard`, `CollectionCard`, `ArticleCard`, `StoreCard` and
`NewsletterSection` all consume the typed domain models in
`src/lib/shopify/types.ts`, which mirror the **Shopify Storefront API** shape.

### Connecting Shopify later

1. `cp .env.local.example .env.local` and fill in your store domain + Storefront
   token.
2. In `src/lib/data.ts`, replace the bodies of `getNewInCategories`,
   `getNewProducts`, `getCollections`, `getArticles` (and `getStores` if you keep
   stores in Shopify) with `shopifyFetch(...)` calls (see
   `src/lib/shopify/client.ts`), mapping responses into the domain types.
3. Add `cdn.shopify.com` to `images.remotePatterns` in `next.config.mjs`.

No UI component needs to change — they only know the domain models.

---

## Theming

- Light: ivory / cream / warm white, warm-black ink, soft gold accents.
- Dark: warm charcoal / graphite, warm-white type, antique gold accents.
- Both deliberately avoid pure black/white and any blue/tech accents.
- Defined as CSS variables in `globals.css`; `.dark` on `<html>` swaps them.
- Preference persists across sessions (`localStorage`) and applies before first
  paint (no flash).

## Video

`components/ui/VideoBackground.tsx` currently renders YouTube (hero +
storytelling). To self-host MP4 later, pass `mp4Src` instead of `youTubeId` —
**no layout change required**. The second video is lazy-loaded as it nears the
viewport.

## Animation & performance

- Scroll reveals use a tiny `IntersectionObserver` (`Reveal`) — no animation
  library.
- `next/image` for responsive AVIF/WebP delivery; the non-critical video is lazy.
- All motion respects `prefers-reduced-motion`.

---

## Replacing the photography

Drop your own files into `public/images/` using the same names (or update the
paths in `src/lib/data.ts` and the section files). Current imagery is sourced
from the PARKA photo set.
