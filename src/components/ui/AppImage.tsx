import type { CSSProperties, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { buildUnsplashSrcSet, optimizeUnsplashUrl } from "@/lib/media";

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
  const optimizedSrc = optimizeUnsplashUrl(src, { width: fill ? 1440 : 960 });
  const srcSet = buildUnsplashSrcSet(src, fill ? [480, 768, 1024, 1440] : [320, 480, 768, 960]);
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
      src={optimizedSrc}
      srcSet={srcSet}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : loading ?? "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      style={fillStyle}
      {...props}
    />
  );
}
