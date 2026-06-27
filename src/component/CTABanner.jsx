import React from 'react';
import { motion } from 'framer-motion';
import ctaFamilyMeal from '../assets/images/cta-family-meal.png';

export default function CTABanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={ctaFamilyMeal}
          alt="Family sharing a meal together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-6xl text-background leading-tight mb-6"
        >
          Your Family Deserves
          <br />
          <em className="text-accent">Better Than Packaged Flour</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-lg text-background/80 mb-10 max-w-2xl mx-auto"
        >
          Join the growing number of families choosing freshness, purity, and time-honoured nutrition. Experience the PureGrain difference today.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          href="https://wa.me/918800953377"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-accent text-accent-foreground rounded-full font-sans font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Order on WhatsApp
        </motion.a>
      </div>
    </section>
  );
}