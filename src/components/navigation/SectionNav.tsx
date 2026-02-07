"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Section Navigation Dots - Right side navigation
 * Click to jump to any section, auto-highlights current section
 */

interface Section {
  id: string;
  label: string;
  number: string;
}

const sections: Section[] = [
  { id: "hero", label: "Welcome", number: "00" },
  { id: "video-intro", label: "Meet Nana Yaw", number: "01" },
  { id: "how-it-works", label: "Booking Process", number: "02" },
  { id: "sample-itinerary", label: "Itinerary", number: "03" },
  { id: "gallery", label: "Travelers", number: "04" },
  { id: "guide-profile", label: "Your Guide", number: "05" },
  { id: "testimonials", label: "Reviews", number: "06" },
  { id: "upcoming-trips", label: "Upcoming Trips", number: "07" },
  { id: "faq", label: "FAQ", number: "08" },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show nav after hero
          setIsVisible(window.scrollY > window.innerHeight * 0.3);

          // Find active section
          const scrollPosition = window.scrollY + window.innerHeight / 2;

          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i].id);
            if (element && element.offsetTop <= scrollPosition) {
              setActiveSection(sections[i].id);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="relative flex flex-col gap-0">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isHovered = hoveredSection === section.id;

              return (
                <div
                  key={section.id}
                  className="relative flex items-center justify-start gap-1"
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  {/* Dash (horizontal line) */}
                  <div className="py-1">
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="relative group/dash"
                      aria-label={`Go to ${section.label}`}
                    >
                      <motion.div
                        className={`h-[2px] rounded-full ${
                          isActive ? "bg-primary" : "bg-stone/50"
                        }`}
                        initial={false}
                        animate={{
                          width: isActive
                            ? "32px"
                            : isHovered
                              ? "24px"
                              : "16px",
                          backgroundColor:
                            isActive || isHovered
                              ? "#F97316"
                              : "rgba(120, 113, 108, 0.5)",
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </button>
                  </div>

                  {/* Label - Shows on Hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-ink text-white px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
                      >
                        <span className="text-primary mr-2">
                          {section.number}
                        </span>
                        {section.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
