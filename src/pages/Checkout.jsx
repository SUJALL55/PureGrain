import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, CreditCard, Smartphone, Wallet, Banknote, 
  CheckCircle, ChevronRight, ChevronLeft, Lock, Shield,
  Plus, QrCode, Building2, ArrowRight, Home, Navigation
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/component/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  // Steps: 1=Address, 2=Order Summary, 3=Payment, 4=Processing
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Address State
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('puregrain_addresses');
    return saved ? JSON.parse(saved) : [];
  });
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
    addressType: 'home'
  });

  // Payment State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [newCardDetails, setNewCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Razorpay Configuration
  const RAZORPAY_KEY_ID = 'rzp_live_YOUR_KEY_ID';

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Save addresses to localStorage
  useEffect(() => {
    if (savedAddresses.length > 0) {
      localStorage.setItem('puregrain_addresses', JSON.stringify(savedAddresses));
    }
  }, [savedAddresses]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some products before checkout",
        variant: "destructive",
      });
      navigate('/products');
    }
  }, [cartItems, navigate, toast]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation. Please enter address manually.",
        variant: "destructive",
      });
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use OpenStreetMap Nominatim API for reverse geocoding (free, no API key needed)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch address');
          }
          
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            
            // Auto-fill the address form with detected location
            setNewAddress(prev => ({
              ...prev,
              address: data.display_name || data.address.road || '',
              locality: addr.suburb || addr.neighbourhood || addr.quarter || '',
              city: addr.city || addr.town || addr.village || addr.district || '',
              state: addr.state || '',
              pincode: addr.postcode || prev.pincode,
            }));
            
            toast({
              title: "Location Detected",
              description: "Address has been auto-filled. Please verify and complete the details.",
            });
          } else {
            throw new Error('No address found');
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          toast({
            title: "Location Detection Failed",
            description: "Could not detect your address. Please enter it manually.",
            variant: "destructive",
          });
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsDetectingLocation(false);
        
        let errorMessage = "Unable to detect your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions in your browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
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

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast({
        title: "Select Address",
        description: "Please select a delivery address",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Select Payment",
        description: "Please choose a payment method",
        variant: "destructive",
      });
      return;
    }

    // For COD - Direct WhatsApp order
    if (selectedPaymentMethod === 'cod') {
      setIsProcessing(true);
      
      // Generate WhatsApp message
      const orderMessage = `🛒 *New Order - PureGrain Mills*

👤 *Customer Details:*
Name: ${selectedAddress.name}
Phone: ${selectedAddress.phone}
Address: ${selectedAddress.address}
Locality: ${selectedAddress.locality || 'N/A'}
City: ${selectedAddress.city}
State: ${selectedAddress.state || 'N/A'}
Pincode: ${selectedAddress.pincode || 'N/A'}
Address Type: ${selectedAddress.addressType.toUpperCase()}

📦 *Order Items:*
${cartItems.map(item => `- ${item.name} ${item.size ? `(${item.size})` : ''} x ${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}

💰 *Price Details:*
Subtotal: ₹${cartTotal}
Delivery Charges: ${getDeliveryCharges() === 0 ? 'FREE' : '₹' + getDeliveryCharges()}
*Total Amount: ₹${getFinalTotal()}*

💳 *Payment Method:* Cash on Delivery (COD)

Please confirm my order. Thank you!`;

      const whatsappUrl = `https://wa.me/918800953377?text=${encodeURIComponent(orderMessage)}`;
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Redirecting to WhatsApp...",
      });

      // Open WhatsApp and clear cart
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        clearCart();
        navigate('/');
      }, 1500);
      
      return;
    }

    // For online payments - Use Razorpay with backend
    if (['upi', 'card', 'netbanking', 'wallet'].includes(selectedPaymentMethod)) {
      handleOnlinePayment();
    }
  };

  const handleOnlinePayment = async () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Select Payment",
        description: "Please choose a payment method",
        variant: "destructive",
      });
      return;
    }

    // For COD - Direct success
    if (selectedPaymentMethod === 'cod') {
      setIsProcessing(true);
      setTimeout(() => {
        handlePaymentSuccess({ 
          razorpay_payment_id: 'COD_' + Date.now(),
          razorpay_order_id: 'ORDER_' + Date.now()
        });
      }, 1500);
      return;
    }

    // For online payments - Use Razorpay with backend
    if (['upi', 'card', 'netbanking', 'wallet'].includes(selectedPaymentMethod)) {
      const Razorpay = window['Razorpay'];
      
      if (!Razorpay) {
        toast({
          title: "Loading Payment Gateway",
          description: "Please wait a moment and try again...",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);

      try {
        // Step 1: Create order on backend
        const orderResponse = await fetch('http://localhost:3001/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: getFinalTotal() * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
          })
        });

        const orderData = await orderResponse.json();

        if (!orderData.success || !orderData.orderId) {
          throw new Error('Failed to create order');
        }

        // Step 2: Configure Razorpay with order_id
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.orderId, // IMPORTANT: Use order_id from backend
          name: 'PureGrain Mills',
          description: 'Multigrain Atta & Millet Snacks',
          image: window.location.origin + '/src/assets/images/logo.png',
          handler: async function (response) {
            // Step 3: Verify payment signature on backend
            try {
              const verifyResponse = await fetch('http://localhost:3001/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                // Payment verified successfully
                handlePaymentSuccess(response);
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              console.error('Verification error:', error);
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support",
                variant: "destructive",
              });
              setIsProcessing(false);
            }
          },
          prefill: {
            name: selectedAddress?.name || '',
            email: '',
            contact: selectedAddress?.phone || ''
          },
          notes: {
            address: selectedAddress ? `${selectedAddress.address}, ${selectedAddress.city}` : ''
          },
          theme: {
            color: '#2874F0'
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              toast({
                title: "Payment Cancelled",
                description: "You cancelled the payment",
              });
            }
          }
        };

        // Add payment method specific settings
        if (selectedPaymentMethod === 'upi' && upiId) {
          options.prefill.method = 'upi';
          options.prefill.vpa_upi = upiId;
        } else if (selectedPaymentMethod === 'card') {
          options.method = {
            card: 1,
            netbanking: 0,
            upi: 0,
            wallet: 0
          };
        } else if (selectedPaymentMethod === 'netbanking') {
          options.method = {
            card: 0,
            netbanking: 1,
            upi: 0,
            wallet: 0
          };
        } else if (selectedPaymentMethod === 'wallet') {
          options.method = {
            card: 0,
            netbanking: 0,
            upi: 0,
            wallet: 1
          };
        }

        // Open Razorpay modal
        const razorpayInstance = new Razorpay(options);
        razorpayInstance.on('payment.failed', function (response) {
          setIsProcessing(false);
          toast({
            title: "Payment Failed",
            description: response.error.description || "Something went wrong. Please try again.",
            variant: "destructive",
          });
          console.error('Payment failed:', response.error);
        });
        
        razorpayInstance.open();
        
      } catch (error) {
        console.error('Payment error:', error);
        setIsProcessing(false);
        toast({
          title: "Payment Error",
          description: error.message || "Failed to initialize payment. Please check if backend server is running.",
          variant: "destructive",
        });
      }
    }
  };

  const handlePaymentSuccess = (response) => {
    setIsProcessing(false);
    setCurrentStep(4);
    
    // Generate WhatsApp message
    const orderMessage = `🛒 *New Order - PureGrain Mills*
✅ *Payment Confirmed*

👤 *Customer Details:*
Name: ${selectedAddress.name}
Phone: ${selectedAddress.phone}
Address: ${selectedAddress.address}
City: ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}

📦 *Order Items:*
${cartItems.map(item => `- ${item.name} ${item.size ? `(${item.size})` : ''} x ${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}

💰 *Total Amount: ₹${getFinalTotal()}*

💳 *Payment Method:* ${selectedPaymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Razorpay)'}
🔖 *Payment ID:* ${response.razorpay_payment_id}`;

    const whatsappUrl = `https://wa.me/918800953377?text=${encodeURIComponent(orderMessage)}`;
    
    toast({
      title: "Payment Successful! 🎉",
      description: "Your order has been placed successfully",
    });

    // Open WhatsApp and clear cart
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
      navigate('/');
    }, 3000);
  };

  const getDeliveryCharges = () => cartTotal >= 500 ? 0 : 40;
  const getFinalTotal = () => cartTotal + getDeliveryCharges();

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12">
      {/* Header */}
      <div className="bg-[#2874F0] text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {currentStep === 1 && 'Delivery Address'}
            {currentStep === 2 && 'Order Summary'}
            {currentStep === 3 && 'Payment Options'}
            {currentStep === 4 && 'Order Confirmed'}
          </h1>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep < 4 && (
        <div className="bg-white shadow-sm">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(step => (
                <React.Fragment key={step}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep >= step ? 'bg-[#2874F0] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 transition-all ${currentStep > step ? 'bg-[#2874F0]' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Address */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Saved Addresses */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
                  {savedAddresses.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                      <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No saved addresses yet</p>
                      <button
                        onClick={() => setShowNewAddressForm(true)}
                        className="mt-4 px-6 py-2 bg-[#2874F0] text-white rounded-lg hover:bg-blue-600 transition-all"
                      >
                        Add New Address
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {savedAddresses.map(addr => (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddress(addr)}
                          className={`bg-white p-6 rounded-lg shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                            selectedAddress?.id === addr.id
                              ? 'border-[#2874F0] bg-blue-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#2874F0] flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold">{addr.name}</p>
                              <p className="text-sm text-gray-600 mt-1">{addr.phone}</p>
                              <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                              <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-xs rounded-full uppercase font-semibold">
                                {addr.addressType}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#2874F0] hover:text-[#2874F0] transition-all flex items-center justify-center gap-2 bg-white"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Address
                  </button>
                </div>

                {/* New Address Form */}
                {showNewAddressForm && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Add New Address</h3>
                      <button
                        onClick={useCurrentLocation}
                        disabled={isDetectingLocation}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        <Navigation className={`w-4 h-4 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                        {isDetectingLocation ? 'Detecting...' : 'Use Current Location'}
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        value={newAddress.name}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit Mobile Number *"
                        value={newAddress.phone}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                      />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                      />
                      <input
                        type="text"
                        name="locality"
                        placeholder="Locality / Area"
                        value={newAddress.locality}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                      />
                      <textarea
                        name="address"
                        placeholder="Address (House No, Building, Street, Area) *"
                        value={newAddress.address}
                        onChange={handleAddressChange}
                        rows={3}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0] resize-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="city"
                          placeholder="City / District *"
                          value={newAddress.city}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                        />
                      </div>
                      <div className="flex gap-3">
                        {['home', 'work', 'other'].map(type => (
                          <button
                            key={type}
                            onClick={() => setNewAddress(prev => ({ ...prev, addressType: type }))}
                            className={`flex-1 py-2 border rounded-lg text-sm capitalize transition-all ${
                              newAddress.addressType === type
                                ? 'border-[#2874F0] bg-blue-50 text-[#2874F0] font-semibold'
                                : 'border-gray-300 hover:border-gray-400'
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
                  className="mt-6 w-full md:w-auto px-12 py-4 bg-[#2874F0] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg"
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
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Items */}
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Order Items ({cartItems.length})</h3>
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 border-b last:border-b-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          {item.size && <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>}
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="font-semibold text-lg mt-2">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address */}
                  {selectedAddress && (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#2874F0] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Delivering to:</p>
                          <p className="text-gray-600">{selectedAddress.name} - {selectedAddress.phone}</p>
                          <p className="text-gray-600">{selectedAddress.address}</p>
                          <p className="text-gray-600">{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                  <h3 className="text-xl font-semibold mb-4">Price Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Price ({cartItems.length} items)</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charges</span>
                      <span className={getDeliveryCharges() === 0 ? 'text-green-600 font-semibold' : ''}>
                        {getDeliveryCharges() === 0 ? 'FREE' : `₹${getDeliveryCharges()}`}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Amount Payable</span>
                      <span className="text-[#2874F0]">₹{getFinalTotal()}</span>
                    </div>
                  </div>

                  {getDeliveryCharges() > 0 && (
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-700">
                        Add ₹{500 - cartTotal} more for FREE delivery
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="mt-6 w-full py-4 bg-[#2874F0] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg"
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
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Payment Methods */}
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
                
                  {/* COD - Primary Option */}
                  <div
                    onClick={() => setSelectedPaymentMethod('cod')}
                    className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      selectedPaymentMethod === 'cod' ? 'border-[#2874F0] ring-2 ring-blue-100' : 'border-gray-200'
                    }`}
                  >
                    <div className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Banknote className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-500">Pay when you receive the order</p>
                      </div>
                      {selectedPaymentMethod === 'cod' && <CheckCircle className="w-6 h-6 text-[#2874F0]" />}
                    </div>
                    <div className="px-5 py-3 bg-green-50 border-t">
                      <p className="text-sm text-green-700">✓ Order will be sent to WhatsApp for confirmation</p>
                    </div>
                  </div>
                
                  {/* Online Payment - Secondary Option */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">Online Payment (Coming Soon)</p>
                    <div className="grid grid-cols-3 gap-3 opacity-50">
                      <div className="bg-white border rounded-lg p-3 text-center">
                        <Smartphone className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                        <p className="text-xs text-gray-500">UPI</p>
                      </div>
                      <div className="bg-white border rounded-lg p-3 text-center">
                        <CreditCard className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                        <p className="text-xs text-gray-500">Cards</p>
                      </div>
                      <div className="bg-white border rounded-lg p-3 text-center">
                        <Building2 className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                        <p className="text-xs text-gray-500">Net Banking</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate flex-1">{item.name} x {item.quantity}</span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#2874F0]">₹{getFinalTotal()}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={!selectedPaymentMethod || isProcessing}
                    className="mt-6 w-full py-4 bg-[#2874F0] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isProcessing ? (
                      <>Processing Order...</>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Place Order - ₹{getFinalTotal()}
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 justify-center">
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
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-3">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">Thank you for shopping with PureGrain Mills</p>
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <p className="text-sm text-green-700 mb-2">✓ Order confirmation sent to WhatsApp</p>
                  <p className="text-sm text-green-700">Redirecting to homepage...</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        {currentStep < 4 && currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="mt-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        )}
      </div>
    </div>
  );
}
