import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Activity, Globe, Share2, CheckCircle2, Code2, ExternalLink } from 'lucide-react';
import { LegalModal } from '../common/LegalModal';
import { ApiDocsModal } from '../common/ApiDocsModal';

export const Footer = () => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState('privacy');
  const [apiDocsOpen, setApiDocsOpen] = useState(false);
  const [integrationToast, setIntegrationToast] = useState(null);

  const openLegal = (tab, e) => {
    if (e && (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0)) {
      e.preventDefault();
    }
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleIntegrationClick = (name) => {
    setIntegrationToast(`${name} integration connector available on Enterprise tier.`);
    setTimeout(() => {
      setIntegrationToast(null);
    }, 3200);
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#030508] pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Integration Toast Notification */}
      {integrationToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#090D15] border border-[#00E5A0]/30 shadow-2xl text-xs text-white animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#00E5A0] shrink-0" />
          <span>{integrationToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {/* Brand Col */}
        <div className="sm:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00E5A0] via-[#22D3EE] to-[#8B5CF6] p-[1.5px] shadow-[0_0_15px_rgba(0,229,160,0.3)]">
              <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A0]" />
              </div>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              Source<span className="text-[#00E5A0]">Flow</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
            The AI-powered Multi-Supplier Optimization Engine for modern small and medium enterprises. Eliminating single-point supply chain risk through continuous Pareto order allocation.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" />
            <span>FastAPI Pareto Solver: 99.98% Healthy</span>
          </div>
        </div>

        {/* Links Col 1: Platform */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
            Platform
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link to="/app/optimizer" className="hover:text-white transition-colors">
                Order Split Optimizer
              </Link>
            </li>
            <li>
              <Link to="/app/suppliers" className="hover:text-white transition-colors">
                Supplier Scoring Engine
              </Link>
            </li>
            <li>
              <Link to="/app/simulator" className="hover:text-white transition-colors">
                What-If Stress Simulator
              </Link>
            </li>
            <li>
              <Link to="/app/risk" className="hover:text-white transition-colors">
                Global Risk Radar
              </Link>
            </li>
            <li>
              <Link to="/app/orders" className="hover:text-white transition-colors">
                Multi-PO Dispatch
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Col 2: Integrations */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
            Integrations
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            {['QuickBooks Online', 'Oracle NetSuite', 'Shopify Plus', 'SAP Business One', 'FastAPI REST Webhooks'].map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => handleIntegrationClick(name)}
                  className="hover:text-white transition-colors text-left"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Col 3: Resources */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">Methodology & Math</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            <li><a href="#live-demo" className="hover:text-white transition-colors">Interactive Demo</a></li>
            <li>
              <button
                type="button"
                onClick={() => setApiDocsOpen(true)}
                className="hover:text-[#22D3EE] transition-colors flex items-center gap-1.5 text-left"
              >
                <span>API Documentation</span>
                <span className="px-1.5 py-0.2 rounded bg-[#22D3EE]/10 text-[#22D3EE] text-[9px] font-mono">v2.4</span>
              </button>
            </li>
            <li>
              <Link
                to="/trust"
                onClick={(e) => openLegal('trust', e)}
                className="hover:text-[#00E5A0] transition-colors flex items-center gap-1.5"
              >
                <span>Security & SOC-2</span>
                <ShieldCheck className="w-3 h-3 text-[#00E5A0]" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar with Privacy Policy, Terms of Service, Trust Center */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © {new Date().getFullYear()} SourceFlow AI Technologies Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/privacy"
            onClick={(e) => openLegal('privacy', e)}
            className="hover:text-[#00E5A0] text-slate-300 transition-colors cursor-pointer"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            onClick={(e) => openLegal('terms', e)}
            className="hover:text-[#00E5A0] text-slate-300 transition-colors cursor-pointer"
          >
            Terms of Service
          </Link>
          <Link
            to="/trust"
            onClick={(e) => openLegal('trust', e)}
            className="hover:text-[#00E5A0] text-slate-300 transition-colors cursor-pointer"
          >
            Trust Center
          </Link>
        </div>
      </div>

      {/* Modals */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />

      <ApiDocsModal
        isOpen={apiDocsOpen}
        onClose={() => setApiDocsOpen(false)}
      />
    </footer>
  );
};
