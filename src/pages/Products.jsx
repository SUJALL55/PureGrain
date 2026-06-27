import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wheat, Sparkles, Check, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/component/ui/use-toast';
import productMultigrainAtta from '../assets/images/product-multigrain-atta.png';
import productSugarControlAtta from '../assets/images/product-sugar-control-atta.png';
import productMurmuraKid from '../assets/images/product-murmura-kid.png';
import productMurmuraMixed from '../assets/images/product-murmura-mixed.png';
import hero3 from '../assets/images/hero-3.png';

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const attaProducts = [
  {
    name: 'PureGrain Multigrain Atta',
    tag: 'Bestseller',
    price: 'Starting ₹72',
    mrp: 'Starting ₹99',
    sizes: ['1 KG', '5 KG', '10 KG'],
    prices: { '1 KG': 72, '5 KG': 360, '10 KG': 720 },
    mrpPrices: { '1 KG': 99, '5 KG': 499, '10 KG': 999 },
    grains: 9,
    image: productMultigrainAtta,
    highlights: [
      'Rich in dietary fibre for better digestion',
      'High protein content — 12g per 100g',
      'Crafted with 9 healthy blend of grains',
      'No maida, no preservatives, no additives',
    ],
    grainList: 'Premium MP Sharbati Wheat 70%, Millets 30% (combination of Barley, Bengal Gram, Finger millet, Sorghum, Soyabean, Pearl millet, maize, Flaxseed)',
    desc: 'Our flagship product, crafted with 9 premium grains for the perfect balance of nutrition and taste. Makes soft, wholesome rotis your whole family will love.',
  },
  {
    name: 'Sugar Control Atta',
    tag: 'Health Focus',
    price: 'Starting ₹99',
    mrp: 'Starting ₹149',
    sizes: ['1 KG', '5 KG', '10 KG'],
    prices: { '1 KG': 99, '5 KG': 495, '10 KG': 990 },
    mrpPrices: { '1 KG': 149, '5 KG': 749, '10 KG': 1499 },
    grains: 12,
    image: productSugarControlAtta,
    highlights: [
      'Low Glycaemic Index — manages blood sugar',
      'High fibre slows glucose absorption',
      'psyllium husk for sugar control',
      'Ideal for diabetics & pre-diabetics',
      'Nutritionist recommended formulation',
    ],
    grainList: 'Premium MP Sharbati Wheat 70%, Millets 30% (combination of Barley, Bengal Gram, Finger millet, Sorghum, Soyabean, Pearl millet, maize, Flaxseed)',
    desc: 'A scientifically formulated 12-grain blend with low GI ingredients specifically chosen to support healthy blood sugar management without sacrificing flavour.',
  },
];

const murmuraFlavours = [
  {
    name: 'Millet Murmura (Kid-Friendly)',
    tag: 'Snack Smart',
    price: '₹99',
    mrp: '₹199',
    sizes: ['150g'],
    prices: { '150g': 99 },
    mrpPrices: { '150g': 199 },
    grains: 3,
    image: productMurmuraKid,
    highlights: [
      'Zero preservatives — pure and natural',
      'Scientifically balanced nutrition',
      'No artificial colours or additives',
      'Healthy and tasty',
      'Nutritious and kid friendly snack',
    ],
    grainList: 'Peanuts,Ragi Puffs,Jowar Puffs,Bajra Puffs,Cornflakes,Cow ghee.Spices and Condiments(Curry Leaves,Turmeric.Asafoetida,etc.trace amounts of Sunflower Oil',
    desc: 'Premium millet wisdom in a crunchy, preservative-free snack. Specially crafted to be kid-friendly, it is the perfect guilt-free snack for your little ones.',
  },
  {
    name: 'Mixed Millet Murmura',
    tag: 'Snack Smart',
    price: '₹99',
    mrp: '₹199',
    sizes: ['150g'],
    prices: { '150g': 99 },
    mrpPrices: { '150g': 199 },
    grains: 3,
    image: productMurmuraMixed,
    highlights: [
      'Zero preservatives — pure and natural',
      'High fibre content from premium millets',
      'Scientifically balanced nutrition',
      'No artificial colours or additives',
      'Healthy and tasty',
    ],
    grainList: 'Peanuts,Ragi Puffs,Jowar Puffs,Bajra Puffs,Cornflakes,Cow ghee,Spices &Condiments(Curry Leaves,Turmeric,Asafoetida,etc.),trace amounts of Sunflower Oil,green chillies',
    desc: 'Premium millet wisdom in a crunchy, preservative-free snack. Made from 100% pure millets, our murmura is the perfect guilt-free snack for the whole family.',
  },
];

