"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logoUrl, LOGO_FULL_SRC, LOGO_MONOGRAM_SRC } from "@/lib/constants";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "projects" as const, href: "/projects" },
  { key: "services" as const, href: "/services" },
  { key: "faq" as const, href: "/faq" },
  { key: "contact" as const, href: "/contact" },
];

export function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const { dict, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/5 bg-lumi-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[6rem] max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:min-h-[6.48rem] md:py-3">
          <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl(LOGO_FULL_SRC)}
              alt="Lumicore Studio"
              className="hidden h-[5.94rem] w-auto md:block lg:h-[6.48rem]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl(LOGO_MONOGRAM_SRC)}
              alt="Lumicore Studio"
              className="size-24 shrink-0 md:hidden"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm text-lumi-muted transition-colors hover:text-lumi-text"
              >
                {dict.nav[link.key]}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher locale={locale} setLocale={setLocale} />
            {isAdmin && (
              <Button asChild variant="outline" size="sm" className="border-white/10">
                <Link href="/admin">{dict.nav.adminArea}</Link>
              </Button>
            )}
            <Button asChild size="sm" className="bg-lumi-blue hover:bg-lumi-blue/90">
              <Link href="/contact">{dict.nav.getInTouch}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher locale={locale} setLocale={setLocale} />
            <button
              type="button"
              className="text-lumi-text"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,320px)] flex-col border-l border-white/10 bg-lumi-bg-secondary p-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-semibold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-lumi-muted hover:text-lumi-text"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-lumi-text transition-colors hover:bg-white/5"
                  >
                    {dict.nav[link.key]}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-lumi-blue transition-colors hover:bg-white/5"
                  >
                    {dict.nav.adminArea}
                  </Link>
                )}
              </nav>

              <div className="mt-auto space-y-3 pt-8">
                {isAdmin && (
                  <Button asChild variant="outline" className="w-full border-white/10">
                    <Link href="/admin" onClick={() => setOpen(false)}>
                      {dict.nav.adminArea}
                    </Link>
                  </Button>
                )}
                <Button asChild className="w-full bg-lumi-blue hover:bg-lumi-blue/90">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    {dict.nav.getInTouch}
                  </Link>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitcher({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 p-0.5">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            loc === locale
              ? "bg-white/10 text-lumi-text"
              : "text-lumi-muted hover:text-lumi-text"
          )}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
