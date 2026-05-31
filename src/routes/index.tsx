import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, ArrowRight, Users, Megaphone, MousePointerClick, Linkedin, Mail,
  Lightbulb, Check, CheckCircle2, Loader2, Copy, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateMockCampaign, type CampaignInput, type GeneratedCampaign, exampleCampaign } from "@/lib/campaign";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketing AI Lab — AI Marketing Campaigns in Minutes" },
      { name: "description", content: "Generate complete marketing campaigns with AI: personas, headlines, CTAs, LinkedIn posts, and email copy in minutes." },
      { property: "og:title", content: "Marketing AI Lab" },
      { property: "og:description", content: "AI-powered marketing campaigns in minutes." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [campaign, setCampaign] = useState<GeneratedCampaign | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerated = (c: GeneratedCampaign) => {
    setCampaign(c);
    setLoading(false);
    toast.success("Campaign generated!");
    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div>
      <Hero />
      <WhatYouGet />
      <GeneratorSection onGenerated={handleGenerated} loading={loading} setLoading={setLoading} />
      {campaign && <ExampleResult campaign={campaign} />}
      <PricingSection />
    </div>
  );
}

/* ───────────── Hero ───────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-soft" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-powered marketing campaigns
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Create Complete Marketing Campaigns with{" "}
            <span className="text-gradient">AI in Minutes</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Generate buyer personas, headlines, CTAs, LinkedIn posts, and email campaigns from a single brief.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#generator">
                Generate Campaign <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#example">See Example</a>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Free forever plan · No credit card required
          </p>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-hero opacity-15 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-elevated">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-chart-4/60" />
          <div className="h-3 w-3 rounded-full bg-success/60" />
          <div className="ml-4 rounded-md bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">marketingailab.com/campaign</div>
        </div>
        <div className="grid gap-3 p-5 md:grid-cols-3">
          <MockCard icon={<Users className="h-4 w-4" />} title="Buyer Persona" badge="Generated">
            <div className="text-xs font-semibold">Sarah Mitchell · 35</div>
            <div className="mt-1 text-xs text-muted-foreground">Head of Marketing, B2B SaaS</div>
            <div className="mt-3 flex flex-wrap gap-1">
              {["Pipeline growth", "Team scaling", "ROI"].map((t) => (
                <span key={t} className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">{t}</span>
              ))}
            </div>
          </MockCard>
          <MockCard icon={<Megaphone className="h-4 w-4" />} title="Headline" badge="A/B ready">
            <div className="text-sm font-semibold leading-snug">Ship campaigns 10× faster — without sacrificing brand voice.</div>
          </MockCard>
          <MockCard icon={<MousePointerClick className="h-4 w-4" />} title="Primary CTA" badge="Optimized">
            <div className="rounded-md bg-gradient-hero p-3 text-center text-xs font-semibold text-primary-foreground">Generate your first campaign — free</div>
          </MockCard>
          <MockCard icon={<Linkedin className="h-4 w-4" />} title="LinkedIn Post" badge="Draft">
            <p className="line-clamp-4 text-xs text-muted-foreground">Most marketing teams aren't short on ideas. They're short on time to ship them. Last quarter, we helped 200+ B2B teams cut production time from 3 weeks to 3 hours…</p>
          </MockCard>
          <MockCard icon={<Mail className="h-4 w-4" />} title="Email Copy" badge="Draft">
            <div className="text-xs font-semibold">Subject: Your Q2 campaign — a 3-hour fix</div>
            <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">Hi Sarah, noticed your team is heading into a busy launch quarter…</p>
          </MockCard>
          <MockCard icon={<Lightbulb className="h-4 w-4" />} title="Recommendations" badge="4 ideas">
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex gap-1.5"><CheckCircle2 className="h-3 w-3 flex-shrink-0 text-success" /> Pin LinkedIn carousel 7 days</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3 w-3 flex-shrink-0 text-success" /> 3-touch email sequence</li>
              <li className="flex gap-1.5"><CheckCircle2 className="h-3 w-3 flex-shrink-0 text-success" /> $200/day LinkedIn retargeting</li>
            </ul>
          </MockCard>
        </div>
      </div>
    </div>
  );
}

function MockCard({ icon, title, badge, children }: { icon: React.ReactNode; title: string; badge: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-gradient-card p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-primary">{icon}</span>{title}
        </div>
        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">{badge}</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/* ───────────── What You Get ───────────── */
