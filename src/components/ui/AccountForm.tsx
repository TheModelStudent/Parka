"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const inputClass =
  "w-full border-b border-ink/30 bg-transparent py-2 text-sm text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none";
const labelClass = "block text-[11px] uppercase tracking-luxe text-muted";

export function AccountForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/images/about-portrait.jpg"
          alt="PARKA"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      <div className="flex items-center justify-center px-6 pb-20 pt-32 md:px-16 md:pt-24">
        <div className="w-full max-w-sm">
          <p className="eyebrow">{isLogin ? "Welcome back" : "Join the world of PARKA"}</p>
          <h1 className="heading-serif mt-4 text-4xl md:text-5xl">
            {isLogin ? "Sign in" : "Create account"}
          </h1>

          {done ? (
            <div className="mt-10">
              <p className="font-serif text-2xl font-light text-gold">
                {isLogin ? "Welcome back to PARKA." : "Welcome to PARKA."}
              </p>
              <p className="mt-3 text-sm font-light text-muted">
                This is a demo form. Connect Shopify customer accounts to enable real sign-in.
              </p>
              <Link href="/" className="btn-line mt-8 inline-flex">
                Return Home
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name
                  </label>
                  <input id="name" type="text" required className={inputClass} placeholder="Your name" />
                </div>
              )}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input id="email" type="email" required className={inputClass} placeholder="you@email.com" />
              </div>
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input id="password" type="password" required className={inputClass} placeholder="••••••••" />
              </div>

              <button type="submit" className="btn-solid w-full">
                {isLogin ? "Sign in" : "Create account"}
              </button>
            </form>
          )}

          {!done && (
            <p className="mt-8 text-sm font-light text-muted">
              {isLogin ? "New to PARKA? " : "Already have an account? "}
              <Link
                href={isLogin ? "/account/register" : "/account/login"}
                className="link-underline text-ink"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
