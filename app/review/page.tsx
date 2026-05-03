"use client";

import Link from "next/link";
import { testimonials } from "@/lib/data";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Customer Reviews</h1>
          <p className="text-stone-600 text-lg">
            Join hundreds of customers who&apos;ve transformed their health with our Ayurvedic juices
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl border border-stone-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-stone-700 mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Result Badge */}
              <div className="mb-6 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-700">
                  ✓ {testimonial.result}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-stone-200 pt-4">
                {/* Name & Role */}
                <p className="font-semibold text-slate-900 mb-1">
                  {testimonial.name}
                </p>
                <p className="text-sm text-stone-600 mb-3">
                  {testimonial.role}
                </p>

                {/* Juice Used */}
                <span className="inline-block text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  Used: {testimonial.juiceUsed}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the transformative power of Ayurvedic juice therapy
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/#juices"
              className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-stone-50 transition-colors"
            >
              Explore Juices
            </Link>
            <Link
              href="/#plans"
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors border border-white/20"
            >
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
