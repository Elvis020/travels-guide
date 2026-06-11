import type { GalleryItem, MediaItem, Trip } from "@/types";

interface UnsplashOptions {
  width?: number;
  quality?: number;
}

const DEFAULT_QUALITY = 72;

export function isUnsplashUrl(url: string) {
  return url.includes("images.unsplash.com");
}

export function optimizeUnsplashUrl(
  url: string,
  { width, quality = DEFAULT_QUALITY }: UnsplashOptions = {},
) {
  if (!isUnsplashUrl(url)) {
    return url;
  }

  const parsed = new URL(url);
  parsed.searchParams.set("auto", "format");
  parsed.searchParams.set("fit", "crop");
  parsed.searchParams.set("q", String(quality));

  if (width) {
    parsed.searchParams.set("w", String(width));
  }

  return parsed.toString();
}

export function buildUnsplashSrcSet(
  url: string,
  widths: number[],
  quality = DEFAULT_QUALITY,
) {
  if (!isUnsplashUrl(url)) {
    return undefined;
  }

  return widths
    .map((width) => `${optimizeUnsplashUrl(url, { width, quality })} ${width}w`)
    .join(", ");
}

function optimizeMediaItem(item: MediaItem, width = 960): MediaItem {
  return {
    ...item,
    url: optimizeUnsplashUrl(item.url, { width }),
  };
}

export function optimizeTripMedia(trip: Trip): Trip {
  return {
    ...trip,
    coverImage: optimizeMediaItem(trip.coverImage, 960),
    images: trip.images.map((image) => optimizeMediaItem(image, 960)),
  };
}

export function optimizeGalleryItem(item: GalleryItem): GalleryItem {
  return {
    ...item,
    url: optimizeUnsplashUrl(item.url, { width: 900 }),
  };
}
