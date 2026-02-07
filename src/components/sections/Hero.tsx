"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Star, MapPin, Users, Play, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Immersive Parallax Hero - Awwwards Quality
// Full-viewport cinematic experience with multi-layer parallax
// Glassmorphism text backdrop for consistent readability
// ═══════════════════════════════════════════════════════════════════════════

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=90",
    alt: "African Savanna at Golden Hour",
    location: "Maasai Mara, Kenya",
  },
  {
    src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=90",
    alt: "Elephant in Natural Habitat",
    location: "Serengeti, Tanzania",
  },
  {
    src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=90",
    alt: "Historic Cape Coast Castle",
    location: "Cape Coast, Ghana",
  },
];

const TRUST_BADGES = [
  { value: "4.9", label: "Trip Rating", icon: Star },
  { value: "2,500+", label: "Happy Travelers", icon: Users },
  { value: "50+", label: "Destinations", icon: MapPin },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mouse position for 3D depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };

  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax layers at different depths
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mouse tracking handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x * 30);
    mouseY.set(y * 20);
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 1: Background Images with Parallax & Ken Burns
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <motion.img
              src={HERO_IMAGES[currentImage].src}
              alt={HERO_IMAGES[currentImage].alt}
              className="w-full h-full object-cover"
              style={{
                x: smoothMouseX,
                y: smoothMouseY,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 2: Gradient Overlays - Stronger for text readability
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/70" />

      {/* Left side gradient for text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-transparent" />

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 3: Floating Decorative Elements
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-20 right-[15%] w-32 h-32 rounded-full bg-primary/30 blur-3xl"
        style={{ y: floatingY }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-[10%] w-48 h-48 rounded-full bg-secondary/20 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 4: Main Content with Glassmorphism Backdrop
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-wide max-w-6xl">
          {/* Glassmorphism content card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-2xl"
          >
            {/* Backdrop blur panel */}
            <div className="absolute -inset-8 md:-inset-12 bg-ink/40 backdrop-blur-xl rounded-3xl border border-white/10" />

            {/* Content */}
            <div className="relative">
              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 md:gap-6 mb-8"
              >
                {TRUST_BADGES.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 text-white/90"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <badge.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm md:text-base">{badge.value}</div>
                      <div className="text-xs text-white/60">{badge.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-[0.95]"
              >
                <motion.span
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                  style={{ transformOrigin: "bottom" }}
                >
                  Discover Africa's
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary">
                    Hidden Wonders
                  </span>
                  <motion.span
                    className="absolute bottom-1 md:bottom-2 left-0 h-3 md:h-4 bg-primary/30 -z-10 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-base md:text-lg lg:text-xl text-white/80 max-w-lg mb-8 leading-relaxed"
              >
                Curated safari experiences with local experts. From the savannas of Kenya
                to the historic castles of Ghana — your adventure awaits.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/trips"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                >
                  Explore Trips
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-white font-medium px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                >
                  Our Story
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYER 5: Bottom Elements
          ═══════════════════════════════════════════════════════════════════════ */}

      {/* Current location indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-8 z-20 hidden lg:block"
      >
        <div className="flex items-center gap-3 bg-ink/50 backdrop-blur-md rounded-full px-4 py-3 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Play className="w-4 h-4 ml-0.5 text-white" />
          </div>
          <div>
            <div className="text-xs text-white/50 uppercase tracking-wider">Now Showing</div>
            <div className="font-medium text-white text-sm">{HERO_IMAGES[currentImage].location}</div>
          </div>
        </div>
      </motion.div>

      {/* Image carousel indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 right-8 z-20 flex gap-2"
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`
              h-1.5 rounded-full transition-all duration-500
              ${i === currentImage ? "w-10 bg-primary" : "w-4 bg-white/40 hover:bg-white/60"}
            `}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
