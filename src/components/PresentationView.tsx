import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Printer, Target, Users, Network, PieChart, TrendingUp, Lightbulb } from "lucide-react";
import type { SampleStrategy } from "@/lib/sampleStrategy";

type Props = {
  strategy: SampleStrategy;
  open: boolean;
  onClose: () => void;
};

export function PresentationView({ strategy, open, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const slides = buildSlides(strategy);
  const total = slides.length;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, total - 1));
      else if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
      else if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, total, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setIndex(0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="presentation-root fixed inset-0 z-[100] bg-white text-slate-900 overflow-auto">
      {/* Top bar — hidden in print */}
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Strategy Presentation
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Printer className="h-3.5 w-3.5" /> Export as PDF
          </button>
          <button
            onClick={onClose}
            aria-label="Close presentation"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-1.5 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slides — on screen show one at a time; in print show all */}
      <div className="presentation-slides">
        {slides.map((slide, i) => (
          <section
            key={i}
            className={`slide-page ${i === index ? "slide-active" : "slide-hidden"}`}
            aria-hidden={i !== index}
          >
            <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col px-6 py-12 sm:px-10 sm:py-16">
              <div className="mb-8 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span>{slide.kicker}</span>
                <span className="no-print">{i + 1} / {total}</span>
              </div>
              <div className="flex-1">{slide.body}</div>
              <div className="mt-10 border-t border-slate-100 pt-4 text-[11px] uppercase tracking-wider text-slate-400">
                Marketing AI Lab · AI-Generated Strategy
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom navigation */}
      <div className="no-print fixed inset-x-0 bottom-0 z-10 flex items-center justify-center gap-3 border-t border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <span className="min-w-[60px] text-center text-xs font-semibold text-slate-500">
          {index + 1} / {total}
        </span>
        <button
          onClick={() => setIndex((i) => Math.min(i + 1, total - 1))}
          disabled={index === total - 1}
          className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 disabled:opacity-40"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <style>{`
        .slide-hidden { display: none; }
        .slide-active { display: block; }
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .presentation-root { position: static !important; overflow: visible !important; }
          .slide-hidden, .slide-active { display: block !important; }
          .slide-page { page-break-after: always; break-after: page; }
          .slide-page:last-child { page-break-after: auto; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Slide builders ---------- */

function buildSlides(s: SampleStrategy) {
  return [
    {
      kicker: "01 · Executive Summary",
      body: <ExecutiveSummarySlide s={s} />,
    },
    {
      kicker: "02 · Buyer Persona",
      body: <PersonaSlide s={s} />,
    },
    {
      kicker: "03 · Channel Strategy",
      body: <ChannelSlide s={s} />,
    },
    {
      kicker: "04 · Budget Allocation",
      body: <BudgetSlide s={s} />,
    },
    {
      kicker: "05 · Performance Forecast",
      body: <ForecastSlide s={s} />,
    },
    {
      kicker: "06 · Creative Direction",
      body: <CreativeSlide s={s} />,
    },
  ];
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-slate-500">{subtitle}</p>}
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-2 font-display text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function ExecutiveSummarySlide({ s }: { s: SampleStrategy }) {
  const items = [
    { label: "Campaign Goal", value: s.executiveSummary.goal },
    { label: "Target Audience", value: s.executiveSummary.audience },
    { label: "Location", value: "Global / North America" },
    { label: "Budget", value: s.executiveSummary.budget },
    { label: "Timeframe", value: "8 weeks" },
    { label: "Primary Channel", value: s.executiveSummary.primaryChannel },
  ];
  return (
    <div>
      <SectionTitle icon={Target} title="Executive Summary" subtitle="Stakeholder-ready snapshot of the campaign." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => <KpiCard key={i.label} {...i} />)}
      </div>
    </div>
  );
}

function PersonaSlide({ s }: { s: SampleStrategy }) {
  return (
    <div>
      <SectionTitle icon={Users} title="Buyer Persona" subtitle="Who we're talking to and what matters to them." />
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm sm:p-10">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 font-display text-xl font-bold text-white">
            {initials(s.persona.title)}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Persona</div>
            <div className="font-display text-2xl font-bold">{s.persona.title}</div>
            <div className="text-sm text-slate-500">{s.executiveSummary.audience}</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <PersonaList title="Goals" items={s.persona.goals} />
          <PersonaList title="Challenges" items={s.persona.challenges} />
          <PersonaList title="Buying Factors" items={["Compliance proof", "ROI clarity", "Vendor reputation"]} />
        </div>
      </div>
    </div>
  );
}

function PersonaList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((i) => <li key={i} className="flex gap-2"><span className="text-slate-400">•</span>{i}</li>)}
      </ul>
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function ChannelSlide({ s }: { s: SampleStrategy }) {
  const primary = s.channelStrategy.find((c) => c.type === "Paid") ?? s.channelStrategy[0];
  const secondary = s.channelStrategy.filter((c) => c !== primary && c.type === "Paid")[0];
  const supporting = s.channelStrategy.filter((c) => c !== primary && c !== secondary);

  return (
    <div>
      <SectionTitle icon={Network} title="Channel Strategy" subtitle="Where the campaign meets the audience." />
      <div className="grid gap-4 lg:grid-cols-3">
        <ChannelCard tier="Primary" name={primary?.name ?? "—"} accent />
        <ChannelCard tier="Secondary" name={secondary?.name ?? "—"} />
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Supporting</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {supporting.map((c) => (
              <li key={c.name} className="flex items-center justify-between">
                <span>{c.name}</span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">{c.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ tier, name, accent = false }: { tier: string; name: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${accent ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white"}`}>
      <div className={`text-[11px] font-semibold uppercase tracking-wider ${accent ? "text-slate-300" : "text-slate-400"}`}>{tier} Channel</div>
      <div className="mt-3 font-display text-2xl font-bold">{name}</div>
    </div>
  );
}

function BudgetSlide({ s }: { s: SampleStrategy }) {
  return (
    <div>
      <SectionTitle icon={PieChart} title="Budget Allocation" subtitle="Where every dollar of paid media is invested." />
      <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        {s.budgetAllocation.map(({ channel, pct }) => (
          <div key={channel}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-display text-lg font-semibold text-slate-900">{channel}</span>
              <span className="font-display text-xl font-bold text-slate-900">{pct}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-slate-900 to-slate-600" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
        <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-500">
          Total budget: <span className="font-semibold text-slate-900">{s.executiveSummary.budget}</span>
        </div>
      </div>
    </div>
  );
}

function ForecastSlide({ s }: { s: SampleStrategy }) {
  const kpis = [
    { label: "Reach", value: "80k–125k" },
    { label: "Clicks", value: "1.8k–2.7k" },
    { label: "Leads", value: "50–120" },
    { label: "CTR", value: "2.1%" },
    { label: "CPL", value: "$40–$90" },
  ];
  return (
    <div>
      <SectionTitle icon={TrendingUp} title="Performance Forecast" subtitle="Estimated outcomes across the 8-week window." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 text-center shadow-sm">
            <div className="font-display text-2xl font-bold text-slate-900">{k.value}</div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{k.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-500">{s.campaignForecastSummary}</p>
    </div>
  );
}

function CreativeSlide({ s }: { s: SampleStrategy }) {
  const formats = ["Carousel", "Case Study", "Industry Guide", "Email Sequence"];
  return (
    <div>
      <SectionTitle icon={Lightbulb} title="Creative Direction" subtitle="Recommended formats, concepts, and content ideas." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Recommended Formats</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {formats.map((f) => (
              <span key={f} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">{f}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Creative Concepts</div>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {s.creativeDirection.map((c) => (
              <li key={c} className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <span className="font-bold text-slate-400">›</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Content Ideas</div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {s.campaignAssets.map((a) => (
              <div key={a.type} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">{a.type}</div>
                <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
