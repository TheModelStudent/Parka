/**
 * Domain types for PARKA's commerce layer.
 * These mirror the Shopify Storefront API so mock data can be swapped for live
 * Shopify data with no UI changes.
 */

export interface Money {
  amount: number;
  currencyCode: string; // e.g. "INR"
}

export interface ImageRef {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  price: Money;
  compareAtPrice?: Money;
  /** Primary image (gallery[0]). */
  image: ImageRef;
  /** Second image, revealed on hover (gallery[1]). */
  hoverImage?: ImageRef;
  /** Full product gallery — every photo of this physical piece. */
  gallery?: ImageRef[];
  badge?: string;
  available?: boolean;
  /** Shopify product type — the category handle (necklaces, earrings…). */
  category?: string;
  /** Handles of collections this product belongs to (Shopify collections). */
  collections?: string[];
  /** Shopify tags — used for filtering (diamond, polki, emerald…). */
  materials?: string[];
  /** Recency rank for "newest" sorting (higher = newer). */
  createdRank?: number;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: ImageRef;
}

export interface Category {
  title: string;
  handle: string;
  blurb?: string;
  image: ImageRef;
}

export interface Article {
  id: string;
  handle: string;
  title: string;
  excerpt: string;
  image: ImageRef;
  readingTime: string;
  publishedAt: string;
}

export interface Store {
  id: string;
  city: string;
  name: string;
  address: string;
  note?: string;
  image: ImageRef;
  appointmentUrl: string;
  mapUrl: string;
}

export type SortKey = "newest" | "price-asc" | "price-desc" | "name";
