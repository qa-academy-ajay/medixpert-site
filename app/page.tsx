"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { juices, plans } from "@/lib/data";
import SubscriptionModal from "./components/SubscriptionModal";

function JuiceCard({ juice, isOpen, onToggle, onSubscribeClick }: { juice: (typeof juices)[0]; isOpen: boolean; onToggle: () => void; onSubscribeClick: () => void }) {
  return (
    <div className={`rounded-2xl border ${juice.border} ${juice.bg} overflow-hidden transition-all duration-300 h-full flex flex-col`}>
      {/* Image Section */}
      <div className="w-full h-40 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        <Image
          src={juice.image}
          alt={juice.name}
          width={250}
          height={250}
          className="w-auto h-full object-contain"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${juice.badge}`}>{juice.tag}</span>
          <span className="text-xl">{juice.emoji}</span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{juice.name}</h3>
        <p className={`text-xs md:text-sm italic mb-3 ${juice.accent}`}>{juice.tagline}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {juice.bestFor.slice(0, 2).map((b) => (
            <span key={b} className="text-xs bg-white/70 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{b}</span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg md:text-xl font-bold text-gray-900">₹{juice.price}</span>
            <span className="text-xs text-gray-400 ml-1">{juice.volume}</span>
          </div>
          <button onClick={onToggle} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
            {isOpen ? "▲ Show Less" : "▼ View Details"}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="border-t border-white/60 bg-white/50 p-4 md:p-5 space-y-3">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Composition</p>
            <div className="space-y-1">
              {juice.composition.map((c) => (
                <div key={c.name} className="flex justify-between text-xs">
                  <span className="text-gray-700">{c.name}</span>
                  <span className="text-gray-400 font-medium">{c.qty}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">⚠ Avoid if</p>
            <ul className="space-y-0.5">
              {juice.avoid.slice(0, 2).map((a) => (
                <li key={a} className="text-xs text-red-600 flex gap-1.5"><span>•</span><span>{a}</span></li>
              ))}
            </ul>
          </div>
          <button onClick={onSubscribeClick} className={`w-full text-center text-white text-sm font-semibold py-2 rounded-lg transition-colors ${juice.btnBg}`}>
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [openJuiceId, setOpenJuiceId] = useState<string | null>(null);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-emerald-900 text-white px-6 py-24 text-center">
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-emerald-700 rounded-full opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-40px] w-80 h-80 bg-emerald-600 rounded-full opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            🌱 Rooted in Ayurveda · Made in Bihar
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
            Heal Naturally,<br />
            <span className="text-emerald-300">One Glass at a Time</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Seven science-backed Ayurvedic juices for liver, heart, sugar, kidney, weight, skin & immunity. All at just ₹50.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/juices" className="bg-white text-emerald-900 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
              Explore Juices
            </Link>
            <Link href="/plans" className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 px-6 py-7">
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

      {/* Juice Cards */}
      <section id="juices" className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Our Menu</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">7 Healing Juices</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Each juice is freshly prepared from Ayurvedic herbs. Tap any card to see full composition.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {juices.slice(0, 4).map((juice) => (
            <JuiceCard
              key={juice.id}
              juice={juice}
              isOpen={openJuiceId === juice.id}
              onToggle={() => setOpenJuiceId(openJuiceId === juice.id ? null : juice.id)}
              onSubscribeClick={() => setSubscribeModalOpen(true)}
            />
          ))}
        </div>
        <div className="text-center mt-10">
        <Link href="/juices" className="inline-block bg-emerald-600 text-white font-semibold px-6 md:px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors text-sm md:text-base">
          View All 7 Juices →
        </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-gray-100 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl font-extrabold text-gray-900">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "🎯", title: "Choose your juice", desc: "Pick from 7 Ayurvedic variants based on your health goal." },
              { step: "02", icon: "📅", title: "Select a plan", desc: "Subscribe for 7, 15, or 30 days for consistent wellness benefits." },
              { step: "03", icon: "🌅", title: "Drink & heal", desc: "Consume fresh every morning on an empty stomach for best results." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">{s.icon}</div>
                <span className="text-xs font-bold text-emerald-400 tracking-widest">{s.step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Subscription Plans</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Pick your wellness journey</h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">Fresh daily juice at just ₹50/day.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.id} className={`rounded-2xl p-6 border relative ${plan.popular ? "border-emerald-500 bg-emerald-900 text-white" : "border-gray-200 bg-white text-gray-900"}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
              )}
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>{plan.label}</p>
              <p className="text-4xl font-extrabold mb-1">{plan.days}<span className={`text-base font-medium ml-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>days</span></p>
              <p className={`text-2xl font-bold mb-4 ${plan.popular ? "text-emerald-200" : "text-emerald-700"}`}>₹{plan.price}</p>
              <p className={`text-sm mb-6 leading-relaxed ${plan.popular ? "text-emerald-100" : "text-gray-500"}`}>{plan.desc}</p>
              <Link href="/plans" className={`block text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${plan.popular ? "bg-white text-emerald-900 hover:bg-emerald-50" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}>
                Subscribe — ₹{plan.price}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-50 border-t border-emerald-100 px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-emerald-900 mb-3">Ready to start healing?</h2>
        <p className="text-emerald-700 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          Join customers across Bihar rediscovering the power of Ayurvedic juice therapy. Starting at just ₹50 a day.
        </p>
        <Link href="/contact" className="inline-block bg-emerald-700 text-white font-bold px-6 md:px-8 py-3 rounded-xl hover:bg-emerald-800 transition-colors text-sm md:text-base">
          Subscribe Today
        </Link>
      </section>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
      />
    </div>
  );
}
