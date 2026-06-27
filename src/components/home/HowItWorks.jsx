import React from 'react';
import { motion } from 'framer-motion';
import { Wheat, Settings, Package, Truck } from 'lucide-react';

const steps = [
  { icon: Wheat, number: "01", title: "Premium Grain Selection", desc: "Hand-picked from trusted local farmers." },
  { icon: Settings, number: "02", title: "Stone Ground Milling", desc: "Cold milled using traditional stone grinders to retain all nutrients." },
  { icon: Package, number: "03", title: "Hygienically Packed", desc: "Sealed fresh with zero preservatives for maximum shelf life." },
  { icon: Truck, number: "04", title: "Delivered to You", desc: "Shipped straight from our mill to your doorstep." },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Process</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
            From Farm to Your Table
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base">
            Every step crafted with care — from selecting the finest grains to your kitchen.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}