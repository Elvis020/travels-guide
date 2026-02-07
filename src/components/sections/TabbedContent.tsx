"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  Star,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Heart,
  Quote,
  Calendar,
  TrendingUp,
  Award,
  Verified,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { mockTrips } from "@/data/trips";
import type { Trip } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
// Tabbed Content Section - Minimal Scrolling Design
// TripAdvisor-inspired tabs for Trips and Reviews
// ═══════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "trips", label: "Popular Trips", icon: MapPin },
  { id: "reviews", label: "Traveler Reviews", icon: Star },
  { id: "trending", label: "Trending Now", icon: TrendingUp },
] as const;

type TabId = typeof TABS[number]["id"];

// Mock reviews data
const MOCK_REVIEWS = [
  {
    id: "1",
    author: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    location: "New York, USA",
    rating: 5,
    title: "Life-changing experience!",
    content: "The Maasai Mara safari exceeded all expectations. Our guide knew exactly where to find the wildlife, and we witnessed the Great Migration. Truly unforgettable!",
    trip: "Maasai Mara Safari Adventure",
    date: "December 2024",
    verified: true,
    helpful: 47,
  },
  {
    id: "2",
    author: "James K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    location: "London, UK",
    rating: 5,
    title: "Cape Coast moved me deeply",
    content: "The historical significance of Cape Coast Castle combined with the beautiful coastal scenery made this trip incredibly meaningful. Our guide shared stories that brought history to life.",
    trip: "Cape Coast Heritage Tour",
    date: "November 2024",
    verified: true,
    helpful: 35,
  },
  {
    id: "3",
    author: "Amara N.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
    location: "Toronto, Canada",
    rating: 5,
    title: "Perfect blend of culture & adventure",
    content: "From the bustling markets of Accra to the serene beaches of Elmina, every moment was carefully curated. The food tours alone were worth the trip!",
    trip: "Ghana Cultural Immersion",
    date: "October 2024",
    verified: true,
    helpful: 28,
  },
];

