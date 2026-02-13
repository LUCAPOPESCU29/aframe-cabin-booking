import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinId = searchParams.get('cabinId');

    if (!cabinId) {
      return NextResponse.json(
        { error: 'Cabin ID is required' },
        { status: 400 }
      );
    }

    // Fetch all confirmed and pending bookings for this cabin
    const { data: bookings, error } = await supabaseAdmin
      .from('bookings')
      .select('check_in, check_out')
      .eq('cabin_id', cabinId)
      .in('status', ['confirmed', 'pending'])
      .gte('check_out', new Date().toISOString().split('T')[0]); // Only future/current bookings

    if (error) {
      console.error('Error fetching booked dates:', error);
      return NextResponse.json(
        { error: 'Failed to fetch booked dates' },
        { status: 500 }
      );
    }

    // Generate array of all booked dates
    const bookedDates: string[] = [];

    bookings?.forEach((booking) => {
      const checkIn = new Date(booking.check_in);
      const checkOut = new Date(booking.check_out);

      // Include all dates from check-in to check-out (inclusive)
      const currentDate = new Date(checkIn);
      while (currentDate <= checkOut) {
        bookedDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return NextResponse.json({ bookedDates });
  } catch (error) {
    console.error('Error in booked dates API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
