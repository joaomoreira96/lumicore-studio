"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/shared/fade-in";
import { SITE_EMAIL } from "@/lib/constants";
import { useLanguage } from "@/providers/language-provider";

export function ContactForm() {
  const { dict } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = String(formData.get("message") ?? "").trim();
    if (message.length < 5) {
      setStatus("error");
      setErrorMessage(dict.contact.messageTooShort);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          company: String(formData.get("company") ?? "").trim() || null,
          message,
        }),
      });

      const data = (await res.json()) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? dict.contact.error);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(dict.contact.error);
    }
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
              minLength={5}
              rows={5}
              className="border-white/10 bg-lumi-bg/50"
            />
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-lumi-blue hover:bg-lumi-blue/90"
          >
            {status === "loading" ? dict.contact.sending : dict.contact.send}
          </Button>

          {status === "success" && (
            <p className="text-sm text-emerald-400">{dict.contact.success}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">{errorMessage || dict.contact.error}</p>
          )}
        </form>
      </div>
    </FadeIn>
  );
}
