"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Review } from "@/data/reviews";

interface ReviewsCarouselProps {
  reviews: Review[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  // Duplicate reviews for seamless infinite scroll (desktop)
  const duplicatedReviews = [...reviews, ...reviews];

  // Auto-rotate for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Review Card Component
  const ReviewCard = ({ review }: { review: Review }) => (
    <div className="flex-shrink-0 w-full md:w-[400px] bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {/* Image with subtle zoom animation */}
        <div className="relative flex-shrink-0 group">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20">
            <Image
              src={review.image}
              alt={review.name}
              width={64}
              height={64}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Quote className="w-3 h-3 !text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink text-base mb-1 truncate">
            {review.name}
          </h3>
          <p className="text-charcoal/60 text-xs mb-2 truncate">
            {review.location}
          </p>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-primary text-primary"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-charcoal text-sm leading-relaxed mb-4 line-clamp-4">
        "{review.quote}"
      </blockquote>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100">
        <span className="text-primary text-xs font-medium">
          {review.trip}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: Simple shuffle view */}
      <div className="md:hidden">
        <div className="relative overflow-hidden">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`transition-all duration-500 ${
                index === currentMobileIndex
                  ? "opacity-100 relative"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMobileIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentMobileIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-charcoal/20"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Infinite scroll */}
      <div className="hidden md:block relative overflow-hidden">
        {/* Infinite scroll container */}
        <div
          className="flex gap-6"
          style={{
            animation: isPaused ? "none" : "scroll 40s linear infinite",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedReviews.map((review, index) => (
            <div key={`${review.id}-${index}`}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* CSS animation */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-400px * ${reviews.length} - ${reviews.length * 24}px));
            }
          }
        `}</style>
      </div>
    </>
  );
}
