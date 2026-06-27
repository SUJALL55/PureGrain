import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import multigrainAttaImg from '../../assets/images/multigrain-atta.png';
import sugarControlAttaImg from '../../assets/images/sugar-control-atta.png';
import mixedMilletMurmuraImg from '../../assets/images/mixed-millet-murmura.png';
import kidsMilletMurmuraImg from '../../assets/images/kids-millet-murmura.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "tween",
      duration: 0.4
    }
  },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase">
              <Leaf className="w-3.5 h-3.5" />
              100% Natural & Stone Ground
            </motion.div>
            <motion.h1 variants={itemVariants} className="font-heading leading-none mb-4">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground block">
                PureGrain Mills
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary block mt-2">
                Mill से दिल तक
              </span>
            </motion.h1>

            {/* Three Products Display */}
            <div className="mb-6 grid grid-cols-4 gap-2">
              {[
                { id: "multigrain-atta", name: "Multigrain Atta", price: "72 rupee kg", image: multigrainAttaImg },
                { id: "sugar-control-atta", name: "Sugar-Control Atta", price: "99 rupee kg", image: sugarControlAttaImg },
                { id: "mixed-millet-murmura", name: "Millet Murmura", price: "99", image: mixedMilletMurmuraImg },
                { id: "kids-millet-murmura", name: "Kids Special", price: "99", image: kidsMilletMurmuraImg }
              ].map((product, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link to={`/product/${product.id}`} className="block h-full">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white rounded-xl p-2 shadow-md border border-amber-100 cursor-pointer group h-full relative z-10 flex flex-col items-center"
                    >
                      <div className="aspect-square w-full rounded-lg overflow-hidden mb-2 bg-amber-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-stone-800 text-center truncate w-full">{product.name}</p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Discover the purest stone-ground grain products — crafted with traditional wisdom and zero preservatives for your family's health.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-card text-foreground font-semibold text-sm rounded-full border border-border hover:bg-secondary transition-all"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 mt-9">
              {[{ icon: Shield, text: "No Preservatives" }, { icon: Sparkles, text: "Stone Ground" }, { icon: Leaf, text: "100% Natural" }].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <b.icon className="w-4 h-4 text-accent" />
                  <span>{b.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Social proof pill */}
            <motion.div variants={itemVariants} className="mt-8 inline-flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3">
              <div className="flex -space-x-2">
                {['P','R','A'].map((l, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary">{l}</div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-primary fill-primary" />)}
                </div>
                <p className="text-xs text-muted-foreground"><span className="text-foreground font-semibold">5,000+</span> happy families</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl rotate-3" />
              <img
                src={multigrainAttaImg}
                alt="Multigrain Atta by Pure Grain Mills"
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-xs text-muted-foreground">Made with</p>
                <p className="font-heading font-bold text-foreground text-sm">9 Premium Grains</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-xs opacity-80">Zero</p>
                <p className="font-heading font-bold text-sm">Preservatives</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
