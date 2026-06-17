/**
 * Minimal Shopify Storefront API client (stub).
 *
 * This is intentionally not wired into the homepage yet — the homepage renders
 * from `src/lib/data.ts` so it works with zero configuration. When you are
 * ready to connect commerce:
 *
 *   1.  Copy `.env.local.example` -> `.env.local` and fill in the values.
 *   2.  Replace the `getX()` helpers in `src/lib/data.ts` with calls to
 *       `shopifyFetch` + the relevant GraphQL query, mapping the response into
 *       the domain types in `./types`.
 *
 * No UI component needs to change — they all consume the typed domain models.
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2024-07";

export const isShopifyConfigured = Boolean(domain && token);

export interface ShopifyFetchOptions<V> {
  query: string;
  variables?: V;
  cache?: RequestCache;
}

export async function shopifyFetch<T, V = Record<string, unknown>>({
  query,
  variables,
  cache = "force-cache",
}: ShopifyFetchOptions<V>): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify is not configured. Add NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and " +
        "NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN to .env.local.",
    );
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}
