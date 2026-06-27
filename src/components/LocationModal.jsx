import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LocationModal({ isOpen, onClose, onAddressSelect }) {
  const [manualAddress, setManualAddress] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleSave = () => {
    if (manualAddress.trim()) {
      onAddressSelect(manualAddress);
      onClose();
    }
  };

  const handleUseCurrentLocation = async () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation is not supported by your browser. Please enter your address manually.");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('Location found:', latitude, longitude);
          
          // Using Nominatim OpenStreetMap for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'PureGrainMill/1.0'
              }
            }
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch address');
          }
          
          const data = await response.json();
          
          // Try to get a more readable address
          let address = '';
          if (data.address) {
            const addr = data.address;
            const parts = [];
            if (addr.road) parts.push(addr.road);
            if (addr.suburb || addr.neighbourhood) parts.push(addr.suburb || addr.neighbourhood);
            if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);
            if (addr.state) parts.push(addr.state);
            address = parts.join(', ') || data.display_name.split(',').filter(p => !/\d{5,6}/.test(p)).join(',').trim();
          } else {
            address = (data.display_name || "").split(',').filter(p => !/\d{5,6}/.test(p)).join(',').trim() || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          }
          
          console.log('Address found:', address);
          toast.success('Location found successfully!');
          onAddressSelect(address);
          onClose();
        } catch (error) {
          console.error("Error getting address:", error);
          toast.error('Could not fetch address. Using coordinates instead.');
          // Fallback to coordinates
          const fallbackAddress = `Lat: ${position.coords.latitude.toFixed(6)}, Long: ${position.coords.longitude.toFixed(6)}`;
          onAddressSelect(fallbackAddress);
          onClose();
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsGettingLocation(false);
        
        let errorMessage = 'Could not get your location. ';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Location permission denied. Please enable location access in your browser settings and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information unavailable. Please try again or enter manually.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again or enter manually.';
            break;
          default:
            errorMessage += 'Please enter your address manually.';
        }
        
        toast.error(errorMessage, { duration: 5000 });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[4px]"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden p-6 sm:p-8 pb-10 sm:pb-8 mb-[env(safe-area-inset-bottom)]"
          >
            {/* Safe Area Padding for Mobile Bottom Nav */}
            <div className="sm:hidden h-2" /> 

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Add Address</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X className="w-6 h-6 text-stone-500" />
              </button>
            </div>

            {/* Use Current Location Section */}
            <button
              onClick={handleUseCurrentLocation}
              disabled={isGettingLocation}
              className="w-full flex items-center gap-4 p-4 bg-[#FFF5F7] rounded-[20px] border border-[#FFE4E9] hover:bg-[#FFE4E9] transition-all group mb-8 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
                {isGettingLocation ? (
                  <Loader2 className="w-5 h-5 text-[#E91E63] animate-spin" />
                ) : (
                  <Navigation className="w-5 h-5 text-[#E91E63] fill-[#E91E63] -rotate-45" />
                )}
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-[#D81B60] leading-tight">
                  {isGettingLocation ? 'Finding Location...' : 'Use Current Location'}
                </p>
                <p className="text-sm font-medium text-[#FF80AB]">
                  {isGettingLocation ? 'Please wait...' : 'Using GPS to find your address'}
                </p>
              </div>
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 mb-8">
              <div className="flex-1 h-[1px] bg-gray-100"></div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">OR ENTER MANUALLY</span>
              <div className="flex-1 h-[1px] bg-gray-100"></div>
            </div>

            {/* Manual Entry Section */}
            <div className="space-y-6 pb-4">
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                  <MapPin className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="Enter your full address..."
                  className="w-full pl-14 pr-4 py-5 bg-[#F8F9FA] border border-gray-100 rounded-[20px] text-gray-900 font-medium placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-200 outline-none transition-all"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={!manualAddress.trim()}
                className="w-full py-5 bg-[#1A1A1A] text-white rounded-[20px] font-bold text-lg shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all mb-4"
              >
                Save Address
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
