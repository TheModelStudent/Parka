"use client";

import Link from "next/link";
import { navLinks, socialLinks } from "@/lib/site";
import { CloseIcon } from "@/components/ui/Icons";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}

export function MobileNav({ open, onClose, onSearch }: MobileNavProps) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-bg px-7 pb-10 pt-6 shadow-2xl transition-transform duration-500 ease-lux lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <BrandLogo className="h-6" toneClassName="bg-ink" />
          <button type="button" onClick={onClose} aria-label="Close menu" className="p-2 text-ink">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-12 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="font-serif text-3xl font-light text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-5">
          <div className="flex gap-6 text-[11px] uppercase tracking-luxe text-muted">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSearch();
              }}
              className="link-underline uppercase"
            >
              Search
            </button>
            <Link href="/account/login" onClick={onClose} className="link-underline">
              Account
            </Link>
            <Link href="/cart" onClick={onClose} className="link-underline">
              Cart
            </Link>
          </div>
          <div className="flex gap-6 text-[11px] uppercase tracking-luxe text-muted">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
