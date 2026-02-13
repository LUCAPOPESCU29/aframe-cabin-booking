'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cabin } from '@/lib/data/cabins';

interface CabinHeroProps {
  cabin: Cabin;
}

export function CabinHero({ cabin }: CabinHeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
    <section className="relative bg-[var(--cream-warm)]">
      {/* Image Carousel */}
      <div className="relative w-full aspect-[21/9] bg-gray-200 overflow-hidden">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {cabin.images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                <Image
                  src={image}
                  alt={`${cabin.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border-0 hover:bg-white disabled:opacity-30"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border-0 hover:bg-white disabled:opacity-30"
        >
          <ChevronRight size={24} />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {cabin.images.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Cabin Info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-bold mb-2">
              {cabin.name}
            </h1>
            <div className="flex items-center gap-4 text-[var(--text-body)]">
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-[var(--green-deep)]" />
                <span className="text-sm">Azuga, Romania</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[var(--green-deep)] text-[var(--green-deep)]"
                  />
                ))}
                <span className="text-sm ml-1">(5.0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
