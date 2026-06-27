import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../component/HeroSection';
import OrderModal from '../component/OrderModal';
import { Leaf, Shield, Heart, ArrowRight, Star, Wheat, Sparkles, X, Brain, Activity, Zap } from 'lucide-react';
import productMultigrainAtta from '../assets/images/product-multigrain-atta.png';
import productSugarControlAtta from '../assets/images/product-sugar-control-atta.png';
import productMurmuraKid from '../assets/images/product-murmura-kid.png';
import productMurmuraMixed from '../assets/images/product-murmura-mixed.png';
import familyKitchen from '../assets/images/family-kitchen.png';
import wheatFields from '../assets/images/wheat-fields.png';

const stats = [
  { value: '9+', label: 'Premium Grains' },
  { value: '0', label: 'Preservatives' },
  { value: '4', label: 'Product Variants' },
  { value: '₹256Bn', label: 'Market Opportunity' },
];

const features = [
  { icon: Leaf, title: 'Stone Ground & Cold Milled', desc: 'Traditional chakki process preserving every nutrient.' },
  { icon: Shield, title: 'Zero Preservatives', desc: 'Pure grains, nothing else. As nature intended.' },
  { icon: Heart, title: 'Scientifically Balanced', desc: 'Optimal millet ratios for daily nourishment.' },
];

const testimonials = [
  { 
    name: 'Sagar Bhalerao', 
    city: 'Google Review', 
    quote: 'Good quality, reasonable price, and reliable brand. Pureagrain Mills never disappoints.', 
    stars: 5,
    link: 'https://www.google.com/search?sca_esv=43a6c5a008a39361&rlz=1C5CHFA_enIN1168IN1168&sxsrf=ANbL-n4GfMC9_uCMyY-AEzN4h59jVsS_fQ:1778520548937&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaCxQy1C8ngEyn-afE1sG1GH0guCMiraIBYUme6RaUFnO29VnajWGAQQ63MwM-IE8O_X7RWDbx4PSj4bhKmuQCDO6s6Y&q=PureGrain+Mills+Reviews&sa=X&ved=2ahUKEwi3862s4bGUAxVRyzgGHdRABtsQ0bkNegQIMhAH&biw=1449&bih=816&dpr=2'
  },
  { 
    name: 'Manisha Sharan', 
    city: 'Google Review', 
    quote: 'PureGrain Mills truly stands out for its fresh and high-quality products. 🌾 They offer a wide range of healthy flours and nutritious grain options. Everything feels natural, pure, and carefully prepared. Perfect choice for families who prefer healthy eating. Highly recommend for quality you can trust! 💛', 
    stars: 5,
    link: 'https://www.google.com/search?sca_esv=43a6c5a008a39361&rlz=1C5CHFA_enIN1168IN1168&sxsrf=ANbL-n4GfMC9_uCMyY-AEzN4h59jVsS_fQ:1778520548937&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaCxQy1C8ngEyn-afE1sG1GH0guCMiraIBYUme6RaUFnO29VnajWGAQQ63MwM-IE8O_X7RWDbx4PSj4bhKmuQCDO6s6Y&q=PureGrain+Mills+Reviews&sa=X&ved=2ahUKEwi3862s4bGUAxVRyzgGHdRABtsQ0bkNegQIMhAH&biw=1449&bih=816&dpr=2'
  },
  { 
    name: 'Sandeep Gera', 
    city: 'Google Review', 
    quote: 'Recently tried PureGrain Mills mixture, and it was an absolute delight! The taste is incredibly flavorful and satisfying, with wonderful, high-quality ingredients that shine through every bite. Plus, it\'s super hygienic—perfect for family snacking. Highly recommend!', 
    stars: 5,
    link: 'https://www.google.com/search?sca_esv=43a6c5a008a39361&rlz=1C5CHFA_enIN1168IN1168&sxsrf=ANbL-n4GfMC9_uCMyY-AEzN4h59jVsS_fQ:1778520548937&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaCxQy1C8ngEyn-afE1sG1GH0guCMiraIBYUme6RaUFnO29VnajWGAQQ63MwM-IE8O_X7RWDbx4PSj4bhKmuQCDO6s6Y&q=PureGrain+Mills+Reviews&sa=X&ved=2ahUKEwi3862s4bGUAxVRyzgGHdRABtsQ0bkNegQIMhAH&biw=1449&bih=816&dpr=2'
  },
];

