'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import './my-bookings.css';

interface Booking {
  id: number;
  booking_reference: string;
  cabin_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  nights: number;
  total: number;
  status: string;
  payment_status: string;
  payment_method: string;
  created_at: string;
}

export default function MyBookingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }

    fetchBookings();
  }, [user, router]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/user/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      } else {
        setError('Failed to load bookings');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    return method ? method.toUpperCase() : 'N/A';
  };

  if (loading) {
    return (
      <div className="bookings-page">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="bookings-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bookings-header"
        >
          <div className="header-content">
            <h1>Your Bookings</h1>
            <p>Manage and track all your cabin reservations</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{bookings.length}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {bookings.filter(b => b.status === 'confirmed').length}
              </span>
              <span className="stat-label">Confirmed</span>
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-state"
          >
            <Calendar size={64} className="empty-icon" />
            <h2>No Bookings Yet</h2>
            <p>Start planning your mountain escape!</p>
            <button
              className="browse-btn"
              onClick={() => router.push('/')}
            >
              Browse Cabins
            </button>
          </motion.div>
        )}

        {/* Bookings Grid */}
        {bookings.length > 0 && (
          <div className="bookings-grid">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="booking-card"
              >
                {/* Card Header */}
                <div className="card-header">
                  <div className="cabin-info">
                    <h3>{booking.cabin_name}</h3>
                    <span className="booking-ref">#{booking.booking_reference}</span>
                  </div>
                  <span className={`status-badge ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  {/* Dates */}
                  <div className="info-row">
                    <div className="info-item">
                      <Calendar size={18} />
                      <div className="info-text">
                        <span className="info-label">Check-in</span>
                        <span className="info-value">{formatDate(booking.check_in)}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="arrow-icon" />
                    <div className="info-item">
                      <Calendar size={18} />
                      <div className="info-text">
                        <span className="info-label">Check-out</span>
                        <span className="info-value">{formatDate(booking.check_out)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="details-grid">
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{booking.nights} nights</span>
                    </div>
                    <div className="detail-item">
                      <Users size={16} />
                      <span>{booking.guests} guests</span>
                    </div>
                    <div className="detail-item">
                      <CreditCard size={16} />
                      <span>{getPaymentMethodIcon(booking.payment_method)}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <div className="total-price">
                    <span className="price-label">Total</span>
                    <span className="price-value">{booking.total.toFixed(2)} RON</span>
                  </div>
                  <span className={`payment-status ${booking.payment_status === 'paid' ? 'paid' : 'pending'}`}>
                    {booking.payment_status === 'paid' ? 'Paid' : 'Payment Pending'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
