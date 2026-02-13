'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Euro, Star } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface Attraction {
  id: number;
  name: { en: string; ro: string };
  description: { en: string; ro: string };
  distance: string;
  duration: string;
  price: { en: string; ro: string };
  rating: number;
  image: string;
  category: 'castle' | 'nature' | 'ski' | 'culture';
}

const attractions: Attraction[] = [
  {
    id: 1,
    name: { en: 'Peleș Castle', ro: 'Castelul Peleș' },
    description: { en: 'Neo-Renaissance masterpiece, former royal summer residence', ro: 'Capodopera neo-renascentistă, fosta reședință regală de vară' },
    distance: '8 km',
    duration: '15 min',
    price: { en: '60 RON adult', ro: '60 RON adult' },
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1595423498634-2e9e0c863e15?w=800&q=80',
    category: 'castle'
  },
  {
    id: 2,
    name: { en: 'Cantacuzino Castle', ro: 'Castelul Cantacuzino' },
    description: { en: 'Elegant castle with beautiful mountain views', ro: 'Castel elegant cu vedere superbă la munte' },
    distance: '10 km',
    duration: '18 min',
    price: { en: '30 RON adult', ro: '30 RON adult' },
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1549577187-83d6e0f36576?w=800&q=80',
    category: 'castle'
  },
  {
    id: 3,
    name: { en: 'Bucegi Mountains', ro: 'Munții Bucegi' },
    description: { en: 'Hiking trails, cable car, Sphinx and Babele rock formations', ro: 'Trasee montane, teleferic, formațiuni Sfinx și Babele' },
    distance: '12 km',
    duration: '20 min',
    price: { en: '100 RON cable car', ro: '100 RON teleferic' },
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    category: 'nature'
  },
  {
    id: 4,
    name: { en: 'Sorica Ski Resort', ro: 'Pârtia Sorica' },
    description: { en: 'Family-friendly ski slopes right in Azuga', ro: 'Pârtii de schi pentru familii direct în Azuga' },
    distance: '2 km',
    duration: '5 min',
    price: { en: '120 RON day pass', ro: '120 RON abonament zi' },
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
    category: 'ski'
  },
  {
    id: 5,
    name: { en: 'Azuga Monastery', ro: 'Mănăstirea Azuga' },
    description: { en: 'Peaceful Orthodox monastery with beautiful frescoes', ro: 'Mănăstire ortodoxă liniștită cu fresce frumoase' },
    distance: '3 km',
    duration: '7 min',
    price: { en: 'Free entry', ro: 'Intrare gratuită' },
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1d99?w=800&q=80',
    category: 'culture'
  },
  {
    id: 6,
    name: { en: 'Predeal', ro: 'Predeal' },
    description: { en: 'Highest town in Romania, great shopping and dining', ro: 'Cel mai înalt oraș din România, shopping și restaurante' },
    distance: '15 km',
    duration: '20 min',
    price: { en: 'Free to explore', ro: 'Explorare gratuită' },
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
    category: 'culture'
  }
];

export function LocalAttractions() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Nearby Attractions',
      subtitle: 'Discover the best of Prahova Valley',
      distance: 'Distance',
      duration: 'Drive Time',
      price: 'Entrance'
    },
    ro: {
      title: 'Atracții din Apropiere',
      subtitle: 'Descoperă cele mai bune locuri din Valea Prahovei',
      distance: 'Distanță',
      duration: 'Timp Condus',
      price: 'Intrare'
    }
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-32 bg-[var(--linen-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold mb-4">
            {t.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[var(--text-body)]">
            {t.subtitle}
          </p>
        </FadeIn>

        {/* Attractions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={attraction.image}
                    alt={attraction.name[language]}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-[var(--brown-deep)]">
                      {attraction.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--brown-deep)] font-semibold mb-2">
                    {attraction.name[language]}
                  </h3>
                  <p className="text-[var(--text-body)] text-sm mb-4 line-clamp-2">
                    {attraction.description[language]}
                  </p>

                  {/* Info Grid */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-body)]">
                      <MapPin size={16} className="text-[var(--green-deep)]" />
                      <span className="font-medium">{t.distance}:</span>
                      <span>{attraction.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-body)]">
                      <Clock size={16} className="text-[var(--green-deep)]" />
                      <span className="font-medium">{t.duration}:</span>
                      <span>{attraction.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-body)]">
                      <Euro size={16} className="text-[var(--green-deep)]" />
                      <span className="font-medium">{t.price}:</span>
                      <span>{attraction.price[language]}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
