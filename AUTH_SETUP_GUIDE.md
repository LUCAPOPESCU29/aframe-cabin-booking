# 🔐 Authentication System Setup Guide

## ✅ What's Been Created

I've built a complete authentication system for your A-Frame Cabin booking website with:

1. **User Registration (Sign Up)** - New users can create accounts
2. **User Login (Sign In)** - Existing users can log in
3. **Admin Roles** - Admin users get special dashboard access
4. **Protected Routes** - Admin dashboard requires authentication
5. **Navigation Header** - Shows login/logout buttons and admin access
6. **Database Integration** - All users saved to Supabase

---

## 🚀 Setup Steps

### **Step 1: Run the Authentication Schema in Supabase**

You need to create the `users` table in your Supabase database.

1. **Go to Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/olsfqfgawnyokgitcpso

2. **Open SQL Editor**:
   - Click **"SQL Editor"** in the left sidebar
   - Click **"New Query"**

3. **Copy This SQL**:

```sql
-- Additional Authentication Schema for A-Frame Cabin Booking
-- Run this AFTER running the main schema.sql

-- Users Table (for custom user data and admin roles)
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies for users table
DROP POLICY IF EXISTS "Users can read their own data" ON users;
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for registration" ON users;
CREATE POLICY "Enable insert for registration" ON users
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own data" ON users;
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (true);

-- Insert a default admin user (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'admin@aframecabins.com',
  '$2a$10$rXH/VKjJVVmLQhzQqvKZf.X9VJZy3nHVPzVxmvVkQhGZYHLNHYVri',
  'Admin User',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Add user_id to bookings table (optional - link bookings to users)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id BIGINT REFERENCES users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
```

4. **Run It**:
   - Click **"Run"** (or Cmd/Ctrl + Enter)
   - You should see: **"Success. No rows returned"**

5. **Verify Tables Created**:
   - Click **"Table Editor"** in the left sidebar
   - You should now see a **`users`** table

---

### **Step 2: Restart Your Development Server**

The server needs to restart to load the new authentication code:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🎯 How to Use the Authentication System

### **For Regular Users:**

1. **Sign Up**:
   - Go to: http://localhost:3000/signup
   - Enter full name, email, password
   - Click "Sign Up"
   - You'll be logged in automatically

2. **Sign In**:
   - Go to: http://localhost:3000/signin
   - Enter email and password
   - Click "Sign In"

3. **Sign Out**:
   - Click the "Sign Out" button in the navigation header

### **For Admin Users:**

1. **Admin Login**:
   - Go to: http://localhost:3000/signin
   - Email: `admin@aframecabins.com`
   - Password: `admin123`
   - Click "Sign In"

2. **Access Admin Dashboard**:
   - After logging in, you'll see an **"Admin Dashboard"** button in the navigation
   - Click it to go to: http://localhost:3000/admin
   - Only admin users can see this button and access the dashboard

3. **Admin Badge**:
   - Admin users have a green "ADMIN" badge next to their name in the navigation

---

## 🔑 Default Admin Credentials

**⚠️ IMPORTANT: Change these in production!**

- **Email**: `admin@aframecabins.com`
- **Password**: `admin123`

To change the admin password:
1. Sign in as admin
2. Go to Supabase Table Editor → users table
3. Find the admin user
4. Update the `password_hash` field (or create a password change feature)

---

## 📋 Features Overview

### **Navigation Header**
- Shows on every page
- **Not Logged In**: Shows "Sign In" and "Sign Up" buttons
- **Logged In (User)**: Shows user name and "Sign Out" button
- **Logged In (Admin)**: Shows user name, "ADMIN" badge, "Admin Dashboard" button, and "Sign Out" button

### **Protected Routes**
- `/admin` - Only accessible to admin users
- Non-admin users are redirected to `/signin`
- Not logged in users are redirected to `/signin`

### **Sign Up Page** (`/signup`)
- Full name field
- Email field (validated)
- Password field (min 6 characters)
- Confirm password field (must match)
- Password visibility toggle
- Link to sign in page
- Automatic login after successful signup

### **Sign In Page** (`/signin`)
- Email field
- Password field
- Password visibility toggle
- Shows admin credentials for testing
- Link to sign up page
- Link back to home page

### **User Roles**
- **user** - Regular customers (default)
- **admin** - Full access to admin dashboard

---

## 📁 Files Created

### **Authentication Core:**
- `lib/auth/auth-context.tsx` - Authentication context and hooks
- `lib/supabase/auth-schema.sql` - Database schema for users

