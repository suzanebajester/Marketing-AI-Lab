import { useState } from "react";
import {
  ChevronLeft, ChevronRight, FileText, Users, Network, PieChart,
  TrendingUp, Globe, ListChecks, CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SampleStrategy, Priority } from "@/lib/sampleStrategy";

type Props = { strategy: SampleStrategy };

export function StrategySlides({ strategy }: Props) {
  const slides = buildSlides(strategy);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(total - 1, i + 1));

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Mobile: stacked */}
      <div className="space-y-5 md:hidden">
        {slides.map((s, i) => (
          <SlideCard key={i} slide={s} counter={`${i + 1} / ${total}`} />
        ))}
      </div>

      {/* Desktop: 16:9 one-at-a-time */}
      <div className="hidden md:block">
        <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
          <div className="absolute inset-0">
            <SlideCard slide={current} counter={`${index + 1} / ${total}`} fill />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={prev} disabled={index === 0}>
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
          <Button variant="outline" onClick={next} disabled={index === total - 1}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

type Slide = {
  kicker: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
};

function SlideCard({ slide, counter, fill = false }: { slide: Slide; counter: string; fill?: boolean }) {
  const Icon = slide.icon;
  return (
    <Card className={`border-border bg-card shadow-elevated overflow-hidden ${fill ? "h-full flex flex-col" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border bg-gradient-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {slide.kicker}
            </div>
            <CardTitle className="font-display text-xl sm:text-2xl">{slide.title}</CardTitle>
          </div>
        </div>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
          {counter}
        </span>
      </CardHeader>
      <CardContent className={`pt-6 ${fill ? "flex-1 overflow-auto" : ""}`}>
        {slide.content}
      </CardContent>
    </Card>
  );
}

function buildSlides(s: SampleStrategy): Slide[] {
  const slides: Slide[] = [];

  // 1. Executive Summary — KPI cards
  slides.push({
    kicker: "Slide 01",
    title: "Executive Summary",
    icon: FileText,
    content: (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Kpi label="Goal" value={s.executiveSummary.goal} />
        <Kpi label="Primary Audience" value={s.executiveSummary.audience} />
        <Kpi label="Primary Channel" value={s.executiveSummary.primaryChannel} />
        <Kpi label="Budget Range" value={s.executiveSummary.budget} highlight />
        <Kpi label="Forecast" value={s.executiveSummary.forecast} highlight />
        <Kpi label="Headline" value={s.headline} />
      </div>
    ),
  });

  // 2. Website Insights (conditional)
  if (s.websiteInsights) {
    const w = s.websiteInsights;
    slides.push({
      kicker: `Slide 0${slides.length + 1}`,
      title: "Website Insights",
      icon: Globe,
      content: (
        <div className="space-y-5">
          <Kpi label="Positioning" value={w.positioning} />
          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="Strengths" items={w.strengths} tone="positive" />
            <Panel title="Opportunities" items={w.opportunities} tone="warn" />
          </div>
        </div>
      ),
    });
  }

  // 3. Buyer Persona
  slides.push({
    kicker: `Slide 0${slides.length + 1}`,
    title: "Buyer Persona",
    icon: Users,
    content: (
      <div className="space-y-5">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-glow">
            {initials(s.persona.title)}
          </div>
          <div className="text-lg font-semibold">{s.persona.title}</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Goals" items={s.persona.goals} tone="positive" />
          <Panel title="Challenges" items={s.persona.challenges} tone="warn" />
        </div>
      </div>
    ),
  });

  // 4. Channel Strategy
  slides.push({
    kicker: `Slide 0${slides.length + 1}`,
    title: "Channel Strategy",
    icon: Network,
    content: (
      <div className="grid gap-3 sm:grid-cols-2">
        {s.channelStrategy.map((c) => (
          <div key={c.name} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
            <span className="text-sm font-medium">{c.name}</span>
            <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">{c.type}</Badge>
          </div>
        ))}
      </div>
    ),
  });

  // 5. Budget Allocation — horizontal bars
  slides.push({
    kicker: `Slide 0${slides.length + 1}`,
    title: "Budget Allocation",
    icon: PieChart,
    content: (
      <div className="space-y-5">
        {s.budgetAllocation.map(({ channel, pct }) => (
          <div key={channel}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-sm font-semibold">{channel}</span>
              <span className="font-display text-lg font-bold text-gradient">{pct}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-hero transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  });

  // 6. Forecast — big visual cards
  slides.push({
    kicker: `Slide 0${slides.length + 1}`,
    title: "Performance Forecast",
    icon: TrendingUp,
    content: (
      <div className="space-y-5">
        <p className="text-sm text-muted-foreground">{s.campaignForecastSummary}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flattenForecast(s).map((m) => (
            <div key={m.label} className="rounded-2xl border border-border bg-gradient-soft p-5 text-center shadow-card">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{m.label}</div>
              <div className="mt-2 font-display text-2xl font-bold text-gradient">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  // 7. Recommended Priorities — badges
  const priorities = s.priorities ?? [];
  slides.push({
    kicker: `Slide 0${slides.length + 1}`,
    title: "Recommended Priorities",
    icon: ListChecks,
    content: (
      <ul className="space-y-3">
        {priorities.map((p) => (
          <li key={p.title} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
            <PriorityBadge level={p.level} />
            <div>
              <div className="text-sm font-semibold">{p.title}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{p.rationale}</div>
            </div>
          </li>
        ))}
      </ul>
    ),
  });

  // 8. Next Steps — 4-week timeline
  const steps = s.nextSteps ?? [];
  slides.push({
    kicker: `Slide 0${slides.length + 1}`,
    title: "Next Steps — 4-Week Plan",
    icon: CalendarClock,
    content: (
      <ol className="relative space-y-5 border-l border-border pl-6">
        {steps.map((step, i) => (
          <li key={step.week} className="relative">
            <span className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full bg-gradient-hero text-[11px] font-bold text-primary-foreground shadow-glow">
              {i + 1}
            </span>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{step.title}</div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{step.week}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    ),
  });

  return slides;
}

/* ───── helpers ───── */

function Kpi({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-primary/30 bg-gradient-soft shadow-card" : "border-border bg-surface"}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className={`mt-1.5 text-sm font-semibold ${highlight ? "text-gradient font-display text-base" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

function Panel({ title, items, tone }: { title: string; items: string[]; tone: "positive" | "warn" }) {
  const dot = tone === "positive" ? "bg-emerald-500" : "bg-amber-500";
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dot}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriorityBadge({ level }: { level: Priority }) {
  const styles: Record<Priority, string> = {
    High: "bg-red-500/10 text-red-600 border-red-500/20",
    Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };
  return (
    <span className={`inline-flex h-6 flex-shrink-0 items-center rounded-full border px-2.5 text-[10px] font-bold uppercase tracking-wider ${styles[level]}`}>
      {level}
    </span>
  );
}

function flattenForecast(s: SampleStrategy) {
  const totals: { label: string; value: string }[] = [];
  s.channelForecast.forEach((f) => {
    totals.push({ label: `${f.channel} · Reach`, value: f.reach });
    totals.push({ label: `${f.channel} · Clicks`, value: f.clicks });
    totals.push({ label: `${f.channel} · Leads`, value: f.leads });
  });
  return totals;
}

function initials(name: string) {
  return name.split(/\s+/).map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
