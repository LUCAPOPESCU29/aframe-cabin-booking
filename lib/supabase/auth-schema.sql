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
-- Password hash for 'admin123' using bcrypt ($2b$ format)
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'admin@aframecabins.com',
  '$2b$10$gYOd5.dQ2N3YHo2CtH.Fiuz7tzyE6wMxwB8C5Xim/pVu9FjmMFlgO',
  'Admin User',
  'admin'
) ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Add user_id to bookings table (optional - link bookings to users)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id BIGINT REFERENCES users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
