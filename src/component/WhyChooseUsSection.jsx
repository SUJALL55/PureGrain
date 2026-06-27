import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Star, ShieldCheck, Truck, TrendingUp } from 'lucide-react';

const advantages = [
  {
    icon: Star,
    title: 'Premium Raw Materials',
    description: 'We source only the finest quality wheat & grains, crafted for health-conscious households who demand the best.',
  },
  {
    icon: ShieldCheck,
    title: 'Freshness Guaranteed',
    description: 'Every product is processed, packaged, and delivered with strict hygiene standards and a freshness promise.',
  },
  {
    icon: Users,
    title: 'Built on Trust',
    description: 'A growing community of families who believe health should never compromise taste.',
  },
  {
    icon: Award,
    title: 'Scientifically Formulated',
    description: 'Carefully derived grain and millet ratios for optimal nutrition — high fibre, protein-rich, and immunity boosting.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable & Differentiated',
    description: 'Creating a new category within the atta & snacks market with freshness, personalization, and quality assurance.',
  },
  {
    icon: Truck,
    title: 'Direct to Your Door',
    description: 'Company-owned distribution model ensures the freshest products reach you without compromise.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-24 md:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Sticky header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-sans font-semibold text-sm tracking-widest uppercase mb-4"
            >
              Why PureGrain Stands Out
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6"
            >
              The <em>PureGrain</em> Advantage
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-lg text-muted-foreground leading-relaxed mb-8"
            >
              Positioned at the intersection of health, convenience, and retail innovation — we're not just selling flour, we're transforming how India nourishes its families.
            </motion.p>

            {/* Market stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-foreground text-background rounded-tl-[40px] rounded-br-[40px] p-8"
            >
              <p className="font-serif text-5xl text-accent mb-2">₹256 Bn</p>
              <p className="font-sans text-background/80 text-sm">
                India's projected packaged atta market by 2033 — growing at 13-16% CAGR. The market is evolving toward freshness, hygiene, and trust.
              </p>
            </motion.div>
          </div>

          {/* Right: Advantages grid */}
          <div className="space-y-6">
            {advantages.map((advantage, i) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl p-6 flex gap-5 hover:shadow-lg transition-shadow duration-500"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <advantage.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-1">{advantage.title}</h3>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}