"use client";

import { saveFaq } from "@/lib/actions/admin";
import type { Faq } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FaqForm({ faq }: { faq?: Faq }) {
  return (
    <form action={saveFaq} className="space-y-4">
      {faq && <input type="hidden" name="id" value={faq.id} />}

      <Field label="Question (EN)" name="question" defaultValue={faq?.question} required />
      <Field label="Question (PT)" name="question_pt" defaultValue={faq?.question_pt ?? ""} />
      <TextField label="Answer (EN)" name="answer" defaultValue={faq?.answer} required />
      <TextField label="Answer (PT)" name="answer_pt" defaultValue={faq?.answer_pt ?? ""} />
      <Field
        label="Sort Order"
        name="sort_order"
        type="number"
        defaultValue={String(faq?.sort_order ?? 0)}
      />

      <Button type="submit" className="bg-lumi-blue hover:bg-lumi-blue/90">
        {faq ? "Update FAQ" : "Create FAQ"}
      </Button>
    </form>
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
