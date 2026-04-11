"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsLoading(true);
    // Navigate to checkout page
    window.location.href = "/checkout";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="font-serif text-4xl font-bold text-slate-900 mb-3">
              Your cart is empty
            </h1>
            <p className="text-stone-600 mb-8 text-lg">
              Explore our collection of premium Ayurvedic juices and add items to your cart.
            </p>
            <Link
              href="/juices"
              className="inline-block bg-yellow-500 text-slate-900 font-semibold px-8 py-4 rounded-lg hover:bg-yellow-400 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const tax = Math.round(total * 0.05); // 5% tax
  const grandTotal = total + tax;

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link href="/juices" className="text-yellow-600 hover:text-yellow-700 font-medium mb-6 inline-block">
            ← Back to Juices
          </Link>
          <h1 className="font-serif text-4xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="text-stone-600 mt-2">{cart.length} item{cart.length !== 1 ? "s" : ""} in cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-stone-200 p-6 flex gap-6 hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-stone-50 rounded-lg flex items-center justify-center border border-stone-200">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="text-3xl">🧃</div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">{item.name}</h3>
                    {item.volume && (
                      <p className="text-sm text-stone-500 mb-3">{item.volume}</p>
                    )}
                    <p className="text-yellow-600 font-bold text-lg">₹{item.price}</p>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>

                    <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-2 text-slate-600 hover:bg-stone-200 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2 text-slate-600 hover:bg-stone-200 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-stone-500 mb-1">Subtotal</p>
                      <p className="text-lg font-bold text-slate-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="mt-6 text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-stone-200 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-stone-200">
                <div className="flex justify-between text-stone-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Tax (5%)</span>
                  <span className="font-medium">₹{tax}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 text-lg">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-bold text-yellow-600">₹{grandTotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading || cart.length === 0}
                className="w-full bg-yellow-500 text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Proceed to Checkout"}
              </button>

              <Link
                href="/juices"
                className="block text-center mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
