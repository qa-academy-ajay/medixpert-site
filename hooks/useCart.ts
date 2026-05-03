import { useState } from "react";
import { juices } from "@/lib/data";

type Cart = Record<string, number>;

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({});

  const addToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) - 1;

      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }

      return { ...prev, [id]: qty };
    });
  };

  const clearCart = () => setCart({});

  const getTotalItems = () =>
    Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const getTotalPrice = () =>
    Object.entries(cart).reduce((total, [id, qty]) => {
      const juice = juices.find((j) => j.id === id);
      return total + (juice?.price || 0) * qty;
    }, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
};