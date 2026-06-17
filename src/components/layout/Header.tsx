"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";

/**
 * Sticky header. On the homepage it is transparent over the hero video and
 * turns solid on scroll. On every other route it is solid from the top (so the
 * logo and nav stay readable above lighter pages).
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const overlay = isHome && !scrolled && !menuOpen;
  const textClass = overlay ? "text-ivory" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lux ${textClass} ${
          overlay ? "bg-transparent" : "border-b border-line bg-bg/85 backdrop-blur-md"
        }`}
      >
        <div
          className={`container-luxe flex items-center justify-between transition-all duration-500 ease-lux ${
            overlay ? "py-5 md:py-7" : "py-3.5 md:py-4"
          }`}
        >
          <Link href="/" aria-label="PARKA — home" className="shrink-0">
            <BrandLogo
              toneClassName={overlay ? "bg-ivory" : "bg-ink"}
              className={`transition-all duration-500 ease-lux ${
                overlay ? "h-7 md:h-8" : "h-6 md:h-7"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="link-underline text-[12px] uppercase tracking-luxe"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center transition-colors hover:text-gold"
            >
              <SearchIcon />
            </button>
            <Link
              href="/account/login"
              aria-label="Account"
              className="hidden h-9 w-9 items-center justify-center transition-colors hover:text-gold md:inline-flex"
            >
              <UserIcon />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative inline-flex h-9 w-9 items-center justify-center transition-colors hover:text-gold"
            >
              <BagIcon />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-charcoal">
                0
              </span>
            </Link>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center transition-colors hover:text-gold lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
