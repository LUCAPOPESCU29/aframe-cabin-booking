'use client';

import {
  Wifi,
  Tv,
  Wind,
  Flame,
  Car,
  Coffee,
  Utensils,
  Refrigerator,
  Microwave,
  Armchair,
  Bed,
  Bath,
  Shirt,
  Volume2,
  TreePine,
  Mountain,
  Home,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';

interface Amenity {
  icon: any;
  name: { en: string; ro: string };
  available: boolean;
}

const amenities: Amenity[] = [
  { icon: Wifi, name: { en: 'High-Speed WiFi', ro: 'WiFi de Mare Viteză' }, available: true },
  { icon: Tv, name: { en: 'Smart TV', ro: 'Smart TV' }, available: true },
  { icon: Wind, name: { en: 'Heating', ro: 'Încălzire' }, available: true },
  { icon: Flame, name: { en: 'Fireplace', ro: 'Șemineu' }, available: true },
  { icon: Car, name: { en: 'Free Parking', ro: 'Parcare Gratuită' }, available: true },
  { icon: Coffee, name: { en: 'Coffee Maker', ro: 'Aparat de Cafea' }, available: true },
  { icon: Utensils, name: { en: 'Fully Equipped Kitchen', ro: 'Bucătărie Complet Echipată' }, available: true },
  { icon: Refrigerator, name: { en: 'Refrigerator', ro: 'Frigider' }, available: true },
  { icon: Microwave, name: { en: 'Microwave', ro: 'Cuptor cu Microunde' }, available: true },
  { icon: Armchair, name: { en: 'Comfortable Seating', ro: 'Locuri de Ședere Confortabile' }, available: true },
  { icon: Bed, name: { en: 'Premium Bedding', ro: 'Lenjerie Premium' }, available: true },
  { icon: Bath, name: { en: 'Hot Water', ro: 'Apă Caldă' }, available: true },
  { icon: Shirt, name: { en: 'Towels & Linens', ro: 'Prosoape & Lenjerie' }, available: true },
  { icon: Volume2, name: { en: 'Bluetooth Speaker', ro: 'Difuzor Bluetooth' }, available: true },
  { icon: TreePine, name: { en: 'Private Garden', ro: 'Grădină Privată' }, available: true },
  { icon: Mountain, name: { en: 'Mountain Views', ro: 'Vedere la Munte' }, available: true },
  { icon: Home, name: { en: 'Private Entrance', ro: 'Intrare Privată' }, available: true },
];

export function AmenitiesList() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Amenities',
      subtitle: 'Everything you need for a comfortable stay',
    },
    ro: {
      title: 'Facilități',
      subtitle: 'Tot ce ai nevoie pentru un sejur confortabil',
    },
  };

  const t = content[language];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md">
      <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-[var(--brown-deep)] font-semibold mb-2">
        {t.title}
      </h3>
      <p className="text-[var(--text-body)] mb-6">{t.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => {
          const Icon = amenity.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--linen-soft)] transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--green-deep)]/10 flex items-center justify-center">
                <Icon size={20} className="text-[var(--green-deep)]" />
              </div>
              <div className="flex-1">
                <span className="text-[var(--brown-deep)] font-medium">
                  {amenity.name[language]}
                </span>
              </div>
              {amenity.available && (
                <CheckCircle2 size={18} className="text-[var(--green-deep)] flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
