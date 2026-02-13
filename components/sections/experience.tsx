'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, StaggerItem, staggerItemVariants } from '@/components/animations/stagger-container';
import { ArrowUpRight, Mountain, Snowflake, TreePine, Bike, Camera, Utensils, Sun, Moon, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/language-provider';

const experiencesData = {
  en: {
    all: [
      {
        title: 'Mountain Hiking',
        icon: Mountain,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        description: 'Explore scenic trails through the Carpathian Mountains with breathtaking views',
        season: 'Spring, Summer, Fall',
        difficulty: 'Easy to Moderate'
      },
      {
        title: 'Skiing & Snowboarding',
        icon: Snowflake,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
        description: 'Access world-class ski slopes in nearby Poiana Brașov and Predeal',
        season: 'Winter',
        difficulty: 'All Levels'
      },
      {
        title: 'Forest Exploration',
        icon: TreePine,
        image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80',
        description: 'Discover ancient forests with diverse wildlife and pristine nature',
        season: 'Year-round',
        difficulty: 'Easy'
      },
      {
        title: 'Mountain Biking',
        icon: Bike,
        image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80',
        description: 'Ride through challenging mountain trails and scenic valley routes',
        season: 'Spring, Summer, Fall',
        difficulty: 'Moderate to Hard'
      },
      {
        title: 'Wildlife Photography',
        icon: Camera,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
        description: 'Capture bears, deer, and rare birds in their natural habitat',
        season: 'Year-round',
        difficulty: 'Easy'
      },
      {
        title: 'Traditional Romanian Cuisine',
        icon: Utensils,
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        description: 'Taste authentic sarmale, mici, and local Prahova wines',
        season: 'Year-round',
        difficulty: 'Easy'
      },
      {
        title: 'Sunrise Mountain Views',
        icon: Sun,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        description: 'Watch spectacular sunrise from mountain peaks above the clouds',
        season: 'Year-round',
        difficulty: 'Moderate'
      },
      {
        title: 'Stargazing Nights',
        icon: Moon,
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
        description: 'Experience crystal-clear night skies far from city lights',
        season: 'Year-round',
        difficulty: 'Easy'
      },
      {
        title: 'Paragliding',
        icon: Wind,
        image: 'https://images.unsplash.com/photo-1565894001808-92b5a7f3a0b6?w=800&q=80',
        description: 'Soar above the Carpathian valleys with experienced guides',
        season: 'Spring, Summer, Fall',
        difficulty: 'Advanced'
      }
    ]
  },
  ro: {
    all: [
      {
        title: 'Drumeții Montane',
        icon: Mountain,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        description: 'Explorează trasee pitorești prin Munții Carpați cu priveliști spectaculoase',
        season: 'Primăvară, Vară, Toamnă',
        difficulty: 'Ușor până la Mediu'
      },
      {
        title: 'Schi & Snowboard',
        icon: Snowflake,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
        description: 'Acces la pârtii de clasă mondială în Poiana Brașov și Predeal',
        season: 'Iarnă',
        difficulty: 'Toate Nivelurile'
      },
      {
        title: 'Explorare Pădure',
        icon: TreePine,
        image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80',
        description: 'Descoperă păduri seculare cu faună diversă și natură pristină',
        season: 'Tot Anul',
        difficulty: 'Ușor'
      },
      {
        title: 'Mountain Bike',
        icon: Bike,
        image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80',
        description: 'Pedalează pe trasee montane provocatoare și rute pitorești de vale',
        season: 'Primăvară, Vară, Toamnă',
        difficulty: 'Mediu până la Dificil'
      },
      {
        title: 'Fotografie Wildlife',
        icon: Camera,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
        description: 'Surprinde urși, cerbi și păsări rare în habitatul lor natural',
        season: 'Tot Anul',
        difficulty: 'Ușor'
      },
      {
        title: 'Bucătărie Românească Tradițională',
        icon: Utensils,
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        description: 'Gustă sarmale autentice, mici și vinuri locale din Prahova',
        season: 'Tot Anul',
        difficulty: 'Ușor'
      },
      {
        title: 'Răsărit pe Munte',
        icon: Sun,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        description: 'Admiră răsăritul spectaculos de pe vârfuri deasupra norilor',
        season: 'Tot Anul',
        difficulty: 'Mediu'
      },
      {
        title: 'Observare Stele',
        icon: Moon,
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
        description: 'Bucură-te de ceruri cristaline departe de luminile orașului',
        season: 'Tot Anul',
        difficulty: 'Ușor'
      },
      {
        title: 'Parapantă',
        icon: Wind,
        image: 'https://images.unsplash.com/photo-1565894001808-92b5a7f3a0b6?w=800&q=80',
        description: 'Planează deasupra văilor Carpaților cu ghizi experimentați',
        season: 'Primăvară, Vară, Toamnă',
        difficulty: 'Avansat'
      }
    ]
  }
};

export function Experience() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const experiences = experiencesData[language].all;
  const displayedExperiences = experiences.slice(0, 6);

  const content = {
    en: {
      title: 'Mountain Adventures',
      subtitle: 'Endless possibilities in the Carpathians',
      season: 'Season',
      difficulty: 'Difficulty',
      viewAll: 'View All Activities'
    },
    ro: {
      title: 'Aventuri Montane',
      subtitle: 'Posibilități nelimitate în Carpați',
      season: 'Sezon',
      difficulty: 'Dificultate',
      viewAll: 'Vezi Toate Activitățile'
    }
  };

  const t = content[language];

  return (
    <section id="experience" className="py-20 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--brown-deep)] font-semibold mb-4">
            {t.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[var(--text-body)]">
            {t.subtitle}
          </p>
        </FadeIn>

        {/* Experience Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedExperiences.map((experience) => {
            const Icon = experience.icon;
            return (
              <StaggerItem key={experience.title} variants={staggerItemVariants}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
                >
                  {/* Image */}
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-300" />

                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--green-deep)] transition-all duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold mb-2">
                      {experience.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-white/90 text-sm mb-3">
                      {experience.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        {experience.season}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        {experience.difficulty}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
