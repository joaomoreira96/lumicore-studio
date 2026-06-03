import { ContactRequestList } from "@/components/admin/contact-request-list";
import { getAllContactRequests } from "@/lib/data/contact-requests";
import type { ContactRequest } from "@/lib/types/contact-request";

export default async function AdminContactsPage() {
  const data = await getAllContactRequests();
  const requests = data as ContactRequest[];
  const unanswered = requests.filter((r) => r.isAnswered !== true).length;

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold">Contact requests</h1>
      <p className="mt-2 text-lumi-muted">
        Messages submitted through the contact form.
        {unanswered > 0 && (
          <span className="ml-1 text-amber-400">
            {unanswered} awaiting reply.
          </span>
        )}
      </p>

      <div className="mt-10">
        <ContactRequestList requests={requests} />
      </div>
    </div>
  );
}
