import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import {
  AlertTriangle,
  FileSpreadsheet,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Zap,
  Split,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProblemSolution = () => {
  const [activeTab, setActiveTab] = useState('comparison'); // 'chaos' | 'comparison' | 'sourceflow'

  return (
    <section id="problem-solution" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <SectionHeading
        badge="Before vs. After SourceFlow"
        title={
          <>
            Stop playing supply chain roulette with{' '}
            <span className="font-serif italic text-rose-400">spreadsheets</span> &{' '}
            <span className="font-serif italic text-amber-400">frantic calls</span>.
          </>
        }
        subtitle="When one overseas factory encounters a blackout or price spike, single-supplier SMBs stall for weeks. SourceFlow turns fragile single-sourcing into resilient, automated multi-supplier execution."
      />

      {/* Interactive Mode Pills */}
      <div className="mt-8 sm:mt-12 flex justify-center">
        <div className="p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl flex items-center gap-1 max-w-full overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('chaos')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'chaos'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="sm:hidden">Chaos</span>
            <span className="hidden sm:inline">The Legacy Chaos</span>
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-white text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setActiveTab('sourceflow')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'sourceflow'
                ? 'bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="sm:hidden">SourceFlow</span>
            <span className="hidden sm:inline">The SourceFlow Flow</span>
          </button>
        </div>
      </div>

      {/* Grid Comparison */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Left Card: The Chaos */}
        {(activeTab === 'chaos' || activeTab === 'comparison') && (
          <GlassCard
            glowColor="none"
            className="p-5 sm:p-8 bg-rose-950/[0.08] border-rose-500/20 hover:border-rose-500/40 relative flex flex-col justify-between"
          >
            <div className="flex sm:absolute sm:top-4 sm:right-4 mb-3 sm:mb-0 w-fit px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Fragile Single Sourcing</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-lg sm:text-xl font-semibold text-rose-200">The 2AM Panic Loop</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Scattered data, untracked price hikes, and single-point supplier vulnerability.
              </p>

              {/* Stacked Chaotic Artifact Cards */}
              <div className="space-y-3 sm:space-y-3.5">
                {/* Chaotic Item 1: WhatsApp Voice Note */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-rose-500/20 backdrop-blur-md transform sm:-rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex items-center justify-between text-xs text-rose-300 mb-2 font-mono">
                    <span className="flex items-center gap-1.5 truncate">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" /> WhatsApp Note (0:48)
                    </span>
                    <span className="text-slate-500 text-[10px] shrink-0">Today, 2:14 AM</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "Hey boss, the Ningbo factory halted production line 2. Raw resin price jumped 22% overnight. Either you pay the surge rate or delivery slips 3 weeks..."
                  </p>
                </div>

                {/* Chaotic Item 2: Broken Excel File */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md transform sm:rotate-1 hover:rotate-0 transition-transform">
                  <div className="flex items-center justify-between text-xs text-amber-300 mb-2 font-mono">
                    <span className="flex items-center gap-1.5 truncate">
                      <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" /> RFQ_Master_v11.xlsx
                    </span>
                    <span className="text-rose-400 font-bold shrink-0">#REF! ERROR</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400 bg-white/[0.02] p-2 rounded text-center">
                    <div>4,000 units</div>
                    <div>Quote: $88.50</div>
                    <div className="text-rose-400">Old: $71.00</div>
                  </div>
                </div>

                {/* Chaotic Item 3: Freight Delay Alert */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-rose-500/20 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs text-rose-300 mb-1 font-mono">
                    <span className="flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5" /> Freight Broker
                    </span>
                    <span className="text-rose-400">Missed Call (x4)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Container stranded at customs. Port congestion adding 14 days delay. Amazon Prime stockout unavoidable.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-rose-300">
              <span>Risk: 100% Single Point</span>
              <span>Avg Delay: 18 Days</span>
              <span>Margin Lost: 24%</span>
            </div>
          </GlassCard>
        )}

        {/* Right Card: SourceFlow Solution */}
        {(activeTab === 'sourceflow' || activeTab === 'comparison') && (
          <GlassCard
            glowColor="emerald"
            className="p-5 sm:p-8 bg-emerald-950/[0.08] border-[#00E5A0]/30 hover:border-[#00E5A0]/60 relative flex flex-col justify-between"
          >
            <div className="flex sm:absolute sm:top-4 sm:right-4 mb-3 sm:mb-0 w-fit px-3 py-1 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 text-xs font-mono items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Supplier Resilient</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A0]" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">The SourceFlow Algorithmic Calm</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Every purchase order is automatically optimized across audited suppliers with guaranteed lead times.
              </p>

              {/* SourceFlow Solution Elements */}
              <div className="space-y-3 sm:space-y-3.5">
                {/* Solution Item 1: Optimized Split */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-[#00E5A0]/20 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs text-[#00E5A0] mb-2 font-mono">
                    <span className="flex items-center gap-1.5 truncate">
                      <Split className="w-3.5 h-3.5 shrink-0" /> Optimal 62 / 38 Split
                    </span>
                    <span className="text-white font-bold bg-[#00E5A0]/20 px-2 py-0.5 rounded text-[11px] shrink-0">
                      -$41,800 (-14.5%)
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden flex my-2">
                    <div className="bg-[#00E5A0] h-full" style={{ width: '62%' }} title="Novatech: 62%" />
                    <div className="bg-[#22D3EE] h-full" style={{ width: '38%' }} title="Apex: 38%" />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between text-[11px] font-mono text-slate-300 gap-1">
                    <span>Novatech (62%): Cost arbitrage</span>
                    <span>Apex (38%): 4-day delivery SLA</span>
                  </div>
                </div>

                {/* Solution Item 2: Explainable AI Pill */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-xs text-[#22D3EE] mb-1 font-mono">
                    <Zap className="w-3.5 h-3.5" /> Plain-Language AI Audit Trail
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    "Allocating 38% to Apex absorbs early customer delivery dates while mitigating Vietnam monsoon port congestion. Zero risk of single-point supply chain halt."
                  </p>
                </div>

                {/* Solution Item 3: Autonomous Insurance */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-[#00E5A0]/20 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span className="font-mono text-[#00E5A0] flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Real-time Contingency Protection
                    </span>
                    <span className="text-slate-400 font-mono text-[10px] shrink-0">SLA 99.2%</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    If any supplier fails an SLA by 24h, back-up rate cards are automatically locked in with pre-vetted Tier-1 partners.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-[#00E5A0]/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#00E5A0]">
              <span>Single Point Risk: 0%</span>
              <span>Avg Delivery: 98% On-Time</span>
              <span>Cost Saved: 23%</span>
            </div>
          </GlassCard>
        )}
      </div>
    </section>
  );
};
