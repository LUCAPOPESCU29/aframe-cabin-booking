'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Building2, Bitcoin, X } from 'lucide-react';
import './PaymentMethodModal.css';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: 'card' | 'iban' | 'crypto') => void;
}

export default function PaymentMethodModal({ isOpen, onClose, onSelectMethod }: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'iban' | 'crypto' | null>(null);

  const handleMethodClick = (method: 'card' | 'iban' | 'crypto') => {
    setSelectedMethod(method);
    setTimeout(() => {
      onSelectMethod(method);
      setSelectedMethod(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="payment-modal-backdrop"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="payment-modal"
          >
            {/* Close Button */}
            <button className="payment-modal-close" onClick={onClose}>
              <X size={24} />
            </button>

            {/* Header */}
            <div className="payment-modal-header">
              <h2>Choose Payment Method</h2>
              <p>Select your preferred way to complete the booking</p>
            </div>

            {/* Payment Methods Grid */}
            <div className="payment-methods-grid">
              {/* Credit Card */}
              <motion.button
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`payment-method-card ${selectedMethod === 'card' ? 'selected' : ''}`}
                onClick={() => handleMethodClick('card')}
              >
                <div className="payment-method-icon card-icon">
                  <CreditCard size={32} />
                </div>
                <h3>Credit Card</h3>
                <p>Pay securely with your card</p>
                <div className="payment-method-badge">Most Popular</div>
              </motion.button>

              {/* IBAN Transfer */}
              <motion.button
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`payment-method-card ${selectedMethod === 'iban' ? 'selected' : ''}`}
                onClick={() => handleMethodClick('iban')}
              >
                <div className="payment-method-icon iban-icon">
                  <Building2 size={32} />
                </div>
                <h3>IBAN Transfer</h3>
                <p>Direct bank transfer</p>
              </motion.button>

              {/* Crypto */}
              <motion.button
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`payment-method-card ${selectedMethod === 'crypto' ? 'selected' : ''}`}
                onClick={() => handleMethodClick('crypto')}
              >
                <div className="payment-method-icon crypto-icon">
                  <Bitcoin size={32} />
                </div>
                <h3>
                  Crypto <span className="btc-sign">₿</span>
                </h3>
                <p>Pay with Bitcoin</p>
                <div className="payment-method-badge crypto-badge">Fast</div>
              </motion.button>
            </div>

            {/* Footer Note */}
            <div className="payment-modal-footer">
              <p>All payment methods are secure and encrypted</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
