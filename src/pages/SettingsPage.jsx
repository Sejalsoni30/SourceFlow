import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { PillButton } from '../components/common/PillButton';
import {
  Settings,
  Building,
  Key,
  Cpu,
  Bell,
  CheckCircle2,
  Copy,
  ExternalLink,
  Shield,
  Layers
} from 'lucide-react';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('integrations'); // 'general' | 'integrations' | 'engine' | 'api'
  const [copiedKey, setCopiedKey] = useState(false);
  const [optimizerModel, setOptimizerModel] = useState('fastapi_pareto_v2');
  const [savedToast, setSavedToast] = useState(false);

  const [connectedApps, setConnectedApps] = useState({
    quickbooks: true,
    netsuite: false,
    shopify: true,
    sap: false,
  });

  const toggleApp = (id) => {
    setConnectedApps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyKey = () => {
    navigator.clipboard?.writeText('sf_live_9a8f4c2e1b0d7a6e5f3c');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/[0.05] text-slate-300 border border-white/10">
              <Settings className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Platform Configuration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Workspace & Integration Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Configure ERP data synchronization, FastAPI optimizer models, webhooks, and API keys.
          </p>
        </div>

        <PillButton
          variant="primary"
          size="sm"
          onClick={handleSave}
        >
          Save Changes
        </PillButton>
      </div>

      {savedToast && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#00E5A0] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configuration saved successfully and synced with FastAPI optimizer.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-white/[0.08] gap-4 text-xs font-medium">
        {[
          { id: 'integrations', label: 'ERP & Store Integrations' },
          { id: 'engine', label: 'FastAPI AI Engine' },
          { id: 'api', label: 'API Keys & Webhooks' },
          { id: 'general', label: 'Organization & Profile' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#00E5A0] text-[#00E5A0] font-semibold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: ERP Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QuickBooks */}
            <GlassCard hoverEffect={false} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
                    QB
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">QuickBooks Online</h4>
                    <p className="text-xs text-slate-400">Sync POs and invoice rate cards automatically</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleApp('quickbooks')}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                    connectedApps.quickbooks
                      ? 'bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {connectedApps.quickbooks ? 'Connected' : 'Connect'}
                </button>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-white/[0.06] flex justify-between font-mono">
                <span>Last Synced: 24 mins ago</span>
                <span className="text-[#00E5A0]">18 Vendors Synced</span>
              </div>
            </GlassCard>

            {/* Oracle NetSuite */}
            <GlassCard hoverEffect={false} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm">
                    NS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Oracle NetSuite ERP</h4>
                    <p className="text-xs text-slate-400">Enterprise multi-subsidiary inventory sync</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleApp('netsuite')}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                    connectedApps.netsuite
                      ? 'bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {connectedApps.netsuite ? 'Connected' : 'Connect'}
                </button>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-white/[0.06] flex justify-between font-mono">
                <span>Status: Disconnected</span>
                <span>OAuth 2.0 Ready</span>
              </div>
            </GlassCard>

            {/* Shopify */}
            <GlassCard hoverEffect={false} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
                    SP
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Shopify Plus Store</h4>
                    <p className="text-xs text-slate-400">Real-time demand surges trigger auto-reorders</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleApp('shopify')}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                    connectedApps.shopify
                      ? 'bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {connectedApps.shopify ? 'Connected' : 'Connect'}
                </button>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-white/[0.06] flex justify-between font-mono">
                <span>Webhook: active</span>
                <span className="text-[#00E5A0]">Auto-Order Enabled</span>
              </div>
            </GlassCard>

            {/* SAP Business One */}
            <GlassCard hoverEffect={false} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center font-bold text-violet-400 text-sm">
                    SAP
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">SAP Business One</h4>
                    <p className="text-xs text-slate-400">EDI 850 / 855 automated purchase orders</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleApp('sap')}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                    connectedApps.sap
                      ? 'bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {connectedApps.sap ? 'Connected' : 'Connect'}
                </button>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-white/[0.06] flex justify-between font-mono">
                <span>Enterprise Connector</span>
                <span>Requires Tier 3</span>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Tab 2: AI Optimizer Model Configuration */}
      {activeTab === 'engine' && (
        <GlassCard hoverEffect={false} className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">Optimization Algorithm Model</h3>
            <p className="text-xs text-slate-400">
              Select which mathematical solver powers your multi-supplier allocations.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'fastapi_pareto_v2',
                name: 'FastAPI Pareto Multi-Objective Frontier v2.4 (Recommended)',
                desc: 'Simultaneously optimizes landed cost, port delay risk, and historical defect SLAs with explainable reasoning.',
                latency: 'Sub-400ms',
                badge: 'Recommended',
              },
              {
                id: 'monte_carlo_risk',
                name: 'Monte Carlo Stochastic Risk Simulation (5,000 runs)',
                desc: 'Performs 5,000 stochastic maritime strike simulations before selecting allocation weights.',
                latency: '1.2s',
                badge: 'High Security',
              },
              {
                id: 'linear_simplex',
                name: 'Linear Program Simplex (Cost Minimization Only)',
                desc: 'Greedy linear cost optimization. Ignores supply-chain de-risking.',
                latency: '50ms',
                badge: 'Basic',
              },
            ].map((model) => (
              <div
                key={model.id}
                onClick={() => setOptimizerModel(model.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  optimizerModel === model.id
                    ? 'bg-white/[0.06] border-[#00E5A0]/40'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-white">{model.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00E5A0]/10 text-[#00E5A0]">
                    {model.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">{model.desc}</p>
                <div className="text-[10px] font-mono text-slate-500">Avg Solver Latency: {model.latency}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <label className="text-xs font-medium text-slate-300">Custom FastAPI Endpoint URL</label>
            <input
              type="text"
              defaultValue="https://api.sourceflow.internal/v2/optimize"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </GlassCard>
      )}

      {/* Tab 3: API Keys */}
      {activeTab === 'api' && (
        <GlassCard hoverEffect={false} className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">API Keys & REST Webhooks</h3>
            <p className="text-xs text-slate-400">
              Integrate your Node/Express backend or dispatch webhooks whenever an order split is approved.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Production Secret Key</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value="sf_live_9a8f4c2e1b0d7a6e5f3c"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none"
              />
              <button
                onClick={handleCopyKey}
                className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Never share this key in client-side repositories. Use server-side Node / Express environment variables.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <h4 className="text-xs font-semibold uppercase font-mono text-slate-400">
              Sample Node / Express Integration
            </h4>
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 text-[11px] font-mono text-[#00E5A0] overflow-x-auto leading-relaxed">
{`// Express.js route handler
app.post('/api/orders/optimize', async (req, res) => {
  const { productId, units, deadlineDays } = req.body;
  const result = await fetch('https://api.sourceflow.internal/v2/optimize', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + process.env.SOURCEFLOW_API_KEY },
    body: JSON.stringify({ productId, units, deadlineDays })
  });
  const data = await result.json();
  res.json(data);
});`}
            </pre>
          </div>
        </GlassCard>
      )}

      {/* Tab 4: General Organization Profile */}
      {activeTab === 'general' && (
        <GlassCard hoverEffect={false} className="p-6 space-y-4 max-w-xl">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Organization Name</label>
            <input
              type="text"
              defaultValue="Apex Hardware & Electronics Co."
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Procurement Base Currency</label>
            <select className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>SGD ($)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Emergency Contact Slack Channel</label>
            <input
              type="text"
              defaultValue="#supply-chain-alerts"
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </GlassCard>
      )}
    </div>
  );
};
