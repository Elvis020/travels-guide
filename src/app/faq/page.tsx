'use client';

import { useState } from 'react';
import { Seo } from '@/components/seo/Seo';
import { Header, Footer } from '@/components/layout';
import { Link } from '@/components/ui';
import { faqCategories } from '@/data/faqs';
import { buildBreadcrumbSchema, buildFAQSchema, buildOrganizationSchema } from '@/lib/seo';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Dedicated FAQ Page
 * Complete list of frequently asked questions
 */

export default function FAQPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleCategories =
    activeCategory === "All"
      ? faqCategories
      : faqCategories.filter((category) => category.title === activeCategory);
  const categoryFilters = [
    { title: "All", emoji: "✨" },
    ...faqCategories.map((category) => ({
      title: category.title,
      emoji:
        {
          "General & Booking": "📅",
          "Custom & Private Tours": "🚘",
          "Safety & Health": "🛡️",
          "On the Road": "🎒",
          "Payments & Currency": "💳",
        }[category.title] ?? "💬",
    })),
  ];

  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Find answers about booking Ghana tours, private itineraries, payments, safety, and travel logistics with NYS Travels."
        path="/faq"
        jsonLd={[
          buildOrganizationSchema(),
          buildFAQSchema(faqCategories),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary py-20 text-white md:py-24">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/50" />

          <div className="container-wide relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 font-display text-4xl leading-tight !text-white md:text-5xl lg:text-6xl"
              >
                Got Questions?
                <br />
                <span className="text-primary">We&apos;ve Got Answers</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mb-10 max-w-2xl text-base leading-relaxed !text-white/62 md:text-lg"
              >
                Everything you need to know about your Ghana experience, from safety to booking. Can&apos;t find your answer?{' '}
                <a
                  href="mailto:hello@nystravels.com"
                  className="!text-primary hover:!text-primary/80 transition-colors border-b border-primary/40 hover:border-primary/80"
                >
                  We&apos;re here to help
                </a>
              </motion.p>

              {/* Quick category filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center justify-center gap-2.5"
              >
                {categoryFilters.map((category) => {
                  const isActive = activeCategory === category.title;

                  return (
                    <button
                      key={category.title}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category.title);
                        setActiveAccordion(null);
                      }}
                      className={`group flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? 'border-primary bg-primary text-white shadow-[0_12px_28px_rgba(232,106,51,0.24)]'
                          : 'border-white/12 bg-white/5 !text-white/74 hover:border-white/25 hover:bg-white/10'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="text-base leading-none transition-transform duration-300 group-hover:-translate-y-0.5">
                        {category.emoji}
                      </span>
                      <span>
                        {category.title.replace(" & Currency", "")}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="relative bg-cream py-16 md:py-24">
          <div className="container-wide">
            <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
              {visibleCategories.map((category, categoryIndex) => (
                <section
                  key={category.title}
                  className="overflow-hidden rounded-[28px] border border-primary/10 bg-white shadow-[0_18px_60px_rgba(26,24,21,0.07)]"
                >
                  <div className="flex flex-col gap-3 border-b border-sand bg-cream/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
                    <div>
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                        {String(categoryIndex + 1).padStart(2, '0')}
                      </div>
                      <div className="font-body text-[15px] font-semibold uppercase tracking-[0.16em] text-ink">
                        {category.title}
                      </div>
                    </div>
                    <div className="text-sm text-charcoal/48">
                      {category.items.length} {category.items.length === 1 ? 'answer' : 'answers'}
                    </div>
                  </div>

                  <div className="px-5 md:px-7">
                    {category.items.map((faq, faqIndex) => {
                      const accordionId = `${category.title}-${faqIndex}`;
                      const displayIndex = String(faqIndex + 1).padStart(2, '0');
                      const isActive = activeAccordion === accordionId;

                      return (
                        <div key={faq.question} className="border-b border-sand last:border-0 overflow-hidden">
                          <button
                            onClick={() => setActiveAccordion(isActive ? null : accordionId)}
                            className="flex w-full items-start justify-between gap-5 py-5 text-left group md:py-5"
                          >
                            <div className="flex min-w-0 gap-4 md:gap-5">
                              <div className="pt-1 text-xs font-semibold text-primary/58">{displayIndex}</div>
                              <span className="font-display text-[1.35rem] font-medium leading-tight tracking-[-0.01em] text-ink transition-colors group-hover:text-primary md:text-[1.7rem]">
                                {faq.question}
                              </span>
                            </div>
                            <ChevronDown className={`mt-1 h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {isActive && (
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
                                <div className="pb-5 pl-10 text-[15px] leading-relaxed text-charcoal/82 md:max-w-3xl md:pl-12">
                                  {faq.answer}
                                  {faq.link && (
                                    <div className="mt-4">
                                      <Link
                                        href={faq.link.href}
                                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                      >
                                        {faq.link.text}
                                        <span>→</span>
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="mt-16 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="mb-4 font-display text-3xl text-ink md:text-4xl">
                  Still have questions?
                </div>
                <p className="mb-8 text-base text-charcoal md:text-lg">
                  I&apos;m here to help. Send me an email and I&apos;ll get back to you within 24 hours.
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
