"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist";
import {
  Menu,
  X,
  Heart,
  User,
  Phone,
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
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  // Gallery, Reviews, About, FAQ, and Trips pages should always have green background
  const hasGreenBackground = ["/gallery", "/reviews", "/about", "/faq", "/trips"].includes(pathname);

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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
              NYC
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] bg-cream z-[var(--z-sticky)] lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-xl font-bold">
                    NYC <span className="text-primary">Travels</span>
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-sand transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-ink" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "relative block px-4 py-3 rounded-xl font-medium transition-colors",
                          isActive
                            ? "text-ink"
                            : "text-ink hover:bg-sand"
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-sand" />

                {/* Account links */}
                <div className="space-y-1">
                  <Link
                    href="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                      pathname === "/wishlist"
                        ? "text-ink"
                        : "text-ink hover:bg-sand"
                    )}
                  >
                    {pathname === "/wishlist" && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                    )}
                    <Heart className="w-5 h-5" />
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-ink hover:bg-sand transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Sign In
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
