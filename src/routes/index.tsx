import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles, ArrowRight, Users, Megaphone, Lightbulb, FileText, Network, PieChart,
  TrendingUp, Check, X, Brain, Briefcase, Building2, UserCheck,
  Rocket, Handshake, Target,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TypebotEmbed } from "@/components/TypebotEmbed";
import { sampleStrategy, type SampleStrategy } from "@/lib/sampleStrategy";
import { StrategySlides } from "@/components/StrategySlides";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketing AI Lab | AI-Powered Marketing Strategy Generator" },
      { name: "description", content: "Turn a simple brief into a complete marketing strategy. Get buyer personas, channel plans, budget allocation, performance forecasts and creative direction in minutes." },
      { property: "og:title", content: "Marketing AI Lab" },
      { property: "og:description", content: "Turn a simple brief into a complete AI-powered marketing strategy." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ee971-29f4-4659-a342-599b85939247/id-preview-e44e50f8--bdc65a74-fdf9-4cce-9fbf-bfd4a83333e4.lovable.app-1780242951323.png" },
      { property: "og:url", content: "https://marketingailab.app/" },
      { name: "twitter:title", content: "Marketing AI Lab" },
      { name: "twitter:description", content: "Turn a simple brief into a complete AI-powered marketing strategy." },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ee971-29f4-4659-a342-599b85939247/id-preview-e44e50f8--bdc65a74-fdf9-4cce-9fbf-bfd4a83333e4.lovable.app-1780242951323.png" },
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
      
      console.log("Marketing AI Lab received Typebot payload:", payload);

      // 1. Check if we can parse the strategy JSON immediately from any message
      const answersObj = payload.answers ?? payload.data ?? payload;
      const parsedJson = tryParseTypebotJson(answersObj);
      
      if (parsedJson) {
        console.log("Found valid JSON in payload, mapping to strategy...");
        const strategy = mapTypebotJsonToStrategy(parsedJson);
        setStrategyData(strategy);
        toast.success("Sua estratégia está pronta! Role para baixo para visualizar.");
        setTimeout(() => {
          document.getElementById("strategy-slides")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

      console.log("Completion event received from Typebot, loading fallback strategy...");
      const strategy = buildStrategyFromAnswers(answersObj);
      setStrategyData(strategy);
      toast.success("Sua estratégia está pronta! Role para baixo para visualizar.");
      setTimeout(() => {
        document.getElementById("strategy-slides")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div>
      <Hero />
      <GeneratorSection />
      {strategyData && (
        <section id="strategy-slides" className="bg-gradient-soft py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Your Marketing Strategy
              </h2>
              <p className="mt-4 text-muted-foreground">
                A stakeholder-ready deck generated from your answers.
              </p>
            </div>
            <div className="mt-12">
              <StrategySlides strategy={strategyData} />
            </div>
          </div>
        </section>
      )}
      <WhatYouReceive />
      <DifferentiatorSection />
      <OutputPreviewSection />
      <WhoIsItForSection />
      <AboutSection />
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
            console.log("Successfully found and parsed campaign JSON from Typebot key:", key);
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

/* ───────────── What You'll Receive ───────────── */
function WhatYouReceive() {
  const cards = [
    { icon: FileText, title: "Executive Campaign Summary", desc: "Stakeholder-ready overview of goals, audience and recommendations." },
    { icon: Users, title: "Buyer Persona", desc: "Understand motivations, challenges and decision criteria." },
    { icon: Network, title: "Channel Strategy", desc: "Paid, owned and organic channel recommendations." },
    { icon: PieChart, title: "Budget Allocation", desc: "Suggested investment by channel." },
    { icon: TrendingUp, title: "Performance Forecast", desc: "Estimated reach, traffic, leads or awareness outcomes." },
    { icon: Lightbulb, title: "Creative Direction", desc: "Campaign concepts and content recommendations." },
    { icon: Megaphone, title: "Campaign Assets", desc: "Ready-to-use LinkedIn and email examples." },
  ];
  return (
    <section className="py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What you'll receive
          </h2>
          <p className="mt-4 text-muted-foreground">
            One brief. A complete, stakeholder-ready marketing strategy.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-0.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
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
            <div key={from} className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-muted-foreground">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                  <X className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium line-through decoration-muted-foreground/40">{from}</span>
              </div>
              <div className="hidden items-center justify-center sm:flex">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-gradient-soft p-4 shadow-card">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-hero text-primary-foreground shadow-glow">
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
          {/* Executive Summary */}
          <PreviewCard icon={FileText} label="Executive Summary" className="lg:col-span-2">
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <Field label="Goal" value={s.executiveSummary.goal} />
              <Field label="Audience" value={s.executiveSummary.audience} />
              <Field label="Primary Channel" value={s.executiveSummary.primaryChannel} />
              <Field label="Budget" value={s.executiveSummary.budget} />
              <Field label="Forecast" value={s.executiveSummary.forecast} />
            </dl>
          </PreviewCard>

          {/* Persona */}
          <PreviewCard icon={Users} label="Buyer Persona">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero font-display text-sm font-bold text-primary-foreground">QM</div>
              <div className="text-sm font-semibold">{s.persona.title}</div>
            </div>
            <div className="mt-4 text-xs">
              <div className="font-semibold uppercase tracking-wider text-muted-foreground">Goals</div>
              <ul className="mt-1 space-y-1 text-foreground">
                {s.persona.goals.map((g) => <li key={g}>• {g}</li>)}
              </ul>
              <div className="mt-3 font-semibold uppercase tracking-wider text-muted-foreground">Challenges</div>
              <ul className="mt-1 space-y-1 text-foreground">
                {s.persona.challenges.map((c) => <li key={c}>• {c}</li>)}
              </ul>
            </div>
          </PreviewCard>

          {/* Channel Strategy */}
          <PreviewCard icon={Network} label="Channel Strategy">
            <ul className="space-y-2.5 text-sm">
              {s.channelStrategy.map((c) => (
                <li key={c.name} className="flex items-center justify-between">
                  <span>{c.name}</span>
                  <ChannelTag type={c.type} />
                </li>
              ))}
            </ul>
          </PreviewCard>

          {/* Budget */}
          <PreviewCard icon={PieChart} label="Budget Allocation">
            <div className="space-y-3">
              {s.budgetAllocation.map(({ channel, pct }) => (
                <div key={channel}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-foreground">{channel}</span>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-hero" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </PreviewCard>

          {/* Forecast */}
          <PreviewCard icon={TrendingUp} label="Performance Forecast">
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "80k–125k", l: "Reach" },
                { v: "1.8k–2.7k", l: "Clicks" },
                { v: "50–120", l: "Leads" },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-lg border border-border bg-surface p-3 text-center">
                  <div className="font-display text-sm font-bold text-gradient">{v}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </PreviewCard>

          {/* Creative Direction */}
          <PreviewCard icon={Lightbulb} label="Creative Direction">
            <div className="flex flex-wrap gap-2">
              {["Carousel", "Case Study", "Industry Guide"].map((c) => (
                <span key={c} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium">{c}</span>
              ))}
            </div>
          </PreviewCard>
        </div>

      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
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
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated ${className}`}>
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
