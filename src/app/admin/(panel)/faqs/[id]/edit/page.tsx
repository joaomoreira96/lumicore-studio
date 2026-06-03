import { notFound } from "next/navigation";
import Link from "next/link";
import { FaqForm } from "@/components/admin/faq-form";
import { getAdminFaqById } from "@/lib/data/admin";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await getAdminFaqById(id);

  if (!faq) notFound();

  return (
    <div>
      <Link href="/admin/faqs" className="text-sm text-lumi-muted hover:text-lumi-text">
        ← Back to FAQs
      </Link>
      <h1 className="mt-4 font-heading text-3xl font-bold">Edit FAQ</h1>
      <div className="mt-8 max-w-xl rounded-xl border border-white/10 bg-lumi-bg-secondary p-6">
        <FaqForm faq={faq} />
      </div>
    </div>
  );
}
