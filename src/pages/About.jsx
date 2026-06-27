import React, { useEffect } from 'react';
import { Wheat, Heart, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import grainWheelImg from '../assets/images/grain-wheel.png';

const stats = [
  { icon: Wheat, label: "Grains Used", value: "12+" },
  { icon: Users, label: "Happy Families", value: "5000+" },
  { icon: Award, label: "Years of Trust", value: "10+" },
  { icon: Heart, label: "Products", value: "3" }
];

export default function About() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Story</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-5">
            PureGrain Mills
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Mill से दिल तक — we bring you the freshest, most nutritious grain products. No preservatives. No shortcuts. Just pure goodness.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Mission</span>
            <h2 className="font-heading text-3xl font-bold text-foreground mt-2 mb-5">
              Bringing Traditional Milling Back
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In a world of mass-produced flour with chemicals and preservatives, PureGrain Mills goes back to basics. Our stone-ground cold milling process preserves all the natural nutrients, flavour, and aroma of the grains.
              </p>
              <p>
                We carefully select premium grains from local farmers — from MP Sharbati wheat to millets like Ragi, Jowar, and Bajra — and blend them using scientifically derived ratios for maximum health benefits.
              </p>
              <p>
                Every product is made with one promise: <span className="text-foreground font-medium">no preservatives, no additives, just pure grain goodness.</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl rotate-2" />
            <img
              src={grainWheelImg}
              alt="Power of 9 grains"
              className="relative rounded-3xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}