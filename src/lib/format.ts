import type { Money } from "./shopify/types";

/** Format money the way a luxury house would — grouped, no trailing decimals. */
export function formatMoney({ amount, currencyCode }: Money): string {
  const locale = currencyCode === "INR" ? "en-IN" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}
