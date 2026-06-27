import React from 'react';
import { motion } from 'framer-motion';
import { Wheat, Flame, Sparkles, Baby } from 'lucide-react';
import productMultigrainAttaHero from '../assets/images/product-multigrain-atta-hero.png';
import productSugarControlHero from '../assets/images/product-sugar-control-hero.png';
import productMurmuraKid from '../assets/images/product-murmura-kid.png';
import productMurmuraMixed from '../assets/images/product-murmura-mixed.png';

const attaProducts = [
  {
    name: 'Multigrain Atta',
    description: 'Rich in dietary fibre, 12g protein & 9-grain blend. No maida, no preservatives.',
    sizes: '1 KG, 5 KG & 10 KG',
    price: '₹72',
    mrp: '₹99',
    image: productMultigrainAttaHero,
    tag: 'Bestseller',
  },
  {
    name: 'Sugar Control Atta',
    description: 'Low GI blend with celium husk. Ideal for diabetics & blood sugar management.',
    sizes: '1 KG, 5 KG & 10 KG',
    price: '₹99',
    mrp: '₹149',
    image: productSugarControlHero,
    tag: 'Health Focus',
  },
];

const murmuraProducts = [
  {
    name: 'Millet Murmura (Kid-Friendly)',
    description: 'Nutritious & kid-friendly snack. Zero preservatives, healthy and tasty.',
    price: '₹99',
    mrp: '₹199',
    image: productMurmuraKid,
    tag: 'Snack Smart',
  },
  {
    name: 'Mixed Millet Murmura',
    description: 'High fibre millet snack. Scientifically balanced, zero preservatives.',
    price: '₹99',
    mrp: '₹199',
    image: productMurmuraMixed,
    tag: 'Snack Smart',
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-sans font-semibold text-sm tracking-widest uppercase mb-4"
          >
            Product Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-foreground leading-tight"
          >
            Nourishment, <em>Reimagined</em>
          </motion.h2>
        </div>

        {/* Atta Products */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Wheat className="w-6 h-6 text-accent" />
            <h3 className="font-serif text-2xl text-foreground">Atta Products</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {attaProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-muted rounded-tl-[50px] rounded-br-[50px] overflow-hidden"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <span className="absolute top-6 left-6 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-sans font-semibold">
                    {product.tag}
                  </span>
                </div>
                <div className="p-8">
                  <h4 className="font-serif text-2xl text-foreground mb-2">{product.name}</h4>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-muted-foreground line-through text-sm">{product.mrp}</span>
                    <span className="font-sans text-lg text-accent font-semibold">{product.price}</span>
                  </div>
                  <p className="font-sans text-sm text-accent font-semibold">Available in {product.sizes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Millet Murmura */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <Sparkles className="w-6 h-6 text-accent" />
            <h3 className="font-serif text-2xl text-foreground">Millet Murmura — 150g Packs</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {murmuraProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-muted rounded-tl-[50px] rounded-br-[50px] overflow-hidden"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <span className="absolute top-6 left-6 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-sans font-semibold">
                    {product.tag}
                  </span>
                </div>
                <div className="p-8">
                  <h4 className="font-serif text-2xl text-foreground mb-2">{product.name}</h4>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-muted-foreground line-through text-sm">{product.mrp}</span>
                    <span className="font-sans text-lg text-accent font-semibold">{product.price}</span>
                  </div>
                  <p className="font-sans text-sm text-accent font-semibold">150g Packs</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}