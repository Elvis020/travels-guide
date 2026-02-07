"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  ExternalLink,
} from "lucide-react";
import type { GalleryItem } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
// Lightbox Component
// Full-screen image viewer with navigation and zoom
// ═══════════════════════════════════════════════════════════════════════════

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onIndexChange,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[var(--z-modal)] bg-black"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-white">
              <span className="font-medium">
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-full max-h-full"
              >
                <img
                  src={currentItem.url}
                  alt={currentItem.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Bottom Info & Thumbnails */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Caption */}
            {(currentItem.caption || currentItem.tripName) && (
              <div className="text-center mb-4">
                {currentItem.caption && (
                  <h3 className="text-white text-xl font-medium mb-1">
                    {currentItem.caption}
                  </h3>
                )}
                {currentItem.tripName && (
                  <p className="text-white/70 text-sm">{currentItem.tripName}</p>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {items.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto py-2 px-4 max-w-full">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => onIndexChange(index)}
                    className={cn(
                      "w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-200",
                      index === currentIndex
                        ? "ring-2 ring-white scale-110"
                        : "opacity-50 hover:opacity-100"
                    )}
                  >
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={onClose}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;
