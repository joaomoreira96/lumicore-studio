"use client";

import { useActionState } from "react";
import { saveFaq, type FaqFormState } from "@/lib/actions/admin";
import type { Faq } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function FaqForm({ faq }: { faq?: Faq }) {
  const [state, formAction, pending] = useActionState(saveFaq, null);

  return (
    <form action={formAction} className="space-y-6">
      {faq && <input type="hidden" name="id" value={faq.id} />}

      <FormFeedback state={state} />

      <LanguageSection title="Português">
        <Field
          label="Pergunta (PT)"
          name="question_pt"
          defaultValue={faq?.question_pt}
          required
        />
        <TextField
          label="Resposta (PT)"
          name="answer_pt"
          defaultValue={faq?.answer_pt}
          required
        />
      </LanguageSection>

      <LanguageSection title="English">
        <Field
          label="Question (EN)"
          name="question_en"
          defaultValue={faq?.question_en}
          required
        />
        <TextField
          label="Answer (EN)"
          name="answer_en"
          defaultValue={faq?.answer_en}
          required
        />
      </LanguageSection>

      <Field
        label="Sort order"
        name="sort_order"
        type="number"
        defaultValue={String(faq?.sort_order ?? 0)}
      />

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-lumi-bg/50 p-3">
        <input
          type="checkbox"
          name="isVisible"
          value="true"
          defaultChecked={faq?.isVisible ?? false}
          className="mt-0.5 size-4 rounded border-white/20 accent-lumi-blue"
        />
        <span>
          <span className="block text-sm font-medium text-lumi-text">
            Visible on public website
          </span>
          <span className="mt-0.5 block text-xs text-lumi-muted">
            When disabled, FAQ is only visible in admin.
          </span>
        </span>
      </label>

      <Button
        type="submit"
        disabled={pending}
        className="bg-lumi-blue hover:bg-lumi-blue/90"
      >
        {pending ? "A guardar…" : faq ? "Update FAQ" : "Create FAQ"}
      </Button>
    </form>
  );
}

function FormFeedback({ state }: { state: FaqFormState }) {
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
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
        rows={4}
        className="border-white/10 bg-lumi-bg"
      />
    </div>
  );
}
