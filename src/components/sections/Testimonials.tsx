"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockReviews } from "@/data/trips";
import { Star, Quote, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Testimonials Section - Modern Mono
// Clean, minimal social proof with gold accents
// ═══════════════════════════════════════════════════════════════════════════

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Take top 3 reviews for cleaner layout
  const topReviews = [...mockReviews]
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, 3);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container-wide relative">
        {/* Header - Left aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-6"
            >
              Trusted by
              <br />
              <span className="text-primary">Thousands</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg max-w-md"
            >
              Real experiences from real travelers. Join thousands who have explored Ghana with us.
            </motion.p>
          </div>

          {/* Stats - Right side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8 lg:pt-8"
          >
            {[
              { value: "4.9", label: "Rating", suffix: "/5" },
              { value: "2.5K", label: "Travelers" },
              { value: "98%", label: "Recommend" },
              { value: "50+", label: "Destinations" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-display font-bold text-ink mb-1">
                  {stat.value}
                  {stat.suffix && <span className="text-primary text-2xl">{stat.suffix}</span>}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Reviews - Horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <TestimonialCard review={review} featured={index === 0} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-12"
        >
          <a
            href="/reviews"
            className="group inline-flex items-center gap-3 text-ink font-medium hover:text-primary transition-colors"
          >
            <span>Read all reviews</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Testimonial Card - Modern Mono Style
// ═══════════════════════════════════════════════════════════════════════════

interface TestimonialCardProps {
  review: (typeof mockReviews)[0];
  featured?: boolean;
}

function TestimonialCard({ review, featured }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-8 h-full border transition-all duration-300 hover:shadow-lg",
        featured ? "border-primary/30" : "border-gray-100"
      )}
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary/30 mb-6" />

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= review.rating
                ? "text-primary fill-primary"
                : "text-gray-200"
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-6 leading-relaxed line-clamp-4">
        "{review.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <img
          src={review.userAvatar || `https://ui-avatars.com/api/?name=${review.userName}&background=E5E5E5&color=0F0F0F`}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover grayscale"
        />
        <div>
          <div className="font-semibold text-ink">{review.userName}</div>
          {review.verified && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
