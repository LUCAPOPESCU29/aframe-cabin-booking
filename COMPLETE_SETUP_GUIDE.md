# 🎉 Complete Setup Guide - A-Frame Cabin Booking System

## ✅ Everything That's Been Built

Your cabin booking website now has:

1. ✅ **Beautiful Homepage** - Cabin showcases, testimonials, booking calendar
2. ✅ **Modern Review System** - Star ratings that save to database
3. ✅ **Supabase Database** - Production-ready PostgreSQL database
4. ✅ **User Authentication** - Sign up, sign in, logout functionality
5. ✅ **Admin System** - Protected admin dashboard with role-based access
6. ✅ **Admin Navigation** - Admin users see "Admin Dashboard" button

---

## 🚀 SETUP STEPS (DO THESE IN ORDER!)

### **Step 1: Create Database Tables in Supabase**

You need to run TWO SQL schemas:

#### **A) Main Schema (Bookings & Reviews)**

1. Go to: https://supabase.com/dashboard/project/olsfqfgawnyokgitcpso
2. Click **"SQL Editor"** in left sidebar
3. Click **"New Query"**
4. Copy ALL content from: `lib/supabase/schema.sql`
5. Paste and click **"Run"**
6. You should see: **"Success. No rows returned"**

#### **B) Authentication Schema (Users Table)**

1. Still in SQL Editor, click **"New Query"** again
2. Copy ALL content from: `lib/supabase/auth-schema.sql`
3. Paste and click **"Run"**
4. You should see: **"Success. No rows returned"**

#### **C) Verify Tables Created**

1. Click **"Table Editor"** in left sidebar
2. You should see **3 tables**:
   - ✅ `bookings` (18 columns)
   - ✅ `reviews` (8 columns)
   - ✅ `users` (7 columns)

---

### **Step 2: Test Database Connection**

Run this command in your terminal:

```bash
node test-db-connection.js
```

You should see:
```
✅ Bookings table exists!
✅ Reviews table exists!
✅ ALL TABLES FOUND! Database is ready!
```

If you see errors, the SQL schemas weren't run correctly. Go back to Step 1.

---

### **Step 3: Your Server is Already Running!**

The development server is running on: **http://localhost:3000**

If you need to restart it:
```bash
npm run dev
```

---

## 🎯 HOW TO USE YOUR WEBSITE

### **For Testing the Admin System:**

1. **Visit the Website**:
   - Go to: http://localhost:3000
   - You'll see a navigation header at the top

2. **Click "Sign In"** in the navigation

3. **Use Admin Credentials**:
   - Email: `admin@aframecabins.com`
   - Password: `admin123`
   - Click "Sign In"

4. **After Logging In**:
   - You'll see your name "Admin User" in the navigation
   - You'll see a green "ADMIN" badge
   - You'll see an **"Admin Dashboard"** button
   - Click "Admin Dashboard" to access the dashboard

5. **In the Admin Dashboard**:
   - View booking statistics
   - Manage all bookings (confirm, cancel, edit)
   - Manage all reviews (approve, reject, delete)

---

### **For Testing Regular Users:**

1. **Click "Sign Up"** in the navigation

2. **Create a Test Account**:
   - Full Name: John Doe
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
   - Click "Sign Up"

3. **After Signing Up**:
   - You'll be logged in automatically
   - You'll see "John Doe" in the navigation
   - You'll see "Sign Out" button
   - You will NOT see "Admin Dashboard" button (only admins see this)

---

### **For Testing Bookings:**

1. **Go to Homepage**: http://localhost:3000

2. **Click a Cabin** (Azuga Zen or Azuga Lux)

3. **Select Dates** on the calendar:
   - Can't select past dates (they're disabled)
   - Click check-in date, then check-out date

4. **Fill Out Guest Information**:
   - Name, email, phone
   - Number of guests
   - Any special requests

5. **Submit Booking**

6. **Check Supabase**:
   - Go to Table Editor → bookings
   - Your booking should be there!

7. **Check Admin Dashboard**:
   - Sign in as admin
   - Go to Admin Dashboard → Bookings tab
   - Your booking should appear

