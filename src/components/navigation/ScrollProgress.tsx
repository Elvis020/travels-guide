'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Scroll Progress Bar - Below header indicator
 * Shows % completion after reaching video intro section
 */
export default function ScrollProgress() {
  const [headerHeight, setHeaderHeight] = useState(96);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const ticking = useRef(false);
  const videoIntroOffset = useRef<number | null>(null);

  useEffect(() => {
    // Cache video intro section offset on mount
    const videoIntroSection = document.getElementById('video-intro');
    if (videoIntroSection) {
      videoIntroOffset.current = videoIntroSection.offsetTop;
    }
  }, []);

  const updateScrollState = useCallback(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    // Show progress bar when scrolled past video intro section
    if (videoIntroOffset.current) {
      const scrollY = window.scrollY;
      const viewportMid = window.innerHeight / 2;
      setIsVisible(scrollY + viewportMid >= videoIntroOffset.current);
    }

    ticking.current = false;
  }, []);

  useEffect(() => {
    // Initial update
    updateScrollState();

    const handleScroll = () => {
      // Throttle using requestAnimationFrame
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    const handleResize = () => {
      // Debounce resize events
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollState]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 right-0 h-1.5 bg-primary origin-left z-50 shadow-md rounded-r-full"
          style={{
            scaleX,
            top: `${headerHeight}px`,
          }}
        />
      )}
    </AnimatePresence>
  );
}
