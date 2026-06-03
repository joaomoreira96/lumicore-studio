import Link from "next/link";
import { FaqForm } from "@/components/admin/faq-form";
import { deleteFaq } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";
import type { Faq } from "@/lib/types/database";
import { Button } from "@/components/ui/button";

export default async function AdminFaqsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  const faqs = (data ?? []) as Faq[];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">FAQs</h1>
      <p className="mt-2 text-lumi-muted">Manage frequently asked questions.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold">All FAQs</h2>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-xl border border-white/10 bg-lumi-bg-secondary p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{faq.question}</p>
                  <p className="mt-1 text-xs text-lumi-muted">order {faq.sort_order}</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/faqs/${faq.id}/edit`}>Edit</Link>
                  </Button>
                  <form action={deleteFaq.bind(null, faq.id)}>
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold">Add FAQ</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-lumi-bg-secondary p-6">
            <FaqForm />
          </div>
        </div>
      </div>
    </div>
  );
}
