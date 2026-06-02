import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles, ArrowRight, Users, Megaphone, MousePointerClick, Linkedin, Mail, Lightbulb, Github,
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
      <WhatYouGet />
      <GeneratorSection />
      <AboutSection />
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
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Generate a Complete Marketing Campaign{" "}
            <span className="text-gradient">Strategy in Minutes</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Answer a few questions and receive a buyer persona, campaign messaging, email copy, social media content and creative recommendations powered by AI.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" onClick={scrollToGenerator}>
              Generate My Campaign <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── What You Get ───────────── */
function WhatYouGet() {
  const cards = [
    { icon: Users, title: "Buyer Persona", desc: "Understand who you're targeting and what motivates them." },
    { icon: Megaphone, title: "Campaign Messaging", desc: "Define a clear and compelling campaign direction." },
    { icon: MousePointerClick, title: "Primary CTA", desc: "Encourage action with a strong call-to-action." },
    { icon: Linkedin, title: "Social Media Post", desc: "Ready-to-use content designed for engagement." },
    { icon: Mail, title: "Email Copy", desc: "Professional email content tailored to your audience." },
    { icon: Lightbulb, title: "Creative Suggestions", desc: "Visual concepts and creative direction to support execution." },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          <p className="mt-3 text-muted-foreground">One brief. A complete AI-generated marketing campaign.</p>
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
            Answer a few questions in the chat below.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <TypebotEmbed />
        </div>
      </div>
    </section>
  );
}
