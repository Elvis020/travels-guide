"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist";
import {
  Menu,
  X,
  Heart,
  User,
  ArrowRight,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Header Component - Safari Editorial
// Transparent on hero, solid on scroll
// ═══════════════════════════════════════════════════════════════════════════

const navItems = [
  { label: "Trips", href: "/trips" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  // Inner pages should always have the solid green app bar.
  const hasGreenBackground = ["/gallery", "/reviews", "/about", "/faq", "/trips", "/book"].includes(pathname);

  // Handle scroll effect - more dramatic threshold for story design
  useEffect(() => {
    const handleScroll = () => {
      // Delay background appearance to let hero breathe
      setIsScrolled(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  // "Green Pill" Logic:
  // - Starts as a floating green pill (rounded-full, max-w-fit)
  // - Expands to full width on scroll (rounded-none, max-w-full)
  // - Always Green (bg-secondary) with White text

  // We determine "expanded" state if scrolled OR if we are on a page that forces the full header
  // Exception: Trip detail pages always keep the floating pill (even on scroll)
  const isTripDetail = pathname.startsWith("/trips/") && pathname !== "/trips";
  const isExpanded = (isScrolled || hasGreenBackground) && !isTripDetail;

  // Hide navbar on trip detail pages until user scrolls
  const shouldHideNavbar = isTripDetail && !isScrolled;

  return (
    <>
      <motion.header
        layout
        initial={false}
        animate={{
          opacity: shouldHideNavbar ? 0 : 1,
          y: shouldHideNavbar ? -20 : 0
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={cn(
          "fixed z-[var(--z-sticky)] left-0 right-0 mx-auto",
          "flex items-center justify-between",
          "bg-secondary/95 backdrop-blur-sm shadow-md shadow-ink/5", // Lighter shadow, slightly transparent bg for speed

          // MOBILE: Always "Slim App Bar" (Full width, docked top, smaller padding)
          "top-0 w-full rounded-none py-3 px-4",

          // DESKTOP: "Floating Pill" logic
          isExpanded
            ? "md:py-4 md:px-8" // Desktop Scrolled: Full width (inherits top-0/rounded-none from mobile base), larger padding
            : "md:top-6 md:w-[90%] md:max-w-5xl md:rounded-full md:py-3 md:px-6", // Desktop Top: Floating Pill

          // Pointer events - allow clicks when visible, prevent when hidden
          shouldHideNavbar && "pointer-events-none"
        )}
      >
        {/* We remove 'container-wide' here because the header itself acts as the container now */}
        <nav className="w-full flex items-center justify-between">
          {/* Logo - hidden on mobile when scrolled to avoid duplication with footer */}
          <Link
            href="/"
            className={cn(
              "font-display text-2xl font-bold flex items-center gap-1 group transition-opacity duration-300",
              isScrolled && "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
            )}
          >
            <span className="text-white group-hover:text-white/90 transition-colors">
              NYS
            </span>
            <span className="text-primary group-hover:text-primary/90 transition-colors">Travels</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  )}
                >
                  {item.label}
                  {/* Active indicator - full opacity */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                  {/* Hover indicator - faint */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={cn(
                "relative p-2 rounded-full transition-all duration-300",
                pathname === "/wishlist"
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold bg-primary text-white rounded-full">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* User/Login (desktop) */}
            <Link
              href="/login"
              className="hidden md:flex p-2 rounded-full text-white/50 hover:text-white/80 transition-all duration-300"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-all duration-300"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[calc(var(--z-sticky)-1)] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.985 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[var(--z-sticky)] h-[100vh] h-[100svh] overflow-hidden bg-cream lg:hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(232,106,51,0.055),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.42),transparent_38%)]" />
              <div className="relative flex h-full flex-col px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-[calc(1.35rem+env(safe-area-inset-top))]">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-[1.65rem] font-bold tracking-tight text-ink"
                  >
                    NYS <span className="text-primary">Travels</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/72 text-ink/85 shadow-[var(--shadow-sm)] backdrop-blur-sm transition-all duration-200 hover:bg-white active:scale-95"
                    aria-label="Close menu"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Navigation */}
                <motion.nav
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.045, delayChildren: 0.08 },
                    },
                  }}
                  className="mt-10 flex-1 space-y-2"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.label}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "group relative flex h-[9.2svh] min-h-[54px] max-h-[66px] items-center justify-between rounded-[18px] px-3 transition-all duration-300 active:scale-[0.99]",
                            isActive
                              ? "text-ink"
                              : "text-ink/58 hover:bg-white/34 hover:text-ink/82"
                          )}
                        >
                          {isActive && (
                            <span
                              className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-primary/80"
                              aria-hidden
                            />
                          )}
                          <span className="font-display text-[clamp(1.8rem,7.2vw,2.55rem)] leading-none tracking-tight">
                            {item.label}
                          </span>
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "bg-ink/[0.035] text-ink/28 group-hover:translate-x-0.5 group-hover:bg-primary/8 group-hover:text-primary"
                            )}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                {/* Bottom actions */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "relative flex h-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/58 text-sm font-semibold text-ink/82 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]",
                        pathname === "/wishlist" && "border-primary/25 bg-primary/10 text-primary"
                      )}
                    >
                      <Heart className="h-4.5 w-4.5" />
                      Wishlist
                      {wishlistCount > 0 && (
                        <span className="absolute right-3 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                          {wishlistCount > 9 ? "9+" : wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex h-11 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/58 text-sm font-semibold text-ink/82 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
                    >
                      <User className="h-4.5 w-4.5" />
                      Sign In
                    </Link>
                  </div>
                  <Link
                    href="/book?custom=true"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary group h-13 justify-between px-5 text-[0.8rem] uppercase tracking-[0.13em] transition-all duration-200 active:scale-[0.985]"
                  >
                    Plan your trip
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
