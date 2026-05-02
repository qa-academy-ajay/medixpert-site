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
      className={`group rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${juice.border} ${juice.bg} ${quantity > 0 ? "ring-2 ring-emerald-500 shadow-xl" : ""}`}
    >
      {/* Card Header */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${juice.badge}`}>
            {juice.tag}
          </span>
          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 text-white rounded-full text-xs font-bold animate-pulse">
                ✓
              </span>
            )}
            <span className="text-3xl group-hover:scale-125 transition-transform">{juice.emoji}</span>
          </div>
        </div>

        <div className="w-full h-40 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden rounded-xl border border-gray-200 group-hover:border-gray-300 transition-colors">
          <Image
            src={juice.image}
            alt={juice.name}
            width={300}
            height={300}
            className="w-auto h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{juice.name}</h3>
          <p className="text-xs sm:text-sm text-gray-600 italic font-light mt-1">&quot;{juice.tagline}&quot;</p>
        </div>

        {/* Best For Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {juice.bestFor.map((b) => (
            <span
              key={b}
              className="text-xs bg-gradient-to-r from-white/80 to-white/60 border border-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium hover:border-gray-300 transition-colors"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Price + Actions */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-gray-200/50">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">₹{juice.price}</span>
            <span className="text-xs sm:text-sm text-gray-500 font-extrabold ml-1">  For {juice.volume}</span>
          </div>
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <div className="flex items-center border-2 border-emerald-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={onRemove}
                  className="px-2 sm:px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-gray-700 transition-colors active:scale-95"
                >
                  −
                </button>
                <span className="px-2 sm:px-3 text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={onAdd}
                  className="px-2 sm:px-3 py-1.5 bg-emerald-500 text-white hover:bg-emerald-600 text-sm font-semibold transition-colors active:scale-95"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 min-h-10"
              >
                Add
              </button>
            )}

            <button
              onClick={onToggle}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all active:scale-95"
            >
              {isOpen ? "✕" : "⋮"}
            </button>
          </div>
        </div> */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-200/50">

  {/* LEFT: Price */}
  <div className="flex flex-col">
    <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
      ₹{juice.price}
    </span>
    <span className="text-xs text-gray-500 font-semibold">
      For {juice.volume}
    </span>
  </div>

  {/* RIGHT: Actions */}
  <div className="flex items-center gap-2">
    {quantity > 0 ? (
      <div className="flex items-center border-2 border-emerald-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <button
          onClick={onRemove}
          className="px-2 sm:px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm font-semibold"
        >
          −
        </button>
        <span className="px-2 sm:px-3 text-sm font-bold">{quantity}</span>
        <button
          onClick={onAdd}
          className="px-2 sm:px-3 py-1.5 bg-emerald-500 text-white hover:bg-emerald-600 text-sm font-semibold"
        >
          +
        </button>
      </div>
    ) : (
      <button
        onClick={onAdd}
        className="px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
      >
        Add
      </button>
    )}

    {/* Details toggle */}
    <button
      onClick={onToggle}
      className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 px-2 py-1"
    >
      {isOpen ? "✕" : "⋮"}
    </button>
  </div>
</div>
      </div>

      {/* Expandable Details */}
      {isOpen && (
        <div className="border-t-2 border-gray-200/50 bg-gradient-to-br from-white via-gray-50 to-white p-4 sm:p-6 space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Composition */}
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>📋</span> Composition
            </p>
            <div className="space-y-2 bg-white rounded-lg p-3 border border-gray-100">
              {juice.composition.map((c) => (
                <div key={c.name} className="flex justify-between text-xs sm:text-sm hover:bg-emerald-50 -mx-1 px-2 py-1 rounded transition-colors">
                  <span className="text-gray-700 font-medium">{c.name}</span>
                  <span className="text-emerald-600 font-semibold">{c.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avoid */}
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>⚠️</span> Avoid if
            </p>
            <ul className="space-y-1.5 bg-red-50 rounded-lg p-3 border border-red-100">
              {juice.avoid.map((a) => (
                <li key={a} className="text-xs sm:text-sm text-red-700 flex gap-2 font-medium">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onAdd}
            className={`w-full text-xs sm:text-sm font-bold py-3 rounded-xl transition-all duration-200 min-h-10 ${quantity > 0
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300 active:scale-95"
              }`}
          >
            {quantity > 0 ? `✓ Added (${quantity})` : "Add to Subscribe"}
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
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white px-4 sm:px-6 py-12 sm:py-20 md:py-24 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-900/40 pointer-events-none" />

        {/* Decorative animated circles */}
        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-emerald-600 rounded-full opacity-15 pointer-events-none blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 bg-emerald-500 rounded-full opacity-10 pointer-events-none blur-3xl" />

        {/* Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-center">
            {/* Text Content - Left */}
            <div className="order-2 md:order-1 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-600/50 backdrop-blur-sm text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-full border border-emerald-400/30 hover:border-emerald-400/60 transition-colors">
                <span>🌱</span> <span className="hidden sm:inline">Rooted in Ayurveda · Made in Gurgaon</span><span className="sm:hidden">Ayurveda</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg">
                Heal Naturally,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-100">One Glass at a Time</span>
              </h1>
              <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed font-light">
                Seven science-backed Ayurvedic juices crafted for modern health challenges — liver, heart, sugar, immunity & more. All at just <span className="font-semibold text-emerald-200">₹50.</span>
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link
                  href="#juices"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-emerald-900 font-bold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl hover:bg-emerald-50 hover:shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95 min-h-10 sm:min-h-11 text-sm sm:text-base"
                >
                  Explore Juices
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="#plans"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl hover:bg-white/10 hover:shadow-lg backdrop-blur-sm transition-all duration-200 active:scale-95 min-h-10 sm:min-h-11 text-sm sm:text-base"
                >
                  View Plans
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
              </div>
            </div>

            {/* Image - Right on Desktop, Top on Mobile */}
            <div className="order-1 md:order-2 flex items-center justify-center">
              <div className="w-full h-56 sm:h-72 md:h-96 relative flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-3xl blur-2xl" />
                <Image
                  src="/juices/all-in-one.png"
                  alt="NaturoAmrit Juices"
                  width={800}
                  height={600}
                  className="w-full h-full object-contain relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-gradient-to-r from-white via-emerald-50 to-white border-b border-gray-200 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
          {[
            { value: "7", label: "Juice Variants", icon: "🧃" },
            { value: "₹50", label: "Per 200 ml Glass", icon: "💰" },
            { value: "100%", label: "Natural Ingredients", icon: "🌿" },
            { value: "3 Plans", label: "7 / 15 / 30 Days", icon: "📅" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
              <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Juice Cards ── */}
      <section id="juices" className={`px-4 sm:px-6 py-12 sm:py-20 max-w-6xl mx-auto w-full ${getTotalItems() > 0 ? "pb-40 sm:pb-32" : ""}`}>
        <div className="mb-8 sm:mb-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">Our Juices</h2>
          <p className="text-gray-600 text-sm sm:text-base">Choose from our 7 Ayurvedic variants</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8">
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
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-900 to-emerald-800 text-white px-4 sm:px-6 py-3 sm:py-4 shadow-2xl border-t-2 border-emerald-700 z-40">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center">
                <div className="order-2 sm:order-1">
                  <p className="text-xs sm:text-sm font-semibold">
                    {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} · ₹{getTotalPrice()}
                  </p>
                  <p className="text-xs text-emerald-200 truncate mt-0.5">
                    {juices
                      .filter((j) => cart[j.id])
                      .map((j) => `${j.name}(${cart[j.id]})`)
                      .join(" • ")}
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
                  <button
                    onClick={() => clearCart()}
                    className="px-3 sm:px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs sm:text-sm font-semibold transition-colors active:scale-95 flex-1 sm:flex-none"
                  >
                    Clear
                  </button>
                  <button
                    onClick={openSubscriptionModal}
                    className="px-4 sm:px-6 py-2 rounded-lg bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-colors text-xs sm:text-sm active:scale-95 flex-1 sm:flex-none min-h-10"
                  >
                    Subscribe →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Subscription Plans Preview ── */}
      <section id="plans" className="px-6 py-20 max-w-5xl mx-auto">
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
      
      {/* ── How It Works ── */}
      <section className="bg-gradient-to-br from-gray-50 to-white border-y border-gray-200 px-4 sm:px-6 py-12 sm:py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-emerald-600"></span>
              Simple process
              <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-emerald-600"></span>
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto">Three simple steps to transform your wellness journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-6">
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
            ].map((s, idx) => (
              <div key={s.step} className="group relative">
                {/* Connection line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-16 -right-8 w-16 h-1 bg-gradient-to-r from-emerald-400 to-transparent"></div>
                )}
                <div className="relative p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <span className="text-xs font-black text-emerald-600 tracking-wider block mb-3 uppercase">{s.step}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">{s.desc}</p>
                </div>
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

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Common questions</h2>
        <div className="space-y-4">
          {[
            { q: "When should I drink the juice?", a: "Every morning on an empty stomach, 30 minutes before breakfast, for best results." },
            { q: "Can I switch juices mid-plan?", a: "Yes, contact us on WhatsApp and we'll adjust your plan accordingly." },
            { q: "Are the juices freshly made?", a: "Yes, all juices are freshly prepared daily with no preservatives or additives." },
            { q: "Is there home delivery?", a: "Yes, we deliver within our service area in Bihar. Contact us to confirm availability in your area." },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="font-bold text-gray-900 text-sm mb-1.5">{q}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
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
      {/* <footer className="bg-gray-900 text-gray-400 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>🌿</span>
              <p className="text-white font-bold">NaturoAmrit Herbal Juice</p>
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
          © {new Date().getFullYear()} NaturoAmrit Herbal Juice Corner · Gurgaon, India · All rights reserved.
        </div>
      </footer> */}

      {/* Subscription Checkout Flow Modal */}
      <SubscriptionCheckoutModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
        selectedCart={cart}
        onClearCart={clearCart}
      />
    </main>
  );
}