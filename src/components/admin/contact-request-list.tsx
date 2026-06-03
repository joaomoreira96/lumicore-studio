"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markContactAnswered } from "@/lib/actions/admin";
import type { ContactRequest } from "@/lib/types/contact-request";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function ContactRequestRow({ request }: { request: ContactRequest }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const answered = request.isAnswered === true;

  function handleToggle() {
    startTransition(async () => {
      try {
        await markContactAnswered(request.id, !answered);
        router.refresh();
      } catch (error) {
        console.error("Failed to update contact request:", error);
      }
    });
  }

  return (
    <article
      className={cn(
        "rounded-xl border p-5 transition-colors",
        answered
          ? "border-white/10 bg-lumi-bg-secondary/50 opacity-80"
          : "border-lumi-blue/25 bg-lumi-blue/5"
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-lumi-text">{request.name}</h3>
            {!answered && (
              <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-400">
                Awaiting reply
              </span>
            )}
            {answered && (
              <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
                Answered
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-lumi-muted">
            <a
              href={`mailto:${request.email}`}
              className="text-lumi-blue hover:text-lumi-cyan"
            >
              {request.email}
            </a>
            {request.company && <span>{request.company}</span>}
            <span>{formatDate(request.created_at)}</span>
          </div>

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-lumi-muted">
            {request.message}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={handleToggle}
          className={cn(
            "shrink-0 gap-1.5",
            answered
              ? "border-white/10 text-lumi-muted"
              : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
          )}
        >
          {pending ? (
            "Saving…"
          ) : answered ? (
            <>
              <Circle className="size-3.5" />
              Mark unanswered
            </>
          ) : (
            <>
              <CheckCircle2 className="size-3.5" />
              Mark answered
            </>
          )}
        </Button>
      </div>
    </article>
  );
}

export function ContactRequestList({
  requests,
}: {
  requests: ContactRequest[];
}) {
  if (requests.length === 0) {
    return <p className="text-sm text-lumi-muted">No contact requests yet.</p>;
  }

  const unanswered = requests.filter((r) => r.isAnswered !== true);
  const answered = requests.filter((r) => r.isAnswered === true);

  return (
    <div className="space-y-8">
      {unanswered.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-lg font-semibold">
            Awaiting reply ({unanswered.length})
          </h2>
          {unanswered.map((request) => (
            <ContactRequestRow key={request.id} request={request} />
          ))}
        </section>
      )}

      {answered.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-lumi-muted">
            Answered ({answered.length})
          </h2>
          {answered.map((request) => (
            <ContactRequestRow key={request.id} request={request} />
          ))}
        </section>
      )}
    </div>
  );
}
