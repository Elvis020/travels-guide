"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Header, Footer, WhatsAppButton } from "@/components/layout";
import {
  Button,
  Badge,
  CategoryBadge,
  DifficultyBadge,
  SpotsLeftBadge,
} from "@/components/ui";
import { TripCard } from "@/components/trips/TripCard";
import {
  getTripBySlug,
  mockTrips,
  getReviewsByTripId,
  getAverageRating,
} from "@/data/trips";
import { useWishlistStore } from "@/stores/wishlist";
import { cn } from "@/lib/utils";
import {
  formatPrice,
  formatDateRange,
  formatDate,
  getSpotsRemaining,
  isAlmostFull,
  daysUntil,
} from "@/lib/utils";
import {
  Heart,
  Share2,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Utensils,
  Bed,
  ArrowRight,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Trip Detail Page
// Comprehensive trip information with booking
// ═══════════════════════════════════════════════════════════════════════════

export default function TripDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const trip = getTripBySlug(slug);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!trip) {
    return <TripNotFound />;
  }

  const reviews = getReviewsByTripId(trip.id);
  const averageRating = getAverageRating(trip.id);
  const spotsRemaining = getSpotsRemaining(trip.maxParticipants, trip.currentBookings);
  const almostFull = isAlmostFull(trip.maxParticipants, trip.currentBookings);
  const daysUntilTrip = daysUntil(trip.dates.start);

  // Related trips (same type, excluding current)
  const relatedTrips = mockTrips
    .filter((t) => t.type === trip.type && t.id !== trip.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero Gallery */}
        <HeroGallery trip={trip} />

        {/* Main Content */}
        <div className="container-wide py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Trip Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Title Section */}
              <TitleSection
                trip={trip}
                averageRating={averageRating}
                reviewCount={reviews.length}
              />

              {/* Quick Info */}
              <QuickInfo trip={trip} daysUntilTrip={daysUntilTrip} />

              {/* Description */}
              <section>
                <h2 className="font-display text-2xl font-semibold text-ink mb-4">
                  About This Trip
                </h2>
                <p className="text-charcoal/70 leading-relaxed">{trip.description}</p>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="font-display text-2xl font-semibold text-ink mb-4">
                  Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trip.highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-1 bg-primary/20 rounded-full mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-charcoal/70">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Itinerary */}
              <ItinerarySection itinerary={trip.itinerary} />

              {/* Includes/Excludes */}
              <IncludesExcludesSection included={trip.included} excluded={trip.excluded} />

              {/* Meeting Point */}
              <section>
                <h2 className="font-display text-2xl font-semibold text-ink mb-4">
                  Meeting Point
                </h2>
                <div className="bg-sand rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink mb-1">
                        {trip.meetingPoint.name}
                      </h4>
                      {trip.meetingPoint.address && (
                        <p className="text-charcoal/60">{trip.meetingPoint.address}</p>
                      )}
                      {trip.meetingPoint.mapUrl && (
                        <a
                          href={trip.meetingPoint.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary font-medium mt-2 hover:underline"
                        >
                          View on map
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <ReviewsSection reviews={reviews} averageRating={averageRating} />
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <BookingCard
                trip={trip}
                spotsRemaining={spotsRemaining}
                almostFull={almostFull}
                daysUntilTrip={daysUntilTrip}
              />
            </div>
          </div>

          {/* Related Trips */}
          {relatedTrips.length > 0 && (
            <section className="mt-16 pt-16 border-t border-sand">
              <h2 className="font-display text-2xl font-semibold text-ink mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTrips.map((relatedTrip) => (
                  <TripCard
                    key={relatedTrip.id}
                    trip={relatedTrip}
                    rating={getAverageRating(relatedTrip.id)}
                    reviewCount={getReviewsByTripId(relatedTrip.id).length}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="1234567890" />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Hero Gallery Component
// ═══════════════════════════════════════════════════════════════════════════

function HeroGallery({ trip }: { trip: NonNullable<ReturnType<typeof getTripBySlug>> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const allImages = [trip.coverImage, ...trip.images];

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () =>
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] bg-secondary overflow-hidden">
      {/* Main Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={allImages[activeIndex].url}
          alt={allImages[activeIndex].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Navigation Arrows */}
      {allImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {allImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-16 h-12 rounded-lg overflow-hidden border-2 transition-all",
                activeIndex === index
                  ? "border-white scale-110"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Title Section
// ═══════════════════════════════════════════════════════════════════════════

function TitleSection({
  trip,
  averageRating,
  reviewCount,
}: {
  trip: NonNullable<ReturnType<typeof getTripBySlug>>;
  averageRating: number;
  reviewCount: number;
}) {
  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(trip.id);

  return (
    <div>
      {/* Breadcrumb */}
      <Link
        href="/trips"
        className="inline-flex items-center gap-1 text-sm text-stone hover:text-primary transition-colors mb-4"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to trips
      </Link>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <CategoryBadge type={trip.type} />
        <DifficultyBadge level={trip.difficulty} />
        {trip.featured && (
          <Badge variant="warning" icon={<Star className="w-3 h-3" />}>
            Featured
          </Badge>
        )}
      </div>

      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
            {trip.title}
          </h1>
          {trip.subtitle && (
            <p className="text-lg text-primary font-medium">{trip.subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(trip.id)}
            className={cn(
              "p-3 rounded-xl border-2 transition-colors",
              isWishlisted
                ? "bg-primary border-primary text-white"
                : "border-sand hover:border-primary"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          </motion.button>
          <button
            className="p-3 rounded-xl border-2 border-sand hover:border-primary transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Location & Rating */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-charcoal/60">
        <div className="flex items-center gap-1">
          <MapPin className="w-5 h-5" />
          <span>
            {trip.destination}, {trip.country}
          </span>
        </div>
        {reviewCount > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="font-medium text-ink">{averageRating.toFixed(1)}</span>
            <span>({reviewCount} reviews)</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Quick Info Grid
// ═══════════════════════════════════════════════════════════════════════════

function QuickInfo({
  trip,
  daysUntilTrip,
}: {
  trip: NonNullable<ReturnType<typeof getTripBySlug>>;
  daysUntilTrip: number;
}) {
  const infoItems = [
    {
      icon: Calendar,
      label: "Dates",
      value: formatDateRange(trip.dates.start, trip.dates.end),
      subtext: daysUntilTrip > 0 ? `In ${daysUntilTrip} days` : "Started",
    },
    {
      icon: Clock,
      label: "Duration",
      value: `${trip.duration} ${trip.duration === 1 ? "day" : "days"}`,
      subtext: trip.duration > 1 ? `${trip.duration - 1} nights` : "Day trip",
    },
    {
      icon: Users,
      label: "Group Size",
      value: `Max ${trip.maxParticipants}`,
      subtext: `${trip.currentBookings} booked`,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {infoItems.map((item) => (
        <div key={item.label} className="bg-sand rounded-xl p-4">
          <item.icon className="w-5 h-5 text-primary mb-2" />
          <div className="text-xs text-stone uppercase tracking-wider mb-1">
            {item.label}
          </div>
          <div className="font-semibold text-ink">{item.value}</div>
          <div className="text-sm text-charcoal/60">{item.subtext}</div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Itinerary Section
// ═══════════════════════════════════════════════════════════════════════════

function ItinerarySection({
  itinerary,
}: {
  itinerary: NonNullable<ReturnType<typeof getTripBySlug>>["itinerary"];
}) {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-ink mb-6">
        Day-by-Day Itinerary
      </h2>
      <div className="space-y-4">
        {itinerary.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border border-sand rounded-xl overflow-hidden"
          >
            {/* Day Header */}
            <button
              onClick={() => setExpandedDay(expandedDay === index ? null : index)}
              className="w-full flex items-center justify-between p-4 hover:bg-sand transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
                  {day.day}
                </span>
                <div className="text-left">
                  <h4 className="font-semibold text-ink">{day.title}</h4>
                  <p className="text-sm text-stone">{day.activities.length} activities</p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-stone transition-transform",
                  expandedDay === index && "rotate-180"
                )}
              />
            </button>

            {/* Day Content */}
            <AnimatePresence>
              {expandedDay === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 space-y-4">
                    <p className="text-charcoal/70">{day.description}</p>

                    {/* Activities */}
                    <div className="space-y-2">
                      {day.activities.map((activity, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-charcoal/70">{activity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Meals & Accommodation */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      {day.meals && day.meals.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-charcoal/60">
                          <Utensils className="w-4 h-4" />
                          <span className="capitalize">{day.meals.join(", ")}</span>
                        </div>
                      )}
                      {day.accommodation && (
                        <div className="flex items-center gap-2 text-sm text-charcoal/60">
                          <Bed className="w-4 h-4" />
                          <span>{day.accommodation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Includes/Excludes Section
// ═══════════════════════════════════════════════════════════════════════════

function IncludesExcludesSection({
  included,
  excluded,
}: {
  included: string[];
  excluded: string[];
}) {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="bg-success/10 rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg text-ink mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-success" />
          What's Included
        </h3>
        <ul className="space-y-2">
          {included.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-charcoal/70">
              <Check className="w-4 h-4 text-success mt-1 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-error/10 rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg text-ink mb-4 flex items-center gap-2">
          <X className="w-5 h-5 text-error" />
          Not Included
        </h3>
        <ul className="space-y-2">
          {excluded.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-charcoal/70">
              <X className="w-4 h-4 text-error mt-1 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Reviews Section
// ═══════════════════════════════════════════════════════════════════════════

function ReviewsSection({
  reviews,
  averageRating,
}: {
  reviews: ReturnType<typeof getReviewsByTripId>;
  averageRating: number;
}) {
  if (reviews.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Reviews ({reviews.length})
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-5 h-5",
                  star <= Math.round(averageRating)
                    ? "text-primary fill-primary"
                    : "text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="font-semibold text-ink">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-sand pb-6 last:border-0">
            <div className="flex items-start gap-4">
              <img
                src={
                  review.userAvatar ||
                  `https://ui-avatars.com/api/?name=${review.userName}&background=random`
                }
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-ink">{review.userName}</h4>
                    <div className="flex items-center gap-2 text-sm text-stone">
                      <div className="flex items-center gap-0.5">
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
                      <span>•</span>
                      <span>{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                  {review.verified && (
                    <Badge variant="success" size="sm">
                      Verified
                    </Badge>
                  )}
                </div>
                <h5 className="font-medium text-ink mt-3">{review.title}</h5>
                <p className="text-charcoal/70 mt-1">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Booking Card (Sticky Sidebar)
// ═══════════════════════════════════════════════════════════════════════════

function BookingCard({
  trip,
  spotsRemaining,
  almostFull,
  daysUntilTrip,
}: {
  trip: NonNullable<ReturnType<typeof getTripBySlug>>;
  spotsRemaining: number;
  almostFull: boolean;
  daysUntilTrip: number;
}) {
  const [travelers, setTravelers] = useState(1);
  const totalPrice = trip.price * travelers;

  const isSoldOut = spotsRemaining === 0;
  const canBook = !isSoldOut && daysUntilTrip > 0;

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-2xl shadow-xl border border-sand overflow-hidden">
        {/* Price Header */}
        <div className="p-6 border-b border-sand">
          <div className="flex items-baseline gap-2">
            {trip.originalPrice && (
              <span className="text-lg text-stone line-through">
                {formatPrice(trip.originalPrice, trip.currency)}
              </span>
            )}
            <span className="text-3xl font-bold text-primary">
              {formatPrice(trip.price, trip.currency)}
            </span>
          </div>
          <span className="text-charcoal/60">per person</span>

          {/* Discount badge */}
          {trip.originalPrice && (
            <Badge variant="error" className="mt-2">
              Save {Math.round((1 - trip.price / trip.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Booking Form */}
        <div className="p-6 space-y-4">
          {/* Date display */}
          <div className="flex items-center gap-3 p-3 bg-sand rounded-xl">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-stone">Trip dates</div>
              <div className="font-medium text-ink">
                {formatDateRange(trip.dates.start, trip.dates.end)}
              </div>
            </div>
          </div>

          {/* Travelers selector */}
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Number of travelers
            </label>
            <div className="flex items-center border-2 border-sand rounded-xl overflow-hidden">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="px-4 py-3 hover:bg-sand transition-colors"
                disabled={travelers <= 1}
              >
                -
              </button>
              <span className="flex-1 text-center font-medium">{travelers}</span>
              <button
                onClick={() => setTravelers(Math.min(spotsRemaining, travelers + 1))}
                className="px-4 py-3 hover:bg-sand transition-colors"
                disabled={travelers >= spotsRemaining}
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-4 border-t border-sand">
            <span className="text-charcoal/70">Total</span>
            <span className="text-2xl font-bold text-ink">
              {formatPrice(totalPrice, trip.currency)}
            </span>
          </div>

          {/* Spots remaining */}
          {(almostFull || isSoldOut) && (
            <SpotsLeftBadge
              spots={spotsRemaining}
              maxSpots={trip.maxParticipants}
              className="w-full justify-center"
            />
          )}

          {/* Book button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!canBook}
            className="mt-4"
          >
            {isSoldOut ? "Sold Out" : daysUntilTrip <= 0 ? "Trip Started" : "Book Now"}
          </Button>

          {/* Reassurance */}
          <p className="text-center text-sm text-stone">
            Free cancellation up to 7 days before
          </p>
        </div>

        {/* Quick contact */}
        <div className="p-4 bg-sand border-t border-sand">
          <p className="text-sm text-charcoal/70 text-center">
            Have questions?{" "}
            <a href="/contact" className="text-primary font-medium hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Trip Not Found
// ═══════════════════════════════════════════════════════════════════════════

function TripNotFound() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-12 h-12 text-stone" />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink mb-4">
            Trip Not Found
          </h1>
          <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the trip you're looking for. It may have been
            removed or the link might be incorrect.
          </p>
          <Link href="/trips">
            <Button variant="primary">Browse All Trips</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
