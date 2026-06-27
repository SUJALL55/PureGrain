import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTABanner() {
  const whatsappUrl = `https://wa.me/918800953377?text=${encodeURIComponent('Hi! I would like to know more about PureGrain Mills products.')}`;

  return (
    <section className="py-16 sm:py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
          className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl overflow-hidden px-8 py-14 sm:py-20 text-center"
        >
          {/* Decorative */}
          <motion.div
            animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
          />
          <motion.div
            animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"
          />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-primary-foreground/70 text-xs font-semibold uppercase tracking-widest mb-3"
            >
              Limited Time — Free Delivery on First Order
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight"
            >
              Start Your Healthy Journey Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-primary-foreground/80 max-w-lg mx-auto text-sm sm:text-base mb-10"
            >
              Join thousands of families who have already switched to pure, stone-ground grain products for a healthier lifestyle.
            </motion.p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-bold text-sm rounded-full hover:opacity-90 transition-all shadow-xl"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm rounded-full hover:bg-primary-foreground/10 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}