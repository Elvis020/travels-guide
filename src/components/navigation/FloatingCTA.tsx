'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUp } from 'lucide-react';
import Link from 'next/link';

/**
 * Morphing Floating Button - Next Trip OR Scroll to Top
 * Shows scroll-to-top (circle) when scrolling up below itinerary section
 */
export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const itinerarySectionOffset = useRef<number | null>(null);

  useEffect(() => {
    // Cache itinerary section offset on mount
    const itinerarySection = document.getElementById('sample-itinerary');
    if (itinerarySection) {
      itinerarySectionOffset.current = itinerarySection.offsetTop;
    }
  }, []);

  const updateScrollState = useCallback(() => {
    const heroHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const isScrollingUp = scrollY < lastScrollY.current;

    // Show button after scrolling past hero
    setIsVisible(scrollY > heroHeight * 0.8);

    // Show scroll-to-top when scrolling UP and below itinerary section
    const isBelowItinerary = itinerarySectionOffset.current
      ? scrollY > itinerarySectionOffset.current
      : false;

    setShowScrollTop(isScrollingUp && isBelowItinerary);

    lastScrollY.current = scrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll handler using requestAnimationFrame
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollState]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (showScrollTop) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [showScrollTop]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40"
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-primary rounded-full shadow-2xl"
            style={{
              width: showScrollTop ? '48px' : 'auto',
              height: showScrollTop ? '48px' : 'auto',
            }}
          >
            <AnimatePresence mode="wait">
              {showScrollTop ? (
                // Scroll to Top - Circular Button
                <motion.button
                  key="scroll-top"
                  onClick={handleClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 hover:bg-primary-dark text-white hover:shadow-primary/50 rounded-full transition-colors duration-300 flex items-center justify-center"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-5 h-5" />
                </motion.button>
              ) : (
                // Next Trip - Pill Button
                <motion.div
                  key="next-trip"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/book?trip=cultural-march"
                    className="flex items-center gap-2 px-3 py-2.5 md:gap-3 md:px-6 md:py-4 hover:bg-primary-dark text-white font-semibold rounded-full hover:shadow-primary/50 transition-colors duration-300"
                  >
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[11px] md:text-sm leading-none font-bold">Mar 15-22</span>
                      <span className="text-[9px] md:text-xs opacity-90 leading-tight mt-0.5">$50 • 6 left</span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
