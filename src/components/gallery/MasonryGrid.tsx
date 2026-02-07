"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types";

// ═══════════════════════════════════════════════════════════════════════════
// Masonry Grid Component
// Responsive masonry layout for gallery images
// ═══════════════════════════════════════════════════════════════════════════

interface MasonryGridProps {
  items: GalleryItem[];
  onItemClick: (index: number) => void;
}

export function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (itemId: string) => {
    setLoadedImages(prev => ({ ...prev, [itemId]: true }));
  };
  // Create pattern for varying heights (masonry effect)
  const getHeightClass = (index: number): string => {
    // Pattern: tall, normal, normal, tall, normal, tall, normal, normal...
    const patterns = [
      "row-span-2", // tall
      "row-span-1", // normal
      "row-span-1", // normal
      "row-span-2", // tall
      "row-span-1", // normal
      "row-span-2", // tall
      "row-span-1", // normal
      "row-span-1", // normal
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
      {items.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: (index % 8) * 0.05 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onItemClick(index)}
          className={cn(
            "relative group overflow-hidden rounded-xl",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            getHeightClass(index)
          )}
        >
          {/* Skeleton Loader */}
          {!loadedImages[item.id] && (
            <div className="absolute inset-0 bg-stone/20 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-stone/10 via-stone/20 to-stone/10" />
            </div>
          )}

          {/* Image */}
          <img
            src={item.url}
            alt={item.alt}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
              loadedImages[item.id] ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => handleImageLoad(item.id)}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Video indicator */}
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
            </div>
          )}

          {/* Hover content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Zoom icon */}
            <div className="absolute top-4 right-4">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Caption */}
            {item.caption && (
              <h4 className="text-white font-medium text-sm md:text-base line-clamp-2">
                {item.caption}
              </h4>
            )}
            {item.tripName && (
              <p className="text-white/70 text-xs md:text-sm mt-1">
                {item.tripName}
              </p>
            )}
          </div>

          {/* Featured badge */}
          {item.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default MasonryGrid;
