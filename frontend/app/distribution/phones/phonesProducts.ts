import type { DistributionProduct } from "../types";

export const phonesProducts: DistributionProduct[] = [
  {
    id: "phones-1",
    slug: "NEOPHONE-FKT-01-B",
    name: "NEOPHONE FKT 01 B",
    image: "/images/phones/NEOPHONE-FKT-01-B.jpg",
    description: "Digital desk phone for business users",
    fullDescription:
      "NEOPHONE FKT 01 B is a reliable digital desk phone designed for modern business communication with clear audio and essential telephony features.",
    features: [
      "HD voice quality",
      "Programmable keys",
      "Call hold, transfer, conference",
      "PoE support"
    ],
    categories: ["Phones", "Neophone", "Voice"],
    specifications: [
      { label: "Display", value: "2.8\" monochrome" },
      { label: "Connectivity", value: "RJ-45, PoE" }
    ],
    benefits: [
      "Easy to deploy",
      "Clear audio for daily calls",
      "Programmable keys for quick actions"
    ]
  },
  {
    id: "phones-2",
    slug: "NEOPHONE-FKT-03-C",
    name: "NEOPHONE FKT 03 C",
    image: "/images/phones/NEOPHONE-FKT-03-C.jpg",
    description: "Advanced digital desk phone",
    fullDescription:
      "NEOPHONE FKT 03 C offers an enhanced display, more programmable keys, and superior audio for busy professionals.",
    features: [
      "HD voice",
      "Backlit display",
      "BLF/Speed dial keys",
      "Headset support"
    ],
    categories: ["Phones", "Neophone", "Voice"],
    benefits: [
      "Ideal for reception or power users",
      "Improved visibility with backlit display",
      "Programmable keys for efficiency"
    ]
  },
   {
    id: "phones-3",
    slug: "ALE-20",
    name: "ALE 20",
    image: "/images/phones/ALE-20.jpg",
    description: "Entry IP desk phone",
    fullDescription:
      "ALE 20 is an entry-level IP desk phone providing essential telephony for common areas and standard users.",
    features: [
      "2-line display",
      "SIP support",
      "PoE powered"
    ],
    categories: ["Phones", "ALE", "Voice"],
    benefits: [
      "Affordable for large rollouts",
      "Simple to use",
      "PoE for clean deployments"
    ]
  },
   {
    id: "phones-4",
    slug: "ALE-20h",
    name: "ALE 20h",
    image: "/images/phones/ALE-20.jpg",
    description: "Entry IP phone with handset",
    fullDescription:
      "ALE 20h is a cost-effective IP phone variant focused on reliable voice for standard users.",
    features: [
      "SIP telephony",
      "HD handset audio",
      "Basic feature keys"
    ],
    categories: ["Phones", "ALE", "Voice"],
    benefits: [
      "Reliable desk phone",
      "Clear audio",
      "Low power"
    ]
  },
   {
    id: "phones-5",
    slug: "ALE-30",
    name: "ALE 30",
    image: "/images/phones/ALE-30.jpg",
    description: "Mid-range IP desk phone",
    fullDescription:
      "ALE 30 delivers a better display, more keys, and excellent audio for knowledge workers.",
    features: [
      "Larger display",
      "Multiple line keys",
      "Headset and PoE support"
    ],
    categories: ["Phones", "ALE", "Voice"],
    benefits: [
      "Great for daily heavy callers",
      "Programmable line keys",
      "Comfortable audio experience"
    ]
  },
];
