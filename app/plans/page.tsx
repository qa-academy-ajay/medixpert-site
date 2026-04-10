"use client";

import { useState } from "react";
import { plans, juices } from "@/lib/data";

export default function PlansPage() {
  const [selectedJuice, setSelectedJuice] = useState<string>("");
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);

  const togglePlan = (planId: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };

  const handleOrder = () => {
    if (!selectedJuice || selectedPlans.length === 0) return;
    const juice = juices.find((j) => j.id === selectedJuice);
    const selectedPlansList = plans.filter((p) => selectedPlans.includes(p.id));
    
    const planTexts = selectedPlansList.map((p) => `*${p.label} Plan (${p.days} days)* - ₹${p.price}`).join(", ");
    const totalPrice = selectedPlansList.reduce((sum, p) => sum + p.price, 0);
    
    const msg = `Hello MediXpert! I'd like to subscribe to ${planTexts} for *${juice?.name} Juice*. Total: ₹${totalPrice}. Please confirm my order.`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 px-6 py-14 text-center">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Subscription Plans</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Pick Your Wellness Journey</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
          All plans include fresh daily juice preparation at just ₹50/day. Choose a plan and get started today.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => togglePlan(plan.id)}
              className={`rounded-2xl p-6 border relative cursor-pointer transition-all duration-200 ${
                selectedPlans.includes(plan.id)
                  ? "border-emerald-500 bg-emerald-900 text-white shadow-lg scale-[1.02]"
                  : plan.popular
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-emerald-200 hover:shadow-sm"
              }`}
            >
              {plan.popular && !selectedPlans.includes(plan.id) && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
              )}
              {selectedPlans.includes(plan.id) && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">✓ Selected</span>
              )}
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${selectedPlans.includes(plan.id) ? "text-emerald-300" : "text-gray-400"}`}>{plan.label}</p>
              <p className={`text-4xl font-extrabold mb-0.5 ${selectedPlans.includes(plan.id) ? "text-white" : "text-gray-900"}`}>
                {plan.days}<span className={`text-base font-medium ml-1 ${selectedPlans.includes(plan.id) ? "text-emerald-300" : "text-gray-400"}`}>days</span>
              </p>
              <p className={`text-2xl font-bold mb-3 ${selectedPlans.includes(plan.id) ? "text-emerald-200" : "text-emerald-700"}`}>₹{plan.price}</p>
              <p className={`text-xs mb-5 leading-relaxed ${selectedPlans.includes(plan.id) ? "text-emerald-100" : "text-gray-500"}`}>{plan.desc}</p>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-xs ${selectedPlans.includes(plan.id) ? "text-emerald-100" : "text-gray-600"}`}>
                    <span className={`text-base ${selectedPlans.includes(plan.id) ? "text-emerald-300" : "text-emerald-500"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Juice Picker */}
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Choose your juice</h2>
          <p className="text-sm text-gray-500 mb-6">Select the juice that matches your health goal.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {juices.map((juice) => (
              <button
                key={juice.id}
                onClick={() => setSelectedJuice(juice.id)}
                className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                  selectedJuice === juice.id
                    ? `${juice.bg} ${juice.border} shadow-sm`
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{juice.emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{juice.name} Juice</p>
                    <p className="text-xs text-gray-400">{juice.bestFor.join(", ")}</p>
                  </div>
                  {selectedJuice === juice.id && (
                    <span className={`ml-auto text-sm font-bold ${juice.accent}`}>✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className={`rounded-2xl border p-7 transition-all ${
          selectedPlans.length > 0 && selectedJuice
            ? "border-emerald-200 bg-emerald-50"
            : "border-dashed border-gray-200 bg-white"
        }`}>
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Order Summary</h2>
          {selectedPlans.length > 0 && selectedJuice ? (() => {
            const juice = juices.find((j) => j.id === selectedJuice)!;
            const selectedPlansList = plans.filter((p) => selectedPlans.includes(p.id));
            const totalPrice = selectedPlansList.reduce((sum, p) => sum + p.price, 0);
            
            return (
              <div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Juice</span>
                    <span className="font-semibold text-gray-900">{juice.emoji} {juice.name} Juice</span>
                  </div>
                  <div className="border-t border-emerald-200 pt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Selected Plans:</p>
                    <div className="space-y-2">
                      {selectedPlansList.map((plan) => (
                        <div key={plan.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{plan.label}</span>
                          <span className="font-semibold text-gray-900">₹{plan.price} ({plan.days} days)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-emerald-200 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-xl font-extrabold text-emerald-700">₹{totalPrice}</span>
                  </div>
                </div>
                <button
                  onClick={handleOrder}
                  className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition-colors text-sm"
                >
                  Order via WhatsApp →
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  We&apos;ll confirm your order on WhatsApp within minutes.
                </p>
              </div>
            );
          })() : (
            <p className="text-gray-400 text-sm text-center py-4">
              Select plans and juice above to see your order summary.
            </p>
          )}
        </div>

        {/* FAQ */}
        <div>
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
        </div>
      </div>
    </div>
  );
}
