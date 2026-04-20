"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Side Drawer — mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-50 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-5 bg-slate-800">
          <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="text-sm font-bold text-white leading-none">MediXpert</p>
              <p className="text-[10px] text-yellow-300 leading-none mt-0.5">Herbal Juice</p>
            </div>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-yellow-200 hover:text-white p-1.5 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-4 py-5 gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === link.href
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-stone-600 hover:bg-stone-100 hover:text-slate-900"
                }`}
            >
              {link.label}
            </Link>
          ))}
          
        </nav>

        {/* Drawer CTA */}
        <div className="px-5 pb-8 space-y-2">
          <Link
            href="/plans"
            onClick={() => setDrawerOpen(false)}
            className="block text-center bg-yellow-500 text-slate-900 text-sm font-semibold px-4 py-3 rounded-lg hover:bg-yellow-400 transition-all"
          >
            Order Now
          </Link>
          <p className="text-center text-xs text-stone-500 pt-2">Starting ₹350 · Gurgaon, India</p>
        </div>
      </aside>

      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 bg-white/98 backdrop-blur-sm border-b border-stone-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl">🌿</span>
            <div>
              <p className="font-serif text-sm font-bold text-slate-900 leading-none group-hover:text-yellow-600 transition-colors">MediXpert</p>
              <p className="text-[10px] text-stone-500 leading-none mt-0.5 font-light">Herbal Juice</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                    ? "bg-stone-100 text-slate-900 font-semibold"
                    : "text-stone-600 hover:text-slate-900 hover:bg-stone-50"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            
            <Link
              href="/plans"
              className="hidden md:inline-block bg-yellow-500 text-slate-900 text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-yellow-400 transition-all duration-200 shadow-sm"
            >
              Subscribe
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-stone-100 transition-colors"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
