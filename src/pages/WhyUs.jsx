import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, Star, ShieldCheck, Truck, TrendingUp, Leaf, Zap, ArrowRight, Check } from 'lucide-react';
import hero1 from '../assets/images/hero-1.png';

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const advantages = [
  { icon: Star, title: 'Premium Raw Materials', desc: 'We source only the finest quality wheat & grains from trusted farmers, crafted for health-conscious households who demand the best.' },
  { icon: ShieldCheck, title: 'Freshness Guaranteed', desc: 'Every product is processed, packaged, and delivered with strict hygiene standards. Our freshness promise is non-negotiable.' },
  { icon: Users, title: 'Built on Community Trust', desc: 'A growing community of families who believe health should never compromise taste. Their trust is our greatest asset.' },
  { icon: Award, title: 'Scientifically Formulated', desc: 'Carefully derived grain ratios for optimal nutrition — high fibre, protein-rich, and immunity boosting combinations backed by research.' },
  { icon: Leaf, title: 'Zero Additives, Always', desc: 'No preservatives, no chemicals, no artificial flavouring. Everything in our products is exactly what you see on the label.' },
  { icon: Truck, title: 'Direct Distribution', desc: 'Company-owned distribution model ensures the freshest products reach you without middleman delays or compromise.' },
  { icon: TrendingUp, title: 'Scalable & Differentiated', desc: 'Creating a new category within the atta & snacks market with freshness, personalization, and quality assurance as our pillars.' },
  { icon: Zap, title: 'Innovation Driven', desc: 'From Sugar Control to Kids Special Murmura — we constantly innovate to meet the real health needs of real families.' },
];

const comparison = [
  { feature: 'Stone Ground Milling', us: true, others: false },
  { feature: 'Zero Preservatives', us: true, others: false },
  { feature: 'Multi-grain Blend (9+)', us: true, others: false },
  { feature: 'Sugar Control Variant', us: true, others: false },
  { feature: 'Fresh-milled on Order', us: true, others: false },
  { feature: 'FSSAI Certified', us: true, others: true },
  { feature: 'Direct-to-home Delivery', us: true, others: false },
  { feature: 'Nutritionist Formulated', us: true, others: false },
];

export default function WhyUs() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero1} alt="Grains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/82" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Why Choose Us</p>
            <h1 className="font-serif text-5xl md:text-7xl text-background leading-tight mb-6">
              The <em className="text-accent">PureGrain</em>
              <br />Advantage
            </h1>
            <p className="font-sans text-lg text-background/70 max-w-2xl mx-auto">
              We're not just selling flour. We're transforming how India nourishes its families — one wholesome meal at a time.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">What Sets Us Apart</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">8 Reasons to Choose <em>PureGrain</em></h2>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.08}>
                <div className="bg-muted rounded-tl-[40px] rounded-br-[40px] p-7 h-full hover:shadow-lg hover:bg-background transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <a.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-sans font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Comparison</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">PureGrain vs. <em>The Rest</em></h2>
            </FadeIn>
          </div>
          <FadeIn>
            <div className="bg-background rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-xl">
              <div className="grid grid-cols-3 bg-foreground text-background px-8 py-5">
                <span className="font-sans font-semibold text-sm text-background/60">Feature</span>
                <span className="font-sans font-semibold text-sm text-center text-accent">PureGrain Mills</span>
                <span className="font-sans font-semibold text-sm text-center text-background/60">Others</span>
              </div>
              {comparison.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 px-8 py-5 ${i !== comparison.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className="font-sans text-sm text-muted-foreground">{row.feature}</span>
                  <div className="flex justify-center">
                    {row.us ? (
                      <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-lg">—</span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.others ? (
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                        <Check className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-lg">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      
      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-accent-foreground mb-4">
              Join the PureGrain Family
            </h2>
            <p className="font-sans text-accent-foreground/70 mb-8">Experience the difference that genuine purity and care makes in every meal.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://wa.me/918800953377" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-accent-foreground text-background rounded-full font-semibold hover:opacity-90 transition-opacity">
                Order Now
              </a>
              <Link to="/products" className="px-10 py-4 border-2 border-accent-foreground/30 text-accent-foreground rounded-full font-semibold hover:border-accent-foreground transition-all">
                View Products
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}