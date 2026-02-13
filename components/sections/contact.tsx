'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/animations/fade-in';
import { useLanguage } from '@/components/providers/language-provider';

export function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const content = {
    en: {
      title: 'Get in Touch',
      subtitle: 'Have questions? We\'re here to help',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: 'Phone Number (optional)',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Tell us about your inquiry...',
      sendButton: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Thank you! We\'ll get back to you soon.',
      contactInfo: 'Contact Information',
      address: 'Azuga, Prahova County, Romania',
      hours: 'Response Time',
      hoursValue: 'Within 24 hours',
      email: 'info@aframe-azuga.ro',
      phone: '+40 123 456 789'
    },
    ro: {
      title: 'Contactează-ne',
      subtitle: 'Ai întrebări? Suntem aici să te ajutăm',
      namePlaceholder: 'Numele Tău',
      emailPlaceholder: 'email@tau.ro',
      phonePlaceholder: 'Număr Telefon (opțional)',
      subjectPlaceholder: 'Subiect',
      messagePlaceholder: 'Spune-ne despre întrebarea ta...',
      sendButton: 'Trimite Mesaj',
      sending: 'Se trimite...',
      successMessage: 'Mulțumim! Îți vom răspunde în curând.',
      contactInfo: 'Informații Contact',
      address: 'Azuga, Județul Prahova, România',
      hours: 'Timp Răspuns',
      hoursValue: 'În 24 de ore',
      email: 'info@aframe-azuga.ro',
      phone: '+40 123 456 789'
    }
  };

  const t = content[language];

  return (
    <section id="contact" className="py-20 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.subjectPlaceholder}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] resize-none"
                />
              </div>

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  ✓ {t.successMessage}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || submitted}
                className="w-full bg-[var(--green-deep)] text-white hover:bg-[var(--green-sage)] rounded-full py-6 text-lg"
              >
                {loading ? t.sending : t.sendButton}
                {!loading && <Send className="ml-2 h-5 w-5" />}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-[var(--brown-deep)] mb-6">
                {t.contactInfo}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--linen-soft)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[var(--green-deep)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--brown-deep)] mb-1">
                      {language === 'en' ? 'Address' : 'Adresă'}
                    </h4>
                    <p className="text-[var(--text-body)]">{t.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--linen-soft)] flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[var(--green-deep)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--brown-deep)] mb-1">Email</h4>
                    <a
                      href={`mailto:${t.email}`}
                      className="text-[var(--green-deep)] hover:underline"
                    >
                      {t.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--linen-soft)] flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-[var(--green-deep)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--brown-deep)] mb-1">
                      {language === 'en' ? 'Phone' : 'Telefon'}
                    </h4>
                    <a
                      href={`tel:${t.phone}`}
                      className="text-[var(--green-deep)] hover:underline"
                    >
                      {t.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--linen-soft)] flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-[var(--green-deep)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--brown-deep)] mb-1">{t.hours}</h4>
                    <p className="text-[var(--text-body)]">{t.hoursValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-[var(--linen-soft)] rounded-2xl p-6">
              <h4 className="font-semibold text-[var(--brown-deep)] mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[var(--green-deep)]" />
                {language === 'en' ? 'Quick Response' : 'Răspuns Rapid'}
              </h4>
              <p className="text-sm text-[var(--text-body)] leading-relaxed">
                {language === 'en'
                  ? 'We typically respond to all inquiries within 24 hours. For urgent booking matters, please call us directly.'
                  : 'De obicei răspundem la toate întrebările în 24 de ore. Pentru rezervări urgente, te rugăm să ne suni direct.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
