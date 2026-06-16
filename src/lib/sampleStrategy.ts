export type Priority = "High" | "Medium" | "Low";

export type SampleStrategy = {
  executiveSummary: {
    goal: string;
    audience: string;
    primaryChannel: string;
    budget: string;
    forecast: string;
  };
  websiteInsights?: {
    url?: string;
    positioning: string;
    strengths: string[];
    opportunities: string[];
  };
  persona: {
    title: string;
    goals: string[];
    challenges: string[];
  };
  headline: string;
  cta: string;
  channelStrategy: { name: string; type: "Paid" | "Owned" | "Organic" }[];
  budgetAllocation: { channel: string; pct: number }[];
  channelForecast: { channel: string; reach: string; clicks: string; leads: string }[];
  campaignForecastSummary: string;
  creativeDirection: string[];
  campaignAssets: { type: string; content: string }[];
  priorities?: { title: string; rationale: string; level: Priority }[];
  nextSteps?: { week: string; title: string; description: string }[];
};

export const sampleStrategy: SampleStrategy = {
  executiveSummary: {
    goal: "Generate Leads",
    audience: "Quality Managers in Pharmaceutical Manufacturing",
    primaryChannel: "LinkedIn Ads",
    budget: "$2,000–$5,000",
    forecast: "50–120 Qualified Leads",
  },
  websiteInsights: {
    url: "calibrationpro.example",
    positioning: "Audit-ready calibration software for regulated industries.",
    strengths: [
      "Clear compliance-focused value proposition",
      "Strong proof points from Tier-1 pharma customers",
    ],
    opportunities: [
      "Thin top-of-funnel content for QA personas",
      "No retargeting layer on case study traffic",
    ],
  },
  persona: {
    title: "Quality Manager",
    goals: ["Compliance", "Quality Assurance", "Operational Efficiency"],
    challenges: ["Audits", "Calibration Accuracy", "Regulatory Pressure"],
  },
  headline: "Calibration Compliance, Without the Audit Anxiety",
  cta: "Book a 15-min Compliance Review",
  channelStrategy: [
    { name: "LinkedIn Ads", type: "Paid" },
    { name: "Google Ads", type: "Paid" },
    { name: "Email Marketing", type: "Owned" },
    { name: "Case Studies", type: "Organic" },
  ],
  budgetAllocation: [
    { channel: "LinkedIn Ads", pct: 60 },
    { channel: "Google Ads", pct: 40 },
  ],
  channelForecast: [
    { channel: "LinkedIn Ads", reach: "60k–90k", clicks: "1.2k–1.8k", leads: "35–80" },
    { channel: "Google Ads", reach: "20k–35k", clicks: "600–900", leads: "15–40" },
  ],
  campaignForecastSummary:
    "Combined reach of 80k–125k pharma quality decision-makers, generating an estimated 50–120 qualified leads at a blended CPL of $40–$90 across an 8-week campaign window.",
  creativeDirection: [
    "Carousel: '5 calibration mistakes that fail audits'",
    "Case Study: 30% faster audit prep at a Tier-1 pharma plant",
    "Industry Guide: Calibration Compliance Playbook 2026",
  ],
  campaignAssets: [],
  priorities: [
    { title: "Launch LinkedIn Ads to QA decision-makers", rationale: "Highest-intent channel for the target persona.", level: "High" },
    { title: "Publish Calibration Compliance Playbook", rationale: "Anchor asset for nurture and paid traffic.", level: "High" },
    { title: "Stand up retargeting on case study traffic", rationale: "Captures warm visitors already evaluating solutions.", level: "Medium" },
    { title: "Test Google Ads on compliance keywords", rationale: "Validates demand signal beyond LinkedIn.", level: "Medium" },
    { title: "Repurpose case study into short-form video", rationale: "Extends reach with low incremental cost.", level: "Low" },
  ],
  nextSteps: [
    { week: "Week 1", title: "Foundations", description: "Finalize messaging, build LinkedIn audiences, ship landing page." },
    { week: "Week 2", title: "Launch", description: "Activate LinkedIn Ads + Google Ads with 3 creative variants each." },
    { week: "Week 3", title: "Optimize", description: "Cut underperforming creative, double down on top CPL ad sets." },
    { week: "Week 4", title: "Scale & Report", description: "Increase budget on winners, deliver stakeholder readout." },
  ],
};
