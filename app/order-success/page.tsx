"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <div className="text-6xl mb-6 animate-bounce">✓</div>
          
          <h1 className="font-serif text-4xl font-bold text-slate-900 mb-3">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-stone-600 mb-3">
            Thank you for choosing MediXpert
          </p>
          
          <p className="text-stone-600 mb-8">
            Your order has been confirmed and will be processed shortly. You&apos;ll receive 
            a confirmation email with tracking details.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 text-left rounded">
            <h3 className="font-bold text-slate-900 mb-2">What&apos;s Next?</h3>
            <ul className="space-y-2 text-stone-700 text-sm">
              <li>✓ Check your email for order confirmation</li>
              <li>✓ Your juices will be delivered within 2-3 business days</li>
              <li>✓ Track your order status in your account</li>
              <li>✓ Receive free 7-day consultation via WhatsApp</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/juices"
              className="inline-block w-full bg-yellow-500 text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-block w-full text-yellow-600 font-bold py-4 rounded-lg hover:text-yellow-700 transition-colors border border-yellow-600 hover:border-yellow-700"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-200">
            <p className="text-sm text-stone-500 mb-3">Questions? Contact us</p>
            <div className="flex justify-center gap-4">
              <a href="tel:+919876543210" className="text-yellow-600 hover:text-yellow-700 font-medium">
                📞 Call Us
              </a>
              <a href="mailto:support@medixpert.com" className="text-yellow-600 hover:text-yellow-700 font-medium">
                📧 Email
              </a>
              <a href="https://wa.me/919876543210" className="text-yellow-600 hover:text-yellow-700 font-medium">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
