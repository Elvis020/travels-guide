'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * Smooth Scroll Provider
 * Wraps the entire app in buttery smooth scrolling (Awwwards-style)
 * Synced with GSAP ScrollTrigger for proper pin spacing
 */

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.innerWidth < 1024;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isSmallScreen || isTouchDevice) {
      return;
    }

    // Initialize Lenis smooth scroll with GSAP ScrollTrigger sync
    const initLenis = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Sync Lenis scroll position with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP ticker instead of independent requestAnimationFrame
      // This ensures GSAP and Lenis stay perfectly in sync
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Disable GSAP's lag smoothing for smoother integration
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
