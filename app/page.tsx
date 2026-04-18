"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubscriptionCheckoutModal from "@/app/components/SubscriptionCheckoutModal";
import { juices, testimonials } from "@/lib/data";
import { useCart } from "@/hooks/useCart";

function JuiceCard({
  juice,
  isOpen,
  onToggle,
  quantity,
  onAdd,
  onRemove
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
      className={`rounded-2xl border ${juice.border} ${juice.bg} overflow-hidden transition-all duration-300 ${quantity > 0 ? "ring-2 ring-emerald-500 shadow-lg" : ""}`}
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${juice.badge}`}>
            {juice.tag}
          </span>
          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full text-xs font-bold">
                ✓
              </span>
            )}
            <span className="text-2xl">{juice.emoji}</span>
          </div>
        </div>
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden mb-3">
          <Image
            src={juice.image}
            alt={juice.name}
            width={300}
            height={300}
            className="w-auto h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{juice.name} Juice</h3>
        <p className="text-sm text-gray-500 italic mb-4">{juice.tagline}</p>

        {/* Best For Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {juice.bestFor.map((b) => (
            <span
              key={b}
              className="text-xs bg-white/70 border border-gray-200 text-gray-600 px-2 py-1 rounded-full"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Price + Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{juice.price}</span>
            <span className="text-sm text-gray-400 ml-1">{juice.volume}</span>
          </div>
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={onRemove}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  –
                </button>
                <span className="px-3 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={onAdd}
                  className="px-3 py-1 bg-emerald-500 text-white hover:bg-emerald-600 text-sm"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Add
              </button>
            )}

            <button
              onClick={onToggle}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              {isOpen ? "Hide Details" : "Show Details"}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      {isOpen && (
        <div className="border-t border-white/60 bg-white/50 p-7 space-y-4">
          {/* Composition */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Composition
            </p>
            <div className="space-y-1">
              {juice.composition.map((c) => (
                <div key={c.name} className="flex justify-between text-sm">
                  <span className="text-gray-700">{c.name}</span>
                  <span className="text-gray-400 font-medium">{c.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avoid */}
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              ⚠ Avoid if
            </p>
            <ul className="space-y-1">
              {juice.avoid.map((a) => (
                <li key={a} className="text-xs text-red-600 flex gap-2">
                  <span>•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onAdd}
            className={`w-full text-sm font-medium py-2.5 rounded-xl transition-colors ${quantity > 0
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
          >
            {quantity > 0 ? `Added (${quantity})` : "Add to Subscribe"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────
export default function HomePage() {

  const [openJuiceId, setOpenJuiceId] = useState<string | null>(null);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const openSubscriptionModal = () => {
    if (getTotalItems() > 0) {
      setSubscribeModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafaf7] font-sans">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-emerald-900 text-white px-6 py-24 text-center">
        {/* Decorative circles */}
        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-emerald-700 rounded-full opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 bg-emerald-600 rounded-full opacity-15 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            🌱 Rooted in Ayurveda · Made in Gurgaon
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Heal Naturally,<br />
            <span className="text-emerald-300">One Glass at a Time</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Seven science-backed Ayurvedic juices crafted for modern health challenges —
            liver, heart, sugar, immunity & more. All at just ₹50.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="#juices"
              className="bg-white text-emerald-900 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Explore Juices
            </Link>
            <Link
              href="/plans"
              className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-gray-100 px-6 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "7", label: "Juice Variants" },
            { value: "₹50", label: "Per 200 ml Glass" },
            { value: "100%", label: "Natural Ingredients" },
            { value: "3 Plans", label: "7 / 15 / 30 Days" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-emerald-700">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Juice Cards ── */}
      <section id="juices" className={`px-6 py-20 max-w-6xl mx-auto ${getTotalItems() > 0 ? "pb-32" : ""}`}>
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            Our Menu
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            7 Healing Juices
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Each juice is freshly prepared from Ayurvedic herbs — click any card to see
            full composition and usage guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {juices.map((juice) => (
            <JuiceCard
              key={juice.id}
              juice={juice}
              isOpen={openJuiceId === juice.id}
              onToggle={() =>
                setOpenJuiceId(openJuiceId === juice.id ? null : juice.id)
              }
              quantity={cart[juice.id] || 0}
              onAdd={() => addToCart(juice.id)}
              onRemove={() => removeFromCart(juice.id)}
            />
          ))}
        </div>

        {/* Floating Action Bar */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-emerald-900 text-white px-6 py-4 shadow-2xl border-t border-emerald-800">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in cart
                </p>

                <p className="text-lg font-bold text-white">
                  Total: ₹{getTotalPrice()}
                </p>

                <p className="text-xs text-emerald-300">
                  {juices
                    .filter((j) => cart[j.id])
                    .map((j) => `${j.name} (${cart[j.id]})`)
                    .join(", ")}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => clearCart()}
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-sm font-medium transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={openSubscriptionModal}
                  className="px-6 py-2 rounded-lg bg-white text-emerald-900 font-semibold hover:bg-emerald-50 transition-colors text-sm"
                >
                  Subscribe to All →
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white border-y border-gray-100 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              Simple process
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose your juice",
                desc: "Pick from 7 Ayurvedic variants based on your health goal.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Select a plan",
                desc: "Subscribe for 7, 15, or 30 days for consistent wellness benefits.",
                icon: "📅",
              },
              {
                step: "03",
                title: "Drink & heal",
                desc: "Consume fresh every morning on an empty stomach for best results.",
                icon: "🌅",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-emerald-400 tracking-widest">{s.step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-6 py-20 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              Real Results
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Success Stories from Our Customers
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm leading-relaxed">
              Join hundreds of people who&apos;ve transformed their health with MediXpert juices.
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

      {/* ── Subscription Plans Preview ── */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            Subscription Plans
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Pick your wellness journey
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            All plans include fresh daily juice delivery at just ₹50/day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { days: 7, label: "Starter", price: 350, desc: "Great for first-timers to experience the benefits.", popular: false },
            { days: 15, label: "Wellness", price: 750, desc: "Our most popular plan for noticeable health improvement.", popular: true },
            { days: 30, label: "Transform", price: 1500, desc: "Full Ayurvedic therapy cycle for lasting results.", popular: false },
          ].map((plan) => (
            <div
              key={plan.days}
              className={`rounded-2xl p-6 border ${plan.popular
                ? "border-emerald-500 bg-emerald-900 text-white"
                : "border-gray-200 bg-white text-gray-900"
                } relative`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>
                {plan.label}
              </p>
              <p className="text-4xl font-extrabold mb-1">
                {plan.days}<span className={`text-base font-medium ml-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>days</span>
              </p>
              <p className={`text-2xl font-bold mb-4 ${plan.popular ? "text-emerald-200" : "text-emerald-700"}`}>
                ₹{plan.price}
              </p>
              <p className={`text-sm mb-6 leading-relaxed ${plan.popular ? "text-emerald-100" : "text-gray-500"}`}>
                {plan.desc}
              </p>
              <Link
                href="/plans"
                className={`block text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${plan.popular
                  ? "bg-white text-emerald-900 hover:bg-emerald-50"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
              >
                Subscribe — ₹{plan.price}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-emerald-50 border-t border-emerald-100 px-6 py-16 text-center">
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

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>🌿</span>
              <p className="text-white font-bold">MediXpert Herbal Juice</p>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Authentic Ayurvedic juice therapy rooted in Gurgaon, India. Affordable, pure & effective.
            </p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="space-y-2">
              <p className="text-white font-medium mb-3">Menu</p>
              {juices.map((j) => (
                <p key={j.id} className="hover:text-white cursor-pointer transition-colors">
                  {j.name} Juice
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-white font-medium mb-3">Company</p>
              <p className="hover:text-white cursor-pointer transition-colors">About Us</p>
              <p className="hover:text-white cursor-pointer transition-colors">Plans</p>
              <p className="hover:text-white cursor-pointer transition-colors">Contact</p>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} MediXpert Herbal Juice Corner · Gurgaon, India · All rights reserved.
        </div>
      </footer>

      {/* Subscription Checkout Flow Modal */}
      <SubscriptionCheckoutModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
        selectedJuiceIds={Object.keys(cart)}
      />
    </main>
  );
}