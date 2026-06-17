import type { Metadata } from "next";
import { getAllProducts } from "@/lib/data";
import { SearchView } from "@/components/ui/SearchView";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const products = await getAllProducts();
  return <SearchView products={products} initialQuery={searchParams.q ?? ""} />;
}
