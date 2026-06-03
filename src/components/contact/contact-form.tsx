"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/shared/fade-in";
import { SITE_EMAIL } from "@/lib/mock/data";
import { useLanguage } from "@/providers/language-provider";

export function ContactForm() {
  const { dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <FadeIn>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-lg font-medium text-lumi-text">{dict.contact.cta}</p>
          <p className="mt-2 text-sm text-lumi-muted">{dict.contact.workflow}</p>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="mt-8 inline-flex items-center gap-2 text-lumi-blue transition-colors hover:text-lumi-cyan"
          >
            <Mail className="size-4" />
            {SITE_EMAIL}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6 sm:p-8">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-lumi-muted">
              {dict.contact.name}
            </label>
            <Input id="name" name="name" required className="border-white/10 bg-lumi-bg/50" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-lumi-muted">
              {dict.contact.email}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="border-white/10 bg-lumi-bg/50"
            />
          </div>
          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm text-lumi-muted">
              {dict.contact.company}
            </label>
            <Input id="company" name="company" className="border-white/10 bg-lumi-bg/50" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-lumi-muted">
              {dict.contact.message}
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              className="border-white/10 bg-lumi-bg/50"
            />
          </div>

          <Button type="submit" className="w-full bg-lumi-blue hover:bg-lumi-blue/90">
            {dict.contact.send}
          </Button>

          {submitted && (
            <p className="text-sm text-emerald-400">{dict.contact.success}</p>
          )}
        </form>
      </div>
    </FadeIn>
  );
}
