export type LegalPolicy = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export const legalPolicies = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How AxiomBridge handles information shared through this website and our advisory engagements.",
    href: "/legal/privacy-policy",
  },
  {
    slug: "terms-of-engagement",
    title: "Terms of Engagement",
    description:
      "The terms that govern use of this website and the basis on which advisory engagements are discussed.",
    href: "/legal/terms-of-engagement",
  },
  {
    slug: "regulatory-disclaimers",
    title: "Regulatory Disclaimers",
    description:
      "Important context about the nature of the information published on this website.",
    href: "/legal/regulatory-disclaimers",
  },
] satisfies LegalPolicy[];
