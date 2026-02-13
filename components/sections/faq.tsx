'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';

const faqData = {
  en: {
    title: 'FAQ',
    subtitle: 'Quick answers to common questions',
    faqs: [
      { question: 'What time is check-in and check-out?', answer: 'Check-in is from 3:00 PM and check-out is by 11:00 AM.' },
      { question: 'Is parking available?', answer: 'Yes, free private parking for up to 2 vehicles.' },
      { question: 'Are pets allowed?', answer: 'Yes, well-behaved pets are welcome for 50 RON per night.' },
      { question: 'Is WiFi included?', answer: 'Yes, high-speed WiFi is available at no extra charge.' },
      { question: 'What is your cancellation policy?', answer: 'Free cancellation up to 7 days before check-in.' },
      { question: 'How do I pay?', answer: 'We accept bank transfers via Wise. Instructions provided upon booking.' }
    ]
  },
  ro: {
    title: 'Întrebări Frecvente',
    subtitle: 'Răspunsuri rapide la întrebări comune',
    faqs: [
      { question: 'Care este ora de check-in și check-out?', answer: 'Check-in de la ora 15:00 și check-out până la ora 11:00.' },
      { question: 'Este disponibilă parcarea?', answer: 'Da, parcare privată gratuită pentru până la 2 vehicule.' },
      { question: 'Sunt permise animalele de companie?', answer: 'Da, animalele bine crescute sunt binevenite pentru 50 RON pe noapte.' },
      { question: 'Este WiFi inclus?', answer: 'Da, WiFi de mare viteză este disponibil fără cost suplimentar.' },
      { question: 'Care este politica de anulare?', answer: 'Anulare gratuită cu până la 7 zile înainte de check-in.' },
      { question: 'Cum plătesc?', answer: 'Acceptăm transferuri bancare prin Wise. Instrucțiuni furnizate la rezervare.' }
    ]
  }
};

export function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const content = faqData[language];

  return (
    <section className="py-16 md:py-24 bg-[var(--linen-soft)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[var(--brown-deep)] font-semibold mb-3">
            {content.title}
          </h2>
          <p className="text-[var(--text-body)]">{content.subtitle}</p>
        </FadeIn>

        <div className="space-y-3">
          {content.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[var(--linen-soft)]/50 transition-colors"
              >
                <span className="font-medium text-[var(--brown-deep)] pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-[var(--green-deep)]" size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-4 text-[var(--text-body)]">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
