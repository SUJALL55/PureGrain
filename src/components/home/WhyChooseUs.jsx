import React from 'react';
import { Wheat, Heart, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: Wheat,
    title: "Stone Ground Fresh",
    desc: "Traditional cold milling preserves all nutrients and natural flavour."
  },
  {
    icon: ShieldCheck,
    title: "Zero Preservatives",
    desc: "Absolutely no chemicals, additives, or artificial ingredients."
  },
  {
    icon: Heart,
    title: "Health First",
    desc: "Scientifically crafted millet ratios for maximum health benefits."
  },
  {
    icon: Truck,
    title: "Farm to Door",
    desc: "Freshly milled and delivered directly from our mill to your kitchen."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why PureGrain Mills</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
            The Pure Grain Promise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border text-center group hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}