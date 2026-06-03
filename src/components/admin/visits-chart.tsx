"use client";

import type { DailyVisitPoint } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function VisitsChart({ data }: { data: DailyVisitPoint[] }) {
  const max = Math.max(...data.map((d) => d.visits), 1);

  if (data.every((d) => d.visits === 0)) {
    return (
      <p className="py-12 text-center text-sm text-lumi-muted">
        No visit data yet. Stats appear after visitors browse the public site.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex h-48 items-end gap-1.5 sm:gap-2">
        {data.map((point) => {
          const height = Math.max((point.visits / max) * 100, point.visits > 0 ? 8 : 0);
          return (
            <div
              key={point.day}
              className="group flex flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-xs font-medium text-lumi-text opacity-0 transition-opacity group-hover:opacity-100">
                {point.visits}
              </span>
              <div
                className={cn(
                  "w-full rounded-t-md bg-gradient-to-t from-lumi-blue to-lumi-blue/60 transition-all",
                  point.visits === 0 && "from-white/5 to-white/5"
                )}
                style={{ height: `${height}%` }}
                title={`${point.label}: ${point.visits}`}
              />
              <span className="hidden text-[10px] text-lumi-muted sm:block">{point.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between sm:hidden">
        <span className="text-[10px] text-lumi-muted">{data[0]?.label}</span>
        <span className="text-[10px] text-lumi-muted">{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}
