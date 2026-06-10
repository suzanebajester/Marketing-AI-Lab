export type SampleStrategy = {
  executiveSummary: {
    goal: string;
    audience: string;
    primaryChannel: string;
    budget: string;
    forecast: string;
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
};

export const sampleStrategy: SampleStrategy = {
  executiveSummary: {
    goal: "Generate Leads",
    audience: "Quality Managers in Pharmaceutical Manufacturing",
    primaryChannel: "LinkedIn Ads",
    budget: "$2,000–$5,000",
    forecast: "50–120 Qualified Leads",
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
  campaignAssets: [
    {
      type: "LinkedIn Post",
      content:
        "Audits don't fail because of bad people. They fail because of unclear calibration records.\n\nWe put together the playbook used by 40+ pharma QA leads to cut audit prep time by 30%. Free, no email gate.",
    },
    {
      type: "Email",
      content:
        "Subject: The calibration gap most QA teams miss\n\nHi {{first_name}}, audits rarely fail on the floor — they fail in the paperwork. Here's the 1-page checklist our pharma customers use before every inspection.",
    },
  ],
};
