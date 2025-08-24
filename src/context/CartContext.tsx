import React, { createContext, useContext, useState, ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
