/** Global, content-light site configuration: brand, navigation, footer, social. */

export const brand = {
  name: "PARKA",
  tagline: "Luxury Indian Jewellery House",
  email: "atelier@parka.jewelry",
  phone: "+91 98765 43210",
  whatsapp: "https://wa.me/919876543210",
};

export interface NavLink {
  label: string;
  href: string;
}

/** Primary navigation — resolves from any page (no homepage-only anchors). */
export const navLinks: NavLink[] = [
  { label: "New", href: "/collections/new" },
  { label: "Necklaces", href: "/collections/necklaces" },
  { label: "Earrings", href: "/collections/earrings" },
  { label: "Bracelets", href: "/collections/bracelets" },
  { label: "Rings", href: "/collections/rings" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/#about" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Maison",
    links: [
      { label: "Our Story", href: "/#about" },
      { label: "Collections", href: "/collections" },
      { label: "The Journal", href: "/journal" },
      { label: "Boutiques", href: "/#stores" },
    ],
  },
  {
    heading: "Client Care",
    links: [
      { label: "Book an Appointment", href: "/#stores" },
      { label: "Account", href: "/account/login" },
      { label: "Jewellery Care", href: "#" },
      { label: "Our Materials", href: "#" },
      { label: "Shipping & Returns", href: "#" },
    ],
  },
  {
    heading: "Discover",
    links: [
      { label: "Necklaces", href: "/collections/necklaces" },
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Bracelets", href: "/collections/bracelets" },
      { label: "Rings", href: "/collections/rings" },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Facebook", href: "https://facebook.com" },
];
