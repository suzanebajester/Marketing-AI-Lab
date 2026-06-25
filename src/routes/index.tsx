import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles, ArrowRight, Users, Megaphone, Lightbulb, FileText, Network, PieChart,
  TrendingUp, Check, X, Brain, Briefcase, Building2, UserCheck,
  Rocket, Handshake, Target, Globe, Calendar, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TypebotEmbed } from "@/components/TypebotEmbed";
import { sampleStrategy, type SampleStrategy } from "@/lib/sampleStrategy";
import { StrategySlides } from "@/components/StrategySlides";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketing AI Lab | AI Marketing Strategy Generator" },
      { name: "description", content: "Turn a simple brief into a complete marketing strategy with persona, channel planning, budget, and creative direction. Generate in minutes." },
      { property: "og:title", content: "Marketing AI Lab | AI Marketing Strategy Generator" },
      { property: "og:description", content: "Turn a simple brief into a complete marketing strategy with persona, channel planning, budget, and creative direction. Generate in minutes." },
      { property: "og:image", content: "https://marketingailab.app/og-image-v2.png" },
      { property: "og:url", content: "https://marketingailab.app/" },
      { name: "twitter:title", content: "Marketing AI Lab | AI Marketing Strategy Generator" },
      { name: "twitter:description", content: "Turn a simple brief into a complete marketing strategy with persona, channel planning, budget, and creative direction. Generate in minutes." },
      { name: "twitter:image", content: "https://marketingailab.app/og-image-v2.png" },
    ],
    links: [
      { rel: "canonical", href: "https://marketingailab.app/" },
    ],
  }),
  component: Landing,
});

function scrollToGenerator() {
  document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Landing() {
  const [strategyData, setStrategyData] = useState<SampleStrategy | null>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      let hostname = "";
      try { hostname = new URL(event.origin).hostname; } catch { return; }
      if (!/(^|\.)typebot\.(io|co)$/.test(hostname)) return;

      const payload = event.data;
      if (!payload || typeof payload !== "object") return;
      
      // 1. Check if we can parse the strategy JSON immediately from any message
      const answersObj = payload.answers ?? payload.data ?? payload;
      const parsedJson = tryParseTypebotJson(answersObj);
      
      if (parsedJson) {
        const strategy = mapTypebotJsonToStrategy(parsedJson);
        setStrategyData(strategy);
        toast.success("Sua estratégia está pronta!");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
        return; // Success, stop processing this message
      }

      // 2. Fallback: only trigger on completion events if no JSON was parsed yet
      const isCompletion =
        payload.type === "typebot-completion" ||
        payload.type === "completion" ||
        payload.event === "completed" ||
        payload.completed === true ||
        (payload.answers && (payload.completed || payload.type === "typebot-answers"));

      if (!isCompletion) return;

      const strategy = buildStrategyFromAnswers(answersObj);
      setStrategyData(strategy);
      toast.success("Sua estratégia está pronta!");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div>
      {!strategyData ? (
        <div className="no-print">
          <Hero />
          <GeneratorSection />
        </div>
      ) : null}
      {strategyData ? (
        <section id="strategy-slides" className="bg-slate-950 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-24 lg:py-28 border-y border-slate-800/80 shadow-inner">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your Marketing Strategy
              </h2>
              <p className="mt-4 text-indigo-200/70">
                A stakeholder-ready deck generated from your answers.
              </p>
            </div>
            <div className="mt-12">
              <StrategySlides strategy={strategyData} />
            </div>
          </div>
        </section>
      ) : (
        <div className="no-print">
          <DifferentiatorSection />
          <OutputPreviewSection />
        </div>
      )}
      {!strategyData && (
        <div className="no-print">
          <WhoIsItForSection />
        </div>
      )}
      <div className="no-print">
        <AboutSection />
      </div>
    </div>
  );
}

/**
 * Merge Typebot answers onto the sample strategy. Any field the bot didn't
 * provide falls back to the sample so the PDF always renders a complete report.
 */
function tryParseTypebotJson(answers: Record<string, unknown>): any | null {
  for (const key in answers) {
    const value = answers[key];
    if (typeof value === "string") {
      const trimmed = value.trim();
      let jsonStr = trimmed;
      if (jsonStr.startsWith("```")) {
        const matches = jsonStr.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
        if (matches && matches[1]) {
          jsonStr = matches[1].trim();
        }
      }
      
      if (jsonStr.startsWith("{") && jsonStr.endsWith("}")) {
        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.executive_summary || parsed.executiveSummary || parsed.buyer_persona || parsed.persona) {
            return parsed;
          }
        } catch (e) {
          // ignore and keep looking
        }
      }
    }
  }
  return null;
}