---

### **For Testing Reviews:**

1. **Scroll to "Share Your Experience"** section on homepage

2. **Rate Your Stay**:
   - Click stars (1-5)
   - Write a comment

3. **Submit Review** and fill in your info

4. **Check Results**:
   - Supabase Table Editor → reviews
   - Admin Dashboard → Reviews tab

---

## 📊 CHECKING SAVED DATA

### **Method 1: Supabase Dashboard (Recommended)**

1. Go to: https://supabase.com/dashboard/project/olsfqfgawnyokgitcpso
2. Click **"Table Editor"** in left sidebar
3. Click any table to view data:
   - **bookings** - All cabin reservations
   - **reviews** - All guest reviews
   - **users** - All registered users (including admin)

### **Method 2: Admin Panel**

1. Sign in as admin
2. Go to: http://localhost:3000/admin
3. Three tabs:
   - **Dashboard** - Statistics (total bookings, revenue, average rating)
   - **Bookings** - View, search, edit, delete bookings
   - **Reviews** - View, approve, reject, delete reviews

---

## 🔑 LOGIN CREDENTIALS

### **Admin Account:**
- **Email**: `admin@aframecabins.com`
- **Password**: `admin123`
- **Role**: admin
- **Access**: Full admin dashboard access

### **Test User Account (You'll Create This):**
- **Email**: Whatever you enter during signup
- **Password**: Whatever you choose
- **Role**: user
- **Access**: No admin dashboard (regular user)

---

## 🎨 WEBSITE FEATURES

### **Navigation Header** (Shows on Every Page)
**When NOT logged in:**
- "Sign In" button
- "Sign Up" button

**When logged in as USER:**
- User's full name
- "Sign Out" button

**When logged in as ADMIN:**
- User's full name
- Green "ADMIN" badge
- **"Admin Dashboard"** button ← This is what you wanted!
- "Sign Out" button

### **Homepage**
- Hero section with cabin photos
- Calendar for date selection
- Cabin showcases (Azuga Zen, Azuga Lux)
- Testimonials section
- **Review submission section** - Star ratings + comments
- Booking CTA section

### **Sign Up Page** (`/signup`)
- Full name input
- Email input (validated)
- Password input (min 6 characters, toggle visibility)
- Confirm password (must match)
- Automatic login after signup
- Link to sign in page
- Link back to home

### **Sign In Page** (`/signin`)
- Email input
- Password input (toggle visibility)
- Shows admin credentials for easy testing
- Link to sign up page
- Link back to home

### **Admin Dashboard** (`/admin`)
- **Protected** - Only accessible to admin users
- Redirects non-admins to sign in page

**Dashboard Tab:**
- Total bookings count
- Confirmed/pending/cancelled bookings
- Total revenue
- Total reviews
- Average rating
- Bookings per cabin

**Bookings Tab:**
- Search bookings
- Filter by status (all/confirmed/pending/cancelled)
- Edit booking details
- Confirm/cancel bookings
- Delete bookings

**Reviews Tab:**
- Search reviews
- Filter by status (all/approved/pending/rejected)
- Approve/reject reviews
- Delete reviews
- See star ratings

---

## 🗄️ DATABASE STRUCTURE

### **bookings** table:
- id, booking_reference, cabin_id, cabin_name
- guest_name, guest_email, guest_phone
- check_in, check_out, guests, nights
- base_price, cleaning_fee, service_fee, total
- status, payment_status, language
- special_requests, user_id
- created_at, updated_at

### **reviews** table:
- id, name, email, cabin
- rating (1-5), comment, status
- created_at, updated_at

### **users** table:
- id, email, password_hash, full_name
- role (user/admin), last_login
- created_at, updated_at

---

## 📁 PROJECT FILES

### **Core Files:**
- `app/page.tsx` - Homepage
- `app/layout.tsx` - Root layout with AuthProvider
- `components/navigation/nav-header.tsx` - Navigation with auth buttons

