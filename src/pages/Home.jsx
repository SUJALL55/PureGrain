import React, { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import NutritionBanner from '@/components/home/NutritionBanner';
import ProductsSection from '@/components/home/ProductsSection';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HeroSection />
      <NutritionBanner />
      <ProductsSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </div>
  );
}