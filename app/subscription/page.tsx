"use client";
import { useState } from "react";

export default function SubscriptionPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plan: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async (plan: string) => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, plan }),
    });

    if (response.ok) {
      setMessage(`✅ Subscription request for "${plan}" sent successfully!`);
      setFormData({ name: "", phone: "", plan: "" });
    } else {
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">📦 Subscription Plans</h1>

      {/* User Details */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-2">🥇 7 Days Detox Plan</h2>
          <p className="mb-2">Daily morning delivery of Detox Green & Kidney Care juices.</p>
          <p className="text-green-600 font-semibold mb-4">₹349</p>
          <button
            onClick={() => handleSubscribe("7 Days Detox Plan")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Subscribe
          </button>
        </div>

        <div className="border p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-2">🥈 30 Days Health Plan</h2>
          <p className="mb-2">Full month subscription with rotating juices for wellness.</p>
          <p className="text-green-600 font-semibold mb-4">₹1199</p>
          <button
            onClick={() => handleSubscribe("30 Days Health Plan")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      {message && <p className="mt-6 text-lg text-center">{message}</p>}
    </main>
  );
}