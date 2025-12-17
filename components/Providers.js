"use client";

import { CartProvider } from "./CartContext";
import CartDrawer from "./CartDrawer";

export default function Providers({ children }) {
  return (
    <CartProvider>
      <CartDrawer />
      {children}
    </CartProvider>
  );
}


