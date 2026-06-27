import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, MessageCircle, X, Package, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/component/ui/sheet";

export default function CartDrawer({ children = null }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  // Autofill city from pincode using Nominatim (OpenStreetMap) — no key, CORS-friendly
  const handlePincodeChange = async (value) => {
    // Only allow digits, max 6
    const digits = value.replace(/\D/g, '').slice(0, 6);
    setCustomerDetails(prev => ({ ...prev, pincode: digits, city: digits.length < 6 ? '' : prev.city }));
    setErrors(prev => ({ ...prev, pincode: false, city: false }));
    setPincodeError('');

    if (digits.length === 6) {
      setPincodeLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${digits}&country=India&format=json&addressdetails=1&limit=1`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        if (data && data.length > 0) {
          const addr = data[0].address;
          // Pick the most specific available city-level field
          const city =
            addr.city ||
            addr.town ||
            addr.county ||
            addr.state_district ||
            addr.district ||
            addr.village ||
            '';
          if (city) {
            setCustomerDetails(prev => ({ ...prev, city }));
            setErrors(prev => ({ ...prev, city: false }));
          } else {
            setPincodeError('Location found but city unclear. Please enter city manually.');
          }
        } else {
          setPincodeError('Invalid pincode. Please check and try again.');
          setCustomerDetails(prev => ({ ...prev, city: '' }));
        }
      } catch {
        setPincodeError('Could not fetch location. Please enter city manually.');
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  // Phone: only allow digits, max 10
  const handlePhoneChange = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    setCustomerDetails(prev => ({ ...prev, phone: digits }));
    setErrors(prev => ({ ...prev, phone: false }));
  };

  const validate = () => {
    const e = {};
    if (!customerDetails.name.trim()) e.name = 'Name is required';
    if (!customerDetails.phone.trim() || customerDetails.phone.length !== 10)
      e.phone = 'Enter a valid 10-digit phone number';
    if (!customerDetails.address.trim()) e.address = 'Address is required';
    if (!customerDetails.city.trim()) e.city = 'City is required';
    if (!customerDetails.pincode.trim() || customerDetails.pincode.length !== 6)
      e.pincode = 'Enter a valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendToWhatsApp = () => {
    if (!validate()) return;

    const orderMessage = `*New Order from Pure Grain Mill*

*Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}, ${customerDetails.city} - ${customerDetails.pincode}

*Order Items:*
${cartItems.map(item => `• ${item.name} (${item.size || 'Default'}) x${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}

*Total Amount: ₹${cartTotal}*

Please confirm my order.`;

    window.open(`https://wa.me/918800953377?text=${encodeURIComponent(orderMessage)}`, '_blank');
    clearCart();
    setShowForm(false);
    setCustomerDetails({ name: '', phone: '', address: '', city: '', pincode: '' });
    setErrors({});
    setPincodeError('');
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-sans bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300'
        : 'border-border focus:ring-accent/30'
    }`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <button
            type="button"
            className="relative min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full p-2 text-foreground hover:bg-muted transition-colors"
            aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ', empty'}`}
          >
            <ShoppingCart className="w-6 h-6 shrink-0" aria-hidden />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-[420px] p-0 max-h-[100dvh] border-l border-border/40">
        {/* Header */}
        <SheetHeader className="px-6 pt-5 pb-4 border-b border-border/40 flex-shrink-0">
          <div className="flex items-center gap-3 pr-10">
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-4 h-4 text-accent" />
            </div>
            <div>
              <SheetTitle className="font-serif text-xl leading-none">Your Cart</SheetTitle>
              {cartCount > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="self-start ml-12 text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
            >
              Clear all items
            </button>
          )}
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-5">
                <Package className="w-9 h-9 text-muted-foreground/50" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Add some wholesome products to get started.
              </p>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-3">
              {cartItems.map((item) => {
                const price = typeof item.price === 'number'
                  ? item.price
                  : parseInt(item.price?.toString().replace(/[^\d]/g, '')) || 0;

                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3 p-3 bg-muted/40 rounded-2xl border border-border/30"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-sans font-semibold text-foreground text-sm leading-snug truncate">
                            {item.name}
                          </h4>
                          {item.size && (
                            <span className="inline-block mt-1 text-[11px] text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                              {item.size}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-1 bg-background border border-border/60 rounded-lg px-1 py-0.5">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold min-w-[1.25rem] text-center tabular-nums text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-sans font-bold text-foreground text-sm">
                          ₹{price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="flex-shrink-0 border-t border-border/40 bg-background">

            {/* Delivery form */}
            {showForm && (
              <div className="px-6 pt-5 pb-3 space-y-3 border-b border-border/40 overflow-y-auto max-h-[50vh]">
                <p className="font-sans font-semibold text-sm text-foreground">Delivery Details</p>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={customerDetails.name}
                    onChange={(e) => { setCustomerDetails(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium select-none">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit phone number *"
                      value={customerDetails.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      maxLength={10}
                      className={`${inputClass('phone')} pl-12`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <textarea
                    placeholder="Full Address *"
                    value={customerDetails.address}
                    onChange={(e) => { setCustomerDetails(p => ({ ...p, address: e.target.value })); setErrors(p => ({ ...p, address: '' })); }}
                    rows={2}
                    className={`${inputClass('address')} resize-none`}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>

                {/* Pincode + City */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Pincode *"
                        value={customerDetails.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        maxLength={6}
                        className={inputClass('pincode')}
                      />
                      {pincodeLoading && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent animate-spin" />
                      )}
                    </div>
                    {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                    {pincodeError && <p className="text-xs text-red-500 mt-1">{pincodeError}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="City *"
                      value={customerDetails.city}
                      onChange={(e) => { setCustomerDetails(p => ({ ...p, city: e.target.value })); setErrors(p => ({ ...p, city: '' })); }}
                      className={inputClass('city')}
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>
                </div>
                {customerDetails.city && !pincodeLoading && (
                  <p className="text-xs text-green-600">📍 Location: {customerDetails.city}</p>
                )}
              </div>
            )}

            <div className="px-6 py-5 space-y-3">
              {/* Order total */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Order Total</p>
                  <p className="font-serif text-2xl font-semibold text-foreground leading-none mt-0.5">₹{cartTotal}</p>
                </div>
                <span className="text-[11px] font-semibold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                  Free Delivery ✓
                </span>
              </div>

              {/* CTA */}
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 active:scale-[0.98] transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Order on WhatsApp
                  </button>
                  <button
                    onClick={() => { setShowForm(false); setErrors({}); setPincodeError(''); }}
                    className="w-full py-3 border border-border text-muted-foreground rounded-xl font-medium text-sm hover:bg-muted transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
