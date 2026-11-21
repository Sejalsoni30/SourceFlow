import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { PillButton } from '../common/PillButton';
import {
  X,
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoVideoModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: '01. Ingesting Product & RFQs',
      tag: 'Step 1/4',
      headline: 'Detecting 3 Eligible Suppliers for Li-Ion Battery SKU-48V',
      description: 'SourceFlow analyzes recent quality certifications, MOQ limits, and current ocean freight rates across Taiwan, Vietnam, and Shenzhen.',
      highlight: '3 suppliers identified with 94%, 91%, and 86% baseline health scores.',
    },
    {
      title: '02. Dynamic Priority Balancing',
      tag: 'Step 2/4',
      headline: 'Configuring 40% Cost / 30% Speed / 30% Risk Buffer',
      description: 'The user drags sliders to prioritize on-time delivery for an upcoming holiday launch without forfeiting volume price discounts.',
      highlight: 'Calculated 18 candidate combinations along the Pareto efficiency curve.',
    },
    {
      title: '03. Algorithmic Split & Explainable AI',
      tag: 'Step 3/4',
      headline: 'Optimal Split: 62% Novatech Global + 38% Apex Precision',
      description: 'The engine explains: routing 1,860 units to Vietnam unlocks volume savings ($41,800 saved); routing 1,140 units to Taiwan guarantees delivery in 5 days.',
      highlight: 'Net savings: $41,800 (14.5%) with 0% stockout exposure.',
    },
    {
      title: '04. Instant Multi-PO Dispatch',
      tag: 'Step 4/4',
      headline: 'Dual Purchase Orders Generated with Automated SLA Tracking',
      description: 'Both suppliers receive structured digital POs with rate locks. SourceFlow initiates automated satellite milestone tracking at customs.',
      highlight: 'Real-time webhook dispatched to QuickBooks Online.',
    },
  ];

  const current = demoSteps[activeStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto no-scrollbar">
        <GlassCard
          glowColor="emerald"
          hoverEffect={false}
          className="p-4 sm:p-8 bg-[#090D14]/95 border-white/20 shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A0] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#00E5A0]">
              Interactive Product Walkthrough
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 pr-8">
            Watch SourceFlow in Action
          </h3>

          {/* Walkthrough Stage */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/70 border border-white/10 relative overflow-hidden min-h-[240px] sm:min-h-[260px] flex flex-col justify-between">
            {/* Top progress bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30">
                {current.tag}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Simulation Engine Active
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-2">{current.headline}</h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {current.description}
              </p>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2 text-xs font-mono text-[#00E5A0]">
                <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0" />
                <span>{current.highlight}</span>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex gap-2">
                {demoSteps.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStep(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeStep === idx ? 'w-8 bg-[#00E5A0]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30"
                >
                  Back
                </button>
                <button
                  disabled={activeStep === demoSteps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(demoSteps.length - 1, prev + 1))}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#00E5A0] text-black font-semibold hover:bg-[#22D3EE] transition-colors disabled:opacity-30"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Ready to optimize real purchase orders?
            </span>
            <div className="flex gap-3">
              <PillButton
                variant="secondary"
                size="sm"
                onClick={onClose}
              >
                Close Preview
              </PillButton>
              <PillButton
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  navigate('/app/optimizer');
                }}
              >
                Launch Studio Now
              </PillButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
