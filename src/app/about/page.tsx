'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Star, Users, Globe, Heart, Shield, Award } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '500+', label: 'Tours Led' },
    { icon: Globe, value: '10+', label: 'Years Experience' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' },
    { icon: Heart, value: '100%', label: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your security and comfort are our top priorities. Vetted accommodations and 24/7 support.',
    },
    {
      icon: Heart,
      title: 'Authentic Experiences',
      description: 'Beyond tourist traps. Real connections with local culture, people, and traditions.',
    },
    {
      icon: Users,
      title: 'Small Groups',
      description: 'Maximum 8 travelers per tour. Personal attention and genuine connections.',
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Local knowledge that can\'t be Googled. Stories, insights, and hidden gems.',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/50" />

          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl md:text-7xl lg:text-8xl !text-white leading-[1.05] mb-8"
              >
                Your Journey,
                <br />
                <span className="text-primary">Our Passion</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl !text-white/60 leading-relaxed max-w-3xl mx-auto"
              >
                For over a decade, we've been crafting unforgettable African experiences. Every tour is personal. Every moment is authentic. Every traveler becomes family.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-cream">
          <div className="container-wide">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-charcoal/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
                  alt="Nana Yaw"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl font-display text-ink mb-6">
                  Meet Nana Yaw
                </h2>
                <div className="space-y-4 text-charcoal leading-relaxed">
                  <p>
                    Born and raised in Ghana, I've spent the last decade showing travelers the Ghana that guidebooks miss—the real stories, the hidden gems, and the genuine connections.
                  </p>
                  <p>
                    What started as a passion for sharing my culture has become a calling. I don't just lead tours; I create experiences that change perspectives and forge lifelong friendships.
                  </p>
                  <p>
                    Every journey is personal. Every itinerary is customized. And every traveler leaves with more than photos—they leave with stories, connections, and a piece of Ghana in their heart.
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href="/trips"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Explore Our Trips
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-32 bg-sand">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display text-ink mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-charcoal/70">
                The principles that guide every journey we create
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display text-ink mb-3">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-display !text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg !text-white/60 mb-8">
              Join hundreds of travelers who've discovered the magic of Ghana
            </p>
            <Link
              href="/trips"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              View Our Trips
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
