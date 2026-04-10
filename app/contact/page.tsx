"use client";

import { useState } from "react";
import Link from "next/link";
import { juices, plans } from "@/lib/data";

export default function OrderPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    juice: "",
    plan: "",
    name: "",
    phone: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedJuice = juices.find((j) => j.id === form.juice);
  const selectedPlan = plans.find((p) => p.id === form.plan);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && form.juice) {
      setStep(2);
    } else if (step === 2 && form.plan) {
      setStep(3);
    }
  };

  const handleWhatsApp = () => {
    if (!form.name || !form.phone || !form.address) return;

    const msg = `Hello MediXpert! 🌿

*New Order Request*
━━━━━━━━━━━━━━━━
👤 Name: ${form.name}
📞 Phone: ${form.phone}
🧃 Juice: ${selectedJuice?.name || ""} Juice
📅 Plan: ${selectedPlan?.days} days (₹${selectedPlan?.price})
📍 Address: ${form.address}

Please confirm my order. Thank you!`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-stone-50">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">Order Sent!</h2>
          <p className="text-stone-600 text-base leading-relaxed mb-8">
            Your order has been sent to WhatsApp. We&apos;ll confirm within minutes and arrange fresh delivery to your address.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm({ juice: "", plan: "", name: "", phone: "", address: "" });
            }}
            className="text-yellow-600 font-semibold underline underline-offset-2 hover:text-yellow-700"
          >
            Place another order
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200 px-6 py-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-2">Start Your Healing Journey</h1>
        <p className="text-stone-600 max-w-xl mx-auto">
          A guided 3-step process. Choose your juice, plan, and we&apos;ll deliver fresh to your doorstep.
        </p>
      </section>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-stone-200 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    s <= step
                      ? "bg-yellow-500 text-slate-900"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      s < step ? "bg-yellow-500" : "bg-stone-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs font-semibold text-stone-600">
            <span>Choose Juice</span>
            <span>Choose Plan</span>
            <span>Your Details</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Step 1: Choose Juice */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Step 1: Choose Your Juice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {juices.map((juice) => (
                <button
                  key={juice.id}
                  onClick={() => {
                    setForm({ ...form, juice: juice.id });
                  }}
                  className={`p-5 rounded-xl border-2 transition-all text-left ${
                    form.juice === juice.id
                      ? `border-yellow-500 ${juice.bg} ring-2 ring-yellow-500/20`
                      : `border-stone-200 ${juice.bg} hover:border-stone-300`
                  }`}
                >
                  <div className="text-3xl mb-2">{juice.emoji}</div>
                  <h3 className="font-bold text-slate-900 mb-1">{juice.name}</h3>
                  <p className={`text-sm ${juice.accent} italic mb-2`}>{juice.tagline}</p>
                  <div className="flex items-center gap-1 text-xs text-stone-600">
                    <span className="font-semibold">₹{juice.price}</span>
                    <span>/200ml</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div />
              <button
                onClick={handleNext}
                disabled={!form.juice}
                className="bg-yellow-500 text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Plan */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">Step 2: Choose Your Plan</h2>
            <p className="text-stone-600 mb-8">
              Selected: <strong>{selectedJuice?.name}</strong> · <Link href="#" onClick={() => setStep(1)} className="text-yellow-600 underline">Change</Link>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setForm({ ...form, plan: plan.id })}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    form.plan === plan.id
                      ? "border-yellow-500 bg-yellow-50 ring-2 ring-yellow-500/20"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  }`}
                >
                  {plan.popular && (
                    <div className="inline-block bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{plan.label}</h3>
                  <p className="text-sm text-stone-600 mb-4">{plan.days} days of wellness</p>
                  <div className="mb-4 pb-4 border-b border-stone-200">
                    <p className="text-3xl font-bold text-slate-900">₹{plan.price}</p>
                    <p className="text-xs text-stone-500">₹{plan.perDay}/day</p>
                  </div>
                  <ul className="space-y-2 text-xs text-stone-600">
                    {plan.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-yellow-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="border border-stone-300 text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-stone-50 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={!form.plan}
                className="bg-yellow-500 text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Your Details */}
        {step === 3 && (
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">Step 3: Your Details</h2>
            <p className="text-stone-600 mb-8">
              Order Summary: <strong>{selectedJuice?.name}</strong> · <strong>{selectedPlan?.label} Plan (₹{selectedPlan?.price})</strong> · <Link href="#" onClick={() => setStep(1)} className="text-yellow-600 underline">Change</Link>
            </p>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your full delivery address in Gurgaon"
                  className="w-full border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-colors"
                />
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-slate-900 uppercase tracking-widest mb-3">Order Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">{selectedJuice?.name}</span>
                    <span className="font-semibold text-slate-900">₹{selectedPlan?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">{selectedPlan?.days}-Day {selectedPlan?.label} Plan</span>
                    <span className="text-stone-600">₹{selectedPlan?.perDay}/day</span>
                  </div>
                  <div className="border-t border-stone-300 pt-2 flex justify-between font-bold text-slate-900">
                    <span>Total Due</span>
                    <span>₹{selectedPlan?.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="border border-stone-300 text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-stone-50 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleWhatsApp}
                disabled={!form.name || !form.phone || !form.address}
                className="bg-yellow-500 text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Order via WhatsApp →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Support CTA */}
      <section className="bg-white border-t border-stone-200 px-6 py-12 text-center">
        <p className="text-stone-600 mb-4">Questions? </p>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-600 font-semibold hover:text-yellow-700"
        >
          Message us on WhatsApp →
        </a>
      </section>
    </div>
  );
}
