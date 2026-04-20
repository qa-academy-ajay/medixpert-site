"use client";
import { useState } from "react";

const plans = [
  { days: 7, price: 350, label: "Starter" },
  { days: 15, price: 750, label: "Wellness" },
  { days: 30, price: 1500, label: "Transform" },
];

export default function JuicePlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState(plans[2]); // default 30 days
  const juiceName = "Heart Health-1 Juice";

  const quantity = selectedPlan.days;
  const pricePerUnit = selectedPlan.price / selectedPlan.days;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>

      {/* Selected Juice */}
      <div className="bg-green-100 p-3 rounded mb-4">
        <strong>Your selected juice:</strong> {juiceName}
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {plans.map((plan) => (
          <div
            key={plan.days}
            onClick={() => setSelectedPlan(plan)}
            className={`border p-4 rounded cursor-pointer text-center ${
              selectedPlan.days === plan.days
                ? "border-green-600 bg-green-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">{plan.label}</p>
            <p className="text-lg font-bold">{plan.days} Days</p>
            <p>₹{plan.price}</p>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border rounded p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">Order Summary</h3>

        <p><b>Juice:</b> {juiceName}</p>
        <p><b>Plan:</b> {selectedPlan.days} Days</p>
        <p><b>Quantity:</b> {quantity} Bottles</p>
        <p><b>Price per Juice:</b> ₹{pricePerUnit}</p>

        <hr className="my-2" />

        <h4 className="text-lg font-bold">
          Total: ₹{selectedPlan.price}
        </h4>
      </div>

      {/* Continue Button */}
      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">
        Continue →
      </button>
    </div>
  );
}