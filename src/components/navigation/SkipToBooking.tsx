"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Skip to Booking Banner - Smart sectioning
 * Shows after section 3, offers quick path to booking
 */
export default function SkipToBooking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-r from-primary to-secondary py-3 overflow-hidden"
    >
      {/* Subtle floating orbs for depth */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-1/2 left-[20%] w-32 h-32 bg-white rounded-full blur-2xl animate-float" />
        <div className="absolute top-1/2 right-[30%] w-24 h-24 bg-white rounded-full blur-xl animate-float-delayed" />
      </div>

      {/* CSS keyframes for gentle floating */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -10px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10px, 10px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 1s;
        }
      `}</style>

      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Message - compact single line on desktop */}
          <div className="flex items-center gap-3 text-center md:text-left">
            {/* Pulsing dot + text inline */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm md:text-base font-display">
                Next departure: <span className="font-semibold">March 15</span>
              </span>
            </div>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="text-white/90 text-sm">
              See all scheduled departures
            </span>
          </div>

          {/* Actions - compact inline button */}
          <button
            onClick={() => {
              const element = document.getElementById("upcoming-trips");
              if (element) {
                const offset = 80;
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                  top: elementPosition,
                  behavior: "smooth",
                });
              }
            }}
            className="group flex items-center gap-1.5 px-3 py-1 bg-white/90 text-primary text-xs font-bold rounded-md hover:bg-white transition-all duration-300 hover:gap-2 backdrop-blur-sm"
          >
            View Trips
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
