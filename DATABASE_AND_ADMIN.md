# Database & Admin Panel Documentation

## Overview

A complete database system with admin panel for managing bookings and reviews for the A-Frame cabin website.

---

## Features

### 📊 Database System
- **LocalStorage-based** - Data persists in browser (can be upgraded to PostgreSQL/MySQL later)
- **Bookings Table** - Stores all reservation details
- **Reviews Table** - Stores all guest reviews
- **Statistics Engine** - Real-time analytics and metrics

### 🔧 Admin Panel
Access at: **http://localhost:3000/admin**

#### Three Main Tabs:

1. **Dashboard**
   - Total bookings, revenue, reviews, average rating
   - Booking status breakdown (Confirmed, Pending, Cancelled)
   - Cabin performance charts

2. **Bookings Management**
   - View all bookings
   - Search by name, email, or reference
   - Filter by status (pending, confirmed, cancelled)
   - Edit booking details (dates, guest info, status)
   - Delete bookings
   - Quick actions: Confirm or Cancel bookings

3. **Reviews Management**
   - View all reviews
   - Search by name, cabin, or comment
   - Filter by status (approved, pending, rejected)
   - Approve or reject reviews
   - Delete reviews
   - Star rating display

---

## Database Schema

### Bookings Table

```typescript
interface Booking {
  id: number;
  bookingReference: string;        // e.g., "AFMLJRT9IG"
  cabinId: string;                  // e.g., "the-pine"
  cabinName: string;                // e.g., "The Pine"
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;                  // ISO date
  checkOut: string;                 // ISO date
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
  createdAt: string;                // ISO timestamp
  updatedAt: string;                // ISO timestamp
}
```

### Reviews Table

```typescript
interface Review {
  id: number;
  name: string;
  email: string;
  cabin: string;                    // e.g., "The Pine"
  rating: number;                   // 1-5
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;                // ISO timestamp
  updatedAt: string;                // ISO timestamp
}
```

---

## API Endpoints

### Bookings

**POST /api/booking**
- Creates a new booking
- Saves to database automatically
- Sends confirmation email
- Returns booking reference

Example request:
```json
{
  "cabinId": "the-pine",
  "cabinName": "The Pine",
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-18",
  "guests": 4,
  "nights": 3,
  "basePrice": 750,
  "cleaningFee": 50,
  "serviceFee": 50,
  "total": 850,
  "language": "en"
}
```

### Reviews

**GET /api/reviews**
- Returns all approved reviews
- Used by frontend to display reviews

**POST /api/reviews**
- Creates a new review
- Auto-approved (can be changed to 'pending')
- Saves to database

