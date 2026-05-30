import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Target, Zap, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Marketing AI Lab" },
      { name: "description", content: "We're building the AI-powered marketing platform we always wanted." },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    { icon: Target, t: "Marketer-first", d: "Built with input from 100+ in-house teams and agencies." },
    { icon: Zap, t: "Shipping speed", d: "We release new AI tools and improvements every week." },
    { icon: Heart, t: "Quality outputs", d: "Every result is tuned to read like a senior copywriter wrote it." },
  ];
  return (
    <div>
      <section className="bg-gradient-soft py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-primary" /> About
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            We're building the AI marketing platform we always wanted
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Marketing AI Lab was started by a small team of marketers and engineers tired of writing
            the same briefs over and over. We believe AI should do the heavy lifting so humans can
            focus on the creative big picture.
          </p>
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
