import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cartContext';

export default function ProductCard({ product, index }) {
  const [showVariants, setShowVariants] = useState(false);
  const [showRepeatDialog, setShowRepeatDialog] = useState(false);
  const [jumpAnimation, setJumpAnimation] = useState(false);
  const [jumpStartPos, setJumpStartPos] = useState({ x: 0, y: 0 });
  const { cart, addToCart, updateQty } = useCart();
  
  // Get all items for this product from cart
  const productItemsInCart = cart.filter(item => item.product.id === product.id);
  const totalProductQty = productItemsInCart.reduce((sum, item) => sum + item.qty, 0);
  
  const startingPrice = Math.min(...product.variants.map(v => v.price));
  const firstVariant = product.variants[0];
  const discountPercentage = firstVariant.mrp ? Math.round((1 - startingPrice / firstVariant.mrp) * 100) : 0;

  const handleAddToCart = (variant, event) => {
    // Get the position for the jump animation
    const buttonRect = event?.currentTarget?.getBoundingClientRect();
    if (buttonRect) {
      triggerJumpAnimation(buttonRect);
    }
    
    addToCart(product, variant);
    setShowVariants(false);
    setShowRepeatDialog(false);
  };

  const triggerJumpAnimation = (startRect) => {
    setJumpStartPos({
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2
    });
    setJumpAnimation(true);
    setTimeout(() => setJumpAnimation(false), 800);
  };

  const handleIncrement = (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    if (productItemsInCart.length > 0) {
      setShowRepeatDialog(true);
    } else {
      setShowVariants(true);
    }
  };

  const handleDecrement = (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    if (productItemsInCart.length === 1) {
      const item = productItemsInCart[0];
      updateQty(item.key, item.qty - 1);
    } else if (productItemsInCart.length > 1) {
      // If multiple variants, show the dialog to let user choose which to decrement or just show they need to go to cart
      setShowRepeatDialog(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <Link
        to={`/product/${product.id}`}
        className="block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative aspect-square bg-secondary/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {discountPercentage > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md"
            >
              ↓{discountPercentage}%
            </motion.div>
          )}
          <div className="absolute top-4 right-4">
            <span className="inline-block px-3 py-1 bg-card/90 backdrop-blur-sm text-xs font-semibold text-foreground rounded-full">
              {product.category === 'atta' ? 'Atta' : 'Snack'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5">
          <h3 className="font-heading text-lg font-bold text-foreground mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {product.tagline}
          </p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl font-bold text-primary">₹{startingPrice}</p>
                {product.category === 'atta' && (
                  <span className="text-[11px] font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded">
                    1kg
                  </span>
                )}
                {product.variants[0].mrp && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.variants[0].mrp}</span>
                )}
              </div>
            </div>
            
            {/* Flipkart-style quantity controls */}
            <AnimatePresence mode="wait">
              {totalProductQty > 0 ? (
                <motion.div
                  key="quantity-controls"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-1 py-0.5 shadow-md">
                    <button
                      onClick={handleDecrement}
                      className="w-7 h-7 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{totalProductQty}</span>
                    <button
                      onClick={handleIncrement}
                      className="w-7 h-7 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {productItemsInCart.length > 0 && (
                     <span className="text-[10px] text-primary font-medium whitespace-nowrap">
                       {productItemsInCart.length === 1 
                         ? `${productItemsInCart[0].variant.weight} ${product.category === 'atta' ? 'Atta' : ''} selected`
                         : `${productItemsInCart.length} variants`}
                     </span>
                   )}
                </motion.div>
              ) : (
                <motion.button
                  key="add-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowVariants(true);
                  }}
                  className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Link>

      {/* Variant Selection Dialog */}
      <AnimatePresence>
        {showVariants && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center"
            onClick={() => setShowVariants(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden mb-[env(safe-area-inset-bottom)]"
            >
              {/* Header */}
              <div className="relative p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 pr-8">Select Variant</h3>
                <button
                  onClick={() => setShowVariants(false)}
                  className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 bg-amber-50 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">Choose your preferred size</p>
                  </div>
                </div>
              </div>

              {/* Variants List */}
              <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto pb-20 sm:pb-4">
                {product.variants.map((variant, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.2 }}
                    onClick={(e) => handleAddToCart(variant, e)}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-amber-500 bg-white hover:bg-amber-50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                        <span className="text-lg font-bold text-amber-700">{variant.weight}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{variant.weight}</p>
                        {variant.mrp && (
                          <p className="text-xs text-gray-500 line-through">₹{variant.mrp}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-amber-600">₹{variant.price}</p>
                      <p className="text-xs text-green-600 font-semibold">Add to Cart</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Repeat Customization Dialog */}
      <AnimatePresence>
        {showRepeatDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-end sm:items-center justify-center"
            onClick={() => setShowRepeatDialog(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden mb-[env(safe-area-inset-bottom)]"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Repeat last used customization?</h3>
                <button
                  onClick={() => setShowRepeatDialog(false)}
                  className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Current Cart Items for this Product */}
              <div className="p-4 space-y-4 max-h-[50vh] overflow-y-auto">
                {productItemsInCart.map((item, idx) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {item.product.name}, {item.variant.weight}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-gray-900">₹{item.variant.price}</span>
                          {item.variant.mrp && (
                            <span className="text-xs text-gray-400 line-through">₹{item.variant.mrp}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white border border-rose-200 text-rose-500 rounded-lg px-2 py-1 shadow-sm">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-rose-50 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-4 text-center font-bold text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-rose-50 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Action */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <button
                  onClick={() => {
                    setShowRepeatDialog(false);
                    setShowVariants(true);
                  }}
                  className="w-full py-4 text-rose-500 font-bold text-lg hover:bg-rose-50 transition-colors rounded-xl flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add new customization
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jumping Product Animation */}
      <AnimatePresence>
        {jumpAnimation && (
          <motion.div
            key="jumping-product"
            initial={{
              position: 'fixed',
              top: jumpStartPos.y - 40,
              left: jumpStartPos.x - 40,
              width: 80,
              height: 80,
              opacity: 1,
              scale: 1,
              zIndex: 9999
            }}
            animate={{
              top: 'calc(100vh - 50px)',
              left: 'calc(75vw)',
              opacity: [1, 1, 0.3],
              scale: [1, 0.8, 0.2],
              rotate: [0, 180, 360]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed pointer-events-none"
            style={{
              willChange: 'transform, opacity'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-primary"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
