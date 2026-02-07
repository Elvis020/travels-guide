"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Header, Footer, WhatsAppButton } from "@/components/layout";
import { MasonryGrid } from "@/components/gallery";

// Lazy load Lightbox - only when user clicks an image
const Lightbox = dynamic(() => import("@/components/gallery/Lightbox").then(mod => ({ default: mod.Lightbox })), {
  ssr: false,
});
import {
  galleryItems,
  getFeaturedGalleryItems,
  getGalleryTripNames,
} from "@/data/gallery";
import { Camera, MapPin, Sparkles } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Gallery Page
// Masonry layout with lightbox
// ═══════════════════════════════════════════════════════════════════════════

export default function GalleryPage() {
  // Pagination state
  const [itemsToShow, setItemsToShow] = useState(10);
  const ITEMS_PER_PAGE = 10;

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Get unique trip names for stats
  const tripNames = getGalleryTripNames();

  // Items to display (paginated)
  const displayedItems = useMemo(() => {
    return galleryItems.slice(0, itemsToShow);
  }, [itemsToShow]);

  const hasMore = itemsToShow < galleryItems.length;

  const loadMore = () => {
    setItemsToShow((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, galleryItems.length),
    );
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-secondary">
        {/* Hero Section */}
        <section className="relative bg-secondary py-24 md:py-32 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/50" />

          {/* Decorative camera icon */}
          <div className="absolute top-12 right-12 !text-white/5 hidden lg:block">
            <Camera className="w-32 h-32" />
          </div>

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-7xl lg:text-8xl !text-white leading-[1.05] mb-6"
              >
                Ghana
                <br />
                <span className="text-primary">Through Our Lens</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="h-px w-12 bg-primary/30" />
                <Sparkles className="w-4 h-4 !text-primary" />
                <span className="!text-white/50 text-sm font-medium uppercase tracking-wider">
                  Moments From Our Adventures
                </span>
                <Sparkles className="w-4 h-4 !text-primary" />
                <div className="h-px w-12 bg-primary/30" />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl !text-white/60 leading-relaxed max-w-2xl mx-auto mb-12"
              >
                Real moments captured from real journeys. Every image tells a story of discovery, culture, and connection across Ghana's vibrant landscapes.
              </motion.p>

              {/* Stats Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <div className="group px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 inline-block mr-1.5 !text-primary" />
                  <span className="!text-white/70 group-hover:!text-white text-sm font-medium">{tripNames.length} Destinations</span>
                </div>
                <div className="group px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                  <Sparkles className="w-3.5 h-3.5 inline-block mr-1.5 !text-primary" />
                  <span className="!text-white/70 group-hover:!text-white text-sm font-medium">{getFeaturedGalleryItems().length} Featured</span>
                </div>
                <div className="group px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                  <Camera className="w-3.5 h-3.5 inline-block mr-1.5 !text-primary" />
                  <span className="!text-white/70 group-hover:!text-white text-sm font-medium">Curated Collection</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container-wide">
            {/* Masonry Grid */}
            <MasonryGrid
              items={displayedItems}
              onItemClick={openLightbox}
            />

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Load More Photos ({galleryItems.length - itemsToShow})
                  <span>→</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Spacer before footer */}
        <div className="py-12 bg-gray-50" />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="1234567890" />

      {/* Lightbox */}
      <Lightbox
        items={galleryItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
