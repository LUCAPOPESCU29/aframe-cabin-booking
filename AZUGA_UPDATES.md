# Azuga Location Updates

## Changes Made

### 1. Hero Image Updated
**File:** `components/sections/hero.tsx`

- ✅ Changed main hero background image to feature an A-frame house
- **New Image:** `https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&q=80`
- This image showcases a classic A-frame cabin architecture
- Updated alt text to "A-frame cabin in Azuga"

### 2. Location Information Updated to Azuga, Romania

#### Translations File
**File:** `lib/translations.ts`

**English Version:**
- Location: Azuga, Prahova County, Carpathian Mountains, Romania
- Directions: From Bucharest via DN1 (E60) through Sinaia and Bușteni
- Distance: ~140 km from Bucharest
- Travel time: 2 hours from Bucharest
- Nearest Airport: OTP (Henri Coandă International Airport, Bucharest)
- Features: Stunning views of the Bucegi mountain range

**Romanian Version:**
- Locație: Azuga, Județul Prahova, Munții Carpați, România
- Indicații: Din București pe DN1 (E60) prin Sinaia și Bușteni
- Distanță: ~140 km de la București
- Timp de călătorie: 2 ore de la București
- Cel mai apropiat aeroport: OTP (Aeroportul Internațional Henri Coandă, București)
- Caracteristici: Priveliști uimitoare spre Munții Bucegi

#### Location Section Component
**File:** `components/sections/location.tsx`

Updated to use translated location information:
- Title: "Find Us" / "Găsește-ne"
- Address now shows: Azuga, Prahova County, Carpathian Mountains, Romania
- Getting here directions reference Bucharest, DN1, Sinaia, Bușteni
- Airport changed to OTP (Bucharest)
- All text now dynamically translates between English and Romanian

#### Footer Component
**File:** `components/footer.tsx`

Updated contact address:
```
Azuga, Prahova County
Carpathian Mountains
Romania
```

#### Cabin Detail Pages
**File:** `components/cabin/cabin-hero.tsx`

Updated location tag on individual cabin pages:
- Changed from "Mountain Valley, MV" to "Azuga, Romania"

## About Azuga

Azuga is a beautiful mountain resort town located in Prahova County, Romania, nestled in the Carpathian Mountains between Bușteni and Predeal. It's famous for:

- **Skiing & Winter Sports** - Part of the Prahova Valley ski region
- **Natural Beauty** - Surrounded by the Bucegi Mountains
- **Fresh Mountain Air** - Clean, crisp Carpathian air
- **Accessibility** - Easy 2-hour drive from Bucharest
- **Year-round Activities** - Hiking in summer, skiing in winter
- **Traditional Mountain Culture** - Authentic Romanian mountain experience

## Route from Bucharest

1. **Start:** Bucharest (București)
2. **Highway:** DN1 (E60) heading north
3. **Pass through:** Sinaia (famous for Pele Castle)
4. **Then:** Bușteni
5. **Arrive:** Azuga (~140 km, 2 hours)

## Nearby Attractions

- **Sinaia** - Peleș Castle, Sinaia Monastery
- **Bușteni** - Babele & Sphinx rock formations (via cable car)
- **Brașov** - Historic medieval city (30 km from Azuga)
- **Bran Castle** - "Dracula's Castle" (~45 km)
- **Poiana Brașov** - Premier ski resort

## Best Time to Visit

- **Winter (Dec-Mar):** Skiing, snow activities, cozy cabin atmosphere
- **Spring (Apr-May):** Blooming mountains, mild weather
- **Summer (Jun-Aug):** Hiking, mountain biking, cool escape from city heat
- **Autumn (Sep-Nov):** Fall foliage, mushroom picking, quieter season

## Testing the Updates

1. Visit **http://localhost:3000**
2. Check the hero image - it now shows an A-frame house
3. Scroll to the Location section - it shows Azuga, Romania
4. Click the language toggle (EN/RO) - location info translates perfectly
5. Visit individual cabin pages - location tag shows "Azuga, Romania"
6. Check the footer - updated address

All location information is now accurate for Azuga, Prahova County, Romania!
