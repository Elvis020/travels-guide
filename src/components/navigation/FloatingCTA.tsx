'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles } from 'lucide-react';
import { Link } from '@/components/ui';

/**
 * Floating Utility CTA
 * Keeps one compact planning action in view, then turns into scroll-to-top
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

    // Show button after the hero has clearly cleared
    setIsVisible(scrollY > heroHeight * 1.05);

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
          className="hide-when-mobile-menu-open fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 md:bottom-7 md:right-7"
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative rounded-full"
            style={{
              width: showScrollTop ? '46px' : 'auto',
              height: showScrollTop ? '46px' : 'auto',
            }}
          >
            <AnimatePresence mode="wait">
              {showScrollTop ? (
                <motion.button
                  key="scroll-top"
                  onClick={handleClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-secondary text-white shadow-[var(--shadow-md)] transition-colors duration-300 hover:bg-secondary-dark"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-4.5 w-4.5" />
                </motion.button>
              ) : (
                <motion.div
                  key="plan-trip"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/book?custom=true"
                    className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/90 px-3.5 py-2.5 text-ink shadow-[var(--shadow-card)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 md:gap-3 md:px-4.5"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="pr-1 text-sm font-semibold leading-none">Plan with us</span>
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
