import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { PillButton } from '../components/common/PillButton';
import { api } from '../services/api';
import {
  SlidersHorizontal,
  Flame,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  Zap
} from 'lucide-react';

export const SimulatorPage = () => {
  const [selectedScenario, setSelectedScenario] = useState('force_majeure');
  const [intensity, setIntensity] = useState(60);
  const [simulationData, setSimulationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const scenarioOptions = [
    {
      id: 'force_majeure',
      title: 'Factory Shutdown (Force Majeure)',
      desc: 'Primary factory stops production due to equipment failure or power cuts.',
      icon: Flame,
      color: 'rose',
    },
    {
      id: 'price_spike',
      title: 'Freight & Material Surcharge (+25%)',
      desc: 'Container rates or raw resin/metal spot prices jump overnight.',
      icon: TrendingUp,
      color: 'amber',
    },
    {
      id: 'volume_surge',
      title: 'Demand Spike (+100% Volume)',
      desc: 'Viral customer orders exceed current supplier maximum monthly quota.',
      icon: Layers,
      color: 'cyan',
    },
    {
      id: 'port_strike',
      title: 'Port Strike & Customs Delay',
      desc: 'Pacific shipping lanes congested adding 10-14 days dock backlog.',
      icon: Clock,
      color: 'violet',
    },
  ];

  const runSimulation = async () => {
    setLoading(true);
    try {
      const data = await api.runSimulation({
        scenarioType: selectedScenario,
        intensity,
      });
      setSimulationData(data);
    } catch (err) {
      console.error('Simulation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [selectedScenario, intensity]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20">
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#22D3EE]">
              Stress-Testing Sandbox
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            What-If Supply Chain Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Simulate black-swan disruptions, price shocks, and port strikes. Contrast fragile single-vendor outcomes vs. SourceFlow multi-supplier hedges.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedScenario('force_majeure');
            setIntensity(60);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-400 hover:text-white transition-all w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Scenario Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarioOptions.map((sc) => {
          const isSelected = selectedScenario === sc.id;
          const Icon = sc.icon;

          return (
            <div
              key={sc.id}
              onClick={() => setSelectedScenario(sc.id)}
              className={`
                p-5 rounded-2xl cursor-pointer transition-all duration-200 border relative
                ${
                  isSelected
                    ? 'bg-white/[0.07] border-[#00E5A0]/40 shadow-[0_8px_30px_rgba(0,229,160,0.15)] -translate-y-1'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#00E5A0] shadow-[0_0_8px_#00E5A0]" />
              )}
              <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 mb-3">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{sc.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{sc.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Shock Intensity Slider Bar */}
      <GlassCard hoverEffect={false} className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-semibold text-white">Disruption Severity Intensity</span>
            <p className="text-[11px] text-slate-400">
              Drag to scale the probability and duration of the simulated bottleneck
            </p>
          </div>
          <span className="font-mono text-sm font-bold text-[#00E5A0] bg-[#00E5A0]/10 px-3 py-1 rounded-full border border-[#00E5A0]/20">
            {intensity}% Severity
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full accent-[#00E5A0] h-2 bg-white/10 rounded-lg cursor-pointer"
        />
      </GlassCard>

      {/* Before / After Impact Comparison Grid */}
      {simulationData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Single Supplier Fragility */}
          <GlassCard
            hoverEffect={false}
            glowColor="none"
            className="p-6 sm:p-8 bg-rose-950/[0.08] border-rose-500/25 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/25 text-xs font-mono">
                  Legacy Single-Supplier Approach
                </span>
                <span className="text-xs font-mono text-rose-400 font-bold">100% EXPOSURE</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Catastrophic Bottleneck Impact
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {simulationData.singleSupplierOutcome.narrative}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-rose-500/20 text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">Added Delay</div>
                  <div className="text-lg font-bold text-rose-400 mt-1">
                    +{Math.round((simulationData.singleSupplierOutcome.delayDays * intensity) / 50)} days
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Added Cost</div>
                  <div className="text-lg font-bold text-rose-400 mt-1">
                    +${Math.round((simulationData.singleSupplierOutcome.costImpact * intensity) / 50).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Stockout Risk</div>
                  <div className="text-lg font-bold text-rose-400 mt-1">
                    {Math.min(99, Math.round(simulationData.singleSupplierOutcome.riskRating * (intensity / 50)))}%
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-500/20 text-xs text-rose-300 font-mono flex items-center justify-between">
              <span>Customer Churn Risk: Critical</span>
              <span>Amazon SLA: Breached</span>
            </div>
          </GlassCard>

          {/* Card 2: SourceFlow Multi-Supplier Resilience */}
          <GlassCard
            hoverEffect={false}
            glowColor="emerald"
            className="p-6 sm:p-8 bg-emerald-950/[0.08] border-[#00E5A0]/40 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 text-xs font-mono">
                  SourceFlow Algorithmic Multi-Supplier
                </span>
                <span className="text-xs font-mono text-[#00E5A0] font-bold">HEDGED ZERO DOWNTIME</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Automated Re-balancing Mitigation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {simulationData.sourceFlowOutcome.narrative}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-[#00E5A0]/20 text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">Net Delay</div>
                  <div className="text-lg font-bold text-[#00E5A0] mt-1">
                    +{Math.round((simulationData.sourceFlowOutcome.delayDays * intensity) / 50)} days
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Net Cost Impact</div>
                  <div className="text-lg font-bold text-[#00E5A0] mt-1">
                    {simulationData.sourceFlowOutcome.costImpact < 0
                      ? `-$${Math.abs(simulationData.sourceFlowOutcome.costImpact).toLocaleString()}`
                      : `+$${Math.round((simulationData.sourceFlowOutcome.costImpact * intensity) / 50).toLocaleString()}`}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Residual Risk</div>
                  <div className="text-lg font-bold text-[#00E5A0] mt-1">
                    {Math.round(simulationData.sourceFlowOutcome.riskRating * (intensity / 70))}%
                  </div>
                </div>
              </div>
            </div>

            {/* AI Contingency Plan */}
            <div className="mt-6 p-3.5 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-xs text-slate-300">
              <span className="text-[#00E5A0] font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> AI Contingency Protocol:
              </span>
              {simulationData.recommendedMitigation}
            </div>

            <div className="mt-6 pt-4 border-t border-[#00E5A0]/20 text-xs text-[#00E5A0] font-mono flex items-center justify-between">
              <span>Customer Churn Risk: 0%</span>
              <span>Amazon SLA: Protected</span>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
