'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/fade-in';
import { TreePine } from 'lucide-react';

export function About() {
  return (
    <section className="py-20 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <FadeIn>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <TreePine
                  size={32}
                  className="text-[var(--green-deep)]"
                  strokeWidth={1.5}
                />
                <div className="h-px bg-[var(--green-deep)] w-16" />
              </div>

              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold">
                A Retreat Like No Other
              </h2>

              <div className="space-y-4 text-[var(--text-body)] text-lg leading-relaxed">
                <p>
                  Nestled deep in the heart of ancient forest, our two handcrafted A-frame cabins offer
                  a sanctuary from the modern world. Here, time moves differently. The rustle of pine
                  needles, the call of distant birds, and the gentle whisper of wind through the trees
                  become your daily soundtrack.
                </p>
                <p>
                  Each cabin has been thoughtfully designed to blend seamlessly with its natural
                  surroundings while providing every modern comfort. From the warmth of a crackling fire
                  to the luxury of a starlit hot tub, we've created spaces where you can truly disconnect
                  to reconnect—with nature, with loved ones, and with yourself.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Image */}
          <FadeIn delay={0.2}>
            <motion.div
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80"
                alt="Cozy cabin interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
