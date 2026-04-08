// "use client";
// import { useState } from "react";

// export default function SubscriptionPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     plan: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubscribe = async (plan: string) => {
//     const response = await fetch("/api/subscribe", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formData, plan }),
//     });

//     if (response.ok) {
//       setMessage(`✅ Subscription request for "${plan}" sent successfully!`);
//       setFormData({ name: "", phone: "", plan: "" });
//     } else {
//       setMessage("❌ Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <main className="p-8 max-w-lg mx-auto">
//       <h1 className="text-3xl font-bold text-green-700 mb-6">
//         📦 Subscription Plans
//       </h1>

//       {/* User Details */}
//       <div className="space-y-4 mb-6">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>

//       {/* Plans */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* 7 Days Detox Plan */}
//         <div className="border p-6 rounded-lg bg-white shadow-sm">
//           <h2 className="text-xl font-bold mb-2">🥇 7 Days Detox Plan</h2>
//           <p className="mb-2">
//             Daily morning delivery of Detox Green & Kidney Care juices.
//           </p>
//           <p className="text-green-600 font-semibold mb-4">₹349</p>
//           <button
//             onClick={() => handleSubscribe("7 Days Detox Plan")}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             Subscribe
//           </button>
//         </div>

//         {/* 15 Days Wellness Plan */}
//         <div className="border p-6 rounded-lg bg-white shadow-sm">
//           <h2 className="text-xl font-bold mb-2">🥈 15 Days Wellness Plan</h2>
//           <p className="mb-2">
//             Balanced rotation of Heart Health, Sugar Control, and Liver Cleanse
//             juices for mid‑term rejuvenation.
//           </p>
//           <p className="text-green-600 font-semibold mb-4">₹699</p>
//           <button
//             onClick={() => handleSubscribe("15 Days Wellness Plan")}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             Subscribe
//           </button>
//         </div>

//         {/* 30 Days Health Plan */}
//         <div className="border p-6 rounded-lg bg-white shadow-sm">
//           <h2 className="text-xl font-bold mb-2">🥉 30 Days Health Plan</h2>
//           <p className="mb-2">
//             Full month subscription with rotating juices for complete wellness.
//           </p>
//           <p className="text-green-600 font-semibold mb-4">₹1199</p>
//           <button
//             onClick={() => handleSubscribe("30 Days Health Plan")}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             Subscribe
//           </button>
//         </div>
//       </div>

//       {message && <p className="mt-6 text-lg text-center">{message}</p>}
//     </main>
//   );
// }


// "use client";
// import { useState } from "react";

// export default function SubscriptionPage() {
//   const [formData, setFormData] = useState({ name: "", phone: "", plan: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubscribe = async (plan: string) => {
//     const response = await fetch("/api/subscribe", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formData, plan }),
//     });

//     if (response.ok) {
//       setMessage(`✅ Subscription request for "${plan}" sent successfully!`);
//       setFormData({ name: "", phone: "", plan: "" });
//     } else {
//       setMessage("❌ Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <main className="p-8 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
//         📦 Subscription Plans
//       </h1>

//       {/* User Details */}
//       <div className="space-y-4 mb-8 max-w-md mx-auto">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>

//       {/* Plans in one row */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* 7 Days Detox Plan */}
//         <div className="border p-6 rounded-lg bg-white shadow-sm text-center">
//           <h2 className="text-xl font-bold mb-2">🥇 7 Days Detox Plan</h2>
//           <p className="mb-2">
//             Daily morning delivery of Detox Green & Kidney Care juices.
//           </p>
//           <p className="text-green-600 font-semibold mb-4">₹349</p>
//           <button
//             onClick={() => handleSubscribe("7 Days Detox Plan")}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             Subscribe
//           </button>
//         </div>

//         {/* 15 Days Wellness Plan */}
//         <div className="border p-6 rounded-lg bg-white shadow-sm text-center">
//           <h2 className="text-xl font-bold mb-2">🥈 15 Days Wellness Plan</h2>
//           <p className="mb-2">
//             Balanced rotation of Heart Health, Sugar Control, and Liver Cleanse
//             juices for mid‑term rejuvenation.
//           </p>
//           <p className="text-green-600 font-semibold mb-4">₹699</p>
//           <button
//             onClick={() => handleSubscribe("15 Days Wellness Plan")}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             Subscribe
//           </button>
//         </div>

