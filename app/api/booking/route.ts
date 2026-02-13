import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmation } from '@/lib/resend';
import { getBookingConfirmationEmail } from '@/lib/email-templates';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cabinId,
      cabinName,
      checkIn,
      checkOut,
      guests,
      nights,
      basePrice,
      cleaningFee,
      serviceFee,
      total,
      guestEmail,
      guestName,
      guestPhone,
      language = 'en'
    } = body;

    // Generate booking reference
    const bookingReference = `AF${Date.now().toString(36).toUpperCase()}`;

    // Send confirmation email with payment instructions
    try {
      const emailData = {
        guestName,
        cabinName,
        checkIn,
        checkOut,
        guests: parseInt(guests),
        nights: parseInt(nights),
        basePrice: parseFloat(basePrice),
        cleaningFee: parseFloat(cleaningFee),
        serviceFee: parseFloat(serviceFee),
        total: parseFloat(total),
        language: language as 'en' | 'ro',
        bookingReference,
        isPendingPayment: true,
      };

      const { subject, html } = getBookingConfirmationEmail(emailData);

      const emailResult = await sendBookingConfirmation(
        guestEmail,
        subject,
        html
      );

      if (emailResult.success) {
        console.log('Booking confirmation email sent successfully to:', guestEmail);
      } else {
        console.error('Failed to send confirmation email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the booking if email fails
    }

    // Save booking to database
    const booking = await db.createBooking({
      bookingReference,
      cabinId,
      cabinName,
      guestName,
      guestEmail,
      guestPhone: guestPhone || '',
      checkIn,
      checkOut,
      guests: parseInt(guests),
      nights: parseInt(nights),
      basePrice: parseFloat(basePrice),
      cleaningFee: parseFloat(cleaningFee),
      serviceFee: parseFloat(serviceFee),
      total: parseFloat(total),
      status: 'pending',
      paymentStatus: 'pending',
      language: language as 'en' | 'ro',
      specialRequests: body.specialRequests || ''
    });

    console.log('Booking created:', booking);

    return NextResponse.json({
      success: true,
      bookingReference
    });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}
