import React from 'react';
import { ScoreRing } from '../common/ScoreRing';
import { PillButton } from '../common/PillButton';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  Clock,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Building,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const SupplierDetailDrawer = ({ supplier, onClose }) => {
  const navigate = useNavigate();

  if (!supplier) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg h-full bg-[#080B10]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <ScoreRing score={supplier.overallScore} size={54} strokeWidth={5} />
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                  {supplier.tier}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{supplier.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5A0]" />
                  <span>{supplier.city}, {supplier.country}</span>
                  <span>•</span>
                  <span>{supplier.category}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-6 text-xs">
            {/* Summary */}
            <p className="text-slate-300 text-sm leading-relaxed">
              {supplier.shortSummary}
            </p>

            {/* Score Breakdown Bars */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Quantitative Audit Breakdown
              </div>

              {[
                { label: 'Price Index (Cost Competitiveness)', score: supplier.priceScore, color: 'bg-[#00E5A0]' },
                { label: 'Delivery Speed & Turnaround', score: supplier.speedScore, color: 'bg-[#22D3EE]' },
                { label: 'Quality & Defect Rate SLA', score: supplier.qualityScore, color: 'bg-[#8B5CF6]' },
                { label: 'Historical On-Time Reliability', score: supplier.reliabilityScore, color: 'bg-emerald-400' },
                { label: 'Geopolitical & Route Resilience', score: supplier.riskScore, color: 'bg-amber-400' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>{item.label}</span>
                    <span className="font-mono font-bold text-white">{item.score}/100</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Vital Performance Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#22D3EE]" /> Lead Time
                </div>
                <div className="text-base font-mono font-bold text-white">
                  {supplier.deliveryDays} business days
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5A0]" /> On-Time Rate
                </div>
                <div className="text-base font-mono font-bold text-white">
                  {supplier.onTimeRate}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" /> Defect Rate
                </div>
                <div className="text-base font-mono font-bold text-white">
                  {supplier.defectRate}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Layers className="w-3.5 h-3.5 text-amber-400" /> Monthly Capacity
                </div>
                <div className="text-base font-mono font-bold text-white">
                  {supplier.capacityMonthly.toLocaleString()} units
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Verified Certifications & Audits
              </div>
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/25 text-[#00E5A0] font-mono text-[11px] flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3" /> {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Risk Factors or Strengths */}
            {supplier.riskFactors.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Active Route Risk Factors
                </div>
                {supplier.riskFactors.map((r, idx) => (
                  <p key={idx} className="text-slate-300 text-xs">
                    • {r.message}
                  </p>
                ))}
              </div>
            )}

            {/* Direct Contact Person */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Key Account Contact
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{supplier.contact.name}</div>
                  <div className="text-slate-400">{supplier.contact.role}</div>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-1 text-slate-300 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00E5A0]" />
                  <a href={`mailto:${supplier.contact.email}`} className="hover:underline">
                    {supplier.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>{supplier.contact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-black/40 flex items-center gap-3">
          <PillButton
            variant="secondary"
            size="sm"
            onClick={() => {
              onClose();
              navigate('/app/simulator');
            }}
            className="flex-1"
          >
            Simulate Disruption
          </PillButton>
          <PillButton
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              navigate('/app/optimizer');
            }}
            className="flex-1"
          >
            Optimize Order Split
          </PillButton>
        </div>
      </div>
    </div>
  );
};
