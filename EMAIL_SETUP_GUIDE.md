# Email Confirmation Setup Guide

## 🎯 Overview

Your A-Frame booking website now sends beautiful, bilingual confirmation emails automatically after successful payments!

## ✅ What's Been Implemented

- **Automated Email Sending**: Emails sent automatically via Stripe webhook when payment completes
- **Bilingual Templates**: Professional HTML emails in both English and Romanian
- **Booking Details**: Complete reservation information (dates, pricing, check-in instructions)
- **Resend Integration**: Fast, reliable email delivery service
- **Beautiful Design**: Branded emails matching your A-Frame aesthetic

## 📧 Email Features

### Included in Every Email:
- ✅ Guest name and personalized greeting
- ✅ Cabin name and booking dates
- ✅ Number of guests and nights
- ✅ Complete price breakdown (base + cleaning + service fees)
- ✅ Check-in/check-out times
- ✅ Location and driving directions from Bucharest
- ✅ What to bring checklist
- ✅ Contact information for support
- ✅ Professional branding with A-Frame colors

### Language Support:
- Automatically sends email in the language the guest selected
- Romanian or English based on their preference during booking

## 🚀 Setup Instructions

### Step 1: Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" (it's free to start)
3. Verify your email address
4. Log into your dashboard

### Step 2: Get API Key

1. In Resend dashboard, click "API Keys" in the left sidebar
2. Click "Create API Key"
3. Give it a name (e.g., "A-Frame Production")
4. Copy the API key (starts with `re_`)

### Step 3: Add to Environment Variables

Add to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_api_key_here
```

### Step 4: Configure Sender Email (Important!)

By default, emails are sent from `onboarding@resend.dev` (Resend's test address).

**For production, you MUST verify your own domain:**

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `aframe-azuga.ro`)
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually 5-10 minutes)

Then update `lib/resend.ts`:

```typescript
export const FROM_EMAIL = 'The A-Frame <reservations@aframe-azuga.ro>';
```

## 🧪 Testing Email Delivery

### Test in Development:

1. Make sure `RESEND_API_KEY` is set in `.env.local`
2. Start your dev server: `npm run dev`
3. Complete a test booking with a real email address
4. Check your inbox for the confirmation email

### Using Stripe Test Mode:

1. Use test card: `4242 4242 4242 4242`
2. Enter your real email address as the guest email
3. Complete the payment
4. **Email will be sent to your real email** (even in test mode!)

### Resend Test Email Feature:

In Resend dashboard > "Emails" tab, you can see all sent emails and their delivery status.

## 📋 Email Template Customization

The email template is in `lib/email-templates.ts`. You can customize:

### Update Contact Information:

Find the contact info section and change:

```typescript
email: 'Email: info@aframe-azuga.ro',
phone: 'Phone: +40 123 456 789',
```

### Change Check-in Instructions:

```typescript
checkInTime: 'Check-in time: 3:00 PM',
checkOutTime: 'Check-out time: 11:00 AM',
```

### Modify What to Bring List:

```typescript
bringList: '• Valid ID for check-in<br>• Comfortable hiking shoes<br>...',
```

### Update Directions:

```typescript
directions: 'From Bucharest: Take DN1 through Sinaia and Bușteni...',
```

## 🎨 Email Design

The emails use your brand colors:
- **Green Deep** (#2D4B3C) for headers and accents
- **Cream Warm** (#FAF7F0) for backgrounds
- **Linen Soft** (#F5F1E8) for cards
- Professional typography matching your website

## 🔍 How It Works

### The Email Flow:

1. **Guest completes booking** → Stripe checkout session created
2. **Payment succeeds** → Stripe sends webhook to your server
3. **Webhook received** → `/app/api/webhook/route.ts` processes event
4. **Email generated** → Template populated with booking data
5. **Email sent** → Resend delivers to guest's inbox
6. **Guest receives confirmation** → Professional branded email in their language

### Code Files Involved:

**`lib/email-templates.ts`**
- HTML email template generator
- Bilingual content (EN/RO)
- Booking data formatting

**`lib/resend.ts`**
- Resend client initialization
- Email sending helper function

**`app/api/webhook/route.ts`**
- Stripe webhook handler
- Extracts booking data from session
- Calls email sending function

**`app/api/checkout/route.ts`**
- Includes language in Stripe metadata
- Passes booking data for email

**`components/cabin/cabin-booking-card.tsx`**
- Sends guest's language preference
- Collects email address

## 📊 Monitoring Emails

### Resend Dashboard:

1. Log into [https://resend.com](https://resend.com)
2. Click "Emails" in sidebar
3. See all sent emails with:
   - Delivery status
   - Open rates (if tracking enabled)
   - Bounce/error information

### Email Logs:

Check your server logs for:
```
Confirmation email sent successfully to: guest@example.com
```

Or errors:
```
Failed to send confirmation email: [error details]
```

## 🚨 Troubleshooting

### Email Not Sending

**Check 1: API Key**
- Verify `RESEND_API_KEY` is in `.env.local`
- Make sure you restarted dev server after adding it

**Check 2: Webhook**
- In production, ensure webhook secret is configured
- Check Stripe dashboard > Webhooks for delivery status

**Check 3: Resend Logs**
- Check Resend dashboard for error messages
- Look for bounced emails or blocked addresses

### Email Goes to Spam

**Solution 1: Verify Domain**
- Add SPF, DKIM, DMARC records
- Use verified domain instead of `onboarding@resend.dev`

**Solution 2: Warm Up Domain**
- Start with low volume
- Gradually increase email frequency

### Wrong Language in Email

**Check**: Guest's language preference
- Ensure `language` is passed from booking form
- Default is English if not specified

## 🌟 Free Tier Limits

Resend free tier includes:
- **3,000 emails/month**
- **100 emails/day**
- **1 verified domain**

For A-Frame booking volume, this should be plenty! If you exceed:
- **Paid plan**: $20/month for 50,000 emails

## 🎯 Production Checklist

Before going live:

- [ ] Verify your domain in Resend
- [ ] Update `FROM_EMAIL` in `lib/resend.ts`
- [ ] Add `RESEND_API_KEY` to production environment
- [ ] Set up Stripe webhooks (see `STRIPE_SETUP_GUIDE.md`)
- [ ] Test with real email address
- [ ] Verify emails don't go to spam
- [ ] Update contact info in email template
- [ ] Test both English and Romanian versions

## 📧 Email Preview

Here's what guests receive:

### Header:
- A-Frame logo/title
- "Azuga, Carpathian Mountains" tagline
- Green gradient background

### Content:
- Personalized greeting
- Booking confirmation message
- Detailed booking card with:
  - Cabin name
  - Check-in/out dates (formatted nicely)
  - Number of guests and nights
- Price breakdown table:
  - Base price
  - Cleaning fee
  - Service fee
  - Total (highlighted)
- Check-in information:
  - Times
  - Location
  - Directions from Bucharest
- What to bring checklist
- Contact information card
- Warm closing message

### Footer:
- Copyright notice
- Professional branding

## 💡 Tips

1. **Test thoroughly** before going live - send test bookings to yourself
2. **Monitor Resend dashboard** for the first week to catch any issues
3. **Keep templates updated** if you change pricing or policies
4. **Verify domain** as soon as possible to avoid spam folders
5. **Save test emails** as examples for your records

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Email Best Practices](https://resend.com/docs/knowledge-base/best-practices)

## ✅ You're All Set!

Your booking confirmation emails are ready to go! Once you add your Resend API key, guests will automatically receive beautiful, professional confirmation emails after every successful booking.

Happy hosting! 🏔️✨
