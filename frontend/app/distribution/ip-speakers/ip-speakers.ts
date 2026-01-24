export type IPSpeaker = {
  slug: string;
  name: string;
  image: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  categories?: string[];
  specifications?: { label: string; value: string }[];
  benefits?: string[];
};

export const ipSpeakers: IPSpeaker[] = [
  {
    slug: "pa-ceiling-speaker",
    name: "PA Ceiling Speaker",
    image: "/images/ip-speakers/Ceiling-speaker-3.png",
    description:
      "High quality IP based ceiling speaker suitable for enterprise use.",
    fullDescription:
      "High-quality IP ceiling speaker designed for clear voice announcements across offices, retail, and hospitality spaces.",
    features: [
      "PoE powered",
      "Wide coverage cone",
      "SIP / multicast support"
    ],
    categories: ["IP Speakers", "Audio"],
    benefits: [
      "Easy ceiling deployment",
      "Reliable paging and announcements",
      "Clean PoE install"
    ]
  },
  {
    slug: "pa-horn-speaker",
    name: "PA Horn Speaker",
    image: "/images/ip-speakers/Horn-speaker-1.png",
    description:
      "Weatherproof IP horn speaker designed for outdoor announcements.",
    fullDescription:
      "Rugged IP horn speaker for outdoor and industrial environments with loud, clear paging.",
    features: [
      "Weatherproof housing",
      "High SPL output",
      "SIP / multicast paging"
    ],
    categories: ["IP Speakers", "Audio"],
    benefits: [
      "Ideal for outdoor yards and factories",
      "Durable build for harsh conditions",
      "Clear long-range announcements"
    ]
  },
  {
    slug: "pa-wall-mount-speaker",
    name: "PA Wall Mount Speaker",
    image: "/images/ip-speakers/Wall-mount-speaker-1.png",
    description:
      "Weatherproof IP horn speaker designed for outdoor announcements.",
    fullDescription:
      "Wall-mount IP speaker providing focused audio for corridors, classrooms, and offices.",
    features: [
      "Wall-mount enclosure",
      "Balanced voice clarity",
      "SIP / multicast support"
    ],
    categories: ["IP Speakers", "Audio"],
    benefits: [
      "Great for corridors and classrooms",
      "Simple mounting options",
      "Consistent paging coverage"
    ]
  },
];