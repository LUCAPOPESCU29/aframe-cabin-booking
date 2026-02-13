'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Mail, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  cabin?: string;
}

const existingReviews: Review[] = [
  {
    id: 1,
    name: 'Maria P.',
    rating: 5,
    comment: 'Amazing mountain retreat! The cabin was cozy and well-equipped. Perfect for a winter getaway.',
    date: '2024-01-15',
    cabin: 'The Pine'
  },
  {
    id: 2,
    name: 'Alex D.',
    rating: 5,
    comment: 'Loved every moment! Beautiful views, peaceful location, and the host was very responsive.',
    date: '2024-01-10',
    cabin: 'The Cedar'
  },
  {
    id: 3,
    name: 'Diana S.',
    rating: 4,
    comment: 'Great cabin with all amenities. Only minor issue was the hot water took a while to heat up.',
    date: '2024-01-05',
    cabin: 'The Pine'
  }
];

export function Reviews() {
  const { language } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>(existingReviews);
  const [showForm, setShowForm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  // User info form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cabin, setCabin] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const content = {
    en: {
      title: 'Guest Reviews',
      subtitle: 'What our guests say about their stay',
      writeReview: 'Write a Review',
      yourRating: 'Your Rating',
      yourReview: 'Your Review',
      commentPlaceholder: 'Share your experience with us...',
      submit: 'Submit Review',
      submitting: 'Submitting...',
      cancel: 'Cancel',
      // Info modal
      modalTitle: 'Your Information',
      modalSubtitle: 'Please provide your details to submit a review',
      nameLabel: 'Full Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'john@example.com',
      cabinLabel: 'Which cabin did you stay in?',
      selectCabin: 'Select cabin',
      thePine: 'The Pine',
      theCedar: 'The Cedar',
      confirmSubmit: 'Submit Review',
      // Success
      successTitle: 'Thank you!',
      successMessage: 'Your review has been submitted successfully.',
      // Validation
      selectRating: 'Please select a rating',
      enterComment: 'Please enter your review',
      enterName: 'Please enter your name',
      enterEmail: 'Please enter your email',
      selectCabinError: 'Please select which cabin you stayed in'
    },
    ro: {
      title: 'Recenzii Oaspeți',
      subtitle: 'Ce spun oaspeții noștri despre sejur',
      writeReview: 'Scrie o Recenzie',
      yourRating: 'Evaluarea Ta',
      yourReview: 'Recenzia Ta',
      commentPlaceholder: 'Împărtășește-ne experiența ta...',
      submit: 'Trimite Recenzie',
      submitting: 'Se trimite...',
      cancel: 'Anulează',
      // Info modal
      modalTitle: 'Informațiile Tale',
      modalSubtitle: 'Te rugăm să furnizezi detaliile pentru a trimite o recenzie',
      nameLabel: 'Nume Complet',
      namePlaceholder: 'Ion Popescu',
      emailLabel: 'Adresă Email',
      emailPlaceholder: 'ion@example.com',
      cabinLabel: 'În ce cabană ai stat?',
      selectCabin: 'Selectează cabana',
      thePine: 'The Pine',
      theCedar: 'The Cedar',
      confirmSubmit: 'Trimite Recenzie',
      // Success
      successTitle: 'Mulțumim!',
      successMessage: 'Recenzia ta a fost trimisă cu succes.',
      // Validation
      selectRating: 'Te rugăm să selectezi o evaluare',
      enterComment: 'Te rugăm să introduci recenzia',
      enterName: 'Te rugăm să introduci numele',
      enterEmail: 'Te rugăm să introduci emailul',
      selectCabinError: 'Te rugăm să selectezi în ce cabană ai stat'
    }
  };

  const t = content[language];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert(t.selectRating);
      return;
    }
    if (comment.trim() === '') {
      alert(t.enterComment);
      return;
    }

    // Show info modal to collect user details
    setShowInfoModal(true);
  };

  const handleFinalSubmit = async () => {
    if (name.trim() === '') {
      alert(t.enterName);
      return;
    }
    if (email.trim() === '') {
      alert(t.enterEmail);
      return;
    }
    if (cabin === '') {
      alert(t.selectCabinError);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newReview: Review = {
      id: reviews.length + 1,
      name: name,
      rating: rating,
      comment: comment,
      date: new Date().toISOString().split('T')[0],
      cabin: cabin
    };

    setReviews([newReview, ...reviews]);

    setIsSubmitting(false);
    setShowInfoModal(false);
    setShowForm(false);
    setShowSuccess(true);

    // Reset form
    setRating(0);
    setComment('');
    setName('');
    setEmail('');
    setCabin('');

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
          >
            <Star
              size={interactive ? 32 : 20}
              className={`cursor-${interactive ? 'pointer' : 'default'} transition-all duration-200 ${
                star <= (interactive ? (hoveredRating || rating) : count)
                  ? 'fill-[#ffc73a] stroke-[#ffc73a]'
                  : 'fill-transparent stroke-[#666]'
              }`}
              onClick={() => interactive && setRating(star)}
              onMouseEnter={() => interactive && setHoveredRating(star)}
              onMouseLeave={() => interactive && setHoveredRating(0)}
              style={{
                strokeWidth: star <= (interactive ? (hoveredRating || rating) : count) ? 2 : 1.5,
                animation: star <= rating && interactive ? 'yippee 0.75s backwards' : 'none'
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[var(--brown-deep)] font-semibold mb-3">
            {t.title}
          </h2>
          <p className="text-[var(--text-body)] mb-6">{t.subtitle}</p>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[var(--green-deep)] text-white hover:bg-[var(--green-sage)] rounded-full px-6 py-3"
            >
              {t.writeReview}
            </Button>
          )}
        </FadeIn>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8 bg-green-50 border border-green-200 rounded-lg p-6 flex items-center gap-4"
            >
              <CheckCircle2 className="text-green-600" size={32} />
              <div>
                <h3 className="font-semibold text-green-900">{t.successTitle}</h3>
                <p className="text-green-700">{t.successMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="bg-[var(--linen-soft)] rounded-xl p-6 md:p-8">
                <form onSubmit={handleFormSubmit}>
                  {/* Rating */}
                  <div className="mb-6">
                    <label className="block font-semibold text-[var(--brown-deep)] mb-3">
                      {t.yourRating}
                    </label>
                    {renderStars(rating, true)}
                  </div>

                  {/* Comment */}
                  <div className="mb-6">
                    <label className="block font-semibold text-[var(--brown-deep)] mb-3">
                      {t.yourReview}
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t.commentPlaceholder}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-[var(--green-deep)] text-white hover:bg-[var(--green-sage)] rounded-full py-3"
                    >
                      {t.submit}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setRating(0);
                        setComment('');
                      }}
                      variant="outline"
                      className="flex-1 border-2 border-[var(--brown-rich)] text-[var(--brown-rich)] hover:bg-[var(--brown-rich)] hover:text-white rounded-full py-3"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Collection Modal */}
        <AnimatePresence>
          {showInfoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
              onClick={() => setShowInfoModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--brown-deep)] font-semibold">
                      {t.modalTitle}
                    </h3>
                    <p className="text-[var(--text-body)] text-sm mt-1">{t.modalSubtitle}</p>
                  </div>
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className="text-[var(--text-body)] hover:text-[var(--brown-deep)]"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block font-medium text-[var(--brown-deep)] mb-2">
                      {t.nameLabel}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-body)]" size={20} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full pl-10 pr-4 py-3 border-2 border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-medium text-[var(--brown-deep)] mb-2">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-body)]" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full pl-10 pr-4 py-3 border-2 border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Cabin Selection */}
                  <div>
                    <label className="block font-medium text-[var(--brown-deep)] mb-2">
                      {t.cabinLabel}
                    </label>
                    <select
                      value={cabin}
                      onChange={(e) => setCabin(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[var(--tan-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] focus:border-transparent"
                      required
                    >
                      <option value="">{t.selectCabin}</option>
                      <option value="The Pine">{t.thePine}</option>
                      <option value="The Cedar">{t.theCedar}</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[var(--green-deep)] text-white hover:bg-[var(--green-sage)] rounded-full py-3 mt-6"
                  >
                    {isSubmitting ? t.submitting : t.confirmSubmit}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--linen-soft)] rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--green-deep)] text-white flex items-center justify-center font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--brown-deep)]">{review.name}</h4>
                    <p className="text-xs text-[var(--text-body)]">{review.cabin}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>

              <p className="text-[var(--text-body)] text-sm leading-relaxed mb-3">
                {review.comment}
              </p>

              <p className="text-xs text-[var(--text-body)]">
                {new Date(review.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ro-RO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes yippee {
          0% {
            transform: scale(1);
            fill: #ffc73a;
            fill-opacity: 0;
            stroke-opacity: 1;
          }
          30% {
            transform: scale(0);
            fill: #ffc73a;
            fill-opacity: 0;
            stroke-opacity: 1;
          }
          30.1% {
            stroke: #ffc73a;
          }
          60% {
            transform: scale(1.2);
            fill: #ffc73a;
          }
        }
      `}</style>
    </section>
  );
}
