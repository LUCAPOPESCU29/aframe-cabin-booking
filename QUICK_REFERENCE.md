# Quick Reference Guide

## 🚀 Get Started in 3 Steps

### 1. Install & Run
```bash
npm install
npm run dev
```

### 2. Add Stripe Keys (Test Mode)
Get from: https://dashboard.stripe.com/test/apikeys

Add to `.env.local`:
```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Add Email (Optional)
Get from: https://resend.com

Add to `.env.local`:
```bash
RESEND_API_KEY=re_...
```

## 🎯 Test Checkout

1. Visit: http://localhost:3000/cabins/the-pine
2. Select dates
3. Click "Continue to Booking"
4. Enter guest details
5. Use test card: **4242 4242 4242 4242**
6. Check email for confirmation!

## 📁 Important Files

### Configuration
- `.env.local` - Environment variables
- `.env.example` - Template

### Email
- `lib/email-templates.ts` - Email content (edit contact info here)
- `lib/resend.ts` - Email sending

### API
- `app/api/checkout/route.ts` - Payment creation
- `app/api/webhook/route.ts` - Payment webhook + email sending

### Components
- `components/cabin/cabin-booking-card.tsx` - Booking form (edit pricing here)

## 💰 Change Pricing

Edit `components/cabin/cabin-booking-card.tsx`:
```typescript
const cleaningFee = 300; // Change this
const serviceFee = subtotal * 0.1; // Change percentage
```

Edit cabin prices in `lib/data/cabins.ts`

## ✉️ Customize Email

Edit `lib/email-templates.ts`:
- Contact info (email, phone)
- Check-in times
- What to bring
- Directions

## 🌐 Going Live

### 1. Get Live Keys
- Stripe: https://dashboard.stripe.com (toggle to Live mode)
- Resend: Verify your domain

### 2. Update `.env.local`
```bash
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 3. Set Up Webhook
- Go to: https://dashboard.stripe.com/webhooks
- Add endpoint: `https://yourdomain.com/api/webhook`
- Select events: `checkout.session.completed`
- Copy webhook secret to `.env.local`

### 4. Update Email Sender
Edit `lib/resend.ts`:
```typescript
export const FROM_EMAIL = 'The A-Frame <reservations@yourdomain.com>';
```

## 📚 Documentation

- `QUICK_START_STRIPE.md` - 5-min Stripe setup
- `STRIPE_SETUP_GUIDE.md` - Complete Stripe docs
- `EMAIL_SETUP_GUIDE.md` - Email setup
- `IMPLEMENTATION_SUMMARY.md` - Full project summary
- `README.md` - Project overview

## 🧪 Test Cards

| Purpose | Card Number | Expiry | CVC |
|---------|-------------|--------|-----|
| Success | 4242 4242 4242 4242 | 12/34 | 123 |
| Decline | 4000 0000 0000 0002 | 12/34 | 123 |
| 3D Secure | 4000 0025 0000 3155 | 12/34 | 123 |

## 🎨 Current Pricing (RON)

- **The Pine**: 250/night
- **The Cedar**: 350/night
- **Cleaning**: 300 (fixed)
- **Service**: 10% of base

## 🔍 Monitoring

### Stripe Dashboard
https://dashboard.stripe.com
- View payments
- Check webhooks
- See booking metadata

### Resend Dashboard
https://resend.com
- Email delivery status
- View sent emails
- Check for bounces

## 🌍 Languages

Toggle between English/Romanian:
- Click globe icon in navigation
- Saves preference to localStorage
- Affects entire site + emails

## 🆘 Quick Troubleshooting

**Payment fails:**
- Check Stripe keys in `.env.local`
- Restart dev server: `npm run dev`

**Email not sending:**
- Check `RESEND_API_KEY` in `.env.local`
- View Resend dashboard for errors
- Emails work even in test mode!

**Build fails:**
- Ensure `.env.local` exists
- Check all env vars are set
- Run: `npm run build`

## 📞 Dashboard Links

- **Stripe Test**: https://dashboard.stripe.com/test
- **Stripe Live**: https://dashboard.stripe.com
- **Resend**: https://resend.com
- **Supabase** (future): https://supabase.com

## 🎯 Current Features

✅ Full booking flow
✅ Stripe payments
✅ Email confirmations
✅ Bilingual (EN/RO)
✅ Responsive design
✅ Smooth animations
✅ Location: Azuga, Romania

## 🔮 Next Steps (Optional)

- Connect Supabase to save bookings
- Add admin dashboard
- Implement availability calendar
- Add Google Maps
- Load 3D cabin models

---

**Need detailed help?** Check the full guides in the project root!
