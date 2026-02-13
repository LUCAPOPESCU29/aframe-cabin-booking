// Database adapter - switches between localStorage and Supabase
import { supabaseDb } from './supabase-database';

// Use Supabase for server-side operations
// Note: The interface names differ slightly between implementations
// Supabase uses snake_case (booking_reference) while localStorage uses camelCase (bookingReference)
// This adapter handles the conversion

export interface Booking {
  id: number;
  bookingReference: string;
  cabinId: string;
  cabinName: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  language: 'en' | 'ro';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  name: string;
  email: string;
  cabin: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Convert between snake_case (Supabase) and camelCase (app)
function toSupabaseBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) {
  return {
    booking_reference: booking.bookingReference,
    cabin_id: booking.cabinId,
    cabin_name: booking.cabinName,
    guest_name: booking.guestName,
    guest_email: booking.guestEmail,
    guest_phone: booking.guestPhone,
    check_in: booking.checkIn,
    check_out: booking.checkOut,
    guests: booking.guests,
    nights: booking.nights,
    base_price: booking.basePrice,
    cleaning_fee: booking.cleaningFee,
    service_fee: booking.serviceFee,
    total: booking.total,
    status: booking.status,
    payment_status: booking.paymentStatus,
    language: booking.language,
    special_requests: booking.specialRequests
  };
}

function fromSupabaseBooking(booking: any): Booking {
  return {
    id: booking.id,
    bookingReference: booking.booking_reference,
    cabinId: booking.cabin_id,
    cabinName: booking.cabin_name,
    guestName: booking.guest_name,
    guestEmail: booking.guest_email,
    guestPhone: booking.guest_phone,
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    guests: booking.guests,
    nights: booking.nights,
    basePrice: Number(booking.base_price),
    cleaningFee: Number(booking.cleaning_fee),
    serviceFee: Number(booking.service_fee),
    total: Number(booking.total),
    status: booking.status,
    paymentStatus: booking.payment_status,
    language: booking.language,
    specialRequests: booking.special_requests,
    createdAt: booking.created_at,
    updatedAt: booking.updated_at
  };
}

function fromSupabaseReview(review: any): Review {
  return {
    id: review.id,
    name: review.name,
    email: review.email,
    cabin: review.cabin,
    rating: review.rating,
    comment: review.comment,
    status: review.status,
    createdAt: review.created_at,
    updatedAt: review.updated_at
  };
}

class DatabaseAdapter {
  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    const bookings = await supabaseDb.getAllBookings();
    return bookings.map(fromSupabaseBooking);
  }

  async getBookingById(id: number): Promise<Booking | null> {
    const booking = await supabaseDb.getBookingById(id);
    return booking ? fromSupabaseBooking(booking) : null;
  }

  async getBookingByReference(reference: string): Promise<Booking | null> {
    const booking = await supabaseDb.getBookingByReference(reference);
    return booking ? fromSupabaseBooking(booking) : null;
  }

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking | null> {
    const supabaseBooking = toSupabaseBooking(booking);
    const result = await supabaseDb.createBooking(supabaseBooking as any);
    return result ? fromSupabaseBooking(result) : null;
  }

  async updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | null> {
    // Convert camelCase to snake_case for updates
    const supabaseUpdates: any = {};
    if (updates.guestName) supabaseUpdates.guest_name = updates.guestName;
    if (updates.guestEmail) supabaseUpdates.guest_email = updates.guestEmail;
    if (updates.checkIn) supabaseUpdates.check_in = updates.checkIn;
    if (updates.checkOut) supabaseUpdates.check_out = updates.checkOut;
    if (updates.status) supabaseUpdates.status = updates.status;
    if (updates.paymentStatus) supabaseUpdates.payment_status = updates.paymentStatus;

    const result = await supabaseDb.updateBooking(id, supabaseUpdates);
    return result ? fromSupabaseBooking(result) : null;
  }

  async deleteBooking(id: number): Promise<boolean> {
    return await supabaseDb.deleteBooking(id);
  }

  // Reviews
  async getAllReviews(): Promise<Review[]> {
    const reviews = await supabaseDb.getAllReviews();
    return reviews.map(fromSupabaseReview);
  }

  async getReviewById(id: number): Promise<Review | null> {
    const review = await supabaseDb.getReviewById(id);
    return review ? fromSupabaseReview(review) : null;
  }

  async createReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review | null> {
    const result = await supabaseDb.createReview(review as any);
    return result ? fromSupabaseReview(result) : null;
  }

  async updateReview(id: number, updates: Partial<Review>): Promise<Review | null> {
    const result = await supabaseDb.updateReview(id, updates as any);
    return result ? fromSupabaseReview(result) : null;
  }

  async deleteReview(id: number): Promise<boolean> {
    return await supabaseDb.deleteReview(id);
  }

  // Statistics
  async getStatistics() {
    return await supabaseDb.getStatistics();
  }
}

export const db = new DatabaseAdapter();
