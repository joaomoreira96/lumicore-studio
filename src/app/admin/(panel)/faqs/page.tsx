import Link from "next/link";
import { FaqForm } from "@/components/admin/faq-form";
import {
  VisibilityBadge,
  VisibilityToggle,
} from "@/components/admin/visibility-toggle";
import { Pagination } from "@/components/shared/pagination";
import { deleteFaq, toggleFaqVisibility } from "@/lib/actions/admin";
import { getAdminFaqsPage } from "@/lib/data/admin";
import { parsePage } from "@/lib/pagination";
import { Button } from "@/components/ui/button";

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);
  const { items: faqs, totalPages, total } = await getAdminFaqsPage(page);

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">FAQs</h1>
      <p className="mt-2 text-lumi-muted">
        Manage frequently asked questions. Toggle visibility to show or hide on the public site.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-heading text-lg font-semibold">All FAQs</h2>
            {total > 0 && (
              <span className="text-xs text-lumi-muted">{total} total</span>
            )}
          </div>
          {faqs.length === 0 ? (
            <p className="text-sm text-lumi-muted">No FAQs yet.</p>
          ) : (
            <>
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl border border-white/10 bg-lumi-bg-secondary p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{faq.question_pt}</p>
                        <VisibilityBadge isVisible={faq.isVisible} />
                      </div>
                      <p className="mt-1 text-sm text-lumi-muted">{faq.question_en}</p>
                      <p className="mt-1 text-xs text-lumi-muted">order {faq.sort_order}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <VisibilityToggle
                        id={faq.id}
                        isVisible={faq.isVisible}
                        onToggle={toggleFaqVisibility}
                      />
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
              <Pagination page={page} totalPages={totalPages} basePath="/admin/faqs" />
            </>
          )}
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
