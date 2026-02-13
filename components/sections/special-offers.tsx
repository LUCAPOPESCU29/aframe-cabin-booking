'use client';

import { motion } from 'framer-motion';
import { Percent, Calendar, Users, Gift, Clock } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface Offer {
  id: number;
  icon: any;
  title: { en: string; ro: string };
  description: { en: string; ro: string };
  discount: string;
  validUntil: { en: string; ro: string };
  code: string;
}

const offers: Offer[] = [
  {
    id: 1,
    icon: Calendar,
    title: { en: 'Extended Stay Discount', ro: 'Reducere Sejur Prelungit' },
    description: { en: 'Book 5 nights or more and save 15%', ro: 'Rezervă 5 nopți sau mai multe și economisești 15%' },
    discount: '15%',
    validUntil: { en: 'Valid year-round', ro: 'Valabil tot anul' },
    code: 'STAY5'
  },
  {
    id: 2,
    icon: Users,
    title: { en: 'Group Booking', ro: 'Rezervare Grup' },
    description: { en: 'Book both cabins and get 20% off total price', ro: 'Rezervă ambele cabane și primești 20% reducere' },
    discount: '20%',
    validUntil: { en: 'Valid year-round', ro: 'Valabil tot anul' },
    code: 'GROUP20'
  },
  {
    id: 3,
    icon: Clock,
    title: { en: 'Last Minute Deal', ro: 'Ofertă Last Minute' },
    description: { en: 'Book within 48 hours of check-in for 10% off', ro: 'Rezervă cu 48h înainte de check-in pentru 10% reducere' },
    discount: '10%',
    validUntil: { en: 'Subject to availability', ro: 'În funcție de disponibilitate' },
    code: 'LASTMIN'
  },
  {
    id: 4,
    icon: Gift,
    title: { en: 'Midweek Special', ro: 'Ofertă Midweek' },
    description: { en: 'Mon-Thu stays get complimentary breakfast basket', ro: 'Sejururile Lun-Joi primesc coș de mic dejun gratuit' },
    discount: 'FREE',
    validUntil: { en: 'Monday to Thursday', ro: 'Luni până Joi' },
    code: 'MIDWEEK'
  }
];

export function SpecialOffers() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Special Offers',
      subtitle: 'Limited time deals and discounts',
      bookNow: 'Book Now',
      useCode: 'Use Code'
    },
    ro: {
      title: 'Oferte Speciale',
      subtitle: 'Oferte și reduceri cu durată limitată',
      bookNow: 'Rezervă Acum',
      useCode: 'Folosește Codul'
    }
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-sage)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-white font-semibold mb-4">
            {t.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/90">
            {t.subtitle}
          </p>
        </FadeIn>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => {
            const OfferIcon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  {/* Discount Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--green-deep)]/10 flex items-center justify-center">
                      <OfferIcon className="text-[var(--green-deep)]" size={24} />
                    </div>
                    <div className="bg-[var(--green-deep)] text-white px-3 py-1 rounded-full text-sm font-bold">
                      {offer.discount === 'FREE' ? offer.discount : `-${offer.discount}`}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--brown-deep)] font-semibold mb-2">
                    {offer.title[language]}
                  </h3>
                  <p className="text-[var(--text-body)] text-sm mb-4 line-clamp-2">
                    {offer.description[language]}
                  </p>

                  {/* Code */}
                  <div className="bg-[var(--linen-soft)] rounded-lg p-3 mb-4">
                    <p className="text-xs text-[var(--text-body)] mb-1">{t.useCode}:</p>
                    <p className="font-mono font-bold text-[var(--brown-deep)]">{offer.code}</p>
                  </div>

                  {/* Valid Until */}
                  <p className="text-xs text-[var(--text-body)] mb-4 flex items-center gap-1">
                    <Clock size={14} />
                    {offer.validUntil[language]}
                  </p>

                  {/* CTA */}
                  <Button
                    asChild
                    className="w-full bg-[var(--green-deep)] text-white hover:bg-[var(--green-sage)] rounded-full"
                  >
                    <Link href="/cabins/the-pine">
                      {t.bookNow}
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
