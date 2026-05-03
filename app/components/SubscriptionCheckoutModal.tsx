"use client";

import { useState, useEffect } from "react";
import { juices, plans } from "@/lib/data";
import Image from "next/image";


type SubscriptionCheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCart: Record<string, number>;
  onClearCart?: () => void;
};

type Step = "plan" | "details" | "review";

export default function SubscriptionCheckoutModal({
  isOpen,
  onClose,
  selectedCart,
  onClearCart,
}: SubscriptionCheckoutModalProps) {
  const [step, setStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState<string>("wellness");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Extract juice details with quantities from cart
  const selectedJuiceIds = Object.keys(selectedCart || {});
  const selectedJuicesTotalQty = Object.values(selectedCart || {}).reduce(
    (sum, qty) => sum + qty,
    0
  );
  
  const selectedJuiceDetails = juices
    .filter((j) => selectedJuiceIds.includes(j.id))
    .map((juice) => ({
      ...juice,
      quantity: selectedCart[juice.id],
    }));

  const planDetails = plans.find((p) => p.id === selectedPlan);

  // Calculate total price: sum(juice_price * quantity) * plan_days
  const totalPrice = selectedJuiceDetails.reduce((sum, juice) => {
    return sum + juice.price * (juice.quantity || 0);
  }, 0) * (planDetails?.days || 1);

  const validateDetails = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^\d{6}$/.test(pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToDetails = () => {
    if (!selectedPlan) {
      setErrors({ plan: "Please select a plan" });
      return;
    }
    setErrors({});
    setStep("details");
  };

  const handleNextToReview = () => {
    if (!validateDetails()) return;
    setErrors({});
    setStep("review");
  };

  const handleSubmit = async () => {
    if (!validateDetails()) return;

    setLoading(true);
    try {
      const selectedJuiceNames = selectedJuiceDetails
        .map((j) => `${j.name}-${j.quantity}`)
        .join(", ");

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          message: message.trim(),
          juices: selectedCart,
          plan: `${selectedJuiceNames} - ${planDetails?.label} Plan (${planDetails?.days} days)`,
          totalPrice,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSuccess(true);
      setTimeout(() => {
        onClearCart?.();
        onClose();
        resetForm();
      }, 2000);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("plan");
    setSelectedPlan("wellness");
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setMessage("");
    setErrors({});
    setSuccess(false);
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Confirmed!
          </h2>
          <p className="text-gray-600">
            Thank you for subscribing. Check your email for details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {step === "plan"
                ? "Select Your Plan"
                : step === "details"
                  ? "Delivery Details"
                  : "Review Order"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Step {step === "plan" ? 1 : step === "details" ? 2 : 3} of 3
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Selected Juices Summary */}
          <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-sm font-semibold text-emerald-900 mb-2">
              Your selected juice
              {selectedJuiceIds.length !== 1 ? "s" : ""}:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedJuiceDetails.map((juice) => (
                <span
                  key={juice.id}
                  className="px-3 py-1 bg-white border border-emerald-200 rounded-full text-xs font-medium text-emerald-700"
                >
                  {juice.name} - {juice.quantity}
                </span>
              ))}
            </div>
          </div>

          {/* Step 1: Plan Selection */}
          {step === "plan" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {plans.map((plan) => {
                  const priceForPlan = selectedJuiceDetails.reduce((sum, juice) => {
                    return sum + juice.price * (juice.quantity || 0);
                  }, 0) * plan.days;
                  
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${selectedPlan === plan.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-emerald-300"
                        }`}
                    >
                      <p className="text-sm font-semibold text-gray-600 mb-2">
                        {plan.label}
                      </p>
                      <p className="text-2xl font-bold text-emerald-700 mb-1">
                        {plan.days} Days
                      </p>
                      <p className="text-lg font-bold text-gray-900 mb-2">
                        ₹{priceForPlan}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{plan.perDay * selectedJuicesTotalQty}/day × {plan.days} days
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.plan && (
                <p className="text-red-600 text-sm mb-4">{errors.plan}</p>
              )}

              {/* Price Breakdown Summary */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-amber-900 mb-3">Price Details</h3>
                <div className="space-y-2 text-sm">
                  {selectedJuiceDetails.map((juice) => (
                    <div key={juice.id} className="flex justify-between text-amber-800">
                      <span>{juice.name} × {juice.quantity}</span>
                      <span>₹{juice.price * (juice.quantity || 0)} per day</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-amber-200 font-semibold text-amber-900 flex justify-between">
                    <span>Daily Rate</span>
                    <span>₹{selectedJuiceDetails.reduce((sum, juice) => sum + juice.price * (juice.quantity || 0), 0)}</span>
                  </div>
                  <div className="text-amber-900 flex justify-between">
                    <span>Plan Duration</span>
                    <span>{planDetails?.days} days</span>
                  </div>
                  <div className="pt-2 border-t border-amber-200 font-bold text-emerald-700 flex justify-between">
                    <span>Total Payable</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details Form */}
          {step === "details" && (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Full Name"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="email address"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="address for delivery"
                  rows={2}
                />
                {errors.address && (
                  <p className="text-red-600 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Gurgaon"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Haryana"
                  />
                  {errors.state && (
                    <p className="text-red-600 text-xs mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.pincode ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="122001"
                  />
                  {errors.pincode && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Any special instructions or health notes..."
                  rows={2}
                />
              </div>
            </form>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <div className="space-y-4">
              {/* Plan & Juices Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Order Summary</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Plan:</span>{" "}
                    {planDetails?.label} - {planDetails?.days} days
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Juices:</span>{" "}
                    {selectedJuiceDetails.map((j) => j.name).join(", ")}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Quantity:</span>{" "}
                    {selectedJuicesTotalQty} juice
                    {selectedJuicesTotalQty !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Delivery Details Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">
                  Delivery Details
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{name}</p>
                  <p>{email}</p>
                  <p>{phone}</p>
                  <p>{address}</p>
                  <p>
                    {city}, {state} - {pincode}
                  </p>
                  {message && <p className="italic text-gray-500">{message}</p>}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {selectedJuiceDetails.map(j => `${j.name} (${j.quantity})`).join(", ")} × {planDetails?.days} days
                  </span>
                  <span className="font-semibold text-gray-900">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="pt-2 border-t border-emerald-200 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-emerald-700">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-between">
          {step !== "plan" && (
            <button
              onClick={() => {
                if (step === "details") setStep("plan");
                else setStep("details");
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Back
            </button>
          )}
          {step === "plan" && <div />}

          {step === "plan" && (
            <button
              onClick={handleNextToDetails}
              className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Continue →
            </button>
          )}

          {step === "details" && (
            <button
              onClick={handleNextToReview}
              className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Review Order →
            </button>
          )}

          {step === "review" && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Confirm Order"}
            </button>
          )}
        </div>

        {errors.submit && (
          <div className="px-6 py-2 bg-red-50 border-t border-red-200 text-red-600 text-sm">
            {errors.submit}
          </div>
        )}
      </div>
    </div>
  );
}