const products = [
  {
    name: 'Multigrain Atta',
    tag: 'Bestseller',
    desc: 'Rich in dietary fibre, 12g protein & 9-grain blend. No maida, no preservatives.',
    image: productMultigrainAtta,
  },
  {
    name: 'Sugar Control Atta',
    tag: 'Health Focus',
    desc: 'Low GI blend with celium husk. Ideal for diabetics & blood sugar management.',
    image: productSugarControlAtta,
  },
  {
    name: 'Millet Murmura (Kid-Friendly)',
    tag: 'Snack Smart',
    desc: 'Nutritious & kid-friendly snack. Zero preservatives, healthy and tasty.',
    image: productMurmuraKid,
  },
  {
    name: 'Mixed Millet Murmura',
    tag: 'Snack Smart',
    desc: 'High fibre millet snack. Scientifically balanced, zero preservatives.',
    image: productMurmuraMixed,
  },
];

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const processSteps = [
  { step: '01', title: 'Grain Selection', desc: 'We hand-pick the finest wheat and millets from trusted farmers across India — only premium grade makes the cut.' },
  { step: '02', title: 'Stone Grinding', desc: 'Traditional cold-press chakki milling preserves every nutrient, fibre, and the natural aroma of the grain.' },
  { step: '03', title: 'Scientific Blending', desc: 'Our nutritionist-derived grain ratios are carefully combined for the perfect balance of taste and nourishment.' },
  { step: '04', title: 'Hygienic Packaging', desc: 'Sealed under strict FSSAI standards within hours of milling — delivering freshness you can smell and taste.' },
];

