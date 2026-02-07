'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { ChevronDown, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Dedicated FAQ Page
 * Complete list of frequently asked questions
 */

const faqs = [
  {
    question: "Is Ghana safe for tourists?",
    answer: "Yes! Ghana is one of the safest countries in West Africa with a stable democracy and welcoming culture. I personally ensure your safety with vetted accommodations, reliable transportation, and 24/7 support. I've guided 500+ travelers with zero safety incidents."
  },
  {
    question: "What's included in the tour price?",
    answer: "All accommodations, transportation, guided tours, entrance fees, most meals, and 24/7 guide support. Not included: international flights, travel insurance, personal expenses, and some dinners (so you can explore local restaurants)."
  },
  {
    question: "Can I customize my itinerary?",
    answer: "Absolutely! After your $50 deposit, we'll have a video call to customize your trip based on your interests—whether that's more history, adventure, culture, or relaxation."
  },
  {
    question: "What if I need to cancel?",
    answer: "The $50 deposit is fully refundable up to 60 days before departure. After that, cancellation terms depend on how close to departure, but I work with you to reschedule when possible."
  },
  {
    question: "How big are the groups?",
    answer: "I keep groups small - maximum 8 travelers for personalized attention. Private tours for couples/families are also available."
  },
  {
    question: "What's the weather like?",
    answer: "Ghana has two seasons: dry (November-March) with 85-90°F and humid rainy (April-October). Best time to visit is November-February for wildlife viewing and comfortable weather."
  },
  {
    question: "Do I need a visa?",
    answer: "US citizens need a visa to enter Ghana. I'll provide detailed instructions and support for the application process after booking."
  },
  {
    question: "What vaccinations do I need?",
    answer: "Yellow fever vaccination is required. Recommended: Hepatitis A/B, Typhoid, and routine vaccines. I'll send you a complete health checklist after booking with specific recommendations."
  },
  {
    question: "What should I pack?",
    answer: "Light, breathable clothing (long sleeves for evenings), comfortable walking shoes, sunscreen, insect repellent, and a hat. I'll send you a detailed packing list after booking."
  },
  {
    question: "Can I travel solo?",
    answer: "Yes! Solo travelers are welcome. You'll join a small group and many of my past travelers have been solo adventurers. Single supplement fees may apply for private accommodations."
  },
  {
    question: "What's the food like?",
    answer: "Ghanaian cuisine is flavorful and diverse - jollof rice, fufu, grilled tilapia, kelewele (spiced plantains), and more. I accommodate dietary restrictions and can arrange vegetarian/vegan options."
  },
  {
    question: "Do I need travel insurance?",
    answer: "Highly recommended! I can recommend providers that cover medical emergencies, trip cancellations, and evacuations. It's a small cost for peace of mind."
  }
];

export default function FAQPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-secondary text-white overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/50" />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-display !text-white leading-[1.05] mb-8"
              >
                Got Questions?
                <br />
                <span className="text-primary">We've Got Answers</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl !text-white/60 leading-relaxed max-w-2xl mx-auto mb-12"
              >
                Everything you need to know about your Ghana adventure—from safety to booking. Can't find your answer? {' '}
                <a
                  href="mailto:hello@nystravels.com"
                  className="!text-primary hover:!text-primary/80 transition-colors border-b border-primary/40 hover:border-primary/80"
                >
                  We're here to help
                </a>
              </motion.p>

              {/* Quick categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
              >
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="!text-white/70 text-sm font-medium">🛡️ Safety</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="!text-white/70 text-sm font-medium">💰 Pricing</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="!text-white/70 text-sm font-medium">✈️ Travel</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="!text-white/70 text-sm font-medium">📅 Booking</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="relative py-20 md:py-32 bg-cream">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-stone last:border-0 overflow-hidden">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                    className="w-full py-8 flex items-start justify-between gap-4 text-left group"
                  >
                    <div>
                      <div className="text-sm text-primary font-semibold mb-2">{String(i + 1).padStart(2, '0')}</div>
                      <h3 className="text-xl md:text-2xl font-display text-ink group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${activeAccordion === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {activeAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.3, ease: 'easeInOut' }
                        }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="pb-8 text-lg text-charcoal leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="text-center mt-20">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-display text-ink mb-4">
                  Still have questions?
                </h3>
                <p className="text-lg text-charcoal mb-8">
                  I'm here to help! Send me an email and I'll get back to you within 24 hours.
                </p>
                <a
                  href="mailto:hello@nystravels.com"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Email Nana Yaw
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