function mapTypebotJsonToStrategy(parsed: any): SampleStrategy {
  const getField = (obj: any, camelKey: string, snakeKey: string) => {
    if (!obj) return undefined;
    return obj[camelKey] !== undefined ? obj[camelKey] : obj[snakeKey];
  };

  const exec = getField(parsed, "executiveSummary", "executive_summary") || {};
  const web = getField(parsed, "websiteInsights", "website_insights");
  const pers = getField(parsed, "buyerPersona", "buyer_persona") || getField(parsed, "persona", "persona") || {};
  const chStrat = getField(parsed, "channelStrategy", "channel_strategy") || {};
  
  const mapChannels = (channels: any[]): { name: string; type: "Paid" | "Owned" | "Organic"; role?: string; whyFit?: string }[] => {
    if (!Array.isArray(channels)) return [];
    return channels.map(c => {
      const name = c.channel || c.name || "";
      let type: "Paid" | "Owned" | "Organic" = "Organic";
      if (c.type === "Paid" || c.type === "Owned" || c.type === "Organic") {
        type = c.type;
      } else {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("ads") || lowerName.includes("paid") || lowerName.includes("google") || lowerName.includes("meta") || lowerName.includes("facebook") || lowerName.includes("instagram") || lowerName.includes("linkedin")) {
          type = "Paid";
        } else if (lowerName.includes("email") || lowerName.includes("website") || lowerName.includes("landing") || lowerName.includes("newsletter")) {
          type = "Owned";
        }
      }
      return {
        name,
        type,
        role: c.role || "",
        whyFit: c.why_fit || c.whyFit || ""
      };
    });
  };

  const paidChannels = mapChannels(getField(chStrat, "paidChannels", "paid_channels"));
  const ownedChannels = mapChannels(getField(chStrat, "ownedChannels", "owned_channels"));
  const organicChannels = mapChannels(getField(chStrat, "organicChannels", "organic_channels"));
  
  const combinedChannels = [...paidChannels, ...ownedChannels, ...organicChannels];
  if (combinedChannels.length === 0 && Array.isArray(chStrat)) {
    chStrat.forEach((c: any) => {
      combinedChannels.push({
        name: c.name || c.channel || "",
        type: c.type || "Organic",
        role: c.role || "",
        whyFit: c.whyFit || c.why_fit || ""
      });
    });
  }

  const rawBudget = getField(parsed, "budgetAllocation", "budget_allocation");
  const budgetAlloc = Array.isArray(rawBudget) ? rawBudget.map((b: any) => {
    let pct = 0;
    if (typeof b.percentage === "number") {
      pct = b.percentage;
    } else if (typeof b.percentage === "string") {
      pct = parseInt(b.percentage.replace(/%/g, "")) || 0;
    } else if (typeof b.pct === "number") {
      pct = b.pct;
    } else if (typeof b.pct === "string") {
      pct = parseInt(b.pct.replace(/%/g, "")) || 0;
    }
    return {
      channel: b.channel || "",
      pct,
      estimatedBudget: b.estimated_budget_share || b.estimatedBudget || "",
      purpose: b.purpose || ""
    };
  }) : [];

  const rawForecast = getField(parsed, "channelForecast", "channel_forecast");
  const channelForecast = Array.isArray(rawForecast) ? rawForecast.map((f: any) => {
    return {
      channel: f.channel || "",
      metrics: f.metrics || {}
    };
  }) : [];

  const rawPriorities = getField(parsed, "recommendedPriorities", "recommended_priorities") || {};
  const priorities = {
    high: getField(rawPriorities, "high", "high_priority") || [],
    medium: getField(rawPriorities, "medium", "medium_priority") || [],
    low: getField(rawPriorities, "low", "low_priority") || []
  };

  const rawNext = getField(parsed, "nextSteps", "next_steps") || {};
  const nextSteps = {
    week1: getField(rawNext, "week1", "week_1") || "",
    week2: getField(rawNext, "week2", "week_2") || "",
    week3: getField(rawNext, "week3", "week_3") || "",
    week4: getField(rawNext, "week4", "week_4") || ""
  };

  const rawCreative = getField(parsed, "creativeDirection", "creative_direction");
  const creativeDirection: string[] = [];
  let creativeDetail: any = undefined;
  if (rawCreative) {
    if (Array.isArray(rawCreative)) {
      creativeDirection.push(...rawCreative);
    } else if (typeof rawCreative === "object") {
      creativeDetail = {
        recommendedFormat: getField(rawCreative, "recommendedFormat", "recommended_format") || "",
        visualAngle: getField(rawCreative, "visualAngle", "visual_angle") || "",
        visualStyle: getField(rawCreative, "visualStyle", "visual_style") || "",
        contentStructure: getField(rawCreative, "contentStructure", "content_structure") || []
      };
      if (creativeDetail.recommendedFormat) creativeDirection.push(`Formato: ${creativeDetail.recommendedFormat}`);
      if (creativeDetail.visualAngle) creativeDirection.push(`Ângulo Visual: ${creativeDetail.visualAngle}`);
      if (creativeDetail.visualStyle) creativeDirection.push(`Estilo Visual: ${creativeDetail.visualStyle}`);
    }
  }

  const rawAssets = getField(parsed, "campaignAssets", "campaign_assets");
  const campaignAssetsList: { type: string; content: string }[] = [];
  if (rawAssets) {
    const social = getField(rawAssets, "socialPost", "social_post");
    if (social) {
      campaignAssetsList.push({
        type: `Social Post (${social.platform || "Instagram"})`,
        content: social.copy || social.content || ""
      });
    }
    const emailObj = getField(rawAssets, "email", "email");
    if (emailObj) {
      campaignAssetsList.push({
        type: "Email Copy",
        content: `Subject: ${emailObj.subject_line || emailObj.subject || ""}\n\n${emailObj.body || ""}`
      });
    }
  }

  const fSummary = getField(parsed, "forecastSummary", "forecast_summary") || {};

  return {
    executiveSummary: {
      goal: getField(exec, "campaignGoal", "campaign_goal") || getField(exec, "goal", "goal") || "",
      audience: getField(exec, "targetAudience", "target_audience") || getField(exec, "audience", "audience") || "",
      productService: getField(exec, "productService", "product_service") || "",
      primaryChannel: getField(exec, "primaryChannel", "primary_channel") || "",
      budget: getField(exec, "monthlyBudget", "monthly_budget") || getField(exec, "budget", "budget") || "",
      forecast: getField(exec, "forecastHighlight", "forecast_highlight") || getField(exec, "forecast", "forecast") || "",
      forecastHighlight: getField(exec, "forecastHighlight", "forecast_highlight") || "",
      campaignTimeframe: getField(exec, "campaignTimeframe", "campaign_timeframe") || ""
    },
    websiteInsights: web && (getField(web, "detectedOffer", "detected_offer") || getField(web, "keyDifferentiators", "key_differentiators")) ? {
      detectedOffer: getField(web, "detectedOffer", "detected_offer") || "",
      keyDifferentiators: getField(web, "keyDifferentiators", "key_differentiators") || [],
      promotionalHooks: getField(web, "promotionalHooks", "promotional_hooks") || [],
      messagingAngle: getField(web, "messagingAngle", "messaging_angle") || ""
    } : undefined,
    persona: {
      title: getField(pers, "personaName", "persona_name") || getField(pers, "title", "title") || "",
      jobTitle: getField(pers, "jobTitle", "job_title") || "",
      goals: getField(pers, "goals", "main_goals") || getField(pers, "goals", "goals") || [],
      challenges: getField(pers, "challenges", "main_challenges") || getField(pers, "challenges", "challenges") || [],
      keyBuyingFactors: getField(pers, "keyBuyingFactors", "key_buying_factors") || [],
      decisionInfluence: getField(pers, "decisionInfluence", "decision_influence") || ""
    },
    headline: parsed.campaign_headline || parsed.campaignHeadline || parsed.headline || "",
    cta: parsed.primary_cta || parsed.primaryCta || parsed.cta || "",
    channelStrategy: combinedChannels.length > 0 ? combinedChannels : sampleStrategy.channelStrategy,
    budgetAllocation: budgetAlloc,
    channelForecast: channelForecast,
    campaignForecastSummary: parsed.campaignForecastSummary || getField(fSummary, "totalCampaignResults", "total_campaign_results") || "",
    forecastSummary: {
      monthlyResults: getField(fSummary, "monthlyResults", "monthly_results") || "",
      totalCampaignResults: getField(fSummary, "totalCampaignResults", "total_campaign_results") || "",
      averagePrimaryMetric: getField(fSummary, "averagePrimaryMetric", "average_primary_metric") || "",
      mainSuccessMetric: getField(fSummary, "mainSuccessMetric", "main_success_metric") || ""
    },
    creativeDirection: creativeDirection,
    creativeDirectionDetail: creativeDetail,
    recommendedPriorities: priorities,
    nextSteps: nextSteps,
    campaignAssets: campaignAssetsList
  };
}

