import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="eyebrow">Your Bag</p>
      <h1 className="heading-serif mt-4 text-4xl md:text-5xl">Your bag is empty</h1>
      <p className="mt-4 max-w-sm text-sm font-light text-muted">
        Discover something to treasure — every PARKA piece is made to be kept.
      </p>
      <Link href="/collections/new" className="btn-line mt-9">
        Shop New In
      </Link>
    </div>
  );
}
