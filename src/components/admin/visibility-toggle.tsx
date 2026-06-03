"use client";

import { useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VisibilityToggleProps = {
  id: string;
  isVisible: boolean;
  onToggle: (id: string, isVisible: boolean) => Promise<void>;
  className?: string;
};

export function VisibilityToggle({
  id,
  isVisible,
  onToggle,
  className,
}: VisibilityToggleProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await onToggle(id, !isVisible);
        })
      }
      className={cn(
        "gap-1.5",
        isVisible
          ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
          : "border-white/10 text-lumi-muted hover:bg-white/5",
        className
      )}
    >
      {isVisible ? (
        <>
          <Eye className="size-3.5" />
          Visible
        </>
      ) : (
        <>
          <EyeOff className="size-3.5" />
          Hidden
        </>
      )}
    </Button>
  );
}

export function VisibilityBadge({ isVisible }: { isVisible: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
        isVisible
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-white/5 text-lumi-muted"
      )}
    >
      {isVisible ? "Public" : "Admin only"}
    </span>
  );
}
