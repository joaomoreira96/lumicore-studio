"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getContactEmail, getFooterText } from "@/lib/site-settings";
import type { SiteSettings } from "@/lib/types/database";
import { useLanguage } from "@/providers/language-provider";

type SocialKey = keyof Pick<SiteSettings, "github" | "linkedin" | "facebook" | "instagram">;

const socialRows: { key: SocialKey; label: string }[][] = [
  [
    { key: "github", label: "GitHub" },
    { key: "linkedin", label: "LinkedIn" },
  ],
  [
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
  ],
];

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-lumi-muted transition-colors hover:text-lumi-text"
    >
      {label}
      <ExternalLink className="size-3.5" />
    </a>
  );
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const { dict, locale } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = dict.footer.copyright.replace("{year}", String(year));
  const footerText = getFooterText(settings, locale);
  const email = getContactEmail(settings);

  const rows = socialRows
    .map((row) =>
      row
        .map(({ key, label }) => ({ label, href: settings[key] }))
        .filter(
          (item): item is { label: string; href: string } =>
            Boolean(item.href?.trim())
        )
    )
    .filter((row) => row.length > 0);

  return (
    <footer className="border-t border-white/5 bg-lumi-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold text-lumi-text">
              Lumicore Studio
            </p>
            <p className="mt-1 text-sm text-lumi-muted">{footerText}</p>
            {email && <p className="mt-3 text-sm text-lumi-text">{email}</p>}
          </div>

          {rows.length > 0 && (
            <div className="flex flex-col gap-3 text-sm">
              {rows.map((row, i) => (
                <div key={i} className="flex flex-wrap items-center gap-4">
                  {row.map(({ label, href }) => (
                    <SocialLink key={label} label={label} href={href} />
                  ))}
                </div>
              ))}
            </div>
          )}
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