Example request:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "cabin": "The Pine",
  "rating": 5,
  "comment": "Amazing stay!"
}
```

---

## How Data Flows

### Booking Flow:
1. Guest fills out booking form
2. Clicks "Reserve Now"
3. API creates booking in database
4. Email sent to guest with payment instructions
5. Admin can see booking in admin panel
6. Admin can confirm/cancel/edit booking

### Review Flow:
1. Guest submits review with star rating
2. API saves review to database (approved)
3. Review appears on website immediately
4. Admin can approve/reject/delete from admin panel
5. Only approved reviews show on website

---

## Admin Panel Usage

### Accessing Admin Panel

Visit: **http://localhost:3000/admin**

*(In production, you'll want to add authentication)*

### Dashboard

View overall statistics:
- **Total Bookings** - All bookings count
- **Total Revenue** - Sum of all non-cancelled bookings
- **Average Rating** - Average of all reviews
- **Booking Status** - Breakdown by status
- **Cabin Performance** - Visual bar charts showing bookings per cabin

### Managing Bookings

**Search & Filter:**
- Search by guest name, email, or booking reference
- Filter by status: All, Pending, Confirmed, Cancelled

**Edit Booking:**
1. Click edit icon (pencil)
2. Modify guest details, dates, status, payment status
3. Click "Save Changes"

**Delete Booking:**
1. Click delete icon (trash)
2. Confirm deletion
3. Booking removed from database

**Quick Actions:**
- **Confirm** - Changes status to "confirmed"
- **Cancel** - Changes status to "cancelled"

### Managing Reviews

**Search & Filter:**
- Search by name, cabin, or comment text
- Filter by status: All, Approved, Pending, Rejected

**Approve Review:**
- Click "Approve" button
- Review now shows on website

**Reject Review:**
- Click "Reject" button
- Review hidden from website

**Delete Review:**
- Click delete icon (trash)
- Confirm deletion
- Review permanently removed

---

## Statistics Available

```typescript
{
  totalBookings: number;           // All bookings
  confirmedBookings: number;        // Confirmed only
  pendingBookings: number;          // Awaiting confirmation
  cancelledBookings: number;        // Cancelled
  totalRevenue: number;             // Total RON (excluding cancelled)
  totalReviews: number;             // All reviews
  averageRating: number;            // Average star rating (0-5)
  cabinBookings: {                  // Bookings per cabin
    "The Pine": number;
    "The Cedar": number;
  }
}
```

---

## Data Persistence

**Current:** LocalStorage (browser-based)
- Data stored in browser's localStorage
- Persists across page refreshes
- Lost if browser cache cleared

**Upgrading to Real Database:**

The code is structured to easily upgrade to PostgreSQL/MySQL/Supabase:

1. Replace `lib/db/database.ts` with actual database client
2. Use provided `schema.sql` to create tables
3. Update API routes to use database instead of localStorage
4. No changes needed to admin panel UI

---

## Security Considerations

**Current Setup:**
- No authentication (anyone can access /admin)
- LocalStorage is client-side only

**For Production:**
- Add authentication to `/admin` route
- Use server-side database
- Add authorization checks
- Validate all inputs
- Use environment variables for secrets

---

## File Structure

```
app/
├── admin/
│   └── page.tsx                 # Admin dashboard page
├── api/
│   ├── booking/
│   │   └── route.ts             # Booking API (saves to DB)
│   └── reviews/
│       └── route.ts             # Reviews API
components/
├── admin/
│   ├── admin-bookings.tsx       # Bookings management
│   └── admin-reviews.tsx        # Reviews management
lib/
├── db/
│   ├── schema.sql               # Database schema
│   └── database.ts              # Database utilities
```

---

## Usage Examples

### View All Bookings
```typescript
import { db } from '@/lib/db/database';

const bookings = db.getAllBookings();
```

### Create Booking
```typescript
const booking = db.createBooking({
  bookingReference: 'AFMLJRT9IG',
  cabinId: 'the-pine',
  cabinName: 'The Pine',
  guestName: 'John Doe',
  guestEmail: 'john@example.com',
  checkIn: '2024-03-15',
  checkOut: '2024-03-18',
  guests: 4,
  nights: 3,
  basePrice: 750,
  cleaningFee: 50,
  serviceFee: 50,
  total: 850,
  status: 'pending',
  paymentStatus: 'pending',
  language: 'en'
});
```

### Update Booking
```typescript
db.updateBooking(1, { status: 'confirmed', paymentStatus: 'paid' });
```

### Delete Booking
```typescript
db.deleteBooking(1);
```

### Get Statistics
```typescript
const stats = db.getStatistics();
console.log(`Total Revenue: ${stats.totalRevenue} RON`);
console.log(`Average Rating: ${stats.averageRating} / 5`);
```

---

## Next Steps

1. **Add Authentication** - Protect /admin with login
2. **Upgrade Database** - Move from localStorage to PostgreSQL
3. **Add Email Notifications** - Notify admin of new bookings/reviews
4. **Export Data** - Add CSV export functionality
5. **Calendar View** - Visual booking calendar
6. **Payment Integration** - Track Wise payment confirmations

---

**Status:** ✅ Fully Functional
**Data Storage:** LocalStorage (browser)
**Admin URL:** http://localhost:3000/admin
