"use client";

import { useMemo, useState } from "react";
import type { Product, SortKey } from "@/lib/shopify/types";
import { ProductGrid } from "./ProductGrid";
import { SortSelect, sortList } from "./SortSelect";
import { SearchIcon } from "./Icons";

/** Listing view with in-edit search, category filter and sort. */
export function CollectionView({
  products,
  showCategoryFilter = false,
}: {
  products: Product[];
  showCategoryFilter?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [cat, setCat] = useState("all");

  const cats = useMemo(
    () => [
      "all",
      ...Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[])),
    ],
    [products],
  );

  const filtered = useMemo(() => {
    let list = products;
    if (showCategoryFilter && cat !== "all") list = list.filter((p) => p.category === cat);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.title, p.subtitle ?? "", ...(p.materials ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    return sortList(list, sort);
  }, [products, cat, query, sort, showCategoryFilter]);

  return (
    <div>
      <div className="mb-12 flex flex-col gap-5 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this edit"
              aria-label="Search this edit"
              className="w-44 border-b border-line bg-transparent py-1 pl-6 text-sm text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none"
            />
          </div>
          {showCategoryFilter && cats.length > 2 && (
            <div className="flex flex-wrap items-center gap-4">
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`link-underline text-[11px] uppercase tracking-luxe capitalize ${
                    cat === c ? "text-ink" : "text-muted"
                  }`}
                >
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-[11px] uppercase tracking-luxe text-muted">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </span>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <p className="py-24 text-center font-serif text-2xl font-light text-muted">
          Nothing matches just yet — try another search.
        </p>
      )}
    </div>
  );
}
