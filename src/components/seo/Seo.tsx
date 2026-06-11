"use client";

import { useEffect } from "react";
import {
  buildCanonicalUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_CARD,
  SITE_NAME,
  type SeoMetadata,
} from "@/lib/seo";

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);

  if (!meta) {
    meta = document.createElement("meta");
    document.head.appendChild(meta);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    meta?.setAttribute(key, value);
  });
}

function ensureLink(selector: string, attributes: Record<string, string>) {
  let link = document.head.querySelector<HTMLLinkElement>(selector);

  if (!link) {
    link = document.createElement("link");
    document.head.appendChild(link);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    link?.setAttribute(key, value);
  });
}

export function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoMetadata) {
  useEffect(() => {
    const canonicalUrl = buildCanonicalUrl(path);
    const normalizedImage = /^https?:\/\//i.test(image)
      ? image
      : buildCanonicalUrl(image);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    ensureMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: normalizedImage,
    });
    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: DEFAULT_TWITTER_CARD,
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: normalizedImage,
    });
    ensureLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    const scriptId = "route-jsonld";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [description, image, jsonLd, noindex, path, title, type]);

  return null;
}
