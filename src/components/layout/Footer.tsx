"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Footer Component - Safari Editorial
// Warm, inviting footer with organic shapes
// ═══════════════════════════════════════════════════════════════════════════

const navLinks = [
  { label: "All Trips", href: "/trips" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const tripLinks = [
  { label: "Safari Adventures", href: "/trips?type=safari" },
  { label: "Cultural Tours", href: "/trips?type=cultural" },
  { label: "Beach Escapes", href: "/trips?type=beach" },
  { label: "Custom Packages", href: "/trips/custom" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socials = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
  return (
    <footer id="site-footer" className="relative bg-secondary">
      {/* Main Footer Content */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-3xl font-bold mb-6 block cursor-pointer">
              <span className="!text-white">NYC </span>
              <span className="text-primary">Travels</span>
            </Link>
            <p className="!text-white/60 text-base mb-8 leading-relaxed max-w-sm">
              Unforgettable African experiences since 2018.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a
                href="mailto:hello@nystravels.com"
                className="flex items-center gap-2 !text-white/70 hover:!text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                hello@nystravels.com
              </a>
              <a
                href="tel:+233123456789"
                className="flex items-center gap-2 !text-white/70 hover:!text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +233 123 456 789
              </a>
            </div>

            {/* Booking status */}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="!text-white/60">Now Booking 2025/2026</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold !text-white/40 uppercase tracking-wider mb-6">
              Explore
            </h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block !text-white/60 hover:!text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold !text-white/40 uppercase tracking-wider mb-6">
              Connect
            </h4>
            <div className="flex gap-2 mb-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5 !text-white" />
                </a>
              ))}
            </div>
            <p className="!text-white/50 text-sm">
              Share your adventure with{" "}
              <span className="!text-primary">#NYCTravels</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="!text-white/50">
              © {new Date().getFullYear()} NYC Travels. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="!text-white/50 hover:!text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
