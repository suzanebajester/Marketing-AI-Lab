import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Users, Network, PieChart, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SampleStrategy } from "@/lib/sampleStrategy";

type Props = { strategy: SampleStrategy };

export function StrategySlides({ strategy }: Props) {
  const slides = buildSlides(strategy);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(total - 1, i + 1));

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Mobile: stacked */}
      <div className="space-y-5 md:hidden">
        {slides.map((s, i) => (
          <SlideCard key={i} slide={s} counter={`${i + 1}/${total}`} />
        ))}
      </div>

      {/* Desktop: one-at-a-time with nav */}
      <div className="hidden md:block">
        <SlideCard slide={current} counter={`${index + 1}/${total}`} />
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={prev} disabled={index === 0}>
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {index + 1} / {total}
          </span>
          <Button variant="outline" onClick={next} disabled={index === total - 1}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

type Slide = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
};

function SlideCard({ slide, counter }: { slide: Slide; counter: string }) {
  const Icon = slide.icon;
  return (
    <Card className="border-border bg-card shadow-elevated">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="font-display text-xl sm:text-2xl">{slide.title}</CardTitle>
        </div>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
          {counter}
        </span>
      </CardHeader>
      <CardContent className="pt-2">{slide.content}</CardContent>
    </Card>
  );
}

function buildSlides(s: SampleStrategy): Slide[] {
  return [
    {
      title: "Executive Summary",
      icon: FileText,
      content: (
        <dl className="grid gap-3 sm:grid-cols-2">
          <Field label="Goal" value={s.executiveSummary.goal} />
          <Field label="Audience" value={s.executiveSummary.audience} />
          <Field label="Primary Channel" value={s.executiveSummary.primaryChannel} />
          <Field label="Budget" value={s.executiveSummary.budget} />
          <Field label="Forecast" value={s.executiveSummary.forecast} />
        </dl>
      ),
    },
    {
      title: "Buyer Persona",
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="text-base font-semibold text-foreground">{s.persona.title}</div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Goals</div>
            <ul className="mt-2 space-y-1 text-sm text-foreground">
              {s.persona.goals.map((g) => <li key={g}>• {g}</li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Challenges</div>
            <ul className="mt-2 space-y-1 text-sm text-foreground">
              {s.persona.challenges.map((c) => <li key={c}>• {c}</li>)}
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Channel Strategy",
      icon: Network,
      content: (
        <ul className="space-y-2.5">
          {s.channelStrategy.map((c) => (
            <li key={c.name} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
              <span className="text-sm font-medium">{c.name}</span>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                {c.type}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Budget Allocation",
      icon: PieChart,
      content: (
        <div className="space-y-4">
          {s.budgetAllocation.map(({ channel, pct }) => (
            <div key={channel}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">{channel}</span>
                <span className="text-muted-foreground">{pct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-hero" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Forecast Summary",
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{s.campaignForecastSummary}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {s.channelForecast.map((f) => (
              <div key={f.channel} className="rounded-lg border border-border bg-surface p-4">
                <div className="text-sm font-semibold">{f.channel}</div>
                <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div><dt className="text-muted-foreground">Reach</dt><dd className="font-medium">{f.reach}</dd></div>
                  <div><dt className="text-muted-foreground">Clicks</dt><dd className="font-medium">{f.clicks}</dd></div>
                  <div><dt className="text-muted-foreground">Leads</dt><dd className="font-medium">{f.leads}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Creative Direction",
      icon: Lightbulb,
      content: (
        <ul className="space-y-2">
          {s.creativeDirection.map((c) => (
            <li key={c} className="rounded-lg border border-border bg-surface px-4 py-3 text-sm">
              {c}
            </li>
          ))}
        </ul>
      ),
    },
  ];
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
