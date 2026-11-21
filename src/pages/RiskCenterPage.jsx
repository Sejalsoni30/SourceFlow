import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { PillButton } from '../components/common/PillButton';
import { MOCK_RISK_ALERTS } from '../data/mockData';
import { api } from '../services/api';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  BellRing,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  TrendingDown,
  RefreshCw
} from 'lucide-react';

export const RiskCenterPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [resolvedIds, setResolvedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await api.getRiskAlerts();
        setAlerts(data);
      } catch (err) {
        console.error('Failed to load risk alerts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleResolve = (id) => {
    setResolvedIds(prev => [...prev, id]);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-white/[0.05]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-[11px] font-mono text-rose-300 mb-2 shadow-[0_0_12px_rgba(244,63,94,0.1)]">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>24/7 Supply Chain Radar • Satellite Feeds</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
            Global Risk & <span className="font-serif italic text-gradient-brand font-normal">Disruption Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
            Real-time feed of maritime choke points, raw material surges, and automated backup routing.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Scanning 14 Global Ports</span>
          </span>
        </div>
      </div>

      {/* Disruption Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard glowColor="emerald" hoverEffect={false} className="p-5">
          <div className="text-xs font-mono text-slate-400 uppercase">Monitored Vessels & Ports</div>
          <div className="text-3xl font-bold font-mono text-white mt-2">14 Ports</div>
          <div className="text-xs text-[#00E5A0] mt-1">Zero un-hedged shipments</div>
        </GlassCard>

        <GlassCard glowColor="cyan" hoverEffect={false} className="p-5">
          <div className="text-xs font-mono text-slate-400 uppercase">Active Risk Signals</div>
          <div className="text-3xl font-bold font-mono text-amber-400 mt-2">2 Warnings</div>
          <div className="text-xs text-slate-400 mt-1">1 Critical, 1 Commodity Spike</div>
        </GlassCard>

        <GlassCard glowColor="violet" hoverEffect={false} className="p-5">
          <div className="text-xs font-mono text-slate-400 uppercase">Pre-Approved Backups</div>
          <div className="text-3xl font-bold font-mono text-[#00E5A0] mt-2">12 Ready</div>
          <div className="text-xs text-slate-400 mt-1">Contract rates pre-locked</div>
        </GlassCard>
      </div>

      {/* Risk Alerts Timeline Feed */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <span>Active Threat Signals & Mitigation Playbooks</span>
        </h3>

        {alerts.map((alert) => {
          const isResolved = resolvedIds.includes(alert.id) || alert.mitigationStatus === 'Resolved';
          const isCritical = alert.severity === 'critical';
          const isWarning = alert.severity === 'warning';

          return (
            <GlassCard
              key={alert.id}
              glowColor={isResolved ? 'emerald' : isCritical ? 'none' : 'cyan'}
              className={`p-6 transition-all ${
                isResolved
                  ? 'border-emerald-500/20 bg-emerald-950/[0.04]'
                  : isCritical
                  ? 'border-rose-500/30 bg-rose-950/[0.06]'
                  : 'border-amber-500/30 bg-amber-950/[0.06]'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-bold ${
                        isResolved
                          ? 'bg-emerald-500/20 text-[#00E5A0]'
                          : isCritical
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {isResolved ? 'MITIGATED' : alert.severity.toUpperCase()}
                    </span>

                    <span className="text-xs font-mono text-slate-400">
                      {alert.category} • {alert.date}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white">{alert.title}</h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
                    <span>
                      Affected: <strong className="text-white">{alert.affectedSupplier}</strong>
                    </span>
                    <span>•</span>
                    <span className="text-rose-300">Impact: {alert.impact}</span>
                  </div>

                  {/* Recommended Action Box */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 mt-3 max-w-2xl">
                    <div className="text-[11px] font-mono text-[#00E5A0] font-semibold mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Recommended Mitigation Playbook:
                    </div>
                    {alert.activeAction}
                    {alert.recommendedSupplier && (
                      <div className="mt-1 text-slate-400">
                        Target Backup Partner: <strong className="text-white">{alert.recommendedSupplier}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Trigger */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  {isResolved ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E5A0] bg-[#00E5A0]/10 px-3 py-1.5 rounded-xl border border-[#00E5A0]/20">
                      <CheckCircle2 className="w-4 h-4" /> Mitigation Active
                    </span>
                  ) : (
                    <PillButton
                      variant={isCritical ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => handleResolve(alert.id)}
                    >
                      Execute Mitigation
                    </PillButton>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
