'use client';

import { useState } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveMapProps {
  latitude?: number;
  longitude?: number;
  language?: 'en' | 'ro';
}

export function InteractiveMap({
  latitude = 45.44580,
  longitude = 25.57525,
  language = 'en'
}: InteractiveMapProps) {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  const content = {
    en: {
      title: 'Find Us',
      getDirections: 'Get Directions',
      viewLarger: 'View Larger Map',
      roadmap: 'Map',
      satellite: 'Satellite',
      coordinates: 'Coordinates',
      nearby: 'Nearby Attractions',
      sinaia: 'Sinaia',
      sinaiaDist: '12 km - Peleș Castle',
      busteni: 'Bușteni',
      busteniDist: '8 km - Cable Car to Babele',
      predeal: 'Predeal',
      predealDist: '15 km - Ski Resort',
      bucharest: 'Bucharest',
      bucharestDist: '140 km - OTP Airport'
    },
    ro: {
      title: 'Găsește-ne',
      getDirections: 'Obține Direcții',
      viewLarger: 'Vezi Hartă Completă',
      roadmap: 'Hartă',
      satellite: 'Satelit',
      coordinates: 'Coordonate',
      nearby: 'Atracții din Apropiere',
      sinaia: 'Sinaia',
      sinaiaDist: '12 km - Castelul Peleș',
      busteni: 'Bușteni',
      busteniDist: '8 km - Telecabină Babele',
      predeal: 'Predeal',
      predealDist: '15 km - Stațiune Schi',
      bucharest: 'București',
      bucharestDist: '140 km - Aeroport OTP'
    }
  };

  const t = content[language];

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-[var(--brown-deep)]">
          {t.title}
        </h3>
        <div className="flex gap-2">
          <Button
            variant={mapType === 'roadmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapType('roadmap')}
            className="rounded-full"
          >
            {t.roadmap}
          </Button>
          <Button
            variant={mapType === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapType('satellite')}
            className="rounded-full"
          >
            {t.satellite}
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border border-[var(--tan-light)]">
        <iframe
          src={`${googleMapsUrl}&maptype=${mapType}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="A-Frame Azuga Location"
          className="w-full h-full"
        />

        {/* Overlay buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-3">
          <Button
            asChild
            className="flex-1 bg-white/95 hover:bg-white text-[var(--brown-deep)] shadow-lg backdrop-blur-sm"
          >
            <a href={googleMapsDirections} target="_blank" rel="noopener noreferrer">
              <Navigation className="mr-2 h-4 w-4" />
              {t.getDirections}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm"
          >
            <a
              href={`https://www.google.com/maps/@${latitude},${longitude},15z`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Map Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Coordinates */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[var(--tan-light)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--green-deep)]/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-[var(--green-deep)]" />
            </div>
            <h4 className="font-semibold text-[var(--brown-deep)]">{t.coordinates}</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-body)]">{language === 'en' ? 'Latitude:' : 'Latitudine:'}</span>
              <span className="font-mono font-semibold text-[var(--brown-deep)]">{latitude}° N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-body)]">{language === 'en' ? 'Longitude:' : 'Longitudine:'}</span>
              <span className="font-mono font-semibold text-[var(--brown-deep)]">{longitude}° E</span>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[var(--tan-light)]">
          <h4 className="font-semibold text-[var(--brown-deep)] mb-4">{t.nearby}</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--green-deep)] mt-1.5" />
              <div>
                <span className="font-semibold text-[var(--brown-deep)]">{t.sinaia}</span>
                <p className="text-[var(--text-body)]">{t.sinaiaDist}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--green-deep)] mt-1.5" />
              <div>
                <span className="font-semibold text-[var(--brown-deep)]">{t.busteni}</span>
                <p className="text-[var(--text-body)]">{t.busteniDist}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--green-deep)] mt-1.5" />
              <div>
                <span className="font-semibold text-[var(--brown-deep)]">{t.predeal}</span>
                <p className="text-[var(--text-body)]">{t.predealDist}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--green-deep)] mt-1.5" />
              <div>
                <span className="font-semibold text-[var(--brown-deep)]">{t.bucharest}</span>
                <p className="text-[var(--text-body)]">{t.bucharestDist}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
