"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { Compass, MapPin, ArrowRight, Home } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// 404 Not Found Page - Tourist Edition
// Friendly exploration-themed error page
// ═══════════════════════════════════════════════════════════════════════════

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream flex items-center justify-center pt-16">
        <div className="container-wide py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="w-32 h-32 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass className="w-16 h-16 text-primary" />
              </div>
              {/* Floating map pin */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4"
              >
                <MapPin className="w-12 h-12 text-secondary" />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-display text-6xl md:text-7xl font-bold text-ink mb-4">
                Lost in Transit
              </h1>
              <p className="text-2xl text-primary font-medium mb-6">
                404 - Page Not Found
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-charcoal/70 leading-relaxed mb-12 max-w-lg mx-auto"
            >
              Looks like this page took a detour! Don't worry though — there are
              plenty of amazing adventures waiting for you back at base camp.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Home className="w-5 h-5" />}
                >
                  Back to Home
                </Button>
              </Link>
              <Link href="/trips">
                <Button
                  variant="outline"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Trips
                </Button>
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-16 pt-12 border-t border-sand"
            >
              <p className="text-sm text-stone mb-4">Or jump to:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Gallery", href: "/gallery" },
                  { label: "Reviews", href: "/reviews" },
                  { label: "About Us", href: "/about" },
                  { label: "FAQ", href: "/faq" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 bg-sand rounded-full text-sm font-medium text-charcoal/70 hover:bg-primary hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
