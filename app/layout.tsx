// app/layout.tsx
// ✅ Server Component — no "use client" here
// ✅ metadata export works correctly
// ✅ useState moved into <Navbar /> client component

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar"; // Import the Navbar client component

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MediXpert Herbal Juice",
  description: "Health in Every Sip — Ayurvedic Juice Therapy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-stone-50 font-sans">

        {/* Navbar (client component — handles drawer state internally) */}
        <Navbar />

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-slate-800 text-white text-center p-4 mt-12">
          © {new Date().getFullYear()} MediXpert Herbal Juice — Health in Every Sip
        </footer>

      </body>
    </html>
  );
}