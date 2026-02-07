"use client";

import { motion } from "framer-motion";
import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { TripCard } from "@/components/trips/TripCard";
import { mockTrips, getAverageRating, getReviewsByTripId } from "@/data/trips";
import { MapPin, Compass } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Trip Listings Page - Safari Editorial
// Browse all available trips with featured hero
// ═══════════════════════════════════════════════════════════════════════════

export default function TripsPage() {
  // Separate featured trip from regular trips
  const featuredTrip = mockTrips.find((trip) => trip.featured);
  const regularTrips = mockTrips.filter((trip) => !trip.featured);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-secondary py-24 md:py-32 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/50" />

          {/* Decorative compass icon */}
          <div className="absolute top-12 right-12 !text-white/5 hidden lg:block">
            <Compass className="w-32 h-32" />
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-5xl md:text-7xl lg:text-8xl !text-white leading-[1.05] mb-6"
              >
                Your Next
                <br />
                <span className="text-primary">Adventure Awaits</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="h-px w-12 bg-primary/30" />
                <span className="!text-white/50 text-sm font-medium uppercase tracking-wider">
                  Handcrafted Journeys Across Ghana
                </span>
                <div className="h-px w-12 bg-primary/30" />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-lg md:text-xl !text-white/60 leading-relaxed max-w-2xl mx-auto"
              >
                From cultural immersions to coastal escapes, each trip is
                designed for small groups seeking authentic experiences beyond
                the guidebook.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Featured Trip Section */}
        {featuredTrip && (
          <section className="py-16 md:py-24 bg-cream">
            <div className="container-wide">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-px bg-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Featured Adventure
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-ink">
                  Our Most Popular Journey
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <TripCard
                  trip={featuredTrip}
                  variant="featured"
                  rating={getAverageRating(featuredTrip.id)}
                  reviewCount={getReviewsByTripId(featuredTrip.id).length}
                />
              </motion.div>
            </div>
          </section>
        )}

        {/* All Trips Section */}
        <section className="py-16 md:py-24 bg-sand">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  All Destinations
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <h2 className="font-display text-3xl md:text-4xl text-ink">
                  Choose Your Experience
                </h2>
              </div>
            </motion.div>

            {/* Equal height grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {regularTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="h-full"
                >
                  <TripCard
                    trip={trip}
                    variant="default"
                    rating={getAverageRating(trip.id)}
                    reviewCount={getReviewsByTripId(trip.id).length}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MapPin className="w-12 h-12 !text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display !text-white mb-4">
                Can't Decide?
              </h2>
              <p className="text-lg !text-white/60 mb-8 max-w-2xl mx-auto">
                Every trip is customizable. Reach out and we'll craft the
                perfect itinerary for your interests, schedule, and budget.
              </p>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Chat With Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="1234567890" />
    </>
  );
}
