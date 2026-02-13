'use client';

import { motion } from 'framer-motion';
import { Car, Train, Plane, Bus, MapPin, Clock, Euro, Navigation } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';
import { Card } from '@/components/ui/card';

interface TransportOption {
  id: number;
  icon: any;
  title: { en: string; ro: string };
  duration: string;
  cost: { en: string; ro: string };
  description: { en: string; ro: string };
  steps: { en: string[]; ro: string[] };
}

const transportOptions: TransportOption[] = [
  {
    id: 1,
    icon: Car,
    title: { en: 'By Car (Recommended)', ro: 'Cu Mașina (Recomandat)' },
    duration: '2 hours',
    cost: { en: '~50-70 RON fuel', ro: '~50-70 RON combustibil' },
    description: { en: 'Most convenient option with scenic mountain views', ro: 'Cea mai convenabilă opțiune cu priveliști montane spectaculoase' },
    steps: {
      en: [
        'From Bucharest, take DN1/E60 north towards Ploiești',
        'Continue on DN1 through Comarnic, Sinaia, and Bușteni',
        'Azuga is 140 km from Bucharest (approximately 2 hours)',
        'GPS Coordinates: 45.44580° N, 25.57525° E',
        'Free parking available at the cabin'
      ],
      ro: [
        'Din București, mergi pe DN1/E60 spre nord către Ploiești',
        'Continuă pe DN1 prin Comarnic, Sinaia și Bușteni',
        'Azuga este la 140 km de București (aproximativ 2 ore)',
        'Coordonate GPS: 45.44580° N, 25.57525° E',
        'Parcare gratuită disponibilă la cabană'
      ]
    }
  },
  {
    id: 2,
    icon: Train,
    title: { en: 'By Train', ro: 'Cu Trenul' },
    duration: '2.5-3 hours',
    cost: { en: '40-80 RON per person', ro: '40-80 RON per persoană' },
    description: { en: 'Scenic route through the Carpathians', ro: 'Traseu scenic prin Carpați' },
    steps: {
      en: [
        'Depart from București Gara de Nord',
        'Take InterRegio (IR) train to Azuga station',
        'Trains run regularly throughout the day',
        'Journey time: 2.5-3 hours',
        'We can arrange pickup from Azuga station (50 RON)'
      ],
      ro: [
        'Plecare din București Gara de Nord',
        'Ia trenul InterRegio (IR) către stația Azuga',
        'Trenurile circulă regulat pe tot parcursul zilei',
        'Timp de călătorie: 2.5-3 ore',
        'Putem aranja preluare de la gara Azuga (50 RON)'
      ]
    }
  },
  {
    id: 3,
    icon: Bus,
    title: { en: 'By Bus', ro: 'Cu Autobuzul' },
    duration: '2.5 hours',
    cost: { en: '30-50 RON per person', ro: '30-50 RON per persoană' },
    description: { en: 'Budget-friendly option', ro: 'Opțiune economică' },
    steps: {
      en: [
        'Depart from Autogara București Filaret',
        'Take bus to Azuga (via Brașov route)',
        'Multiple departures daily',
        'Get off at Azuga center stop',
        'Taxi to cabin: ~15 RON'
      ],
      ro: [
        'Plecare din Autogara București Filaret',
        'Ia autobuzul către Azuga (pe ruta Brașov)',
        'Plecări multiple zilnic',
        'Coboară la stația Azuga centru',
        'Taxi până la cabană: ~15 RON'
      ]
    }
  },
  {
    id: 4,
    icon: Plane,
    title: { en: 'By Plane (International)', ro: 'Cu Avionul (Internațional)' },
    duration: 'Flight + 2h drive',
    cost: { en: 'Varies + transfer', ro: 'Variabil + transfer' },
    description: { en: 'For international guests', ro: 'Pentru oaspeți internaționali' },
    steps: {
      en: [
        'Fly to Henri Coandă International Airport (OTP) Bucharest',
        'Rent a car at the airport (recommended)',
        'Or arrange private transfer to Azuga (~400-500 RON)',
        'Drive time from airport: 2 hours',
        'Alternative: Take train from Gara de Nord (15 min from airport by taxi)'
      ],
      ro: [
        'Zboară către Aeroportul Internațional Henri Coandă (OTP) București',
        'Închiriază o mașină de la aeroport (recomandat)',
        'Sau aranjează transfer privat către Azuga (~400-500 RON)',
        'Timp de condus de la aeroport: 2 ore',
        'Alternativ: Ia trenul din Gara de Nord (15 min de la aeroport cu taxiul)'
      ]
    }
  }
];

export function TransportationGuide() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'How to Get Here',
      subtitle: 'Choose the best transportation option for your journey',
      duration: 'Duration',
      cost: 'Estimated Cost',
      directions: 'Get Directions'
    },
    ro: {
      title: 'Cum Ajungi Aici',
      subtitle: 'Alege cea mai bună opțiune de transport pentru călătoria ta',
      duration: 'Durată',
      cost: 'Cost Estimat',
      directions: 'Obține Direcții'
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

        {/* Transport Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {transportOptions.map((option, index) => {
            const OptionIcon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white p-8 hover:shadow-xl transition-shadow">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[var(--green-deep)]/10 flex items-center justify-center flex-shrink-0">
                      <OptionIcon className="text-[var(--green-deep)]" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--brown-deep)] font-semibold mb-2">
                        {option.title[language]}
                      </h3>
                      <p className="text-[var(--text-body)] text-sm">
                        {option.description[language]}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={18} className="text-[var(--green-deep)]" />
                      <div>
                        <p className="text-[var(--text-body)]">{t.duration}</p>
                        <p className="font-semibold text-[var(--brown-deep)]">{option.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Euro size={18} className="text-[var(--green-deep)]" />
                      <div>
                        <p className="text-[var(--text-body)]">{t.cost}</p>
                        <p className="font-semibold text-[var(--brown-deep)]">{option.cost[language]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-3">
                    {option.steps[language].map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--green-deep)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <p className="text-sm text-[var(--text-body)] flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Google Maps Button */}
        <FadeIn className="text-center">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=45.44580,25.57525"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--green-deep)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--green-sage)] transition-colors shadow-lg"
          >
            <Navigation size={20} />
            {t.directions}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
