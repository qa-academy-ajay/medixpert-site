"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { juices } from "@/lib/data";

export default function HomePage() {
  const { cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [openJuiceId, setOpenJuiceId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#fafaf7]">

      {/* HERO */}
      <section className="bg-emerald-900 text-white px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Heal Naturally, One Glass at a Time
        </h1>
        <p className="text-lg text-emerald-100 mb-6">
          Fresh Ayurvedic juices for liver, heart & immunity — just ₹50
        </p>

        <div className="flex justify-center gap-4">
          <a href="#juices" className="bg-white text-emerald-900 px-6 py-3 rounded-lg font-bold">
            Order Now
          </a>
          <a href="#plans" className="border border-white px-6 py-3 rounded-lg">
            View Plans
          </a>
        </div>
      </section>

      {/* JUICES */}
      <section id="juices" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold mb-2">Choose Your Juice</h2>
        <p className="text-gray-500 mb-8">Target your specific health goal</p>

        <div className="grid md:grid-cols-3 gap-6">
          {juices.map((juice) => {
            const quantity = cart.find(i => i.id === juice.id)?.quantity || 0;
            const isOpen = openJuiceId === juice.id;

            return (
              <div
                key={juice.id}
                className={`border rounded-xl p-5 bg-white shadow-sm transition ${quantity > 0 ? "ring-2 ring-emerald-500" : ""
                  }`}
              >
                {/* Image */}
                <Image
                  src={juice.image}
                  alt={juice.name}
                  width={300}
                  height={200}
                  className="mx-auto mb-4"
                />

                {/* Title */}
                <h3 className="font-bold text-lg">{juice.name}</h3>
                <p className="text-sm text-gray-500 italic mb-2">
                  "{juice.tagline}"
                </p>

                {/* Price */}
                <p className="text-emerald-600 font-bold text-xl mb-3">
                  ₹{juice.price}
                </p>

                {/* ACTIONS */}
                <div className="flex items-center justify-between gap-2">
                  {quantity > 0 ? (
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => removeFromCart(juice.id)}
                        className="px-3 py-1"
                      >
                        −
                      </button>
                      <span className="px-3">{quantity}</span>
                      <button
                        onClick={() =>
                          addToCart({
                            id: juice.id,
                            name: juice.name,
                            price: juice.price,
                            image: juice.image,
                            volume: juice.volume,
                          })
                        }
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        addToCart({
                          id: juice.id,
                          name: juice.name,
                          price: juice.price,
                          image: juice.image,
                          volume: juice.volume,
                        })
                      }
                      className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-semibold"
                    >
                      Add
                    </button>
                  )}

                  {/* Toggle */}
                  <button
                    onClick={() =>
                      setOpenJuiceId(isOpen ? null : juice.id)
                    }
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-semibold"
                  >
                    {isOpen ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {/* EXPANDABLE DETAILS */}
                {isOpen && (
                  <div className="mt-4 border-t pt-4 space-y-4 animate-in fade-in">

                    {/* Composition */}
                    <div>
                      <p className="text-xs font-bold text-emerald-600 mb-2">
                        Composition
                      </p>
                      <div className="text-sm text-gray-700 space-y-1">
                        {juice.composition.map((c) => (
                          <div key={c.name} className="flex justify-between">
                            <span>{c.name}</span>
                            <span className="text-emerald-600">{c.qty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Avoid */}
                    <div>
                      <p className="text-xs font-bold text-red-600 mb-2">
                        Avoid If
                      </p>
                      <ul className="text-sm text-red-600 space-y-1">
                        {juice.avoid.map((a) => (
                          <li key={a}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FLOATING CART */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-emerald-900 text-white p-4 flex justify-between items-center">
          <div>
            {getTotalItems()} items · ₹{getTotalPrice()}
          </div>
          <div className="flex gap-2">
            <button onClick={clearCart} className="px-3 py-1 bg-emerald-700">
              Clear
            </button>
            <Link href="/cart" className="px-4 py-2 bg-emerald-600 rounded">
              View Cart
            </Link>
          </div>
        </div>
      )}

    </main>
  );
}