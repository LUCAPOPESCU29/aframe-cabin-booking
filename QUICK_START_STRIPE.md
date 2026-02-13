# Quick Start: Stripe Checkout

## 🚀 Get Started in 5 Minutes

### 1. Get Stripe Test Keys (2 min)

Visit: https://dashboard.stripe.com/test/apikeys

Copy both keys you see there.

### 2. Add to Environment File (1 min)

Create `.env.local` in your project root:

```bash
STRIPE_SECRET_KEY=sk_test_paste_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_paste_your_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Restart Server (1 min)

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 4. Test Booking (1 min)

1. Go to: http://localhost:3000/cabins/the-pine
2. Scroll to booking card on right
3. Select dates and click "Continue to Booking"
4. Enter:
   - Name: Test User
   - Email: test@example.com
5. Click "Proceed to Payment"
6. On Stripe page, use test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`
7. Complete payment
8. You'll be redirected to success page! ✅

## 🎯 That's It!

You now have a working Stripe checkout. Real payments will work the same way when you switch to live keys.

## 📧 Email Confirmations (Optional)

To send automatic confirmation emails after bookings:

1. **Get Resend API Key** (free): https://resend.com
2. **Add to `.env.local`**:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```
3. **Restart server** and test a booking with your email
4. **Check inbox** for confirmation email!

See `EMAIL_SETUP_GUIDE.md` for complete instructions.

## 📋 Test Cards Reference

**Success:** `4242 4242 4242 4242`
**Decline:** `4000 0000 0000 0002`
**3D Secure:** `4000 0025 0000 3155`

All test cards:
- Any future expiry date
- Any 3-digit CVC
- Any ZIP code

## 💡 Quick Tips

- Prices are in **Romanian Lei (RON)**
- Cleaning fee: **300 RON**
- Service fee: **10% of base price**
- Bookings work in **English and Romanian**

## 🔍 View Test Payments

https://dashboard.stripe.com/test/payments

See all your test payments here!

## 📚 Full Guide

See `STRIPE_SETUP_GUIDE.md` for complete documentation.

---

**Need help?** Check the troubleshooting section in the full guide.
