export type SampleStrategy = {
  executiveSummary: {
    goal: string;
    audience: string;
    productService?: string;
    primaryChannel: string;
    budget: string;
    forecast: string;
    forecastHighlight?: string;
    campaignTimeframe?: string;
  };
  websiteInsights?: {
    detectedOffer: string;
    keyDifferentiators: string[];
    promotionalHooks: string[];
    messagingAngle: string;
  };
  persona: {
    title: string;
    jobTitle?: string;
    goals: string[];
    challenges: string[];
    keyBuyingFactors?: string[];
    decisionInfluence?: string;
  };
  headline: string;
  cta: string;
  channelStrategy: { name: string; type: "Paid" | "Owned" | "Organic"; role?: string; whyFit?: string }[];
  budgetAllocation: { channel: string; pct: number; estimatedBudget?: string; purpose?: string }[];
  channelForecast: { channel: string; reach?: string; clicks?: string; leads?: string; metrics?: Record<string, string> }[];
  campaignForecastSummary: string;
  forecastSummary?: {
    monthlyResults: string;
    totalCampaignResults: string;
    averagePrimaryMetric: string;
    mainSuccessMetric: string;
  };
  creativeDirection: string[];
  creativeDirectionDetail?: {
    recommendedFormat: string;
    visualAngle: string;
    visualStyle: string;
    contentStructure: string[];
  };
  recommendedPriorities?: {
    high: string[];
    medium: string[];
    low: string[];
  };
  nextSteps?: {
    week1: string;
    week2: string;
    week3: string;
    week4: string;
  };
  campaignAssets: { type: string; content: string }[];
};

export const sampleStrategy: SampleStrategy = {
  executiveSummary: {
    goal: "Generate Leads",
    audience: "Quality Managers in Pharmaceutical Manufacturing",
    productService: "Calibration Compliance Platform",
    primaryChannel: "LinkedIn Ads",
    budget: "$2,000–$5,000",
    forecast: "50–120 Qualified Leads",
    forecastHighlight: "Espera-se gerar entre 50 a 120 leads qualificados com custo por lead competitivo.",
    campaignTimeframe: "8 weeks"
  },
  websiteInsights: {
    detectedOffer: "Automated calibration compliance software for FDA compliance",
    keyDifferentiators: [
      "21 CFR Part 11 electronic signature compliance",
      "Real-time sensor calibration dashboard",
      "Zero-paperwork audit preparation"
    ],
    promotionalHooks: [
      "Free 15-minute Compliance Audit Consultation",
      "Calibration Playbook 2026 PDF"
    ],
    messagingAngle: "Focus on audit peace of mind, elimination of manual calculation errors, and FDA compliance."
  },
  persona: {
    title: "Quality Manager",
    jobTitle: "QA / Compliance Manager",
    goals: ["Compliance", "Quality Assurance", "Operational Efficiency"],
    challenges: ["Audits", "Calibration Accuracy", "Regulatory Pressure"],
    keyBuyingFactors: ["Regulatory validation", "System reliability", "Support response time"],
    decisionInfluence: "High influence of regulatory board and director of compliance"
  },
  headline: "Calibration Compliance, Without the Audit Anxiety",
  cta: "Book a 15-min Compliance Review",
  channelStrategy: [
    { name: "LinkedIn Ads", type: "Paid", role: "Direct targeting of QA decision-makers", whyFit: "Quality managers actively discuss compliance on LinkedIn" },
    { name: "Google Ads", type: "Paid", role: "Capture search intent for calibration compliance software", whyFit: "High buyer-intent keywords" },
    { name: "Email Marketing", type: "Owned", role: "Nurture prospects with audit guides", whyFit: "Builds authority over longer sales cycles" },
    { name: "Case Studies", type: "Organic", role: "Establish trust and social proof", whyFit: "QA professionals look for validated customer evidence" },
  ],
  budgetAllocation: [
    { channel: "LinkedIn Ads", pct: 60, estimatedBudget: "$1,200–$3,000", purpose: "Laser-focused professional targeting" },
    { channel: "Google Ads", pct: 40, estimatedBudget: "$800–$2,000", purpose: "Capture high-intent searches" },
  ],
  channelForecast: [
    { channel: "LinkedIn Ads", reach: "60k–90k", clicks: "1.2k–1.8k", leads: "35–80", metrics: { "Leads": "35-80", "CPL": "$35-$75", "CTR": "1.5-2.0%", "Conversion Rate": "3-5%" } },
    { channel: "Google Ads", reach: "20k–35k", clicks: "600–900", leads: "15–40", metrics: { "Leads": "15-40", "CPL": "$40-$80", "CTR": "2.5-4.0%", "Conversion Rate": "4-6%" } },
  ],
  campaignForecastSummary:
    "Combined reach of 80k–125k pharma quality decision-makers, generating an estimated 50–120 qualified leads at a blended CPL of $40–$90 across an 8-week campaign window.",
  forecastSummary: {
    monthlyResults: "25 to 60 leads per month",
    totalCampaignResults: "50 to 120 leads over 8 weeks",
    averagePrimaryMetric: "Average cost per lead $40–$90",
    mainSuccessMetric: "SQL volume and CPL efficiency"
  },
  creativeDirection: [
    "Carousel: '5 calibration mistakes that fail audits'",
    "Case Study: 30% faster audit prep at a Tier-1 pharma plant",
    "Industry Guide: Calibration Compliance Playbook 2026",
  ],
  creativeDirectionDetail: {
    recommendedFormat: "LinkedIn Carousels and Case Study PDFs",
    visualAngle: "Sleek software dashboard and audit prep checklist",
    visualStyle: "Professional, trust-inducing, dark-mode dashboard screenshots",
    contentStructure: [
      "Call out the audit stress and manual logs",
      "Show how our platform automatically logs calibration",
      "Provide customer social proof of zero-finding audits",
      "CTA to book compliance review"
    ]
  },
  recommendedPriorities: {
    high: [
      "Set up LinkedIn Ads targeting QA managers in Pharma",
      "Deploy landing page highlighting 21 CFR Part 11 compliance"
    ],
    medium: [
      "Establish retargeting ads for landing page visitors",
      "Draft the '5 calibration mistakes' carousel"
    ],
    low: [
      "Refine email nurturing sequence for lead follow-ups"
    ]
  },
  nextSteps: {
    week1: "Develop landing page and design LinkedIn carousel ads",
    week2: "Configure LinkedIn Campaign Manager and launch campaign",
    week3: "Review initial CTR/CPL and adjust audience targeting",
    week4: "Launch email sequence to nurture captured leads"
  },
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

