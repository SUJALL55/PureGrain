import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/lib/products';
import ProductCard from '@/components/home/ProductCard';
import { Leaf, ShieldCheck, Wheat, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'atta', label: 'Atta' },
  { key: 'snack', label: 'Snacks' },
];

const perks = [
  { icon: Wheat, text: "Stone Ground" },
  { icon: ShieldCheck, text: "No Preservatives" },
  { icon: Leaf, text: "100% Natural" },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showBuyAgain, setShowBuyAgain] = useState(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check URL params on mount
  useEffect(() => {
    if (tab === 'categories') {
      setShowBuyAgain(false);
      setActiveCategory('all');
    } else if (tab === 'buy-again') {
      setShowBuyAgain(true);
    }
  }, [tab]);

  // Get order history from localStorage
  const orderHistory = JSON.parse(localStorage.getItem('pgm_order_history') || '[]');
  const boughtProductIds = [...new Set(orderHistory.map(order => order.productId))];
  const buyAgainProducts = products.filter(p => boughtProductIds.includes(p.id));

  const filtered = showBuyAgain 
    ? buyAgainProducts 
    : activeCategory === 'all' 
      ? products 
      : products.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-secondary via-background to-secondary/50 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
              {showBuyAgain ? 'Reorder' : 'Shop Now'}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
              {showBuyAgain ? 'Buy Again' : 'All Products'}
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
              {showBuyAgain 
                ? 'Reorder your favorite products with just one click'
                : 'Pure, wholesome, and made with love — explore our range of stone-ground grain products.'}
            </p>

            {/* Perks row */}
            {!showBuyAgain && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {perks.map((p, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-card border border-border rounded-full px-4 py-1.5">
                    <p.icon className="w-3.5 h-3.5 text-accent" />
                    {p.text}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Category Filter - Only show in Categories mode */}
      {!showBuyAgain && (
        <div className="sticky top-16 sm:top-20 z-30 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 py-3 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.key
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                      : 'bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              {showBuyAgain ? 'No orders yet' : 'No products found'}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {showBuyAgain 
                ? 'Order something first and it will appear here!'
                : 'Try selecting a different category'}
            </p>
            {showBuyAgain && (
              <button
                onClick={() => setShowBuyAgain(false)}
                className="px-6 py-3 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-colors"
              >
                Browse Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* Trust row - Only show in Categories mode */}
        {!showBuyAgain && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-card border border-border rounded-3xl p-8 text-center"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">Why Shop with Us?</h3>
            <p className="text-muted-foreground text-sm mb-6">Fresh milled, shipped to your door with love.</p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { title: "100%", sub: "Natural Ingredients" },
                { title: "Zero", sub: "Preservatives" },
                { title: "Fresh", sub: "Stone Ground Daily" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-2xl font-bold text-amber-600">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
