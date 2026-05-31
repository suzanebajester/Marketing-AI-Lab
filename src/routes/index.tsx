import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, ArrowRight, Users, Megaphone, MousePointerClick, Linkedin, Mail,
  Lightbulb, Check, CheckCircle2, Loader2, Copy, RefreshCw, Save, Download,
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
      { name: "description", content: "Generate a complete marketing campaign with AI: buyer persona, headline, CTA, LinkedIn post, email copy, and recommendations — in minutes." },
      { property: "og:title", content: "Marketing AI Lab" },
      { property: "og:description", content: "AI-powered marketing campaigns in minutes." },
    ],
  }),
  component: Landing,
});

// Future Typebot integration entry point.
function openTypebot() {
  // TODO: integrate Typebot modal here.
  document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
      {campaign && <ResultSection campaign={campaign} />}
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
            Currently in Free Beta
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Create Complete Marketing Campaigns with{" "}
            <span className="text-gradient">AI in Minutes</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Answer six questions and get a buyer persona, headline, CTA, LinkedIn post, email copy, and recommendations — instantly.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" onClick={openTypebot}>
              Generate My Campaign <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Currently in Free Beta · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────── What You Get ───────────── */
function WhatYouGet() {
  const cards = [
    { icon: Users, title: "Buyer Persona", desc: "Detailed profile with goals and pains." },
    { icon: Megaphone, title: "Campaign Headline", desc: "A bold, ready-to-test message." },
    { icon: MousePointerClick, title: "CTA", desc: "A high-converting call-to-action." },
    { icon: Linkedin, title: "LinkedIn Post", desc: "Native-format post for organic reach." },
    { icon: Mail, title: "Email Copy", desc: "Subject line and full email body." },
    { icon: Lightbulb, title: "Recommendations", desc: "Tactical next steps for your team." },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          <p className="mt-3 text-muted-foreground">Six AI-generated assets. One brief. Zero templates.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Generator ───────────── */
const CHANNELS = ["LinkedIn", "Email Marketing", "Google Ads", "Facebook Ads"] as const;
const TONES = ["Professional", "Friendly", "Technical", "Bold"] as const;

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
    setTimeout(() => onGenerated(generateMockCampaign(input)), 1200);
  };

  const loadExample = () => {
    setLoading(true);
    setTimeout(() => onGenerated(exampleCampaign), 600);
  };

  return (
    <section id="generator" className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-primary" /> AI Campaign Generator
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Generate your campaign
          </h2>
          <p className="mt-3 text-muted-foreground">Six questions. One complete campaign. Free during beta.</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Industry / Niche">
                <Input
                  placeholder="e.g. B2B SaaS, Fintech, E-commerce"
                  value={input.industry}
                  onChange={(e) => setInput({ ...input, industry: e.target.value })}
                  required
                />
              </Field>
              <Field label="Country">
                <Input
                  placeholder="e.g. United States"
                  value={input.country}
                  onChange={(e) => setInput({ ...input, country: e.target.value })}
                  required
                />
              </Field>
              <Field label="Target Audience">
                <Input
                  placeholder="e.g. Heads of Marketing at scale-ups"
                  value={input.audience}
                  onChange={(e) => setInput({ ...input, audience: e.target.value })}
                  required
                />
              </Field>
              <Field label="Campaign Goal">
                <Input
                  placeholder="e.g. Generate 50 demos this quarter"
                  value={input.goal}
                  onChange={(e) => setInput({ ...input, goal: e.target.value })}
                  required
                />
              </Field>
              <Field label="Marketing Channel">
                <Select value={input.channel} onValueChange={(v) => setInput({ ...input, channel: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHANNELS.map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Tone of Voice">
                <Select value={input.tone} onValueChange={(v) => setInput({ ...input, tone: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
              <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto" disabled={loading}>
                {loading
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
                  : <><Sparkles className="h-4 w-4" /> Generate My Campaign</>}
              </Button>
              <Button type="button" variant="outline" size="xl" className="w-full sm:w-auto" disabled={loading} onClick={loadExample}>
                See Example
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Free during beta. No credit card required.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/* ───────────── Result ───────────── */
function ResultSection({ campaign }: { campaign: GeneratedCampaign }) {
  return (
    <section id="result" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your Campaign</h2>
          <p className="mt-3 text-muted-foreground">Here's everything AI generated for your brief.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          <ResultCard icon={<Users className="h-4 w-4" />} title="Buyer Persona" copyText={`${campaign.persona.name}\n${campaign.persona.role}\n\nGoals:\n${campaign.persona.goals.join("\n")}\n\nPains:\n${campaign.persona.pains.join("\n")}`}>
            <div className="font-semibold">{campaign.persona.name}</div>
            <div className="text-sm text-muted-foreground">{campaign.persona.role}</div>
            <div className="mt-3 text-xs text-muted-foreground">Age: {campaign.persona.age}</div>
            <Block label="Goals" items={campaign.persona.goals} />
            <Block label="Pains" items={campaign.persona.pains} />
          </ResultCard>

          <ResultCard icon={<Megaphone className="h-4 w-4" />} title="Campaign Headline" copyText={campaign.headline}>
            <div className="font-display text-xl font-bold leading-snug">{campaign.headline}</div>
          </ResultCard>

          <ResultCard icon={<MousePointerClick className="h-4 w-4" />} title="CTA" copyText={campaign.cta}>
            <div className="rounded-lg bg-gradient-hero p-4 text-center font-semibold text-primary-foreground">{campaign.cta}</div>
          </ResultCard>

          <ResultCard icon={<Linkedin className="h-4 w-4" />} title="LinkedIn Post" copyText={campaign.linkedinPost}>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{campaign.linkedinPost}</p>
          </ResultCard>

          <ResultCard icon={<Mail className="h-4 w-4" />} title="Email Copy" copyText={`Subject: ${campaign.email.subject}\n\n${campaign.email.body}`}>
            <div className="text-sm font-semibold">Subject: {campaign.email.subject}</div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{campaign.email.body}</p>
          </ResultCard>

          <ResultCard icon={<Lightbulb className="h-4 w-4" />} title="Campaign Recommendations" copyText={campaign.recommendations.join("\n")}>
            <ul className="space-y-2 text-sm">
              {campaign.recommendations.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">{i + 1}</span>
                  {r}
                </li>
              ))}
            </ul>
          </ResultCard>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-end gap-2 rounded-2xl border border-border bg-card p-4 shadow-card">
          <Button variant="outline" onClick={() => toast.info("Save Campaign coming soon")}>
            <Save className="h-4 w-4" /> Save Campaign
          </Button>
          <Button variant="outline" onClick={() => toast.info("PDF export coming soon")}>
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button variant="hero" onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}>
            <RefreshCw className="h-4 w-4" /> Generate Another
          </Button>
        </div>
      </div>
    </section>
  );
}

function Block({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <ul className="mt-1 space-y-1 text-sm">
        {items.map((g) => (
          <li key={g} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-success" />{g}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResultCard({ icon, title, copyText, children }: {
  icon: React.ReactNode; title: string; copyText: string; children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    toast.success(`${title} copied`);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-primary">{icon}</span>{title}
        </div>
        <button onClick={handleCopy} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Copy">
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex-1 pt-4">{children}</div>
    </div>
  );
}
