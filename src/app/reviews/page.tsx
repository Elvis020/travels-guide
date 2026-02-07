"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { reviews } from "@/data/reviews";
import { Star, Quote } from "lucide-react";

export default function ReviewsPage() {
  // Calculate average rating
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-secondary overflow-hidden">
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/50" />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6"
              >
                Traveler
                <span className="text-primary pl-2">Reviews</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-lg md:text-xl !text-white/60 leading-relaxed max-w-2xl mx-auto"
              >
                Real stories from real adventurers who've experienced the magic
                of Ghana with us
              </motion.p>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20 md:py-32">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20">
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Quote className="w-3 h-3 !text-white" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink text-lg mb-1">
                        {review.name}
                      </h3>
                      <p className="text-charcoal/60 text-sm mb-2">
                        {review.location}
                      </p>

                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-primary text-primary"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-charcoal text-base leading-relaxed mb-4">
                    "{review.quote}"
                  </blockquote>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-primary text-sm font-medium">
                      {review.trip}
                    </span>
                    <span className="text-charcoal/40 text-xs">
                      {review.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-display !text-white mb-4">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-lg !text-white/60 mb-8">
              Join hundreds of travelers who've discovered the magic of Ghana
            </p>
            <a
              href="/trips"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Explore Our Trips
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
