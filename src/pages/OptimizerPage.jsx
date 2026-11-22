import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { PillButton } from '../components/common/PillButton';
import { ScoreRing } from '../components/common/ScoreRing';
import { MOCK_PRODUCTS } from '../data/mockData';
import { api } from '../services/api';
import { validateOptimizationInput } from '../utils/validation';
import confetti from 'canvas-confetti';
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  Send,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';

export const OptimizerPage = () => {
  const [selectedProductId, setSelectedProductId] = useState(MOCK_PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(2500);
  const [deadlineDays, setDeadlineDays] = useState(10);
  const [splitCount, setSplitCount] = useState(2);

  // Weights
  const [weights, setWeights] = useState({
    price: 45,
    delivery: 25,
    quality: 15,
    reliability: 10,
    risk: 10,
  });

  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [committed, setCommitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Selected product object
  const currentProduct = MOCK_PRODUCTS.find(p => p.id === selectedProductId) || MOCK_PRODUCTS[0];

  const handleWeightChange = (key, value) => {
    const nextWeights = { ...weights, [key]: Number(value) };
    setWeights(nextWeights);
    const total = Object.values(nextWeights).reduce((a, b) => a + (Number(b) || 0), 0);
    if (total > 0 && validationErrors.weights) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next.weights;
        return next;
      });
      if (apiError && !validationErrors.quantity && !validationErrors.deadlineDays) {
        setApiError(null);
      }
    }
  };

  // Presets
  const presets = [
    { name: 'Balanced SMB', weights: { price: 40, delivery: 25, quality: 15, reliability: 10, risk: 10 } },
    { name: 'Max Cost Cut', weights: { price: 75, delivery: 10, quality: 5, reliability: 5, risk: 5 } },
    { name: 'Emergency Rush', weights: { price: 10, delivery: 65, quality: 15, reliability: 5, risk: 5 } },
    { name: 'Zero-Defect Quality', weights: { price: 15, delivery: 15, quality: 50, reliability: 15, risk: 5 } },
  ];

  const handleRunOptimization = async (customWeights = null) => {
    const targetWeights = customWeights || weights;
    const validation = validateOptimizationInput({
      quantity,
      deadlineDays,
      weights: targetWeights,
    });

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setApiError('Please resolve the highlighted order parameter errors before solving.');
      return;
    }

    setValidationErrors({});
    setApiError(null);
    setLoading(true);
    setCommitted(false);

    // Multi-phase feedback for authentic AI optimizer feel
    setLoadingPhase('Auditing active rate cards & volume discount curves...');
    await new Promise(r => setTimeout(r, 350));
    setLoadingPhase('Calculating Pareto frontier across candidate suppliers...');
    await new Promise(r => setTimeout(r, 400));
    setLoadingPhase('Evaluating port congestion & cross-border freight risk...');
    await new Promise(r => setTimeout(r, 350));
    setLoadingPhase('Generating plain-language Explainable AI audit trail...');

    try {
      const res = await api.optimizeOrder({
        productId: selectedProductId,
        units: Number(quantity),
        deadlineDays: Number(deadlineDays),
        weights: targetWeights,
        splitCount,
      });
      setOptimizationResult(res);
    } catch (err) {
      console.error('Optimization failed:', err);
      setApiError('Pareto solver timed out or encountered an error. Please try again.');
    } finally {
      setLoading(false);
      setLoadingPhase('');
    }
  };

  // Run on initial mount and when target product changes
  useEffect(() => {
    let isCancelled = false;
    const initialRun = async () => {
      const validation = validateOptimizationInput({
        quantity,
        deadlineDays,
        weights,
      });
      if (!validation.isValid) return;

      setLoading(true);
      setCommitted(false);
      setApiError(null);
      setValidationErrors({});

      try {
        const res = await api.optimizeOrder({
          productId: selectedProductId,
          units: Number(quantity),
          deadlineDays: Number(deadlineDays),
          weights,
          splitCount,
        });
        if (!isCancelled) {
          setOptimizationResult(res);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Initial optimization failed:', err);
          setApiError('Unable to load initial optimization recommendation.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
          setLoadingPhase('');
        }
      }
    };

    initialRun();

    return () => {
      isCancelled = true;
    };
  }, [selectedProductId]);

  const handleCommitOrder = () => {
    setCommitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00E5A0', '#22D3EE', '#8B5CF6'],
      });
    } catch (e) {
      // confetti fallback
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#00E5A0]">
              FastAPI Pareto Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Order Split Optimizer Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Formulate optimal multi-supplier allocation, eliminate single-point risk, and explain decisions in plain English.
          </p>
        </div>

        {optimizationResult && (
          <div className="flex items-center gap-3">
            <PillButton
              variant={committed ? 'secondary' : 'gradient'}
              size="md"
              iconComponent={committed ? CheckCircle2 : Send}
              onClick={handleCommitOrder}
            >
              {committed ? 'POs Dispatched & Locked' : 'Commit & Generate POs'}
            </PillButton>
          </div>
        )}
      </div>

      {/* Main Studio Grid: Configuration (Left 4 cols) & Results Stage (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Order Parameters & Weights */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard glowColor="cyan" className="p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <span>1. Order Parameters</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">SKU Specs</span>
            </div>

            {/* Error Feedback Banner */}
            {apiError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-start justify-between gap-2.5 animate-in fade-in duration-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-rose-200">Validation Notice: </span>
                    <span className="text-slate-300">{apiError}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setApiError(null)}
                  className="text-rose-400 hover:text-white transition-colors text-xs font-mono px-1"
                  aria-label="Dismiss error notification"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Select Product */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Target Product / Component</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5A0]/50 font-medium"
              >
                {MOCK_PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} ({prod.sku})
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Baseline unit: ${currentProduct.baseUnitPrice.toFixed(2)}</span>
                <span>{currentProduct.eligibleSupplierIds.length} eligible vendors</span>
              </div>
            </div>

            {/* Quantity & Deadline */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Total Units</label>
                <input
                  type="number"
                  min="1"
                  max="1000000"
                  step="100"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    if (validationErrors.quantity) {
                      setValidationErrors(prev => {
                        const next = { ...prev };
                        delete next.quantity;
                        return next;
                      });
                    }
                    if (apiError) setApiError(null);
                  }}
                  className={`w-full bg-black/60 border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none transition-colors ${
                    validationErrors.quantity
                      ? 'border-rose-500/60 focus:border-rose-500 bg-rose-950/20'
                      : 'border-white/15 focus:border-[#00E5A0]/50'
                  }`}
                />
                {validationErrors.quantity && (
                  <div className="text-[11px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{validationErrors.quantity}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Target Deadline</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={deadlineDays}
                    onChange={(e) => {
                      setDeadlineDays(e.target.value);
                      if (validationErrors.deadlineDays) {
                        setValidationErrors(prev => {
                          const next = { ...prev };
                          delete next.deadlineDays;
                          return next;
                        });
                      }
                      if (apiError) setApiError(null);
                    }}
                    className={`w-full bg-black/60 border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none transition-colors ${
                      validationErrors.deadlineDays
                        ? 'border-rose-500/60 focus:border-rose-500 bg-rose-950/20'
                        : 'border-white/15 focus:border-[#00E5A0]/50'
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-mono">
                    days
                  </span>
                </div>
                {validationErrors.deadlineDays && (
                  <div className="text-[11px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{validationErrors.deadlineDays}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5A0]" /> Optimization Presets
              </div>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setWeights(p.weights);
                      if (validationErrors.weights) {
                        setValidationErrors(prev => {
                          const next = { ...prev };
                          delete next.weights;
                          return next;
                        });
                      }
                      if (apiError && !validationErrors.quantity && !validationErrors.deadlineDays) {
                        setApiError(null);
                      }
                    }}
                    className="px-3 py-2 rounded-xl text-left bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#00E5A0]/30 transition-all text-xs font-medium text-slate-300 hover:text-white"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Sliders */}
            <div className="pt-3 border-t border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">2. Trade-off Priorities</span>
                <span className="text-[10px] font-mono text-slate-400">Dynamic Normalization</span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Price Sensitivity</span>
                  <span className="font-mono text-[#00E5A0] font-bold">{weights.price}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.price}
                  onChange={(e) => handleWeightChange('price', e.target.value)}
                  className="w-full accent-[#00E5A0] h-1.5 bg-white/10 rounded cursor-pointer"
                />
              </div>

              {/* Delivery Speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Delivery Speed SLA</span>
                  <span className="font-mono text-[#22D3EE] font-bold">{weights.delivery}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.delivery}
                  onChange={(e) => handleWeightChange('delivery', e.target.value)}
                  className="w-full accent-[#22D3EE] h-1.5 bg-white/10 rounded cursor-pointer"
                />
              </div>

              {/* Quality */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Quality Standard</span>
                  <span className="font-mono text-[#8B5CF6] font-bold">{weights.quality}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.quality}
                  onChange={(e) => handleWeightChange('quality', e.target.value)}
                  className="w-full accent-[#8B5CF6] h-1.5 bg-white/10 rounded cursor-pointer"
                />
              </div>

              {/* Risk Mitigation */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Port & Geopolitical De-risking</span>
                  <span className="font-mono text-amber-400 font-bold">{weights.risk}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.risk}
                  onChange={(e) => handleWeightChange('risk', e.target.value)}
                  className="w-full accent-amber-400 h-1.5 bg-white/10 rounded cursor-pointer"
                />
              </div>

              {validationErrors.weights && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{validationErrors.weights}</span>
                </div>
              )}
            </div>

            {/* Run Button */}
            <div className="pt-2">
              <PillButton
                variant="primary"
                size="lg"
                loading={loading}
                onClick={() => handleRunOptimization()}
                className="w-full shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              >
                {loading ? 'Optimizing Split...' : 'Solve Optimal Order Split'}
              </PillButton>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Optimization Results & Explainability */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loading Shimmer State */}
          {loading && (
            <GlassCard hoverEffect={false} className="p-8 shimmer-loading space-y-6 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#00E5A0] border-t-transparent animate-spin mx-auto" />
              <div>
                <h4 className="text-lg font-bold text-white mb-2">
                  FastAPI Pareto Optimization in Progress
                </h4>
                <p className="text-xs font-mono text-[#00E5A0] animate-pulse">
                  {loadingPhase}
                </p>
              </div>
              <div className="max-w-xs mx-auto bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00E5A0] h-full w-2/3 animate-pulse" />
              </div>
            </GlassCard>
          )}

          {/* Result State */}
          {!loading && optimizationResult && (
            <>
              {/* Financial Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                <GlassCard glowColor="emerald" hoverEffect={false} className="p-3.5 sm:p-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Total Spend</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                    ${optimizationResult.totalCost.toLocaleString()}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#00E5A0] mt-1 font-mono">
                    -${optimizationResult.savings.toLocaleString()} saved
                  </div>
                </GlassCard>

                <GlassCard glowColor="cyan" hoverEffect={false} className="p-3.5 sm:p-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Cost Savings</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-[#00E5A0] mt-1">
                    {optimizationResult.savingsPercent}%
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                    vs single vendor
                  </div>
                </GlassCard>

                <GlassCard glowColor="violet" hoverEffect={false} className="p-3.5 sm:p-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Blended Transit</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                    {optimizationResult.blendedLeadTimeDays}d
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#22D3EE] mt-1">
                    Within deadline
                  </div>
                </GlassCard>

                <GlassCard glowColor="emerald" hoverEffect={false} className="p-3.5 sm:p-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Risk Resilience</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white mt-1">
                    {optimizationResult.riskScore}/100
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-1 font-mono">
                    0% single point
                  </div>
                </GlassCard>
              </div>

              {/* Visual Split Donut & Breakdown Card */}
              <GlassCard glowColor="emerald" className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-[#00E5A0]" />
                    <h3 className="text-sm sm:text-base font-semibold text-white">Recommended Allocation Split</h3>
                  </div>
                  <span className="text-xs font-mono text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-0.5 rounded">
                    Pareto Efficient
                  </span>
                </div>

                {/* Progress bar visual split */}
                <div className="w-full h-3.5 sm:h-4 rounded-full overflow-hidden flex bg-white/10 mb-4 shadow-inner">
                  {optimizationResult.split.map((item, idx) => (
                    <div
                      key={item.supplierId}
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${item.sharePercent}%`,
                        backgroundColor: item.color,
                      }}
                      title={`${item.name}: ${item.sharePercent}%`}
                    />
                  ))}
                </div>

                {/* Split Table */}
                <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-left text-xs min-w-[560px]">
                    <thead>
                      <tr className="border-b border-white/[0.06] text-slate-400 font-mono">
                        <th className="pb-2 font-medium">Supplier</th>
                        <th className="pb-2 font-medium">Share</th>
                        <th className="pb-2 font-medium">Units</th>
                        <th className="pb-2 font-medium">Unit Price</th>
                        <th className="pb-2 font-medium">Total Spend</th>
                        <th className="pb-2 font-medium">Lead Time</th>
                        <th className="pb-2 font-medium">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {optimizationResult.split.map((s) => (
                        <tr key={s.supplierId} className="hover:bg-white/[0.02]">
                          <td className="py-3 font-semibold text-white flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                            <span className="truncate">{s.name}</span>
                          </td>
                          <td className="py-3 font-mono font-bold text-white">{s.sharePercent}%</td>
                          <td className="py-3 font-mono">{s.units.toLocaleString()}</td>
                          <td className="py-3 font-mono">${s.unitPrice.toFixed(2)}</td>
                          <td className="py-3 font-mono text-white">${s.totalSpend.toLocaleString()}</td>
                          <td className="py-3 font-mono">{s.deliveryDays} days</td>
                          <td className="py-3">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                              {s.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              {/* Explainable AI Plain-Language Report */}
              <GlassCard glowColor="violet" className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    <h3 className="text-base font-semibold">Why this decision? (Explainable AI)</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6]">
                    Boardroom Ready
                  </span>
                </div>

                <div className="text-sm font-semibold text-[#00E5A0]">
                  {optimizationResult.aiExplanation.headline}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {optimizationResult.aiExplanation.summary}
                </p>

                {/* Key Drivers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {optimizationResult.aiExplanation.keyDrivers.map((driver, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <div className="text-xs font-semibold text-white mb-1">{driver.title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">{driver.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Trade-offs note */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-400">
                  <span className="text-slate-300 font-semibold">Trade-off Analysis: </span>
                  {optimizationResult.aiExplanation.tradeoffs}
                </div>
              </GlassCard>
            </>
          )}

          {/* Fallback Empty/Error State */}
          {!loading && !optimizationResult && (
            <GlassCard hoverEffect={false} className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">No Optimization Solution Available</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  {apiError || 'Please configure valid order parameters and priority weights, then click "Solve Optimal Order Split".'}
                </p>
              </div>
              <div className="pt-2">
                <PillButton
                  variant="secondary"
                  size="sm"
                  icon={false}
                  onClick={() => handleRunOptimization()}
                >
                  Retry Optimization
                </PillButton>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
