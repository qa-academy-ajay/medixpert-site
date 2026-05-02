"use client";

export default function FloatingContact() {
  const phone = "+917980829903"; // replace with real number
  const whatsapp = "917980829903"; // no + for wa.me

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
        {/* whatsapp icon from https://www.svgrepo.com/svg/303251/whatsapp */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.854.507 3.583 1.39 5.107L2 22l4.898-1.288A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.657 13.657a1 1 0 00-1.414-1.414l-3.536 3.536-1.414-1.414L12.343 14l5.657-5.657z" />
        </svg>
      </a>

      {/* Call */}
      <a
        href={`tel:${phone}`}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white text-xl shadow-lg hover:scale-110 transition"
        aria-label="Call now"
      >
      {/* phone icon from https://www.svgrepo.com/svg/303251/whatsapp */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
        </svg>
      </a>
    </div>
  );
}