"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Seo } from "@/components/seo/Seo";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { buildBreadcrumbSchema, buildOrganizationSchema } from "@/lib/seo";
import {
  Users,
  MapPin,
  DollarSign,
  Mail,
  MessageCircle,
  Heart,
  Camera,
  Mountain,
  Utensils,
  Sparkles,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Custom Booking Page
// Request a custom itinerary with $50 deposit
// ═══════════════════════════════════════════════════════════════════════════

const BUDGET_RANGES = [
  { label: "$500 - $1,000", value: "500-1000" },
  { label: "$1,000 - $2,000", value: "1000-2000" },
  { label: "$2,000 - $5,000", value: "2000-5000" },
  { label: "$5,000+", value: "5000+" },
];

const FLEXIBILITY_OPTIONS = [
  { label: "Exact dates only", value: "exact" },
  { label: "Flexible (±3 days)", value: "flexible" },
  { label: "Very flexible (±1 week)", value: "very_flexible" },
];

const INTEREST_OPTIONS = [
  { label: "Wildlife & Nature", icon: Mountain, value: "wildlife" },
  { label: "Cultural Heritage", icon: Sparkles, value: "culture" },
  { label: "Food & Cuisine", icon: Utensils, value: "food" },
  { label: "Photography", icon: Camera, value: "photography" },
  { label: "Adventure", icon: Heart, value: "adventure" },
];

const FORM_STEPS = [
  {
    eyebrow: "Step 1",
    title: "How should we reach you?",
    description: "Just the essentials so Nana can follow up personally.",
  },
  {
    eyebrow: "Step 2",
    title: "What are the trip basics?",
    description: "Dates, places, and group size. Rough answers are fine.",
  },
  {
    eyebrow: "Step 3",
    title: "What should the trip feel like?",
    description: "Pick the budget and experiences that matter most.",
  },
];

function BookingFormContent() {
  const [searchParams] = useSearchParams();
  const _isCustom = searchParams.get("custom") === "true";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    startDate: "",
    endDate: "",
    flexibility: "flexible",
    groupSize: 1,
    budget: "",
    interests: [] as string[],
    specialRequests: "",
    contactPreference: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Custom booking request:", formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const isContactComplete = Boolean(formData.name && formData.email && formData.phone);
  const isTripComplete = Boolean(formData.destination && formData.startDate && formData.endDate);
  const isPreferenceComplete = Boolean(formData.budget && formData.interests.length > 0);
  const canContinue = [isContactComplete, isTripComplete, isPreferenceComplete][activeStep];
  const currentStep = FORM_STEPS[activeStep];
  const isFinalStep = activeStep === FORM_STEPS.length - 1;

  const goToNextStep = () => {
    if (!canContinue) return;
    setActiveStep((step) => Math.min(step + 1, FORM_STEPS.length - 1));
  };

  const goToPreviousStep = () => {
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  if (submitted) {
    return (
      <>
        <Seo
          title="Custom Trip Request Received"
          description="Your NYS Travels custom trip request has been received. We will review your preferences and send a personalized Ghana itinerary shortly."
          path="/book"
          jsonLd={[
            buildOrganizationSchema(),
            buildBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Book", path: "/book" },
            ]),
          ]}
        />
        <Header />
        <main className="min-h-screen bg-cream pt-24 pb-16">
          <div className="container-narrow">
            <div className="surface-card p-8 text-center md:p-12">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-success" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
                Request Received!
              </h1>
              <p className="text-lg text-charcoal/70 mb-8 max-w-2xl mx-auto">
                Thank you for your custom trip request! We'll review your preferences and
                send you a personalized itinerary within 24-48 hours.
              </p>
              <div className="bg-sand rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-ink mb-3">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-charcoal/70">
                      Our team creates a custom itinerary based on your preferences
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-charcoal/70">
                      You'll receive the itinerary via {formData.contactPreference === "whatsapp" ? "WhatsApp" : "email"}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-charcoal/70">
                      Once approved, pay the $50 deposit to confirm your booking
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <p className="text-charcoal/70">
                      We finalize all arrangements and send you the complete details
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="primary" size="lg" onClick={() => (window.location.href = "/")}>
                Return to Homepage
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Seo
        title="Book a Custom Ghana Trip"
        description="Plan a personalized Ghana adventure with NYS Travels. Share your dates, budget, and interests to receive a custom itinerary."
        path="/book"
        jsonLd={[
          buildOrganizationSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book", path: "/book" },
          ]),
        ]}
      />
      <Header />
      <main className="min-h-screen bg-cream pt-20 pb-16">
        <section className="relative overflow-hidden bg-secondary text-white">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
          <div className="container-wide relative grid gap-8 py-14 md:grid-cols-[0.95fr_1.05fr] md:items-end md:py-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                Custom itinerary
              </div>
              <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">
                Plan a Ghana trip that feels personal.
              </h1>
            </div>
            <div className="max-w-xl text-white/78 md:justify-self-end">
              <p className="text-lg leading-relaxed">
                Answer a few focused questions. We will shape the route, timing, and experiences,
                then send a custom itinerary before any deposit is due.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.14em] text-white/62">
                <span className="rounded-full bg-white/10 px-3 py-2">3 steps</span>
                <span className="rounded-full bg-white/10 px-3 py-2">24-48 hrs</span>
                <span className="rounded-full bg-white/10 px-3 py-2">$50 later</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container-narrow -mt-7">
          <form onSubmit={handleSubmit} className="surface-card overflow-hidden">
            <div className="border-b border-sand/80 bg-sand/45 p-4 md:p-5">
              <div className="grid grid-cols-3 gap-2">
                {FORM_STEPS.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => index < activeStep && setActiveStep(index)}
                    className={cn(
                      "rounded-2xl px-3 py-3 text-left transition-all duration-300",
                      index === activeStep
                        ? "bg-white text-ink shadow-[var(--shadow-xs)]"
                        : index < activeStep
                          ? "text-secondary hover:bg-white/60"
                          : "text-charcoal/38"
                    )}
                  >
                    <span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em]">
                      {step.eyebrow}
                    </span>
                    <span className="mt-1 hidden text-sm font-semibold md:block">
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="mb-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {currentStep.eyebrow}
                </p>
                <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
                  {currentStep.title}
                </h2>
                <p className="mt-3 max-w-xl text-charcoal/62">
                  {currentStep.description}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeStep === 0 && (
                    <section className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                          Full name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className="w-full rounded-2xl border border-sand bg-cream/40 px-4 py-4 outline-none transition-colors focus:border-primary"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full rounded-2xl border border-sand bg-cream/40 px-4 py-4 outline-none transition-colors focus:border-primary"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                          Phone or WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="w-full rounded-2xl border border-sand bg-cream/40 px-4 py-4 outline-none transition-colors focus:border-primary"
                          placeholder="+233 ..."
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                          Preferred reply
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: "email", label: "Email", icon: Mail },
                            { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                          ].map((option) => {
                            const Icon = option.icon;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => updateField("contactPreference", option.value)}
                                className={cn(
                                  "flex h-[58px] items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition-all active:scale-[0.98]",
                                  formData.contactPreference === option.value
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-sand bg-cream/35 text-charcoal/70 hover:border-stone"
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                  )}

                  {activeStep === 1 && (
                    <section className="space-y-5">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                          Where would you like to go?
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
                          <input
                            type="text"
                            required
                            value={formData.destination}
                            onChange={(e) => updateField("destination", e.target.value)}
                          className="w-full rounded-2xl border border-sand bg-cream/40 py-4 pl-12 pr-4 outline-none transition-colors focus:border-primary"
                            placeholder="Accra, Cape Coast, Kumasi..."
                          />
                        </div>
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                            Start date
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.startDate}
                            onChange={(e) => updateField("startDate", e.target.value)}
                            className="w-full rounded-2xl border border-sand bg-cream/40 px-4 py-4 outline-none transition-colors focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                            End date
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.endDate}
                            onChange={(e) => updateField("endDate", e.target.value)}
                            className="w-full rounded-2xl border border-sand bg-cream/40 px-4 py-4 outline-none transition-colors focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                            Group size
                          </label>
                          <div className="flex h-[58px] max-w-xs items-center overflow-hidden rounded-2xl border border-sand bg-cream/40">
                            <button
                              type="button"
                              onClick={() => updateField("groupSize", Math.max(1, formData.groupSize - 1))}
                              className="h-full px-5 text-xl transition-colors hover:bg-sand"
                            >
                              -
                            </button>
                            <div className="flex flex-1 items-center justify-center gap-2 font-semibold">
                              <Users className="h-5 w-5 text-primary" />
                              {formData.groupSize} {formData.groupSize === 1 ? "person" : "people"}
                            </div>
                            <button
                              type="button"
                              onClick={() => updateField("groupSize", formData.groupSize + 1)}
                              className="h-full px-5 text-xl transition-colors hover:bg-sand"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                            Date flexibility
                          </label>
                          <div className="grid gap-2 sm:grid-cols-3">
                            {FLEXIBILITY_OPTIONS.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => updateField("flexibility", option.value)}
                                className={cn(
                                  "rounded-2xl border px-3 py-3 text-sm font-semibold transition-all active:scale-[0.98]",
                                  formData.flexibility === option.value
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-sand bg-cream/35 text-charcoal/70 hover:border-stone"
                                )}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {activeStep === 2 && (
                    <section className="space-y-6">
                      <div>
                        <label className="mb-3 block text-sm font-semibold text-charcoal/70">
                          Budget per person
                        </label>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                          {BUDGET_RANGES.map((range) => (
                            <button
                              key={range.value}
                              type="button"
                              onClick={() => updateField("budget", range.value)}
                              className={cn(
                                "rounded-2xl border p-4 text-left transition-all active:scale-[0.98]",
                                formData.budget === range.value
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-sand bg-cream/35 text-charcoal/70 hover:border-stone"
                              )}
                            >
                              <DollarSign className="mb-2 h-5 w-5" />
                              <span className="text-sm font-bold">{range.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="mb-3 block text-sm font-semibold text-charcoal/70">
                          What should we prioritize?
                        </label>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {INTEREST_OPTIONS.map((interest) => {
                            const Icon = interest.icon;
                            const isSelected = formData.interests.includes(interest.value);
                            return (
                              <button
                                key={interest.value}
                                type="button"
                                onClick={() => toggleInterest(interest.value)}
                                className={cn(
                                  "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all active:scale-[0.98]",
                                  isSelected
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-sand bg-cream/35 text-charcoal/70 hover:border-stone"
                                )}
                              >
                                <Icon className="h-5 w-5 shrink-0" />
                                <span className="font-semibold">{interest.label}</span>
                                {isSelected && <Check className="ml-auto h-4 w-4" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal/70">
                          Anything Nana should know?
                        </label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) => updateField("specialRequests", e.target.value)}
                          rows={4}
                          className="w-full resize-none rounded-2xl border border-sand bg-cream/40 px-4 py-4 outline-none transition-colors focus:border-primary"
                          placeholder="Pace, food needs, celebrations, must-see places..."
                        />
                      </div>
                      <div className="surface-soft p-5 text-sm text-charcoal/72">
                        <p className="font-semibold text-ink">No payment today.</p>
                        <p className="mt-1">
                          We send the route first. The $50 deposit only comes after you approve the custom itinerary.
                        </p>
                      </div>
                    </section>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-9 flex flex-col gap-3 border-t border-sand pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  disabled={activeStep === 0}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-charcoal/70 transition-all hover:bg-sand disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {isFinalStep ? (
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting || !canContinue}
                    className="min-w-[220px]"
                  >
                    {isSubmitting ? "Sending..." : "Request itinerary"}
                  </Button>
                ) : (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={!canContinue}
                    className="btn-primary h-13 min-w-[190px] px-6 text-sm uppercase tracking-[0.12em] disabled:pointer-events-none disabled:opacity-45"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              <p className="mt-5 text-center text-xs text-charcoal/50">
                By submitting, you agree to our{" "}
                <a href="/terms" className="text-primary hover:underline">Terms</a>
                {" "}and{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="min-h-screen bg-cream pt-24 pb-16">
          <div className="container-narrow">
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-charcoal/60">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <BookingFormContent />
    </Suspense>
  );
}
