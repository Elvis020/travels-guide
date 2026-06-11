"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
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
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
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
      <main className="min-h-screen bg-cream pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-16">
          <div className="container-narrow text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Custom Itinerary
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Create Your Perfect Ghana Adventure
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tell us what you'd love to experience, and we'll craft a personalized itinerary
              just for you. Only $50 deposit to get started.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="container-narrow -mt-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="space-y-8">
              {/* Personal Information */}
              <section>
                <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    1
                  </div>
                  Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-sand rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Email <span className="text-error">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-sand rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Phone Number <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-sand rounded-xl focus:border-primary focus:outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Contact Preference <span className="text-error">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => updateField("contactPreference", "email")}
                        className={cn(
                          "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all",
                          formData.contactPreference === "email"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-sand hover:border-stone"
                        )}
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("contactPreference", "whatsapp")}
                        className={cn(
                          "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all",
                          formData.contactPreference === "whatsapp"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-sand hover:border-stone"
                        )}
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Trip Details */}
              <section>
                <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    2
                  </div>
                  Trip Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Destination <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => updateField("destination", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-sand rounded-xl focus:border-primary focus:outline-none transition-colors"
                        placeholder="e.g., Accra, Cape Coast, Kumasi"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Preferred Start Date <span className="text-error">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => updateField("startDate", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-sand rounded-xl focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal/70 mb-2">
                        Preferred End Date <span className="text-error">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => updateField("endDate", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-sand rounded-xl focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-3">
                      Date Flexibility
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {FLEXIBILITY_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateField("flexibility", option.value)}
                          className={cn(
                            "px-4 py-3 rounded-xl border-2 transition-all text-sm",
                            formData.flexibility === option.value
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-sand hover:border-stone"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Group Size <span className="text-error">*</span>
                    </label>
                    <div className="flex items-center border-2 border-sand rounded-xl overflow-hidden max-w-xs">
                      <button
                        type="button"
                        onClick={() => updateField("groupSize", Math.max(1, formData.groupSize - 1))}
                        className="px-6 py-3 hover:bg-sand transition-colors"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center font-medium flex items-center justify-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        {formData.groupSize} {formData.groupSize === 1 ? "person" : "people"}
                      </div>
                      <button
                        type="button"
                        onClick={() => updateField("groupSize", formData.groupSize + 1)}
                        className="px-6 py-3 hover:bg-sand transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Budget */}
              <section>
                <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    3
                  </div>
                  Budget Range
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {BUDGET_RANGES.map((range) => (
                    <button
                      key={range.value}
                      type="button"
                      onClick={() => updateField("budget", range.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        formData.budget === range.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-sand hover:border-stone"
                      )}
                    >
                      <DollarSign className="w-6 h-6" />
                      <span className="font-medium text-sm">{range.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-charcoal/60 mt-3">
                  * Budget is per person and includes accommodations, transport, activities, and most meals
                </p>
              </section>

              {/* Interests */}
              <section>
                <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    4
                  </div>
                  Interests & Preferences
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {INTEREST_OPTIONS.map((interest) => {
                    const Icon = interest.icon;
                    const isSelected = formData.interests.includes(interest.value);
                    return (
                      <button
                        key={interest.value}
                        type="button"
                        onClick={() => toggleInterest(interest.value)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-sand hover:border-stone"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{interest.label}</span>
                        {isSelected && <Check className="w-4 h-4 ml-auto" />}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    Special Requests or Additional Information
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => updateField("specialRequests", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-sand rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about what makes this trip special for you..."
                  />
                </div>
              </section>

              {/* Deposit Information */}
              <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold text-ink mb-3 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-accent" />
                  $50 Deposit
                </h3>
                <p className="text-charcoal/70 mb-4">
                  After submitting this form, you'll receive your custom itinerary within 24-48 hours.
                  Once you approve it, pay a $50 deposit to confirm your booking. The deposit will be
                  applied to your total trip cost.
                </p>
                <ul className="space-y-2 text-sm text-charcoal/70">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    Deposit is fully refundable up to 60 days before departure
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    Secure payment processing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    Final payment due 30 days before trip
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? "Submitting..." : "Request Custom Itinerary"}
              </Button>

              <p className="text-center text-sm text-charcoal/60">
                By submitting this form, you agree to our{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
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
