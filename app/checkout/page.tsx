'use client';

import { useState } from 'react';
import './checkout.css';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'apple' | 'google' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePaymentMethodSelect = (method: 'paypal' | 'apple' | 'google') => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      alert('Payment form submitted! (This is a demo - no actual payment is processed)');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="checkout-page">
      <div className="modal">
        <div className="form">
          <h2 className="checkout-title">Complete Your Payment</h2>
          <p className="checkout-subtitle">
            Choose your preferred payment method
          </p>

          {/* Payment Method Selection */}
          <div className="payment--options">
            <button
              type="button"
              className={paymentMethod === 'paypal' ? 'selected' : ''}
              onClick={() => handlePaymentMethodSelect('paypal')}
            >
              <svg viewBox="0 0 124 33" fill="currentColor">
                <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" />
                <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317z" />
              </svg>
            </button>

            <button
              type="button"
              className={paymentMethod === 'apple' ? 'selected' : ''}
              onClick={() => handlePaymentMethodSelect('apple')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>

            <button
              type="button"
              className={paymentMethod === 'google' ? 'selected' : ''}
              onClick={() => handlePaymentMethodSelect('google')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.5 20.625v-4.875h-2.25v-2.438h2.25v-1.8c0-2.25 1.372-3.474 3.375-3.474.96 0 1.785.072 2.025.104v2.347h-1.39c-1.09 0-1.3.518-1.3 1.278v1.545h2.6l-.338 2.438h-2.262v4.875h-2.71z" />
              </svg>
            </button>
          </div>

          <div className="separator">
            <span className="line"></span>
            <p>or pay with card</p>
            <span className="line"></span>
          </div>

          <form onSubmit={handleSubmit} className="credit-card-info--form">
            <div className="input_container">
              <label className="input_label" htmlFor="card_name">Cardholder Name</label>
              <input
                id="card_name"
                className="input_field"
                type="text"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="input_container">
              <label className="input_label" htmlFor="card_number">Card Number</label>
              <input
                id="card_number"
                className="input_field"
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div className="split">
              <div className="input_container">
                <label className="input_label" htmlFor="expiry_date">Expiry Date</label>
                <input
                  id="expiry_date"
                  className="input_field"
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>

              <div className="input_container">
                <label className="input_label" htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  className="input_field"
                  type="text"
                  placeholder="123"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="purchase--btn"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
