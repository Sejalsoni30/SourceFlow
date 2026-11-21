import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { PillButton } from './PillButton';
import {
  X,
  ShieldCheck,
  FileText,
  Lock,
  CheckCircle2,
  ExternalLink,
  Download,
  AlertCircle,
  Building,
  Key
} from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // 'privacy' | 'terms' | 'trust'

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#090D15] border border-white/15 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/25 flex items-center justify-center text-[#00E5A0]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">SourceFlow Trust & Legal Center</h3>
              <p className="text-xs text-slate-400 font-mono">Last updated: November 2026 • Version 2.4.0</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-4 sm:px-6 pt-3 border-b border-white/10 flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar shrink-0 bg-black/40">
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'trust', label: 'Trust Center & Security', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 px-2 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-[#00E5A0] text-[#00E5A0] font-semibold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">1. Proprietary Supplier Quote Confidentiality</h4>
                <p>
                  At SourceFlow, we treat your supply chain data with bank-grade security. <strong>We strictly commit that your proprietary supplier rate sheets, negotiated volume discounts, Bill of Materials (BOMs), and historical purchase order ledgers are 100% tenant-isolated.</strong>
                </p>
                <div className="mt-3 p-3.5 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/25 text-[#00E5A0] text-xs font-mono flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Zero Cross-Customer Data Leaks: Your vendor rate cards are never used to train public models or shared with competing SMB buyers.</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">2. Information We Ingest</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li><strong>Account & Organization Profile:</strong> Company registration, contact details, connected ERP endpoints (QuickBooks, NetSuite, SAP, Shopify).</li>
                  <li><strong>Procurement Data:</strong> Product SKUs, required delivery lead times, target quantity, historical defect rates, and supplier certifications.</li>
                  <li><strong>Telemetry & Audit Logs:</strong> Timestamped optimization parameters and explainable AI decision reports.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">3. Data Security & Storage</h4>
                <p>
                  All transactional records and solver inputs are encrypted using AES-256 encryption at rest and TLS 1.3 in transit. Data is hosted in SOC-2 compliant multi-region data centers (AWS us-east-1 and eu-central-1).
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">4. International Transfers & Supplier Coordination</h4>
                <p>
                  When you initiate purchase orders to global vendors (e.g. Taiwan, Vietnam, Germany, India), only the specific PO attributes approved by your procurement administrator are transmitted to the recipient supplier.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">5. Data Deletion & Export Rights</h4>
                <p>
                  Under GDPR and CCPA, you retain complete ownership of your supply chain records. You may export your full supplier history in structured JSON/CSV format or request permanent cryptographic erasure at any time via Settings.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">1. Acceptance & Service Scope</h4>
                <p>
                  By accessing the SourceFlow platform or connecting ERP webhooks, you agree to these Terms of Service. SourceFlow provides AI-driven multi-supplier Pareto optimization, predictive shipping risk simulations, and automated purchase order dispatch assistance for commercial businesses.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">2. Algorithmic Recommendations & Human Authority</h4>
                <p>
                  SourceFlow mathematical solvers (FastAPI Pareto v2.4, linear simplex, and Monte Carlo engines) formulate optimal candidate splits based on weights and constraints defined by the user. <strong>The customer retains final authority and contractual discretion when executing binding purchase orders with external suppliers.</strong>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">3. Third-Party Supplier Performance</h4>
                <p>
                  SourceFlow provides objective performance scoring, real-time port backlog alerts, and contingency recommendations. SourceFlow is not a manufacturing contractor and does not assume direct liability for manufacturing defects, ocean freight delays, customs confiscations, or force majeure events caused by third-party vendor factories.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">4. Subscription Billing & 14-Day Guarantee</h4>
                <p>
                  Subscriptions are billed monthly or annually as selected. All new paid tiers include a 14-day full satisfaction trial. If SourceFlow does not identify measurable sourcing savings during your trial period, you may cancel for an immediate 100% refund.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">5. Compliance with Export Control Laws</h4>
                <p>
                  Users sourcing specialized aerospace, defense, or dual-use hardware components agree to comply with applicable ITAR and EAR regulations when routing orders across international borders.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TRUST CENTER & SECURITY */}
          {activeTab === 'trust' && (
            <div className="space-y-6">
              {/* Trust Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-xs font-mono text-[#00E5A0] font-bold">SOC-2 TYPE II</div>
                  <div className="text-[11px] text-slate-400 mt-1">Audited Security & Availability</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-xs font-mono text-[#22D3EE] font-bold">AES-256 & TLS 1.3</div>
                  <div className="text-[11px] text-slate-400 mt-1">End-to-End Encryption</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-xs font-mono text-[#8B5CF6] font-bold">99.98% UPTIME</div>
                  <div className="text-[11px] text-slate-400 mt-1">High-Availability SLA</div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">Security Architecture Overview</h4>
                <p>
                  SourceFlow enforces a strict zero-trust operational architecture. Production environments are segregated with role-based access control (RBAC), multi-factor hardware key authentication (WebAuthn/FIDO2), and continuous automated vulnerability scanning.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">Sub-Processors & Infrastructure</h4>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/[0.06]">
                    <span className="text-white font-semibold">Amazon Web Services (AWS)</span>
                    <span className="text-slate-400">Cloud Infrastructure (US & EU)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.06]">
                    <span className="text-white font-semibold">MongoDB Atlas</span>
                    <span className="text-slate-400">Encrypted Database Storage</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.06]">
                    <span className="text-white font-semibold">FastAPI Pareto Cluster</span>
                    <span className="text-slate-400">Isolated Mathematical Optimization</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white font-semibold">Cloudflare</span>
                    <span className="text-slate-400">DDoS Mitigation & Edge CDN</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">Responsible Disclosure</h4>
                <p>
                  Security researchers who discover potential vulnerabilities are invited to contact our team directly at <a href="mailto:security@sourceflow.internal" className="text-[#00E5A0] underline">security@sourceflow.internal</a>. We commit to acknowledging all reports within 12 hours.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/50 shrink-0">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" />
            <span>Official Legal & Security Document</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={activeTab === 'terms' ? '/terms' : activeTab === 'trust' ? '/trust' : '/privacy'}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#00E5A0] text-xs font-mono transition-colors border border-white/5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Page View</span>
            </Link>
            <PillButton
              variant="secondary"
              size="sm"
              icon={false}
              onClick={() => window.print()}
            >
              Print / Save PDF
            </PillButton>
            <PillButton
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              I Understand & Accept
            </PillButton>
          </div>
        </div>

      </div>
    </div>
  );
};
