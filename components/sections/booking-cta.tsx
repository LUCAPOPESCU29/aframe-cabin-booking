'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, CalendarCheck, RotateCcw, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FadeIn } from '@/components/animations/fade-in';
import { cabins } from '@/lib/data/cabins';
import { useLanguage } from '@/components/providers/language-provider';
import { BookingCalendar } from '@/components/calendar/booking-calendar';

export function BookingCTA() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [selectedCabin, setSelectedCabin] = useState<string>('');
  const [guests, setGuests] = useState(2);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Fetch booked dates when cabin is selected
  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!selectedCabin) return;

      try {
        const response = await fetch(`/api/bookings/dates?cabinId=${selectedCabin}`);
        const data = await response.json();
        if (data.bookedDates) {
          setBookedDates(data.bookedDates);
        }
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      }
    };

    fetchBookedDates();
  }, [selectedCabin]);

  const handleDateSelect = (date: Date) => {
    if (!selectingCheckOut) {
      setCheckInDate(date);
      setCheckOutDate(null);
      setSelectingCheckOut(true);
    } else {
      if (checkInDate && date > checkInDate) {
        setCheckOutDate(date);
        setSelectingCheckOut(false);
        setShowCalendar(false);
      } else {
        setCheckInDate(date);
        setCheckOutDate(null);
      }
    }
  };

  const handleCheckAvailability = () => {
    if (selectedCabin) {
      router.push(`/cabins/${selectedCabin}`);
    }
  };

  return (
    <section id="booking" className="py-20 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Cozy cabin interior at evening"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="order-1 md:order-2"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold mb-4">
              {language === 'en' ? 'Book Your Escape' : 'Rezervă-ți Evadarea'}
            </h2>
            <p className="text-[var(--text-body)] text-lg mb-8">
              {language === 'en' ? 'Select your cabin, dates, and guests to check availability' : 'Selectează cabana, datele și numărul de oaspeți pentru a verifica disponibilitatea'}
            </p>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
              {/* Cabin Selector */}
              <div>
                <label className="block text-sm font-semibold text-[var(--brown-deep)] mb-2">
                  {language === 'en' ? 'Select Cabin' : 'Selectează Cabana'}
                </label>
                <Select value={selectedCabin} onValueChange={setSelectedCabin}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={language === 'en' ? 'Choose a cabin...' : 'Alege o cabană...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {cabins.map((cabin) => (
                      <SelectItem key={cabin.id} value={cabin.slug}>
                        {cabin.name} - {language === 'en' ? 'From' : 'De la'} {cabin.price} RON/{language === 'en' ? 'night' : 'noapte'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-[var(--brown-deep)] mb-2">
                  {language === 'en' ? 'Travel Dates' : 'Date Călătorie'}
                </label>
                <button
                  onClick={() => selectedCabin && setShowCalendar(!showCalendar)}
                  disabled={!selectedCabin}
                  className="w-full px-4 py-3 border-2 border-[var(--tan-light)] rounded-lg hover:border-[var(--green-deep)] transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={18} className="text-[var(--green-deep)]" />
                    <span className="text-sm text-[var(--brown-deep)]">
                      {checkInDate && checkOutDate
                        ? `${checkInDate.toLocaleDateString(language === 'en' ? 'en-US' : 'ro-RO', { month: 'short', day: 'numeric' })} - ${checkOutDate.toLocaleDateString(language === 'en' ? 'en-US' : 'ro-RO', { month: 'short', day: 'numeric' })}`
                        : language === 'en' ? 'Select dates' : 'Selectează datele'
                      }
                    </span>
                  </div>
                </button>

                {showCalendar && selectedCabin && (
                  <div className="mt-4">
                    <BookingCalendar
                      checkInDate={checkInDate}
                      checkOutDate={checkOutDate}
                      onDateSelect={handleDateSelect}
                      unavailableDates={bookedDates}
                      language={language}
                      selectingCheckOut={selectingCheckOut}
                    />
                    {selectingCheckOut && (
                      <p className="text-xs text-[var(--green-deep)] mt-2 text-center font-medium">
                        {language === 'en' ? 'Now select check-out date' : 'Acum selectează data de check-out'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Guest Counter */}
              <div>
                <label className="block text-sm font-semibold text-[var(--brown-deep)] mb-2">
                  {language === 'en' ? 'Number of Guests' : 'Număr de Oaspeți'}
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="rounded-full"
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">
                    {guests}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="rounded-full"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                size="lg"
                onClick={handleCheckAvailability}
                disabled={!selectedCabin}
                className="w-full bg-[var(--green-deep)] text-[var(--cream-warm)] hover:bg-[var(--green-sage)] rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === 'en' ? 'Check Availability' : 'Verifică Disponibilitatea'}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center text-center">
                <Shield
                  size={32}
                  className="text-[var(--green-deep)] mb-2"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-[var(--text-body)] font-medium">
                  {language === 'en' ? 'Secure Payment' : 'Plată Securizată'}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CalendarCheck
                  size={32}
                  className="text-[var(--green-deep)] mb-2"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-[var(--text-body)] font-medium">
                  {language === 'en' ? 'Instant Confirmation' : 'Confirmare Instant'}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw
                  size={32}
                  className="text-[var(--green-deep)] mb-2"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-[var(--text-body)] font-medium">
                  {language === 'en' ? 'Free Cancellation' : 'Anulare Gratuită'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
