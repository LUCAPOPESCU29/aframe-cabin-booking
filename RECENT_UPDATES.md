# Recent Updates

## Changes Made

### 1. ✅ Fixed "Check Availability" Button

**File**: `components/sections/booking-cta.tsx`

**Changes:**
- Added `useRouter` to navigate to cabin page when button is clicked
- Button now redirects to selected cabin's detail page
- Button is disabled when no cabin is selected
- Added visual feedback (disabled state with opacity)

**How it works now:**
1. User selects a cabin from dropdown
2. Clicks "Check Availability" button
3. Redirected to cabin detail page where they can complete booking

### 2. 💰 Changed All Currency to RON (Romanian Lei)

**Files Updated:**

#### `components/sections/booking-cta.tsx`
- Changed cabin selector from `From $250/night` → `De la 250 RON/noapte`
- Added bilingual support for all text
- Button text: "Check Availability" / "Verifică Disponibilitatea"
- Form labels translated to Romanian
- Trust badges translated

#### `components/sections/cabins-section.tsx`
- Changed price display from `From $250` → `De la 250 RON`
- Updated all cabin specs to bilingual:
  - Guests / Oaspeți
  - Bedrooms / Dormitoare
  - Bathrooms / Băi
  - sqft / mp (square feet → square meters)
- Button text translated:
  - "View Details" / "Vezi Detalii"
  - "Book Now" / "Rezervă Acum"
- Section titles translated:
  - "Our Cabins" / "Cabanele Noastre"
  - "Choose your escape" / "Alege-ți evadarea"

### 3. 🌍 Enhanced Bilingual Support

**New Translations Added:**
- Booking CTA section fully bilingual
- Cabins section fully bilingual
- All currency references show RON
- All measurements localized (sqft → mp for Romanian)

## Testing

✅ Build successful - no errors
✅ All currency references updated to RON
✅ Check Availability button functional
✅ Bilingual support working throughout

## Current Currency Display

| Location | English | Romanian |
|----------|---------|----------|
| Cabin Cards | From 250 RON / night | De la 250 RON / noapte |
| Booking CTA | From 250 RON/night | De la 250 RON/noapte |
| Booking Form | 250 RON | 250 RON |
| Checkout | 250 RON | 250 RON |
| Email Confirmation | 250 RON | 250 RON |

## User Flow Now

1. **Homepage** → User browses cabins (sees RON pricing)
2. **Booking CTA** → User selects cabin, clicks "Check Availability"
3. **Cabin Detail Page** → Redirected automatically
4. **Complete Booking** → Select dates, enter details
5. **Stripe Checkout** → Pay in RON
6. **Email Confirmation** → Receive confirmation with RON pricing

All currency is consistently RON throughout the entire flow!
