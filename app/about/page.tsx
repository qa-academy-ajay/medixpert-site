// app/about/page.tsx — Server Component
import Link from "next/link";

const values = [
  { icon: "🛡️", title: "Purity", desc: "100% natural ingredients — no artificial additives, colors, or preservatives ever." },
  { icon: "✅", title: "Trust", desc: "Transparent composition and clear benefit/avoid notes on every product." },
  { icon: "🤝", title: "Care", desc: "Personalized Ayurvedic wellness crafted for every individual's health need." },
];

const differentiators = [
  { tag: "Formulations", title: "7 expert-crafted variants", desc: "Heart Booster, Sugar Control, Liver Cleanse & more — each scientifically balanced for your specific health goal." },
  { tag: "Plans", title: "Flexible subscriptions", desc: "7-day, 15-day & 30-day plans to suit every wellness journey and every budget." },
  { tag: "Roots", title: "Local & authentic", desc: "Proudly made in Gurgaon, India with a vision to bring Ayurvedic healing digitally to everyone." },
  { tag: "Price", title: "Affordable for all", desc: "Quality Ayurvedic therapy that doesn't break the bank — just ₹50 per glass." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-emerald-50 border-b border-emerald-100 px-6 py-20 text-center">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
          Est. Gurgaon, India
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 max-w-2xl mx-auto mb-5 leading-tight">
          Empowering Wellness Through Ayurveda
        </h1>
        <p className="text-emerald-700 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Ancient wisdom. Modern lives. One glass at a time.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/juices" className="bg-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-800 transition-colors">
            Explore Juices
          </Link>
          <Link href="/plans" className="border border-emerald-300 text-emerald-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors">
            View Plans
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* Brand Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Born from a belief in nature&apos;s power</h2>
            <blockquote className="border-l-4 border-emerald-500 pl-5 text-gray-600 italic mb-5 leading-relaxed text-sm">
              &quot;At MediXpert, we believe health begins with nature. Inspired by centuries-old Ayurvedic practices, we craft herbal juices that support immunity, detoxification, and overall vitality — all while being affordable and accessible to everyone.&quot;
            </blockquote>
            <p className="text-gray-600 leading-relaxed text-sm">
              Rooted in the heartland of Gurgaon, India, MediXpert was founded with a simple passion: to make authentic Ayurvedic therapy available to every household — not just a privileged few.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-100 flex items-center justify-center border border-emerald-200">
            <div className="text-center p-8">
              <span className="text-6xl block mb-3">🌿</span>
              <p className="text-emerald-600 text-sm font-medium">Founder / Team Photo</p>
              <p className="text-emerald-400 text-xs mt-1">Replace with your image</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-emerald-800 text-white rounded-2xl px-8 py-14 text-center">
          <p className="text-xs font-bold text-emerald-300 uppercase tracking-widest mb-4">Our Mission</p>
          <p className="text-xl md:text-2xl font-semibold leading-relaxed max-w-2xl mx-auto">
            To bring authentic Ayurvedic juice therapy to modern households — helping people manage stress, digestion, and immunity with natural, time-tested solutions.
          </p>
        </section>

        {/* Values */}
        <section>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Our Values</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">What Makes Us Different</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">The MediXpert difference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 transition-colors">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3">{d.tag}</span>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{d.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ingredients */}
        <section>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Key Ingredients</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Pure Ayurvedic herbs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Amla", benefit: "Immunity & Vitamin C" },
              { name: "Giloy", benefit: "Detox & Fever" },
              { name: "Neem", benefit: "Blood Purifier" },
              { name: "Tulsi", benefit: "Respiratory Health" },
              { name: "Turmeric", benefit: "Anti-inflammatory" },
              { name: "Karela", benefit: "Blood Sugar" },
              { name: "Arjun Chaal", benefit: "Heart Health" },
              { name: "Methi", benefit: "Digestion & Sugar" },
            ].map((herb) => (
              <div key={herb.name} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 mx-auto mb-2" />
                <p className="text-emerald-900 text-sm font-bold">{herb.name}</p>
                <p className="text-emerald-600 text-xs mt-0.5">{herb.benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-2xl px-8 py-12 text-center">
          <h2 className="text-3xl font-extrabold text-emerald-900 mb-3">Join the MediXpert family</h2>
          <p className="text-emerald-700 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Rediscover the healing power of Ayurveda — one glass at a time. Subscribe to a plan or reach out to learn more.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/plans" className="bg-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-800 transition-colors">
              View Subscription Plans
            </Link>
            <Link href="/contact" className="border border-emerald-300 text-emerald-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
