import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, CreditCard, Smartphone, Wallet, Banknote, 
  CheckCircle, ChevronRight, ChevronLeft, Lock, Shield,
  Plus, Edit2, QrCode, Building2, ArrowRight
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/component/ui/use-toast';

export default function FlipkartCheckout({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  // Steps: 1=Address, 2=Order Summary, 3=Payment, 4=Processing
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Address State
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    addressType: 'home' // home, work, other
  });

  // Payment State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [savedUPI, setSavedUPI] = useState([]);
  const [newCardDetails, setNewCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');

  // Razorpay Configuration
  const RAZORPAY_KEY_ID = 'rzp_live_YOUR_KEY_ID';

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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const saveAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const address = { ...newAddress, id: Date.now() };
    setSavedAddresses(prev => [...prev, address]);
    setSelectedAddress(address);
    setShowNewAddressForm(false);
    setNewAddress({
      name: '', phone: '', pincode: '', locality: '',
      address: '', city: '', state: '', addressType: 'home'
    });
    
    toast({
      title: "Address Saved",
      description: "Your address has been saved successfully",
    });
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Select Payment",
        description: "Please choose a payment method",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // For UPI, Cards, Net Banking, Wallet - Use Razorpay
    if (['upi', 'card', 'netbanking', 'wallet'].includes(selectedPaymentMethod)) {
      try {
        const Razorpay = window.Razorpay;
        if (!Razorpay) {
          toast({
            title: "Error",
            description: "Payment gateway not loaded. Please refresh.",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }

        const options = {
          key: RAZORPAY_KEY_ID,
          amount: cartTotal * 100,
          currency: 'INR',
          name: 'PureGrain Mills',
          description: 'Order Payment',
          image: 'https://media.base44.com/images/public/69e3b4d8e2edc4505d8ed646/logo.png',
          handler: function (response) {
            handlePaymentSuccess(response);
          },
          prefill: {
            name: selectedAddress?.name || '',
            email: '',
            contact: selectedAddress?.phone || ''
          },
          theme: {
            color: '#2874F0' // Flipkart blue color
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              setCurrentStep(3);
            }
          }
        };

        // Set payment method specific options
        if (selectedPaymentMethod === 'card') {
          options.prefill = {
            ...options.prefill,
            method: 'card'
          };
        } else if (selectedPaymentMethod === 'upi') {
          options.prefill = {
            ...options.prefill,
            method: 'upi',
            vpa_upi: upiId
          };
        }

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
    } else if (selectedPaymentMethod === 'cod') {
      // COD - Direct success
      setTimeout(() => {
        handlePaymentSuccess({ 
          razorpay_payment_id: 'COD_' + Date.now(),
          razorpay_order_id: 'ORDER_' + Date.now()
        });
      }, 1000);
    }
  };

  const handlePaymentSuccess = (response) => {
    setIsProcessing(false);
    setCurrentStep(4);
    
    // Save payment method for future
    if (selectedPaymentMethod === 'card' && !savedCards.find(c => c.last4 === newCardDetails.number.slice(-4))) {
      setSavedCards(prev => [...prev, {
        id: Date.now(),
        last4: newCardDetails.number.slice(-4),
        type: 'visa', // detect from number
        name: newCardDetails.name
      }]);
    }

    toast({
      title: "Payment Successful! 🎉",
      description: "Your order has been placed successfully",
    });

    // Clear cart after 3 seconds
    setTimeout(() => {
      clearCart();
      onClose();
      // Reset
      setCurrentStep(1);
      setSelectedAddress(null);
      setSelectedPaymentMethod(null);
    }, 3000);
  };

  const getDeliveryCharges = () => cartTotal >= 500 ? 0 : 40;
  const getFinalTotal = () => cartTotal + getDeliveryCharges();

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Checkout Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#2874F0] px-6 py-4 flex items-center justify-between">
              <h2 className="text-white text-xl font-semibold">
                {currentStep === 1 && 'Delivery Address'}
                {currentStep === 2 && 'Order Summary'}
                {currentStep === 3 && 'Payment Options'}
                {currentStep === 4 && 'Order Confirmed'}
              </h2>
              <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            {currentStep < 4 && (
              <div className="bg-gray-50 px-6 py-3 border-b">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map(step => (
                    <React.Fragment key={step}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        currentStep >= step ? 'bg-[#2874F0] text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-0.5 ${currentStep > step ? 'bg-[#2874F0]' : 'bg-gray-200'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {/* Step 1: Address */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Saved Addresses */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Saved Addresses</h3>
                        {savedAddresses.length === 0 ? (
                          <p className="text-gray-500 text-sm">No saved addresses</p>
                        ) : (
                          <div className="space-y-3">
                            {savedAddresses.map(addr => (
                              <div
                                key={addr.id}
                                onClick={() => setSelectedAddress(addr)}
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  selectedAddress?.id === addr.id
                                    ? 'border-[#2874F0] bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-5 h-5 text-[#2874F0] flex-shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="font-semibold text-sm">{addr.name}</p>
                                    <p className="text-sm text-gray-600 mt-1">{addr.phone}</p>
                                    <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                                    <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                                    <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-xs rounded">
                                      {addr.addressType.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => setShowNewAddressForm(true)}
                          className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#2874F0] hover:text-[#2874F0] transition-all flex items-center justify-center gap-2"
                        >
                          <Plus className="w-5 h-5" />
                          Add New Address
                        </button>
                      </div>

                      {/* New Address Form */}
                      {(showNewAddressForm || savedAddresses.length === 0) && (
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="font-semibold text-lg mb-4">Add New Address</h3>
                          <div className="space-y-4">
                            <input
                              type="text"
                              name="name"
                              placeholder="Name *"
                              value={newAddress.name}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                            />
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number *"
                              value={newAddress.phone}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                            />
                            <input
                              type="text"
                              name="pincode"
                              placeholder="Pincode"
                              value={newAddress.pincode}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                            />
                            <input
                              type="text"
                              name="locality"
                              placeholder="Locality / Area"
                              value={newAddress.locality}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                            />
                            <textarea
                              name="address"
                              placeholder="Address (House No, Building, Street) *"
                              value={newAddress.address}
                              onChange={handleAddressChange}
                              rows="3"
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0] resize-none"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                name="city"
                                placeholder="City *"
                                value={newAddress.city}
                                onChange={handleAddressChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                              />
                              <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={newAddress.state}
                                onChange={handleAddressChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                              />
                            </div>
                            <div className="flex gap-3">
                              {['home', 'work', 'other'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setNewAddress(prev => ({ ...prev, addressType: type }))}
                                  className={`flex-1 py-2 border rounded-lg text-sm capitalize transition-all ${
                                    newAddress.addressType === type
                                      ? 'border-[#2874F0] bg-blue-50 text-[#2874F0]'
                                      : 'border-gray-300'
                                  }`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={saveAddress}
                              className="w-full py-3 bg-[#2874F0] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
                            >
                              Save & Deliver Here
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedAddress && (
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="mt-6 w-full py-3 bg-[#2874F0] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        Deliver to this Address
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Order Summary */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Items */}
                      <div className="md:col-span-2 space-y-4">
                        <h3 className="font-semibold text-lg">Order Items ({cartItems.length})</h3>
                        {cartItems.map((item, idx) => (
                          <div key={idx} className="flex gap-4 p-4 border rounded-lg">
                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              {item.size && <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>}
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              <p className="font-semibold mt-2">₹{item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Price Details */}
                      <div className="bg-gray-50 p-6 rounded-lg h-fit">
                        <h3 className="font-semibold text-lg mb-4">Price Details</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price ({cartItems.length} items)</span>
                            <span>₹{cartTotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Charges</span>
                            <span className={getDeliveryCharges() === 0 ? 'text-green-600' : ''}>
                              {getDeliveryCharges() === 0 ? 'FREE' : `₹${getDeliveryCharges()}`}
                            </span>
                          </div>
                          <div className="border-t pt-3 flex justify-between font-semibold text-base">
                            <span>Amount Payable</span>
                            <span>₹{getFinalTotal()}</span>
                          </div>
                        </div>

                        <div className="mt-6 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-700 font-medium">
                            {getDeliveryCharges() === 0 
                              ? '✓ Free delivery on orders above ₹500'
                              : `Add ₹${500 - cartTotal} more for FREE delivery`
                            }
                          </p>
                        </div>

                        <button
                          onClick={() => setCurrentStep(3)}
                          className="mt-6 w-full py-3 bg-[#2874F0] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                        >
                          Proceed to Pay
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Payment Methods */}
                      <div className="md:col-span-2 space-y-4">
                        <h3 className="font-semibold text-lg">Choose Payment Method</h3>

                        {/* UPI */}
                        <div
                          onClick={() => setSelectedPaymentMethod('upi')}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                            selectedPaymentMethod === 'upi' ? 'border-[#2874F0]' : 'border-gray-200'
                          }`}
                        >
                          <div className="p-4 flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-[#2874F0]" />
                            <span className="font-semibold">UPI (Google Pay, PhonePe, Paytm)</span>
                            {selectedPaymentMethod === 'upi' && <CheckCircle className="w-5 h-5 text-[#2874F0] ml-auto" />}
                          </div>
                          {selectedPaymentMethod === 'upi' && (
                            <div className="p-4 bg-gray-50 border-t">
                              <input
                                type="text"
                                placeholder="Enter UPI ID"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                              />
                              <p className="text-xs text-gray-500">Example: yourname@upi</p>
                            </div>
                          )}
                        </div>

                        {/* Credit/Debit Card */}
                        <div
                          onClick={() => setSelectedPaymentMethod('card')}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                            selectedPaymentMethod === 'card' ? 'border-[#2874F0]' : 'border-gray-200'
                          }`}
                        >
                          <div className="p-4 flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-[#2874F0]" />
                            <span className="font-semibold">Credit/Debit Card</span>
                            {selectedPaymentMethod === 'card' && <CheckCircle className="w-5 h-5 text-[#2874F0] ml-auto" />}
                          </div>
                          {selectedPaymentMethod === 'card' && (
                            <div className="p-4 bg-gray-50 border-t space-y-3">
                              <input
                                type="text"
                                placeholder="Card Number"
                                value={newCardDetails.number}
                                onChange={(e) => setNewCardDetails(prev => ({ ...prev, number: e.target.value }))}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                              />
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  value={newCardDetails.expiry}
                                  onChange={(e) => setNewCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                                />
                                <input
                                  type="text"
                                  placeholder="CVV"
                                  value={newCardDetails.cvv}
                                  onChange={(e) => setNewCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="Name on Card"
                                value={newCardDetails.name}
                                onChange={(e) => setNewCardDetails(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                              />
                            </div>
                          )}
                        </div>

                        {/* Net Banking */}
                        <div
                          onClick={() => setSelectedPaymentMethod('netbanking')}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                            selectedPaymentMethod === 'netbanking' ? 'border-[#2874F0]' : 'border-gray-200'
                          }`}
                        >
                          <div className="p-4 flex items-center gap-3">
                            <Building2 className="w-5 h-5 text-[#2874F0]" />
                            <span className="font-semibold">Net Banking</span>
                            {selectedPaymentMethod === 'netbanking' && <CheckCircle className="w-5 h-5 text-[#2874F0] ml-auto" />}
                          </div>
                        </div>

                        {/* Wallet */}
                        <div
                          onClick={() => setSelectedPaymentMethod('wallet')}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                            selectedPaymentMethod === 'wallet' ? 'border-[#2874F0]' : 'border-gray-200'
                          }`}
                        >
                          <div className="p-4 flex items-center gap-3">
                            <Wallet className="w-5 h-5 text-[#2874F0]" />
                            <span className="font-semibold">Wallets (Paytm, Mobikwik, etc.)</span>
                            {selectedPaymentMethod === 'wallet' && <CheckCircle className="w-5 h-5 text-[#2874F0] ml-auto" />}
                          </div>
                        </div>

                        {/* COD */}
                        <div
                          onClick={() => setSelectedPaymentMethod('cod')}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                            selectedPaymentMethod === 'cod' ? 'border-[#2874F0]' : 'border-gray-200'
                          }`}
                        >
                          <div className="p-4 flex items-center gap-3">
                            <Banknote className="w-5 h-5 text-[#2874F0]" />
                            <span className="font-semibold">Cash on Delivery</span>
                            {selectedPaymentMethod === 'cod' && <CheckCircle className="w-5 h-5 text-[#2874F0] ml-auto" />}
                          </div>
                        </div>
                      </div>

                      {/* Order Summary Sidebar */}
                      <div className="bg-gray-50 p-6 rounded-lg h-fit">
                        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                        <div className="space-y-2 text-sm mb-4">
                          {cartItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="text-gray-600 truncate flex-1">{item.name} x {item.quantity}</span>
                              <span>₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-3 flex justify-between font-semibold text-base">
                          <span>Total</span>
                          <span>₹{getFinalTotal()}</span>
                        </div>

                        <button
                          onClick={handlePayment}
                          disabled={!selectedPaymentMethod || isProcessing}
                          className="mt-6 w-full py-3 bg-[#2874F0] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isProcessing ? (
                            <>Processing...</>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              Pay ₹{getFinalTotal()}
                            </>
                          )}
                        </button>

                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                          <Shield className="w-4 h-4" />
                          <span>Safe and secure payments</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h3>
                    <p className="text-gray-600 mb-6">Thank you for shopping with PureGrain Mills</p>
                    <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto">
                      <p className="text-sm text-gray-600 mb-2">Order Confirmation sent to WhatsApp</p>
                      <p className="font-semibold">Redirecting...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {currentStep < 4 && currentStep > 1 && (
              <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
