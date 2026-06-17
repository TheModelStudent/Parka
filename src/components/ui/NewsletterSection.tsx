"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "./Icons";

interface NewsletterSectionProps {
  eyebrow?: string;
  heading?: string;
  subtext?: string;
}

/**
 * "Be a part of our world" — newsletter capture.
 * Self-contained; wire `onSubmit` to Shopify/Klaviyo/etc. later.
 */
export function NewsletterSection({
  eyebrow = "PARKA Privé",
  heading = "Be a part of our world",
  subtext = "Be the first to discover new collections, atelier stories and private viewings. No noise — only beauty, on occasion.",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to your ESP / Shopify customer create.
    setSubmitted(true);
  };

  return (
    <div className="container-luxe">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="heading-serif mt-5 text-4xl md:text-5xl">{heading}</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-muted">
          {subtext}
        </p>

        {submitted ? (
          <p className="mt-10 font-serif text-2xl font-light text-gold">
            Thank you — welcome to PARKA.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md items-center border-b border-ink/30 pb-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              className="w-full bg-transparent px-1 py-2 text-sm tracking-wide text-ink placeholder:text-muted/70 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex shrink-0 items-center gap-2 px-2 text-[11px] uppercase tracking-luxe text-ink transition-colors hover:text-gold"
            >
              Subscribe
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
