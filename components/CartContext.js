"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, quantity = 1) => {
    const qty = Math.max(1, quantity);
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQuantity = (slug, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.slug === slug
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const setQuantity = (slug, quantity) => {
    const qty = Math.max(0, quantity);
    setItems((prev) =>
      prev
        .map((item) =>
          item.slug === slug ? { ...item, quantity: qty } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const value = useMemo(() => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return {
      items,
      totalCount,
      addItem,
      updateQuantity,
      setQuantity,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


