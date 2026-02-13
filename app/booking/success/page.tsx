'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/components/providers/language-provider';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You could fetch session details here if needed
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  const content = {
    en: {
      title: 'Booking Confirmed!',
      subtitle: 'Your payment was successful',
      message: 'Thank you for booking with The A-Frame. You will receive a confirmation email shortly with all the details of your reservation.',
      checkEmail: 'Check your email for booking details and check-in instructions.',
      confirmationSent: 'Confirmation sent to your email',
      sessionId: 'Session ID',
      backHome: 'Back to Home',
      viewBookings: 'View My Bookings',
    },
    ro: {
      title: 'Rezervare Confirmată!',
      subtitle: 'Plata a fost procesată cu succes',
      message: 'Mulțumim că ai rezervat la The A-Frame. Vei primi în curând un email de confirmare cu toate detaliile rezervării tale.',
      checkEmail: 'Verifică emailul pentru detalii despre rezervare și instrucțiuni de check-in.',
      confirmationSent: 'Confirmare trimisă pe email',
      sessionId: 'ID Sesiune',
      backHome: 'Înapoi la Pagina Principală',
      viewBookings: 'Vezi Rezervările Mele',
    },
  };

  const t = content[language];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--green-deep)]"></div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[var(--cream-warm)] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--green-deep)]/20 rounded-full animate-ping"></div>
                <CheckCircle
                  size={80}
                  className="text-[var(--green-deep)] relative"
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-bold mb-4">
              {t.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-body)] mb-8">
              {t.subtitle}
            </p>

            {/* Message Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 text-left">
              <p className="text-[var(--text-body)] text-lg leading-relaxed mb-6">
                {t.message}
              </p>

              {/* Email Notice */}
              <div className="flex items-start gap-4 p-4 bg-[var(--linen-soft)] rounded-xl mb-6">
                <Mail size={24} className="text-[var(--green-deep)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[var(--brown-deep)] mb-1">
                    {t.confirmationSent}
                  </h3>
                  <p className="text-sm text-[var(--text-body)]">
                    {t.checkEmail}
                  </p>
                </div>
              </div>

              {/* Session ID */}
              {sessionId && (
                <div className="text-sm text-[var(--text-body)]/60">
                  {t.sessionId}: <code className="bg-gray-100 px-2 py-1 rounded">{sessionId}</code>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-[var(--green-deep)] text-[var(--cream-warm)] hover:bg-[var(--green-sage)] rounded-full px-8 min-w-[200px]"
                >
                  <Home size={20} className="mr-2" />
                  {t.backHome}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--green-deep)]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
