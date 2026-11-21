import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroCanvas } from './HeroCanvas';
import { PillButton } from '../common/PillButton';
import { GlassCard } from '../common/GlassCard';
import { Play, Sparkles, TrendingUp, Zap, Clock, ShieldCheck } from 'lucide-react';

export const Hero = ({ onOpenDemoModal }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Canvas Network */}
      <HeroCanvas />

      {/* Subtle top & bottom vignette shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070A]/80 via-transparent to-[#05070A] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#05070A]/40 to-[#05070A] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-300 backdrop-blur-xl mb-8 shadow-[0_0_25px_rgba(0,229,160,0.15)] hover:border-[#00E5A0]/40 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5A0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5A0]"></span>
          </span>
          <span className="font-mono text-[#00E5A0]">SourceFlow 2.4</span>
          <span className="text-slate-500">•</span>
          <span>FastAPI Pareto Multi-Supplier Optimizer</span>
        </div>

        {/* Headline with Instrument Serif Italic */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-normal tracking-[-0.035em] text-white leading-[1.05] max-w-4xl">
          Source <span className="font-serif italic text-gradient-brand font-normal">smarter</span>.
          <br className="hidden sm:inline" /> Spend <span className="font-serif italic text-gradient-emerald font-normal">less</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          AI that scores your suppliers, splits every order for the lowest cost and risk, and explains every trade-off in plain language.
        </p>

        {/* Action CTAs */}
        <div className="mt-9 sm:mt-11 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <PillButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/app/optimizer')}
            className="shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_45px_rgba(0,229,160,0.4)]"
          >
            Start optimizing
          </PillButton>

          <PillButton
            variant="secondary"
            size="lg"
            icon={false}
            onClick={onOpenDemoModal}
            className="backdrop-blur-2xl"
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#00E5A0]">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              Watch demo (2 min)
            </span>
          </PillButton>
        </div>
      </div>

      {/* Floating Glass Stats Strip */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mt-14 sm:mt-16">
        <GlassCard
          hoverEffect={false}
          className="p-5 sm:p-7 backdrop-blur-2xl bg-white/[0.03] border-white/[0.09] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {/* Stat 1 */}
            <div className="flex flex-col items-center md:items-start pt-2 md:pt-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#00E5A0]" />
                <span>Avg. Cost Saved</span>
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                23%
              </div>
              <p className="text-xs text-slate-400 mt-1">Per multi-vendor order split</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center md:items-start pt-2 md:pt-0 md:pl-8">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Faster Decisions</span>
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                4.2x
              </div>
              <p className="text-xs text-slate-400 mt-1">From RFQ to dispatched PO</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#00E5A0]" />
                <span>On-Time Delivery</span>
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                98%
              </div>
              <p className="text-xs text-slate-400 mt-1">Zero single-factory stockouts</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>SMB Volume Saved</span>
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                +$1.4M
              </div>
              <p className="text-xs text-slate-400 mt-1">Across 420+ connected SMBs</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
