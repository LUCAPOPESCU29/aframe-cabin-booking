'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/fade-in';

export function Newsletter() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const content = {
    en: {
      title: 'Stay Updated',
      subtitle: 'Subscribe to our newsletter for exclusive deals, seasonal offers, and mountain adventure tips',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
      submitting: 'Subscribing...',
      success: 'Thank you for subscribing!',
      benefits: [
        'Exclusive discounts and early access to deals',
        'Seasonal recommendations and travel tips',
        'Updates on local events and activities',
        'Special birthday and anniversary offers'
      ]
    },
    ro: {
      title: 'Rămâi la Curent',
      subtitle: 'Abonează-te la newsletter-ul nostru pentru oferte exclusive, reduceri sezoniere și sfaturi de aventură montană',
      placeholder: 'Introdu adresa ta de email',
      button: 'Abonează-te',
      submitting: 'Se procesează...',
      success: 'Mulțumim pentru abonare!',
      benefits: [
        'Reduceri exclusive și acces prioritar la oferte',
        'Recomandări sezoniere și sfaturi de călătorie',
        'Actualizări despre evenimente și activități locale',
        'Oferte speciale de ziua ta și aniversări'
      ]
    }
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="bg-gradient-to-br from-[var(--brown-deep)] to-[var(--brown-rich)] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Column */}
                <div>
                  <div className="w-16 h-16 rounded-full bg-[var(--green-deep)] flex items-center justify-center mb-6">
                    <Mail className="text-white" size={32} />
                  </div>

                  <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-white font-semibold mb-4">
                    {t.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-6">
                    {t.subtitle}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-3">
                    {t.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <CheckCircle2 size={20} className="text-[var(--green-deep)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Form */}
                <div>
                  {isSubscribed ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white rounded-2xl p-8 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-green-600" size={32} />
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--brown-deep)] font-semibold mb-2">
                        {t.success}
                      </h3>
                      <p className="text-[var(--text-body)]">
                        {language === 'en'
                          ? "You'll receive our next newsletter soon."
                          : 'Vei primi în curând următorul nostru newsletter.'}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="bg-white rounded-2xl p-8">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--brown-deep)] mb-2">
                            {language === 'en' ? 'Email Address' : 'Adresa de Email'}
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.placeholder}
                            required
                            className="w-full px-4 py-3 border-2 border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[var(--green-deep)] text-white hover:bg-[var(--green-sage)] rounded-full py-6 text-lg font-semibold disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="mr-2"
                              >
                                <Send size={20} />
                              </motion.div>
                              {t.submitting}
                            </>
                          ) : (
                            <>
                              <Send size={20} className="mr-2" />
                              {t.button}
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-[var(--text-body)] text-center">
                          {language === 'en'
                            ? 'We respect your privacy. Unsubscribe at any time.'
                            : 'Respectăm confidențialitatea ta. Dezabonează-te oricând.'}
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
