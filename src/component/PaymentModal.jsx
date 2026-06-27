import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Banknote, QrCode, CheckCircle, Copy, CreditCard, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/component/ui/use-toast';

export default function PaymentModal({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  // Razorpay Configuration
  const RAZORPAY_KEY_ID = 'rzp_live_YOUR_KEY_ID'; // Replace with your Razorpay Key ID
  const upiId = 'puregrainmills@upi'; // Replace with your actual UPI ID
  const qrCodeUrl = '/src/assets/images/logo.png'; // Replace with your actual QR code image

  // Load Razorpay script
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "UPI ID copied to clipboard",
    });
  };

  // Razorpay Payment Handler
  const handleOnlinePayment = async () => {
    const Razorpay = window.Razorpay;
    if (!Razorpay) {
      toast({
        title: "Error",
        description: "Payment gateway not loaded. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create order - In production, this should be done on your backend
      const orderData = {
        amount: cartTotal * 100, // Amount in paise (₹1 = 100 paise)
        currency: 'INR',
        receipt: `order_${Date.now()}`,
        payment_capture: 1,
        notes: {
          customer_name: customerDetails.name,
          customer_phone: customerDetails.phone,
          items: cartItems.map(item => `${item.name} (${item.size}) x ${item.quantity}`).join(', ')
        }
      };

      // For demo: Using test mode. In production, call your backend API to create order
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PureGrain Mills',
        description: 'Order Payment',
        image: 'https://media.base44.com/images/public/69e3b4d8e2edc4505d8ed646/logo.png', // Your logo
        order_id: '', // Will be received from backend
        handler: function (response) {
          // Payment successful
          handlePaymentSuccess(response);
        },
        prefill: {
          name: customerDetails.name,
          email: '', // Optional
          contact: customerDetails.phone
        },
        notes: orderData.notes,
        theme: {
          color: '#F97316' // Your brand color (accent)
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = (response) => {
    setIsProcessing(false);
    
    // Generate WhatsApp message with order and payment details
    const orderMessage = `🛒 *New Order - PureGrain Mills*
✅ *Payment Confirmed*

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}
City: ${customerDetails.city}
Pincode: ${customerDetails.pincode}

📦 *Order Items:*
${cartItems.map(item => `- ${item.name} ${item.size ? `(${item.size})` : ''} x ${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}

💰 *Total Amount: ₹${cartTotal}*

💳 *Payment Method:* Online Payment (Razorpay)
🔖 *Payment ID:* ${response.razorpay_payment_id}
📋 *Order ID:* ${response.razorpay_order_id}`;

    const whatsappUrl = `https://wa.me/918800953377?text=${encodeURIComponent(orderMessage)}`;
    
    setOrderConfirmed(true);
    
    toast({
      title: "Payment Successful! 🎉",
      description: "Redirecting to WhatsApp to confirm your order",
    });

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
      onClose();
      // Reset form
      setOrderConfirmed(false);
      setSelectedPayment(null);
      setCustomerDetails({ name: '', phone: '', address: '', city: '', pincode: '' });
    }, 2000);
  };

  const handlePlaceOrder = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPayment) {
      toast({
        title: "Select Payment",
        description: "Please choose a payment method",
        variant: "destructive",
      });
      return;
    }

    // For online payment (UPI/Card/Net Banking via Razorpay)
    if (selectedPayment === 'online') {
      handleOnlinePayment();
      return;
    }

    // For manual payment methods (UPI manual, QR, COD)
    const paymentMethodText = selectedPayment === 'upi' ? 'UPI Payment' : selectedPayment === 'qr' ? 'QR Code Payment' : 'Cash on Delivery';

    // Generate WhatsApp message with order details
    const orderMessage = `🛒 *New Order - PureGrain Mills*
✅ *Order Placed*

👤 *Customer Details:* 
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}
City: ${customerDetails.city}
Pincode: ${customerDetails.pincode}

📦 *Order Items:*
${cartItems.map(item => `- ${item.name} ${item.size ? `(${item.size})` : ''} x ${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}

💰 *Total Amount: ₹${cartTotal}*

💳 *Payment Method:* ${paymentMethodText}

${selectedPayment === 'cod' ? '' : '✅ Payment will be confirmed separately'}`;

    const whatsappUrl = `https://wa.me/918800953377?text=${encodeURIComponent(orderMessage)}`;
    
    setOrderConfirmed(true);
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "Redirecting to WhatsApp to confirm your order",
    });

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
      onClose();
      // Reset form
      setOrderConfirmed(false);
      setSelectedPayment(null);
      setCustomerDetails({ name: '', phone: '', address: '', city: '', pincode: '' });
    }, 1500);
  };

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-background rounded-tl-[40px] rounded-br-[40px] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-accent px-8 pt-8 pb-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-accent-foreground/10 flex items-center justify-center hover:bg-accent-foreground/20 transition-colors"
                >
                  <X className="w-4 h-4 text-accent-foreground" />
                </button>
                <p className="font-sans text-xs font-semibold tracking-widest uppercase text-accent-foreground/70 mb-1">Secure Checkout</p>
                <h3 className="font-serif text-2xl text-accent-foreground">Complete Your Order</h3>
                <p className="font-sans text-sm text-accent-foreground/70 mt-1">Total: ₹{cartTotal}</p>
              </div>

              {!orderConfirmed ? (
                <div className="p-8 space-y-6">
                  {/* Customer Details */}
                  <div>
                    <h4 className="font-sans font-semibold text-foreground mb-4">Delivery Details</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-sans text-sm"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-sans text-sm"
                      />
                      <textarea
                        name="address"
                        placeholder="Delivery Address *"
                        value={customerDetails.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-sans text-sm resize-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={customerDetails.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-sans text-sm"
                        />
                        <input
                          type="text"
                          name="pincode"
                          placeholder="Pincode"
                          value={customerDetails.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-sans text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h4 className="font-sans font-semibold text-foreground mb-4">Payment Method</h4>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <button
                        onClick={() => setSelectedPayment('online')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          selectedPayment === 'online'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <CreditCard className={`w-6 h-6 ${selectedPayment === 'online' ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className="font-sans text-xs font-medium text-center">UPI/Cards/Net Banking</span>
                      </button>

                      <button
                        onClick={() => setSelectedPayment('cod')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          selectedPayment === 'cod'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <Banknote className={`w-6 h-6 ${selectedPayment === 'cod' ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className="font-sans text-xs font-medium">Cash on Delivery</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedPayment('upi')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          selectedPayment === 'upi'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <Smartphone className={`w-6 h-6 ${selectedPayment === 'upi' ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className="font-sans text-xs font-medium">Manual UPI</span>
                      </button>

                      <button
                        onClick={() => setSelectedPayment('qr')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          selectedPayment === 'qr'
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <QrCode className={`w-6 h-6 ${selectedPayment === 'qr' ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className="font-sans text-xs font-medium">QR Code</span>
                      </button>
                    </div>
                  </div>

                  {/* UPI Payment Details */}
                  {selectedPayment === 'upi' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-muted rounded-xl p-6"
                    >
                      <h5 className="font-sans font-semibold text-foreground mb-3">UPI Payment</h5>
                      <div className="bg-background rounded-lg p-4 mb-4">
                        <p className="font-sans text-sm text-muted-foreground mb-2">UPI ID:</p>
                        <div className="flex items-center justify-between">
                          <code className="font-mono text-lg font-semibold text-foreground">{upiId}</code>
                          <button
                            onClick={() => copyToClipboard(upiId)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4 text-accent" />
                          </button>
                        </div>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground">
                        Send payment to the UPI ID above and share the screenshot on WhatsApp
                      </p>
                    </motion.div>
                  )}

                  {/* QR Code Payment */}
                  {selectedPayment === 'qr' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-muted rounded-xl p-6 text-center"
                    >
                      <h5 className="font-sans font-semibold text-foreground mb-4">Scan QR Code to Pay</h5>
                      <div className="bg-white rounded-xl p-6 inline-block mb-4">
                        <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                          <QrCode className="w-24 h-24 text-muted-foreground" />
                          {/* Replace the above div with your actual QR code image: */}
                          {/* <img src={qrCodeUrl} alt="Payment QR Code" className="w-48 h-48" /> */}
                        </div>
                      </div>
                      <p className="font-sans text-lg font-semibold text-foreground mb-2">Amount: ₹{cartTotal}</p>
                      <p className="font-sans text-xs text-muted-foreground">
                        Scan with any UPI app and share the payment screenshot on WhatsApp
                      </p>
                    </motion.div>
                  )}

                  {/* Cash on Delivery */}
                  {selectedPayment === 'cod' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-muted rounded-xl p-6"
                    >
                      <div className="flex items-start gap-3">
                        <Banknote className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-sans font-semibold text-foreground mb-2">Cash on Delivery</h5>
                          <p className="font-sans text-sm text-muted-foreground">
                            Pay when your order is delivered to your doorstep. Please keep exact change ready.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Place Order Button */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Place Order - ₹{cartTotal}
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h4 className="font-serif text-2xl text-foreground mb-2">Order Placed Successfully!</h4>
                  <p className="font-sans text-muted-foreground mb-4">
                    Redirecting to WhatsApp to confirm your order...
                  </p>
                  <p className="font-sans text-sm text-accent font-semibold">
                    Order Total: ₹{cartTotal}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
