"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice, formatDateRange, getSpotsRemaining, isAlmostFull } from "@/lib/utils";
import { AppImage as Image, Card, CardImage, Link, SpotsLeftBadge } from "@/components/ui";
import { useWishlistStore } from "@/stores/wishlist";
import { UrgencyBadge } from "./UrgencyBadge";
import { Heart, Calendar, MapPin, Users, Clock, Star, Check } from "lucide-react";
import type { Trip } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
// Trip Card Component - Modern Mono
// Display trip preview with gold accents
// ═══════════════════════════════════════════════════════════════════════════

interface TripCardProps {
  trip: Trip;
  variant?: "default" | "featured" | "compact" | "departure";
  showWishlist?: boolean;
  rating?: number;
  reviewCount?: number;
}

export function TripCard({
  trip,
  variant = "default",
  showWishlist = true,
  rating,
  reviewCount,
}: TripCardProps) {
  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(trip.id);
  const spotsRemaining = getSpotsRemaining(trip.maxParticipants, trip.currentBookings);
  const almostFull = isAlmostFull(trip.maxParticipants, trip.currentBookings);

  // Calculate days until booking deadline
  const daysUntilDeadline = trip.bookingDeadline
    ? Math.ceil((new Date(trip.bookingDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const showUrgency = daysUntilDeadline !== null && daysUntilDeadline > 0 && daysUntilDeadline <= 90;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(trip.id);
  };

  if (variant === "featured") {
    return (
      <FeaturedTripCard
        trip={trip}
        isWishlisted={isWishlisted}
        onWishlistToggle={handleWishlistToggle}
        spotsRemaining={spotsRemaining}
        almostFull={almostFull}
        rating={rating}
        reviewCount={reviewCount}
      />
    );
  }

  if (variant === "compact") {
    return (
      <CompactTripCard
        trip={trip}
        isWishlisted={isWishlisted}
        onWishlistToggle={handleWishlistToggle}
      />
    );
  }

  if (variant === "departure") {
    return (
      <DepartureTripCard
        trip={trip}
        spotsRemaining={spotsRemaining}
        almostFull={almostFull}
        showUrgency={showUrgency}
        daysUntilDeadline={daysUntilDeadline}
        showWishlist={showWishlist}
      />
    );
  }

  return (
    <Link href={`/trips/${trip.slug}`} className="block group cursor-pointer">
      <Card className="h-full flex flex-col">
        {/* Image */}
        <div className="relative">
          <CardImage
            src={trip.coverImage.url}
            alt={trip.coverImage.alt}
            aspectRatio="video"
            overlay
          >
            {/* Badges and Wishlist */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
              <div className="flex flex-wrap gap-2">
                {trip.originalPrice && (
                  <span className="bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
                    {Math.round((1 - trip.price / trip.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              {showWishlist && (
                <motion.button
                  onClick={handleWishlistToggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-full backdrop-blur-sm transition-colors",
                    isWishlisted
                      ? "bg-primary text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  )}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    className={cn("w-5 h-5", isWishlisted && "fill-current")}
                  />
                </motion.button>
              )}
            </div>

            {/* Corner Flag Badge */}
            {showUrgency && daysUntilDeadline && (
              <UrgencyBadge daysUntilDeadline={daysUntilDeadline} />
            )}

            {/* Bottom overlay content */}
            <div className="text-white">
              <div className="flex items-center gap-1 text-sm mb-1">
                <MapPin className="w-4 h-4" />
                <span>{trip.destination}, {trip.country}</span>
              </div>
            </div>
          </CardImage>

          {/* Spots indicator */}
          {(almostFull || spotsRemaining === 0) && (
            <div className="absolute bottom-3 right-3">
              <SpotsLeftBadge spots={spotsRemaining} maxSpots={trip.maxParticipants} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-display font-semibold text-lg text-ink mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {trip.title}
          </h3>

          <p className="text-sm text-charcoal/60 line-clamp-2 mb-3">
            {trip.shortDescription}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal/60 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDateRange(trip.dates.start, trip.dates.end)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{trip.duration} days</span>
            </div>
          </div>

          {/* Rating */}
          {rating !== undefined && (
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="font-medium text-ink">{rating.toFixed(1)}</span>
              {reviewCount !== undefined && (
                <span className="text-sm text-charcoal/60">({reviewCount} reviews)</span>
              )}
            </div>
          )}

          {/* Price and CTA */}
          <div className="mt-auto pt-3 border-t border-sand flex items-end justify-between">
            <div>
              {trip.originalPrice && (
                <span className="text-sm text-stone line-through mr-2">
                  {formatPrice(trip.originalPrice, trip.currency)}
                </span>
              )}
              <span className="text-xl font-bold text-primary">
                {formatPrice(trip.price, trip.currency)}
              </span>
              <span className="text-sm text-charcoal/60"> / person</span>
            </div>
            <span className="text-sm font-medium text-primary group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Featured Trip Card (Larger, hero-style)
// ═══════════════════════════════════════════════════════════════════════════

interface FeaturedTripCardProps {
  trip: Trip;
  isWishlisted: boolean;
  onWishlistToggle: (e: React.MouseEvent) => void;
  spotsRemaining: number;
  almostFull: boolean;
  rating?: number;
  reviewCount?: number;
}

function FeaturedTripCard({
  trip,
  isWishlisted,
  onWishlistToggle,
  spotsRemaining,
  almostFull,
  rating,
  reviewCount,
}: FeaturedTripCardProps) {
  // Calculate days until booking deadline
  const daysUntilDeadline = trip.bookingDeadline
    ? Math.ceil((new Date(trip.bookingDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const showUrgency = daysUntilDeadline !== null && daysUntilDeadline > 0 && daysUntilDeadline <= 90;

  return (
    <Link href={`/trips/${trip.slug}`} className="block group cursor-pointer">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image side */}
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={trip.coverImage.url}
              alt={trip.coverImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />

            {/* Corner Flag Badge */}
            {showUrgency && daysUntilDeadline && (
              <UrgencyBadge daysUntilDeadline={daysUntilDeadline} />
            )}

            {/* Wishlist */}
            <motion.button
              onClick={onWishlistToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-colors",
                isWishlisted
                  ? "bg-primary text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
            </motion.button>
          </div>

          {/* Content side */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-2">
              <MapPin className="w-4 h-4" />
              {trip.destination}, {trip.country}
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {trip.title}
            </h3>

            {trip.subtitle && (
              <p className="text-lg text-primary mb-3 line-clamp-1">{trip.subtitle}</p>
            )}

            <p className="text-charcoal/70 mb-4 line-clamp-2">
              {trip.shortDescription}
            </p>


            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/60 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDateRange(trip.dates.start, trip.dates.end)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {trip.duration} days
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Max {trip.maxParticipants} travelers
              </div>
            </div>

            {/* Rating */}
            {rating !== undefined && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-5 h-5",
                        star <= Math.round(rating)
                          ? "text-primary fill-primary"
                          : "text-sand"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{rating.toFixed(1)}</span>
                {reviewCount !== undefined && (
                  <span className="text-charcoal/60">({reviewCount} reviews)</span>
                )}
              </div>
            )}

            {/* Price and availability */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-charcoal/60 mb-1">From</div>
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
                <div className="text-sm text-charcoal/60">per person</div>
              </div>

              <div className="text-right">
                {(almostFull || spotsRemaining === 0) && (
                  <SpotsLeftBadge
                    spots={spotsRemaining}
                    maxSpots={trip.maxParticipants}
                    className="mb-2"
                  />
                )}
                <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:underline">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Compact Trip Card (For sidebars, related trips)
// ═══════════════════════════════════════════════════════════════════════════

interface CompactTripCardProps {
  trip: Trip;
  isWishlisted: boolean;
  onWishlistToggle: (e: React.MouseEvent) => void;
}

function CompactTripCard({ trip, isWishlisted, onWishlistToggle }: CompactTripCardProps) {
  return (
    <Link href={`/trips/${trip.slug}`} className="block group cursor-pointer">
      <Card className="flex gap-4 p-3" hover={false}>
        {/* Thumbnail */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
          <Image
            src={trip.coverImage.url}
            alt={trip.coverImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="96px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-xs text-charcoal/60 mb-1">
            <MapPin className="w-3 h-3" />
            {trip.destination}
          </div>
          <h4 className="font-medium text-ink group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {trip.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-charcoal/60 mb-2">
            <span>{trip.duration} days</span>
            <span>•</span>
            <span>{formatDateRange(trip.dates.start, trip.dates.end)}</span>
          </div>
          <div className="font-bold text-primary">
            {formatPrice(trip.price, trip.currency)}
          </div>
        </div>

        {/* Wishlist */}
        <motion.button
          onClick={onWishlistToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="self-start p-1.5"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isWishlisted ? "text-primary fill-primary" : "text-stone hover:text-primary"
            )}
          />
        </motion.button>
      </Card>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Departure Trip Card (Booking-focused for homepage)
// ═══════════════════════════════════════════════════════════════════════════

interface DepartureTripCardProps {
  trip: Trip;
  spotsRemaining: number;
  almostFull: boolean;
  showUrgency: boolean;
  daysUntilDeadline: number | null;
  showWishlist?: boolean;
}

function DepartureTripCard({
  trip,
  spotsRemaining,
  almostFull,
  showUrgency,
  daysUntilDeadline,
  showWishlist = true,
}: DepartureTripCardProps) {
  const { toggle, has } = useWishlistStore();
  const isWishlisted = has(trip.id);
  const isFullyBooked = spotsRemaining === 0;
  const buttonText = isFullyBooked ? "Join Waitlist" : "Reserve My Spot";
  const buttonBg = isFullyBooked ? "bg-stone" : "bg-primary";

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(trip.id);
  };

  return (
    <Link href={`/trips/${trip.slug}`} className="block group cursor-pointer h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-cream rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col"
      >
        {/* Image with badges */}
        <div className="relative h-64">
          <Image
            src={trip.coverImage.url}
            alt={trip.coverImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Urgency badge (top-left) */}
          {showUrgency && daysUntilDeadline && (
            <UrgencyBadge daysUntilDeadline={daysUntilDeadline} />
          )}

          {/* Top-right badges */}
          <div className="absolute top-3 right-3 flex items-start gap-2">
            {/* Spots remaining badge */}
            {(almostFull || isFullyBooked) && (
              <SpotsLeftBadge
                spots={spotsRemaining}
                maxSpots={trip.maxParticipants}
              />
            )}

            {/* Wishlist button */}
            {showWishlist && (
              <motion.button
                onClick={handleWishlistToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-2 rounded-full backdrop-blur-sm transition-colors",
                  isWishlisted
                    ? "bg-primary text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                )}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn("w-5 h-5", isWishlisted && "fill-current")}
                />
              </motion.button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-display text-2xl text-ink mb-3 group-hover:text-primary transition-colors line-clamp-1">
            {trip.title}
          </h3>

          {/* Location and Date - Side by Side */}
          <div className="flex items-center gap-4 text-sm text-charcoal/70 mb-4">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{trip.destination}, {trip.country}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="truncate">{formatDateRange(trip.dates.start, trip.dates.end)}</span>
            </div>
          </div>

          {/* Group size */}
          <div className="flex items-center gap-2 text-charcoal/70 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span>Small group (max {trip.maxParticipants})</span>
          </div>

          {/* Highlights (up to 4) */}
          {trip.highlights.length > 0 && (
            <div className="space-y-2 mb-6">
              {trip.highlights.slice(0, 4).map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal/80">{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="mt-auto mb-4">
            <div className="text-4xl font-display text-primary font-bold">
              {formatPrice(trip.price, trip.currency)}
            </div>
            <div className="text-sm text-charcoal/60">/person</div>
          </div>

          {/* CTA Button */}
          <button
            className={cn(
              buttonBg,
              "w-full py-4 text-white font-bold rounded-full transition-all hover:shadow-lg",
              !isFullyBooked && "hover:bg-primary/90"
            )}
          >
            {buttonText}
          </button>
        </div>
      </motion.div>
    </Link>
  );
}

export default TripCard;
