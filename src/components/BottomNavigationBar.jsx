import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, RotateCcw, ShoppingBasket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cartContext';

export default function BottomNavigationBar() {
  const location = useLocation();
  const { totalItems } = useCart();
  const [animateCart, setAnimateCart] = useState(false);
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems);

  // Trigger cart animation when items change
  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems]);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Categories', icon: LayoutGrid, path: '/products?tab=categories' },
    { name: 'Buy Again', icon: RotateCcw, path: '/products?tab=buy-again' },
    { name: 'Basket', icon: ShoppingBasket, path: '/cart' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-50">
      <div className="flex justify-around items-center h-16 sm:h-20 max-w-7xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path.includes('?') && location.search.includes(item.path.split('?')[1]));
          const isBasket = item.name === 'Basket';
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-[64px] transition-all duration-300 ${
                isActive ? 'text-[#E67E22]' : 'text-[#95A5A6] hover:text-[#E67E22]'
              }`}
            >
              <div className="relative">
                {isBasket ? (
                  <motion.div
                    animate={animateCart ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                  </motion.div>
                ) : (
                  <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                )}
                
                {/* Cart badge */}
                {isBasket && totalItems > 0 && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
              
              <span className={`text-[11px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
