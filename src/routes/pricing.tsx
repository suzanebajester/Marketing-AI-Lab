import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Marketing AI Lab" },
      { name: "description", content: "Simple, transparent pricing. Start free, upgrade when you're ready." },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Starter", price: "Free", period: "forever",
    desc: "Try Marketing AI Lab risk-free.",
    features: ["3 campaigns per month", "Core AI generator", "Community support"],
    cta: "Start free", variant: "outline" as const,
  },
  {
    name: "Pro", price: "$19", period: "per month",
    desc: "For solo marketers and consultants.",
    features: ["Unlimited campaigns", "Export to PDF", "Save campaign history", "Priority email support"],
    cta: "Start 14-day free trial", variant: "hero" as const, highlighted: true,
  },
  {
    name: "Agency", price: "$49", period: "per month",
    desc: "For agencies and in-house teams.",
    features: ["Unlimited campaigns", "Team access (5 seats)", "Advanced AI tools", "Brand voice training", "Dedicated support"],
    cta: "Talk to sales", variant: "outline" as const,
  },
];

function Pricing() {
  return (
    <div className="bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-primary" /> Pricing
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Simple pricing that scales with you
          </h1>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade only when you need more.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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
              <div className="mt-6 flex items-baseline gap-1.5">
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

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Need something custom? <a href="#" className="font-semibold text-primary hover:underline">Contact sales</a>
        </p>
      </div>
    </div>
  );
}
