"use client";

import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// Badge Component - Modern Mono
// For tags, status indicators, and category labels
// ═══════════════════════════════════════════════════════════════════════════

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "error";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-sand text-charcoal",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-ink text-white",
  outline: "bg-transparent border border-stone text-charcoal/70",
  success: "bg-success-light text-success-dark",
  warning: "bg-warning-light text-warning-dark",
  error: "bg-error-light text-error-dark",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
  lg: "text-sm px-3 py-1.5 gap-2",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  removable = false,
  onRemove,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        "transition-colors duration-150",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "ml-1 shrink-0 rounded-full p-0.5",
            "hover:bg-black/10 transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-current"
          )}
          aria-label="Remove"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Specialized Badge Variants
// ═══════════════════════════════════════════════════════════════════════════

interface CategoryBadgeProps {
  type: "local" | "international" | "custom";
  className?: string;
}

export function CategoryBadge({ type, className }: CategoryBadgeProps) {
  const labels = {
    local: "Local",
    international: "International",
    custom: "Custom",
  };

  const styles = {
    local: "bg-sand text-charcoal",
    international: "bg-primary/10 text-primary",
    custom: "bg-ink text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full",
        styles[type],
        className
      )}
    >
      {labels[type]}
    </span>
  );
}

interface DifficultyBadgeProps {
  level: "easy" | "moderate" | "challenging";
  className?: string;
}

export function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  const labels = {
    easy: "Easy",
    moderate: "Moderate",
    challenging: "Challenging",
  };

  const styles = {
    easy: "bg-success-light text-success-dark",
    moderate: "bg-warning-light text-warning-dark",
    challenging: "bg-error-light text-error-dark",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full",
        styles[level],
        className
      )}
    >
      {labels[level]}
    </span>
  );
}

interface SpotsLeftBadgeProps {
  spots: number;
  maxSpots: number;
  className?: string;
}

export function SpotsLeftBadge({ spots, maxSpots, className }: SpotsLeftBadgeProps) {
  const percentage = (spots / maxSpots) * 100;

  let variant: "success" | "warning" | "error" = "success";
  let label = `${spots} spots left`;

  if (spots === 0) {
    variant = "error";
    label = "Sold out";
  } else if (percentage <= 20) {
    variant = "warning";
    label = `Only ${spots} left!`;
  }

  const styles = {
    success: "bg-success-light text-success-dark",
    warning: "bg-warning-light text-warning-dark animate-pulse",
    error: "bg-error-light text-error-dark",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full",
        styles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}

export default Badge;
