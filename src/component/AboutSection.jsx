import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shield, Heart } from 'lucide-react';
import aboutGrains from '../assets/images/about-grains.png';

const features = [
  {
    icon: Leaf,
    title: 'Stone Ground & Cold Milled',
    description: 'Traditional chakki process that preserves nutrients and natural flavor in every grain.',
  },
  {
    icon: Shield,
    title: 'No Preservatives',
    description: 'Zero additives, zero chemicals. Just pure, wholesome grains — exactly as nature intended.',
  },
  {
    icon: Heart,
    title: 'Scientifically Balanced',
    description: 'Carefully derived millet ratios for optimal nutrition, high fibre, and protein-rich daily nourishment.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-tl-[80px] rounded-br-[80px] overflow-hidden">
              <img
                src={aboutGrains}
                alt="Ancient grains and millets arranged on stone surface"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-8 py-6 rounded-tl-[40px] rounded-br-[40px] shadow-xl">
              <p className="font-serif text-3xl italic">Since 2025</p>
              <p className="font-sans text-sm mt-1 opacity-80">Founded by Vinita & Mistu</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent font-sans font-semibold text-sm tracking-widest uppercase mb-4">
              About PureGrain Mills
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Bringing Time-Honoured Grains Into Every <em>Home</em>
            </h2>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-10">
              Launched in April 2025, PureGrain Mills was born from a simple belief — health should never compromise taste. We make healthy eating feel effortless and delicious with our multigrain atta and millet murmura, guided by age-old wisdom and modern nutrition science.
            </p>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="font-sans text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}