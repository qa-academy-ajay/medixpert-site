"use client";

export default function FloatingContact() {
  const phone = "+919999999999"; // replace with real number
  const whatsapp = "919999999999"; // no + for wa.me

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white text-2xl shadow-lg hover:scale-110 transition"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>

      {/* Call */}
      <a
        href={`tel:${phone}`}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white text-xl shadow-lg hover:scale-110 transition"
        aria-label="Call now"
      >
        📞
      </a>
    </div>
  );
}