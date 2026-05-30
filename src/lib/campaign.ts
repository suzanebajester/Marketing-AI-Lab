// Realistic mock AI-generated campaign output
export interface CampaignInput {
  industry: string;
  country: string;
  audience: string;
  goal: string;
  channel: string;
  tone: string;
}

export interface GeneratedCampaign {
  persona: { name: string; role: string; age: string; goals: string[]; pains: string[] };
  headline: string;
  cta: string;
  linkedinPost: string;
  email: { subject: string; body: string };
  recommendations: string[];
}

export const exampleCampaign: GeneratedCampaign = {
  persona: {
    name: "Sarah Mitchell",
    role: "Head of Marketing at a 50-person B2B SaaS",
    age: "32–42",
    goals: [
      "Generate qualified pipeline without expanding headcount",
      "Prove marketing ROI to leadership each quarter",
      "Build a repeatable content engine across channels",
    ],
    pains: [
      "Spending too many hours on briefs and first drafts",
      "Inconsistent messaging between sales and marketing",
      "Difficulty scaling personalized outreach",
    ],
  },
  headline: "Ship campaigns 10× faster — without sacrificing brand voice.",
  cta: "Generate your first AI campaign — free, no credit card.",
  linkedinPost:
    "Most marketing teams aren't short on ideas.\n\nThey're short on time to ship them.\n\nLast quarter, we helped 200+ B2B teams cut campaign production time from 3 weeks to 3 hours — without losing their brand voice.\n\nThe secret? Stop writing from a blank page.\n\nStart from a structured AI workflow that handles personas, headlines, CTAs and copy in one pass — then refine.\n\nIf that sounds like your team, comment \"campaign\" and I'll send you the playbook. 👇",
  email: {
    subject: "Sarah, your Q2 campaign is overdue — here's a 3-hour fix",
    body: "Hi Sarah,\n\nNoticed your team is heading into a busy launch quarter. Most marketing leads we talk to are stuck in the same loop: brief → draft → revise → repeat.\n\nMarketing AI Lab compresses that loop. Answer 6 questions and you get a complete campaign: persona, headline, CTAs, LinkedIn post and email sequence — all aligned to your brand voice.\n\nWould a quick 15-minute walkthrough this week be useful?\n\nBest,\nThe Marketing AI Lab team",
  },
  recommendations: [
    "Lead with a benefit-driven LinkedIn carousel pinned for 7 days to maximize organic reach.",
    "Run a 3-touch email sequence: insight → case study → low-friction offer.",
    "Retarget post engagers with a $200/day LinkedIn Ads test for 14 days.",
    "Repurpose the campaign into a SEO-optimized landing page targeting your top 3 keywords.",
  ],
};

const headlines = [
  "Ship campaigns 10× faster — without sacrificing brand voice.",
  "From brief to launch in an afternoon, not a sprint.",
  "Stop writing from a blank page. Start from a winning campaign.",
  "The fastest way to a campaign your CMO will actually approve.",
];

const ctas = [
  "Generate your first AI campaign — free, no credit card.",
  "Start your first campaign in under 5 minutes →",
  "Try the AI campaign generator free",
  "Build your next campaign with AI →",
];

export function generateMockCampaign(input: CampaignInput): GeneratedCampaign {
  const seed = (input.industry + input.audience).length;
  const headline = headlines[seed % headlines.length];
  const cta = ctas[seed % ctas.length];

  return {
    persona: {
      name: input.audience.includes("CMO") ? "Jordan Reyes" : "Sarah Mitchell",
      role: `Decision-maker in ${input.industry || "B2B SaaS"} targeting ${input.audience || "growth-stage teams"}`,
      age: "30–45",
      goals: [
        `Achieve ${input.goal || "qualified pipeline growth"} within the next 2 quarters`,
        `Reach the right ${input.audience || "buyers"} in ${input.country || "their market"} efficiently`,
        "Prove channel ROI to leadership with clear metrics",
      ],
      pains: [
        "Limited time to produce high-quality content consistently",
        "Difficulty standing out in a saturated market",
        "Pressure to deliver measurable results fast",
      ],
    },
    headline,
    cta,
    linkedinPost: `Here's what most ${input.industry || "B2B"} teams get wrong about ${input.goal || "growth"}:\n\nThey treat every campaign like a one-off project.\n\nThe teams winning right now? They've built a repeatable system — one that turns positioning into personas, personas into messaging, and messaging into ${input.channel || "channel"}-ready assets in hours, not weeks.\n\nIf you're targeting ${input.audience || "modern buyers"} in ${input.country || "your market"}, this is the unlock.\n\nDM me "system" and I'll share the framework. 👇`,
    email: {
      subject: `A ${input.tone?.toLowerCase() || "smarter"} way to launch your next ${input.channel || "campaign"}`,
      body: `Hi there,\n\nIf your goal is ${input.goal || "growing pipeline"} in ${input.country || "your region"}, the bottleneck usually isn't strategy — it's production speed.\n\nMarketing AI Lab generates a complete campaign tailored to ${input.audience || "your audience"}: persona, headline, CTAs, ${input.channel || "channel"} copy and follow-up sequence — all in your ${input.tone?.toLowerCase() || "preferred"} tone.\n\nWant a quick walkthrough?\n\nBest,\nMarketing AI Lab`,
    },
    recommendations: [
      `Prioritize ${input.channel || "your top channel"} with 3 angled creatives in the first 2 weeks.`,
      `Build a content series around your buyer persona's #1 pain point.`,
      `Run a small paid test ($150–$300/day) to validate messaging before scaling.`,
      `Repurpose top-performing content into a long-form asset for SEO and nurture.`,
    ],
  };
}
