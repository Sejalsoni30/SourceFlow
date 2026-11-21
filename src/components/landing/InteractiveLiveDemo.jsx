import React, { useState, useMemo } from 'react';
import { GlassCard } from '../common/GlassCard';
import { SectionHeading } from '../common/SectionHeading';
import { ScoreRing } from '../common/ScoreRing';
import { PillButton } from '../common/PillButton';
import { useNavigate } from 'react-router-dom';
import {
  Sliders,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';

const SAMPLE_SUPPLIERS = [
  {
    id: 'sup-1',
    name: 'Apex Precision Technologies',
    country: 'Taiwan',
    category: 'Electronics',
    priceScore: 88,
    speedScore: 94,
    qualityScore: 98,
    reliabilityScore: 96,
    riskScore: 91,
    leadDays: 5,
    unitPrice: '$78.50',
    defectRate: '0.08%',
  },
  {
    id: 'sup-2',
    name: 'Novatech Global Solutions',
    country: 'Vietnam',
    category: 'Electronics',
    priceScore: 97,
    speedScore: 88,
    qualityScore: 89,
    reliabilityScore: 92,
    riskScore: 88,
    leadDays: 8,
    unitPrice: '$69.20',
    defectRate: '0.35%',
  },
  {
    id: 'sup-5',
    name: 'Vanguard Heavy Casting',
    country: 'United States',
    category: 'Hardware',
    priceScore: 78,
    speedScore: 98,
    qualityScore: 96,
    reliabilityScore: 97,
    riskScore: 96,
    leadDays: 2,
    unitPrice: '$89.00',
    defectRate: '0.04%',
  },
  {
    id: 'sup-3',
    name: 'EcoPack Innovations GmbH',
    country: 'Germany',
    category: 'Packaging',
    priceScore: 84,
    speedScore: 92,
    qualityScore: 95,
    reliabilityScore: 94,
    riskScore: 94,
    leadDays: 4,
    unitPrice: '$81.00',
    defectRate: '0.05%',
  },
  {
    id: 'sup-4',
    name: 'Horizon Silk & Fabric Mills',
    country: 'India',
    category: 'Textiles',
    priceScore: 95,
    speedScore: 78,
    qualityScore: 86,
    reliabilityScore: 84,
    riskScore: 79,
    leadDays: 14,
    unitPrice: '$64.50',
    defectRate: '0.62%',
  },
];

export const InteractiveLiveDemo = () => {
  const navigate = useNavigate();

  // 5 weight sliders
  const [weights, setWeights] = useState({
    price: 40,
    delivery: 25,
    quality: 15,
    reliability: 10,
    risk: 10,
  });

  const presets = [
    {
      label: 'Balanced SMB',
      weights: { price: 40, delivery: 25, quality: 15, reliability: 10, risk: 10 },
    },
    {
      label: 'Ultra Cost-Cutter',
      weights: { price: 80, delivery: 5, quality: 5, reliability: 5, risk: 5 },
    },
    {
      label: 'Emergency Rush',
      weights: { price: 10, delivery: 70, quality: 10, reliability: 5, risk: 5 },
    },
    {
      label: 'Zero-Defect Quality',
      weights: { price: 10, delivery: 10, quality: 55, reliability: 20, risk: 5 },
    },
  ];

  // Re-rank suppliers whenever weights change
  const rankedSuppliers = useMemo(() => {
    const totalWeight =
      weights.price + weights.delivery + weights.quality + weights.reliability + weights.risk || 1;

    const scored = SAMPLE_SUPPLIERS.map((sup) => {
      const calculatedScore = Math.round(
        (sup.priceScore * weights.price +
          sup.speedScore * weights.delivery +
          sup.qualityScore * weights.quality +
          sup.reliabilityScore * weights.reliability +
          sup.riskScore * weights.risk) /
          totalWeight
      );
      return {
        ...sup,
        liveScore: calculatedScore,
      };
    });

    return scored.sort((a, b) => b.liveScore - a.liveScore);
  }, [weights]);

  const top1 = rankedSuppliers[0];
  const top2 = rankedSuppliers[1];

  return (
    <section id="live-demo" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Live Interactive Playground"
        title={
          <>
            Test the optimizer right now.{' '}
            <span className="font-serif italic text-gradient-brand">Drag the sliders</span>.
          </>
        }
        subtitle="Watch how changing your priorities immediately alters vendor scores, reorders the supplier leaderboard, and calculates your optimal order allocation."
      />

      {/* Preset Pills */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#00E5A0]" /> Quick Presets:
        </span>
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => setWeights(preset.weights)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-slate-300 hover:text-white transition-all font-medium"
          >
            {preset.label}
          </button>
        ))}
        <button
          onClick={() =>
            setWeights({ price: 40, delivery: 25, quality: 15, reliability: 10, risk: 10 })
          }
          className="text-xs p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all"
          title="Reset Sliders"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders (5 cols) */}
        <div className="lg:col-span-5">
          <GlassCard glowColor="cyan" className="p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#22D3EE]" />
                <h3 className="text-base font-semibold text-white">Priority Weightings</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Total: 100%</span>
            </div>

            {/* Slider 1: Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Price Sensitivity</span>
                <span className="font-mono text-[#00E5A0] font-bold">{weights.price}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.price}
                onChange={(e) => setWeights({ ...weights, price: Number(e.target.value) })}
                className="w-full accent-[#00E5A0] h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">Pushes for deepest volume discounts</div>
            </div>

            {/* Slider 2: Delivery Speed */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Delivery Speed / Lead Time</span>
                <span className="font-mono text-[#22D3EE] font-bold">{weights.delivery}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.delivery}
                onChange={(e) => setWeights({ ...weights, delivery: Number(e.target.value) })}
                className="w-full accent-[#22D3EE] h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">Prioritizes 2-5 day domestic / express suppliers</div>
            </div>

            {/* Slider 3: Quality Standard */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Quality & Defect SLA</span>
                <span className="font-mono text-[#8B5CF6] font-bold">{weights.quality}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.quality}
                onChange={(e) => setWeights({ ...weights, quality: Number(e.target.value) })}
                className="w-full accent-[#8B5CF6] h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">Penalizes suppliers with &gt;0.1% defect rate</div>
            </div>

            {/* Slider 4: Reliability */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Historical Reliability</span>
                <span className="font-mono text-white font-bold">{weights.reliability}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.reliability}
                onChange={(e) => setWeights({ ...weights, reliability: Number(e.target.value) })}
                className="w-full accent-white h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">Tracks past on-time delivery percentages</div>
            </div>

            {/* Slider 5: Risk Tolerance */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Risk Buffer / Port Hedge</span>
                <span className="font-mono text-amber-400 font-bold">{weights.risk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights.risk}
                onChange={(e) => setWeights({ ...weights, risk: Number(e.target.value) })}
                className="w-full accent-amber-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">De-weights suppliers in congested shipping routes</div>
            </div>

            {/* Generated AI Tradeoff Note */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs">
              <div className="flex items-center gap-1.5 text-[#00E5A0] font-mono text-[11px] mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Dynamic AI Split Recommendation:
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Split: <span className="font-bold text-white">60% {top1.name}</span> +{' '}
                <span className="font-bold text-white">40% {top2.name}</span>. This captures maximum
                score optimization while guarding against single-point failure.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Real-time Reordered Leaderboard (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
            <span>REAL-TIME LEADERBOARD ({rankedSuppliers.length} VENDORS)</span>
            <span className="text-[#00E5A0]">Auto-calculated via FastAPI Optimizer</span>
          </div>

          {rankedSuppliers.map((supplier, index) => {
            const isRank1 = index === 0;
            const isRank2 = index === 1;

            return (
              <div
                key={supplier.id}
                className={`
                  p-4 rounded-2xl border backdrop-blur-xl transition-all duration-500 ease-out flex items-center justify-between gap-4
                  ${
                    isRank1
                      ? 'bg-gradient-to-r from-emerald-950/40 via-white/[0.04] to-white/[0.02] border-[#00E5A0]/40 shadow-[0_8px_30px_rgba(0,229,160,0.15)] scale-[1.01]'
                      : isRank2
                      ? 'bg-gradient-to-r from-cyan-950/30 via-white/[0.03] to-white/[0.02] border-[#22D3EE]/30'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }
                `}
              >
                {/* Rank & Identity */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isRank1
                        ? 'bg-[#00E5A0] text-black shadow-[0_0_12px_#00E5A0]'
                        : isRank2
                        ? 'bg-[#22D3EE] text-black shadow-[0_0_10px_#22D3EE]'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    #{index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {supplier.name}
                      </h4>
                      {isRank1 && (
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30 text-[10px] font-mono">
                          Primary (60%)
                        </span>
                      )}
                      {isRank2 && (
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/30 text-[10px] font-mono">
                          Buffer (40%)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span>{supplier.country}</span>
                      <span>•</span>
                      <span>{supplier.leadDays} days lead</span>
                      <span>•</span>
                      <span className="font-mono text-slate-300">{supplier.unitPrice}/u</span>
                    </div>
                  </div>
                </div>

                {/* Score Ring & Live Score */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Match Fit</div>
                    <div className="text-sm font-mono font-bold text-white">
                      {supplier.liveScore}%
                    </div>
                  </div>
                  <ScoreRing score={supplier.liveScore} size={46} strokeWidth={4} />
                </div>
              </div>
            );
          })}

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Ready to test with your actual product SKUs and vendor rate cards?
            </span>
            <PillButton
              variant="primary"
              size="sm"
              onClick={() => navigate('/app/optimizer')}
            >
              Open Full Studio
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
};
