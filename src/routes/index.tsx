import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles, ArrowRight, Users, Megaphone, MousePointerClick, Linkedin, Mail,
  Lightbulb, CheckCircle2, Clock, FileText, Search, Calendar, Star, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { exampleCampaign } from "@/lib/campaign";

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
  return (
    <div>
      <Hero />
      <Logos />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <ExampleOutput />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-soft" />
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Powered by next-gen marketing AI
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Create Complete Marketing Campaigns with{" "}
            <span className="text-gradient">AI in Minutes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Generate buyer personas, headlines, CTAs, LinkedIn posts, email campaigns,
            and marketing ideas through a simple AI-powered workflow.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/generator">
                Generate My Campaign <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#example">View Example</a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
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
    <div className="relative mx-auto mt-20 max-w-5xl">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-hero opacity-20 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-elevated">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-chart-4/60" />
          <div className="h-3 w-3 rounded-full bg-success/60" />
          <div className="ml-4 rounded-md bg-surface-elevated px-3 py-1 text-xs text-muted-foreground">marketingailab.com/campaign</div>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-3">
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

function Logos() {
  return (
    <section className="border-y border-border bg-surface py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by modern marketing teams
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
          {["Northwind", "Acme.io", "Stratus", "Lumen Labs", "Helio", "Vertex"].map((n) => (
            <span key={n} className="font-display text-lg font-bold tracking-tight text-muted-foreground">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: FileText, t: "Creating content from scratch", d: "Every campaign starts with a blank page." },
    { icon: Users, t: "Defining target audiences", d: "Persona research takes days, not hours." },
    { icon: Mail, t: "Writing email campaigns", d: "Sequencing and copywriting eat your week." },
    { icon: Linkedin, t: "Producing LinkedIn content", d: "Consistent posting is hard to maintain." },
    { icon: Lightbulb, t: "Generating campaign ideas", d: "Ideation fatigue slows down launches." },
    { icon: Clock, t: "Time-to-launch is too slow", d: "Briefs sit waiting for revisions." },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Problem"
          title="Marketing Teams Waste Hours Creating Campaigns"
          desc="Modern marketers juggle five tools, three stakeholders, and an endless backlog. The result? Slow, inconsistent output."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const cards = [
    { icon: Users, t: "Buyer Persona", d: "Detailed customer profile with goals and pains." },
    { icon: Megaphone, t: "Campaign Headline", d: "Benefit-driven, on-brand, conversion-ready." },
    { icon: MousePointerClick, t: "CTA", d: "Click-optimized call-to-action copy." },
    { icon: Linkedin, t: "LinkedIn Post", d: "Native-format social content that performs." },
    { icon: Mail, t: "Email Copy", d: "Subject line + body, ready to send." },
    { icon: Lightbulb, t: "Recommendations", d: "Tactical next steps to launch faster." },
  ];
  return (
    <section className="bg-gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Solution"
          title="One AI Workflow. Complete Marketing Campaign."
          desc="Answer a few questions. Get every asset you need to launch — instantly."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-hero opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Answer a few questions", d: "Industry, audience, goal, channel and tone — that's it." },
    { n: "02", t: "AI analyzes your business", d: "Our model synthesizes persona, positioning and channel fit." },
    { n: "03", t: "Receive a complete campaign", d: "Personas, headlines, CTAs, posts and email — ready to use." },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="How It Works" title="Three steps. One campaign." desc="A streamlined workflow built for marketing teams that move fast." />
        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-elevated font-display text-xl font-bold text-gradient shadow-card ring-1 ring-border">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Sparkles, t: "AI Campaign Generator", available: true },
    { icon: Users, t: "Buyer Persona Generator" },
    { icon: Linkedin, t: "LinkedIn Post Generator" },
    { icon: Search, t: "SEO Brief Generator" },
    { icon: Mail, t: "Email Sequence Generator" },
    { icon: Calendar, t: "Content Calendar Generator" },
  ];
  return (
    <section id="features" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="AI Tools" title="A growing suite of marketing AI" desc="Start with our flagship campaign generator. More tools shipping every month." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, t, available }) => (
            <div key={t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-semibold">{t}</h3>
                  {available ? (
                    <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-semibold text-success">Available</span>
                  ) : (
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">Coming Soon</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Production-ready outputs designed for modern marketing teams.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExampleOutput() {
  const c = exampleCampaign;
  return (
    <section id="example" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Example Output" title="See what AI generates for you" desc="A real campaign produced by Marketing AI Lab in under 90 seconds." />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <OutputCard icon={<Users className="h-4 w-4" />} title="Buyer Persona">
            <div className="font-semibold">{c.persona.name}</div>
            <div className="text-sm text-muted-foreground">{c.persona.role}</div>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Goals</div>
                <ul className="mt-1 space-y-1">{c.persona.goals.map((g) => <li key={g} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />{g}</li>)}</ul>
              </div>
            </div>
          </OutputCard>
          <OutputCard icon={<Megaphone className="h-4 w-4" />} title="Headline">
            <div className="font-display text-2xl font-bold leading-tight">{c.headline}</div>
            <div className="mt-6 rounded-lg border border-border bg-surface p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">CTA</div>
              <div className="mt-2 font-semibold">{c.cta}</div>
            </div>
          </OutputCard>
          <OutputCard icon={<Linkedin className="h-4 w-4" />} title="LinkedIn Post">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{c.linkedinPost}</p>
          </OutputCard>
          <OutputCard icon={<Mail className="h-4 w-4" />} title="Email Copy">
            <div className="text-sm font-semibold">Subject: {c.email.subject}</div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{c.email.body}</p>
          </OutputCard>
        </div>
      </div>
    </section>
  );
}

function OutputCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-primary">{icon}</span>{title}
        </div>
        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">AI-generated</span>
      </div>
      <div className="pt-4">{children}</div>
    </div>
  );
}

function Testimonials() {
  const items = [
    { name: "Priya Sharma", role: "VP Marketing, Northwind", quote: "We cut campaign production from 3 weeks to one afternoon. The persona depth alone is worth it." },
    { name: "Marcus Chen", role: "Head of Growth, Stratus", quote: "It's the first AI tool my team actually keeps open. The outputs feel like a senior copywriter." },
    { name: "Elena Rossi", role: "CMO, Lumen Labs", quote: "We launched three campaigns in a single week. Pipeline impact was immediate and measurable." },
  ];
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Loved by marketers" title="Built for teams that ship" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero font-semibold text-primary-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-chart-4 text-chart-4" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 text-center shadow-elevated sm:p-16">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-5xl">
              Ready to Build Better Campaigns?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
              Join hundreds of marketing teams shipping campaigns faster with AI.
            </p>
            <div className="mt-8">
              <Button asChild size="xl" className="bg-surface-elevated text-foreground hover:bg-surface-elevated/90">
                <Link to="/generator">Generate My Campaign <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}
