import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PillButton } from '../common/PillButton';
import { GlassCard } from '../common/GlassCard';
import { Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial orbs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[350px] rounded-full bg-gradient-to-r from-[#00E5A0]/20 via-[#22D3EE]/20 to-[#8B5CF6]/15 blur-[120px]" />
      </div>

      <GlassCard
        glowColor="emerald"
        hoverEffect={false}
        className="p-10 sm:p-16 text-center relative overflow-hidden border-white/15 bg-white/[0.04]"
      >
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-[#00E5A0] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Zero Risk Guarantee</span>
        </div>

        {/* Large Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white max-w-3xl mx-auto leading-[1.12]">
          Ready to turn supply chain chaos into{' '}
          <span className="font-serif italic text-gradient-brand">predictable margin</span>?
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join 420+ hardware, textile, packaging, and e-commerce SMBs who never lose sleep over sudden port strikes or single-factory price gouging.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PillButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/app/optimizer')}
            className="shadow-[0_0_35px_rgba(255,255,255,0.3)]"
          >
            Start Free Optimization
          </PillButton>

          <PillButton
            variant="secondary"
            size="lg"
            onClick={() => {
              const el = document.getElementById('live-demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Play with Live Demo
          </PillButton>
        </div>

        {/* Trust Points */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00E5A0]" /> SOC-2 Type II Certified
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#22D3EE]" /> 1-Click QuickBooks & NetSuite Sync
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" /> 14-Day Full Access Trial
          </span>
        </div>
      </GlassCard>
    </section>
  );
};
