import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/cartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { App } from '@capacitor/app';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Scroll to top when cart page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Handle Android back button - navigate to products instead of closing app
    const handleBackButton = () => {
      navigate('/products');
    };
    
    // Add back button listener for Capacitor (mobile app)
    if (typeof App !== 'undefined') {
      App.addListener('backButton', handleBackButton);
    }
    
    return () => {
      if (typeof App !== 'undefined') {
        App.removeAllListeners();
      }
    };
  }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground text-sm mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:opacity-90 transition-all"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Your Cart</h1>

        <div className="space-y-4">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 bg-card rounded-2xl p-4 sm:p-5 border border-border"
              >
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-secondary/50 overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground truncate">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.variant.weight}</p>
                  <p className="text-lg font-bold text-primary mt-1">₹{item.variant.price}</p>
                </div>

                {/* Qty controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-card rounded-2xl p-6 sm:p-8 border border-border">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-sm text-accent font-medium">Free</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="font-heading text-lg font-bold text-foreground">Total</span>
            <span className="font-heading text-2xl font-bold text-primary">₹{totalPrice}</span>
          </div>

          <button
            className="w-full mt-6 py-6 text-base rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg shadow-amber-600/30 font-semibold transition-all"
            onClick={() => {
              window.location.href = '/#/checkout';
            }}
          >
            Proceed to Checkout — ₹{totalPrice}
          </button>
          <p className="text-xs text-stone-500 text-center mt-3">
            Secure checkout with WhatsApp ordering
          </p>

          <button
            className="w-full mt-4 py-2 text-sm rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
