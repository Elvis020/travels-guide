"use client";

import { AppImage as Image } from "@/components/ui";
import { Quote, Star } from "lucide-react";
import type { Review } from "@/data/reviews";

interface ReviewsTeaserProps {
  reviews: Review[];
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, index) => (
        <Star
          key={index}
          className="h-3.5 w-3.5 fill-primary text-primary"
          aria-hidden
        />
      ))}
    </div>
  );
}

function TravelerIdentity({ review, compact = false }: { review: Review; compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`relative flex-shrink-0 ${
          compact ? "h-11 w-11" : "h-14 w-14"
        }`}
      >
        <div className="h-full w-full overflow-hidden rounded-full ring-2 ring-primary/18">
          <Image
            src={review.image}
            alt={review.name}
            width={compact ? 44 : 56}
            height={compact ? 44 : 56}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary shadow-sm">
          <Quote className="h-2.5 w-2.5 !text-white" aria-hidden />
        </div>
      </div>

      <div className="min-w-0">
        <h3
          className={`mb-0 truncate font-semibold leading-tight text-ink ${
            compact ? "text-[15px]" : "text-[17px]"
          }`}
        >
          {review.name}
        </h3>
        <p className="mb-0 mt-1 truncate text-xs leading-none text-charcoal/56">
          {review.location}
        </p>
      </div>
    </div>
  );
}

function FeaturedReview({ review }: { review: Review }) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-white/12 bg-cream p-6 shadow-[0_24px_70px_rgba(12,28,18,0.24)] md:p-8 lg:min-h-[390px]">
      <div className="absolute right-6 top-6 hidden rounded-full border border-primary/12 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary md:block">
        Featured note
      </div>

      <div className="mb-10 flex items-center justify-between gap-4 md:mb-14">
        <TravelerIdentity review={review} />
        <RatingStars rating={review.rating} />
      </div>

      <div className="max-w-3xl">
        <Quote className="mb-5 h-8 w-8 text-primary/45" aria-hidden />
        <blockquote className="font-display text-[2rem] leading-[1.08] tracking-[-0.01em] text-ink md:text-[2.8rem] lg:text-[3.15rem]">
          {review.quote}
        </blockquote>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-primary/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          {review.trip}
        </span>
        <span className="text-sm text-charcoal/48">{review.date}</span>
      </div>
    </article>
  );
}

function SupportingReview({ review, index }: { review: Review; index: number }) {
  return (
    <article className="group rounded-[22px] border border-white/10 bg-white p-5 shadow-[0_16px_42px_rgba(12,28,18,0.14)] transition-transform duration-300 ease-out hover:-translate-y-1 md:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <TravelerIdentity review={review} compact />
        <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          0{index + 1}
        </span>
      </div>

      <blockquote className="mb-7 text-[16px] leading-7 text-charcoal">
        {review.quote}
      </blockquote>

      <div className="flex flex-col gap-3 border-t border-sand pt-4 sm:flex-row sm:items-center sm:justify-between">
        <RatingStars rating={review.rating} />
        <span className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {review.trip}
        </span>
      </div>
    </article>
  );
}

export function ReviewsTeaser({ reviews }: ReviewsTeaserProps) {
  const [featuredReview, ...supportingReviews] = reviews;

  if (!featuredReview) {
    return null;
  }

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:items-stretch">
      <FeaturedReview review={featuredReview} />

      <div className="grid gap-4 md:gap-5">
        {supportingReviews.slice(0, 2).map((review, index) => (
          <SupportingReview key={review.id} review={review} index={index} />
        ))}
      </div>
    </div>
  );
}
