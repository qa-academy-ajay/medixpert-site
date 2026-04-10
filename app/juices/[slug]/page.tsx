"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { juices } from "@/lib/data";
import SubscriptionModal from "@/app/components/SubscriptionModal";
import { useParams } from "next/navigation";

export default function JuiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const juice = juices.find((j) => j.id === slug);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  if (!juice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-stone-50">
        <h1 className="font-serif text-4xl font-bold text-slate-900 mb-4">Juice Not Found</h1>
        <p className="text-stone-600 mb-8">We couldn&apos;t find this juice in our collection.</p>
        <Link href="/juices" className="bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all">
          Back to Juices
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 sticky top-[72px] z-20">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/juices" className="text-yellow-600 hover:text-yellow-700 font-medium">
            All Juices
          </Link>
          <span className="text-stone-400">/</span>
          <span className="text-slate-900 font-semibold">{juice.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 py-16 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`rounded-2xl border-2 ${juice.border} ${juice.bg} p-12 text-center`}>
            <Image
              src={juice.image}
              alt={juice.name}
              width={300}
              height={400}
              className="w-full max-w-sm object-contain mx-auto"
            />
          </div>

          {/* Content */}
          <div>
            <span className={`inline-block ${juice.badge} text-xs font-bold px-3 py-1.5 rounded-full mb-4`}>
              {juice.emoji} {juice.tag}
            </span>
            <h1 className="font-serif text-5xl font-bold text-slate-900 mb-3">{juice.name}</h1>
            <p className={`text-xl italic mb-6 ${juice.accent}`}>{juice.tagline}</p>
            
            <div className="mb-8">
              <p className="text-base text-stone-600 mb-6 leading-relaxed">
                A premium Ayurvedic juice therapy, freshly prepared with natural herbs and botanical ingredients. Perfect for your wellness journey.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-slate-900">₹{juice.price}</span>
                <span className="text-base text-stone-500">{juice.volume}</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide text-yellow-600">Best For</h3>
              <div className="flex flex-wrap gap-2">
                {juice.bestFor.map((benefit) => (
                  <span key={benefit} className="text-sm bg-yellow-50 border border-yellow-200 text-slate-800 px-4 py-2 rounded-full">
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setSubscribeModalOpen(true)}
              className={`w-full text-white text-lg font-bold py-4 rounded-lg hover:shadow-lg transition-all duration-200 ${juice.btnBg}`}
            >
              Start Healing Today
            </button>
            <p className="text-xs text-stone-500 text-center mt-4">Free 7-day consultation included</p>
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Detailed Composition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-600 mb-6">Ingredients</h3>
              <div className="space-y-4">
                {juice.composition.map((ingredient) => (
                  <div key={ingredient.name} className="flex items-start justify-between pb-4 border-b border-stone-100">
                    <span className="font-medium text-slate-900">{ingredient.name}</span>
                    <span className="text-sm text-yellow-600 font-semibold">{ingredient.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-red-600 mb-6">⚠ Important Precautions</h3>
              <ul className="space-y-4">
                {juice.avoid.map((caution) => (
                  <li key={caution} className="flex gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0 mt-1">•</span>
                    <span className="text-slate-700">{caution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="px-6 py-16 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Morning Ritual",
                desc: "Drink on an empty stomach, 30 minutes before breakfast, for maximum absorption.",
              },
              {
                step: "2",
                title: "Consistency Matters",
                desc: "Take daily for at least 7–15 days to see visible health improvements.",
              },
              {
                step: "3",
                title: "Track Results",
                desc: "Monitor energy levels, digestion, and overall wellness. Get guidance via WhatsApp.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-4 font-serif">{item.step}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Juices */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8">Explore More Juices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {juices
              .filter((j) => j.id !== juice.id)
              .slice(0, 3)
              .map((relatedJuice) => (
                <Link
                  key={relatedJuice.id}
                  href={`/juices/${relatedJuice.id}`}
                  className={`rounded-2xl border-2 ${relatedJuice.border} ${relatedJuice.bg} overflow-hidden hover:shadow-lg transition-all`}
                >
                  <div className="h-48 flex items-center justify-center overflow-hidden">
                    <Image
                      src={relatedJuice.image}
                      alt={relatedJuice.name}
                      width={250}
                      height={250}
                      className="w-auto h-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">{relatedJuice.name}</h3>
                    <p className={`text-sm italic ${relatedJuice.accent}`}>{relatedJuice.tagline}</p>
                    <div className="mt-4 text-sm font-semibold text-yellow-600">View Details →</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="px-6 py-20 bg-white border-t border-stone-200 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">Ready to Experience the Benefits?</h2>
          <p className="text-stone-600 mb-8 text-lg">Start your {juice.name} journey with our flexible subscription plans.</p>
          <button
            onClick={() => setSubscribeModalOpen(true)}
            className={`text-white text-lg font-bold px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-200 ${juice.btnBg}`}
          >
            Subscribe Now
          </button>
        </div>
      </section>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
      />
    </div>
  );
}
