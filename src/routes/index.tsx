import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles, ArrowRight, Users, Megaphone, MousePointerClick, Linkedin, Mail, Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypebotEmbed } from "@/components/TypebotEmbed";

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

function scrollToGenerator() {
  document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Landing() {
  return (
    <div>
      <Hero />
      <WhatYouGet />
      <GeneratorSection />
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
            <Button variant="hero" size="xl" onClick={scrollToGenerator}>
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

/* ───────────── Generator (Typebot) ───────────── */
function GeneratorSection() {
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
          <p className="mt-3 text-muted-foreground">
            Answer a few questions in the chat below. Free during beta — no credit card required.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <TypebotEmbed />
        </div>
      </div>
    </section>
  );
}
