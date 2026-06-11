"use client";

import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface UrgencyBadgeProps {
  daysUntilDeadline: number;
  className?: string;
}

export function UrgencyBadge({ daysUntilDeadline, className }: UrgencyBadgeProps) {
  const isVeryUrgent = daysUntilDeadline <= 7;

  return (
    <div className={cn("absolute top-3 left-3", className)}>
      <div
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "backdrop-blur-md bg-white/95 border border-white/50",
          "shadow-lg transition-all duration-200",
          "hover:scale-105 hover:shadow-xl",
          isVeryUrgent && "animate-pulse"
        )}
      >
        <Clock className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
        <span className="text-sm font-bold text-ink">
          {daysUntilDeadline}d
        </span>
        <span className="text-xs text-charcoal/70 font-medium">left</span>
      </div>
    </div>
  );
}
