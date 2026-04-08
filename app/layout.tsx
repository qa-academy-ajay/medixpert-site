import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'MediXpert Herbal Juice',
  description: 'Health in Every Sip — Ayurvedic Juice Therapy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-green-50">
        {/* Navbar */}
        <nav className="bg-green-700 text-white p-4 flex gap-6">
          <Link href="/" className="hover:text-green-200">Home</Link>
          <Link href="/menu" className="hover:text-green-200">Menu</Link>
          <Link href="/subscription" className="hover:text-green-200">Plans</Link>
          <Link href="/contact" className="hover:text-green-200">Contact</Link>
        </nav>

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-green-700 text-white text-center p-4 mt-12">
          © {new Date().getFullYear()} MediXpert Herbal Juice — Health in Every Sip
        </footer>
      </body>
    </html>
  )
}

