"use client";

import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN } from "@/lib/mock/data";
import { useLanguage } from "@/providers/language-provider";

export function Footer() {
  const { dict } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = dict.footer.copyright.replace("{year}", String(year));

  return (
    <footer className="border-t border-white/5 bg-lumi-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold text-lumi-text">
              Lumicore Studio
            </p>
            <p className="mt-1 text-sm text-lumi-muted">{dict.footer.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a
              href={SITE_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-lumi-muted transition-colors hover:text-lumi-text"
            >
              GitHub
              <ExternalLink className="size-3.5" />
            </a>
            <a
              href={SITE_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-lumi-muted transition-colors hover:text-lumi-text"
            >
              LinkedIn
              <ExternalLink className="size-3.5" />
            </a>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="inline-flex items-center gap-1.5 text-lumi-muted transition-colors hover:text-lumi-text"
            >
              <Mail className="size-4" />
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-8 text-sm text-lumi-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright}</p>
          <Link
            href="/admin/login"
            className="text-xs text-lumi-muted/60 transition-colors hover:text-lumi-muted"
          >
            {dict.footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
