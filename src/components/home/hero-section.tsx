import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HeroSection({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden hero-grid">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-lumi-blue/20 blur-[100px]" />
        <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-lumi-purple/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-lumi-cyan/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:py-36">
        <div
          className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-lumi-muted backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {dict.badge}
        </div>

        <h1
          className="animate-fade-in-up mt-8 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          {dict.headline}
        </h1>

        <p
          className="animate-fade-in-up mt-4 max-w-xl text-lg text-lumi-muted md:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          {dict.subheadline}
        </p>

        <div
          className="animate-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            asChild
            size="lg"
            className="h-11 bg-lumi-blue px-6 hover:bg-lumi-blue/90"
          >
            <Link href="/projects">
              {dict.viewProjects}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 border-white/10 bg-transparent px-6 hover:bg-white/5"
          >
            <Link href="/contact">{dict.getInTouch}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
