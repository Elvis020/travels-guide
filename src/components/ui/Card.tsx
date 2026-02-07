"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// Card Component
// Flexible card with hover animations and image support
// ═══════════════════════════════════════════════════════════════════════════

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = true, padding = "none", className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-white rounded-xl overflow-hidden",
          "shadow-[var(--shadow-card)]",
          hover && "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300 ease-out",
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// ═══════════════════════════════════════════════════════════════════════════
// Card Sub-components
// ═══════════════════════════════════════════════════════════════════════════

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  overlay?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const aspectRatioStyles = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[2/1]",
};

export function CardImage({
  src,
  alt,
  aspectRatio = "video",
  overlay = false,
  children,
  className,
}: CardImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden img-zoom",
        aspectRatioStyles[aspectRatio],
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
      {children && (
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-4 pt-4 pb-2", className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "px-4 pb-4 pt-2 flex items-center gap-3",
        "border-t border-sand mt-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  as?: "h2" | "h3" | "h4";
  className?: string;
}

export function CardTitle({ children, as: Tag = "h3", className }: CardTitleProps) {
  return (
    <Tag
      className={cn(
        "font-display font-semibold text-ink",
        Tag === "h2" && "text-xl",
        Tag === "h3" && "text-lg",
        Tag === "h4" && "text-base",
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
  lines?: 1 | 2 | 3;
}

export function CardDescription({ children, className, lines = 2 }: CardDescriptionProps) {
  const lineClampStyles = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
  };

  return (
    <p
      className={cn(
        "text-sm text-charcoal/60",
        lineClampStyles[lines],
        className
      )}
    >
      {children}
    </p>
  );
}

export default Card;
