import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <CheckCircle className="w-16 h-16 text-accent" />
          </motion.div>
        </div>

        {/* Success Message */}
        <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. Your payment has been processed successfully.
        </p>

        {/* Order Details */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold text-foreground">Order Confirmed</h3>
              <p className="text-sm text-muted-foreground">
                {paymentIntentId ? `Payment ID: ${paymentIntentId.slice(0, 20)}...` : 'Order placed successfully'}
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-accent">Paid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-semibold text-foreground">2-3 Business Days</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/products"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-all"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-border transition-all"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
