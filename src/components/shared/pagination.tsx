"use client";

import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  labels?: {
    previous: string;
    next: string;
  };
  /** Keeps viewport on this section instead of jumping to page top */
  scrollAnchor?: string;
};

export function Pagination({
  page,
  totalPages,
  basePath,
  labels,
  scrollAnchor,
}: PaginationProps) {
  useEffect(() => {
    if (!scrollAnchor || page <= 1) return;
    const el = document.getElementById(scrollAnchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page, scrollAnchor]);

  if (totalPages <= 1) return null;

  const previous = labels?.previous ?? "Previous";
  const next = labels?.next ?? "Next";
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const linkScroll = scrollAnchor ? false : undefined;

  return (
    <nav
      className="mt-6 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {page > 1 ? (
        <PaginationLink
          href={buildHref(basePath, page - 1, scrollAnchor)}
          label={previous}
          scroll={linkScroll}
        />
      ) : (
        <span className="rounded-lg px-3 py-1.5 text-sm text-lumi-muted/40">{previous}</span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(basePath, p, scrollAnchor)}
          scroll={linkScroll}
          className={cn(
            "min-w-9 rounded-lg px-3 py-1.5 text-center text-sm transition-colors",
            p === page
              ? "bg-lumi-blue text-white"
              : "text-lumi-muted hover:bg-white/5 hover:text-lumi-text"
          )}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <PaginationLink
          href={buildHref(basePath, page + 1, scrollAnchor)}
          label={next}
          scroll={linkScroll}
        />
      ) : (
        <span className="rounded-lg px-3 py-1.5 text-sm text-lumi-muted/40">{next}</span>
      )}
    </nav>
  );
}

function buildHref(basePath: string, page: number, scrollAnchor?: string) {
  const hash = scrollAnchor ? `#${scrollAnchor}` : "";
  if (page <= 1) {
    return `${basePath}${hash}` || "/";
  }
  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}page=${page}${hash}`;
}

function PaginationLink({
  href,
  label,
  scroll,
}: {
  href: string;
  label: string;
  scroll?: false;
}) {
  return (
    <Link
      href={href}
      scroll={scroll}
      className="rounded-lg px-3 py-1.5 text-sm text-lumi-muted transition-colors hover:bg-white/5 hover:text-lumi-text"
    >
      {label}
    </Link>
  );
}
