import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { UPI_QR_DATA_URI, UPI_QR_TID } from '@/lib/qrPayment';

// Simple Checkout Page - Works immediately without backend setup
export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState(() => {
    const storage = typeof window !== 'undefined' ? window.localStorage : null;
    const savedName = storage?.getItem('pgm_user_name') || '';
    const savedPhone = storage?.getItem('pgm_user_phone') || '';
    const savedAddress = storage?.getItem('user_address') || '';

    // savedAddress format: `${houseAddress}, ${city} - ${pincode}`
    let parsedAddress = { address: '', city: '', pincode: '' };
    if (savedAddress) {
      const commaParts = savedAddress.split(',').map((p) => p.trim()).filter(Boolean);
      if (commaParts.length >= 2) {
        parsedAddress.address = commaParts[0];
        const cityAndPin = commaParts.slice(1).join(','); // keep any extra commas
        const dashParts = cityAndPin.split('-').map((p) => p.trim());
        if (dashParts.length >= 2) {
          parsedAddress.city = dashParts[0];
          parsedAddress.pincode = dashParts.slice(1).join('-').trim();
        } else {
          parsedAddress.city = cityAndPin;
        }
      } else {
        parsedAddress.address = savedAddress;
      }
    }

    return {
      name: savedName,
      phone: savedPhone,
      address: parsedAddress.address,
      city: parsedAddress.city,
      pincode: parsedAddress.pincode,
      notes: ''
    };
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentPaid = () => {
    const orderDetails = cart.map(item =>
      `• ${item.product.name} (${item.variant.weight}) x${item.qty} = ₹${item.variant.price * item.qty}`
    ).join('\n');

    const message = `*New Order from PureGrain Mills*\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city} - ${formData.pincode}\n${formData.notes ? `Notes: ${formData.notes}\n` : ''}\n*Order Items:*\n${orderDetails}\n*Total Amount: ₹${totalPrice}*\n\nPlease confirm my order.`;

    const whatsappUrl = `https://wa.me/918800953377?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Save to order history for "Buy Again" feature
    const orderHistory = JSON.parse(localStorage.getItem('pgm_order_history') || '[]');
    const newOrders = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      variant: item.variant.weight,
      qty: item.qty,
      price: item.variant.price,
      orderDate: new Date().toISOString()
    }));
    orderHistory.push(...newOrders);
    localStorage.setItem('pgm_order_history', JSON.stringify(orderHistory));

    // Save full order for profile "My Orders" list
    const savedOrders = JSON.parse(localStorage.getItem('pgm_orders') || '[]');
    const fullAddress = `${formData.address}, ${formData.city} - ${formData.pincode}`;
    const profileOrder = {
      id: `PGM-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'paid',
      address: fullAddress,
      total: totalPrice,
      items: cart.map(item => ({
        name: item.product.name,
        weight: item.variant.weight,
        qty: item.qty,
        price: item.variant.price * item.qty
      }))
    };
    savedOrders.unshift(profileOrder);
    localStorage.setItem('pgm_orders', JSON.stringify(savedOrders));

    // Save last used delivery address for profile/navbar
    localStorage.setItem('user_address', fullAddress);
    
    // Clear cart and show success
    clearCart();
    setOrderPlaced(true);
    setTimeout(() => {
      navigate(`/payment-success?payment_intent=${encodeURIComponent(UPI_QR_TID)}`);
    }, 1000);
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+918800953377';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">No items to checkout</h2>
        <button 
          onClick={() => navigate('/products')} 
          className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold"
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
            <Check className="w-12 h-12 text-accent" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
          <p className="text-muted-foreground">Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Checkout</h1>
        <p className="text-muted-foreground mb-6">Complete your order details</p>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-8">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.product.name} ({item.variant.weight}) × {item.qty}
                </span>
                <span className="font-semibold text-foreground">
                  ₹{item.variant.price * item.qty}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
            <span className="font-heading text-lg font-bold text-foreground">Total</span>
            <span className="font-heading text-2xl font-bold text-primary">₹{totalPrice}</span>
          </div>
        </div>

        {/* Customer Details Form */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border mb-8">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-6">Delivery Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Delivery Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="House no, Street, Landmark"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="6-digit pincode"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Order Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Any special instructions"
              />
            </div>
          </div>
        </div>

        {/* QR Payment */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border mb-8">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Scan & Pay</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Scan the QR to complete UPI payment for <span className="font-semibold text-foreground">₹{totalPrice}</span>.
            After payment, tap <span className="font-semibold text-foreground">I have paid</span>.
          </p>

          <div className="flex flex-col items-center">
            <img
              src={UPI_QR_DATA_URI}
              alt="UPI QR Code"
              className="w-full max-w-[320px] rounded-xl border border-border bg-white"
            />
            <p className="text-xs text-muted-foreground mt-3">TID: {UPI_QR_TID}</p>
          </div>
        </div>

        {/* Order Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePaymentPaid}
            disabled={!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode}
            className="w-full py-6 text-base rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg shadow-amber-600/30 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-3 transition-all"
          >
            <MessageCircle className="w-6 h-6" />
            I have paid — ₹{totalPrice}
          </button>

          <button
            onClick={handlePhoneCall}
            className="w-full py-4 text-base rounded-full border-2 border-amber-600 text-amber-700 hover:bg-amber-50 transition-all font-semibold flex items-center justify-center gap-3"
          >
            <Phone className="w-5 h-5" />
            Call to Order
          </button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            We will open WhatsApp with your order details after you mark payment as done.
          </p>
        </div>
      </div>
    </div>
  );
}