function WhatYouGet() {
  const cards = [
    { icon: Users, title: "Buyer Persona" },
    { icon: Megaphone, title: "Campaign Headline" },
    { icon: MousePointerClick, title: "CTA" },
    { icon: Linkedin, title: "LinkedIn Post" },
    { icon: Mail, title: "Email Copy" },
    { icon: Lightbulb, title: "Campaign Recommendations" },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What You Get</h2>
          <p className="mt-3 text-muted-foreground">Six AI-generated assets. One brief. Zero templates.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Inline Generator ───────────── */
function GeneratorSection({
  onGenerated,
  loading,
  setLoading,
}: {
  onGenerated: (c: GeneratedCampaign) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
}) {
  const [input, setInput] = useState<CampaignInput>({
    industry: "", country: "", audience: "", goal: "",
    channel: "LinkedIn", tone: "Professional",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onGenerated(generateMockCampaign(input));
    }, 1200);
  };

  const field = (label: string, child: React.ReactNode) => (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{child}</div>
    </div>
  );

  return (
    <section id="generator" className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">AI Campaign Generator</h2>
          <p className="mt-3 text-muted-foreground">Answer six questions. Get a complete campaign instantly.</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {field("Industry / Niche", (
                <Input
                  placeholder="e.g. B2B SaaS, Fintech, E-commerce"
                  value={input.industry}
                  onChange={(e) => setInput({ ...input, industry: e.target.value })}
                  required
                />
              ))}
              {field("Country", (
                <Input
                  placeholder="e.g. United States"
                  value={input.country}
                  onChange={(e) => setInput({ ...input, country: e.target.value })}
                  required
                />
              ))}
              {field("Target Audience", (
                <Input
                  placeholder="e.g. Heads of Marketing at scale-ups"
                  value={input.audience}
                  onChange={(e) => setInput({ ...input, audience: e.target.value })}
                  required
                />
              ))}
              {field("Campaign Goal", (
                <Input
                  placeholder="e.g. Generate 50 demos this quarter"
                  value={input.goal}
                  onChange={(e) => setInput({ ...input, goal: e.target.value })}
                  required
                />
              ))}
              {field("Marketing Channel", (
                <Select value={input.channel} onValueChange={(v) => setInput({ ...input, channel: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["LinkedIn", "Email Marketing", "Google Ads", "Facebook Ads"].map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              {field("Tone of Voice", (
                <Select value={input.tone} onValueChange={(v) => setInput({ ...input, tone: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Professional", "Friendly", "Technical", "Bold"].map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
              <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto" disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate Campaign</>}
              </Button>
              <Button type="button" variant="outline" size="xl" className="w-full sm:w-auto" disabled={loading} onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  onGenerated(exampleCampaign);
                }, 800);
              }}>
                See Example
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Example Result (compact) ───────────── */
function ExampleResult({ campaign }: { campaign: GeneratedCampaign }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied`);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <section id="example" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your Campaign</h2>
          <p className="mt-3 text-muted-foreground">Here's what AI generated for your brief.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
          {/* Persona */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users className="h-4 w-4 text-primary" /> Buyer Persona
            </div>
            <div className="mt-4">
              <div className="font-semibold">{campaign.persona.name}</div>
              <div className="text-sm text-muted-foreground">{campaign.persona.role}</div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Goals</div>
                  <ul className="mt-1 space-y-1">
                    {campaign.persona.goals.map((g) => (
                      <li key={g} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />{g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pains</div>
                  <ul className="mt-1 space-y-1">
                    {campaign.persona.pains.map((p) => (
                      <li key={p} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Megaphone className="h-4 w-4 text-primary" /> Headline
              </div>
              <button
                onClick={() => handleCopy(campaign.headline, "Headline")}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Copy"
              >
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-6 font-display text-2xl font-bold leading-tight">{campaign.headline}</div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MousePointerClick className="h-4 w-4 text-primary" /> CTA
              </div>
              <button
                onClick={() => handleCopy(campaign.cta, "CTA")}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Copy"
              >
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-6 rounded-lg bg-gradient-hero p-5 text-center font-semibold text-primary-foreground">
              {campaign.cta}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="hero">
            <Link to="/generator">Open Full Workspace <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const el = document.getElementById("generator");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <RefreshCw className="h-4 w-4" /> Generate Another
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Pricing ───────────── */
function PricingSection() {
  const plans = [
    {
      name: "Free", price: "$0", period: "forever",
      desc: "Try Marketing AI Lab risk-free.",
      features: ["3 campaigns per month", "Core AI generator", "Community support"],
      cta: "Start free", variant: "outline" as const,
    },
    {
      name: "Pro", price: "$19", period: "per month",
      desc: "For marketers who ship daily.",
      features: ["Unlimited campaigns", "Export campaigns", "Save history", "Priority support"],
      cta: "Start 14-day free trial", variant: "hero" as const, highlighted: true,
    },
  ];

  return (
    <section className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-8 shadow-card ${p.highlighted ? "border-primary shadow-glow ring-2 ring-primary/20" : "border-border"}`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-hero px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                  Most popular
                </div>
              )}
              <div className="font-display text-lg font-semibold">{p.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/ {p.period}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.variant} size="lg" className="mt-8 w-full">
                <Link to="/generator">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
