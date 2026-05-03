"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { juices } from "@/lib/data";
import SubscriptionCheckoutModal from "@/app/components/SubscriptionCheckoutModal";

type CheckoutType = "order" | "subscribe" | null;

export default function CheckoutSummaryPage() {
    const router = useRouter();
    const { cart, clearCart, getTotalItems, getTotalPrice } = useCart();
    const [checkoutType, setCheckoutType] = useState<CheckoutType>(null);
    const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-stone-50 pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center py-20">
                        <div className="text-6xl mb-6">🛒</div>
                        <h1 className="font-serif text-4xl font-bold text-slate-900 mb-3">Cart is Empty</h1>
                        <p className="text-stone-600 mb-8 text-lg">Add some juices to proceed with checkout.</p>
                        <Link
                            href="/#juices"
                            className="inline-block bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = getTotalPrice();
    const tax = Math.round(subtotal * 0.05);
    const shipping = 'Free';
    const total = subtotal + tax + (shipping === 'Free' ? 0 : shipping);

    const handleProceedToOrder = () => {
        setCheckoutType("order");
        setTimeout(() => {
            router.push("/checkout");
        }, 300);
    };

    const handleProceedToSubscribe = () => {
        setCheckoutType("subscribe");
        setSubscribeModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-stone-50 pt-20 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/cart"
                        className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-flex items-center gap-2"
                    >
                        <span>←</span> Back to Cart
                    </Link>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Order Review</h1>
                    <p className="text-stone-600">Review your items and choose how to checkout</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items Review */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Items Summary */}
                        <div className="bg-white rounded-xl border border-stone-200 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Items Summary</h2>

                            <div className="space-y-4">
                                {cart.map((item) => {
                                    const juice = juices.find((j) => j.id === item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 pb-4 border-b border-stone-200 last:border-b-0 last:pb-0"
                                        >
                                            {/* Image */}
                                            <div className="w-20 h-20 flex-shrink-0 bg-stone-50 rounded-lg flex items-center justify-center overflow-hidden">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={80}
                                                        height={80}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-3xl">{juice?.emoji}</span>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                                                <p className="text-sm text-stone-600">{item.volume}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-sm font-medium text-stone-700">
                                                        Qty: <span className="font-bold text-emerald-600">{item.quantity}</span>
                                                    </span>
                                                    <span className="text-sm font-medium text-stone-700">
                                                        @ <span className="font-bold">₹{item.price}</span>/piece
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-lg font-bold text-slate-900">₹{item.price * item.quantity}</p>
                                                <p className="text-xs text-stone-500 mt-1">{item.quantity} × ₹{item.price}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-white rounded-xl border border-stone-200 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Price Breakdown</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-stone-700">
                                    <span>Subtotal ({getTotalItems()} items)</span>
                                    <span className="font-medium">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-stone-700">
                                    <span>Tax (5%)</span>
                                    <span className="font-medium">₹{tax}</span>
                                </div>
                                <div className="flex justify-between text-stone-700">
                                    <span>Shipping</span>
                                    <span className="font-medium">₹{shipping}</span>
                                </div>
                                <div className="pt-3 border-t border-stone-200 flex justify-between">
                                    <span className="font-bold text-slate-900">Total Amount</span>
                                    <span className="text-2xl font-bold text-emerald-600">₹{total}</span>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* One-Time Order */}
                            <div className="p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg">
                                <div className="text-3xl mb-3">📦</div>
                                <h3 className="font-bold text-slate-900 mb-2">One-Time Order</h3>
                                <p className="text-sm text-stone-600 mb-4">
                                    Purchase juices once with payment & delivery options
                                </p>
                                <button
                                    type="button"
                                    onClick={handleProceedToOrder}
                                    className="mt-4 w-full py-2 bg-yellow-500 text-slate-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                                >
                                    Order Now →
                                </button>
                            </div>

                            {/* Subscription */}
                            <div className="p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg">
                                <div className="text-3xl mb-3">🔁</div>
                                <h3 className="font-bold text-slate-900 mb-2">Subscribe</h3>
                                <p className="text-sm text-stone-600 mb-4">
                                    Get daily juices for 7, 15, or 30 days at best prices
                                </p>
                                <button
                                    type="button"
                                    onClick={handleProceedToSubscribe}
                                    className="mt-4 w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Subscribe Now →
                                </button>
                            </div>

                        </div>

                        {/* Benefits Info */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                            <h3 className="font-bold text-emerald-900 mb-4">💡 Why Subscribe?</h3>
                            <ul className="space-y-2 text-sm text-emerald-800">
                                <li className="flex gap-2">
                                    <span>✓</span>
                                    <span>Save up to 20% on regular prices</span>
                                </li>
                                <li className="flex gap-2">
                                    <span>✓</span>
                                    <span>Free home delivery every morning</span>
                                </li>
                                <li className="flex gap-2">
                                    <span>✓</span>
                                    <span>7-day free wellness consultation</span>
                                </li>
                                <li className="flex gap-2">
                                    <span>✓</span>
                                    <span>Cancel anytime, no hidden charges</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Sticky Sidebar - Quick Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-stone-200 p-6 sticky top-24">

                            {/* Continue Shopping */}
                            <Link
                                href="/#home"
                                className="block text-center mt-4 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Modal */}
            <SubscriptionCheckoutModal
                isOpen={subscribeModalOpen}
                onClose={() => {
                    setSubscribeModalOpen(false);
                    setCheckoutType(null);
                }}
                selectedCart={Object.fromEntries(cart.map((item) => [item.id, item.quantity]))}
                onClearCart={clearCart}
            />
        </main>
    );
}
