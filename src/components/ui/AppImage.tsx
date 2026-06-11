import type { CSSProperties, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AppImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
}

export function AppImage({
  src,
  alt,
  fill = false,
  priority = false,
  className,
  sizes,
  style,
  loading,
  ...props
}: AppImageProps) {
  const fillStyle: CSSProperties = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }
    : style ?? {};

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : loading ?? "lazy"}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      style={fillStyle}
      {...props}
    />
  );
}
