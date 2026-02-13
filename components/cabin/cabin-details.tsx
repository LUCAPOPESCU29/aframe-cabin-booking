'use client';

import { Wifi, Flame, UtensilsCrossed, Droplets, TreePine, Mountain, Car, Dog, Salad, Table } from 'lucide-react';
import { Cabin } from '@/lib/data/cabins';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThreeDViewer } from './three-d-viewer';

interface CabinDetailsProps {
  cabin: Cabin;
}

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Fireplace: Flame,
  'Full Kitchen': UtensilsCrossed,
  'Hot Tub': Droplets,
  'Forest Views': TreePine,
  'Mountain Views': Mountain,
  'Hiking Access': Mountain,
  'Free Parking': Car,
  'Pet Friendly': Dog,
  'BBQ Grill': Salad,
  'Outdoor Dining': Table,
};

export function CabinDetails({ cabin }: CabinDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Overview */}
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[var(--brown-deep)] font-semibold mb-4">
          Overview
        </h2>
        <div className="prose prose-lg max-w-none text-[var(--text-body)] space-y-4">
          {cabin.longDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[var(--brown-deep)] font-semibold mb-6">
          Amenities
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cabin.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity] || Wifi;
            return (
              <div
                key={amenity}
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-[var(--tan-light)]"
              >
                <Icon
                  size={24}
                  className="text-[var(--green-deep)] flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="font-[family-name:var(--font-body)] text-[var(--text-body)] text-sm">
                  {amenity}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* House Rules */}
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[var(--brown-deep)] font-semibold mb-6">
          House Rules
        </h2>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--tan-light)]">
          <ul className="space-y-3 text-[var(--text-body)]">
            <li className="flex items-start gap-3">
              <span className="text-[var(--green-deep)] font-bold">•</span>
              <span>Check-in: 3:00 PM - 8:00 PM</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--green-deep)] font-bold">•</span>
              <span>Check-out: 11:00 AM</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--green-deep)] font-bold">•</span>
              <span>Maximum {cabin.guests} guests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--green-deep)] font-bold">•</span>
              <span>Pets allowed with prior approval</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--green-deep)] font-bold">•</span>
              <span>No smoking inside the cabin</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--green-deep)] font-bold">•</span>
              <span>Quiet hours: 10:00 PM - 8:00 AM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3D Explorer */}
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[var(--brown-deep)] font-semibold mb-6">
          Explore in 3D
        </h2>
        <ThreeDViewer />
      </div>

      {/* Photo Gallery */}
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[var(--brown-deep)] font-semibold mb-6">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cabin.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={image}
                alt={`${cabin.name} - Photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
