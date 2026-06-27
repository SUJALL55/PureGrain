import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import wheatFields from '../assets/images/wheat-fields.png';
import hero2 from '../assets/images/hero-2.png';
import hero3 from '../assets/images/hero-3.png';
import hero1 from '../assets/images/hero-1.png';

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const timeline = [
  { year: '2025', title: 'The Realisation', desc: 'Vinita and Mistu, both health-conscious mothers, struggled to find atta that was genuinely pure, nutritious, and tasted great. Every option was either over-processed or overly expensive.' },
  { year: 'Feb 25', title: 'The Research', desc: 'Months of studying premium grain traditions, consulting nutritionists, and testing grain ratios. They discovered that the right millet blend — thoughtfully milled — could change how a family eats forever.' },
  { year: 'Mar 25', title: 'The First Batch', desc: 'Working with local stone grinders and trusted grain suppliers, the first batch of PureGrain Multigrain Atta was born. Tested on their own families first. The rotis were soft, nutritious, and most importantly — delicious.' },
  { year: 'Sep 25', title: 'PureGrain Mills is Born', desc: 'PureGrain Mills officially launched, with a mission to bring time-honoured grains and mindful milling into every home for healthier everyday living without compromising taste.' },
  { year: 'Today', title: 'Growing Together', desc: 'Now offering two atta variants and two flavours of Millet Murmura, PureGrain Mills is growing alongside the families it serves — one wholesome meal at a time.' },
];

export default function Story() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={wheatFields} alt="Golden wheat fields" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Our Story</p>
            <h1 className="font-serif text-5xl md:text-7xl text-background leading-tight mb-6">
              Crafted with <em className="text-accent">Care</em>,
              <br />Guided by Tradition
            </h1>
            <p className="font-sans text-lg text-background/70 max-w-2xl mx-auto">
              The story of two women who refused to settle for anything less than the best for their families.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Opening narrative */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <FadeIn>
              <div className="rounded-tl-[70px] rounded-br-[70px] overflow-hidden shadow-xl">
                <img src={hero2} alt="Family making rotis" className="w-full h-[400px] object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-6">
                It Started With a <em>Simple Question</em>
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                "Why is it so hard to find atta that's actually healthy AND makes soft rotis?" Vinita asked this one evening after her third attempt at a "healthy" flour that left her family's rotis hard and tasteless.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed">
                That question sparked a journey — from premium Ayurvedic grain texts to modern nutrition research, from local stone grinders to food technologists — all in pursuit of the perfect wholesome flour.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">The Journey</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                From <em>Idea</em> to Impact
              </h2>
            </FadeIn>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-px" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.12}>
                  <div className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background transform -translate-x-1.5 md:-translate-x-2 mt-1" />
                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div className="bg-background rounded-tl-[30px] rounded-br-[30px] p-7 shadow-sm">
                        <span className="text-accent font-sans font-bold text-sm">{item.year}</span>
                        <h3 className="font-serif text-xl text-foreground mt-2 mb-3">{item.title}</h3>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Atta & Murmura Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-10">
            <FadeIn delay={0.1}>
              <div className="bg-muted rounded-tl-[60px] rounded-br-[60px] overflow-hidden">
                <img src={hero3} alt="Grains" className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-foreground mb-4">The Multigrain Atta</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                    Crafted with a 9 healthy blend of grains — wheat, ragi, jowar, bajra, oats, barley, soy, corn, and chickpea. Rich in dietary fibre for better digestion and high in protein (12g per 100g). With no maida, preservatives, or additives, the result is soft, wholesome rotis that are genuinely nourishing.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="bg-muted rounded-tl-[60px] rounded-br-[60px] overflow-hidden">
                <img src={hero1} alt="Millet" className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-foreground mb-4">The Millet Rebellion</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                    Our Millet Murmura isn't just a snack — it's a tasty rebellion against boring munchies. High in fibre from premium millets and scientifically balanced for nutrition, it contains zero preservatives or artificial colours. Healthy, tasty, and perfect for the whole family.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-background mb-6">
              Become Part of Our <em className="text-accent">Story</em>
            </h2>
            <p className="font-sans text-background/60 mb-8">Your family's health is the next chapter. Try PureGrain today.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}