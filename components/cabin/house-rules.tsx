'use client';

import {
  Clock,
  Cigarette,
  Dog,
  Volume2,
  Users,
  PartyPopper,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';

interface Rule {
  icon: any;
  title: { en: string; ro: string };
  description: { en: string; ro: string };
  type: 'allowed' | 'not-allowed' | 'info';
}

const rules: Rule[] = [
  {
    icon: Clock,
    title: { en: 'Check-in/Check-out', ro: 'Check-in/Check-out' },
    description: { en: 'Check-in: 3:00 PM | Check-out: 11:00 AM', ro: 'Check-in: 15:00 | Check-out: 11:00' },
    type: 'info'
  },
  {
    icon: Cigarette,
    title: { en: 'No Smoking', ro: 'Fumatul Interzis' },
    description: { en: 'Smoking is not permitted inside the cabin', ro: 'Fumatul nu este permis în interiorul cabinei' },
    type: 'not-allowed'
  },
  {
    icon: Dog,
    title: { en: 'Pets Welcome', ro: 'Animale de Companie Permise' },
    description: { en: 'Well-behaved pets allowed (50 RON per night)', ro: 'Animalele de companie bine crescute sunt permise (50 RON pe noapte)' },
    type: 'allowed'
  },
  {
    icon: Volume2,
    title: { en: 'Quiet Hours', ro: 'Ore de Liniște' },
    description: { en: 'Please respect quiet hours: 10:00 PM - 8:00 AM', ro: 'Vă rugăm să respectați orele de liniște: 22:00 - 8:00' },
    type: 'info'
  },
  {
    icon: Users,
    title: { en: 'Maximum Occupancy', ro: 'Capacitate Maximă' },
    description: { en: 'Maximum 6 guests per cabin', ro: 'Maxim 6 oaspeți per cabană' },
    type: 'info'
  },
  {
    icon: PartyPopper,
    title: { en: 'No Parties', ro: 'Fără Petreceri' },
    description: { en: 'Parties and events are not permitted', ro: 'Petrecerile și evenimentele nu sunt permise' },
    type: 'not-allowed'
  },
];

export function HouseRules() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'House Rules',
      subtitle: 'Please respect these guidelines during your stay',
      note: 'Failure to comply with house rules may result in immediate termination of your reservation without refund.',
    },
    ro: {
      title: 'Regulament',
      subtitle: 'Vă rugăm să respectați aceste reguli pe durata sejurului',
      note: 'Nerespectarea regulamentului poate duce la rezilierea imediată a rezervării fără rambursare.',
    },
  };

  const t = content[language];

  const getIcon = (type: Rule['type']) => {
    switch (type) {
      case 'allowed':
        return <CheckCircle2 size={20} className="text-green-600" />;
      case 'not-allowed':
        return <XCircle size={20} className="text-red-600" />;
      case 'info':
        return <AlertCircle size={20} className="text-blue-600" />;
    }
  };

  const getBorderColor = (type: Rule['type']) => {
    switch (type) {
      case 'allowed':
        return 'border-l-green-600';
      case 'not-allowed':
        return 'border-l-red-600';
      case 'info':
        return 'border-l-blue-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md">
      <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-[var(--brown-deep)] font-semibold mb-2">
        {t.title}
      </h3>
      <p className="text-[var(--text-body)] mb-6">{t.subtitle}</p>

      <div className="space-y-4 mb-6">
        {rules.map((rule, index) => {
          const RuleIcon = rule.icon;
          return (
            <div
              key={index}
              className={`border-l-4 ${getBorderColor(rule.type)} pl-4 pr-4 py-3 bg-[var(--linen-soft)]/50 rounded-r-lg`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <RuleIcon size={24} className="text-[var(--brown-deep)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-[var(--brown-deep)]">
                      {rule.title[language]}
                    </h4>
                    {getIcon(rule.type)}
                  </div>
                  <p className="text-sm text-[var(--text-body)]">
                    {rule.description[language]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <strong>{language === 'en' ? 'Note:' : 'Notă:'}</strong> {t.note}
        </p>
      </div>
    </div>
  );
}
