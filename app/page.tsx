"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubscriptionCheckoutModal from "@/app/components/SubscriptionCheckoutModal";
import { juices, testimonials } from "@/lib/data";
import { useCart } from "@/app/context/CartContext";

// ─────────────────────────────────────────────────────────
// Juice Card Component
// ─────────────────────────────────────────────────────────
function JuiceCard({
  juice,
  isOpen,
  onToggle,
  quantity,
  onAdd,
  onRemove,
}: {
  juice: (typeof juices)[0];
  isOpen: boolean;
  onToggle: () => void;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`group rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${juice.border} ${juice.bg} ${quantity > 0 ? "ring-2 ring-emerald-500 shadow-xl" : ""
        }`}
    >
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between">
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${juice.badge}`}
          >
            {juice.tag}
          </span>

          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <span className="w-6 h-6 flex items-center justify-center bg-emerald-500 text-white rounded-full text-xs">
                ✓
              </span>
            )}
            <span className="text-3xl">{juice.emoji}</span>
          </div>
        </div>

        {/* Image */}
        <div className="h-44 flex items-center justify-center bg-white rounded-xl border">
          <Image
            src={juice.image}
            alt={juice.name}
            width={200}
            height={200}
            className="object-contain h-full"
          />
        </div>

        {/* Title */}
        <div>
          <h3 className="font-bold text-lg">{juice.name}</h3>
          <p className="text-sm text-gray-500 italic">
            "{juice.tagline}"
          </p>
        </div>

        {/* Best For */}
        <div className="flex flex-wrap gap-2">
          {juice.bestFor.map((b) => (
            <span key={b} className="text-xs bg-white border px-2 py-1 rounded-full">
              {b}
            </span>
          ))}
        </div>

        {/* PRICE + ACTIONS */}
        <div className="flex justify-between items-center border-t pt-3">
          {/* LEFT */}
          <div>
            <p className="text-2xl font-bold text-emerald-600">
              ₹{juice.price}
            </p>
            <p className="text-xs text-gray-500">{juice.volume}</p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <div className="flex border rounded overflow-hidden">
                <button onClick={onRemove} className="px-3 py-1 bg-gray-100">
                  −
                </button>
                <span className="px-3">{quantity}</span>
                <button onClick={onAdd} className="px-3 py-1 bg-emerald-500 text-white">
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="bg-emerald-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            )}

            <button
              onClick={onToggle} className="bg-emerald-500 text-white px-4 py-2 rounded">
              {isOpen ? "Hide Details" : "View Details"}
            </button>
          </div>
        </div>
      </div>

      {/* EXPAND */}
      {isOpen && (
        <div className="p-4 border-t bg-white space-y-4">
          {/* Composition */}
          <div>
            <p className="font-semibold text-sm text-emerald-600 mb-2">
              Composition
            </p>
            {juice.composition.map((c) => (
              <div key={c.name} className="flex justify-between text-sm">
                <span>{c.name}</span>
                <span>{c.qty}</span>
              </div>
            ))}
          </div>

          {/* Avoid */}
          <div>
            <p className="font-semibold text-sm text-red-600 mb-2">
              Avoid if
            </p>
            {juice.avoid.map((a) => (
              <p key={a} className="text-sm text-red-500">
                • {a}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Homepage
// ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [openJuiceId, setOpenJuiceId] = useState<string | null>(null);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const {
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  return (
    <main className="min-h-screen bg-[#fafaf7]">
      {/* HERO */}
      <section className="bg-emerald-900 text-white px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Heal Naturally, One Glass at a Time
        </h1>
        <p className="text-lg text-emerald-100">
          Ayurvedic juices at just ₹50
        </p>
      </section>

      {/* JUICES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Our Juices</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {juices.map((juice) => {
            const item = cart.find((i) => i.id === juice.id);
            const qty = item?.quantity || 0;

            return (
              <JuiceCard
                key={juice.id}
                juice={juice}
                isOpen={openJuiceId === juice.id}
                onToggle={() =>
                  setOpenJuiceId(openJuiceId === juice.id ? null : juice.id)
                }
                quantity={qty}
                onAdd={() =>
                  addToCart({
                    id: juice.id,
                    name: juice.name,
                    price: juice.price,
                    image: juice.image,
                    volume: juice.volume,
                  })
                }
                onRemove={() =>
                  updateQuantity(juice.id, qty - 1)
                }
              />
            );
          })}
        </div>
      </section>

      {/* FLOATING BAR */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-emerald-900 text-white p-4 flex justify-between items-center">
          <div>
            {getTotalItems()} items · ₹{getTotalPrice()}
          </div>

          <div className="flex gap-2">
            <button onClick={clearCart}>Clear</button>
            <Link href="/cart">View Cart</Link>
          </div>
        </div>
      )}

      {/* MODAL */}
      <SubscriptionCheckoutModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
        selectedCart={Object.fromEntries(
          cart.map((i) => [i.id, i.quantity])
        )}
        onClearCart={clearCart}
      />
    </main>
  );
}