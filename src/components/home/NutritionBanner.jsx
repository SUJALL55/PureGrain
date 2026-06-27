import React from 'react';
import { motion } from 'framer-motion';
import { Wheat, Zap, Heart, Droplets } from 'lucide-react';

const nutrients = [
  { icon: Wheat, label: "High Fibre", value: "Gut Health" },
  { icon: Zap, label: "Protein Rich", value: "Energy Boost" },
  { icon: Heart, label: "Low GI", value: "Heart Friendly" },
  { icon: Droplets, label: "No Additives", value: "Pure & Clean" },
];

export default function NutritionBanner() {
  return (
    <section className="bg-primary py-10 sm:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
          {nutrients.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-1">
                <n.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <p className="font-heading font-bold text-primary-foreground text-lg">{n.label}</p>
              <p className="text-xs text-primary-foreground/70 font-medium tracking-wide uppercase">{n.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}