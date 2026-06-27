import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, MapPin, MessageCircle, Clock, Send, Wheat } from 'lucide-react';
import familyKitchen from '../assets/images/family-kitchen.png';

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { icon: Phone, label: 'Phone / WhatsApp', value: '+91 88009 53377', href: 'tel:+918800953377' },
  { icon: Mail, label: 'Email', value: 'puregrainmills@gmail.com', href: 'mailto:puregrainmills@gmail.com' },
  { icon: Instagram, label: 'Instagram', value: '@puregrainmills', href: 'https://www.instagram.com/puregrainmills' },
  { icon: MapPin, label: 'Location', value: 'Delhi NCR, India', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon – Sat, 9am – 7pm', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', interest: 'Multigrain Atta' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const waMsg = `Hi PureGrain Mills!

Name: ${form.name}
Interest: ${form.interest}
Message: ${form.message}

Contact Details:
Email: ${form.email}
Phone: ${form.phone}`;
    window.open(`https://wa.me/918800953377?text=${encodeURIComponent(waMsg)}`, '_blank');
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '', interest: 'Multigrain Atta' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={familyKitchen} alt="Home kitchen" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Get in Touch</p>
            <h1 className="font-serif text-5xl md:text-7xl text-background leading-tight mb-6">
              We'd Love to <em className="text-accent">Hear</em>
              <br />From You
            </h1>
            <p className="font-sans text-lg text-background/70 max-w-xl mx-auto">
              Whether you want to place an order, ask about our products, or just say hello — we're always here.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <FadeIn>
              <div>
                <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">Contact Details</p>
                <h2 className="font-serif text-4xl text-foreground mb-10">Let's Start a <em>Conversation</em></h2>

                <div className="space-y-6 mb-12">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-5">
                      <div className="w-13 h-13 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-sans font-medium text-foreground hover:text-accent transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-sans font-medium text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/918800953377"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-green-500 text-white rounded-tl-[30px] rounded-br-[30px] px-8 py-5 hover:bg-green-600 transition-colors shadow-lg"
                >
                  <MessageCircle className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <p className="font-sans font-bold text-lg">Chat on WhatsApp</p>
                    <p className="font-sans text-sm text-white/80">Fastest way to place an order</p>
                  </div>
                </a>

                {/* FSSAI */}
                <div className="mt-10 flex items-center gap-4 bg-muted rounded-2xl p-5">
                  <Wheat className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <p className="font-sans font-semibold text-foreground text-sm">FSSAI Certified</p>
                    <p className="font-sans text-xs text-muted-foreground">License No: 13323990000327</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Enquiry Form */}
            <FadeIn delay={0.2}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full bg-muted rounded-tl-[60px] rounded-br-[60px] p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                    <MessageCircle className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-serif text-3xl text-foreground mb-4">Opening WhatsApp!</h3>
                  <p className="font-sans text-muted-foreground mb-6">Your message has been prepared. Complete it on WhatsApp to reach us instantly.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium text-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-muted rounded-tl-[60px] rounded-br-[60px] p-10 lg:p-12">
                  <h3 className="font-serif text-2xl text-foreground mb-8">Send an Enquiry</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Your Name *</label>
                        <input required value={form.name} autoComplete="name" onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Priya Sharma" className="w-full px-5 py-3.5 min-h-[48px] bg-background rounded-xl border border-border text-foreground font-sans text-base focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-muted-foreground/50" />
                      </div>
                      <div>
                        <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Phone *</label>
                        <input required value={form.phone} type="tel" inputMode="tel" autoComplete="tel" onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full px-5 py-3.5 min-h-[48px] bg-background rounded-xl border border-border text-foreground font-sans text-base focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-muted-foreground/50" />
                      </div>
                    </div>
                    <div>
                      <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Email *</label>
                      <input required type="email" value={form.email} autoComplete="email" onChange={e => setForm({ ...form, email: e.target.value })} placeholder="priya@email.com" className="w-full px-5 py-3.5 min-h-[48px] bg-background rounded-xl border border-border text-foreground font-sans text-base focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-muted-foreground/50" />
                    </div>
                    <div>
                      <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Interested In *</label>
                      <select required value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} className="w-full px-5 py-3.5 min-h-[48px] bg-background rounded-xl border border-border text-foreground font-sans text-base focus:outline-none focus:ring-2 focus:ring-accent/30 cursor-pointer">
                        <option>Multigrain Atta</option>
                        <option>Sugar Control Atta</option>
                        <option>Millet Murmura (Kid-Friendly)</option>
                        <option>Mixed Millet Murmura</option>
                        <option>Bulk / Wholesale Order</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Message *</label>
                      <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help you..." rows={4} className="w-full px-5 py-3.5 min-h-[7rem] bg-background rounded-xl border border-border text-foreground font-sans text-base leading-normal focus:outline-none focus:ring-2 focus:ring-accent/30 resize-y placeholder:text-muted-foreground/50" />
                    </div>
                    <button type="submit" className="w-full flex min-h-[52px] items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-xl text-base font-semibold hover:opacity-90 transition-opacity">
                      <Send className="w-4 h-4" />
                      Send via WhatsApp
                    </button>
                    <p className="font-sans text-xs text-muted-foreground text-center">This will open WhatsApp with your message pre-filled.</p>
                  </form>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-accent font-sans font-semibold text-xs tracking-widest uppercase mb-4">FAQ</p>
              <h2 className="font-serif text-4xl text-foreground">Common <em>Questions</em></h2>
            </FadeIn>
          </div>
          {[
            { q: 'How do I place an order?', a: 'Simply click "Order on WhatsApp" and message us directly. We\'ll guide you through the process and confirm your order quickly.' },
            { q: 'What sizes are available for the atta?', a: 'Our atta is available in 1 KG, 5 KG, and 10 KG packs to suit different family needs.' },
            { q: 'Do you deliver to my city?', a: 'We currently serve Delhi NCR and are expanding rapidly. WhatsApp us to check delivery availability in your area.' },
            { q: 'Is there a minimum order?', a: 'No minimum order for retail customers. For bulk/wholesale orders, please contact us directly.' },
            { q: 'Are your products certified?', a: 'Yes! All our products are FSSAI certified (License: 13323990000327) and processed under strict hygiene conditions.' },
          ].map((faq, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-background rounded-tl-[20px] rounded-br-[20px] p-7 mb-4">
                <h4 className="font-sans font-semibold text-foreground mb-2">{faq.q}</h4>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}