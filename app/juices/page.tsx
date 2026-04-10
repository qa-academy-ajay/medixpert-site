"use client";

import { useState } from "react";
import { juices, plans } from "@/lib/data";
import Image from "next/image";
import SubscriptionModal from "../components/SubscriptionModal";

export default function JuicesPage() {
  const [selectedJuice, setSelectedJuice] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const active = juices.find((j) => j.id === selectedJuice);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 px-6 py-14 text-center">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Our Menu</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">7 Healing Juices</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          Each juice is freshly prepared daily using authentic Ayurvedic ingredients. Choose a juice to explore details, composition, and subscription options.
        </p>
      </section>

      {/* Juice Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {juices.map((juice) => (
            <div
              key={juice.id}
              className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden hover:shadow-lg cursor-pointer ${juice.border} ${juice.bg}`}
            >
              {/* Card Header with Emoji */}
              {/* <div className="flex items-center justify-center h-40 text-7xl bg-gradient-to-br opacity-80">
                {juice.emoji}
              </div> */}
              {/* Juice Image */}
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={juice.image}
                  alt={juice.name}
                  width={300}
                  height={300}
                  className="w-auto h-full object-contain"
                />
              </div>
              {/* Card Body */}
              <div className="p-6">
                <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 ${juice.badge}`}>
                  {juice.tag}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{juice.name}</h3>
                <p className={`text-sm italic font-medium mb-4 ${juice.accent}`}>{juice.tagline}</p>

                {/* Price and Volume */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-bold text-gray-900">₹{juice.price}</span>
                  <span className="text-xs text-gray-500">{juice.volume}</span>
                </div>

                {/* Details Button */}
                <button
                  onClick={() => {
                    setSelectedJuice(juice.id);
                    setShowModal(true);
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${juice.btnBg}`}
                >
                  View Details & Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && active && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl">
            {/* Modal Header */}
            <div className={`${active.bg} ${active.border} border-b-2 px-8 py-8 relative`}>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
              <div className="flex items-start gap-6">
                <div className="text-6xl">{active.emoji}</div>
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 ${active.badge}`}>
                    {active.tag}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{active.name}</h2>
                  <p className={`text-lg italic font-medium ${active.accent}`}>{active.tagline}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Best For */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Best For</p>
                <div className="flex flex-wrap gap-2">
                  {active.bestFor.map((b) => (
                    <span key={b} className="text-sm bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-full font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Composition */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Composition</p>
                <div className={`rounded-xl p-5 space-y-3 bg-gray-50 border border-gray-200`}>
                  {active.composition.map((c) => (
                    <div key={c.name} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 font-medium">{c.name}</span>
                      <span className={`text-sm font-bold ${active.accent}`}>{c.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoid */}
              <div>
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3">⚠ Please Avoid If</p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-2">
                  {active.avoid.map((a) => (
                    <div key={a} className="flex gap-3 items-start">
                      <span className="text-red-400 mt-1 font-bold">•</span>
                      <span className="text-sm text-red-700">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer - Subscription Plans */}
            <div className="border-t-2 px-8 py-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Your Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      plan.popular
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {plan.popular && (
                      <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                        Most Popular
                      </span>
                    )}
                    <p className="font-bold text-gray-900">{plan.label}</p>
                    <p className="text-xs text-gray-500 mb-2">{plan.days} days</p>
                    <p className="text-xl font-bold text-gray-900">₹{plan.price}</p>
                    <p className="text-xs text-gray-500">₹{plan.perDay}/day</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSubscribeModalOpen(true);
                }}
                className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 ${active.btnBg} text-lg`}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscribeModalOpen}
        onClose={() => {
          setSubscribeModalOpen(false);
          setSelectedJuice(null);
        }}
        selectedJuiceId={selectedJuice || undefined}
      />
    </div>
  );
}
