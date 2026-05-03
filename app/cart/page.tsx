"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isHydrated,
  } = useCart();

  // ✅ Prevent hydration flicker (CRITICAL FIX)
  if (!isHydrated) return null;

  // ✅ Empty Cart UI
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
              Add some fresh juices to get started.
            </p>

            <Link
              href="/#juices"
              className="inline-block bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-emerald-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Calculations (corrected)
  const subtotal = getTotalPrice();
  const tax = Math.round(subtotal * 0.05);
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    router.push("/checkout-summary"); // ✅ FIXED (no flicker)
  };

  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/#juices"
            className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block"
          >
            ← Continue Shopping
          </Link>

          <h1 className="font-serif text-4xl font-bold text-slate-900">
            Shopping Cart
          </h1>

          <p className="text-stone-600 mt-2">
            {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-6 flex gap-6 hover:shadow-md transition"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-stone-50 rounded-lg flex items-center justify-center border">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="text-3xl">🧃</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg">
                    {item.name}
                  </h3>

                  {item.volume && (
                    <p className="text-sm text-stone-500">{item.volume}</p>
                  )}

                  <p className="mt-2 text-sm text-stone-600">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end justify-between">

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>

                  {/* Quantity */}
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 hover:bg-stone-100"
                    >
                      −
                    </button>

                    <span className="px-4 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-stone-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <p className="font-bold text-emerald-600 text-lg">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="mt-4 mx-auto block bg-orange-100 text-orange-600 px-6 py-2 rounded-lg hover:bg-orange-200 transition"            >
              Clear Cart
            </button>
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-stone-200 p-8 sticky top-24">

              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              {/* Breakdown */}
              <div className="space-y-3 mb-6 border-b pb-6">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg mb-6">
                <span className="font-bold">Total</span>
                <span className="font-bold text-emerald-600">₹{total}</span>
              </div>

              {/* CTA */}
              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-500 text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition"
              >
                Proceed to Checkout →
              </button>

              <Link
                href="/#home"
                className="mt-4 block text-center text-sm text-emerald-600 hover:text-emerald-700">
                Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}