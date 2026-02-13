'use client';

import { motion } from 'framer-motion';
import { Clock, Key, MapPin, Wifi, Coffee, Bed, LogOut, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';
import { Card } from '@/components/ui/card';

export function CheckInInstructions() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Check-In & Check-Out Guide',
      subtitle: 'Everything you need to know for a smooth arrival and departure',
      checkInTitle: 'Check-In Process',
      checkInTime: 'Check-in Time: 3:00 PM',
      checkOutTitle: 'Check-Out Process',
      checkOutTime: 'Check-out Time: 11:00 AM',

      checkInSteps: [
        {
          icon: Clock,
          title: 'Arrival Time',
          description: 'Standard check-in is at 3:00 PM. Early check-in may be available upon request (subject to availability). Please contact us 24 hours in advance.'
        },
        {
          icon: MapPin,
          title: 'Finding the Cabin',
          description: 'Use GPS coordinates: 45.44580° N, 25.57525° E. Look for a wooden A-frame cabin with green trim. There is a small wooden sign at the entrance.'
        },
        {
          icon: Key,
          title: 'Getting Your Keys',
          description: 'Option 1: Meet the property manager for a personal welcome (we\'ll confirm time). Option 2: Self check-in with lockbox code (sent 24h before arrival).'
        },
        {
          icon: Wifi,
          title: 'WiFi & Welcome Pack',
          description: 'WiFi details are posted inside the cabin. You\'ll find a welcome basket with coffee, tea, snacks, and a guidebook with local recommendations.'
        }
      ],

      checkOutSteps: [
        {
          icon: Clock,
          title: 'Departure Time',
          description: 'Please vacate the cabin by 11:00 AM. Late check-out available until 2:00 PM for an additional 100 RON (subject to availability).'
        },
        {
          icon: Bed,
          title: 'Before You Leave',
          description: 'Strip the beds and place used linens in the laundry basket. Wash and put away all dishes. Take out trash to the bins outside. Turn off all lights and appliances.'
        },
        {
          icon: Key,
          title: 'Returning Keys',
          description: 'If you met the manager: return keys in person. If self check-in: lock all doors and return keys to the lockbox. Send us a quick message when you leave.'
        },
        {
          icon: Coffee,
          title: 'Final Check',
          description: 'Check all rooms for personal belongings. Close all windows. Turn off heating/AC. Lock all doors. We hope you had an amazing stay!'
        }
      ],

      importantNotes: [
        'Quiet hours: 10:00 PM - 8:00 AM. Please respect our neighbors.',
        'Maximum occupancy: 6 guests. Additional guests not permitted.',
        'Pets: Allowed with prior notice. Clean up after your pet.',
        'Smoking: Only permitted outside. Please use the ashtrays provided.',
        'Damages: Report any damages immediately. Repair costs will be charged.',
        'Lost keys: Replacement fee of 200 RON applies.'
      ]
    },
    ro: {
      title: 'Ghid Check-In & Check-Out',
      subtitle: 'Tot ce trebuie să știi pentru o sosire și plecare ușoară',
      checkInTitle: 'Proces Check-In',
      checkInTime: 'Ora Check-in: 15:00',
      checkOutTitle: 'Proces Check-Out',
      checkOutTime: 'Ora Check-out: 11:00',

      checkInSteps: [
        {
          icon: Clock,
          title: 'Ora Sosirii',
          description: 'Check-in standard este la ora 15:00. Check-in anticipat poate fi disponibil la cerere (în funcție de disponibilitate). Vă rugăm să ne contactați cu 24 de ore înainte.'
        },
        {
          icon: MapPin,
          title: 'Găsirea Cabinei',
          description: 'Folosește coordonatele GPS: 45.44580° N, 25.57525° E. Caută o cabană A-frame din lemn cu finisaje verzi. Există un semn mic din lemn la intrare.'
        },
        {
          icon: Key,
          title: 'Primirea Cheilor',
          description: 'Opțiunea 1: Întâlnește managerul proprietății pentru o primire personală (vom confirma ora). Opțiunea 2: Self check-in cu cod lockbox (trimis cu 24h înainte de sosire).'
        },
        {
          icon: Wifi,
          title: 'WiFi & Pachet de Bun Venit',
          description: 'Detaliile WiFi sunt afișate în interiorul cabinei. Vei găsi un coș de bun venit cu cafea, ceai, gustări și un ghid cu recomandări locale.'
        }
      ],

      checkOutSteps: [
        {
          icon: Clock,
          title: 'Ora Plecării',
          description: 'Vă rugăm să eliberați cabina până la ora 11:00. Check-out târziu disponibil până la ora 14:00 pentru 100 RON suplimentar (în funcție de disponibilitate).'
        },
        {
          icon: Bed,
          title: 'Înainte de Plecare',
          description: 'Scoateți lenjeriile de pat și puneți-le în coșul de rufe. Spălați și puneți la loc toate vasele. Scoateți gunoiul la pubele afară. Închideți toate luminile și aparatele.'
        },
        {
          icon: Key,
          title: 'Returnarea Cheilor',
          description: 'Dacă v-ați întâlnit cu managerul: returnați cheile personal. Dacă ați făcut self check-in: încuiați toate ușile și returnați cheile în lockbox. Trimiteți-ne un mesaj când plecați.'
        },
        {
          icon: Coffee,
          title: 'Verificare Finală',
          description: 'Verificați toate camerele pentru obiecte personale. Închideți toate ferestrele. Opriți încălzirea/AC. Încuiați toate ușile. Sperăm că ați avut un sejur minunat!'
        }
      ],

      importantNotes: [
        'Ore de liniște: 22:00 - 8:00. Vă rugăm să respectați vecinii.',
        'Capacitate maximă: 6 oaspeți. Oaspeți suplimentari nu sunt permisi.',
        'Animale: Permise cu notificare prealabilă. Curățați după animalul dvs.',
        'Fumat: Permis doar afară. Folosiți scrumierele puse la dispoziție.',
        'Daune: Raportați imediat orice deteriorare. Costurile de reparații vor fi percepute.',
        'Chei pierdute: Se aplică taxa de înlocuire de 200 RON.'
      ]
    }
  };

  const t = content[language];

  return (
    <section className="py-20 md:py-32 bg-[var(--linen-soft)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold mb-4">
            {t.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[var(--text-body)]">
            {t.subtitle}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Check-In */}
          <div>
            <div className="bg-[var(--green-deep)] text-white rounded-t-2xl p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold mb-2">
                {t.checkInTitle}
              </h3>
              <p className="flex items-center gap-2">
                <Clock size={20} />
                {t.checkInTime}
              </p>
            </div>
            <Card className="bg-white rounded-t-none p-6 space-y-6">
              {t.checkInSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--green-deep)]/10 flex items-center justify-center flex-shrink-0">
                      <StepIcon className="text-[var(--green-deep)]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--brown-deep)] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-[var(--text-body)]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </Card>
          </div>

          {/* Check-Out */}
          <div>
            <div className="bg-[var(--brown-deep)] text-white rounded-t-2xl p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold mb-2">
                {t.checkOutTitle}
              </h3>
              <p className="flex items-center gap-2">
                <LogOut size={20} />
                {t.checkOutTime}
              </p>
            </div>
            <Card className="bg-white rounded-t-none p-6 space-y-6">
              {t.checkOutSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--brown-deep)]/10 flex items-center justify-center flex-shrink-0">
                      <StepIcon className="text-[var(--brown-deep)]" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--brown-deep)] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-[var(--text-body)]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </Card>
          </div>
        </div>

        {/* Important Notes */}
        <FadeIn>
          <Card className="bg-amber-50 border-2 border-amber-200 p-8">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--brown-deep)] font-semibold mb-6">
              {language === 'en' ? 'Important Notes' : 'Note Importante'}
            </h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {t.importantNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text-body)]">{note}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
