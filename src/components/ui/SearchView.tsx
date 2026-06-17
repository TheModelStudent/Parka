"use client";

import { useMemo, useState } from "react";
import type { Product, SortKey } from "@/lib/shopify/types";
import { ProductGrid } from "./ProductGrid";
import { SortSelect, sortList } from "./SortSelect";
import { SearchIcon } from "./Icons";

function matches(p: Product, q: string) {
  return [p.title, p.subtitle ?? "", p.category ?? "", ...(p.materials ?? []), ...(p.collections ?? [])]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function SearchView({
  products,
  initialQuery = "",
}: {
  products: Product[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>("newest");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return sortList(products.filter((p) => matches(p, q)), sort);
  }, [products, query, sort]);

  const q = query.trim();

  return (
    <div className="container-luxe pb-28 pt-32 md:pt-40">
      <p className="eyebrow">Search</p>
      <div className="mt-5 flex items-center gap-4 border-b border-ink/30 pb-3">
        <SearchIcon className="h-6 w-6 text-muted" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search necklaces, diamonds, bridal…"
          aria-label="Search PARKA"
          className="w-full bg-transparent font-serif text-2xl text-ink placeholder:text-muted/60 focus:outline-none md:text-4xl"
        />
      </div>

      {q === "" ? (
        <p className="mt-10 text-sm font-light text-muted">
          Start typing to search the PARKA collection.
        </p>
      ) : (
        <>
          <div className="mb-12 mt-8 flex items-center justify-between border-b border-line pb-5">
            <span className="text-[11px] uppercase tracking-luxe text-muted">
              {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{q}&rdquo;
            </span>
            {results.length > 0 && <SortSelect value={sort} onChange={setSort} />}
          </div>
          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <p className="py-20 text-center font-serif text-2xl font-light text-muted">
              No pieces found for &ldquo;{q}&rdquo;.
            </p>
          )}
        </>
      )}
    </div>
  );
}
