import React from 'react';
import { Phone, Mail, Instagram, Wheat, MapPin } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Wheat className="w-7 h-7 text-accent" />
              <span className="font-serif text-2xl text-background">PureGrain Mills</span>
            </div>
            <p className="font-sans text-background/60 leading-relaxed mb-6">
              To bring time-honoured grains and mindful milling into every home for healthier everyday living without compromising the taste.
            </p>
            <p className="font-serif text-lg italic text-accent">Mill से दिल तक</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans font-semibold text-background mb-6 text-lg">Get in Touch</h3>
            <div className="space-y-4">
              <a href="tel:+918800953377" className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-sans">+91 88009 53377</span>
              </a>
              <a href="mailto:puregrainmills@gmail.com" className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
                <span className="font-sans">puregrainmills@gmail.com</span>
              </a>
              <a
                href="https://www.instagram.com/puregrainmills"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-background/70 hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-sans">@puregrainmills</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-semibold text-background mb-6 text-lg">Quick Links</h3>
            <div className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'About Us', href: '#about' },
                { label: 'Our Story', href: '#story' },
                { label: 'Products', href: '#products' },
                { label: 'Why Choose Us', href: '#why-us' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block font-sans text-background/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-background/40">
            © {new Date().getFullYear()} PureGrain Mills. All rights reserved.
          </p>
          <p className="font-sans text-sm text-background/40">
            FSSAI License: 13323990000327
          </p>
        </div>
      </div>
    </footer>
  );
}