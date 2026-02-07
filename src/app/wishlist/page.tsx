"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { Button } from "@/components/ui";
import { TripCard } from "@/components/trips/TripCard";
import { useWishlistStore, useWishlistTrips } from "@/stores/wishlist";
import { getAverageRating, getReviewsByTripId, getFeaturedTrips } from "@/data/trips";
import { formatPrice } from "@/lib/utils";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Wishlist Page
// View and manage saved trips
// ═══════════════════════════════════════════════════════════════════════════

export default function WishlistPage() {
  const wishlistTrips = useWishlistTrips();
  const { clear, items } = useWishlistStore();

  const totalValue = wishlistTrips.reduce((sum, trip) => sum + trip.price, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Page Header */}
        <section className="pt-32 md:pt-40 pb-8">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-display text-4xl md:text-5xl font-bold text-ink mb-2"
                >
                  My Wishlist
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-charcoal/60"
                >
                  {items.length === 0
                    ? "You haven't saved any trips yet"
                    : `${items.length} ${items.length === 1 ? "trip" : "trips"} saved`}
                </motion.p>
              </div>

              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <button
                    onClick={clear}
                    className="flex items-center gap-2 px-4 py-2 text-stone hover:text-error transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear all
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-wide">
            {items.length > 0 ? (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Trip Grid */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                      {wishlistTrips.map((trip, index) => (
                        <motion.div
                          key={trip.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.05 }}
                          layout
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
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-sand p-6">
                    <h3 className="font-display text-lg font-semibold text-ink mb-4">
                      Wishlist Summary
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-charcoal/60">
                        <span>Trips saved</span>
                        <span className="font-medium text-ink">{items.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-charcoal/60">
                        <span>Total value</span>
                        <span className="font-medium text-ink">
                          {formatPrice(totalValue, "USD")}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-sand pt-6 space-y-3">
                      <Button
                        variant="primary"
                        fullWidth
                        rightIcon={<ShoppingBag className="w-4 h-4" />}
                      >
                        Book All Trips
                      </Button>
                      <Link href="/trips" className="block">
                        <Button
                          variant="outline"
                          fullWidth
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                        >
                          Explore More
                        </Button>
                      </Link>
                    </div>

                    <p className="text-center text-sm text-stone mt-4">
                      Sign in to sync your wishlist across devices
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyWishlist />
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="1234567890" />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Empty Wishlist State
// ═══════════════════════════════════════════════════════════════════════════

function EmptyWishlist() {
  const featuredTrips = getFeaturedTrips();

  return (
    <div>
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto mb-12"
      >
        <p className="text-stone text-xs uppercase tracking-widest mb-4">
          Your Wishlist
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
          Nothing here yet
        </h2>

        <p className="text-charcoal/60 mb-8 leading-relaxed">
          Explore our trips and tap the heart to save your favorites.
        </p>

        <Link href="/trips">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Trips
          </Button>
        </Link>
      </motion.div>

      {/* Featured Trips Suggestions */}
      <div className="mt-16 pt-12 border-t border-sand">
        <p className="text-sm font-medium text-stone mb-6">
          Popular trips to get you started
        </p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <TripCard
                trip={trip}
                rating={getAverageRating(trip.id)}
                reviewCount={getReviewsByTripId(trip.id).length}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
