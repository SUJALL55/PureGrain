import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Shield, Heart, Users, Award, ArrowRight } from 'lucide-react';
import hero4 from '../assets/images/hero-4.png';
import hero2 from '../assets/images/hero-2.png';

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const values = [
  { icon: Leaf, title: 'Purity First', desc: 'Every ingredient is chosen with care. No fillers, no additives — just the goodness of whole grains in their most natural form.' },
  { icon: Shield, title: 'Transparency', desc: 'From farm to flour, we believe in full visibility. You should know exactly what goes into your family\'s food.' },
  { icon: Heart, title: 'Made with Love', desc: 'Founded by Vinita and Mistu, every product carries the warmth of a family kitchen and the rigor of nutritional science.' },
  { icon: Users, title: 'Community First', desc: 'We\'re building more than a brand — a community of health-conscious families who believe nourishment is an act of love.' },
  { icon: Award, title: 'Quality Assured', desc: 'FSSAI certified, hygienically processed, and freshness-guaranteed. We hold ourselves to the highest standards.' },
];

const team = [
  { name: 'Vinita', role: 'Co-Founder & Head of Operations', desc: 'A passionate advocate for traditional nutrition and whole food cooking, Vinita ensures every product meets the highest quality standards.' },
  { name: 'Mistu', role: 'Co-Founder & Product Development', desc: 'Bringing together premium grain wisdom and modern nutritional science to formulate products that taste as good as they nourish.' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero4} alt="Stone chakki" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">About PureGrain Mills</p>
            <h1 className="font-serif text-5xl md:text-7xl text-background leading-tight mb-6">
              Rooted in <em className="text-accent">Tradition</em>,
              <br />Driven by Purpose
            </h1>
            <p className="font-sans text-lg text-background/70 leading-relaxed max-w-2xl mx-auto">
              We started PureGrain Mills with one simple goal — to make healthy eating effortless and delicious for every Indian family.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-xl">
                <img src={hero2} alt="Family cooking" className="w-full h-[480px] object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Our Mission</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Making Healthy Eating <em>Effortless</em>
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                Launched in April 2025, PureGrain Mills was born from a simple belief — that nourishing your family shouldn't require compromise. We saw shelves full of over-processed, chemical-laden flours and knew there had to be a better way.
              </p>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                Guided by age-old grain wisdom and backed by modern nutrition science, we crafted a range of multigrain products that deliver on both taste and health. Every pack is a promise — pure, fresh, and made with intention.
              </p>
              <Link to="/story" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity">
                Read Our Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">What We Stand For</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Core <em>Values</em></h2>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="bg-background rounded-tl-[40px] rounded-br-[40px] p-8 h-full hover:shadow-lg transition-shadow duration-500">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <v.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-sans font-semibold text-foreground text-lg mb-3">{v.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">The Founders</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Meet the <em>Team</em></h2>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.15}>
                <div className="bg-muted rounded-tl-[50px] rounded-br-[50px] p-10 text-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <span className="font-serif text-4xl text-accent">{member.name[0]}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-1">{member.name}</h3>
                  <p className="font-sans text-sm text-accent font-semibold mb-4">{member.role}</p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{member.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-background mb-6">
              Experience the <em className="text-accent">PureGrain</em> Difference
            </h2>
            <p className="font-sans text-background/60 mb-8">Try our products and taste the commitment behind every grain.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}