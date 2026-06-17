"use client";

import type { SortKey } from "@/lib/shopify/types";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "name", label: "Name: A–Z" },
];

export function sortList<T extends { price: { amount: number }; title: string; createdRank?: number }>(
  list: T[],
  sort: SortKey,
): T[] {
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

export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (s: SortKey) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted">
      Sort
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="cursor-pointer border-b border-ink/30 bg-transparent py-1 pr-5 text-ink focus:outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.key} value={o.key} className="bg-bg text-ink">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