const healthBenefits = [
  { 
    icon: Brain, 
    title: 'Brain Health', 
    desc: 'Rich in B-vitamins and complex carbs that support cognitive function and mental clarity throughout the day.',
    color: 'from-blue-500/20 to-purple-500/20'
  },
  { 
    icon: Activity, 
    title: 'Heart Wellness', 
    desc: 'High in dietary fiber and antioxidants that help maintain healthy cholesterol levels and cardiovascular function.',
    color: 'from-red-500/20 to-pink-500/20'
  },
  { 
    icon: Zap, 
    title: 'Sustained Energy', 
    desc: 'Low glycemic index grains provide steady energy release, preventing sugar crashes and keeping you active.',
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  { 
    icon: Shield, 
    title: 'Immunity Boost', 
    desc: 'Packed with essential minerals like zinc, iron, and selenium that strengthen your body\'s natural defenses.',
    color: 'from-green-500/20 to-emerald-500/20'
  },
];

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <div className="font-sans">
      <HeroSection />

      
      {/* Why We Exist */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl">
                  <img
                    src={familyKitchen}
                    alt="Family meal with rotis"
                    className="w-full h-[520px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground p-8 rounded-tl-[50px] rounded-br-[50px] shadow-xl hidden md:block">
                  <p className="font-serif text-3xl italic">Since 2026</p>
                  <p className="font-sans text-xs mt-1 opacity-80">Founded by Vinita & Mistu</p>
                </div>
                {/* Floating grain card */}
                <div className="absolute -top-6 -left-6 bg-background border border-border rounded-2xl px-6 py-4 shadow-xl hidden md:block">
                  <div className="flex items-center gap-3">
                    <Wheat className="w-8 h-8 text-accent" />
                    <div>
                      <p className="font-sans font-bold text-foreground text-lg">100% Pure</p>
                      <p className="font-sans text-xs text-muted-foreground">No adulterants</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Our Promise</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                Nourishing Every
                <br /><em className="text-accent">Indian Family</em>
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                PureGrain Mills was born from a simple belief — health should never compromise taste. Guided by premium grains and time-honoured milling wisdom, we crafted what we couldn't find in any store.
              </p>
              <div className="space-y-6 mb-10">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-foreground mb-0.5">{f.title}</h4>
                      <p className="font-sans text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity">
                Learn About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 md:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Our Products</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Nourishment, <em>Reimagined</em>
              </h2>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.15}>
                <div className="group bg-background rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                    <span className="absolute top-5 left-5 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-semibold">{p.tag}</span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-serif text-2xl text-foreground mb-2">{p.name}</h3>
                    <p className="font-sans text-sm text-muted-foreground mb-5">{p.desc}</p>
                    <Link to="/products" className="inline-flex items-center gap-1 text-accent font-semibold text-sm hover:gap-2 transition-all">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-semibold hover:border-accent hover:text-accent transition-all">
              See All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Testimonials</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                Loved by <em>Families</em>
              </h2>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.15}>
                <a 
                  href={t.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-muted rounded-tl-[40px] rounded-br-[40px] p-8 h-full flex flex-col hover:shadow-xl hover:bg-muted/80 transition-all duration-300 group"
                >
                  <div className="flex mb-4">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="font-sans text-foreground/80 leading-relaxed mb-6 flex-1 italic">"{t.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans font-semibold text-foreground">{t.name}</p>
                      <p className="font-sans text-sm text-muted-foreground">{t.city}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="py-24 md:py-28 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Health Benefits</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Nourishment That <em className="text-accent">Transforms</em>
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                Every grain in our blends is chosen for its powerful health benefits. From brain function to heart health, experience the difference that pure, premium grains can make in your daily life.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {healthBenefits.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 0.15}>
                <div className={`relative bg-gradient-to-br ${benefit.color} rounded-tl-[50px] rounded-br-[50px] p-8 h-full border border-border/20 hover:shadow-2xl transition-all duration-500 group`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-3">{benefit.title}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="text-center">
            <FadeIn delay={0.4}>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="font-sans text-sm text-accent font-semibold">Scientifically Backed Nutrition</span>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setOrderOpen(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
                >
                  Start Your Health Journey
                </button>
                <Link to="/products" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-semibold hover:border-accent hover:text-accent transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It's Made — Process */}
      <section className="py-24 bg-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">The Process</p>
              <h2 className="font-serif text-4xl md:text-5xl text-background leading-tight">
                How It's <em className="text-accent">Made</em>
              </h2>
            </FadeIn>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.12}>
                <div className="relative bg-background/5 border border-background/10 rounded-tl-[40px] rounded-br-[40px] p-8 h-full hover:bg-background/10 transition-colors">
                  <p className="font-serif text-6xl text-accent/20 mb-4 leading-none">{s.step}</p>
                  <h3 className="font-sans font-semibold text-background text-lg mb-3">{s.title}</h3>
                  <p className="font-sans text-sm text-background/50 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />

      {/* CTA Banner */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={wheatFields} alt="Golden wheat fields" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <Sparkles className="w-10 h-10 text-accent mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-6xl text-background leading-tight mb-6">
              Your Family Deserves
              <br /><em className="text-accent">The Very Best</em>
            </h2>
            <p className="font-sans text-lg text-background/70 mb-10">
              Join thousands of families choosing freshness, purity, and time-honoured nutrition every single day.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => setOrderOpen(true)} className="px-10 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-opacity">
                Order Now
              </button>
              <Link to="/products" className="px-10 py-4 border-2 border-background/30 text-background rounded-full font-semibold text-lg hover:border-accent hover:text-accent transition-all">
                Browse Products
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}