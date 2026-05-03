"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

// ─── Types ─────────────────────────────────────────────────
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  volume?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isHydrated: boolean;
};

// ─── Context ───────────────────────────────────────────────
const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "naturoamrit-cart";

// ─── Provider ──────────────────────────────────────────────
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) setCart(JSON.parse(data));
    } catch (e) {
      console.error("Cart parse error", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  // ─── Actions ─────────────────────────────────────────────
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  // ─── Derived State (IMPORTANT FIX) ───────────────────────
  const getTotalItems = useMemo(
    () => () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  const getTotalPrice = useMemo(
    () => () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isHydrated,
    }),
    [cart, getTotalItems, getTotalPrice, isHydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside provider");
  return ctx;
};