// "use client";

// import { useCart } from "@/app/context/CartContext";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CheckoutPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     paymentMethod: "cod",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const {
//     cart,
//     removeFromCart,
//     clearCart,
//     getTotalItems,
//     getTotalPrice,
//   } = useCart();
//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-stone-50 pt-24 pb-16">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center py-20">
//             <h1 className="font-serif text-4xl font-bold text-slate-900 mb-3">Cart is Empty</h1>
//             <p className="text-stone-600 mb-8">You need to add items before checkout.</p>
//             <Link
//               href="/juices"
//               className="inline-block bg-yellow-500 text-slate-900 font-semibold px-8 py-4 rounded-lg hover:bg-yellow-400 transition-all"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       newErrors.email = "Invalid email format";
//     if (!formData.phone.trim()) newErrors.phone = "Phone is required";
//     if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
//       newErrors.phone = "Phone must be 10 digits";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.state.trim()) newErrors.state = "State is required";
//     if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
//     if (!/^\d{6}$/.test(formData.pincode))
//       newErrors.pincode = "Pincode must be 6 digits";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handlePlaceOrder = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Log order details (in a real app, this would be sent to backend)
//       console.log("Order placed:", {
//         items: cart,
//         customerInfo: formData,
//         total: getTotalPrice(),
//       });

//       setOrderPlaced(true);

//       // Clear cart
//       clearCart();

//       // Redirect after 3 seconds
//       setTimeout(() => {
//         router.push("/order-success");
//       }, 3000);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (orderPlaced) {
//     return (
//       <div className="min-h-screen bg-stone-50 pt-24 pb-16 flex items-center justify-center">
//         <div className="text-center py-20">
//           <div className="text-6xl mb-6">✓</div>
//           <h1 className="font-serif text-4xl font-bold text-slate-900 mb-3">
//             Order Placed Successfully!
//           </h1>
//           <p className="text-stone-600 mb-8">
//             Thank you for your order. Redirecting to order details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const total = getTotalPrice();
//   const tax = Math.round(total * 0.05);
//   const grandTotal = total + tax;

//   return (
//     <main className="min-h-screen bg-[#fafaf7] font-sans">
//       <div className="min-h-screen bg-stone-50 pt-24 pb-16">
//         <div className="max-w-6xl mx-auto px-6">
//           {/* Header */}
//           <div className="mb-12">
//             <Link href="/checkout-summary" className="text-yellow-600 hover:text-yellow-700 font-medium mb-6 inline-block">
//               ← Back to Summary
//             </Link>
//             <h1 className="font-serif text-4xl font-bold text-slate-900">Checkout</h1>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Order Summary Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-xl border border-stone-200 p-8 sticky top-24">
//                 <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

//                 {/* Items */}
//                 <div className="space-y-4 mb-6 pb-6 border-b border-stone-200">
//                   {cart.map((item) => (
//                     <div key={item.id} className="flex justify-between">
//                       <div>
//                         <p className="font-medium text-slate-900">{item.name}</p>
//                         <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
//                       </div>
//                       <p className="font-semibold text-slate-900">
//                         ₹{item.price * item.quantity}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Totals */}
//                 <div className="space-y-3 mb-6 pb-6 border-b border-stone-200">
//                   <div className="flex justify-between text-stone-700">
//                     <span>Subtotal</span>
//                     <span className="font-medium">₹{total}</span>
//                   </div>
//                   <div className="flex justify-between text-stone-700">
//                     <span>Tax (5%)</span>
//                     <span className="font-medium">₹{tax}</span>
//                   </div>
//                   <div className="flex justify-between text-stone-700">
//                     <span>Shipping</span>
//                     <span className="font-medium">Free</span>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center text-lg">
//                   <span className="font-bold text-slate-900">Total</span>
//                   <span className="font-bold text-yellow-600">₹{grandTotal}</span>
//                 </div>
//               </div>
//             </div>
//             {/* Checkout Form */}
//             <div className="lg:col-span-2">
//               <form onSubmit={handlePlaceOrder} className="space-y-8">
//                 {/* Delivery Information */}
//                 <div className="bg-white rounded-xl border border-stone-200 p-8">
//                   <h2 className="text-xl font-bold text-slate-900 mb-6">
//                     Delivery Information
//                   </h2>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.fullName
//                           ? "border-red-500"
//                           : "border-stone-200"
//                           }`}
//                         placeholder="John Doe"
//                       />
//                       {errors.fullName && (
//                         <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Email *
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email
//                             ? "border-red-500"
//                             : "border-stone-200"
//                             }`}
//                           placeholder="john@example.com"
//                         />
//                         {errors.email && (
//                           <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Phone *
//                         </label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.phone
//                             ? "border-red-500"
//                             : "border-stone-200"
//                             }`}
//                           placeholder="9876543210"
//                         />
//                         {errors.phone && (
//                           <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-slate-700 mb-2">
//                         Address *
//                       </label>
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.address
//                           ? "border-red-500"
//                           : "border-stone-200"
//                           }`}
//                         placeholder="123 Main Street"
//                         rows={3}
//                       />
//                       {errors.address && (
//                         <p className="text-red-600 text-sm mt-1">{errors.address}</p>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           City *
//                         </label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.city
//                             ? "border-red-500"
//                             : "border-stone-200"
//                             }`}
//                           placeholder="Mumbai"
//                         />
//                         {errors.city && (
//                           <p className="text-red-600 text-sm mt-1">{errors.city}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           State *
//                         </label>
//                         <input
//                           type="text"
//                           name="state"
//                           value={formData.state}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.state
//                             ? "border-red-500"
//                             : "border-stone-200"
//                             }`}
//                           placeholder="Maharashtra"
//                         />
//                         {errors.state && (
//                           <p className="text-red-600 text-sm mt-1">{errors.state}</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">
//                           Pincode *
//                         </label>
//                         <input
//                           type="text"
//                           name="pincode"
//                           value={formData.pincode}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.pincode
//                             ? "border-red-500"
//                             : "border-stone-200"
//                             }`}
//                           placeholder="400001"
//                         />
//                         {errors.pincode && (
//                           <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment Method */}
//                 <div className="bg-white rounded-xl border border-stone-200 p-8">
//                   <h2 className="text-xl font-bold text-slate-900 mb-6">
//                     Payment Method
//                   </h2>
//                   <div className="space-y-3">
//                     <label className="flex items-center cursor-pointer">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="cod"
//                         checked={formData.paymentMethod === "cod"}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-yellow-500"
//                       />
//                       <span className="ml-3 text-slate-700 font-medium">
//                         Cash on Delivery
//                       </span>
//                     </label>
//                     <label className="flex items-center cursor-pointer opacity-50 pointer-events-none">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="card"
//                         disabled
//                         className="w-4 h-4 text-gray-300"
//                       />
//                       <span className="ml-3 text-slate-700 font-medium">
//                         Credit/Debit Card (Coming Soon)
//                       </span>
//                     </label>
//                     <label className="flex items-center cursor-pointer opacity-50 pointer-events-none">
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value="upi"
//                         disabled
//                         className="w-4 h-4 text-gray-300"
//                       />
//                       <span className="ml-3 text-slate-700 font-medium">
//                         UPI (Coming Soon)
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Place Order Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-yellow-500 text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
//                 >
//                   {isSubmitting ? "Processing..." : "Place Order"}
//                 </button>
//               </form>
//             </div>


