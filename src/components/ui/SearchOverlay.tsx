"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchIcon, CloseIcon } from "./Icons";

const POPULAR = [
  { label: "Bridal", href: "/collections/vivaaha" },
  { label: "Diamonds", href: "/collections/noor" },
  { label: "Emeralds", href: "/collections/saawan" },
  { label: "Necklaces", href: "/collections/necklaces" },
  { label: "Earrings", href: "/collections/earrings" },
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = q.trim();
    if (!t) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(t)}`);
  };

  return (
    <div className={`fixed inset-0 z-[90] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative w-full border-b border-line bg-bg transition-transform duration-500 ease-lux ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container-luxe py-7">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Search PARKA</span>
            <button type="button" onClick={onClose} aria-label="Close search" className="text-ink transition-colors hover:text-gold">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={submit} className="mt-6 flex items-center gap-4 border-b border-ink/30 pb-3">
            <SearchIcon className="h-6 w-6 text-muted" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search necklaces, diamonds, bridal…"
              aria-label="Search query"
              className="w-full bg-transparent font-serif text-2xl text-ink placeholder:text-muted/60 focus:outline-none md:text-3xl"
            />
          </form>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-luxe text-muted">
            <span>Popular</span>
            {POPULAR.map((p) => (
              <Link key={p.label} href={p.href} onClick={onClose} className="link-underline text-ink">
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
