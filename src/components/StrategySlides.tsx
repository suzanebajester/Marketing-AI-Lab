import { useState } from "react";
import { 
  ChevronLeft, ChevronRight, Target, Users, Network, PieChart, 
  TrendingUp, Globe, AlertCircle, Calendar, CheckCircle, Shield, 
  BarChart3, Printer
} from "lucide-react";
import type { SampleStrategy } from "@/lib/sampleStrategy";
import { Button } from "@/components/ui/button";

type Props = { strategy: SampleStrategy };

export function StrategySlides({ strategy }: Props) {
  const slides = buildSlides(strategy);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(total - 1, i + 1));

  return (
    <div className="mx-auto w-full max-w-5xl font-sans">
      {/* Print PDF Button - floats at the top-right in desktop */}
      <div className="no-print mb-6 flex justify-end gap-2">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Printer className="h-4 w-4 text-indigo-600" /> Print / Export Presentation (PDF)
        </button>
      </div>

      {/* Mobile view: Stacked slide cards */}
      <div className="space-y-6 md:hidden no-print">
        {slides.map((slide, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {slide.kicker}
              </span>
              <span className="text-xs font-semibold text-slate-400">{i + 1} / {total}</span>
            </div>
            <div className="py-2">
              {slide.body}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view: 16:9 interactive PowerPoint-style deck */}
      <div className="hidden md:block no-print">
        <div 
          className="relative w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl overflow-hidden flex flex-col justify-between"
          style={{ aspectRatio: "16 / 9" }}
        >
          {/* Subtle gradient shape background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-50/40 to-slate-50/10 rounded-full blur-3xl -z-10" />

          {/* Slide Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {current.kicker}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-400">{index + 1} / {total}</span>
          </div>

          {/* Slide Body */}
          <div className="flex-1 py-4 flex flex-col justify-center overflow-auto">
            {current.body}
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[9px] uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-500">
              <Shield className="h-3.5 w-3.5 text-indigo-500" /> Marketing AI Lab · Stakeholder Strategic Deck
            </span>
            <span className="font-semibold text-slate-400">Confidential</span>
          </div>
        </div>

        {/* Presentation controls */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={prev} disabled={index === 0} className="shadow-sm">
            <ChevronLeft className="h-4 w-4 mr-1.5" /> Previous
          </Button>
          
          {/* Slide indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-indigo-600" : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>

          <Button variant="outline" onClick={next} disabled={index === total - 1} className="shadow-sm">
            Next <ChevronRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Print view: list all slides vertically, hide controls */}
      <div className="hidden print:block space-y-12">
        {slides.map((slide, i) => (
          <section key={i} className="slide-page w-full aspect-[16/9] border-b border-slate-200 py-12 flex flex-col justify-between" style={{ pageBreakAfter: "always", breakAfter: "page" }}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {slide.kicker}
              </span>
              <span className="text-xs font-semibold text-slate-400">{i + 1} / {total}</span>
            </div>
            <div className="flex-1 py-4 flex flex-col justify-center">
              {slide.body}
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[9px] uppercase tracking-wider text-slate-400 mt-6">
              <span className="flex items-center gap-1.5 font-semibold text-slate-500">
                <Shield className="h-3.5 w-3.5 text-indigo-500" /> Marketing AI Lab · Strategic Deck
              </span>
              <span className="font-semibold text-slate-400">Printed Strategy Report</span>
            </div>
          </section>
        ))}
      </div>

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { background: white !important; }
          
          /* Hide all other sections on the page */
          body > div > div > *:not(#strategy-slides) {
            display: none !important;
          }
          section:not(#strategy-slides) {
            display: none !important;
          }
          
          /* Reset container padding/margin for print */
          #strategy-slides {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            max-w: none !important;
            width: 100% !important;
          }
          #strategy-slides > div {
            max-w: none !important;
            padding: 0 !important;
          }
          
          /* Hide section title and description */
          #strategy-slides > div > div:first-child {
            display: none !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .slide-page {
            page-break-after: always !important;
            break-after: page !important;
            width: 100% !important;
            max-w: none !important;
            margin: 0 !important;
            padding: 3rem !important;
            box-sizing: border-box !important;
            height: 100vh !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Slide builders ---------- */

function buildSlides(s: SampleStrategy) {
  const slides = [];

  // Slide 1: Executive Summary
  slides.push({
    kicker: "01 · Executive Summary",
    body: <ExecutiveSummarySlide s={s} />,
  });

  // Slide 2: Website Insights (only if available)
  if (s.websiteInsights) {
    slides.push({
      kicker: "02 · Website Insights",
      body: <WebsiteInsightsSlide s={s} />,
    });
  }

  // Slide 3: Buyer Persona
  slides.push({
    kicker: `0${slides.length + 1} · Buyer Persona`,
    body: <PersonaSlide s={s} />,
  });

  // Slide 4: Channel Strategy
  slides.push({
    kicker: `0${slides.length + 1} · Channel Strategy`,
    body: <ChannelSlide s={s} />,
  });

  // Slide 5: Budget Allocation
  slides.push({
    kicker: `0${slides.length + 1} · Budget Allocation`,
    body: <BudgetSlide s={s} />,
  });

  // Slide 6: Performance Forecast
  slides.push({
    kicker: `0${slides.length + 1} · Forecast & Analytics`,
    body: <ForecastSlide s={s} />,
  });

  // Slide 7: Priorities
  if (s.recommendedPriorities) {
    slides.push({
      kicker: `0${slides.length + 1} · Recommended Priorities`,
      body: <PrioritiesSlide s={s} />,
    });
  }

  // Slide 8: Next Steps
  if (s.nextSteps) {
    slides.push({
      kicker: `0${slides.length + 1} · Implementation Timeline`,
      body: <NextStepsSlide s={s} />,
    });
  }

  return slides;
}

function SlideTitle({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, description }: { label: string; value: string; description?: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm flex flex-col justify-between h-full hover:border-slate-200 transition-colors">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 font-display text-base font-bold text-slate-800 leading-snug line-clamp-2">{value}</div>
      {description && <div className="text-[10px] text-slate-500 mt-1">{description}</div>}
    </div>
  );
}

/* 1. Executive Summary Slide */
function ExecutiveSummarySlide({ s }: { s: SampleStrategy }) {
  const items = [
    { label: "Campaign Goal", value: s.executiveSummary.goal },
    { label: "Target Audience", value: s.executiveSummary.audience },
    { label: "Product / Service", value: s.executiveSummary.productService || "General Offering" },
    { label: "Primary Channel", value: s.executiveSummary.primaryChannel },
    { label: "Monthly Budget", value: s.executiveSummary.budget },
    { label: "Campaign Timeframe", value: s.executiveSummary.campaignTimeframe || "8 weeks" },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={Target} title="Executive Summary" subtitle="High-level operational summary of the recommended marketing framework." />
      
      {/* McKinsey Headline Statement */}
      <div className="my-2 p-3 bg-gradient-to-r from-indigo-50/70 to-slate-50 rounded-xl border border-indigo-100/40">
        <div className="text-[9px] font-bold uppercase tracking-wider text-indigo-500">Core Campaign Message</div>
        <p className="text-sm font-semibold text-slate-800 italic text-slate-800">"{s.headline}"</p>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <KpiCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <div className="mt-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white">
          CTA Hook: <span className="text-indigo-300 font-bold">{s.cta}</span>
        </span>
      </div>
    </div>
  );
}

/* 2. Website Insights Slide */
function WebsiteInsightsSlide({ s }: { s: SampleStrategy }) {
  const web = s.websiteInsights;
  if (!web) return null;

  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={Globe} title="Website Insights" subtitle="Deep-dive analysis of current digital real-estate and messaging." />

      <div className="grid gap-4 md:grid-cols-5 my-2">
        <div className="md:col-span-3 space-y-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Detected Offering</div>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">{web.detectedOffer}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-indigo-50/30 p-4 border-l-4 border-l-indigo-600">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1">Recommended Messaging Angle</div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{web.messagingAngle}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 h-full">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Differentiators</div>
            <ul className="space-y-1.5 text-xs">
              {web.keyDifferentiators.map((diff, i) => (
                <li key={i} className="flex gap-2 items-start text-slate-700 font-medium">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {web.promotionalHooks && web.promotionalHooks.length > 0 ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-2">
          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Identified Conversion Hooks</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {web.promotionalHooks.map((hook, i) => (
              <span key={i} className="text-xs bg-white px-2.5 py-1 rounded-md border border-slate-200 font-semibold text-slate-700">
                {hook}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-2" />
      )}
    </div>
  );
}

/* 3. Buyer Persona Slide */
function PersonaSlide({ s }: { s: SampleStrategy }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={Users} title="Buyer Persona Profile" subtitle="Strategic outline of target audience behavior and decision criteria." />

      <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white uppercase shadow-sm">
            {s.persona.title.slice(0, 2)}
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Segment Profile</div>
            <div className="font-display text-base font-bold text-slate-800 leading-tight">
              {s.persona.title} {s.persona.jobTitle ? `(${s.persona.jobTitle})` : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 my-2">
        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-2 border-b border-emerald-55 pb-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Core Objectives
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {s.persona.goals.map((goal, i) => (
              <li key={i} className="flex gap-1.5 items-start">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-2 border-b border-rose-55 pb-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Primary Friction Points
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {s.persona.challenges.map((pain, i) => (
              <li key={i} className="flex gap-1.5 items-start">
                <span className="text-rose-500 font-bold">•</span>
                <span>{pain}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-2 border-b border-indigo-55 pb-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Key Buying Factors
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {(s.persona.keyBuyingFactors || ["Custo-benefício", "Facilidade de uso", "Suporte técnico"]).map((factor, i) => (
              <li key={i} className="flex gap-1.5 items-start">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {s.persona.decisionInfluence ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-2 flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Decision Influence:</span>
          <span className="text-xs text-slate-700 font-semibold">{s.persona.decisionInfluence}</span>
        </div>
      ) : (
        <div className="h-2" />
      )}
    </div>
  );
}

/* 4. Channel Strategy Slide */
function ChannelSlide({ s }: { s: SampleStrategy }) {
  const paid = s.channelStrategy.filter(c => c.type === "Paid");
  const owned = s.channelStrategy.filter(c => c.type === "Owned");
  const organic = s.channelStrategy.filter(c => c.type === "Organic");

  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={Network} title="Omnichannel Strategy Map" subtitle="Distribution of audience touchpoints across paid, owned, and organic segments." />

      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 my-2">
        {/* Paid media */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold uppercase text-slate-700">Paid Media</span>
          </div>
          <div className="space-y-2">
            {paid.map((ch, i) => (
              <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-800">{ch.name}</div>
                {ch.role && <div className="text-[9px] text-slate-500 mt-0.5"><span className="font-semibold">Role:</span> {ch.role}</div>}
              </div>
            ))}
            {paid.length === 0 && <div className="text-xs text-slate-400 italic">No paid channels allocated</div>}
          </div>
        </div>

        {/* Owned channels */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase text-slate-700">Owned Properties</span>
          </div>
          <div className="space-y-2">
            {owned.map((ch, i) => (
              <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-800">{ch.name}</div>
                {ch.role && <div className="text-[9px] text-slate-500 mt-0.5"><span className="font-semibold">Role:</span> {ch.role}</div>}
              </div>
            ))}
            {owned.length === 0 && <div className="text-xs text-slate-400 italic">No owned channels allocated</div>}
          </div>
        </div>

        {/* Organic channels */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span className="text-xs font-bold uppercase text-slate-700">Organic Growth</span>
          </div>
          <div className="space-y-2">
            {organic.map((ch, i) => (
              <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                <div className="text-xs font-bold text-slate-800">{ch.name}</div>
                {ch.role && <div className="text-[9px] text-slate-500 mt-0.5"><span className="font-semibold">Role:</span> {ch.role}</div>}
              </div>
            ))}
            {organic.length === 0 && <div className="text-xs text-slate-400 italic">No organic channels allocated</div>}
          </div>
        </div>
      </div>

      {/* Primary Channel Callout */}
      <div className="rounded-xl bg-slate-900 text-white p-3 flex items-center justify-between text-xs">
        <div className="flex gap-4">
          <div>
            <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Primary Channel</span>
            <span className="font-bold text-indigo-400">{s.executiveSummary.primaryChannel}</span>
          </div>
          {s.channelStrategy[1] && (
            <div>
              <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Secondary</span>
              <span className="font-bold text-slate-200">{s.channelStrategy[1].name}</span>
            </div>
          )}
        </div>
        <div className="text-[10px] text-slate-400 italic">
          Aligned to audience intent & campaign objectives.
        </div>
      </div>
    </div>
  );
}

/* 5. Budget Allocation Slide */
function BudgetSlide({ s }: { s: SampleStrategy }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={PieChart} title="Strategic Budget Allocation" subtitle="Financial distribution across paid channels aligned to performance priorities." />

      <div className="space-y-3.5 rounded-xl border border-slate-100 bg-slate-50/30 p-4 my-2">
        {s.budgetAllocation.map(({ channel, pct, estimatedBudget, purpose }) => (
          <div key={channel} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <div className="mb-1 flex items-baseline justify-between">
              <div className="flex gap-2 items-center">
                <span className="font-display text-xs font-bold text-slate-800">{channel}</span>
                {estimatedBudget && (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {estimatedBudget}
                  </span>
                )}
              </div>
              <span className="font-display text-xs font-bold text-indigo-600">{pct}%</span>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 relative">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400" style={{ width: `${pct}%` }} />
            </div>

            {purpose && (
              <p className="text-[9px] text-slate-500 mt-1">
                <span className="font-semibold text-slate-700">Purpose:</span> {purpose}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-slate-900 text-white p-2.5 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400 block text-[8px] uppercase font-bold tracking-wider">Estimated Budget</span>
          <span className="font-bold text-base text-emerald-400">{s.executiveSummary.budget}</span>
        </div>
        <div className="text-[9px] text-slate-400 italic max-w-sm text-right leading-tight">
          Budget allocated strictly to high-performing paid digital media. Direct acquisition targets apply.
        </div>
      </div>
    </div>
  );
}

/* 6. Performance Forecast Slide */
function ForecastSlide({ s }: { s: SampleStrategy }) {
  const hasDetailedForecast = s.channelForecast && s.channelForecast.length > 0;
  
  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={TrendingUp} title="Performance Forecast" subtitle="Estimated directional metrics based on recommended budget allocation." />

      <div className="my-1.5">
        {hasDetailedForecast ? (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            {s.channelForecast.slice(0, 3).map((f) => {
              const metrics = f.metrics || {
                "Reach": f.reach || "N/A",
                "Clicks": f.clicks || "N/A",
                "Leads": f.leads || "N/A"
              };
              return (
                <div key={f.channel} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[11px] font-bold text-slate-800 border-b border-slate-50 pb-1 mb-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    {f.channel}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(metrics).map(([label, val]) => (
                      <div key={label} className="bg-slate-50 p-1.5 rounded-lg text-center border border-slate-100/50">
                        <div className="text-[12px] font-bold text-slate-800">{val}</div>
                        <div className="text-[8px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm text-center">
            <BarChart3 className="h-8 w-8 text-slate-300 mx-auto mb-1.5" />
            <p className="text-xs text-slate-600 font-medium">{s.campaignForecastSummary}</p>
          </div>
        )}
      </div>

      {/* Forecast Summary Card */}
      {s.forecastSummary ? (
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 bg-slate-900 text-white rounded-xl p-2.5">
          <div className="px-1.5">
            <span className="text-slate-400 block text-[7px] uppercase font-bold tracking-wider">Monthly Output</span>
            <span className="font-bold text-[11px] text-indigo-400">{s.forecastSummary.monthlyResults}</span>
          </div>
          <div className="px-1.5 border-l border-slate-800">
            <span className="text-slate-400 block text-[7px] uppercase font-bold tracking-wider">Total Campaign</span>
            <span className="font-bold text-[11px] text-indigo-400">{s.forecastSummary.totalCampaignResults}</span>
          </div>
          <div className="px-1.5 border-l border-slate-800">
            <span className="text-slate-400 block text-[7px] uppercase font-bold tracking-wider">Efficiency</span>
            <span className="font-bold text-[11px] text-indigo-400">{s.forecastSummary.averagePrimaryMetric}</span>
          </div>
          <div className="px-1.5 border-l border-slate-800">
            <span className="text-slate-400 block text-[7px] uppercase font-bold tracking-wider">Success Metric</span>
            <span className="font-bold text-[11px] text-emerald-400">{s.forecastSummary.mainSuccessMetric}</span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-900 text-white p-2.5 text-xs flex justify-between items-center">
          <div>
            <span className="text-slate-400 block text-[7px] uppercase font-bold tracking-wider">Forecast Overview</span>
            <span className="font-bold text-indigo-400 text-xs">{s.campaignForecastSummary}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* 7. Priorities Slide */
function PrioritiesSlide({ s }: { s: SampleStrategy }) {
  const prio = s.recommendedPriorities;
  if (!prio) return null;

  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={AlertCircle} title="Recommended Priorities" subtitle="Prioritized tactical checklist grouped by operational impact." />

      <div className="grid gap-3 grid-cols-1 md:grid-cols-3 my-2">
        {/* High Priority */}
        <div className="rounded-xl border border-rose-100 bg-rose-50/10 p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-xl -z-10" />
          <div className="flex items-center justify-between mb-2 border-b border-rose-100/50 pb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Operational Focus</span>
            <span className="rounded bg-rose-100 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-rose-700">High</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {prio.high.map((item, i) => (
              <li key={i} className="flex gap-1.5 items-start font-medium leading-normal">
                <span className="text-rose-500 font-bold shrink-0">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Medium Priority */}
        <div className="rounded-xl border border-amber-100 bg-amber-50/10 p-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl -z-10" />
          <div className="flex items-center justify-between mb-2 border-b border-amber-100/50 pb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Secondary Actions</span>
            <span className="rounded bg-amber-100 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-700">Medium</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {prio.medium.map((item, i) => (
              <li key={i} className="flex gap-1.5 items-start font-medium leading-normal">
                <span className="text-amber-500 font-bold shrink-0">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Low Priority */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/30 p-3 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2 border-b border-slate-200/50 pb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Later Optimizations</span>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-slate-600">Low</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {prio.low.map((item, i) => (
              <li key={i} className="flex gap-1.5 items-start font-medium leading-normal">
                <span className="text-slate-400 font-bold shrink-0">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-[9px] text-slate-400 italic text-center">
        Priorities grouped to optimize operational workload and resource allocation in the initial phase.
      </div>
    </div>
  );
}

/* 8. Next Steps Timeline Slide */
function NextStepsSlide({ s }: { s: SampleStrategy }) {
  const next = s.nextSteps;
  if (!next) return null;

  const steps = [
    { week: "Week 1", desc: next.week1 },
    { week: "Week 2", desc: next.week2 },
    { week: "Week 3", desc: next.week3 },
    { week: "Week 4", desc: next.week4 },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <SlideTitle icon={Calendar} title="4-Week Implementation Plan" subtitle="Structured timeline detailing execution sequences for campaign rollout." />

      {/* Horizontal Timeline */}
      <div className="relative my-2">
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 hidden md:block -z-10" />

        <div className="grid gap-3 grid-cols-1 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm relative hover:border-indigo-100 transition-colors">
              <div className="flex items-center gap-1.5 mb-1 md:flex-col md:items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs ring-4 ring-white shadow-sm">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 md:mt-1">{step.week}</span>
              </div>
              <p className="text-[10.5px] text-slate-600 leading-normal font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[9px] text-slate-400 italic text-center">
        Action plan focuses on setup, testing, measurement, and optimization stages respectively.
      </div>
    </div>
  );
}
