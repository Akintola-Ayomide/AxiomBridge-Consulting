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

export type ApproachHighlight = {
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

export const approachHighlights = [
  {
    value: "Evidence-led",
    label: "Decisions grounded in market reality",
  },
  {
    value: "Execution-focused",
    label: "Advice shaped for implementation",
  },
  {
    value: "Context-aware",
    label: "Built around West African operating conditions",
  },
  {
    value: "Value-minded",
    label: "Focused on resilience and durable growth",
  },
] satisfies ApproachHighlight[];

export const principles = [
  {
    title: "Evidence-Led Strategy",
    description:
      "We begin with the facts: market conditions, operational reality and the constraints leaders actually face. Recommendations are clear, proportionate and defensible.",
    icon: ChartSpline,
  },
  {
    title: "Execution Rigour",
    description:
      "A strategy only matters if it can be delivered. We define owners, milestones and decisions so recommendations become practical action.",
    icon: Gauge,
  },
  {
    title: "Sustainable Capital & Growth",
    description:
      "We focus on decisions that protect cash, strengthen resilience and support growth that can be sustained beyond the engagement.",
    icon: TrendingUp,
  },
] satisfies Principle[];

export const practiceAreas = [
  {
    slug: "business-strategy-advisory",
    number: "01",
    title: "Business Strategy & Advisory",
    summary:
      "We help leadership teams assess market opportunities, choose where to compete and turn strategy into a clear, sequenced plan.",
    capabilities: [
      "Market Entry",
      "Corporate Restructuring",
      "Competitive Positioning",
    ],
    icon: BriefcaseBusiness,
  },
  {
    slug: "operational-excellence",
    number: "02",
    title: "Operational Excellence",
    summary:
      "We map end-to-end processes, identify cost and capacity constraints, and design operating improvements that teams can implement.",
    capabilities: ["Process Redesign", "Supply Chain Resilience", "Cost Improvement"],
    icon: Settings2,
  },
  {
    slug: "financial-advisory",
    number: "03",
    title: "Financial & Operational Advisory",
    summary:
      "We support capital allocation, working capital discipline and risk management so organisations can make informed financial decisions.",
    capabilities: ["Capital Allocation", "Working Capital", "Risk Management"],
    icon: Landmark,
  },
  {
    slug: "digital-transformation",
    number: "04",
    title: "Digital Transformation",
    summary:
      "We assess legacy systems and data needs, then define practical automation and analytics roadmaps aligned to business priorities.",
    capabilities: ["Systems Modernisation", "Data & Analytics", "Automation"],
    icon: Cpu,
  },
  {
    slug: "corporate-growth",
    number: "05",
    title: "Corporate Growth & Development",
    summary:
      "We support merger integration, joint venture planning and governance design to help organisations grow without losing operational control.",
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
      "We advise banks, fintech firms and insurers on regulatory change, digital channels, credit processes and risk management.",
    icon: Landmark,
  },
  {
    slug: "tech-telecoms",
    category: "Digital Rails",
    title: "Tech & Telecoms",
    summary:
      "We work with telecom operators and technology businesses on network expansion, commercial strategy and enterprise monetisation.",
    icon: RadioTower,
  },
  {
    slug: "manufacturing-industry",
    category: "Industrial Sector",
    title: "Manufacturing & Industry",
    summary:
      "We help manufacturers improve production planning, local sourcing, factory utilisation and cost discipline.",
    icon: Factory,
  },
  {
    slug: "healthcare-life-sciences",
    category: "Health & Biotech",
    title: "Healthcare & Life Sciences",
    summary:
      "We support hospital groups, distributors and health providers with supply chain design, capital planning and operating models.",
    icon: HeartPulse,
  },
  {
    slug: "retail-consumer-goods",
    category: "Consumer Markets",
    title: "Retail & Consumer Goods",
    summary:
      "We help consumer brands strengthen route-to-market, pricing and distribution across formal and informal retail channels.",
    icon: ShoppingBag,
  },
  {
    slug: "logistics-energy",
    category: "Power & Transport",
    title: "Logistics & Energy",
    summary:
      "We advise logistics and energy businesses on operational efficiency, infrastructure investment and cross-border expansion.",
    icon: Zap,
  },
] satisfies Industry[];
