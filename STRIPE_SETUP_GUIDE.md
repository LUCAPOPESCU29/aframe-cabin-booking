# Stripe Checkout Integration Guide

## Overview

Your A-Frame cabin booking website now has a complete Stripe checkout integration! Guests can securely pay for their cabin reservations using credit/debit cards.

## 🎯 Features Implemented

✅ **Stripe Checkout Integration**
- Secure hosted checkout page
- Credit/debit card payments
- Automatic currency handling (Romanian Lei - RON)
- Mobile-responsive payment flow

✅ **Booking Flow**
1. Guest selects check-in and check-out dates
2. Chooses number of guests
3. Reviews price breakdown (base + cleaning fee + service fee)
4. Enters name and email
5. Redirected to Stripe secure checkout
6. Payment processed
7. Returns to success page with confirmation

✅ **Multi-language Support**
- All booking forms work in English and Romanian
- Error messages translated
- Success page bilingual

✅ **Price Calculation**
- Automatic night calculation based on dates
- Base price per night (RON)
- Cleaning fee: 300 RON
- Service fee: 10% of base price
- Real-time total calculation

## 📁 Files Created

### API Routes
1. **`app/api/checkout/route.ts`** - Creates Stripe checkout sessions
2. **`app/api/webhook/route.ts`** - Handles Stripe webhooks for payment confirmations

### Pages
3. **`app/booking/success/page.tsx`** - Success page after payment

### Components
4. **Updated: `components/cabin/cabin-booking-card.tsx`** - Full booking form with Stripe integration

## 🔧 Setup Instructions

### Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Sign up"
3. Create your account
4. Complete the registration

### Step 2: Get Your API Keys

1. Log into your Stripe Dashboard
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (click "Reveal test key", starts with `sk_test_...`)

### Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root:

```bash
cp .env.example .env.local
```

2. Add your Stripe keys:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51Abc...your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Abc...your_publishable_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. For production, add:
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Step 4: Test the Integration

1. **Start your dev server:**
```bash
npm run dev
```

2. **Visit a cabin page:**
```
http://localhost:3000/cabins/the-pine
```

3. **Fill out the booking form:**
   - Select check-in and check-out dates
   - Choose number of guests
   - Click "Continue to Booking"

4. **Enter guest details:**
   - Full name
   - Email address
   - Click "Proceed to Payment"

5. **Test with Stripe test cards:**

Use these test card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined Payment:**
- Card: `4000 0000 0000 0002`

**Requires Authentication (3D Secure):**
- Card: `4000 0025 0000 3155`

6. **After successful payment:**
   - You'll be redirected to the success page
   - See confirmation message in English or Romanian

### Step 5: Set Up Webhooks (Production)

Webhooks allow Stripe to notify your server about successful payments.

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Enter your URL: `https://yourdomain.com/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add it to your `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Step 6: Test Webhooks Locally (Optional)

Use Stripe CLI to test webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhook
```

## 💰 Pricing Configuration

Currently set up for **Romanian Lei (RON)**:

- **Cabin prices:** Defined in `lib/data/cabins.ts`
  - The Pine: 250 RON/night
  - The Cedar: 350 RON/night

- **Cleaning fee:** 300 RON (fixed)
- **Service fee:** 10% of base price

To change pricing, edit `components/cabin/cabin-booking-card.tsx`:

```typescript
const cleaningFee = 300; // Change this value
const serviceFee = subtotal * 0.1; // Change percentage
```

To change currency:

Edit `app/api/checkout/route.ts`:

```typescript
currency: 'ron', // Change to 'usd', 'eur', etc.
```

## 🔐 Security Features

✅ **Secure Checkout**
- Hosted by Stripe (PCI compliant)
- SSL encrypted
- No card details touch your server

✅ **Input Validation**
- Date validation (check-out after check-in)
- Guest limits per cabin
- Email format validation

✅ **Error Handling**
- Clear error messages in both languages
- Failed payment handling
- Network error handling

## 📊 Viewing Payments

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Click "Payments" in the left sidebar
3. See all test payments
4. Click any payment to view details:
   - Customer email
   - Amount paid
   - Booking metadata (cabin, dates, guests)

## 🚀 Going Live (Production)

### 1. Switch to Live Mode

1. In Stripe Dashboard, toggle from "Test mode" to "Live mode" (top right)
2. Get your live API keys
3. Update `.env.local` with live keys
4. Enable your Stripe account (complete business verification)

### 2. Update Environment Variables

```env
STRIPE_SECRET_KEY=sk_live_...your_live_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_...your_live_webhook_secret
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 3. Deploy

```bash
# Build for production
npm run build

# Deploy to your hosting (Vercel, Netlify, etc.)
```

### 4. Set Up Live Webhooks

Follow Step 5 above but with your production URL.

## 🔗 Integration with Supabase (Next Step)

The webhook handler includes commented code for saving bookings to Supabase. To activate:

1. Set up Supabase (see main README.md)
2. Uncomment lines in `app/api/webhook/route.ts`
3. Import Supabase client
4. Save booking data to database

## 📧 Email Confirmations

**✅ FULLY IMPLEMENTED!** Automatic confirmation emails are sent after successful payments.

### Features:
- Professional HTML emails in English and Romanian
- Complete booking details and price breakdown
- Check-in instructions and location info
- Automatic delivery via Resend

### Setup:
See `EMAIL_SETUP_GUIDE.md` for complete instructions.

**Quick setup:**
1. Get free API key from [Resend](https://resend.com)
2. Add `RESEND_API_KEY` to `.env.local`
3. Restart server - emails will be sent automatically!

## 🧪 Testing Checklist

- [ ] Booking form loads correctly
- [ ] Date picker works (min dates enforced)
- [ ] Guest counter increments/decrements
- [ ] Price calculates correctly
- [ ] Language toggle works on booking page
- [ ] Error messages display (try invalid dates)
- [ ] Stripe checkout opens
- [ ] Test payment succeeds
- [ ] Redirects to success page
- [ ] Success page shows in correct language

## 💡 Tips

1. **Always test with test keys first** - Never use live keys in development
2. **Check Stripe logs** - Dashboard > Developers > Logs shows all API requests
3. **Monitor webhooks** - Dashboard > Developers > Webhooks shows delivery status
4. **Test error scenarios** - Use declined test cards to ensure error handling works
5. **Mobile testing** - Stripe checkout is fully mobile responsive

## 🆘 Troubleshooting

**Problem: "Stripe is not defined" error**
- Solution: Check that STRIPE_SECRET_KEY is set in `.env.local`
- Restart your dev server after adding env variables

**Problem: Redirect doesn't work after payment**
- Solution: Verify NEXT_PUBLIC_BASE_URL is correct
- Check success_url in checkout session creation

**Problem: Webhook not receiving events**
- Solution: Use Stripe CLI to forward webhooks locally
- In production, verify webhook URL is publicly accessible

**Problem: Wrong currency displaying**
- Solution: Check currency in `app/api/checkout/route.ts`
- Restart server after changing

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## ✅ You're All Set!

Your A-Frame cabin booking website now has a professional, secure payment system powered by Stripe. Guests can book cabins with confidence, and you'll receive payments directly to your Stripe account.

Happy booking! 🏔️✨
