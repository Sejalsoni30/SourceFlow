import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import { TypewriterText } from '../common/TypewriterText';
import { ScoreRing } from '../common/ScoreRing';
import {
  Radar,
  PieChart,
  BrainCircuit,
  BellRing,
  SlidersHorizontal,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  RotateCw
} from 'lucide-react';

export const BentoFeatures = () => {
  // Simulator card live slider state
  const [materialSurcharge, setMaterialSurcharge] = useState(20);
  // Scoring card selected supplier state
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState(0);

  const radarSuppliers = [
    { name: 'Apex Precision', scores: [88, 92, 98, 96, 91], overall: 94, color: '#00E5A0' },
    { name: 'Novatech Global', scores: [96, 89, 89, 92, 88], overall: 91, color: '#22D3EE' },
    { name: 'Vanguard Heavy', scores: [79, 97, 95, 96, 95], overall: 89, color: '#8B5CF6' },
  ];

  const currentSupplier = radarSuppliers[selectedSupplierIndex];

  // Helper for polygon vertices (5 axes: Price, Speed, Quality, Reliability, Risk)
  const getRadarPoints = (scores, maxRadius = 60, cx = 90, cy = 90) => {
    return scores
      .map((score, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const r = (score / 100) * maxRadius;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const explainableSentences = [
    "Allocated 62% to Novatech to capture $14,200 volume discount break on high-tolerance PCB boards.",
    "Reserved 38% buffer allocation with Apex Precision, securing delivery in 5 business days.",
    "Avoided single-source catastrophe: Shenzen port customs audit will not impact your Amazon Prime launch.",
    "Balanced carbon footprint: European ground transport cut container freight emissions by 24.8%.",
  ];

  return (
    <section id="features" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Engineered for Resilient SMBs"
        title={
          <>
            Six algorithmic superpowers to{' '}
            <span className="font-serif italic text-gradient-emerald">outsource chaos</span>.
          </>
        }
        subtitle="Every tool built from first principles to automate supplier selection, hedging, and negotiations without an army of procurement analysts."
      />

      {/* Bento Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Bento 1: Smart Supplier Scoring (Radar Chart) */}
        <GlassCard glowColor="emerald" className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20">
                <Radar className="w-5 h-5" />
              </span>
              <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-full border border-white/10">
                {radarSuppliers.map((sup, idx) => (
                  <button
                    key={sup.name}
                    onClick={() => setSelectedSupplierIndex(idx)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-all ${
                      selectedSupplierIndex === idx
                        ? 'bg-white text-black font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sup.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Smart Multi-Axis Scoring</h3>
            <p className="text-xs text-slate-400 mb-4">
              Continuously grades vendors on 40+ quantitative signals: price index, defect rates, transit lead time, and compliance.
            </p>

            {/* Interactive SVG Radar Chart */}
            <div className="relative flex items-center justify-center py-2">
              <svg width="180" height="180" viewBox="0 0 180 180" className="overflow-visible">
                {/* Background Radar Webs */}
                {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                  <polygon
                    key={i}
                    points={getRadarPoints([100, 100, 100, 100, 100], 65 * scale)}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                ))}

                {/* Axes */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                  const x = 90 + 65 * Math.cos(angle);
                  const y = 90 + 65 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="90"
                      y1="90"
                      x2={x}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Active Supplier Polygon */}
                <polygon
                  points={getRadarPoints(currentSupplier.scores)}
                  fill={currentSupplier.color}
                  fillOpacity="0.25"
                  stroke={currentSupplier.color}
                  strokeWidth="2"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              {/* Center Ring Score Overlay */}
              <div className="absolute top-2 right-2">
                <ScoreRing score={currentSupplier.overall} size={48} />
              </div>
            </div>

            {/* Radar Legend Labels */}
            <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-slate-400 mt-2 text-center">
              <div>Price: {currentSupplier.scores[0]}%</div>
              <div>Speed: {currentSupplier.scores[1]}%</div>
              <div>Quality: {currentSupplier.scores[2]}%</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#00E5A0]">
            <span className="font-mono">Live Score: {currentSupplier.overall}/100</span>
            <span className="text-slate-400">Updated hourly</span>
          </div>
        </GlassCard>

        {/* Bento 2: Optimal Order Split (Animated Donut 60/40) */}
        <GlassCard glowColor="cyan" className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
                <PieChart className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Pareto Frontier
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Optimal Order Split</h3>
            <p className="text-xs text-slate-400 mb-4">
              Mathematically splits every large purchase order across 2-3 suppliers to minimize total landed cost while hedging late shipments.
            </p>

            {/* Animated Split Visualizer */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg width="90" height="90" viewBox="0 0 90 90" className="transform -rotate-90">
                  {/* Novatech 60% */}
                  <circle
                    cx="45"
                    cy="45"
                    r="34"
                    stroke="#00E5A0"
                    strokeWidth="10"
                    strokeDasharray="213.6"
                    strokeDashoffset={213.6 * 0.4}
                    fill="transparent"
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  {/* Apex 40% */}
                  <circle
                    cx="45"
                    cy="45"
                    r="34"
                    stroke="#22D3EE"
                    strokeWidth="10"
                    strokeDasharray="213.6"
                    strokeDashoffset={213.6 * 0.6}
                    strokeDashoffset-reverse="true"
                    fill="transparent"
                    strokeLinecap="round"
                    className="transform rotate-180 origin-center transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-mono font-bold text-white">60 / 40</span>
                </div>
              </div>

              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#00E5A0]" /> Novatech
                  </span>
                  <span className="font-mono text-white font-bold">1,500 units (60%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#22D3EE]" /> Apex Precision
                  </span>
                  <span className="font-mono text-white font-bold">1,000 units (40%)</span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-white/[0.08]">
                  Saves <span className="text-[#00E5A0] font-bold">$14,200</span> vs single vendor
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>Reduces stockout risk by 88%</span>
            <span className="text-[#22D3EE] font-mono">Verified Pareto</span>
          </div>
        </GlassCard>

        {/* Bento 3: Explainable AI (Typewriter Text) */}
        <GlassCard glowColor="violet" className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
                <BrainCircuit className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Zero Black-Box
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Explainable AI Reasoning</h3>
            <p className="text-xs text-slate-400 mb-4">
              Never wonder why an algorithm chose a vendor. Get clear, boardroom-ready reasoning for every percentage allocated.
            </p>

            {/* Typewriter Terminal Card */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs">
              <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/10 text-slate-500 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-slate-400">sourceflow-explainability-v2.log</span>
              </div>
              <div className="text-[#00E5A0] text-[11px] min-h-[72px] leading-relaxed">
                <TypewriterText texts={explainableSentences} speed={30} pause={3000} />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span className="text-slate-400">Exportable for stakeholders</span>
            <span className="text-[#8B5CF6] font-mono">100% Auditable</span>
          </div>
        </GlassCard>

        {/* Bento 4: Risk Alerts (Pulsing Badges) */}
        <GlassCard glowColor="emerald" className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <BellRing className="w-5 h-5" />
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                2 Active Signals
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Live Risk Radar</h3>
            <p className="text-xs text-slate-400 mb-4">
              Continuous 24/7 web & shipping lane monitoring. Alerts you days before a delayed container turns into an emergency.
            </p>

            {/* Alert Items Feed */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-rose-200">Port of Yantian Congestion (+7 Days)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Recommended action: Reroute 40% batch to Vietnam
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-amber-200">Bauxite Aluminum Spot Spike (+18%)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Pre-commit Q1 PO batch to lock $32.40 fixed rate
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-rose-400">
            <span>Automated backup routing</span>
            <span className="font-mono">Real-time webhooks</span>
          </div>
        </GlassCard>

        {/* Bento 5: What-If Simulator (Interactive Slider) */}
        <GlassCard glowColor="cyan" className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
                <SlidersHorizontal className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Interactive Test
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">What-If Stress Testing</h3>
            <p className="text-xs text-slate-400 mb-3">
              Stress-test unexpected price hikes or factory shutdowns before signing supplier agreements.
            </p>

            {/* Live Interactive Slider */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Raw Material Surcharge:</span>
                <span className="font-mono text-[#00E5A0] font-bold">+{materialSurcharge}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="40"
                step="5"
                value={materialSurcharge}
                onChange={(e) => setMaterialSurcharge(Number(e.target.value))}
                className="w-full accent-[#00E5A0] h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />

              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-rose-950/20 border border-rose-500/20">
                  <div className="text-[10px] text-slate-400">Single Supplier Hit</div>
                  <div className="text-xs font-mono font-bold text-rose-400">
                    +${(materialSurcharge * 840).toLocaleString()}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-[#00E5A0]/10 border border-[#00E5A0]/20">
                  <div className="text-[10px] text-slate-400">SourceFlow Hedged</div>
                  <div className="text-xs font-mono font-bold text-[#00E5A0]">
                    +${Math.round(materialSurcharge * 190).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>Saves up to 78% on shocks</span>
            <span className="text-[#22D3EE] font-mono">Dynamic rebalance</span>
          </div>
        </GlassCard>

        {/* Bento 6: Savings Dashboard (Counting-up numbers) */}
        <GlassCard glowColor="violet" className="p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Live Metrics
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">Automated Savings Ledger</h3>
            <p className="text-xs text-slate-400 mb-4">
              Track dollar-for-dollar procurement alpha. Connects directly to QuickBooks, NetSuite, and Shopify.
            </p>

            {/* Savings Counter Box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Total SMB Procurement Saved
              </div>
              <div className="text-3xl font-mono font-bold text-white tracking-tight text-gradient-emerald">
                $284,500
              </div>
              <div className="text-xs text-[#00E5A0] font-medium mt-1">
                +23.4% average margin expansion
              </div>

              {/* Sparkline Visual */}
              <div className="mt-3 flex items-end justify-center gap-1.5 h-8">
                {[35, 45, 55, 65, 80, 95, 110, 130].map((val, idx) => (
                  <div
                    key={idx}
                    className="w-3 rounded-t bg-gradient-to-t from-[#00E5A0]/30 to-[#00E5A0] transition-all"
                    style={{ height: `${(val / 130) * 100}%` }}
                    title={`Month ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>Direct ERP 1-Click Sync</span>
            <span className="text-[#00E5A0] font-mono">SOC2 Certified</span>
          </div>
        </GlassCard>

      </div>
    </section>
  );
};