//         {/* 30 Days Health Plan */}
//         <div className="border p-6 rounded-lg bg-white shadow-sm text-center">
//           <h2 className="text-xl font-bold mb-2">🥉 30 Days Health Plan</h2>
//           <p className="mb-2">
//             Full month subscription with rotating juices for complete wellness.
//           </p>
//           <p className="text-green-600 font-semibold mb-4">₹1199</p>
//           <button
//             onClick={() => handleSubscribe("30 Days Health Plan")}
//             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//           >
//             Subscribe
//           </button>
//         </div>
//       </div>

//       {message && <p className="mt-6 text-lg text-center">{message}</p>}
//     </main>
//   );
// }


// "use client";
// import { useState } from "react";

// export default function SubscriptionPage() {
//   const [formData, setFormData] = useState({ name: "", phone: "" });
//   const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubscribe = async () => {
//     if (!selectedPlan) return;

//     const response = await fetch("/api/subscribe", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...formData, plan: selectedPlan }),
//     });

//     if (response.ok) {
//       setMessage(`✅ Subscription request for "${selectedPlan}" sent successfully!`);
//       setFormData({ name: "", phone: "" });
//       setSelectedPlan(null); // close modal
//     } else {
//       setMessage("❌ Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <main className="p-8 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
//         📦 Subscription Plans
//       </h1>

//       {/* Plans in one row */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {[
//           { title: "🥇 7 Days Detox Plan", desc: "Daily morning delivery of Detox Green & Kidney Care juices.", price: "₹349" },
//           { title: "🥈 15 Days Wellness Plan", desc: "Balanced rotation of Heart Health, Sugar Control, and Liver Cleanse juices.", price: "₹699" },
//           { title: "🥉 30 Days Health Plan", desc: "Full month subscription with rotating juices for complete wellness.", price: "₹1199" },
//         ].map((plan) => (
//           <div key={plan.title} className="border p-6 rounded-lg bg-white shadow-sm text-center">
//             <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
//             <p className="mb-2">{plan.desc}</p>
//             <p className="text-green-600 font-semibold mb-4">{plan.price}</p>
//             <button
//               onClick={() => setSelectedPlan(plan.title)}
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//             >
//               Subscribe
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Modal Dialog */}
//       {selectedPlan && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Subscribe to {selectedPlan}</h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border p-2 rounded mb-4"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border p-2 rounded mb-4"
//               required
//             />
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setSelectedPlan(null)}
//                 className="px-4 py-2 rounded border border-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubscribe}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {message && <p className="mt-6 text-lg text-center">{message}</p>}
//     </main>
//   );
// }



"use client";
import { useState } from "react";

export default function SubscriptionPage() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, plan: selectedPlan }),
    });

    if (response.ok) {
      setSuccess(true); // show success popup
      setFormData({ name: "", phone: "" });
      setSelectedPlan(null); // close input modal
    } else {
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        📦 Subscription Plans
      </h1>

      {/* Plans in one row */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "🥇 7 Days Detox Plan", desc: "Daily morning delivery of Detox Green & Kidney Care juices.", price: "₹349" },
          { title: "🥈 15 Days Wellness Plan", desc: "Balanced rotation of Heart Health, Sugar Control, and Liver Cleanse juices.", price: "₹699" },
          { title: "🥉 30 Days Health Plan", desc: "Full month subscription with rotating juices for complete wellness.", price: "₹1199" },
        ].map((plan) => (
          <div key={plan.title} className="border p-6 rounded-lg bg-white shadow-sm text-center">
            <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
            <p className="mb-2">{plan.desc}</p>
            <p className="text-green-600 font-semibold mb-4">{plan.price}</p>
            <button
              onClick={() => setSelectedPlan(plan.title)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* Input Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Subscribe to {selectedPlan}</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-4 py-2 rounded border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubscribe}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Subscription Successful!</h2>
            <p className="mb-4">Thank you for subscribing. Your plan request has been received.</p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}