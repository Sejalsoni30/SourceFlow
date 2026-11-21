import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroCanvas } from './HeroCanvas';
import { PillButton } from '../common/PillButton';
import { GlassCard } from '../common/GlassCard';
import { Play, Sparkles, TrendingUp, Zap, Clock, ShieldCheck } from 'lucide-react';

export const Hero = ({ onOpenDemoModal }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Canvas Network */}
      <HeroCanvas />

      {/* Subtle top & bottom vignette shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070A]/80 via-transparent to-[#05070A] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#05070A]/40 to-[#05070A] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto text-center flex flex-col items-center w-full">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[11px] sm:text-xs font-medium text-slate-300 backdrop-blur-xl mb-6 sm:mb-8 shadow-[0_0_25px_rgba(0,229,160,0.15)] hover:border-[#00E5A0]/40 transition-colors max-w-full truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5A0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5A0]"></span>
          </span>
          <span className="font-mono text-[#00E5A0]">SourceFlow 2.4</span>
          <span className="text-slate-500">•</span>
          <span className="truncate">FastAPI Pareto Multi-Supplier Optimizer</span>
        </div>

        {/* Headline with Instrument Serif Italic */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-normal tracking-[-0.035em] text-white leading-[1.08] max-w-4xl px-2">
          Source <span className="font-serif italic text-gradient-brand font-normal">smarter</span>.
          <br className="hidden xs:inline" /> Spend <span className="font-serif italic text-gradient-emerald font-normal">less</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-7 text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed px-4">
          AI that scores your suppliers, splits every order for the lowest cost and risk, and explains every trade-off in plain language.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto px-4">
          <PillButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/app/optimizer')}
            className="w-full sm:w-auto shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_45px_rgba(0,229,160,0.4)]"
          >
            Start optimizing
          </PillButton>

          <PillButton
            variant="secondary"
            size="lg"
            icon={false}
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto backdrop-blur-2xl"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#00E5A0]">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              Watch demo (2 min)
            </span>
          </PillButton>
        </div>
      </div>

      {/* Floating Glass Stats Strip */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mt-10 sm:mt-16">
        <GlassCard
          hoverEffect={false}
          className="p-4 sm:p-7 backdrop-blur-2xl bg-white/[0.03] border-white/[0.09] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {/* Stat 1 */}
            <div className="flex flex-col items-center sm:items-start p-2 sm:p-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#00E5A0]" />
                <span className="truncate">Avg. Cost Saved</span>
              </div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                23%
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Per multi-vendor order split</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center sm:items-start p-2 sm:p-0 sm:pl-6 md:pl-8">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="truncate">Faster Decisions</span>
              </div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                4.2x
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">From RFQ to dispatched PO</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center sm:items-start p-2 sm:p-0 sm:pl-6 md:pl-8 pt-3 sm:pt-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#00E5A0]" />
                <span className="truncate">On-Time Delivery</span>
              </div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                98%
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Zero single-factory stockouts</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center sm:items-start p-2 sm:p-0 sm:pl-6 md:pl-8 pt-3 sm:pt-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span className="truncate">SMB Volume Saved</span>
              </div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                +$1.4M
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Across 420+ connected SMBs</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
