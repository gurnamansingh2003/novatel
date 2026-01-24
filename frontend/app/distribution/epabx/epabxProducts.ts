/*export const epabxProducts = [
  {
    slug: "alcatel-lucent-oxo-connect-evolution",
    name: "Alcatel Lucent OXO Connect Evolution",
    image: "/images/OXO-Connect-Evolution.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  {
    slug: "neos-nexgen lite",
    name: "Neos Nexgen Lite",
    image: "/images/neos-nexgen lite.jpeg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  {
    slug: "neos-4s",
    name: "Neos 4S",
    image: "/images/Neos-4S.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  {
    slug: "neos-6s",
    name: "Neos 6S",
    image: "/images/Neos-4S.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  {
    slug: "alcatel-lucent-omniPCX-enterprise",
    name: "Alcatel Lucent OmniPCX Enterprise",
    image: "/images/OmniPCX.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  {
    slug: "neos-telestar",
    name: "Neos TeleStar",
    image: "/images/neos-telestar-01.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  {
    slug: "neos-infinity-c",
    name: "Neos Infinity C",
    image: "/images/Neos-Infinity-C.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  {
    slug: "neos-nexgen",
    name: "Neos Nexgen",
    image: "/images/neos-nexgen.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
   {
    slug: "alcatel-lucent-oxo-connect",
    name: "Alcatel Lucent OXO Connect",
    image: "/images/OXO-Connect.jpg",
    description: "Next-gen IP PBX",
    features: ["Voicemail", "Auto Attendant"],
  },
  
];*/
export interface EpabxProduct {
  slug: string;
  name: string;
  image: string;
  description: string;
  fullDescription?: string;
  features: string[];
  categories?: string[];
  specifications?: {
    label: string;
    value: string;
  }[];
  benefits?: string[];
  downloads?: {
    name: string;
    url: string;
  }[];
}

export const epabxProducts: EpabxProduct[] = [
  {
    slug: "alcatel-lucent-oxo-connect-evolution",
    name: "Alcatel Lucent OXO Connect Evolution",
    image: "/images/OXO-Connect-Evolution.jpg",
    description: "Next-gen IP PBX",
    fullDescription: "Alcatel-Lucent OXO Connect Evolution is an advanced communication solution designed for growing businesses. It provides comprehensive unified communications features with exceptional reliability and scalability.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "Call Recording",
      "Conference Calling",
      "Mobile Integration"
    ],
    categories: ["Alcatel Lucent", "EPABX", "OXO Connect", "Voice"],
    specifications: [
      { label: "Capacity", value: "Up to 100 users" },
      { label: "Connectivity", value: "IP, SIP, Analog" },
      { label: "Redundancy", value: "High Availability" }
    ],
    benefits: [
      "Excellent voice connectivity to customers and employees",
      "Ensure employees can call wherever they are, on any device",
      "Seamless integration with existing infrastructure",
      "Cost-effective solution for medium-sized businesses"
    ]
  },
  {
    slug: "neos-nexgen-lite",
    name: "Neos Nexgen Lite",
    image: "/images/neos-nexgen lite.jpeg",
    description: "Next-gen IP PBX",
    fullDescription: "Neos Nexgen Lite is a compact and efficient IP PBX system designed for small to medium businesses seeking reliable communication solutions.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "Call Forwarding",
      "IVR System"
    ],
    categories: ["Neos", "EPABX", "Voice"],
    benefits: [
      "Easy deployment and management",
      "Scalable architecture",
      "Cost-effective communication solution"
    ]
  },
  {
    slug: "neos-4s",
    name: "Neos 4S",
    image: "/images/Neos-4S.jpg",
    description: "Next-gen IP PBX",
    fullDescription: "Neos 4S provides enterprise-grade communication features in a compact form factor, ideal for growing organizations.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "Multi-site Support",
      "Advanced Call Routing"
    ],
    categories: ["Neos", "EPABX", "Voice"]
  },
  {
    slug: "neos-6s",
    name: "Neos 6S",
    image: "/images/Neos-4S.jpg",
    description: "Next-gen IP PBX",
    fullDescription: "Neos 6S offers enhanced capacity and advanced features for medium to large enterprises.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "Unified Communications",
      "Call Analytics"
    ],
    categories: ["Neos", "EPABX", "Voice"]
  },
  {
    slug: "alcatel-lucent-omnipcx-enterprise",
    name: "Alcatel Lucent OmniPCX Enterprise",
    image: "/images/OmniPCX.jpg",
    description: "Expert enterprise phone system",
    fullDescription: "Alcatel-Lucent OmniPCX Enterprise Communication Server, The expert enterprise phone system for medium, large and very large-sized companies. Alcatel-Lucent OmniPCX® Enterprise Communication Server (CS) offers business communications designed for the digital age. It connects the entire enterprise and provides organisations the freedom, quality, and agility they need to grow their business securely.",
    features: [
      "Excellent voice connectivity to customers and employees",
      "Ensure employees can call wherever they are, on any device",
      "A borderless and mobile collaboration application lets employee connect the phone system to the Alcatel-Lucent Rainbow cloud-based unified communications service",
      "Serve users across multiple sites, with guaranteed high availability and security"
    ],
    categories: ["Alcatel Lucent", "EPABX", "OmniPCX Enterprise", "Voice"],
    specifications: [
      { label: "Capacity", value: "Up to 100,000 users" },
      { label: "Sites", value: "Multi-site support" },
      { label: "Availability", value: "99.999% uptime" }
    ],
    benefits: [
      "Excellent voice connectivity to customers and employees",
      "Ensure employees can call wherever they are, on any device",
      "A borderless and mobile collaboration application lets employee connect the phone system to the Alcatel-Lucent Rainbow cloud-based unified communications service",
      "Serve users across multiple sites, with guaranteed high availability and security"
    ]
  },
  {
    slug: "neos-telestar",
    name: "Neos TeleStar",
    image: "/images/neos-telestar-01.jpg",
    description: "Next-gen IP PBX",
    fullDescription: "Neos TeleStar delivers powerful telephony features with exceptional reliability for businesses of all sizes.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "Call Center Features",
      "CRM Integration"
    ],
    categories: ["Neos", "EPABX", "Voice"]
  },
  {
    slug: "neos-infinity-c",
    name: "Neos Infinity C",
    image: "/images/Neos-Infinity-C.jpg",
    description: "Next-gen IP PBX",
    fullDescription: "Neos Infinity C provides unlimited scalability and advanced communication features for enterprise environments.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "Unlimited Scalability",
      "Cloud Integration"
    ],
    categories: ["Neos", "EPABX", "Voice"]
  },
  {
    slug: "neos-nexgen",
    name: "Neos Nexgen",
    image: "/images/neos-nexgen.jpg",
    description: "Next-gen IP PBX",
    fullDescription: "Neos Nexgen represents the next generation of business communication systems with cutting-edge features.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "AI-Powered Call Routing",
      "Advanced Analytics"
    ],
    categories: ["Neos", "EPABX", "Voice"]
  },
  {
    slug: "alcatel-lucent-oxo-connect",
    name: "Alcatel Lucent OXO Connect",
    image: "/images/OXO-Connect.jpg",
    description: "Next-gen IP PBX",
    fullDescription: "Alcatel Lucent OXO Connect offers comprehensive unified communications for businesses seeking reliable and feature-rich phone systems.",
    features: [
      "Voicemail",
      "Auto Attendant",
      "Unified Messaging",
      "Presence Management"
    ],
    categories: ["Alcatel Lucent", "EPABX", "OXO Connect", "Voice"]
  },
];
