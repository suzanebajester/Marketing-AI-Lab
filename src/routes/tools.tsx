import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Users, Linkedin, Search, Mail, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "AI Tools — Marketing AI Lab" },
      { name: "description", content: "A growing suite of AI tools for modern marketing teams." },
    ],
  }),
  component: Tools,
});

const tools = [
  { icon: Sparkles, t: "AI Campaign Generator", d: "Complete campaign in minutes: persona, headline, CTA, posts, email.", available: true, to: "/generator" },
  { icon: Users, t: "Buyer Persona Generator", d: "Detailed personas with goals, pains and channels." },
  { icon: Linkedin, t: "LinkedIn Post Generator", d: "Native-format posts tuned for organic reach." },
  { icon: Search, t: "SEO Brief Generator", d: "Structured briefs with intent, outline and keywords." },
  { icon: Mail, t: "Email Sequence Generator", d: "Multi-touch sequences with smart subject lines." },
  { icon: Calendar, t: "Content Calendar Generator", d: "Monthly calendars aligned to your goals." },
];

function Tools() {
  return (
    <div className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-primary" /> AI Tools
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">A growing suite of marketing AI</h1>
          <p className="mt-4 text-muted-foreground">Start with our flagship campaign generator. More tools shipping every month.</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ icon: Icon, t, d, available, to }) => (
            <div key={t} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                {available ? (
                  <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-semibold text-success">Available</span>
                ) : (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">Coming Soon</span>
                )}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
              {available && to ? (
                <Button asChild variant="soft" className="mt-5 w-fit">
                  <Link to={to}>Open tool <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              ) : (
                <Button variant="ghost" disabled className="mt-5 w-fit">Notify me</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
