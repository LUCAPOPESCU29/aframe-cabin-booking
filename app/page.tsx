import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { CabinsSection } from '@/components/sections/cabins-section';
import { Experience } from '@/components/sections/experience';
import { PhotoGallery } from '@/components/sections/photo-gallery';
import { Reviews } from '@/components/sections/reviews';
import { Location } from '@/components/sections/location';
import { FAQ } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/ui/back-to-top';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <CabinsSection />
        <PhotoGallery />
        <Experience />
        <Reviews />
        <Location />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
