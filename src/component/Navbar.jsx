import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderModal from './OrderModal';
import CartDrawer from './CartDrawer';
import { useCart } from '@/lib/CartContext';
import navbarLogo from '../assets/images/navbar-logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Story', to: '/story' },
  { label: 'Products', to: '/products' },
  { label: 'Why Choose Us', to: '/why-us' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev || '';
    return () => { document.body.style.overflow = prev || ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const transparent = isHome && !scrolled;

  return (
    <>
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${
        transparent ? 'bg-transparent' : 'bg-background/90 backdrop-blur-xl shadow-sm border-b border-border/50'
      }`}
    >
      <div className="w-full px-4 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between min-h-[4.25rem] h-[4.25rem] sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex min-h-[44px] min-w-[44px] items-center gap-2.5 px-2 -ml-2 rounded-lg group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <img 
              src={navbarLogo}
              alt="" 
              className="h-14 w-auto sm:h-16 md:h-20 max-h-[4.75rem] object-contain transition-transform duration-300 group-hover:scale-105"
              width={180}
              height={80}
              decoding="async"
            />
            <span className="sr-only">PureGrain Mills, home</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 min-h-[44px] ${
                    active
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/50">
              <CartDrawer />
              <button
                onClick={() => setOrderOpen(true)}
                className="min-h-[44px] px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 inline-flex items-center justify-center"
              >
                Order Now
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-1 md:hidden shrink-0">
            <CartDrawer />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-foreground hover:bg-muted/80 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-7 h-7" aria-hidden /> : <Menu className="w-7 h-7" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-t border-border max-h-[min(70vh,calc(100dvh-6rem))] overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map(link => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block min-h-[48px] flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      active ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); setOrderOpen(true); }}
                  className="block w-full min-h-[48px] text-center px-8 py-3.5 bg-accent text-accent-foreground rounded-full font-semibold"
                >
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
    </>
  );
}