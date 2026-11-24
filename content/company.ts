import {
  BriefcaseBusiness,
  ChartSpline,
  Cpu,
  Factory,
  Gauge,
  HeartPulse,
  Landmark,
  Network,
  RadioTower,
  Settings2,
  ShoppingBag,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Metric = {
  value: string;
  label: string;
};

export type Principle = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PracticeArea = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  capabilities: string[];
  icon: LucideIcon;
};

export type Industry = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

export const metrics = [
  { value: "15+", label: "Years Regional Focus" },
  { value: "98%", label: "Strategic Implementation Rate" },
  { value: "$420M+", label: "Value Created" },
  { value: "6", label: "Strategic Sectors" },
] satisfies Metric[];

export const principles = [
  {
    title: "Evidence-Led Strategy",
    description:
      "Bespoke analytical diagnostics grounded in empirical market realities, proprietary economic intelligence and contextual sector foresight.",
    icon: ChartSpline,
  },
  {
    title: "Execution Rigour",
    description:
      "Translating complex advisory mandates into institutional change, operational alignment and relentless milestone delivery.",
    icon: Gauge,
  },
  {
    title: "Sustainable Capital & Growth",
    description:
      "Long-term balance sheet resilience, capital efficiency and sustainable enterprise expansion designed to outlast market volatility.",
    icon: TrendingUp,
  },
] satisfies Principle[];

export const practiceAreas = [
  {
    slug: "business-strategy-advisory",
    number: "01",
    title: "Business Strategy & Advisory",
    summary:
      "Formulating sovereign market entry plays, corporate restructuring mandates and defensible competitive positioning to command regional market share.",
    capabilities: [
      "Market Entry",
      "Corporate Restructuring",
      "Competitive Moats",
    ],
    icon: BriefcaseBusiness,
  },
  {
    slug: "operational-excellence",
    number: "02",
    title: "Operational Excellence",
    summary:
      "End-to-end process redesign, regional supply chain hardening against FX shocks and comprehensive structural cost rationalisation.",
    capabilities: ["Process Redesign", "Supply Chain Resilience"],
    icon: Settings2,
  },
  {
    slug: "financial-advisory",
    number: "03",
    title: "Financial & Operational Advisory",
    summary:
      "Rigorous capital allocation strategies, working capital optimisation and enterprise risk containment in fluctuating monetary environments.",
    capabilities: ["Capital Allocation", "Working Capital", "Risk"],
    icon: Landmark,
  },
  {
    slug: "digital-transformation",
    number: "04",
    title: "Digital Transformation",
    summary:
      "Core legacy modernisation, robust enterprise data analytics infrastructure and strategic workflow automation roadmaps.",
    capabilities: [
      "Legacy Core",
      "Enterprise Analytics",
      "Automation",
    ],
    icon: Cpu,
  },
  {
    slug: "corporate-growth",
    number: "05",
    title: "Corporate Growth & Development",
    summary:
      "Pre- and post-merger integration frameworks, high-stakes cross-border joint ventures and scalable conglomerate governance design.",
    capabilities: ["M&A Integration", "Joint Ventures", "Governance"],
    icon: Network,
  },
] satisfies PracticeArea[];

export const industries = [
  {
    slug: "financial-services",
    category: "Banking & Markets",
    title: "Financial Services",
    summary:
      "Advising commercial banks, fintech firms and micro-insurers on regulatory compliance, digital credit architecture and sovereign risk management.",
    icon: Landmark,
  },
  {
    slug: "tech-telecoms",
    category: "Digital Rails",
    title: "Tech & Telecoms",
    summary:
      "Structuring telecom tower asset spin-offs, national fibre expansion roadmaps and pan-African software enterprise monetisation models.",
    icon: RadioTower,
  },
  {
    slug: "manufacturing-industry",
    category: "Industrial Sector",
    title: "Manufacturing & Industry",
    summary:
      "Optimising import substitution strategies, cement and steel production lines, local raw material value-add and factory capacity utilisation.",
    icon: Factory,
  },
  {
    slug: "healthcare-life-sciences",
    category: "Health & Biotech",
    title: "Healthcare & Life Sciences",
    summary:
      "Modernising pharmaceutical supply networks, hospital group capital restructuring and sovereign public-private health infrastructure concessions.",
    icon: HeartPulse,
  },
  {
    slug: "retail-consumer-goods",
    category: "Consumer Markets",
    title: "Retail & Consumer Goods",
    summary:
      "Route-to-market strategies for FMCG brands across informal retail corridors, multi-tier pricing models and regional packaging efficiency.",
    icon: ShoppingBag,
  },
  {
    slug: "logistics-energy",
    category: "Power & Transport",
    title: "Logistics & Energy",
    summary:
      "Structuring port terminal operations, captive solar microgrid deployment for heavy industry and cross-border freight transit corridors.",
    icon: Zap,
  },
] satisfies Industry[];
