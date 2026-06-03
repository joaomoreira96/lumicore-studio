"use client";

import { useActionState } from "react";
import { saveSiteSettings, type SiteSettingsFormState } from "@/lib/actions/admin";
import { getContactEmail } from "@/lib/site-settings";
import type { SiteSettings } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState(saveSiteSettings, null);

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <FormFeedback state={state} />

      <LanguageSection title="Português">
        <TextField
          label="Texto do footer (PT)"
          name="footer_text_pt"
          defaultValue={settings.footer_text_pt}
          required
        />
      </LanguageSection>

      <LanguageSection title="English">
        <TextField
          label="Footer text (EN)"
          name="footer_text_en"
          defaultValue={settings.footer_text_en}
          required
        />
      </LanguageSection>

      <Field
        label="Contact email"
        name="email"
        type="email"
        defaultValue={getContactEmail(settings)}
        placeholder="hello@lumicore.studio"
      />
      <p className="-mt-4 text-xs text-lumi-muted">
        Shown as plain text in the footer (not a button).
      </p>

      <div className="space-y-4 rounded-xl border border-white/10 bg-lumi-bg/30 p-4">
        <p className="text-sm font-semibold text-lumi-text">Social links</p>
        <Field
          label="GitHub"
          name="github"
          type="url"
          defaultValue={settings.github ?? ""}
          placeholder="https://github.com/..."
        />
        <Field
          label="LinkedIn"
          name="linkedin"
          type="url"
          defaultValue={settings.linkedin ?? ""}
          placeholder="https://linkedin.com/..."
        />
        <Field
          label="Facebook"
          name="facebook"
          type="url"
          defaultValue={settings.facebook ?? ""}
          placeholder="https://facebook.com/..."
        />
        <Field
          label="Instagram"
          name="instagram"
          type="url"
          defaultValue={settings.instagram ?? ""}
          placeholder="https://instagram.com/..."
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="bg-lumi-blue hover:bg-lumi-blue/90"
      >
        {pending ? "A guardar…" : "Save settings"}
      </Button>
    </form>
  );
}

function FormFeedback({ state }: { state: SiteSettingsFormState }) {
  if (!state?.success && !state?.error) return null;

  return (
    <div
      role="status"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        state.success
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/25 bg-red-500/10 text-red-400"
      )}
    >
      {state.success ? state.message : state.error}
    </div>
  );
}

function LanguageSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-white/10 bg-lumi-bg/30 p-4">
      <legend className="px-1 text-sm font-semibold text-lumi-text">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-lumi-muted">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="border-white/10 bg-lumi-bg"
      />
    </div>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-lumi-muted">
        {label}
      </label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={2}
        className="border-white/10 bg-lumi-bg"
      />
    </div>
  );
}
