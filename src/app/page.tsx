"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import {
  ScrollProgress,
  FloatingCTA,
  SkipToBooking,
} from "@/components/navigation";
import FeaturedTrips from "@/components/sections/FeaturedTrips";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import HowItWorks from "@/components/sections/HowItWorks";
import { getFeaturedReviews } from "@/data/reviews";
import {
  Play,
  Check,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Clock,
  MapPin,
  Star,
  Mail,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NYS Travels - Editorial Travel Magazine Experience
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Conversion-focused layout with:
 * - Video introduction (trust)
 * - Featured tours with pricing (clarity)
 * - How it works (process)
 * - Sample itinerary (expectations)
 * - Real traveler gallery (social proof)
 * - FAQ (objection handling)
 */

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    // Dynamically import GSAP only when needed
    const loadAndInitGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Hero parallax
        gsap.to('[data-speed="slow"]', {
          y: 200,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to('[data-speed="fast"]', {
          y: -100,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Fade out hero text
        gsap.to(".hero-text", {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "50% top",
            scrub: true,
          },
        });

        // Horizontal scroll destinations
        const destinationsSection = document.querySelector(
          ".destinations-scroll",
        );
        if (destinationsSection) {
          const destinations = gsap.utils.toArray(".destination-card");

          gsap.to(destinations, {
            xPercent: -100 * (destinations.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: ".destinations-scroll",
              pin: true,
              scrub: 2,
              snap: {
                snapTo: 1 / (destinations.length - 1),
                duration: 0.5,
                ease: "power1.inOut",
              },
              end: () => `+=${window.innerHeight * 2}`,
            },
          });
        }

        // Scale images on scroll
        gsap.utils.toArray(".scale-on-scroll").forEach((img: any) => {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        // Reveal text on scroll
        gsap.utils.toArray(".reveal-text").forEach((text: any) => {
          gsap.fromTo(
            text,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
              },
            },
          );
        });

        // Number counters
        gsap.utils.toArray(".count-up").forEach((counter: any) => {
          const target = parseInt(counter.getAttribute("data-target"));
          gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
            },
          });
        });
      }, mainRef);

      return () => ctx.revert();
    };

    loadAndInitGSAP();
  }, []);

  const faqs = [
    {
      question: "Is Ghana safe for solo travelers?",
      answer:
        "Absolutely! Ghana is one of the safest countries in West Africa. I personally escort all tours, and we stay in secure, vetted accommodations. Ghana's people are famously welcoming to visitors.",
    },
    {
      question: "What vaccinations do I need?",
      answer:
        "Yellow fever vaccination is required for entry. I recommend also getting hepatitis A, typhoid, and routine vaccinations. I'll send you a complete health prep guide after booking.",
    },
    {
      question: "What's included in the tour price?",
      answer:
        "All accommodations, ground transportation, guided tours, most meals, entrance fees, and airport transfers. NOT included: international flights, travel insurance, tips, and personal expenses.",
    },
    {
      question: "What if I need to cancel?",
      answer:
        "The $50 deposit is non-refundable but transferable to another traveler. For full payment cancellations: 60+ days = 75% refund, 30-59 days = 50% refund, under 30 days = no refund. Travel insurance is highly recommended.",
    },
    {
      question: "Can I customize my itinerary?",
      answer:
        "Yes! After your deposit, we'll have a video call to tailor the itinerary to your interests. Want more wildlife? More culture? Beach time? We'll make it yours.",
    },
    {
      question: "How many people per tour?",
      answer:
        "I keep groups small - maximum 8 travelers for personalized attention. Private tours for couples/families are also available.",
    },
    {
      question: "What's the weather like?",
      answer:
        "Ghana has two seasons: dry (November-March) with 85-90°F and humid rainy (April-October). Best time to visit is November-February for wildlife viewing and comfortable weather.",
    },
    {
      question: "Do I need a visa?",
      answer:
        "US citizens need a visa to enter Ghana. I'll provide detailed instructions and support for the application process after booking.",
    },
  ];

  return (
    <>
      <Header />
      <ScrollProgress />
      <FloatingCTA />
      <main ref={mainRef} className="overflow-hidden">
        {/* ═══════════════ HERO ═══════════════ */}
        <section
          id="hero"
          className="hero-section relative min-h-screen bg-cream flex flex-col md:flex-row overflow-hidden"
        >
          {/* LEFT COLUMN: Typography & Content */}
          <div className="md:w-[45%] relative z-20 flex flex-col justify-center px-6 pt-28 pb-12 md:py-12 md:pl-20 md:pr-4">
            {/* Animated content container */}
            <div className="max-w-xl mx-auto md:mx-0 stagger-entry">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/5 border border-secondary/10 text-secondary text-xs uppercase tracking-[0.2em] mb-8 md:mb-12">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Now Booking 2025
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="font-display text-ink leading-[0.9] tracking-tight">
                <span className="block text-[14vw] md:text-[7rem] lg:text-[9rem] xl:text-[10rem]">
                  GHANA
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-serif italic text-primary mt-3 ml-2">
                  quietly unforgettable.
                </span>
              </h1>

              <p className="mt-8 md:mt-12 max-w-lg text-lg text-ink/85 leading-relaxed font-light pl-2 border-l-2 border-primary/20">
                Handpicked routes across Accra, Cape Coast, and the Volta
                region. Fewer stops, deeper moments.
              </p>

              {/* CTA Group */}
              <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 pl-2">
                <Link
                  href="/trips"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                >
                  <span className="relative z-10 font-bold tracking-wide text-sm uppercase">
                    Find your trip
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </div>

              {/* Scroll Note */}
              <div className="hidden md:flex items-center gap-3 mt-24 text-ink/60 text-xs uppercase tracking-[0.2em]">
                <div className="h-px w-12 bg-primary/30" />
                Scroll to explore
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Arch Image */}
          <div className="md:w-[55%] relative h-[50vh] md:h-screen lg:sticky lg:top-0">
            {/* The Arch Container */}
            <div className="absolute inset-0 md:inset-x-8 md:top-8 md:bottom-8 overflow-hidden rounded-t-[40px] md:rounded-t-[300px] md:rounded-b-[20px] shadow-sm">
              <div data-speed="slow" className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2560&auto=format&fit=crop" // Lush Green Ghana Landscape
                  alt="Ghana Green Landscape"
                  fill
                  priority
                  className="object-cover scale-on-scroll"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Subtle overlay for atmosphere, not for text readability anymore */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
              </div>
            </div>

            {/* Floating Detail */}
            <div className="absolute -left-12 bottom-24 hidden md:block z-30">
              <div className="bg-cream px-5 py-4 rounded-2xl shadow-xl max-w-[220px] border border-secondary/10">
                <div className="flex -space-x-2 mb-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-cream bg-gray-200 overflow-hidden"
                    >
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="Traveler"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.24em] text-secondary/70">
                  This Season
                </div>
                <p className="mt-2 text-xs text-charcoal/80">
                  <span className="text-primary font-semibold">
                    12 travelers
                  </span>{" "}
                  joined the Cape Coast trip this week.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ VIDEO INTRODUCTION ═══════════════ */}
        <section id="video-intro" className="relative py-20 md:py-32 bg-cream">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="reveal-text">
                <h2 className="text-4xl md:text-6xl font-display text-ink leading-tight mb-6">
                  Meet Nana Yaw Suspence
                </h2>
                <p className="text-xl text-charcoal mb-6 leading-relaxed">
                  Your guide to Ghana's soul. Watch this 2-minute introduction
                  to understand why hundreds of travelers trust me with their
                  African adventure.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-earth">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>10+ years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>500+ tours led</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>

              {/* Video Placeholder */}
              <div className="reveal-text">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-ink shadow-2xl group cursor-pointer">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop"
                    alt="Nana Yaw Suspence"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span>2:15 - Introduction Video</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ TRUSTED BY ═══════════════ */}
        <section className="relative py-16 md:py-20 bg-white">
          <div className="container-wide">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-px bg-primary" />
              <p className="text-sm uppercase tracking-[0.2em] text-stone font-semibold">
                Trusted By
              </p>
            </div>

            {/* Brand logos grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-20 bg-sand rounded-xl opacity-60 hover:opacity-100 transition-opacity"
                >
                  <span className="text-charcoal/40 font-medium text-sm">
                    Brand {i}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ HOW IT WORKS (Interactive) ═══════════════ */}
        <HowItWorks />

        {/* ═══════════════ SKIP TO BOOKING BANNER ═══════════════ */}
        <SkipToBooking />

        {/* ═══════════════ SAMPLE ITINERARY ═══════════════ */}
        <section
          id="sample-itinerary"
          className="relative py-20 md:py-32 bg-cream"
        >
          <div className="container-wide">
            {/* Header */}
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-display text-ink leading-tight mb-4">
                A day in the journey
              </h2>
              <p className="text-lg text-charcoal/70">
                Day 3 from our Cultural Explorer
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Left: Timeline - Compact Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-display text-primary/30">
                      7
                    </span>
                    <span className="text-xs text-primary font-bold">AM</span>
                  </div>
                  <h4 className="text-xl font-display text-ink mb-1">
                    Breakfast & Checkout
                  </h4>
                  <p className="text-sm text-charcoal/60">
                    Traditional breakfast, pack for Kumasi
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-display text-primary/30">
                      8:30
                    </span>
                    <span className="text-xs text-primary font-bold">AM</span>
                  </div>
                  <h4 className="text-xl font-display text-ink mb-1">
                    Drive to Kumasi
                  </h4>
                  <p className="text-sm text-charcoal/60">
                    4-hour scenic countryside drive
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-display text-primary/30">
                      1
                    </span>
                    <span className="text-xs text-primary font-bold">PM</span>
                  </div>
                  <h4 className="text-xl font-display text-ink mb-1">
                    Lunch & Check-in
                  </h4>
                  <p className="text-sm text-charcoal/60">
                    Ashanti cuisine, hotel check-in
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-display text-primary/30">
                      3
                    </span>
                    <span className="text-xs text-primary font-bold">PM</span>
                  </div>
                  <h4 className="text-xl font-display text-ink mb-1">
                    Manhyia Palace
                  </h4>
                  <p className="text-sm text-charcoal/60">
                    Royal residence, 300-year history
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-display text-primary/30">
                      6
                    </span>
                    <span className="text-xs text-primary font-bold">PM</span>
                  </div>
                  <h4 className="text-xl font-display text-ink mb-1">
                    Kejetia Market
                  </h4>
                  <p className="text-sm text-charcoal/60">
                    West Africa's largest market
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-display text-primary/30">
                      8
                    </span>
                    <span className="text-xs text-primary font-bold">PM</span>
                  </div>
                  <h4 className="text-xl font-display text-ink mb-1">
                    Dinner & Relax
                  </h4>
                  <p className="text-sm text-charcoal/60">
                    Rooftop restaurant, free time
                  </p>
                </div>
              </div>

              {/* Right: Image + Inclusions */}
              <div className="space-y-8">
                {/* Large Image */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200&h=800&fit=crop"
                    alt="Kumasi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* What's Included */}
                <div>
                  <p className="text-sm uppercase tracking-widest text-primary mb-6 font-semibold">
                    Daily Inclusions
                  </p>
                  <div className="space-y-3 text-charcoal/80">
                    <div className="flex items-center gap-3">
                      <span className="text-primary">→</span>
                      <span>All meals (breakfast, lunch, dinner)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">→</span>
                      <span>Private transport & driver</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">→</span>
                      <span>Expert guide services</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">→</span>
                      <span>All entrance fees & permits</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ HORIZONTAL SCROLL DESTINATIONS ═══════════════ */}
        <section className="destinations-scroll relative h-screen bg-ink">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div className="flex gap-8">
              {[
                {
                  name: "Cape Coast",
                  hook: "Where history speaks",
                  image:
                    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&h=1200&fit=crop",
                },
                {
                  name: "Mole Park",
                  hook: "Walk with elephants",
                  image:
                    "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1600&h=1200&fit=crop",
                },
                {
                  name: "Kumasi",
                  hook: "The heartbeat of tradition",
                  image:
                    "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1600&h=1200&fit=crop",
                },
              ].map((dest, i) => (
                <div
                  key={i}
                  className="destination-card relative flex-shrink-0 w-[80vw] h-[80vh] rounded-3xl overflow-hidden ml-8 group cursor-pointer"
                >
                  {/* Image */}
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="80vw"
                  />

                  {/* Dark overlay - only shows on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Text - only shows on hover */}
                  <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3
                      className="text-6xl md:text-8xl font-display mb-4 !text-white leading-tight"
                      style={{
                        textShadow:
                          "0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,1)",
                      }}
                    >
                      {dest.name}
                    </h3>
                    <p
                      className="text-2xl md:text-3xl font-display font-light italic !text-white/90"
                      style={{ textShadow: "0 2px 12px rgba(0,0,0,1)" }}
                    >
                      {dest.hook}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ REAL TRAVELERS GALLERY ═══════════════ */}
        <section id="gallery" className="relative py-20 md:py-32 bg-sand">
          <div className="container-wide">
            <div className="max-w-3xl mb-16">
              <h2 className="reveal-text text-5xl md:text-7xl font-display text-ink leading-tight mb-6">
                Real people. Real adventures.
              </h2>
              <p className="reveal-text text-xl text-charcoal">
                Photos from travelers who came, explored, and left with stories
                that'll last forever.
              </p>
            </div>

            {/* Gallery Grid - Magazine Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "Sarah M.",
                  location: "Atlanta, GA",
                  trip: "Cape Coast Castle",
                  image:
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=800&fit=crop",
                  size: "large", // col-span-2 row-span-2
                },
                {
                  name: "Marcus T.",
                  location: "Brooklyn, NY",
                  trip: "Accra Markets",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
                  size: "normal",
                },
                {
                  name: "Jennifer L.",
                  location: "Los Angeles, CA",
                  trip: "Mole National Park",
                  image:
                    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop",
                  size: "normal",
                },
                {
                  name: "David & Lisa K.",
                  location: "Chicago, IL",
                  trip: "Kumasi Cultural Tour",
                  image:
                    "https://images.unsplash.com/photo-1515041219749-89347f83291a?w=800&h=800&fit=crop",
                  size: "normal",
                },
                {
                  name: "Amara O.",
                  location: "London, UK",
                  trip: "Volta Region Waterfalls",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
                  size: "normal",
                },
                {
                  name: "James C.",
                  location: "Toronto, Canada",
                  trip: "Elephant Safari",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop",
                  size: "large", // col-span-2 row-span-2
                },
                {
                  name: "Tasha W.",
                  location: "Houston, TX",
                  trip: "Beach Paradise",
                  image:
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop",
                  size: "normal",
                },
                {
                  name: "Michael R.",
                  location: "Miami, FL",
                  trip: "Kakum Canopy Walk",
                  image:
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop",
                  size: "normal",
                },
              ]
                .slice(0, 5)
                .map((traveler, i) => (
                  <div
                    key={i}
                    className={`reveal-text relative ${traveler.size === "large" ? "md:col-span-2 md:row-span-2" : ""} aspect-square overflow-hidden rounded-2xl group cursor-pointer`}
                  >
                    {/* Image */}
                    <Image
                      src={traveler.image}
                      alt={`${traveler.name} - ${traveler.trip}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Dark overlay - only shows on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Text - only shows on hover */}
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="space-y-3">
                        {/* Name */}
                        <h3
                          className="font-bold text-2xl md:text-3xl !text-white leading-tight"
                          style={{
                            textShadow:
                              "0 4px 20px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,1)",
                          }}
                        >
                          {traveler.name}
                        </h3>

                        {/* Location */}
                        <p
                          className="text-base md:text-lg !text-white/90"
                          style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
                        >
                          {traveler.location}
                        </p>

                        {/* Trip with accent */}
                        <div className="flex items-center gap-3 pt-2">
                          <div className="h-0.5 w-12 bg-primary" />
                          <p className="text-sm md:text-base !text-primary font-semibold uppercase tracking-wide">
                            {traveler.trip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* See More Button */}
            <div className="reveal-text text-center mt-16">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                More photos
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ TESTIMONIALS ═══════════════ */}
        <section
          id="testimonials"
          className="testimonials-section relative py-20 md:py-32 bg-cream"
        >
          <div className="container-wide">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-display text-ink leading-tight mb-4">
                Traveler Stories
              </h2>
              <p className="text-lg text-charcoal/70">
                Real experiences from real adventurers
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <ReviewsCarousel reviews={getFeaturedReviews()} />
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Read All Reviews
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ UPCOMING TRIPS ═══════════════ */}
        <section
          id="upcoming-trips"
          className="relative py-20 md:py-32 bg-white"
        >
          <div className="container-wide">
            <div className="max-w-3xl mb-16">
              <h2 className="reveal-text text-5xl md:text-7xl font-display text-ink leading-tight mb-6">
                Upcoming Departures
              </h2>
              <p className="reveal-text text-xl text-charcoal">
                Scheduled group trips with confirmed dates. See what's included
                and reserve your spot with just $50.
              </p>
            </div>

            {/* Upcoming Trips Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Trip 1 */}
              <div className="reveal-text bg-cream rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 ease-out h-full flex flex-col cursor-pointer">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop"
                    alt="7-Day Cultural Explorer"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    6 Spots Left
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display text-ink mb-2 line-clamp-1">
                    7-Day Cultural Explorer
                  </h3>
                  <p className="text-sm text-charcoal mb-4 line-clamp-2">
                    Accra • Cape Coast • Kumasi • Volta Region
                  </p>

                  <div className="flex items-center gap-2 text-charcoal mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold">March 15-22, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal mb-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Small group (max 8)</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/60 mb-4">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Book by Feb 13, 2026</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm text-charcoal flex-1">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Historic castles & slave dungeons</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Ashanti Kingdom palaces & markets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Wli Waterfalls & mountain villages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Kente weaving & drumming workshops</span>
                    </li>
                  </ul>

                  <div className="flex items-baseline gap-2 mb-4 mt-auto">
                    <span className="text-4xl font-display text-primary">
                      $1,850
                    </span>
                    <span className="text-charcoal">/person</span>
                  </div>
                  <Link
                    href="/book?trip=cultural-march"
                    className="block w-full text-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
                  >
                    Reserve My Spot
                  </Link>
                </div>
              </div>

              {/* Trip 2 */}
              <div className="reveal-text bg-cream rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 ease-out h-full flex flex-col cursor-pointer">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop"
                    alt="10-Day Complete Experience"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    3 Spots Left
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display text-ink mb-2 line-clamp-1">
                    10-Day Complete Experience
                  </h3>
                  <p className="text-sm text-charcoal mb-4 line-clamp-2">
                    Cape Coast • Kumasi • Mole Park • Accra
                  </p>

                  <div className="flex items-center gap-2 text-charcoal mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold">April 10-20, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal mb-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Small group (max 8)</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/60 mb-4">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Book by Mar 10, 2026</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm text-charcoal flex-1">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Everything from 7-day tour PLUS...</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Mole National Park safari</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Walking safari with elephants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Larabanga ancient mosque visit</span>
                    </li>
                  </ul>

                  <div className="flex items-baseline gap-2 mb-4 mt-auto">
                    <span className="text-4xl font-display text-primary">
                      $2,400
                    </span>
                    <span className="text-charcoal">/person</span>
                  </div>
                  <Link
                    href="/book?trip=complete-april"
                    className="block w-full text-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
                  >
                    Reserve My Spot
                  </Link>
                </div>
              </div>

              {/* Trip 3 */}
              <div className="reveal-text bg-cream rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 ease-out h-full flex flex-col cursor-pointer">
                <div className="relative h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop"
                    alt="4-Day Weekend Safari"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Full - Waitlist
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display text-ink mb-2 line-clamp-1">
                    4-Day Cape Coast Weekend
                  </h3>
                  <p className="text-sm text-charcoal mb-4 line-clamp-2">
                    Accra • Cape Coast • Kakum • Elmina
                  </p>

                  <div className="flex items-center gap-2 text-charcoal mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold">May 2-6, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal mb-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Small group (max 8)</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/60 mb-4">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Book by Apr 2, 2026</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm text-charcoal flex-1">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Cape Coast Castle tour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Kakum Canopy Walk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Elmina fishing village</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Beachfront hotel stay</span>
                    </li>
                  </ul>

                  <div className="flex items-baseline gap-2 mb-4 mt-auto">
                    <span className="text-4xl font-display text-primary">
                      $850
                    </span>
                    <span className="text-charcoal">/person</span>
                  </div>
                  <Link
                    href="/book?trip=safari-may"
                    className="block w-full text-center px-6 py-3 bg-stone text-charcoal font-semibold rounded-full hover:bg-earth transition-colors"
                  >
                    Join Waitlist
                  </Link>
                </div>
              </div>
            </div>

            {/* Custom Trip Option */}
            <div className="mt-12 text-center">
              <p className="text-charcoal text-lg mb-4">
                Don't see dates that work for you?
              </p>
              <Link
                href="/book?custom=true"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Request Custom Dates
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section id="faq" className="relative py-20 md:py-32 bg-cream">
          <div className="container-wide">
            <div className="max-w-3xl mb-16">
              <h2 className="reveal-text text-5xl md:text-7xl font-display text-ink leading-tight mb-6">
                Questions? Answered.
              </h2>
              <p className="reveal-text text-xl text-charcoal">
                Everything you need to know before booking your Ghana adventure.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              {/* Show only first 3 FAQs */}
              {faqs.slice(0, 3).map((faq, i) => (
                <div
                  key={i}
                  className="reveal-text border-b border-stone last:border-0 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setActiveAccordion(activeAccordion === i ? null : i)
                    }
                    className="w-full py-6 flex items-start justify-between gap-4 text-left group"
                  >
                    <div>
                      <div className="text-sm text-primary font-semibold mb-2">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-xl md:text-2xl font-display text-ink group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${activeAccordion === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {activeAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.3, ease: "easeInOut" },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="pb-6 text-charcoal leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Gradient Fade Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream via-cream/80 to-transparent pointer-events-none" />
            </div>

            {/* Show More Link */}
            <div className="reveal-text text-center mt-12">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                See All Questions
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
