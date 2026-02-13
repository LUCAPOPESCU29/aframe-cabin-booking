# The A-Frame | Luxury Cabin Booking Website

A premium, modern booking website for two luxury A-frame cabin houses built with Next.js 14, featuring smooth animations, 3D cabin exploration, and integrated payment processing.

## 🎨 Design Features

- **Earthy, Premium Aesthetic**: Warm browns, forest greens, and cream color palette
- **Smooth Animations**: Framer Motion for scroll-triggered animations and interactions
- **Buttery Scrolling**: Lenis smooth scroll for premium user experience
- **Typography**: Playfair Display (headings) + DM Sans (body) from Google Fonts
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **3D Cabin Viewer**: Interactive 3D model exploration (placeholder included for React Three Fiber)
- **Image Carousels**: Embla Carousel for smooth image galleries

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom color palette
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **3D Viewer**: React Three Fiber (placeholder ready for .glb models)
- **Backend/Database**: Supabase (auth, availability, reservations)
- **Payments**: Stripe Checkout integration
- **Email**: Resend (automated confirmation emails)
- **Icons**: Lucide React
- **Image Carousel**: Embla Carousel
- **Languages**: TypeScript, English/Romanian bilingual support

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aframe-cabin-booking
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials (see Configuration section below).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

#### Database Schema

Create the following tables in your Supabase project:

**cabins** table:
```sql
CREATE TABLE cabins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  price INTEGER NOT NULL,
  guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  sqft INTEGER NOT NULL,
  hero_image TEXT,
  images TEXT[],
  amenities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**bookings** table:
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cabin_id UUID REFERENCES cabins(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**availability** table:
```sql
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cabin_id UUID REFERENCES cabins(id),
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  UNIQUE(cabin_id, date)
);
```

### Stripe Setup

**Quick Start**: See `QUICK_START_STRIPE.md` for 5-minute setup guide!

1. Create an account at [stripe.com](https://stripe.com)
2. Get your API keys from Developers > API keys
3. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. For production webhooks, set up a webhook endpoint and add:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

📚 **Complete guide**: `STRIPE_SETUP_GUIDE.md`

### Email Confirmations Setup

**Automated confirmation emails** are sent after successful bookings in both English and Romanian!

1. Create free account at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_...
   ```

📧 **Complete guide**: `EMAIL_SETUP_GUIDE.md`

## 🎯 Project Structure

```
aframe-cabin-booking/
├── app/
│   ├── cabins/
│   │   └── [slug]/
│   │       └── page.tsx          # Individual cabin pages
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles + custom colors
├── components/
│   ├── animations/
│   │   ├── fade-in.tsx           # Fade-in animation wrapper
│   │   └── stagger-container.tsx # Stagger animation wrapper
│   ├── cabin/
│   │   ├── cabin-hero.tsx        # Cabin page hero with carousel
│   │   ├── cabin-details.tsx     # Cabin details & amenities
│   │   ├── cabin-booking-card.tsx# Sticky booking card
│   │   └── three-d-viewer.tsx    # 3D model viewer placeholder
│   ├── providers/
│   │   └── smooth-scroll-provider.tsx # Lenis smooth scroll
│   ├── sections/
│   │   ├── hero.tsx              # Homepage hero with parallax
│   │   ├── about.tsx             # About section
│   │   ├── cabins-section.tsx    # Cabin cards grid
│   │   ├── experience.tsx        # Activities/experience
│   │   ├── testimonials.tsx      # Guest testimonials carousel
│   │   ├── booking-cta.tsx       # Booking form CTA
│   │   └── location.tsx          # Location & directions
│   ├── ui/                       # shadcn/ui components
│   ├── navigation.tsx            # Site navigation
│   └── footer.tsx                # Site footer
├── lib/
│   └── data/
│       └── cabins.ts             # Cabin data model
└── public/                       # Static assets
```

## 🎨 Color Palette

```css
/* Primary Browns */
--brown-deep: #2C1E12      /* Headings, dark sections */
--brown-rich: #5C4033      /* Primary buttons, accents */
--brown-medium: #8B6F47    /* Medium accents */
--tan-light: #D4C4A8       /* Borders, dividers */

/* Accent Greens */
--green-deep: #4A6741      /* CTA buttons, highlights */
--green-sage: #6B8F5E      /* Hover states, secondary */
--green-dark: #3D5A3A      /* Dark accents */

/* Backgrounds */
--cream-warm: #FAF7F2      /* Main background */
--linen-soft: #F5F0E8      /* Alternate sections */
--espresso-deep: #2C1E12   /* Dark sections */

/* Text */
--text-body: #5A4A3A       /* Body text */
```

## 🚀 Features

### ✅ Fully Implemented
- ✅ Homepage with all sections (Hero, About, Cabins, Experience, Testimonials, Booking CTA, Location)
- ✅ Individual cabin detail pages
- ✅ Image carousels with navigation
- ✅ Smooth scroll animations throughout
- ✅ Responsive mobile menu
- ✅ Sticky navigation with scroll behavior
- ✅ 3D viewer placeholder (ready for React Three Fiber integration)
- ✅ Booking card with price calculation
- ✅ Trust badges and social proof elements
- ✅ **Stripe checkout integration** (complete payment flow)
- ✅ **Email confirmations** (bilingual, automated)
- ✅ **English/Romanian translation toggle**
- ✅ **Azuga, Romania location** (with directions from Bucharest)

### ⏳ To Be Implemented
- ⏳ Gallery section with filtering and lightbox modal
- ⏳ Supabase integration for dynamic cabin data
- ⏳ Date availability checking
- ⏳ Admin dashboard
- ⏳ Newsletter subscription functionality
- ⏳ Google Maps/Mapbox integration
- ⏳ Loading .glb 3D models in ThreeDViewer component

## 🎭 Adding a 3D Model

To add an interactive 3D cabin model:

1. Download a .glb model from [Sketchfab](https://sketchfab.com)
2. Place it in `/public/models/cabin.glb`
3. Update `components/cabin/three-d-viewer.tsx`:

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/cabin.glb');
  return <primitive object={scene} />;
}

export function ThreeDViewer() {
  return (
    <div className="aspect-video rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
```

## 📱 Responsive Design

- **Mobile**: < 640px (single column, hamburger menu)
- **Tablet**: 640px - 1024px (two columns, condensed nav)
- **Desktop**: > 1024px (full layout, sticky elements)

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Implement proper rate limiting on API routes
- Validate all user inputs
- Use Stripe's secure checkout flow
- Implement CSRF protection for forms

## 📝 License

This project is for demonstration purposes. Update with your actual license.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or support, contact: hello@theaframe.com

---

Built with ❤️ using Next.js 14 and modern web technologies.