export default function Products() {
  const [activeAtta, setActiveAtta] = useState(0);
  const [activeMurmura, setActiveMurmura] = useState(0);
  const [selectedSize, setSelectedSize] = useState('5 KG');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product, size = null) => {
    // Get the price based on selected size
    let price = product.price;
    if (size && product.prices && product.prices[size]) {
      price = product.prices[size];
    }
    
    addToCart({...product, price}, 1, size);
    toast({
      title: "Added to Cart",
      description: `${product.name} ${size ? `(${size})` : ''} added to cart!`,
    });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero3} alt="Grains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Our Products</p>
            <h1 className="font-serif text-5xl md:text-7xl text-background leading-tight mb-6">
              Nourishment, <em className="text-accent">Reimagined</em>
            </h1>
            <p className="font-sans text-lg text-background/70 max-w-2xl mx-auto">
              Every product is a promise — pure ingredients, mindful milling, and flavour that brings your family back to the table.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Atta Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-12">
            <Wheat className="w-7 h-7 text-accent" />
            <h2 className="font-serif text-3xl text-foreground">Atta Products</h2>
          </div>

          {/* Toggle — horizontal scroll on narrow screens */}
          <div className="-mx-2 mb-12 max-w-full overflow-x-auto overscroll-x-contain px-2 pb-1 scrollbar-none sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            <div className="flex min-w-max gap-2 rounded-full bg-muted p-1.5 sm:min-w-0 sm:w-fit sm:flex-wrap" role="tablist" aria-label="Atta products">
            {attaProducts.map((p, i) => (
              <button
                key={p.name}
                type="button"
                role="tab"
                aria-selected={activeAtta === i}
                onClick={() => setActiveAtta(i)}
                className={`shrink-0 px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all duration-300 ${
                  activeAtta === i ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p.name}
              </button>
            ))}
            </div>
          </div>

          {attaProducts.map((product, i) => (
            activeAtta === i && (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <div className="relative">
                  <div className="rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl">
                    <img src={product.image} alt={product.name} className="w-full h-[480px] object-cover" />
                  </div>
                  <div className="absolute top-6 left-6 bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-semibold">
                    {product.tag}
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-foreground text-background px-8 py-5 rounded-tl-[40px] rounded-br-[40px] hidden md:block">
                    <p className="font-serif text-4xl text-accent">{product.grains}</p>
                    <p className="font-sans text-xs text-background/60 mt-0.5">Premium Grains</p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    {product.mrpPrices && product.mrpPrices[selectedSize] && (
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground line-through text-sm">
                          MRP: ₹{product.mrpPrices[selectedSize]}
                        </span>
                        <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                          {Math.round(((product.mrpPrices[selectedSize] - product.prices[selectedSize]) / product.mrpPrices[selectedSize]) * 100)}% OFF
                        </span>
                      </div>
                    )}
                    <p className="text-accent font-sans font-semibold text-2xl mt-1">
                      ₹{product.prices[selectedSize]}
                    </p>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{product.name}</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">{product.desc}</p>

                  <div className="bg-muted rounded-2xl p-5 mb-6">
                    <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Grain Blend</p>
                    <p className="font-sans text-sm text-foreground">{product.grainList}</p>
                  </div>

                  <h4 className="font-sans font-semibold text-foreground mb-4">Why You'll Love It</h4>
                  <ul className="space-y-3 mb-8">
                    {product.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="font-sans text-sm text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 border-2 rounded-full text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-border text-foreground hover:border-accent/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleAddToCart(product, selectedSize)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                    <a
                      href="https://wa.me/918800953377"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground/10 rounded-full font-semibold hover:bg-muted transition-all"
                    >
                      Order on WhatsApp <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* Millet Murmura */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-12">
            <Sparkles className="w-7 h-7 text-accent" />
            <h2 className="font-serif text-3xl text-foreground">Millet Murmura</h2>
          </div>

          {/* Toggle */}
          <div className="-mx-2 mb-12 max-w-full overflow-x-auto overscroll-x-contain px-2 pb-1 scrollbar-none sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            <div className="flex min-w-max gap-2 rounded-full bg-muted p-1.5 sm:min-w-0 sm:w-fit sm:flex-wrap" role="tablist" aria-label="Millet murmura flavours">
            {murmuraFlavours.map((p, i) => (
              <button
                key={p.name}
                type="button"
                role="tab"
                aria-selected={activeMurmura === i}
                onClick={() => setActiveMurmura(i)}
                className={`shrink-0 px-5 sm:px-6 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all duration-300 ${
                  activeMurmura === i ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p.name}
              </button>
            ))}
            </div>
          </div>

          {murmuraFlavours.map((product, i) => (
            activeMurmura === i && (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <div className="relative">
                  <div className="rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl bg-white p-4">
                    <img src={product.image} alt={product.name} className="w-full h-[480px] object-contain" />
                  </div>
                  <div className="absolute top-6 left-6 bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-semibold">
                    {product.tag}
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-foreground text-background px-8 py-5 rounded-tl-[40px] rounded-br-[40px] hidden md:block">
                    <p className="font-serif text-4xl text-accent">{product.grains}</p>
                    <p className="font-sans text-xs text-background/60 mt-0.5">Premium Grains</p>
                  </div>
                </div>

                <div>
                  <div className="mb-3">
                    {product.mrp && (
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground line-through text-sm">
                          MRP: {product.mrp}
                        </span>
                        <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                          50% OFF
                        </span>
                      </div>
                    )}
                    <p className="text-accent font-sans font-semibold text-2xl mt-1">
                      {product.price}
                    </p>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{product.name}</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">{product.desc}</p>

                  <div className="bg-muted rounded-2xl p-5 mb-6">
                    <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Grain Blend</p>
                    <p className="font-sans text-sm text-foreground">{product.grainList}</p>
                  </div>

                  <h4 className="font-sans font-semibold text-foreground mb-4">Why You'll Love It</h4>
                  <ul className="space-y-3 mb-8">
                    {product.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="font-sans text-sm text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {product.sizes.map(size => (
                      <span key={size} className="px-5 py-2 border-2 border-accent bg-accent/5 text-accent rounded-full text-sm font-medium">
                        {size}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleAddToCart(product, product.sizes[0])}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                    <a
                      href="https://wa.me/918800953377"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground/10 rounded-full font-semibold hover:bg-muted transition-all"
                    >
                      Order on WhatsApp <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-20 bg-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-background mb-4">
              Ready to Order?
            </h2>
            <p className="font-sans text-background/60 mb-8">Place your order directly on WhatsApp — quick, easy, and friendly.</p>
            <a href="https://wa.me/918800953377" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-opacity">
              Order on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}