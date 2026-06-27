import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-stone-900 to-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img
                src={logoImg}
                alt="Pure Grain Mills"
                className="h-24 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              From our stone-ground mills to your kitchen — bringing you the purest, most nutritious grain products with zero preservatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-amber-400">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-stone-300 hover:text-amber-400 transition-colors">Home</Link>
              <Link to="/products" className="block text-sm text-stone-300 hover:text-amber-400 transition-colors">All Products</Link>
              <Link to="/about" className="block text-sm text-stone-300 hover:text-amber-400 transition-colors">About Us</Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-amber-400">Products</h4>
            <div className="space-y-2">
              <Link to="/product/multigrain-atta" className="block text-sm text-stone-300 hover:text-amber-400 transition-colors">Multigrain Atta</Link>
              <Link to="/product/sugar-control-atta" className="block text-sm text-stone-300 hover:text-amber-400 transition-colors">Sugar-Control Atta</Link>
              <Link to="/product/mixed-millet-murmura" className="block text-sm text-stone-300 hover:text-amber-400 transition-colors">Mixed Millet Murmura</Link>
              <Link to="/product/kids-millet-murmura" className="block text-sm text-stone-300 hover:text-amber-400 transition-colors">Kids Special Murmura</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-amber-400">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+918800953377" className="flex items-center gap-2 text-sm text-stone-300 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 88009 53377</span>
              </a>
              <a href="mailto:puregrainmills@gmail.com" className="flex items-center gap-2 text-sm text-stone-300 hover:text-amber-400 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>puregrainmills@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-stone-300">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-xs text-stone-400">© 2026 PureGrain Mills. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
