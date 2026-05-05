"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { juices, juiceCategories } from "@/lib/data";

export default function JuicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const filteredJuices =
    selectedCategory === "all"
      ? juices
      : juices.filter((juice) => juice.category === selectedCategory);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200 px-6 py-16 text-center">
        <div className="md:col-span-3 text-left">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Wellness Menu</h1>
          <p className="text-gray-500 text-lg">Choose your juice from our selection of Seven Healing Juices</p>
        </div>
      </section>

      {/* Mobile Filter Button */}
      <div className="md:hidden px-6 mt-6">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold shadow"
        >
          ☰ Filter Categories
        </button>
      </div>
      {/* Juice Grid with Sidebar */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex gap-8">
          {isDrawerOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          <aside
            className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 md:w-56 bg-white md:bg-transparent z-50 transform transition-transform duration-300 ease-in-out
  ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0`}
          >
            <div className="p-4 md:p-0">

              {/* Mobile Header */}
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide">
                  Filter by Category
                </h3>
                <button onClick={() => setIsDrawerOpen(false)}>✕</button>
              </div>

              {/* Filters */}
              <div className="space-y-3 md:sticky md:top-24">
                <h3 className="hidden md:block text-sm font-bold text-stone-700 uppercase tracking-wide mb-4">
                  Filter by Category
                </h3>

                {juiceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsDrawerOpen(false); // auto close on mobile
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all text-left ${selectedCategory === cat.id
                      ? "bg-yellow-500 text-slate-900 shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Juice Grid */}
          <div className="flex-1">
            {filteredJuices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJuices.map((juice) => (
                  <Link
                    key={juice.id}
                    href={`/juices/${juice.id}`}
                    className={`rounded-2xl border-2 ${juice.border} ${juice.bg} overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full`}
                  >
                    {/* Image */}
                    <div className="w-full h-64 bg-stone-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={juice.image}
                        alt={juice.name}
                        width={300}
                        height={300}
                        className="w-auto h-full object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4 w-fit ${juice.badge}`}>
                        {juice.emoji} {juice.tag}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">{juice.name}</h3>
                      <p className={`text-sm italic mb-4 ${juice.accent}`}>{juice.tagline}</p>

                      {/* Best For */}
                      <div className="mb-4 flex-grow">
                        <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide mb-2">Best For</p>
                        <div className="flex flex-wrap gap-1.5">
                          {juice.bestFor.slice(0, 2).map((benefit) => (
                            <span
                              key={benefit}
                              className="text-xs bg-white/60 border border-stone-300 text-stone-700 px-2.5 py-1 rounded-full"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                        <div>
                          <span className="text-2xl font-bold text-slate-900">₹{juice.price}</span>
                          <span className="text-xs text-stone-500 ml-2">{juice.volume}</span>
                        </div>
                        <div className="text-yellow-600 font-semibold text-sm">View Details →</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-stone-600 text-lg">No juices found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white border-t border-stone-200 px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "✓",
              title: "100% Natural",
              desc: "No preservatives, additives, or artificial flavors. Pure Ayurvedic ingredients.",
            },
            {
              icon: "🥤",
              title: "Fresh Daily",
              desc: "Prepared fresh every morning in small batches for maximum potency.",
            },
            {
              icon: "📋",
              title: "Science-Backed",
              desc: "Formulated by Ayurvedic experts with evidence-based herb combinations.",
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-4 font-bold text-yellow-600">{item.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
