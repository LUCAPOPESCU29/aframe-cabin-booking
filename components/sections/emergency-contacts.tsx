'use client';

import { motion } from 'framer-motion';
import { Phone, Hospital, Shield, MapPin, Wrench, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';
import { Card } from '@/components/ui/card';

interface EmergencyContact {
  id: number;
  icon: any;
  title: { en: string; ro: string };
  phone: string;
  description: { en: string; ro: string };
  type: 'emergency' | 'medical' | 'support';
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: 1,
    icon: Shield,
    title: { en: 'Emergency Services', ro: 'Servicii de Urgență' },
    phone: '112',
    description: { en: 'Police, Fire, Ambulance - 24/7 emergency number', ro: 'Poliție, Pompieri, Ambulanță - număr de urgență 24/7' },
    type: 'emergency'
  },
  {
    id: 2,
    icon: Hospital,
    title: { en: 'Azuga Medical Center', ro: 'Centru Medical Azuga' },
    phone: '+40 244 323 456',
    description: { en: 'Local medical clinic - Open 8 AM - 8 PM', ro: 'Clinică medicală locală - Deschis 8:00 - 20:00' },
    type: 'medical'
  },
  {
    id: 3,
    icon: Hospital,
    title: { en: 'Sinaia Hospital', ro: 'Spitalul Sinaia' },
    phone: '+40 244 314 200',
    description: { en: '10 km away - 24/7 emergency room', ro: 'La 10 km distanță - Urgențe 24/7' },
    type: 'medical'
  },
  {
    id: 4,
    icon: Phone,
    title: { en: 'Cabin Owner', ro: 'Proprietar Cabană' },
    phone: '+40 722 123 456',
    description: { en: 'For questions about the cabin - Available 8 AM - 10 PM', ro: 'Pentru întrebări despre cabană - Disponibil 8:00 - 22:00' },
    type: 'support'
  },
  {
    id: 5,
    icon: Wrench,
    title: { en: 'Maintenance Support', ro: 'Asistență Tehnică' },
    phone: '+40 722 654 321',
    description: { en: 'For heating, plumbing, or electrical issues', ro: 'Pentru probleme cu încălzirea, instalații sau electrice' },
    type: 'support'
  },
  {
    id: 6,
    icon: MapPin,
    title: { en: 'Mountain Rescue', ro: 'Salvare Montană' },
    phone: '0SALVAMONT (0725826668)',
    description: { en: 'Mountain rescue service - 24/7', ro: 'Serviciu salvare montană - 24/7' },
    type: 'emergency'
  }
];

const importantInfo = {
  en: {
    title: 'Important Information',
    items: [
      'Cabin Address: Azuga, Prahova, Romania (GPS: 45.44580° N, 25.57525° E)',
      'Nearest Police Station: Azuga Police, str. Libertății nr. 12',
      'Nearest Pharmacy: Farmacia Tei Azuga, str. Morii nr. 5 (Open 9 AM - 7 PM)',
      'Power Outage: Contact cabin owner immediately',
      'Weather Alerts: Check meteo.ro for mountain weather updates'
    ]
  },
  ro: {
    title: 'Informații Importante',
    items: [
      'Adresa Cabană: Azuga, Prahova, România (GPS: 45.44580° N, 25.57525° E)',
      'Cea mai apropiată Secție Poliție: Poliția Azuga, str. Libertății nr. 12',
      'Cea mai apropiată Farmacie: Farmacia Tei Azuga, str. Morii nr. 5 (Deschis 9:00 - 19:00)',
      'Pană de curent: Contactează proprietarul imediat',
      'Alerte meteo: Verifică meteo.ro pentru actualizări meteo montană'
    ]
  }
};

export function EmergencyContacts() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Emergency Contacts',
      subtitle: 'Keep these numbers handy during your stay',
      call: 'Call',
      warning: 'In case of emergency, always call 112 first'
    },
    ro: {
      title: 'Contacte de Urgență',
      subtitle: 'Păstrează aceste numere la îndemână pe durata sejurului',
      call: 'Sună',
      warning: 'În caz de urgență, sună întotdeauna 112 mai întâi'
    }
  };

  const t = content[language];
  const info = importantInfo[language];

  const getBorderColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'emergency':
        return 'border-red-500';
      case 'medical':
        return 'border-blue-500';
      case 'support':
        return 'border-green-500';
    }
  };

  const getBgColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-50';
      case 'medical':
        return 'bg-blue-50';
      case 'support':
        return 'bg-green-50';
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold mb-4">
            {t.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[var(--text-body)]">
            {t.subtitle}
          </p>
        </FadeIn>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-100 border-l-4 border-red-500 rounded-lg p-6 mb-12 flex items-start gap-4"
        >
          <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
          <p className="text-red-900 font-semibold">{t.warning}</p>
        </motion.div>

        {/* Contacts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {emergencyContacts.map((contact, index) => {
            const ContactIcon = contact.icon;
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full ${getBgColor(contact.type)} border-l-4 ${getBorderColor(contact.type)} p-6`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full ${getBgColor(contact.type)} flex items-center justify-center flex-shrink-0 border-2 ${getBorderColor(contact.type)}`}>
                      <ContactIcon className={contact.type === 'emergency' ? 'text-red-600' : contact.type === 'medical' ? 'text-blue-600' : 'text-green-600'} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--brown-deep)] font-semibold mb-1">
                        {contact.title[language]}
                      </h3>
                      <p className="text-[var(--text-body)] text-sm mb-3">
                        {contact.description[language]}
                      </p>
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full font-semibold text-[var(--brown-deep)] hover:bg-[var(--linen-soft)] transition-colors border border-[var(--tan-light)]"
                      >
                        <Phone size={18} />
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Important Information */}
        <FadeIn>
          <Card className="bg-white p-8">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--brown-deep)] font-semibold mb-6">
              {info.title}
            </h3>
            <ul className="space-y-3">
              {info.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[var(--text-body)]">
                  <div className="w-2 h-2 rounded-full bg-[var(--green-deep)] flex-shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
