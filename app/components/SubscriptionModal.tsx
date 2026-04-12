"use client";

import { useState, useEffect } from "react";
import { juices, plans } from "@/lib/data";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJuiceId?: string;
  selectedJuiceIds?: string[];
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  selectedJuiceId,
  selectedJuiceIds,
}: SubscriptionModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [selectedJuices, setSelectedJuices] = useState<string[]>([]);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Update selected juices when modal opens or selection changes
  useEffect(() => {
    if (isOpen) {
      if (selectedJuiceIds && selectedJuiceIds.length > 0) {
        setSelectedJuices(selectedJuiceIds);
      } else if (selectedJuiceId) {
        setSelectedJuices([selectedJuiceId]);
      } else {
        setSelectedJuices([]);
      }
    }
  }, [isOpen, selectedJuiceId, selectedJuiceIds]);

  const toggleJuice = (juiceId: string) => {
    setSelectedJuices((prev) =>
      prev.includes(juiceId)
        ? prev.filter((id) => id !== juiceId)
        : [...prev, juiceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      selectedJuices.length === 0 ||
      !plan
    ) {
      setError("Please fill all fields and select at least one juice");
      setLoading(false);
      return;
    }

    if (phone.length < 10) {
      setError("Phone number must be at least 10 digits");
      setLoading(false);
      return;
    }

    try {
      const planDetails = plans.find((p) => p.id === plan);
      const selectedJuiceNames = selectedJuices
        .map((id) => juices.find((j) => j.id === id)?.name)
        .join(", ");

      const subscriptionText = `${selectedJuiceNames} - ${planDetails?.label} Plan (${planDetails?.days} days)`;

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          message: message.trim(),
          juices: selectedJuices,
          plan: subscriptionText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit subscription");
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setName("");
        setPhone("");
        setAddress("");
        setMessage("");
        setSelectedJuices([]);
        setPlan("");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl my-8">
        {/* Header */}
        <div className="bg-emerald-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-bold">Subscribe Now</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
              ✓ Subscription request submitted! We&apos;ll contact you soon.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
              disabled={loading || success}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit phone number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
              disabled={loading || success}
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Address *
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 resize-none"
              disabled={loading || success}
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any special requests or notes..."
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50 resize-none"
              disabled={loading || success}
            />
          </div>

          {/* Juice Selection - Multiple */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Select Juices * (Choose one or more)
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {juices.map((juice) => (
                <label
                  key={juice.id}
                  className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedJuices.includes(juice.id)}
                    onChange={() => toggleJuice(juice.id)}
                    className="w-4 h-4 text-emerald-600 rounded"
                    disabled={loading || success}
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-medium text-gray-900">{juice.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ₹{juice.price}/{juice.volume}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {selectedJuices.length > 0 && (
              <p className="text-xs text-emerald-600 mt-2 font-medium">
                {selectedJuices.length} juice(s) selected
              </p>
            )}
          </div>

          {/* Plan Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Select Plan *
            </label>
            <div className="space-y-2">
              {plans.map((p) => (
                <label key={p.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="plan"
                    value={p.id}
                    checked={plan === p.id}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-4 h-4 text-emerald-600"
                    disabled={loading || success}
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-semibold text-gray-900">{p.label}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {p.days} days • ₹{p.price}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors mt-6"
          >
            {loading ? "Submitting..." : success ? "✓ Submitted!" : "Submit Subscription"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            We&apos;ll contact you within 24 hours to confirm your subscription
          </p>
        </form>
      </div>
    </div>
  );
}
