import { Resend } from 'resend';

// Default sender email
export const FROM_EMAIL = 'The A-Frame <onboarding@resend.dev>'; // Change to your verified domain

// Helper function to send booking confirmation email
export async function sendBookingConfirmation(
  to: string,
  subject: string,
  html: string
) {
  // Only initialize Resend if API key is available
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set - email will not be sent');
    return { success: false, error: 'API key not configured' };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
