# Wise Payment Setup - Complete Guide

## ✅ What's Been Implemented

Your A-Frame booking website now uses **manual bank transfer via Wise** instead of Stripe for payments.

### How It Works:

1. **Guest Books Cabin** → Selects dates and enters details
2. **Payment Instructions Shown** → Guest sees Wise transfer details on screen
3. **Guest Transfers Payment** → Uses Wise app to send money to your account
4. **Email Confirmation** → Guest receives email with payment instructions
5. **You Confirm Booking** → After receiving payment (within 24 hours)

## 📧 What Guests Receive

### On-Screen After Booking:
- ✅ Booking reference number (e.g., `AF1234ABC`)
- 💰 Total amount to pay
- 📱 Your Wise account email: **info@aframe-azuga.ro**
- ⚠️ Instruction to include booking reference in transfer
- 📝 Next steps (transfer → wait for confirmation → receive email)

### Email Confirmation:
- Complete booking details (cabin, dates, guests, pricing)
- **Payment Instructions Section** (highlighted in orange)
  - Wise account details
  - Exact amount to transfer
  - Your Wise email
  - Booking reference to include
  - Step-by-step payment guide
- Check-in information
- What to bring
- Contact details

## 🏦 Your Wise Setup

### Current Configuration:
- **Account Name**: The A-Frame Azuga
- **Email**: info@aframe-azuga.ro
- **Currency**: Romanian Lei (RON)

### To Change These Details:

**1. Update Booking Card** (`components/cabin/cabin-booking-card.tsx`):
```typescript
// Line ~136-142
<span className="font-semibold">The A-Frame Azuga</span>
<span className="font-semibold">info@aframe-azuga.ro</span>
```

**2. Update Email Template** (`lib/email-templates.ts`):
```typescript
// Lines showing account details
<td style="color: #3D3228; font-weight: 600;">The A-Frame Azuga</td>
<td style="color: #3D3228; font-weight: 600;">info@aframe-azuga.ro</td>
```

## 💳 How to Receive Payments

### Step 1: Set Up Your Wise Account
1. Go to https://wise.com
2. Create a business account (or personal if preferred)
3. Verify your email
4. Add your Romanian bank details

### Step 2: Share Your Wise Email
- Your current email in the system: **info@aframe-azuga.ro**
- Guests will send money to this email using Wise

### Step 3: Receive Transfers
When guests transfer money:
- They open Wise app/website
- Send RON to: info@aframe-azuga.ro
- Include booking reference in description
- You receive notification from Wise

### Step 4: Confirm Bookings
After receiving payment:
1. Check transfer description for booking reference
2. Verify amount matches booking total
3. Send confirmation email to guest
4. Update booking status to "confirmed"

## 📊 Managing Bookings

### Booking References
Format: `AF` + timestamp (e.g., `AF1L2M3N4`)
- Unique for each booking
- Guest must include in transfer
- Use to match payments to bookings

### Recommended Workflow:
1. Guest books → gets reference number
2. Guest transfers via Wise with reference
3. You receive Wise notification
4. Match reference to booking in your records
5. Confirm booking with guest

## 🔄 Optional: Database Integration

Currently bookings are only logged to console. To save them:

**Enable Supabase** in `app/api/booking/route.ts`:
```typescript
// Uncomment lines 61-74
const { data, error } = await supabase
  .from('bookings')
  .insert({
    booking_reference: bookingReference,
    cabin_id: cabinId,
    guest_name: guestName,
    guest_email: guestEmail,
    check_in: checkIn,
    check_out: checkOut,
    guests: parseInt(guests),
    total_price: parseFloat(total),
    status: 'pending_payment',
  });
```

Then you can:
- Track all bookings in database
- Update status when payment received
- Build admin dashboard to manage bookings

## 📝 Files Changed

### New Files:
- `app/api/booking/route.ts` - Creates bookings with payment instructions
- `WISE_PAYMENT_SETUP.md` - This guide

### Modified Files:
- `components/cabin/cabin-booking-card.tsx` - Shows payment instructions instead of Stripe checkout
- `lib/email-templates.ts` - Added payment instructions to email

### Removed Dependencies:
- No longer need Stripe API keys (but can keep for future)
- `app/api/checkout/route.ts` still exists but not used
- `app/api/webhook/route.ts` still exists but not used

## 🌐 Email Template Features

The email includes a **highlighted payment instructions section** when payment is pending:

**Visual Features:**
- 🏦 Orange highlighted box (can't miss it!)
- Account name and Wise email clearly displayed
- Total amount in large orange text
- Warning box with booking reference reminder
- Numbered steps for how to pay
- Fully bilingual (English/Romanian)

**Example Email Content:**
```
🏦 Payment Instructions

To confirm your booking, please transfer the payment using Wise:

Account Name: The A-Frame Azuga
Wise Email: info@aframe-azuga.ro
Amount to Transfer: 850.00 RON

⚠️ Important: Please include your booking reference "AF1234ABC" in the transfer description.

How to Pay:
1. Open your Wise app or visit wise.com
2. Send 850.00 RON to: info@aframe-azuga.ro
3. Include reference: AF1234ABC
4. We will confirm within 24 hours after receiving payment
```

## 🧪 Testing

### Test the Booking Flow:
1. Visit http://localhost:3000/cabins/the-pine
2. Select dates and guests
3. Click "Continue to Booking"
4. Enter guest details
5. Click "Proceed to Payment"
6. **See payment instructions on screen**
7. Check email inbox for confirmation with payment details

### What You Should See:
- ✅ Booking reference number displayed
- ✅ Your Wise email shown
- ✅ Total amount clearly visible
- ✅ Next steps explained
- ✅ Email received with payment instructions

## 💡 Advantages of Wise Payments

**Benefits:**
- ✅ Lower fees than Stripe (typically 0.5-1%)
- ✅ Direct to your bank account
- ✅ No monthly costs or setup fees
- ✅ Multi-currency support
- ✅ Fast transfers (usually same day)
- ✅ Transparent pricing

**Considerations:**
- ⏳ Not instant confirmation (requires manual verification)
- 👤 Requires guest to have Wise or do bank transfer
- 📧 More manual work (matching payments to bookings)

## 🔮 Future Enhancements

**Could Add Later:**
1. **Automated Matching**
   - Parse Wise transaction emails
   - Auto-match booking references
   - Auto-send confirmation

2. **Payment Status Tracking**
   - Admin dashboard to see pending payments
   - Mark bookings as paid
   - Send reminders for unpaid bookings

3. **Multiple Payment Options**
   - Keep Wise as primary
   - Add Stripe as alternative (for instant confirmation)
   - Let guests choose preferred method

## 📞 Support

For questions about Wise:
- **Wise Help**: https://wise.com/help
- **Business Account**: https://wise.com/business

For your booking system:
- Check booking logs in server console
- Email template in `lib/email-templates.ts`
- Booking API in `app/api/booking/route.ts`

---

**Your website is now live with Wise payments!** 🎉

Guests can book, see payment instructions, and transfer via Wise. You'll receive payments directly to your account.