function buildStrategyFromAnswers(answers: Record<string, unknown> = {}): SampleStrategy {
  const parsedJson = tryParseTypebotJson(answers);
  if (parsedJson) {
    return mapTypebotJsonToStrategy(parsedJson);
  }

  const get = (k: string) => (typeof answers[k] === "string" ? (answers[k] as string) : undefined);
  return {
    ...sampleStrategy,
    executiveSummary: {
      ...sampleStrategy.executiveSummary,
      goal: get("goal") ?? sampleStrategy.executiveSummary.goal,
      audience: get("audience") ?? sampleStrategy.executiveSummary.audience,
      primaryChannel: get("primaryChannel") ?? sampleStrategy.executiveSummary.primaryChannel,
      budget: get("budget") ?? sampleStrategy.executiveSummary.budget,
      forecast: get("forecast") ?? sampleStrategy.executiveSummary.forecast,
    },
    headline: get("headline") ?? sampleStrategy.headline,
    cta: get("cta") ?? sampleStrategy.cta,
  };
}

/* ───────────── Hero ───────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-gradient-soft" />
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium shadow-card">
            <Sparkles className="h-3 w-3 text-primary" />
            AI-Powered Strategy Generator
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Turn a Simple Brief into a Complete{" "}
            <span className="text-gradient">Marketing Strategy</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Answer a few questions and receive a complete campaign plan including audience insights, channel strategy, budget allocation, performance forecasts and creative recommendations.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" onClick={scrollToGenerator}>
              Start Planning <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <TrustBadge label="100% Free" />
            <TrustBadge label="Powered by OpenAI" />
            <TrustBadge label="Built with Lovable" />
            <TrustBadge label="Powered by Typebot" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-card">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-hero" />
      {label}
    </span>
  );
}

/* ───────────── Generator (Typebot) ───────────── */
function GeneratorSection() {
  return (
    <section id="generator" className="bg-gradient-soft py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium">
            <Brain className="h-3 w-3 text-primary" /> Strategy Builder
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Build Your Strategy
          </h2>
          <p className="mt-4 text-muted-foreground">
            Answer a few questions and receive a complete marketing plan tailored to your audience, goals and budget.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <TypebotEmbed />
        </div>
      </div>
    </section>
  );
}


