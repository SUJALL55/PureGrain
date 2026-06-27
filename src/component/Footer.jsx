import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Instagram, Wheat } from 'lucide-react';
import navbarLogo from '../assets/images/navbar-logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Story', to: '/story' },
  { label: 'Products', to: '/products' },
  { label: 'Why Choose Us', to: '/why-us' },
  { label: 'Contact', to: '/contact' },
];

function FooterLink({ to, children }) {
  const location = useLocation();
  
  const handleClick = () => {
    // Scroll to top when clicking any footer link
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className="block min-h-[44px] py-2.5 font-sans text-background/60 hover:text-accent transition-colors text-sm sm:text-base leading-snug"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={navbarLogo}
                alt="PureGrain Mills Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="font-sans text-background/60 leading-relaxed mb-6 text-sm">
              To bring time-honoured grains and mindful milling into every home for healthier everyday living — without compromising the taste.
            </p>
            <p className="font-serif text-lg italic text-accent">Mill से दिल तक</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans font-semibold text-background mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <a href="tel:+918800953377" className="flex min-h-[44px] items-center gap-3 text-background/60 hover:text-accent transition-colors text-sm sm:text-base">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 88009 53377</span>
              </a>
              <a href="mailto:puregrainmills@gmail.com" className="flex min-h-[44px] items-center gap-3 text-background/60 hover:text-accent transition-colors text-sm sm:text-base">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>puregrainmills@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/puregrainmills" target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-3 text-background/60 hover:text-accent transition-colors text-sm sm:text-base">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <span>@puregrainmills</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-sans font-semibold text-background mb-6">Quick Links</h3>
            <div className="space-y-3">
              {navLinks.map(link => (
                <FooterLink key={link.to} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-background/30">© {new Date().getFullYear()} PureGrain Mills. All rights reserved.</p>
          <p className="font-sans text-xs text-background/30">FSSAI License: 13323990000327</p>
        </div>
      </div>
    </footer>
  );
}