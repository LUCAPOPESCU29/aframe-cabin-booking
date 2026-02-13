'use client';

import { motion } from 'framer-motion';
import {
  Snowflake,
  Sun,
  Shirt,
  Footprints,
  Camera,
  Backpack,
  Zap,
  Pill,
  Mountain,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface PackingItem {
  icon: any;
  name: { en: string; ro: string };
  items: { en: string[]; ro: string[] };
}

const packingCategories: PackingItem[] = [
  {
    icon: Shirt,
    name: { en: 'Clothing', ro: 'Îmbrăcăminte' },
    items: {
      en: ['Warm layers (fleece, sweaters)', 'Waterproof jacket', 'Comfortable pants', 'Thermal underwear', 'Socks (wool recommended)', 'Hat and gloves', 'Sleepwear'],
      ro: ['Straturi calde (fleece, pulovere)', 'Jachetă impermeabilă', 'Pantaloni confortabili', 'Lenjerie termică', 'Șosete (lână recomandate)', 'Căciulă și mănuși', 'Pijamale']
    }
  },
  {
    icon: Footprints,
    name: { en: 'Footwear', ro: 'Încălțăminte' },
    items: {
      en: ['Hiking boots (waterproof)', 'Indoor slippers', 'Winter boots (if snowy)', 'Extra socks'],
      ro: ['Bocanci de drumeție (impermeabili)', 'Papuci de casă', 'Cizme de iarnă (dacă e zăpadă)', 'Șosete extra']
    }
  },
  {
    icon: Backpack,
    name: { en: 'Essentials', ro: 'Esențiale' },
    items: {
      en: ['Valid ID/Passport', 'Phone charger', 'Power bank', 'Flashlight/Headlamp', 'Reusable water bottle', 'Sunglasses', 'Sunscreen (even in winter!)'],
      ro: ['Act de identitate valabil', 'Încărcător telefon', 'Baterie externă', 'Lanternă', 'Sticlă de apă refolosibilă', 'Ochelari de soare', 'Cremă de protecție solară']
    }
  },
  {
    icon: Pill,
    name: { en: 'Health & Hygiene', ro: 'Sănătate & Igienă' },
    items: {
      en: ['Personal medications', 'First aid basics', 'Toiletries', 'Lip balm', 'Hand sanitizer', 'Insect repellent (summer)'],
      ro: ['Medicamente personale', 'Trusă prim ajutor', 'Produse de igienă', 'Balsam de buze', 'Gel dezinfectant', 'Spray anti-insecte (vară)']
    }
  },
  {
    icon: Mountain,
    name: { en: 'Outdoor Gear', ro: 'Echipament Exterior' },
    items: {
      en: ['Daypack for hiking', 'Trekking poles', 'Binoculars', 'Maps/GPS device', 'Picnic blanket'],
      ro: ['Rucsac de zi pentru drumeții', 'Bețe de trekking', 'Binoclu', 'Hărți/GPS', 'Pătură de picnic']
    }
  },
  {
    icon: Camera,
    name: { en: 'Entertainment', ro: 'Divertisment' },
    items: {
      en: ['Camera/GoPro', 'Books or e-reader', 'Board games', 'Music player', 'Portable speaker'],
      ro: ['Cameră foto/GoPro', 'Cărți sau e-reader', 'Jocuri de masă', 'Player muzică', 'Boxa portabilă']
    }
  }
];

const seasonalTips = {
  en: {
    winter: {
      title: 'Winter Essentials (Dec-Mar)',
      items: ['Ski/snowboard gear (or rent locally)', 'Hand/toe warmers', 'Thermal layers', 'Ice grips for boots', 'Insulated gloves']
    },
    summer: {
      title: 'Summer Essentials (Jun-Aug)',
      items: ['Swimsuit', 'Hiking sandals', 'Sun hat', 'Bug spray', 'Light rain jacket']
    }
  },
  ro: {
    winter: {
      title: 'Esențiale Iarnă (Dec-Mar)',
      items: ['Echipament ski/snowboard (sau închiriază local)', 'Încălzitoare mâini/picioare', 'Straturi termice', 'Crampoane pentru bocanci', 'Mănuși izolate']
    },
    summer: {
      title: 'Esențiale Vară (Iun-Aug)',
      items: ['Costum de baie', 'Sandale drumeție', 'Pălărie de soare', 'Spray anti-insecte', 'Jachetă ușoară ploaie']
    }
  }
};

export function PackingList() {
  const { language } = useLanguage();
  const [season, setSeason] = useState<'winter' | 'summer'>('winter');

  const content = {
    en: {
      title: 'Packing Guide',
      subtitle: 'Be prepared for your mountain adventure',
      winterBtn: 'Winter Pack',
      summerBtn: 'Summer Pack',
      note: 'Note: The cabin provides linens, towels, basic toiletries, and kitchen essentials. No need to pack these!'
    },
    ro: {
      title: 'Ghid Bagaje',
      subtitle: 'Fii pregătit pentru aventura ta montană',
      winterBtn: 'Bagaj Iarnă',
      summerBtn: 'Bagaj Vară',
      note: 'Notă: Cabana oferă lenjerie, prosoape, produse de igienă de bază și esențiale de bucătărie. Nu e nevoie să le aduci!'
    }
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold mb-4">
            {t.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[var(--text-body)] mb-6">
            {t.subtitle}
          </p>

          {/* Season Toggle */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSeason('winter')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                season === 'winter'
                  ? 'bg-[var(--green-deep)] text-white'
                  : 'bg-white text-[var(--brown-deep)] border-2 border-[var(--green-deep)]'
              }`}
            >
              <Snowflake size={20} className="inline mr-2" />
              {t.winterBtn}
            </button>
            <button
              onClick={() => setSeason('summer')}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                season === 'summer'
                  ? 'bg-[var(--green-deep)] text-white'
                  : 'bg-white text-[var(--brown-deep)] border-2 border-[var(--green-deep)]'
              }`}
            >
              <Sun size={20} className="inline mr-2" />
              {t.summerBtn}
            </button>
          </div>
        </FadeIn>

        {/* Seasonal Tips */}
        <motion.div
          key={season}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-[var(--green-deep)] to-[var(--green-sage)] text-white p-8">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold mb-4">
              {seasonalTips[language][season].title}
            </h3>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {seasonalTips[language][season].items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Packing Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {packingCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--green-deep)]/10 flex items-center justify-center">
                      <CategoryIcon className="text-[var(--green-deep)]" size={24} />
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--brown-deep)] font-semibold">
                      {category.name[language]}
                    </h3>
                  </div>

                  <ul className="space-y-2">
                    {category.items[language].map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-[var(--text-body)]">
                        <CheckCircle2 size={16} className="text-[var(--green-deep)] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-blue-900">
            <strong>{language === 'en' ? '💡 Pro Tip:' : '💡 Sfat Util:'}</strong> {t.note}
          </p>
        </div>
      </div>
    </section>
  );
}
