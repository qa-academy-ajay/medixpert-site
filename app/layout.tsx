// app/layout.tsx
// ✅ Server Component — no "use client" here
// ✅ metadata export works correctly
// ✅ useState moved into <Navbar /> client component

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./navbar"; // Import the Navbar client component

export const metadata: Metadata = {
  title: "MediXpert Herbal Juice",
  description: "Health in Every Sip — Ayurvedic Juice Therapy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-green-50">

        {/* Navbar (client component — handles drawer state internally) */}
        <Navbar />

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-green-700 text-white text-center p-4 mt-12">
          © {new Date().getFullYear()} MediXpert Herbal Juice — Health in Every Sip
        </footer>

      </body>
    </html>
  );
}