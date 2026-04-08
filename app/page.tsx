import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-green-50 min-h-screen flex flex-col items-center justify-center">
      <section className="relative w-full h-[500px]">
        <Image
          src="/banner-herbal.png"
          alt="MediXpert Herbal Juice Banner"
          width={1920}
          height={500}
          className="w-full h-full object-cover rounded-lg shadow-lg"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 text-white">
          <h1 className="text-5xl font-bold mb-4">MediXpert Herbal Juice</h1>
          <p className="text-lg mb-6">Health in Every Sip — Ayurvedic Juice Therapy</p>
          <a
            href="/menu"
            className="bg-yellow-400 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Explore Our Juice Menu
          </a>
        </div>
      </section>
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-green-700 mb-4">
          🌿 MediXpert Herbal Juice
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Health in Every Sip — Ayurvedic Juice Therapy for Daily Wellness
        </p>
        <a
          href="/menu"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Explore Our Juice Menu
        </a>
      </section>

      {/* Juice Highlights */}
      <section className="w-full max-w-4xl px-6 py-12">
        <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">
          🍹 Featured Juices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border p-6 rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-2">🥤 Detox Green</h3>
            <p className="text-gray-700 mb-2">
              Lauki + Dhaniya + Amla + Aloe Vera + Ginger
            </p>
            <p className="text-sm text-gray-600 mb-2">
              👉 Daily detox, digestion, freshness
            </p>
            <p className="text-green-600 font-semibold">₹50 (200 ml)</p>
          </div>

          <div className="border p-6 rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-2">💧 Kidney Care</h3>
            <p className="text-gray-700 mb-2">
              Lauki + Dhaniya + Amla + Lemon
            </p>
            <p className="text-sm text-gray-600 mb-2">
              👉 Hydration, kidney support
            </p>
            <p className="text-green-600 font-semibold">₹50 (200 ml)</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-green-100 w-full py-12 px-6">
        <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">
          💬 What Our Customers Say
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700">
            “Detox Green keeps me fresh every morning — it’s my daily ritual!”
          </blockquote>
          <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700">
            “Kidney Care juice helped me stay hydrated during summer. Highly recommended.”
          </blockquote>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-semibold text-green-700 mb-4">
          📍 Visit MediXpert Juice Corner
        </h2>
        <p className="text-gray-700 mb-6">
          Motihari, East Champaran, Bihar — Morning Delivery: 5:00 AM – 10:00 AM
        </p>
        <a
          href="/contact"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Contact Us
        </a>
      </section>
      

    </main>
  );
}