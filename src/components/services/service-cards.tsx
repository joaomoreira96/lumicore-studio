"use client";

import { Code2, Globe, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { useLanguage } from "@/providers/language-provider";

const icons = [Globe, Code2, Sparkles] as const;
const keys = ["web", "software", "interactive"] as const;

export function ServiceCards({ variant = "default" }: { variant?: "default" | "compact" }) {
  const { dict } = useLanguage();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {keys.map((key, index) => {
        const Icon = icons[index];
        const service = dict.services[key];
        return (
          <FadeIn key={key} delay={index * 0.08}>
            <div
              className={
                variant === "compact"
                  ? "glass-card p-6 transition-colors hover:border-white/15"
                  : "glass-card p-8 transition-colors hover:border-white/15 hover:bg-white/[0.07]"
              }
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-lumi-blue/20 to-lumi-purple/20">
                <Icon className="size-5 text-lumi-blue" />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-lumi-muted">
                {service.description}
              </p>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
