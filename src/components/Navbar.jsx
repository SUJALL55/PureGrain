import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import LocationModal from './LocationModal';
import { toast } from 'sonner';
import logoImg from '../assets/images/logo.png';
import navbarBgImg from '../assets/images/navbar-bg.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [address, setAddress] = useState('Select Location');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is logged in on mount
    const userPhone = localStorage.getItem('pgm_user_phone');
    const name = localStorage.getItem('pgm_user_name');
    
    if (userPhone) {
      setIsLoggedIn(true);
      if (name) setUserName(name);
    }

    const savedAddress = localStorage.getItem('user_address');
    if (savedAddress) {
      // Clean up pincode from saved address if present
      const cleanedAddress = savedAddress.split(',').filter(p => !/\d{5,6}/.test(p)).join(',').trim();
      setAddress(cleanedAddress);
    }
  }, []);

  const handleAddressSelect = (newAddress) => {
    // Clean up pincode from new address if present
    const cleanedAddress = newAddress.split(',').filter(p => !/\d{5,6}/.test(p)).join(',').trim();
    setAddress(cleanedAddress);
    localStorage.setItem('user_address', cleanedAddress);
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('pgm_user_phone');
    localStorage.removeItem('pgm_user_email');
    localStorage.removeItem('pgm_user_name');
    
    setIsLoggedIn(false);
    setUserName('');
    
    toast.success('Logged out successfully');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white shadow-sm border-b border-stone-100 relative">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${navbarBgImg})`,
          }}
        />
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-24 sm:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
            <div className="bg-white w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-xl border border-stone-100 flex items-center justify-center overflow-hidden">
              <img
                src={logoImg}
                alt="Pure Grain Mills"
                className="h-16 sm:h-20 w-auto object-contain scale-[1.4]"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors">
              About
            </Link>
          </div>

          {/* User Profile / Login */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 rounded-full border border-amber-100 transition-all"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span className="text-xs sm:text-sm font-semibold text-amber-700">{userName || 'User'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-full border border-red-200 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span className="text-xs sm:text-sm font-semibold text-red-600 hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-bold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-md active:scale-95"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Static Brand Bar - attached with header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-1.5 border-t border-amber-400/20 shadow-inner">
        <div className="whitespace-nowrap text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest text-center">
          Milled fresh, packed after your order
        </div>
      </div>

      {/* Location/Delivery Header - repositioned under moving bar */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Address */}
          <div 
            onClick={() => setIsLocationModalOpen(true)}
            className="flex-1 flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <Home className="w-5 h-5 text-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black uppercase tracking-wider text-gray-900">Delivery Address</span>
              </div>
              <p className="text-sm text-gray-500 truncate font-medium">{address}</p>
            </div>
          </div>

          {/* Delivery Time Button */}
          <div className="bg-[#6200EA] text-white rounded-[14px] px-4 py-2 flex flex-col items-center justify-center shadow-lg shadow-purple-100 shrink-0 cursor-default">
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-90 leading-none mb-0.5">Delivery in</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-black leading-none">24</span>
              <span className="text-[10px] font-bold leading-none">hrs</span>
            </div>
          </div>
        </div>
      </div>

      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
        onAddressSelect={handleAddressSelect}
      />
    </nav>
    </>
  );
}
