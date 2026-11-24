import { env } from "@/lib/env";

export const siteConfig = {
  name: "AxiomBridge",
  consulting: "Consulting",
  legalName: "AxiomBridge Consulting Limited",
  title: "AxiomBridge Consulting | Strategic Advisory for West Africa",
  description:
    "AxiomBridge is an independent management consulting firm helping leadership teams in Nigeria and West Africa make sound decisions, improve execution and build durable capacity for growth.",
  shortDescription:
    "Strategic thinking. Practical solutions. Sustainable growth.",
  url: env.siteUrl,
  contact: {
    email: env.contactEmail,
    phone: env.contactPhone,
    address: "Victoria Island, Lagos, Nigeria",
    hours: "Mon – Fri: 8:30am – 6:00pm WAT",
  },
  social: {
    linkedin: env.linkedinUrl,
  },
  cta: {
    label: "Request a consultation",
    href: "/contact",
  },
} as const;
