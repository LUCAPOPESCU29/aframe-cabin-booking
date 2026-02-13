'use client';

import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Thermometer } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';
import { Card } from '@/components/ui/card';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

// Simulated weather data - in production, this would come from a real API
const getSimulatedWeather = (): WeatherData => {
  const month = new Date().getMonth();

  // Winter months (Dec-Feb)
  if (month === 11 || month === 0 || month === 1) {
    return {
      temperature: Math.floor(Math.random() * 10) - 5,
      condition: 'snowy',
      humidity: 75 + Math.floor(Math.random() * 15),
      windSpeed: 10 + Math.floor(Math.random() * 15),
      feelsLike: Math.floor(Math.random() * 10) - 8,
    };
  }

  // Summer months (Jun-Aug)
  if (month >= 5 && month <= 7) {
    return {
      temperature: 18 + Math.floor(Math.random() * 12),
      condition: 'sunny',
      humidity: 45 + Math.floor(Math.random() * 20),
      windSpeed: 5 + Math.floor(Math.random() * 10),
      feelsLike: 18 + Math.floor(Math.random() * 12),
    };
  }

  // Spring/Fall
  return {
    temperature: 8 + Math.floor(Math.random() * 15),
    condition: 'cloudy',
    humidity: 55 + Math.floor(Math.random() * 25),
    windSpeed: 8 + Math.floor(Math.random() * 12),
    feelsLike: 8 + Math.floor(Math.random() * 15),
  };
};

export function WeatherWidget() {
  const { language } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    setWeather(getSimulatedWeather());
  }, []);

  const content = {
    en: {
      title: 'Current Weather in Azuga',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      loading: 'Loading weather...',
    },
    ro: {
      title: 'Vremea Curentă în Azuga',
      feelsLike: 'Se simte ca',
      humidity: 'Umiditate',
      wind: 'Vânt',
      loading: 'Se încarcă vremea...',
    },
  };

  const t = content[language];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={48} className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud size={48} className="text-gray-400" />;
      case 'rainy':
        return <CloudRain size={48} className="text-blue-500" />;
      case 'snowy':
        return <CloudSnow size={48} className="text-blue-300" />;
      default:
        return <Cloud size={48} className="text-gray-400" />;
    }
  };

  const getConditionText = (condition: string) => {
    const conditions = {
      en: {
        sunny: 'Sunny',
        cloudy: 'Cloudy',
        rainy: 'Rainy',
        snowy: 'Snowy',
      },
      ro: {
        sunny: 'Însorit',
        cloudy: 'Înnorat',
        rainy: 'Ploios',
        snowy: 'Ninsoare',
      },
    };
    return conditions[language][condition as keyof typeof conditions.en];
  };

  if (!weather) {
    return (
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <p className="text-center text-[var(--text-body)]">{t.loading}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-[var(--linen-soft)] to-white shadow-lg">
      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[var(--brown-deep)] mb-4">
        {t.title}
      </h3>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {getWeatherIcon(weather.condition)}
          <div>
            <div className="text-4xl font-bold text-[var(--brown-deep)]">
              {weather.temperature}°C
            </div>
            <div className="text-sm text-[var(--text-body)]">
              {getConditionText(weather.condition)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col items-center p-3 bg-white rounded-lg">
          <Thermometer size={20} className="text-[var(--green-deep)] mb-1" />
          <span className="text-xs text-[var(--text-body)] mb-1">{t.feelsLike}</span>
          <span className="font-semibold text-[var(--brown-deep)]">{weather.feelsLike}°C</span>
        </div>

        <div className="flex flex-col items-center p-3 bg-white rounded-lg">
          <Droplets size={20} className="text-[var(--green-deep)] mb-1" />
          <span className="text-xs text-[var(--text-body)] mb-1">{t.humidity}</span>
          <span className="font-semibold text-[var(--brown-deep)]">{weather.humidity}%</span>
        </div>

        <div className="flex flex-col items-center p-3 bg-white rounded-lg">
          <Wind size={20} className="text-[var(--green-deep)] mb-1" />
          <span className="text-xs text-[var(--text-body)] mb-1">{t.wind}</span>
          <span className="font-semibold text-[var(--brown-deep)]">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </Card>
  );
}
