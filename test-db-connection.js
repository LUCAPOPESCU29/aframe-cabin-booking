// Test Supabase Database Connection
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'MISSING');
console.log('');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('📊 Testing bookings table...');

  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('*')
    .limit(5);

  if (bookingsError) {
    console.error('❌ Bookings table error:', bookingsError.message);
    console.error('   Details:', bookingsError.details);
    console.error('   Hint:', bookingsError.hint);
  } else {
    console.log('✅ Bookings table exists!');
    console.log('   Found', bookings.length, 'bookings');
  }

  console.log('\n⭐ Testing reviews table...');

  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .limit(5);

  if (reviewsError) {
    console.error('❌ Reviews table error:', reviewsError.message);
    console.error('   Details:', reviewsError.details);
    console.error('   Hint:', reviewsError.hint);
  } else {
    console.log('✅ Reviews table exists!');
    console.log('   Found', reviews.length, 'reviews');
  }

  console.log('\n' + '='.repeat(60));

  if (bookingsError || reviewsError) {
    console.log('\n❌ DATABASE TABLES NOT FOUND!\n');
    console.log('You need to run the SQL schema in Supabase:');
    console.log('1. Go to: https://supabase.com/dashboard/project/olsfqfgawnyokgitcpso');
    console.log('2. Click "SQL Editor" in the left sidebar');
    console.log('3. Click "New Query"');
    console.log('4. Copy ALL the content from: lib/supabase/schema.sql');
    console.log('5. Paste it and click "Run"');
    console.log('6. Verify you see: "Success. No rows returned"');
    console.log('7. Then run this test again: node test-db-connection.js\n');
  } else {
    console.log('\n✅ ALL TABLES FOUND! Database is ready!\n');
    console.log('Your app should now save bookings and reviews to Supabase.');
    console.log('Try making a booking at: http://localhost:3000\n');
  }
}

testConnection();
