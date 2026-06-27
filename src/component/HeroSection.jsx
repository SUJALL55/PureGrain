import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import OrderModal from './OrderModal';

import hero1 from '../assets/images/hero-1.png';
import hero2 from '../assets/images/hero-2.png';
import hero3 from '../assets/images/hero-3.png';
import hero4 from '../assets/images/hero-4.png';

const slides = [
  {
    id: 1,
    image: hero1,
    tag: 'Mill से दिल तक',
    headline: 'Your Family Deserves',
    highlight: 'Better',
    sub: 'Time-honoured grains, mindfully milled. Multigrain atta and millet snacks crafted for healthier everyday living — without compromising taste.',
    cta: 'Explore Products',
    ctaHref: '/products',
    overlay: 'from-background/95 via-background/75 to-background/20',
  },
  {
    id: 2,
    image: hero2,
    tag: 'Mill से दिल तक',
    headline: 'Healthy Eating,',
    highlight: 'Effortlessly Delicious',
    sub: 'Guided by age-old grain wisdom and modern nutrition science, every meal becomes a quiet act of love for your family.',
    cta: 'Our Story',
    ctaHref: '/story',
    overlay: 'from-background/95 via-background/70 to-background/10',
  },
  {
    id: 3,
    image: hero3,
    tag: 'Mill से दिल तक',
    headline: '9 Ancient Grains,',
    highlight: 'One Perfect Flour',
    sub: 'Stone ground, cold milled. No preservatives, no additives. Just pure, wholesome nutrition in every roti you make.',
    cta: 'See Products',
    ctaHref: '/products',
    overlay: 'from-background/95 via-background/75 to-background/20',
  },
  {
    id: 4,
    image: hero4,
    tag: 'Mill से दिल तक',
    headline: 'Tradition Meets',
    highlight: 'Modern Nutrition',
    sub: 'Reviving the ancient stone chakki tradition with scientific precision — for flour that nourishes every generation.',
    cta: 'About Us',
    ctaHref: '/about',
    overlay: 'from-background/95 via-background/70 to-background/10',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(() =>
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [orderOpen, setOrderOpen] = useState(false);

  const next = useCallback(() => setCurrent(prev => (prev + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(prev => (prev - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const slide = slides[current];

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-start overflow-hidden">
        {/* Background */}
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
              loading={slide.id === slides[0].id ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={slide.id === slides[0].id ? 'high' : 'low'}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 px-5 sm:px-6 lg:px-10 pt-28 pb-40 sm:py-32 w-full max-w-[100vw]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-content'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              {/* Tagline badge */}
              <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <p className="font-serif italic text-accent text-base tracking-wide">{slide.tag}</p>
              </div>

              <h1 className="font-serif text-4xl min-[375px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] sm:leading-none mb-4">
                {slide.headline}
                <br />
                <em className="text-accent">{slide.highlight}</em>
              </h1>

              <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mt-5 sm:mt-6 mb-8 sm:mb-10">
                {slide.sub}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  to={slide.ctaHref}
                  className="inline-flex min-h-[48px] items-center justify-center px-8 py-3.5 sm:py-4 bg-accent text-accent-foreground rounded-full font-sans font-semibold text-base hover:opacity-90 transition-opacity"
                >
                  {slide.cta}
                </Link>
                <button
                  type="button"
                  onClick={() => setOrderOpen(true)}
                  className="inline-flex min-h-[48px] items-center justify-center px-8 py-3.5 sm:py-4 border-2 border-foreground/25 text-foreground rounded-full font-sans font-semibold text-base hover:border-accent hover:text-accent transition-colors"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div
          role="toolbar"
          aria-label="Featured slides"
          className="absolute bottom-[max(1.75rem,env(safe-area-inset-bottom))] left-0 right-0 z-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4"
        >
          <button type="button" onClick={() => { prev(); setIsAutoPlaying(false); }} className="min-h-[44px] min-w-[44px] rounded-full bg-background/30 backdrop-blur-sm border border-background/30 flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all" aria-label="Previous slide">
            <ChevronLeft className="w-5 h-5 shrink-0" aria-hidden />
          </button>
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setCurrent(i); setIsAutoPlaying(false); }}
                aria-label={`Go to slide ${i + 1} of ${slides.length}`}
                aria-current={i === current || undefined}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 touch-manipulation"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${i === current ? 'h-2.5 w-8 bg-accent' : 'h-2.5 w-2.5 bg-foreground/25 hover:bg-foreground/50'}`}
                />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => { next(); setIsAutoPlaying(false); }} className="min-h-[44px] min-w-[44px] rounded-full bg-background/30 backdrop-blur-sm border border-background/30 flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all" aria-label="Next slide">
            <ChevronRight className="w-5 h-5 shrink-0" aria-hidden />
          </button>
        </div>

        {/* Progress bar */}
        {isAutoPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10 z-20">
            <motion.div key={current} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 5, ease: 'linear' }} className="h-full bg-accent" />
          </div>
        )}

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 right-10 text-muted-foreground hidden md:flex flex-col items-center gap-2 z-20"
        >
          <span className="font-sans text-xs tracking-widest uppercase rotate-90 mb-2">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}