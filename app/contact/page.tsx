export default function Contact() {
  return (
    <main className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">📞 Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Have questions or want to place an order? Reach out to us!
      </p>

      {/* Contact Info */}
      <div className="space-y-4 mb-8">
        <p><strong>Address:</strong> Motihari, East Champaran, Bihar</p>
        <p><strong>Delivery Hours:</strong> 5:00 AM – 10:00 AM</p>
        <p><strong>Email:</strong> info@medixpert.in</p>
        <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917980829903?"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Chat on WhatsApp
      </a>

      {/* Simple Contact Form */}
      <form className="mt-8 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
  
}