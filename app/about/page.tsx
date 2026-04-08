// "use client";

// export default function AboutPage() {
//   return (
//     <main className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold text-green-700 mb-6">About Us</h1>

//       {/* Intro */}
//       <p className="mb-4 text-lg">
//         <strong>Empowering Wellness Through Ayurveda</strong>
//       </p>
//       <p className="mb-4 text-lg">
//         At <strong>MediXpert Herbal Juice Corner</strong>, we blend ancient
//         Ayurvedic wisdom with modern lifestyle needs. Our herbal juices are
//         crafted to support immunity, detoxification, and overall vitality —
//         while remaining affordable and accessible to everyone.
//       </p>

//       {/* Brand Story */}
//       <h2 className="text-2xl font-semibold mt-6 mb-2">Our Story</h2>
//       <p className="mb-4 text-lg">
//         MediXpert was born out of a passion for natural healing and a vision to
//         make Ayurvedic therapy accessible to all. Every bottle reflects our
//         commitment to <strong>purity, quality, and affordability</strong>.
//       </p>

//       {/* Mission */}
//       <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
//       <p className="mb-4 text-lg">
//         Our mission is to bring authentic Ayurvedic juice therapy to modern
//         households, helping people manage lifestyle challenges like stress,
//         digestion, blood sugar, and immunity with natural solutions.
//       </p>

//       {/* Values */}
//       <h2 className="text-2xl font-semibold mt-6 mb-2">Our Values</h2>
//       <ul className="list-disc pl-6 mb-4 text-lg">
//         <li>Purity — 100% natural ingredients</li>
//         <li>Trust — transparent composition, clear benefits and precautions</li>
//         <li>Care — personalized wellness for every individual</li>
//       </ul>

//       {/* Unique Points */}
//       <h2 className="text-2xl font-semibold mt-6 mb-2">What Makes Us Unique</h2>
//       <ul className="list-disc pl-6 mb-4 text-lg">
//         <li>
//           Scientifically balanced juice compositions (Heart Booster, Sugar
//           Control, Liver Cleanse, etc.)
//         </li>
//         <li>Affordable subscription plans (7, 15, and 30 days)</li>
//         <li>
//           Local roots in Bihar, India, with a vision to scale digitally and
//           reach wellness seekers everywhere
//         </li>
//       </ul>

//       {/* Call to Action */}
//       <p className="mb-4 text-lg font-semibold text-green-700">
//         Join us in rediscovering the healing power of Ayurveda — one glass at a
//         time.
//       </p>

//       {/* Suggested Image Placeholder */}
//       <div className="mt-6">
//         <img
//           src="/images/about-hero.png"
//           alt="MediXpert Herbal Juices lineup"
//           className="rounded-lg shadow-md"
//         />
//       </div>
//     </main>
//   );
// }


// app/about/page.tsx
// MediXpert Herbal Juice Corner — About Us Page
// Uses Next.js App Router + Tailwind CSS

import Image from "next/image";

const values = [
  {
    title: "Purity",
    description: "100% natural ingredients with no artificial additives or preservatives.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    bg: "bg-emerald-50",
    iconColor: "text-emerald-700",
  },
  {
    title: "Trust",
    description: "Transparent composition and clear benefits on every bottle.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    bg: "bg-blue-50",
    iconColor: "text-blue-700",
  },
  {
    title: "Care",
    description: "Personalized Ayurvedic wellness crafted for every individual.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    bg: "bg-amber-50",
    iconColor: "text-amber-700",
  },
];

