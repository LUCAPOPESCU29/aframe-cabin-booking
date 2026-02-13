export interface Cabin {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  amenities: string[];
  heroImage: string;
}

export const cabins: Cabin[] = [
  {
    id: '1',
    name: 'The Pine',
    slug: 'the-pine',
    description: 'Cozy two-bedroom retreat with floor-to-ceiling windows and forest views',
    longDescription: `Perched among towering pine trees, The Pine offers a cozy two-bedroom retreat with floor-to-ceiling windows, a wood-burning fireplace, and a private deck overlooking the forest canopy. Wake up to birdsong and fall asleep under the stars.

This thoughtfully designed cabin combines rustic charm with modern comfort. The open-plan living area features vaulted ceilings and abundant natural light, while the fully-equipped kitchen makes meal preparation a joy. Step outside to your private deck and soak in the hot tub while surrounded by nature.

Perfect for couples or small families seeking a peaceful escape from the everyday. Every detail has been carefully considered to ensure your stay is both comfortable and memorable.`,
    price: 250,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    heroImage: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
    ],
    amenities: [
      'WiFi',
      'Fireplace',
      'Full Kitchen',
      'Hot Tub',
      'Forest Views',
      'Hiking Access',
      'Free Parking',
      'Pet Friendly',
    ],
  },
  {
    id: '2',
    name: 'The Cedar',
    slug: 'the-cedar',
    description: 'Spacious three-bedroom cabin with mountain views and premium amenities',
    longDescription: `Our larger A-frame, The Cedar, is wrapped in warm cedar wood and features an open-plan living space, a chef's kitchen, and a wraparound deck with mountain views. Perfect for families or small groups looking for a premium nature escape.

With three bedrooms and two bathrooms, The Cedar comfortably accommodates up to six guests. The expansive deck offers multiple seating areas, including an outdoor dining space and a luxurious hot tub with panoramic mountain views. Fire up the BBQ grill for an al fresco dinner under the stars.

Inside, you'll find high-end finishes throughout, from the gourmet kitchen with professional appliances to the cozy living room with its statement fireplace. Large windows frame the stunning landscape, bringing the beauty of nature indoors while maintaining your comfort and privacy.`,
    price: 350,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1100,
    heroImage: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=1600&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1600&q=80',
    ],
    amenities: [
      'WiFi',
      'Fireplace',
      'Full Kitchen',
      'Hot Tub',
      'Mountain Views',
      'Hiking Access',
      'Free Parking',
      'Pet Friendly',
      'BBQ Grill',
      'Outdoor Dining',
    ],
  },
];

export function getCabinBySlug(slug: string): Cabin | undefined {
  return cabins.find((cabin) => cabin.slug === slug);
}
