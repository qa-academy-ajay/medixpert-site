"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { juices, plans, testimonials } from "@/lib/data";

export default function HomePage() {
  const { cart, addToCart, removeFromCart  , clearCart, getTotalItems, getTotalPrice } = useCart();
  const [openJuiceId, setOpenJuiceId] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-[#fafaf7]">

      {/* HERO */}
      <section className="bg-emerald-900 text-white px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Heal Naturally, One Glass at a Time
        </h1>
        <p className="text-lg text-emerald-100 mb-6">
          Fresh Ayurvedic juices for liver, heart & immunity — just ₹50
        </p>
      </section>

      {/* JUICES */}
      <section id="juices" className="max-w-6xl mx-auto px-6 py-12">
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
                  &quot;{juice.tagline}&quot;
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
                      Add To Cart
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

      {/* ── Subscription Plans Preview ── */}
      <section id="plans" className="px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xl font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            Subscription Plans
          </p>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            All plans include fresh daily juice delivery at just ₹50/day.
          </p>
        </div>
        {/* Plans Grid (Read Only) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 border relative ${plan.popular
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-gray-200 bg-white"
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Content */}
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">
                {plan.label}
              </p>

              <p className="text-4xl font-extrabold mb-0.5 text-gray-900">
                {plan.days}
                <span className="text-base font-medium ml-1 text-gray-400">
                  days
                </span>
              </p>

              <p className="text-2xl font-bold mb-3 text-emerald-700">
                ₹{plan.price}
              </p>

              <p className="text-xs mb-5 leading-relaxed text-gray-500">
                {plan.desc}
              </p>

              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <span className="text-base text-emerald-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-6 py-12 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xl font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              Customer Reviews
            </p>
            <p className="text-gray-600 max-w-xl mx-auto text-sm leading-relaxed">
              Join hundreds of people who&apos;ve transformed their health with NaturoAmrit juices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ⭐
                    </span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Result Badge */}
                <div className="mb-4 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-xs font-semibold text-emerald-700">
                    ✓ {testimonial.result}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-4">
                  {/* Name & Role */}
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {testimonial.role}
                  </p>

                  {/* Juice Used */}
                  <span className="inline-block text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                    Used: {testimonial.juiceUsed}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View All Reviews Button */}
          <div className="text-center mt-10">
            <Link
              href="/review"
              className="inline-block text-emerald-600 font-semibold hover:text-emerald-700 text-sm"
            >
              View all reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-emerald-50 border-t border-emerald-100 px-6 py-12 text-center">
        <h2 className="text-3xl font-extrabold text-emerald-900 mb-3">
          Ready to start healing?
        </h2>
        <p className="text-emerald-700 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          Join hundreds of customers rediscovering the power of Ayurvedic juice therapy.
          Starting at just ₹50 a day.
        </p>
        <Link
          href="/plans"
          className="inline-block bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-800 transition-colors"
        >
          Start Your Plan Today
        </Link>
      </section>
     
      {/* FLOATING CART */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-emerald-900 text-white p-4 flex justify-between items-center">
          <div>
            {getTotalItems()} items · ₹{getTotalPrice()}
          </div>
          <div className="flex gap-2">
            <button onClick={clearCart} className="px-4 py-2 bg-emerald-600 rounded">
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