const differentiators = [
  {
    tag: "Formulations",
    title: "7 expert-crafted variants",
    description:
      "Heart Booster, Sugar Control, Liver Cleanse & more — each scientifically balanced for your health goal.",
  },
  {
    tag: "Plans",
    title: "Flexible subscriptions",
    description:
      "Choose a 7-day, 15-day, or 30-day plan to match your wellness journey and budget.",
  },
  {
    tag: "Roots",
    title: "Local & authentic",
    description:
      "Proudly rooted in Bihar, India — with a vision to serve wellness digitally across the country.",
  },
  {
    tag: "Accessibility",
    title: "Affordable for all",
    description:
      "Premium Ayurvedic therapy that doesn't come at a premium price.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="bg-emerald-50 border-b border-emerald-100 px-6 py-20 text-center">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-medium px-4 py-1 rounded-full mb-4 tracking-wide">
          Est. Bihar, India
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-emerald-900 leading-tight max-w-2xl mx-auto mb-4">
          Empowering Wellness Through Ayurveda
        </h1>
        <p className="text-emerald-700 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Ancient wisdom. Modern lives. One glass at a time.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="/juices"
            className="bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors"
          >
            Explore our juices
          </a>
          <a
            href="/plans"
            className="border border-emerald-700 text-emerald-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
          >
            View plans
          </a>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* Brand Story */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-medium text-emerald-700 uppercase tracking-widest mb-2">
              Our story
            </p>
            <h2 className="text-3xl font-semibold mb-4 leading-snug">
              Born from a belief in nature&apos;s power
            </h2>
            <blockquote className="border-l-4 border-emerald-500 pl-4 text-gray-600 italic mb-4 leading-relaxed">
              "At MediXpert, we believe health begins with nature. Inspired by
              centuries-old Ayurvedic practices, we craft herbal juices that
              support immunity, detoxification, and overall vitality — all
              while being affordable and accessible to everyone."
            </blockquote>
            <p className="text-gray-600 leading-relaxed">
              Rooted in Bihar, India, MediXpert was founded with a simple
              passion: to make authentic Ayurvedic therapy available to every
              household — not just a privileged few.
            </p>
          </div>
          {/* Founder image placeholder — replace src with your actual image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-100 flex items-center justify-center">
            <p className="text-emerald-600 text-sm">Founder / team photo here</p>
            {/* Uncomment once you have an image:
            <Image
              src="/images/founder.jpg"
              alt="MediXpert founder"
              fill
              className="object-cover"
            />
            */}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-emerald-700 text-white rounded-2xl px-8 py-12 text-center">
          <p className="text-xs font-medium text-emerald-200 uppercase tracking-widest mb-3">
            Our mission
          </p>
          <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
            To bring authentic Ayurvedic juice therapy to modern households —
            helping people manage stress, digestion, and immunity with
            natural, time-tested solutions.
          </p>
        </section>

        {/* Values */}
        <section>
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-widest mb-2">
            Our values
          </p>
          <h2 className="text-3xl font-semibold mb-8">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${v.bg} ${v.iconColor} flex items-center justify-center mb-4`}
                >
                  {v.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What Makes Us Unique */}
        <section>
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-widest mb-2">
            What makes us different
          </p>
          <h2 className="text-3xl font-semibold mb-8">
            The MediXpert difference
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 transition-colors"
              >
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                  {d.tag}
                </span>
                <h3 className="text-base font-medium mb-1">{d.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {d.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ingredient image collage placeholder */}
        <section>
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-widest mb-2">
            What goes inside
          </p>
          <h2 className="text-3xl font-semibold mb-6">
            Pure Ayurvedic ingredients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Turmeric", "Amla", "Neem", "Tulsi"].map((herb) => (
              <div
                key={herb}
                className="bg-emerald-50 rounded-xl aspect-square flex flex-col items-center justify-center gap-2 border border-emerald-100"
              >
                {/* Replace with <Image> once you have photos */}
                <div className="w-10 h-10 rounded-full bg-emerald-100" />
                <span className="text-emerald-800 text-sm font-medium">
                  {herb}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-2xl px-8 py-12 text-center">
          <h2 className="text-3xl font-semibold text-emerald-900 mb-3">
            Join the MediXpert family
          </h2>
          <p className="text-emerald-700 text-base max-w-md mx-auto mb-8 leading-relaxed">
            Rediscover the healing power of Ayurveda — one glass at a time.
            Subscribe to a plan or visit our corner in Bihar today.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/plans"
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              View subscription plans
            </a>
            <a
              href="/juices"
              className="border border-emerald-700 text-emerald-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
            >
              Explore our juices
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}