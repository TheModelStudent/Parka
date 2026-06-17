import Link from "next/link";
import { brand, footerColumns, socialLinks } from "@/lib/site";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <BrandLogo className="h-9" toneClassName="bg-ink" />
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-muted">
              {brand.tagline}. Jewellery inspired by heritage, crafted for today.
            </p>
            <div className="mt-6 space-y-1 text-sm font-light text-muted">
              <p>
                <a className="link-underline" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
              </p>
              <p>
                <a className="link-underline" href={brand.whatsapp}>
                  {brand.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-[11px] uppercase tracking-luxe text-ink">{col.heading}</h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="link-underline text-sm font-light text-muted">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-luxe text-ink">Follow</h4>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-underline text-sm font-light text-muted">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[11px] uppercase tracking-luxe text-muted md:flex-row">
          <p>
            &copy; {year} {brand.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="link-underline">Privacy</Link>
            <Link href="#" className="link-underline">Terms</Link>
            <Link href="#" className="link-underline">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
