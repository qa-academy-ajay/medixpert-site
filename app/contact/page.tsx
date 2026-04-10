"use client";

import { useState } from "react";
import { juices } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    juice: "",
    plan: "",
    address: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const juice = juices.find((j) => j.id === form.juice);
    const msg = `Hello MediXpert! 🌿

*New Order Request*
━━━━━━━━━━━━━━━━
👤 Name: ${form.name}
📞 Phone: ${form.phone}
🧃 Juice: ${juice?.name || form.juice} Juice
📅 Plan: ${form.plan} days
📍 Address: ${form.address}
${form.message ? `💬 Message: ${form.message}` : ""}

Please confirm my order. Thank you!`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  const isValid = form.name && form.phone && form.juice && form.plan && form.address;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Order Sent!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Your order has been sent to WhatsApp. We&apos;ll confirm your order within minutes and arrange delivery.
          </p>
          <button onClick={() => setSubmitted(false)} className="text-emerald-600 text-sm font-medium underline underline-offset-2 hover:text-emerald-800">
            Place another order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 px-6 py-14 text-center">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Order & Contact</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Place Your Order</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
          Fill in your details below and we&apos;ll connect with you on WhatsApp to confirm your order and delivery.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Order Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-7 space-y-5">
            <h2 className="text-xl font-extrabold text-gray-900">Order Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Select Juice *</label>
                <select
                  name="juice"
                  value={form.juice}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-colors bg-white"
                >
                  <option value="">Choose a juice...</option>
                  {juices.map((j) => (
                    <option key={j.id} value={j.id}>{j.emoji} {j.name} Juice</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Plan Duration *</label>
                <select
                  name="plan"
                  value={form.plan}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-colors bg-white"
                >
                  <option value="">Choose a plan...</option>
                  <option value="7">7 Days — ₹350 (Starter)</option>
                  <option value="15">15 Days — ₹750 (Wellness)</option>
                  <option value="30">30 Days — ₹1500 (Transform)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Delivery Address *</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Your full delivery address in Bihar"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Message (optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any specific health concerns or questions..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleWhatsApp}
              disabled={!isValid}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                isValid
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isValid ? "Send Order via WhatsApp →" : "Fill all fields to continue"}
            </button>
            <p className="text-xs text-gray-400 text-center">
              Clicking above will open WhatsApp with your order details pre-filled.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-5">
          <div className="bg-emerald-900 text-white rounded-2xl p-6">
            <h3 className="font-extrabold text-base mb-4">Contact us directly</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xl">💬</span>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-emerald-300 text-xs">+91 XXXXXXXXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-emerald-300 text-xs">Bihar, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-emerald-300 text-xs">Mon–Sat, 7am – 7pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-3">
            <h3 className="font-extrabold text-base text-gray-900">Why order from us?</h3>
            {[
              "Fresh daily preparation",
              "100% natural ingredients",
              "₹50 per 200 ml glass",
              "WhatsApp order confirmation",
              "Delivery within Bihar",
            ].map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-emerald-500 font-bold">✓</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
