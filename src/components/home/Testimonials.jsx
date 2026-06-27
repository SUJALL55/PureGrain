import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const googleReviewsUrl =
  "https://www.google.com/search?client=ms-android-realme-terr1-rso2&hs=Tkpp&sca_esv=236bc161f81c4548&sxsrf=ANbL-n4k_sh9sVFPPXHPJkphjraS1XRx-A:1777984370562&q=puregrain+mills+gurugram+reviews&uds=ALYpb_nSMcH7r5OmzQaKvhaScBuEQZZj0PF2e-irx1nSYUU-tpLFeFTDaiBgcT6bqx0D8lPIO91fD-EQKxz8hsjMbvt8XSktkoDPRTBG8mQbl7Sf3c_zfDzArB55pr3PkFX-78Nfu7XYKoVk-465jKwM3gvlLr4pA4VnWS9ix5GsCHhJj3yQtWcLN55ERxL_b-4kP0cwmYsu_ylJvRNjrr-qz1qDu6vOEdcsUyHxTec2iqiQ3Ywy989-MBVdrG5G5iEdBbBP4BSZnQh8-5zkVlYJ7YD61T6iLH4XNv26vhzpIhpkk8DBzCCPyJt06fh1QELvSFLekdD588H9iVS6pnjiv2IGUgd8iscUyHcN3rYp6nq5uGNyt9uY3kovl39ylO1PuojjHNnnQqU0yyL0RM11V73YWb73fQ&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaCxQy1C8ngEyn-afE1sG1EX2jX25TYkj3hCEtf_77PCl88JgDG-XF5xiAoOKFNvjd9lm6myKfXbwixV7JXhKG0U4s8xMlNjusoT9Wa4xyV1z8jUZw%3D%3D&sa=X&ved=2ahUKEwjA-Mr2k6KUAxWGd2wGHdzONqsQk8gLegQIHRAB&ictx=1&biw=360&bih=692&dpr=3";

const googleReviewCards = [
  {
    name: "Sagar Bhalero",
    text: "Good quality, reasonable price, and reliable brand. Pureagrain Mills never disappoints.",
    rating: 5,
  },
  {
    name: "Manisha Sharan",
    text: "PureGrain Mills truly stands out for its fresh and high-quality products. 🌾 They offer a wide range of healthy flours and nutritious grain options. Everything feels natural, pure, and carefully prepared. Perfect choice for families who prefer healthy eating. Highly recommend for quality you can trust! 💛",
    rating: 5,
  },
  {
    name: "Sandeep Gera",
    text: "Recently tried PureGrain Mills mixture, and it was an absolute delight! The taste is incredibly flavorful and satisfying, with wonderful, high-quality ingredients that shine through every bite. Plus, it's super hygienic—perfect for family snacking. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Loved By Families</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Real Google Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {googleReviewCards.map((r, i) => (
            <motion.a
              key={i}
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">G</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-body font-semibold text-sm text-foreground">{r.name}</span>
                  <span className="text-xs text-primary font-medium">View on Google</span>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{r.text}"</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}