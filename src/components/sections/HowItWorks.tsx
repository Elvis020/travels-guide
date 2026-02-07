"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Unified slide animation for entire step
const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 100,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -100,
  }),
};

// Process Steps Data
const STEPS = [
  {
    id: 1,
    step: "01",
    title: "Pay $50 Deposit",
    description:
      "Secure your spot with a small, refundable deposit via card or PayPal. Just holding your place.",
  },
  {
    id: 2,
    step: "02",
    title: "Receive Itinerary",
    description:
      "Within 24 hours, you'll get a personalized day-by-day itinerary tailored to your selected trip.",
  },
  {
    id: 3,
    step: "03",
    title: "Video Call",
    description:
      "We'll hop on a quick video chat to customize the finer details based on your pace and interests.",
  },
  {
    id: 4,
    step: "04",
    title: "Final Payment",
    description:
      "Pay the remaining balance 30 days before departure. We offer flexible installment plans.",
  },
  {
    id: 5,
    step: "05",
    title: "You're Set!",
    description:
      "Receive your comprehensive digital travel guide, packing list, and prep materials.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToStep = (nextIndex: number) => {
    if (nextIndex === activeStep) return;
    setDirection(nextIndex > activeStep ? 1 : -1);
    setActiveStep(nextIndex);

    // Clear existing timer and reset with longer delay after user interaction
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Resume auto-play after 6 seconds of user interaction
    timerRef.current = setTimeout(() => {
      startAutoPlay();
    }, 6000);
  };

  const startAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % STEPS.length;
        setDirection(1); // Always forward for auto-play
        return next;
      });
    }, 4000);
  };

  useEffect(() => {
    // Start auto-play on mount
    startAutoPlay();

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-12 md:py-14 bg-sand overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          {/* Aside header */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-secondary/70">
              <span className="h-px w-10 bg-primary/60" />
              How it works
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-display text-ink leading-tight">
              Five small steps, one clear path.
            </h2>
            <p className="mt-3 text-base text-charcoal/70">
              Simple, calm, and designed for clarity.
            </p>
          </div>

          {/* Card + carousel */}
          <div className="relative">
            <div className="rounded-[2rem] border border-secondary/10 bg-white/60 px-5 py-5 md:px-6 md:py-6 shadow-sm backdrop-blur-sm overflow-hidden">
              <div className="flex gap-4">
                {/* Vertical step navigation */}
                <div className="flex flex-col gap-2 justify-center">
                  {STEPS.map((step, idx) => (
                    <button
                      key={step.id}
                      onClick={() => goToStep(idx)}
                      className="relative w-10 h-10 rounded-full text-xs font-bold transition-colors flex items-center justify-center"
                      aria-label={`Go to step ${idx + 1}`}
                    >
                      {/* Sliding orange indicator */}
                      {idx === activeStep && (
                        <motion.div
                          layoutId="activeStepIndicator"
                          className="absolute inset-0 bg-primary rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}

                      {/* Step number */}
                      <span
                        className={`relative z-10 transition-colors ${
                          idx === activeStep
                            ? "text-white"
                            : "text-ink/30 hover:text-ink/60"
                        }`}
                      >
                        {step.step}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Content area */}
                <div className="flex-1 relative min-h-[180px] md:min-h-[150px] overflow-hidden">
                  <AnimatePresence
                    mode="wait"
                    initial={false}
                    custom={direction}
                  >
                    <motion.div
                      key={activeStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute inset-0 flex flex-col justify-center"
                    >
                      {/* Step label */}
                      <div className="mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary/70">
                          Step {STEPS[activeStep].step}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-body font-semibold text-ink mb-3 leading-tight">
                        {STEPS[activeStep].title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-charcoal/70 leading-relaxed">
                        {STEPS[activeStep].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