/* ───────────── Strategic Differentiator ───────────── */
function DifferentiatorSection() {
  const rows = [
    { from: "Generic AI Copy", to: "Campaign Strategy" },
    { from: "Random Content Ideas", to: "Channel Recommendations" },
    { from: "Single Asset", to: "Complete Marketing Plan" },
    { from: "No Forecasting", to: "Budget & Performance Estimates" },
  ];
  return (
    <section className="bg-surface py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Most AI tools generate content.{" "}
            <span className="text-gradient">Marketing AI Lab generates strategy.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4">
          {rows.map(({ from, to }) => (
            <div key={from} className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr] group">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-muted-foreground transition-all duration-300 group-hover:border-slate-350">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted transition-colors duration-300 group-hover:bg-slate-200">
                  <X className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium line-through decoration-muted-foreground/40">{from}</span>
              </div>
              <div className="hidden items-center justify-center sm:flex">
                <ArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-gradient-soft p-4 shadow-card transition-all duration-300 group-hover:border-primary/45 group-hover:shadow-glow">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-hero text-primary-foreground shadow-glow transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-foreground">{to}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Output Preview ───────────── */
function OutputPreviewSection() {
  const s = sampleStrategy;
  return (
    <section className="py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What Your Strategy Looks Like
          </h2>
          <p className="mt-4 text-muted-foreground">
            A preview of the deliverables you'll receive — ready to share with your team.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* 1. Executive Summary */}
          <PreviewCard icon={FileText} label="Executive Summary" className="lg:col-span-2 flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-between">
              {/* Core Campaign Message banner */}
              <div className="mb-4 p-3 bg-gradient-soft rounded-xl border border-primary/10 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-primary">Core Campaign Message</div>
                <p className="text-sm font-semibold text-foreground italic">"{s.headline}"</p>
              </div>

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <Field label="Goal" value={s.executiveSummary.goal} />
                <Field label="Target Audience" value={s.executiveSummary.audience} />
                <Field label="Product / Service" value={s.executiveSummary.productService || "General Offering"} />
                <Field label="Primary Channel" value={s.executiveSummary.primaryChannel} />
                <Field label="Monthly Budget" value={s.executiveSummary.budget} />
                <Field label="Timeframe" value={s.executiveSummary.campaignTimeframe || "8 weeks"} />
              </div>

              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                  CTA Hook: <span className="text-indigo-300 font-bold">{s.cta}</span>
                </span>
              </div>
            </div>
          </PreviewCard>

          {/* 2. Website Insights */}
          <PreviewCard icon={Globe} label="Website Insights" className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-surface p-3 shadow-sm">
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Detected Offering</div>
                <p className="text-xs font-semibold text-foreground leading-relaxed">{s.websiteInsights?.detectedOffer}</p>
              </div>
              <div className="rounded-xl border border-primary/15 bg-accent/40 p-3 border-l-4 border-l-primary shadow-sm">
                <div className="text-[9px] font-bold uppercase tracking-wider text-primary mb-1">Messaging Angle</div>
                <p className="text-xs text-foreground leading-relaxed font-semibold">{s.websiteInsights?.messagingAngle}</p>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Differentiators</div>
                <ul className="space-y-1.5 text-xs">
                  {s.websiteInsights?.keyDifferentiators?.map((diff, i) => (
                    <li key={i} className="flex gap-2 items-start text-foreground font-medium">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PreviewCard>

          {/* 3. Buyer Persona */}
          <PreviewCard icon={Users} label="Buyer Persona">
            <div className="flex flex-col justify-between h-full gap-4">
              <div className="rounded-xl border border-border bg-surface p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white uppercase shadow-sm">
                    {s.persona.title.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Target Profile</div>
                    <div className="text-xs font-bold text-foreground leading-tight">
                      {s.persona.title} {s.persona.jobTitle ? `(${s.persona.jobTitle})` : ""}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 grid-cols-1">
                <div className="rounded-xl border border-border bg-white p-3 shadow-sm">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 mb-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Core Objectives
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground font-medium">
                    {s.persona.goals.map((g) => <li key={g} className="flex gap-1">• {g}</li>)}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-white p-3 shadow-sm">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-rose-600 mb-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Primary Friction Points
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground font-medium">
                    {s.persona.challenges.map((c) => <li key={c} className="flex gap-1">• {c}</li>)}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-white p-3 shadow-sm">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Key Buying Factors
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground font-medium">
                    {(s.persona.keyBuyingFactors || []).map((f) => <li key={f} className="flex gap-1">• {f}</li>)}
                  </ul>
                </div>
              </div>

              {s.persona.decisionInfluence && (
                <div className="rounded-xl border border-border bg-surface p-2.5 flex items-center gap-1.5 shadow-sm">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Influence:</span>
                  <span className="text-xs text-foreground font-semibold leading-tight">{s.persona.decisionInfluence}</span>
                </div>
              )}
            </div>
          </PreviewCard>

          {/* 4. Channel Strategy */}
          <PreviewCard icon={Network} label="Channel Strategy" className="flex flex-col justify-between">
            <div className="space-y-4">
              {/* Paid Media */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Paid Media</span>
                </div>
                <div className="space-y-1.5">
                  {s.channelStrategy.filter(c => c.type === "Paid").map((ch, i) => (
                    <div key={i} className="bg-surface p-2 rounded-lg border border-border flex items-center justify-between shadow-sm">
                      <span className="text-xs font-bold text-foreground">{ch.name}</span>
                      <span className="text-[9px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">PAID</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owned Properties */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Owned Properties</span>
                </div>
                <div className="space-y-1.5">
                  {s.channelStrategy.filter(c => c.type === "Owned").map((ch, i) => (
                    <div key={i} className="bg-surface p-2 rounded-lg border border-border flex items-center justify-between shadow-sm">
                      <span className="text-xs font-bold text-foreground">{ch.name}</span>
                      <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">OWNED</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organic Growth */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Organic Growth</span>
                </div>
                <div className="space-y-1.5">
                  {s.channelStrategy.filter(c => c.type === "Organic").map((ch, i) => (
                    <div key={i} className="bg-surface p-2 rounded-lg border border-border flex items-center justify-between shadow-sm">
                      <span className="text-xs font-bold text-foreground">{ch.name}</span>
                      <span className="text-[9px] font-semibold text-slate-500 bg-muted px-1.5 py-0.5 rounded">ORGANIC</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-3 flex justify-between text-[10px]">
              <div>
                <span className="text-muted-foreground block text-[8px] uppercase font-bold tracking-wider">Primary Channel</span>
                <span className="font-bold text-primary">{s.executiveSummary.primaryChannel}</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground block text-[8px] uppercase font-bold tracking-wider">Secondary</span>
                <span className="font-bold text-foreground">{s.channelStrategy[1]?.name || "N/A"}</span>
              </div>
            </div>
          </PreviewCard>

          {/* 5. Budget Allocation */}
          <PreviewCard icon={PieChart} label="Budget Allocation" className="flex flex-col justify-between">
            <div className="space-y-4">
              {s.budgetAllocation.map(({ channel, pct, estimatedBudget, purpose }) => (
                <div key={channel} className="bg-surface p-3 rounded-xl border border-border shadow-sm">
                  <div className="mb-1 flex items-baseline justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="text-xs font-bold text-foreground">{channel}</span>
                      {estimatedBudget && (
                        <span className="text-[9px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {estimatedBudget}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-primary">{pct}%</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-hero" style={{ width: `${pct}%` }} />
                  </div>
                  
                  {purpose && (
                    <p className="text-[9px] text-muted-foreground mt-1.5 leading-tight">
                      <span className="font-semibold text-foreground">Purpose:</span> {purpose}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-3 flex justify-between items-center text-[10px]">
              <div>
                <span className="text-muted-foreground block text-[8px] uppercase font-bold tracking-wider">Estimated Budget</span>
                <span className="font-bold text-sm text-emerald-600">{s.executiveSummary.budget}</span>
              </div>
              <div className="text-right text-[8px] text-muted-foreground italic leading-tight max-w-[150px]">
                Allocated strictly to high-performing digital channels.
              </div>
            </div>
          </PreviewCard>

          {/* 6. Performance Forecast */}
          <PreviewCard icon={TrendingUp} label="Performance Forecast" className="lg:col-span-2 flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-between">
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {s.channelForecast.slice(0, 2).map((f) => {
                  const metrics = f.metrics || {
                    "Reach": f.reach || "N/A",
                    "Clicks": f.clicks || "N/A",
                    "Leads": f.leads || "N/A"
                  };
                  return (
                    <div key={f.channel} className="rounded-xl border border-border bg-surface p-3 shadow-sm">
                      <div className="text-xs font-bold text-foreground border-b border-border pb-1.5 mb-2 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {f.channel}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(metrics).map(([label, val]) => (
                          <div key={label} className="bg-card p-2 rounded-lg text-center border border-border/60">
                            <div className="text-xs font-bold text-foreground">{val}</div>
                            <div className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Blended Forecast Summary */}
              {s.forecastSummary && (
                <div className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-4 bg-slate-900 text-white rounded-xl p-3 shadow-md">
                  <div className="px-2">
                    <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Monthly Output</span>
                    <span className="font-bold text-xs text-indigo-400 leading-snug">{s.forecastSummary.monthlyResults}</span>
                  </div>
                  <div className="px-2 border-l border-slate-800">
                    <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Total Campaign</span>
                    <span className="font-bold text-xs text-indigo-400 leading-snug">{s.forecastSummary.totalCampaignResults}</span>
                  </div>
                  <div className="px-2 border-l border-slate-800">
                    <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Efficiency</span>
                    <span className="font-bold text-xs text-indigo-400 leading-snug">{s.forecastSummary.averagePrimaryMetric}</span>
                  </div>
                  <div className="px-2 border-l border-slate-800">
                    <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Success Metric</span>
                    <span className="font-bold text-xs text-emerald-400 leading-snug">{s.forecastSummary.mainSuccessMetric}</span>
                  </div>
                </div>
              )}
            </div>
          </PreviewCard>

          {/* 7. Recommended Priorities */}
          <PreviewCard icon={AlertCircle} label="Recommended Priorities" className="flex flex-col justify-between">
            <div className="space-y-3.5">
              {s.recommendedPriorities && (
                <>
                  {/* High */}
                  <div className="rounded-xl border border-rose-100 bg-rose-50/10 p-2.5 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5 border-b border-rose-100/50 pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Operational Focus</span>
                      <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-rose-700">High</span>
                    </div>
                    <ul className="space-y-1 text-xs text-foreground font-medium">
                      {s.recommendedPriorities.high.map((item, i) => (
                        <li key={i} className="flex gap-1.5 items-start">
                          <span className="text-rose-500 font-bold shrink-0">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Medium */}
                  <div className="rounded-xl border border-amber-100 bg-amber-50/10 p-2.5 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5 border-b border-amber-100/50 pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Secondary Actions</span>
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-700">Medium</span>
                    </div>
                    <ul className="space-y-1 text-xs text-foreground font-medium">
                      {s.recommendedPriorities.medium.map((item, i) => (
                        <li key={i} className="flex gap-1.5 items-start">
                          <span className="text-amber-500 font-bold shrink-0">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Low */}
                  <div className="rounded-xl border border-border bg-slate-50/30 p-2.5 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5 border-b border-border/50 pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Later Optimizations</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-slate-600">Low</span>
                    </div>
                    <ul className="space-y-1 text-xs text-foreground font-medium">
                      {s.recommendedPriorities.low.map((item, i) => (
                        <li key={i} className="flex gap-1.5 items-start">
                          <span className="text-slate-400 font-bold shrink-0">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </PreviewCard>

          {/* 8. Implementation Timeline */}
          <PreviewCard icon={Calendar} label="Implementation Timeline" className="lg:col-span-3">
            {s.nextSteps && (
              <div className="relative">
                {/* Horizontal connector line on desktop */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-border hidden md:block" />
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-4 relative z-10">
                  {[
                    { w: "Week 1", desc: s.nextSteps.week1 },
                    { w: "Week 2", desc: s.nextSteps.week2 },
                    { w: "Week 3", desc: s.nextSteps.week3 },
                    { w: "Week 4", desc: s.nextSteps.week4 },
                  ].map((step, idx) => (
                    <div key={idx} className="bg-card p-4 rounded-xl border border-border hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-2 mb-2 md:flex-col md:items-start">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-xs shadow-inner">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">{step.w}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PreviewCard>
        </div>

      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3 shadow-sm">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ChannelTag({ type }: { type: "Paid" | "Owned" | "Organic" }) {
  const styles: Record<string, string> = {
    Paid: "bg-primary/10 text-primary",
    Owned: "bg-accent text-accent-foreground",
    Organic: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles[type]}`}>
      {type}
    </span>
  );
}

function PreviewCard({
  icon: Icon, label, children, className = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-glow hover:border-primary/20 hover:-translate-y-1 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
}

/* ───────────── Who Is It For ───────────── */
function WhoIsItForSection() {
  const audiences = [
    { icon: Target, title: "Marketing Managers", desc: "Build campaign strategies faster." },
    { icon: Briefcase, title: "Marketing Consultants", desc: "Create client-ready plans in minutes." },
    { icon: UserCheck, title: "Freelancers", desc: "Move from brief to strategy without starting from scratch." },
    { icon: Handshake, title: "Agencies", desc: "Accelerate campaign planning and stakeholder presentations." },
    { icon: Rocket, title: "Startup Founders", desc: "Get marketing direction without a full marketing team." },
    { icon: Building2, title: "B2B Teams", desc: "Align messaging, channels and budget recommendations." },
  ];
  return (
    <section className="bg-surface py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Who Is It For?
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-0.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── About ───────────── */
function AboutSection() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">About This Project</h2>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            Marketing AI Lab is an experimental portfolio project created by{" "}
            <span className="font-medium text-foreground">Suzane Bajester</span>{" "}
            to explore Marketing Operations and AI integrations. All strategies, budget allocations, and performance forecasts are generated by artificial intelligence for demonstration purposes only.
          </p>
        </div>
      </div>
    </section>
  );
}
