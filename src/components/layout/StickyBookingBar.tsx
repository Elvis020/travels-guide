"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, Calendar, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Sticky Booking Bar - Mobile & Desktop
// Always-visible CTA for quick booking access
// ═══════════════════════════════════════════════════════════════════════════

export function StickyBookingBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Show bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] md:bottom-6 md:left-6 md:right-auto"
        >
          {/* Mobile: Full-width bar */}
          <div className="md:hidden">
            <div className="bg-secondary/95 backdrop-blur-xl px-4 py-3 flex items-center justify-between gap-3 border-t border-white/10">
              {/* Quick contact */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:+233123456789"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/233123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>

              {/* Book CTA */}
              <Link
                href="/trips"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
              >
                <Calendar className="w-5 h-5" />
                Book Your Trip
              </Link>
            </div>
          </div>

          {/* Desktop: Floating compact bar */}
          <div className="hidden md:block">
            <motion.div
              className="relative"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="expanded"
                    initial={{ width: 60, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 60, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-secondary/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl shadow-ink/20 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {/* Contact options */}
                      <a
                        href="tel:+233123456789"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        Call Us
                      </a>
                      <a
                        href="https://wa.me/233123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>

                      {/* Divider */}
                      <div className="w-px h-8 bg-white/20" />

                      {/* Book CTA */}
                      <Link
                        href="/trips"
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="collapsed"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-colors"
                  >
                    <Calendar className="w-6 h-6" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyBookingBar;
