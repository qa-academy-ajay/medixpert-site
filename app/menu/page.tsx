// "use client";
// import Image from "next/image";

// import { juices } from "../../data/juices";

// export default function Menu() {
//   return (
//     <main className="p-8">
//       <h1 className="text-3xl font-bold text-green-700 mb-6">🍹 MediXpert Juice Menu</h1>
//       <div className="grid md:grid-cols-2 gap-6">
//         {juices.map((juice) => (
//           <div key={juice.name} className="border p-6 rounded-lg shadow-sm bg-white">
//             <Image src={juice.image} alt={juice.name} width={200} height={300} style={{ objectFit: "contain" }} />
//             <h2 className="text-xl font-bold mb-2">{juice.name}</h2>
//             <p className="italic text-gray-600 mb-2">👉 {juice.tagline}</p>
//             <p className="mb-2"><strong>Composition:</strong> {juice.composition.join(", ")}</p>
//             <p className="mb-2"><strong>Best for:</strong> {juice.benefits.join(", ")}</p>
//             <p className="mb-2 text-red-600"><strong>Avoid:</strong> {juice.avoid.join(", ")}</p>
//             <p className="text-green-600 font-semibold">{juice.price}</p>
//           </div>
          
//         ))}
//       </div>
//     </main>
//   );
// }

"use client";
import Image from "next/image";
import { juices } from "../../data/juices";

export default function Menu() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🍹 MediXpert Juice Menu
      </h1>

      <div className="space-y-6">
        {juices.map((juice) => (
          <div
            key={juice.name}
            className="flex flex-col md:flex-row items-start gap-6 border p-6 rounded-lg shadow-sm bg-white"
          >
            {/* Left side: Image */}
            <Image
              src={juice.image}
              alt={juice.name}
              width={200}
              height={300}
              className="object-contain"
            />

            {/* Right side: Text */}
            <div>
              <h2 className="text-xl font-bold mb-2">{juice.name}</h2>
              <p className="italic text-gray-600 mb-2">👉 {juice.tagline}</p>
              <p className="mb-2">
                <strong>Composition:</strong> {juice.composition.join(", ")}
              </p>
              <p className="mb-2">
                <strong>Best for:</strong> {juice.benefits.join(", ")}
              </p>
              <p className="mb-2 text-red-600">
                <strong>Avoid:</strong> {juice.avoid.join(", ")}
              </p>
              <p className="text-green-600 font-semibold">{juice.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}