/**
 * PARKA catalogue — built from the real product photography in
 * /public/images/catalog (001.jpg … 083.jpg).
 *
 * Each entry's `imgs` lists the catalog photo numbers that belong to the SAME
 * physical piece (different angles / closeups / model shots), in display order.
 * They become that product's gallery; gallery[0] is the card image, gallery[1]
 * the hover image. Genuinely different pieces are separate entries.
 *
 * To go live, replace the accessor bodies with Shopify Storefront calls
 * (see ./shopify/client.ts) — components consume the domain types only.
 */

import type {
  Article,
  Category,
  Collection,
  Product,
  SortKey,
  Store,
} from "./shopify/types";

const INR = "INR";

interface Raw {
  handle: string;
  title: string;
  subtitle: string;
  price: number;
  category: "necklaces" | "earrings" | "bracelets" | "rings";
  collections: string[];
  materials: string[];
  rank: number;
  badge?: string;
  imgs: number[];
}

/* ── Identified products (grouped from the 83 photographs) ─────── */
const RAW: Raw[] = [
  { handle: "aabha-bridal-choker", title: "Aabha Choker", subtitle: "Polki & coloured stones", price: 1985000, category: "necklaces", collections: ["vivaaha"], materials: ["Polki", "Ruby", "Emerald", "Gold"], rank: 39, badge: "New", imgs: [1] },
  { handle: "naina-polki-choker", title: "Naina Choker", subtitle: "Uncut polki bib choker", price: 1760000, category: "necklaces", collections: ["vivaaha"], materials: ["Polki", "Gold"], rank: 18, imgs: [2] },
  { handle: "roop-hexagon-jhumkas", title: "Roop Jhumkas", subtitle: "Hexagon polki jhumkas", price: 465000, category: "earrings", collections: ["vivaaha"], materials: ["Polki", "Ruby", "Emerald", "Pearl"], rank: 14, imgs: [3] },
  { handle: "saanvi-tassel-set", title: "Saanvi Tassel Set", subtitle: "Kundan choker & jhumkas", price: 1480000, category: "necklaces", collections: ["vivaaha"], materials: ["Kundan", "Emerald", "Gold"], rank: 38, badge: "New", imgs: [5, 4, 6] },
  { handle: "indira-polki-pendant", title: "Indira Pendant", subtitle: "Polki pendant necklace", price: 720000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 6, imgs: [7] },
  { handle: "tara-diamond-necklace", title: "Tara Necklace", subtitle: "Diamond & pearl drape", price: 1290000, category: "necklaces", collections: ["noor"], materials: ["Diamond", "Pearl"], rank: 16, imgs: [8] },
  { handle: "kiara-diamond-necklace", title: "Kiara Necklace", subtitle: "Diamond & pearl strands", price: 1185000, category: "necklaces", collections: ["noor"], materials: ["Diamond", "Pearl"], rank: 8, imgs: [9] },
  { handle: "mira-polki-drops", title: "Mira Drops", subtitle: "Oval polki drop earrings", price: 295000, category: "earrings", collections: ["noor"], materials: ["Polki", "Pearl"], rank: 7, imgs: [10] },
  { handle: "diya-pendant-necklace", title: "Diya Necklace", subtitle: "Polki pendant & pearls", price: 980000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Pearl", "Gold"], rank: 5, imgs: [11] },
  { handle: "gauri-pendant-necklace", title: "Gauri Necklace", subtitle: "Oval pendant, ruby & emerald", price: 1120000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Ruby", "Emerald", "Pearl"], rank: 9, imgs: [12] },
  { handle: "vaani-maangtika-set", title: "Vaani Maangtika Set", subtitle: "Maangtika & earrings", price: 540000, category: "earrings", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 11, imgs: [13, 14] },
  { handle: "devyani-necklace", title: "Devyani Necklace", subtitle: "Polki necklace set", price: 865000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 4, imgs: [16, 15] },
  { handle: "heer-jhumkas", title: "Heer Jhumkas", subtitle: "Gold polki jhumkas", price: 410000, category: "earrings", collections: ["vivaaha"], materials: ["Polki", "Gold", "Pearl"], rank: 3, imgs: [17] },
  { handle: "elaa-emerald-set", title: "Elaa Emerald Set", subtitle: "Square pendant necklace & earrings", price: 1340000, category: "necklaces", collections: ["saawan"], materials: ["Emerald", "Polki", "Pearl"], rank: 34, badge: "New", imgs: [19, 18, 20] },
  { handle: "pari-gold-pendant", title: "Pari Pendant", subtitle: "Gold & polki pendant", price: 520000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 2, imgs: [21] },
  { handle: "anvi-pearl-drops", title: "Anvi Drops", subtitle: "Polki & pearl drop earrings", price: 280000, category: "earrings", collections: ["noor"], materials: ["Polki", "Pearl"], rank: 5, imgs: [22] },
  { handle: "reva-polki-necklace", title: "Reva Necklace", subtitle: "Polki necklace & earrings", price: 760000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 6, imgs: [23] },
  { handle: "eshana-emerald-necklace", title: "Eshana Necklace", subtitle: "Emerald & diamond line", price: 1290000, category: "necklaces", collections: ["saawan"], materials: ["Emerald", "Diamond"], rank: 10, imgs: [24] },
  { handle: "zoya-emerald-set", title: "Zoya Emerald Set", subtitle: "Emerald drop necklace & earrings", price: 1180000, category: "necklaces", collections: ["saawan"], materials: ["Emerald", "Diamond", "Gold"], rank: 37, badge: "New", imgs: [25, 26] },
  { handle: "mahira-bridal-choker", title: "Mahira Bridal Choker", subtitle: "Polki choker & earrings", price: 1620000, category: "necklaces", collections: ["vivaaha"], materials: ["Polki", "Ruby", "Gold"], rank: 32, badge: "Bridal", imgs: [28, 27, 29] },
  { handle: "aisha-diamond-necklace", title: "Aisha Necklace", subtitle: "Floral diamond necklace", price: 1450000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 13, imgs: [30] },
  { handle: "myra-diamond-necklace", title: "Myra Necklace", subtitle: "Leaf diamond necklace", price: 1380000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 9, imgs: [31] },
  { handle: "riya-diamond-danglers", title: "Riya Danglers", subtitle: "Floral diamond earrings", price: 360000, category: "earrings", collections: ["noor"], materials: ["Diamond"], rank: 8, imgs: [32, 37] },
  { handle: "siya-diamond-necklace", title: "Siya Necklace", subtitle: "Diamond collar", price: 1540000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 7, imgs: [33] },
  { handle: "kaira-diamond-necklace", title: "Kaira Necklace", subtitle: "Marquise diamond necklace", price: 1490000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 6, imgs: [34] },
  { handle: "anaika-diamond-necklace", title: "Anaika Necklace", subtitle: "Blooming diamond necklace", price: 1620000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 12, imgs: [35] },
  { handle: "sana-diamond-necklace", title: "Sana Necklace", subtitle: "Floral diamond necklace", price: 1410000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 5, imgs: [36] },
  { handle: "kesar-gold-choker", title: "Kesar Choker", subtitle: "Gold & polki drops", price: 690000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 4, imgs: [38] },
  { handle: "laila-gold-necklace", title: "Laila Necklace", subtitle: "Fine gold drop necklace", price: 560000, category: "necklaces", collections: ["virasat"], materials: ["Gold", "Diamond"], rank: 3, imgs: [39] },
  { handle: "navya-navratna-set", title: "Navya Navratna Set", subtitle: "Navratna necklace & earrings", price: 1280000, category: "necklaces", collections: ["virasat"], materials: ["Navratna", "Emerald", "Gold"], rank: 29, imgs: [40, 41] },
  { handle: "gitanjali-navratna-set", title: "Gitanjali Navratna Set", subtitle: "Grand navratna set", price: 1720000, category: "necklaces", collections: ["virasat"], materials: ["Navratna", "Emerald", "Ruby", "Gold"], rank: 35, badge: "New", imgs: [42] },
  { handle: "mannat-hasli-set", title: "Mannat Hasli Set", subtitle: "Gold hasli & earrings", price: 980000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 25, imgs: [43, 44, 45] },
  { handle: "nitya-hasli", title: "Nitya Hasli", subtitle: "Gold hasli, ruby & emerald", price: 1040000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Ruby", "Emerald", "Gold"], rank: 8, imgs: [46] },
  { handle: "saira-emerald-drops", title: "Saira Emerald Drops", subtitle: "Emerald drop earrings", price: 420000, category: "earrings", collections: ["saawan"], materials: ["Emerald", "Gold"], rank: 10, imgs: [47, 48] },
  { handle: "rhea-diamond-necklace", title: "Rhea Necklace", subtitle: "Diamond collar", price: 1350000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 6, imgs: [49] },
  { handle: "vidya-emerald-set", title: "Vidya Emerald Set", subtitle: "Green-enamel necklace & earrings", price: 1460000, category: "necklaces", collections: ["saawan"], materials: ["Emerald", "Diamond", "Gold"], rank: 36, badge: "New", imgs: [51, 50, 52] },
  { handle: "jiya-gold-jhumkas", title: "Jiya Jhumkas", subtitle: "Gold polki jhumkas", price: 380000, category: "earrings", collections: ["vivaaha"], materials: ["Polki", "Gold"], rank: 4, imgs: [53] },
  { handle: "tanvi-diamond-necklace", title: "Tanvi Necklace", subtitle: "Leaf diamond necklace", price: 1280000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 5, imgs: [54] },
  { handle: "aria-gold-cuff", title: "Aria Cuff", subtitle: "Diamond & gold cuff", price: 540000, category: "bracelets", collections: ["noor"], materials: ["Diamond", "Gold"], rank: 9, imgs: [55] },
  { handle: "charvi-necklace-cuff", title: "Charvi Necklace & Cuff", subtitle: "Diamond necklace & cuff", price: 1180000, category: "necklaces", collections: ["noor"], materials: ["Diamond", "Pearl"], rank: 7, imgs: [56] },
  { handle: "ahana-diamond-necklace", title: "Ahana Necklace", subtitle: "Diamond vine necklace", price: 1320000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 6, imgs: [57] },
  { handle: "bhavya-diamond-necklace", title: "Bhavya Necklace", subtitle: "Diamond drop necklace", price: 1240000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 5, imgs: [58] },
  { handle: "damini-diamond-drops", title: "Damini Drops", subtitle: "Diamond drop earrings", price: 340000, category: "earrings", collections: ["noor"], materials: ["Diamond"], rank: 4, imgs: [59] },
  { handle: "prisha-diamond-set", title: "Prisha Diamond Set", subtitle: "Diamond necklace & earrings", price: 1690000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 33, badge: "New", imgs: [60] },
  { handle: "falguni-diamond-necklace", title: "Falguni Necklace", subtitle: "Diamond necklace with drop", price: 1280000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 9, imgs: [61, 62] },
  { handle: "indu-diamond-necklace", title: "Indu Necklace", subtitle: "Diamond necklace & earrings", price: 1340000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 7, imgs: [63] },
  { handle: "sitara-necklace", title: "Sitara Necklace", subtitle: "Diamond & coloured stones", price: 1390000, category: "necklaces", collections: ["virasat"], materials: ["Diamond", "Emerald", "Gold"], rank: 28, badge: "New", imgs: [64, 65] },
  { handle: "eela-diamond-drops", title: "Eela Drops", subtitle: "Diamond drop earrings", price: 330000, category: "earrings", collections: ["noor"], materials: ["Diamond"], rank: 3, imgs: [66] },
  { handle: "lavanya-diamond-necklace", title: "Lavanya Necklace", subtitle: "Floral diamond necklace", price: 1460000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 6, imgs: [67] },
  { handle: "madhuri-diamond-set", title: "Madhuri Diamond Set", subtitle: "Diamond necklace & earrings", price: 1520000, category: "necklaces", collections: ["noor"], materials: ["Diamond"], rank: 27, imgs: [69, 68] },
  { handle: "qamar-emerald-choker", title: "Qamar Choker", subtitle: "Kundan & emerald choker", price: 1880000, category: "necklaces", collections: ["virasat"], materials: ["Kundan", "Emerald", "Gold"], rank: 40, badge: "New", imgs: [70] },
  { handle: "yamini-kundan-jhumkas", title: "Yamini Jhumkas", subtitle: "Kundan earrings & maangtika", price: 450000, category: "earrings", collections: ["vivaaha"], materials: ["Kundan", "Ruby", "Emerald"], rank: 5, imgs: [71] },
  { handle: "radha-kundan-set", title: "Radha Bridal Set", subtitle: "Kundan necklace & earrings", price: 1240000, category: "necklaces", collections: ["vivaaha"], materials: ["Kundan", "Ruby", "Emerald", "Pearl"], rank: 31, badge: "Bridal", imgs: [72] },
  { handle: "ira-oval-necklace", title: "Ira Necklace", subtitle: "Oval polki layered necklace", price: 1180000, category: "necklaces", collections: ["noor"], materials: ["Polki", "Diamond"], rank: 30, imgs: [73, 76] },
  { handle: "sona-oval-drops", title: "Sona Oval Drops", subtitle: "Oval polki drop earrings", price: 360000, category: "earrings", collections: ["noor"], materials: ["Polki", "Diamond"], rank: 8, imgs: [74, 78] },
  { handle: "veda-oval-chain", title: "Veda Chain", subtitle: "Oval polki long chain", price: 940000, category: "necklaces", collections: ["noor"], materials: ["Polki", "Diamond"], rank: 7, imgs: [75] },
  { handle: "amaira-oval-necklace", title: "Amaira Necklace", subtitle: "Oval kundan necklace", price: 1090000, category: "necklaces", collections: ["noor"], materials: ["Kundan", "Polki"], rank: 6, imgs: [77] },
  { handle: "trisha-gold-set", title: "Trisha Set", subtitle: "Gold necklace & jhumkas", price: 720000, category: "necklaces", collections: ["virasat"], materials: ["Polki", "Gold"], rank: 5, imgs: [79] },
  { handle: "hiya-kundan-jhumkas", title: "Hiya Jhumkas", subtitle: "Kundan ruby & emerald jhumkas", price: 420000, category: "earrings", collections: ["vivaaha"], materials: ["Kundan", "Ruby", "Emerald"], rank: 4, imgs: [80] },
  { handle: "rani-maangtika-set", title: "Rani Maangtika Set", subtitle: "Kundan maangtika & earrings", price: 580000, category: "earrings", collections: ["vivaaha"], materials: ["Kundan", "Ruby", "Pearl"], rank: 26, badge: "Bridal", imgs: [82, 83, 81] },
];

const pad = (n: number) => String(n).padStart(3, "0");

const products: Product[] = RAW.map((r, i) => {
  const gallery = r.imgs.map((n) => ({
    src: `/images/catalog/${pad(n)}.jpg`,
    alt: `${r.title} — PARKA fine jewellery`,
  }));
  return {
    id: `p${i + 1}`,
    handle: r.handle,
    title: r.title,
    subtitle: r.subtitle,
    price: { amount: r.price, currencyCode: INR },
    image: gallery[0],
    hoverImage: gallery[1],
    gallery,
    badge: r.badge,
    available: true,
    category: r.category,
    collections: r.collections,
    materials: r.materials,
    createdRank: r.rank,
  };
});

/* ── New In Store — curated categories ─────────────────────────── */
const categories: Category[] = [
  { title: "Earrings", handle: "earrings", blurb: "Jhumkas, chandbalis & drops", image: { src: "/images/cat-earrings.jpg", alt: "PARKA chandelier earrings" } },
  { title: "Necklaces", handle: "necklaces", blurb: "Chokers, hasli & long sets", image: { src: "/images/cat-necklaces.jpg", alt: "PARKA polki and diamond choker" } },
  { title: "Bracelets", handle: "bracelets", blurb: "Cuffs, bangles & kadas", image: { src: "/images/cat-bracelets.jpg", alt: "PARKA gold cuff" } },
  { title: "Rings", handle: "rings", blurb: "Cocktail & heirloom rings", image: { src: "/images/cat-rings.jpg", alt: "PARKA emerald ring" } },
];

/* ── Collection / category metadata (for listing-page heroes) ──── */
const collectionMeta: Record<string, Collection> = {
  new: { id: "new", handle: "new", title: "New In", subtitle: "Just Arrived", description: "The latest additions to the PARKA atelier.", image: { src: "/images/catalog/070.jpg", alt: "New arrivals" } },
  necklaces: { id: "necklaces", handle: "necklaces", title: "Necklaces", subtitle: "Chokers · Hasli · Long Sets", description: "From bridal polki to the quiet brilliance of diamonds.", image: { src: "/images/cat-necklaces.jpg", alt: "Necklaces" } },
  earrings: { id: "earrings", handle: "earrings", title: "Earrings", subtitle: "Jhumkas · Chandbalis · Drops", description: "Statements for the ears, light enough to dance in.", image: { src: "/images/cat-earrings.jpg", alt: "Earrings" } },
  bracelets: { id: "bracelets", handle: "bracelets", title: "Bracelets", subtitle: "Cuffs · Bangles · Kadas", description: "Gold and stones, worked by hand for the wrist.", image: { src: "/images/cat-bracelets.jpg", alt: "Bracelets" } },
  rings: { id: "rings", handle: "rings", title: "Rings", subtitle: "Cocktail & Heirloom", description: "Statement settings, arriving soon to the atelier.", image: { src: "/images/cat-rings.jpg", alt: "Rings" } },
  vivaaha: { id: "vivaaha", handle: "vivaaha", title: "Vivaaha", subtitle: "The Bridal Edit", description: "Heirloom polki & kundan for the day you have always imagined.", image: { src: "/images/collection-bridal.jpg", alt: "Vivaaha bridal jewellery" } },
  virasat: { id: "virasat", handle: "virasat", title: "Virasat", subtitle: "Heritage & Navratna", description: "Gold, navratna and temple work, reimagined for the modern muse.", image: { src: "/images/collection-heritage.jpg", alt: "Virasat heritage" } },
  saawan: { id: "saawan", handle: "saawan", title: "Saawan", subtitle: "Emerald Stories", description: "The green of monsoon gardens, held in gold.", image: { src: "/images/collection-emerald.jpg", alt: "Saawan emerald jewellery" } },
  noor: { id: "noor", handle: "noor", title: "Noor", subtitle: "Diamond Light", description: "Quiet brilliance for every chapter of your story.", image: { src: "/images/collection-diamond.jpg", alt: "Noor diamond jewellery" } },
};

const homepageCollections = ["vivaaha", "virasat", "saawan", "noor"];
const indexCollections = [...homepageCollections, "necklaces", "earrings"];

/* ── Journal ───────────────────────────────────────────────────── */
const articles: Article[] = [
  { id: "a1", handle: "the-language-of-kundan", title: "The Language of Kundan", excerpt: "Inside the centuries-old craft of setting uncut stones in pure gold — and why it still feels modern.", image: { src: "/images/journal-1.jpg", alt: "Kundan craftsmanship" }, readingTime: "4 min read", publishedAt: "May 2026" },
  { id: "a2", handle: "heirlooms-for-a-new-generation", title: "Heirlooms for a New Generation", excerpt: "How today's brides are wearing their grandmothers' silhouettes in entirely new ways.", image: { src: "/images/journal-2.jpg", alt: "Heritage jewellery styling" }, readingTime: "3 min read", publishedAt: "April 2026" },
  { id: "a3", handle: "a-portrait-of-adornment", title: "A Portrait of Adornment", excerpt: "From the maangtika to the chandbali — the quiet poetry of ceremonial jewellery.", image: { src: "/images/journal-3.jpg", alt: "Ceremonial adornment" }, readingTime: "5 min read", publishedAt: "March 2026" },
];

/* ── Boutiques ─────────────────────────────────────────────────── */
const stores: Store[] = [
  { id: "s1", city: "Jaipur", name: "The PARKA Flagship", address: "C-Scheme, Ashok Marg, Jaipur, Rajasthan", note: "Our atelier & flagship — visits by appointment.", image: { src: "/images/collection-heritage.jpg", alt: "PARKA Jaipur flagship" }, appointmentUrl: "https://wa.me/919876543210", mapUrl: "https://maps.google.com/?q=C-Scheme+Jaipur" },
  { id: "s2", city: "Mumbai", name: "PARKA at Kala Ghoda", address: "Rampart Row, Kala Ghoda, Mumbai, Maharashtra", image: { src: "/images/store-experience.jpg", alt: "PARKA Mumbai boutique" }, appointmentUrl: "https://wa.me/919876543210", mapUrl: "https://maps.google.com/?q=Kala+Ghoda+Mumbai" },
  { id: "s3", city: "New Delhi", name: "PARKA at Dhan Mill", address: "Dhan Mill Compound, Chhatarpur, New Delhi", image: { src: "/images/collection-diamond.jpg", alt: "PARKA New Delhi boutique" }, appointmentUrl: "https://wa.me/919876543210", mapUrl: "https://maps.google.com/?q=Dhan+Mill+New+Delhi" },
];

/* ── Sorting ───────────────────────────────────────────────────── */
export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const out = [...list];
  switch (sort) {
    case "price-asc":
      return out.sort((a, b) => a.price.amount - b.price.amount);
    case "price-desc":
      return out.sort((a, b) => b.price.amount - a.price.amount);
    case "name":
      return out.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
    default:
      return out.sort((a, b) => (b.createdRank ?? 0) - (a.createdRank ?? 0));
  }
}

/* ── Public accessors (async → drop-in Shopify swap) ───────────── */
export async function getNewInCategories(): Promise<Category[]> {
  return categories;
}
export async function getNewProducts(): Promise<Product[]> {
  return sortProducts(products, "newest").slice(0, 6);
}
export async function getCollections(): Promise<Collection[]> {
  return homepageCollections.map((h) => collectionMeta[h]);
}
export async function getAllCollections(): Promise<Collection[]> {
  return indexCollections.map((h) => collectionMeta[h]);
}
export async function getArticles(): Promise<Article[]> {
  return articles;
}
export async function getArticleByHandle(handle: string): Promise<Article | undefined> {
  return articles.find((a) => a.handle === handle);
}
export async function getStores(): Promise<Store[]> {
  return stores;
}
export async function getAllProducts(): Promise<Product[]> {
  return products;
}
export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  return products.find((p) => p.handle === handle);
}
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const sameCollection = same.filter((p) => p.collections?.some((c) => product.collections?.includes(c)));
  const pool = sameCollection.length >= limit ? sameCollection : same;
  return sortProducts(pool, "newest").slice(0, limit);
}

export interface CollectionPage {
  meta: Collection;
  products: Product[];
}

export async function getCollectionPage(handle: string): Promise<CollectionPage> {
  const meta =
    collectionMeta[handle] ?? {
      id: handle,
      handle,
      title: handle.replace(/-/g, " "),
      subtitle: "Collection",
      image: { src: "/images/collection-diamond.jpg", alt: handle },
    };

  let list: Product[];
  if (handle === "new") {
    list = products.filter((p) => p.badge === "New");
  } else if (["necklaces", "earrings", "bracelets", "rings"].includes(handle)) {
    list = products.filter((p) => p.category === handle);
  } else {
    list = products.filter((p) => p.collections?.includes(handle));
  }
  return { meta, products: sortProducts(list, "newest") };
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.title, p.subtitle ?? "", p.category ?? "", ...(p.materials ?? []), ...(p.collections ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
