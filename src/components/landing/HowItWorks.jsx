import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import { PillButton } from '../common/PillButton';
import {
  UploadCloud,
  Sliders,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileSpreadsheet,
  Globe,
  ShieldCheck,
  Send
} from 'lucide-react';

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Add & Ingest Suppliers',
      subtitle: 'Connect your current vendor contacts, upload a rate sheet, or sync via ERP in 60 seconds.',
      icon: UploadCloud,
      color: '#00E5A0',
      details: [
        'Sync historical POs from QuickBooks, NetSuite, or CSV',
        'Auto-extract rate cards, MOQ thresholds, and lead times',
        'Continuous verification of ISO & ESG certifications',
      ],
      previewSnippet: 'Imported 18 active vendors across 4 manufacturing tiers.',
    },
    {
      num: '02',
      title: 'Set Optimization Priorities',
      subtitle: 'Tell SourceFlow what matters most for this specific production run using intuitive sliders.',
      icon: Sliders,
      color: '#22D3EE',
      details: [
        'Weight Cost vs. Delivery Speed vs. Quality Tolerance',
        'Set custom hard constraints (e.g. Max lead time 12 days)',
        'Enable geopolitical and single-point-of-failure risk caps',
      ],
      previewSnippet: 'Priorities: 40% Price, 30% Delivery Speed, 30% Risk Buffer.',
    },
    {
      num: '03',
      title: 'AI Multi-Supplier Optimization',
      subtitle: 'Our FastAPI engine computes the Pareto-optimal order allocation across your vendor network.',
      icon: Cpu,
      color: '#8B5CF6',
      details: [
        'Solves linear multi-objective matrix in <800ms',
        'Generates dual- or tri-supplier allocation breakdown',
        'Provides plain-language Explainable AI reasoning report',
      ],
      previewSnippet: 'Result: 62% Novatech / 38% Apex. Saves $14,200 with 0% stockout risk.',
    },
    {
      num: '04',
      title: 'Dispatch & Track Real-Time',
      subtitle: 'One-click generate structured Purchase Orders and monitor multi-supplier logistics in real time.',
      icon: Send,
      color: '#00E5A0',
      details: [
        'Direct PO dispatch with automated rate card lock-in',
        'Multi-modal logistics tracking across ports and customs',
        'Autonomous backup rerouting if a supplier flags an SLA breach',
      ],
      previewSnippet: 'Dispatched 2 POs. Real-time satellite vessel tracking live.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Autonomous Workflow"
        title={
          <>
            From fragmented RFQs to{' '}
            <span className="font-serif italic text-gradient-brand">optimized dispatch</span> in 4 steps.
          </>
        }
        subtitle="No spreadsheets, no manual bargaining, no single-point vulnerability. A seamless loop from supplier ingestion to PO dispatch."
      />

      <div className="mt-16 relative">
        {/* Step navigation tabs for mobile / desktop quick jumping */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
            {steps.map((s, idx) => (
              <button
                key={s.num}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeStep === idx
                    ? 'bg-white text-slate-950 font-semibold shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className={`font-mono text-xs ${activeStep === idx ? 'text-[#00E5A0]' : 'text-slate-500'}`}>
                  {s.num}
                </span>
                <span className="truncate">{s.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Details Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vertical Timeline Guide (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`
                    p-5 rounded-2xl cursor-pointer transition-all duration-300 border
                    ${
                      isActive
                        ? 'bg-white/[0.06] border-[#00E5A0]/40 shadow-[0_8px_30px_rgba(0,229,160,0.1)] translate-x-2'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10 opacity-70 hover:opacity-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#00E5A0] text-black' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3 className={`text-base font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 pl-8 leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Step Preview Stage (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <GlassCard glowColor="emerald" className="p-8 relative overflow-hidden">
              {/* Background gradient orb inside preview */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00E5A0]/10 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20">
                    {React.createElement(steps[activeStep].icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#00E5A0]">STEP {steps[activeStep].num}</span>
                    <h4 className="text-xl font-bold text-white">{steps[activeStep].title}</h4>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" />
                  <span>Real-time Execution</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {steps[activeStep].subtitle}
              </p>

              {/* Step Checklist */}
              <div className="space-y-3 mb-8">
                {steps[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Real-time System Output Preview Box */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs">
                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#00E5A0]" /> Output Telemetry
                </div>
                <div className="text-[#00E5A0] font-medium">
                  {steps[activeStep].previewSnippet}
                </div>
              </div>

              {/* Step Switcher Footer */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous Step
                </button>

                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        activeStep === i ? 'w-6 bg-[#00E5A0]' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className="text-xs font-medium text-[#00E5A0] hover:text-[#22D3EE] flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next Step <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
