// app/page.tsx
// MediXpert Herbal Juice — Homepage
// Next.js App Router + Tailwind CSS
// Font: Add to app/layout.tsx → import { Playfair_Display, DM_Sans } from "next/font/google"

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SubscriptionModal from "../components/SubscriptionModal";
// import { juices } from "@/lib/data";
// ─── Juice Data ───────────────────────────────────────────────────────────────
const juices = [
  {
    id: "liver-detox",
    emoji: "🫀",
    // add images in public/juices and update paths here
    image: "/juices/liver-detox.png",
    color: "amber",
    tag: "Liver Cleanse Juice",
    name: "Liver Detox",
    tagline: "Flush. Cleanse. Restore.",
    composition: [
      { name: "Giloy juice", qty: "15 ml" },
      { name: "Amla juice", qty: "50 ml" },
      { name: "Beetroot juice", qty: "80 ml" },
      { name: "Methi leaves extract", qty: "15 ml" },
      { name: "Turmeric", qty: "3 ml" },
    ],
    bestFor: ["Fatty liver", "Digestion", "Detox"],
    avoid: ["Liver disease patients under treatment", "Pregnant women", "Autoimmune conditions"],
    price: 50,
    volume: "200 ml",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    dot: "bg-amber-400",
    accent: "#d97706",
  },
  {
    id: "heart-health",
    emoji: "❤️",
    // add images in public/juices and update paths here
    image: "/juices/heart-health.png",
    color: "red",
    tag: "Heart Booster Juice",
    name: "Heart Health",
    tagline: "Strengthen. Circulate. Thrive.",
    composition: [
      { name: "Arjun chaal decoction", qty: "40 ml" },
      { name: "Beetroot juice", qty: "80 ml" },
      { name: "Carrot juice", qty: "80 ml" },
      { name: "Amla juice", qty: "30 ml" },
    ],
    bestFor: ["High cholesterol", "BP support", "Heart health"],
    avoid: ["Low BP patients", "Heart patients on medication"],
    price: 50,
    volume: "200 ml",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-800",
    dot: "bg-red-400",
    accent: "#dc2626",
  },
  {
    id: "sugar-control",
    emoji: "🌿",
    // add images in public/juices and update paths here
    image: "/juices/sugar-control.png",
    color: "green",
    tag: "Sugar Control Juice",
    name: "Sugar Control",
    tagline: "Balance. Regulate. Energise.",
    composition: [
      { name: "Karela juice", qty: "80 ml" },
      { name: "Amla juice", qty: "40 ml" },
      { name: "Methi water", qty: "30 ml" },
      { name: "Jamun leaf extract", qty: "10 ml" },
      { name: "Neem extract", qty: "5 ml" },
    ],
    bestFor: ["Pre-diabetes", "High sugar levels"],
    avoid: ["Low sugar tendency", "Strong diabetes medication", "Pregnant women"],
    price: 50,
    volume: "200 ml",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
    dot: "bg-green-500",
    accent: "#16a34a",
  },
  {
    id: "kidney-detox",
    emoji: "💧",
    // add images in public/juices and update paths here
    image: "/juices/kidney-detox.png",
    color: "sky",
    tag: "Kidney Cleanse Juice",
    name: "Kidney Detox",
    tagline: "Hydrate. Purify. Renew.",
    composition: [
      { name: "Lauki juice", qty: "150 ml" },
      { name: "Dhaniya juice", qty: "40 ml" },
      { name: "Amla juice", qty: "30 ml" },
      { name: "Lemon", qty: "5 ml" },
    ],
    bestFor: ["Water retention", "Mild kidney support", "Summer hydration"],
    avoid: ["Advanced kidney disease", "Dialysis patients"],
    price: 50,
    volume: "200 ml",
    bg: "bg-sky-50",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-400",
    accent: "#0284c7",
  },
  {
    id: "weight-loss",
    emoji: "🔥",
    // add images in public/juices and update paths here
    image: "/juices/weight-loss.png",
    color: "orange",
    tag: "Fat Cutter Drink",
    name: "Weight Loss",
    tagline: "Cut. Burn. Transform.",
    composition: [
      { name: "Lauki juice", qty: "150 ml" },
      { name: "Methi water", qty: "20 ml" },
      { name: "Dhaniya juice", qty: "20 ml" },
      { name: "Ginger", qty: "3 ml" },
      { name: "Lemon", qty: "5 ml" },
    ],
    bestFor: ["Weight loss", "Belly fat", "Bloating"],
    avoid: ["Underweight individuals", "Gastric ulcer patients"],
    price: 50,
    volume: "200 ml",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    dot: "bg-orange-400",
    accent: "#ea580c",
  },
  {
    id: "blood-purifier",
    emoji: "✨",
    // add images in public/juices and update paths here
    image: "/juices/blood-purifier.png",
    color: "purple",
    tag: "Skin Glow Detox",
    name: "Blood Purifier",
    tagline: "Purify. Glow. Radiate.",
    composition: [
      { name: "Neem extract", qty: "5 ml" },
      { name: "Giloy juice", qty: "15 ml" },
      { name: "Amla juice", qty: "50 ml" },
      { name: "Tulsi extract", qty: "5 ml" },
    ],
    bestFor: ["Acne / skin issues", "Body detox", "Immunity support"],
    avoid: ["Pregnant women", "Low BP individuals", "Long-term continuous use"],
    price: 50,
    volume: "200 ml",
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-800",
    dot: "bg-purple-400",
    accent: "#9333ea",
  },
  {
    id: "immunity-booster",
    emoji: "🛡️",
    // add images in public/juices and update paths here
    image: "/juices/immunity-booster.png",
    color: "emerald",
    tag: "Immunity Shot",
    name: "Immunity Booster",
    tagline: "Defend. Protect. Recover.",
    composition: [
      { name: "Amla juice", qty: "80 ml" },
      { name: "Giloy", qty: "10 ml" },
      { name: "Ginger", qty: "3 ml" },
      { name: "Turmeric", qty: "3 ml" },
      { name: "Honey (optional)", qty: "5 ml" },
    ],
    bestFor: ["Frequent cold/cough", "Low immunity", "Seasonal protection"],
    avoid: ["Autoimmune disease patients", "Allergy-prone individuals"],
    price: 50,
    volume: "200 ml",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
    accent: "#059669",
  },
];