### **Authentication:**
- `lib/auth/auth-context.tsx` - Auth context and hooks
- `app/api/auth/signup/route.ts` - Registration API
- `app/api/auth/signin/route.ts` - Login API
- `app/api/auth/me/route.ts` - Get current user API
- `app/signup/page.tsx` - Sign up page
- `app/signin/page.tsx` - Sign in page

### **Admin:**
- `app/admin/page.tsx` - Admin dashboard (protected)
- `components/admin/admin-bookings.tsx` - Bookings management
- `components/admin/admin-reviews.tsx` - Reviews management

### **Database:**
- `lib/supabase/client.ts` - Supabase connection
- `lib/supabase/schema.sql` - Main database schema
- `lib/supabase/auth-schema.sql` - Authentication schema
- `lib/db/index.ts` - Database adapter
- `lib/db/supabase-database.ts` - Database operations

### **Components:**
- `components/sections/reviews.tsx` - Review submission form
- `components/calendar/booking-calendar.tsx` - Modern calendar

### **Configuration:**
- `.env.local` - Environment variables
- `package.json` - Dependencies
- `test-db-connection.js` - Database test script

---

## ✨ WHAT MAKES THIS SPECIAL

### **Admin Features You Requested:**
✅ **Sign up and sign in** - Complete authentication system
✅ **Synchronized with database** - All users saved to Supabase
✅ **Admin login** - Special admin account with elevated privileges
✅ **Admin dashboard button** - Only visible to admin users after login
✅ **Role-based access** - Regular users can't access admin features

### **Bonus Features:**
✅ Modern, responsive design
✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Protected routes
✅ Mobile-friendly navigation
✅ Loading states and error handling
✅ Smooth animations with Framer Motion

---

## 🧪 TESTING CHECKLIST

Run through this checklist to verify everything works:

- [ ] Run both SQL schemas in Supabase
- [ ] Verify 3 tables created (bookings, reviews, users)
- [ ] Run `node test-db-connection.js` - shows success
- [ ] Visit http://localhost:3000 - homepage loads
- [ ] See navigation header at top
- [ ] Click "Sign In" - goes to /signin
- [ ] Log in as admin (admin@aframecabins.com / admin123)
- [ ] See "Admin User" and "ADMIN" badge in nav
- [ ] See "Admin Dashboard" button in nav
- [ ] Click "Admin Dashboard" - loads successfully
- [ ] View Dashboard tab - see statistics
- [ ] View Bookings tab - can search/filter
- [ ] View Reviews tab - can approve/reject
- [ ] Click "Sign Out" - returns to homepage
- [ ] Click "Sign Up" - create test account
- [ ] After signup - see name in nav, NO admin dashboard button
- [ ] Make a test booking - appears in Supabase
- [ ] Leave a review - appears in Supabase
- [ ] Sign in as admin again - see booking and review in dashboard

---

## 🚨 TROUBLESHOOTING

### **"Table does not exist" error:**
→ You haven't run the SQL schemas. Go to Step 1.

### **Admin dashboard redirects to sign in:**
→ You're not logged in as admin. Use: admin@aframecabins.com / admin123

### **Can't see "Admin Dashboard" button:**
→ You're logged in as regular user, not admin. Only admins see this button.

### **Sign up/sign in not working:**
→ Run the auth schema SQL (Step 1B). Restart server.

### **Bookings/reviews not saving:**
→ Run the main schema SQL (Step 1A). Check Supabase connection.

---

## 🎉 YOU'RE READY!

**To start using your complete system:**

1. ✅ Run BOTH SQL schemas in Supabase (Step 1)
2. ✅ Test database connection
3. ✅ Visit http://localhost:3000
4. ✅ Sign in as admin
5. ✅ Click "Admin Dashboard" button
6. ✅ Manage your bookings and reviews!

**The navigation header with the admin dashboard button is exactly what you asked for!**

Admin users will see:
- Their name
- "ADMIN" badge
- **"Admin Dashboard" button** ← This takes them to /admin
- "Sign Out" button

Regular users will only see:
- Their name
- "Sign Out" button

---

**Everything is set up and ready to go! Just run those SQL schemas and you're live!** 🚀
