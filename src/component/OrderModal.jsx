import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle } from 'lucide-react';

export default function OrderModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-sm pointer-events-auto"
            >
              <div className="bg-background rounded-3xl shadow-2xl overflow-hidden border border-border">
                {/* Header */}
                <div className="px-6 pt-8 pb-6 text-center relative border-b border-border/50">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="font-serif text-2xl text-foreground">Place Your Order</h3>
                  <p className="font-sans text-sm text-muted-foreground mt-2">Choose how you'd like to connect with us</p>
                </div>

                {/* Options */}
                <div className="p-6 space-y-4">
                  <a
                    href="tel:+918800953377"
                    onClick={onClose}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Us Now</span>
                  </a>

                  <a
                    href="https://wa.me/918800953377?text=Hi%20PureGrain%20Mills!%20I%20would%20like%20to%20place%20an%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>

                <div className="px-6 pb-6 text-center">
                  <p className="font-sans text-xs text-muted-foreground">
                    Available: Mon – Sat · 9am – 7pm
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}