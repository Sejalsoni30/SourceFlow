# SourceFlow — AI Multi-Supplier Optimization Platform

SourceFlow is an AI-powered Multi-Supplier Optimization platform engineered for small and medium businesses (SMBs). It grades and scores suppliers across multi-axis metrics, computes Pareto-optimal order allocations across multiple vendors, explains every decision in plain business English, and stress-tests supply chains with real-time what-if simulations.

---

## 🎨 Design Language (Inspired by motionsites.ai)
- **Cinematic Dark Theme**: Deep canvas background (`#05070A`) paired with liquid glass surfaces (`rgba(255, 255, 255, 0.04)`).
- **Signature Gradient**: Electric Emerald (`#00E5A0`) to Cyan (`#22D3EE`), with soft Violet (`#8B5CF6`) as a secondary ambient glow.
- **Liquid Glass Cards**: `backdrop-blur-xl`, `1px border rgba(255, 255, 255, 0.08)`, subtle inner top highlight sheen, `24px` radius, hover lift with soft reactive glow.
- **Typography**: 
  - UI: `Inter` (sans-serif)
  - Headlines: `Instrument Serif` (italic for emphasized words like *"smarter"* and *"less"*)
  - Telemetry: `JetBrains Mono`
- **Grain / Noise Texture**: Subtle 3% SVG procedural noise overlay (`bg-grain`).
- **Interactive Canvas Network**: Real-time canvas physics in the Hero rendering suppliers streaming data packets into the glowing central SourceFlow AI core with mouse repulsion physics.

---

## 🚀 Pages & Features

### 1. Award-Style Landing Page (`/`)
1. **Floating Glass Navbar**: Shrinks and intensifies blur on scroll. Quick navigation, status badge, and "Launch App" pill button.
2. **Hero**: Full-screen flowing network canvas, Instrument Serif headline (*"Source smarter. Spend less."*), dual CTAs (*Start optimizing* & *Watch demo*), and floating glass stats strip (*23% avg. cost saved*, *4.2x faster decisions*, *98% on-time delivery*, *+$1.4M saved*).
3. **Infinite Category Marquee**: Smooth infinite loop of 8 manufacturing categories (Electronics, Packaging, Textiles, Hardware, etc.).
4. **Problem to Solution**: Interactive comparison between legacy chaos (frantic WhatsApp voice notes, broken `#REF!` spreadsheets, missed freight calls) and SourceFlow algorithmic order hedging.
5. **Interactive Bento Grid**:
   - **Smart Supplier Scoring**: Interactive multi-axis SVG radar polygon chart with live supplier switcher.
   - **Optimal Order Split**: Animated donut chart splitting 60/40 with unit breakdowns and financial delta.
   - **Explainable AI**: Live typewriter terminal explaining tradeoff reasoning character-by-character.
   - **Risk Alerts**: Real-time feed with pulsing red/amber warning badges.
   - **What-If Simulator**: Interactive slider with live margin & penalty recalculation.
   - **Savings Dashboard**: Live counting-up metrics with monthly trajectory sparklines.
6. **How It Works**: 4-step vertical timeline (Add suppliers, Set priorities, AI optimizes, Place order) with live telemetry output.
7. **Live Interactive Demo Playground**: 5 draggable priority sliders (Price, Delivery, Quality, Reliability, Risk) that recalculate match fits and re-rank 5 realistic suppliers in real time with animated leaderboard transitions.
8. **Social Proof & Pricing**: 3 verified SMB customer testimonials with ROI statistics, 3-tier pricing (Starter, Growth with gradient border, Enterprise), and final radial glow CTA.
9. **Interactive Demo Video Walkthrough Modal**: Step-by-step interactive demo modal accessible via the Hero CTA.

### 2. Full Application Suite (`/app/...`)
- **App Layout**: Persistent liquid glass sidebar with route indicators, workspace switcher (*Apex Hardware Co.*), mobile drawer, and top navigation bar with breadcrumbs and `Cmd+K` global search palette.
- **Dashboard (`/app/dashboard`)**: 4 animated KPI cards with cubic count-ups, Spend & Savings trajectory Area Chart (Recharts), Supplier comparison, Recent Orders table with split chips, and AI autonomous recommendations.
- **Suppliers Directory (`/app/suppliers`)**: Searchable and filterable directory with category pills, risk filters, table/grid toggles, circular SVG score rings, and a slide-over **Supplier Detail Drawer** displaying quantitative audit scores, certifications, and account contacts.
- **Optimizer Studio (`/app/optimizer`)**: Select product/SKU, configure batch quantity & deadline, adjust 5 priority sliders, and run the FastAPI solver with shimmer loading states. Renders the Pareto allocation donut, financial ledger, and plain-language boardroom explanation with 1-click PO commit (confetti effect).
- **What-If Simulator (`/app/simulator`)**: Scenario stress-testing sandbox (Force Majeure Factory Shutdown, Freight Surcharge, 2x Demand Surge, Port Strike) with severity slider and side-by-side impact comparison.
- **Risk Center (`/app/risk`)**: 24/7 global port monitoring feed with severity tags, route impact assessments, and 1-click backup supplier activation.
- **Orders & Tracking (`/app/orders`)**: History of multi-supplier purchase orders with collapsible multi-vendor shipping milestones (ocean departed, customs cleared, delivered).
- **Settings (`/app/settings`)**: Organization settings, ERP sync toggles (QuickBooks Online, NetSuite, Shopify Plus, SAP), FastAPI algorithm selection, and API keys with copy utility.

---

## 🛠️ Stack & Architecture
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS with custom glass, glow, and animation extensions
- **Charts**: Recharts (`ResponsiveContainer`, `AreaChart`, `BarChart`, `Tooltip`)
- **Animation**: Canvas HTML5, CSS Keyframes, SVG transforms, `lenis` smooth scroll, and `canvas-confetti`
- **Icons**: Lucide React
- **API & Mock Layer**: `/src/data/mockData.js` & `/src/services/api.js` (mimicking asynchronous FastAPI & Node/Express response contracts).

---

## 💻 Running the App
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```
