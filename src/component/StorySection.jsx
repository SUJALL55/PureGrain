import React from 'react';
import { motion } from 'framer-motion';
import storyBg from '../assets/images/story-bg.png';
import productMultigrainAttaHero from '../assets/images/product-multigrain-atta-hero.png';
import storyMurmura from '../assets/images/story-murmura.png';

export default function StorySection() {
  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={storyBg}
          alt="Minimalist room with natural light"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-sans font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Our Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-background leading-tight mb-8"
          >
            Crafted With <em className="text-accent">Care</em>,
            <br />Guided by Tradition
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Multigrain Atta story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background/10 backdrop-blur-md rounded-tl-[60px] rounded-br-[60px] p-8 md:p-10 border border-background/10"
          >
            <img
              src={productMultigrainAttaHero}
              alt="Freshly made soft rotis"
              className="w-full h-64 object-cover rounded-tl-[40px] rounded-br-[40px] mb-8"
            />
            <h3 className="font-serif text-2xl text-background mb-4">The Multigrain Atta</h3>
            <p className="font-sans text-background/80 leading-relaxed">
              PureGrain Mills was born from a simple belief — health should never compromise taste. Guided by 9 healthy grains and time-honoured milling wisdom, we crafted what we couldn't find. Rich in dietary fibre and protein, for soft rotis and everyday nourishment.
            </p>
          </motion.div>

          {/* Millet Murmura story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-background/10 backdrop-blur-md rounded-tl-[60px] rounded-br-[60px] p-8 md:p-10 border border-background/10"
          >
            <img
              src={storyMurmura}
              alt="Puffed millet murmura in ceramic bowl"
              className="w-full h-64 object-cover rounded-tl-[40px] rounded-br-[40px] mb-8"
            />
            <h3 className="font-serif text-2xl text-background mb-4">The Millet Rebellion</h3>
            <p className="font-sans text-background/80 leading-relaxed">
              Our Millet Murmura isn't just a snack — it's a tasty rebellion against boring chips. Drawing from premium millet wisdom, we craft it with high fibre millets, zero preservatives, and a burst of wholesome flavor. Perfect for families who want to snack smart.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}