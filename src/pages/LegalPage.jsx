import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { Footer } from '../components/landing/Footer';
import { BackgroundOrbs } from '../components/common/BackgroundOrbs';
import { GlassCard } from '../components/common/GlassCard';
import { PillButton } from '../components/common/PillButton';
import {
  ShieldCheck,
  FileText,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Key,
  Download,
  Printer
} from 'lucide-react';

export const LegalPage = () => {
  const location = useLocation();

  // Determine active tab based on pathname
  const getTabFromPath = () => {
    if (location.pathname.includes('terms')) return 'terms';
    if (location.pathname.includes('trust') || location.pathname.includes('security')) return 'trust';
    return 'privacy';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());

  useEffect(() => {
    setActiveTab(getTabFromPath());
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 flex flex-col justify-between relative overflow-x-hidden bg-grain">
      <BackgroundOrbs className="opacity-40" />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-32 pb-20 relative z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#00E5A0] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/25 text-[#00E5A0] text-xs font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance & Legal Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            SourceFlow Legal & Trust Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Version 2.4.0 • Updated November 2026 • Validated for Global Procurement Operations
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 sm:gap-4 border-b border-white/10 mb-8 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'privacy', label: 'Privacy Policy', path: '/privacy', icon: Lock },
            { id: 'terms', label: 'Terms of Service', path: '/terms', icon: FileText },
            { id: 'trust', label: 'Trust Center & SOC-2', path: '/trust', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-2 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
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

        {/* Document Card */}
        <GlassCard hoverEffect={false} className="p-6 sm:p-10 space-y-8 bg-white/[0.03]">
          {/* TAB 1: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Proprietary Supplier Quote Confidentiality</h2>
                <p>
                  At SourceFlow, we treat your supply chain data with bank-grade security. <strong>We strictly commit that your proprietary supplier rate sheets, negotiated volume discounts, Bill of Materials (BOMs), and historical purchase order ledgers are 100% tenant-isolated.</strong>
                </p>
                <div className="mt-4 p-4 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/25 text-[#00E5A0] text-xs font-mono flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Zero Cross-Customer Data Leaks: Your vendor rate cards are never used to train public models or shared with competing SMB buyers.</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Information We Ingest</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  <li><strong>Account & Organization Profile:</strong> Company registration, contact details, connected ERP endpoints (QuickBooks, NetSuite, SAP, Shopify).</li>
                  <li><strong>Procurement Data:</strong> Product SKUs, required delivery lead times, target quantity, historical defect rates, and supplier certifications.</li>
                  <li><strong>Telemetry & Audit Logs:</strong> Timestamped optimization parameters and explainable AI decision reports.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Data Security & Storage</h2>
                <p>
                  All transactional records and solver inputs are encrypted using AES-256 encryption at rest and TLS 1.3 in transit. Data is hosted in SOC-2 compliant multi-region data centers (AWS us-east-1 and eu-central-1).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. International Transfers & Supplier Coordination</h2>
                <p>
                  When you initiate purchase orders to global vendors (e.g. Taiwan, Vietnam, Germany, India), only the specific PO attributes approved by your procurement administrator are transmitted to the recipient supplier.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Data Deletion & Export Rights</h2>
                <p>
                  Under GDPR and CCPA, you retain complete ownership of your supply chain records. You may export your full supplier history in structured JSON/CSV format or request permanent cryptographic erasure at any time via Settings.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Acceptance & Service Scope</h2>
                <p>
                  By accessing the SourceFlow platform or connecting ERP webhooks, you agree to these Terms of Service. SourceFlow provides AI-driven multi-supplier Pareto optimization, predictive shipping risk simulations, and automated purchase order dispatch assistance for commercial businesses.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Algorithmic Recommendations & Human Authority</h2>
                <p>
                  SourceFlow mathematical solvers (FastAPI Pareto v2.4, linear simplex, and Monte Carlo engines) formulate optimal candidate splits based on weights and constraints defined by the user. <strong>The customer retains final authority and contractual discretion when executing binding purchase orders with external suppliers.</strong>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Third-Party Supplier Performance</h2>
                <p>
                  SourceFlow provides objective performance scoring, real-time port backlog alerts, and contingency recommendations. SourceFlow is not a manufacturing contractor and does not assume direct liability for manufacturing defects, ocean freight delays, customs confiscations, or force majeure events caused by third-party vendor factories.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Subscription Billing & 14-Day Guarantee</h2>
                <p>
                  Subscriptions are billed monthly or annually as selected. All new paid tiers include a 14-day full satisfaction trial. If SourceFlow does not identify measurable sourcing savings during your trial period, you may cancel for an immediate 100% refund.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Compliance with Export Control Laws</h2>
                <p>
                  Users sourcing specialized aerospace, defense, or dual-use hardware components agree to comply with applicable ITAR and EAR regulations when routing orders across international borders.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TRUST */}
          {activeTab === 'trust' && (
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
              {/* Trust Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-xs font-mono text-[#00E5A0] font-bold">SOC-2 TYPE II</div>
                  <div className="text-[11px] text-slate-400 mt-1">Audited Security & Availability</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-xs font-mono text-[#22D3EE] font-bold">AES-256 & TLS 1.3</div>
                  <div className="text-[11px] text-slate-400 mt-1">End-to-End Encryption</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-xs font-mono text-[#8B5CF6] font-bold">99.98% UPTIME</div>
                  <div className="text-[11px] text-slate-400 mt-1">High-Availability SLA</div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">Security Architecture Overview</h2>
                <p>
                  SourceFlow enforces a strict zero-trust operational architecture. Production environments are segregated with role-based access control (RBAC), multi-factor hardware key authentication (WebAuthn/FIDO2), and continuous automated vulnerability scanning.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">Sub-Processors & Infrastructure</h2>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                    <span className="text-white font-semibold">Amazon Web Services (AWS)</span>
                    <span className="text-slate-400">Cloud Infrastructure (US & EU)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                    <span className="text-white font-semibold">MongoDB Atlas</span>
                    <span className="text-slate-400">Encrypted Database Storage</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                    <span className="text-white font-semibold">FastAPI Pareto Cluster</span>
                    <span className="text-slate-400">Isolated Mathematical Optimization</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-white font-semibold">Cloudflare</span>
                    <span className="text-slate-400">DDoS Mitigation & Edge CDN</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">Responsible Disclosure</h2>
                <p>
                  Security researchers who discover potential vulnerabilities are invited to contact our team directly at <a href="mailto:security@sourceflow.internal" className="text-[#00E5A0] underline">security@sourceflow.internal</a>. We commit to acknowledging all reports within 12 hours.
                </p>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>Official Legal Entity: SourceFlow AI Technologies Inc. (Delaware C-Corp)</span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Page</span>
            </button>
          </div>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
};
