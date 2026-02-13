'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: 'The most magical weekend we\'ve ever had. Waking up in The Pine with snow falling outside the windows was pure magic.',
    author: 'Sarah & James',
    date: 'December 2024',
    rating: 5,
  },
  {
    quote: 'We didn\'t want to leave. The Cedar was spotless, the hot tub was incredible, and the forest was right at our doorstep.',
    author: 'Michael T.',
    date: 'October 2024',
    rating: 5,
  },
  {
    quote: 'A hidden gem. The attention to detail in these cabins is remarkable. Already planning our next trip.',
    author: 'Emily R.',
    date: 'August 2024',
    rating: 5,
  },
  {
    quote: 'Perfect for our family reunion. The kids loved exploring the trails and we loved relaxing by the fire.',
    author: 'The Andersons',
    date: 'July 2024',
    rating: 5,
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 md:py-32 bg-[var(--espresso-deep)] text-[var(--cream-warm)] grain-texture">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-semibold mb-4">
            What Our Guests Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/10">
                    {/* Quote Icon */}
                    <Quote
                      size={48}
                      className="text-[var(--green-sage)] mb-4"
                      strokeWidth={1.5}
                    />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-[var(--green-sage)] text-[var(--green-sage)]"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="font-[family-name:var(--font-heading)] italic text-lg mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="border-t border-white/10 pt-4">
                      <p className="font-[family-name:var(--font-body)] font-semibold">
                        {testimonial.author}
                      </p>
                      <p className="text-[var(--cream-warm)]/60 text-sm">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