//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    clearCart,
    getTotalPrice,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 🚫 Empty cart protection
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Cart is Empty</h1>
          <Link href="/juices" className="bg-yellow-500 px-6 py-3 rounded">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ✅ VALIDATION
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Required";

    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    const phone = formData.phone.replace(/\D/g, "");
    if (!phone) newErrors.phone = "Required";
    else if (phone.length !== 10) newErrors.phone = "Must be 10 digits";

    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.state.trim()) newErrors.state = "Required";

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "6 digit pincode";
    }

    setErrors(newErrors);

    // scroll to first error
    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      document.getElementsByName(firstError)[0]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  // ✅ INPUT CHANGE
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let cleanValue = value;

    // sanitize inputs
    if (name === "phone") cleanValue = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pincode") cleanValue = value.replace(/\D/g, "").slice(0, 6);

    setFormData((prev) => ({ ...prev, [name]: cleanValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ PLACE ORDER
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const orderId = `ORD-${Date.now()}`;

      // simulate API
      await new Promise((r) => setTimeout(r, 1200));

      const orderData = {
        orderId,
        items: cart,
        customer: formData,
        total: getTotalPrice(),
      };

      console.log("ORDER:", orderData);

      setOrderPlaced(true);
      clearCart();

      // redirect
      setTimeout(() => {
        router.push(`/order-success?orderId=${orderId}`);
      }, 2500);

    } catch (err) {
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = getTotalPrice();
  const tax = Math.round(total * 0.05);
  const grandTotal = total + tax;

  // ✅ SUCCESS STATE
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold">Order Placed!</h2>
          <p className="text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-stone-50 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-10">
          <Link href="/cart" className="text-yellow-600">
            ← Back
          </Link>
          <h1 className="text-4xl font-bold mt-2">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* SUMMARY */}
          <div className="bg-white p-6 rounded-xl border h-fit sticky top-24">
            <h2 className="font-bold mb-4">Order Summary</h2>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">₹{grandTotal}</span>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white p-6 rounded-xl border space-y-4">

              <input name="fullName" placeholder="Full Name"
                value={formData.fullName} onChange={handleInputChange}
                className="input" />

              <input name="email" placeholder="Email"
                value={formData.email} onChange={handleInputChange}
                className="input" />

              <input name="phone" placeholder="Phone"
                value={formData.phone} onChange={handleInputChange}
                className="input" />

              <textarea name="address" placeholder="Address"
                value={formData.address} onChange={handleInputChange}
                className="input" />

              <div className="grid grid-cols-3 gap-3">
                <input name="city" placeholder="City"
                  value={formData.city} onChange={handleInputChange}
                  className="input" />

                <input name="state" placeholder="State"
                  value={formData.state} onChange={handleInputChange}
                  className="input" />

                <input name="pincode" placeholder="Pincode"
                  value={formData.pincode} onChange={handleInputChange}
                  className="input" />
              </div>

            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-yellow-500 py-4 rounded-lg font-bold"
            >
              {isSubmitting ? "Placing Order..." : `Place Order ₹${grandTotal}`}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}