// ─── Juice Card ───────────────────────────────────────────────────────────────
function JuiceCard({ juice, isOpen, onToggle, onSubscribeClick }: { juice: (typeof juices)[0]; isOpen: boolean; onToggle: () => void; onSubscribeClick: (juiceId: string) => void }) {

  return (
    <div
      className={`rounded-2xl border ${juice.border} ${juice.bg} overflow-hidden transition-all duration-300`}
    >
      {/* Card Header */}
      <div className="p-5">
       
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${juice.badge}`}>
            {juice.tag}
          </span>
          <span className="text-2xl">{juice.emoji}</span>
        </div>
         {/* add juice image here */}
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden mb-3">
          <Image
            src={juice.image}
            alt={juice.name}
            width={300}
            height={300}
            className="w-auto h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{juice.name} Juice</h3>
        <p className="text-sm text-gray-500 italic mb-4">{juice.tagline}</p>

        {/* Best For Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {juice.bestFor.map((b) => (
            <span
              key={b}
              className="text-xs bg-white/70 border border-gray-200 text-gray-600 px-2 py-1 rounded-full"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Price + Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{juice.price}</span>
            <span className="text-sm text-gray-400 ml-1">{juice.volume}</span>
          </div>
          <button
            onClick={onToggle}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            {isOpen ? "▲ Show Less" : "▼ View Details"}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      
      {isOpen && (
        <div className="border-t border-white/60 bg-white/50 p-7 space-y-4">
          {/* Composition */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Composition
            </p>
            <div className="space-y-1">
              {juice.composition.map((c) => (
                <div key={c.name} className="flex justify-between text-sm">
                  <span className="text-gray-700">{c.name}</span>
                  <span className="text-gray-400 font-medium">{c.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avoid */}
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              ⚠ Avoid if
            </p>
            <ul className="space-y-1">
              {juice.avoid.map((a) => (
                <li key={a} className="text-xs text-red-600 flex gap-2">
                  <span>•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onSubscribeClick(juice.id)}
            className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openJuiceId, setOpenJuiceId] = useState<string | null>(null);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [selectedJuiceForSubscription, setSelectedJuiceForSubscription] =
    useState<string | undefined>(undefined);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#juices", label: "Juices" },
    { href: "/plans", label: "Plans" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <main className="min-h-screen bg-[#fafaf7] font-sans">
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-emerald-700 text-lg">
            <span>🌿</span>
            <span>MediXpert</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-gray-600 hover:text-emerald-700"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="fixed left-0 top-0 h-screen w-64 bg-white flex flex-col p-6 space-y-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 font-bold text-emerald-700 text-lg">
                <span>🌿</span>
                <span>MediXpert</span>
              </div>
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-gray-600 hover:text-emerald-700 transition-colors py-2 px-3 rounded-lg hover:bg-emerald-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-emerald-900 text-white px-6 py-24 text-center">
        {/* Decorative circles */}
        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-emerald-700 rounded-full opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 bg-emerald-600 rounded-full opacity-15 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            🌱 Rooted in Ayurveda · Made in Bihar
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Heal Naturally,<br />
            <span className="text-emerald-300">One Glass at a Time</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Seven science-backed Ayurvedic juices crafted for modern health challenges —
            liver, heart, sugar, immunity & more. All at just ₹50.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="#juices"
              className="bg-white text-emerald-900 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Explore Juices
            </Link>
            <Link
              href="/plans"
              className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-gray-100 px-6 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "7", label: "Juice Variants" },
            { value: "₹50", label: "Per 200 ml Glass" },
            { value: "100%", label: "Natural Ingredients" },
            { value: "3 Plans", label: "7 / 15 / 30 Days" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-emerald-700">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Juice Cards ── */}
      <section id="juices" className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            Our Menu
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            7 Healing Juices
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Each juice is freshly prepared from Ayurvedic herbs — click any card to see
            full composition and usage guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {juices.map((juice) => (
            <JuiceCard
              key={juice.id}
              juice={juice}
              isOpen={openJuiceId === juice.id}
              onToggle={() => setOpenJuiceId(openJuiceId === juice.id ? null : juice.id)}
              onSubscribeClick={(juiceId) => {
                setSelectedJuiceForSubscription(juiceId);
                setSubscribeModalOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white border-y border-gray-100 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
              Simple process
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose your juice",
                desc: "Pick from 7 Ayurvedic variants based on your health goal.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Select a plan",
                desc: "Subscribe for 7, 15, or 30 days for consistent wellness benefits.",
                icon: "📅",
              },
              {
                step: "03",
                title: "Drink & heal",
                desc: "Consume fresh every morning on an empty stomach for best results.",
                icon: "🌅",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-emerald-400 tracking-widest">{s.step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscription Plans Preview ── */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
            Subscription Plans
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Pick your wellness journey
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            All plans include fresh daily juice delivery at just ₹50/day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { days: 7, label: "Starter", price: 350, desc: "Great for first-timers to experience the benefits.", popular: false },
            { days: 15, label: "Wellness", price: 750, desc: "Our most popular plan for noticeable health improvement.", popular: true },
            { days: 30, label: "Transform", price: 1500, desc: "Full Ayurvedic therapy cycle for lasting results.", popular: false },
          ].map((plan) => (
            <div
              key={plan.days}
              className={`rounded-2xl p-6 border ${
                plan.popular
                  ? "border-emerald-500 bg-emerald-900 text-white"
                  : "border-gray-200 bg-white text-gray-900"
              } relative`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>
                {plan.label}
              </p>
              <p className="text-4xl font-extrabold mb-1">
                {plan.days}<span className={`text-base font-medium ml-1 ${plan.popular ? "text-emerald-300" : "text-gray-400"}`}>days</span>
              </p>
              <p className={`text-2xl font-bold mb-4 ${plan.popular ? "text-emerald-200" : "text-emerald-700"}`}>
                ₹{plan.price}
              </p>
              <p className={`text-sm mb-6 leading-relaxed ${plan.popular ? "text-emerald-100" : "text-gray-500"}`}>
                {plan.desc}
              </p>
              <Link
                href="/plans"
                className={`block text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${
                  plan.popular
                    ? "bg-white text-emerald-900 hover:bg-emerald-50"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                Subscribe — ₹{plan.price}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-emerald-50 border-t border-emerald-100 px-6 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-emerald-900 mb-3">
          Ready to start healing?
        </h2>
        <p className="text-emerald-700 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          Join hundreds of customers rediscovering the power of Ayurvedic juice therapy.
          Starting at just ₹50 a day.
        </p>
        <Link
          href="/plans"
          className="inline-block bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-800 transition-colors"
        >
          Start Your Plan Today
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>🌿</span>
              <p className="text-white font-bold">MediXpert Herbal Juice Corner</p>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Authentic Ayurvedic juice therapy rooted in Bihar, India. Affordable, pure & effective.
            </p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="space-y-2">
              <p className="text-white font-medium mb-3">Menu</p>
              {juices.map((j) => (
                <p key={j.id} className="hover:text-white cursor-pointer transition-colors">
                  {j.name} Juice
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-white font-medium mb-3">Company</p>
              <p className="hover:text-white cursor-pointer transition-colors">About Us</p>
              <p className="hover:text-white cursor-pointer transition-colors">Plans</p>
              <p className="hover:text-white cursor-pointer transition-colors">Contact</p>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} MediXpert Herbal Juice Corner · Bihar, India · All rights reserved.
        </div>
      </footer>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={subscribeModalOpen}
        onClose={() => {
          setSubscribeModalOpen(false);
          setSelectedJuiceForSubscription(undefined);
        }}
        selectedJuiceId={selectedJuiceForSubscription}
      />
    </main>
  );
}