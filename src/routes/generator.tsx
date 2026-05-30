import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, Users, Megaphone, MousePointerClick, Linkedin, Mail, Lightbulb,
  Copy, RefreshCw, Save, Download, Check, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateMockCampaign, type CampaignInput, type GeneratedCampaign, exampleCampaign } from "@/lib/campaign";
import { toast } from "sonner";

export const Route = createFileRoute("/generator")({
  head: () => ({
    meta: [
      { title: "AI Campaign Generator — Marketing AI Lab" },
      { name: "description", content: "Generate a complete marketing campaign in minutes — personas, headlines, CTAs, LinkedIn posts and email copy." },
    ],
  }),
  component: GeneratorPage,
});

function GeneratorPage() {
  const [input, setInput] = useState<CampaignInput>({
    industry: "", country: "", audience: "", goal: "",
    channel: "LinkedIn", tone: "Professional",
  });
  const [campaign, setCampaign] = useState<GeneratedCampaign | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setCampaign(generateMockCampaign(input));
      setLoading(false);
      toast.success("Campaign generated!");
    }, 1400);
  };

  return (
    <div className="bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-primary" /> AI Campaign Generator
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Generate a <span className="text-gradient">complete marketing campaign</span> in minutes
          </h1>
          <p className="mt-3 text-muted-foreground">
            Answer six questions. Get personas, headlines, CTAs, posts and emails — instantly.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[420px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <form
              onSubmit={handleGenerate}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <h2 className="font-display text-lg font-semibold">Campaign brief</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tell us about your campaign.</p>

              <div className="mt-6 space-y-5">
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
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["LinkedIn", "Email Marketing", "Google Ads", "Facebook Ads"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tone of Voice">
                  <Select value={input.tone} onValueChange={(v) => setInput({ ...input, tone: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Professional", "Friendly", "Technical", "Bold"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Button type="submit" variant="hero" size="lg" className="mt-6 w-full" disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate Campaign</>}
              </Button>
            </form>
          </aside>

          <section>
            {!campaign && !loading && <EmptyState onLoadExample={() => setCampaign(exampleCampaign)} />}
            {loading && <LoadingState />}
            {campaign && !loading && <Results campaign={campaign} onRegenerate={() => setCampaign(generateMockCampaign(input))} />}
          </section>
        </div>
      </div>
    </div>
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

function EmptyState({ onLoadExample }: { onLoadExample: () => void }) {
  return (
    <div className="flex h-full min-h-[500px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-elevated/50 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero shadow-glow">
        <Sparkles className="h-7 w-7 text-primary-foreground" />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold">Your campaign will appear here</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Fill out the brief on the left and click Generate Campaign to see your AI-crafted assets.
      </p>
      <Button variant="outline" className="mt-6" onClick={onLoadExample}>
        Load example campaign
      </Button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-border bg-card p-6">
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Results({ campaign, onRegenerate }: { campaign: GeneratedCampaign; onRegenerate: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard icon={<Users className="h-4 w-4" />} title="Buyer Persona" copyText={`${campaign.persona.name}\n${campaign.persona.role}\n\nGoals:\n${campaign.persona.goals.join("\n")}\n\nPains:\n${campaign.persona.pains.join("\n")}`} onRegenerate={onRegenerate}>
          <div className="font-semibold">{campaign.persona.name}</div>
          <div className="text-sm text-muted-foreground">{campaign.persona.role}</div>
          <div className="mt-3 text-xs text-muted-foreground">Age: {campaign.persona.age}</div>
          <Block label="Goals" items={campaign.persona.goals} />
          <Block label="Pains" items={campaign.persona.pains} />
        </ResultCard>

        <ResultCard icon={<Megaphone className="h-4 w-4" />} title="Campaign Headline" copyText={campaign.headline} onRegenerate={onRegenerate}>
          <div className="font-display text-xl font-bold leading-snug">{campaign.headline}</div>
        </ResultCard>

        <ResultCard icon={<MousePointerClick className="h-4 w-4" />} title="CTA" copyText={campaign.cta} onRegenerate={onRegenerate}>
          <div className="rounded-lg bg-gradient-hero p-4 text-center font-semibold text-primary-foreground">{campaign.cta}</div>
        </ResultCard>

        <ResultCard icon={<Linkedin className="h-4 w-4" />} title="LinkedIn Post" copyText={campaign.linkedinPost} onRegenerate={onRegenerate}>
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{campaign.linkedinPost}</p>
        </ResultCard>

        <ResultCard icon={<Mail className="h-4 w-4" />} title="Email Copy" copyText={`Subject: ${campaign.email.subject}\n\n${campaign.email.body}`} onRegenerate={onRegenerate}>
          <div className="text-sm font-semibold">Subject: {campaign.email.subject}</div>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{campaign.email.body}</p>
        </ResultCard>

        <ResultCard icon={<Lightbulb className="h-4 w-4" />} title="Campaign Recommendations" copyText={campaign.recommendations.join("\n")} onRegenerate={onRegenerate}>
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

      <div className="flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-border bg-card p-4 shadow-card">
        <Button variant="outline" onClick={() => toast.info("Save Campaign coming soon")}><Save className="h-4 w-4" /> Save Campaign</Button>
        <Button variant="outline" onClick={() => toast.info("PDF export coming soon")}><Download className="h-4 w-4" /> Download PDF</Button>
        <Button variant="hero" onClick={onRegenerate}><RefreshCw className="h-4 w-4" /> Regenerate All</Button>
      </div>
    </div>
  );
}

function Block({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <ul className="mt-1 space-y-1 text-sm">
        {items.map((g) => <li key={g} className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-success" />{g}</li>)}
      </ul>
    </div>
  );
}

function ResultCard({ icon, title, copyText, onRegenerate, children }: {
  icon: React.ReactNode; title: string; copyText: string; onRegenerate: () => void; children: React.ReactNode;
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
        <div className="flex items-center gap-1">
          <button onClick={handleCopy} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Copy">
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </button>
          <button onClick={onRegenerate} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Regenerate">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 pt-4">{children}</div>
    </div>
  );
}
