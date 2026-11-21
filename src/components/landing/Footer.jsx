import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Activity, Globe, Share2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#030508] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {/* Brand Col */}
        <div className="col-span-2">
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
            <li><span className="hover:text-white transition-colors cursor-pointer">QuickBooks Online</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Oracle NetSuite</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Shopify Plus</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">SAP Business One</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">FastAPI REST Webhooks</span></li>
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
            <li><span className="hover:text-white transition-colors cursor-pointer">API Documentation</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Security & SOC-2</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © {new Date().getFullYear()} SourceFlow AI Technologies Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer">Trust Center</span>
        </div>
      </div>
    </footer>
  );
};
