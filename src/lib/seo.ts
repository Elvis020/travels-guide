import type { FAQCategory } from "@/data/faqs";
import type { Review, Trip } from "@/types";

export const SITE_NAME = "NYS Travels";
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.nystravels.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.JPG`;
export const DEFAULT_TWITTER_CARD = "summary_large_image";

export type JsonLd =
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

export interface SeoMetadata {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: JsonLd;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildCanonicalUrl(path = "/") {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
  return absoluteUrl(normalized);
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: "hello@nystravels.com",
    description:
      "NYS Travels curates guided Ghana tours, custom itineraries, and small-group travel experiences across cultural, coastal, and wildlife destinations.",
    areaServed: [
      {
        "@type": "Country",
        name: "Ghana",
      },
    ],
    image: DEFAULT_OG_IMAGE,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en",
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFAQSchema(categories: FAQCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };
}

export function buildTripListSchema(trips: Trip[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: trips.map((trip, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/trips/${trip.slug}`),
      item: {
        "@type": "TouristTrip",
        name: trip.title,
        description: trip.shortDescription,
        image: absoluteUrl(trip.coverImage.url),
        touristType: trip.category,
        itinerary: trip.highlights.join(", "),
        offers: {
          "@type": "Offer",
          priceCurrency: trip.currency,
          price: trip.price,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/trips/${trip.slug}`),
        },
      },
    })),
  };
}

export function buildTripSchema(trip: Trip, reviews: Review[], rating: number) {
  const tripUrl = absoluteUrl(`/trips/${trip.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${tripUrl}#trip`,
    name: trip.title,
    description: trip.description,
    url: tripUrl,
    image: [trip.coverImage, ...trip.images].map((image) => image.url),
    itinerary: trip.itinerary.map((day) => ({
      "@type": "Schedule",
      name: day.title,
      description: day.description,
    })),
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    touristType: trip.category,
    offers: {
      "@type": "Offer",
      priceCurrency: trip.currency,
      price: trip.price,
      availability: "https://schema.org/InStock",
      url: tripUrl,
      validFrom: trip.bookingDeadline,
    },
    ...(reviews.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(rating.toFixed(1)),
            reviewCount: reviews.length,
          },
        }
      : {}),
  };
}