export function TabbedContent() {
  const [activeTab, setActiveTab] = useState<TabId>("trips");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-cream relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-wide relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
            Explore & Discover
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink mb-4">
            Your Next Adventure
          </h2>
          <p className="text-earth max-w-xl mx-auto">
            Browse our curated collection of African experiences, rated and reviewed
            by thousands of happy travelers.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg shadow-ink/5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300
                  flex items-center gap-2
                  ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-earth hover:text-ink"
                  }
                `}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-secondary rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "trips" && <TripsGrid trips={mockTrips.slice(0, 4)} />}
            {activeTab === "reviews" && <ReviewsSection />}
            {activeTab === "trending" && <TrendingSection />}
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href={activeTab === "reviews" ? "/reviews" : "/trips"}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300"
          >
            View all {activeTab === "reviews" ? "reviews" : "trips"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Trips Grid - TripAdvisor Style Cards
// ═══════════════════════════════════════════════════════════════════════════

function TripsGrid({ trips }: { trips: Trip[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trips.map((trip, index) => (
        <TripCard key={trip.id} trip={trip} index={index} />
      ))}
    </div>
  );
}

function TripCard({ trip, index }: { trip: Trip; index: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate mock rating
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/trips/${trip.slug}`}>
        <motion.div
          className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500"
          animate={{
            y: isHovered ? -8 : 0,
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Image container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              src={trip.images[0]?.url || "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600"}
              alt={trip.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.7 }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

            {/* Wishlist button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className={`
                absolute top-4 right-4 w-10 h-10 rounded-full
                flex items-center justify-center transition-all duration-300
                ${isLiked ? "bg-primary text-white" : "bg-white/90 text-ink hover:bg-white"}
              `}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>

            {/* Badge */}
            {trip.originalPrice && trip.originalPrice > trip.price && (
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                {Math.round((1 - trip.price / trip.originalPrice) * 100)}% OFF
              </div>
            )}

            {/* Location */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
              <MapPin className="w-4 h-4" />
              {trip.destination}, {trip.country}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Rating - TripAdvisor style */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(rating)
                        ? "text-rating fill-rating"
                        : "text-stone"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-earth">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl font-semibold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {trip.title}
            </h3>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-earth mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {trip.duration} days
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {trip.maxParticipants - trip.currentBookings} spots left
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                {trip.originalPrice && trip.originalPrice > trip.price && (
                  <span className="text-sm text-stone line-through mr-2">
                    ${trip.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-ink">
                  ${trip.price}
                </span>
                <span className="text-sm text-earth"> / person</span>
              </div>
              <span className="text-xs text-secondary font-medium px-2 py-1 bg-secondary/10 rounded-full">
                {trip.category}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Reviews Section - TripAdvisor Inspired
// ═══════════════════════════════════════════════════════════════════════════

function ReviewsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Overall rating card */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl p-8 shadow-md h-full">
          <div className="text-center">
            <div className="text-6xl font-bold text-ink mb-2">4.9</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-6 h-6 text-rating fill-rating"
                />
              ))}
            </div>
            <p className="text-earth mb-6">Based on 2,847 reviews</p>

            {/* Rating breakdown */}
            <div className="space-y-3">
              {[
                { label: "Excellent", count: 2456, percent: 86 },
                { label: "Very Good", count: 298, percent: 10 },
                { label: "Average", count: 65, percent: 2 },
                { label: "Poor", count: 20, percent: 1 },
                { label: "Terrible", count: 8, percent: 0.3 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-sm text-earth w-20 text-left">
                    {item.label}
                  </span>
                  <div className="flex-1 h-2 bg-sand rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-sm text-stone w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                <Award className="w-3 h-3" />
                Travelers' Choice
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                <TrendingUp className="w-3 h-3" />
                Top Rated 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Individual reviews */}
      <div className="lg:col-span-2 space-y-4">
        {MOCK_REVIEWS.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink">
                        {review.author}
                      </span>
                      {review.verified && (
                        <Verified className="w-4 h-4 text-secondary" />
                      )}
                    </div>
                    <span className="text-sm text-earth">{review.location}</span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-rating fill-rating"
                            : "text-stone"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review content */}
                <h4 className="font-semibold text-ink mb-1">{review.title}</h4>
                <p className="text-earth text-sm leading-relaxed mb-3">
                  {review.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-stone">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {review.date}
                    </span>
                    <span className="text-secondary font-medium">
                      {review.trip}
                    </span>
                  </div>
                  <button className="text-earth hover:text-primary transition-colors">
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Trending Section
// ═══════════════════════════════════════════════════════════════════════════

function TrendingSection() {
  const trendingTrips = mockTrips.slice(0, 3);

  return (
    <div className="relative">
      {/* Large featured card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main featured */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:row-span-2 rounded-3xl overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200"
            alt="Featured Safari"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                #1 Trending
              </span>
              <span className="flex items-center gap-1 text-white text-sm">
                <TrendingUp className="w-4 h-4" />
                +45% bookings this week
              </span>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-2">
              Maasai Mara Safari Adventure
            </h3>
            <p className="text-white/80 mb-4 max-w-md">
              Experience the Great Migration and witness the Big Five in their natural habitat.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-white">
                <Star className="w-5 h-5 text-rating fill-rating" />
                <span className="font-semibold">4.9</span>
                <span className="text-white/60">(847 reviews)</span>
              </div>
              <span className="text-2xl font-bold text-white">
                From $1,299
              </span>
            </div>
          </div>
        </div>

        {/* Side cards */}
        {trendingTrips.slice(1, 3).map((trip, index) => (
          <Link
            key={trip.id}
            href={`/trips/${trip.slug}`}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
          >
            <img
              src={trip.images[0]?.url || "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600"}
              alt={trip.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-primary text-sm font-medium mb-1">
                #{index + 2} Trending
              </span>
              <h4 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {trip.title}
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <Star className="w-4 h-4 text-rating fill-rating" />
                  4.8 (234)
                </div>
                <span className="font-semibold text-white">
                  ${trip.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TabbedContent;
