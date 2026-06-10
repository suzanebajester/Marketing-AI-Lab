import { jsPDF } from "jspdf";
import type { SampleStrategy } from "./sampleStrategy";

const BRAND = "Marketing AI Lab";
const AUTHOR_LINE = "Generated with Marketing AI Lab  •  Created by Suzane Bajester";

const COLORS = {
  primary: [79, 70, 229] as [number, number, number],
  text: [24, 24, 27] as [number, number, number],
  muted: [113, 113, 122] as [number, number, number],
  rule: [228, 228, 231] as [number, number, number],
  soft: [244, 244, 248] as [number, number, number],
};

export function generateStrategyPdf(s: SampleStrategy) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 56;
  let y = 0;
  let pageNum = 0;

  const setColor = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);

  function newPage(isCover = false) {
    if (pageNum > 0) doc.addPage();
    pageNum += 1;
    if (!isCover) {
      drawHeader();
      drawFooter();
      y = M + 36;
    } else {
      y = M;
    }
  }

  function drawHeader() {
    setFill(COLORS.primary);
    doc.rect(0, 0, W, 4, "F");
    setColor(COLORS.muted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(BRAND.toUpperCase(), M, 28);
    doc.setFont("helvetica", "normal");
    doc.text("Campaign Strategy Report", W - M, 28, { align: "right" });
    setFill(COLORS.rule);
    doc.rect(M, 36, W - M * 2, 0.6, "F");
  }

  function drawFooter() {
    setColor(COLORS.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(AUTHOR_LINE, M, H - 24);
    doc.text(`Page ${pageNum}`, W - M, H - 24, { align: "right" });
  }

  function ensure(space: number) {
    if (y + space > H - 56) newPage(false);
  }

  function h1(text: string) {
    ensure(40);
    setColor(COLORS.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(text, M, y);
    y += 10;
    setFill(COLORS.primary);
    doc.rect(M, y, 36, 2, "F");
    y += 22;
  }

  function h2(text: string) {
    ensure(28);
    setColor(COLORS.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(text, M, y);
    y += 16;
  }

  function p(text: string, opts: { muted?: boolean; size?: number } = {}) {
    setColor(opts.muted ? COLORS.muted : COLORS.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(opts.size ?? 10.5);
    const lines = doc.splitTextToSize(text, W - M * 2);
    for (const line of lines) {
      ensure(16);
      doc.text(line, M, y);
      y += 14;
    }
  }

  function kv(label: string, value: string) {
    ensure(18);
    setColor(COLORS.muted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(label.toUpperCase(), M, y);
    setColor(COLORS.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(value, M + 150, y);
    y += 18;
  }

  function bullets(items: string[]) {
    for (const item of items) {
      ensure(16);
      setColor(COLORS.primary);
      doc.setFont("helvetica", "bold");
      doc.text("•", M, y);
      setColor(COLORS.text);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      const lines = doc.splitTextToSize(item, W - M * 2 - 14);
      doc.text(lines, M + 14, y);
      y += 14 * lines.length + 2;
    }
    y += 4;
  }

  function card(title: string, body: () => void) {
    ensure(80);
    const startY = y - 4;
    setFill(COLORS.soft);
    doc.roundedRect(M, startY, W - M * 2, 0.1, 6, 6, "F"); // placeholder, redrawn after
    const cardStart = y;
    setColor(COLORS.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title, M + 14, y + 10);
    y += 28;
    body();
    const cardEnd = y + 6;
    // redraw rounded background under content
    setFill(COLORS.soft);
    doc.roundedRect(M, cardStart - 8, W - M * 2, cardEnd - cardStart + 10, 6, 6, "F");
    // re-render title and content on top — simpler: skip background, just draw a border
  }

  // ───── Cover ─────
  newPage(true);
  setFill(COLORS.primary);
  doc.rect(0, 0, W, 220, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(BRAND.toUpperCase(), M, 64);
  doc.setFontSize(32);
  doc.text("Campaign Strategy", M, 130);
  doc.text("Report", M, 168);

  setColor(COLORS.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated on ${date}`, M, 260);

  setColor(COLORS.text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Prepared for", M, 320);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(s.executiveSummary.audience, M, 340);

  doc.setFont("helvetica", "bold");
  doc.text("Primary goal", M, 380);
  doc.setFont("helvetica", "normal");
  doc.text(s.executiveSummary.goal, M, 400);

  setColor(COLORS.muted);
  doc.setFontSize(9);
  doc.text(AUTHOR_LINE, M, H - 40);

  // ───── Executive Summary ─────
  newPage();
  h1("Executive Summary");
  kv("Goal", s.executiveSummary.goal);
  kv("Audience", s.executiveSummary.audience);
  kv("Primary Channel", s.executiveSummary.primaryChannel);
  kv("Budget", s.executiveSummary.budget);
  kv("Forecast", s.executiveSummary.forecast);

  y += 10;
  h2("Campaign Headline");
  p(s.headline);
  y += 6;
  h2("Primary CTA");
  p(s.cta);

  // ───── Buyer Persona ─────
  newPage();
  h1("Buyer Persona");
  h2(s.persona.title);
  y += 4;
  h2("Goals");
  bullets(s.persona.goals);
  h2("Challenges");
  bullets(s.persona.challenges);

  // ───── Channel Strategy ─────
  newPage();
  h1("Channel Strategy");
  for (const c of s.channelStrategy) {
    ensure(18);
    setColor(COLORS.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(c.name, M, y);
    setColor(COLORS.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(c.type.toUpperCase(), W - M, y, { align: "right" });
    y += 18;
  }

  y += 16;
  h2("Budget Allocation");
  for (const b of s.budgetAllocation) {
    ensure(28);
    setColor(COLORS.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(b.channel, M, y);
    doc.text(`${b.pct}%`, W - M, y, { align: "right" });
    y += 8;
    setFill(COLORS.rule);
    doc.roundedRect(M, y, W - M * 2, 6, 3, 3, "F");
    setFill(COLORS.primary);
    doc.roundedRect(M, y, ((W - M * 2) * b.pct) / 100, 6, 3, 3, "F");
    y += 20;
  }

  // ───── Channel Forecast ─────
  newPage();
  h1("Channel Forecast");
  ensure(24);
  setColor(COLORS.muted);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  const col = [M, M + 170, M + 290, M + 400];
  doc.text("CHANNEL", col[0], y);
  doc.text("REACH", col[1], y);
  doc.text("CLICKS", col[2], y);
  doc.text("LEADS", col[3], y);
  y += 8;
  setFill(COLORS.rule);
  doc.rect(M, y, W - M * 2, 0.6, "F");
  y += 14;
  for (const f of s.channelForecast) {
    ensure(18);
    setColor(COLORS.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(f.channel, col[0], y);
    doc.text(f.reach, col[1], y);
    doc.text(f.clicks, col[2], y);
    doc.text(f.leads, col[3], y);
    y += 18;
  }

  y += 14;
  h2("Campaign Forecast Summary");
  p(s.campaignForecastSummary);

  // ───── Supporting Assets ─────
  newPage();
  h1("Supporting Assets");
  h2("Creative Direction");
  bullets(s.creativeDirection);

  h2("Campaign Assets");
  for (const a of s.campaignAssets) {
    ensure(40);
    setColor(COLORS.primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(a.type.toUpperCase(), M, y);
    y += 14;
    p(a.content);
    y += 8;
  }

  doc.save("marketing-ai-lab-strategy-report.pdf");
}
