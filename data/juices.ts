export type Juice = {
  name: string;
  tagline: string;
  composition: string[];
  benefits: string[];
  avoid: string[];
  price: string;
};

export const juices: Juice[] = [
  {
    name: "Liver Detox Juice",
    tagline: "Liver Cleanse Juice",
    composition: [
      "Giloy juice – 15 ml",
      "Amla juice – 50 ml",
      "Beetroot juice – 80 ml",
      "Methi leaves extract – 15 ml",
      "Turmeric – 3 ml",
      "Water – balance"
    ],
    benefits: ["Fatty liver", "Digestion", "Detox"],
    avoid: ["Liver disease patients under treatment", "Pregnant women", "Autoimmune conditions"],
    price: "₹50 (200 ml)"
  },
  {
    name: "Heart Health Juice",
    tagline: "Heart Booster Juice",
    composition: [
      "Arjun chaal decoction – 40 ml",
      "Beetroot juice – 80 ml",
      "Carrot juice – 80 ml",
      "Amla juice – 30 ml"
    ],
    benefits: ["High cholesterol", "BP support", "Heart health"],
    avoid: ["Low BP patients", "Heart patients on medication"],
    price: "₹50 (200 ml)"
  },
  {
    name: "Sugar Control Juice",
    tagline: "Sugar Control Juice",
    composition: [
      "Karela juice – 80 ml",
      "Amla juice – 40 ml",
      "Methi water – 30 ml",
      "Jamun leaf extract – 10 ml",
      "Neem extract – 5 ml",
      "Water – balance"
    ],
    benefits: ["Pre-diabetes", "High sugar levels"],
    avoid: ["Low sugar tendency", "Patients on strong diabetes medication", "Pregnant women"],
    price: "₹50 (200 ml)"
  },
  {
    name: "Kidney Detox Juice",
    tagline: "Kidney Cleanse Juice",
    composition: [
      "Lauki juice – 150 ml",
      "Dhaniya juice – 40 ml",
      "Amla juice – 30 ml",
      "Lemon – 5 ml"
    ],
    benefits: ["Water retention", "Mild kidney support", "Summer hydration"],
    avoid: ["Advanced kidney disease", "Dialysis patients"],
    price: "₹50 (200 ml)"
  },
  {
    name: "Weight Loss Juice",
    tagline: "Fat Cutter Drink",
    composition: [
      "Lauki juice – 150 ml",
      "Methi water – 20 ml",
      "Dhaniya juice – 20 ml",
      "Ginger – 3 ml",
      "Lemon – 5 ml"
    ],
    benefits: ["Weight loss", "Belly fat", "Bloating"],
    avoid: ["Underweight individuals", "Gastric ulcer patients"],
    price: "₹50 (200 ml)"
  },
  {
    name: "Blood Purifier Juice",
    tagline: "Skin Glow Detox",
    composition: [
      "Neem extract – 5 ml",
      "Giloy juice – 15 ml",
      "Amla juice – 50 ml",
      "Tulsi extract – 5 ml",
      "Water – balance"
    ],
    benefits: ["Acne / skin issues", "Body detox", "Immunity support"],
    avoid: ["Pregnant women", "Low BP individuals", "Long-term continuous use"],
    price: "₹50 (200 ml)"
  },
  {
    name: "Immunity Booster Juice",
    tagline: "Immunity Shot",
    composition: [
      "Amla juice – 80 ml",
      "Giloy – 10 ml",
      "Ginger – 3 ml",
      "Turmeric – 3 ml",
      "Honey – 5 ml (optional)",
      "Water – balance"
    ],
    benefits: ["Frequent cold/cough", "Low immunity", "Seasonal protection"],
    avoid: ["Autoimmune disease patients", "Allergy-prone individuals"],
    price: "₹50 (200 ml)"
  }
];