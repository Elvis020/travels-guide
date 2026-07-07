"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { AppImage as Image, Link } from "@/components/ui";
import { FloatingCTA } from "@/components/navigation";
import { TripCard } from "@/components/trips/TripCard";
import { Seo } from "@/components/seo/Seo";
import { getFeaturedFAQs } from "@/data/faqs";
import { getFeaturedReviews } from "@/data/reviews";
import { getUpcomingTrips, getAverageRating, getReviewsByTripId } from "@/data/trips";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo";
import {
  Check,
  MapPin,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const ReviewsTeaser = lazy(() =>
  import("@/components/sections/ReviewsTeaser").then((mod) => ({
    default: mod.ReviewsTeaser,
  })),
);
const HowItWorks = lazy(() => import("@/components/sections/HowItWorks"));

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
  const upcomingTrips = getUpcomingTrips().slice(0, 3);
  const faqs = getFeaturedFAQs();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.innerWidth < 768;

    if (prefersReducedMotion || isSmallScreen) {
      return;
    }

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

  return (
    <>
      <Seo
        title="Unforgettable Ghana Adventures"
        description="Discover curated Ghana tours, private itineraries, and event-based travel experiences with NYS Travels. Explore cultural landmarks, wildlife escapes, and coastal adventures with local guidance."
        path="/"
        jsonLd={[buildOrganizationSchema(), buildWebsiteSchema()]}
      />
      <Header />
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

              <p className="mt-8 md:mt-12 max-w-xl text-lg text-ink/85 leading-relaxed font-light pl-2 border-l-2 border-primary/20">
                We are Ghana&apos;s leading curators of event-based travel and
                private tours. From the rugged beauty of the Wli Waterfalls to
                the VVIP front row of the Detty December concerts, we handle
                the logistics so you can focus on the memories. With a network
                of over 2 million digital reach and a commitment to cultural
                impact, NYS Travels is the official way to see Ghana.
              </p>

              {/* CTA Group */}
              <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 pl-2">
                <Link
                  href="/trips"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-white shadow-[0_10px_24px_rgba(232,106,51,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
                >
                  <span className="font-bold tracking-wide text-sm uppercase">
                    Find your trip
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#meet-nana"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary transition-all duration-300 hover:gap-3 hover:text-primary"
                >
                  Meet your guide
                  <ArrowRight className="h-4 w-4" />
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
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=72&w=1600&auto=format&fit=crop"
                  alt="Ghana Green Landscape"
                  fill
                  priority
                  className="object-cover scale-on-scroll"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 50vw"
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
                        alt={`Portrait of happy NYS Travels guest ${i}`}
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

        {/* ═══════════════ MEET NANA ═══════════════ */}
        <section id="meet-nana" className="relative py-24 md:py-32 bg-cream">
          <div className="container-wide">
            <div className="mx-auto grid max-w-6xl md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 md:gap-12 items-center">
              <div className="reveal-text max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-display text-ink leading-tight mb-6">
                  Meet Nana Yaw Suspence
                </h2>
                <p className="text-xl text-charcoal mb-6 leading-relaxed">
                  Your guide to Ghana&apos;s soul. Meet the person shaping each
                  route, handling the details, and helping travelers experience
                  the country with confidence.
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

              {/* Portrait */}
              <div className="reveal-text flex justify-center md:justify-center">
                <div className="group relative aspect-[2/3] w-full max-w-[420px] overflow-hidden rounded-[32px] bg-ink shadow-2xl">
                  <Image
                    src="/images/nana-yaw.webp"
                    alt="Nana Yaw Suspence, founder and guide at NYS Travels"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 420px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SPONSORS & PARTNERS ═══════════════ */}
        <section className="relative overflow-hidden bg-white py-20 md:py-24">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-sand/70 to-transparent md:block" />
          <div className="container-wide">
            <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div className="max-w-xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Sponsors & Partners
                  </span>
                </div>
                <h2 className="mb-4 font-display text-4xl leading-tight text-ink md:text-5xl">
                  Supported by names travelers already trust
                </h2>
                <p className="mb-0 text-base leading-relaxed text-charcoal/68">
                  From local culture platforms to travel partners and institutional support,
                  NYS Travels works with brands that help make each Ghana experience smoother,
                  safer, and more memorable.
                </p>
              </div>

              <div className="grid gap-3 self-center sm:grid-cols-2">
                {[
                  {
                    name: "Escape Accra",
                    role: "Culture partner",
                    image: "/sponsors/escape-accra.webp",
                    fit: "contain",
                  },
                  {
                    name: "Pepsodent",
                    role: "Wellness sponsor",
                    image: "/sponsors/pepsodent.webp",
                    fit: "cover",
                  },
                  {
                    name: "Swiss Embassy",
                    role: "Institutional partner",
                    image: "/sponsors/swiss-embassy.webp",
                    fit: "cover",
                  },
                  {
                    name: "AEJ Travel and Tours",
                    role: "Travel partner",
                    image: "/sponsors/aej-travel-and-tours.webp",
                    fit: "contain",
                  },
                ].map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-cream/70 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-cream md:p-4"
                  >
                    <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-primary/8 bg-white shadow-sm">
                      <Image
                        src={sponsor.image}
                        alt={`${sponsor.name} sponsor`}
                        fill
                        sizes="80px"
                        className={
                          sponsor.fit === "cover"
                            ? "object-cover"
                            : "object-contain p-1.5"
                        }
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-brand text-lg tracking-wide text-ink">
                        {sponsor.name}
                      </div>
                      <div className="mt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/45">
                        {sponsor.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ HOW IT WORKS (Interactive) ═══════════════ */}
        <Suspense fallback={null}>
          <HowItWorks />
        </Suspense>

        {/* ═══════════════ SAMPLE ITINERARY ═══════════════ */}
        <section
          id="sample-itinerary"
          className="relative py-24 md:py-32 bg-cream"
        >
          <div className="container-wide">
            {/* Header */}
            <div className="mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Daily Rhythm
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-display text-ink leading-tight mb-4">
                A day in the journey
              </h2>
              <p className="text-lg text-charcoal/70 leading-relaxed">
                A sample day from our Cultural Explorer route. Clear pacing, fewer rushed stops,
                and enough room for the moments people actually remember.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Left: Timeline - Compact Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <div className="rounded-2xl border border-primary/10 bg-white px-5 py-5 shadow-sm">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-display text-primary/35">
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
                </div>

                <div>
                  <div className="rounded-2xl border border-primary/10 bg-white px-5 py-5 shadow-sm">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-display text-primary/35">
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
                </div>

                <div>
                  <div className="rounded-2xl border border-primary/10 bg-white px-5 py-5 shadow-sm">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-display text-primary/35">
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
                </div>

                <div>
                  <div className="rounded-2xl border border-primary/10 bg-white px-5 py-5 shadow-sm">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-display text-primary/35">
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
                </div>

                <div>
                  <div className="rounded-2xl border border-primary/10 bg-white px-5 py-5 shadow-sm">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-display text-primary/35">
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
                </div>

                <div>
                  <div className="rounded-2xl border border-primary/10 bg-white px-5 py-5 shadow-sm">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-display text-primary/35">
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
              </div>

              {/* Right: Image + Inclusions */}
              <div className="space-y-8">
                {/* Large Image */}
                <div className="relative h-[400px] overflow-hidden rounded-[28px] shadow-[0_24px_70px_rgba(26,24,21,0.16)]">
                  <Image
                    src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200&h=800&fit=crop"
                    alt="Travelers exploring a heritage site in Kumasi during a guided cultural day trip"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* What's Included */}
                <div className="rounded-[28px] border border-primary/10 bg-white p-7 shadow-sm">
                  <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
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

        {/* ═══════════════ SIGNATURE DESTINATIONS ═══════════════ */}
        <section className="relative overflow-hidden bg-ink py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,106,51,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(45,90,61,0.24),transparent_34%)]" />
          <div className="container-wide relative">
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Signature Stops
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-display leading-tight !text-white">
                  Places that stay with you
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed !text-white/65 md:text-lg">
                We cut the filler and keep the places with real emotional weight: coastline,
                wildlife, and living tradition with enough time to actually feel each one.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  name: "Cape Coast",
                  hook: "Where history speaks",
                  detail: "Castle visits, coast air, and a slower afternoon that gives the story room to land.",
                  image:
                    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&h=1200&fit=crop",
                },
                {
                  name: "Mole Park",
                  hook: "Walk with elephants",
                  detail: "Big landscapes, quiet mornings, and the kind of wildlife encounter that feels improbably close.",
                  image:
                    "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1600&h=1200&fit=crop",
                },
                {
                  name: "Kumasi",
                  hook: "The heartbeat of tradition",
                  detail: "Royal history, dense market energy, and a stronger sense of how culture is actually lived.",
                  image:
                    "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1600&h=1200&fit=crop",
                },
              ].map((dest, index) => (
                <motion.article
                  key={dest.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative min-h-[460px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={dest.image}
                      alt={`${dest.name}, one of NYS Travels' signature destinations in Ghana`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
                  <div className="relative flex h-full flex-col justify-between p-7 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] !text-white/80">
                        Stop {index + 1}
                      </span>
                      <MapPin className="mt-1 h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] !text-primary">
                        {dest.hook}
                      </p>
                      <h3 className="mb-4 text-4xl font-display leading-none !text-white md:text-5xl">
                        {dest.name}
                      </h3>
                      <p className="max-w-md text-base leading-relaxed !text-white/72">
                        {dest.detail}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ UPCOMING TRIPS ═══════════════ */}
        <section
          id="upcoming-trips"
          className="relative py-24 md:py-32 bg-white"
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
            <div className="grid md:grid-cols-3 gap-8 auto-rows-fr">
              {upcomingTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <TripCard
                    trip={trip}
                    variant="departure"
                    rating={getAverageRating(trip.id)}
                    reviewCount={getReviewsByTripId(trip.id).length}
                  />
                </motion.div>
              ))}
            </div>

            {/* Next Steps - Single Row with Divider */}
            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_16px_36px_rgba(232,106,51,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                See all departures
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/book?custom=true"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:gap-3"
              >
                Or plan a private trip
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ REAL TRAVELERS GALLERY ═══════════════ */}
        <section id="gallery" className="relative py-24 md:py-32 bg-sand">
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[190px] xl:auto-rows-[220px]">
              {[
                {
                  name: "Cape Coast Crew",
                  location: "Central Region",
                  trip: "Heritage stop",
                  image: "/people/optimized/img-5.webp",
                  size: "feature",
                },
                {
                  name: "Kakum Walk",
                  location: "Central Region",
                  trip: "Canopy adventure",
                  image: "/people/optimized/img-2.webp",
                  size: "normal",
                },
                {
                  name: "Boat Day",
                  location: "Ada",
                  trip: "River escape",
                  image: "/people/optimized/img-4.webp",
                  size: "normal",
                },
                {
                  name: "Game Night",
                  location: "Accra",
                  trip: "Social experience",
                  image: "/people/optimized/img-3.webp",
                  size: "normal",
                },
                {
                  name: "Story Stop",
                  location: "Cape Coast",
                  trip: "Guided history",
                  image: "/people/optimized/img-1.webp",
                  size: "normal",
                },
              ]
                .map((traveler, i) => (
                  <div
                    key={i}
                    className={`reveal-text group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl ${
                      traveler.size === "feature"
                        ? "sm:col-span-2 lg:col-span-6 lg:row-span-2 lg:aspect-auto"
                        : "lg:col-span-3 lg:aspect-auto"
                    }`}
                  >
                    {/* Image */}
                    <Image
                      src={traveler.image}
                      alt={`${traveler.name} - ${traveler.trip}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                      sizes={
                        traveler.size === "feature"
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      }
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
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
              >
                More photos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ TESTIMONIALS ═══════════════ */}
        <section
          id="testimonials"
          className="testimonials-section relative overflow-hidden bg-secondary py-20 md:py-28"
        >
          <div className="container-wide relative">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Traveler Stories
                  </span>
                </div>
                <h2 className="text-4xl font-display leading-tight !text-white md:text-5xl">
                  The part people talk about when they get home
                </h2>
              </div>

              <div className="max-w-xl lg:ml-auto">
                <p className="mb-6 text-base leading-relaxed !text-white/68">
                  The best signal is what travelers remember without being prompted:
                  the pacing, the care, and the moments that felt personal.
                </p>
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream"
                >
                  All reviews
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <Suspense fallback={null}>
                <ReviewsTeaser reviews={getFeaturedReviews()} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section id="faq" className="relative py-24 md:py-32 bg-cream">
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
              {faqs.map((faq, i) => (
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
