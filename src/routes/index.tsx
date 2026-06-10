import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles, ArrowRight, Users, Megaphone, Lightbulb, FileText, Network, PieChart,
  TrendingUp, Linkedin, Mail, Check, X, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypebotEmbed } from "@/components/TypebotEmbed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campaign Generator AI | Create Marketing Campaigns with AI" },
      { name: "description", content: "Generate complete marketing campaigns in minutes. Get buyer personas, headlines, CTAs, social posts, email copy, and creative recommendations powered by AI." },
      { property: "og:title", content: "Campaign Generator AI" },
      { property: "og:description", content: "Create complete marketing campaigns with AI in minutes." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ee971-29f4-4659-a342-599b85939247/id-preview-e44e50f8--bdc65a74-fdf9-4cce-9fbf-bfd4a83333e4.lovable.app-1780242951323.png" },
      { property: "og:url", content: "https://campaign-generator-ai.lovable.app/" },
      { name: "twitter:title", content: "Campaign Generator AI" },
      { name: "twitter:description", content: "Create complete marketing campaigns with AI in minutes." },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de1ee971-29f4-4659-a342-599b85939247/id-preview-e44e50f8--bdc65a74-fdf9-4cce-9fbf-bfd4a83333e4.lovable.app-1780242951323.png" },
    ],
    links: [
      { rel: "canonical", href: "https://campaign-generator-ai.lovable.app/" },
    ],
  }),
  component: Landing,
});

function scrollToGenerator() {
  document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Landing() {
  return (
    <div>
      <Hero />
      <GeneratorSection />
      <WhatYouReceive />
      <DifferentiatorSection />
      <OutputPreviewSection />
      <AboutSection />
    </div>
  );
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
            Generate an AI-Powered Marketing{" "}
            <span className="text-gradient">Strategy</span> in Minutes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Answer a few questions and receive a complete campaign plan including audience insights, channel strategy, budget allocation, performance forecasts and creative recommendations.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" onClick={scrollToGenerator}>
              Start Planning <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="uppercase tracking-wider">Powered by</span>
            <TechBadge label="OpenAI" />
            <TechBadge label="Lovable" />
            <TechBadge label="Typebot" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechBadge({ label }: { label: string }) {
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
  return (
    <section className="py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What your strategy looks like
          </h2>
          <p className="mt-4 text-muted-foreground">
            A preview of the deliverables you'll receive — ready to share with your team.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Executive Summary */}
          <PreviewCard icon={FileText} label="Executive Summary" className="lg:col-span-2">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A Q2 LinkedIn-led campaign targeting mid-market B2B marketing leaders, designed to drive 120 qualified demo requests across a $24k blended budget. Paid social anchors awareness while email nurtures convert in-market accounts.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["B2B SaaS", "Demand Gen", "Q2 2026"].map((t) => (
                <span key={t} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{t}</span>
              ))}
            </div>
          </PreviewCard>

          {/* Persona */}
          <PreviewCard icon={Users} label="Buyer Persona">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero font-display text-sm font-bold text-primary-foreground">SM</div>
              <div>
                <div className="text-sm font-semibold">Sarah Mitchell</div>
                <div className="text-xs text-muted-foreground">Head of Marketing, B2B SaaS</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li>• Needs to prove ROI each quarter</li>
              <li>• Limited team, high output pressure</li>
            </ul>
          </PreviewCard>

          {/* Channel Strategy */}
          <PreviewCard icon={Network} label="Channel Strategy">
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between">
                <span>LinkedIn Ads</span>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Paid</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Email Nurture</span>
                <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Owned</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Thought Leadership</span>
                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Organic</span>
              </li>
            </ul>
          </PreviewCard>

          {/* Budget */}
          <PreviewCard icon={PieChart} label="Budget Allocation">
            <div className="space-y-3">
              {[
                { label: "Paid Social", pct: 55 },
                { label: "Content", pct: 25 },
                { label: "Email / Tools", pct: 20 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-foreground">{label}</span>
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
                { v: "180k", l: "Reach" },
                { v: "2.4k", l: "Clicks" },
                { v: "120", l: "Leads" },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-lg border border-border bg-surface p-3 text-center">
                  <div className="font-display text-lg font-bold text-gradient">{v}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </PreviewCard>

          {/* Creative Direction */}
          <PreviewCard icon={Lightbulb} label="Creative Direction" className="lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              {[
                "Carousel: '5 metrics CMOs track'",
                "Founder POV video",
                "Case study one-pager",
                "Email: insight → proof → CTA",
              ].map((c) => (
                <span key={c} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium">{c}</span>
              ))}
            </div>
          </PreviewCard>
        </div>
      </div>
    </section>
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

/* ───────────── About ───────────── */
function AboutSection() {
  return (
    <section className="border-t border-border bg-surface py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">About This Project</h2>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            Marketing AI Lab is an experimental AI-powered platform designed to help marketers, consultants and agencies create strategic campaign plans faster.
          </p>
          <p>
            Built using OpenAI, Lovable and Typebot, the platform combines campaign planning, channel strategy, creative recommendations and performance forecasting into a single workflow.
          </p>
          <p className="font-medium text-foreground">Created by Suzane Bajester.</p>
        </div>
      </div>
    </section>
  );
}
