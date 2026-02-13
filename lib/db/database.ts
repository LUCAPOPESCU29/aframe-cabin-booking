// Simple in-memory database (can be replaced with PostgreSQL/MySQL later)
// This uses localStorage in the browser for persistence

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

class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Bookings
  getAllBookings(): Booking[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('bookings');
    return data ? JSON.parse(data) : [];
  }

  getBookingById(id: number): Booking | null {
    const bookings = this.getAllBookings();
    return bookings.find(b => b.id === id) || null;
  }

  getBookingByReference(reference: string): Booking | null {
    const bookings = this.getAllBookings();
    return bookings.find(b => b.bookingReference === reference) || null;
  }

  createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Booking {
    const bookings = this.getAllBookings();
    const newBooking: Booking = {
      ...booking,
      id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  }

  updateBooking(id: number, updates: Partial<Booking>): Booking | null {
    const bookings = this.getAllBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;

    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveBookings(bookings);
    return bookings[index];
  }

  deleteBooking(id: number): boolean {
    const bookings = this.getAllBookings();
    const filtered = bookings.filter(b => b.id !== id);
    if (filtered.length === bookings.length) return false;
    this.saveBookings(filtered);
    return true;
  }

  private saveBookings(bookings: Booking[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }

  // Reviews
  getAllReviews(): Review[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('reviews');
    return data ? JSON.parse(data) : [];
  }

  getReviewById(id: number): Review | null {
    const reviews = this.getAllReviews();
    return reviews.find(r => r.id === id) || null;
  }

  createReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Review {
    const reviews = this.getAllReviews();
    const newReview: Review = {
      ...review,
      id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    reviews.push(newReview);
    this.saveReviews(reviews);
    return newReview;
  }

  updateReview(id: number, updates: Partial<Review>): Review | null {
    const reviews = this.getAllReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return null;

    reviews[index] = {
      ...reviews[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveReviews(reviews);
    return reviews[index];
  }

  deleteReview(id: number): boolean {
    const reviews = this.getAllReviews();
    const filtered = reviews.filter(r => r.id !== id);
    if (filtered.length === reviews.length) return false;
    this.saveReviews(filtered);
    return true;
  }

  private saveReviews(reviews: Review[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  }

  // Statistics
  getStatistics() {
    const bookings = this.getAllBookings();
    const reviews = this.getAllReviews();

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.total, 0);

    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    const cabinBookings = bookings.reduce((acc, b) => {
      acc[b.cabinName] = (acc[b.cabinName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue,
      totalReviews: reviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
      cabinBookings
    };
  }
}

export const db = Database.getInstance();
