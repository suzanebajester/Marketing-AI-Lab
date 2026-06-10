
# Landing Page Redesign — Marketing AI Lab as Strategy Platform

Reposition the product from "campaign content generator" to "AI-powered marketing strategy platform." All changes are presentational and contained in `src/routes/index.tsx`, `src/components/layout/Footer.tsx`, and `src/styles.css` (for AI-inspired tokens). No backend or routing changes.

## New page structure (top → bottom)

1. **Hero** — repositioned headline, AI badges, primary CTA scrolls to form
2. **Build Your Strategy (Typebot)** — moved up, directly under hero
3. **What You'll Receive** — 7 new feature cards
4. **Strategic Differentiator** — "Most AI tools generate content. We generate strategy." with 4 comparison rows
5. **Output Preview** — mock deliverable cards (Executive Summary, Persona, Channels, Budget, Forecast, Creative)
6. **About** — updated copy
7. **Footer** — Suzane Bajester + tagline + LinkedIn/GitHub

## Section-by-section content

### Hero
- Headline: "Generate an AI-Powered Marketing **Strategy** in Minutes" (gradient on "Strategy")
- Sub: full subheadline from brief
- Badge row above headline: small pill "AI-Powered Strategy Generator" with Sparkles icon
- Tech badge row below CTA: "Powered by" + OpenAI, Lovable, Typebot chips
- Primary CTA: "Start Planning →" → smooth-scrolls to `#generator`
- Subtle gradient mesh + grid background (already present, refine opacity)

### Build Your Strategy (Typebot — moved up)
- Title: "Build Your Strategy"
- Subtitle: from brief
- Keep existing `<TypebotEmbed />`
- Same `id="generator"` so hero CTA still works

### What You'll Receive (7 cards, 3-col grid)
Executive Campaign Summary, Buyer Persona, Channel Strategy, Budget Allocation, Performance Forecast, Creative Direction, Campaign Assets — each with a lucide icon (FileText, Users, Network, PieChart, TrendingUp, Lightbulb, Megaphone).

### Strategic Differentiator (new section)
- Heading: "Most AI tools generate content. Marketing AI Lab generates **strategy**."
- 4 side-by-side comparison rows: left card (muted, strikethrough-ish) → arrow → right card (gradient/primary)
  - Generic AI Copy → Campaign Strategy
  - Random Content Ideas → Channel Recommendations
  - Single Asset → Complete Marketing Plan
  - No Forecasting → Budget & Performance Estimates

### Output Preview (new section)
- Heading: "What your strategy looks like"
- Bento-style grid of 6 mock cards (no real data):
  - Executive Summary — short paragraph mock
  - Buyer Persona — name + role + 2 bullets
  - Channel Strategy — list with Paid/Owned/Organic tags
  - Budget Allocation — simple horizontal bar chart (pure CSS divs with % widths)
  - Performance Forecast — 3 stat tiles (Reach / Leads / Awareness)
  - Creative Direction — 2-3 concept chips
- All static markup, no charts library

### About
- New copy from brief, keep centered narrow column

### Footer (`Footer.tsx`)
- "Created by Suzane Bajester"
- Tagline line: "Marketing Operations • Digital Marketing • AI Enthusiast"
- Keep LinkedIn + GitHub icon links (LinkedIn already wired)

## Design system touches (`src/styles.css`)
- Reuse existing `--gradient-hero`, `--gradient-soft`, `--shadow-glow`, `--shadow-elevated`, `--shadow-card` — no new tokens needed unless a subtle "AI mesh" background helps. If added, define as `--gradient-mesh` and apply at low opacity behind hero only.
- Increase section vertical rhythm to `py-24 lg:py-28` for premium spacing.
- Stronger hierarchy: hero h1 stays `text-6xl`, section h2 `text-3xl sm:text-4xl`, consistent 12-unit gap between heading and grid.

## Files to change
- `src/routes/index.tsx` — full rewrite of `Landing`, `Hero`, `WhatYouGet` (rename to `WhatYouReceive`), add `DifferentiatorSection`, `OutputPreviewSection`, update `GeneratorSection` placement + copy, update `AboutSection` copy.
- `src/components/layout/Footer.tsx` — add tagline line under name.
- `src/styles.css` — optional `--gradient-mesh` token if needed.

## Out of scope
- No new routes, no backend, no Typebot changes, no SEO/meta changes (already set last turn), no logo or Navbar changes.

Ready to implement on approval.
