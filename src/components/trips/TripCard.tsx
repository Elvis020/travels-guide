"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice, formatDateRange, getSpotsRemaining, isAlmostFull } from "@/lib/utils";
import { Card, CardImage, CategoryBadge, DifficultyBadge, SpotsLeftBadge } from "@/components/ui";
import { useWishlistStore } from "@/stores/wishlist";
import { Heart, Calendar, MapPin, Users, Clock, Star } from "lucide-react";
import type { Trip } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
// Trip Card Component - Modern Mono
// Display trip preview with gold accents
// ═══════════════════════════════════════════════════════════════════════════

interface TripCardProps {
  trip: Trip;
  variant?: "default" | "featured" | "compact";
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

export default TripCard;
