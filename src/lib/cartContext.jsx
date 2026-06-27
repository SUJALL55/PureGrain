import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('pgm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pgm_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant) => {
    setCart(prev => {
      const key = `${product.id}-${variant.weight}`;
      const existing = prev.find(item => item.key === key);
      if (existing) {
        return prev.map(item =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { key, product, variant, qty: 1 }];
    });
  };

  const removeFromCart = (key) => {
    setCart(prev => prev.filter(item => item.key !== key));
  };

  const updateQty = (key, qty) => {
    if (qty <= 0) {
      removeFromCart(key);
      return;
    }
    setCart(prev => prev.map(item => item.key === key ? { ...item, qty } : item));
  };

  const clearCart = () => setCart([]);

  const getItemQty = (productId, weight) => {
    const key = `${productId}-${weight}`;
    const item = cart.find(item => item.key === key);
    return item ? item.qty : 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.variant.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice, getItemQty }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);