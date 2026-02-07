"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { TripCard } from "@/components/trips/TripCard";
import { getFeaturedTrips, getAverageRating, getReviewsByTripId } from "@/data/trips";
import { ArrowRight, Sparkles } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Featured Trips Section - Modern Mono
// Clean, editorial layout with gold accents
// ═══════════════════════════════════════════════════════════════════════════

type FilterType = "all" | "local" | "international";

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Local", value: "local" },
  { label: "International", value: "international" },
];

export function FeaturedTrips() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const allFeatured = getFeaturedTrips();

  const filteredTrips =
    activeFilter === "all"
      ? allFeatured
      : allFeatured.filter((trip) => trip.type === activeFilter);

  return (
    <section className="py-24 bg-white relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium tracking-wide uppercase text-sm">
                Featured Experiences
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight"
            >
              Curated for the
              <br />
              <span className="text-primary">Discerning</span> Traveler
            </motion.h2>
          </div>

          {/* Filter tabs - Minimal style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-1 border border-gray-200 rounded-full p-1"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === filter.value
                    ? "bg-ink text-white"
                    : "text-gray-500 hover:text-ink"
                )}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured trip (large) */}
        {filteredTrips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <TripCard
              trip={filteredTrips[0]}
              variant="featured"
              rating={getAverageRating(filteredTrips[0].id)}
              reviewCount={getReviewsByTripId(filteredTrips[0].id).length}
            />
          </motion.div>
        )}

        {/* Trip grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTrips.slice(1, 4).map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TripCard
                  trip={trip}
                  rating={getAverageRating(trip.id)}
                  reviewCount={getReviewsByTripId(trip.id).length}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View all button - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <a
            href="/trips"
            className="group inline-flex items-center gap-3 text-ink font-medium hover:text-primary transition-colors"
          >
            <span className="text-lg">View All Experiences</span>
            <span className="w-10 h-10 rounded-full border border-gray-300 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all">
              <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedTrips;
