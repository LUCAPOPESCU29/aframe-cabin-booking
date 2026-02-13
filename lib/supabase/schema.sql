-- A-Frame Cabin Booking Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  booking_reference VARCHAR(20) UNIQUE NOT NULL,
  cabin_id VARCHAR(50) NOT NULL,
  cabin_name VARCHAR(100) NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  nights INTEGER NOT NULL,
  base_price NUMERIC(10, 2) NOT NULL,
  cleaning_fee NUMERIC(10, 2) NOT NULL,
  service_fee NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  language VARCHAR(5) DEFAULT 'en',
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cabin VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_bookings_cabin ON bookings(cabin_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_cabin ON reviews(cabin);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings (allow all operations for now - tighten in production)
DROP POLICY IF EXISTS "Enable read access for all users" ON bookings;
CREATE POLICY "Enable read access for all users" ON bookings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert access for all users" ON bookings;
CREATE POLICY "Enable insert access for all users" ON bookings
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update access for all users" ON bookings;
CREATE POLICY "Enable update access for all users" ON bookings
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete access for all users" ON bookings;
CREATE POLICY "Enable delete access for all users" ON bookings
  FOR DELETE USING (true);

-- Create policies for reviews (allow all operations for now - tighten in production)
DROP POLICY IF EXISTS "Enable read access for all users" ON reviews;
CREATE POLICY "Enable read access for all users" ON reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert access for all users" ON reviews;
CREATE POLICY "Enable insert access for all users" ON reviews
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update access for all users" ON reviews;
CREATE POLICY "Enable update access for all users" ON reviews
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete access for all users" ON reviews;
CREATE POLICY "Enable delete access for all users" ON reviews
  FOR DELETE USING (true);