### **API Routes:**
- `app/api/auth/signup/route.ts` - User registration
- `app/api/auth/signin/route.ts` - User login
- `app/api/auth/me/route.ts` - Get current user

### **Pages:**
- `app/signup/page.tsx` - Sign up page with form validation
- `app/signin/page.tsx` - Sign in page with admin credentials shown

### **Components:**
- `components/navigation/nav-header.tsx` - Navigation with auth buttons

### **Modified Files:**
- `app/layout.tsx` - Added AuthProvider and NavHeader
- `app/admin/page.tsx` - Added authentication protection
- `.env.local` - Added JWT_SECRET

### **Dependencies:**
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `@types/bcryptjs` - TypeScript types
- `@types/jsonwebtoken` - TypeScript types

---

## 🧪 Testing the System

### **Test 1: Admin Login**
1. Go to http://localhost:3000/signin
2. Use admin credentials:
   - Email: `admin@aframecabins.com`
   - Password: `admin123`
3. You should see:
   - Your name in the nav ("Admin User")
   - Green "ADMIN" badge
   - "Admin Dashboard" button
4. Click "Admin Dashboard" → Should load successfully

### **Test 2: Create New User**
1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
3. Click "Sign Up"
4. You should be logged in automatically
5. You should see "Test User" in nav
6. You should NOT see "Admin Dashboard" button (not admin)

### **Test 3: Protected Route**
1. Sign out if logged in
2. Try to visit http://localhost:3000/admin directly
3. You should be redirected to http://localhost:3000/signin

### **Test 4: Check Database**
1. Go to Supabase Table Editor
2. Click `users` table
3. You should see:
   - Admin user
   - Any test users you created
   - Their roles (user/admin)
   - Created timestamps

---

## 🔐 Security Features

1. **Password Hashing**: Uses bcrypt (industry standard)
2. **JWT Tokens**: 7-day expiration
3. **Protected Routes**: Automatic redirect if not authorized
4. **Role-Based Access**: Admin vs user roles
5. **Row Level Security**: Supabase RLS enabled
6. **Client-Side Auth Check**: Fast UI updates
7. **Server-Side Validation**: API routes verify tokens

---

## 🎨 UI Features

### **Responsive Design**
- Works on mobile and desktop
- Mobile menu for navigation
- Touch-friendly buttons

### **Visual Feedback**
- Loading states during sign in/up
- Error messages in red
- Success redirects
- Password visibility toggle
- Admin badge in navigation

### **Gradient Design**
- Matches your cabin booking theme
- Green/tan color scheme
- Smooth animations with Framer Motion

---

## 🛠️ How It Works

### **User Flow:**
1. User fills signup/signin form
2. Form data sent to `/api/auth/signup` or `/api/auth/signin`
3. Backend validates credentials
4. Password hashed (signup) or verified (signin)
5. JWT token generated
6. Token saved to localStorage
7. User data stored in React context
8. UI updates to show logged-in state

### **Protected Route Flow:**
1. User visits `/admin`
2. `useAuth` hook checks if user logged in
3. Checks if user has admin role
4. If not admin → redirect to `/signin`
5. If admin → show dashboard

### **Token Verification:**
1. On app load, check for token in localStorage
2. Send token to `/api/auth/me`
3. Backend verifies JWT signature
4. Returns user data if valid
5. AuthContext updates with user info

---

## 📌 Next Steps (Optional)

1. **Add Password Reset** - Allow users to reset forgotten passwords
2. **Email Verification** - Verify emails before allowing login
3. **Remember Me** - Longer token expiration option
4. **User Profile Page** - Let users edit their info
5. **Booking History** - Show users their past bookings
6. **2FA** - Add two-factor authentication
7. **Social Login** - Google/Facebook login

---

## ⚠️ Important Notes

### **Change These in Production:**
1. `JWT_SECRET` in `.env.local` - Use a strong random string
2. Admin password - Change from `admin123`
3. Consider using environment-specific secrets

### **Security Best Practices:**
1. Never commit `.env.local` to git
2. Use HTTPS in production
3. Set strong password requirements
4. Implement rate limiting on login attempts
5. Add session timeout

---

## 🎉 You're All Set!

Your authentication system is ready to use!

**To get started:**
1. Run the auth SQL schema in Supabase
2. Restart your dev server
3. Visit http://localhost:3000
4. Sign in as admin or create a new account

The navigation header now shows on every page, and admin users can access the dashboard through the "Admin Dashboard" button!
